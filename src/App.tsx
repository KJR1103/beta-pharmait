import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/hooks/useAuth";
import { RequireAuth } from "@/components/RequireAuth";
import Index from "./pages/Index";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Prescriptions from "./pages/Prescriptions";
import Advice from "./pages/Advice";
import Tracking from "./pages/Tracking";
import Auth from "./pages/Auth";
import DashboardPharmacy from "./pages/DashboardPharmacy";
import DashboardCustomer from "./pages/DashboardCustomer";
import DashboardCourier from "./pages/DashboardCourier";
import Invoice from "./pages/Invoice";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/products" element={<Products />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/prescriptions" element={<Prescriptions />} />
              <Route path="/advice" element={<Advice />} />
              <Route path="/tracking" element={<Tracking />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/dashboard/pharmacy" element={<RequireAuth roles={["pharmacy"]}><DashboardPharmacy /></RequireAuth>} />
              <Route path="/dashboard/customer" element={<RequireAuth roles={["customer"]}><DashboardCustomer /></RequireAuth>} />
              <Route path="/dashboard/courier" element={<RequireAuth roles={["courier"]}><DashboardCourier /></RequireAuth>} />
              <Route path="/invoice/:orderId" element={<RequireAuth><Invoice /></RequireAuth>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
