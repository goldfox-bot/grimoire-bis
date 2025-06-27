
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Heart, Shield, Zap, Sword, Eye, Edit2, Dice6 } from "lucide-react";

interface Character {
  id: string;
  name: string;
  race: string;
  class: string;
  level: number;
  portrait?: string;
  currentHP: number;
  maxHP: number;
  ac: number;
  initiative: number;
  speed: number;
  saves: {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
  };
  skills: Array<{
    name: string;
    modifier: number;
    proficient: boolean;
  }>;
  attacks: Array<{
    name: string;
    bonus: number;
    damage: string;
    type: string;
  }>;
  spells?: Array<{
    name: string;
    level: number;
    school: string;
  }>;
  conditions: string[];
  notes: string;
  player: string;
}

const GroupPanel = () => {
  const [characters, setCharacters] = useState<Character[]>([
    {
      id: '1',
      name: 'Kael le Brave',
      race: 'Humain',
      class: 'Paladin',
      level: 7,
      player: 'Alexandre',
      currentHP: 58,
      maxHP: 68,
      ac: 18,
      initiative: 1,
      speed: 30,
      saves: {
        strength: 5,
        dexterity: 1,
        constitution: 3,
        intelligence: 0,
        wisdom: 4,
        charisma: 6
      },
      skills: [
        { name: 'Athlétisme', modifier: 5, proficient: true },
        { name: 'Perspicacité', modifier: 4, proficient: true },
        { name: 'Religion', modifier: 3, proficient: true }
      ],
      attacks: [
        { name: 'Épée de Flamme +2', bonus: 9, damage: '1d8+5 + 1d6 feu', type: 'Tranchant/Feu' },
        { name: 'Bouclier (coup)', bonus: 7, damage: '1d4+3', type: 'Contondant' }
      ],
      spells: [
        { name: 'Soin des blessures', level: 1, school: 'Évocation' },
        { name: 'Châtiment divin', level: 1, school: 'Évocation' },
        { name: 'Protection contre le mal', level: 1, school: 'Abjuration' }
      ],
      conditions: [],
      notes: 'Tank principal du groupe. Excellent en première ligne.'
    },
    {
      id: '2',
      name: 'Dame Lumina',
      race: 'Aasimar',
      class: 'Clerc',
      level: 6,
      player: 'Sarah',
      currentHP: 44,
      maxHP: 48,
      ac: 16,
      initiative: 2,
      speed: 25,
      saves: {
        strength: 2,
        dexterity: 2,
        constitution: 3,
        intelligence: 1,
        wisdom: 7,
        charisma: 4
      },
      skills: [
        { name: 'Médecine', modifier: 7, proficient: true },
        { name: 'Religion', modifier: 4, proficient: true },
        { name: 'Perspicacité', modifier: 7, proficient: true }
      ],
      attacks: [
        { name: 'Masse d\'armes', bonus: 5, damage: '1d6+2', type: 'Contondant' },
        { name: 'Arbalète légère', bonus: 5, damage: '1d8+2', type: 'Perçant' }
      ],
      spells: [
        { name: 'Soin des blessures', level: 1, school: 'Évocation' },
        { name: 'Bénédiction', level: 1, school: 'Enchantement' },
        { name: 'Restauration partielle', level: 2, school: 'Abjuration' },
        { name: 'Arme spirituelle', level: 2, school: 'Évocation' }
      ],
      conditions: [],
      notes: 'Soigneuse principale. Excellente en soutien et buffs.'
    },
    {
      id: '3',
      name: 'Zara Ombrelame',
      race: 'Demi-Elfe',
      class: 'Rôdeuse',
      level: 6,
      player: 'Thomas',
      currentHP: 42,
      maxHP: 50,
      ac: 15,
      initiative: 4,
      speed: 30,
      saves: {
        strength: 6,
        dexterity: 7,
        constitution: 3,
        intelligence: 1,
        wisdom: 4,
        charisma: 2
      },
      skills: [
        { name: 'Survie', modifier: 7, proficient: true },
        { name: 'Perception', modifier: 7, proficient: true },
        { name: 'Furtivité', modifier: 7, proficient: true },
        { name: 'Dressage', modifier: 4, proficient: true }
      ],
      attacks: [
        { name: 'Arc long +1', bonus: 8, damage: '1d8+4', type: 'Perçant' },
        { name: 'Épée courte', bonus: 7, damage: '1d6+3', type: 'Perçant' },
        { name: 'Attaque à deux armes', bonus: 7, damage: '1d6+1', type: 'Perçant' }
      ],
      spells: [
        { name: 'Marque du chasseur', level: 1, school: 'Divination' },
        { name: 'Soin des blessures', level: 1, school: 'Évocation' }
      ],
      conditions: [],
      notes: 'DPS à distance. Excellente en exploration et pistage.'
    },
    {
      id: '4',
      name: 'Finn Doigtsvifs',
      race: 'Halfelin',
      class: 'Roublard',  
      level: 6,
      player: 'Marie',
      currentHP: 36,
      maxHP: 42,
      ac: 14,
      initiative: 5,
      speed: 25,
      saves: {
        strength: 1,
        dexterity: 7,
        constitution: 2,
        intelligence: 6,
        wisdom: 3,
        charisma: 4
      },
      skills: [
        { name: 'Crochetage', modifier: 9, proficient: true },
        { name: 'Furtivité', modifier: 9, proficient: true },
        { name: 'Acrobaties', modifier: 7, proficient: true },
        { name: 'Escamotage', modifier: 9, proficient: true },
        { name: 'Tromperie', modifier: 6, proficient: true }
      ],
      attacks: [
        { name: 'Rapière', bonus: 7, damage: '1d8+3 + 3d6 sneak', type: 'Perçant' },
        { name: 'Dague (lancée)', bonus: 7, damage: '1d4+3', type: 'Perçant' }
      ],
      conditions: [],
      notes: 'Spécialiste des serrures et pièges. DPS en attaque sournoise.'
    }
  ]);

  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

  const getHPColor = (current: number, max: number) => {
    const percentage = (current / max) * 100;
    if (percentage > 75) return 'bg-green-500';
    if (percentage > 50) return 'bg-yellow-500';
    if (percentage > 25) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getHPPercentage = (current: number, max: number) => {
    return Math.max(0, Math.min(100, (current / max) * 100));
  };

  const updateCharacterHP = (characterId: string, newHP: number) => {
    setCharacters(prev => prev.map(char => 
      char.id === characterId 
        ? { ...char, currentHP: Math.max(0, Math.min(char.maxHP, newHP)) }
        : char
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-fantasy font-bold text-gold-200 mb-2">
            Les Maraudeurs de Joyaux Tendres
          </h2>
          <p className="text-muted-foreground">
            Fiches de combat optimisées pour votre groupe d'aventuriers
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Badge className="bg-green-600/20 text-green-300 border-green-500/30 px-3 py-1">
            <Heart className="w-4 h-4 mr-1" />
            Groupe en vie
          </Badge>
          <Button className="bg-gold-600 hover:bg-gold-700 text-dungeon-900">
            <Dice6 className="w-4 h-4 mr-2" />
            Initiative
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="dungeon-card">
          <CardContent className="p-4 text-center">
            <h3 className="text-2xl font-bold text-gold-300">
              {characters.reduce((acc, char) => acc + char.level, 0)}
            </h3>
            <p className="text-sm text-muted-foreground">Niveau Total</p>
          </CardContent>
        </Card>
        <Card className="dungeon-card">
          <CardContent className="p-4 text-center">
            <h3 className="text-2xl font-bold text-green-400">
              {characters.reduce((acc, char) => acc + char.currentHP, 0)}
            </h3>
            <p className="text-sm text-muted-foreground">PV Actuels</p>
          </CardContent>
        </Card>
        <Card className="dungeon-card">
          <CardContent className="p-4 text-center">
            <h3 className="text-2xl font-bold text-blue-400">
              {Math.round(characters.reduce((acc, char) => acc + char.ac, 0) / characters.length)}
            </h3>
            <p className="text-sm text-muted-foreground">CA Moyenne</p>
          </CardContent>
        </Card>
        <Card className="dungeon-card">
          <CardContent className="p-4 text-center">
            <h3 className="text-2xl font-bold text-purple-400">
              {characters.filter(char => char.conditions.length === 0).length}
            </h3>
            <p className="text-sm text-muted-foreground">Sans Condition</p>
          </CardContent>
        </Card>
      </div>

      {/* Character Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {characters.map((character) => (
          <Card key={character.id} className="dungeon-card">
            <CardHeader className="pb-3">
              <div className="flex items-start gap-4">
                <Avatar className="w-20 h-20 border-2 border-gold-500/50">
                  <AvatarImage src={character.portrait} />
                  <AvatarFallback className="bg-dungeon-700 text-gold-200 font-bold text-xl">
                    {character.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <CardTitle className="text-gold-200 text-xl mb-1">
                    {character.name}
                  </CardTitle>
                  <div className="text-sm text-muted-foreground mb-2">
                    <span>{character.race} {character.class}</span>
                    <span className="mx-2">•</span>
                    <span>Niveau {character.level}</span>
                    <span className="mx-2">•</span>
                    <span className="text-gold-300">{character.player}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Shield className="w-4 h-4 text-blue-400" />
                      <span>CA {character.ac}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Zap className="w-4 h-4 text-yellow-400" />
                      <span>Init +{character.initiative}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* HP Bar */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium flex items-center gap-1">
                    <Heart className="w-4 h-4 text-red-400" />
                    Points de Vie
                  </span>
                  <span className="text-sm font-semibold">
                    {character.currentHP} / {character.maxHP}
                  </span>
                </div>
                <Progress 
                  value={getHPPercentage(character.currentHP, character.maxHP)} 
                  className="h-3"
                />
                <div className="flex gap-1 mt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => updateCharacterHP(character.id, character.currentHP - 5)}
                    className="text-xs px-2"
                  >
                    -5
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => updateCharacterHP(character.id, character.currentHP + 5)}
                    className="text-xs px-2"
                  >
                    +5
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => updateCharacterHP(character.id, character.maxHP)}
                    className="text-xs px-2 ml-auto"
                  >
                    Soin complet
                  </Button>
                </div>
              </div>

              {/* Main Attacks */}
              <div>
                <h4 className="font-semibold text-gold-200 mb-2 flex items-center gap-1">
                  <Sword className="w-4 h-4" />
                  Attaques Principales
                </h4>
                <div className="space-y-1">
                  {character.attacks.slice(0, 2).map((attack, index) => (
                    <div key={index} className="flex justify-between items-center p-2 bg-dungeon-800/50 rounded text-sm">
                      <span className="font-medium">{attack.name}</span>
                      <span className="text-gold-300">+{attack.bonus} ({attack.damage})</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Conditions */}
              {character.conditions.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gold-200 mb-2">Conditions</h4>
                  <div className="flex flex-wrap gap-1">
                    {character.conditions.map((condition, index) => (
                      <Badge key={index} variant="destructive" className="text-xs">
                        {condition}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      size="sm" 
                      className="flex-1 bg-gold-600 hover:bg-gold-700 text-dungeon-900"
                      onClick={() => setSelectedCharacter(character)}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Détails
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl dungeon-card max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-gold-200 text-2xl flex items-center gap-3">
                        <Avatar className="w-12 h-12 border-2 border-gold-500/50">
                          <AvatarImage src={character.portrait} />
                          <AvatarFallback className="bg-dungeon-700 text-gold-200 font-bold">
                            {character.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        {character.name}
                      </DialogTitle>
                    </DialogHeader>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Basic Info */}
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-semibold text-gold-200 mb-3">Informations Générales</h3>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>Race: <span className="text-gold-300">{character.race}</span></div>
                            <div>Classe: <span className="text-gold-300">{character.class}</span></div>
                            <div>Niveau: <span className="text-gold-300">{character.level}</span></div>
                            <div>Joueur: <span className="text-gold-300">{character.player}</span></div>
                            <div>CA: <span className="text-gold-300">{character.ac}</span></div>
                            <div>Vitesse: <span className="text-gold-300">{character.speed} ft</span></div>
                          </div>
                        </div>

                        {/* Saves */}
                        <div>
                          <h3 className="font-semibold text-gold-200 mb-3">Jets de Sauvegarde</h3>
                          <div className="grid grid-cols-2 gap-1 text-sm">
                            <div>Force: <span className="text-gold-300">+{character.saves.strength}</span></div>
                            <div>Dextérité: <span className="text-gold-300">+{character.saves.dexterity}</span></div>
                            <div>Constitution: <span className="text-gold-300">+{character.saves.constitution}</span></div>
                            <div>Intelligence: <span className="text-gold-300">+{character.saves.intelligence}</span></div>
                            <div>Sagesse: <span className="text-gold-300">+{character.saves.wisdom}</span></div>
                            <div>Charisme: <span className="text-gold-300">+{character.saves.charisma}</span></div>
                          </div>
                        </div>

                        {/* Skills */}
                        <div>
                          <h3 className="font-semibold text-gold-200 mb-3">Compétences</h3>
                          <div className="space-y-1 text-sm">
                            {character.skills.map((skill, index) => (
                              <div key={index} className="flex justify-between">
                                <span className={skill.proficient ? 'text-gold-300' : ''}>{skill.name}</span>
                                <span className="text-gold-300">+{skill.modifier}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Combat Info */}
                      <div className="space-y-4">
                        {/* Attacks */}
                        <div>
                          <h3 className="font-semibold text-gold-200 mb-3">Attaques</h3>
                          <div className="space-y-2">
                            {character.attacks.map((attack, index) => (
                              <div key={index} className="p-3 bg-dungeon-800/50 rounded border border-gold-500/20">
                                <div className="flex justify-between items-center mb-1">
                                  <span className="font-medium text-gold-200">{attack.name}</span>
                                  <span className="text-gold-300">+{attack.bonus}</span>
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  <div>Dégâts: {attack.damage}</div>
                                  <div>Type: {attack.type}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Spells */}
                        {character.spells && character.spells.length > 0 && (
                          <div>
                            <h3 className="font-semibold text-gold-200 mb-3">Sorts</h3>
                            <div className="space-y-2">
                              {character.spells.map((spell, index) => (
                                <div key={index} className="p-2 bg-dungeon-800/50 rounded border border-gold-500/20">
                                  <div className="flex justify-between items-center">
                                    <span className="font-medium text-purple-300">{spell.name}</span>
                                    <div className="text-xs">
                                      <Badge variant="outline" className="text-xs">
                                        Niv. {spell.level}
                                      </Badge>
                                    </div>
                                  </div>
                                  <div className="text-xs text-muted-foreground mt-1">
                                    École: {spell.school}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Notes */}
                        {character.notes && (
                          <div>
                            <h3 className="font-semibold text-gold-200 mb-3">Notes</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {character.notes}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                
                <Button size="sm" variant="outline" className="flex-1">
                  <Edit2 className="w-4 h-4 mr-1" />
                  Modifier
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default GroupPanel;
