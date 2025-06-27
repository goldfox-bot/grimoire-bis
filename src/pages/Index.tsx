
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Users, Sword, Shield, Crown, Scroll, Image as ImageIcon } from "lucide-react";
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
      <div className="text-center mb-8">
        <h1 className="text-6xl font-fantasy font-bold magic-glow mb-4 animate-glow">
          Les Maraudeurs de Joyaux Tendres
        </h1>
        <p className="text-xl text-gold-200 mb-2">Campagne D&D - Interface Maître du Jeu</p>
        <Badge variant="outline" className="text-gold-300 border-gold-400/50 bg-dungeon-800/50">
          Niveau de Groupe : 5-8
        </Badge>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6 mb-8 bg-dungeon-800/50 border border-gold-500/30">
          <TabsTrigger value="accueil" className="data-[state=active]:bg-gold-600/20 data-[state=active]:text-gold-200">
            <Crown className="w-4 h-4 mr-2" />
            Accueil
          </TabsTrigger>
          <TabsTrigger value="carte" className="data-[state=active]:bg-gold-600/20 data-[state=active]:text-gold-200">
            <MapPin className="w-4 h-4 mr-2" />
            Carte
          </TabsTrigger>
          <TabsTrigger value="pnj" className="data-[state=active]:bg-gold-600/20 data-[state=active]:text-gold-200">
            <Users className="w-4 h-4 mr-2" />
            PNJ
          </TabsTrigger>
          <TabsTrigger value="objets" className="data-[state=active]:bg-gold-600/20 data-[state=active]:text-gold-200">
            <Sword className="w-4 h-4 mr-2" />
            Objets
          </TabsTrigger>
          <TabsTrigger value="groupe" className="data-[state=active]:bg-gold-600/20 data-[state=active]:text-gold-200">
            <Shield className="w-4 h-4 mr-2" />
            Groupe
          </TabsTrigger>
          <TabsTrigger value="histoires" className="data-[state=active]:bg-gold-600/20 data-[state=active]:text-gold-200">
            <Scroll className="w-4 h-4 mr-2" />
            Histoires
          </TabsTrigger>
        </TabsList>

        <TabsContent value="accueil" className="animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="dungeon-card hover:scale-105 transition-transform duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gold-200">
                  <MapPin className="w-6 h-6" />
                  Carte Interactive
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Explorez les terres mystérieuses et les cités légendaires
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">
                  Naviguez à travers les royaumes, découvrez les lieux secrets et gérez les emplacements de vos PNJ.
                </p>
                <Button 
                  onClick={() => setActiveTab("carte")} 
                  className="w-full bg-gold-600 hover:bg-gold-700 text-dungeon-900"
                >
                  Ouvrir la Carte
                </Button>
              </CardContent>
            </Card>

            <Card className="dungeon-card hover:scale-105 transition-transform duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gold-200">
                  <Users className="w-6 h-6" />
                  Annuaire des PNJ
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Gérez vos personnages non-joueurs et leurs relations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">
                  Créez des fiches détaillées pour chaque PNJ avec portraits, descriptions et inventaires marchands.
                </p>
                <Button 
                  onClick={() => setActiveTab("pnj")} 
                  className="w-full bg-gold-600 hover:bg-gold-700 text-dungeon-900"
                >
                  Voir les PNJ
                </Button>
              </CardContent>
            </Card>

            <Card className="dungeon-card hover:scale-105 transition-transform duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gold-200">
                  <Sword className="w-6 h-6" />
                  Catalogue d'Objets
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Armes, armures, potions et trésors magiques
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">
                  Gérez l'inventaire du groupe et les objets légendaires de votre campagne.
                </p>
                <Button 
                  onClick={() => setActiveTab("objets")} 
                  className="w-full bg-gold-600 hover:bg-gold-700 text-dungeon-900"
                >
                  Explorer le Catalogue
                </Button>
              </CardContent>
            </Card>

            <Card className="dungeon-card hover:scale-105 transition-transform duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gold-200">
                  <Shield className="w-6 h-6" />
                  Fiche de Groupe
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Les héros des Maraudeurs de Joyaux Tendres
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">
                  Fiches optimisées pour les combats avec statistiques et portraits de chaque membre.
                </p>
                <Button 
                  onClick={() => setActiveTab("groupe")} 
                  className="w-full bg-gold-600 hover:bg-gold-700 text-dungeon-900"
                >
                  Voir le Groupe
                </Button>
              </CardContent>
            </Card>

            <Card className="dungeon-card hover:scale-105 transition-transform duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gold-200">
                  <Scroll className="w-6 h-6" />
                  Histoires des Personnages
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Chroniques et galeries d'ambiance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">
                  Créez des galeries visuelles et des récits épiques pour chaque personnage.
                </p>
                <Button 
                  onClick={() => setActiveTab("histoires")} 
                  className="w-full bg-gold-600 hover:bg-gold-700 text-dungeon-900"
                >
                  Consulter les Chroniques
                </Button>
              </CardContent>
            </Card>

            <Card className="dungeon-card hover:scale-105 transition-transform duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gold-200">
                  <ImageIcon className="w-6 h-6" />
                  Galerie d'Ambiance
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Images et visuels pour enrichir vos sessions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">
                  Collection d'images d'ambiance pour immerger vos joueurs dans l'univers.
                </p>
                <Button className="w-full bg-gold-600 hover:bg-gold-700 text-dungeon-900">
                  Ouvrir la Galerie
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Quick Stats */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="dungeon-card p-4 text-center">
              <h3 className="text-2xl font-bold text-gold-300">12</h3>
              <p className="text-sm text-muted-foreground">Lieux Explorés</p>
            </div>
            <div className="dungeon-card p-4 text-center">
              <h3 className="text-2xl font-bold text-gold-300">25</h3>
              <p className="text-sm text-muted-foreground">PNJ Rencontrés</p>
            </div>
            <div className="dungeon-card p-4 text-center">
              <h3 className="text-2xl font-bold text-gold-300">47</h3>
              <p className="text-sm text-muted-foreground">Objets Collectés</p>
            </div>
            <div className="dungeon-card p-4 text-center">
              <h3 className="text-2xl font-bold text-gold-300">8</h3>
              <p className="text-sm text-muted-foreground">Sessions Jouées</p>
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
