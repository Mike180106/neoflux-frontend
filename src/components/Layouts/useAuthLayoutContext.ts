import { useOutletContext } from "react-router";

export interface AuthLayoutContext {
  setPanelMessage: (message: string) => void;
}

// Hook para que las páginas hijas (Login/Register) cambien el mensaje del panel
export const useAuthLayoutContext = () =>
  useOutletContext<AuthLayoutContext>();
