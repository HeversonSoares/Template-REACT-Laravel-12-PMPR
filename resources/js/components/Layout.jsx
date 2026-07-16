import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
    LayoutDashboard, 
    LogOut, 
    Shield, 
    Settings, 
    User,
    Menu,
    Users,
    Truck,
    Layers,
    Bell,
    Mail,
    BookOpen,
    HelpCircle,
    UtensilsCrossed,
    FileText,
    LayoutTemplate
} from 'lucide-react';
import { Button } from './ui/button';

export default function Layout({ children }) {
    const location = useLocation();
    const navigate = useNavigate();
    const [isCollapsed, setIsCollapsed] = React.useState(false);

    const navItems = [
        { path: '/', name: 'Hub', icon: Layers },
        { path: '/hr', name: 'Efetivo', icon: Users },
        { path: '/fleets', name: 'Frotas', icon: Truck },
        { path: '/templates', name: 'Modelos', icon: BookOpen },
        { path: '/settings', name: 'Configurações', icon: Settings },
    ];

    return (
        <div className="min-h-screen bg-slate-100 text-slate-900 font-sans flex overflow-hidden">
            {/* Narrow/Wide Dark Sidebar */}
            <aside className={`bg-[#343a40] flex flex-col items-center py-4 justify-between shrink-0 z-20 border-r border-slate-700/50 transition-all duration-350 ease-in-out ${isCollapsed ? 'w-16' : 'w-60'}`}>
                {/* Top Icons */}
                <div className="flex flex-col items-center gap-4 w-full">
                    {/* Green & Gold Emblem Mock */}
                    <div className={`flex items-center gap-3 w-full px-3.5 mb-2 ${isCollapsed ? 'justify-center' : 'justify-start'}`}>
                        <img 
                            src="https://upload.wikimedia.org/wikipedia/commons/b/bc/Logo_PMPR_2.svg" 
                            alt="Logo PMPR" 
                            className="h-9 w-9 object-contain shrink-0"
                        />
                        {!isCollapsed && (
                            <span className="font-bold text-white text-[13px] tracking-wide uppercase truncate transition-all duration-200">
                                SGA PMPR
                            </span>
                        )}
                    </div>

                    <div className="flex flex-col gap-1 w-full px-2.5">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = location.pathname === item.path;
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    title={isCollapsed ? item.name : undefined}
                                    className={`h-11 flex items-center rounded-xl transition-all w-full ${
                                        isCollapsed ? 'justify-center' : 'justify-start px-3.5'
                                    } ${
                                        isActive 
                                        ? 'bg-white/10 text-white font-semibold' 
                                        : 'text-slate-300 hover:bg-white/5 hover:text-white'
                                    }`}
                                >
                                    <Icon className="h-5 w-5 shrink-0" />
                                    {!isCollapsed && (
                                        <span className="ml-3 text-[13px] font-medium whitespace-nowrap truncate transition-all duration-200">
                                            {item.name}
                                        </span>
                                    )}
                                </Link>
                            );
                        })}
                    </div>
                </div>

                {/* Bottom Logout */}
                <div className="w-full px-2.5">
                    <button 
                        onClick={() => navigate('/login')}
                        title={isCollapsed ? "Sair" : undefined}
                        className={`h-11 flex items-center rounded-xl text-slate-300 hover:bg-white/5 hover:text-rose-400 transition-all w-full ${
                            isCollapsed ? 'justify-center' : 'justify-start px-3.5'
                        }`}
                    >
                        <LogOut className="h-5 w-5 shrink-0" />
                        {!isCollapsed && (
                            <span className="ml-3 text-[13px] font-medium whitespace-nowrap truncate">
                                Sair
                            </span>
                        )}
                    </button>
                </div>
            </aside>

            {/* Main Outer Container */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top Bar */}
                <header className="h-14 bg-white border-b-2 border-amber-500 flex items-center justify-between px-4 shrink-0 shadow-sm z-30">
                    <div className="flex items-center gap-3 flex-1 overflow-hidden">
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-9 w-9 text-slate-650 hover:bg-slate-100 shrink-0"
                            onClick={() => setIsCollapsed(!isCollapsed)}
                        >
                            <Menu className="h-5 w-5" />
                        </Button>
                    </div>

                    {/* Topbar Right Actions */}
                    <div className="flex items-center gap-2 shrink-0">
                        <Button variant="outline" size="icon" className="h-9 w-9 rounded-full border border-slate-200 hover:bg-slate-50 text-slate-600 shadow-none">
                            <UtensilsCrossed className="h-4 w-4" />
                        </Button>

                        <div className="relative">
                            <Button variant="outline" size="icon" className="h-9 w-9 rounded-full border border-slate-200 hover:bg-slate-50 text-slate-600 shadow-none">
                                <Bell className="h-4 w-4" />
                                <span className="absolute bottom-1 right-1 h-4 w-4 rounded-full bg-blue-600 text-[9px] font-bold text-white flex items-center justify-center border border-white">
                                    1
                                </span>
                            </Button>
                        </div>

                        <Button variant="outline" size="icon" className="h-9 w-9 rounded-full border border-slate-200 hover:bg-slate-50 text-slate-600 shadow-none">
                            <Mail className="h-4 w-4" />
                        </Button>

                        <Button variant="outline" size="icon" className="h-9 w-9 rounded-full border border-slate-200 hover:bg-slate-50 text-slate-600 shadow-none">
                            <BookOpen className="h-4 w-4" />
                        </Button>

                        <div className="h-8 w-8 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-sm shadow ml-1.5 cursor-pointer border border-white hover:opacity-90">
                            H
                        </div>
                    </div>
                </header>

                {/* Main Content Area */}
                <main className="flex-1 overflow-y-auto bg-slate-50">
                    {children}
                </main>
            </div>
        </div>
    );
}
