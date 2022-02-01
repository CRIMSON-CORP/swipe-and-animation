import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { GestureHandlerRootView, PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from "react-native-reanimated";
import { MaterialIcons } from "@expo/vector-icons";
import { Dimensions } from "react-native";
import { View as MotiView } from "moti";
export default function App() {
    const [Items, setItems] = useState([
        "lorem ipsum dolor madi1",
        "lorem ipsum dolor madi2",
        "lorem ipsum dolor madi3",
        "lorem ipsum dolor madi4",
        "lorem ipsum dolor madi5",
    ]);
    return (
        <GestureHandlerRootView style={styles.container}>
            <SafeAreaView>
                <Text style={styles.headerText}>Tasks</Text>
                <View style={styles.listWraper}>
                    {Items.map((item) => (
                        <ListItem item={item} />
                    ))}
                </View>
            </SafeAreaView>
        </GestureHandlerRootView>
    );
}
const shouldDelete_limit = -80;
const { width: Window_width } = Dimensions.get("window");
function ListItem({ item }) {
    const XOFFSET = useSharedValue(0);
    const Deleter = useSharedValue(0);

    const gesture = useAnimatedGestureHandler({
        onActive: (e) => {
            XOFFSET.value = Math.max(-120, Math.min(0, e.translationX));
        },
        onEnd: (e) => {
            if (shouldDelete_limit > e.translationX) {
                XOFFSET.value = withSpring(-Window_width);
                Deleter.value = withSpring(0, { damping: 4 });
            } else {
                XOFFSET.value = withSpring(0);
            }
        },
    });

    const AnimatedItem = useAnimatedStyle(() => ({
        transform: [{ translateX: XOFFSET.value }],
    }));
    const wrapper = useAnimatedStyle(() => ({
        height: withSpring(Deleter.value),
    }));
    return (
        <PanGestureHandler onGestureEvent={gesture}>
            <MotiView
                style={[styles.listWraper, wrapper]}
                from={{
                    opacity: 0,
                    scale: 0.5,
                    marginBottom: -46,
                }}
                animate={{
                    opacity: 1,
                    scale: 1,
                    marginBottom: 0,
                }}
                exit={{
                    opacity: 0,
                    scale: 0.5,
                    marginBottom: -46,
                }}
            >
                <View style={styles.back}>
                    <MaterialIcons name="delete" color={"white"} size={26} />
                </View>
                <Animated.View style={[styles.item, styles.front, AnimatedItem]}>
                    <Text style={styles.item_text}>{item}</Text>
                </Animated.View>
            </MotiView>
        </PanGestureHandler>
    );
}

const BORDER_RADIUS = 10;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#eeeeee",
        padding: 20,
        paddingTop: 50,
    },
    headerText: {
        fontSize: 50,
        fontWeight: "bold",
    },
    listWraper: {
        marginBottom: 10,
    },
    item: {
        backgroundColor: "white",
        padding: 15,
        borderRadius: BORDER_RADIUS,
        elevation: 4,
    },
    item_text: {
        fontSize: 20,
    },
    front: {
        zIndex: 1,
    },
    back: {
        position: "absolute",
        width: "100%",
        height: "100%",
        backgroundColor: "red",
        borderRadius: BORDER_RADIUS,
        justifyContent: "center",
        alignItems: "flex-end",
        paddingRight: 20,
    },
});
