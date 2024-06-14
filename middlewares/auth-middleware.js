const { PrismaClient } = require("@prisma/client");
const { Tokens } = require("../controllers/token-controller");
const authMiddleWare = async function (req, res, next) {
  try {
    const prisma = new PrismaClient();
    const bearer = req.headers["authorization"];
    const token = bearer.split(" ")[1];
    const verifiedToken = Tokens.verifyToken(token);
    const user = await prisma.teammembers.findFirst({
      where: {
        officeEmail: verifiedToken.officeEmail,
      },
    });

    console.log(user);
    console.log("tokenUser", verifiedToken);

    if (!user) {
      throw new Error("User not found");
    }

    if (
      verifiedToken.officeEmail !== user.officeEmail ||
      verifiedToken.password !== user.password
    ) {
      throw new Error(`UnAuthenticated`);
    }
    next();
  } catch (error) {
    res.status(401).json({ status: "error", message: error.message });
  }
};

module.exports = { authMiddleWare };
