# API Endpoints

## JSON API

### Events (new events)

- `GET /events/user_id/offset`
  - returns new events for the user to see
  - 10 events are returned, offset is the number of the first returned event, use 0,10,20,30 etc
  - Events are scraped if they are not already in the db


### Userevents (timeline events)

- `GET /userevents/user_id`
  - returns the user's timeline events with end time > now for today
- `POST /userevents`
  - stores the liked/rejected event in the backend
