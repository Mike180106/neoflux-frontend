import { StrictMode } from "react";
import "./index.css";
import { createRoot } from "react-dom/client";
import { NeofluxApp } from "./NeofluxApp";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <NeofluxApp />
  </StrictMode>,
);
