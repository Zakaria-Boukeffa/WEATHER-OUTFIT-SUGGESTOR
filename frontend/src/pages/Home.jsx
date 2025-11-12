import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const predefinedCities = ["Toulouse", "Paris", "Venice", "Algiers", "Jijel"];
  const [selectedCity, setSelectedCity] = useState("");
  const [customCity, setCustomCity] = useState("");
  const [day, setDay] = useState("today");

  const handleContinue = () => {
    const cityToSend = customCity || selectedCity;
    if (!cityToSend) return alert("Choose a city!");
    navigate(`/suggestion?city=${cityToSend}&day=${day}`);
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        maxWidth: "320px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        textAlign: "center",
        color: "White",
        padding: "20px",
        borderRadius: "10px",
      }}
    >
      <h1
        style={{
          fontSize: "42px",
          textAlign: "center",
          marginBottom: "20px",
          letterSpacing: "2px",
        }}
      >
        OUTFIT-WEATHER PICKER
      </h1>

      <h1>Select a city</h1>

      {predefinedCities.map((city) => (
        <div
          key={city}
          onClick={() => {
            setSelectedCity(city);
            setCustomCity("");
          }}
          style={{
            padding: "8px",
            borderRadius: "6px",
            cursor: "pointer",
            background: selectedCity === city ? "#222" : "#000",
            border: selectedCity === city ? "2px solid var(--ink)" : "1px solid #444",
            color: "var(--ink)",
          }}
        >
          {city}
        </div>
      ))}

      <div
        onClick={() => {
          setSelectedCity("");
        }}
        style={{
          color: "var(--ink)",
          padding: "8px",
          borderRadius: "6px",
          cursor: "pointer",
          border: customCity ? "2px solid var(--ink)" : "1px solid #444",
          background: "#000",
        }}
      >
        Other city:
        <input
          type="text"
          placeholder="Enter a city"
          value={customCity}
          onChange={(e) => {
            setCustomCity(e.target.value);
            setSelectedCity("");
          }}
          style={{
            marginTop: "8px",
            width: "90%",
            padding: "6px",
            fontSize: "14px",
          }}
        />
      </div>

      <h2>Select the date</h2>

      <select
        value={day}
        onChange={(e) => setDay(e.target.value)}
        style={{
          background: "#000",
          color: "var(--ink)",
          border: "1px solid #444",
          padding: "8px",
          fontSize: "14px",
          borderRadius: "6px",
        }}
      >
        <option value="today">Today</option>
        <option value="tomorrow">Tomorrow</option>
        <option value="after">Day after tomorrow</option>
      </select>

      <button
        onClick={handleContinue}
        style={{
          marginTop: "15px",
          padding: "12px",
          fontSize: "16px",
          color: "var(--ink)",
          background: "#000",
          border: "2px solid var(--ink)",
          borderRadius: "6px",
          cursor: "pointer",
          width: "100%",
          transition: "0.2s",
        }}
        onMouseEnter={(e) => {
          e.target.style.background = "#111";
        }}
        onMouseLeave={(e) => {
          e.target.style.background = "#000";
        }}
      >
        Continue
      </button>
    </div>
  );
}
