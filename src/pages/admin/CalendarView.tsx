import React, { useState } from 'react';
import { useLeadData } from '../../context/LeadDataContext';
import { Calendar as CalendarIcon, Clock, User, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';

export const CalendarView: React.FC = () => {
  const { leads, technicians } = useLeadData();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDateStr, setSelectedDateStr] = useState(new Date().toISOString().split('T')[0]);

  // Generate calendar days for the active month
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();
    
    const days: (Date | null)[] = [];
    
    // Fill empty slots for first week offset
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    
    // Fill days
    for (let i = 1; i <= totalDays; i++) {
      days.push(new Date(year, month, i));
    }
    
    return days;
  };

  const days = getDaysInMonth(currentDate);
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  // Get scheduled leads for a specific date
  const getLeadsForDate = (dateStr: string) => {
    return leads.filter(l => l.status === 'Scheduled' && l.preferredDate === dateStr);
  };

  const selectedDateJobs = getLeadsForDate(selectedDateStr);

  return (
    <div className="space-y-6 text-left">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black font-heading text-slate-100 uppercase tracking-wide">
          Scheduling Calendar
        </h1>
        <p className="text-xs text-slate-500 mt-1">Plan and coordinate technician dispatch dates for Wichita area bookings.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Calendar Grid Box */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xs">
          
          {/* Calendar Header Controls */}
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold font-heading text-slate-200 uppercase tracking-wide">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h3>
            
            <div className="flex gap-2">
              <button 
                onClick={handlePrevMonth}
                className="p-2 border border-slate-800 hover:bg-slate-800/50 rounded-xl transition cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4 text-slate-300" />
              </button>
              <button 
                onClick={handleNextMonth}
                className="p-2 border border-slate-800 hover:bg-slate-800/50 rounded-xl transition cursor-pointer"
              >
                <ChevronRight className="w-4 h-4 text-slate-300" />
              </button>
            </div>
          </div>

          {/* Weekday Labels */}
          <div className="grid grid-cols-7 gap-2 text-center text-[10px] font-extrabold uppercase text-slate-400 mb-2">
            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-2">
            {days.map((day, idx) => {
              if (!day) return <div key={`empty-${idx}`} className="aspect-square bg-slate-800/50/50 rounded-xl border border-transparent" />;
              
              const dateStr = day.toISOString().split('T')[0];
              const isSelected = dateStr === selectedDateStr;
              const dateJobs = getLeadsForDate(dateStr);
              const isToday = new Date().toISOString().split('T')[0] === dateStr;

              return (
                <div 
                  key={dateStr}
                  onClick={() => setSelectedDateStr(dateStr)}
                  className={`aspect-square border rounded-xl p-1.5 flex flex-col justify-between cursor-pointer transition select-none ${
                    isSelected 
                      ? 'border-accent bg-accent/5 shadow-xs' 
                      : 'border-slate-700 bg-slate-900 hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className={`text-xs font-bold ${
                      isToday 
                        ? 'bg-primary text-white w-5 h-5 rounded-full flex items-center justify-center font-extrabold text-[10px]' 
                        : isSelected ? 'text-accent font-extrabold' : 'text-slate-200'
                    }`}>
                      {day.getDate()}
                    </span>
                    
                    {dateJobs.length > 0 && (
                      <span className="bg-primary text-white text-[8px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center leading-none">
                        {dateJobs.length}
                      </span>
                    )}
                  </div>

                  {/* Visual Indicator dots for technicians */}
                  <div className="flex gap-1 overflow-hidden h-1.5">
                    {dateJobs.map((job) => (
                      <span 
                        key={job.id} 
                        className="w-1.5 h-1.5 rounded-full bg-accent"
                        title={`${job.brand} ${job.applianceType}`}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Date Schedule Panel */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xs text-left">
            <div className="flex items-center gap-2 border-b pb-3 mb-4">
              <CalendarIcon className="w-5 h-5 text-accent" />
              <h3 className="font-bold font-heading text-slate-200 uppercase tracking-wide">
                Jobs Scheduled
              </h3>
            </div>
            
            <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-4">
              Date: {new Date(selectedDateStr + 'T00:00:00').toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <div className="space-y-4 max-h-[50vh] overflow-y-auto no-scrollbar">
              {selectedDateJobs.length > 0 ? (
                selectedDateJobs.map(job => {
                  const tech = technicians.find(t => t.id === job.assignedTechId);
                  return (
                    <div 
                      key={job.id}
                      className="border border-slate-700 bg-slate-800/50/50 rounded-xl p-3.5 space-y-2 relative overflow-hidden"
                    >
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent" />
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-slate-100 text-xs uppercase tracking-wide">{job.name}</h4>
                        <span className="text-[9px] font-extrabold bg-accent/15 text-accent px-2 py-0.5 rounded uppercase">
                          {job.id}
                        </span>
                      </div>
                      
                      <p className="text-xs font-semibold text-slate-300 uppercase">{job.brand} {job.applianceType}</p>
                      
                      <div className="space-y-1 text-[10px] text-slate-400">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span>{job.preferredTime}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          <span className="truncate">{job.address}, {job.city}</span>
                        </div>
                        {tech && (
                          <div className="flex items-center gap-1.5 font-bold text-slate-500 uppercase tracking-wider pt-1.5 border-t border-slate-800/50">
                            <User className="w-3.5 h-3.5 text-accent" />
                            <span>Tech: {tech.name}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="p-8 text-center text-slate-400 text-xs border border-dashed border-slate-800 rounded-xl">
                  No dispatch jobs scheduled for this date.
                </div>
              )}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
export default CalendarView;
