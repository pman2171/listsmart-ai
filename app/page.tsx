"use client";

import { useState } from "react";

export default function Home() {
  const [item, setItem] = useState("");
  const [result, setResult] = useState("");

  function generateListing() {
    const title = `🔥 ${item} – Great Condition – Fast Shipping`;
    const description = `
Title: ${title}

Description:
Great pre-owned condition.
Item: ${item}
Carefully inspected and ready to ship.

Ships fast from the USA.

Platforms:
✔ eBay
✔ Mercari
✔ Poshmark
✔ Depop
`;

    setResult(description);
  }

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>ListSmart AI</h1>
      <p>AI Listing Generator</p>

      <input
        type="text"
        placeholder="Enter item (example: Levi's 505 Jeans)"
        value={item}
        onChange={(e) => setItem(e.target.value)}
        style={{ width: "300px", padding: "10px" }}
      />

      <br />
      <br />

      <button onClick={generateListing} style={{ padding: "10px 20px" }}>
        Generate Listing
      </button>

      <pre style={{ marginTop: "30px", background: "#f4f4f4", padding: "20px" }}>
        {result}
      </pre>
    </div>
  );
}