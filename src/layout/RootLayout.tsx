import { Outlet } from "react-router-dom";
import { Layout } from "./Layout.js";

const RootLayout = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default RootLayout;
