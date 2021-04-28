import Admin from "../models/admin.model.js";
import asyncHander from "express-async-handler";
import generateToken from "../utils/generateToken.js";

const authAdmin = asyncHander(async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });
  if (admin && (await admin.matchPassword(password))) {
    res.json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      token: generateToken(admin._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

const registerAdmin = asyncHander(async (req, res) => {
  const { name, email, password } = req.body;
  const adminExists = await Admin.findOne({ email });
  if (adminExists) {
    res.status(400);
    throw new Error("Admin already exists");
  }

  const admin = await Admin.create({
    name,
    email,
    password,
  });

  if (admin) {
    res.status(201).json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      token: generateToken(admin._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Admin Data");
  }
});

const getAdminProfile = asyncHander(async (req, res) => {
  const admin = await Admin.findById(req.admin._id);
  if (admin) {
    res.json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
    });
  } else {
    res.status(404);
    throw new Error("Admin not found");
  }
});

const updateAdminProfile = asyncHander(async (req, res) => {
  const admin = await Admin.findById(req.admin._id);
  if (admin) {
    admin.name = req.body.name || admin.name;
    admin.email = req.body.email || admin.email;
    if (req.body.password) {
      admin.password = req.body.password;
    }
    const updatedAdmin = await admin.save();
    res.json({
      _id: updatedAdmin._id,
      name: updatedAdmin.name,
      email: updatedAdmin.email,
      token: generateToken(updatedAdmin._id),
    });
  } else {
    res.status(404);
    throw new Error("Admin not found");
  }
});

const getAdmins = asyncHander(async (req, res) => {
  const admins = await Admin.find({});
  res.json(admins);
});

const deleteAdmin = asyncHander(async (req, res) => {
  const admin = await Admin.findById(req.params.id);
  if (admin) {
    await admin.remove();
    res.json({ message: "Admin Removed" });
  } else {
    res.status(404);
    throw new Error("Admin not found");
  }
});

const getAdminById = asyncHander(async (req, res) => {
  const admin = await Admin.findById(req.params.id).select("-password");
  if (admin) {
    res.json(admin);
  } else {
    res.status(404);
    throw new Error("Admin not found");
  }
});

const updateAdmin = asyncHander(async (req, res) => {
  const admin = await Admin.findById(req.params.id);
  if (admin) {
    admin.name = req.body.name || admin.name;
    admin.email = req.body.email || admin.email;
    if (req.body.password) {
      admin.password = req.body.password;
    }
    const updatedAdmin = await admin.save();
    res.json({
      _id: updatedAdmin._id,
      name: updatedAdmin.name,
      email: updatedAdmin.email,
    });
  } else {
    res.status(404);
    throw new Error("Admin not found");
  }
});

export {
  authAdmin,
  getAdminProfile,
  registerAdmin,
  updateAdminProfile,
  getAdmins,
  deleteAdmin,
  getAdminById,
  updateAdmin,
};
