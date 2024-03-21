const fs = require("fs");
const Property = require("./housingcart.newproperties.json");
const CleanedProperty = require("./cleanedPropertyData.json");

const bhkCount = {};
const furnishedStatusCount = {};
const propertyStatusCount = {};
const propertyForCount = {};
const propertyNameCount = {};
const pgAvailableforCount = {};
const propertyTypeCount = {};
const plotTypeCount = {};
const facingDirectionsCount = {};
const userTypeCount = {};

CleanedProperty.forEach((property) => {
  const bhkConfig = property.bhkConfiguration || "undefined";
  const furnishedStatus = property.furnishedStatus || "undefined";
  const propertyStatus = property.propertyStatus || "undefined";
  const propertyFor = property.propertyFor || "undefined";
  const propertyName = property.propertyName || "undefined";
  const pgAvailablefor = property.pgAvailablefor || "undefined";
  const propertyType = property.propertyType || "undefined";
  const plotType = property.plotType || "undefined";
  const facingDirections = property.facingDirections || "undefined";
  const userType = property.userType || "undefined";

  bhkCount[bhkConfig] = (bhkCount[bhkConfig] || 0) + 1;
  furnishedStatusCount[furnishedStatus] =
    (furnishedStatusCount[furnishedStatus] || 0) + 1;
  propertyStatusCount[propertyStatus] =
    (propertyStatusCount[propertyStatus] || 0) + 1;
  propertyForCount[propertyFor] = (propertyForCount[propertyFor] || 0) + 1;
  propertyNameCount[propertyName] = (propertyNameCount[propertyName] || 0) + 1;
  pgAvailableforCount[pgAvailablefor] =
    (pgAvailableforCount[pgAvailablefor] || 0) + 1;
  propertyTypeCount[propertyType] = (propertyTypeCount[propertyType] || 0) + 1;
  plotTypeCount[plotType] = (plotTypeCount[plotType] || 0) + 1;
  facingDirectionsCount[facingDirections] =
    (facingDirectionsCount[facingDirections] || 0) + 1;
  userTypeCount[userType] = (userTypeCount[userType] || 0) + 1;
});

// Format data as JSON object
const propertyCounts = {
  bhkConfiguration: bhkCount,
  furnishedStatus: furnishedStatusCount,
  propertyStatus: propertyStatusCount,
  propertyFor: propertyForCount,
  propertyName: propertyNameCount,
  pgAvailablefor: pgAvailableforCount,
  propertyType: propertyTypeCount,
  plotType: plotTypeCount,
  facingDirections: facingDirectionsCount,
  userType: userTypeCount,
};

// Write data to JSON file
fs.writeFileSync(
  "Cleanedproperty_counts.json",
  JSON.stringify(propertyCounts, null, 2)
);

console.log("Property counts have been written to property_counts.json");
