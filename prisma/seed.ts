import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Seed Categories
  const categories = await prisma.category.createMany({
    data: [
      { name: 'Adventure', icon: '/assets/images/explore-tour-1.jpg' },
      { name: 'Beach', icon: '/assets/images/explore-tour-2.jpg' },
      { name: 'Cultural', icon: '/assets/images/explore-tour-3.jpg' },
      { name: 'Historical', icon: '/assets/images/explore-tour-4.jpg' },
      { name: 'Wildlife', icon: '/assets/images/explore-tour-5.jpg' },
    ],
  });

  // Seed Destinations
  const destinations = await prisma.destination.createMany({
    data: [
      { name: 'Paris', description: 'City of Lights', image: '/assets/images/destination-1.jpg' },
      { name: 'Bali', description: 'Island of the Gods', image: '/assets/images/destination-2.jpg' },
      { name: 'Cape Town', description: 'Mother City', image: '/assets/images/destination-3.jpg' },
      { name: 'Tokyo', description: 'Capital of Japan', image: '/assets/images/destination-4.jpg' },
      { name: 'New York', description: 'The Big Apple', image: '/assets/images/destination-5.jpg' },
    ],
  });

  // Seed Tours
  const tours = await prisma.tour.createMany({
    data: [
      { title: 'Paris Adventure', description: 'Explore Paris', price: 1500, image: '/assets/images/package-1.jpg', categoryId: 1, destinationId: 1, availableSlots: 10, startDate: new Date(), endDate: new Date() },
      { title: 'Bali Beaches', description: 'Relax in Bali', price: 2000, image: '/assets/images/package-2.jpg',  categoryId: 2, destinationId: 2, availableSlots: 8, startDate: new Date(), endDate: new Date() },
      { title: 'Cape Town Safari', description: 'Safari experience', price: 1800, image: '/assets/images/package-3.jpg',  categoryId: 5, destinationId: 3, availableSlots: 12, startDate: new Date(), endDate: new Date() },
      { title: 'Tokyo Cultural Tour', description: 'Discover Tokyo', price: 1700, image: '/assets/images/package-4.jpg',  categoryId: 3, destinationId: 4, availableSlots: 15, startDate: new Date(), endDate: new Date() },
      { title: 'New York Highlights', description: 'Explore NYC', price: 1600, image: '/assets/images/package-5.jpg',  categoryId: 4, destinationId: 5, availableSlots: 20, startDate: new Date(), endDate: new Date() },
    ],
  });

  // Seed Users
  const users = await prisma.user.createMany({
    data: [
      { name: 'Alice', email: 'alice@example.com', password: 'password123', role: 'USER' },
      { name: 'Bob', email: 'bob@example.com', password: 'password123', role: 'ADMIN' },
      { name: 'Charlie', email: 'charlie@example.com', password: 'password123', role: 'USER' },
      { name: 'Diana', email: 'diana@example.com', password: 'password123', role: 'USER' },
      { name: 'Eve', email: 'eve@example.com', password: 'password123', role: 'USER' },
    ],
  });

  console.log('Seeded successfully');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
