require("dotenv/config");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;
const path = require("path");
const cookieParser = require("cookie-parser");
const { createServer } = require("node:http");
const server = createServer(app);

const cors = require("cors");
const connectDB = require("./config/db");
const postRouter = require("./routes/posts");
const commentRouter = require("./routes/comments");
const itineraryRouter = require("./routes/itineraries");
const authRouter = require("./routes/users");
const api = require("api");
const sdk = api("@fsq-developer/v1.0#18rps1flohmmndw");
sdk.auth("fsq3gWIjAcbE/wrnp4cNfACEHCMLyJECcH+Jt14xXBHVGmc=");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: [
      "https://mihaelawbs-tripteller-fullstack-dev.onrender.com",
      "http://localhost:5174",
    ],
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/api/comments", commentRouter);
app.use("/api/itineraries", itineraryRouter);
app.use("/api/posts", postRouter);
app.use("/auth", authRouter);
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

if (process.env.NODE_ENV === "production") {
  const buildPath = path.join(__dirname, "../client/dist");
  app.use(express.static(buildPath));

  app.get("*", (req, res) => res.sendFile(path.join(buildPath, "index.html")));
}
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
});
