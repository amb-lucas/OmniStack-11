import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Cases from "./pages/Cases";
import Details from "./pages/Details";

const AppStack = createStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <AppStack.Navigator screenOptions={{ headerShown: false }}>
        <AppStack.Screen name="Cases" component={Cases} />
        <AppStack.Screen name="Details" component={Details} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
