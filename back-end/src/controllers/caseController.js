const connection = require("../database/connection");

module.exports = {
  async index(request, response) {
    const { page = 1 } = request.query;
    const limit = 5;
    const offset = (page - 1) * limit;

    const [countQuery] = await connection("cases")
      .select("*")
      .count();

    const count = countQuery["count(*)"];
    response.header("X-Total-Count", count);

    const cases = await connection("cases")
      .join("ongs", "ongs.id", "=", "cases.ong_id")
      .limit(limit)
      .offset(offset)
      .select(
        "cases.id",
        "cases.title",
        "cases.description",
        "cases.value",
        "ongs.name",
        "ongs.whatsapp",
        "ongs.email",
        "ongs.city",
        "ongs.uf"
      );

    return response.json(cases);
  },

  async create(request, response) {
    const { title, description, value } = request.body;
    const ong_id = request.headers.authorization;

    const result = await connection("cases").insert({
      title,
      description,
      value,
      ong_id
    });

    const [id] = result;

    return response.json({ id });
  },

  async delete(request, response) {
    const { id } = request.params;
    const ong_id = request.headers.authorization;

    const cases = await connection("cases")
      .where("id", id)
      .select("ong_id");

    if (cases.length === 0) return response.status(410).send();

    const caso = cases.first();
    if (caso.ong_id !== ong_id) {
      return response.status(401).json({
        error: "Operation not allowed"
      });
    }

    await connection("cases")
      .where("id", id)
      .delete();

    return response.status(204).send();
  }
};
