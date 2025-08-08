import React, { useState } from 'react';
import { useCharacter } from '@/contexts/CharacterContext';
import CharacterEditForm from '@/components/CharacterEditForm';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

// Page for Dungeon Master to view and edit all characters
const CharacterManager: React.FC = () => {
  const { characters, updateCharacter } = useCharacter();
  const [editingCharacterId, setEditingCharacterId] = useState<string | null>(null);

  const characterEntries = Object.entries(characters);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Gestion des Personnages</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {characterEntries.map(([id, character]) => (
          <Card key={id} className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">{character.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {character.class} niveau {character.level}
                </p>
              </div>
              <Button onClick={() => setEditingCharacterId(id)}>Éditer</Button>
            </div>
          </Card>
        ))}
      </div>
      {editingCharacterId && characters[editingCharacterId] && (
        <CharacterEditForm
          character={characters[editingCharacterId]}
          onSave={(updatedData) => {
            updateCharacter(editingCharacterId, updatedData);
            setEditingCharacterId(null);
          }}
          onClose={() => setEditingCharacterId(null)}
        />
      )}
    </div>
  );
};

export default CharacterManager;
