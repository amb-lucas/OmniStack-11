import React from "react";
import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { View, Image, Text, TouchableOpacity, Linking } from "react-native";
import { composeAsync as composeMail } from "expo-mail-composer";

import logoImg from "../../assets/logo.png";

import styles from "./styles";

const Details = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const navigateBack = () => {
    navigation.goBack();
  };

  const {
    title,
    name: ongName,
    value,
    whatsapp,
    email,
    city,
    uf
  } = route.params.caso;

  const message = `Olá ${ongName},\nEstou entrando em contato pois gostaria de ajudar no caso "${title}" com o valor de ${Intl.NumberFormat(
    "pt-BR",
    { style: "currency", currency: "BRL" }
  ).format(value)}`;

  const sendMail = () => {
    composeMail({
      subject: `Herói do Caso: ${title}`,
      recipients: [email],
      body: message
    });
  };

  const sendWhatsapp = () => {
    Linking.openURL(`whatsapp://send?phone=${whatsapp}&text=${message}`);
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
        <Text style={styles.caseProperty}>ONG</Text>
        <Text style={styles.caseValue}>
          {ongName}, {city}-{uf}
        </Text>

        <Text style={styles.caseProperty}>CASO</Text>
        <Text style={styles.caseValue}>{title}</Text>

        <Text style={styles.caseProperty}>VALOR</Text>
        <Text style={[styles.caseValue, { marginBottom: 0 }]}>
          {Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL"
          }).format(value)}
        </Text>
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
};

export default Details;
