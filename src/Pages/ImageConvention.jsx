import React, { useRef, useState } from "react";
import { jsPDF } from "jspdf";

export default function ImageConvention() {
  const [preview, setPreview] = useState(null);
  const [convertedImage, setConvertedImage] = useState(null);
  const imageRef = useRef(null);
  const canvasRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(file);
  };

  const convertImage = (type = "image/jpeg") => {
    if (type === "application/pdf") {
      convertToPDF();
      return;
    }

    const img = imageRef.current;
    const canvas = canvasRef.current;

    if (!img || !canvas) return;

    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    const newImage = canvas.toDataURL(type);
    setConvertedImage(newImage);
  };

  const convertToPDF = () => {
    const img = imageRef.current;
    if (!img) return;

    const pdf = new jsPDF({
      orientation:
        img.naturalWidth > img.naturalHeight ? "landscape" : "portrait",
      unit: "px",
      format: [img.naturalWidth, img.naturalHeight],
    });

    pdf.addImage(img, "JPEG", 0, 0, img.naturalWidth, img.naturalHeight);
    pdf.save("imagem_convertida.pdf");
  };

  return (
    <div style={{ textAlign: "center" }}>
      <label
        htmlFor="file-upload"
        style={{
          display: "inline-block",
          padding: "10px 20px",
          backgroundColor: "#4f46e5",
          color: "white",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "bold",
          transition: "0.3s",
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#3730a3")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#4f46e5")}>
        Escolher imagem
      </label>
      <input
        id="file-upload"
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        style={{ display: "none" }}
      />

      {preview && (
        <>
          <img
            ref={imageRef}
            src={preview}
            alt="Original"
            style={{ maxWidth: "300px" }}
          />

          <button onClick={() => convertImage("image/png")}>PNG</button>
          <button onClick={() => convertImage("image/jpeg")}>JPEG</button>
          <button onClick={() => convertImage("image/webp")}>WEBP</button>
          <button onClick={() => convertImage("application/pdf")}>PDF</button>
        </>
      )}

      <canvas ref={canvasRef} style={{ display: "none" }} />

      {convertedImage && (
        <div>
          <h3>Imagem Convertida:</h3>
          <img
            src={convertedImage}
            alt="Convertida"
            style={{ maxWidth: "300px" }}
          />

          <a href={convertedImage} download="imagem_convertida">
            Baixar
          </a>
        </div>
      )}
    </div>
  );
}
