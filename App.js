import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();
export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={({ route }) => ({
                        title: route.params.homeText || "Home Screen",
                        headerStyle: {
                            backgroundColor: "#f4511e",
                        },
                        headerTintColor: "#fff",
                        headerTitleStyle: {
                            fontWeight: "bold",
                        },
                        headerLeft: () => <Button title="Go Back" color="blue"  />,
                    })}
                    initialParams={{
                        homeText: "Inital text from parent",
                    }}
                />
                <Stack.Screen
                    name="AnotherScreen"
                    component={AnotherScreen}
                    options={{ title: "Another Screen Side" }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

function HomeScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text
                onPress={() =>
                    navigation.navigate("AnotherScreen", {
                        homeText: "Hello from Home",
                    })
                }
            >
                HomeScreen
            </Text>
            <Text onPress={() => navigation.setOptions({ title: "Set Title" })}>Set stuff</Text>
        </View>
    );
}
function AnotherScreen({ navigation, route }) {
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text onPress={() => navigation.navigate("Home")}>AnotherScreen</Text>
            <Text>{route.params && route.params.homeText}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    ball: {
        width: 100,
        height: 100,
        borderRadius: 100,
        backgroundColor: "blue",
        alignSelf: "center",
    },
});
