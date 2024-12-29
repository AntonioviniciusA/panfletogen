import React, { useState } from "react";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";
import mammoth from "mammoth";

const CertificateGenerator = () => {
  const [attributes, setAttributes] = useState({
    name: "",
    course: "",
    birthDate: "",
    nationality: "",
    id: "",
    totalHours: "",
    startDate: "",
    endDate: "",
    secretary: "Mayer Dewey Pimenta",
    directors: "Maria Izabel Nunes",
  });
  const [file, setFile] = useState(null);
  const [style, setStyle] = useState({
    titleFontSize: 32,
    titleColor: "0000FF",
    bodyFontSize: 24,
    alignment: "center",
  });

  const extractAttributes = (content) => {
    const regexMap = {
      name: /ALUNO\(A\):\s*(.+)/,
      course: /CURSO:\s*(.+)/,
      birthDate: /DATA DE NASCIMENTO:\s*(\d{2}\/\d{2}\/\d{4})/,
      nationality: /NATURALIDADE:\s*(.+)/,
      id: /IDENTIDADE:\s*(.+)/,
      totalHours: /CARGA HORÁRIA TOTAL:\s*(.+)/,
      startDate: /DATA DO INGRESSO:\s*(.+)/,
      endDate: /DATA DA CONCLUSÃO:\s*(.+)/,
    };

    const extractedAttributes = { ...attributes }; // Preserve manual inputs
    for (const [key, regex] of Object.entries(regexMap)) {
      const match = content.match(regex);
      if (match) extractedAttributes[key] = match[1].trim();
    }

    setAttributes(extractedAttributes);
  };

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);

    const reader = new FileReader();

    // Verificar se o arquivo é .docx
    if (uploadedFile.name.endsWith(".docx")) {
      reader.onload = () => {
        const arrayBuffer = reader.result;
        mammoth
          .extractRawText({ arrayBuffer })
          .then((result) => {
            const textContent = result.value;
            extractAttributes(textContent); // Extrair atributos do texto
          })
          .catch((error) => console.error("Erro ao ler o .docx:", error));
      };
      reader.readAsArrayBuffer(uploadedFile);
    } else if (uploadedFile.name.endsWith(".txt")) {
      reader.onload = () => {
        const textContent = reader.result;
        extractAttributes(textContent); // Extrair atributos do texto
      };
      reader.readAsText(uploadedFile);
    } else {
      alert("Por favor, carregue um arquivo .docx ou .txt.");
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setAttributes((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleStyleChange = (event) => {
    const { name, value } = event.target;
    setStyle((prev) => ({
      ...prev,
      [name]: name.includes("FontSize") ? parseInt(value, 10) : value,
    }));
  };

  const generateCertificate = () => {
    const {
      name,
      course,
      birthDate,
      nationality,
      id,
      totalHours,
      startDate,
      endDate,
    } = attributes;
    if (
      !name ||
      !course ||
      !birthDate ||
      !nationality ||
      !id ||
      !totalHours ||
      !startDate ||
      !endDate
    ) {
      alert("Por favor, preencha os campos obrigatórios (Nome e Curso).");
      return;
    }

    const doc = new Document({
      sections: [
        {
          properties: {
            page: {
              size: {
                orientation: "landscape", // Define a orientação como paisagem
              },
            },
          },
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: "Certificado",
                  bold: true,
                  size: 70, // Tamanho correspondente a 35px no Word
                  font: "Algerian",
                }),
              ],
              alignment: "center",
            }),
            new Paragraph({
              children: [
                new TextRun(
                  `A Diretora Geral da Faculdade Cerrado – FACE, no uso de suas atribuições e tendo em vista a conclusão do Curso de Pós-Graduação, confere o Certificado a,\n\n`
                ),
              ],
              alignment: "center",
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: "\n\n",
                }),
              ],
              alignment: "center",
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: attributes.name,
                  bold: true,
                  size: 64, // Tamanho correspondente a 35px no Word
                  font: "Monotype Corsiva",
                }),
              ],
              alignment: "center",
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: "\n\n",
                }),
              ],
              alignment: "center",
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `de nacionalidade brasileira, nascido(a) no dia ${attributes.birthDate}, natural de ${attributes.nationality}, documento de identificação nº ${attributes.id}, por haver concluído com aproveitamento o curso de ${attributes.course} com a carga horária total de ${attributes.totalHours}, realizado no período de ${attributes.startDate} a ${attributes.endDate}, e outorga-lhe o presente Certificado.`,
                  size: 24,
                }),
              ],
              alignment: "center",
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: "\n\n",
                }),
              ],
              alignment: "center",
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: "Atividades de acordo com a Resolução CES/CNE nº 1 de 06/04/2018.Taguatinga - DF, 27 de dezembro de 2022.",
                }),
              ],
              alignment: "center",
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: "\n\n",
                }),
              ],
              alignment: "center",
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: "Taguatinga - DF, 27 de dezembro de 2022.",
                  size: 28,
                }),
              ],
              alignment: "right",
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: "\n\n",
                }),
              ],
              alignment: "center",
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: "\n\n",
                }),
              ],
              alignment: "center",
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: "\n\n",
                }),
              ],
              alignment: "center",
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: "__________________________________________",
                }),
              ],
              alignment: "center",
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: "\n\n",
                }),
              ],
              alignment: "center",
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: "               Secretário Geral                                                                                                                              Diretora Geral",
                  size: 24,
                }),
              ],
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `          ${attributes.secretary}                                                                                                                    ${attributes.directors} `,
                  size: 24,
                }),
              ],
            }),
          ],
        },
      ],
    });

    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, "Certificate.docx");
    });
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Certificate Generator</h1>
      <label className="custom-file-upload">
        <input type="file" accept=".txt,.docx" onChange={handleFileUpload} />
        <span>+</span> {/* Logo ou ícone */}
      </label>
      <div style={{ marginTop: "20px" }}>
        <h3>Extracted Attributes (Editable):</h3>
        <label>
          Aluno(a):
          <input
            type="text"
            name="name"
            value={attributes.name}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Curso:
          <input
            type="text"
            name="course"
            value={attributes.course}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Data de Nascimento:
          <input
            type="text"
            name="birthDate"
            value={attributes.birthDate}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Naturalidade:
          <input
            type="text"
            name="nationality"
            value={attributes.nationality}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Identidade:
          <input
            type="text"
            name="id"
            value={attributes.id}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Carga Horária Total:
          <input
            type="text"
            name="totalHours"
            value={attributes.totalHours}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Secretario Geral:
          <input
            type="text"
            name="secretary"
            value={attributes.secretary}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Diretoria Geral:
          <input
            type="text"
            name="directors"
            value={attributes.directors}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <div style={{ marginTop: "20px" }}>
        <h3>Personalize Certificate:</h3>
        <label>
          Title Font Size:
          <input
            type="number"
            name="titleFontSize"
            value={style.titleFontSize}
            onChange={handleStyleChange}
          />
        </label>
        <label>
          Title Color (Hex):
          <input
            type="text"
            name="titleColor"
            value={style.titleColor}
            onChange={handleStyleChange}
          />
        </label>
        <label>
          Body Font Size:
          <input
            type="number"
            name="bodyFontSize"
            value={style.bodyFontSize}
            onChange={handleStyleChange}
          />
        </label>
        <label>
          Alignment:
          <select
            name="alignment"
            value={"center"}
            onChange={handleStyleChange}
          >
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
          </select>
        </label>
      </div>
      <button
        onClick={generateCertificate}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#007BFF",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Generate Certificate
      </button>
    </div>
  );
};

export default CertificateGenerator;
