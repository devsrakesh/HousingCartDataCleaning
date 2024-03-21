const data = require("./housingcart.newproperties.json"); // Adjust the path as per your file structure
const fs = require("fs");

// Define mapping dictionaries for cleaning
const propertyTypeMapping = {
    "": "undefined",
    " ": "undefined",
    PG: "residential",
    pg: "residential",
    house: "residential",
    House: "residential",
    Residencial: "residential",
    recidential: "residential",
    residencial: "residential",
    Commercial: "commercial",
    Residential: "residential"
};

const bhkConfigurationMapping = {
    "1 BHK": "1bhk",
    "2 BHK": "2bhk",
    "3 BHK": "3bhk",
    "4 BHK": "4bhk",
    "5 BHK": "5bhk",
    "6 BHK": "6bhk",
    "1RK": "1rk",
    "1 RK": "1rk",
    "2RK": "1rk",
    "2 RK": "1rk",
    BHK: "undefined",
    1: "1bhk",
    2: "2bhk",
    3: "3bhk",
    4: "4bhk",
    "7+ BHK": "+7bhk",
    "7 BHK": "7bhk",
    "11 BHK": "+7bhk",
    "8 BHK": "+7bhk",
    "10 BHK": "+7bhk",
    "undefined ": "undefined",
    " ": "undefined"
};

const furnishedStatusMapping = {
    un_furnished: "unfurnished",
    Unfurnished: "unfurnished",
    Un_furnished: "unfurnished",
    "Semi-Furnished": "semi_furnished",
    "un furnished": "unfurnished",
    "Furnished": "furnished"
};
const propertyForMapping = {
    "rent": "rent",
    "sale": "sale",
    "Sale": "sale",
    "undefined": "undefined",
    "sell": "sale",
    "SELL": "sale"
};

const propertyStatusMapping = {
    "Ready To Move": "ready_to_move",
    "Under Construction": "under_construction",
    commercial: "undefined",
    Commercial: "undefined",
    Residential: "undefined",
    residential: "undefined",
};

const plotTypeMapping = {
    "undefined": "undefined",
    "independent_plot": "independent_plot",
    "Layout": "layout",
    "Independent plot": "independent_plot",
    "gated_community": "gated_community",
    "layout": "layout",
    "inplot": "independent_plot",
    "House": "undefined",
    "ready to move": "undefined",
    "Plot": "independent_plot",
    "under construction": "undefined",
    "complex": "undefined",
    "Flat": "undefined",
    "flat": "undefined",
    "PG": "undefined",
    "plot": "independent_plot"
};

const facingDirectionsMapping = {
    "undefined": "undefined",
    "1": "undefined",
    "2": "undefined",
    "3": "undefined",
    "North": "north",
    "South": "south",
    "East": "east",
    "NorthWest": "north_west",
    "south_east": "South_east",
    "West": "west",
    "-1": "undefined",
};

