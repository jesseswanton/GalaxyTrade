// Item-related types
export interface Item {
  id: number;
  title: string;
  description: string;
  condition: string;
  image: string;
  owner: string;
  tradable: boolean;
  offers: Offer[];
}

export interface Offer {
  id: number;
  itemId: number;
  offerer: string;
  offeredItemId: number;
  status: "pending" | "accepted" | "rejected";
}

export interface OfferItem {
    offer_id: number; // ID of the offer
    owner: string;
    item_id: number; // ID of the item
    item_title: string; // Title of the item
    item_description: string; // Description of the item
    item_condition: string; // Condition of the item (e.g., "Good", "Excellent")
    item_image: string; // URL of the item's image
    offered_item_offerer: string;
    offereditemid: number; // ID of the offered item
    offered_item_title: string; // Title of the offered item
    offered_item_description: string; // Description of the offered item
    offered_item_condition: string; // Condition of the offered item
    offered_item_image: string; // URL of the offered item's image
    status: "pending" | "accepted" | "rejected"; // Status of the offer (e.g., "pending", "rejected")
    }

export interface User {
  id: number;
  username: string;
  password: string;
  contact: string;
}
