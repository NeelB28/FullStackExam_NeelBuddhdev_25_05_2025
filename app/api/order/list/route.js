import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import dbConnect from "@/config/db";
import Order from "@/models/Order";
import Product from "@/models/product";

export async function GET(request) {
  try {
    const { userId } = getAuth(request);

    await dbConnect();

    Address.length;
    Product.length;
    const orders = await Order.find({ userId }).populate(
      "address items.product"
    );

    return NextResponse.json({ success: true, orders });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
}
