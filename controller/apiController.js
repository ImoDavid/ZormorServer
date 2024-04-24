const Place = require("../model/placeModel");
const { uploadImg } = require("../config/cloudinary");

const createPlace = async (req, res) => {
  try {
    const { name, description, location, openHours } = req.body;

    if (!name || !description || !location || !openHours) {
      return res.status(400).json({ error: "Missing required parameters." });
    }

    if (!req.files) {
      return res
        .status(400)
        .json({ message: " please upload verification documents" });
    }

    const { image } = req.files;

    const { url: image_thumbnail, public_id: image_public_id } =
      await uploadImg(image.tempFilePath);

    const newPlace = new Place({
      name,
      description,
      location,
      openHours,
      image_public_id,
      image_thumbnail,
    });

    await newPlace.save();

    res.status(200).json({
      success: true,
      message: `place saved Successfully`,
      Place: newPlace,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

const deletePlace = async (req, res) => {
  const { _id } = req.params;

  try {
    const place = await Place.findOne({ _id });

    if (!place) {
      return res.status(400).json({ message: "Bad request" });
    }

    await Place.findOneAndDelete({ _id });

    res.status(200).json({
      success: true,
      message: `place deleted Successfully`,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
const getPlaces = async (req, res) => {
  try {
    const places = await Place.find({});
    res.status(200).json({
      success: true,
      places: places,
    });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  createPlace,
  deletePlace,
  getPlaces,
};
