import "dotenv/config";
import App from "./app";
const port = process.env.PORT || 3006;
new App().start(port);
