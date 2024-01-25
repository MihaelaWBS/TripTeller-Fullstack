require ("dotenv/config");
const express = require("express");
const app = express();
const PORT = 8000;
const cors = require("cors");

app.use(express());
app.use(cors());

app.listen(PORT, () => console.log(`Listening on ${PORT}`));