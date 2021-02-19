import mongoose, { Document } from "mongoose";

const UserSchema = new mongoose.Schema({
  mail: {
    type: String,
    required: true,
  },
  login: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    first: {
      type: String,
      default: "",
    },
    second: {
      type: String,
      default: "",
    },
  },
  description: {
    type: String,
    default: "Привет, мир!",
  },
  skills: [
    {
      id: {
        type: Number,
        default: 0,
      },
      name: {
        type: String,
        default: "",
      },
      description: {
        type: String,
        default: "",
      },
    },
  ],
  achievements: [
    {
      name: {
        type: String,
        default: "",
      },
    },
  ],
  kvantums: [
    {
      kvantum: {
        type: String,
        default: "",
      },
      level: {
        type: String,
        default: "",
      },
    },
  ],
  registerDate: {
    type: Number,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
});

const UserModel = mongoose.model("User", UserSchema);

export = UserModel;
