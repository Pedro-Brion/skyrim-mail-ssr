import { createMemoryHistory, createRouter as _createRouter } from "vue-router";
import routes from "./routes";

function createRouter() {
  return _createRouter({
    history: createMemoryHistory(),
    routes,
  });
}

export default createRouter();
