import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontSize: 32,
    color: "white",
    marginBottom: 8,
  },
  input: {
    paddingHorizontal: 16,
  },
  input_row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    fontSize: 24,
    color: "white",
  },
  picker: {
    maxWidth: "100%",
    padding: 16,

    fontSize: 24,
    borderRadius: 5,
    fontSize: 8,
    fontFamily: "sans-serif",
    marginBottom: 8,
  },
  text_input: {
    backgroundColor: "#e9edf5",
    padding: 8,
    borderRadius: 5,
  },
  resume_title: {
    fontSize: 24,
    color: "white",
    marginTop: 16,
    marginBottom: 8,
  },
  resume_text: {
    color: "white",
  },
  button_row: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
