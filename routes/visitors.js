const router = require("express").Router();
let Visitor = require("../models/visitor");

router.route("/").get((req, res) => {
  Visitor.find()
    .then((visitors) => res.json(visitors))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const phone = Number(req.body.phone);
  const message = req.body.message;

  const newVisitor = new Visitor({
    name,
    email,
    phone,
    message,
  });

  newVisitor
    .save()
    .then(() => res.json("Enquiry added!"))
    .catch((err) => res.status(400).josn("Error: " + err));
});

module.exports = router;
