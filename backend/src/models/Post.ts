import mongoose, { Document, Schema } from "mongoose";

export interface IPost extends Document {
  title: string;
  content: string;
  category: string;
  tags: string[];
}

const PostSchema = new Schema<IPost>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, required: true },
    tags: { type: [String], default: [] },
  },
  { timestamps: true }
);

export default mongoose.model<IPost>("Post", PostSchema);
