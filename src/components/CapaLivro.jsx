import { useState } from "react";
import "../styles/CapaLivro.scss";

export default function CapaLivro({ src, alt, altura }) {
  const [carregada, setCarregada] = useState(false);

  return (
    <div 
      className="capa-wrapper" 
      style={altura ? { height: altura } : {}}
    >
      {!carregada && src && (
        <div className="mini-spinner-container">
          <div className="mini-spinner"></div>
        </div>
      )}
      
      {src ? (
        <img
          src={src}
          alt={alt}
          className={`imagem-capa ${carregada ? "visivel" : "escondida"}`}
          onLoad={() => setCarregada(true)}
        />
      ) : (
        <div className="sem-capa">Sem capa</div>
      )}
    </div>
  );
}