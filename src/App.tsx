import { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import ThemeProvider from "@/contexts/ThemeContext";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import Footer from "@/components/layout/Footer";
import { PageLoader } from "@/components/animations/PageTransitions";

import routes from "@/routes";
import Header from "@/components/layout/Header";
import AppSidebar from "./components/layout/Sidebar";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {routes.map(({ path, element: Element }) => (
          <Route
            key={path}
            path={path}
            element={
              <Suspense fallback={<PageLoader />}>
                <Element />
              </Suspense>
            }
          />
        ))}

        <Route path="*" element={<Navigate replace to="/404" />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <SidebarProvider>
          <div className="flex min-h-screen w-full">
            <AppSidebar />
            
            <SidebarInset>
              <div className="flex min-h-screen flex-col bg-background text-foreground antialiased">
                <Header />
                
                <main className="flex-1">
                  <AnimatedRoutes />
                </main>
                
                <Footer />
              </div>
            </SidebarInset>
          </div>
        </SidebarProvider>
      </Router>
    </ThemeProvider>
  );
}