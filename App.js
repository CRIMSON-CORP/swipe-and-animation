import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
    return (
        <View>
            <Text>Plain Code</Text>
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
