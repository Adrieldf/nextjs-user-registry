import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../_lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const userId = req.query.id as string;

      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.status(200).json({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        mobileNumber: user.mobileNumber,
        dateOfBirth: user.dateOfBirth?.toISOString(),
        username: user.username,
        password: user.password,
        createdAt: user.createdAt?.toISOString(),
        updatedAt: user.updatedAt?.toISOString()
      });
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while fetching user data" });
      console.log(error);
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
