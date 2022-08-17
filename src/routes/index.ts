import { Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";

import { IDetails } from "../interfaces";

class Routes {
  public router: Router = Router();

  constructor() {
    this.setRoutes();
  }

  private setRoutes(): void {
    this.router.use("/details", (req: Request, res: Response) => {
      const details: IDetails = {
        version: process.env.npm_package_version,
        contributors: [
          {
            nickname: process.env.npm_package_contributors_0_name,
            email: process.env.npm_package_contributors_0_email,
            url: process.env.npm_package_contributors_0_url,
          },
          {
            nickname: process.env.npm_package_contributors_1_name,
            email: process.env.npm_package_contributors_1_email,
            url: process.env.npm_package_contributors_1_url,
          },
        ],
        repository_url: process.env.npm_package_repository_url,
      };

      return res.status(StatusCodes.OK).json(details);
    });
  }
}

export default new Routes().router;
