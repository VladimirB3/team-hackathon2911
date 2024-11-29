import React, { useMemo, useState, useEffect, useCallback }  from "react";
import Demo from "./demos/rest/Demo";
import DynamicTable from "./table/DynamicTable";
import Example from "./NavigationBar";
import NavigationBar from "./NavigationBar";
import { ApiClientRest } from '../rest/api_client_rest'

import {DaySchedule, Shift, ScheduleData} from "../rest/modules/top_level"

/*

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
 */

interface AuthenticatedProps {
    user_info: Record<string, any>;
    logout: () => void;
    csrf: string;
}

const Authenticated: React.FC<AuthenticatedProps> = ({
                                                         user_info,
                                                         logout,
                                                         csrf
                                                     }) => {

    const client = useMemo(() => new ApiClientRest(csrf), [csrf])


const [modifyText, setNewModifyText] = useState("")


    const [schedule, setSchedule] = useState<DaySchedule[]>([])

     const [loading, setLoading] = useState(true)
     const [error, setError] = useState<string | null>(null)

     const handleError = useCallback((message: string, details?: any) => {
         console.error(`Error: ${message}`, details)
         setError(`${message}${details ? `: ${JSON.stringify(details)}` : ''}`)
     }, [])

     const fetchSchedule = useCallback(async () => {
         try {
             const scheduleData = await client.schedule()

             console.log(scheduleData)

             setSchedule(scheduleData.schedule)
             setLoading(false)
         } catch (err) {
             handleError('Error fetching items', err)
             setLoading(false)
         }
     }, [client.schedule, handleError])

    useEffect(() => {
         fetchSchedule()
     }, [fetchSchedule])

    if (error) return <p className="text-error p-4">{'Error: ' + error}</p>


const handleModifyText = async () => {
    const modifyTextToSend = modifyText || "Do nothing"

    if (!modifyTextToSend) return

    try {
        const scheduleData = await client.schedulePost(modifyTextToSend)

         console.log(scheduleData)

         setSchedule(scheduleData.schedule)
         setLoading(false)
    } catch (err) {
        handleError('Error adding item', err)
        setLoading(false)
    }
}

    return (
        <div>
            <NavigationBar user_info={user_info} logout={logout} />
            <div className="join">
                                            <textarea
                                                style={{ width: '500px', height: '200px',
                                                margin: '10px',
                                                padding: '8px'}}

                                                placeholder="Modify the schedule"
                                                value={modifyText}
                                                onChange={(e) => setNewModifyText(e.target.value)}
                                            />
                                            <button
                                                className="join-item btn btn-square btn-md btn-primary"
                                                onClick={handleModifyText}
                                            >
                                                Do Magic!

                                            </button>
                                        </div>
            <DynamicTable schedule={schedule} />,
            <div style={{ textAlign: "right" }}>
                <button onClick={logout}>avwevwv</button>
            </div>
        </div>
    );
};

export default Authenticated;
