const clarifai = require("clarifai");

const app = new Clarifai.App({
  apiKey: process.env.API_KEY,
});

const handleApiCall = () => (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.status(400).json("unable to work with API"));
};

const handleImage = (db) => (req, res) => {
  const { id } = req.body;
  db("users")
    .where({ id })
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => {
      if (entries.length) {
        res.json(entries[0]);
      } else {
        throw new Error("Unable to update entry count");
      }
    })
    .catch((err) => {
      res.status(404).json(err.message);
    });
};

module.exports = {
  handleImage: handleImage,
  handleApiCall: handleApiCall,
};
