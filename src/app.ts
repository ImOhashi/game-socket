import express from "express";
import { config } from "dotenv";
import { middlewareLogger } from "cyber-logger";

class App {
  public app: express.Application = express();

  constructor() {
    if (process.env.NODE_ENV === "development") config();

    this.middlewares();
  }

  private middlewares(): void {
    this.app.use(middlewareLogger);
    this.app.use(express.json);
    this.app.use(
      express.urlencoded({
        parameterLimit: 10000,
        limit: "50mb",
        extended: false,
      })
    );
  }
}

export default new App().app;
