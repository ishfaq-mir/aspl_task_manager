const { PrismaClient } = require("@prisma/client");
class Managers {
  #prisma;
  constructor() {
    this.#prisma = new PrismaClient();
  }
  async createManager(body) {
    console.log(
      "here is the prisma client",
      await this.#prisma.managers.create({
        data: {
          firstName: "ishfaq",
          lastName: "hussain",
          department: "Digital Marketing",
        },
      })
    );
  }

  async updateManager(id, body) {}

  //   async deleteManager()
}
module.exports = { Managers };
