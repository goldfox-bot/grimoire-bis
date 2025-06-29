
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Camera, Upload, X } from "lucide-react";

interface ImageUploadProps {
  currentImage?: string;
  onImageChange: (imageUrl: string | undefined) => void;
  className?: string;
}

const ImageUpload = ({ currentImage, onImageChange, className = "" }: ImageUploadProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        onImageChange(result);
        setIsOpen(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    onImageChange(undefined);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          size="sm"
          variant="outline"
          className={`${className} bg-purple-600/20 border-purple-500/30 hover:bg-purple-600/30`}
        >
          <Camera className="w-4 h-4 mr-1" />
          Visuel
        </Button>
      </DialogTrigger>
      <DialogContent className="dungeon-card max-w-md">
        <DialogHeader>
          <DialogTitle className="text-gold-200">Gérer le visuel</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {currentImage && (
            <div className="relative">
              <img 
                src={currentImage} 
                alt="Aperçu" 
                className="w-full h-48 object-cover rounded border border-gold-500/30"
              />
              <Button
                size="sm"
                variant="destructive"
                onClick={handleRemoveImage}
                className="absolute top-2 right-2"
              >
                <X className="w-4 h-4" />
                Supprimer
              </Button>
            </div>
          )}
          
          <div className="space-y-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            <Button
              onClick={() => fileInputRef.current?.click()}
              className="w-full bg-gold-600 hover:bg-gold-700 text-dungeon-900"
            >
              <Upload className="w-4 h-4 mr-2" />
              {currentImage ? 'Changer l\'image' : 'Ajouter une image'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageUpload;
