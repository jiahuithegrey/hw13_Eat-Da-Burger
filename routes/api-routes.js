// api-routes.js - this file offers a set of routes for displaying and saving data to the db

// Grabbing our models
var db = require("../models");

// Routes
module.exports = function(app) {
  // GET route for getting all of burgers
  app.get("/api/burgers", function(req, res) {
    db.Burger.findAll({}).then(function(result) {
      res.json(results);
    });
  });

  // POST route for saving a new burger. You can create a burger using the data on req.body
  app.post("/api/burgers", function(req, res) {
    db.Burger.create({
      burger_name: DataTypes.STRING,
      devoured: DataTypes.BOOLEAN
    }).then(function(results) {
      res.json(results);
    });
  });

  // DELETE route for deleting burgers. You can access the burger's id in req.params.id
  app.delete("/api/burgers/:id", function(req, res) {
    db.Burger.destroy({
      where:{
        id:req.params.id
      }
    }).then(function(dbBurger){
      res.json(dbBurger);
    });
  });

  // PUT route for updating burgers. The updated burger will be available in req.body
  app.put("/api/burgers", function(req, res) {
    db.Burger.update({
      burger_name: DataTypes.STRING,
      devoured: DataTypes.BOOLEAN
    },{
      where: {
        id: req.body.id
      }
    }).then(function(dbBurger){
      res.json(dbBurger);
    });
  });
}