import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import type { Character } from "@/contexts/CharacterContext";

interface CharacterEditFormProps {
  isOpen: boolean;
  character: Character | null;
  onClose: () => void;
  onSave: (id: string, updated: Partial<Character>) => void;
}

export default function CharacterEditForm({ isOpen, character, onClose, onSave }: CharacterEditFormProps) {
  const [formData, setFormData] = useState<Partial<Character>>({});

  useEffect(() => {
    if (character) {
      // Initialize form data with the character's current values
      setFormData(JSON.parse(JSON.stringify(character)));
    }
  }, [character]);

  // Update HP values
  const updateHp = (field: "current" | "max", value: number) => {
    setFormData((prev) => ({
      ...prev,
      stats: {
        ...(prev.stats || character!.stats),
        hp: {
          ...(prev.stats?.hp || character!.stats.hp),
          [field]: value,
        },
      },
    }));
  };

  // Update other stat values
  const updateStatField = (
    field: keyof Omit<Character["stats"], "hp">,
    value: number
  ) => {
    setFormData((prev) => ({
      ...prev,
      stats: {
        ...(prev.stats || character!.stats),
        hp: {
          ...(prev.stats?.hp || character!.stats.hp),
        },
        [field]: value,
      },
    }));
  };

  const handleSubmit = () => {
    if (character && character.id) {
      onSave(character.id, formData);
      onClose();
    }
  };

  const handleChange = (field: keyof Character, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  if (!isOpen || !character) return null;

  const stats = formData.stats || character.stats;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Modifier {character.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Nom</Label>
            <Input
              id="name"
              value={(formData.name ?? character.name) || ""}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="class">Classe</Label>
              <Input
                id="class"
                value={(formData.class ?? character.class) || ""}
                onChange={(e) => handleChange("class", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="level">Niveau</Label>
              <Input
                id="level"
                type="number"
                value={formData.level ?? character.level}
                onChange={(e) => handleChange("level", parseInt(e.target.value, 10) || 0)}
              />
            </div>
            <div>
              <Label htmlFor="race">Race</Label>
              <Input
                id="race"
                value={(formData.race ?? character.race) || ""}
                onChange={(e) => handleChange("race", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="weaponDamage">Dégâts de l'arme</Label>
              <Input
                id="weaponDamage"
                value={(formData.weaponDamage ?? character.weaponDamage) || ""}
                onChange={(e) => handleChange("weaponDamage", e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="hp-current">HP actuel</Label>
              <Input
                id="hp-current"
                type="number"
                value={stats.hp?.current ?? character.stats.hp.current}
                onChange={(e) => updateHp("current", parseInt(e.target.value, 10) || 0)}
              />
            </div>
            <div>
              <Label htmlFor="hp-max">HP max</Label>
              <Input
                id="hp-max"
                type="number"
                value={stats.hp?.max ?? character.stats.hp.max}
                onChange={(e) => updateHp("max", parseInt(e.target.value, 10) || 0)}
              />
            </div>
            <div>
              <Label htmlFor="ac">Classe d'armure (AC)</Label>
              <Input
                id="ac"
                type="number"
                value={formData.ac ?? character.ac}
                onChange={(e) => handleChange("ac", parseInt(e.target.value, 10) || 0)}
              />
            </div>
            <div>
              <Label htmlFor="proficiencyBonus">Bonus de maîtrise</Label>
              <Input
                id="proficiencyBonus"
                type="number"
                value={formData.proficiencyBonus ?? character.proficiencyBonus}
                onChange={(e) => handleChange("proficiencyBonus", parseInt(e.target.value, 10) || 0)}
              />
            </div>
          </div>
          <div>
            <Label>Caractéristiques</Label>
            <div className="grid grid-cols-3 gap-4 mt-2">
              <div>
                <Label htmlFor="strength">Force</Label>
                <Input
                  id="strength"
                  type="number"
                  value={stats.strength ?? character.stats.strength}
                  onChange={(e) => updateStatField("strength", parseInt(e.target.value, 10) || 0)}
                />
              </div>
              <div>
                <Label htmlFor="dexterity">Dextérité</Label>
                <Input
                  id="dexterity"
                  type="number"
                  value={stats.dexterity ?? character.stats.dexterity}
                  onChange={(e) => updateStatField("dexterity", parseInt(e.target.value, 10) || 0)}
                />
              </div>
              <div>
                <Label htmlFor="constitution">Constitution</Label>
                <Input
                  id="constitution"
                  type="number"
                  value={stats.constitution ?? character.stats.constitution}
                  onChange={(e) => updateStatField("constitution", parseInt(e.target.value, 10) || 0)}
                />
              </div>
              <div>
                <Label htmlFor="intelligence">Intelligence</Label>
                <Input
                  id="intelligence"
                  type="number"
                  value={stats.intelligence ?? character.stats.intelligence}
                  onChange={(e) => updateStatField("intelligence", parseInt(e.target.value, 10) || 0)}
                />
              </div>
              <div>
                <Label htmlFor="wisdom">Sagesse</Label>
                <Input
                  id="wisdom"
                  type="number"
                  value={stats.wisdom ?? character.stats.wisdom}
                  onChange={(e) => updateStatField("wisdom", parseInt(e.target.value, 10) || 0)}
                />
              </div>
              <div>
                <Label htmlFor="charisma">Charisme</Label>
                <Input
                  id="charisma"
                  type="number"
                  value={stats.charisma ?? character.stats.charisma}
                  onChange={(e) => updateStatField("charisma", parseInt(e.target.value, 10) || 0)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end space-x-2 mt-4">
          <Button variant="outline" onClick={onClose}>Annuler</Button>
          <Button onClick={handleSubmit}>Enregistrer</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
