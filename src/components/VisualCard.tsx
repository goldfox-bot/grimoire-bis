
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

interface VisualCardProps {
  image?: string;
  title: string;
  description?: string;
}

const VisualCard = ({ image, title, description }: VisualCardProps) => {
  if (!image) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          className="bg-purple-600/20 border-purple-500/30 hover:bg-purple-600/30"
        >
          <Eye className="w-4 h-4 mr-1" />
          Visuel
        </Button>
      </DialogTrigger>
      <DialogContent className="dungeon-card max-w-2xl">
        <div className="space-y-4">
          <div className="text-center">
            <h3 className="text-xl font-bold text-gold-200 mb-2">{title}</h3>
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
          </div>
          
          <div className="relative">
            <img 
              src={image} 
              alt={title}
              className="w-full max-h-[70vh] object-contain rounded border border-gold-500/30"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VisualCard;
