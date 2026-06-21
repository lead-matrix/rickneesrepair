CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS public.technicians (
  id            TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name          TEXT NOT NULL,
  phone         TEXT,
  email         TEXT,
  specialties   TEXT[] DEFAULT '{}',
  status        TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  rating        NUMERIC(3,1) DEFAULT 5.0,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.leads (
  id                  TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name                TEXT NOT NULL,
  phone               TEXT,
  email               TEXT,
  address             TEXT,
  city                TEXT,
  zip                 TEXT,
  appliance_type      TEXT,
  brand               TEXT,
  model               TEXT,
  problem_description TEXT,
  preferred_date      TEXT,
  preferred_time      TEXT,
  referral_source     TEXT CHECK (referral_source IN ('Google Ads', 'Facebook', 'Organic', 'Referral')),
  status              TEXT NOT NULL DEFAULT 'New'
                      CHECK (status IN ('New','Contacted','Scheduled','Completed','Cancelled','Won','Lost')),
  assigned_tech_id    TEXT REFERENCES public.technicians(id) ON DELETE SET NULL,
  photo_url           TEXT,
  revenue             NUMERIC(10,2),
  created_at          TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.notes (
  id          TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  lead_id     TEXT NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
  text        TEXT NOT NULL,
  author      TEXT DEFAULT 'Admin',
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.invoices (
  id          TEXT PRIMARY KEY,
  lead_id     TEXT NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
  items       JSONB NOT NULL DEFAULT '[]',
  subtotal    NUMERIC(10,2) DEFAULT 0,
  tax         NUMERIC(10,2) DEFAULT 0,
  discount    NUMERIC(10,2) DEFAULT 0,
  total       NUMERIC(10,2) DEFAULT 0,
  status      TEXT NOT NULL DEFAULT 'Draft'
              CHECK (status IN ('Draft','Sent','Paid','Cancelled')),
  due_date    TIMESTAMPTZ,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.notifications (
  id          TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  title       TEXT NOT NULL,
  message     TEXT,
  read        BOOLEAN DEFAULT FALSE,
  lead_id     TEXT REFERENCES public.leads(id) ON DELETE SET NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.settings (
  key         TEXT PRIMARY KEY,
  value       JSONB NOT NULL,
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.user_roles (
  user_id     UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role        TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('admin', 'superadmin')),
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_leads_status     ON public.leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created    ON public.leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_notes_lead_id    ON public.notes(lead_id);
CREATE INDEX IF NOT EXISTS idx_invoices_lead_id ON public.invoices(lead_id);
CREATE INDEX IF NOT EXISTS idx_notifs_created   ON public.notifications(created_at DESC);

ALTER TABLE public.technicians   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notes         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles    ENABLE ROW LEVEL SECURITY;

-- RLS Policies
DROP POLICY IF EXISTS "Public can insert leads" ON public.leads;
CREATE POLICY "Public can insert leads"
  ON public.leads FOR INSERT TO anon WITH CHECK (true);

DROP POLICY IF EXISTS "Admins full access to leads" ON public.leads;
CREATE POLICY "Admins full access to leads"
  ON public.leads FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admins full access to technicians" ON public.technicians;
CREATE POLICY "Admins full access to technicians"
  ON public.technicians FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admins full access to notes" ON public.notes;
CREATE POLICY "Admins full access to notes"
  ON public.notes FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admins full access to invoices" ON public.invoices;
CREATE POLICY "Admins full access to invoices"
  ON public.invoices FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admins full access to notifications" ON public.notifications;
CREATE POLICY "Admins full access to notifications"
  ON public.notifications FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admins full access to settings" ON public.settings;
CREATE POLICY "Admins full access to settings"
  ON public.settings FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Users can view own role" ON public.user_roles;
CREATE POLICY "Users can view own role"
  ON public.user_roles FOR SELECT TO authenticated USING (user_id = auth.uid());

-- Default Seeds
INSERT INTO public.technicians (id, name, phone, email, specialties, status, rating) VALUES
  ('tech-1', 'Dave Miller',  '(316) 555-0101', 'dave@neesrepair.xyz',  ARRAY['Washers','Dryers','Dishwashers'],                  'active', 4.9),
  ('tech-2', 'John Nees',    '(316) 555-0102', 'john@neesrepair.xyz',  ARRAY['Refrigerators','Freezers','Ice Makers'],           'active', 5.0),
  ('tech-3', 'Mark Vance',   '(316) 555-0103', 'mark@neesrepair.xyz',  ARRAY['Ovens','Stoves','Ranges','Cooktops','Microwaves'], 'active', 4.8),
  ('tech-4', 'Tyler Reed',   '(316) 555-0104', 'tyler@neesrepair.xyz', ARRAY['Commercial Equipment','Garbage Disposals'],        'active', 4.7)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.settings (key, value) VALUES (
  'templates',
  '{"email":"Hi {{customer_name}},\n\nThank you for choosing Rick Nees Appliance Repair. Your appointment has been scheduled for {{appointment_date}}.\n\nBest regards,\nRick Nees Appliance Repair\n(316) 213-1874","sms":"Rick Nees Repair: Hi {{customer_name}}, your {{appliance_type}} repair is scheduled for {{appointment_date}}. Tech will text you when on the way!","review":"Hi {{customer_name}}, thank you for trusting Rick Nees! Could you leave a quick review? https://g.page/rick-nees-repair/review"}'
) ON CONFLICT (key) DO NOTHING;

-- Automated Role Assignment Trigger
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.email = 'info@neesrepair.xyz' THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'superadmin')
    ON CONFLICT (user_id) DO UPDATE SET role = 'superadmin';
  ELSE
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'admin')
    ON CONFLICT (user_id) DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Upgrade any existing user with info@neesrepair.xyz to superadmin
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'superadmin'
FROM auth.users
WHERE email = 'info@neesrepair.xyz'
ON CONFLICT (user_id) DO UPDATE SET role = 'superadmin';
