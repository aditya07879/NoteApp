import { useState } from "react";
import { useColorScheme } from "react-native";
import { Picker } from "@react-native-picker/picker";
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  Pressable,
  ScrollView,
  Modal,
  TextInput,
  Switch,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import initialNotes, { Note } from "./notes";

const Colors = {
  light: {
    background: "#ffffff",
    card: "#FEF8DD",
    text: "#1a1a1a",
    subtext: "#444",
    date: "#888",
    tag: "#2d6a4f",
    tagBg: "#D4EDDA",
    picker: "#E1F8DC",
    border: "#1a1a1a",
    modal: "#ffffff",
    input: "#f5f5f5",
    inputBorder: "#ccc",
  },
  dark: {
    background: "#121212",
    card: "#1E1E1E",
    text: "#ffffff",
    subtext: "#aaaaaa",
    date: "#777",
    tag: "#81c784",
    tagBg: "#1b3a2a",
    picker: "#1a2e1a",
    border: "#333",
    modal: "#1E1E1E",
    input: "#2a2a2a",
    inputBorder: "#444",
  },
};

export default function Index() {
  const systemTheme = useColorScheme();
  const [isDark, setIsDark] = useState(systemTheme === "dark");
  const C = isDark ? Colors.dark : Colors.light;

  const [selected, setSelected] = useState("All notes");
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [modalVisible, setModalVisible] = useState(false);
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");

  const filteredNotes =
    selected === "All notes"
      ? notes
      : notes.filter((item) => item.tag === selected);

  const handleSave = () => {
    if (!heading || !description || !tag) {
      alert("Sab fields bharo!");
      return;
    }

    const newNote: Note = {
      id: notes.length + 1,
      heading,
      description,
      tag,
      date: new Date().toLocaleDateString(),
    };

    setNotes((prev) => [...prev, newNote]);
    setHeading("");
    setDescription("");
    setTag("");
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: C.background }]}>
      <ScrollView>
        <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

        {/* HEADER */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: C.text }]}>Your Notes</Text>
          <Pressable
            style={styles.addnote}
            onPress={() => setModalVisible(true)}
          >
            <Text style={{ fontSize: 24, fontWeight: "bold" }}>+</Text>
          </Pressable>
        </View>

        {/* MODAL */}
        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={[styles.modalBox, { backgroundColor: C.modal }]}>
              <Text style={[styles.modalTitle, { color: C.text }]}>
                📝 Add Note
              </Text>

              <TextInput
                placeholder="Heading"
                placeholderTextColor="#aaa"
                value={heading}
                onChangeText={setHeading}
                style={[
                  styles.input,
                  { backgroundColor: C.input, color: C.text, borderColor: C.inputBorder },
                ]}
              />
              <TextInput
                placeholder="Description"
                placeholderTextColor="#aaa"
                value={description}
                onChangeText={setDescription}
                style={[
                  styles.input,
                  { height: 100, textAlignVertical: "top", backgroundColor: C.input, color: C.text, borderColor: C.inputBorder },
                ]}
                multiline
              />
              <TextInput
                placeholder="Tag (e.g. React)"
                placeholderTextColor="#aaa"
                value={tag}
                onChangeText={setTag}
                style={[
                  styles.input,
                  { backgroundColor: C.input, color: C.text, borderColor: C.inputBorder },
                ]}
              />

              <Pressable style={styles.saveBtn} onPress={handleSave}>
                <Text style={styles.saveBtnText}>Save Note!</Text>
              </Pressable>

              <Pressable onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelText}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        {/* PICKER + SWITCH */}
        <View style={{ flexDirection: "row", alignItems: "center", marginRight: 12 }}>
          <View
            style={[
              styles.pickerWrapper,
              { backgroundColor: C.picker, borderColor: C.border, flex: 1 },
            ]}
          >
            <Picker
              selectedValue={selected}
              onValueChange={(value) => setSelected(value)}
              style={[styles.picker, { color: C.text }]}
              dropdownIconColor={C.text}
            >
              <Picker.Item label="All" value="All notes" />
              <Picker.Item label="React" value="React" />
              <Picker.Item label="MongoDB" value="MongoDB" />
              <Picker.Item label="Project" value="Project" />
              <Picker.Item label="Backend" value="Backend" />
              <Picker.Item label="DSA" value="DSA" />
              <Picker.Item label="API" value="API" />
              <Picker.Item label="Design" value="Design" />
              <Picker.Item label="OS" value="OS" />
              <Picker.Item label="Express" value="Express" />
            </Picker>
          </View>

          {/* DARK/LIGHT SWITCH */}
          <Switch
            value={isDark}
            onValueChange={(val) => setIsDark(val)}
            thumbColor={isDark ? "#81c784" : "#fff"}
            trackColor={{ false: "#ccc", true: "#2d6a4f" }}
            style={{ marginLeft: 8 }}
          />
        </View>

        {/* NOTES */}
        {filteredNotes.map((item) => (
          <View
            key={item.id}
            style={[styles.card, { backgroundColor: C.card, borderColor: C.border }]}
          >
            <Text style={[styles.heading, { color: C.text }]}>{item.heading}</Text>
            <Text style={[styles.date, { color: C.date }]}>{item.date}</Text>
            <Text style={[styles.description, { color: C.subtext }]} numberOfLines={1}>
              {item.description}
            </Text>
            <View style={[styles.tagWrapper, { backgroundColor: C.tagBg }]}>
              <Text style={[styles.tag, { color: C.tag }]}>#{item.tag}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginTop: 10,
  },
  title: {
    fontSize: 50,
    fontWeight: "bold",
  },
  addnote: {
    backgroundColor: "skyblue",
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 100,
    padding: 20,
  },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    padding: 20,
  },
  modalBox: {
    borderRadius: 20,
    padding: 24,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
  },
  saveBtn: {
    backgroundColor: "skyblue",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  saveBtnText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  cancelText: {
    textAlign: "center",
    color: "red",
    fontSize: 15,
    marginTop: 4,
  },

  // Card
  card: {
    margin: 10,
    padding: 20,
    borderWidth: 1,
    elevation: 2,
    borderRadius: 16,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 10,
  },
  tagWrapper: {
    alignSelf: "flex-start",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  tag: {
    fontSize: 12,
    fontWeight: "600",
  },

  // Picker
  pickerWrapper: {
    margin: 12,
    borderWidth: 1.5,
    borderRadius: 30,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    overflow: "hidden",
  },
  picker: {
    margin: 4,
  },
});