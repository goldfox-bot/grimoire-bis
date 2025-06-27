
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Plus, MapPin, ShoppingCart, Crown, Sword, Users, Heart } from "lucide-react";

interface NPC {
  id: string;
  name: string;
  race: string;
  class: string;
  level: number;
  location: string;
  role: 'ally' | 'enemy' | 'neutral' | 'merchant' | 'noble' | 'guard';
  description: string;
  portrait?: string;
  items?: Array<{
    name: string;
    price: number;
    type: string;
  }>;
  relationship: 'friendly' | 'hostile' | 'neutral' | 'romantic';
  notes: string;
}

const NPCDirectory = () => {
  const [npcs, setNpcs] = useState<NPC[]>([
    {
      id: '1',
      name: 'Maître Eldric le Sage',
      race: 'Elfe',
      class: 'Magicien',
      level: 12,
      location: 'Cité de Lumière Dorée',
      role: 'ally',
      description: 'Ancien membre de l\'Ordre des Mages Étoilés, maintenant bibliothécaire en chef de la Grande Académie. Mentor des Maraudeurs et source de sagesse ancienne.',
      relationship: 'friendly',
      notes: 'Connaît des secrets sur les Joyaux Tendres. Toujours prêt à aider avec des sorts de divination.'
    },
    {
      id: '2',
      name: 'Dame Seraphina Cœur-d\'Or',
      race: 'Humaine',
      class: 'Paladin',
      level: 10,
      location: 'Cité de Lumière Dorée',
      role: 'merchant',
      description: 'Noble marchande spécialisée dans les objets magiques. Dirige la plus grande maison de commerce de gemmes de la cité.',
      relationship: 'friendly',
      notes: 'Offre des prix préférentiels aux Maraudeurs. Possède des contacts dans tout le royaume.',
      items: [
        { name: 'Potion de Soin Supérieure', price: 500, type: 'Potion' },
        { name: 'Amulette de Protection +2', price: 2000, type: 'Accessoire' },
        { name: 'Parchemin de Boule de Feu', price: 150, type: 'Parchemin' }
      ]
    },
    {
      id: '3',
      name: 'Thorek Barbe-de-Fer',
      race: 'Nain',
      class: 'Forgeron',
      level: 8,
      location: 'Cité de Lumière Dorée',
      role: 'merchant',
      description: 'Maître forgeron réputé pour ses armes légendaires. Ancien aventurier reconverti dans l\'artisanat après une blessure au genou.',
      relationship: 'friendly',
      notes: 'Peut améliorer les armes du groupe moyennant des matériaux rares. Raconte de bonnes histoires.',
      items: [
        { name: 'Épée Longue +1', price: 1000, type: 'Arme' },
        { name: 'Armure de Plates Naine', price: 1500, type: 'Armure' },
        { name: 'Bouclier Runique', price: 800, type: 'Bouclier' }
      ]
    },
    {
      id: '4',
      name: 'Ombre-Sanglante',
      race: 'Tieffelin',
      class: 'Assassin',
      level: 15,
      location: 'Donjon des Échos Perdus',
      role: 'enemy',
      description: 'Chef de la guilde des assassins "Les Lames Silencieuses". Rival juré des Maraudeurs depuis l\'incident du Cristal Noir.',
      relationship: 'hostile',
      notes: 'Extrêmement dangereux. Maîtrise les poisons et la magie d\'ombre. Ne jamais l\'affronter seul.'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [selectedNPC, setSelectedNPC] = useState<NPC | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const filteredNPCs = npcs.filter(npc => {
    const matchesSearch = npc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         npc.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'all' || npc.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const getRoleIcon = (role: NPC['role']) => {
    switch (role) {
      case 'ally': return <Heart className="w-4 h-4" />;
      case 'enemy': return <Sword className="w-4 h-4" />;
      case 'merchant': return <ShoppingCart className="w-4 h-4" />;
      case 'noble': return <Crown className="w-4 h-4" />;
      case 'guard': return <Users className="w-4 h-4" />;
      default: return <Users className="w-4 h-4" />;
    }
  };

  const getRoleColor = (role: NPC['role']) => {
    switch (role) {
      case 'ally': return 'bg-green-600/20 text-green-300 border-green-500/30';
      case 'enemy': return 'bg-red-600/20 text-red-300 border-red-500/30';
      case 'merchant': return 'bg-gold-600/20 text-gold-300 border-gold-500/30';
      case 'noble': return 'bg-purple-600/20 text-purple-300 border-purple-500/30';
      case 'guard': return 'bg-blue-600/20 text-blue-300 border-blue-500/30';
      default: return 'bg-gray-600/20 text-gray-300 border-gray-500/30';
    }
  };

  const getRelationshipColor = (relationship: NPC['relationship']) => {
    switch (relationship) {
      case 'friendly': return 'text-green-400';
      case 'hostile': return 'text-red-400';
      case 'romantic': return 'text-pink-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-fantasy font-bold text-gold-200 mb-2">
            Annuaire des PNJ
          </h2>
          <p className="text-muted-foreground">
            Gérez vos personnages non-joueurs et leurs relations avec les Maraudeurs
          </p>
        </div>
        <Button
          onClick={() => setShowAddForm(true)}
          className="bg-gold-600 hover:bg-gold-700 text-dungeon-900"
        >
          <Plus className="w-4 h-4 mr-2" />
          Nouveau PNJ
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-4 items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher un PNJ ou un lieu..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-dungeon-800/50 border-gold-500/30"
          />
        </div>
        <select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          className="px-3 py-2 rounded bg-dungeon-800/50 border border-gold-500/30 text-foreground"
        >
          <option value="all">Tous les rôles</option>
          <option value="ally">Alliés</option>
          <option value="enemy">Ennemis</option>
          <option value="merchant">Marchands</option>
          <option value="noble">Nobles</option>
          <option value="guard">Gardes</option>
          <option value="neutral">Neutres</option>
        </select>
      </div>

      {/* NPC Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNPCs.map((npc) => (
          <Card key={npc.id} className="dungeon-card hover:scale-105 transition-transform duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-start gap-3">
                <Avatar className="w-16 h-16 border-2 border-gold-500/30">
                  <AvatarImage src={npc.portrait} />
                  <AvatarFallback className="bg-dungeon-700 text-gold-200 font-bold text-lg">
                    {npc.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <CardTitle className="text-gold-200 text-lg mb-1">{npc.name}</CardTitle>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <span>{npc.race}</span>
                    <span>•</span>
                    <span>{npc.class}</span>
                    <span>•</span>
                    <span>Niv. {npc.level}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="w-3 h-3" />
                    <span className="truncate">{npc.location}</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <Badge className={getRoleColor(npc.role)}>
                  {getRoleIcon(npc.role)}
                  <span className="ml-1 capitalize">{npc.role}</span>
                </Badge>
                <div className={`text-sm ${getRelationshipColor(npc.relationship)}`}>
                  {npc.relationship === 'friendly' && '😊'}
                  {npc.relationship === 'hostile' && '😠'}
                  {npc.relationship === 'neutral' && '😐'}
                  {npc.relationship === 'romantic' && '💕'}
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground line-clamp-3">
                {npc.description}
              </p>

              {npc.items && npc.items.length > 0 && (
                <div className="border-t border-gold-500/20 pt-3">
                  <div className="flex items-center gap-2 mb-2">
                    <ShoppingCart className="w-4 h-4 text-gold-400" />
                    <span className="text-sm font-semibold text-gold-200">Boutique</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {npc.items.length} objet{npc.items.length > 1 ? 's' : ''} disponible{npc.items.length > 1 ? 's' : ''}
                  </div>
                </div>
              )}

              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full border-gold-500/30 hover:bg-gold-600/20"
                    onClick={() => setSelectedNPC(npc)}
                  >
                    Voir les détails
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl dungeon-card">
                  <DialogHeader>
                    <DialogTitle className="text-gold-200 text-xl">{npc.name}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <Avatar className="w-20 h-20 border-2 border-gold-500/30">
                        <AvatarImage src={npc.portrait} />
                        <AvatarFallback className="bg-dungeon-700 text-gold-200 font-bold text-xl">
                          {npc.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-2">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Race:</span>
                            <span className="ml-2 text-gold-200">{npc.race}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Classe:</span>
                            <span className="ml-2 text-gold-200">{npc.class}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Niveau:</span>
                            <span className="ml-2 text-gold-200">{npc.level}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Lieu:</span>
                            <span className="ml-2 text-gold-200">{npc.location}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getRoleColor(npc.role)}>
                            {getRoleIcon(npc.role)}
                            <span className="ml-1 capitalize">{npc.role}</span>
                          </Badge>
                          <span className={`text-sm ${getRelationshipColor(npc.relationship)}`}>
                            Relation: {npc.relationship}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gold-200 mb-2">Description</h4>
                      <p className="text-sm leading-relaxed">{npc.description}</p>
                    </div>

                    {npc.notes && (
                      <div>
                        <h4 className="font-semibold text-gold-200 mb-2">Notes du MJ</h4>
                        <p className="text-sm leading-relaxed text-muted-foreground">{npc.notes}</p>
                      </div>
                    )}

                    {npc.items && npc.items.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-gold-200 mb-3 flex items-center gap-2">
                          <ShoppingCart className="w-4 h-4" />
                          Boutique
                        </h4>
                        <div className="grid gap-2">
                          {npc.items.map((item, index) => (
                            <div key={index} className="flex justify-between items-center p-2 bg-dungeon-800/50 rounded border border-gold-500/20">
                              <div>
                                <span className="font-medium text-gold-200">{item.name}</span>
                                <span className="ml-2 text-xs text-muted-foreground">({item.type})</span>
                              </div>
                              <span className="text-gold-300 font-semibold">{item.price} po</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredNPCs.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gold-200 mb-2">Aucun PNJ trouvé</h3>
          <p className="text-muted-foreground">
            {searchTerm || selectedRole !== 'all' 
              ? 'Essayez de modifier vos critères de recherche'
              : 'Commencez par ajouter votre premier PNJ'
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default NPCDirectory;
