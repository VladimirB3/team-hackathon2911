import base64
import json

import vertexai
from vertexai.generative_models import GenerativeModel, Part, SafetySetting


def generate(desired_shifts, text_requirements):
    vertexai.init(project="level-lyceum-443016-s9", location="us-central1")
    model = GenerativeModel(
        "gemini-1.5-flash-002",
    )


    responses = model.generate_content(
        [f"""
        Provided this json data:
# Desired shifts per day of the week (start time, end time, day, number of employees per shift)
{json.dumps(desired_shifts)}

Change it to accommodate following requirements:

{text_requirements}

Return only modified JSON as plain text, no explanation, no markdown
        """],
        generation_config=generation_config,
        safety_settings=safety_settings,
        stream=True,
    )

    return json.loads("".join([response.text for response in responses]))


generation_config = {
    "max_output_tokens": 8192,
    "temperature": 1,
    "top_p": 0.95,
}

safety_settings = [
    SafetySetting(
        category=SafetySetting.HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold=SafetySetting.HarmBlockThreshold.OFF
    ),
    SafetySetting(
        category=SafetySetting.HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold=SafetySetting.HarmBlockThreshold.OFF
    ),
    SafetySetting(
        category=SafetySetting.HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold=SafetySetting.HarmBlockThreshold.OFF
    ),
    SafetySetting(
        category=SafetySetting.HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold=SafetySetting.HarmBlockThreshold.OFF
    ),
]

#generate()