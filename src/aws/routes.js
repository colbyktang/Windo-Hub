const router = require("express").Router();

// Middleware Imports
const isAuthenticatedMiddleware = require("../common/middlewares/IsAuthenticatedMiddleware");
const SchemaValidationMiddleware = require("../common/middlewares/SchemaValidationMiddleware");
const CheckPermissionMiddleware = require("../common/middlewares/CheckPermissionMiddleware");

// Controller Imports
const AWSController = require("./controllers/AWSController");

// JSON Schema Imports for payload verification
const serverStatusPayload = require("./schemas/serverStatusPayload");

const { roles } = require("../config");

router.get(
  "/status",
  [isAuthenticatedMiddleware.check, CheckPermissionMiddleware.has(roles.ADMIN), SchemaValidationMiddleware.verify(serverStatusPayload)],
  AWSController.getServerStatus,
);

router.post(
  "/start",
  [isAuthenticatedMiddleware.check, CheckPermissionMiddleware.has(roles.ADMIN)],
  AWSController.startServer
);

router.post(
  "/stop",
  [isAuthenticatedMiddleware.check, CheckPermissionMiddleware.has(roles.ADMIN)],
  AWSController.stopServer
);

module.exports = router;
