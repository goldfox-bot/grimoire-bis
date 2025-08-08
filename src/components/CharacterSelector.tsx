import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";
import { useCharacter } from "@/contexts/CharacterContext";

const CharacterSelector = () => {
  const { selectedCharacterId, setSelectedCharacterId, getAllCharacters, selectedCharacter: selectedChar } = useCharacter();
  const characters = getAllCharacters();

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <User className="w-4 h-4" />
        <span>Sélectionner un personnage</span>
      </div>
      
      <Select value={selectedCharacterId || ""} onValueChange={(value) => setSelectedCharacterId(value || null)}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Choisir un personnage...">
            {selectedChar && (
              <div className="flex items-center gap-2">
                <Avatar className="w-6 h-6">
                  <AvatarImage src={selectedChar.avatar} />
                  <AvatarFallback className="text-xs">
                    {selectedChar.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <span>{selectedChar.name}</span>
                <Badge variant="outline" className="text-xs">
                  Niv. {selectedChar.level}
                </Badge>
              </div>
            )}
          </SelectValue>
        </SelectTrigger>
        
        <SelectContent>
          {characters.map((character) => (
            <SelectItem key={character.id} value={character.id}>
              <div className="flex items-center gap-3 w-full">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={character.avatar} />
                  <AvatarFallback className="text-xs">
                    {character.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="font-medium">{character.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {character.race} {character.class} • Niveau {character.level}
                  </div>
                </div>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      {selectedChar && (
        <div className="p-3 bg-card/30 rounded-lg border border-border/50">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src={selectedChar.avatar} />
              <AvatarFallback>
                {selectedChar.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <h3 className="font-semibold text-primary">{selectedChar.name}</h3>
              <p className="text-sm text-muted-foreground">
                {selectedChar.race} {selectedChar.class} • Niveau {selectedChar.level}
              </p>
            </div>
            
            <Badge className="bg-primary/20 text-primary border-primary/50">
              Actif
            </Badge>
          </div>
        </div>
      )}
    </div>
  );
};

export default CharacterSelector;