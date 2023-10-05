import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));

app.get("/", async (req, res) => {
  try {
    const date = new Date();
    const month = date.getMonth() + 1;
    const day = date.getDay() + 1;
    const formatter = new Intl.DateTimeFormat("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });

    const formattedDate = formatter.format(date);
    console.log(`date: ${date}. month: ${month}. day: ${day}`);
    const result = await axios.get(
      "https://byabbe.se/on-this-day/2/2/events.json"
    );

    res.render("index.ejs", {
      date: date,
      formattedDate: formattedDate,
      result: result.data.events,
    });
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
