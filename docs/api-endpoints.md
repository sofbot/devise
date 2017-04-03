# API Endpoints

## JSON API

### Users

- `POST /api/users`
- `PATCH /api/users`

### Session

- `POST /api/session`
- `DELETE /api/session`

### Userevents (timeline)

- `POST /api/events`
  - adds the event with a boolean liked into the database
- `GET /api/events`
  - returns the users chosen events (timeline) and rejected events (frontend filtering)

### Event Scraping

- `GET /api/datasource`
  - Index search route
  - will take in a POJO filter object and return relevant results

### Invitations

- `POST /api/invitations`
  - Stores the invitations that the user sent
