// Import required modules
const express = require("express");
const bodyParser = require("body-parser");
const Replicate = require("replicate");
const cors = require('cors'); // Import the cors middleware

// Create an Express app
const app = express();
const port = 3001;
app.use(cors());

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Endpoint for handling POST requests
app.post("/fetch-data", async (req, res) => {
  try {
    // Assuming the request body contains necessary parameters for fetching data from the external API
    const { promt } = req.body;
    const replicate = new Replicate({
      auth: 'r8_VwPbKnlKmx2CwpKCeS5dKvXDbRd9I1w0Dzf3x',
    });
    console.log("*************", req.body);

    const output = await replicate.run(
      "anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351",
      {
        input: {
          prompt: promt,
        },
      }
    );

    res.status(200).json(output);

    // Make a POST request to the external API to fetch data
    //const externalApiResponse = await axios.post(apiUrl, requestData);

    // Check if the request to the external API was successful
    // if (externalApiResponse.status === 200) {
    //     // Respond with the fetched data
    //     res.json(externalApiResponse.data);
    // } else {
    //     // Handle error response from the external API
    //     console.error('Error fetching data:', externalApiResponse.statusText);
    //     res.status(500).send('Error fetching data');
    // }
  } catch (error) {
    // Handle any unexpected errors
    console.error("Unexpected error:", error);
    res.status(500).send("Unexpected error");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
