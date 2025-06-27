
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Scroll, Image as ImageIcon, Plus, Calendar, Star, MapPin, Users } from "lucide-react";

interface HistoryEntry {
  id: string;
  characterId: string;
  characterName: string;
  type: 'story' | 'session' | 'milestone' | 'relationship';
  title: string;
  content: string;
  date: string;
  session?: number;
  images?: string[];
  tags?: string[];
  isSecret?: boolean;
}

interface CharacterGallery {
  characterId: string;
  characterName: string;
  ambientImages: Array<{
    id: string;
    url: string;
    caption: string;
    mood: string;
  }>;
  timeline: HistoryEntry[];
}

const CharacterHistory = () => {
  const [galleries, setGalleries] = useState<CharacterGallery[]>([
    {
      characterId: '1',
      characterName: 'Kael le Brave',
      ambientImages: [
        {
          id: '1',
          url: 'https://images.unsplash.com/photo-1566438480900-0609be27a4be',
          caption: 'Kael méditant à l\'aube avant la bataille',
          mood: 'Sérénité'
        },
        {
          id: '2', 
          url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96',
          caption: 'L\'éclat de son épée enflammée dans les ténèbres',
          mood: 'Héroïque'
        }
      ],
      timeline: [
        {
          id: '1',
          characterId: '1',
          characterName: 'Kael le Brave',
          type: 'story',
          title: 'L\'Héritage du Père',
          content: 'Kael a découvert que son père, qu\'il croyait mort, était en réalité devenu un paladin déchu. Cette révélation a ébranlé sa foi mais renforcé sa détermination à racheter l\'honneur familial.',
          date: '2024-01-15',
          tags: ['Famille', 'Foi', 'Révélation'],
          isSecret: false
        },
        {
          id: '2',
          characterId: '1',
          characterName: 'Kael le Brave',
          type: 'session',
          title: 'La Bataille des Trois Tours',
          content: 'Kael a mené la charge contre les forces démoniaques qui assiégeaient la cité. Son courage a inspiré toute l\'armée et permis de remporter la victoire.',
          date: '2024-02-03',
          session: 5,
          tags: ['Combat', 'Leadership', 'Démons']
        }
      ]
    },
    {
      characterId: '2',
      characterName: 'Dame Lumina',
      ambientImages: [
        {
          id: '3',
          url: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176',
          caption: 'Lumina soignant les blessés après la bataille',
          mood: 'Compassion'
        }
      ],
      timeline: [
        {
          id: '3',
          characterId: '2',
          characterName: 'Dame Lumina',
          type: 'milestone',
          title: 'Vision Divine',
          content: 'Lors de sa méditation dans le Temple de la Lumière Éternelle, Lumina a reçu une vision de sa déesse lui montrant l\'emplacement d\'un Joyau Tendre.',
          date: '2024-01-28',
          tags: ['Divinité', 'Vision', 'Joyaux Tendres']
        }
      ]
    }
  ]);

  const [selectedCharacter, setSelectedCharacter] = useState<string>('1');
  const [showNewEntryForm, setShowNewEntryForm] = useState(false);
  const [newEntry, setNewEntry] = useState({
    type: 'story' as HistoryEntry['type'],
    title: '',
    content: '',
    tags: '',
    isSecret: false
  });

  const selectedGallery = galleries.find(g => g.characterId === selectedCharacter);

  const addNewEntry = () => {
    if (newEntry.title && newEntry.content && selectedGallery) {
      const entry: HistoryEntry = {
        id: Date.now().toString(),
        characterId: selectedCharacter,
        characterName: selectedGallery.characterName,
        type: newEntry.type,
        title: newEntry.title,
        content: newEntry.content,
        date: new Date().toISOString().split('T')[0],
        tags: newEntry.tags.split(',').map(t => t.trim()).filter(t => t),
        isSecret: newEntry.isSecret
      };

      setGalleries(prev => prev.map(gallery => 
        gallery.characterId === selectedCharacter
          ? { ...gallery, timeline: [...gallery.timeline, entry] }
          : gallery
      ));

      setNewEntry({ type: 'story', title: '', content: '', tags: '', isSecret: false });
      setShowNewEntryForm(false);
    }
  };

  const getTypeIcon = (type: HistoryEntry['type']) => {
    switch (type) {
      case 'story': return <Scroll className="w-4 h-4" />;
      case 'session': return <Calendar className="w-4 h-4" />;
      case 'milestone': return <Star className="w-4 h-4" />;
      case 'relationship': return <Users className="w-4 h-4" />;
      default: return <Scroll className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: HistoryEntry['type']) => {
    switch (type) {
      case 'story': return 'bg-purple-600/20 text-purple-300 border-purple-500/30';
      case 'session': return 'bg-blue-600/20 text-blue-300 border-blue-500/30';
      case 'milestone': return 'bg-gold-600/20 text-gold-300 border-gold-500/30';
      case 'relationship': return 'bg-green-600/20 text-green-300 border-green-500/30';
      default: return 'bg-gray-600/20 text-gray-300 border-gray-500/30';
    }
  };

  const getTypeName = (type: HistoryEntry['type']) => {
    switch (type) {
      case 'story': return 'Histoire';
      case 'session': return 'Session';
      case 'milestone': return 'Étape';
      case 'relationship': return 'Relation';
      default: return type;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-fantasy font-bold text-gold-200 mb-2">
            Chroniques des Personnages
          </h2>
          <p className="text-muted-foreground">
            Galeries d'ambiance et histoires épiques de vos héros
          </p>
        </div>
        <Button
          onClick={() => setShowNewEntryForm(true)}
          className="bg-gold-600 hover:bg-gold-700 text-dungeon-900"
        >
          <Plus className="w-4 h-4 mr-2" />
          Nouvelle Entrée
        </Button>
      </div>

      <Tabs value={selectedCharacter} onValueChange={setSelectedCharacter} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-dungeon-800/50 border border-gold-500/30">
          {galleries.map((gallery) => (
            <TabsTrigger 
              key={gallery.characterId} 
              value={gallery.characterId}
              className="data-[state=active]:bg-gold-600/20 data-[state=active]:text-gold-200"
            >
              {gallery.characterName}
            </TabsTrigger>
          ))}
        </TabsList>

        {galleries.map((gallery) => (
          <TabsContent key={gallery.characterId} value={gallery.characterId} className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Ambient Images Gallery */}
              <div className="lg:col-span-1">
                <Card className="dungeon-card">
                  <CardHeader>
                    <CardTitle className="text-gold-200 flex items-center gap-2">
                      <ImageIcon className="w-5 h-5" />
                      Galerie d'Ambiance
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {gallery.ambientImages.map((image) => (
                      <div key={image.id} className="relative group">
                        <img
                          src={image.url}
                          alt={image.caption}
                          className="w-full h-48 object-cover rounded-lg border border-gold-500/30"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-end">
                          <div className="p-3 w-full">
                            <p className="text-white text-sm font-medium mb-1">{image.caption}</p>
                            <Badge variant="outline" className="text-xs">
                              {image.mood}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    <Button 
                      variant="outline" 
                      className="w-full border-gold-500/30 hover:bg-gold-600/20"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Ajouter une Image
                    </Button>
                  </CardContent>
                </Card>

                {/* Character Stats */}
                <Card className="dungeon-card mt-4">
                  <CardHeader>
                    <CardTitle className="text-gold-200 text-lg">Statistiques</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Entrées totales:</span>
                        <span className="text-gold-300">{gallery.timeline.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Images d'ambiance:</span>
                        <span className="text-gold-300">{gallery.ambientImages.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sessions jouées:</span>
                        <span className="text-gold-300">
                          {gallery.timeline.filter(e => e.type === 'session').length}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Étapes importantes:</span>
                        <span className="text-gold-300">
                          {gallery.timeline.filter(e => e.type === 'milestone').length}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Timeline */}
              <div className="lg:col-span-2">
                <Card className="dungeon-card">
                  <CardHeader>
                    <CardTitle className="text-gold-200 flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      Chronologie - {gallery.characterName}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[600px] pr-4">
                      <div className="space-y-4">
                        {gallery.timeline
                          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                          .map((entry) => (
                          <div key={entry.id} className="relative">
                            {/* Timeline Line */}
                            <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-gold-500/30"></div>
                            
                            <div className="flex gap-4">
                              {/* Timeline Dot */}
                              <div className="w-12 h-12 bg-dungeon-700 rounded-full flex items-center justify-center border-2 border-gold-500/50 relative z-10">
                                {getTypeIcon(entry.type)}
                              </div>
                              
                              {/* Content */}
                              <div className="flex-1 pb-6">
                                <div className="scroll-bg p-4 rounded-lg border border-gold-500/30 shadow-lg">
                                  <div className="flex justify-between items-start mb-3">
                                    <div>
                                      <h3 className="text-lg font-fantasy font-semibold text-dungeon-900 mb-1">
                                        {entry.title}
                                      </h3>
                                      <div className="flex items-center gap-2 text-sm text-dungeon-700">
                                        <span>{new Date(entry.date).toLocaleDateString('fr-FR')}</span>
                                        {entry.session && (
                                          <>
                                            <span>•</span>
                                            <span>Session {entry.session}</span>
                                          </>
                                        )}
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Badge className={getTypeColor(entry.type)}>
                                        {getTypeIcon(entry.type)}
                                        <span className="ml-1">{getTypeName(entry.type)}</span>
                                      </Badge>
                                      {entry.isSecret && (
                                        <Badge variant="destructive" className="text-xs">
                                          MJ Seulement
                                        </Badge>
                                      )}
                                    </div>
                                  </div>
                                  
                                  <p className="text-dungeon-800 leading-relaxed mb-3">
                                    {entry.content}
                                  </p>
                                  
                                  {entry.tags && entry.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-1">
                                      {entry.tags.map((tag, index) => (
                                        <Badge 
                                          key={index} 
                                          variant="outline" 
                                          className="text-xs bg-dungeon-800/20 text-dungeon-700 border-dungeon-600/30"
                                        >
                                          #{tag}
                                        </Badge>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                        
                        {gallery.timeline.length === 0 && (
                          <div className="text-center py-12">
                            <Scroll className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-gold-200 mb-2">
                              Aucune entrée dans la chronologie
                            </h3>
                            <p className="text-muted-foreground">
                              Commencez à documenter l'histoire de {gallery.characterName}
                            </p>
                          </div>
                        )}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* New Entry Dialog */}
      <Dialog open={showNewEntryForm} onOpenChange={setShowNewEntryForm}>
        <DialogContent className="max-w-2xl dungeon-card">
          <DialogHeader>
            <DialogTitle className="text-gold-200">
              Nouvelle Entrée - {selectedGallery?.characterName}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gold-200 mb-2 block">Type d'entrée</label>
              <select
                value={newEntry.type}
                onChange={(e) => setNewEntry(prev => ({ ...prev, type: e.target.value as HistoryEntry['type'] }))}
                className="w-full p-2 rounded bg-dungeon-800/50 border border-gold-500/30 text-foreground"
              >
                <option value="story">Histoire personnelle</option>
                <option value="session">Session de jeu</option>
                <option value="milestone">Étape importante</option>
                <option value="relationship">Relation</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-gold-200 mb-2 block">Titre</label>
              <Input
                placeholder="Titre de l'entrée..."
                value={newEntry.title}
                onChange={(e) => setNewEntry(prev => ({ ...prev, title: e.target.value }))}
                className="bg-dungeon-800/50 border-gold-500/30"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gold-200 mb-2 block">Contenu</label>
              <Textarea
                placeholder="Racontez l'histoire de ce moment épique..."
                value={newEntry.content}
                onChange={(e) => setNewEntry(prev => ({ ...prev, content: e.target.value }))}
                className="bg-dungeon-800/50 border-gold-500/30 h-32"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gold-200 mb-2 block">Tags (séparés par des virgules)</label>
              <Input
                placeholder="Combat, Mystère, Amitié..."
                value={newEntry.tags}
                onChange={(e) => setNewEntry(prev => ({ ...prev, tags: e.target.value }))}
                className="bg-dungeon-800/50 border-gold-500/30"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isSecret"
                checked={newEntry.isSecret}
                onChange={(e) => setNewEntry(prev => ({ ...prev, isSecret: e.target.checked }))}
                className="rounded border-gold-500/30"
              />
              <label htmlFor="isSecret" className="text-sm text-gold-200">
                Visible uniquement pour le MJ
              </label>
            </div>

            <div className="flex gap-2 pt-4">
              <Button
                onClick={addNewEntry}
                className="flex-1 bg-gold-600 hover:bg-gold-700 text-dungeon-900"
              >
                Ajouter l'Entrée
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowNewEntryForm(false)}
                className="flex-1"
              >
                Annuler
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CharacterHistory;
