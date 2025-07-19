const cloudinary = require("cloudinary").v2;
const { Readable } = require("stream");

exports.uploadVideoToCloudinary = (file, folder) => {
  return new Promise((resolve, reject) => {
    const options = {
      folder,
      resource_type: "video", // 👈 important!
      format: "mp4", // enforce mp4 output
    //   eager: [
    //     {
    //       format: "mp4",
    //       quality: "auto",
    //     },
    //   ],
    //   eager_async: false, 
    };

    const stream = cloudinary.uploader.upload_stream(
      options,
      (error, result) => {
        if (error) {
          console.error("Cloudinary video upload error:", error);
          return reject(error);
        }
        resolve(result);
      }
    );

    const readable = new Readable();
    readable._read = () => {};
    readable.push(file.buffer);
    readable.push(null);
    readable.pipe(stream);
  });
};
