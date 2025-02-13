const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    points: { type: Number, default: 0 },
    activities: [
      {
        name: String,
        points: Number,
        completed: { type: Boolean, default: false },
        dateCompleted: Date,
      },
    ],
    milestones: [
      {
        name: String,
        rewardPoints: Number,
        achieved: { type: Boolean, default: false },
        dateAchieved: Date,
      },
    ],
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model("User", userSchema);