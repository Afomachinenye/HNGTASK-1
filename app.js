const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const { PORT } = process.env;
const moment = require("moment-timezone");

app.use(express.json());

app.get("/api", (req, res) => {
  try {
    const { slack_name, track } = req.query;
    const current_day = moment().tz("UTC").format("dddd");

    const currentDate = new Date();
    const year = currentDate.getUTCFullYear();
    const month = (currentDate.getUTCMonth() + 1).toString().padStart(2, "0");
    const day = currentDate.getUTCDate().toString().padStart(2, "0");
    const hours = currentDate.getUTCHours().toString().padStart(2, "0");
    const minutes = currentDate.getUTCMinutes().toString().padStart(2, "0");
    const seconds = currentDate.getUTCSeconds().toString().padStart(2, "0");

    const currentUTC = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;

    const github_file_url =
      "https://github.com/Afomachinenye/HNGTASK-1/blob/main/app.js";
    const github_repo_url = "https://github.com/Afomachinenye/HNGTASK-1";

    const status_code = 200;

    const response_data = {
      slack_name: slack_name,
      current_day: current_day,
      utc_time: currentUTC,
      track: track,
      github_file_url: github_file_url,
      github_repo_url: github_repo_url,
      status_code: status_code,
    };
    res.status(200).json(response_data);
  } catch (error) {
    // If an error occurs, send a 500 Internal Server Error response
    res.status(500).json({ error: "Server failed" });
  }
});

app.listen(PORT || 4000, () => {
  console.log(`Listening to requests on ${PORT}`);
});
