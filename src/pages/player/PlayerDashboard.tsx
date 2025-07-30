import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, Package, BookOpen, Map, Heart, Zap, Shield, Sword } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PlayerDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6 space-y-8">
      {/* Header Joueur */}
      <div className="text-center">
        <h1 className="text-4xl font-fantasy font-bold adventure-glow mb-4">
          Interface Joueur
        </h1>
        <p className="text-lg text-muted-foreground mb-4">
          Les Maraudeurs de Joyaux Tendres
        </p>
        <Badge variant="outline" className="text-green-200 border-green-400/50 bg-green-500/10">
          <User className="w-4 h-4 mr-2" />
          Personnage Actif
        </Badge>
      </div>

      {/* Résumé du Personnage */}
      <Card className="modern-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-xl text-slate-100">
            <User className="w-6 h-6 text-blue-400" />
            Elara Sombrelune
          </CardTitle>
          <CardDescription>
            Rôdeuse Elfe • Niveau 6 • Archétype Chasseuse
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-400/20 rounded-lg">
              <Heart className="w-5 h-5 text-red-400" />
              <div>
                <p className="text-lg font-bold text-red-300">78/85</p>
                <p className="text-xs text-red-200">Points de Vie</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 bg-blue-500/10 border border-blue-400/20 rounded-lg">
              <Zap className="w-5 h-5 text-blue-400" />
              <div>
                <p className="text-lg font-bold text-blue-300">12/15</p>
                <p className="text-xs text-blue-200">Classe d'Armure</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-400/20 rounded-lg">
              <Shield className="w-5 h-5 text-green-400" />
              <div>
                <p className="text-lg font-bold text-green-300">+4</p>
                <p className="text-xs text-green-200">Bonus Profil</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 bg-purple-500/10 border border-purple-400/20 rounded-lg">
              <Sword className="w-5 h-5 text-purple-400" />
              <div>
                <p className="text-lg font-bold text-purple-300">1d8+3</p>
                <p className="text-xs text-purple-200">Dégâts Arc</p>
              </div>
            </div>
          </div>
          <Button 
            onClick={() => navigate("/player/character")}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
          >
            Voir la Fiche Complète
          </Button>
        </CardContent>
      </Card>

      {/* Outils Joueur */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Inventaire */}
        <Card className="modern-card group">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-lg text-slate-100 group-hover:text-orange-200 transition-colors">
              <Package className="w-6 h-6 text-amber-400" />
              Mon Inventaire
            </CardTitle>
            <CardDescription>
              Objets, équipement et richesses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-slate-300">Pièces d'or</span>
                <span className="text-amber-300 font-bold">247 po</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-300">Objets équipés</span>
                <span className="text-blue-300">8/12</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-300">Poids transporté</span>
                <span className="text-green-300">45/65 kg</span>
              </div>
            </div>
            <Button 
              onClick={() => navigate("/player/inventory")} 
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700"
            >
              Gérer l'Inventaire
            </Button>
          </CardContent>
        </Card>

        {/* Journal de Quête */}
        <Card className="modern-card group">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-lg text-slate-100 group-hover:text-orange-200 transition-colors">
              <BookOpen className="w-6 h-6 text-emerald-400" />
              Journal de Quête
            </CardTitle>
            <CardDescription>
              Aventures et objectifs en cours
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 mb-4">
              <div className="p-2 bg-emerald-500/10 border border-emerald-400/20 rounded text-sm">
                <span className="text-emerald-300 font-medium">Active:</span> Les Cristaux Perdus
              </div>
              <div className="p-2 bg-blue-500/10 border border-blue-400/20 rounded text-sm">
                <span className="text-blue-300 font-medium">En cours:</span> Le Marchand Disparu
              </div>
              <div className="text-xs text-slate-400">
                3 quêtes terminées cette session
              </div>
            </div>
            <Button 
              onClick={() => navigate("/player/journal")} 
              className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700"
            >
              Consulter le Journal
            </Button>
          </CardContent>
        </Card>

        {/* Carte d'Exploration */}
        <Card className="modern-card group">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-lg text-slate-100 group-hover:text-orange-200 transition-colors">
              <Map className="w-6 h-6 text-cyan-400" />
              Carte d'Exploration
            </CardTitle>
            <CardDescription>
              Lieux découverts et points d'intérêt
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 mb-4">
              <div className="text-sm text-slate-300">
                <span className="text-cyan-300 font-medium">12</span> lieux découverts
              </div>
              <div className="text-sm text-slate-300">
                <span className="text-purple-300 font-medium">3</span> donjons explorés
              </div>
              <div className="text-sm text-slate-300">
                <span className="text-green-300 font-medium">5</span> villes visitées
              </div>
            </div>
            <Button 
              onClick={() => navigate("/player/map")} 
              className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700"
            >
              Explorer la Carte
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Progression et Statistiques */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="stats-card p-6 text-center">
          <h3 className="text-3xl font-bold text-orange-300 mb-2">6</h3>
          <p className="text-sm text-slate-400 font-medium">Niveau Actuel</p>
        </div>
        <div className="stats-card p-6 text-center">
          <h3 className="text-3xl font-bold text-orange-300 mb-2">2,840</h3>
          <p className="text-sm text-slate-400 font-medium">XP Total</p>
        </div>
        <div className="stats-card p-6 text-center">
          <h3 className="text-3xl font-bold text-orange-300 mb-2">15</h3>
          <p className="text-sm text-slate-400 font-medium">Quêtes Terminées</p>
        </div>
        <div className="stats-card p-6 text-center">
          <h3 className="text-3xl font-bold text-orange-300 mb-2">8</h3>
          <p className="text-sm text-slate-400 font-medium">Sessions Jouées</p>
        </div>
      </div>
    </div>
  );
};

export default PlayerDashboard;