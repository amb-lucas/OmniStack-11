import React from "react";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { View, FlatList, Image, Text, TouchableOpacity } from "react-native";

import logoImg from "../../assets/logo.png";

import styles from "./styles";

const Cases = () => {
  const navigation = useNavigation();

  const navigateToDetail = () => {
    navigation.navigate("Details");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <Text>
          Total de <Text style={styles.headerBold}>0 casos</Text>
        </Text>
      </View>
      <Text style={styles.title}>Bem vindo!</Text>
      <Text style={styles.description}>
        Escolha um dos casos abaixo e salve o dia.
      </Text>

      <FlatList
        style={styles.casesList}
        data={[1, 2, 3]}
        keyExtractor={incident => String(incident)}
        showsVerticalScrollIndicator={false}
        renderItem={id => {
          return (
            <View style={styles.cases}>
              <Text style={styles.caseProperty}>CASO</Text>
              <Text style={styles.caseValue}>Doguinha perdida</Text>

              <Text style={styles.caseProperty}>ONG</Text>
              <Text style={styles.caseValue}>Doguinhos do Céu</Text>

              <Text style={styles.caseProperty}>VALOR</Text>
              <Text style={styles.caseValue}>R$ 120,00</Text>

              <TouchableOpacity
                style={styles.detailsButton}
                onPress={navigateToDetail}
              >
                <Text style={styles.buttonText}>Ver mais detalhes</Text>
                <Feather name="arrow-right" size={16} color="#e02041" />
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
};

export default Cases;
