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
};
