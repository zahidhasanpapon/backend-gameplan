import bcrypt from "bcryptjs";

const users = [
  {
    name: "Gameplan Admin",
    email: "admin@gameplan.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Gameplan Admin Two",
    email: "adminTwo@gameplan.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;
