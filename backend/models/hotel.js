import mongoose from "mongoose";

const hotelSchema = mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  phone: {
    type: String,
    default: "Not Available",
  },
  owner_id: String,
  owner_name: String,
  last_bill_generated_date: {
    type: Date,
    default: new Date("2000-01-01"),
  },
  has_meal_system: {
    type: Boolean,
    default: false,
  },
});

const hotelModel = mongoose.model("hotelModel", hotelSchema);

export default hotelModel;
