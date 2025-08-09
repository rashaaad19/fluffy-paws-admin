import { SceneMap, TabBar } from "react-native-tab-view";
import OrgsView from "./OrgsView";
import SittersView from "./SittersView";

export const renderScene = SceneMap({
  first: OrgsView,
  second: SittersView,
});
export const renderTabBar = (props) => (
  <TabBar
    {...props}
    style={{ backgroundColor: "#be5985",paddingBlock:10 }}
    indicatorStyle={{ backgroundColor: "white" }}
  />
);

export const routes = [
  { key: "first", title: "Orginizations" },
  { key: "second", title: "Personal Sitters" },
];
