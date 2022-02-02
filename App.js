// import { StatusBar } from "expo-status-bar";
// import { useState } from "react";
// import { SafeAreaView, StyleSheet, Text, View } from "react-native";
// import { GestureHandlerRootView, PanGestureHandler } from "react-native-gesture-handler";
// import Animated, {
//     runOnJS,
//     useAnimatedGestureHandler,
//     useAnimatedStyle,
//     useSharedValue,
//     withSpring,
// } from "react-native-reanimated";
// import { MaterialIcons } from "@expo/vector-icons";
// import { Dimensions } from "react-native";
// import { AnimatePresence, Text as MotiText, View as MotiView } from "moti";
// export default function App() {
//     const [Items, setItems] = useState([
//         "lorem ipsum dolor madi1",
//         "lorem ipsum dolor madi2",
//         "lorem ipsum dolor madi3",
//         "lorem ipsum dolor madi4",
//         "lorem ipsum dolor madi5",
//     ]);

//     const deleter = (i) => {
//         setItems(Items.filter((item) => item !== i));
//     };
//     return (
//         <GestureHandlerRootView style={styles.container}>
//             <SafeAreaView>
//                 <Text style={styles.headerText}>Tasks</Text>
//                 <View style={styles.listWraper}>
//                     <AnimatePresence>
//                         {Items.map((item) => (
//                             <ListItem item={item} key={item} deleter={deleter} />
//                         ))}
//                         {Items.length == 0 && (
//                             <MotiText
//                                 from={{
//                                     opacity: 0,
//                                     scale: 0.5,
//                                     marginBottom: -56,
//                                 }}
//                                 animate={{
//                                     opacity: 1,
//                                     scale: 1,
//                                     marginBottom: 0,
//                                 }}
//                                 style={{ textAlign: "center", fontSize: 24 }}
//                             >
//                                 No Tasks for Now
//                             </MotiText>
//                         )}
//                     </AnimatePresence>
//                 </View>
//             </SafeAreaView>
//         </GestureHandlerRootView>
//     );
// }

// function ListItem({ item, deleter }) {
//     const XOFFSET = useSharedValue(0);

//     const shouldDelete_limit = -80;
//     const { width: Window_width } = Dimensions.get("window");
//     function swipeDelete() {
//         deleter(item);
//     }

//     const gesture = useAnimatedGestureHandler({
//         onActive: (e) => {
//             XOFFSET.value = Math.max(-120, Math.min(0, e.translationX));
//         },
//         onEnd: (e) => {
//             if (shouldDelete_limit > e.translationX) {
//                 XOFFSET.value = withSpring(-Window_width, {}, runOnJS(swipeDelete)());
//             } else {
//                 XOFFSET.value = withSpring(0);
//             }
//         },
//     });

//     const AnimatedItem = useAnimatedStyle(() => ({
//         transform: [{ translateX: XOFFSET.value }],
//     }));
//     return (
//         <MotiView
//             from={{
//                 opacity: 0,
//                 scale: 0.5,
//                 marginBottom: -52,
//             }}
//             animate={{
//                 opacity: 1,
//                 scale: 1,
//                 marginBottom: 10,
//             }}
//             exit={{
//                 opacity: 0,
//                 scale: 0.5,
//                 marginBottom: -52,
//             }}
//         >
//             <PanGestureHandler onGestureEvent={gesture}>
//                 <MotiView>
//                     <View style={styles.back}>
//                         <MaterialIcons name="delete" color={"white"} size={26} />
//                     </View>
//                     <Animated.View style={[styles.item, styles.front, AnimatedItem]}>
//                         <Text style={styles.item_text}>{item}</Text>
//                     </Animated.View>
//                 </MotiView>
//             </PanGestureHandler>
//         </MotiView>
//     );
// }
// const BORDER_RADIUS = 10;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: "#eeeeee",
//         padding: 20,
//         paddingTop: 50,
//     },
//     headerText: {
//         fontSize: 50,
//         fontWeight: "bold",
//     },
//     listWraper: {
//         marginVertical: 30,
//     },
//     item_wrapper: {
//         position: "relative",
//         marginBottom: 10,
//     },
//     item: {
//         backgroundColor: "white",
//         padding: 15,
//         borderRadius: BORDER_RADIUS,
//         elevation: 4,
//     },
//     item_text: {
//         fontSize: 20,
//     },
//     front: {
//         zIndex: 1,
//     },
//     back: {
//         position: "absolute",
//         width: "100%",
//         height: "100%",
//         backgroundColor: "red",
//         borderRadius: BORDER_RADIUS,
//         justifyContent: "center",
//         alignItems: "flex-end",
//         paddingRight: 20,
//     },
// });

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
