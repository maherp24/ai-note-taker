'use client';

import { useState, useEffect } from 'react';
import { NoteCard } from '@/components/dashboard/NoteCard';
import { NoteDialog } from '@/components/dashboard/NoteDialog';
import { Button } from '@/components/ui/button';
import { Plus, Loader2, RefreshCw, Search } from 'lucide-react';
import Link from 'next/link';

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

export default function DashboardPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<'create' | 'edit'>('create');
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  // Fetch notes on mount
  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/notes');
      
      if (!response.ok) {
        throw new Error('Failed to fetch notes');
      }
      
      const data = await response.json();
      setNotes(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load notes');
      console.error('Error fetching notes:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNote = async (data: { title: string; content: string }) => {
    // Get user from localStorage (or use demo user if not logged in)
    let userId = 'demo-user-id';
    if (typeof window !== 'undefined') {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          userId = user.id;
        } catch (e) {
          console.error('Error parsing user from localStorage:', e);
        }
      }
    }
    
    const response = await fetch('/api/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, userId }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMsg = errorData.details 
        ? `${errorData.error}: ${errorData.details}` 
        : errorData.error || 'Failed to create note';
      throw new Error(errorMsg);
    }

    await fetchNotes();
  };

  const handleUpdateNote = async (data: { title: string; content: string }) => {
    if (!selectedNote) return;

    const response = await fetch(`/api/notes/${selectedNote.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to update note');
    }

    await fetchNotes();
  };

  const handleDeleteNote = async (noteId: string) => {
    if (deleteConfirm !== noteId) {
      setDeleteConfirm(noteId);
      setTimeout(() => setDeleteConfirm(null), 3000);
      return;
    }

    try {
      const response = await fetch(`/api/notes/${noteId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete note');
      }

      setNotes(notes.filter(note => note.id !== noteId));
      setDeleteConfirm(null);
    } catch (err) {
      console.error('Error deleting note:', err);
      alert('Failed to delete note');
    }
  };

  const openCreateDialog = () => {
    setDialogMode('create');
    setSelectedNote(null);
    setDialogOpen(true);
  };

  const openEditDialog = (note: Note) => {
    setDialogMode('edit');
    setSelectedNote(note);
    setDialogOpen(true);
  };

  // Filter notes based on search query
  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-10">
        <div className="container max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Link href="/" className="text-2xl font-bold hover:text-primary transition-colors">
                NoteFlow
              </Link>
              <span className="text-muted-foreground">Dashboard</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={fetchNotes}
                disabled={loading}
                title="Refresh notes"
              >
                <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              </Button>
              <Button onClick={openCreateDialog} size="lg">
                <Plus className="mr-2 h-4 w-4" />
                New Note
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container max-w-7xl mx-auto px-4 py-8">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-16">
            <div className="text-center space-y-4">
              <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
              <p className="text-muted-foreground">Loading notes...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="flex items-center justify-center py-16">
            <div className="text-center space-y-4 max-w-md">
              <div className="text-destructive text-5xl">⚠️</div>
              <h3 className="text-xl font-semibold">Error Loading Notes</h3>
              <p className="text-muted-foreground">{error}</p>
              <Button onClick={fetchNotes} variant="outline">
                <RefreshCw className="mr-2 h-4 w-4" />
                Try Again
              </Button>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredNotes.length === 0 && notes.length === 0 && (
          <div className="flex items-center justify-center py-16">
            <div className="text-center space-y-4 max-w-md">
              <div className="text-6xl">📝</div>
              <h3 className="text-2xl font-semibold">No notes yet</h3>
              <p className="text-muted-foreground">
                Get started by creating your first note. Capture your thoughts, ideas, and reminders all in one place.
              </p>
              <Button onClick={openCreateDialog} size="lg">
                <Plus className="mr-2 h-4 w-4" />
                Create Your First Note
              </Button>
            </div>
          </div>
        )}

        {/* No Search Results */}
        {!loading && !error && filteredNotes.length === 0 && notes.length > 0 && (
          <div className="flex items-center justify-center py-16">
            <div className="text-center space-y-4 max-w-md">
              <div className="text-6xl">🔍</div>
              <h3 className="text-2xl font-semibold">No notes found</h3>
              <p className="text-muted-foreground">
                No notes match your search query. Try different keywords.
              </p>
              <Button onClick={() => setSearchQuery('')} variant="outline">
                Clear Search
              </Button>
            </div>
          </div>
        )}

        {/* Notes Grid */}
        {!loading && !error && filteredNotes.length > 0 && (
          <div>
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {filteredNotes.length} {filteredNotes.length === 1 ? 'note' : 'notes'}
                {searchQuery && ' found'}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNotes.map((note) => (
                <NoteCard
                  key={note.id}
                  note={note}
                  onEdit={openEditDialog}
                  onDelete={handleDeleteNote}
                />
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Note Dialog */}
      <NoteDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        note={selectedNote}
        onSave={dialogMode === 'create' ? handleCreateNote : handleUpdateNote}
        mode={dialogMode}
      />

      {/* Delete Confirmation Toast */}
      {deleteConfirm && (
        <div className="fixed bottom-4 right-4 bg-destructive text-destructive-foreground px-4 py-3 rounded-lg shadow-lg animate-in slide-in-from-bottom-5">
          <p className="font-medium">Click delete again to confirm</p>
        </div>
      )}
    </div>
  );
}

