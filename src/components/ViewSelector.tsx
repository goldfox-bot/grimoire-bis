import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Crown, User } from "lucide-react";
import CharacterSelector from "./CharacterSelector";

interface ViewSelectorProps {
  currentView: "dm" | "player";
  onViewChange: (view: "dm" | "player") => void;
}

const ViewSelector = ({ currentView, onViewChange }: ViewSelectorProps) => {
  const navigate = useNavigate();
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(null);

  const handleViewChange = (view: "dm" | "player") => {
    onViewChange(view);
    // Navigate to the corresponding route
    navigate(view === "dm" ? "/dm" : "/player");
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 p-2 bg-card/50 rounded-lg border border-border/50">
        <Button
          variant={currentView === "dm" ? "default" : "ghost"}
          size="sm"
          onClick={() => handleViewChange("dm")}
          className={`flex items-center gap-2 ${
            currentView === "dm" 
              ? "bg-primary text-primary-foreground" 
              : "hover:bg-muted"
          }`}
        >
          <Crown className="w-4 h-4" />
          <span className="hidden sm:inline">Maître du Jeu</span>
          <span className="sm:hidden">MJ</span>
        </Button>
        
        <Button
          variant={currentView === "player" ? "default" : "ghost"}
          size="sm"
          onClick={() => handleViewChange("player")}
          className={`flex items-center gap-2 ${
            currentView === "player" 
              ? "bg-primary text-primary-foreground" 
              : "hover:bg-muted"
          }`}
        >
          <User className="w-4 h-4" />
          <span className="hidden sm:inline">Joueur</span>
          <span className="sm:hidden">J</span>
        </Button>

        {currentView === "dm" && (
          <Badge variant="outline" className="text-orange-200 border-orange-400/50 bg-orange-500/10 ml-2">
            Mode Admin
          </Badge>
        )}
      </div>
      
      {currentView === "player" && (
        <CharacterSelector 
          selectedCharacter={selectedCharacter}
          onCharacterChange={setSelectedCharacter}
        />
      )}
    </div>
  );
};

export default ViewSelector;