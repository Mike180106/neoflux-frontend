import { Outlet } from "react-router";
import { Sidebar } from "../Sidebar/Sidebar";

export const DashboardLayout = () => {
  return (
    <div
      className="flex min-h-screen gap-6 p-5 font-['Noto_Sans',sans-serif]"
      style={{
        background: "linear-gradient(160deg, #EDF4FE 0%, #E3ECFB 100%)",
      }}
    >
      <Sidebar />
      <main className="min-w-0 flex-1">
        <Outlet />
      </main>
    </div>
  );
};
