import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
const random = (arr) => arr[Math.floor(Math.random() * arr.length)];


/* ---------------------------------------------
   OUTFIT RULES (automatic suggestion by weather)
----------------------------------------------*/
const outfitRules = (slot) => {
  const temp = slot?.main?.temp ?? 15;
  const weather = slot?.weather?.[0]?.main ?? "";

  let jacket = null;
  let pull = null;
  let tshirt = null;
  let pants = null;
  let shoes = null;

  // 🌧 RAIN
  if (weather === "Rain") {
    jacket = random(["j1.png", "j2.png"]);
    pull = random(["p1.png", "p2.png"]);
    pants = random(["pa1.png", "pa2.png", "pa3.png"]);
    shoes = "s1.png"; 
  }

  // ❄ VERY COLD
  else if (temp < 5) {
    jacket = "j3.png";
    pull = random(["p1.png", "p2.png"]);
    pants = random(["pa1.png", "pa2.png", "pa3.png"]);
    shoes = "s1.png";
  }

  // 🧊 COLD
  else if (temp >= 5 && temp < 12) {
    jacket = random(["j1.png", "j2.png"]);
    pull = random(["p1.png", "p2.png"]);
    pants = random(["pa1.png", "pa2.png", "pa3.png"]);
    shoes = random(["s1.png", "s2.png", "s3.png"]);
  }

  // 🌤 MILD WEATHER
  else if (temp >= 12 && temp < 20) {
    pull = random(["p1.png", "p2.png"]);
    pants = random(["pa1.png", "pa2.png", "pa3.png"]);
    shoes = random(["s1.png", "s2.png", "s3.png"]);
  }

  // 🔥 HOT
  else if (temp >= 20) {
    tshirt = random(["t1.png", "t2.png", "t3.png"]);
    pants = random(["pa1.png", "pa2.png", "pa3.png"]);
    shoes = random(["s2.png", "s3.png"]);
  }

  return { jacket, pull, tshirt, pants, shoes };
};

export default function Suggestion() {
  const [data, setData] = useState(null);
  const [searchParams] = useSearchParams();

  const city = searchParams.get("city") || "Jijel";
  const day = searchParams.get("day") || "today";

  const [showJacket, setShowJacket] = useState(true);


  /* ----------------------------
     STATE : CURRENT OUTFIT
  -----------------------------*/
  const [currentOutfit, setCurrentOutfit] = useState({
    jacket: null,
    pull: null,
    tshirt: null,
    pants: null,
    shoes: null,
  });

  /* ----------------------------
     FETCH WEATHER
  -----------------------------*/
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

  /* ----------------------------
     APPLY OUTFIT RULES AUTOMATICALLY
  -----------------------------*/
  useEffect(() => {
    if (slots.length > 0) {
      const outfit = outfitRules(slots[0]);
      setCurrentOutfit(outfit);
    }
  }, [slots]);

  /* ----------------------------
     TIME FORMATTER
  -----------------------------*/
  const fmtHour = (d) => {
    if (d?.dt_txt) return d.dt_txt.slice(11, 16);
    if (d?.dt)
      return new Date(d.dt * 1000).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    return "--:--";
  };

  /* ----------------------------
     DISPLAY DATE (today/tomorrow/after)
  -----------------------------*/
  const getDisplayedDate = () => {
    const today = new Date();

    if (day === "today") return today.toLocaleDateString();

    if (day === "tomorrow") {
      const d = new Date();
      d.setDate(today.getDate() + 1);
      return d.toLocaleDateString();
    }

    if (day === "after") {
      const d = new Date();
      d.setDate(today.getDate() + 2);
      return d.toLocaleDateString();
    }

    return "";
  };

  /* ----------------------------
            RENDER
  -----------------------------*/

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
        gap: "20px",
      }}
    >
      {/* ======================================================
                        LEFT SIDE → OUTFIT
      =======================================================*/}
        <div style={{
          width: "300px",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
        <h2 style={{ marginBottom: "12px" }}>Outfit</h2>

        {/* Jacket */}
        {currentOutfit.jacket && (
          <img
            src={`/${currentOutfit.jacket}`}
            alt="jacket"
            style={{
            width: "220px",
            height: "220px",
            objectFit: "contain",
            marginBottom: "-80px",
            zIndex: 3,
            cursor: "pointer"
          }}
            onClick={() => {
              const jackets = ["j1.png", "j2.png", "j3.png"];
              const next =
                jackets[(jackets.indexOf(currentOutfit.jacket) + 1) % jackets.length];
              setCurrentOutfit({ ...currentOutfit, jacket: next });
            }}
          />
        )}

        {/* Pull */}
        {currentOutfit.pull && (
          <img
            src={`/${currentOutfit.pull}`}
            alt="pull"
            style={{
            width: "280px",
            height: "280px",
            objectFit: "contain",
            marginBottom: "-50px",
            zIndex: 2,
            cursor: "pointer"
          }}
            onClick={() => {
              const pulls = ["p1.png", "p2.png"];
              const next =
                pulls[(pulls.indexOf(currentOutfit.pull) + 1) % pulls.length];
              setCurrentOutfit({ ...currentOutfit, pull: next });
            }}
          />
        )}

        {/* T-shirt */}
        {currentOutfit.tshirt && (
          <img
            src={`/${currentOutfit.tshirt}`}
            alt="tshirt"
            style={{
            width: "280px",
            height: "220px",
            objectFit: "contain",
            marginBottom: "-20px",
            zIndex: 2,
            cursor: "pointer"
          }}
            onClick={() => {
              const tshirts = ["t1.png", "t2.png", "t3.png"];
              const next =
                tshirts[(tshirts.indexOf(currentOutfit.tshirt) + 1) %
                  tshirts.length];
              setCurrentOutfit({ ...currentOutfit, tshirt: next });
            }}
          />
        )}

        {/* Pants */}
        <img
          src={`/${currentOutfit.pants}`}
          alt="pants"
          style={{
          width: "230px",
          height: "230px",
          objectFit: "contain",
          marginBottom: "-70px",
          marginTop: -20,
          zIndex: 1,
          cursor: "pointer"
        }}
          onClick={() => {
            const pants = ["pa1.png", "pa2.png", "pa3.png"];
            const next =
              pants[(pants.indexOf(currentOutfit.pants) + 1) % pants.length];
            setCurrentOutfit({ ...currentOutfit, pants: next });
          }}
        />

        {/* Shoes */}
        <img
          src={`/${currentOutfit.shoes}`}
          alt="shoes"
          style={{
          width: "140px",
          height: "140px",
          objectFit: "contain",
          marginBottom: "10px",
          zIndex: 0,
          cursor: "pointer"
        }}
          onClick={() => {
            const shoes = ["s1.png", "s2.png", "s3.png"];
            const next =
              shoes[(shoes.indexOf(currentOutfit.shoes) + 1) % shoes.length];
            setCurrentOutfit({ ...currentOutfit, shoes: next });
          }}
        />
      </div>

      {/* ======================================================
                      RIGHT SIDE → WEATHER TABLE
      =======================================================*/}
      <div style={{ flex: 1 }}>
        <h1
          style={{
            margin: "0 0 4px",
            textTransform: "uppercase",
            letterSpacing: "2px",
          }}
        >
          Suggestions
        </h1>

        <div style={{ opacity: 0.8, marginBottom: 12 }}>
          City : <b>{city}</b> &nbsp;|&nbsp; Day :{" "}
          <b>
            {day} ({getDisplayedDate()})
          </b>
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
                const meteo =
                  w && w.description
                    ? `${w.main} — ${w.description}`
                    : w?.main || "—";
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
