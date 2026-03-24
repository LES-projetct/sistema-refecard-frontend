import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Login from "./login/Login";

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <Login />
  </StrictMode>
);
