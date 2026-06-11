import {
  FundIcon,
  HelpIcon,
  HomeIcon,
  LoanIcon,
  PiggyIcon,
  SettingsIcon,
  UsersIcon,
  WalletIcon,
} from "./sidebarIcons";

export interface MenuItem {
  to: string;
  label: string;
  icon: () => React.ReactNode;
  badge?: number;
}

export interface SidebarConfig {
  menuItems: MenuItem[];
  generalItems: MenuItem[];
  promo: { message: string; buttonLabel: string };
}

export const USER_SIDEBAR: SidebarConfig = {
  menuItems: [
    { to: "/home", label: "Home", icon: HomeIcon },
    { to: "/ahorro", label: "Mi ahorro", icon: PiggyIcon },
    {
      to: "/prestamos/solicitar",
      label: "Solicitar préstamos",
      icon: LoanIcon,
    },
    { to: "/prestamos", label: "Mis prestamos", icon: WalletIcon },
  ],
  generalItems: [
    { to: "/configuracion", label: "Configuración", icon: SettingsIcon },
    { to: "/ayuda", label: "Ayuda", icon: HelpIcon },
  ],
  promo: {
    message:
      "Solicita tu primer crédito con 98% de probabilidades de aprobación.",
    buttonLabel: "Solicitar",
  },
};

export const ADMIN_SIDEBAR: SidebarConfig = {
  menuItems: [
    { to: "/admin/home", label: "Home", icon: HomeIcon },
    { to: "/admin/socios", label: "Gestión de socios", icon: UsersIcon },
    { to: "/admin/fondo", label: "Configuración de fondo", icon: FundIcon },
    { to: "/admin/prestamos", label: "Gestión de préstamos", icon: LoanIcon },
    { to: "/admin/ahorros", label: "Gestión de ahorros", icon: PiggyIcon },
  ],
  generalItems: [
    { to: "/admin/configuracion", label: "Configuración", icon: SettingsIcon },
  ],
  promo: {
    message:
      "Revisa los préstamos en mora y realiza la gestión de estos usuarios.",
    buttonLabel: "Realizar gestión",
  },
};
