// src/components/Loader.jsx
import { useSelector } from "react-redux";
import { PacmanLoader } from "react-spinners";

export default function Loader() {
  const { load, msg } = useSelector((state) => state.loaderReducer);

  if (!load) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 9999,
        width: "100%",
        height: "100vh",
        backgroundColor: "rgba(255,255,255,0.8)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <PacmanLoader color="#f6b93b" size={35} />
      <div
        style={{
          marginTop: 20,
          fontWeight: "bold",
          color: "#e58e26",
          fontSize: "1.2rem",
        }}
      >
        {msg}
      </div>
    </div>
  );
}
