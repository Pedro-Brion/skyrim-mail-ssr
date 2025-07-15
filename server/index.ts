import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import express, { type Request, type Response } from "express";
import { createServer as createViteServer, type ViteDevServer } from "vite";
import { logger } from "./logger.js";
import router from "./api/routes/messages.routes.js";
import compression from "compression";
import sirv from "sirv";
import { configDotenv } from "dotenv";

configDotenv();

type ServerEntryModule = {
  render: (url: string) => Promise<{ html: string; initialState: string }>;
};

// Constants
const __dirname: string = path.dirname(fileURLToPath(import.meta.url));
const isProd: boolean = process.env.NODE_ENV === "production";
const PORT = 5173;

async function createServer() {
  const app = express();

  const templateHtml = isProd
    ? await fs.readFile("./dist/client/index.html", "utf-8")
    : "";

  let vite: ViteDevServer | null = null;
  if (isProd) {
    app.use(compression());
    app.use("/", sirv("./dist/client", { extensions: [] }));
  } else {
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "custom",
    });
    app.use(vite.middlewares);
  }

  app.use(logger);

  app.use("/api", router);

  app.use("*", async (req: Request, res: Response) => {
    const url = req.originalUrl;

    let template;
    let render;
    if (isProd) {
      const entryPath = path.resolve(__dirname, "../server/entry-server.js");
      template = templateHtml;
      render = ((await import(entryPath)) as ServerEntryModule).render;
    } else {
      template = await fs.readFile(
        path.resolve(__dirname, "../index.html"),
        "utf-8"
      );
      template = await vite!.transformIndexHtml(url, template);
      render = (await vite!.ssrLoadModule("/src/entry-server.ts")).render;
    }
    try {
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
      if (!isProd && vite) {
        vite.ssrFixStacktrace(e);
        console.error(e.stack);
        res.status(500).end(e.stack);
      } else {
        console.error("SSR render error:", e);
        res.status(500).end("Internal Server Error");
      }
    }
  });

  app.listen(PORT, () => {
    console.log("App listening on port: ", PORT);
  });
}

createServer();
