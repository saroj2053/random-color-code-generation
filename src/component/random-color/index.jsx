import React, { useEffect, useRef, useState } from "react";
import "./styles.css";
import { generateRandom } from "../../utils/random";
import toast, { Toaster } from "react-hot-toast";

const RandomColorGenerator = () => {
  const colorRef = useRef();
  const [colorFormat, setColorFormat] = useState("hex");
  const [color, setColor] = useState("#000");

  const generateHexColor = function () {
    const hexLiterals = [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "0",
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
    ];
    let hexColor = "#";
    for (let i = 0; i < 6; i++) {
      hexColor += hexLiterals[generateRandom(hexLiterals.length)];
    }
    setColor(hexColor);
  };

  const generateRGBColor = () => {
    const r = generateRandom(256);
    const g = generateRandom(256);
    const b = generateRandom(256);
    const a = Math.random().toFixed(1);
    setColor(`rgba(${r}, ${g}, ${b}, ${a})`);
  };

  const copyColorDetails = () => {
    const colorElement = colorRef.current;
    const textToCopy = colorElement.innerHTML;
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        toast.success("Successfully copied: " + textToCopy, {
          icon: "🚀",
          style: {
            background: "#121212",
            color: "#fff",
          },
        });
      })
      .catch((error) => {
        toast.error("Failed to copy to clipboard:", error);
      });
  };

  useEffect(() => {
    if (colorFormat === "hex") generateHexColor();
    else generateRGBColor();
  }, [colorFormat]);
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div style={{ width: "100vw", height: "100vh", backgroundColor: color }}>
        <div className="cta_buttons">
          <button onClick={() => setColorFormat("hex")}>HEX Format</button>
          <button onClick={() => setColorFormat("rgb")}>RGB Format</button>
          <button
            onClick={
              colorFormat === "hex" ? generateHexColor : generateRGBColor
            }
          >
            Generate Random Color
          </button>

          <a
            style={{
              background: "#fff",
              color: "#000",
              textDecoration: "none",
              textAlign: "center",
              border: "1px solid lightgray",
              padding: "8px 16px",
              fontFamily: "inherit",
            }}
            href="https://www.joshwcomeau.com/css/color-formats/"
            target="_blank"
            rel="noreferrer"
          >
            CSS color formats
          </a>
        </div>
        <div className="color__details">
          <div className="color__format">
            {colorFormat === "hex" ? "HEX Color" : "RGB Color"}
          </div>
          <div className="color__code" ref={colorRef}>
            {color}
          </div>
          <button className="copy__button" onClick={copyColorDetails}>
            Copy to Clipboard
          </button>
        </div>
      </div>
    </>
  );
};

export default RandomColorGenerator;
