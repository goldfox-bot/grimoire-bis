import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

// Pages
import DMDashboard from "./pages/dm/DMDashboard";
import PlayerDashboard from "./pages/player/PlayerDashboard";
import CharacterSheet from "./pages/player/CharacterSheet";
import PlayerInventory from "./pages/player/PlayerInventory";
import QuestJournal from "./pages/player/QuestJournal";
import NPCDirectory from "./components/NPCDirectory";
import ItemCatalog from "./components/ItemCatalog";
import GroupPanel from "./components/GroupPanel";
import InteractiveMap from "./components/InteractiveMap";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [currentView, setCurrentView] = useState<"dm" | "player">("dm");

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <SidebarProvider>
            <div className="min-h-screen flex w-full">
              <AppSidebar 
                currentView={currentView} 
                onViewChange={setCurrentView} 
              />
              
              <div className="flex-1 flex flex-col">
                <header className="h-12 flex items-center border-b border-border/50 bg-card/50 backdrop-blur-sm">
                  <SidebarTrigger className="ml-4" />
                  <div className="ml-4">
                    <h1 className="font-fantasy font-bold text-primary">
                      {currentView === "dm" ? "Interface Maître du Jeu" : "Interface Joueur"}
                    </h1>
                  </div>
                </header>

                <main className="flex-1 overflow-auto">
                  <Routes>
                    {/* Routes MJ */}
                    <Route path="/dm" element={<DMDashboard />} />
                    <Route path="/dm/npcs" element={<NPCDirectory />} />
                    <Route path="/dm/items" element={<ItemCatalog />} />
                    <Route path="/dm/group" element={<GroupPanel />} />
                    <Route path="/dm/map" element={<InteractiveMap />} />
                    
                    {/* Routes Joueur */}
                    <Route path="/player" element={<PlayerDashboard />} />
                    <Route path="/player/character" element={<CharacterSheet />} />
                    <Route path="/player/inventory" element={<PlayerInventory />} />
                    <Route path="/player/journal" element={<QuestJournal />} />
                    <Route path="/player/map" element={<InteractiveMap />} />
                    
                    {/* Redirections */}
                    <Route path="/" element={<Navigate to="/dm" replace />} />
                    
                    {/* 404 */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
              </div>
            </div>
          </SidebarProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
