from ortools.sat.python import cp_model

# Employee availability (Start time, end time, day)
employee_availability = {
    'A': [(10, 14, 0), (12, 16, 1), (12, 18, 2), (18, 23, 3), (6, 20, 4)],
    'B': [(10, 14, 0), (12, 16, 1), (12, 18, 2), (18, 23, 3), (6, 20, 4)],
    'C': [(8, 18, 0), (8, 18, 1), (8, 18, 2), (8, 18, 3), (8, 18, 4)],
    'D': [(0, 24, 0), (0, 24, 1), (0, 24, 2)],
    'E': [(14, 20, 0), (16, 22, 1), (8, 14, 2), (10, 16, 3), (12, 18, 4)],
    'F': [(6, 12, 0), (6, 12, 1), (6, 12, 2), (6, 12, 3), (6, 12, 4)],
    'G': [(10, 18, 0), (14, 20, 1), (16, 22, 2), (18, 24, 3), (10, 14, 4)],

}


# Desired shifts (start time, end time, day, number of shifts)
desired_shifts = {
    0: [(6, 12, 1), (12, 18, 2), (18, 24, 3)],
    1: [(6, 12, 1), (12, 18, 1), (18, 24, 1)],
    2: [(6, 12, 2), (12, 18, 2), (18, 24, 2)],
}

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
                shifts[(emp, day, start, end)] = model.NewBoolVar(f'{emp}_{day}_{start}_{end}_{i}')

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
                    if (s >= start_time and e <= end_time):
                        continue
                    else:
                        for i in range(num_shifts):
                            model.Add(shifts[(emp, d, s, e)] == 0)

# Solve the model
solver = cp_model.CpSolver()
status = solver.Solve(model)

# Print the solution
if status == cp_model.OPTIMAL or status == cp_model.FEASIBLE:
    print("Solution found:")
    for day in desired_shifts:
        print(f"Day {day}:")
        for shift_data in desired_shifts[day]:
            start, end, num_shifts = shift_data
            for emp in employees:
                if solver.Value(shifts[(emp, day, start, end)]) == 1:
                    print(f"  {start}-{end}: {emp}")
else:
    print("No solution found.")