const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.json(
    [{
      id: 1,
      name: "sourabha",
      age: 15,
    },
    {
      id: 2,
      name: "sachin",
      age: 16,
    },
    {
      id: 3,
      name: "sudhamani",
      age: 17,
    }]
  );
});

app.listen(5050, () => {
  console.log("App is running on port 5050");
});
