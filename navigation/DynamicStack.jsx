import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/home/HomeScreen";
import { StatusBar } from "react-native";
import OrginizationScreen from "../screens/orgDetails/OrginizationScreen";

const DynamicStack = () => {
  const Stack = createNativeStackNavigator();
  return (
<Stack.Navigator
  screenOptions={{
    headerStyle: {
      backgroundColor: "#be5985",
    },
    headerTintColor: 'white',
    headerStatusBarHeight: StatusBar.currentHeight, 

  }}
>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Orginization"
        component={OrginizationScreen}
        options={{ headerTitle: '' }}
      />
    </Stack.Navigator>
  );
};

export default DynamicStack;
