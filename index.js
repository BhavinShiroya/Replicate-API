const express = require("express");
const bodyParser = require("body-parser");
const Replicate = require("replicate");
const cors = require("cors"); // Import the cors middleware
require("dotenv").config();

const app = express();
const port = 3001;

// Use the cors middleware
app.use(cors());

app.use(bodyParser.json());

app.post("/fetch-data", async (req, res) => {
  try {
    const myVariable = process.env.MY_VARIABLE;
    const { prompt } = req.body;

    console.log(prompt, req.body);

    const replicate = new Replicate({
      auth: myVariable,
    });

    const output = await replicate.run(
      "anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351",
      {
        input: {
          prompt: prompt,
        },
      }
    );

    res.status(200).json(output);
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).send("Unexpected error");
  }
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
