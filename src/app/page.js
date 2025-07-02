"use client";

import { useEffect, useState } from "react";
import getCurrentWeather from "@/utils/currentweather";
import { Plus, Search } from "lucide-react";
import ForeCastCard from "@/app/components/ForeCastCard";

export default function Home() {
  /* ────────────────────────────────
     ︎ STATE
  ──────────────────────────────── */
  const [currentWeather, setCurrentWeather] = useState(null);
  const [query, setQuery] = useState("");
  const [savedCities, setSavedCities] = useState([]);

  const LS_KEY = "WeatherPro:SavedCities";

  /* ────────────────────────────────
     ︎ SIDE EFFECTS
  ──────────────────────────────── */
  // Load default city on mount
  useEffect(() => {
    getCurrentWeather("Delhi, India")
      .then(setCurrentWeather)
      .catch(console.error);
  }, []);

  // Debug: watch savedCities updates
  useEffect(() => {
    console.log("✅ savedCities:", savedCities);
  }, [savedCities]);

  //localstorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        setSavedCities(parsed);
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(savedCities));
  }, [savedCities]);

  /* ────────────────────────────────
     ︎ HANDLERS
  ──────────────────────────────── */
  const handleSearch = (e) => {
    e.preventDefault();
    const city = query.trim();
    if (!city) return;
    getCurrentWeather(city).then(setCurrentWeather).catch(console.error);
    setQuery("");
  };

  const handleBookmark = () => {
    const cityName = currentWeather?.location?.name;
    if (!cityName || savedCities.includes(cityName)) return;
    setSavedCities((prev) => [...prev, cityName]);
  };

  const handleDelete = (city) => {
    setSavedCities((prev) => prev.filter((c) => c !== city));
  };
  /* ────────────────────────────────
     ︎ JSX
  ──────────────────────────────── */
  return (
    <main className="min-h-screen flex flex-col items-center justify-start py-10 px-4 bg-gradient-to-b from-cyan-600 to-blue-700 text-white">
      {/* ——— Search Bar ——— */}
      <form
        onSubmit={handleSearch}
        className="relative flex w-full max-w-md items-center gap-2 mb-8"
      >
        {/* optional search icon */}
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70 pointer-events-none"
        />
        <input
          aria-label="Search city"
          type="text"
          placeholder="Search for a city"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 pl-9 pr-4 py-2 rounded-lg text-black placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-white/70"
        />
        <button
          type="submit"
          className="bg-white text-blue-600 font-semibold px-4 py-2 rounded-lg hover:scale-105 transition shadow-sm"
          disabled={!query.trim()}
        >
          Search
        </button>
      </form>

      {/* ——— Current Weather Card ——— */}
      <section className="relative w-80 h-96 bg-white/10 backdrop-blur-sm border border-white/30 rounded-2xl flex flex-col items-center justify-center shadow-lg space-y-2">
        <h1 className="text-3xl font-bold">Weather Pro</h1>
        <h2 className="text-xl font-semibold">
          {currentWeather?.location?.name || "—"}
        </h2>
        <p className="text-4xl font-medium">
          {currentWeather?.current?.temp_c ?? "--"}°
        </p>
        <p className="text-lg">
          {currentWeather?.current?.condition?.text || ""}
        </p>
        {currentWeather?.current?.condition?.icon && (
          <img
            src={`https:${currentWeather.current.condition.icon}`}
            alt="weather icon"
            className="w-14 h-14"
          />
        )}

        {/* bookmark button */}
        <button
          type="button"
          onClick={handleBookmark}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white text-blue-600 flex items-center justify-center hover:rotate-90 hover:scale-110 transition"
          title="Save city"
        >
          <Plus size={16} />
        </button>
      </section>
      <ForeCastCard city={currentWeather?.location?.name || "Delhi, India"} />
      {/* ——— Saved Cities ——— */}
      {savedCities.length > 0 && (
        <>
          <h2 className="text-xl font-semibold mt-10">Saved Cities</h2>
          <div className="w-full max-w-5xl mt-4 px-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {savedCities.map((city) => (
                <div
                  key={city}
                  className="bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl flex flex-col items-center justify-center text-center p-6 shadow-md space-y-3"
                >
                  <h3 className="text-lg font-bold">{city}</h3>
                  <button
                    onClick={() =>
                      getCurrentWeather(city)
                        .then(setCurrentWeather)
                        .catch(console.error)
                    }
                    className="bg-white text-blue-600 px-3 py-1 rounded hover:scale-105 transition"
                  >
                    Load Weather
                  </button>
                  <button
                    onClick={() => handleDelete(city)}
                    className="bg-white text-red-600 px-3 py-1 rounded hover:scale-105 transition"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </main>
  );
}
