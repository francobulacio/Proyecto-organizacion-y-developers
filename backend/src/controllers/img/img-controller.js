//testing cloudinary config
const dotenv = require("dotenv");
dotenv.config();
const cloudinary = require("cloudinary");
const fs = require("fs-extra");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const CloudinaryImage = async (req, res) => {
  try {
    const { path } = req.file;

    if (!path) return res.status(400).send("Missing path");

    //upload a cloudinary
    const resCloudinary = await cloudinary.v2.uploader.upload(req.file.path, {
      folder: "test_folder",
      //allowed_formats: ["jpeg", "png"],
      format: "png",
    });

    const cloudinaryURL = resCloudinary.secure_url;

    //eliminar la foto avatar guardada en mi servidor node
    await fs.unlink(req.file.path);

    return res.send(cloudinaryURL);
  } catch (error) {
    return res.status(400).send("Error uploading ");
  }
};

module.exports = { CloudinaryImage };
