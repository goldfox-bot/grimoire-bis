import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Plus, Sword, Shield, Zap, Scroll, Gem, Package, Edit, User } from "lucide-react";
import ItemForm from "./ItemForm";

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
  // Liste des joueurs disponibles
  const players = [
    'Kael le Brave',
    'Dame Lumina',
    'Eldric le Sage',
    'Lyra Chantelame',
    'Thorin Barbe-de-Fer'
  ];

  const [items, setItems] = useState<Item[]>([
    {
      id: '1',
      name: 'Épée de Flamme Éternelle',
      type: 'weapon',
      rarity: 'rare',
      description: 'Cette épée longue ancienne brille d\'une flamme dorée qui ne s\'éteint jamais. Forgée par les maîtres elfes il y a des millénaires.',
      effects: '+2 aux jets d\'attaque et de dégâts. Inflige 1d6 dégâts de feu supplémentaires. Émet une lumière vive dans un rayon de 3 mètres.',
      value: 5000,
      owner: 'Kael le Brave',
      properties: ['Magique', 'Feu', 'Lumineux']
    },
    {
      id: '2',
      name: 'Armure du Gardien Stellaire',
      type: 'armor',
      rarity: 'very-rare',
      description: 'Armure de plates ornée de motifs stellaires qui scintillent dans l\'obscurité. Portée par les anciens gardiens des temples célestes.',
      effects: 'CA 18 + mod Dex (max 2). Résistance aux dégâts radiants. Une fois par jour, peut lancer "Bouclier de foi".',
      value: 8000,
      owner: 'Dame Lumina',
      properties: ['Magique', 'Radiant', 'Stellaire']
    },
    {
      id: '3',
      name: 'Potion de Guérison Majeure',
      type: 'potion',
      rarity: 'uncommon',
      description: 'Fiole de cristal contenant un liquide rouge rubis qui pulse comme un cœur battant.',
      effects: 'Restaure 4d4+4 points de vie instantanément.',
      value: 300,
      location: 'Réserve du groupe',
      properties: ['Consommable', 'Soin']
    },
    {
      id: '4',
      name: 'Parchemin de Téléportation',
      type: 'scroll',
      rarity: 'rare',
      description: 'Parchemin ancien écrit dans une langue oubliée, dont les runes brillent d\'une lueur bleutée.',
      effects: 'Permet de lancer le sort "Téléportation" sans dépenser d\'emplacement de sort.',
      value: 1500,
      location: 'Bibliothèque d\'Eldric',
      properties: ['Magique', 'Téléportation', 'Usage unique']
    },
    {
      id: '5',
      name: 'Joyau Tendre de Sagesse',
      type: 'treasure',
      rarity: 'legendary',
      description: 'L\'un des légendaires Joyaux Tendres, cette gemme violette pulse d\'une énergie mentale pure. Quête principale des Maraudeurs.',
      effects: '+3 à la Sagesse (maximum 23). Permet de lancer "Vision mystique" 3 fois par jour. Confère la télépathie sur 36 mètres.',
      value: 50000,
      location: 'Sanctuaire Secret',
      properties: ['Légendaire', 'Mental', 'Quête']
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedRarity, setSelectedRarity] = useState<string>('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | null>(null);

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || item.type === selectedType;
    const matchesRarity = selectedRarity === 'all' || item.rarity === selectedRarity;
    return matchesSearch && matchesType && matchesRarity;
  });

  const handleSaveItem = (itemData: Omit<Item, 'id'>) => {
    if (editingItem) {
      // Modifier objet existant
      setItems(prev => prev.map(item => 
        item.id === editingItem.id 
          ? { ...itemData, id: editingItem.id }
          : item
      ));
      setEditingItem(null);
    } else {
      // Ajouter nouvel objet
      const newItem: Item = {
        ...itemData,
        id: Date.now().toString()
      };
      setItems(prev => [...prev, newItem]);
    }
    console.log('Objet sauvegardé:', itemData);
  };

  const handleEditItem = (item: Item) => {
    setEditingItem(item);
    setShowAddForm(true);
  };

  const handleCloseForm = () => {
    setShowAddForm(false);
    setEditingItem(null);
  };

  // Nouvelle fonction pour changer le propriétaire rapidement
  const handleOwnerChange = (itemId: string, newOwner: string) => {
    setItems(prev => prev.map(item => 
      item.id === itemId 
        ? { 
            ...item, 
            owner: newOwner === 'none' ? undefined : newOwner,
            location: newOwner === 'none' ? 'Non attribué' : undefined
          }
        : item
    ));
    console.log(`Propriétaire changé pour l'objet ${itemId}: ${newOwner}`);
  };

  const getTypeIcon = (type: Item['type']) => {
    switch (type) {
      case 'weapon': return <Sword className="w-4 h-4" />;
      case 'armor': return <Shield className="w-4 h-4" />;
      case 'potion': return <Zap className="w-4 h-4" />;
      case 'scroll': return <Scroll className="w-4 h-4" />;
      case 'treasure': return <Gem className="w-4 h-4" />;
      default: return <Package className="w-4 h-4" />;
    }
  };

  const getRarityColor = (rarity: Item['rarity']) => {
    switch (rarity) {
      case 'common': return 'bg-gray-600/20 text-gray-300 border-gray-500/30';
      case 'uncommon': return 'bg-green-600/20 text-green-300 border-green-500/30';
      case 'rare': return 'bg-blue-600/20 text-blue-300 border-blue-500/30';
      case 'very-rare': return 'bg-purple-600/20 text-purple-300 border-purple-500/30';
      case 'legendary': return 'bg-gold-600/20 text-gold-300 border-gold-500/30';
      default: return 'bg-gray-600/20 text-gray-300 border-gray-500/30';
    }
  };

  const getRarityName = (rarity: Item['rarity']) => {
    switch (rarity) {
      case 'very-rare': return 'Très Rare';
      case 'legendary': return 'Légendaire';
      default: return rarity.charAt(0).toUpperCase() + rarity.slice(1);
    }
  };

  const getTypeName = (type: Item['type']) => {
    switch (type) {
      case 'weapon': return 'Arme';
      case 'armor': return 'Armure';
      case 'potion': return 'Potion';
      case 'scroll': return 'Parchemin';
      case 'treasure': return 'Trésor';
      case 'misc': return 'Divers';
      default: return type;
    }
  };

  const groupedItems = {
    weapon: items.filter(item => item.type === 'weapon'),
    armor: items.filter(item => item.type === 'armor'),
    potion: items.filter(item => item.type === 'potion'),
    scroll: items.filter(item => item.type === 'scroll'),
    treasure: items.filter(item => item.type === 'treasure'),
    misc: items.filter(item => item.type === 'misc')
  };

  const ItemCard = ({ item }: { item: Item }) => (
    <Card className="dungeon-card hover:scale-105 transition-transform duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-dungeon-700/50 rounded-lg flex items-center justify-center border border-gold-500/30">
            {getTypeIcon(item.type)}
          </div>
          <div className="flex-1 min-w-0">
            <CardTitle className="text-gold-200 text-sm sm:text-lg mb-1 truncate">{item.name}</CardTitle>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-2">
              <Badge className={getRarityColor(item.rarity)}>
                {getRarityName(item.rarity)}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {getTypeName(item.type)}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-xs sm:text-sm text-muted-foreground line-clamp-3">
          {item.description}
        </p>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-sm">
          <span className="text-gold-300 font-semibold">{item.value.toLocaleString()} po</span>
        </div>

        {/* Nouveau sélecteur de propriétaire */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <User className="w-3 h-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Propriétaire:</span>
          </div>
          <Select
            value={item.owner || 'none'}
            onValueChange={(value) => handleOwnerChange(item.id, value)}
          >
            <SelectTrigger className="h-8 text-xs bg-dungeon-800/50 border-gold-500/30">
              <SelectValue placeholder="Sélectionner un joueur" />
            </SelectTrigger>
            <SelectContent className="bg-dungeon-800 border-gold-500/30">
              <SelectItem value="none" className="text-xs">Non attribué</SelectItem>
              {players.map((player) => (
                <SelectItem key={player} value={player} className="text-xs">
                  {player}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {item.location && !item.owner && (
          <div className="text-xs text-muted-foreground">
            📍 {item.location}
          </div>
        )}

        {item.properties && item.properties.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {item.properties.slice(0, 3).map((prop, index) => (
              <Badge key={index} variant="outline" className="text-xs bg-dungeon-800/50">
                {prop}
              </Badge>
            ))}
            {item.properties.length > 3 && (
              <span className="text-xs text-muted-foreground">+{item.properties.length - 3}</span>
            )}
          </div>
        )}

        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="flex-1 border-gold-500/30 hover:bg-gold-600/20 text-xs sm:text-sm">
                Détails
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl dungeon-card">
              <DialogHeader>
                <DialogTitle className="text-gold-200 text-xl flex items-center gap-2">
                  {getTypeIcon(item.type)}
                  {item.name}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Badge className={getRarityColor(item.rarity)}>
                    {getRarityName(item.rarity)}
                  </Badge>
                  <Badge variant="outline">
                    {getTypeName(item.type)}
                  </Badge>
                  <span className="text-gold-300 font-semibold text-lg ml-auto">
                    {item.value.toLocaleString()} po
                  </span>
                </div>

                <div>
                  <h4 className="font-semibold text-gold-200 mb-2">Description</h4>
                  <p className="text-sm leading-relaxed">{item.description}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-gold-200 mb-2">Effets</h4>
                  <p className="text-sm leading-relaxed text-green-300">{item.effects}</p>
                </div>

                {item.properties && item.properties.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gold-200 mb-2">Propriétés</h4>
                    <div className="flex flex-wrap gap-2">
                      {item.properties.map((prop, index) => (
                        <Badge key={index} variant="outline" className="bg-dungeon-800/50">
                          {prop}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="border-t border-gold-500/20 pt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-muted-foreground text-sm">Propriétaire:</span>
                      <p className="text-gold-200 font-medium">
                        {item.owner || 'Non attribué'}
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-sm">Localisation:</span>
                      <p className="text-gold-200 font-medium">
                        {item.location || 'Inconnue'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleEditItem(item)}
            className="border-gold-500/30 hover:bg-gold-600/20"
          >
            <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl sm:text-3xl font-fantasy font-bold text-gold-200 mb-2">
            Catalogue d'Objets
          </h2>
          <p className="text-muted-foreground text-sm">
            Gérez l'inventaire légendaire des Maraudeurs de Joyaux Tendres
          </p>
        </div>
        <Button 
          onClick={() => setShowAddForm(true)}
          className="bg-gold-600 hover:bg-gold-700 text-dungeon-900 text-sm sm:text-base"
          size="sm"
        >
          <Plus className="w-4 h-4 mr-1 sm:mr-2" />
          <span className="hidden sm:inline">Nouvel Objet</span>
          <span className="sm:hidden">Objet</span>
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-7 bg-dungeon-800/50 border border-gold-500/30">
          <TabsTrigger value="all" className="data-[state=active]:bg-gold-600/20 text-xs sm:text-sm">
            Tous
          </TabsTrigger>
          <TabsTrigger value="weapon" className="data-[state=active]:bg-gold-600/20 text-xs sm:text-sm">
            <Sword className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-1" />
            <span className="hidden sm:inline">Armes</span>
          </TabsTrigger>
          <TabsTrigger value="armor" className="data-[state=active]:bg-gold-600/20 text-xs sm:text-sm">
            <Shield className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-1" />
            <span className="hidden sm:inline">Armures</span>
          </TabsTrigger>
          <TabsTrigger value="potion" className="data-[state=active]:bg-gold-600/20 text-xs sm:text-sm">
            <Zap className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-1" />
            <span className="hidden sm:inline">Potions</span>
          </TabsTrigger>
          <TabsTrigger value="scroll" className="data-[state=active]:bg-gold-600/20 text-xs sm:text-sm">
            <Scroll className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-1" />
            <span className="hidden sm:inline">Parchemins</span>
          </TabsTrigger>
          <TabsTrigger value="treasure" className="data-[state=active]:bg-gold-600/20 text-xs sm:text-sm">
            <Gem className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-1" />
            <span className="hidden sm:inline">Trésors</span>
          </TabsTrigger>
          <TabsTrigger value="misc" className="data-[state=active]:bg-gold-600/20 text-xs sm:text-sm">
            <Package className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-1" />
            <span className="hidden sm:inline">Divers</span>
          </TabsTrigger>
        </TabsList>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-stretch sm:items-center mt-4">
          <div className="relative flex-1 max-w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher un objet..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-dungeon-800/50 border-gold-500/30 text-sm"
            />
          </div>
          <select
            value={selectedRarity}
            onChange={(e) => setSelectedRarity(e.target.value)}
            className="px-3 py-2 rounded bg-dungeon-800/50 border border-gold-500/30 text-foreground text-sm"
          >
            <option value="all">Toutes les raretés</option>
            <option value="common">Commun</option>
            <option value="uncommon">Peu commun</option>
            <option value="rare">Rare</option>
            <option value="very-rare">Très rare</option>
            <option value="legendary">Légendaire</option>
          </select>
        </div>

        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredItems.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        </TabsContent>

        {/* Individual type tabs */}
        {Object.entries(groupedItems).map(([type, typeItems]) => (
          <TabsContent key={type} value={type} className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {typeItems.map((item) => (
                <ItemCard key={item.id} item={item} />
              ))}
            </div>
            {typeItems.length === 0 && (
              <div className="text-center py-12">
                <div className="w-12 h-12 mx-auto mb-4 bg-dungeon-700/50 rounded-lg flex items-center justify-center">
                  {getTypeIcon(type as Item['type'])}
                </div>
                <h3 className="text-lg font-semibold text-gold-200 mb-2">
                  Aucun {getTypeName(type as Item['type']).toLowerCase()}
                </h3>
                <p className="text-muted-foreground">
                  Commencez par ajouter votre premier objet de ce type
                </p>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
      
      <ItemForm
        isOpen={showAddForm}
        onClose={handleCloseForm}
        onSave={handleSaveItem}
        editingItem={editingItem}
      />
    </div>
  );
};

export default ItemCatalog;
