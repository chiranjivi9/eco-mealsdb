import request from "supertest";

import app from "../src/index";

describe("Test index.ts", () => {
  test("base route", async () => {
    const res = await request(app).get("/");
    expect(res.status).toEqual(200);
  });

  test("invalid route", async () => {
    const res = await request(app).get("/invalid-route");
    console.log("Res ,", res);
    expect(res.status).toEqual(404);
    expect(res.body).toEqual({
      isSuccess: false,
      status: 404,
      message: "Not Found",
    });
  });

  test("POST /api/meals/ingredient", async () => {
    const res = await request(app).post("/api/meals/ingredient");
    console.log("Res ,", res);
    expect(res.status).toEqual(400);
    expect(res.body).toEqual({
      isSuccess: false,
      status: 400,
      message: "API key is missing",
    });
  });
});
