const axios = require("axios");
const Dev = require("../models/Dev");
const parseStringAsArray = require("../utils/parseStringAsArray")

module.exports = {

  async index(req, res) {

    const devs = await Dev.find();

    return res.json(devs);

  },

  async store(req, res) {

    const {
      github_username,
      techs,
      latitude,
      longitude
    } = req.body;

    let dev = await Dev.findOne({ github_username });

    if(!dev) {

      const techsArray = parseStringAsArray(techs);

      const location = {
        type: "Point",
        coordinates: [latitude, longitude]
      }

      // var options = {
      //   method: `GET`,
      //   url: `https://api.github.com/users/${req.body.github_username}`,
      //   headers: {
      //     'User-Agent': 'request'
      //   }
      // }

      // const jsonData = JSON.parse(request(options, function(error, response, body) {return body;}));

      const apiResponse = await axios.get(`https://api.github.com/users/${req.body.github_username}`);

      var {
        name,
        login,
        avatar_url,
        bio
      } = apiResponse.data;

      if (!name) {
        name = login;
      }

      if (!bio) {
        bio = "Não tem Bio.";
      }

      dev = await Dev.create({
        github_username,
        name,
        login,
        avatar_url,
        bio,
        techs: techsArray,
        location
      });

      res.send(dev);

    }

  },

  async update(req, res) {

  },

  async destroy(req, res) {

  }
  
}