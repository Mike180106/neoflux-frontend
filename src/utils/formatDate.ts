// "2026-06-11T00:36:18.108Z" -> "11-06-2026"
export const formatShortDate = (value: string) =>
  new Date(value)
    .toLocaleDateString("es-CO", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    .replaceAll("/", "-");

// Para fechas de solo día (ej. nacimiento): se formatean en UTC para que
// la zona horaria local no las corra al día anterior
export const formatUTCDate = (value: string) =>
  new Date(value)
    .toLocaleDateString("es-CO", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      timeZone: "UTC",
    })
    .replaceAll("/", "-");

// "2026-06-11T00:36:18.108Z" -> "7:36 pm"
export const formatTime = (value: string) =>
  new Date(value)
    .toLocaleTimeString("es-CO", { hour: "numeric", minute: "2-digit" })
    // Intl separa "a. m."/"p. m." con espacios no separables (U+202F/U+00A0)
    .replace(/[\u202f\u00a0]/g, " ")
    .replace("a. m.", "am")
    .replace("p. m.", "pm");
