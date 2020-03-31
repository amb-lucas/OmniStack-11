import React, { useState, useEffect } from "react";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { View, FlatList, Image, Text, TouchableOpacity } from "react-native";

import Api from "../../services/api";
import logoImg from "../../assets/logo.png";

import styles from "./styles";

const Cases = () => {
  const navigation = useNavigation();
  const navigateToDetail = caso => {
    navigation.navigate("Details", { caso });
  };

  const [cases, setCases] = useState([]);
  const [total, setTotal] = useState(0);

  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const loadCases = async () => {
    if (loading) return;

    if (page === 0 || cases.length < total) {
      setLoading(true);

      const response = await Api.get("cases", {
        params: { page: page + 1 }
      });

      setLoading(false);
      setPage(page + 1);

      setCases([...cases, ...response.data]);
      setTotal(response.headers["x-total-count"]);
    }
  };

  useEffect(() => {
    loadCases();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <Text>
          Total de <Text style={styles.headerBold}>{total} casos</Text>
        </Text>
      </View>
      <Text style={styles.title}>Bem vindo!</Text>
      <Text style={styles.description}>
        Escolha um dos casos abaixo e salve o dia.
      </Text>

      <FlatList
        style={styles.casesList}
        data={cases}
        onEndReached={loadCases}
        onEndReachedThreshold={0.2}
        keyExtractor={caso => String(caso.id)}
        showsVerticalScrollIndicator={false}
        renderItem={({ item: caso }) => {
          const { title, name, value } = caso;

          return (
            <View style={styles.cases}>
              <Text style={styles.caseProperty}>CASO</Text>
              <Text style={styles.caseValue}>{title}</Text>

              <Text style={styles.caseProperty}>ONG</Text>
              <Text style={styles.caseValue}>{name}</Text>

              <Text style={styles.caseProperty}>VALOR</Text>
              <Text style={styles.caseValue}>
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL"
                }).format(value)}
              </Text>

              <TouchableOpacity
                style={styles.detailsButton}
                onPress={() => navigateToDetail(caso)}
              >
                <Text style={styles.buttonText}>Ver mais detalhes</Text>
                <Feather name="arrow-right" size={20} color="#e02041" />
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
};

export default Cases;
