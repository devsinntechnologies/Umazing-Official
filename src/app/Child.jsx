// @ts-nocheck
"use client";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { setSidebarVisibility } from "@/store/sidebar";
import { usePathname } from "next/navigation";
import SideBar from "@/components/header/SideBar";

export default function Child({ children }: { children: React.ReactNode }) {
  const isLoggedIn = useSelector((state: RootState) => state.authSlice.isLoggedIn);
  const isSidebarOpen = useSelector((state: RootState) => state.sidebar.isOpen);
  const dispatch = useDispatch();

  const { pathname } = usePathname();
  const sidebarClass = isLoggedIn && (isSidebarOpen ? "sm:ml-sidebarOpen" : "sm:ml-sidebarClosed"); // Hide if not logged in

  useEffect(() => {
    if (window.innerWidth > 768) {
      dispatch(setSidebarVisibility(false));
    }
  }, [pathname, dispatch]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        dispatch(setSidebarVisibility(true));
      } else {
        dispatch(setSidebarVisibility(false));
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Check initial window size

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [dispatch]);

  return (
    <div className={`flex-1 relative pb-16 md:py-6 ${sidebarClass} top-16 md:top-20 left-0 min-h-[calc(100vh-56px)] md:min-h-[calc(100vh-80px)]`}>
      {isLoggedIn && <SideBar />} {/* Render SideBar only if logged in */}
      {children}
    </div>
  );
}
