import Destination from "../models/Destination.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const defaultDestinations = [
  {
    destinationName: "Goa",
    description: "Popular beach destination with nightlife, coastal food, and water sports.",
    recommendedPlaces: ["Baga Beach", "Calangute Beach", "Fort Aguada"],
    coverImage: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80"
  },
  {
    destinationName: "Jaipur",
    description: "Historic palaces, vibrant bazaars, and rich Rajasthani culture.",
    recommendedPlaces: ["Hawa Mahal", "Amber Fort", "City Palace"],
    coverImage: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80"
  },
  {
    destinationName: "Manali",
    description: "Mountain escape with snow views, cafes, and adventure sports.",
    recommendedPlaces: ["Solang Valley", "Old Manali", "Atal Tunnel"],
    coverImage: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80"
  }
];

export const getDestinations = asyncHandler(async (req, res) => {
  let destinations = await Destination.find().sort({ destinationName: 1 });

  if (!destinations.length) {
    destinations = await Destination.insertMany(defaultDestinations);
  }

  res.json(destinations);
});

export const createDestination = asyncHandler(async (req, res) => {
  const destination = await Destination.create(req.body);
  res.status(201).json(destination);
});

export const updateDestination = asyncHandler(async (req, res) => {
  const destination = await Destination.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!destination) {
    return res.status(404).json({ message: "Destination not found" });
  }
  res.json(destination);
});
