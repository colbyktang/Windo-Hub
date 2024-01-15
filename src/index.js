// https://blog.postman.com/how-to-create-a-rest-api-with-node-js-and-express/
const Express = require("express");
const app = Express();
const cors = require("cors");
const morgan = require("morgan");
const { Sequelize } = require("sequelize");

const { port } = require("./config");
const PORT = process.env.PORT || port;

// Express Routes Import
const AuthorizationRoutes = require("./authorization/routes");
const UserRoutes = require("./users/routes");
const ProductRoutes = require("./products/routes");
const AWSRoutes = require("./aws/routes")

// Sequelize model imports
const UserModel = require("./common/models/User");
const ProductModel = require("./common/models/Product");

app.use(morgan("tiny"));
app.use(cors());

// Middleware that parses the body payloads as JSON to be consumed next set
// of middlewares and controllers.
app.use(Express.json());

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./storage/data.db", // Path to the file that will store the SQLite DB.
});

// Initialising the Model on sequelize
UserModel.initialise(sequelize);
ProductModel.initialise(sequelize);

// Syncing the models that are defined on sequelize with the tables that alredy exists
// in the database. It creates models as tables that do not exist in the DB.
sequelize
  .sync()
  .then(() => {
    console.log("Sequelize Initialised!!");

    // Attaching the Authentication and User Routes to the app.
    app.use("/api", AuthorizationRoutes);
    app.use("/api/aws", AWSRoutes)
    app.use("/api/user", UserRoutes);
    app.use("/api/product", ProductRoutes);

    app.listen(PORT, () => {
      console.log("Server Listening on PORT:", port);
    });
  })
  .catch((err) => {
    console.error("Sequelize Initialisation threw an error:", err);
  });
