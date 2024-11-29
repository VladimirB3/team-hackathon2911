import React from "react";
import Demo from "./demos/rest/Demo";
import DynamicTable from "./table/DynamicTable";
import Example from "./NavigationBar";
import NavigationBar from "./NavigationBar";

const scheduleData = {
    schedule: [
        {
            day: "Monday",
            shifts: [
                {
                    start: 6,
                    end: 12,
                    employees: ["Employee A", "Employee B", "Employee C"],
                },
                {
                    start: 12,
                    end: 18,
                    employees: ["Employee A"],
                },
            ],
        },
        {
            day: "Tuesday",
            shifts: [
                {
                    start: 6,
                    end: 12,
                    employees: ["Employee E", "Employee C"],
                },
            ],
        },
    ],
};

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
    return (
        <div>
            <NavigationBar user_info={user_info} logout={logout} />
            <DynamicTable schedule={scheduleData.schedule} />,
            <div style={{ textAlign: "right" }}>
                <button onClick={logout}>avwevwv</button>
            </div>
        </div>
    );
};

export default Authenticated;
