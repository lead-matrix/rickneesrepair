import React, { createContext, useContext, useState, useEffect } from 'react';

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
  addLead: (lead: Omit<Lead, 'id' | 'createdAt' | 'notes' | 'status'>) => Lead;
  updateLeadStatus: (leadId: string, status: Lead['status']) => void;
  assignTechnician: (leadId: string, techId: string | undefined) => void;
  addLeadNote: (leadId: string, noteText: string, author?: string) => void;
  addInvoice: (invoice: Omit<Invoice, 'id' | 'createdAt'>) => void;
  updateInvoiceStatus: (invoiceId: string, status: Invoice['status']) => void;
  markNotificationsAsRead: () => void;
  saveTemplates: (templates: { email: string; sms: string; review: string }) => void;
}

const LeadDataContext = createContext<LeadDataContextType | undefined>(undefined);

// Initial default data for Wichita
const defaultTechnicians: Technician[] = [
  { id: 'tech-1', name: 'Dave Miller', phone: '(316) 555-0101', email: 'dave@rickneesrepair.com', specialties: ['Washers', 'Dryers', 'Dishwashers'], status: 'active', rating: 4.9 },
  { id: 'tech-2', name: 'John Nees', phone: '(316) 555-0102', email: 'john@rickneesrepair.com', specialties: ['Refrigerators', 'Freezers', 'Ice Makers', 'Wine Coolers'], status: 'active', rating: 5.0 },
  { id: 'tech-3', name: 'Mark Vance', phone: '(316) 555-0103', email: 'mark@rickneesrepair.com', specialties: ['Ovens', 'Stoves', 'Ranges', 'Cooktops', 'Microwaves'], status: 'active', rating: 4.8 },
  { id: 'tech-4', name: 'Tyler Reed', phone: '(316) 555-0104', email: 'tyler@rickneesrepair.com', specialties: ['Commercial Equipment', 'Garbage Disposals', 'Air Conditioners'], status: 'active', rating: 4.7 }
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
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 mins ago
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
    createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(), // 2 hours ago
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
    createdAt: new Date(Date.now() - 1000 * 60 * 600).toISOString(), // 10 hours ago
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
    createdAt: new Date(Date.now() - 1000 * 60 * 1440).toISOString(), // 1 day ago
    notes: [
      { id: 'n-3', text: 'Assigned to Dave Miller. Parts on truck.', date: new Date(Date.now() - 1000 * 60 * 1400).toISOString(), author: 'Admin' }
    ]
  },
  {
    id: 'lead-5',
    name: 'David Wilson',
    phone: '(316) 555-7722',
    email: 'dwilson@cox.net',
    address: '129 S Belmont Ave',
    city: 'Wichita',
    zip: '67218',
    applianceType: 'Oven',
    brand: 'KitchenAid',
    model: 'KSEB900ESS',
    problemDescription: 'The heating element sparkled and now the oven does not heat up. Clock and screen work fine.',
    preferredDate: '2026-06-21',
    preferredTime: 'Morning (8AM - 12PM)',
    referralSource: 'Referral',
    status: 'Completed',
    assignedTechId: 'tech-3',
    createdAt: new Date(Date.now() - 1000 * 60 * 2880).toISOString(), // 2 days ago
    revenue: 285.00,
    notes: [
      { id: 'n-4', text: 'Mark Vance replaced the bake element. Tested working perfectly.', date: new Date(Date.now() - 1000 * 60 * 2700).toISOString(), author: 'Mark Vance' }
    ]
  },
  {
    id: 'lead-6',
    name: 'Patricia Taylor',
    phone: '(316) 555-3344',
    email: 'ptaylor@gmail.com',
    address: '7724 E Douglas Ave',
    city: 'Wichita',
    zip: '67207',
    applianceType: 'Ice Maker',
    brand: 'Sub-Zero',
    model: 'UC-15IP',
    problemDescription: 'Ice maker is leaking water from the bottom and not producing ice blocks, just slush.',
    preferredDate: '2026-06-20',
    preferredTime: 'Afternoon (12PM - 4PM)',
    referralSource: 'Google Ads',
    status: 'Completed',
    assignedTechId: 'tech-2',
    createdAt: new Date(Date.now() - 1000 * 60 * 4320).toISOString(), // 3 days ago
    revenue: 420.00,
    notes: [
      { id: 'n-5', text: 'John Nees serviced. Cleared drain lines and replaced water inlet valve.', date: new Date(Date.now() - 1000 * 60 * 4000).toISOString(), author: 'John Nees' }
    ]
  },
  {
    id: 'lead-7',
    name: 'James Anderson',
    phone: '(316) 555-5599',
    email: 'janderson@icloud.com',
    address: '1103 West Park St',
    city: 'Maize',
    zip: '67101',
    applianceType: 'Garbage Disposal',
    brand: 'InSinkErator',
    model: 'Evolution Excel',
    problemDescription: 'Disposal hums when turned on but does not spin. Looks jammed.',
    preferredDate: '2026-06-19',
    preferredTime: 'Morning (8AM - 12PM)',
    referralSource: 'Facebook',
    status: 'Completed',
    assignedTechId: 'tech-4',
    createdAt: new Date(Date.now() - 1000 * 60 * 5760).toISOString(), // 4 days ago
    revenue: 120.00,
    notes: [
      { id: 'n-6', text: 'Tyler Reed cleared the jam (coin lodged in blades). Tested operational.', date: new Date(Date.now() - 1000 * 60 * 5600).toISOString(), author: 'Tyler Reed' }
    ]
  },
  {
    id: 'lead-8',
    name: 'Linda Martinez',
    phone: '(316) 555-4089',
    email: 'lmartinez@gmail.com',
    address: '902 Valleyview Dr',
    city: 'Goddard',
    zip: '67052',
    applianceType: 'Commercial Freezer',
    brand: 'Frigidaire Commercial',
    model: 'FCS212RF',
    problemDescription: 'Walk-in freezer temp has dropped to 28 degrees. Need urgent emergency service.',
    preferredDate: '2026-06-18',
    preferredTime: 'Immediate',
    referralSource: 'Google Ads',
    status: 'Won',
    assignedTechId: 'tech-4',
    createdAt: new Date(Date.now() - 1000 * 60 * 7200).toISOString(), // 5 days ago
    revenue: 680.00,
    notes: [
      { id: 'n-7', text: 'Emergency AC/Freezer job dispatched to Tyler. Replaced bad relay switch and recharged refrigerant.', date: new Date(Date.now() - 1000 * 60 * 7000).toISOString(), author: 'Tyler Reed' }
    ]
  },
  {
    id: 'lead-9',
    name: 'William Thomas',
    phone: '(316) 555-1288',
    email: 'wthomas@yahoo.com',
    address: '1540 N Woodlawn St',
    city: 'Wichita',
    zip: '67208',
    applianceType: 'Stove/Cooktop',
    brand: 'Viking',
    model: 'VGSU53015B',
    problemDescription: 'Gas burner won\'t ignite. Igniter sparks but no flame. Smell of gas is present briefly.',
    preferredDate: '2026-06-17',
    preferredTime: 'Afternoon (12PM - 4PM)',
    referralSource: 'Organic',
    status: 'Cancelled',
    createdAt: new Date(Date.now() - 1000 * 60 * 8640).toISOString(), // 6 days ago
    notes: [
      { id: 'n-8', text: 'Customer cancelled. Said a relative fixed it.', date: new Date(Date.now() - 1000 * 60 * 8400).toISOString(), author: 'Admin' }
    ]
  }
];

