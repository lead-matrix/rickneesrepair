import React, { useState } from 'react';
import { useLeadData, type Invoice } from '../../context/LeadDataContext';
import { Printer, Search } from 'lucide-react';

export const Invoices: React.FC = () => {
  const { invoices, leads, updateInvoiceStatus } = useLeadData();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Filter invoices
  const filteredInvoices = invoices.filter(inv => {
    const lead = leads.find(l => l.id === inv.leadId);
    const matchesSearch = lead
      ? lead.name.toLowerCase().includes(searchQuery.toLowerCase()) || inv.id.includes(searchQuery)
      : inv.id.includes(searchQuery);
    
    const matchesStatus = statusFilter === 'All' || inv.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handlePrintInvoice = (inv: Invoice) => {
    const lead = leads.find(l => l.id === inv.leadId);
    if (!lead) return;

    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>Invoice - ${inv.id}</title>
          <style>
            body { font-family: sans-serif; padding: 40px; color: #333; }
            .header { display: flex; justify-content: space-between; border-bottom: 2px solid #E2E8F0; padding-bottom: 20px; margin-bottom: 30px; }
            .business { text-align: left; }
            .client { text-align: right; }
            table { width: 100%; border-collapse: collapse; margin: 30px 0; }
            th { background: #F8FAFC; text-align: left; padding: 12px; font-size: 12px; text-transform: uppercase; border-bottom: 2px solid #E2E8F0; }
            td { padding: 12px; font-size: 13px; border-bottom: 1px solid #E2E8F0; }
            .summary { text-align: right; margin-top: 20px; }
            .summary-line { margin: 6px 0; font-size: 13px; }
            .total { font-size: 18px; font-weight: bold; color: #0B2E59; margin-top: 10px; }
            .footer { border-top: 1px solid #E2E8F0; margin-top: 60px; padding-top: 20px; font-size: 10px; text-align: center; color: #94A3B8; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="business">
              <h2 style="margin:0; font-family:Impact,sans-serif; color:#0B2E59;">RICK NEES APPLIANCE REPAIR</h2>
              <p style="margin:4px 0; font-size:12px;">Wichita, KS &bull; (316) 213-1874</p>
              <p style="margin:0; font-size:12px; color:#64748B;">info@neesrepair.xyz</p>
            </div>
            <div class="client">
              <h3 style="margin:0;">INVOICE</h3>
              <p style="margin:4px 0; font-size:12px;"><span style="font-weight:bold;">Invoice #:</span> ${inv.id}</p>
              <p style="margin:2px 0; font-size:12px;"><span style="font-weight:bold;">Date:</span> ${new Date(inv.createdAt).toLocaleDateString()}</p>
              <p style="margin:0; font-size:12px;"><span style="font-weight:bold;">Status:</span> ${inv.status.toUpperCase()}</p>
            </div>
          </div>

          <div style="margin-bottom: 30px; font-size: 13px;">
            <p style="font-weight:bold; margin-bottom:6px;">BILLED TO:</p>
            <p style="margin:2px 0;">${lead.name}</p>
            <p style="margin:2px 0;">${lead.phone}</p>
            <p style="margin:2px 0;">${lead.address}, ${lead.city}, KS ${lead.zip}</p>
          </div>

          <table>
            <thead>
              <tr>
                <th>Description</th>
                <th style="text-align: right;">Amount</th>
              </tr>
            </thead>
            <tbody>
              ${inv.items.map(item => `
                <tr>
                  <td>${item.description}</td>
                  <td style="text-align: right;">$${item.amount.toFixed(2)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <div class="summary">
            <div class="summary-line"><span>Subtotal:</span> $${inv.subtotal.toFixed(2)}</div>
            ${inv.discount > 0 ? `<div class="summary-line" style="color:#D62828;"><span>Discount Applied:</span> -$${inv.discount.toFixed(2)}</div>` : ''}
            <div class="summary-line total"><span>Total Amount Due:</span> $${inv.total.toFixed(2)}</div>
          </div>

          <div class="footer">
            <p>90-Day Parts & Labor Warranty &bull; Thank you for choosing Rick Nees Appliance Repair!</p>
          </div>
          <script>window.print();</script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="space-y-6 text-left">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black font-heading text-slate-800 uppercase tracking-wide">
          Invoices Manager
        </h1>
        <p className="text-xs text-slate-500 mt-1">Search, print, and track payments of client work order invoices.</p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col md:flex-row gap-4 items-center shadow-xs">
        <div className="relative flex-1 w-full">
          <input
            type="text"
            placeholder="Search invoice number or customer name..."
            className="w-full border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
        </div>
        
        <select
          className="border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition bg-white w-full md:w-44"
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
        >
          <option value="All">All Invoices</option>
          <option value="Draft">Draft</option>
          <option value="Sent">Sent / Unpaid</option>
          <option value="Paid">Paid</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      {/* Invoices List Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-400 font-extrabold uppercase py-3">
                <th className="py-3 px-6 text-left">Invoice ID</th>
                <th className="py-3 px-6 text-left">Customer</th>
                <th className="py-3 px-6 text-left">Date Created</th>
                <th className="py-3 px-6 text-left">Due Date</th>
                <th className="py-3 px-6 text-left">Total</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-600">
              {filteredInvoices.map(inv => {
                const lead = leads.find(l => l.id === inv.leadId);
                return (
                  <tr key={inv.id} className="hover:bg-slate-50/50 transition">
                    <td className="py-3.5 px-6 font-bold text-slate-800">{inv.id}</td>
                    <td className="py-3.5 px-6 font-semibold">{lead ? lead.name : 'Unknown Customer'}</td>
                    <td className="py-3.5 px-6">{new Date(inv.createdAt).toLocaleDateString()}</td>
                    <td className="py-3.5 px-6">{new Date(inv.dueDate).toLocaleDateString()}</td>
                    <td className="py-3.5 px-6 font-bold text-primary">${inv.total.toFixed(2)}</td>
                    <td className="py-3.5 px-6">
                      <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wide ${
                        inv.status === 'Paid' ? 'bg-green-50 text-green-600 border border-green-100' :
                        inv.status === 'Sent' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                        'bg-slate-100 text-slate-500'
                      }`}>
                        {inv.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-6 text-right space-x-2">
                      {inv.status === 'Sent' && (
                        <button
                          onClick={() => updateInvoiceStatus(inv.id, 'Paid')}
                          className="bg-green-50 hover:bg-green-100 text-green-600 border border-green-200 font-bold px-2 py-1 rounded-lg text-[9px] uppercase transition cursor-pointer"
                        >
                          Mark Paid
                        </button>
                      )}
                      
                      <button
                        onClick={() => handlePrintInvoice(inv)}
                        className="bg-primary/5 hover:bg-primary/10 text-primary border border-primary/10 font-bold px-2 py-1 rounded-lg text-[9px] uppercase transition cursor-pointer inline-flex items-center gap-1"
                      >
                        <Printer className="w-3 h-3" /> Print
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
export default Invoices;
