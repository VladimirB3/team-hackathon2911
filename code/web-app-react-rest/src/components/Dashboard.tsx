import DynamicTable, { CellData } from "./table/DynamicTable";

const Dashboard: React.FC = () => {
  const rows = 7; // Days of the week
  const columns = 6; // Time intervals

  const mockData: CellData[][] = Array.from({ length: rows }).map(() =>
    Array.from({ length: columns }).map(() => ({
      assigned: Math.floor(Math.random() * 30),
    })),
  );
  return <DynamicTable initialColumns={6} initialRows={7} data={mockData} />;
};

export default Dashboard;
