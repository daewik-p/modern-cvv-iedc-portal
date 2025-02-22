
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navigation from "./components/Navigation";
import Index from "./pages/Index";
import Execom from "./pages/Execom";
import Events from "./pages/Events";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navigation />
        <div className="pt-16">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/execom" element={<Execom />} />
              <Route path="/events" element={<Events />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