const defaultInvoices: Invoice[] = [
  {
    id: 'INV-1001',
    leadId: 'lead-5',
    items: [
      { description: 'Service Fee / Diagnostics', amount: 89.00 },
      { description: 'KitchenAid Bake Heating Element Part', amount: 96.00 },
      { description: 'Appliance Repair Labor', amount: 100.00 }
    ],
    subtotal: 285.00,
    tax: 0.00,
    discount: 0.00,
    total: 285.00,
    status: 'Paid',
    createdAt: new Date(Date.now() - 1000 * 60 * 2700).toISOString(),
    dueDate: new Date(Date.now() - 1000 * 60 * 2700).toISOString()
  },
  {
    id: 'INV-1002',
    leadId: 'lead-6',
    items: [
      { description: 'Service Call & Diagnostics', amount: 89.00 },
      { description: 'OEM Water Inlet Valve (Sub-Zero)', amount: 181.00 },
      { description: 'Sub-Zero Specialized Labor', amount: 150.00 }
    ],
    subtotal: 420.00,
    tax: 0.00,
    discount: 0.00,
    total: 420.00,
    status: 'Paid',
    createdAt: new Date(Date.now() - 1000 * 60 * 4000).toISOString(),
    dueDate: new Date(Date.now() - 1000 * 60 * 4000).toISOString()
  },
  {
    id: 'INV-1003',
    leadId: 'lead-7',
    items: [
      { description: 'Service Call / Jam Clearing', amount: 120.00 }
    ],
    subtotal: 120.00,
    tax: 0.00,
    discount: 0.00,
    total: 120.00,
    status: 'Paid',
    createdAt: new Date(Date.now() - 1000 * 60 * 5600).toISOString(),
    dueDate: new Date(Date.now() - 1000 * 60 * 5600).toISOString()
  },
  {
    id: 'INV-1004',
    leadId: 'lead-8',
    items: [
      { description: 'After-Hours Emergency Dispatch', amount: 150.00 },
      { description: 'Defrost Control Board Relay', amount: 180.00 },
      { description: 'R-404a Refrigerant Top-off', amount: 150.00 },
      { description: 'Specialized Commercial Labor', amount: 200.00 }
    ],
    subtotal: 680.00,
    tax: 0.00,
    discount: 0.00,
    total: 680.00,
    status: 'Paid',
    createdAt: new Date(Date.now() - 1000 * 60 * 7000).toISOString(),
    dueDate: new Date(Date.now() - 1000 * 60 * 7000).toISOString()
  }
];

