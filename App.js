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
    Easing,
    Extrapolate,
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withRepeat,
    withSequence,
    withSpring,
    withTiming,
} from "react-native-reanimated";

export default function App() {
    const [Animation, setAnimation] = useState(false);
    const Wrapper_Shared = useSharedValue(0);
    const Wrapper_Shared_rotate = useSharedValue(0);

    useEffect(() => {
        if (Animation) {
            Wrapper_Shared.value = withSpring(1);
            Wrapper_Shared_rotate.value = withSpring(0);
        } else {
            Wrapper_Shared.value = withSpring(0);
            Wrapper_Shared_rotate.value = withSpring(-30);
        }
    }, [Animation]);

    const Wrapper_Animation_Styles = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: 250 * 0.8 },
                { translateY: 250 * 0.8 },
                { scale: interpolate(Wrapper_Shared.value, [0, 1], [0.4, 1]) },
                { rotate: Wrapper_Shared_rotate.value + "deg" },
                { translateX: -250 * 0.8 },
                { translateY: -250 * 0.8 },
            ],
            opacity: Wrapper_Shared.value,
        };
    });

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.bubble_Wrapper, Wrapper_Animation_Styles]}>
                {Animation &&
                    [1, 2, 3].map((_, index) => <Dot index={index} anim={Animation} key={index} />)}
            </Animated.View>
            <TouchableOpacity style={styles.button_Text} onPress={() => setAnimation(!Animation)}>
                <Text style={styles.text}>{Animation ? "Stop" : "Start"}</Text>
            </TouchableOpacity>
        </View>
    );
}

function Dot({ index, anim }) {
    const inner_opacity_shared = useSharedValue(0);
    const inner_opacity_shared_transform = useSharedValue(0);
    useEffect(() => {
        if (anim) {
            inner_opacity_shared.value = withDelay(300, withTiming(1));
            inner_opacity_shared_transform.value = withDelay(
                index * 100,
                withRepeat(
                    withSequence(
                        withTiming(-20, { easing: Easing.out(Easing.quad) }),
                        withTiming(0, { easing: Easing.in(Easing.quad) })
                    ),
                    -1
                )
            );
        } else {
            inner_opacity_shared.value = withDelay(300, withTiming(0));
        }
    }, [anim]);
    const inner_Animation = useAnimatedStyle(() => ({
        opacity: inner_opacity_shared.value,
        transform: [{ translateY: inner_opacity_shared_transform.value }],
    }));

    return <Animated.View style={[styles.inner_dots, inner_Animation]}></Animated.View>;
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
