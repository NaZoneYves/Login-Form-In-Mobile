import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import BookListScreen from "./app/screens/BookList";
import DashboardScreen from "./app/screens/Dashboard";

import AddBookScreen from "./app/screens/AddBook";
import EditBookScreen from "./app/screens/EditBook";

const Stack = createStackNavigator();

const App = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <NavigationContainer>
        <Stack.Navigator>
        
          <Stack.Screen name="BookList" component={BookListScreen} />

          {/* <Stack.Screen name="BookDetail" component={BookDetailScreen} /> */}
          <Stack.Screen name="AddBook" component={AddBookScreen} />
          <Stack.Screen name="EditBook" component={EditBookScreen} />
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1, // Đảm bảo ScrollView chiếm toàn bộ không gian cần thiết
    backgroundColor: "#f9f9f9",
  },
});

export default App;