const defaultNotifications: Notification[] = [
  {
    id: 'notif-1',
    title: 'New Online Booking Request',
    message: 'Sarah Jenkins submitted a request for Samsung Refrigerator Repair.',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    read: false,
    leadId: 'lead-1'
  },
  {
    id: 'notif-2',
    title: 'New Online Booking Request',
    message: 'Robert Carter submitted a request for Whirlpool Washer Repair in Derby.',
    timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    read: false,
    leadId: 'lead-2'
  }
];

const defaultTemplates = {
  email: `Hi {{customer_name}},\n\nThank you for choosing Rick Nees Appliance Repair. We have received your request for {{appliance_type}} repair. Your appointment has been scheduled for {{appointment_date}} during our {{appointment_time}} slot.\n\nOur technician, {{tech_name}}, will call you 30 minutes before arrival.\n\nBest regards,\nRick Nees Appliance Repair Team\n(316) 213-1874`,
  sms: `Rick Nees Repair: Hi {{customer_name}}, your {{appliance_type}} repair is scheduled for {{appointment_date}} ({{appointment_time}}). Tech {{tech_name}} will text you when on the way! Call (316) 213-1874 with questions.`,
  review: `Hi {{customer_name}}, thank you for trusting Rick Nees Appliance Repair! Could you take 60 seconds to review Mark's service today? It helps our small business a lot: https://g.page/rick-nees-repair/review`
};

