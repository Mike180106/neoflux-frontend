import { Link, useParams } from "react-router";
import { DashboardHeader } from "../../../components/DashboardHeader";
import { formatShortDate, formatUTCDate } from "../../../utils/formatDate";
import { ReviewField } from "../Loans/components/ReviewField";
import {
  useAdminUserDetail,
  useToggleUserStatus,
} from "./hooks/useAdminUsers";

const IDENTIFICATION_LABELS: Record<string, string> = {
  CC: "Cédula",
  CE: "Cédula de extranjería",
  PASSPORT: "Pasaporte",
};

export const UserDetailPage = () => {
  const { id = "" } = useParams();

  const userQuery = useAdminUserDetail(id);
  const toggleStatus = useToggleUserStatus();

  const user = userQuery.data;

  return (
    <div className="flex flex-col gap-5">
      <DashboardHeader title="Gestión de socios" />

      {/* Migas de pan */}
      <div className="flex items-center justify-between">
        <Link
          to="/admin/socios"
          aria-label="Volver a gestión de socios"
          className="text-[#1D1FDD] transition-opacity hover:opacity-70"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="9" />
            <path d="M13.5 8.5 10 12l3.5 3.5" />
          </svg>
        </Link>
        <p className="text-sm text-gray-900">
          <Link to="/admin/socios" className="text-sky-500 hover:underline">
            Gestión de socios
          </Link>{" "}
          &gt; Ver detalle de socio
        </p>
      </div>

      {userQuery.isLoading ? (
        <div className="flex h-64 items-center justify-center rounded-2xl bg-white/60">
          <p className="text-sm text-gray-400">Cargando el socio...</p>
        </div>
      ) : userQuery.isError || !user ? (
        <div className="flex h-64 items-center justify-center rounded-2xl bg-white/60">
          <p className="text-sm text-red-500">No se pudo cargar el socio</p>
        </div>
      ) : (
        <div className="rounded-2xl bg-white p-6">
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
              strokeLinejoin="round"
            >
              <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            <h2 className="text-sm font-bold text-gray-900">
              Ver detalle de socio ⓘ
            </h2>
          </div>

          {/* Identidad del socio */}
          <div className="mt-6 flex items-center gap-5">
            <span className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-[#DDDEFE] text-[#1D1FDD]">
              <svg
                width="44"
                height="44"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              >
                <circle cx="12" cy="8.5" r="4" />
                <path d="M4.5 20c.8-4 4-6 7.5-6s6.7 2 7.5 6" />
              </svg>
            </span>
            <div>
              <div className="flex items-center gap-3">
                <h3 className="text-3xl font-extrabold text-gray-900">
                  {user.firstName} {user.lastName}
                </h3>
                {user.isActive ? (
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-600">
                    Activo
                  </span>
                ) : (
                  <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-500">
                    Inactivo
                  </span>
                )}
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Trabaja en {user.company}
              </p>
            </div>
          </div>

          {/* Información personal */}
          <h3 className="mt-8 text-lg font-bold text-gray-900">
            Información personal
          </h3>
          <div className="mt-4 grid gap-x-8 gap-y-5 sm:grid-cols-2 xl:grid-cols-4">
            <ReviewField
              label="Fecha de nacimiento"
              value={formatUTCDate(user.birthDate)}
            />
            <ReviewField
              label="Tipo de identificación"
              value={
                IDENTIFICATION_LABELS[user.identificationType] ??
                user.identificationType
              }
            />
            <ReviewField
              label="# de identificación"
              value={user.identificationNumber}
            />
            <ReviewField
              label="Fecha de creación cuenta"
              value={formatShortDate(user.createdAt)}
            />
            <ReviewField label="Celular" value={user.phone} />
            <ReviewField label="Correo electrónico" value={user.email} />
            <ReviewField label="País" value={user.country} />
          </div>

          {/* Información laboral */}
          <h3 className="mt-8 text-lg font-bold text-gray-900">
            Información laboral
          </h3>
          <div className="mt-4 grid gap-x-8 gap-y-5 sm:grid-cols-2 xl:grid-cols-4">
            <ReviewField label="Empresa" value={user.company} />
          </div>

          {toggleStatus.isError && (
            <p className="mt-4 text-right text-sm text-red-500">
              No se pudo cambiar el estado del socio, inténtalo de nuevo
            </p>
          )}

          {/* Activar/inactivar según el estado actual */}
          <div className="mt-8 flex justify-end">
            <button
              type="button"
              disabled={toggleStatus.isPending}
              onClick={() => toggleStatus.mutate(user.id)}
              className="cursor-pointer rounded-full bg-[#1D1FDD] px-8 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1517b8] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {toggleStatus.isPending
                ? "Guardando..."
                : user.isActive
                  ? "Inactivar socio"
                  : "Activar socio"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
