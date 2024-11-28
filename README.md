# team-hackathon2911
This repository hosts the source code and resources for the Weather-Driven Employee Scheduling System, developed for the Stockholm Hackathon on November 29, 2024. The system optimizes manpower allocation for delivery companies by integrating weather data, predefined customer activity levels, and AI-powered demand predictions.

# Run locally
```
cillers run stack-rest-local
```

## GCP Application auth

To use Gemini in the `schedule` endpoint, the app needs to be authorised in GCP:
```
gcloud auth application-default login
```