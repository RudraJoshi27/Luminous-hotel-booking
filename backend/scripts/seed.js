const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Hotel = require('../models/Hotel');

dotenv.config({ path: "./backend/.env" });

const cities = [
  "Delhi", "Mumbai", "Bengaluru", "Goa", "Chennai", "Dubai", "Jaipur", "Hyderabad", 
  "Bangkok", "Singapore", "Pattaya", "Phuket", "London", "New York", "Paris", "Tokyo",
  "Manali", "Shimla", "Kochi", "Pune", "Kolkata", "Ahmedabad", "Surat", "Rome", "Berlin",
  "Amsterdam", "Madrid", "Barcelona", "Venice", "Milan", "Vienna", "Prague", "Zurich",
  "Sydney", "Melbourne", "Brisbane", "Auckland", "Toronto", "Vancouver", "Montreal",
  "Las Vegas", "Los Angeles", "Miami", "Chicago", "San Francisco", "Seattle", "Boston",
  "Bali", "Kuala Lumpur", "Seoul"
];

const hotelNames = ["Grand Plaza", "The Royal", "Ocean View", "Mountain Retreat", "City Center Inn", "Luxury Suites", "Backpacker Stop", "Neon Oasis", "Cyber Hotel", "Classic Residency"];
const adjectives = ["Premium", "Exotic", "Golden", "Majestic", "Elegant", "Vintage", "Modern", "Urban"];
const AMENITIES = ['Free WiFi', 'Swimming Pool', 'Parking', 'Spa', 'Gym', 'Restaurant'];

const generateHotels = () => {
  const hotels = [];
  let hotelImageIndex = 1;
  
  cities.forEach(city => {
    // Generate 3 hotels per city
    for(let i = 0; i < 3; i++) {
       const randomName = `${adjectives[Math.floor(Math.random() * adjectives.length)]} ${hotelNames[Math.floor(Math.random() * hotelNames.length)]}`;
       const starRating = Math.floor(Math.random() * 3) + 3; // 3, 4, or 5
       const userRating = (Math.random() * 2 + 3).toFixed(1); // 3.0 to 5.0
       const cheapestPrice = Math.floor(Math.random() * 20000) + 2500; // ₹2500 to ₹22500
       
       // Choose 3-5 random amenities
       const shuffled = [...AMENITIES].sort(() => 0.5 - Math.random());
       const selectedAmenities = shuffled.slice(0, Math.floor(Math.random() * 3) + 3);

       // Use local images hotel_1.jpg to hotel_150.jpg (based on city/index)
       const photoUrl = `http://localhost:5000/hotel_images/hotel_${hotelImageIndex}.jpg`;
       hotelImageIndex++;

       const types = ['Hotel', 'Resort', 'Villa', 'Apartment', 'Homestay'];
       const selectedType = types[hotelImageIndex % types.length];

       hotels.push({
         name: randomName,
         type: selectedType,
         city: city,
         address: `Central District, ${city}`,
         distance: `${(Math.random() * 5).toFixed(1)} km from city center`,
         photos: [photoUrl],
         title: `Experience the best of ${city}`,
         desc: `A highly rated ${starRating}-star property located strictly in the heart of ${city}. Perfect for leisure and business.`,
         rating: Number(userRating),
         starRating: starRating,
         cheapestPrice: cheapestPrice,
         featured: starRating === 5 ? true : false,
         amenities: selectedAmenities
       });
    }
  });
  
  return hotels;
}

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB for Seeding.");

    const hotelsData = generateHotels();
    console.log(`Generated ${hotelsData.length} hotels across ${cities.length} cities.`);

    await Hotel.deleteMany({});
    console.log("Cleared existing hotels.");

    await Hotel.insertMany(hotelsData);
    console.log("Inserted new procedural hotels data successfully!");

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedDB();
