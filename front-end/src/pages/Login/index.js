import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";

import logoImg from "../../assets/logo.svg";
import heroesImg from "../../assets/heroes.png";
import Api from "../../services/api";

import "./styles.css";

const Login = () => {
  const [id, setId] = useState("");

  const history = useHistory();

  if (localStorage.getItem("ongId") !== null) {
    history.push("profile");
  }

  const handleLogin = async e => {
    e.preventDefault();

    try {
      const response = await Api.post("sessions", { id });

      localStorage.setItem("ongId", id);
      localStorage.setItem("ongName", response.data.name);

      history.push("profile");
    } catch (err) {
      alert("Falha no login, tente novamente.");
    }
  };

  return (
    <div className="login-container">
      <section className="form">
        <img src={logoImg} alt="logo" />

        <form onSubmit={handleLogin}>
          <h1>Entre na sua conta</h1>

          <input
            placeholder="Sua ID"
            value={id}
            onChange={({ target }) => setId(target.value)}
          />
          <button className="button" type="submit">
            Entrar
          </button>

          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#E02041" />
            Não tenho cadastro
          </Link>
        </form>
      </section>

      <img src={heroesImg} alt="Heroes" />
    </div>
  );
};

export default Login;
