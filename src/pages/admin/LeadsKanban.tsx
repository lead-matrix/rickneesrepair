import React, { useState } from 'react';
import { useLeadData, type Lead } from '../../context/LeadDataContext';
import { 
  Search, Download, User, MapPin, Printer, X, PlusCircle, CreditCard, List, Grid
} from 'lucide-react';

export const LeadsKanban: React.FC = () => {
  const { 
    leads, technicians, 
    updateLeadStatus, assignTechnician, addLeadNote, addInvoice 
  } = useLeadData();

  // View settings
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  
  // Note inputs
  const [noteText, setNoteText] = useState('');
  const [assignedTechId, setAssignedTechId] = useState<string>('');

  // Invoice creation inputs
  const [showInvoiceForm, setShowInvoiceForm] = useState(false);
  const [invoiceItems, setInvoiceItems] = useState<{ description: string; amount: number }[]>([
    { description: 'Service Call & Diagnostics', amount: 89 }
  ]);
  const [discount, setDiscount] = useState<number>(0);

  // Kanban Columns
  const columns: Lead['status'][] = ['New', 'Contacted', 'Scheduled', 'Completed', 'Cancelled'];

  // Drag & Drop handlers
  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData('leadId', id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, status: Lead['status']) => {
    const leadId = e.dataTransfer.getData('leadId');
    if (leadId) {
      updateLeadStatus(leadId, status);
      // If dropped to scheduled and has no tech assigned, prompt tech assignment
      if (status === 'Scheduled') {
        const lead = leads.find(l => l.id === leadId);
        if (lead) {
          setSelectedLead(lead);
          setAssignedTechId(lead.assignedTechId || '');
        }
      }
    }
  };

  // Filter leads based on query
  const getFilteredLeads = () => {
    return leads.filter(l => {
      const matchesSearch = l.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            l.phone.includes(searchQuery) ||
                            l.applianceType.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            l.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            l.city.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'All' || l.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  };

  const filteredLeads = getFilteredLeads();

  // Export to CSV
  const handleExportCSV = () => {
    const headers = ['ID', 'Name', 'Phone', 'Email', 'Address', 'City', 'ZIP', 'Appliance', 'Brand', 'Model', 'Problem', 'Referral', 'Status', 'Date Created'];
    const rows = leads.map(l => [
      l.id, l.name, l.phone, l.email, l.address, l.city, l.zip, l.applianceType, l.brand, l.model, l.problemDescription.replace(/,/g, ';'), l.referralSource, l.status, l.createdAt
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `ricknees_leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Notes submission
  const handleAddNoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteText || !selectedLead) return;
    addLeadNote(selectedLead.id, noteText, 'Admin');
    
    // Refresh selected lead state
    const updated = leads.find(l => l.id === selectedLead.id);
    if (updated) setSelectedLead(updated);
    
    setNoteText('');
  };

  // Tech assignment
  const handleAssignTech = (techId: string) => {
    if (!selectedLead) return;
    assignTechnician(selectedLead.id, techId || undefined);
    
    const updated = leads.find(l => l.id === selectedLead.id);
    if (updated) setSelectedLead(updated);
  };

  // Printable work order trigger
  const handlePrintWorkOrder = () => {
    if (!selectedLead) return;
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const assignedTech = technicians.find(t => t.id === selectedLead.assignedTechId);

    printWindow.document.write(`
      <html>
        <head>
          <title>Work Order - ${selectedLead.id}</title>
          <style>
            body { font-family: monospace; padding: 40px; color: #000; }
            .header { border-bottom: 2px dashed #000; padding-bottom: 20px; margin-bottom: 20px; }
            .field { margin: 10px 0; font-size: 14px; }
            .label { font-weight: bold; }
            .footer { border-top: 2px dashed #000; margin-top: 50px; padding-top: 20px; font-size: 11px; text-align: center; }
          </style>
        </head>
        <body>
          <div class="header">
            <h2>RICK NEES APPLIANCE REPAIR - WORK ORDER</h2>
            <p>Date: ${new Date(selectedLead.createdAt).toLocaleDateString()}</p>
            <p>Work Order #: ${selectedLead.id}</p>
          </div>
          <div class="field"><span class="label">Customer:</span> ${selectedLead.name}</div>
          <div class="field"><span class="label">Phone:</span> ${selectedLead.phone}</div>
          <div class="field"><span class="label">Address:</span> ${selectedLead.address}, ${selectedLead.city}, KS ${selectedLead.zip}</div>
          <div class="field"><span class="label">Appliance:</span> ${selectedLead.brand} ${selectedLead.applianceType} (Model: ${selectedLead.model})</div>
          <div class="field"><span class="label">Problem:</span> ${selectedLead.problemDescription}</div>
          <div class="field"><span class="label">Assigned Technician:</span> ${assignedTech ? assignedTech.name : 'UNASSIGNED'}</div>
          <div class="field"><span class="label">Scheduled Slot:</span> ${selectedLead.preferredDate} (${selectedLead.preferredTime})</div>
          
          <div style="margin-top: 40px; border: 1px solid #000; padding: 20px; min-height: 150px;">
            <p class="label">TECHNICIAN FIELD NOTES & RESOLUTION:</p>
          </div>
          
          <div class="footer">
            <p>Rick Nees Appliance Repair &bull; Wichita, KS &bull; (316) 213-1874</p>
            <p>Thank you for your business!</p>
          </div>
          <script>window.print();</script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  // Invoice creation trigger
  const handleAddInvoiceItem = () => {
    setInvoiceItems([...invoiceItems, { description: '', amount: 0 }]);
  };

  const handleInvoiceItemChange = (idx: number, field: 'description' | 'amount', value: any) => {
    const updated = invoiceItems.map((item, i) => {
      if (i === idx) {
        return { ...item, [field]: field === 'amount' ? parseFloat(value) || 0 : value };
      }
      return item;
    });
    setInvoiceItems(updated);
  };

  const handleCreateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLead) return;

    const subtotal = invoiceItems.reduce((sum, item) => sum + item.amount, 0);
    const total = Math.max(0, subtotal - discount);

    addInvoice({
      leadId: selectedLead.id,
      items: invoiceItems,
      subtotal,
      tax: 0,
      discount,
      total,
      status: 'Sent',
      dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString().split('T')[0] // 7 days due
    });

    // Update lead status to won / completed
    updateLeadStatus(selectedLead.id, 'Completed');

    // Reset invoice state
    setShowInvoiceForm(false);
    setInvoiceItems([{ description: 'Service Call & Diagnostics', amount: 89 }]);
    setDiscount(0);

    // Refresh selected lead details
    const updated = leads.find(l => l.id === selectedLead.id);
    if (updated) setSelectedLead(updated);
  };

  return (
    <div className="space-y-6">
      
      {/* 1. Header Options */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black font-heading text-slate-100 uppercase tracking-wide">
            Leads Pipeline
          </h1>
          <p className="text-xs text-slate-500 mt-1">Manage active appliance booking leads through statuses.</p>
        </div>

        <div className="flex gap-2">
          <button 
            onClick={handleExportCSV}
            className="bg-slate-900 border border-slate-800 text-slate-300 hover:text-slate-100 hover:bg-slate-800/50 text-xs font-semibold px-4 py-2.5 rounded-xl shadow-xs transition flex items-center gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4" /> Export CSV
          </button>
          
          <div className="flex bg-slate-200/60 p-0.5 rounded-xl border border-slate-800">
            <button 
              onClick={() => setViewMode('kanban')}
              className={`p-2 rounded-lg cursor-pointer transition ${viewMode === 'kanban' ? 'bg-slate-900 text-primary shadow-xs' : 'text-slate-500'}`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg cursor-pointer transition ${viewMode === 'list' ? 'bg-slate-900 text-primary shadow-xs' : 'text-slate-500'}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. Filters & Searches */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row gap-4 items-center shadow-xs text-left">
        <div className="relative flex-1 w-full">
          <input
            type="text"
            placeholder="Search leads by name, phone, brand or city..."
            className="w-full border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
        </div>
        
        {viewMode === 'list' && (
          <select
            className="border border-slate-800 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition bg-slate-900 w-full md:w-44"
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        )}
      </div>

      {/* 3. Main Views Grid */}
      {viewMode === 'kanban' ? (
        
        // KANBAN VIEW
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 overflow-x-auto pb-4">
          {columns.map(status => {
            const columnLeads = filteredLeads.filter(l => l.status === status);
            return (
              <div 
                key={status}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, status)}
                className="bg-slate-800/50/70 border border-slate-800/50 rounded-2xl p-4 min-w-[220px] flex flex-col h-[75vh]"
              >
                {/* Column Title */}
                <div className="flex justify-between items-center mb-4">
                  <span className="font-bold font-heading text-slate-200 text-xs uppercase tracking-wide">
                    {status}
                  </span>
                  <span className="bg-slate-200 text-slate-300 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                    {columnLeads.length}
                  </span>
                </div>

                {/* Column Cards */}
                <div className="space-y-3 overflow-y-auto no-scrollbar flex-1 pb-10">
                  {columnLeads.map(lead => {
                    const tech = technicians.find(t => t.id === lead.assignedTechId);
                    return (
                      <div
                        key={lead.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, lead.id)}
                        onClick={() => {
                          setSelectedLead(lead);
                          setAssignedTechId(lead.assignedTechId || '');
                        }}
                        className="bg-slate-900 border border-slate-800 hover:border-primary/20 rounded-xl p-3.5 shadow-xs hover:shadow-sm cursor-pointer select-none transition group text-left relative overflow-hidden"
                      >
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary/20 group-hover:bg-primary" />
                        <h4 className="font-bold text-slate-100 text-xs truncate uppercase tracking-wide">{lead.name}</h4>
                        
                        <p className="text-[10px] text-slate-300 font-semibold mt-1 truncate">
                          {lead.brand} {lead.applianceType}
                        </p>
                        
                        <div className="flex items-center gap-1 text-[9px] text-slate-400 mt-2">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          <span className="truncate">{lead.city}, {lead.zip}</span>
                        </div>

                        {tech && (
                          <div className="mt-3 pt-2.5 border-t border-slate-700 flex items-center gap-1.5 text-[9px] text-slate-500 font-bold uppercase tracking-wider">
                            <User className="w-3 h-3 text-accent" />
                            <span>{tech.name}</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

      ) : (

        // LIST VIEW
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xs text-left">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-800/50 text-slate-400 font-extrabold uppercase py-3">
                  <th className="py-3 px-6 text-left">Customer</th>
                  <th className="py-3 px-6 text-left">Appliance / Problem</th>
                  <th className="py-3 px-6 text-left">Location</th>
                  <th className="py-3 px-6 text-left">Appointment Slot</th>
                  <th className="py-3 px-6 text-left">Technician</th>
                  <th className="py-3 px-6 text-left">Status</th>
                  <th className="py-3 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {filteredLeads.map(lead => {
                  const tech = technicians.find(t => t.id === lead.assignedTechId);
                  return (
                    <tr key={lead.id} className="hover:bg-slate-800/50/50 transition">
                      <td className="py-3 px-6">
                        <p className="font-bold text-slate-100">{lead.name}</p>
                        <p className="text-[10px] text-slate-400">{lead.phone} &bull; {lead.email}</p>
                      </td>
                      <td className="py-3 px-6">
                        <p className="font-bold text-slate-200 uppercase">{lead.brand} {lead.applianceType}</p>
                        <p className="text-[10px] text-slate-400 truncate max-w-xs">{lead.problemDescription}</p>
                      </td>
                      <td className="py-3 px-6">{lead.address}, {lead.city}</td>
                      <td className="py-3 px-6">
                        <p className="font-semibold text-slate-200">{lead.preferredDate}</p>
                        <p className="text-[10px] text-slate-400">{lead.preferredTime}</p>
                      </td>
                      <td className="py-3 px-6 font-medium">{tech ? tech.name : 'Unassigned'}</td>
                      <td className="py-3 px-6">
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wide ${
                          lead.status === 'New' ? 'bg-blue-900/40 text-blue-400 border border-blue-800/50' :
                          lead.status === 'Scheduled' ? 'bg-amber-900/40 text-amber-400 border border-amber-800/50' :
                          lead.status === 'Completed' ? 'bg-green-900/40 text-green-400 border border-green-800/50' :
                          'bg-slate-800/50 text-slate-500'
                        }`}>
                          {lead.status}
                        </span>
                      </td>
                      <td className="py-3 px-6 text-right">
                        <button
                          onClick={() => {
                            setSelectedLead(lead);
                            setAssignedTechId(lead.assignedTechId || '');
                          }}
                          className="bg-primary/5 hover:bg-primary/10 text-primary font-bold px-3 py-1.5 rounded-lg text-[10px] uppercase transition cursor-pointer"
                        >
                          Details
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

      )}

      {/* 4. Leads Detail Side Drawer Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs" onClick={() => setSelectedLead(null)} />
          
          {/* Drawer Body */}
          <div className="relative w-full max-w-xl bg-slate-900 h-screen shadow-2xl flex flex-col justify-between z-10 overflow-hidden animate-in slide-in-from-right duration-200">
            
            {/* Drawer Header */}
            <div className="p-6 border-b border-slate-700 flex justify-between items-center bg-slate-800/50">
              <div>
                <span className="text-[9px] font-extrabold uppercase bg-primary/10 text-primary px-2.5 py-0.5 rounded-md tracking-wider">
                  Lead File: {selectedLead.id}
                </span>
                <h3 className="text-xl font-bold font-heading text-slate-100 uppercase tracking-wide mt-1">
                  {selectedLead.name}
                </h3>
              </div>
              <button 
                onClick={() => {
                  setSelectedLead(null);
                  setShowInvoiceForm(false);
                }} 
                className="text-slate-400 hover:text-slate-300 p-1 bg-slate-900 border border-slate-800 rounded-lg hover:shadow-xs transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Body Scroll Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 text-left">
              
              {/* Grid 1: Details */}
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="block font-bold text-slate-400 uppercase tracking-wider text-[10px] mb-1">Phone Number</span>
                  <a href={`tel:${selectedLead.phone}`} className="font-bold text-primary hover:underline text-sm">{selectedLead.phone}</a>
                </div>
                <div>
                  <span className="block font-bold text-slate-400 uppercase tracking-wider text-[10px] mb-1">Email Address</span>
                  <a href={`mailto:${selectedLead.email}`} className="font-semibold text-slate-200">{selectedLead.email}</a>
                </div>
                <div className="col-span-2">
                  <span className="block font-bold text-slate-400 uppercase tracking-wider text-[10px] mb-1">Service Address</span>
                  <p className="font-semibold text-slate-200">{selectedLead.address}, {selectedLead.city}, KS {selectedLead.zip}</p>
                </div>
                <div>
                  <span className="block font-bold text-slate-400 uppercase tracking-wider text-[10px] mb-1">Appliance Details</span>
                  <p className="font-bold text-slate-100 uppercase text-xs">{selectedLead.brand} {selectedLead.applianceType}</p>
                  <p className="text-[10px] text-slate-400">Model: {selectedLead.model}</p>
                </div>
                <div>
                  <span className="block font-bold text-slate-400 uppercase tracking-wider text-[10px] mb-1">Preferred Slot</span>
                  <p className="font-semibold text-slate-200">{selectedLead.preferredDate}</p>
                  <p className="text-[10px] text-slate-500">{selectedLead.preferredTime}</p>
                </div>
              </div>

              {/* Problem Description */}
              <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-4">
                <span className="block font-bold text-slate-400 uppercase tracking-wider text-[10px] mb-1.5">Problem Description</span>
                <p className="text-xs text-slate-200 leading-relaxed">{selectedLead.problemDescription}</p>
              </div>

              {/* Uploaded Photo Preview if exists */}
              {selectedLead.photoUrl && (
                <div>
                  <span className="block font-bold text-slate-400 uppercase tracking-wider text-[10px] mb-1.5">Appliance Photo Attachment</span>
                  <img 
                    src={selectedLead.photoUrl} 
                    alt="Appliance Attachment" 
                    className="w-40 h-40 object-cover rounded-xl border border-slate-800"
                  />
                </div>
              )}

              {/* Technician Scheduling Assignment */}
              <div className="border-t border-slate-700 pt-6">
                <h4 className="font-bold text-slate-200 uppercase font-heading text-xs tracking-wider mb-3">Assign Dispatch Technician</h4>
                <div className="flex gap-3">
                  <select
                    className="border border-slate-800 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition bg-slate-900 flex-1"
                    value={assignedTechId}
                    onChange={e => {
                      setAssignedTechId(e.target.value);
                      handleAssignTech(e.target.value);
                    }}
                  >
                    <option value="">-- Choose Dispatch Tech --</option>
                    {technicians.map(t => (
                      <option key={t.id} value={t.id}>{t.name} ({t.rating} ★)</option>
                    ))}
                  </select>
                  
                  <button 
                    onClick={handlePrintWorkOrder}
                    className="bg-slate-900 border border-slate-800 text-slate-300 hover:text-slate-100 hover:bg-slate-800/50 p-2.5 rounded-xl transition shadow-xs cursor-pointer flex items-center gap-1 text-xs"
                    title="Print work order receipt"
                  >
                    <Printer className="w-4 h-4" /> Print Order
                  </button>
                </div>
              </div>

              {/* Invoice Generation Trigger */}
              {!showInvoiceForm && (selectedLead.status === 'Scheduled' || selectedLead.status === 'Completed') && (
                <div className="border-t border-slate-700 pt-6">
                  <button
                    onClick={() => setShowInvoiceForm(true)}
                    className="w-full bg-accent hover:bg-accent-dark text-white font-heading text-xs font-bold uppercase tracking-wider py-3 rounded-xl transition flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
                  >
                    <CreditCard className="w-4 h-4" /> Generate Customer Invoice
                  </button>
                </div>
              )}

              {/* Invoicing Form Panel */}
              {showInvoiceForm && (
                <form onSubmit={handleCreateInvoice} className="border-t border-slate-700 pt-6 space-y-4 bg-slate-800/50/50 p-4 rounded-2xl border">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-bold text-slate-200 uppercase font-heading text-xs tracking-wider">Create Invoice</h4>
                    <button type="button" onClick={() => setShowInvoiceForm(false)} className="text-slate-400 hover:text-slate-300"><X className="w-4 h-4" /></button>
                  </div>
                  
                  {invoiceItems.map((item, idx) => (
                    <div key={idx} className="flex gap-2">
                      <input
                        type="text"
                        required
                        placeholder="Service item description"
                        className="flex-1 border border-slate-800 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary bg-slate-900"
                        value={item.description}
                        onChange={e => handleInvoiceItemChange(idx, 'description', e.target.value)}
                      />
                      <input
                        type="number"
                        required
                        placeholder="Amount"
                        className="w-20 border border-slate-800 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary bg-slate-900"
                        value={item.amount || ''}
                        onChange={e => handleInvoiceItemChange(idx, 'amount', e.target.value)}
                      />
                    </div>
                  ))}

                  <button 
                    type="button" 
                    onClick={handleAddInvoiceItem}
                    className="text-xs font-semibold text-primary hover:text-brand-dark flex items-center gap-1 cursor-pointer"
                  >
                    <PlusCircle className="w-4 h-4" /> Add Item Line
                  </button>

                  <div className="flex justify-between items-center pt-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Discount Code (Applied)</label>
                    <input
                      type="number"
                      placeholder="e.g. 25"
                      className="w-24 border border-slate-800 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary bg-slate-900"
                      value={discount || ''}
                      onChange={e => setDiscount(parseFloat(e.target.value) || 0)}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-heading text-xs font-bold uppercase tracking-wider py-2.5 rounded-xl transition shadow-md cursor-pointer"
                  >
                    Generate Invoice &amp; Mark Completed
                  </button>
                </form>
              )}

              {/* Lead Action History Logs */}
              <div className="border-t border-slate-700 pt-6">
                <h4 className="font-bold text-slate-200 uppercase font-heading text-xs tracking-wider mb-3">Communication &amp; Audit Logs</h4>
                
                {/* Notes List */}
                <div className="space-y-2 mb-4 max-h-40 overflow-y-auto no-scrollbar">
                  {selectedLead.notes.length > 0 ? (
                    selectedLead.notes.map(note => (
                      <div key={note.id} className="bg-slate-800/50 rounded-xl p-3 border border-slate-700 text-[11px]">
                        <div className="flex justify-between items-center text-slate-400 font-semibold mb-1">
                          <span>{note.author}</span>
                          <span>{new Date(note.date).toLocaleString([], {month:'short', day:'numeric', hour:'2-digit', minute:'2-digit'})}</span>
                        </div>
                        <p className="text-slate-300 leading-normal">{note.text}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-[11px] text-slate-400 italic">No communication logs recorded yet.</p>
                  )}
                </div>

                {/* Add Note Form */}
                <form onSubmit={handleAddNoteSubmit} className="flex gap-2">
                  <input
                    type="text"
                    required
                    placeholder="Log a client phone contact, parts ordered..."
                    className="flex-1 border border-slate-800 rounded-xl px-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                    value={noteText}
                    onChange={e => setNoteText(e.target.value)}
                  />
                  <button 
                    type="submit"
                    className="bg-primary hover:bg-brand-dark text-white font-bold px-4 py-2 rounded-xl text-xs uppercase tracking-wider transition cursor-pointer flex items-center justify-center"
                  >
                    Log
                  </button>
                </form>
              </div>

            </div>

            {/* Drawer Footer Actions */}
            <div className="p-6 border-t border-slate-700 bg-slate-800/50 flex gap-3">
              <button
                onClick={() => {
                  updateLeadStatus(selectedLead.id, 'Won');
                  setSelectedLead(null);
                }}
                disabled={selectedLead.status === 'Won'}
                className="flex-1 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white font-heading text-xs font-bold uppercase tracking-wider py-2.5 rounded-xl shadow-xs transition cursor-pointer"
              >
                Mark Won
              </button>
              <button
                onClick={() => {
                  updateLeadStatus(selectedLead.id, 'Lost');
                  setSelectedLead(null);
                }}
                disabled={selectedLead.status === 'Lost'}
                className="flex-1 bg-slate-200 hover:bg-slate-300 disabled:opacity-50 text-slate-200 font-heading text-xs font-bold uppercase tracking-wider py-2.5 rounded-xl shadow-xs transition cursor-pointer"
              >
                Mark Lost
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
export default LeadsKanban;
