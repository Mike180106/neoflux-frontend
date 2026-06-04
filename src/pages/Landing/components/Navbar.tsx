import { useEffect, useState } from "react";
import { Link } from "react-router";
import logo from "../../../assets/images/logo.png";

type Section = "inicio" | "nosotros" | "faq";

export const Navbar = () => {
  const [activeSection, setActiveSection] = useState<Section>("inicio");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 100) setActiveSection("inicio");
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    const sectionIds: Exclude<Section, "inicio">[] = ["nosotros", "faq"];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.5 },
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observers.forEach((o) => o.disconnect());
    };
  }, []);

  const navButtonStyle = (section: Section): React.CSSProperties => ({
    fontFamily: '"Noto Sans", sans-serif',
    fontSize: "16px",
    fontWeight: activeSection === section ? 600 : 400,
    color: activeSection === section ? "#FFFFFF" : "rgba(255, 255, 255, 0.6)",
    lineHeight: 1,
    letterSpacing: 0,
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "8px 12px",
  });

  const inactiveTextStyle: React.CSSProperties = {
    fontFamily: '"Noto Sans", sans-serif',
    fontSize: "16px",
    fontWeight: 400,
    color: "rgba(255, 255, 255, 0.6)",
    lineHeight: 1,
    letterSpacing: 0,
    textDecoration: "none",
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: "12px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "min(1280px, calc(100% - 32px))",
        height: "57px",
        borderRadius: "36px",
        background: "rgba(161, 161, 161, 0.2)",
        backdropFilter: "blur(12px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 32px",
        gap: "8px",
        zIndex: 50,
        boxSizing: "border-box",
      }}
    >
      {/* Logo */}
      <img
        src={logo}
        alt="Neoflux"
        style={{ width: "128.3px", height: "41px", objectFit: "contain" }}
      />

      {/* Nav links */}
      <div style={{ display: "flex", alignItems: "center", gap: "110px" }}>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={navButtonStyle("inicio")}
        >
          Inicio
        </button>
        <button
          onClick={() =>
            document
              .getElementById("nosotros")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          style={navButtonStyle("nosotros")}
        >
          Nosotros
        </button>
        <button
          onClick={() =>
            document
              .getElementById("faq")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          style={navButtonStyle("faq")}
        >
          FAQ
        </button>
      </div>

      {/* Auth buttons */}
      <div style={{ display: "flex", alignItems: "center", gap: "36px" }}>
        <Link
          to="/login"
          style={{
            width: "160px",
            height: "38px",
            borderRadius: "24px",
            padding: "8px 12px",
            background: "linear-gradient(to right, #1D1FDD, #59B2FF)",
            fontFamily: '"Noto Sans", sans-serif',
            fontSize: "16px",
            fontWeight: 600,
            color: "#FFFFFF",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxSizing: "border-box",
          }}
        >
          Iniciar sesión
        </Link>

        <Link to="/register" style={inactiveTextStyle}>
          Registrarse
        </Link>
      </div>
    </nav>
  );
};
