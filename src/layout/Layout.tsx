import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PrimeReactProvider } from "primereact/api";
import Navbar from "../components/Navbar";
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css flex
import "primeicons/primeicons.css"; //icons
// import 'primeflex/primeflex.css'; // flex
import { addLocale, locale } from "primereact/api";
import { sr } from "../assets/sr";
import { useEffect } from "react";

const queryClient = new QueryClient();

export const Layout = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    addLocale("sr", sr);
    locale("sr");
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <PrimeReactProvider>
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
      </PrimeReactProvider>
    </QueryClientProvider>
  );
};
