import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { toast } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import { useEffect } from "react";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import BlogArticle from "./pages/BlogArticle";
import AppStoreRedirect from "./pages/AppStoreRedirect";
import ApiContact from "./pages/ApiContact";
import WidgetBuilder from "./pages/WidgetBuilder";
import CommandCenter from "./pages/CommandCenter";
import Login from "./pages/Login";
import UserDashboard from "./pages/UserDashboard";
import AccountSettings from "./pages/AccountSettings";
import DataDownload from "./pages/DataDownload";
import { LiteVillageView } from "@/components/LiteVillageView";

// Wrapper for the lite view to extract params
const LiteVillageRoute = () => {
  const { code } = useParams();
  return <LiteVillageView villageCode={code || "unknown"} />;
};

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Offline-First PWA Event Listener
    const handleOffline = () => {
      toast.warning("You are currently offline.", {
        description: "VayuRakshak is serving cached AQI data.",
        duration: 8000,
      });
    };
    
    const handleOnline = () => {
      toast.success("Connection restored!", {
        description: "Live telemetry streams are active.",
        duration: 4000,
      });
    };

    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);

    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LanguageProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/lite/:code" element={<LiteVillageRoute />} />
              <Route path="/blog/:id" element={<BlogArticle />} />
              <Route path="/download" element={<AppStoreRedirect />} />
              <Route path="/api-contact" element={<ApiContact />} />
              <Route path="/widget-builder" element={<WidgetBuilder />} />
              <Route path="/admin/command-center" element={<CommandCenter />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<UserDashboard />} />
              <Route path="/account/*" element={<AccountSettings />} />
              <Route path="/data-download" element={<DataDownload />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
