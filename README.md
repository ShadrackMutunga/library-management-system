# Library Management System

## Schema Decisions

Book references Genre via a `genreId` foreign key rather than embedding the genre name directly, because many books share one genre and genres are managed independently (renaming a genre should not require updating every book). 

User stores a `role` field using a `Role` enum so Postgres and TypeScript both reject any value other than PATRON or LIBRARIAN.

## Prisma vs. Document Database Modeling

One thing that felt different modeling in Prisma compared to a document database (like MongoDB) is the strict enforcement of relationships and types. In a document database, you might just store a genre as a string inside the book object. In Prisma/SQL, you must explicitly define the foreign key (`genreId`), the relation (`@relation`), and ensure the referenced record exists. This requires more upfront planning but prevents orphaned data and ensures strict data integrity.

## Setup

1. Clone the repository
2. Navigate to the `api` folder: `cd api`
3. Install dependencies: `npm install`
4. Copy `.env.example` to `.env` and add your PostgreSQL connection string
5. Run migrations: `npx prisma migrate dev`
6. Seed the database: `npx ts-node prisma/seed.ts`