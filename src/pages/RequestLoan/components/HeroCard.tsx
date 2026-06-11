import { Link } from "react-router";

export const HeroCard = () => {
  return (
    <div className="grid gap-8 rounded-2xl bg-white p-6 lg:grid-cols-[1.2fr_1fr]">
      <div>
        {/* Encabezado */}
        <div className="flex items-center gap-2">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#1D1FDD"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v10M9.5 9.5h3.75a1.75 1.75 0 1 1 0 3.5h-2.5a1.75 1.75 0 1 0 0 3.5h3.75" />
          </svg>
          <h2 className="text-sm font-bold text-gray-900">
            Solicitar préstamos ⓘ
          </h2>
        </div>

        <h3 className="mt-4 text-lg font-bold text-gray-900">
          Solicita tu crédito con total claridad
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-gray-500">
          Accede a una estructura de amortización fija (sistema francés) con
          tasas competitivas desde el 1.2% M.V., diseñadas para proteger tu
          flujo de caja mensual.
          <br />
          En NEOFLUX, calculamos tu Costo Financiero Total de forma integral,
          permitiéndote un apalancamiento seguro, con la flexibilidad de
          realizar abonos a capital sin penalizaciones y garantizando que
          siempre tengas el control absoluto.
        </p>
      </div>

      {/* Llamado a la acción */}
      <div className="flex flex-col items-center justify-center gap-3">
        <p className="text-lg font-bold text-gray-900">¿Listo para empezar?</p>
        <Link
          to="/prestamos/solicitar/formulario"
          className="flex w-full max-w-72 items-center justify-center gap-2 rounded-full bg-[#1D1FDD] py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1517b8]"
        >
          Solicitar ahora
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
        <p className="text-xs text-gray-400">Proceso 100% seguro y cifrado</p>
      </div>
    </div>
  );
};
