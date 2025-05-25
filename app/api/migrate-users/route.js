import dbConnect from "@/config/db";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await dbConnect();

    // Find all users where cartItems is an empty array
    const usersToUpdate = await User.find({
      $or: [
        { cartItems: { $exists: false } },
        { cartItems: [] },
        { cartItems: { $type: "array" } },
      ],
    });

    console.log(`Found ${usersToUpdate.length} users to migrate`);

    // Update each user
    const updatePromises = usersToUpdate.map(async (user) => {
      user.cartItems = {};
      return await user.save();
    });

    await Promise.all(updatePromises);

    return NextResponse.json(
      {
        success: true,
        message: `Successfully migrated ${usersToUpdate.length} users`,
        migratedCount: usersToUpdate.length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Migration error:", error);
    return NextResponse.json(
      { success: false, message: "Migration failed", error: error.message },
      { status: 500 }
    );
  }
}
