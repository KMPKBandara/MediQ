import React from "react";
import Routers from "../routes/Routers";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";

const Layout = () => {
  return (
    <div>
      <Header />
      <main>
        <Routers />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
