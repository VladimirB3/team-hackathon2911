from ortools.sat.python import cp_model

def build_schedule(employee_availability, desired_shifts):

    num_days = len(desired_shifts)
    employees = list(employee_availability.keys())
    num_employees = len(employees)

    model = cp_model.CpModel()

    # Create variables
    shifts = {}
    for day in desired_shifts:
        for shift_data in desired_shifts[day]:
            start, end, num_shifts = shift_data
            for i in range(num_shifts):
                for emp in employees:
                    shifts[(emp, day, start, end)] = model.NewBoolVar(f'shift_{emp}_{day}_{start}_{end}_{i}')

    # Constraints

    # Each shift must be covered
    for day in desired_shifts:
        for shift_data in desired_shifts[day]:
            start, end, num_shifts = shift_data
            model.Add(sum(shifts[(emp, day, start, end)] for emp in employees) == num_shifts)


    # Employee availability constraints
    for emp, avail in employee_availability.items():
        for day, start_time, end_time in avail:
            for d in desired_shifts:
                for shift_data in desired_shifts[d]:
                    s, e, num_shifts = shift_data
                    if d == day:
                        for i in range(num_shifts):
                            if not (s >= start_time and e <= end_time):
                                model.Add(shifts[(emp, d, s, e)] == 0)


    # Each employee must have at least one shift
    for emp in employees:
        model.Add(sum(shifts[(emp, day, start, end)] for day in desired_shifts for shift_data in desired_shifts[day] for start, end, num_shifts in [shift_data] for i in range(num_shifts)) >= 1)

    # Solve the model
    solver = cp_model.CpSolver()
    status = solver.Solve(model)

    res = {}

    days_mapping = {
        0: "Monday",
        1: "Tuesday",
        2: "Wednesday",
        3: "Thursday",
        4: "Friday",
        5: "Saturday",
        6: "Sunday",
        "0": "Monday",
        "1": "Tuesday",
        "2": "Wednesday",
        "3": "Thursday",
        "4": "Friday",
        "5": "Saturday",
        "6": "Sunday"
    }

    # Print the solution
    if status == cp_model.OPTIMAL or status == cp_model.FEASIBLE:
        print("Solution found:")
        res["schedule"] = []
        for day in desired_shifts:
            print(f"Day {day}:")
            res_day = {"day": days_mapping[day], "shifts": []}
            for shift_data in desired_shifts[day]:

                start, end, num_shifts = shift_data
                res_shift = {
                    "start": start,
                    "end": end,
                    "employees": []
                }
                print(f"  Shift {start}-{end}:")
                for emp in employees:
                    if solver.Value(shifts[(emp, day, start, end)]) == 1:
                        print(f"    Employee {emp}")
                        res_shift["employees"].append(f"Employee {emp}")
                res_day["shifts"].append(res_shift)
            res["schedule"].append(res_day)
    else:
        print("No solution found.")
    return res
