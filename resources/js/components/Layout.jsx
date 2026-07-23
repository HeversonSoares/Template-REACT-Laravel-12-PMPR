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
    Moon,
    Sun,
    X,
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
    useSidebar,
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
    const { isMobile, setOpenMobile } = useSidebar();

    return (
        <Sidebar collapsible="icon">
            {/* ── Logo ──────────────────────────────────────────── */}
            <SidebarHeader className="p-2.5">
                <div className="flex items-center justify-between overflow-hidden">
                    <div className="flex items-center gap-2.5 overflow-hidden group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:w-full">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/b/bc/Logo_PMPR_2.svg"
                            alt="Logo PMPR"
                            className="h-10 w-10 object-contain shrink-0"
                        />
                        <span className="font-bold text-sidebar-primary-foreground text-[14px] tracking-wide uppercase truncate group-data-[collapsible=icon]:hidden">
                            SGA PMPR
                        </span>
                    </div>

                    {isMobile && (
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-sidebar-foreground/70 hover:text-sidebar-foreground md:hidden"
                            onClick={() => setOpenMobile(false)}
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    )}
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

            {/* ── Profile & Footer Actions ─────────────────────── */}
            <SidebarFooter className="p-3 border-t border-sidebar-border gap-2 group-data-[collapsible=icon]:p-2">
                {/* Mobile Profile Info */}
                <div className="flex md:hidden items-center gap-3 px-2 py-1.5 overflow-hidden">
                    <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center text-sm shadow shrink-0">
                        H
                    </div>
                    <div className="flex flex-col min-w-0">
                        <span className="font-semibold text-[13px] text-sidebar-foreground truncate uppercase tracking-wide">
                            HEVERSON SOARES GOMES
                        </span>
                        <span className="text-[11px] text-sidebar-foreground/70 truncate">
                            heverson.gomes@pm.pr.gov.br
                        </span>
                    </div>
                </div>

                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            tooltip="Sair do Sistema"
                            onClick={() => navigate('/login')}
                            className="text-sidebar-foreground hover:text-destructive"
                        >
                            <LogOut className="shrink-0" />
                            <span>Sair do Sistema</span>
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
                        <SidebarTrigger className="hidden md:inline-flex h-9 w-9 text-muted-foreground" />
                        <div className="flex md:hidden items-center gap-2 shrink-0">
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/b/bc/Logo_PMPR_2.svg"
                                alt="Logo PMPR"
                                className="h-8 w-8 object-contain shrink-0"
                            />
                            <span className="font-bold text-foreground text-[14px] tracking-wide uppercase truncate">
                                SGA PMPR
                            </span>
                        </div>
                    </div>

                    {/* Topbar Right Actions */}
                    <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={toggleTheme}
                            title={isDark ? 'Modo claro' : 'Modo escuro'}
                            className="h-9 w-9 rounded-full border border-border hover:bg-accent hover:text-accent-foreground text-muted-foreground shadow-none"
                        >
                            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
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
                            className="h-9 w-9 rounded-full border border-border hover:bg-accent hover:text-accent-foreground text-muted-foreground shadow-none"
                        >
                            <Mail className="h-4 w-4" />
                        </Button>

                        {/* Desktop Profile Avatar */}
                        <div className="hidden md:flex h-8 w-8 rounded-full bg-primary text-primary-foreground font-bold items-center justify-center text-sm shadow ml-1.5 cursor-pointer border border-background hover:opacity-90">
                            H
                        </div>

                        <SidebarTrigger className="md:hidden h-9 w-9 text-muted-foreground" />
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

