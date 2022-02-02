import {
    Button,
    StyleSheet,
    Text,
    View,
    TouchableNativeFeedback,
    TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import Animated, {
    Extrapolate,
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";
import { transform } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";

export default function App() {
    const [Animation, setAnimation] = useState(false);
    const Shared = useSharedValue(0);
    useEffect(() => {
        if (Animation) {
            Shared.value = withTiming(1);
        } else {
            Shared.value = withTiming(0);
        }
    }, [Animation]);

    const Wrapper_Animation_Styles = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: 250 * 0.8 },
                { translateY: 250 * 0.8 },
                { scale: interpolate(Shared.value, [0, 1], [0.4, 1], Extrapolate.CLAMP) },
                { translateX: -250 * 0.8 },
                { translateY: -250 * 0.8 },
                {},
            ],
            opacity: Shared.value,
        };
    });

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.bubble_Wrapper, Wrapper_Animation_Styles]}>
                <View style={styles.inner_dots}></View>
                <View style={styles.inner_dots}></View>
                <View style={styles.inner_dots}></View>
            </Animated.View>
            <TouchableOpacity style={styles.button_Text} onPress={() => setAnimation(!Animation)}>
                <Text style={styles.text}>{Animation ? "Stop" : "Start"}</Text>
            </TouchableOpacity>
        </View>
    );
}
const Dimension = 250;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
    },
    bubble_Wrapper: {
        width: Dimension,
        height: Dimension,
        backgroundColor: "#eeeeee",
        borderTopLeftRadius: Dimension / 2,
        borderTopRightRadius: Dimension / 2,
        borderBottomLeftRadius: Dimension / 2,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },
    inner_dots: {
        width: 30,
        height: 30,
        borderRadius: 20,
        backgroundColor: "#7777dd",
        margin: 15,
    },
    button_Text: {
        alignSelf: "flex-end",
        width: "100%",
        padding: 20,
        backgroundColor: "#7777dd",
        position: "absolute",
        bottom: 0,
    },
    text: {
        textAlign: "center",
        color: "white",
        textTransform: "uppercase",
        fontWeight: "800",
        fontSize: 22,
    },
});
