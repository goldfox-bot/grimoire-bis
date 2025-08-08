
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus, Save, X } from "lucide-react";

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

interface ItemFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: Omit<Item, 'id'>) => void;
  editingItem?: Item | null;
}

const ItemForm = ({ isOpen, onClose, onSave, editingItem }: ItemFormProps) => {
  const [formData, setFormData] = useState({
    name: editingItem?.name || '',
    type: editingItem?.type || 'misc' as const,
    rarity: editingItem?.rarity || 'common' as const,
    description: editingItem?.description || '',
    effects: editingItem?.effects || '',
    value: editingItem?.value || 0,
    owner: editingItem?.owner || '',
    location: editingItem?.location || '',
    image: editingItem?.image || '',
    properties: editingItem?.properties || []
  });

  const [newProperty, setNewProperty] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      type: 'misc',
      rarity: 'common',
      description: '',
      effects: '',
      value: 0,
      owner: '',
      location: '',
      image: '',
      properties: []
    });
  };

  const addProperty = () => {
    if (newProperty.trim() && !formData.properties.includes(newProperty.trim())) {
      setFormData(prev => ({
        ...prev,
        properties: [...prev.properties, newProperty.trim()]
      }));
      setNewProperty('');
    }
  };

  const removeProperty = (index: number) => {
    setFormData(prev => ({
      ...prev,
      properties: prev.properties.filter((_, i) => i !== index)
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl dungeon-card max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-gold-200 text-xl">
            {editingItem ? 'Modifier l\'objet' : 'Nouvel objet'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <Label htmlFor="name" className="text-gold-200">Nom</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="bg-dungeon-800/50 border-gold-500/30"
                required
              />
            </div>
            <div>
              <Label htmlFor="type" className="text-gold-200">Type</Label>
              <select
                id="type"
                value={formData.type}
                onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as Item['type'] }))}
                className="w-full px-3 py-2 rounded bg-dungeon-800/50 border border-gold-500/30 text-foreground"
              >
                <option value="weapon">Arme</option>
                <option value="armor">Armure</option>
                <option value="potion">Potion</option>
                <option value="scroll">Parchemin</option>
                <option value="treasure">Trésor</option>
                <option value="misc">Divers</option>
              </select>
            </div>
            <div>
              <Label htmlFor="rarity" className="text-gold-200">Rareté</Label>
              <select
                id="rarity"
                value={formData.rarity}
                onChange={(e) => setFormData(prev => ({ ...prev, rarity: e.target.value as Item['rarity'] }))}
                className="w-full px-3 py-2 rounded bg-dungeon-800/50 border border-gold-500/30 text-foreground"
              >
                <option value="common">Commun</option>
                <option value="uncommon">Peu commun</option>
                <option value="rare">Rare</option>
                <option value="very-rare">Très rare</option>
                <option value="legendary">Légendaire</option>
              </select>
            </div>
            <div>
              <Label htmlFor="value" className="text-gold-200">Valeur (po)</Label>
              <Input
                id="value"
                type="number"
                min="0"
                value={formData.value}
                onChange={(e) => setFormData(prev => ({ ...prev, value: parseInt(e.target.value) || 0 }))}
                className="bg-dungeon-800/50 border-gold-500/30"
                required
              />
            </div>
            <div>
              <Label htmlFor="owner" className="text-gold-200">Propriétaire</Label>
              <Input
                id="owner"
                value={formData.owner}
                onChange={(e) => setFormData(prev => ({ ...prev, owner: e.target.value }))}
                className="bg-dungeon-800/50 border-gold-500/30"
                placeholder="Optionnel"
              />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="location" className="text-gold-200">Localisation</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                className="bg-dungeon-800/50 border-gold-500/30"
                placeholder="Optionnel"
              />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="image" className="text-gold-200">Visuel (optionnel)</Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                className="bg-dungeon-800/50 border-gold-500/30"
                onChange={(e) => {
                  const file = (e.target as HTMLInputElement).files?.[0]
                  if (!file) return
                  const reader = new FileReader()
                  reader.onload = () => setFormData(prev => ({ ...prev, image: reader.result as string }))
                  reader.readAsDataURL(file)
                }}
              />
                {formData.image && (
                  <img
                    src={formData.image}
                    alt={`Aperçu visuel ${formData.name || 'objet'}`}
                    loading="lazy"
                    className="mt-2 w-full aspect-[2.5/3.5] object-cover rounded-lg border border-gold-500/30"
                  />
                )}
              </div>
            </div>

          <div>
            <Label htmlFor="description" className="text-gold-200">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="bg-dungeon-800/50 border-gold-500/30 min-h-20"
              required
            />
          </div>

          <div>
            <Label htmlFor="effects" className="text-gold-200">Effets</Label>
            <Textarea
              id="effects"
              value={formData.effects}
              onChange={(e) => setFormData(prev => ({ ...prev, effects: e.target.value }))}
              className="bg-dungeon-800/50 border-gold-500/30 min-h-16"
              required
            />
          </div>

          {/* Properties Section */}
          <div>
            <Label className="text-gold-200">Propriétés</Label>
            <div className="space-y-2">
              <div className="flex flex-wrap gap-2">
                {formData.properties.map((property, index) => (
                  <Badge key={index} variant="outline" className="bg-dungeon-800/50 flex items-center gap-1">
                    {property}
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      onClick={() => removeProperty(index)}
                      className="h-4 w-4 p-0 hover:bg-red-600/20"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
              
              <div className="flex gap-2">
                <Input
                  placeholder="Nouvelle propriété"
                  value={newProperty}
                  onChange={(e) => setNewProperty(e.target.value)}
                  className="bg-dungeon-800/50 border-gold-500/30 flex-1"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addProperty())}
                />
                <Button
                  type="button"
                  onClick={addProperty}
                  size="sm"
                  className="bg-gold-600 hover:bg-gold-700"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1 bg-gold-600 hover:bg-gold-700 text-dungeon-900">
              <Save className="w-4 h-4 mr-2" />
              {editingItem ? 'Modifier' : 'Créer'}
            </Button>
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Annuler
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ItemForm;