export const LeadDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [technicians, setTechnicians] = useState<Technician[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [templates, setTemplates] = useState(defaultTemplates);

  // Load from local storage or pre-populate defaults
  useEffect(() => {
    const savedLeads = localStorage.getItem('ricknees_leads');
    const savedTechs = localStorage.getItem('ricknees_techs');
    const savedInvs = localStorage.getItem('ricknees_invoices');
    const savedNotifs = localStorage.getItem('ricknees_notifications');
    const savedTemps = localStorage.getItem('ricknees_templates');

    if (savedLeads) setLeads(JSON.parse(savedLeads));
    else {
      setLeads(defaultLeads);
      localStorage.setItem('ricknees_leads', JSON.stringify(defaultLeads));
    }

    if (savedTechs) setTechnicians(JSON.parse(savedTechs));
    else {
      setTechnicians(defaultTechnicians);
      localStorage.setItem('ricknees_techs', JSON.stringify(defaultTechnicians));
    }

    if (savedInvs) setInvoices(JSON.parse(savedInvs));
    else {
      setInvoices(defaultInvoices);
      localStorage.setItem('ricknees_invoices', JSON.stringify(defaultInvoices));
    }

    if (savedNotifs) setNotifications(JSON.parse(savedNotifs));
    else {
      setNotifications(defaultNotifications);
      localStorage.setItem('ricknees_notifications', JSON.stringify(defaultNotifications));
    }

    if (savedTemps) setTemplates(JSON.parse(savedTemps));
  }, []);

  // Sync to local storage helper
  const syncLeads = (newLeads: Lead[]) => {
    setLeads(newLeads);
    localStorage.setItem('ricknees_leads', JSON.stringify(newLeads));
  };

  const syncInvoices = (newInvs: Invoice[]) => {
    setInvoices(newInvs);
    localStorage.setItem('ricknees_invoices', JSON.stringify(newInvs));
  };

  const syncNotifications = (newNotifs: Notification[]) => {
    setNotifications(newNotifs);
    localStorage.setItem('ricknees_notifications', JSON.stringify(newNotifs));
  };

  // State CRUD triggers
  const addLead = (leadInput: Omit<Lead, 'id' | 'createdAt' | 'notes' | 'status'>) => {
    const newLead: Lead = {
      ...leadInput,
      id: `lead-${Date.now()}`,
      createdAt: new Date().toISOString(),
      notes: [],
      status: 'New'
    };

    const updatedLeads = [newLead, ...leads];
    syncLeads(updatedLeads);

    // Trigger dashboard notification
    const newNotif: Notification = {
      id: `notif-${Date.now()}`,
      title: 'New Lead Captured',
      message: `${newLead.name} booked a service for their ${newLead.brand} ${newLead.applianceType}.`,
      timestamp: new Date().toISOString(),
      read: false,
      leadId: newLead.id
    };
    syncNotifications([newNotif, ...notifications]);

    return newLead;
  };

  const updateLeadStatus = (leadId: string, status: Lead['status']) => {
    const updated = leads.map(l => {
      if (l.id === leadId) {
        let rev = l.revenue;
        // If status changes to completed/won and we don't have revenue, set a mock service fee
        if ((status === 'Completed' || status === 'Won') && !rev) {
          rev = 150 + Math.floor(Math.random() * 200);
        }
        
        const note: Note = {
          id: `n-${Date.now()}`,
          text: `Status changed to ${status}.`,
          date: new Date().toISOString(),
          author: 'System'
        };

        return { ...l, status, revenue: rev, notes: [...l.notes, note] };
      }
      return l;
    });
    syncLeads(updated);
  };

  const assignTechnician = (leadId: string, techId: string | undefined) => {
    const tech = technicians.find(t => t.id === techId);
    const updated = leads.map(l => {
      if (l.id === leadId) {
        const text = tech 
          ? `Assigned technician ${tech.name}. Status updated to Scheduled.`
          : 'Technician unassigned.';
        
        const note: Note = {
          id: `n-${Date.now()}`,
          text,
          date: new Date().toISOString(),
          author: 'Admin'
        };

        return { 
          ...l, 
          assignedTechId: techId, 
          status: techId ? ('Scheduled' as const) : l.status,
          notes: [...l.notes, note] 
        };
      }
      return l;
    });
    syncLeads(updated);
  };

  const addLeadNote = (leadId: string, noteText: string, author: string = 'Admin') => {
    const updated = leads.map(l => {
      if (l.id === leadId) {
        const newNote: Note = {
          id: `n-${Date.now()}`,
          text: noteText,
          date: new Date().toISOString(),
          author
        };
        return { ...l, notes: [...l.notes, newNote] };
      }
      return l;
    });
    syncLeads(updated);
  };

  const addInvoice = (invoiceInput: Omit<Invoice, 'id' | 'createdAt'>) => {
    const newInvoice: Invoice = {
      ...invoiceInput,
      id: `INV-${1000 + invoices.length + 1}`,
      createdAt: new Date().toISOString()
    };
    
    // Also record revenue in the lead
    const updatedLeads = leads.map(l => {
      if (l.id === invoiceInput.leadId) {
        return { ...l, revenue: newInvoice.total };
      }
      return l;
    });
    syncLeads(updatedLeads);
    syncInvoices([...invoices, newInvoice]);
  };

  const updateInvoiceStatus = (invoiceId: string, status: Invoice['status']) => {
    const updatedInvs = invoices.map(inv => {
      if (inv.id === invoiceId) {
        return { ...inv, status };
      }
      return inv;
    });
    syncInvoices(updatedInvs);

    // If marked paid, ensure the lead is completed/won
    const invoice = invoices.find(i => i.id === invoiceId);
    if (invoice && status === 'Paid') {
      updateLeadStatus(invoice.leadId, 'Completed');
    }
  };

  const markNotificationsAsRead = () => {
    const updated = notifications.map(n => ({ ...n, read: true }));
    syncNotifications(updated);
  };

  const saveTemplates = (newTemplates: typeof defaultTemplates) => {
    setTemplates(newTemplates);
    localStorage.setItem('ricknees_templates', JSON.stringify(newTemplates));
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
