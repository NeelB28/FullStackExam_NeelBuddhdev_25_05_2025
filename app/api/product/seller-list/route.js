import { getAuth } from "@clerk/nextjs/server";
import dbConnect from "@/config/db";
import { NextResponse } from "next/server";
import authSeller from "@/lib/authSeller";
import Product from "@/models/product";

export async function GET(req) {
  try {
    const { userId } = getAuth(req);

    const isSeller = authSeller(userId);

    if (!isSeller) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    await dbConnect();
    const products = await Product.find({});
    return NextResponse.json({ success: true, products }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
