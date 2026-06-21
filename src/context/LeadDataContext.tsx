import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

// CRM Types
export interface Note {
  id: string;
  text: string;
  date: string;
  author: string;
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  zip: string;
  applianceType: string;
  brand: string;
  model: string;
  problemDescription: string;
  preferredDate: string;
  preferredTime: string;
  referralSource: 'Google Ads' | 'Facebook' | 'Organic' | 'Referral';
  status: 'New' | 'Contacted' | 'Scheduled' | 'Completed' | 'Cancelled' | 'Won' | 'Lost';
  assignedTechId?: string;
  photoUrl?: string;
  notes: Note[];
  createdAt: string;
  revenue?: number;
}

export interface Technician {
  id: string;
  name: string;
  phone: string;
  email: string;
  specialties: string[];
  status: 'active' | 'inactive';
  rating: number;
}

export interface InvoiceItem {
  description: string;
  amount: number;
}

export interface Invoice {
  id: string;
  leadId: string;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  status: 'Draft' | 'Sent' | 'Paid' | 'Cancelled';
  createdAt: string;
  dueDate: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  leadId?: string;
}

interface LeadDataContextType {
  leads: Lead[];
  technicians: Technician[];
  invoices: Invoice[];
  notifications: Notification[];
  templates: {
    email: string;
    sms: string;
    review: string;
  };
  addLead: (lead: Omit<Lead, 'id' | 'createdAt' | 'notes' | 'status'>) => Promise<Lead>;
  updateLeadStatus: (leadId: string, status: Lead['status']) => Promise<void>;
  assignTechnician: (leadId: string, techId: string | undefined) => Promise<void>;
  addLeadNote: (leadId: string, noteText: string, author?: string) => Promise<void>;
  addInvoice: (invoice: Omit<Invoice, 'id' | 'createdAt'>) => Promise<void>;
  updateInvoiceStatus: (invoiceId: string, status: Invoice['status']) => Promise<void>;
  markNotificationsAsRead: () => Promise<void>;
  saveTemplates: (templates: { email: string; sms: string; review: string }) => Promise<void>;
}

const LeadDataContext = createContext<LeadDataContextType | undefined>(undefined);

// Initial default data for local mode
const defaultTechnicians: Technician[] = [
  { id: 'tech-1', name: 'Dave Miller', phone: '(316) 555-0101', email: 'dave@neesrepair.xyz', specialties: ['Washers', 'Dryers', 'Dishwashers'], status: 'active', rating: 4.9 },
  { id: 'tech-2', name: 'John Nees', phone: '(316) 555-0102', email: 'john@neesrepair.xyz', specialties: ['Refrigerators', 'Freezers', 'Ice Makers', 'Wine Coolers'], status: 'active', rating: 5.0 },
  { id: 'tech-3', name: 'Mark Vance', phone: '(316) 555-0103', email: 'mark@neesrepair.xyz', specialties: ['Ovens', 'Stoves', 'Ranges', 'Cooktops', 'Microwaves'], status: 'active', rating: 4.8 },
  { id: 'tech-4', name: 'Tyler Reed', phone: '(316) 555-0104', email: 'tyler@neesrepair.xyz', specialties: ['Commercial Equipment', 'Garbage Disposals', 'Air Conditioners'], status: 'active', rating: 4.7 }
];

