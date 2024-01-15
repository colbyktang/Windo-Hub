const describeInstance = require('../actions/describe-instance.js');
const startInstance = require('../actions/start-instance');
const stopInstance = require('../actions/stop-instance');

module.exports = {
    getServerStatus: (req,res) => {
        describeInstance()
        .then((instance) => {
            return res.status(200).json({
                status: true,
                serverStatus: instance[0].State.Name,
                serverName: instance[0].KeyName
            });
        })
        .catch((err) => {
            return res.status(500).json({
                status: false,
                error: err,
            });
        });
    },

    startServer: (req,res) => {
        startInstance(req.body.serverId)
        .then((status) => {
            return res.status(500).json({
                status: true,
                serverStatus: status
            });
        })
        .catch((err) => {
            return res.status(500).json({
                status: false,
                error: err,
            });
        });
    },

    stopServer: (req,res) => {
        stopInstance(req.body.serverId)
        .then((status) => {
            return res.status(200).json({
                status: true,
                serverStatus: status
            });
        })
        .catch((err) => {
            return res.status(500).json({
                status: false,
                error: err,
            });
        });
    }
};