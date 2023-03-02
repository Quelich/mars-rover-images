export default async function handler(req, res) {
  const NASA_API_KEY = process.env.NASA_API_KEY;
  const NASA_API_URL = "https://api.nasa.gov/mars-photos/api/v1";
  const rover = "curiosity";
  if (req.method === "POST") {
    try {
      const sol = req.body.sol;
      const loadedData = await fetch(
        `${NASA_API_URL}/rovers/${rover}/photos?sol=${sol}&api_key=${NASA_API_KEY}`
      );
      const parsedData = await loadedData.json();
      return res.status(200).json({data: parsedData, message: "Success"});
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Error" });
    }
  }
}
