import React, { useState } from "react";

export interface CellData {
  assigned: number;
}

interface TableProps {
  initialColumns: number;
  initialRows: number;
  data: CellData[][];
}

const DynamicTable: React.FC<TableProps> = ({
  initialColumns,
  initialRows,
  data,
}) => {
  const [columns, setColumns] = useState(initialColumns);

  const handleColumnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setColumns(Number(event.target.value));
  };

  return (
    <div style={{ padding: "20px" }}>
      <label>
        Shift variation:
        <input
          type="number"
          value={columns}
          onChange={handleColumnChange}
          min="1"
          style={{ textAlign: 'center', margin: '10px', width: '60px' }}
        />
      </label>

      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Time</th>
            {Array.from({ length: columns }).map((_, colIndex) => (
              <th
                key={colIndex}
                style={{ border: "1px solid #ddd", padding: "8px" }}
              >
                Column {colIndex + 1}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: initialRows }).map((_, rowIndex) => (
            <tr key={rowIndex}>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                Row {rowIndex + 1}
              </td>
              {Array.from({ length: columns }).map((_, colIndex) => (
                <td
                  key={colIndex}
                  style={{ border: "1px solid #ddd", padding: "8px" }}
                >
                  <div>
                    <p>Assigned: {data[rowIndex][colIndex]?.assigned || 0}</p>
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DynamicTable;
