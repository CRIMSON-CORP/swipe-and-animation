import { useEffect, useState } from "react";
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    StatusBar,
    FlatList,
    RefreshControl,
    ScrollViewBase,
    ScrollView,
    Image,
} from "react-native";
import {
    Extrapolate,
    interpolateColor,
    log,
    useAnimatedProps,
    useAnimatedStyle,
    useSharedValue,
} from "react-native-reanimated";
import Animated, { interpolate } from "react-native-reanimated";
const spacing = 20;

const Height = 126;
const AnScroll = Animated.createAnimatedComponent(ScrollView);
export default function App() {
    const [refresh, setRefresh] = useState(false);
    const data = Array.from(Array(20).keys());
    const scrollTop_Shared = useSharedValue(0);
    useEffect(() => {
        if (refresh) {
            setTimeout(() => setRefresh(false), 2000);
        }
    }, [refresh]);

    return (
        <Animated.View style={[styles.container]}>
            <Image
                source={require("./assets/bg.jpg")}
                resizeMode="cover"
                blurRadius={20}
                style={[StyleSheet.absoluteFill, { width: "100%", height: "100%" }]}
            />
            <AnScroll
                onScroll={(e) => {
                    scrollTop_Shared.value = e.nativeEvent.contentOffset.y;
                }}
                refreshControl={
                    <RefreshControl
                        onRefresh={() => setRefresh(true)}
                        refreshing={refresh}
                        title="Getting Lists"
                        titleColor={"red"}
                        size={50}
                    />
                }
            >
                <Animated.View
                    style={{
                        padding: spacing,
                        paddingTop: StatusBar.currentHeight + 30,
                        backgroundColor: "#ffffff88",
                    }}
                >
                    {data.map((_, index) => {
                        return <Card key={index} index={index} shared={scrollTop_Shared} />;
                    })}
                </Animated.View>
            </AnScroll>
        </Animated.View>
    );
}

function Card({ index, shared }) {
    const interpolate_arr = [0, Height * index, Height * (index + 2)];

    const flat = useAnimatedStyle(() => ({
        // opacity: interpolate(shared.value, [0, 1500], [0, 1], Extrapolate.CLAMP),
        transform: [
            {
                scale: interpolate(shared.value, interpolate_arr, [1, 1, 0.4]),
            },
        ],
        opacity: interpolate(shared.value, interpolate_arr, [1, 1, 0]),
    }));
    return (
        <Animated.View
            key={index}
            style={[
                {
                    marginBottom: spacing,
                    padding: 20,
                    borderRadius: 10,
                    elevation: 10,
                    backgroundColor: "#ffffff",
                    flexDirection: "row",
                    alignItems: "center",
                },
                flat,
            ]}
        >
            <Image
                source={require("./assets/bg.jpg")}
                resizeMode="cover"
                style={[
                    {
                        width: 60,
                        height: 60,
                        borderRadius: 60,
                        marginRight: spacing,
                    },
                ]}
            />
            <View>
                <Text style={{ fontWeight: "600", fontSize: 24 }}>Lorem</Text>
                <Text style={{ fontWeight: "400", fontSize: 16 }}>Lorem ipsum</Text>
                <Text style={{ fontWeight: "600", fontSize: 14 }}>Lorem@ipsum</Text>
            </View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    ball: {
        width: 100,
        height: 100,
        borderRadius: 100,
        backgroundColor: "blue",
        alignSelf: "center",
    },
});
