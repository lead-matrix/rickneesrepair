import React from 'react';
import { useLeadData } from '../../context/LeadDataContext';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, BarChart, Bar
} from 'recharts';
import { 
  DollarSign, Users, Calendar, TrendingUp, Sparkles
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { leads, technicians } = useLeadData();

  // 1. KPI Calculations
  const completedLeads = leads.filter(l => l.status === 'Completed' || l.status === 'Won');
  const activeLeads = leads.filter(l => ['New', 'Contacted', 'Scheduled'].includes(l.status));
  const scheduledLeads = leads.filter(l => l.status === 'Scheduled');
  
  // Total Revenue from Paid/Completed Invoices or Lead records
  const totalRevenue = leads.reduce((sum, l) => sum + (l.revenue || 0), 0);
  const conversionRate = leads.length > 0 
    ? Math.round((completedLeads.length / leads.length) * 100) 
    : 0;

  // 2. Chart 1 Data: Revenue over Time (Mock Monthly / Daily aggregation based on leads)
  const revenueData = [
    { name: 'Mon', revenue: 240 },
    { name: 'Tue', revenue: 480 },
    { name: 'Wed', revenue: 320 },
    { name: 'Thu', revenue: 640 },
    { name: 'Fri', revenue: 890 },
    { name: 'Sat', revenue: 410 },
    { name: 'Sun', revenue: totalRevenue > 2000 ? 1200 : 540 }
  ];

  // 3. Chart 2 Data: Referral Sources
  const sourceCount = leads.reduce((acc, lead) => {
    acc[lead.referralSource] = (acc[lead.referralSource] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const pieData = Object.keys(sourceCount).map(key => ({
    name: key,
    value: sourceCount[key]
  }));

  const COLORS = ['#0B2E59', '#D62828', '#38BDF8', '#F59E0B'];

  // 4. Chart 3 Data: Appliance type breakdown
  const applianceCount = leads.reduce((acc, lead) => {
    acc[lead.applianceType] = (acc[lead.applianceType] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const barData = Object.keys(applianceCount).map(key => ({
    name: key,
    count: applianceCount[key]
  })).sort((a,b) => b.count - a.count).slice(0, 6);

  return (
    <div className="space-y-6">
      
      {/* Page Title */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black font-heading text-slate-800 uppercase tracking-wide">
            Dashboard Overview
          </h1>
          <p className="text-xs text-slate-500 mt-1">Real-time leads analytics, scheduling loads, and revenue targets.</p>
        </div>
        <div className="bg-primary text-white text-[10px] font-bold px-3 py-1.5 rounded-lg border border-white/10 uppercase tracking-widest flex items-center gap-1.5 animate-pulse">
          <Sparkles className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" /> Active Dispatch
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Total Revenue */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 flex items-center justify-between shadow-xs">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Revenue</span>
            <h3 className="text-2xl font-black font-heading text-primary mt-1">${totalRevenue.toLocaleString()}</h3>
            <p className="text-[9px] text-green-600 font-semibold mt-1 flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" /> +12.4% vs last week
            </p>
          </div>
          <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        {/* Active Jobs */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 flex items-center justify-between shadow-xs">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Active Pipeline</span>
            <h3 className="text-2xl font-black font-heading text-primary mt-1">{activeLeads.length} Leads</h3>
            <p className="text-[9px] text-slate-400 font-medium mt-1">New or contacted statuses</p>
          </div>
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
        </div>

        {/* Scheduled Appointments */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 flex items-center justify-between shadow-xs">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Scheduled Jobs</span>
            <h3 className="text-2xl font-black font-heading text-primary mt-1">{scheduledLeads.length} Booked</h3>
            <p className="text-[9px] text-slate-400 font-medium mt-1">Assigned to technicians</p>
          </div>
          <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
            <Calendar className="w-6 h-6" />
          </div>
        </div>

        {/* Lead Conversion */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 flex items-center justify-between shadow-xs">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Conversion Rate</span>
            <h3 className="text-2xl font-black font-heading text-primary mt-1">{conversionRate}%</h3>
            <p className="text-[9px] text-slate-400 font-medium mt-1">Completed vs total leads</p>
          </div>
          <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>

      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Revenue Area Chart */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs lg:col-span-2 text-left">
          <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wide mb-4">Revenue Analytics (Last 7 Days)</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0B2E59" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#0B2E59" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="name" stroke="#94A3B8" fontSize={10} tickLine={false} />
                <YAxis stroke="#94A3B8" fontSize={10} tickLine={false} />
                <Tooltip />
                <Area type="monotone" dataKey="revenue" stroke="#0B2E59" strokeWidth={2.5} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Referral Source Pie Chart */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs text-left">
          <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wide mb-4">Leads by Referral Source</h3>
          <div className="h-56 relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            
            {/* Center text */}
            <div className="absolute flex flex-col items-center justify-center leading-none">
              <span className="text-2xl font-black text-primary font-heading">{leads.length}</span>
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mt-1">Total Leads</span>
            </div>
          </div>
          
          {/* Custom legend */}
          <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-slate-100 text-[10px] font-semibold text-slate-500">
            {pieData.map((entry, index) => (
              <div key={entry.name} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                <span className="truncate">{entry.name} ({entry.value})</span>
              </div>
            ))}
          </div>
        </div>

        {/* Appliance Breakdown Bar Chart */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs lg:col-span-3 text-left">
          <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wide mb-4">Top Serviced Appliances</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="name" stroke="#94A3B8" fontSize={10} tickLine={false} />
                <YAxis stroke="#94A3B8" fontSize={10} tickLine={false} allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count" fill="#D62828" radius={[6, 6, 0, 0]} maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Recent Activity / Active Tech Jobs */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs text-left">
        <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wide mb-4">Recent Bookings Timeline</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 uppercase font-extrabold pb-3">
                <th className="text-left py-3 font-semibold">Customer</th>
                <th className="text-left py-3 font-semibold">Appliance</th>
                <th className="text-left py-3 font-semibold">Location</th>
                <th className="text-left py-3 font-semibold">Assigned Tech</th>
                <th className="text-left py-3 font-semibold">Status</th>
                <th className="text-right py-3 font-semibold">Created At</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-600">
              {leads.slice(0, 5).map(lead => {
                const assignedTech = technicians.find(t => t.id === lead.assignedTechId);
                return (
                  <tr key={lead.id} className="hover:bg-slate-50/50 transition">
                    <td className="py-3.5">
                      <p className="font-bold text-slate-800">{lead.name}</p>
                      <p className="text-[10px] text-slate-400 font-medium">{lead.phone}</p>
                    </td>
                    <td className="py-3.5 font-semibold text-slate-700">{lead.brand} {lead.applianceType}</td>
                    <td className="py-3.5">{lead.city}, KS</td>
                    <td className="py-3.5 font-medium">{assignedTech ? assignedTech.name : 'Unassigned'}</td>
                    <td className="py-3.5">
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wide ${
                        lead.status === 'New' ? 'bg-blue-50 text-blue-600 border border-blue-100' :
                        lead.status === 'Scheduled' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                        lead.status === 'Completed' ? 'bg-green-50 text-green-600 border border-green-100' :
                        'bg-slate-100 text-slate-500'
                      }`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="py-3.5 text-right text-slate-400">
                      {new Date(lead.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}
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
export default Dashboard;
