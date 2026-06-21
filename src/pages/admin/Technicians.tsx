import React, { useState } from 'react';
import { useLeadData } from '../../context/LeadDataContext';
import { Phone, Mail, Star, CheckCircle2, AlertCircle, Plus, X, User } from 'lucide-react';

export const Technicians: React.FC = () => {
  const { technicians, leads, addTechnician } = useLeadData();
  const [modalOpen, setModalOpen] = useState(false);
  
  // Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [specialtyInput, setSpecialtyInput] = useState('');
  const [specialties, setSpecialties] = useState<string[]>([]);
  const [status, setStatus] = useState<'active' | 'inactive'>('active');

  const getTechLoad = (techId: string) => {
    return leads.filter(l => l.assignedTechId === techId && l.status === 'Scheduled').length;
  };

  const handleAddSpecialty = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && specialtyInput.trim()) {
      e.preventDefault();
      if (!specialties.includes(specialtyInput.trim())) {
        setSpecialties([...specialties, specialtyInput.trim()]);
      }
      setSpecialtyInput('');
    }
  };

  const removeSpecialty = (indexToRemove: number) => {
    setSpecialties(specialties.filter((_, i) => i !== indexToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !email) return;
    
    await addTechnician({
      name,
      phone,
      email,
      specialties: specialties.length > 0 ? specialties : ['General Appliances'],
      status
    });

    // Reset Form
    setName('');
    setPhone('');
    setEmail('');
    setSpecialties([]);
    setModalOpen(false);
  };

  return (
    <div className="space-y-6 text-left">
      
      {/* Header */}
      <div className="flex justify-between items-center border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl font-black font-heading text-white uppercase tracking-wide">
            Technicians Directory
          </h1>
          <p className="text-xs text-slate-400 mt-1">Manage active field service staff, service specialties, and workloads.</p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-900/400 text-white font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl transition cursor-pointer shadow-lg shadow-blue-500/20"
        >
          <Plus className="w-4 h-4" /> Add Technician
        </button>
      </div>

      {/* Grid of Tech Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {technicians.map(tech => {
          const load = getTechLoad(tech.id);
          
          return (
            <div 
              key={tech.id} 
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between"
            >
              <div>
                {/* Tech Title & Status */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-900/400/10 text-blue-400 rounded-xl flex items-center justify-center font-bold text-sm border border-blue-500/20">
                      {tech.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold font-heading text-white uppercase tracking-wide">
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
                      ? 'bg-green-900/400/10 text-green-400 border border-green-500/20' 
                      : 'bg-slate-850 text-slate-500 border border-slate-800'
                  }`}>
                    {tech.status}
                  </span>
                </div>

                {/* Tech Details */}
                <div className="space-y-2 text-xs text-slate-400 border-t border-slate-800 pt-4">
                  <a href={`tel:${tech.phone}`} className="flex items-center gap-2 hover:text-blue-400 transition font-semibold text-slate-300">
                    <Phone className="w-4 h-4 text-blue-500 fill-blue-500" />
                    <span>{tech.phone}</span>
                  </a>
                  <a href={`mailto:${tech.email}`} className="flex items-center gap-2 hover:text-blue-400 transition text-slate-300">
                    <Mail className="w-4 h-4 text-blue-400" />
                    <span>{tech.email}</span>
                  </a>
                </div>

                {/* Specialties */}
                <div className="mt-4 pt-4 border-t border-slate-800">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-2">Service Specialties</span>
                  <div className="flex flex-wrap gap-1.5">
                    {tech.specialties.map(spec => (
                      <span key={spec} className="bg-slate-850 border border-slate-800 text-slate-300 rounded-lg px-2.5 py-1 text-[10px] font-semibold">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Active Workload */}
              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Active Loads</span>
                  <span className="text-sm font-bold text-white">{load} Scheduled Jobs</span>
                </div>
                
                {load > 2 ? (
                  <span className="flex items-center gap-1 text-[9px] font-bold uppercase text-amber-400 bg-amber-900/400/10 border border-amber-500/20 px-2.5 py-1 rounded-lg">
                    <AlertCircle className="w-3.5 h-3.5" /> High Load
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-[9px] font-bold uppercase text-green-400 bg-green-900/400/10 border border-green-500/20 px-2.5 py-1 rounded-lg">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Available
                  </span>
                )}
              </div>

            </div>
          );
        })}
      </div>

      {/* Add Technician Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-slate-800 flex justify-between items-center">
              <h2 className="text-lg font-black font-heading text-white uppercase tracking-wide flex items-center gap-2">
                <User className="w-5 h-5 text-blue-500" /> Add New Technician
              </h2>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="e.g. Robert Smith"
                  className="w-full bg-slate-800 border border-slate-700 text-white text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="(316) 555-0199"
                    className="w-full bg-slate-800 border border-slate-700 text-white text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="name@neesrepair.xyz"
                    className="w-full bg-slate-800 border border-slate-700 text-white text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                  Specialties (Press Enter to Add)
                </label>
                <input
                  type="text"
                  value={specialtyInput}
                  onChange={e => setSpecialtyInput(e.target.value)}
                  onKeyDown={handleAddSpecialty}
                  placeholder="e.g. Washers, AC Repair"
                  className="w-full bg-slate-800 border border-slate-700 text-white text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition"
                />
                
                {specialties.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2.5">
                    {specialties.map((spec, i) => (
                      <span key={spec} className="bg-slate-800 border border-slate-700 text-blue-400 rounded-lg px-2 py-0.5 text-[10px] font-bold flex items-center gap-1">
                        {spec}
                        <button type="button" onClick={() => removeSpecialty(i)} className="hover:text-red-400 cursor-pointer">
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                  Initial Status
                </label>
                <select
                  value={status}
                  onChange={e => setStatus(e.target.value as 'active' | 'inactive')}
                  className="w-full bg-slate-800 border border-slate-700 text-white text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <div className="pt-4 border-t border-slate-800 flex gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="flex-1 bg-slate-800 hover:bg-slate-750 text-white font-bold text-xs uppercase tracking-wider py-3 rounded-xl transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-900/400 text-white font-bold text-xs uppercase tracking-wider py-3 rounded-xl transition cursor-pointer shadow-lg shadow-blue-500/20"
                >
                  Add Staff
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Technicians;
