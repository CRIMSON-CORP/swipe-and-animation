import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import Animated, {
    useAnimatedStyle,
    interpolate,
    Extrapolate,
    useAnimatedGestureHandler,
    useSharedValue,
    withSpring,
    runOnJS,
    withTiming,
} from "react-native-reanimated";
import { GestureHandlerRootView, PanGestureHandler } from "react-native-gesture-handler";
const windowWidth = Dimensions.get("window").width;
export default function MusicAppUi() {
    const images = [
        require("./assets/images/1.jpg"),
        require("./assets/images/2.jpg"),
        require("./assets/images/3.jpg"),
        require("./assets/images/4.jpg"),
        require("./assets/images/bg.jpg"),
    ];

    const [Index, setIndex] = useState(0);
    const sharedX = useSharedValue(0);
    const swipeDetermine = -windowWidth * 0.2;
    const gesture = useAnimatedGestureHandler({
        onStart: () => {
            sharedX.value = 0;
        },
        onActive: (e, ctx) => {
            sharedX.value = e.translationX;
            console.log(e.translationX);
        },
        onFinish: (e, ctx) => {
            // sharedX.value = withSpring(0);
            if (e.translationX > swipeDetermine) sharedX.value = withSpring(0);
            else if (e.translationX < -swipeDetermine) {
                sharedX.value = withTiming(-windowWidth, null, () => {
                    runOnJS(setIndex)(Index + 1);
                    sharedX.value = 0;
                });
            }
        },
    });

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                {images.map((item, index) => {
                    return <ImageAbs image={item} key={item} index={index} CardIndex={Index} />;
                })}
                <View style={{ zIndex: 10, flex: 1 }}>
                    <View style={{ padding: 15, paddingTop: 50, position: "relative" }}>
                        <PanGestureHandler onGestureEvent={gesture}>
                            <Animated.View style={{ position: "relative" }}>
                                {images.map((item, index) => {
                                    return (
                                        <SliderImageCard
                                            item={item}
                                            key={item}
                                            index={index}
                                            CardIndex={Index}
                                            sharedX={sharedX}
                                        />
                                    );
                                })}
                            </Animated.View>
                        </PanGestureHandler>

                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                backgroundColor: "red",
                            }}
                        >
                            <Text>0:01</Text>
                            <View></View>
                            <Text>3:04</Text>
                        </View>
                    </View>
                </View>
            </View>
        </GestureHandlerRootView>
    );
}

function ImageAbs({ image, index, CardIndex }) {
    const opacity = useAnimatedStyle(() => ({
        opacity: interpolate(CardIndex, [index - 1, index, index + 1], [0, 1, 0]),
    }));
    return (
        <Animated.Image
            source={image}
            blurRadius={30}
            style={[
                { width: "100%", height: "100%", resizeMode: "cover" },
                StyleSheet.absoluteFillObject,
                opacity,
            ]}
        />
    );
}

function SliderImageCard({ item, CardIndex, index, sharedX }) {
    let translation = useMemo(
        () => (CardIndex >= index ? 0 : CardIndex < index ? windowWidth : 0),
        [CardIndex]
    );
    const AnimatedStyle = useAnimatedStyle(() => ({
        transform: [
            {
                translateX:
                    index === 0
                        ? 0
                        : CardIndex + 1 === index
                        ? sharedX.value + windowWidth
                        : translation,
            },
            {
                scale:
                    CardIndex >= index
                        ? interpolate(
                              sharedX.value,
                              [windowWidth, 0, -windowWidth],
                              [0.8, 1, 0.8],
                              Extrapolate.CLAMP
                          )
                        : 1,
            },
        ],
    }));
    return (
        <Animated.View
            key={item}
            style={[
                {
                    elevation: 6,
                    width: "100%",
                    top: 50,
                    borderRadius: 3,
                    position: "absolute",
                },
                AnimatedStyle,
            ]}
        >
            <Image
                source={item}
                style={{
                    width: "100%",
                    height: 560,
                    borderRadius: 3,
                    position: "absolute",
                }}
            />
        </Animated.View>
    );
}
