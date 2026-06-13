import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
  // Import MUI components for loader
import CircularProgress from "@mui/material/CircularProgress";
import type { CircularProgressProps } from "@mui/material/CircularProgress";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import MainLayout from "./layouts/MainLayouts";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Categories from "./pages/Categories";
import Checkout from "./pages/Checkout";
import Contact from "./pages/Contact";
import CustomOrder from "./pages/CustomOrder";
import Payment from "./pages/Payment";
import OrderConfirmed from "./pages/OrderConfirmed";
import Product from "./pages/Product";

// Loading Screen with Logo
function LoadingScreen() {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 100 : prev + 10));
    }, 100);

    return () => clearInterval(timer);
  }, []);

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f8f5f0", // Match your brand background
        zIndex: 9999,
      }}
    >
      <Box sx={{ textAlign: "center" }}>
        {/* === YOUR LOGO HERE === */}
        <Box sx={{ mb: 4 }}>
          <img
            src="/logoGoldNoBG.png"          // ← CHANGE THIS to your actual logo path
            alt="Logo"
            style={{
              height: 90,
              width: "auto",
              display: "block",
              margin: "0 auto",
            }}
          />
        </Box>

        <CircularProgressWithLabel value={progress} />
      </Box>
    </Box>
  );
}

function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number }
) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant="determinate"
        size={110}
        thickness={4.5}
        {...props}
        sx={{ color: "#D4AF37" }}   // Gold accent (change as needed)
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="caption"
          component="div"
          sx={{ color: "text.secondary", fontSize: "1.15rem", fontWeight: 600 }}
        >
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

const queryClient = new QueryClient();

export default function App() {
  const [isInitialLoading, setIsInitialLoading] = React.useState(true);

  React.useEffect(() => {
    // Simulate initial loading (you can make this longer/shorter)
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 1600);

    return () => clearTimeout(timer);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {isInitialLoading && <LoadingScreen />}

        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/custom-order" element={<CustomOrder />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/order-confirmed" element={<OrderConfirmed />} />
            <Route path="/product/:id" element={<Product />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}