const defaultLeads: Lead[] = [
  {
    id: 'lead-1',
    name: 'Sarah Jenkins',
    phone: '(316) 555-9821',
    email: 'sjenkins@gmail.com',
    address: '1422 N Rock Rd',
    city: 'Wichita',
    zip: '67206',
    applianceType: 'Refrigerator',
    brand: 'Samsung',
    model: 'RF28R7351SG',
    problemDescription: 'The compressor is clicking constantly and the refrigerator compartments are warm, though freezer seems slightly cold.',
    preferredDate: '2026-06-22',
    preferredTime: 'Morning (8AM - 12PM)',
    referralSource: 'Google Ads',
    status: 'New',
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    notes: [
      { id: 'n-1', text: 'Customer requested same-day service if possible.', date: new Date(Date.now() - 1000 * 60 * 30).toISOString(), author: 'System' }
    ]
  },
  {
    id: 'lead-2',
    name: 'Robert Carter',
    phone: '(316) 555-2311',
    email: 'rcarter@yahoo.com',
    address: '812 Meadowbrook Ln',
    city: 'Derby',
    zip: '67037',
    applianceType: 'Washer',
    brand: 'Whirlpool',
    model: 'WTW5000DW',
    problemDescription: 'Washer is spinning very loudly during cycles and will not drain at all. Water is sitting in the drum.',
    preferredDate: '2026-06-22',
    preferredTime: 'Afternoon (12PM - 4PM)',
    referralSource: 'Organic',
    status: 'New',
    createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    notes: []
  },
  {
    id: 'lead-3',
    name: 'Emily Davis',
    phone: '(316) 555-4512',
    email: 'emily.davis@outlook.com',
    address: '603 E Willow St',
    city: 'Andover',
    zip: '67002',
    applianceType: 'Dryer',
    brand: 'LG',
    model: 'DLE7300WE',
    problemDescription: 'Dryer tumbles normally but does not generate any heat. Clothes remain damp.',
    preferredDate: '2026-06-23',
    preferredTime: 'Morning (8AM - 12PM)',
    referralSource: 'Organic',
    status: 'Contacted',
    createdAt: new Date(Date.now() - 1000 * 60 * 600).toISOString(),
    notes: [
      { id: 'n-2', text: 'Spoke with Emily. She is at work until 11 AM, prefers a call 30 mins before arrival.', date: new Date(Date.now() - 1000 * 60 * 500).toISOString(), author: 'Admin' }
    ]
  },
  {
    id: 'lead-4',
    name: 'Michael Miller',
    phone: '(316) 555-8933',
    email: 'mmiller@gmail.com',
    address: '4510 W Central Ave',
    city: 'Wichita',
    zip: '67212',
    applianceType: 'Dishwasher',
    brand: 'Bosch',
    model: 'SHPM65Z55N',
    problemDescription: 'Water pools at the bottom of the dishwasher after completion. Tried cleaning filter but issue persists.',
    preferredDate: '2026-06-22',
    preferredTime: 'Afternoon (12PM - 4PM)',
    referralSource: 'Google Ads',
    status: 'Scheduled',
    assignedTechId: 'tech-1',
    createdAt: new Date(Date.now() - 1000 * 60 * 1440).toISOString(),
    notes: [
      { id: 'n-3', text: 'Assigned to Dave Miller. Parts on truck.', date: new Date(Date.now() - 1000 * 60 * 1400).toISOString(), author: 'Admin' }
    ]
  }
];

const defaultInvoices: Invoice[] = [
  {
    id: 'INV-1001',
    leadId: 'lead-4',
    items: [
      { description: 'Service Fee / Diagnostics', amount: 89.00 }
    ],
    subtotal: 89.00,
    tax: 0.00,
    discount: 0.00,
    total: 89.00,
    status: 'Sent',
    createdAt: new Date(Date.now() - 1000 * 60 * 1400).toISOString(),
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString()
  }
];

const defaultTemplates = {
  email: `Hi {{customer_name}},\n\nThank you for choosing Rick Nees Appliance Repair. We have received your request for {{appliance_type}} repair. Your appointment has been scheduled for {{appointment_date}} during our {{appointment_time}} slot.\n\nOur technician, {{tech_name}}, will call you 30 minutes before arrival.\n\nBest regards,\nRick Nees Appliance Repair Team\n(316) 213-1874`,
  sms: `Rick Nees Repair: Hi {{customer_name}}, your {{appliance_type}} repair is scheduled for {{appointment_date}} ({{appointment_time}}). Tech {{tech_name}} will text you when on the way! Call (316) 213-1874 with questions.`,
  review: `Hi {{customer_name}}, thank you for trusting Rick Nees Appliance Repair! Could you take 60 seconds to review Mark\'s service today? It helps our small business a lot: https://g.page/rick-nees-repair/review`
};

