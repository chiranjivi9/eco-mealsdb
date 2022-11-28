import request from "supertest";

import app from "../src/index";

describe("Test index.ts", () => {
  test("base route", async () => {
    const res = await request(app).get("/");
    expect(res.status).toEqual(200);
  });

  test("invalid route", async () => {
    const res = await request(app).get("/invalid-route");
    expect(res.status).toEqual(404);
    expect(res.body).toEqual({
      isSuccess: false,
      status: 404,
      message: "Not Found",
    });
  });

  test("GET /api/meals", async () => {
    const res = await request(app).get("/api/meals");
    expect(res.status).toEqual(401);
    expect(res.body).toEqual({
      isSuccess: false,
      status: 401,
      message: "API key is missing",
    });
  });
});
