const doc = new Document({
  sections: [
    {
      children: [
        new Paragraph({
          children: [
            new TextRun({
              text: "Certificate of Completion",
              bold: true,
              size: style.titleFontSize,
              color: style.titleColor,
            }),
          ],
          alignment: style.alignment,
        }),
        new Paragraph({
          children: [
            new TextRun("Certificado\n\n"),
            new TextRun(
              `A Diretora Geral da Faculdade Cerrado – FACE, no uso de suas atribuições e tendo em vista a conclusão do Curso de Pós-Graduação, confere o Certificado a,\n\n`
            ),
            new TextRun({ text: attributes.name, bold: true }),
            new TextRun(
              `\n\nde nacionalidade ${attributes.nationality}, nascido(a) no dia ${attributes.birthDate}, natural de ${attributes.birthplace}, documento de identificação nº ${attributes.id}, por haver concluído com aproveitamento o curso de ${attributes.course} com a carga horária total de ${attributes.totalHours}, realizado no período de ${attributes.startDate} a ${attributes.endDate}, e outorga-lhe o presente Certificado.\n\nAtividades de acordo com a Resolução CES/CNE nº 1 de 06/04/2018.\n\nTaguatinga - DF, 27 de dezembro de 2022.`
            ),
          ],
          alignment: style.alignment,
        }),
      ],
    },
  ],
});

<div style={{ marginTop: "20px" }}>
  <h3>Extracted Attributes:</h3>
  <p>
    <strong>Aluno(a):</strong> {attributes.name || "Não encontrado"}
  </p>
  <p>
    <strong>Curso:</strong> {attributes.course || "Não encontrado"}
  </p>
  <p>
    <strong>Nascimento:</strong> {attributes.birthDate || "Não encontrado"}
  </p>
  <p>
    <strong>Nacionalidade:</strong> {attributes.nationality || "Não encontrado"}
  </p>
  <p>
    <strong>Rg:</strong> {attributes.id || "Não encontrado"}
  </p>
  <p>
    <strong>Carga Horaria:</strong> {attributes.totalHours || "Não encontrado"}
  </p>
  <p>
    <strong>Data de inicio:</strong> {attributes.startDate || "Não encontrado"}
  </p>
  <p>
    <strong>Data de termino:</strong> {attributes.endDate || "Não encontrado"}
  </p>
</div>;