export const LeadDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [technicians, setTechnicians] = useState<Technician[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [templates, setTemplates] = useState(defaultTemplates);

  // Load from Supabase (if credentials supplied) or fall back to local storage
  useEffect(() => {
    const loadData = async () => {
      if (supabase) {
        try {
          // Fetch Technicians
          const { data: techData } = await supabase.from('technicians').select('*');
          if (techData) setTechnicians(techData);

          // Fetch Leads
          const { data: leadsData } = await supabase
            .from('leads')
            .select('*, notes(*)')
            .order('created_at', { ascending: false });
          
          if (leadsData) {
            const mappedLeads: Lead[] = leadsData.map(l => ({
              id: l.id,
              name: l.name,
              phone: l.phone,
              email: l.email,
              address: l.address,
              city: l.city,
              zip: l.zip,
              applianceType: l.appliance_type,
              brand: l.brand,
              model: l.model,
              problemDescription: l.problem_description,
              preferredDate: l.preferred_date,
              preferredTime: l.preferred_time,
              referralSource: l.referral_source,
              status: l.status,
              photoUrl: l.photo_url,
              assignedTechId: l.assigned_tech_id,
              revenue: l.revenue,
              createdAt: l.created_at,
              notes: l.notes ? l.notes.map((n: any) => ({
                id: n.id,
                text: n.text,
                date: n.created_at,
                author: n.author
              })) : []
            }));
            setLeads(mappedLeads);
          }

          // Fetch Invoices
          const { data: invData } = await supabase.from('invoices').select('*');
          if (invData) {
            const mappedInvs: Invoice[] = invData.map(i => ({
              id: i.id,
              leadId: i.lead_id,
              items: i.items,
              subtotal: i.subtotal,
              tax: i.tax,
              discount: i.discount,
              total: i.total,
              status: i.status,
              createdAt: i.created_at,
              dueDate: i.due_date
            }));
            setInvoices(mappedInvs);
          }

          // Fetch Notifications
          const { data: notifData } = await supabase.from('notifications').select('*').order('created_at', { ascending: false });
          if (notifData) {
            setNotifications(notifData.map(n => ({
              id: n.id,
              title: n.title,
              message: n.message,
              timestamp: n.created_at,
              read: n.read,
              leadId: n.lead_id
            })));
          }

          // Fetch Templates Settings
          const { data: setTemp } = await supabase.from('settings').select('*').eq('key', 'templates').single();
          if (setTemp) {
            setTemplates(setTemp.value);
          }

        } catch (error) {
          console.error("Supabase failed loading, falling back to local storage:", error);
          loadLocalStorage();
        }
      } else {
        loadLocalStorage();
      }
    };

    const loadLocalStorage = () => {
      const savedLeads = localStorage.getItem('ricknees_leads');
      const savedTechs = localStorage.getItem('ricknees_techs');
      const savedInvs = localStorage.getItem('ricknees_invoices');
      const savedNotifs = localStorage.getItem('ricknees_notifications');
      const savedTemps = localStorage.getItem('ricknees_templates');

      setLeads(savedLeads ? JSON.parse(savedLeads) : defaultLeads);
      setTechnicians(savedTechs ? JSON.parse(savedTechs) : defaultTechnicians);
      setInvoices(savedInvs ? JSON.parse(savedInvs) : defaultInvoices);
      setNotifications(savedNotifs ? JSON.parse(savedNotifs) : []);
      if (savedTemps) setTemplates(JSON.parse(savedTemps));
    };

    loadData();
  }, []);

  // Write Helpers
  const addLead = async (leadInput: Omit<Lead, 'id' | 'createdAt' | 'notes' | 'status'>) => {
    const newLead: Lead = {
      ...leadInput,
      id: supabase ? `lead-${Date.now()}` : `lead-${Date.now()}`,
      createdAt: new Date().toISOString(),
      notes: [],
      status: 'New'
    };

    if (supabase) {
      const { data, error } = await supabase
        .from('leads')
        .insert([{
          name: leadInput.name,
          phone: leadInput.phone,
          email: leadInput.email,
          address: leadInput.address,
          city: leadInput.city,
          zip: leadInput.zip,
          appliance_type: leadInput.applianceType,
          brand: leadInput.brand,
          model: leadInput.model,
          problem_description: leadInput.problemDescription,
          preferred_date: leadInput.preferredDate,
          preferred_time: leadInput.preferredTime,
          referral_source: leadInput.referralSource,
          status: 'New',
          photo_url: leadInput.photoUrl
        }])
        .select()
        .single();
      
      if (!error && data) {
        newLead.id = data.id;
        newLead.createdAt = data.created_at;
      }
      
      // Notify
      await supabase.from('notifications').insert([{
        title: 'New Lead Captured',
        message: `${leadInput.name} booked a service for their ${leadInput.brand} ${leadInput.applianceType}.`,
        read: false,
        lead_id: newLead.id
      }]);
    }

    // Sync Local State
    const updatedLeads = [newLead, ...leads];
    setLeads(updatedLeads);
    if (!supabase) {
      localStorage.setItem('ricknees_leads', JSON.stringify(updatedLeads));
      
      const newNotif: Notification = {
        id: `notif-${Date.now()}`,
        title: 'New Lead Captured',
        message: `${newLead.name} booked a service for their ${newLead.brand} ${newLead.applianceType}.`,
        timestamp: new Date().toISOString(),
        read: false,
        leadId: newLead.id
      };
      const updatedNotifs = [newNotif, ...notifications];
      setNotifications(updatedNotifs);
      localStorage.setItem('ricknees_notifications', JSON.stringify(updatedNotifs));
    }

    return newLead;
  };

  const updateLeadStatus = async (leadId: string, status: Lead['status']) => {
    let rev: number | undefined = undefined;
    const existing = leads.find(l => l.id === leadId);
    if (existing) {
      rev = existing.revenue;
      if ((status === 'Completed' || status === 'Won') && !rev) {
        rev = 150 + Math.floor(Math.random() * 200);
      }
    }

    if (supabase) {
      await supabase.from('leads').update({ status, revenue: rev }).eq('id', leadId);
      await supabase.from('notes').insert([{
        lead_id: leadId,
        text: `Status changed to ${status}.`,
        author: 'System'
      }]);
    }

    // Local state sync
    const noteObj: Note = {
      id: `n-${Date.now()}`,
      text: `Status changed to ${status}.`,
      date: new Date().toISOString(),
      author: 'System'
    };

    const updated = leads.map(l => {
      if (l.id === leadId) {
        return { ...l, status, revenue: rev, notes: [...l.notes, noteObj] };
      }
      return l;
    });

    setLeads(updated);
    if (!supabase) {
      localStorage.setItem('ricknees_leads', JSON.stringify(updated));
    }
  };

  const assignTechnician = async (leadId: string, techId: string | undefined) => {
    const tech = technicians.find(t => t.id === techId);
    const text = tech 
      ? `Assigned technician ${tech.name}. Status updated to Scheduled.`
      : 'Technician unassigned.';
    const statusVal = techId ? ('Scheduled' as const) : ('New' as const);

    if (supabase) {
      await supabase.from('leads').update({ 
        assigned_tech_id: techId || null, 
        status: statusVal 
      }).eq('id', leadId);
      
      await supabase.from('notes').insert([{
        lead_id: leadId,
        text,
        author: 'Admin'
      }]);
    }

    const noteObj: Note = {
      id: `n-${Date.now()}`,
      text,
      date: new Date().toISOString(),
      author: 'Admin'
    };

    const updated = leads.map(l => {
      if (l.id === leadId) {
        return { 
          ...l, 
          assignedTechId: techId, 
          status: techId ? ('Scheduled' as const) : l.status,
          notes: [...l.notes, noteObj] 
        };
      }
      return l;
    });

    setLeads(updated);
    if (!supabase) {
      localStorage.setItem('ricknees_leads', JSON.stringify(updated));
    }
  };

  const addLeadNote = async (leadId: string, noteText: string, author: string = 'Admin') => {
    if (supabase) {
      await supabase.from('notes').insert([{
        lead_id: leadId,
        text: noteText,
        author
      }]);
    }

    const newNote: Note = {
      id: `n-${Date.now()}`,
      text: noteText,
      date: new Date().toISOString(),
      author
    };

    const updated = leads.map(l => {
      if (l.id === leadId) {
        return { ...l, notes: [...l.notes, newNote] };
      }
      return l;
    });

    setLeads(updated);
    if (!supabase) {
      localStorage.setItem('ricknees_leads', JSON.stringify(updated));
    }
  };

  const addInvoice = async (invoiceInput: Omit<Invoice, 'id' | 'createdAt'>) => {
    const invId = `INV-${1000 + invoices.length + 1}`;
    
    if (supabase) {
      await supabase.from('invoices').insert([{
        id: invId,
        lead_id: invoiceInput.leadId,
        items: invoiceInput.items,
        subtotal: invoiceInput.subtotal,
        tax: invoiceInput.tax,
        discount: invoiceInput.discount,
        total: invoiceInput.total,
        status: invoiceInput.status,
        due_date: invoiceInput.dueDate
      }]);

      await supabase.from('leads').update({ revenue: invoiceInput.total }).eq('id', invoiceInput.leadId);
    }

    const newInvoice: Invoice = {
      ...invoiceInput,
      id: invId,
      createdAt: new Date().toISOString()
    };

    const updatedInvs = [...invoices, newInvoice];
    setInvoices(updatedInvs);

    const updatedLeads = leads.map(l => {
      if (l.id === invoiceInput.leadId) {
        return { ...l, revenue: newInvoice.total };
      }
      return l;
    });
    setLeads(updatedLeads);

    if (!supabase) {
      localStorage.setItem('ricknees_invoices', JSON.stringify(updatedInvs));
      localStorage.setItem('ricknees_leads', JSON.stringify(updatedLeads));
    }
  };

  const updateInvoiceStatus = async (invoiceId: string, status: Invoice['status']) => {
    if (supabase) {
      await supabase.from('invoices').update({ status }).eq('id', invoiceId);
    }

    const updatedInvs = invoices.map(inv => {
      if (inv.id === invoiceId) {
        return { ...inv, status };
      }
      return inv;
    });
    setInvoices(updatedInvs);

    if (!supabase) {
      localStorage.setItem('ricknees_invoices', JSON.stringify(updatedInvs));
    }

    // If marked paid, mark the corresponding lead completed
    const invoice = invoices.find(i => i.id === invoiceId);
    if (invoice && status === 'Paid') {
      await updateLeadStatus(invoice.leadId, 'Completed');
    }
  };

  const markNotificationsAsRead = async () => {
    if (supabase) {
      await supabase.from('notifications').update({ read: true }).eq('read', false);
    }

    const updated = notifications.map(n => ({ ...n, read: true }));
    setNotifications(updated);
    
    if (!supabase) {
      localStorage.setItem('ricknees_notifications', JSON.stringify(updated));
    }
  };

  const saveTemplates = async (newTemplates: typeof defaultTemplates) => {
    if (supabase) {
      await supabase.from('settings').upsert({ key: 'templates', value: newTemplates });
    }

    setTemplates(newTemplates);
    if (!supabase) {
      localStorage.setItem('ricknees_templates', JSON.stringify(newTemplates));
    }
  };

  return (
    <LeadDataContext.Provider value={{
      leads,
      technicians,
      invoices,
      notifications,
      templates,
      addLead,
      updateLeadStatus,
      assignTechnician,
      addLeadNote,
      addInvoice,
      updateInvoiceStatus,
      markNotificationsAsRead,
      saveTemplates
    }}>
      {children}
    </LeadDataContext.Provider>
  );
};

export const useLeadData = () => {
  const context = useContext(LeadDataContext);
  if (!context) {
    throw new Error('useLeadData must be used within a LeadDataProvider');
  }
  return context;
};
