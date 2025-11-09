import { useSearchParams } from "react-router-dom";

export default function Suggestion() {
  const [params] = useSearchParams();

  const city = params.get("city");
  const day = params.get("day");

  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        textAlign: "center",
      }}
    >
      <h1>Suggestions pour {city}</h1>
      <p>Prévision sélectionnée : {day}</p>
    </div>
  );
}
