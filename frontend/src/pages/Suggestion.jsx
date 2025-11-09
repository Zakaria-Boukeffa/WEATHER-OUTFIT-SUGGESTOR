import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function Suggestion() {
  const [data, setData] = useState(null);
  const [searchParams] = useSearchParams();

  const city = searchParams.get("city") || "Jijel";
  const day = searchParams.get("day") || "today";

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/weather/${city}`)
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error("Erreur fetch :", err));
  }, [city]);


  const slots =
    data?.forecast && data.forecast[day] && Array.isArray(data.forecast[day])
      ? data.forecast[day]
      : [];

  const fmtHour = (d) => {

    if (d?.dt_txt) return d.dt_txt.slice(11, 16);
    if (d?.dt) return new Date(d.dt * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    return "--:--";
    };

return (
  <div
    style={{
      maxWidth: "900px",
      margin: "40px auto",
      color: "var(--ink)",
      fontFamily: "monospace",
      padding: "16px",
      border: "1px solid #333",
      borderRadius: "8px",
      background: "rgba(0,0,0,0.6)",
      boxShadow: "0 0 0 2px #111 inset",
      display: "flex",
      gap: "20px"
    }}
  >

    <div style={{ width: "250px", textAlign: "center" }}>
      <h2 style={{ marginBottom: "12px" }}>Outfit</h2>

      <img
        src="/s1.png"
        alt="outfit"
        style={{ width: "200px", borderRadius: "12px" }}
      />
    </div>


    <div style={{ flex: 1 }}>
      <h1 style={{ margin: "0 0 4px", textTransform: "uppercase", letterSpacing: "2px" }}>
        Suggestions
      </h1>

      <div style={{ opacity: 0.8, marginBottom: 12 }}>
        City : <b>{city}</b> &nbsp;|&nbsp; Day : <b>{day}</b>
      </div>

      {!data ? (
        <p>Loading...</p>
      ) : slots.length === 0 ? (
        <p>No weather data available.</p>
      ) : (
        <div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "80px 110px 1fr 110px",
              gap: "8px",
              padding: "10px 12px",
              border: "1px solid #2a2a2a",
              borderRadius: "6px",
              background: "rgba(255,255,255,0.02)",
              marginBottom: "6px",
              fontWeight: 700,
            }}
          >
            <div>Time</div>
            <div>Temp (°C)</div>
            <div>Weather</div>
            <div>Wind (m/s)</div>
          </div>


          <div
            style={{
              maxHeight: "65vh",
              overflow: "auto",
              border: "1px solid #2a2a2a",
              borderRadius: "6px",
            }}
          >
            {slots.map((s, i) => {
              const temp = s?.main?.temp ?? "—";
              const w = s?.weather?.[0];
              const meteo = w ? `${w.main}${w.description ? " — " + w.description : ""}` : "—";
              const wind = s?.wind?.speed ?? "—";

              return (
                <div
                  key={s.dt ?? i}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "80px 110px 1fr 110px",
                    gap: "8px",
                    padding: "10px 12px",
                    borderBottom: "1px dashed #2a2a2a",
                    alignItems: "center",
                  }}
                >
                  <div style={{ opacity: 0.9 }}>{fmtHour(s)}</div>
                  <div>{typeof temp === "number" ? temp.toFixed(1) : temp}</div>
                  <div style={{ opacity: 0.9 }}>{meteo}</div>
                  <div>{typeof wind === "number" ? wind.toFixed(1) : wind}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  </div>
);

}
