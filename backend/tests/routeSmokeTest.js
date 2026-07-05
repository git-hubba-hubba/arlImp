require("dotenv").config();

const assert = require("assert");
const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");
const connectDB = require("../config/db");

const mongoUri = process.env.TEST_MONGO_URI || process.env.MONGO_URI;

const userPayload = {
  username: "Test User",
  userEmail: `test-${Date.now()}@example.com`,
  userPassword: "Password123!",
  passwordConfirmation: "Password123!",
  userImage: "https://example.com/profile.jpg",
  userPoints: 25,
  userOccupation: "Community Builder",
  userBadgeTier: "Silver",
};

const eventPayload = {
  eventName: "Route Smoke Event",
  eventLocation: "Arlington, TX",
  eventDate: "2026-08-01T17:00:00.000Z",
  eventImage: "https://example.com/event.jpg",
  eventDescription: "A test event created by the backend smoke test.",
};

const postPayload = {
  postTitle: "Route Smoke Post",
  postAuthor: "Route Tester",
  postImage: "https://example.com/post.jpg",
  postCategory: "Testing",
  postBody: "A test post created by the backend smoke test.",
};

async function cleanDatabase() {
  const collections = Object.values(mongoose.connection.collections);
  await Promise.all(collections.map((collection) => collection.deleteMany({})));
}

async function run() {
  if (!mongoUri) {
    throw new Error("Set TEST_MONGO_URI or MONGO_URI before running route tests.");
  }

  process.env.JWT_SECRET = process.env.JWT_SECRET || "route-test-secret";

  await connectDB(mongoUri);
  await cleanDatabase();

  const health = await request(app).get("/api/health").expect(200);
  assert.equal(health.body.status, "ok");

  const register = await request(app).post("/api/auth/register").send(userPayload).expect(201);
  assert.ok(register.body.token);
  assert.equal(register.body.user.userEmail, userPayload.userEmail.toLowerCase());
  assert.equal(register.body.member.userEmail, userPayload.userEmail.toLowerCase());

  const login = await request(app)
    .post("/api/auth/login")
    .send({
      userEmail: userPayload.userEmail,
      userPassword: userPayload.userPassword,
    })
    .expect(200);
  assert.ok(login.body.token);

  const userId = register.body.user._id;

  const listUsers = await request(app).get("/api/users").expect(200);
  assert.equal(listUsers.body.length, 1);

  const getUser = await request(app).get(`/api/users/${userId}`).expect(200);
  assert.equal(getUser.body.username, userPayload.username);

  const updateUser = await request(app)
    .put(`/api/users/${userId}`)
    .send({
      username: "Updated Test User",
      userImage: "https://example.com/updated-profile.jpg",
      userPoints: 50,
      userOccupation: "Updated Occupation",
      userBadgeTier: "Gold",
    })
    .expect(200);
  assert.equal(updateUser.body.user.username, "Updated Test User");
  assert.equal(updateUser.body.member.userPoints, 50);

  const createUser = await request(app)
    .post("/api/users")
    .send({
      ...userPayload,
      username: "Second User",
      userEmail: `second-${Date.now()}@example.com`,
    })
    .expect(201);
  assert.equal(createUser.body.member.username, "Second User");

  const manualMember = await request(app)
    .post("/api/members")
    .send({
      username: "Manual Member",
      userEmail: `manual-${Date.now()}@example.com`,
      userImage: "https://example.com/manual.jpg",
      userPoints: 10,
      userOccupation: "Volunteer",
      userBadgeTier: "Bronze",
    })
    .expect(201);

  const memberId = manualMember.body._id;
  await request(app).get("/api/members").expect(200);
  await request(app).get(`/api/members/${memberId}`).expect(200);

  const updateMember = await request(app)
    .put(`/api/members/${memberId}`)
    .send({ userPoints: 15, userBadgeTier: "Silver" })
    .expect(200);
  assert.equal(updateMember.body.userPoints, 15);

  await request(app).delete(`/api/members/${memberId}`).expect(200);

  const createEvent = await request(app).post("/api/events").send(eventPayload).expect(201);
  const eventId = createEvent.body._id;
  assert.equal(createEvent.body.eventName, eventPayload.eventName);
  assert.equal(createEvent.body.eventImage, eventPayload.eventImage);

  await request(app).get("/api/events").expect(200);
  await request(app).get(`/api/events/${eventId}`).expect(200);

  const updateEvent = await request(app)
    .put(`/api/events/${eventId}`)
    .send({
      eventName: "Updated Route Smoke Event",
      eventImage: "https://example.com/updated-event.jpg",
    })
    .expect(200);
  assert.equal(updateEvent.body.eventName, "Updated Route Smoke Event");
  assert.equal(updateEvent.body.eventImage, "https://example.com/updated-event.jpg");

  await request(app).delete(`/api/events/${eventId}`).expect(200);

  const createPost = await request(app).post("/api/posts").send(postPayload).expect(201);
  const postId = createPost.body._id;
  assert.equal(createPost.body.postTitle, postPayload.postTitle);

  await request(app).get("/api/posts").expect(200);
  await request(app).get(`/api/posts/${postId}`).expect(200);

  const updatePost = await request(app)
    .put(`/api/posts/${postId}`)
    .send({ postTitle: "Updated Route Smoke Post" })
    .expect(200);
  assert.equal(updatePost.body.postTitle, "Updated Route Smoke Post");

  await request(app).delete(`/api/posts/${postId}`).expect(200);
  await request(app).delete(`/api/users/${userId}`).expect(200);

  await mongoose.disconnect();
  console.log("All backend route smoke tests passed.");
}

run().catch(async (error) => {
  console.error(error);
  await mongoose.disconnect();
  process.exit(1);
});
