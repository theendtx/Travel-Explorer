import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import type { Country } from "../types/country";
import { getCountryByName } from "../services/countriesApi";

interface CountryPageProps {
  favorites: string[];
  toggleFavorite: (name: string) => void;
}

export function CountryPage({ favorites, toggleFavorite }: CountryPageProps) {
  const { name } = useParams<{ name: string }>(); // URL-ден атауды аламыз

  const [country, setCountry] = useState<Country | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadCountry() {
      try {
        setLoading(true);
        if (!name) return;
        
        console.log("Fetching country:", name); // Тест үшін: URL-дегі есім
        const data = await getCountryByName(name);
        
        if (data && data.length > 0) {
          setCountry(data[0]);
        } else {
          setError("Country not found in API");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load country details");
      } finally {
        setLoading(false);
      }
    }

    loadCountry();
  }, [name]);

  if (loading) return <div style={{ padding: "20px" }}>Loading country details...</div>;
  if (error) return <div style={{ padding: "20px", color: "red" }}>Error: {error}</div>;
  if (!country) return <div style={{ padding: "20px" }}>No data available for this country.</div>;

  const isFavorite = favorites?.includes(country.name.common) || false;

  return (
    <div style={{ padding: "20px", maxWidth: "900px", margin: "0 auto" }}>
      <Link to="/explore" style={{ textDecoration: "none", color: "#1890ff" }}>
        ← Back to Explore
      </Link>

      {/* BLOCK 10 — Country Details UI */}
      <div style={{ 
        marginTop: "20px", 
        display: "grid", 
        gridTemplateColumns: "1fr 1fr", 
        gap: "40px",
        backgroundColor: "#f9f9f9",
        padding: "30px",
        borderRadius: "12px"
      }}>
        
        {/* Сол жақ: Туы (Flag) */}
        <div>
          <img
            src={country.flags.png}
            alt={country.name.common}
            style={{ width: "100%", borderRadius: "8px", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}
          />
        </div>

        {/* Оң жақ: Мәліметтер (Details) */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <h1 style={{ margin: "0 0 20px 0" }}>{country.name.common}</h1>
            <button 
              onClick={() => toggleFavorite(country.name.common)}
              style={{
                padding: "8px 16px",
                cursor: "pointer",
                backgroundColor: isFavorite ? "#ff4d4f" : "#1890ff",
                color: "white",
                border: "none",
                borderRadius: "6px"
              }}
            >
              {isFavorite ? "♥ Favorite" : "♡ Add to Favorites"}
            </button>
          </div>

          <div style={{ lineHeight: "1.8", fontSize: "1.1rem" }}>
            <p><strong>Capital:</strong> {country.capital?.[0] ?? "N/A"}</p>
            <p><strong>Region:</strong> {country.region}</p>
            <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
            <p><strong>Languages:</strong> {country.languages ? Object.values(country.languages).join(", ") : "N/A"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}