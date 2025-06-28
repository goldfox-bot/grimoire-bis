
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Users, Sword, Shield, Crown, Scroll, Image as ImageIcon, Sparkles } from "lucide-react";
import InteractiveMap from "@/components/InteractiveMap";
import NPCDirectory from "@/components/NPCDirectory";
import ItemCatalog from "@/components/ItemCatalog";
import GroupPanel from "@/components/GroupPanel";
import CharacterHistory from "@/components/CharacterHistory";

const Index = () => {
  const [activeTab, setActiveTab] = useState("accueil");

  return (
    <div className="min-h-screen p-6">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="float-animation">
          <h1 className="text-7xl font-fantasy font-bold adventure-glow mb-6 leading-tight">
            Les Maraudeurs de Joyaux Tendres
          </h1>
        </div>
        <p className="text-2xl text-slate-300 mb-4 font-modern font-light">
          Interface Maître du Jeu • Campagne D&D
        </p>
        <div className="flex justify-center gap-4 mb-4">
          <Badge variant="outline" className="text-orange-200 border-orange-400/50 bg-orange-500/10 px-4 py-2 text-sm">
            <Sparkles className="w-4 h-4 mr-2" />
            Niveau de Groupe : 5-8
          </Badge>
          <Badge variant="outline" className="text-blue-200 border-blue-400/50 bg-blue-500/10 px-4 py-2 text-sm">
            Sessions : 8
          </Badge>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6 mb-12 tab-modern p-2 gap-2">
          <TabsTrigger 
            value="accueil" 
            className={`${activeTab === "accueil" ? "tab-active" : ""} transition-all duration-300`}
          >
            <Crown className="w-4 h-4 mr-2" />
            Accueil
          </TabsTrigger>
          <TabsTrigger 
            value="carte"
            className={`${activeTab === "carte" ? "tab-active" : ""} transition-all duration-300`}
          >
            <MapPin className="w-4 h-4 mr-2" />
            Carte
          </TabsTrigger>
          <TabsTrigger 
            value="pnj"
            className={`${activeTab === "pnj" ? "tab-active" : ""} transition-all duration-300`}
          >
            <Users className="w-4 h-4 mr-2" />
            PNJ
          </TabsTrigger>
          <TabsTrigger 
            value="objets"
            className={`${activeTab === "objets" ? "tab-active" : ""} transition-all duration-300`}
          >
            <Sword className="w-4 h-4 mr-2" />
            Objets
          </TabsTrigger>
          <TabsTrigger 
            value="groupe"
            className={`${activeTab === "groupe" ? "tab-active" : ""} transition-all duration-300`}
          >
            <Shield className="w-4 h-4 mr-2" />
            Groupe
          </TabsTrigger>
          <TabsTrigger 
            value="histoires"
            className={`${activeTab === "histoires" ? "tab-active" : ""} transition-all duration-300`}
          >
            <Scroll className="w-4 h-4 mr-2" />
            Histoires
          </TabsTrigger>
        </TabsList>

        <TabsContent value="accueil" className="animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="modern-card group">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-slate-100 group-hover:text-orange-200 transition-colors">
                  <MapPin className="w-6 h-6 text-orange-400" />
                  Carte Interactive
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Explorez les terres mystérieuses et les cités légendaires
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-6 text-slate-300 leading-relaxed">
                  Naviguez à travers les royaumes, découvrez les lieux secrets et gérez les emplacements de vos PNJ.
                </p>
                <Button 
                  onClick={() => setActiveTab("carte")} 
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Ouvrir la Carte
                </Button>
              </CardContent>
            </Card>

            <Card className="modern-card group">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-slate-100 group-hover:text-orange-200 transition-colors">
                  <Users className="w-6 h-6 text-blue-400" />
                  Annuaire des PNJ
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Gérez vos personnages non-joueurs et leurs relations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-6 text-slate-300 leading-relaxed">
                  Créez des fiches détaillées pour chaque PNJ avec portraits, descriptions et inventaires marchands.
                </p>
                <Button 
                  onClick={() => setActiveTab("pnj")} 
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Voir les PNJ
                </Button>
              </CardContent>
            </Card>

            <Card className="modern-card group">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-slate-100 group-hover:text-orange-200 transition-colors">
                  <Sword className="w-6 h-6 text-purple-400" />
                  Catalogue d'Objets
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Armes, armures, potions et trésors magiques
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-6 text-slate-300 leading-relaxed">
                  Gérez l'inventaire du groupe et les objets légendaires de votre campagne.
                </p>
                <Button 
                  onClick={() => setActiveTab("objets")} 
                  className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Explorer le Catalogue
                </Button>
              </CardContent>
            </Card>

            <Card className="modern-card group">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-slate-100 group-hover:text-orange-200 transition-colors">
                  <Shield className="w-6 h-6 text-green-400" />
                  Fiche de Groupe
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Les héros des Maraudeurs de Joyaux Tendres
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-6 text-slate-300 leading-relaxed">
                  Fiches optimisées pour les combats avec statistiques et portraits de chaque membre.
                </p>
                <Button 
                  onClick={() => setActiveTab("groupe")} 
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Voir le Groupe
                </Button>
              </CardContent>
            </Card>

            <Card className="modern-card group">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-slate-100 group-hover:text-orange-200 transition-colors">
                  <Scroll className="w-6 h-6 text-yellow-400" />
                  Histoires des Personnages
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Chroniques et galeries d'ambiance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-6 text-slate-300 leading-relaxed">
                  Créez des galeries visuelles et des récits épiques pour chaque personnage.
                </p>
                <Button 
                  onClick={() => setActiveTab("histoires")} 
                  className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Consulter les Chroniques
                </Button>
              </CardContent>
            </Card>

            <Card className="modern-card group">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-slate-100 group-hover:text-orange-200 transition-colors">
                  <ImageIcon className="w-6 h-6 text-pink-400" />
                  Galerie d'Ambiance
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Images et visuels pour enrichir vos sessions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-6 text-slate-300 leading-relaxed">
                  Collection d'images d'ambiance pour immerger vos joueurs dans l'univers.
                </p>
                <Button className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                  Ouvrir la Galerie
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Quick Stats */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="stats-card p-6 text-center">
              <h3 className="text-3xl font-bold text-orange-300 mb-2">12</h3>
              <p className="text-sm text-slate-400 font-medium">Lieux Explorés</p>
            </div>
            <div className="stats-card p-6 text-center">
              <h3 className="text-3xl font-bold text-orange-300 mb-2">25</h3>
              <p className="text-sm text-slate-400 font-medium">PNJ Rencontrés</p>
            </div>
            <div className="stats-card p-6 text-center">
              <h3 className="text-3xl font-bold text-orange-300 mb-2">47</h3>
              <p className="text-sm text-slate-400 font-medium">Objets Collectés</p>
            </div>
            <div className="stats-card p-6 text-center">
              <h3 className="text-3xl font-bold text-orange-300 mb-2">8</h3>
              <p className="text-sm text-slate-400 font-medium">Sessions Jouées</p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="carte" className="animate-fade-in">
          <InteractiveMap />
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

        <TabsContent value="histoires" className="animate-fade-in">
          <CharacterHistory />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Index;
