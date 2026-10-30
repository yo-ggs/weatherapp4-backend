const mongoose = require("mongoose");

const connectionString =
  "mongodb+srv://yohannstudio_db_user:wlO138joYzKukrvy@myfirstdatabase.oq3h9ra.mongodb.net/weatherapppart4";

mongoose
  .connect(connectionString, { connectTimeoutMS: 2000 })
  .then(() => console.log("Database connected"))
  .catch((error) => console.error(error));
