import Product from "@/models/product";
import Order from "@/models/Order";
import User from "@/models/User";
import dbConnect from "@/config/db";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { inngest } from "@/config/inngest";

export async function POST(request) {
  try {
    const { userId } = getAuth(request);
    const { address, items } = await request.json();

    console.log("Order creation request:", { userId, address, items });

    if (!address || !items || items.length === 0) {
      return NextResponse.json({ success: false, message: "Invalid data" });
    }

    await dbConnect();

    // Calculate total amount
    let totalAmount = 0;
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return NextResponse.json({
          success: false,
          message: `Product ${item.product} not found`,
        });
      }
      totalAmount += product.offerPrice * item.quantity;
    }

    // Add 2% processing fee
    const finalAmount = totalAmount + Math.floor(totalAmount * 0.02);

    // Create order directly in database
    const order = await Order.create({
      userId,
      items,
      amount: finalAmount,
      address,
      date: Date.now(),
    });

    console.log("Order created:", order);

    // Also send to Inngest for any additional processing
    await inngest.send({
      name: "order/created",
      data: {
        userId,
        address,
        items,
        amount: finalAmount,
        date: Date.now(),
      },
    });

    // Clear user's cart
    const user = await User.findById(userId);
    if (user) {
      user.cartItems = {};
      await user.save();
    }

    return NextResponse.json({
      success: true,
      message: "Order created successfully",
      orderId: order._id,
    });
  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json({
      success: false,
      message: "Error processing request",
      error: error.message,
    });
  }
}
