import React from "react";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { View, Image, Text, TouchableOpacity, Linking } from "react-native";
import { composeAsync as composeMail } from "expo-mail-composer";

import logoImg from "../../assets/logo.png";

import styles from "./styles";

function Details() {
  const navigation = useNavigation();
  const navigateBack = () => {
    navigation.goBack();
  };

  const message =
    'Olá APAD,\n\n Estou entrando em contato pois gostaria de ajudar no caso "Cadelinha atropelada" com o valor de R$ 120,00';

  const sendMail = () => {
    composeMail({
      subject: "Herói do Caso: Cadelinha atropelada",
      recipients: ["thexzguy@yahoo.com"],
      body: message
    });
  };

  const sendWhatsapp = () => {
    Linking.openURL(`whatsapp://send?phone=5581994998360&text=${message}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />

        <TouchableOpacity onPress={navigateBack}>
          <Feather name="arrow-left" size={28} color="#E02041" />
        </TouchableOpacity>
      </View>

      <View style={styles.cases}>
        <Text style={styles.caseProperty}>CASO</Text>
        <Text style={styles.caseValue}>Doguinha perdida</Text>

        <Text style={styles.caseProperty}>ONG</Text>
        <Text style={styles.caseValue}>Doguinhos do Céu</Text>

        <Text style={styles.caseProperty}>VALOR</Text>
        <Text style={[styles.caseValue, { marginBottom: 0 }]}>R$ 120,00</Text>
      </View>

      <View style={styles.contactBox}>
        <Text style={styles.heroTitle}>Salve o dia!</Text>
        <Text style={styles.heroTitle}>Seja o herói desse caso.</Text>

        <Text style={styles.heroDescription}>Entre em contato</Text>
        <View style={styles.actions}>
          <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
            <Text style={styles.actionText}>Whatsapp</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.action} onPress={sendMail}>
            <Text style={styles.actionText}>Email</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default Details;
