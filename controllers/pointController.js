const User = require("../models/user");

// Assign points for task completion
const assignPoints = async (req, res) => {
  const { userId, taskName, points } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Update task completion & points
    const task = user.activities.find((activity) => activity.name === taskName);
    if (task && task.completed) {
      return res.status(400).json({ message: "Task already completed" });
    }

    user.activities.push({
      name: taskName,
      points,
      completed: true,
      dateCompleted: new Date(),
    });
    user.points += points;

    await user.save();
    res.json({
      message: "Points assigned successfully",
      totalPoints: user.points,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// Handle bonus points for milestones
const handleMilestone = async (req, res) => {
  const { userId, milestoneName, rewardPoints } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Check if milestone already achieved
    const milestone = user.milestones.find((m) => m.name === milestoneName);
    if (milestone && milestone.achieved) {
      return res.status(400).json({ message: "Milestone already achieved" });
    }

    user.milestones.push({
      name: milestoneName,
      rewardPoints,
      achieved: true,
      dateAchieved: new Date(),
    });
    user.points += rewardPoints;

    await user.save();
    res.json({ message: "Milestone achieved!", totalPoints: user.points });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

module.exports = { assignPoints, handleMilestone };