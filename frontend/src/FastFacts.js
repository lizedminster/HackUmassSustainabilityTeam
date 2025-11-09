import React from "react";

function FastFacts() {
  const tableCellStyle = {
    padding: "12px 16px",
    verticalAlign: "top",
    backgroundColor: "#f9f9f9",
    textAlign: "left",
  };

  const tableRowStyle = {
    borderBottom: "12px solid white",
  };

  const listStyle = {
    textAlign: "left",
    listStylePosition: "outside",
    marginLeft: "20px",
    paddingLeft: "20px",
    lineHeight: "1.6",
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Arial, sans-serif", color: "#333" }}>
      <header style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1 style={{ color: "#2E8B57", marginBottom: "10px" }}>♻️ Recycling Fast Facts</h1>
        <p style={{ fontSize: "16px", color: "#555", lineHeight: "1.6" }}>
          All information is specific for Massachusetts.
          <br />
          For more details, visit:{" "}
          <a
            href="https://www.amherstma.gov/538/A-to-Z-Disposal-Guide#rec"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#007BFF" }}
          >
            Amherst A-to-Z Disposal Guide
          </a>
        </p>
      </header>

      {/* --- Section 1: Types of Recycling --- */}
      <section style={{ marginBottom: "50px" }}>
        <h2 style={{ color: "#2E8B57", borderBottom: "2px solid #ccc", paddingBottom: "6px" }}>
          Types of Recycling
        </h2>

        <h4 style={{ marginTop: "20px", color: "#444" }}>
          Mixed Container Recycling vs Paper Recycling
        </h4>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "40px",
            marginTop: "20px",
          }}
        >
          <div style={{ flex: 1, backgroundColor: "#f4f9f4", padding: "20px", borderRadius: "8px" }}>
            <h3 style={{ color: "#2E8B57" }}>Mixed Container Recycling</h3>
            <ul style={listStyle}>
              <li>All recyclables (paper, plastic, metal, glass) go in a single bin.</li>
              <li>Materials are collected together for sorting later.</li>
              <li>Requires a processing facility to separate materials.</li>
              <li>Includes plastic bottles, aluminum cans, and glass jars.</li>
            </ul>
          </div>

          <div style={{ flex: 1, backgroundColor: "#f4f9f4", padding: "20px", borderRadius: "8px" }}>
            <h3 style={{ color: "#2E8B57" }}>Paper Recycling</h3>
            <ul style={listStyle}>
              <li>Only accepts paper and cardboard items.</li>
              <li>Placed in a separate bin from glass, metal, or plastic.</li>
              <li>Processed independently from other recyclables.</li>
              <li>Includes newspapers, magazines, cereal boxes, clean cardboard.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* --- Section 2: Frequently Asked Items --- */}
      <section>
        <h2 style={{ color: "#2E8B57", borderBottom: "2px solid #ccc", paddingBottom: "6px" }}>
          Frequently Asked Items
        </h2>

        <table
          style={{
            borderCollapse: "separate",
            borderSpacing: "0 12px",
            width: "100%",
            marginTop: "20px",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#e0f2e0" }}>
              <th style={{ textAlign: "left", padding: "12px 16px" }}>Item</th>
              <th style={{ textAlign: "left", padding: "12px 16px" }}>Recycling Information</th>
            </tr>
          </thead>
          <tbody>
            {[
              {
                item: "Aluminum",
                info: "Moderately clean aluminum foil and aluminum containers (like pie plates, casserole dishes) are accepted with aluminum cans in your container recycling mix. If greasy or dirty, throw it away.",
              },
              {
                item: "Batteries",
                info: "Household batteries (AA, AAA, etc.) can go in household trash, but rechargeable or lithium batteries require special disposal.",
              },
              {
                item: "Biodegradable Waste",
                info: "Biodegradable waste cannot be recycled, but it can be composted at home in a compost bin or at municipal collection programs.",
              },
              {
                item: "Bottles",
                info: "If smaller than 2 gallons and not containing toxic material, they can be recycled in the household container recycling mix.",
              },
              {
                item: "Cans",
                info: "Steel, tin, and aluminum cans smaller than 2 gallons are recyclable.",
              },
              {
                item: "Cardboard",
                info: "Cardboard can be recycled in your household paper recycling. Make sure there is no food residue such as pizza grease or Chinese take-out containers.",
              },
              {
                item: "Cartons and Drink Boxes",
                info: "Rinse, flatten, and include in container recycling. Discard straws. Plastic caps may stay. Drink pouches (flexible, silvery) are not recyclable.",
              },
              {
                item: "Egg Cartons",
                info: "Paper, plastic, and foam cartons are not recyclable. Paper ones can be composted or reused.",
              },
              {
                item: "Glass",
                info: "Most glass food and beverage bottles and jars smaller than 2 gallons in size may be included in your mixed container recycling bin. All broken glass should go in the trash.",
              },
              {
                item: "Light Bulbs",
                info: "Incandescent bulbs are not recyclable and should be disposed of in household trash.",
              },
              {
                item: "Magazines",
                info: "Softcover magazines and catalogs go with mixed paper recycling.",
              },
              {
                item: "Metal",
                info: "Scrap metal is accepted at the Transfer Station. Disposal fees apply.",
              },
              {
                item: "Newspapers",
                info: "Clean newspapers and inserts can go in mixed paper recycling.",
              },
              {
                item: "Paper",
                info: "Paper can be recycled in your household paper recycling. Store receipts can also be recycled. Carbon and thermal paper are not recyclable.",
              },
              {
                item: "Plastic",
                info: "Plastic shopping bags and other thin plastics like cling wrap cannot be placed in recycling bins because they cause major litter problems and clog sorting machinery. Many local grocery stores provide plastic bag recycling. Many plastic containers can be recycled.",
              },
              {
                item: "Styrofoam",
                info: "Not accepted for recycling. Dispose of in household trash.",
              },
            ].map((row, i) => (
              <tr key={i} style={tableRowStyle}>
                <td style={tableCellStyle}>
                  <strong>{row.item}</strong>
                </td>
                <td style={tableCellStyle}>{row.info}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default FastFacts;
