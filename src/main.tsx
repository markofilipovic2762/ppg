import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./pages/App.tsx";
import ErrorPage from "./layout/ErrorPage.tsx";
import RootLayout from "./layout/RootLayout.tsx";
import SignIn from "./pages/Signin.tsx";
import Tabela from "./pages/Tabela.tsx";
import UnesenoTabela from "./pages/UnesenoTabela.tsx";

const router = createBrowserRouter(
  [
    {
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <RootLayout />,
          children: [
            {
              index: true,
              element: <App />,
            },
            {
              path: "login",
              element: <SignIn />,
            },
            {
              path: "tabela",
              element: <Tabela />,
            },
            {
              path: "uneseno",
              element: <UnesenoTabela />,
            },
          ],
        },
      ],
    },
  ],
  {
    basename: "/potrosnjagoriva/",
  }
);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router}></RouterProvider>
);
