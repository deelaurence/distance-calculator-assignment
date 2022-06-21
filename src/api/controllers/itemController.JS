const Location = require("../models/modelItem");
const { locationValidation } = require("../validations/itemValidate");

const createNewLocation = async (req, res) => {
  try {
    const { error } = locationValidation(req.body);
    if (error)
      res.status(400).json({
        msg: error.details[0].message,
      });
    else {
      const NewLocation = new Location(req.body);
      const savedLocation = await NewLocation.save();

      if (!savedLocation) {
        return res
          .status(406)
          .json({ success: false, message: "Input error, Not saved" });
      } else {
        return res
          .status(200)
          .json({ sucess: true, location_details: savedLocation });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const editLocation = async (req, res) => {
  try {
    const { error } = locationValidation(req.body);
    if (error)
      res.status(400).json({
        msg: error.details[0].message,
      });
    else {
      const query = { locationName: req.params.oldLocation };
      const editLocation = await Location.findOneAndUpdate(query, {
        locationName: req.body.locationName,
        description: req.body.description,
        phone: req.body.phone,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
      });

      if (!editLocation || !req.body) {
        return res.status(400).json({
          success: false,
          message: `${req.params.oldLocation.toUpperCase()} not available in the database or input error`,
        });
      }

      return res.json({ old_data: editLocation, new_data: req.body });
    }
  } catch (error) {
    console.log(error);
  }
};

const deleteLocation = async (req, res) => {
  try {
    const query = { locationName: req.body.locationName };
    const deleteLocation = await Location.findOneAndDelete(query);
    if (!deleteLocation) {
      return res.status(404).json({
        success: false,
        message: `${req.body.locationName.toUpperCase()} not available in the database or already deleted`,
      });
    }

    return res.status(200).json({
      success: true,
      message: `the location details of ${req.body.locationName.toUpperCase()} has been deleted`,
    });
  } catch (error) {
    console.log(error);
  }
};
const getAllLocations = async (req, res) => {
  try {
    const allLocations = await Location.find();
    if (allLocations.length === 0)
      return res.status(404).json({
        success: false,
        msg: "There are no locations",
      });
    else {
      return res.send(allLocations);
    }
  } catch (error) {
    console.log(error);
  }
};

const getSpecificLocation = async (req, res) => {
  try {
    const specificLocation = await Location.findOne({
      locationName: req.body.locationName,
    });
    if (!specificLocation) {
      return res.status(404).json({
        success: false,
        message: `no such Location as ${req.body.locationName}`,
      });
    }
    res.json(specificLocation);
  } catch (error) {
    console.log(error);
  }
};

const calculateDistance = async (req, res) => {
  try {
    const specificLocation = await Location.findOne({
      locationName: req.body.locationName,
    });
    if (!specificLocation) {
      return res.status(404).json({
        status: "failed",
        msg: `no such Location as ${req.body.locationName}`,
      });
    }
    const axios = require("axios");

    const options = {
      method: "GET",
      url: "https://find-any-ip-address-or-domain-location-world-wide.p.rapidapi.com/iplocation",
      params: { apikey: "873dbe322aea47f89dcf729dcc8f60e8" },
      headers: {
        "X-RapidAPI-Key": "7fa08a3abamsh9000103171fc896p17a04fjsn14e87e42af26",
        "X-RapidAPI-Host":
          "find-any-ip-address-or-domain-location-world-wide.p.rapidapi.com",
      },
    };

    axios.request(options).then(function getData(response) {
      function distance(laitudet1, latitude2, longitude1, longitude2) {
        // The math module contains a function
        // named toRadians which converts from
        // degrees to radians.
        longitude1 = (longitude1 * Math.PI) / 180;
        longitude2 = (longitude2 * Math.PI) / 180;
        laitudet1 = (laitudet1 * Math.PI) / 180;
        latitude2 = (latitude2 * Math.PI) / 180;

        // Haversine formula
        let dlon = longitude2 - longitude1;
        let dlat = latitude2 - laitudet1;
        let a =
          Math.pow(Math.sin(dlat / 2), 2) +
          Math.cos(laitudet1) *
            Math.cos(latitude2) *
            Math.pow(Math.sin(dlon / 2), 2);

        let c = 2 * Math.asin(Math.sqrt(a));

        // Radius of earth in kilometers. Use 3956
        // for miles
        let r = 6371;

        // calculate the result
        return c * r;
      }

      // Driver code

      let laitudet1 = response.data.latitude;
      let latitude2 = specificLocation.latitude;
      let longitude1 = response.data.longitude;
      let longitude2 = specificLocation.longitude;
      res.send(
        `The approximate distance between your location and ${
          specificLocation.locationName
        } is ${Math.floor(
          distance(laitudet1, latitude2, longitude1, longitude2)
        )} kilometres`
      );
    });
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  createNewLocation,
  editLocation,
  deleteLocation,
  getAllLocations,
  getSpecificLocation,
  calculateDistance,
};
