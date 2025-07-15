import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import { createServer as createViteServer } from "vite";
import { logger } from "./logger";
import router from "./api/routes/messages.routes";

//
const __dirname: string = path.dirname(fileURLToPath(import.meta.url));
const isProd: boolean = process.env.NODE_ENV === "production";

async function createServer() {
  const app = express();
  console.log("\x1b[36m \x1b[45m IS PROD \x1b[0m", isProd);

  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "custom",
  });

  app.use(vite.middlewares);

  app.use(logger);

  app.use("/api", router);

  app.use("*all", async (req: Request, res: Response, next: NextFunction) => {
    const url = req.originalUrl;
    try {
      let template = fs.readFileSync(
        path.resolve(__dirname, "../index.html"),
        "utf-8"
      );

      template = await vite.transformIndexHtml(url, template);

      const { render } = await vite.ssrLoadModule("/src/entry-server.ts");

      const { html: appHtml, initialState } = await render(url); // Get both html and state

      const html = template
        .replace(`<!--ssr-outlet-->`, () => appHtml)
        .replace(
          `<!--initial-state-->`,
          `<script>window.__INITIAL_STATE__ = ${initialState}</script>`
        );

      res.status(200).set({ "Content-Type": "text/html" }).end(html);
      //eslint-disable-next-line
    } catch (e: any) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });

  app.listen(5173);
}

createServer();
