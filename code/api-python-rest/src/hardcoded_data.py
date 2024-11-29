import json

# Employee availability (Start time, end time, day)
employee_availability = {
    'A': [(10, 14, 0), (12, 16, 1), (12, 18, 2), (18, 23, 3), (6, 20, 4)],
    'B': [(10, 14, 0), (12, 16, 1), (12, 18, 2), (18, 23, 3), (6, 20, 4)],
    'C': [(8, 18, 0), (8, 18, 1), (8, 18, 2), (8, 18, 3), (8, 18, 4)],
    'D': [(0, 24, 0), (0, 24, 1), (0, 24, 2)],
    'E': [(14, 20, 0), (16, 22, 1), (8, 14, 2), (10, 16, 3), (12, 18, 4)],
    'F': [(6, 12, 0), (6, 12, 1), (6, 12, 2), (6, 12, 3), (6, 12, 4)],
    'G': [(10, 18, 0), (14, 20, 1), (16, 22, 2), (18, 24, 3), (10, 14, 4)],
    'H': [(10, 16, 0), (12, 18, 1), (14, 20, 2), (8, 14, 3), (16, 22, 4)],
    'I': [(6, 14, 0), (8, 16, 1), (10, 18, 2), (12, 20, 3), (14, 22, 4)],
    'J': [(8, 18, 0), (10, 20, 1), (12, 22, 2), (14, 24, 3), (6, 16, 4)],
    'K': [(12, 20, 0), (14, 22, 1), (16, 24, 2), (8, 18, 3), (10, 20, 4)],
    'L': [(14, 22, 0), (16, 24, 1), (8, 18, 2), (10, 20, 3), (12, 22, 4)],
    'M': [(6, 16, 0), (8, 18, 1), (10, 20, 2), (12, 22, 3), (14, 24, 4)],
    'N': [(8, 20, 0), (10, 22, 1), (12, 24, 2), (6, 18, 3), (8, 20, 4)],
    'O': [(10, 22, 0), (12, 24, 1), (6, 18, 2), (8, 20, 3), (10, 22, 4)],
    'P': [(12, 24, 0), (6, 18, 1), (8, 20, 2), (10, 22, 3), (12, 24, 4)],

}


# Desired shifts (start time, end time, day, number of shifts)
desired_shifts = {
    0: [(6, 12, 1), (12, 18, 2), (18, 24, 3)],
    1: [(6, 12, 1), (12, 18, 1), (18, 24, 1)],
    3: [(6, 12, 2), (12, 18, 2), (18, 24, 2)],
    4: [(6, 12, 2), (12, 18, 2), (18, 24, 2)],
    5: [(6, 12, 2), (12, 18, 2), (18, 24, 2)],
    6: [(6, 12, 2), (12, 18, 2), (18, 24, 2)],
}

print(json.dumps(desired_shifts))