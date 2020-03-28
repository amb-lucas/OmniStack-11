import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiPower, FiTrash2 } from "react-icons/fi";

import logoImg from "../../assets/logo.svg";
import Api from "../../services/api";

import "./styles.css";

const Profile = () => {
  const ongId = localStorage.getItem("ongId");
  const ongName = localStorage.getItem("ongName");

  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Api.get("profile", {
      headers: {
        Authorization: ongId
      }
    }).then(response => {
      setCases(response.data);
      setLoading(false);
    });
  }, [ongId]);

  const handleDelete = async id => {
    try {
      await Api.delete(`cases/${id}`, {
        headers: {
          Authorization: ongId
        }
      });

      setCases(cases.filter(caso => caso.id !== id));
    } catch (err) {
      alert("Erro ao deletar caso, tente novamente.");
    }
  };

  const history = useHistory();
  const handleLogout = () => {
    localStorage.clear();
    history.push("/");
  };

  const emptyContent = !loading && cases.length === 0;

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be the Hero" />
        <span>Olá, {ongName}</span>

        <Link className="button" to="/cases/new">
          Cadastrar novo caso
        </Link>

        <button type="button" onClick={handleLogout}>
          <FiPower size={18} color="#e02041" />
        </button>
      </header>

      <h1>Casos Cadastrados</h1>

      <ul>
        {cases.map(caso => {
          return (
            <li key={caso.id}>
              <h2>{caso.title}</h2>
              <p>{caso.description}</p>
              <strong>VALOR</strong>
              <p>
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL"
                }).format(caso.value)}
              </p>

              <button type="button" onClick={() => handleDelete(caso.id)}>
                <FiTrash2 size={20} color="#a8a8b3" />
              </button>
            </li>
          );
        })}
      </ul>

      {emptyContent && (
        <div className="empty-cases">
          <h2>Nenhum caso encontrado!</h2>
          <Link className="button " to="/cases/new">
            Cadastre seu primeiro caso
          </Link>
        </div>
      )}
    </div>
  );
};

export default Profile;
