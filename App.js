import { View, Text } from "react-native";
import React from "react";
import MusicAppUi from "./MusicAppUi";

export default function App() {
    return <MusicAppUi />;
}

// import { StyleSheet, Text, View, FlatList, Image, Dimensions } from "react-native";
// import Animated, { interpolate, useAnimatedStyle, useSharedValue } from "react-native-reanimated";

// const width = Dimensions.get("window").width * 0.7;
// const Fwidth = Dimensions.get("window").width;
// const height = Dimensions.get("window").height * 0.6;
// export default function App() {
//     const shared = useSharedValue(0);
//     const images = [
//         require("./assets/images/1.jpg"),
//         require("./assets/images/2.jpg"),
//         require("./assets/images/3.jpg"),
//         require("./assets/images/4.jpg"),
//         require("./assets/images/bg.jpg"),
//     ];
//     return (
//         <View style={styles.container}>
//             {images.map((item, index) => {
//                 return <BG image={item} index={index} shared={shared} key={index} />;
//             })}
//             <FlatList
//                 onScroll={(e) => (shared.value = e.nativeEvent.contentOffset.x)}
//                 data={images}
//                 renderItem={({ item }) => (
//                     <View style={styles.card_image_wrapper}>
//                         <View style={styles.image_shadow}>
//                             <Image source={item} style={[styles.image]} resizeMode="cover" />
//                         </View>
//                     </View>
//                 )}
//                 horizontal
//                 keyExtractor={(item) => item}
//             />
//         </View>
//     );
// }

// function BG({ image, index, shared }) {
//     const opacity = useAnimatedStyle(() => ({
//         opacity: interpolate(
//             shared.value,
//             [(index - 1) * Fwidth, index * Fwidth, (index + 1) * Fwidth],
//             [0, 1, 0]
//         ),
//     }));
//     return (
//         <Animated.Image
//             key={image}
//             source={image}
//             resizeMode="cover"
//             blurRadius={30}
//             style={[{ width: "100%", height: "100%" }, StyleSheet.absoluteFillObject, opacity]}
//         />
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: "#333",
//         alignItems: "center",
//         justifyContent: "center",
//     },
//     card_image_wrapper: {
//         flex: 1,
//         width: Fwidth,
//         height: "100%",
//         justifyContent: "center",
//         alignItems: "center",
//     },
//     image_shadow: {
//         elevation: 10,
//         backgroundColor: "white",
//         borderRadius: 15,
//     },
//     image: {
//         width,
//         height,
//         borderRadius: 15,
//     },
// });
