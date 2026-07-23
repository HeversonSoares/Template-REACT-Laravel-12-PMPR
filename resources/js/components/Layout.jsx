import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
    LayoutGrid,
    Layers,
    Users,
    Truck,
    CodeXml,
    Settings,
    LogOut,
    Bell,
    Mail,
    BookOpen,
    UtensilsCrossed,
    Moon,
    Sun,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarInset,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarTrigger,
    SidebarRail,
} from '@/components/ui/sidebar';

const navItems = [
    { path: '/area-de-trabalho', name: 'Área de Trabalho', icon: LayoutGrid },
    { path: '/',                 name: 'Hub',              icon: Layers },
    { path: '/efetivo',          name: 'Efetivo',          icon: Users },
    { path: '/fleets',           name: 'Frotas',           icon: Truck },
    { path: '/templates',        name: 'Desenvolvimento',  icon: CodeXml },
    { path: '/settings',         name: 'Configurações',    icon: Settings },
];

function AppSidebar() {
    const location = useLocation();
    const navigate  = useNavigate();

    return (
        <Sidebar collapsible="icon">
            {/* ── Logo ──────────────────────────────────────────── */}
            <SidebarHeader className="p-2.5">
                <div className="flex items-center gap-2.5 overflow-hidden group-data-[collapsible=icon]:justify-center">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/b/bc/Logo_PMPR_2.svg"
                        alt="Logo PMPR"
                        className="h-8 w-8 object-contain shrink-0"
                    />
                    <span className="font-bold text-sidebar-primary-foreground text-[14px] tracking-wide uppercase truncate group-data-[collapsible=icon]:hidden">
                        SGA PMPR
                    </span>
                </div>
            </SidebarHeader>

            {/* ── Nav Items ─────────────────────────────────────── */}
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {navItems.map(({ path, name, icon: Icon }) => (
                                <SidebarMenuItem key={path}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={location.pathname === path}
                                        tooltip={name}
                                    >
                                        <Link to={path}>
                                            <Icon className="shrink-0" />
                                            <span>{name}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            {/* ── Logout ────────────────────────────────────────── */}
            <SidebarFooter className="p-2">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            tooltip="Sair"
                            onClick={() => navigate('/login')}
                            className="text-sidebar-foreground hover:text-destructive"
                        >
                            <LogOut className="shrink-0" />
                            <span>Sair</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>

            <SidebarRail />
        </Sidebar>
    );
}

export default function Layout({ children }) {
    const [isDark, setIsDark] = React.useState(false);

    React.useEffect(() => {
        const root = window.document.documentElement;
        if (
            localStorage.theme === 'dark' ||
            (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
        ) {
            root.classList.add('dark');
            setIsDark(true);
        } else {
            root.classList.remove('dark');
            setIsDark(false);
        }
    }, []);

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

    return (
        <SidebarProvider defaultOpen={true}>
            <AppSidebar />

            {/* SidebarInset é o container principal que se ajusta automaticamente
                à largura do sidebar (expandido ou colapsado) */}
            <SidebarInset className="overflow-hidden">
                {/* Top Bar */}
                <header className="h-14 bg-card border-b-2 border-amber-500 dark:border-b dark:border-border flex items-center justify-between px-4 shrink-0 shadow-sm">
                    <div className="flex items-center gap-3 flex-1 overflow-hidden">
                        <SidebarTrigger className="h-9 w-9 text-muted-foreground" />
                    </div>

                    {/* Topbar Right Actions */}
                    <div className="flex items-center gap-2 shrink-0">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={toggleTheme}
                            title={isDark ? 'Modo claro' : 'Modo escuro'}
                            className="h-9 w-9 rounded-full border border-border hover:bg-accent hover:text-accent-foreground text-muted-foreground shadow-none"
                        >
                            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                        </Button>

                        <Button
                            variant="outline"
                            size="icon"
                            className="h-9 w-9 rounded-full border border-border hover:bg-accent hover:text-accent-foreground text-muted-foreground shadow-none hidden sm:inline-flex"
                        >
                            <UtensilsCrossed className="h-4 w-4" />
                        </Button>

                        <div className="relative">
                            <Button
                                variant="outline"
                                size="icon"
                                className="h-9 w-9 rounded-full border border-border hover:bg-accent hover:text-accent-foreground text-muted-foreground shadow-none"
                            >
                                <Bell className="h-4 w-4" />
                                <span className="absolute bottom-1 right-1 h-4 w-4 rounded-full bg-primary text-[9px] font-bold text-primary-foreground flex items-center justify-center border border-background">
                                    1
                                </span>
                            </Button>
                        </div>

                        <Button
                            variant="outline"
                            size="icon"
                            className="h-9 w-9 rounded-full border border-border hover:bg-accent hover:text-accent-foreground text-muted-foreground shadow-none hidden sm:inline-flex"
                        >
                            <Mail className="h-4 w-4" />
                        </Button>

                        <Button
                            variant="outline"
                            size="icon"
                            className="h-9 w-9 rounded-full border border-border hover:bg-accent hover:text-accent-foreground text-muted-foreground shadow-none hidden sm:inline-flex"
                        >
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
            </SidebarInset>
        </SidebarProvider>
    );
}

