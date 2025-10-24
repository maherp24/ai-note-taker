/**
 * API Route: Notes CRUD Operations
 * GET /api/notes - Get all notes
 * POST /api/notes - Create a new note
 */

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET all notes
export async function GET(request: NextRequest) {
  try {
    // TODO: Add authentication and filter by userId
    // For now, we'll get all notes sorted by newest first
    const notes = await prisma.note.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json(notes, { status: 200 });
  } catch (error) {
    console.error('Error fetching notes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch notes' },
      { status: 500 }
    );
  }
}

// POST create a new note
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, content, userId } = body;

    // Validation
    if (!title || !content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      );
    }

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required. Please sign in.' },
        { status: 401 }
      );
    }

    // Check if user exists, create demo user if needed
    let user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user && userId === 'demo-user-id') {
      // Create demo user automatically
      user = await prisma.user.create({
        data: {
          id: 'demo-user-id',
          email: 'demo@noteflow.com',
          name: 'Demo User',
          password: 'demo_password_not_used',
        },
      });
    }

    if (!user) {
      return NextResponse.json(
        { error: 'User not found. Please sign in again.' },
        { status: 404 }
      );
    }

    // Create note
    const note = await prisma.note.create({
      data: {
        title,
        content,
        userId,
        tags: [], // Initialize with empty tags array
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json(note, { status: 201 });
  } catch (error) {
    console.error('Error creating note:', error);
    
    // Provide more detailed error message
    const errorMessage = error instanceof Error ? error.message : 'Failed to create note';
    
    return NextResponse.json(
      { 
        error: 'Failed to create note',
        details: errorMessage 
      },
      { status: 500 }
    );
  }
}

