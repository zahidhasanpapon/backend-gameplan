const router = require("express").Router();
let Number = require("../models/number");

router.route("/sendlink").post((req, res) => {
  // Database
  const phone = Number(req.body.phone);
  console.log(req.body.phone);
  const newNumber = new Number({
    phone,
  });

  newNumber
    .save()
    .then(() => res.json("Enquiry added!"))
    .catch((err) => res.status(400).josn("Error: " + err));

  // res.send(req.body);
  // console.log(req.body);

  const number = "8801626321101";
  // const { number } = req.body;
});

module.exports = router;
