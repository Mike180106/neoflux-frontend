import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router";
import { router } from "./routes/routes";

const queryClient = new QueryClient();
// Crea una instancia del cliente de TanStack Query. Esta instancia es la que maneja toda la caché, las queries y las mutaciones de la app.

export const NeofluxApp = () => {
  return (
    <QueryClientProvider client={queryClient}>
      {/* Le dice a toda la app "este es el cliente de TanStack Query que deben
      usar". Sin este wrapper, ningún useQuery o useMutation funcionaría —
      lanzaría un error. */}
      <RouterProvider router={router} />{" "}
      {/* Activa React-router que configuramos*/}
    </QueryClientProvider>
  );
};
