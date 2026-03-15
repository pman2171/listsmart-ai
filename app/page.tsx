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
  const [detectedSize, setDetectedSize] = useState("");

  function normalizeText(text: string) {
    return text
      .toLowerCase()
      .replace(/[_\-\.]/g, " ")
      .replace(/blak/g, "black")
      .replace(/rlph/g, "ralph")
      .replace(/\s+/g, " ")
      .trim();
  }

  function detectFromText(text: string) {
    const lower = normalizeText(text);

    let brand = "Unknown";
    if (lower.includes("levi")) brand = "Levi's";
    else if (lower.includes("nike")) brand = "Nike";
    else if (lower.includes("adidas")) brand = "Adidas";
    else if (lower.includes("carhartt")) brand = "Carhartt";
    else if (lower.includes("ralph lauren") || lower.includes("polo ralph lauren") || lower.includes("polo")) {
      brand = "Polo Ralph Lauren";
    } else if (lower.includes("dr martens") || lower.includes("doc martens")) {
      brand = "Dr. Martens";
    }

    let category = "Clothing";
    if (lower.includes("polo shirt") || (lower.includes("polo") && lower.includes("shirt"))) {
      category = "Polo Shirt";
    } else if (lower.includes("t shirt") || lower.includes("tee")) {
      category = "T-Shirt";
    } else if (lower.includes("button up") || lower.includes("button shirt")) {
      category = "Button-Up Shirt";
    } else if (lower.includes("jean")) {
      category = "Jeans";
    } else if (lower.includes("hoodie")) {
      category = "Hoodie";
    } else if (lower.includes("jacket") || lower.includes("coat")) {
      category = "Jacket";
    } else if (
      lower.includes("shoe") ||
      lower.includes("sneaker") ||
      lower.includes("air max") ||
      lower.includes("boot")
    ) {
      category = "Shoes";
    }

    let color = "Unknown";
    if (lower.includes("blue")) color = "Blue";
    else if (lower.includes("black")) color = "Black";
    else if (lower.includes("white")) color = "White";
    else if (lower.includes("gray") || lower.includes("grey")) color = "Gray";
    else if (lower.includes("red")) color = "Red";
    else if (lower.includes("brown")) color = "Brown";
    else if (lower.includes("tan")) color = "Tan";
    else if (lower.includes("green")) color = "Green";
    else if (lower.includes("navy")) color = "Navy";

    let style = "";
    if (lower.includes("505")) style = "505 Regular Fit";
    else if (lower.includes("501")) style = "501 Original Fit";
    else if (lower.includes("straight")) style = "Straight Leg";
    else if (lower.includes("slim")) style = "Slim Fit";
    else if (lower.includes("relaxed")) style = "Relaxed Fit";
    else if (lower.includes("air max")) style = "Air Max";
    else if (lower.includes("custom fit")) style = "Custom Fit";
    else if (lower.includes("classic fit")) style = "Classic Fit";

    let size = "";
    const waistInseam = lower.match(/\b\d{2}x\d{2}\b/);
    const numericSize = lower.match(/\bsize\s?(\d{1,2}(\.\d)?)\b/);
    const xlLike = lower.match(/\b(xs|s|m|l|xl|xxl|xxxl)\b/);

    if (waistInseam) {
      size = waistInseam[0].toUpperCase();
    } else if (numericSize) {
      size = numericSize[1].toUpperCase();
    } else if (xlLike) {
      size = xlLike[1].toUpperCase();
    }

    return { brand, category, color, style, size };
  }

  function buildDetectedItem(d: {
    brand: string;
    color: string;
    style: string;
    category: string;
    size: string;
  }) {
    return [d.brand, d.color !== "Unknown" ? d.color : "", d.style, d.category, d.size]
      .filter(Boolean)
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function handlePhotoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setPhotoName(file.name);

    const detected = detectFromText(file.name);
    setDetectedBrand(detected.brand);
    setDetectedCategory(detected.category);
    setDetectedColor(detected.color);
    setDetectedStyle(detected.style || "Standard");
    setDetectedSize(detected.size || "Unknown");

    setItem(buildDetectedItem(detected));
  }

  const seoTitle = useMemo(() => {
    const cleanItem = item.trim();
    if (!cleanItem) return "";
    return cleanItem.replace(/\s+/g, " ").trim();
  }, [item]);

  function generateListing() {
    const cleanItem = item.trim();
    if (!cleanItem) return;

    const title = seoTitle;

    const description = `Title: ${title}

Description:
Great pre-owned condition.
Item: ${cleanItem}
Brand: ${detectedBrand || "Unknown"}
Category: ${detectedCategory || "Unknown"}
Color: ${detectedColor || "Unknown"}
Style: ${detectedStyle || "Standard"}
Size: ${detectedSize || "Unknown"}

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
            <p><strong>Detected Style:</strong> {detectedStyle || "Standard"}</p>
            <p><strong>Detected Size:</strong> {detectedSize || "Unknown"}</p>
          </div>
        )}
      </div>

      <input
        type="text"
        placeholder="Enter item (example: Levi's 505 Jeans)"
        value={item}
        onChange={(e) => setItem(e.target.value)}
        style={{ width: "360px", padding: "10px", marginBottom: "12px" }}
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