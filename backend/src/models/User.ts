import mongoose, { Document, ObjectId, Schema } from "mongoose";

export interface IUser extends Document {
  _id: ObjectId;
  email: string;
  password: string;
  role: "user" | "admin";
}

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema);
