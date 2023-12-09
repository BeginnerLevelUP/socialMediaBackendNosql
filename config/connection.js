const { connect, connection } = require("mongoose");

connect("mongodb://localhost/socialmediaDB");

module.exports = connection;
