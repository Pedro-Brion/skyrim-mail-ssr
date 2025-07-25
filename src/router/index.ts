import { createMemoryHistory, createRouter as _createRouter } from "vue-router";
import routes from "./routes";

export default function createRouter() {
  return _createRouter({
    history: createMemoryHistory(),
    routes,
  });
}
