const connection = require("../database/index");

module.exports = {
  async index(request, response) {
    const ong_id = request.headers.authorization;

    const cases = await connection("cases")
      .where("ong_id", ong_id)
      .select("*");

    return response.json(cases);
  }
};
