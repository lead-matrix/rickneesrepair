import React from 'react';
import { useLeadData } from '../../context/LeadDataContext';
import { Phone, Mail, Star, CheckCircle2, AlertCircle } from 'lucide-react';

export const Technicians: React.FC = () => {
  const { technicians, leads } = useLeadData();

  // Get active scheduled jobs count for each tech
  const getTechLoad = (techId: string) => {
    return leads.filter(l => l.assignedTechId === techId && l.status === 'Scheduled').length;
  };

  return (
    <div className="space-y-6 text-left">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black font-heading text-slate-800 uppercase tracking-wide">
          Technicians Directory
        </h1>
        <p className="text-xs text-slate-500 mt-1">Manage active field service staff, service specialties, and workloads.</p>
      </div>

      {/* Grid of Tech Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {technicians.map(tech => {
          const load = getTechLoad(tech.id);
          
          return (
            <div 
              key={tech.id} 
              className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col justify-between"
            >
              <div>
                {/* Tech Title & Status */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary/5 text-primary rounded-xl flex items-center justify-center font-bold text-sm border border-primary/10">
                      {tech.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold font-heading text-slate-800 uppercase tracking-wide">
                        {tech.name}
                      </h3>
                      <div className="flex items-center gap-1 text-xs text-yellow-500 font-semibold mt-0.5">
                        <Star className="w-3.5 h-3.5 fill-yellow-500 stroke-none" />
                        <span>{tech.rating.toFixed(1)} Rating</span>
                      </div>
                    </div>
                  </div>

                  <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-widest ${
                    tech.status === 'active' 
                      ? 'bg-green-50 text-green-600 border border-green-100' 
                      : 'bg-slate-100 text-slate-400'
                  }`}>
                    {tech.status}
                  </span>
                </div>

                {/* Tech Details */}
                <div className="space-y-2 text-xs text-slate-500 border-t border-slate-100 pt-4">
                  <a href={`tel:${tech.phone}`} className="flex items-center gap-2 hover:text-primary transition font-semibold text-slate-600">
                    <Phone className="w-4 h-4 text-accent fill-accent" />
                    <span>{tech.phone}</span>
                  </a>
                  <a href={`mailto:${tech.email}`} className="flex items-center gap-2 hover:text-primary transition text-slate-600">
                    <Mail className="w-4 h-4 text-primary" />
                    <span>{tech.email}</span>
                  </a>
                </div>

                {/* Specialties */}
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">Service Specialties</span>
                  <div className="flex flex-wrap gap-1.5">
                    {tech.specialties.map(spec => (
                      <span key={spec} className="bg-slate-100 border border-slate-200 text-slate-600 rounded-lg px-2.5 py-1 text-[10px] font-semibold">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Active Workload */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Active Loads</span>
                  <span className="text-sm font-bold text-slate-800">{load} Scheduled Jobs</span>
                </div>
                
                {load > 2 ? (
                  <span className="flex items-center gap-1 text-[9px] font-bold uppercase text-amber-500 bg-amber-50 border border-amber-100 px-2.5 py-1 rounded-lg">
                    <AlertCircle className="w-3.5 h-3.5" /> High Load
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-[9px] font-bold uppercase text-green-600 bg-green-50 border border-green-100 px-2.5 py-1 rounded-lg">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Available
                  </span>
                )}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
export default Technicians;
