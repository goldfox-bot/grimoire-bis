import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, 
  Target, 
  CheckCircle, 
  Clock, 
  Star,
  MapPin,
  Users,
  Coins,
  Scroll
} from "lucide-react";
import { useCharacter } from "@/contexts/CharacterContext";

const QuestJournal = () => {
  const [selectedTab, setSelectedTab] = useState("active");
  const { selectedCharacter } = useCharacter();

  if (!selectedCharacter) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold text-muted-foreground mb-4">
          Aucun personnage sélectionné
        </h2>
        <p className="text-muted-foreground">
          Veuillez sélectionner un personnage dans la barre latérale pour voir ses quêtes.
        </p>
      </div>
    );
  }

  const quests = selectedCharacter.quests.active.length > 0 || selectedCharacter.quests.completed.length > 0 
    ? selectedCharacter.quests 
    : {
    active: [
      {
        id: 1,
        title: "Les Cristaux Perdus",
        description: "Retrouver les trois cristaux élémentaires volés par les cultistes de l'Ombre.",
        giver: "Archimage Theron",
        location: "Tour de Cristal",
        reward: "500 po + Bâton de Pouvoir",
        progress: 66,
        objectives: [
          { text: "Récupérer le Cristal de Feu", completed: true },
          { text: "Récupérer le Cristal d'Eau", completed: true },
          { text: "Récupérer le Cristal de Terre", completed: false },
          { text: "Ramener les cristaux à Theron", completed: false }
        ],
        priority: "high",
        type: "main"
      },
      {
        id: 2,
        title: "Le Marchand Disparu",
        description: "Enquêter sur la disparition du marchand Aldric et de sa caravane.",
        giver: "Garde Captain Marcus",
        location: "Caserne de Lunehaven",
        reward: "200 po",
        progress: 25,
        objectives: [
          { text: "Interroger les témoins", completed: true },
          { text: "Examiner la route commerciale", completed: false },
          { text: "Retrouver des indices", completed: false },
          { text: "Localiser Aldric", completed: false }
        ],
        priority: "medium",
        type: "side"
      }
    ],
    completed: [
      {
        id: 3,
        title: "La Menace Gobeline",
        description: "Éliminer la tribu de gobelins qui terrorise les fermiers.",
        giver: "Maire Brendan",
        location: "Village de Pierreverte",
        reward: "150 po + Épée courte +1",
        completedDate: "Il y a 3 jours",
        type: "side"
      },
      {
        id: 4,
        title: "L'Héritage du Druide",
        description: "Protéger le bosquet sacré des bûcherons illégaux.",
        giver: "Druide Sylvana",
        location: "Forêt d'Émeraude",
        reward: "Amulette de Nature + Bénédiction",
        completedDate: "Il y a 1 semaine",
        type: "main"
      },
      {
        id: 5,
        title: "Le Livre Maudit",
        description: "Détruire le grimoire nécromantique trouvé dans les ruines.",
        giver: "Prêtre Aldwin",
        location: "Temple de la Lumière",
        reward: "300 po + Bénédiction divine",
        completedDate: "Il y a 2 semaines",
        type: "main"
      }
    ]
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "text-red-400 border-red-400/50 bg-red-500/10";
      case "medium": return "text-yellow-400 border-yellow-400/50 bg-yellow-500/10";
      case "low": return "text-green-400 border-green-400/50 bg-green-500/10";
      default: return "text-gray-400 border-gray-400/50 bg-gray-500/10";
    }
  };

  const getTypeColor = (type: string) => {
    return type === "main" 
      ? "text-purple-400 border-purple-400/50 bg-purple-500/10"
      : "text-blue-400 border-blue-400/50 bg-blue-500/10";
  };

  return (
    <div className="p-6 space-y-6">
      {/* En-tête du journal */}
      <Card className="modern-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl">
            <BookOpen className="w-6 h-6 text-primary" />
            Journal de Quête
          </CardTitle>
          <CardDescription>
            Aventures et objectifs d'Elara Sombrelune
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-emerald-500/10 border border-emerald-400/30 rounded-lg text-center">
              <div className="text-2xl font-bold text-emerald-300 mb-1">
                {quests.active.length}
              </div>
              <div className="text-sm text-emerald-200">Quêtes Actives</div>
            </div>
            
            <div className="p-4 bg-blue-500/10 border border-blue-400/30 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-300 mb-1">
                {quests.completed.length}
              </div>
              <div className="text-sm text-blue-200">Quêtes Terminées</div>
            </div>
            
            <div className="p-4 bg-purple-500/10 border border-purple-400/30 rounded-lg text-center">
              <div className="text-2xl font-bold text-purple-300 mb-1">
                {quests.active.filter(q => q.type === "main").length + quests.completed.filter(q => q.type === "main").length}
              </div>
              <div className="text-sm text-purple-200">Quêtes Principales</div>
            </div>
            
            <div className="p-4 bg-amber-500/10 border border-amber-400/30 rounded-lg text-center">
              <div className="text-2xl font-bold text-amber-300 mb-1">
                1,150
              </div>
              <div className="text-sm text-amber-200">XP Gagnés</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Onglets des quêtes */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-2 tab-modern">
          <TabsTrigger value="active" className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Quêtes Actives
          </TabsTrigger>
          <TabsTrigger value="completed" className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            Quêtes Terminées
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {quests.active.map((quest) => (
            <Card key={quest.id} className="modern-card">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl mb-2">{quest.title}</CardTitle>
                    <CardDescription className="text-base mb-3">
                      {quest.description}
                    </CardDescription>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Badge variant="outline" className={getTypeColor(quest.type)}>
                      {quest.type === "main" ? "Principale" : "Secondaire"}
                    </Badge>
                    <Badge variant="outline" className={getPriorityColor(quest.priority)}>
                      {quest.priority === "high" ? "Urgente" : quest.priority === "medium" ? "Normale" : "Faible"}
                    </Badge>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span>{quest.giver}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span>{quest.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Coins className="w-4 h-4 text-muted-foreground" />
                    <span>{quest.reward}</span>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  {/* Progression globale */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Progression</span>
                      <span className="text-sm text-muted-foreground">{quest.progress}%</span>
                    </div>
                    <Progress value={quest.progress} className="h-2" />
                  </div>
                  
                  {/* Objectifs */}
                  <div>
                    <h4 className="font-medium mb-3 flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      Objectifs
                    </h4>
                    <div className="space-y-2">
                      {quest.objectives.map((objective, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <CheckCircle 
                            className={`w-4 h-4 ${
                              objective.completed 
                                ? "text-green-400" 
                                : "text-muted-foreground"
                            }`}
                          />
                          <span className={`text-sm ${
                            objective.completed 
                              ? "text-muted-foreground line-through" 
                              : "text-foreground"
                          }`}>
                            {objective.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {quests.completed.map((quest) => (
            <Card key={quest.id} className="modern-card opacity-75">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl mb-2 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      {quest.title}
                    </CardTitle>
                    <CardDescription className="text-base mb-3">
                      {quest.description}
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className={getTypeColor(quest.type)}>
                    {quest.type === "main" ? "Principale" : "Secondaire"}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span>{quest.giver}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span>{quest.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Coins className="w-4 h-4 text-muted-foreground" />
                    <span>{quest.reward}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{quest.completedDate}</span>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default QuestJournal;