import mongoose, { Schema, model, models } from "mongoose"

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  image: {
    type: String,
    default: "/placeholder-user.jpg",
  },
  username: {
    type: String,
    unique: true,
  },
  bio: {
    type: String,
    default: "",
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

// In Next.js, models can be undefined during hot reloading
// This pattern ensures we don't try to recreate the model
const User = (models?.User as mongoose.Model<any>) || model("User", UserSchema)

export default User
