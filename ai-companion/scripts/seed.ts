const { PrismaClient } = require("@prisma/client");
const db = new PrismaClient();

async function main() {
  try {
    await db.category.createMany({
      data: [
        { name: "Movie Stars" },
        { name: "Musicians" },
        { name: "Sports Person" },
        { name: "Scientists" },
        { name: "Animals" },
        { name: "Nature" },
      ],
    });
  } catch (error) {
    console.error("Error seeding default categories", error);
  } finally {
    await db.$disconnect();
  }
}

main();
