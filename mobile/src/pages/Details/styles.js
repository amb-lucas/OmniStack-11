import { StyleSheet } from "react-native";
import Constants from "expo-constants";

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: Constants.statusBarHeight + 20
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 32
  },

  cases: {
    padding: 24,
    borderRadius: 8,
    backgroundColor: "#fff",
    marginBottom: 16
  },

  caseProperty: {
    fontSize: 14,
    color: "#41414d",
    fontWeight: "bold"
  },

  caseValue: {
    marginTop: 8,
    fontSize: 15,
    marginBottom: 24,
    color: "#737380"
  },

  contactBox: {
    padding: 24,
    borderRadius: 8,
    backgroundColor: "#fff"
  },

  heroTitle: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#13131a",
    lineHeight: 30
  },

  heroDescription: {
    fontSize: 15,
    color: "#737380",
    marginTop: 16
  },

  actions: {
    marginTop: 24,
    flexDirection: "row",
    justifyContent: "space-between"
  },

  action: {
    backgroundColor: "#e02041",
    borderRadius: 8,
    height: 50,
    width: "48%",
    justifyContent: "center",
    alignItems: "center"
  },

  actionText: {
    color: "#FFF",
    fontSize: 15,
    fontWeight: "bold"
  }
});
