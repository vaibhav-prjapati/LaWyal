const User = require("../models/user");

const getDashboardSummary = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({
      name: user.name,
      totalPoints: user.points,
      completedTasks: user.activities.filter((a) => a.completed).length,
      milestonesAchieved: user.milestones.length,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

const getDashboardDetails = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({
      name: user.name,
      totalPoints: user.points,
      activities: user.activities,
      milestones: user.milestones,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

module.exports = { getDashboardSummary, getDashboardDetails };