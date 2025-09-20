// Sync.jsx
import React, { useState, useRef, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Animated,
  Dimensions,
  Image,
  ImageBackground
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation, useTheme } from "@react-navigation/native";
import BackArrow from "../Components/Icons/BackArrow";
import Spotify from "../../assets/spotify.png"
import ytMusic from "../../assets/ytMusic.png"

const { width, height } = Dimensions.get('window');

const Sync = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const [pressedButton, setPressedButton] = useState(null);
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const buttonScaleSpotify = useRef(new Animated.Value(1)).current;
  const buttonScaleYT = useRef(new Animated.Value(1)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Entry animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();

    // Continuous pulse animation for buttons
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.02,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    );
    pulseAnimation.start();

    return () => pulseAnimation.stop();
  }, []);

  const handleButtonPress = (buttonType, onPress) => {
    const scaleAnim = buttonType === 'spotify' ? buttonScaleSpotify : buttonScaleYT;
    setPressedButton(buttonType);
    
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setPressedButton(null);
      onPress();
    });
  };

const SpotifyIcon = () => (
  <View style={styles.iconContainer}>
    <Image source={Spotify} style={styles.iconImage} resizeMode="contain" />
    
  </View>
);
  const YouTubeIcon = () => (
   <View style={styles.iconContainer}>
    <Image source={ytMusic} style={styles.iconImage} resizeMode="contain" />
  </View>
  );

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 40,
  },
  backButton: {
    marginRight: 20,
  },
  backButtonCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    backdropFilter: 'blur(10px)',
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    color: "#ffffff",
    fontSize: 28,
    fontWeight: "700",
    letterSpacing: -0.5,
  },
  subtitle: {
    color: "#64748b",
    fontSize: 16,
    fontWeight: "500",
    marginTop: -2,
  },
  content: {
    flex: 1,
  },
  quoteContainer: {
    alignItems: 'center',
  },
  quote: {
    color: "#e2e8f0",
    fontSize: 18,
    fontStyle: "italic",
    textAlign: "center",
    lineHeight: 26,
    fontWeight: "300",
  },
  waveContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginBottom: 50,
    gap: 4,
  },
  waveBare: {
    width: 4,
    backgroundColor: '#3b82f6',
    borderRadius: 2,
  },
  buttonsContainer: {
    flex: 1,
    justifyContent: "center",
    gap: 24,
  },
  optionButton: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 12,
  },
  buttonPressed: {
    shadowOpacity: 0.6,
    shadowRadius: 16,
  },
  buttonGradient: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 24,
    paddingHorizontal: 24,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
    iconContainer2: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconImage: {
  width: "100%",
  height: "100%",
  backgroundColor:colors.text,
  borderRadius: 25,
  borderColor:"white",
},
  spotifyIcon: {
    fontSize: 24,
    color: "white",
    fontWeight: "600",
  },
  ytIcon: {
    fontSize: 20,
    color: "white",
    fontWeight: "600",
  },
  buttonTextContainer: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 20,
    color: colors.background,
    fontWeight: "700",
    marginBottom: 2,
  },
  optionSubtitle: {
    fontSize: 14,
    color: colors.background,
    fontWeight: "400",
  },
  arrowContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrow: {
    fontSize: 16,
    color: "white",
    fontWeight: "600",
  },
  particlesContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none',
  },
  particle: {
    position: 'absolute',
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: colors.text,
  },
});

  return (
    <>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={['#0f1419', '#1a2332', '#2d3748']}
        style={styles.background}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <SafeAreaView style={styles.container}>
          {/* Animated Header */}
          <Animated.View 
            style={[
              styles.headerRow,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }]
              }
            ]}
          >
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
              activeOpacity={0.7}
            >
              <View style={styles.backButtonCircle}>
                <BackArrow fill="#ffffff" />
              </View>
            </TouchableOpacity>
            
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Noctune Sync</Text>
            </View>
          </Animated.View>

          {/* Animated Content */}
          <Animated.View
            style={[
              styles.content,
              {
                opacity: fadeAnim,
                transform: [
                  { translateY: slideAnim },
                  { scale: scaleAnim }
                ]
              }
            ]}
          >
            {/* Enhanced Quote Section */}
            <View style={styles.quoteContainer}>
              <Text style={styles.quote}>
                "Bring your music with you migrate playlists seamlessly."
              </Text>
            </View>

            {/* Enhanced Buttons */}
            <View style={styles.buttonsContainer}>
              <Animated.View
                style={{
                  transform: [{ scale: buttonScaleSpotify }]
                }}
              >
                <TouchableOpacity
                  style={[
                    styles.optionButton,
                    styles.spotifyBtn,
                    pressedButton === 'spotify' && styles.buttonPressed
                  ]}
                  onPress={() => handleButtonPress('spotify', () => navigation.navigate("MigratePlaylist"))}
                  activeOpacity={1}
                >
               <ImageBackground
                  source={Spotify}
                  style={styles.bgImage}
                  imageStyle={{ transform: [{ scale: 1.2 }] }} // zoom 1.5x
                  resizeMode="cover"
                >
                  <LinearGradient
                    colors={['#1ED760', '#1DB954', '#169C46']}
                    style={[styles.buttonGradient, { opacity: 0.8 }]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    <SpotifyIcon />
                    <View style={styles.buttonTextContainer}>
                      <Text style={styles.optionTitle}>Spotify</Text>
                      <Text style={styles.optionSubtitle}>Import Playlists</Text>
                    </View>
                    <View style={styles.arrowContainer}>
                      <Text style={styles.arrow}>{">"}</Text>
                    </View>
                  </LinearGradient>
                  </ImageBackground>
                </TouchableOpacity>
              </Animated.View>

              <Animated.View
                style={{
                  transform: [{ scale: buttonScaleYT }]
                }}
              >
                <TouchableOpacity
                  style={[
                    styles.optionButton,
                    styles.ytBtn,
                    pressedButton === 'yt' && styles.buttonPressed
                  ]}
                  onPress={() => handleButtonPress('yt', () => console.log("YT Music pressed"))}
                  activeOpacity={1}
                >
                  <ImageBackground
                  source={ytMusic}
                  style={styles.bgImage}
                  imageStyle={{ transform: [{ scale: 1.1 }] }} // zoom 1.5x
                  resizeMode="cover"
                >
                  <LinearGradient
                    colors={['#FF0000', '#FF0000', '#990000']}
                    style={[styles.buttonGradient, { opacity: 0.8 }]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    <YouTubeIcon />
                    <View style={styles.buttonTextContainer}>
                      <Text style={styles.optionTitle}>YouTube Music</Text>
                      <Text style={styles.optionSubtitle}>Import Playlists</Text>
                    </View>
                    <View style={styles.arrowContainer}>
                      <Text style={styles.arrow}>{">"}</Text>
                    </View>
                  </LinearGradient>
                  </ImageBackground>
                </TouchableOpacity>
              </Animated.View>
            </View>
          </Animated.View>

          {/* Floating particles effect */}
          <View style={styles.particlesContainer}>
            {[...Array(8)].map((_, i) => (
              <Animated.View
                key={i}
                style={[
                  styles.particle,
                  {
                    left: Math.random() * width,
                    top: Math.random() * height,
                    opacity: pulseAnim,
                    transform: [{
                      scale: pulseAnim
                    }]
                  }
                ]}
              />
            ))}
          </View>
        </SafeAreaView>
      </LinearGradient>
    </>
  );
};

export default Sync;