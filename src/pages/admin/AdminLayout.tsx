import React, { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { useLeadData } from '../../context/LeadDataContext';
import { 
  LayoutDashboard, Kanban, Calendar, Users, FileText, Settings, 
  Bell, LogOut, Menu, X, ShieldAlert, Star
} from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const { notifications, markNotificationsAsRead } = useLeadData();
  const location = useLocation();

  const unreadNotifications = notifications.filter(n => !n.read);

  const menuItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Leads Pipeline', path: '/admin/leads', icon: Kanban },
    { name: 'Scheduling Calendar', path: '/admin/calendar', icon: Calendar },
    { name: 'Technicians', path: '/admin/technicians', icon: Users },
    { name: 'Invoices', path: '/admin/invoices', icon: FileText },
    { name: 'Reviews', path: '/admin/reviews', icon: Star },
    { name: 'Settings', path: '/admin/settings', icon: Settings }
  ];

  const handleNotificationClick = () => {
    setNotificationsOpen(!notificationsOpen);
    if (!notificationsOpen && unreadNotifications.length > 0) {
      markNotificationsAsRead();
    }
  };

  return (
    <div className="flex h-screen bg-slate-950 font-sans text-left text-slate-200">
      
      {/* Sidebar Navigation */}
      <aside 
        className={`bg-slate-900 text-slate-300 w-64 flex flex-col justify-between transition-all duration-300 z-30 absolute md:static inset-y-0 left-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:w-0 md:opacity-0 overflow-hidden'
        }`}
      >
        <div>
          {/* Admin Header Logo */}
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            <Link to="/" className="flex flex-col text-left">
              <div className="text-lg font-black font-heading tracking-wider text-white leading-none">
                RICK NEES
              </div>
              <div className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                LEAD MATRIX CRM
              </div>
            </Link>
            <button className="md:hidden text-slate-400 hover:text-white" onClick={() => setSidebarOpen(false)}>
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav Links */}
          <nav className="p-4 space-y-1">
            {menuItems.map(item => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition ${
                    isActive 
                      ? 'bg-accent text-white font-bold' 
                      : 'hover:bg-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Icon className="w-4.5 h-4.5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-800">
          <Link 
            to="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <LogOut className="w-4.5 h-4.5" />
            <span>Exit to Site</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Workspace */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* Top Navbar */}
        <header className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6 z-20">
          <div className="flex items-center gap-4">
            <button 
              className="text-slate-400 hover:text-white cursor-pointer"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu className="w-5 h-5" />
            </button>
            <h2 className="text-base font-bold text-white uppercase tracking-wide hidden sm:block">
              Rick Nees Appliance Repair Administration
            </h2>
          </div>

          <div className="flex items-center gap-4 relative">
            
            {/* Notifications Button */}
            <button 
              onClick={handleNotificationClick}
              className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-50 rounded-xl relative cursor-pointer"
            >
              <Bell className="w-5 h-5" />
              {unreadNotifications.length > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent rounded-full animate-ping" />
              )}
            </button>

            {/* User Profile Info */}
            <div className="flex items-center gap-2 border-l pl-4 border-slate-800">
              <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold text-xs">
                RN
              </div>
              <div className="hidden md:block leading-tight text-xs">
                <p className="font-semibold text-white">Rick Nees</p>
                <p className="text-[10px] text-slate-400 uppercase font-bold">Owner / Admin</p>
              </div>
            </div>

            {/* Notifications Dropdown Panel */}
            {notificationsOpen && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-slate-200 rounded-2xl shadow-xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="p-3 border-b border-slate-100 flex justify-between items-center">
                  <span className="font-bold text-slate-700 text-xs uppercase tracking-wide">Notifications</span>
                  {unreadNotifications.length > 0 && (
                    <span className="bg-accent/10 text-accent text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase">
                      {unreadNotifications.length} New
                    </span>
                  )}
                </div>
                <div className="max-h-64 overflow-y-auto no-scrollbar py-1">
                  {notifications.length > 0 ? (
                    notifications.map(notif => (
                      <div 
                        key={notif.id}
                        className={`p-3 rounded-xl mb-1 text-xs hover:bg-slate-50 transition border ${
                          notif.read ? 'border-transparent text-slate-500' : 'border-slate-100 bg-slate-50/50 text-slate-800'
                        }`}
                      >
                        <div className="flex justify-between font-semibold items-center mb-1">
                          <span className="flex items-center gap-1.5 text-primary text-[10px] uppercase font-bold">
                            <ShieldAlert className="w-3.5 h-3.5 text-accent" /> {notif.title}
                          </span>
                          <span className="text-[8px] text-slate-400">{new Date(notif.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                        </div>
                        <p className="leading-normal text-slate-600">{notif.message}</p>
                      </div>
                    ))
                  ) : (
                    <div className="p-6 text-center text-slate-400 text-xs">
                      No notifications recorded.
                    </div>
                  )}
                </div>
              </div>
            )}

          </div>
        </header>

        {/* Content Body Router Outlet */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-slate-950">
          <Outlet />
        </main>

      </div>
    </div>
  );
};
export default AdminLayout;
