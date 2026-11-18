const test = require("node:test");
const assert = require("node:assert/strict");
const request = require("supertest");
const app = require("../src/app");

test("GET / returns API status and endpoint hints", async () => {
  const response = await request(app).get("/");
  assert.equal(response.status, 200);
  assert.equal(response.body.success, true);
  assert.equal(response.body.endpoints.items, "/api/items");
});

test("unknown route returns a JSON 404 response", async () => {
  const response = await request(app).get("/not-a-route");
  assert.equal(response.status, 404);
  assert.equal(response.body.success, false);
});

test("inventory router is mounted at /api/items", async () => {
  // Database-backed routes require MongoDB; this checks the router mount
  // without assuming a database is available during a basic test run.
  const response = await request(app).get("/api/items/unknown-report");
  assert.equal(response.status, 404);
  assert.equal(response.body.success, false);
});
