import React, { useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  Modal,
  TextInput,
  Switch,
} from "react-native";
import BackArrow from "../Components/BackArrow";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";
import { addMusicinPlaylist } from "../../Store/PlaylistSlice";
import { LinearGradient } from "expo-linear-gradient";
import icon from "../../assets/icon.png";
import { addPlaylist } from "../../Store/PlaylistSlice";
import { useTheme } from "@react-navigation/native";
import { AddNewPlaylist } from "../../Store/PlaylistSlice";
const PlaylistChoose = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { index, song } = route.params;
  const dispatch = useDispatch();
  const { data, id } = useSelector((state) => state.playlist);
  const { data: value, pos } = useSelector((state) => state.data);

  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPlaylistaddVisible, setisPlaylistaddVisible] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);
  const [playlistName, setPlaylistName] = useState("");
  const [description, setDescription] = useState("");
  const { colors } = useTheme();
  const handlePress = () => {
    toggleModal();
    togglePlaylistadd();
  };
  const handlePlaylist = () => {
    togglePlaylistadd();
    const playlist = {
      id: id + 1,
      image: null,
      name: playlistName,
      desc: description,
      songs: [],
      Time: 0,
      isPlaying: false
    }
    dispatch(addPlaylist({ playlist: playlist }));
    dispatch(AddNewPlaylist({ data: playlist }))
    setDescription("");
    setPlaylistName("");
  };
  const toggleModal = () => {
    setIsModalVisible((prev) => !prev);
  };
  const togglePlaylistadd = () => {
    setisPlaylistaddVisible((prev) => !prev);
  };
  const styles = StyleSheet.create({
    modalOverlay: {
      flex: 1,
      justifyContent: "flex-end",
      backgroundColor: "rgba(85, 85, 85, 0.85)", // backdrop blur
    },
    Main: { flex: 1, width: "100%" },
    Header: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    HeaderInside: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    HeaderInsideText: {
      width: "68%",
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
    },
    body: {
      width: "100%",
      height: "auto",
      paddingTop: 80,
      flexDirection: "column",
    },
    Playinfo: {
      width: "100%",
      height: 80,
      flexDirection: "row",
      alignItems: "center",
      paddingRight: 30,
    },
    ImageContainer: {
      width: 60,
      height: 60,
      justifyContent: "center",
      alignItems: "center",
    },
    Name: {
      flex: 1,
      height: "100%",
      justifyContent: "center",
      paddingLeft: 25,
    },
    circle: {
      width: 24,
      height: 24,
      borderRadius: 12,
      borderWidth: 2,
      borderColor: "#1DB954",
      justifyContent: "center",
      alignItems: "center",
    },
    tick: {
      color: "white",
      fontSize: 16,
      fontWeight: "bold",
    },
    switchContainer: {
      width: "100%",
      height: 30,
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "space-around",
    },
    ButtonContainer: {
      width: "100%",
      height: 60,
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "center",
      //backgroundColor:"white"
    },
    input: {
      width: "100%",
      color: "white",
      borderWidth: 1,
      padding: 10,
      backgroundColor: "gray",
      borderRadius: 8,
    },
    Button: {
      color: "white",
      width: 120,
      height: 40,
      backgroundColor: "green",
      borderRadius: 20,
      justifyContent: "center",
      alignItems: "center",
    },
    PlaylistModal: {
      height: 350,
      backgroundColor: colors.text,
      borderRadius: 20,
      padding: 25,
      backgroundColor: "rgba(0,0,0,1)",
      gap: 15,
      width: "80%",
    },
    playlistMain: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      //backgroundColor: "rgba(98, 92, 92, 0.)", // backdrop blur
    },
  });

  return (
    <LinearGradient
      colors={["#141414", "#1c2c32"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      <ScrollView
        style={styles.Main}
        contentContainerStyle={{
          alignItems: "center",
          paddingBottom: 100,
          paddingHorizontal: 20,
          paddingTop: 30,
        }}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.Header}>
          <View style={styles.HeaderInside}>
            <TouchableOpacity
              style={{ width: "32%" }}
              onPress={() => navigation.goBack()}
            >
              <BackArrow />
            </TouchableOpacity>
            <View style={styles.HeaderInsideText}>
              <Text style={{ fontSize: 20, color: "white" }}>
                Add to playlist
              </Text>
            </View>
          </View>
        </View>

        {/* Selected song info */}
        {(song || index) && (
          <View
            style={{
              width: "100%",
              height: 60,
              alignItems: "center",
              flexDirection: "row",
              marginTop: 20,
              borderRadius: 10,
              backgroundColor: "rgba(50,50,50,0.5)",
              paddingHorizontal: 15,
            }}
          >
            <Image
              source={{ uri: song?.image || index?.image }}
              style={{ width: 40, height: 40, borderRadius: 8 }}
            />
            <View style={{ flex: 1, paddingLeft: 15 }}>
              <Text
                style={{ fontSize: 16, color: "white", fontWeight: "bold" }}
                numberOfLines={1}
              >
                {song?.title || index?.title}
              </Text>
              <Text style={{ fontSize: 12, color: "gray" }} numberOfLines={1}>
                {song?.artist || index?.uploader}
              </Text>
            </View>
          </View>
        )}

        {/* New Playlist Button */}
        <TouchableOpacity
          style={{
            marginTop: 20,
            backgroundColor: "#1DB954",
            paddingVertical: 10,
            paddingHorizontal: 25,
            borderRadius: 10,
            alignSelf: "center",
          }}
          onPress={() => { }}
        >
          <Text
            style={{ color: "white", fontSize: 16, fontWeight: "bold" }}
            onPress={() => handlePress()}
          >
            + New Playlist
          </Text>
        </TouchableOpacity>
        <Playlistadd
          isPlaylistaddVisible={isPlaylistaddVisible}
          togglePlaylistadd={togglePlaylistadd}
          styles={styles}
          isPrivate={isPrivate}
          setIsPrivate={setIsPrivate}
          handlePlaylist={handlePlaylist}
          description={description}
          setDescription={setDescription}
          setPlaylistName={setPlaylistName}
          playlistName={playlistName}
        />

        {/* Playlist List */}
        <View style={styles.body}>
          <FlatList
            data={data}
            renderItem={({ item, index }) => (
              <DisplayPlaylist
                item={item}
                index={index}
                styles={styles}
                dispatch={dispatch}
                navigation={navigation}
                data={value}
                pos={pos}
                songToAdd={song}
                selectedIndex={selectedIndex}
                setSelectedIndex={setSelectedIndex}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
      <TouchableOpacity
        style={{
          margin: 20,
          backgroundColor: "#2c3a2f",
          paddingVertical: 10,
          paddingHorizontal: 25,
          borderRadius: 10,
          alignSelf: "center",
        }}
        onPress={() => { }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          Done
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default PlaylistChoose;

// Playlist item
const DisplayPlaylist = ({
  item,
  index,
  styles,
  dispatch,
  navigation,
  data,
  pos,
  songToAdd,
  selectedIndex,
  setSelectedIndex,
}) => {
  const isSelected = selectedIndex === index;
  const [selected, setSelected] = useState(false);
  const handleSelect = () => {
    setSelectedIndex(index);
    const musicToAdd = songToAdd || data[pos];
    dispatch(addMusicinPlaylist({ id: index, music: musicToAdd }));
    navigation.goBack();
  };

  return (
    <TouchableHighlight
      onPress={handleSelect}
      style={{ borderRadius: 3 }}
      underlayColor="rgba(245,222,179,0.2)"
      activeOpacity={0.7}
    >
      <View
        style={[
          styles.Playinfo,
          { justifyContent: "space-between", paddingHorizontal: 10 },
        ]}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={styles.ImageContainer}>
            <Image
              source={item.image ? { uri: item.image } : icon}
              style={{ width: 50, height: 50 }}
            />
          </View>
          <View style={styles.Name}>
            <Text style={{ fontSize: 20, color: "white" }}>{item.name}</Text>
            <Text style={{ fontSize: 15, color: "white" }}>
              Playlist . Noctune
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => setSelected(!selected)}
          activeOpacity={0.7}
          style={{
            position: "absolute",
            right: 10,
            top: "40%",
            justifyContent: "center",
            alignItems: "center",
            padding: 10, // Increases the touchable area
            borderRadius: 25, // Makes it easier to tap around the icon
            backgroundColor: "rgba(255, 255, 255, 0.2)", // Optional background to make it more noticeable
          }}
          accessibilityLabel={
            selected ? "Deselect playlist" : "Select playlist"
          }
          accessibilityHint="Double-tap to select or deselect this playlist"
        >
          <View
            style={[
              styles.circle,
              {
                backgroundColor: selected ? "#1DB954" : "transparent",
                borderColor: selected ? "#1DB954" : "white",
              },
            ]}
          >
            {selected && <Text style={styles.tick}>✓</Text>}
          </View>
        </TouchableOpacity>
      </View>
    </TouchableHighlight>
  );
};

const Playlistadd = ({
  isPlaylistaddVisible,
  togglePlaylistadd,
  styles,
  isPrivate,
  setIsPrivate,
  handlePlaylist,
  playlistName,
  setPlaylistName,
  description,
  setDescription,
}) => {
  return (
    <Modal
      transparent
      visible={isPlaylistaddVisible}
      animationType="slide"
      onRequestClose={() => togglePlaylistadd()}
    >
      {" "}
      <View style={styles.modalOverlay}>
        <View style={styles.playlistMain}>
          <View style={styles.PlaylistModal}>
            <Text style={{ fontSize: 20, color: "white" }}>
              Create Playlist
            </Text>
            <TextInput
              placeholder="Playlist Name"
              value={playlistName}
              onChangeText={setPlaylistName}
              placeholderTextColor="white"
              style={styles.input}
            />

            <TextInput
              placeholder="Description (optional)"
              value={description}
              onChangeText={setDescription}
              placeholderTextColor="white"
              style={[styles.input, { height: 100 }]}
            />

            <View style={styles.switchContainer}>
              <Text style={{ color: "white" }}>Private</Text>
              <Switch
                value={isPrivate}
                onValueChange={setIsPrivate}
                trackColor={{ false: "#767577", true: "wheat" }}
                thumbColor={!isPrivate ? "white" : "wheat"}
              />
            </View>
            <View style={styles.ButtonContainer}>
              <TouchableOpacity
                style={styles.Button}
                onPress={() => handlePlaylist()}
              >
                <Text style={{ color: "white" }}>Drop the Beat</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};
