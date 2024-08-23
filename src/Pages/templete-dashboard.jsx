import React, { useState } from "react";
import FileUpload from "../components/FileUpload";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  LabelList,
} from "recharts";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [identifiedColumns, setIdentifiedColumns] = useState([]);
  const [colorPicker, setColorPicker] = useState(null);

  const requiredColumns = [
    "SKU",
    "Produto",
    "Qtd Vendida",
    "Data",
    "Loja",
    "Preço Unitário",
    "Gênero",
  ];

  const handleBarClick = (itemKey) => {
    setSelectedItem(itemKey);
    setColorPicker(itemKey);
  };
  const handleFileUpload = (uploadedData) => {
    setData(uploadedData);
    if (uploadedData.length > 0) {
      const availableColumns = Object.keys(uploadedData[0]);
      const identified = requiredColumns.filter((col) =>
        availableColumns.includes(col)
      );
      setIdentifiedColumns(identified);
    }
  };

  const groupDataByColumn = (column) => {
    const groupedData = {};

    data.forEach((item) => {
      const key = item[column];
      if (!groupedData[key]) {
        groupedData[key] = { ...item, computedValue: item["Qtd Vendida"] };
      } else {
        groupedData[key].computedValue += item["Qtd Vendida"];
      }
    });

    return Object.values(groupedData);
  };

  // Paleta de cores para o gráfico de pizza
  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#d84a4a", "#a64dff"];

  return (
    <>
      <div>
        <FileUpload onFileUpload={handleFileUpload} />

        {identifiedColumns.length > 0 && (
          <div>
            <p>Colunas identificadas: {identifiedColumns.join(", ")}</p>
          </div>
        )}
        <div className="dashboard">
          <div className="grafico">
            <h2>Produtos e Quantidade Vendida</h2>
            <BarChart
              width={800}
              height={200}
              data={groupDataByColumn("Produto")}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Produto" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="computedValue" fill="#8884d8" />
            </BarChart>
          </div>
          <div className="grafico">
            <h2>Por Gênero</h2>
            <PieChart width={200} height={200}>
              <Pie
                data={groupDataByColumn("Gênero")}
                dataKey="computedValue"
                nameKey="Gênero"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
              >
                {groupDataByColumn("Gênero").map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length] || handleBarClick()}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>

          <div className="grafico">
            <h2>Lojas e Quantidade Vendida</h2>
            <BarChart
              width={1450}
              height={200}
              data={groupDataByColumn("Loja")}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Loja" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="computedValue" fill="#82ca9d" />
              <LabelList dataKey="Loja" position="top" />
            </BarChart>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
