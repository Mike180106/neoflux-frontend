import { Link } from "react-router";
import arrowIcon from "../../../assets/icons/arrow.svg";
import homeImage from "../../../assets/images/home.png";

export const HomeLanding = () => {
  return (
    <section
      style={{
        width: "100%",
        paddingTop: "120px",
        paddingBottom: "80px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
        zIndex: 1,
      }}
    >
      {/* Contenido principal */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: "1280px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          padding: "0 8px",
          boxSizing: "border-box",
        }}
      >
        {/* Título */}
        <h1
          style={{
            fontFamily: '"Noto Sans", sans-serif',
            fontSize: "64px",
            fontWeight: 800,
            color: "#FFFFFF",
            lineHeight: 1.15,
            margin: "0 0 40px 0",
            width: "100%",
            minHeight: "196px",
            textAlign: "center",
          }}
        >
          Toma el{" "}
          <span style={{ color: "#3250FF" }}>control total</span>
          {" "}de tu futuro financiero
        </h1>

        {/* Botones */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "16px",
            marginBottom: "60px",
          }}
        >
          {/* Empieza ahora */}
          <button
            style={{
              width: "255.5px",
              height: "55px",
              borderRadius: "24px",
              padding: "8px 12px",
              background: "#1D1FDD",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
              fontFamily: '"Noto Sans", sans-serif',
              fontSize: "20px",
              fontWeight: 600,
              color: "#FFFFFF",
              boxSizing: "border-box",
            }}
          >
            Empieza ahora
            <img src={arrowIcon} alt="" style={{ width: "20px", height: "20px" }} />
          </button>

          {/* Conócenos */}
          <Link
            to="#nosotros"
            style={{
              width: "255.5px",
              height: "55px",
              borderRadius: "24px",
              padding: "8px 12px",
              background: "transparent",
              border: "2px solid rgba(255,255,255,0.6)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
              fontFamily: '"Noto Sans", sans-serif',
              fontSize: "20px",
              fontWeight: 600,
              color: "#FFFFFF",
              textDecoration: "none",
              boxSizing: "border-box",
            }}
          >
            Conócenos
          </Link>
        </div>

        {/* Imagen dashboard */}
        <img
          src={homeImage}
          alt="Neoflux Dashboard"
          style={{
            width: "100%",
            maxWidth: "900px",
            height: "auto",
            borderRadius: "16px",
            display: "block",
          }}
        />
      </div>
    </section>
  );
};
