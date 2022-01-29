import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { GestureHandlerRootView, GestureDetector, Gesture } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
export default function App() {
    const isPressed = useSharedValue(false);
    const offset = useSharedValue({ x: 0, y: 0 });
    const animatedStyles = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: offset.value.x },
                { translateY: offset.value.y },
                { scale: withSpring(isPressed.value ? 1.2 : 1) },
            ],
            backgroundColor: isPressed.value ? "yellow" : "blue",
        };
    });

    const start = useSharedValue({ x: 0, y: 0 });
    const gesture = Gesture.Pan()
        .onBegin(() => {
            isPressed.value = true;
        })
        .onUpdate((e) => {
            offset.value = {
                x: e.translationX + start.value.x,
                y: e.translationY + start.value.y,
            };
        })
        .onEnd((e) => {
            start.value = {
                x: offset.value.x,
                y: offset.value.y,
            };
        })
        .onFinalize(() => {
            isPressed.value = false;
        });
    return (
        <GestureHandlerRootView style={styles.container}>
            <StatusBar style="auto" />
            <View style={styles.container}>
                <GestureDetector gesture={gesture}>
                    <Animated.View style={[styles.ball, animatedStyles]} />
                </GestureDetector>
            </View>
        </GestureHandlerRootView>
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
