import pluginPkg from "../../package.json";
import pluginId from "./pluginId";
import { Initializer } from "./components/Initializer";
import { Editor as ReactMdEditor } from "./components/ReactMdEditor";

const name = pluginPkg.strapi.name;

export default {
  register(app: any) {
    app.addFields({ type: "richtext", Component: ReactMdEditor });
    const plugin = {
      id: pluginId,
      initializer: Initializer,
      isReady: false,
      name,
    };

    app.registerPlugin(plugin);
  },
};
