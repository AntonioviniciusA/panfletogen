import React, { useRef, useState } from "react";
import { jsPDF } from "jspdf";
import { Upload, Image as ImageIcon, FileText, Download } from "lucide-react";

export default function ImageConvention() {
  const [preview, setPreview] = useState(null);
  const [convertedImage, setConvertedImage] = useState(null);
  const [originalFileType, setOriginalFileType] = useState(null);
  const [fileName, setFileName] = useState("");
  const [isConverting, setIsConverting] = useState(false);
  const imageRef = useRef(null);
  const canvasRef = useRef(null);
  const [pdfDoc, setPdfDoc] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setFileName(file.name.split(".")[0]);
    setOriginalFileType(file.type);

    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(file);
  };

  const convertImage = (type = "image/jpeg") => {
    setIsConverting(true);

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
    setIsConverting(false);
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
    setPdfDoc(pdf);
    setConvertedImage("pdf");
    setIsConverting(false);
  };

  const getFileTypeDisplay = (type) => {
    if (!type) return "";
    const parts = type.split("/");
    return parts[1] ? parts[1].toUpperCase() : "";
  };

  const getFormatExtension = (mimeType) => {
    switch (mimeType) {
      case "image/png":
        return "png";
      case "image/jpeg":
        return "jpeg";
      case "image/webp":
        return "webp";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center pt-8 mb-8">
        <h1 className="text-4xl font-bold text-blue-900 mb-2">
          Conversor de Imagens
        </h1>
        <p className="text-blue-700 text-lg">
          Converta suas imagens para PNG, JPEG, WEBP ou PDF
        </p>
      </div>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Upload Section */}
        <div className="border border-blue-200 rounded-lg shadow-lg">
          <div className="bg-blue-50 border-b border-blue-200 p-4">
            <h2 className="text-blue-900 flex items-center gap-2 font-semibold text-lg">
              <Upload className="w-5 h-5" />
              Upload da Imagem
            </h2>
          </div>
          <div className="p-6">
            <div className="flex flex-col items-center">
              <label
                htmlFor="file-upload"
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-blue-300 border-dashed rounded-lg cursor-pointer bg-blue-50 hover:bg-blue-100 transition-colors duration-200">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <ImageIcon className="w-8 h-8 mb-2 text-blue-500" />
                  <p className="mb-2 text-sm text-blue-700">
                    <span className="font-semibold">
                      Clique para fazer upload
                    </span>{" "}
                    ou arraste e solte
                  </p>
                  <p className="text-xs text-blue-500">PNG, JPG, JPEG, WEBP</p>
                </div>
              </label>
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
          </div>
        </div>

        {preview && (
          <div className="border border-blue-200 rounded-lg shadow-lg">
            <div className="bg-blue-50 border-b border-blue-200 p-4">
              <h2 className="text-blue-900 font-semibold text-lg">
                Converter Para
              </h2>
            </div>
            <div className="p-6">
              <div className="flex flex-wrap gap-3 justify-center">
                <button
                  onClick={() => convertImage("image/png")}
                  disabled={isConverting}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md disabled:opacity-50">
                  PNG
                </button>
                <button
                  onClick={() => convertImage("image/jpeg")}
                  disabled={isConverting}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md disabled:opacity-50">
                  JPEG
                </button>
                <button
                  onClick={() => convertImage("image/webp")}
                  disabled={isConverting}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md disabled:opacity-50">
                  WEBP
                </button>
                <button
                  onClick={() => convertImage("application/pdf")}
                  disabled={isConverting}
                  className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 px-6 py-2 rounded-md disabled:opacity-50">
                  <FileText className="w-4 h-4" />
                  PDF
                </button>
              </div>
              {isConverting && (
                <div className="mt-4 text-center">
                  <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-lg">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                    <span className="text-blue-700">Convertendo...</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {preview && (
          <div className="border border-blue-200 rounded-lg shadow-lg">
            <div className="bg-blue-50 border-b border-blue-200 p-4">
              <h2 className="text-blue-900 font-semibold text-lg">Imagens</h2>
            </div>
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Original Image */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-blue-900 text-center">
                    Imagem Original{" "}
                    {originalFileType && (
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-sm ml-2">
                        {getFileTypeDisplay(originalFileType)}
                      </span>
                    )}
                  </h3>
                  <div className="flex justify-center">
                    <img
                      ref={imageRef}
                      src={preview}
                      alt="Original"
                      className="max-w-full max-h-80 object-contain rounded-lg shadow-md border border-blue-200"
                      crossOrigin="anonymous"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-green-900 text-center">
                    {convertedImage ? (
                      <>
                        Imagem Convertida
                        {convertedImage !== "pdf" && (
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-md text-sm ml-2">
                            {getFormatExtension(
                              convertedImage.split(";")[0].split(":")[1]
                            ).toUpperCase()}
                          </span>
                        )}
                        {convertedImage === "pdf" && (
                          <span className="bg-red-100 text-red-800 px-2 py-1 rounded-md text-sm ml-2">
                            PDF
                          </span>
                        )}
                      </>
                    ) : (
                      "Aguardando Conversão"
                    )}
                  </h3>
                  <div className="flex justify-center items-center min-h-80">
                    {convertedImage ? (
                      <div className="space-y-4 w-full">
                        {convertedImage !== "pdf" ? (
                          <>
                            <div className="flex justify-center">
                              <img
                                src={convertedImage}
                                alt="Convertida"
                                className="max-w-full max-h-64 object-contain rounded-lg shadow-md border border-green-200"
                              />
                            </div>
                            <div className="flex justify-center">
                              <a
                                href={convertedImage}
                                download={`${fileName}_convertida.${getFormatExtension(
                                  convertedImage.split(";")[0].split(":")[1]
                                )}`}
                                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md">
                                <Download className="w-4 h-4" />
                                Baixar Imagem
                              </a>
                            </div>
                          </>
                        ) : (
                          <div className="text-center space-y-4">
                            <div className="flex justify-center">
                              <div className="bg-red-100 p-8 rounded-lg border border-red-200">
                                <FileText className="w-16 h-16 text-red-600 mx-auto mb-2" />
                                <p className="text-red-700 font-medium">
                                  PDF Gerado!
                                </p>
                              </div>
                            </div>
                            <button
                              onClick={() =>
                                pdfDoc?.save(`${fileName}_convertida.pdf`)
                              }
                              className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2 px-4 py-2 rounded-md mx-auto">
                              <Download className="w-4 h-4" />
                              Baixar PDF
                            </button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-center text-gray-500">
                        <ImageIcon className="w-16 h-16 mx-auto mb-2 text-gray-300" />
                        <p>Selecione um formato para converter</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  );
}
