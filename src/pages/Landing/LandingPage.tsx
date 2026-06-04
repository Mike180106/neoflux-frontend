import { Navbar } from "./components/Navbar";
import { HomeLanding } from "./components/HomeLanding";

export const LandingPage = () => {
  return (
    <div style={{ backgroundColor: "#02080F", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          width: "calc(100% - 80px)",
          maxWidth: "1376px",
          minHeight: "892px",
          backgroundColor: "#071521",
          borderRadius: "0 0 32px 32px",
          padding: "0 50px",
          boxSizing: "border-box",
        }}
      >
        {/* Círculo decorativo izquierdo */}
        <div
          style={{
            position: "absolute",
            left: "-120px",
            top: "60px",
            width: "352px",
            height: "352px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #0002B9, #000153)",
            filter: "blur(200px)",
            zIndex: 0,
            pointerEvents: "none",
          }}
        />

        {/* Círculo decorativo inferior derecho */}
        <div
          style={{
            position: "absolute",
            right: "-80px",
            bottom: "-80px",
            width: "352px",
            height: "352px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #0002B9, #000153)",
            filter: "blur(200px)",
            zIndex: 0,
            pointerEvents: "none",
          }}
        />

        <Navbar />
        <HomeLanding />
      </section>
    </div>
  );
};
