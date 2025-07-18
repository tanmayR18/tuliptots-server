const cloudinary = require("cloudinary").v2;
const { Readable } = require("stream"); // Node's built-in module

exports.uploadImageToCloudinary = (file, folder, height, quality) => {
  const options = {
    folder,
    resource_type: "auto",
  };
  if (height) options.height = height;
  if (quality) options.quality = quality;

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(options, (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });

    const readable = new Readable();
    readable._read = () => {}; // required to make it work
    readable.push(file.buffer);
    readable.push(null);
    readable.pipe(stream);
  });
};
