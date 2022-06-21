const {
  createNewLocation,
  editLocation,
  deleteLocation,
  getAllLocations,
  getSpecificLocation,
  calculateDistance,
} = require("../controllers/itemController");

const router = require("express").Router();
router.post("/", createNewLocation);
router.patch("/:oldLocation", editLocation);
router.delete("/", deleteLocation);
router.get("/all", getAllLocations);
router.get("/specific", getSpecificLocation);
router.get("/calculate", calculateDistance);
module.exports = router;
