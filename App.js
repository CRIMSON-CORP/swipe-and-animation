import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import {
    GestureHandlerRootView,
    GestureDetector,
    Gesture,
    PanGestureHandler,
} from "react-native-gesture-handler";
import Animated, {
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
} from "react-native-reanimated";
export default function App() {
    const isPressed = useSharedValue(false);
    const offsetX = useSharedValue(0);
    const offsetY = useSharedValue(0);
    const animatedStyles = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: offsetX.value },
                { translateY: offsetY.value },
                { scale: withSpring(isPressed.value ? 1.2 : 1) },
            ],
            backgroundColor: isPressed.value ? "yellow" : "blue",
        };
    });

    const gesture = useAnimatedGestureHandler({
        onStart: () => {
            isPressed.value = true;
        },
        onActive: (e) => {
            offsetX.value = e.translationX;
            offsetY.value = e.translationY;
        },
        onEnd: () => {
            offsetX.value = withSpring(0, { damping: 5 });
            offsetY.value = withSpring(0, { damping: 5 });

            isPressed.value = false;
        },
    });
    return (
        <GestureHandlerRootView style={styles.container}>
            <StatusBar style="auto" />
            <View style={styles.container}>
                <PanGestureHandler onGestureEvent={gesture}>
                    <Animated.View style={[styles.ball, animatedStyles]} />
                </PanGestureHandler>
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
