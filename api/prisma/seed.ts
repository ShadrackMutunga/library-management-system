import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const genreNames = ["Fantasy", "Science Fiction", "Mystery", "Biography"];
  const genres = await Promise.all(
    genreNames.map((name) =>
      prisma.genre.create({
        data: { name, slug: name.toLowerCase().replace(/\s+/g, "-") },
      }),
    ),
  );

  const sampleBooks = [
    { title: "The Hobbit", author: "J.R.R. Tolkien", genre: "Fantasy" },
    { title: "The Lord of the Rings", author: "J.R.R. Tolkien", genre: "Fantasy" },
    { title: "Harry Potter", author: "J.K. Rowling", genre: "Fantasy" },
    { title: "Dune", author: "Frank Herbert", genre: "Science Fiction" },
    { title: "The Martian", author: "Andy Weir", genre: "Science Fiction" },
    { title: "Neuromancer", author: "William Gibson", genre: "Science Fiction" },
    { title: "Foundation", author: "Isaac Asimov", genre: "Science Fiction" },
    { title: "The Big Sleep", author: "Raymond Chandler", genre: "Mystery" },
    { title: "Gone Girl", author: "Gillian Flynn", genre: "Mystery" },
    { title: "The Girl with the Dragon Tattoo", author: "Stieg Larsson", genre: "Mystery" },
    { title: "Educated", author: "Tara Westover", genre: "Biography" },
    { title: "Steve Jobs", author: "Walter Isaacson", genre: "Biography" },
    { title: "Becoming", author: "Michelle Obama", genre: "Biography" },
    { title: "The Diary of a Young Girl", author: "Anne Frank", genre: "Biography" },
    { title: "Long Walk to Freedom", author: "Nelson Mandela", genre: "Biography" },
  ];

  for (const book of sampleBooks) {
    const genre = genres.find((g) => g.name === book.genre);
    await prisma.book.create({
      data: {
        title: book.title,
        author: book.author,
        isbn: `978${Math.floor(1000000000 + Math.random() * 9000000000)}`,
        description: `${book.title} by ${book.author}.`,
        totalCopies: 3,
        availableCopies: 3,
        genreId: genre!.id,
      },
    });
  }
  console.log("Seeded 4 genres and 15 books successfully.");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());