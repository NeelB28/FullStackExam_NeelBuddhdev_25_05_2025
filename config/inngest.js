import { Inngest } from "inngest";
import dbConnect from "./db";
import User from "@/models/User";
import Order from "@/models/Order";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "FullStackExamNeelBuddhdev25052025" });

// Create a function that will be called to save user to db
export const syncUserCreation = inngest.createFunction(
  { id: "sync-user-from-clerk" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } =
      event.data;
    const userData = {
      _id: id,
      name: `${first_name || ""} ${last_name || ""}`.trim() || "User",
      email: email_addresses[0].email_address,
      imageUrl: image_url,
      cartItems: {}, // Explicitly set as object
    };
    await dbConnect();
    await User.create(userData);
  }
);

// Create a function that will be called to update user in db
export const syncUserUpdate = inngest.createFunction(
  { id: "update-user-from-clerk" },
  { event: "clerk/user.updated" },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } =
      event.data;
    const userData = {
      _id: id,
      name: `${first_name || ""} ${last_name || ""}`.trim() || "User",
      email: email_addresses[0].email_address,
      imageUrl: image_url,
    };
    await dbConnect();
    await User.findByIdAndUpdate(id, userData);
  }
);

// Create a function that will be called to delete user from db
export const syncUserDeletion = inngest.createFunction(
  { id: "delete-user-from-clerk" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    const { id } = event.data;
    await dbConnect();
    await User.findByIdAndDelete(id);
  }
);

// Create a function that will be called to create order
export const createUserOrder = inngest.createFunction(
  {
    id: "create-user-order",
    batchEvents: {
      maxSize: 25,
      timeout: "10s",
    },
  },
  { event: "order/created" },
  async ({ events }) => {
    const orders = events.map((event) => {
      return {
        userId: event.data.userId,
        items: event.data.items,
        address: event.data.address,
        date: event.data.date,
      };
    });
    await dbConnect();
    await Order.insertMany(orders);
    return {
      success: true,
      processed: orders.length,
      message: "Orders created successfully",
    };
  }
);
