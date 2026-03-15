"use client";

import { useState } from "react";

export default function Home() {
  const [item, setItem] = useState("");
  const [result, setResult] = useState("");
  const [price, setPrice] = useState("");
  const [quickPrice, setQuickPrice] = useState("");
  const [highPrice, setHighPrice] = useState("");

  function generateListing() {
    const cleanItem = item.trim();
    if (!cleanItem) return;

    const title = `${cleanItem} Great Condition Fast Shipping`;
    const description = `Title: ${title}

Description:
Great pre-owned condition.
Item: ${cleanItem}
Carefully inspected and ready to ship.

Ships fast from the USA.

Platforms:
✔ eBay
✔ Mercari
✔ Poshmark
✔ Depop`;

    setResult(description);
    setPrice("$39.99");
    setQuickPrice("$29.99");
    setHighPrice("$49.99");
  }

  async function copyText(text: string) {
    await navigator.clipboard.writeText(text);
    alert("Copied");
  }

  return (
    <div style={{ padding: "40px", fontFamily: "Arial", maxWidth: "900px" }}>
      <h1>ListSmart AI</h1>
      <p>AI Listing Generator</p>

      <input
        type="text"
        placeholder="Enter item (example: Levi's 505 Jeans)"
        value={item}
        onChange={(e) => setItem(e.target.value)}
        style={{ width: "320px", padding: "10px", marginBottom: "12px" }}
      />

      <br />

      <button onClick={generateListing} style={{ padding: "10px 20px" }}>
        Generate Listing
      </button>

      <div
        style={{
          marginTop: "30px",
          background: "#f4f4f4",
          padding: "20px",
          borderRadius: "8px",
        }}
      >
        <h3>Generated Listing</h3>
        <pre style={{ whiteSpace: "pre-wrap" }}>{result}</pre>

        <h3>Suggested Prices</h3>
        <p>Recommended price: {price}</p>
        <p>Quick sale price: {quickPrice}</p>
        <p>High end price: {highPrice}</p>

        <div style={{ marginTop: "20px" }}>
          <button
            onClick={() => copyText(result)}
            style={{ marginRight: "10px", padding: "10px 16px" }}
          >
            Copy Listing
          </button>

          <button
            onClick={() => copyText(price)}
            style={{ marginRight: "10px", padding: "10px 16px" }}
          >
            Copy Price
          </button>

          <button
            onClick={() => copyText(item)}
            style={{ padding: "10px 16px" }}
          >
            Copy Item
          </button>
        </div>
      </div>
    </div>
  );
}
     