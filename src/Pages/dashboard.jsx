import React, { useState, useEffect } from "react";
import FileUpload from "../components/FileUpload";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { SketchPicker } from "react-color";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [graphs, setGraphs] = useState([]);
  const [identifiedColumns, setIdentifiedColumns] = useState([]);
  const [barColors, setBarColors] = useState({});
  const [colorPicker, setColorPicker] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const requiredColumns = [
    "SKU",
    "Produto",
    "Qtd Vendida",
    "Data",
    "Loja",
    "Preço Unitário",
    "Gênero",
  ];

  useEffect(() => {
    // Gerar cor aleatória para cada coluna ao carregar os dados
    if (data.length > 0) {
      const colors = {};
      data.forEach((item, index) => {
        colors[item[graphs[0]?.xAxisColumn] || index] = `#${Math.floor(
          Math.random() * 16777215
        ).toString(16)}`;
      });
      setBarColors(colors);
    }
  }, [data, graphs]);

  const handleFileUpload = (uploadedData) => {
    setData(uploadedData);
    if (uploadedData.length > 0) {
      const availableColumns = Object.keys(uploadedData[0]);
      const identified = requiredColumns.filter((col) =>
        availableColumns.includes(col)
      );

      setColumns(availableColumns);
      setIdentifiedColumns(identified);
    }
  };

  const handleAddGraph = () => {
    setGraphs([
      ...graphs,
      {
        xAxisColumn: columns[0],
        yAxisColumn: columns[1],
        operation: "none",
        chartType: "Bar",
      },
    ]);
  };

  const handleUpdateGraph = (index, key, value) => {
    const updatedGraphs = graphs.map((graph, i) =>
      i === index ? { ...graph, [key]: value } : graph
    );
    setGraphs(updatedGraphs);
  };

  const handleColorChange = (color) => {
    if (selectedItem) {
      setBarColors((prevColors) => ({
        ...prevColors,
        [selectedItem]: color.hex,
      }));
      setColorPicker(null);
      setSelectedItem(null);
    }
  };

  const handleBarClick = (itemKey) => {
    setSelectedItem(itemKey);
    setColorPicker(itemKey);
  };

  const applyOperation = (operation, xValue, yValue) => {
    if (typeof xValue === "string") {
      // Se xValue é uma string, multiplicar pelo número de ocorrências da string no data
      const count = countOccurrences(data, xValue);
      return yValue * count;
    }
    if (typeof yValue === "string") {
      // Se yValue é uma string, multiplicar pelo número de ocorrências da string no data
      const count = countOccurrences(data, yValue);
      return xValue * count;
    }
    switch (operation) {
      case "multiply":
        return xValue * yValue;
      case "divide":
        return xValue / yValue;
      case "add":
        return xValue + yValue;
      case "subtract":
        return xValue - yValue;
      default:
        return yValue;
    }
  };

  const countOccurrences = (data, value) => {
    return data.filter(
      (item) =>
        item[graphs[0]?.xAxisColumn] === value ||
        item[graphs[0]?.yAxisColumn] === value
    ).length;
  };

  const groupDataByXAxis = (graph) => {
    const groupedData = {};

    data.forEach((item) => {
      const xValue = item[graph.xAxisColumn];
      const yValue = applyOperation(
        graph.operation,
        item[graph.xAxisColumn],
        item[graph.yAxisColumn]
      );

      if (!groupedData[xValue]) {
        groupedData[xValue] = { ...item, computedValue: yValue };
      } else {
        groupedData[xValue].computedValue += yValue;
      }
    });

    return Object.values(groupedData);
  };

  return (
    <div>
      <FileUpload onFileUpload={handleFileUpload} />

      {identifiedColumns.length > 0 && (
        <div>
          <p>Colunas identificadas: {identifiedColumns.join(", ")}</p>
          <button onClick={handleAddGraph}>Adicionar Gráfico</button>

          {graphs.map((graph, index) => (
            <div key={index}>
              <div>
                <label htmlFor={`xAxis-${index}`}>X Axis:</label>
                <select
                  id={`xAxis-${index}`}
                  value={graph.xAxisColumn}
                  onChange={(e) =>
                    handleUpdateGraph(index, "xAxisColumn", e.target.value)
                  }
                >
                  {columns.map((col) => (
                    <option key={col} value={col}>
                      {col}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor={`yAxis-${index}`}>Y Axis:</label>
                <select
                  id={`yAxis-${index}`}
                  value={graph.yAxisColumn}
                  onChange={(e) =>
                    handleUpdateGraph(index, "yAxisColumn", e.target.value)
                  }
                >
                  {columns.map((col) => (
                    <option key={col} value={col}>
                      {col}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor={`operation-${index}`}>Operação:</label>
                <select
                  id={`operation-${index}`}
                  value={graph.operation}
                  onChange={(e) =>
                    handleUpdateGraph(index, "operation", e.target.value)
                  }
                >
                  <option value="none">Nenhuma</option>
                  <option value="multiply">Multiplicar (X * Y)</option>
                  <option value="divide">Dividir (X / Y)</option>
                  <option value="add">Somar (X + Y)</option>
                  <option value="subtract">Subtrair (X - Y)</option>
                </select>
              </div>

              <div>
                <label htmlFor={`chartType-${index}`}>Tipo de Gráfico:</label>
                <select
                  id={`chartType-${index}`}
                  value={graph.chartType}
                  onChange={(e) =>
                    handleUpdateGraph(index, "chartType", e.target.value)
                  }
                >
                  <option value="Bar">Gráfico de Barras</option>
                  <option value="Column">Gráfico de Colunas</option>
                  <option value="Line">Gráfico de Linha</option>
                  <option value="Pie">Gráfico de Setor (Circular)</option>
                </select>
              </div>

              {graph.chartType === "Bar" && (
                <div>
                  <BarChart
                    width={600}
                    height={300}
                    data={groupDataByXAxis(graph)}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey={graph.xAxisColumn} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="computedValue"
                      fill="#8884d8"
                      onClick={() => handleBarClick(graph.xAxisColumn)}
                    />
                  </BarChart>
                </div>
              )}

              {graph.chartType === "Column" && (
                <div>
                  <BarChart
                    width={600}
                    height={300}
                    data={groupDataByXAxis(graph)}
                    layout="vertical"
                  >
                    <CartesianGrid strokeDasharray="3" />
                    <XAxis type="number" />
                    <YAxis type="category" />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="computedValue"
                      fill="#8884d8"
                      onClick={() => handleBarClick(graph.xAxisColumn)}
                    />
                  </BarChart>
                </div>
              )}

              {graph.chartType === "Line" && (
                <LineChart
                  width={600}
                  height={300}
                  data={groupDataByXAxis(graph)}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey={graph.xAxisColumn} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="computedValue"
                    stroke={barColors[graph.xAxisColumn] || "#8884d8"}
                  />
                </LineChart>
              )}

              {graph.chartType === "Pie" && (
                <PieChart width={600} height={300}>
                  <Pie
                    data={groupDataByXAxis(graph)}
                    dataKey="computedValue"
                    nameKey={graph.xAxisColumn}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                  >
                    {groupDataByXAxis(graph).map((item) => (
                      <Cell
                        key={item[graph.xAxisColumn]}
                        fill={barColors[item[graph.xAxisColumn]] || "#8884d8"}
                        onClick={() => handleBarClick(item[graph.xAxisColumn])}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              )}

              {colorPicker && (
                <div style={{ position: "absolute", zIndex: 1000 }}>
                  <SketchPicker
                    color={barColors[colorPicker] || "#8884d8"}
                    onChangeComplete={handleColorChange}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {identifiedColumns.length === 0 && (
        <p>Nenhuma coluna necessária foi identificada no arquivo.</p>
      )}
    </div>
  );
};

export default Dashboard;
