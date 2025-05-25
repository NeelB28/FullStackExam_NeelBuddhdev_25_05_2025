import authSeller from "@/lib/authSeller";
import Product from "@/models/product";
import { v2 as cloudinary } from "cloudinary";
import dbConnect from "@/config/db";
import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request) {
  try {
    const { userId } = getAuth(request);
    const isSeller = await authSeller(userId);
    if (!isSeller) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }
    const formData = await request.formData();
    const name = formData.get("name");
    const description = formData.get("description");
    const category = formData.get("category");
    const price = formData.get("price");
    const offerPrice = formData.get("offerPrice");

    // Get all files from formData
    const files = formData.getAll("images");

    if (!files || files.length === 0) {
      return NextResponse.json(
        { success: false, message: "No files uploaded" },
        { status: 400 }
      );
    }

    // Filter out empty files
    const validFiles = files.filter((file) => file && file.size > 0);

    if (validFiles.length === 0) {
      return NextResponse.json(
        { success: false, message: "No valid files uploaded" },
        { status: 400 }
      );
    }

    const result = await Promise.all(
      validFiles.map(async (file) => {
        const bufferArray = await file.arrayBuffer();
        const buffer = Buffer.from(bufferArray);
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              resource_type: "auto",
              // folder: "products",
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );
          stream.end(buffer);
        });
      })
    );

    const image = result.map((file) => file.secure_url);
    await dbConnect();

    const product = await Product.create({
      userId,
      name,
      description,
      category,
      price: Number(price),
      offerPrice: Number(offerPrice),
      image,
      date: Date.now(),
    });

    return NextResponse.json(
      { success: true, message: "Product added successfully", product },
      { status: 200 }
    );
  } catch (error) {
    console.error("Product add error:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
