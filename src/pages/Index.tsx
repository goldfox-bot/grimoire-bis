
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Sword, Shield, Crown, Sparkles } from "lucide-react";
import NPCDirectory from "@/components/NPCDirectory";
import ItemCatalog from "@/components/ItemCatalog";
import GroupPanel from "@/components/GroupPanel";

const Index = () => {
  const [activeTab, setActiveTab] = useState("accueil");

  return (
    <div className="min-h-screen p-3 sm:p-6">
      {/* Header */}
      <div className="text-center mb-8 sm:mb-12">
        <div className="float-animation">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-fantasy font-bold adventure-glow mb-4 sm:mb-6 leading-tight">
            <div>Les Maraudeurs</div>
            <div>de Joyaux Tendres</div>
          </h1>
        </div>
        <p className="text-lg sm:text-2xl text-slate-300 mb-3 sm:mb-4 font-modern font-light">
          Interface Maître du Jeu • Campagne D&D
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 mb-3 sm:mb-4">
          <Badge variant="outline" className="text-orange-200 border-orange-400/50 bg-orange-500/10 px-3 py-1 text-xs sm:text-sm">
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            Niveau de Groupe : 5-8
          </Badge>
          <Badge variant="outline" className="text-blue-200 border-blue-400/50 bg-blue-500/10 px-3 py-1 text-xs sm:text-sm">
            Sessions : 8
          </Badge>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6 sm:mb-12 tab-modern p-1 sm:p-2 gap-1 sm:gap-2">
          <TabsTrigger 
            value="accueil" 
            className={`${activeTab === "accueil" ? "tab-active" : ""} transition-all duration-300 text-xs sm:text-sm px-2 py-2`}
          >
            <Crown className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-2" />
            <span className="hidden sm:inline">Accueil</span>
          </TabsTrigger>
          <TabsTrigger 
            value="pnj"
            className={`${activeTab === "pnj" ? "tab-active" : ""} transition-all duration-300 text-xs sm:text-sm px-2 py-2`}
          >
            <Users className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-2" />
            <span className="hidden sm:inline">PNJ</span>
          </TabsTrigger>
          <TabsTrigger 
            value="objets"
            className={`${activeTab === "objets" ? "tab-active" : ""} transition-all duration-300 text-xs sm:text-sm px-2 py-2`}
          >
            <Sword className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-2" />
            <span className="hidden sm:inline">Objets</span>
          </TabsTrigger>
          <TabsTrigger 
            value="groupe"
            className={`${activeTab === "groupe" ? "tab-active" : ""} transition-all duration-300 text-xs sm:text-sm px-2 py-2`}
          >
            <Shield className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-2" />
            <span className="hidden sm:inline">Groupe</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="accueil" className="animate-fade-in">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
            {/* Fiche de Groupe - First */}
            <Card className="modern-card group">
              <CardHeader className="pb-3 sm:pb-6">
                <CardTitle className="flex items-center gap-2 sm:gap-3 text-base sm:text-lg text-slate-100 group-hover:text-orange-200 transition-colors">
                  <Shield className="w-4 h-4 sm:w-6 sm:h-6 text-green-400" />
                  Fiche de Groupe
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm text-slate-400">
                  Les héros des Maraudeurs de Joyaux Tendres
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-xs sm:text-sm mb-4 sm:mb-6 text-slate-300 leading-relaxed">
                  Fiches optimisées pour les combats avec statistiques et portraits de chaque membre.
                </p>
                <Button 
                  onClick={() => setActiveTab("groupe")} 
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 text-sm py-2"
                >
                  Voir le Groupe
                </Button>
              </CardContent>
            </Card>

            {/* Annuaire des PNJ - Second */}
            <Card className="modern-card group">
              <CardHeader className="pb-3 sm:pb-6">
                <CardTitle className="flex items-center gap-2 sm:gap-3 text-base sm:text-lg text-slate-100 group-hover:text-orange-200 transition-colors">
                  <Users className="w-4 h-4 sm:w-6 sm:h-6 text-blue-400" />
                  Annuaire des PNJ
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm text-slate-400">
                  Gérez vos personnages non-joueurs et leurs relations
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-xs sm:text-sm mb-4 sm:mb-6 text-slate-300 leading-relaxed">
                  Créez des fiches détaillées pour chaque PNJ avec portraits, descriptions et inventaires marchands.
                </p>
                <Button 
                  onClick={() => setActiveTab("pnj")} 
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 text-sm py-2"
                >
                  Voir les PNJ
                </Button>
              </CardContent>
            </Card>

            {/* Catalogue d'Objets - Third */}
            <Card className="modern-card group">
              <CardHeader className="pb-3 sm:pb-6">
                <CardTitle className="flex items-center gap-2 sm:gap-3 text-base sm:text-lg text-slate-100 group-hover:text-orange-200 transition-colors">
                  <Sword className="w-4 h-4 sm:w-6 sm:h-6 text-purple-400" />
                  Catalogue d'Objets
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm text-slate-400">
                  Armes, armures, potions et trésors magiques
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-xs sm:text-sm mb-4 sm:mb-6 text-slate-300 leading-relaxed">
                  Gérez l'inventaire du groupe et les objets légendaires de votre campagne.
                </p>
                <Button 
                  onClick={() => setActiveTab("objets")} 
                  className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 text-sm py-2"
                >
                  Explorer le Catalogue
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Quick Stats */}
          <div className="mt-8 sm:mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6">
            <div className="stats-card p-4 sm:p-6 text-center">
              <h3 className="text-2xl sm:text-3xl font-bold text-orange-300 mb-1 sm:mb-2">4</h3>
              <p className="text-xs sm:text-sm text-slate-400 font-medium">Héros Actifs</p>
            </div>
            <div className="stats-card p-4 sm:p-6 text-center">
              <h3 className="text-2xl sm:text-3xl font-bold text-orange-300 mb-1 sm:mb-2">25</h3>
              <p className="text-xs sm:text-sm text-slate-400 font-medium">PNJ Rencontrés</p>
            </div>
            <div className="stats-card p-4 sm:p-6 text-center">
              <h3 className="text-2xl sm:text-3xl font-bold text-orange-300 mb-1 sm:mb-2">47</h3>
              <p className="text-xs sm:text-sm text-slate-400 font-medium">Objets Collectés</p>
            </div>
            <div className="stats-card p-4 sm:p-6 text-center">
              <h3 className="text-2xl sm:text-3xl font-bold text-orange-300 mb-1 sm:mb-2">8</h3>
              <p className="text-xs sm:text-sm text-slate-400 font-medium">Sessions Jouées</p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="pnj" className="animate-fade-in">
          <NPCDirectory />
        </TabsContent>

        <TabsContent value="objets" className="animate-fade-in">
          <ItemCatalog />
        </TabsContent>

        <TabsContent value="groupe" className="animate-fade-in">
          <GroupPanel />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Index;
