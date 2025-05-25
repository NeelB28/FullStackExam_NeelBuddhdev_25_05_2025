import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import dbConnect from "@/config/db";
import User from "@/models/User";
import Address from "@/models/Address";

export async function POST(request) {
  try {
    const { userId } = getAuth(request);
    const { address } = await request.json();

    await dbConnect();
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }
    const newAddress = await Address.create({
      ...address,
      userId,
    });
    // await user.save();
    return NextResponse.json(
      { success: true, message: "Address added", newAddress },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
