const router = require("express").Router();
const {
  createPlace,
  deletePlace,
  getPlaces,
} = require("../controller/apiController");

router.get("/get-places", getPlaces);

//posters
router.post("/add-place", createPlace);
router.post("/delete-place/:_id", deletePlace);

module.exports = router;
