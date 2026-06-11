import { DashboardHeader } from "../../components/DashboardHeader";
import { HeroCard } from "./components/HeroCard";
import { SimulatorCard } from "./components/SimulatorCard";

export const RequestLoanPage = () => {
  return (
    <div className="flex flex-col gap-5">
      <DashboardHeader title="Solicitar préstamos" />
      <HeroCard />
      <SimulatorCard />
    </div>
  );
};
