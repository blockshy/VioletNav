import React from 'react';
import { 
  Search, Github, MessageSquare, Youtube, 
  BookOpen, Layers, Wind, Atom, FileJson, 
  Dribbble, Palette, Image, Figma, 
  Languages, Gauge, Shrink, Globe, Link as LinkIcon
} from 'lucide-react';

interface IconProps {
  name: string;
  className?: string;
  size?: number;
}

export const Icon: React.FC<IconProps> = ({ name, className, size = 20 }) => {
  const icons: Record<string, React.ElementType> = {
    Search, Github, MessageSquare, Youtube,
    BookOpen, Layers, Wind, Atom, FileJson,
    Dribbble, Palette, Image, Figma,
    Languages, Gauge, Shrink, Globe
  };

  const IconComponent = icons[name] || LinkIcon;

  return <IconComponent className={className} size={size} />;
};