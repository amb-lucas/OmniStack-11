const request = require("supertest");
const app = require("../../src/app");
const connection = require("../../src/database/connection");

describe("ONG", () => {
  beforeAll(async () => {
    await connection.migrate.latest();
  });
  afterAll(async () => {
    await connection.migrate.rollback();
    await connection.destroy();
  });

  describe("creation", () => {
    const sampleOngParams = {
      name: "Anjinhos do poço",
      email: "anjos@gmail.com",
      whatsapp: "5511000000000",
      city: "Natal",
      uf: "RN"
    };

    it("should be able to create a new ONG", async () => {
      const response = await request(app)
        .post("/ongs")
        .send(sampleOngParams);

      expect(response.body).toHaveProperty("id");
      expect(response.body.id).toHaveLength(8);
    });
  });
});
