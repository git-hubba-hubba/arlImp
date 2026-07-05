require("dotenv").config();

const mongoose = require("mongoose");
const connectDB = require("../config/db");
const User = require("../models/User");
const Member = require("../models/Member");
const Event = require("../models/Event");
const Post = require("../models/Post");
const { upsertMemberFromUser } = require("../utils/memberSync");

const sampleUser = {
  username: "Sample Impact User",
  userEmail: "sample.user@arlimpact.local",
  userPassword: "Password123!",
  passwordConfirmation: "Password123!",
  userImage: "https://images.unsplash.com/photo-1628157588553-5eeea00af15c?w=900&q=80",
  userPoints: 723,
  userOccupation: "Community Organizer",
  userBadgeTier: "Gold",
};

const sampleMember = {
  username: "Sample Member",
  userEmail: "sample.member@arlimpact.local",
  userImage: "https://randomuser.me/api/portraits/women/44.jpg",
  userPoints: 150,
  userOccupation: "Business Mentor",
  userBadgeTier: "Silver",
};

const sampleEvent = {
  eventName: "Sample Community Impact Night",
  eventLocation: "Arlington, TX",
  eventDate: new Date("2026-09-15T18:30:00.000Z"),
  eventImage: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80",
  eventDescription: "A sample event for testing the ARL Impact event dashboard.",
};

const samplePost = {
  postTitle: "Sample Community Win",
  postAuthor: "Sample Impact User",
  postImage: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&q=80",
  postCategory: "Community",
  postBody: "A sample post for testing the social feed CRUD flow.",
};

async function seed() {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is required to seed sample data.");
  }

  await connectDB(process.env.MONGO_URI);

  let user = await User.findOne({ userEmail: sampleUser.userEmail });
  if (!user) {
    user = await User.create(sampleUser);
  }

  await upsertMemberFromUser(user);

  await Member.findOneAndUpdate(
    { userEmail: sampleMember.userEmail },
    sampleMember,
    { upsert: true, new: true, runValidators: true }
  );

  await Event.findOneAndUpdate(
    { eventName: sampleEvent.eventName },
    sampleEvent,
    { upsert: true, new: true, runValidators: true }
  );

  await Post.findOneAndUpdate(
    { postTitle: samplePost.postTitle },
    { ...samplePost, user: user._id },
    { upsert: true, new: true, runValidators: true }
  );

  await mongoose.disconnect();
  console.log("Sample User, Member, Event, and Post data seeded.");
}

seed().catch(async (error) => {
  console.error(error);
  await mongoose.disconnect();
  process.exit(1);
});
