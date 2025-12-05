const express = require("express");
const NomineeController = require("../controllers/NomineesController");
const router = express.Router();

router.get("/", NomineeController.getAllNominees);
router.get("/:id", NomineeController.getNomineeById); // for EditNominee
router.post("/", NomineeController.createNominees);
router.put("/:id", NomineeController.updateNominee);  // for EditNominee
router.delete("/:id", NomineeController.deleteNominee);

module.exports = router;
