const connection = require("../config/connection");
const { User, Thought } = require("../models");
const { userData, thoughtData } = require("./data");

async function seedDatabase() {
  await connection.once("open", async () => {
    try {
      // Clear existing data
      await User.deleteMany({});
      await Thought.deleteMany({});

      // Seed Users
      const seededUsers = await User.insertMany(userData);

      // Seed Thoughts
      const seededThoughts = await Thought.insertMany(thoughtData);

      // Update each user's thoughts array
      for (const thought of seededThoughts) {
        const user = seededUsers.find((u) => u.username === thought.username);
        if (user) {
          await User.findByIdAndUpdate(user._id, {
            $push: { thoughts: thought._id },
          });
        }
      }
    } catch (err) {
      console.error("Error seeding database:", err);
    } finally {
      process.exit(0);
    }
  });
}

seedDatabase();
