const { PrismaClient } = require("@prisma/client");
class Tasks {
  #prisma;
  constructor() {
    this.#prisma = new PrismaClient();
  }
  async createTask(body) {
    const { memberId, description, timeStamps } = body;
    let ts = [timeStamps];

    await this.#prisma.tasks.create({
      data: { memberId, description, timeStamps: ts },
    });

    return {
      message: "Task successfully created",
    };
  }

  async readTasks() {
    return await this.#prisma.tasks.findMany();
  }

  async updateTask(id, body) {
    try {
      const currentTask = await this.#prisma.tasks.findUnique({
        where: {
          id: parseInt(id),
        },
      });

      if (body.description) {
        currentTask.description = body.description;
      }

      if (body.timeStamps) {
        currentTask.timeStamps.push(body.timeStamps);
      }

      await this.#prisma.tasks.update({
        where: { id: parseInt(id) },
        data: {
          ...currentTask,
        },
      });
      return {
        message: "Task updated successfully",
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteTask(id) {
    try {
      await this.#prisma.tasks.delete({
        where: {
          id: parseInt(id),
        },
      });

      return {
        message: "Task removed successfully",
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = { Tasks };
