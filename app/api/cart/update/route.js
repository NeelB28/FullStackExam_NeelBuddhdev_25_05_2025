import dbConnect from "@/config/db";
import User from "@/models/User";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { userId } = getAuth(request);
    const { cartData } = await request.json();

    await dbConnect();
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    user.cartItems = cartData;
    await user.save();

    return NextResponse.json(
      { success: true, message: "Cart updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Cart update error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
