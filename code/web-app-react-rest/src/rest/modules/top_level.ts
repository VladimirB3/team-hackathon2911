import { ApiClientInterface } from '../types';

export interface ScheduleData {
    schedule:DaySchedule[];
    }


export interface Shift {
  start: number;
  end: number;
  employees: string[];
}

export interface DaySchedule {
  day: string;
  shifts: Shift[];
}


export function create(client: ApiClientInterface) {
    return {
        schedule(): Promise<ScheduleData> {
                    const on_error = (messages: string[]) => {
                        console.error('Error in schedule API:', messages);
                    };
                    return client.get<ScheduleData>('/api/schedule', on_error);
                },

          schedulePost(modifyTextToSend: string): Promise<ScheduleData> {
                        const on_error = (messages: string[]) => {
                            console.error('Error in schedule API:', messages);
                        };
                        return client.post<ScheduleData>('/api/schedule?text_requirements=' + modifyTextToSend, on_error, {});
                    },

        hello(): Promise<{ message: string }> {
            const on_error = (messages: string[]) => {
                console.error('Error in hello API:', messages);
            };
            return client.get<{ message: string }>('/api/hello', on_error);
        },

        hello_admin(): Promise<{ message: string }> {
            const on_error = (messages: string[]) => {
                console.error('Error in hello admin API:', messages);
            };
            return client.get<{ message: string }>('/api/hello_admin', on_error);
        }
    };
}

export const isTopLevel = true;
