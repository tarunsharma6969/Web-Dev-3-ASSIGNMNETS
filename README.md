# Student Record REST API - Assignment 2

## Run
```bash
npm install
npm start
```

Server: http://localhost:3000

## Routes
- GET `/` - API status
- GET `/students` - list all students
- GET `/students/:id` - get one student
- POST `/students` - add a student
- PUT `/students/:id` - update a student
- DELETE `/students/:id` - delete a student
- Any unknown route returns 404

POST/PUT JSON example:
```json
{
  "name": "Riya",
  "age": 20,
  "course": "BTech"
}
```
