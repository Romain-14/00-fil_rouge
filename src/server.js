import "dotenv/config";
import app from "./app.js";

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => console.log("Running at http://localhost:" + PORT));
