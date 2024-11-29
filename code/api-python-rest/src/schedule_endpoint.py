import json

from or_tools import build_schedule
from hardcoded_data import employee_availability, desired_shifts


def schedule(desired_shifts):
    return json.dumps(build_schedule(employee_availability, desired_shifts), indent = 2)