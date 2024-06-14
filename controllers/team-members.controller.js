const { PrismaClient } = require("@prisma/client");
const { Tokens } = require("../controllers/token-controller");

class TeamMembers {
  #prisma;
  constructor() {
    this.#prisma = new PrismaClient();
  }
  async createATeamMember(body) {
    try {
      const {
        officeEmail,
        firstName,
        lastName,
        password,
        confirmPassword,
        department,
        managerId,
        designation,
      } = body;

      const user = await this.#prisma.teammembers.findFirst({
        where: {
          officeEmail,
        },
      });

      if (user) {
        throw new Error("User already registered");
      }
      if (password !== confirmPassword) {
        throw new Error("Password does not match");
      }

      const token = Token.token(officeEmail, password);

      const record = await this.#prisma.teammembers.create({
        data: {
          firstName,
          lastName,
          managerId,
          officeEmail,
          password,
          department,
          designation,
        },
      });
      return { ...record, token };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async readMembers() {
    try {
      return await this.#prisma.teammembers.findMany({});
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async updateMember(id, body) {
    try {
      await this.#prisma.teammembers.update({
        where: { id: parseInt(id) },
        data: {
          ...body,
        },
      });
      return { message: "Profile update successfully" };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteMember(id) {
    try {
      await this.#prisma.teammembers.delete({
        where: { id: parseInt(id) },
      });
      return { message: "Member deleted successfully" };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async login(officeEmail, password) {
    const user = await this.#prisma.teammembers.findFirst({
      where: {
        officeEmail,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return { data: { ...user }, token: Tokens.token(officeEmail, password) };
  }
}
module.exports = { TeamMembers };
