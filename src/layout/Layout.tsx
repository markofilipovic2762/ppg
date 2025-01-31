import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "../components/Navbar";

const queryClient = new QueryClient();

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Navbar />
      <main
        className="flex justify-center items-center min-h-screen relative bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('fuel.webp')",
        }}
      >
        {/* Overlay koji zatamnjuje pozadinu */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Children ostaje vidljiv i interaktivan */}
        <div className="z-10 container">{children}</div>
      </main>
    </QueryClientProvider>
  );
};
