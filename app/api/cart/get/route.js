import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import dbConnect from "@/config/db";
import User from "@/models/User";

export async function GET(request) {
  try {
    const { userId } = getAuth(request);
    await dbConnect();
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }
    const { cartItems } = user;
    return NextResponse.json({ success: true, cartItems }, { status: 200 });
  } catch (error) {
    console.error("Cart get error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
