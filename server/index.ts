import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import { createServer as createViteServer } from "vite";
import axios from "axios";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function createServer() {
  const app = express();

  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "custom",
  });

  app.use(vite.middlewares);

  app.use(
    "/api/messages",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?_limit=${req.query.count}`);
        res.json(response.data);
      } catch (e) {
        console.error("Error fetching posts:", e);
        res.status(500).json({ error: "Failed to fetch external data" });
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    }
  );

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
