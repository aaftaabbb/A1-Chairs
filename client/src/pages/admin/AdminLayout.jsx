import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { Menu, X, Package, FolderOpen, Images, Inbox, LayoutDashboard, LogOut, ExternalLink } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const adminLinks = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/products', label: 'Products', icon: Package },
  { to: '/admin/categories', label: 'Categories', icon: FolderOpen },
  { to: '/admin/gallery', label: 'Gallery', icon: Images },
  { to: '/admin/enquiries', label: 'Enquiries', icon: Inbox }
];

const AdminLayout = () => {
  const { username, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  const sidebar = (
    <div className="w-64 bg-ink-950 text-paper-300 flex flex-col h-full">
      <div className="flex items-center gap-2 px-5 h-16 border-b border-ink-800 shrink-0">
        <span className="w-9 h-9 rounded-lg bg-rust-700 text-white flex items-center justify-center font-display font-semibold">A1</span>
        <div className="leading-tight">
          <p className="text-white font-display font-medium">Admin Panel</p>
          <p className="text-[11px] text-paper-500">A1 Chairs</p>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {adminLinks.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive ? 'bg-rust-700 text-white' : 'hover:bg-ink-800 hover:text-white'
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
        <a
          href="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-ink-800 hover:text-white transition-colors"
        >
          <ExternalLink size={18} />
          View Website
        </a>
      </nav>

      <div className="px-4 py-4 border-t border-ink-800 shrink-0">
        <p className="text-sm text-paper-500 mb-2">Signed in as <span className="text-white font-medium">{username}</span></p>
        <button
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium bg-ink-800 hover:bg-rust-700 hover:text-white transition-colors"
        >
          <LogOut size={16} /> Logout
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-paper-100 flex">
      {/* Desktop sidebar */}
      <aside className="hidden lg:block fixed inset-y-0 left-0 z-30">{sidebar}</aside>

      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          <div className="fixed inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <div className="relative">{sidebar}</div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-lg bg-white/10 text-white"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>
      )}

      <div className="flex-1 lg:ml-64 flex flex-col min-w-0">
        {/* Mobile topbar */}
        <header className="lg:hidden bg-white shadow-sm h-14 flex items-center px-4 gap-3">
          <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-lg hover:bg-gray-100" aria-label="Open menu">
            <Menu size={22} />
          </button>
          <span className="font-bold text-gray-900">Admin Panel</span>
          <Link to="/admin/dashboard" className="ml-auto text-xs text-brand-600 font-medium">Dashboard</Link>
        </header>

        <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;