// ARL Impact Backend Change Log
//
// Added backend/package.json with Express, Mongoose, CORS, dotenv, bcrypt,
// jsonwebtoken, nodemon, and supertest scripts.
//
// Added app/server split:
// - app.js configures middleware and routes.
// - server.js connects to MongoDB and starts the API.
//
// Added MongoDB connection helper:
// - config/db.js reads MONGO_URI and connects Mongoose.
//
// Added User, Member, and Event models:
// - User stores signup fields, hashes password values, and supports auth.
// - Member stores public member profile data and links back to a User.
// - Event stores eventName, eventLocation, eventDate, and eventDescription.
//
// Added routes/controllers:
// - /api/auth/register saves a User and automatically creates a Member.
// - /api/auth/login validates credentials and returns a JWT.
// - /api/users supports full CRUD for users.
// - /api/members supports full CRUD for members.
// - /api/events supports full CRUD for events.
//
// Added auth middleware:
// - middleware/authMiddleware.js verifies Bearer tokens.
//
// Added route smoke test:
// - tests/routeSmokeTest.js checks CRUD behavior against TEST_MONGO_URI or MONGO_URI.
//
// Added Post backend:
// - models/Post.js stores feed posts.
// - /api/posts supports full CRUD for posts.
//
// Added sample seed script:
// - npm run seed creates a sample user, synced member, manual member, event, and post.
//
// Added frontend comments only, not frontend fetch implementation:
// - SignUpForm.jsx documents register payload and endpoint.
// - LoginForm.jsx documents login payload and endpoint.
// - ProfileModal.jsx documents editable User fields and endpoint.
// - MembersDashboard.jsx documents where to fetch members.
// - EventDash.jsx documents where to fetch events.
