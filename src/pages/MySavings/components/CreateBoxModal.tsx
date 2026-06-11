import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createBoxSchema,
  type CreateBoxFormValues,
} from "../schemas/createBoxSchema";
import {
  errorClass,
  inputClass,
  labelClass,
} from "../../Register/components/fieldStyles";
import { useCreateSavingsBox } from "../hooks/useCreateSavingsBox";

interface CreateBoxModalProps {
  onClose: () => void;
}

export const CreateBoxModal = ({ onClose }: CreateBoxModalProps) => {
  const createBox = useCreateSavingsBox();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateBoxFormValues>({
    resolver: zodResolver(createBoxSchema),
    defaultValues: { name: "" },
  });

  const onSubmit = handleSubmit((values) => {
    createBox.mutate(values.name, { onSuccess: onClose });
  });

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 px-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Crear una cajita"
        className="w-full max-w-xl rounded-2xl bg-white p-8"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Encabezado */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-[#1D1FDD]">+</span>
            <h2 className="text-sm font-bold text-gray-900">
              Crear una cajita ⓘ
            </h2>
          </div>
          <button
            type="button"
            aria-label="Cerrar"
            onClick={onClose}
            className="cursor-pointer text-gray-400 transition-colors hover:text-gray-600"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M6 6 18 18M18 6 6 18" />
            </svg>
          </button>
        </div>

        {/* Formulario */}
        <form onSubmit={onSubmit} className="mt-6">
          <label htmlFor="box-name" className={labelClass}>
            Nombre de la cajita <span className="text-[#1D1FDD]">*</span>
          </label>
          <input
            id="box-name"
            type="text"
            placeholder="Ej: Ahorro viajes"
            autoFocus
            className={inputClass}
            {...register("name")}
          />
          {errors.name && (
            <span className={errorClass}>{errors.name.message}</span>
          )}

          {createBox.isError && (
            <p className="mt-2 text-xs text-red-500">
              No se pudo crear la cajita, inténtalo de nuevo
            </p>
          )}

          {/* Acciones */}
          <div className="mt-6 grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={onClose}
              className="h-11 cursor-pointer rounded-full border border-[#1D1FDD] text-sm font-semibold text-[#1D1FDD] transition-colors hover:bg-[#1D1FDD]/5"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={createBox.isPending}
              className="h-11 cursor-pointer rounded-full bg-[#1D1FDD] text-sm font-semibold text-white transition-colors hover:bg-[#1517b8] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {createBox.isPending ? "Guardando..." : "Guardar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
