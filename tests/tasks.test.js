const request = require("supertest");
const app = require("../src/app");

describe("Task API", () => {
  beforeEach(async () => {
    await request(app).post("/api/tasks/reset");
  });

  it("retourne un status ok sur /health", async () => {
    const response = await request(app).get("/health");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ status: "ok" });
  });

  it("retourne la liste des taches", async () => {
    const response = await request(app).get("/api/tasks");
    expect(response.statusCode).toBe(200);
    expect(response.body.tasks).toHaveLength(2);
  });

  it("cree une tache valide", async () => {
    const response = await request(app)
      .post("/api/tasks")
      .send({ title: "Ajouter les smoke tests" });

    expect(response.statusCode).toBe(201);
    expect(response.body.title).toBe("Ajouter les smoke tests");
  });

  it("rejette une tache invalide", async () => {
    const response = await request(app).post("/api/tasks").send({});
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toMatch(/title est requis/i);
  });
});
