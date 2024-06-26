const axios = require("axios");
const FormData = require("form-data");
const JWT = process.env.PINATA_JWT;

export const pinFileToIPFS = async (file) => {
  const formData = new FormData();
  // const src = "path/to/file.png";

  // const file = fs.createReadStream(src)
  formData.append("file", file);

  const pinataMetadata = JSON.stringify({
    name: "File name",
  });
  formData.append("pinataMetadata", pinataMetadata);

  const pinataOptions = JSON.stringify({
    cidVersion: 0,
  });
  formData.append("pinataOptions", pinataOptions);

  try {
    const res = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      formData,
      {
        maxBodyLength: "Infinity",
        headers: {
          "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
          Authorization: `Bearer ${JWT}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
