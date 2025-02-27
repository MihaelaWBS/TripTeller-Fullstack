require("dotenv/config");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;
const path = require("path");
const eventsRouter = require("./routes/events");
const cookieParser = require("cookie-parser");
const { createServer } = require("node:http");
const server = createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const cloudinary = require("cloudinary").v2;
const cors = require("cors");
const apiRouter = require("./routes/apiRoutes");
const connectDB = require("./config/db");
const postRouter = require("./routes/posts");
const commentRouter = require("./routes/comments");
const itineraryRouter = require("./routes/itineraries");
const authRouter = require("./routes/users");
const upcomingTripsRouter = require("./routes/upcomingTrips");
const activitiesRouter = require("./routes/activity");
const api = require("api");
const { addAvatar } = require("./controllers/users");
const sdk = api("@fsq-developer/v1.0#18rps1flohmmndw");
sdk.auth("fsq3gWIjAcbE/wrnp4cNfACEHCMLyJECcH+Jt14xXBHVGmc=");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: [
      "https://mihaelawbs-tripteller-fullstack-dev.onrender.com",
      "http://localhost:5174",
      "http://localhost:5173",
    ],
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/auth", authRouter);

app.use("/api/events", eventsRouter);
app.use("/api/comments", commentRouter);
app.use("/api/itineraries", itineraryRouter);
app.use("/api/posts", postRouter);
app.use("/api", apiRouter);
app.use("/api/upcomingTrips", upcomingTripsRouter);
app.use("/api/activities", activitiesRouter);
const hardcodedLatitude = "48.858844";
const hardcodedLongitude = "2.294351";

app.get("/api/photos/:cityName", async (req, res) => {
  const { cityName } = req.params;
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${cityName}&client_id=${process.env.UNSPLASH_API_KEY}`
    );
    const data = await response.json();
    if (!data.results[0]?.urls.small) {
      console.log("No image found for city:", cityName);
      return res.status(404).json({ error: "No image found" });
    }
    res.json(data.results[0]?.urls.small);
  } catch (error) {
    console.error("Error fetching image:", error);
    res.status(500).json({ error: "Error fetching image" });
  }
});

app.get("/api/search", async (req, res) => {
  console.log("Received request at /api/search");

  sdk.auth("fsq3gWIjAcbE/wrnp4cNfACEHCMLyJECcH+Jt14xXBHVGmc=");

  try {
    const { data } = await sdk.placeSearch({
      ll: `${hardcodedLatitude},${hardcodedLongitude}`,
    });

    console.log(data);

    res.json(data);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "An error occurred while searching places." });
  }
});

io.on("connection", (socket) => {
  console.log(`${socket.id} user just connected!`);
  socket.on("createBook", async (payload) => {
    try {
      const newBook = await Book.create({ ...payload });
      console.log("PAYLOAAAAD", payload);
      io.emit("bookCreated", newBook);
    } catch (error) {
      io.emit("bookCreationError", error);
    }
  });
  socket.on("disconnect", () => {
    console.log(": A user disconnected");
  });
});

if (process.env.NODE_ENV === "production") {
  const buildPath = path.join(__dirname, "../client/dist");
  app.use(express.static(buildPath));

  app.get("*", (req, res) => res.sendFile(path.join(buildPath, "index.html")));
}
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
});
