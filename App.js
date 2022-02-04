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
export default function App() {
    const [refresh, setRefresh] = useState(false);
    const data = Array.from(Array(20).keys());
    const scrollTop_Shared = useSharedValue(0);
    useEffect(() => {
        if (refresh) {
            setTimeout(() => setRefresh(false), 2000);
        }
    }, [refresh]);

    const AnScroll = Animated.createAnimatedComponent(ScrollView);

    return (
        <Animated.View style={[styles.container]}>
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
                <Animated.View>
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
                    backgroundColor: "white",
                },
                flat,
            ]}
        >
            <Text style={{ fontWeight: "600", fontSize: 24 }}>Lorem</Text>
            <Text style={{ fontWeight: "400", fontSize: 16 }}>Lorem ipsum</Text>
            <Text style={{ fontWeight: "600", fontSize: 14 }}>Lorem@ipsum</Text>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",

        paddingTop: StatusBar.currentHeight,
    },
    ball: {
        width: 100,
        height: 100,
        borderRadius: 100,
        backgroundColor: "blue",
        alignSelf: "center",
    },
});
