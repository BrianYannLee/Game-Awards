const express = require("express");
const NomineeController = require("../controllers/NomineesController");
const router = express.Router();

router.get("/", NomineeController.getAllNominees);
router.post("/", NomineeController.createNominees);
router.put("/", NomineeController.updateNominees);
router.delete("/:id", NomineeController.deleteNominee);

module.exports = router;