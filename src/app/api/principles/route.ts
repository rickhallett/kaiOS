import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

// Instantiate Prisma Client
// It's often recommended to instantiate Prisma Client in a separate file
// (e.g., lib/prisma.ts) and import it to avoid creating too many connections,
// especially in serverless environments. But for simplicity here, we'll instantiate it directly.
const prisma = new PrismaClient();

export async function GET() {
  try {
    const principles = await prisma.principle.findMany();
    return NextResponse.json(principles);
  } catch (error) {
    console.error("Failed to fetch principles:", error); // Log the error for server-side debugging
    // Return a generic error message to the client
    return NextResponse.json(
      { error: 'Failed to fetch principles' },
      { status: 500 }
    );
  } finally {
    // It's important to disconnect the Prisma Client when done in environments
    // where the process doesn't exit automatically (like serverless functions),
    // though Next.js API routes might handle this lifecycle differently.
    // For long-running servers, connection pooling handles this.
    // await prisma.$disconnect(); // Commented out for typical Next.js API route usage
  }
}

// You can add POST, PUT, DELETE handlers here later if needed
// export async function POST(request: Request) { ... } 