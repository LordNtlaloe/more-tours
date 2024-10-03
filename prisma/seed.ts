import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Seed Users
  const user1 = await prisma.user.create({
    data: {
      name: 'John Doe',
      username: 'johndoe',
      email: 'john@example.com',
      role: 'admin',
      emailVerified: new Date(),
      image: 'https://example.com/john.jpg',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: 'Jane Doe',
      username: 'janedoe',
      email: 'jane@example.com',
      role: 'user',
      emailVerified: new Date(),
      image: 'https://example.com/jane.jpg',
    },
  });

  // Seed Accounts
  const account1 = await prisma.account.create({
    data: {
      userId: user1.id,
      type: 'oauth',
      provider: 'google',
      providerAccountId: 'google123',
      access_token: 'access_token_example',
      refresh_token: 'refresh_token_example',
    },
  });

  const account2 = await prisma.account.create({
    data: {
      userId: user2.id,
      type: 'oauth',
      provider: 'facebook',
      providerAccountId: 'facebook123',
      access_token: 'access_token_example_fb',
      refresh_token: 'refresh_token_example_fb',
    },
  });

  // Seed Sessions
  await prisma.session.create({
    data: {
      userId: user1.id,
      sessionToken: 'session_token_123',
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24), // 24 hours from now
    },
  });

  await prisma.session.create({
    data: {
      userId: user2.id,
      sessionToken: 'session_token_456',
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24), // 24 hours from now
    },
  });

  // Seed Verification Tokens
  await prisma.verificationToken.create({
    data: {
      identifier: 'john@example.com',
      token: 'verification_token_123',
      expires: new Date(Date.now() + 1000 * 60 * 60), // 1 hour from now
    },
  });

  await prisma.verificationToken.create({
    data: {
      identifier: 'jane@example.com',
      token: 'verification_token_456',
      expires: new Date(Date.now() + 1000 * 60 * 60), // 1 hour from now
    },
  });

  // Seed Listings
  const listing1 = await prisma.listing.create({
    data: {
      name: 'Luxury Apartment',
      location: 'New York',
      type: 'Apartment',
      desc: 'A luxury apartment in downtown with modern amenities.',
      pricePerNight: 300,
      beds: 2,
      hasFreeWifi: true,
    },
  });

  const listing2 = await prisma.listing.create({
    data: {
      name: 'Cozy Cabin',
      location: 'Colorado',
      type: 'Cabin',
      desc: 'A cozy cabin in the mountains.',
      pricePerNight: 150,
      beds: 1,
      hasFreeWifi: false,
    },
  });

  // Seed Images
  await prisma.image.create({
    data: {
      url: 'https://example.com/image1.jpg',
      blurred: 'https://example.com/blurred1.jpg',
      listingId: listing1.id,
    },
  });

  await prisma.image.create({
    data: {
      url: 'https://example.com/image2.jpg',
      blurred: 'https://example.com/blurred2.jpg',
      listingId: listing2.id,
    },
  });

  // Seed Bookings
  const booking1 = await prisma.booking.create({
    data: {
      startDate: new Date('2024-10-05'),
      endDate: new Date('2024-10-10'),
      chargeId: 'charge_1',
      daysDifference: 5,
      listingId: listing1.id,
      userId: user1.id,
    },
  });

  const booking2 = await prisma.booking.create({
    data: {
      startDate: new Date('2024-11-01'),
      endDate: new Date('2024-11-07'),
      chargeId: 'charge_2',
      daysDifference: 6,
      listingId: listing2.id,
      userId: user2.id,
    },
  });

  // Seed Reserved Dates
  await prisma.reservedDate.createMany({
    data: [
      { date: 20241005, bookingId: booking1.id },
      { date: 20241006, bookingId: booking1.id },
      { date: 20241101, bookingId: booking2.id },
      { date: 20241102, bookingId: booking2.id },
    ],
  });

  // Seed Reviews
  await prisma.review.create({
    data: {
      text: 'Amazing apartment!',
      stars: 5,
      listingId: listing1.id,
      userId: user2.id,
    },
  });

  await prisma.review.create({
    data: {
      text: 'Great cabin for a weekend getaway!',
      stars: 4,
      listingId: listing2.id,
      userId: user1.id,
    },
  });

  console.log('Seed data created.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
