const { default: mongoose } = require("mongoose");

require("dotenv").config();
const PORT = process.env.PORT || 5000;

const connectDatabase = async (app) => {
  try {
    await mongoose.connect(
      process.env.DB_URL,() => {
        console.log("connected to DB");
        app.listen(PORT, () => console.log("server listening on port " + PORT));
      }
    );
  } catch (error) {
    console.log(error);
  }
};
module.exports = { connectDatabase };
