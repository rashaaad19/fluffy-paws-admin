import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/home/HomeScreen";
import DetailsScreen from "../screens/details/DetailsScreen";

const DynamicStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        // options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default DynamicStack;
