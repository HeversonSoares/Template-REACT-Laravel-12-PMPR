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
    LayoutTemplate,
    Moon,
    Sun,
    LayoutGrid
} from 'lucide-react';
import { Button } from './ui/button';

export default function Layout({ children }) {
    const location = useLocation();
    const navigate = useNavigate();
    const [isCollapsed, setIsCollapsed] = React.useState(false);
    const [isDark, setIsDark] = React.useState(false);
    const [isMobileOpen, setIsMobileOpen] = React.useState(false);

    React.useEffect(() => {
        const root = window.document.documentElement;
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            root.classList.add('dark');
            setIsDark(true);
        } else {
            root.classList.remove('dark');
            setIsDark(false);
        }
    }, []);

    // Close mobile menu on route change
    React.useEffect(() => {
        setIsMobileOpen(false);
    }, [location.pathname]);

    const toggleTheme = () => {
        const root = window.document.documentElement;
        if (isDark) {
            root.classList.remove('dark');
            localStorage.theme = 'light';
            setIsDark(false);
        } else {
            root.classList.add('dark');
            localStorage.theme = 'dark';
            setIsDark(true);
        }
    };

    const handleMenuClick = () => {
        if (window.innerWidth < 768) {
            setIsMobileOpen(!isMobileOpen);
        } else {
            setIsCollapsed(!isCollapsed);
        }
    };

    const navItems = [
        { path: '/area-de-trabalho', name: 'Área de Trabalho', icon: LayoutGrid },
        { path: '/', name: 'Hub', icon: Layers },
        { path: '/efetivo', name: 'Efetivo', icon: Users },
        { path: '/fleets', name: 'Frotas', icon: Truck },
        { path: '/templates', name: 'Modelos', icon: BookOpen },
        { path: '/settings', name: 'Configurações', icon: Settings },
    ];

    return (
        <div className="min-h-screen bg-background text-foreground font-sans flex overflow-hidden relative">
            {/* Mobile Sidebar Overlay */}
            {isMobileOpen && (
                <div 
                    className="fixed inset-0 bg-black/55 z-40 md:hidden backdrop-blur-sm transition-opacity duration-300"
                    onClick={() => setIsMobileOpen(false)}
                />
            )}

            {/* Narrow/Wide Dark Sidebar */}
            <aside className={`bg-sidebar flex flex-col items-center py-4 justify-between shrink-0 border-r border-sidebar-border transition-all duration-300 ease-in-out
                fixed md:relative inset-y-0 left-0 z-50
                ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
                ${isCollapsed ? 'md:w-16' : 'md:w-60'} w-64`}
            >
                {/* Top Icons */}
                <div className="flex flex-col items-center gap-4 w-full">
                    {/* Green & Gold Emblem Mock */}
                    <div className={`flex items-center gap-3 w-full px-3.5 mb-2 justify-start ${isCollapsed ? 'md:justify-center' : 'md:justify-start'}`}>
                        <img 
                            src="https://upload.wikimedia.org/wikipedia/commons/b/bc/Logo_PMPR_2.svg" 
                            alt="Logo PMPR" 
                            className="h-9 w-9 object-contain shrink-0"
                        />
                        <span className={`font-bold text-sidebar-primary-foreground text-[13px] tracking-wide uppercase truncate transition-all duration-200 ${isCollapsed ? 'md:hidden' : 'block'}`}>
                            SGA PMPR
                        </span>
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
                                    className={`h-11 flex items-center rounded-xl transition-all w-full justify-start px-3.5 ${
                                        isCollapsed ? 'md:justify-center md:px-0' : 'md:justify-start md:px-3.5'
                                    } ${
                                        isActive 
                                        ? 'bg-sidebar-accent text-sidebar-accent-foreground font-semibold' 
                                        : 'text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground'
                                    }`}
                                >
                                    <Icon className="h-5 w-5 shrink-0" />
                                    <span className={`ml-3 text-[13px] font-medium whitespace-nowrap truncate transition-all duration-200 ${isCollapsed ? 'md:hidden' : 'block'}`}>
                                        {item.name}
                                    </span>
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
                        className={`h-11 flex items-center rounded-xl text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-destructive transition-all w-full justify-start px-3.5 ${
                            isCollapsed ? 'md:justify-center md:px-0' : 'md:justify-start md:px-3.5'
                        }`}
                    >
                        <LogOut className="h-5 w-5 shrink-0" />
                        <span className={`ml-3 text-[13px] font-medium whitespace-nowrap truncate transition-all duration-200 ${isCollapsed ? 'md:hidden' : 'block'}`}>
                            Sair
                        </span>
                    </button>
                </div>
            </aside>

            {/* Main Outer Container */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top Bar */}
                <header className="h-14 bg-card border-b-2 border-amber-500 dark:border-b dark:border-border flex items-center justify-between px-4 shrink-0 shadow-sm z-30">
                    <div className="flex items-center gap-3 flex-1 overflow-hidden">
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-9 w-9 text-muted-foreground hover:bg-accent hover:text-accent-foreground shrink-0"
                            onClick={handleMenuClick}
                        >
                            <Menu className="h-5 w-5" />
                        </Button>
                    </div>

                    {/* Topbar Right Actions */}
                    <div className="flex items-center gap-2 shrink-0">
                        <Button 
                            variant="outline" 
                            size="icon" 
                            onClick={toggleTheme}
                            title={isDark ? "Modo claro" : "Modo escuro"}
                            className="h-9 w-9 rounded-full border border-border hover:bg-accent hover:text-accent-foreground text-muted-foreground shadow-none"
                        >
                            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                        </Button>

                        <Button variant="outline" size="icon" className="h-9 w-9 rounded-full border border-border hover:bg-accent hover:text-accent-foreground text-muted-foreground shadow-none hidden sm:inline-flex">
                            <UtensilsCrossed className="h-4 w-4" />
                        </Button>

                        <div className="relative">
                            <Button variant="outline" size="icon" className="h-9 w-9 rounded-full border border-border hover:bg-accent hover:text-accent-foreground text-muted-foreground shadow-none">
                                <Bell className="h-4 w-4" />
                                <span className="absolute bottom-1 right-1 h-4 w-4 rounded-full bg-primary text-[9px] font-bold text-primary-foreground flex items-center justify-center border border-background">
                                    1
                                </span>
                            </Button>
                        </div>

                        <Button variant="outline" size="icon" className="h-9 w-9 rounded-full border border-border hover:bg-accent hover:text-accent-foreground text-muted-foreground shadow-none hidden sm:inline-flex">
                            <Mail className="h-4 w-4" />
                        </Button>

                        <Button variant="outline" size="icon" className="h-9 w-9 rounded-full border border-border hover:bg-accent hover:text-accent-foreground text-muted-foreground shadow-none hidden sm:inline-flex">
                            <BookOpen className="h-4 w-4" />
                        </Button>

                        <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center text-sm shadow ml-1.5 cursor-pointer border border-background hover:opacity-90">
                            H
                        </div>
                    </div>
                </header>

                {/* Main Content Area */}
                <main className="flex-1 overflow-y-auto bg-muted/30">
                    {children}
                </main>
            </div>
        </div>
    );
}
