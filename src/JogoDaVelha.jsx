import React, { useState } from "react";
import "./JogoDaVelha.css";
import video from "./midia/tutorial.mp4";
import imagem from "./midia/exemplo.jpg";

export default function JogoDaVelha() {
  const [quadrados, setQuadrados] = useState(Array(9).fill(null));
  const [xProximo, setXProximo] = useState(true);
  const vencedor = calcularVencedor(quadrados);

  function handleClick(i) {
    if (quadrados[i] || vencedor) return;
    const novo = quadrados.slice();
    novo[i] = xProximo ? "X" : "O";
    setQuadrados(novo);
    setXProximo(!xProximo);
  }

  function reiniciar() {
    setQuadrados(Array(9).fill(null));
    setXProximo(true);
  }

  return (
    <div className="container">
      <div className="jogo">
        <h1>🎮 Jogo da Velha</h1>
        <div className="tabuleiro">
          {quadrados.map((valor, i) => (
            <button key={i} className="quadrado" onClick={() => handleClick(i)}>
              {valor}
            </button>
          ))}
        </div>
        <h2>
          {vencedor
            ? `🏆 Vencedor: ${vencedor}`
            : `Próximo jogador: ${xProximo ? "X" : "O"}`}
        </h2>
        <button className="reiniciar" onClick={reiniciar}>
          Reiniciar
        </button>
      </div>

      <div className="instrucoes">
        <h2> Como jogar</h2>
        <video width="200" controls>
          <source src={video} type="video/mp4" />
          Seu navegador não suporta vídeos.
        </video>

        <h2> Exemplo</h2>
        <img src={imagem} alt="Exemplo do jogo" width="250" />
      </div>
    </div>
  );
}

function calcularVencedor(q) {
  const linhas = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (const [a, b, c] of linhas) {
    if (q[a] && q[a] === q[b] && q[a] === q[c]) return q[a];
  }
  return null;
}
