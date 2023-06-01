import React from "react";
import MainNav from "./nav/MainNav";
import { useRouter } from "next/router";
import DashNav from "./nav/DashNav";
import Footer from "./Footer";
import { useSession } from "next-auth/react";

function Layout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  return (
    <>
      {status === "authenticated" ? <DashNav /> : null}
      <div>
        {router.pathname === "/dashboard" ||
        router.pathname === "/dashboard/addproject" ||
        router.pathname === "/projects/[id]/edit" ||
        router.pathname === "/projects/[id]/images" ||
        router.pathname === "/dashboard/addart" ? null : (
          <MainNav />
        )}
        {children}
        <Footer />
      </div>
    </>
  );
}

export default Layout;
