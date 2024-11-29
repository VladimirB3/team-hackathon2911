import React from "react";

import {DaySchedule} from "../../rest/modules/top_level"

interface ScheduleProps {
  schedule: DaySchedule[];
}

const DynamicTable: React.FC<ScheduleProps> = ({ schedule }) => {
  return (
      <div style={{ padding: "20px" }}>
        <table style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
          <tr>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Day</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Time</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Employees</th>
          </tr>
          </thead>
          <tbody>
          {schedule.map((daySchedule, dayIndex) => (
              <React.Fragment key={dayIndex}>
                {daySchedule.shifts.map((shift, shiftIndex) => (
                    <tr key={`${dayIndex}-${shiftIndex}`}>
                      {/* Merge cells for the day */}
                      {shiftIndex === 0 && (
                          <td
                              rowSpan={daySchedule.shifts.length}
                              style={{
                                border: "1px solid #ddd",
                                padding: "8px",
                                verticalAlign: "top",
                                textAlign: "center",
                              }}
                          >
                            {daySchedule.day}
                          </td>
                      )}
                      <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                        {shift.start}:00 - {shift.end}:00
                      </td>
                      <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                        {shift.employees.join(", ")}
                      </td>
                    </tr>
                ))}
              </React.Fragment>
          ))}
          </tbody>
        </table>
      </div>
  );
};

export default DynamicTable;
