import React, { useRef, useEffect } from "react";
import { Text, Animated } from "react-native";
import { StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";


const WaveformLoader = () => {
  const NUMBER_OF_BARS = 20;
  const animations = useRef(
    [...Array(NUMBER_OF_BARS)].map(() => new Animated.Value(20))
  ).current;

  useEffect(() => {
    animations.forEach((anim, i) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(anim, {
            toValue: 60,
            duration: 1000,
            delay: i * 100,
            useNativeDriver: false,
          }),
          Animated.timing(anim, {
            toValue: 20,
            duration: 400,
            useNativeDriver: false,
          }),
        ])
      ).start();
    });
  }, []);

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "flex-end",
      justifyContent: "center",
      height: 100,
      paddingHorizontal: 10,
    },
    bar: {
      width: 6,
      marginHorizontal: 3,
      borderRadius: 3,
      backgroundColor: "transparent", // no solid color
    },
  });

  return (
    <View
      style={[
        styles.container,
        { transform: [{ rotate: "180deg" }, { scaleX: -1 }] },
      ]}
    >
      {animations.map((anim, index) => (
        <MaskedView
          key={index}
          maskElement={
            <Animated.View
              style={[
                styles.bar,
                {
                  height: anim,
                  backgroundColor: "black", // mask color (any solid)
                },
              ]}
            />
          }
        >
          <LinearGradient
            colors={["purple", "beige", "wheat"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={{
              height: 100,
              width: 6,
              marginHorizontal: 3,
              borderRadius: 3,
            }}
          />
        </MaskedView>
      ))}
    </View>
  );
};
const Waveform = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={{ opacity: fadeAnim }}>
      <MaskedView
        maskElement={
          <Text
            style={{
              fontSize: 50,
              fontWeight: "bold",
              textAlign: "center",
              color: "black", // This color won't show; it's just for masking
            }}
          >
            𝙉𝙤𝙘𝙩𝙪𝙣𝙚
          </Text>
        }
      >
        <LinearGradient
          colors={["wheat", "white", "purple"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            height: 60, // make sure it's tall enough to fully cover the text
            alignItems: "center",
            marginBottom: 30,
          }}
        />
      </MaskedView>
      <Text
        style={{
          color: "wheat",
          paddingHorizontal: 20,
          fontSize: 28,
          textAlign: "center",
        }}
      >
        𝙂𝙚𝙩𝙩𝙞𝙣𝙜 𝙇𝙤𝙨𝙩 𝙞𝙣 𝙀𝙫𝙚𝙧𝙮 𝙉𝙤𝙩𝙚
      </Text>
      <Text
        style={{ textAlign: "center", alignItems: "center", paddingTop: 160 }}
      >
        <WaveformLoader />
      </Text>
      <Text
        style={{
          color: "beige",
          padding: 20,
          fontSize: 18,
          textAlign: "center",
        }}
      >
        "𝚆𝚑𝚎𝚗 𝚠𝚘𝚛𝚍𝚜 𝚏𝚊𝚒𝚕, 𝚖𝚞𝚜𝚒𝚌 𝚏𝚒𝚗𝚍𝚜 𝚢𝚘𝚞... "
      </Text>
    </Animated.View>
  );
};

export default Waveform;
