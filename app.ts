import "dotenv/config";
import express from "express";
// import cors from "cors";
import routes from "./src/routes/Routes";

export default class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();
    this.routes();
  }

  private config(): void {
     const corsOptions = {
         origin: [
       //      process.env.FRONT_URL as string,
      //       'http://localhost:5502',
      '*'
         ]
     };

    // this.app.use(cors(corsOptions));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private routes(): void {
    this.app.use("/api", routes);
  }

  public start(PORT: string | number): void {
    this.app.listen(PORT, () => console.log(`Running server on port: ${PORT}`));
  }
}
