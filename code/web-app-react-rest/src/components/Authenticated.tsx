import React from "react";
import Demo from "./demos/rest/Demo";
import DynamicTable, { CellData } from "./table/DynamicTable";

interface AuthenticatedProps {
  user_info: Record<string, any>;
  logout: () => void;
  csrf: string;
}

const Authenticated: React.FC<AuthenticatedProps> = ({
  user_info,
  logout,
  csrf,
}) => {
  const rows = 7; // Days of the week
  const columns = 6; // Time intervals

  const mockData: CellData[][] = Array.from({ length: rows }).map(() =>
    Array.from({ length: columns }).map(() => ({
      assigned: Math.floor(Math.random() * 30),
    })),
  );

  return (
    <div>
      <div>Authenticated as: {JSON.stringify(user_info)}</div>
      <button onClick={logout}>Logout</button>
      <DynamicTable initialColumns={6} initialRows={7} data={mockData} />;
    </div>
  );
};

export default Authenticated;
