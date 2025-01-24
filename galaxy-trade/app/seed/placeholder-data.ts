import { Item } from "../types/items";

export const seedItems: Item[] = [
    {
      id: 1,
      title: "Mountain Bike",
      description: "A sturdy mountain bike, great for off-road adventures.",
      condition: "Good",
      image: "https://example.com/images/mountain-bike.jpg",
      owner: "john_doe",
      tradable: true,
      offers: [
        {
          id: 1,
          itemId: 1,
          offerer: "jane_smith",
          offeredItemId: 3,
          status: "pending",
        },
      ],
    },
    {
      id: 2,
      title: "Guitar",
      description: "An acoustic guitar with a rich sound, perfect for beginners and pros.",
      condition: "Excellent",
      image: "https://example.com/images/guitar.jpg",
      owner: "jane_smith",
      tradable: true,
      offers: [
        {
          id: 2,
          itemId: 2,
          offerer: "john_doe",
          offeredItemId: 4,
          status: "pending",
        },
      ],
    },
    {
      id: 3,
      title: "Lawn Mower",
      description: "Electric lawn mower in working condition, lightly used.",
      condition: "Fair",
      image: "https://example.com/images/lawn-mower.jpg",
      owner: "alex_jones",
      tradable: true,
      offers: [],
    },
    {
      id: 4,
      title: "Camera",
      description: "Digital camera with 20MP resolution and 10x optical zoom.",
      condition: "Good",
      image: "https://example.com/images/camera.jpg",
      owner: "john_doe",
      tradable: true,
      offers: [
        {
          id: 3,
          itemId: 4,
          offerer: "jane_smith",
          offeredItemId: 2,
          status: "rejected",
        },
      ],
    },
  ];
  