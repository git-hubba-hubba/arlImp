import { useMemo, useState } from "react";
import { featuredBusinesses } from "../../data/featuredBusinesses";

const typeLabels = {
  community_center: "Community Centers",
  police: "Police",
  fire_station: "Fire Stations",
  restaurant: "Restaurants",
};

const typeAccent = {
  community_center: "lightblue",
  police: "navy",
  fire_station: "peru",
  restaurant: "lightblue",
};

function formatType(type) {
  return typeLabels[type] || String(type || "Local Business").replace(/_/g, " ");
}

function getMapLink(location) {
  if (typeof location.lat === "number" && typeof location.lng === "number") {
    return `https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`;
  }

  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.address)}`;
}

function DirectoryDashboard({ listings = featuredBusinesses }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeListing, setActiveListing] = useState(listings[0] || null);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(listings.map((listing) => formatType(listing.type))))],
    [listings]
  );

  const filteredListings = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    return listings.filter((listing) => {
      const category = formatType(listing.type);
      const matchesCategory = activeCategory === "All" || category === activeCategory;
      const searchableText = `${listing.name} ${listing.address} ${category}`.toLowerCase();
      const matchesSearch = !search || searchableText.includes(search);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, listings, searchTerm]);

  const selectedListing = activeListing || filteredListings[0] || null;

  return (
    <main className="directoryPage">
      <section className="directoryHeroPanel">
        <div>
          <p className="profileModalEyebrow">Impact Directory</p>
          <h1>Find Arlington Places That Matter</h1>
          <span>
            Search community centers, local restaurants, public safety locations, and
            featured partners from the current directory list.
          </span>
        </div>
        <div className="directoryStatStack">
          <strong>{listings.length}</strong>
          <span>Listings</span>
        </div>
      </section>

      <section className="directorySearchPanel">
        <label className="directorySearchField">
          <span>Look up a business or location</span>
          <input
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search by name, address, or category"
          />
        </label>
        <div className="directoryCategoryRail">
          {categories.map((category) => (
            <button
              className={`directoryCategoryButton ${activeCategory === category ? "directoryCategoryActive" : ""}`}
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      <section className="directoryLayout">
        <div className="directoryListingGrid">
          {filteredListings.map((listing) => {
            const isActive = selectedListing?.id === listing.id;

            return (
              <button
                className={`directoryListingCard ${isActive ? "directoryListingActive" : ""}`}
                key={listing.id}
                type="button"
                onClick={() => setActiveListing(listing)}
              >
                <span
                  className="directoryListingAccent"
                  style={{ background: typeAccent[listing.type] || "lightblue" }}
                />
                <div>
                  <p>{formatType(listing.type)}</p>
                  <h3>{listing.name}</h3>
                  <small>{listing.address}</small>
                </div>
              </button>
            );
          })}
          {filteredListings.length === 0 && (
            <div className="directoryEmptyState">
              <strong>No listings found.</strong>
              <span>Try a different search or category.</span>
            </div>
          )}
        </div>

        <aside className="directoryDetailPanel">
          {selectedListing ? (
            <>
              <p className="profileModalEyebrow">{formatType(selectedListing.type)}</p>
              <h2>{selectedListing.name}</h2>
              <div className="directoryDetailAddress">{selectedListing.address}</div>
              <div className="directoryDetailMeta">
                <span>
                  {typeof selectedListing.lat === "number" && typeof selectedListing.lng === "number"
                    ? "Map coordinates available"
                    : "Address available; coordinates pending"}
                </span>
                <span>Arlington, Texas</span>
              </div>
              <a
                className="signUp directoryMapButton"
                href={getMapLink(selectedListing)}
                target="_blank"
                rel="noreferrer"
              >
                Open Map
              </a>
            </>
          ) : (
            <p className="directoryEmptyState">Select a listing to view details.</p>
          )}
        </aside>
      </section>
    </main>
  );
}

export default DirectoryDashboard;
