const handleSignin = (db, bcrypt) => (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json("incorrect form submission");
  }
  db.select("email", "hash")
    .from("login")
    .where({ email })
    .then((data) => {
      const isAuthenticated = bcrypt.compareSync(password, data[0].hash);
      if (isAuthenticated) {
        return db
          .select("*")
          .from("users")
          .where({ email })
          .then((user) => {
            res.json(user[0]);
          })
          .catch((err) => res.status(400).json("unable to get user"));
      } else {
        res.status(400).json("wrong username/password");
      }
    })
    .catch((err) => res.status(400).json("wrong username/password"));
};

module.exports = {
  handleSignin: handleSignin,
};
