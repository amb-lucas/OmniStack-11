import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import logoImg from "../../assets/logo.svg";
import Api from "../../services/api";

import "./styles.css";

const NewCase = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");

  const history = useHistory();

  const ongId = localStorage.getItem("ongId");
  const handleNewCase = async e => {
    e.preventDefault();

    const data = {
      title,
      description,
      value
    };

    try {
      await Api.post("cases", data, {
        headers: {
          Authorization: ongId
        }
      });
      alert("Caso cadastrado com sucesso!");

      history.push("/profile");
    } catch (err) {
      alert("Erro no cadastro. Tente novamente.");
    }
  };

  return (
    <div className="new-case-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />

          <h1>Cadastrar novo caso</h1>
          <p>Descreva o caso detalhadamente para encontrar um herói.</p>

          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar para Início
          </Link>
        </section>

        <form onSubmit={handleNewCase}>
          <input
            placeholder="Título do Caso"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
          <textarea
            placeholder="Descrição"
            value={description}
            onChange={({ target }) => setDescription(target.value)}
          />
          <input
            placeholder="Valor em reais"
            value={value}
            onChange={({ target }) => setValue(target.value)}
          />

          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewCase;
