import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { CartProvider } from "@/lib/cart";

export default function MainLayout() {
  return (
    <CartProvider>
      <Navbar />

      <main className="min-h-[60vh]">
        <Outlet />
      </main>

      <Footer />
      <WhatsAppButton />

      <Toaster
        theme="dark"
        position="top-right"
        richColors
      />
    </CartProvider>
  );
}