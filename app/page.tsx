"use client";

import { useMemo, useState } from "react";

export default function Home() {
  const [item, setItem] = useState("");
  const [result, setResult] = useState("");
  const [price, setPrice] = useState("");
  const [quickPrice, setQuickPrice] = useState("");
  const [highPrice, setHighPrice] = useState("");
  const [photoName, setPhotoName] = useState("");
  const [detectedBrand, setDetectedBrand] = useState("");
  const [detectedCategory, setDetectedCategory] = useState("");
  const [detectedColor, setDetectedColor] = useState("");
  const [detectedStyle, setDetectedStyle] = useState("");

  function detectFromText(text: string) {
    const lower = text.toLowerCase();

    let brand = "Unknown";
    if (lower.includes("levi")) brand = "Levi's";
    else if (lower.includes("nike")) brand = "Nike";
    else if (lower.includes("adidas")) brand = "Adidas";
    else if (lower.includes("carhartt")) brand = "Carhartt";
    else if (lower.includes("ralph lauren") || lower.includes("polo")) brand = "Polo Ralph Lauren";
    else if (lower.includes("dr martens") || lower.includes("doc martens")) brand = "Dr. Martens";

    let category = "Clothing";
    if (lower.includes("jean")) category = "Jeans";
    else if (lower.includes("shoe") || lower.includes("sneaker") || lower.includes("air max") || lower.includes("boot")) category = "Shoes";
    else if (lower.includes("hoodie")) category = "Hoodie";
    else if (lower.includes("jacket") || lower.includes("coat")) category = "Jacket";
    else if (lower.includes("shirt") || lower.includes("tee") || lower.includes("t-shirt")) category = "Shirt";

    let color = "Unknown";
    if (lower.includes("blue")) color = "Blue";
    else if (lower.includes("black")) color = "Black";
    else if (lower.includes("white")) color = "White";
    else if (lower.includes("gray") || lower.includes("grey")) color = "Gray";
    else if (lower.includes("red")) color = "Red";
    else if (lower.includes("brown")) color = "Brown";
    else if (lower.includes("tan")) color = "Tan";
    else if (lower.includes("green")) color = "Green";

    let style = "Standard";
    if (lower.includes("505")) style = "505 Regular Fit";
    else if (lower.includes("501")) style = "501 Original Fit";
    else if (lower.includes("straight")) style = "Straight Leg";
    else if (lower.includes("slim")) style = "Slim Fit";
    else if (lower.includes("relaxed")) style = "Relaxed Fit";
    else if (lower.includes("air max")) style = "Air Max";

    return { brand, category, color, style };
  }

  function handlePhotoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setPhotoName(file.name);

    const detected = detectFromText(file.name);
    setDetectedBrand(detected.brand);
    setDetectedCategory(detected.category);
    setDetectedColor(detected.color);
    setDetectedStyle(detected.style);

    const autoItem = `${detected.brand} ${detectedStyleFromDetected(detected)} ${detected.category} ${detected.color}`.replace(/\s+/g, " ").trim();
    setItem(autoItem);
  }

  function detectedStyleFromDetected(detected: { style: string }) {
    return detected.style === "Standard" ? "" : detected.style;
  }

  const seoTitle = useMemo(() => {
    const cleanItem = item.trim();
    if (!cleanItem) return "";
    return cleanItem.replace(/\s+/g, " ").trim();
  }, [item]);

  function generateListing() {
    const cleanItem = item.trim();
    if (!cleanItem) return;

    const title = `${cleanItem} Great Condition Fast Shipping`;

    const description = `Title: ${title}

Description:
Great pre-owned condition.
Item: ${cleanItem}
Brand: ${detectedBrand || "Unknown"}
Category: ${detectedCategory || "Unknown"}
Color: ${detectedColor || "Unknown"}
Style: ${detectedStyle || "Unknown"}

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
      <p>AI Listing Generator + Photo Detection</p>

      <div
        style={{
          marginTop: "20px",
          marginBottom: "20px",
          padding: "20px",
          background: "#f4f4f4",
          borderRadius: "8px",
        }}
      >
        <h3>Upload Photo</h3>
        <input type="file" accept="image/*" onChange={handlePhotoUpload} />

        {photoName && (
          <div style={{ marginTop: "16px" }}>
            <p><strong>Photo:</strong> {photoName}</p>
            <p><strong>Detected Brand:</strong> {detectedBrand}</p>
            <p><strong>Detected Category:</strong> {detectedCategory}</p>
            <p><strong>Detected Color:</strong> {detectedColor}</p>
            <p><strong>Detected Style:</strong> {detectedStyle}</p>
          </div>
        )}
      </div>

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
        <p><strong>SEO Title Preview:</strong> {seoTitle}</p>
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