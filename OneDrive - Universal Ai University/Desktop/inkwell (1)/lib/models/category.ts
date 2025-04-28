import mongoose, { Schema, model, models } from "mongoose"

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    default: "",
  },
})

const Category = (models?.Category as mongoose.Model<any>) || model("Category", CategorySchema)

export default Category
