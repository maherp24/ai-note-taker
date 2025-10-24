/**
 * Setup Demo User Script
 * Run this to create a demo user for testing the dashboard
 * Usage: npx tsx scripts/setup-demo-user.ts
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Setting up demo user...\n');

  try {
    // Check if demo user already exists
    const existingUser = await prisma.user.findUnique({
      where: { id: 'demo-user-id' },
    });

    if (existingUser) {
      console.log('✅ Demo user already exists!');
      console.log(`   Email: ${existingUser.email}`);
      console.log(`   Name: ${existingUser.name}`);
      return;
    }

    // Create demo user
    const user = await prisma.user.create({
      data: {
        id: 'demo-user-id',
        email: 'demo@noteflow.com',
        name: 'Demo User',
        password: 'hashed_password_placeholder', // Not used for demo
      },
    });

    console.log('✅ Demo user created successfully!');
    console.log(`   ID: ${user.id}`);
    console.log(`   Email: ${user.email}`);
    console.log(`   Name: ${user.name}`);
    console.log('\n📝 You can now create notes in the dashboard!');
  } catch (error) {
    console.error('❌ Error setting up demo user:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

