import { useState } from "react";
import Navbar from "../components/Navbar";
import SearchHero from "../components/SearchHero";
import PropertyTools from "../components/PropertyTools";
import PopularLocations from "../components/PopularLocations";
import PropertyAlert from "../components/PropertyAlert";
import Footer from "../components/Footer";

function Home() {
  const [searchType, setSearchType] = useState("Buy");
  const [searchText, setSearchText] = useState("");
  const [searchMessage, setSearchMessage] = useState("");

  const handleSearch = () => {
    const value = searchText.trim();

    if (!value) {
      setSearchMessage(`Please enter a location to search for ${searchType.toLowerCase()} properties.`);
      return;
    }

    setSearchMessage(
      `Searching ${searchType.toLowerCase()} properties for "${value}"...`
    );
  };

  const handleToolClick = (title) => {
    setSearchMessage(`${title} selected.`);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <Navbar />

      <main>
        <SearchHero
          searchType={searchType}
          setSearchType={setSearchType}
          searchText={searchText}
          setSearchText={setSearchText}
          onSearch={handleSearch}
        />

        {searchMessage && (
          <div className="search-message-wrap">
            <div className="search-message">
              <span>{searchMessage}</span>

              <button onClick={() => setSearchMessage("")}>
                ×
              </button>
            </div>
          </div>
        )}

        <PropertyTools onToolClick={handleToolClick} />

        <PopularLocations
          onLocationClick={(location) => {
            setSearchText(location);
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
        />

        <PropertyAlert />

        <Footer />
      </main>
    </>
  );
}

export default Home;