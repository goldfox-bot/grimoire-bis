import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollText, Plus, Edit, Trash2, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Quest {
  id: string;
  title: string;
  description: string;
  status: "active" | "completed" | "paused";
  assignedCharacters: string[];
  priority: "low" | "medium" | "high";
  rewards: string;
  createdAt: Date;
}

interface Character {
  id: string;
  name: string;
  class: string;
  level: number;
}

const QuestManager = () => {
  const { toast } = useToast();
  const [quests, setQuests] = useState<Quest[]>([
    {
      id: "1",
      title: "Les Cristaux Perdus",
      description: "Retrouver les cristaux magiques volés par les bandits de la forêt sombre.",
      status: "active",
      assignedCharacters: ["1", "2"],
      priority: "high",
      rewards: "500 XP, Amulette de Protection",
      createdAt: new Date()
    }
  ]);

  const [characters] = useState<Character[]>([
    { id: "1", name: "Elara Sombrelune", class: "Rôdeuse Elfe", level: 6 },
    { id: "2", name: "Thorin Barbe-de-Fer", class: "Guerrier Nain", level: 5 },
    { id: "3", name: "Lyralei Chantevie", class: "Barde Halfeline", level: 4 }
  ]);

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingQuest, setEditingQuest] = useState<Quest | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "active" as Quest["status"],
    assignedCharacters: [] as string[],
    priority: "medium" as Quest["priority"],
    rewards: ""
  });

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      status: "active",
      assignedCharacters: [],
      priority: "medium",
      rewards: ""
    });
    setEditingQuest(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingQuest) {
      setQuests(quests.map(q => 
        q.id === editingQuest.id 
          ? { ...editingQuest, ...formData }
          : q
      ));
      toast({ title: "Quête modifiée avec succès" });
    } else {
      const newQuest: Quest = {
        id: Date.now().toString(),
        ...formData,
        createdAt: new Date()
      };
      setQuests([...quests, newQuest]);
      toast({ title: "Quête créée avec succès" });
    }
    
    setIsCreateDialogOpen(false);
    resetForm();
  };

  const handleEdit = (quest: Quest) => {
    setEditingQuest(quest);
    setFormData({
      title: quest.title,
      description: quest.description,
      status: quest.status,
      assignedCharacters: quest.assignedCharacters,
      priority: quest.priority,
      rewards: quest.rewards
    });
    setIsCreateDialogOpen(true);
  };

  const handleDelete = (questId: string) => {
    setQuests(quests.filter(q => q.id !== questId));
    toast({ title: "Quête supprimée" });
  };

  const handleCharacterToggle = (characterId: string) => {
    const newAssigned = formData.assignedCharacters.includes(characterId)
      ? formData.assignedCharacters.filter(id => id !== characterId)
      : [...formData.assignedCharacters, characterId];
    
    setFormData({ ...formData, assignedCharacters: newAssigned });
  };

  const getStatusColor = (status: Quest["status"]) => {
    switch (status) {
      case "active": return "bg-green-500/20 text-green-400 border-green-500/50";
      case "completed": return "bg-blue-500/20 text-blue-400 border-blue-500/50";
      case "paused": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/50";
      default: return "bg-muted";
    }
  };

  const getPriorityColor = (priority: Quest["priority"]) => {
    switch (priority) {
      case "high": return "bg-red-500/20 text-red-400 border-red-500/50";
      case "medium": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/50";
      case "low": return "bg-green-500/20 text-green-400 border-green-500/50";
      default: return "bg-muted";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-fantasy font-bold text-primary">Gestion des Quêtes</h2>
          <p className="text-muted-foreground">Créez et gérez les quêtes de votre campagne</p>
        </div>
        
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="w-4 h-4 mr-2" />
              Nouvelle Quête
            </Button>
          </DialogTrigger>
          
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingQuest ? "Modifier la Quête" : "Créer une Nouvelle Quête"}
              </DialogTitle>
              <DialogDescription>
                Définissez les détails de la quête et assignez-la aux personnages.
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Titre de la Quête</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Le Trésor Perdu..."
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="status">Statut</Label>
                  <Select 
                    value={formData.status} 
                    onValueChange={(value: Quest["status"]) => setFormData({ ...formData, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="paused">En Pause</SelectItem>
                      <SelectItem value="completed">Terminée</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Décrivez les objectifs et l'histoire de la quête..."
                  rows={3}
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="priority">Priorité</Label>
                  <Select 
                    value={formData.priority} 
                    onValueChange={(value: Quest["priority"]) => setFormData({ ...formData, priority: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Faible</SelectItem>
                      <SelectItem value="medium">Moyenne</SelectItem>
                      <SelectItem value="high">Élevée</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="rewards">Récompenses</Label>
                  <Input
                    id="rewards"
                    value={formData.rewards}
                    onChange={(e) => setFormData({ ...formData, rewards: e.target.value })}
                    placeholder="XP, objets, or..."
                  />
                </div>
              </div>
              
              <div>
                <Label>Personnages Assignés</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {characters.map((character) => (
                    <div key={character.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={character.id}
                        checked={formData.assignedCharacters.includes(character.id)}
                        onCheckedChange={() => handleCharacterToggle(character.id)}
                      />
                      <Label htmlFor={character.id} className="text-sm">
                        {character.name} ({character.class})
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Annuler
                </Button>
                <Button type="submit">
                  {editingQuest ? "Modifier" : "Créer"} la Quête
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {quests.map((quest) => (
          <Card key={quest.id} className="bg-card/50 border-border/50">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <ScrollText className="w-5 h-5 text-primary" />
                    {quest.title}
                  </CardTitle>
                  <CardDescription className="mt-2">
                    {quest.description}
                  </CardDescription>
                </div>
                
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm" onClick={() => handleEdit(quest)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(quest.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <Badge className={getStatusColor(quest.status)}>
                    {quest.status === "active" ? "Active" : quest.status === "completed" ? "Terminée" : "En Pause"}
                  </Badge>
                  <Badge className={getPriorityColor(quest.priority)}>
                    Priorité {quest.priority === "high" ? "Élevée" : quest.priority === "medium" ? "Moyenne" : "Faible"}
                  </Badge>
                </div>
                
                {quest.assignedCharacters.length > 0 && (
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <div className="flex gap-1">
                      {quest.assignedCharacters.map((characterId) => {
                        const character = characters.find(c => c.id === characterId);
                        return character ? (
                          <Badge key={characterId} variant="outline" className="text-xs">
                            {character.name}
                          </Badge>
                        ) : null;
                      })}
                    </div>
                  </div>
                )}
                
                {quest.rewards && (
                  <div className="text-sm text-muted-foreground">
                    <strong>Récompenses:</strong> {quest.rewards}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default QuestManager;