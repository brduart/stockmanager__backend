import mongoose, { Schema, Types } from "mongoose";

interface IProduct extends Document {
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  //category: Types.ObjectId[];
}

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    imageUrl: { type: String, required: true },

    //category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IProduct>("Product", productSchema);
