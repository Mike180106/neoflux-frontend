import { NavLink, useNavigate } from "react-router";
import logoDark from "../../assets/images/logo-dark.png";
import { useAuthStore } from "../../store/authStore";
import {
  CoinIcon,
  CollapseIcon,
  FundIcon,
  HelpIcon,
  HomeIcon,
  LoanIcon,
  LogoutIcon,
  PiggyIcon,
  SettingsIcon,
  UsersIcon,
  WalletIcon,
} from "./sidebarIcons";

interface MenuItem {
  to: string;
  label: string;
  icon: () => React.ReactNode;
  badge?: number;
}

interface SidebarConfig {
  menuItems: MenuItem[];
  generalItems: MenuItem[];
  promo: { message: string; buttonLabel: string };
}

const USER_SIDEBAR: SidebarConfig = {
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

const SidebarLink = ({ to, label, icon: Icon, badge }: MenuItem) => (
  <NavLink
    to={to}
    end={to === "/prestamos"}
    className={({ isActive }) =>
      `flex items-center gap-3 rounded-full px-4 py-2.5 text-sm transition-colors ${
        isActive
          ? "bg-[#B4B6FE] font-semibold text-gray-900"
          : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
      }`
    }
  >
    <Icon />
    <span className="flex-1">{label}</span>
    {badge !== undefined && (
      <span className="rounded-md border border-gray-300 px-1.5 py-0.5 text-xs text-gray-500">
        {badge}
      </span>
    )}
  </NavLink>
);

interface SidebarProps {
  config?: SidebarConfig;
}

export const Sidebar = ({ config = USER_SIDEBAR }: SidebarProps) => {
  const { menuItems, generalItems, promo } = config;
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="flex w-64 shrink-0 flex-col rounded-2xl bg-white p-4">
      {/* Logo + colapsar */}
      <div className="mb-8 flex items-center justify-between px-2 pt-2">
        <img src={logoDark} alt="Neoflux" className="h-8 w-auto object-contain" />
        <button
          type="button"
          aria-label="Colapsar menú"
          className="cursor-pointer text-gray-400 hover:text-gray-600"
        >
          <CollapseIcon />
        </button>
      </div>

      {/* Menú */}
      <p className="mb-3 px-4 text-sm text-gray-400">Menú</p>
      <nav className="flex flex-col gap-1.5">
        {menuItems.map((item) => (
          <SidebarLink key={item.to} {...item} />
        ))}
      </nav>

      {/* General */}
      <p className="mt-8 mb-3 px-4 text-sm text-gray-400">General</p>
      <nav className="flex flex-col gap-1.5">
        {generalItems.map((item) => (
          <SidebarLink key={item.to} {...item} />
        ))}
        <button
          type="button"
          onClick={handleLogout}
          className="flex cursor-pointer items-center gap-3 rounded-full px-4 py-2.5 text-sm text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
        >
          <LogoutIcon />
          Cerrar sesión
        </button>
      </nav>

      {/* Tarjeta promocional */}
      <div
        className="mt-auto rounded-2xl p-5 text-white"
        style={{
          background: "linear-gradient(160deg, #BFD9FF 0%, #8E8FFB 60%, #7B7CF8 100%)",
        }}
      >
        <CoinIcon />
        <p className="mt-3 text-sm leading-snug font-bold">{promo.message}</p>
        <p className="mt-2 text-[10px] text-white/80">
          Aplican términos y condiciones
        </p>
        <button
          type="button"
          className="mt-4 h-10 w-full cursor-pointer rounded-full bg-[#1D1FDD] text-sm font-semibold text-white transition-colors hover:bg-[#1517b8]"
        >
          {promo.buttonLabel}
        </button>
      </div>
    </aside>
  );
};
