
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Search, Edit2, Trash2, Sword, Shield, FlaskConical, Scroll, Crown, Package, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import ItemForm from "./ItemForm";
import VisualCard from "./VisualCard";

interface Item {
  id: string;
  name: string;
  type: 'weapon' | 'armor' | 'potion' | 'scroll' | 'treasure' | 'misc';
  rarity: 'common' | 'uncommon' | 'rare' | 'very-rare' | 'legendary';
  description: string;
  effects: string;
  value: number;
  owner?: string;
  location?: string;
  image?: string;
  properties?: string[];
}

const ItemCatalog = () => {
  const [items, setItems] = useState<Item[]>([
    {
      id: '1',
      name: 'Épée Longue +1',
      type: 'weapon',
      rarity: 'uncommon',
      description: 'Une épée longue avec une lame finement travaillée, imprégnée d\'une magie subtile qui améliore sa capacité à trancher.',
      effects: '+1 aux jets d\'attaque et de dégâts.',
      value: 350,
      owner: 'Arannis Foxward',
      location: 'Inventaire',
      properties: ['magique', 'tranchant']
    },
    {
      id: '2',
      name: 'Armure de Cuir cloutée',
      type: 'armor',
      rarity: 'common',
      description: 'Une armure de cuir renforcée avec des clous en métal, offrant une protection fiable sans sacrifier la mobilité.',
      effects: 'CA 12 + Modificateur de Dextérité (max 2)',
      value: 45,
      owner: 'Naïa Nightfrost',
      location: 'Portée',
      properties: ['légère', 'discrète']
    },
    {
      id: '3',
      name: 'Potion de Soin Supérieur',
      type: 'potion',
      rarity: 'rare',
      description: 'Une potion scintillante qui restaure une quantité importante de points de vie.',
      effects: 'Restaure 4d4 + 4 points de vie.',
      value: 250,
      owner: 'Sfiri Fortenclume',
      location: 'Ceinture',
      properties: ['consommable', 'magique']
    },
    {
      id: '4',
      name: 'Parchemin de Boule de Feu',
      type: 'scroll',
      rarity: 'rare',
      description: 'Un parchemin magique contenant le sort Boule de Feu.',
      effects: 'Lance le sort Boule de Feu (8d6 dégâts de feu, jet de sauvegarde de Dextérité pour réduire de moitié).',
      value: 500,
      owner: 'Caellum Brisemousse',
      location: 'Sacoche',
      properties: ['à usage unique', 'magique']
    },
    {
      id: '5',
      name: 'Couronne de Velours',
      type: 'treasure',
      rarity: 'uncommon',
      description: 'Une couronne de velours sertie de fausses pierres précieuses, symbole d\'une noblesse déchue.',
      effects: 'Aucun effet direct, mais peut être utilisée pour impressionner ou tromper.',
      value: 75,
      owner: '',
      location: 'Coffre',
      properties: ['apparat', 'tromperie']
    },
    {
      id: '6',
      name: 'Fiole d\'acide',
      type: 'misc',
      rarity: 'common',
      description: 'Une fiole contenant un acide corrosif.',
      effects: '1d6 dégâts d\'acide.',
      value: 25,
      owner: '',
      location: 'Sacoche',
      properties: ['jetable', 'acide']
    },
    {
      id: '7',
      name: 'Arc court',
      type: 'weapon',
      rarity: 'common',
      description: 'Un arc court simple.',
      effects: '1d6 dégâts perçant.',
      value: 25,
      owner: 'Naïa Nightfrost',
      location: 'Inventaire',
      properties: ['perçant', 'distance']
    },
    {
      id: '8',
      name: 'Dague empoisonnée',
      type: 'weapon',
      rarity: 'rare',
      description: 'Une dague dont la lame est enduite de poison.',
      effects: '1d4 dégâts perçant + poison.',
      value: 250,
      owner: '',
      location: 'Ceinture',
      properties: ['perçant', 'poison']
    },
    {
      id: '9',
      name: 'Potion de force de géant des collines',
      type: 'potion',
      rarity: 'rare',
      description: 'En buvant cette potion, vous gagnez une force incroyable.',
      effects: 'Votre score de Force devient 21 pendant 1 heure. Les 5 doses sont dans une seule fiole.',
      value: 150,
      owner: 'Arannis Foxward',
      location: 'Inventaire',
      image: 'https://www.aidedd.org/images/potions/force-de-geant-des-collines.png',
      properties: ['force', 'potion']
    },
    {
      id: '10',
      name: 'Cape de protection',
      type: 'armor',
      rarity: 'rare',
      description: 'Vous confère un bonus de +1 à la CA et aux jets de sauvegarde.',
      effects: '+1 à la CA et aux jets de sauvegarde',
      value: 200,
      owner: 'Caellum Brisemousse',
      location: 'Portée',
      image: 'https://www.aidedd.org/images/objets/cape-de-protection.png',
      properties: ['protection', 'cape']
    },
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedRarity, setSelectedRarity] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | null>(null);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'weapon': return 'bg-red-500/10 text-red-400 border-red-400/50';
      case 'armor': return 'bg-blue-500/10 text-blue-400 border-blue-400/50';
      case 'potion': return 'bg-green-500/10 text-green-400 border-green-400/50';
      case 'scroll': return 'bg-yellow-500/10 text-yellow-400 border-yellow-400/50';
      case 'treasure': return 'bg-purple-500/10 text-purple-400 border-purple-400/50';
      default: return 'bg-gray-500/10 text-gray-400 border-gray-400/50';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'weapon': return <Sword className="w-3 h-3 mr-1" />;
      case 'armor': return <Shield className="w-3 h-3 mr-1" />;
      case 'potion': return <FlaskConical className="w-3 h-3 mr-1" />;
      case 'scroll': return <Scroll className="w-3 h-3 mr-1" />;
      case 'treasure': return <Crown className="w-3 h-3 mr-1" />;
      default: return <Package className="w-3 h-3 mr-1" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'weapon': return 'Arme';
      case 'armor': return 'Armure';
      case 'potion': return 'Potion';
      case 'scroll': return 'Parchemin';
      case 'treasure': return 'Trésor';
      default: return 'Divers';
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'uncommon': return 'bg-green-500/10 text-green-400 border-green-400/50';
      case 'rare': return 'bg-blue-500/10 text-blue-400 border-blue-400/50';
      case 'very-rare': return 'bg-purple-500/10 text-purple-400 border-purple-400/50';
      case 'legendary': return 'bg-orange-500/10 text-orange-400 border-orange-400/50';
      default: return 'bg-gray-500/10 text-gray-400 border-gray-400/50';
    }
  };

  const getRarityLabel = (rarity: string) => {
    switch (rarity) {
      case 'uncommon': return 'Peu commun';
      case 'rare': return 'Rare';
      case 'very-rare': return 'Très rare';
      case 'legendary': return 'Légendaire';
      default: return 'Commun';
    }
  };

  const filteredItems = items.filter(item => {
    const searchMatch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const typeMatch = selectedType ? item.type === selectedType : true;
    const rarityMatch = selectedRarity ? item.rarity === selectedRarity : true;
    return searchMatch && typeMatch && rarityMatch;
  }).sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    return sortOrder === 'asc' ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
  });

  const handleSaveItem = (item: Omit<Item, 'id'>) => {
    if (editingItem) {
      // Update existing item
      setItems(prevItems =>
        prevItems.map(i => (i.id === editingItem.id ? { ...i, ...item } : i))
      );
    } else {
      // Create new item
      setItems(prevItems => [...prevItems, { ...item, id: String(Date.now()) }]);
    }
    setEditingItem(null);
    setIsFormOpen(false);
  };

  const handleDeleteItem = (id: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const updateItemOwner = (itemId: string, newOwner: string) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, owner: newOwner === "none" ? "" : newOwner } : item
      )
    );
  };

  const players = [
    'Sfiri Fortenclume',
    'Arannis Foxward', 
    'Naïa Nightfrost',
    'Caellum Brisemousse'
  ];

  return (
    <div className="space-y-6">
      {/* Header & Filters */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-fantasy font-bold text-gold-200 mb-2">
            Catalogue d'Objets
          </h2>
          <p className="text-muted-foreground">
            Inventaire des armes, armures et trésors de votre campagne
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button className="bg-gold-600 hover:bg-gold-700 text-dungeon-900" onClick={() => setIsFormOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Ajouter un Objet
          </Button>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-2 w-full md:w-auto">
          <Input
            type="text"
            placeholder="Rechercher un objet..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-dungeon-800/50 border-gold-500/30 flex-1"
          />
          <Search className="w-4 h-4 text-gold-300 ml-2" />
        </div>

        <div className="flex items-center space-x-2">
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-[180px] bg-dungeon-800/50 border-gold-500/30">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent className="bg-dungeon-800 border-gold-500/30">
              <SelectItem value="">Tous les types</SelectItem>
              <SelectItem value="weapon">Arme</SelectItem>
              <SelectItem value="armor">Armure</SelectItem>
              <SelectItem value="potion">Potion</SelectItem>
              <SelectItem value="scroll">Parchemin</SelectItem>
              <SelectItem value="treasure">Trésor</SelectItem>
              <SelectItem value="misc">Divers</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedRarity} onValueChange={setSelectedRarity}>
            <SelectTrigger className="w-[180px] bg-dungeon-800/50 border-gold-500/30">
              <SelectValue placeholder="Rareté" />
            </SelectTrigger>
            <SelectContent className="bg-dungeon-800 border-gold-500/30">
              <SelectItem value="">Toutes les raretés</SelectItem>
              <SelectItem value="common">Commun</SelectItem>
              <SelectItem value="uncommon">Peu commun</SelectItem>
              <SelectItem value="rare">Rare</SelectItem>
              <SelectItem value="very-rare">Très rare</SelectItem>
              <SelectItem value="legendary">Légendaire</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="icon" onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
            <Filter className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <Card key={item.id} className="dungeon-card group">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-gold-200 text-lg mb-2">{item.name}</CardTitle>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge 
                      className={`${getTypeColor(item.type)} text-xs`}
                    >
                      {getTypeIcon(item.type)}
                      {getTypeLabel(item.type)}
                    </Badge>
                    <Badge 
                      className={`${getRarityColor(item.rarity)} text-xs`}
                    >
                      {getRarityLabel(item.rarity)}
                    </Badge>
                    {item.image && (
                      <VisualCard 
                        image={item.image}
                        title={item.name}
                        description={item.description}
                      />
                    )}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {/* Description */}
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>

              {/* Effects */}
              {item.effects && (
                <div>
                  <h4 className="font-semibold text-gold-200 mb-1">Effets</h4>
                  <p className="text-sm text-gold-300">{item.effects}</p>
                </div>
              )}

              {/* Value */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gold-200">Valeur:</span>
                <span className="text-sm text-gold-300">{item.value} po</span>
              </div>

              {/* Owner & Location */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gold-200">Localisation:</span>
                <span className="text-sm text-gold-300">{item.location}</span>
              </div>
              
              {/* Owner Quick Change */}
              {item.owner && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gold-200">Propriétaire:</span>
                  <Select
                    value={item.owner || "none"}
                    onValueChange={(newOwner) => updateItemOwner(item.id, newOwner)}
                  >
                    <SelectTrigger className="w-full bg-dungeon-800/50 border-gold-500/30">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-dungeon-800 border-gold-500/30">
                      {players.map((player) => (
                        <SelectItem key={player} value={player}>
                          {player}
                        </SelectItem>
                      ))}
                      <SelectItem value="none">Aucun propriétaire</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Properties */}
              {item.properties && item.properties.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gold-200 mb-1">Propriétés</h4>
                  <div className="flex flex-wrap gap-2">
                    {item.properties.map((prop, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {prop}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-end gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    setEditingItem(item);
                    setIsFormOpen(true);
                  }}
                >
                  <Edit2 className="w-4 h-4 mr-1" />
                  Modifier
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDeleteItem(item.id)}
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Supprimer
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Item Form Dialog */}
      <ItemForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingItem(null);
        }}
        onSave={handleSaveItem}
        editingItem={editingItem}
      />
    </div>
  );
};

export default ItemCatalog;