const propertyNameMapping = {
    "home": "house",
    "Home": "house",
    "Farmland": "farmland",
    "Villa": "villa",
    "Complex": "complex",
    "Shop/Office":"shop",
    "vshsbsn": "undefined",
    "babsb": "undefined",
    "phkfjj": "undefined",
    "ccc cc": "undefined",
    "acha": "undefined",
    "hello": "undefined",
    "good": "undefined",
    "proprryusvs": "undefined",
    "shop/office": "shop",
    "bjjwwj": "undefined",
    "qweqweqw": "undefined",
    "warehouse": "warehouse",
    "wlejkljelk": "undefined",
    "gshsb": "undefined",
    "shop on rent": "shop",
    "shop for rent ": "shop",
    "shop for sale in magneto mall ": "shop",
    "for commerical use": "undefined",
    "plot for sale in bilaspur-raipur road": "plot",
    "commercial restension plot": "plot",
    "swastik rosbey green ": "undefined",
    "gshsn": "undefined",
    "double storey house ": "house",
    "for rent": "house",
    "good location shop for sell": "shop",
    "3 bhk on first floor": "flat",
    "ashtvinayaka city": "flat",
    "bajaj sky heights ": "undefined",
    "near uslapur railway station ": "undefined",
    "testing": "undefined",
    "pandhi super bazar ": "shop",
    "office space / storehouse available for rent.": "complex",
    "hhhhhhhh": "undefined",
    "whegfkhweg": "undefined",
    "fggh": "undefined",
    "gggh": "undefined",
    "bsjsns": "undefined",
    "testing pg": "PG",
    "premium plotting project at reasonable price ": "undefined",
    "good luck": "undefined",
    "hbhhhh": "undefined",
    "shsh": "undefined",
    "plot good location near apna enclave gurgaon": "plot",
    "sai green city": "undefined",
    "urgent sale karna h": "undefined",
    "avineel city": "undefined",
    "krishna apartment": "flat",
    "shop gor rent in mannu chowk, tilrapara": "shop",
    "premium plotting project ": "plot",
    "t&c rera approval ": "undefined",
    "good hai": "undefined",
    "ready to move house 2bhk , good location, 3km from bus stand ": "house",
    "plot for sale in rajendra nagar ": "plot",
    "aawashiy plot uplabdh": "undefined",
    "2400/4800 sqft east facing plot for sale ": "plot",
    "he'll": "undefined",
    "3 bhk house ": "house",
    "8.5 dismil residencial plot for sell ": "plot",
    "swarnima heights ": "flat",
    "contemporary villa": "villa",
    "residential house for ": "house",
    "residential house for sale": "house",
    "plot for sale in hemunagar ": "plot",
    "sell fast ": "undefined",
    "पंधी प्रोजेक्ट ": "undefined",
    "aaa": "undefined",
    "b, b, ": "undefined",
    "geetanjali era": "undefined",
    "my sweet home ": "house",
    "plots in pirda near kachna shankar nagar raipur ": "plot",
    "apna ghar": "house",
    "residential house for rent": "house",
    "2bhk ka makan mopka rto green chawla marege resort ke pass ": "house",
    "100 gaj mai 3 manjil makan": "house",
    "🏢 **\"spacious serenity: 2 bhk haven on the 4th floor!\"** 🌟": "flat",
    "sell fast ": "undefined",
    "showroom": "shop",
    "dream enclave ke pass": "undefined",
    "residential plots for sale": "plot",
    "savitri plaza ": "shop",
    "residential flat for rent": "flat",
    "office space/ godown / shop space ": "complex",
    "shop/godown/office space ": "shop",
    "10*10 total 100 sqft ": "undefined",
    "3 बीएचके फ्लैट बेचना है राधा परिसर विवेकानंद नगर मोपका बिलासपुर": "flat",
    "residential farm for sale": "house"
};

const userTypeMapping = {
    "owner": "user",
    "Agent": "agent",
    "broker": "agent",
    "USER": "user",
    "undefined": "undefined",
    "Agent(Silver)": "agent"
};


// Clean the data using mapping dictionaries
const cleanData = data.map((e) => {
    e.propertyName = propertyNameMapping[e.propertyName] || e.propertyName;
    e.propertyType = propertyTypeMapping[e.propertyType] || e.propertyType;
    e.bhkConfiguration =
        bhkConfigurationMapping[e.bhkConfiguration] || e.bhkConfiguration;
    e.furnishedStatus =
        furnishedStatusMapping[e.furnishedStatus] || e.furnishedStatus;
    e.propertyStatus =
        propertyStatusMapping[e.propertyStatus] || e.propertyStatus;
    e.propertyFor = propertyForMapping[e.propertyFor] || e.propertyFor;
    e.plotType = plotTypeMapping[e.plotType] || e.plotType
    e.facingDirections = facingDirectionsMapping[e.facingDirections]
    e.userType = userTypeMapping[e.userType] || e.userType
    return e;
});
// Write cleaned data to a file
fs.writeFileSync(
    "cleanedPropertyData.json",
    JSON.stringify(cleanData, null, 2)
);

console.log("Data cleaned and written to cleanedPropertyData.json");
