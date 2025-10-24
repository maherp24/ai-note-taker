'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Clock, Calendar } from "lucide-react";
import { formatDistanceToNow, format } from "date-fns";

interface Note {
  id: string;
  title: string;
  content: string;
  summary?: string | null;
  tags: string[];
  createdAt: string | Date;
  updatedAt: string | Date;
  userId: string;
}

interface NoteCardProps {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (noteId: string) => void;
}

export function NoteCard({ note, onEdit, onDelete }: NoteCardProps) {
  const createdDate = new Date(note.createdAt);
  const updatedDate = new Date(note.updatedAt);
  const timeAgo = formatDistanceToNow(updatedDate, { addSuffix: true });

  return (
    <Card className="group hover:shadow-lg transition-all duration-200 hover:border-primary/50">
      <CardHeader className="space-y-2">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-xl line-clamp-1">{note.title}</CardTitle>
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => onEdit(note)}
              title="Edit note"
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-destructive hover:text-destructive"
              onClick={() => onDelete(note.id)}
              title="Delete note"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <CardDescription className="flex items-center gap-4 text-xs">
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {timeAgo}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {format(createdDate, 'MMM d, yyyy')}
          </span>
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {note.summary && (
          <div className="p-2 bg-muted rounded-md text-sm text-muted-foreground italic">
            {note.summary}
          </div>
        )}
        
        <p className="text-sm text-foreground/80 line-clamp-3">
          {note.content}
        </p>
        
        {note.tags && note.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {note.tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

