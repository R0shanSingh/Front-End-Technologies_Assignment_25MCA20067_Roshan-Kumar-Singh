const express = require("express");
const router = express.Router();
const Flight = require("../models/Flight");

// Add flight
router.post("/", async (req, res) => {
    const flight = new Flight(req.body);
    await flight.save();
    res.send(flight);
});

// Get all flights
router.get("/", async (req, res) => {
    const flights = await Flight.find();
    res.send(flights);
});

// Shortest path (Dijkstra with path)
router.get("/shortest/:src/:dest", async (req, res) => {
    const flights = await Flight.find();

    let graph = {};

    // ✅ FIX 1: Build complete graph (include destination nodes)
    flights.forEach(f => {
        if (!graph[f.source]) graph[f.source] = {};
        if (!graph[f.destination]) graph[f.destination] = {}; // 🔥 important

        graph[f.source][f.destination] = f.cost;
    });

    function dijkstra(graph, start) {
        let dist = {}, prev = {}, visited = [];

        // initialize
        for (let node in graph) {
            dist[node] = Infinity;
            prev[node] = null;
        }

        dist[start] = 0;

        while (visited.length < Object.keys(graph).length) {

            let candidates = Object.keys(graph).filter(n => !visited.includes(n));

            if (candidates.length === 0) break;

            let u = candidates.reduce((a, b) => dist[a] < dist[b] ? a : b);

            visited.push(u);

            for (let v in graph[u]) {
                let alt = dist[u] + graph[u][v];

                if (alt < dist[v]) {
                    dist[v] = alt;
                    prev[v] = u;
                }
            }
        }

        return { dist, prev };
    }

    const { dist, prev } = dijkstra(graph, req.params.src);

    // ✅ FIX 2: Handle no path case
    if (dist[req.params.dest] === undefined || dist[req.params.dest] === Infinity) {
        return res.send({
            cost: "No path",
            path: []
        });
    }

    // ✅ FIX 3: Build path
    let path = [];
    let curr = req.params.dest;

    while (curr) {
        path.unshift(curr);
        curr = prev[curr];
    }

    res.send({
        cost: dist[req.params.dest],
        path: path
    });
});

module.exports = router;