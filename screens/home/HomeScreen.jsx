import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useWindowDimensions } from "react-native"; 
import { TabView } from "react-native-tab-view";
import { renderScene, renderTabBar,routes } from "./tabBarHelpers";


const HomeScreen = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar}
        lazy
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
