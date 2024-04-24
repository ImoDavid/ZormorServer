const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const uploadImg = async (file) => {
  return await cloudinary.uploader.upload(
    file,
    {
      folder: "places",
      transformation: [{ width: 500, height: 500, crop: "limit" }],
    },
    (result) => result
  );
};

module.exports = { uploadImg };
