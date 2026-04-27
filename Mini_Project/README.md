# Flight Route Planner

A full-stack web application that allows users to add flight routes and compute the **shortest path (minimum cost)** between two cities using **Dijkstra's Algorithm**.

---

## Features

* Add flight routes (Source -> Destination with cost)
* View all available flights
* Compute shortest path using Dijkstra Algorithm
* Displays:

  * Minimum cost
  * Complete path (e.g., Delhi -> Jaipur -> Goa)

---

## Tech Stack

### Frontend

* HTML
* Bootstrap

### Backend

* Node.js
* Express.js

### Database

* MongoDB (Mongoose)

---

## Algorithm Used

This project uses **Dijkstra’s Algorithm** to calculate the shortest path between two nodes in a weighted graph.

* Graph is dynamically built from MongoDB data
* Each flight acts as a directed edge with cost as weight

---

## Project Structure

```
flight-planner/
│
├── models/
│   └── Flight.js
│
├── routes/
│   └── flightRoutes.js
│
├── public/
│   └── index.html
│
├── server.js
├── package.json
```

---

## ScreenShot

<img width="1920" height="1020" alt="Screenshot 2026-04-27 173344" src="https://github.com/user-attachments/assets/40cf9d9b-4acd-4024-b878-f92986fe8038" />


