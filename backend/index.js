require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();

app.use(cors());

const port = process.env.PORT || 3000;
const logToConsole = process.env.LOG_TO_CONSOLE || true;
const placesAPIKey = process.env.PLACES_API_KEY;

if (!placesAPIKey) {
    console.error("[DEV ERROR] Missing API Key!", process.env);
    process.exit(1);
}

app.get("/places/:keyword", async (req, res) => {
    let keyword = req.params.keyword;
    let result = await getAllPlaceDetails({ keyword });
    res.send(result);
});

async function getAllPlaceDetails({ keyword }) {
    let initialDetails = await searchForPlace(keyword);

    if (logToConsole) console.log(">>> INITIAL DETAILS", initialDetails);

    // let photoUrl = await getPhoto(initialDetails.photoReference);
    let finalDetails = await getPlaceDetails(initialDetails.placeId);

    if (logToConsole) console.log(">>> FINAL DETAILS", finalDetails);

    // finalDetails.photoUrl = photoUrl;

    for (let key in initialDetails) {
        finalDetails[[key]] = initialDetails[key];
    }

    return finalDetails;
}

async function searchForPlace(keyword) {
    // Returned Object:
    //        {
    //           "formatted_address": "106 Jln Jurong Kechil, Singapore 598604",
    //           "location": {
    //                 "lat": 1.3408906,
    //                 "lng": 103.7724171
    //              },
    //           "name": "FLAGWHITE",
    //           "photoReference": "CmRaAAAAxrfjvHQLuEdGcgJhcw09eBm_x37zAuSwtd6RlqTfO_kNwIkgtU7lGe_aAVzsQ4Sa6CSHtwjKlp0CpDXx5keqPw3msODmKNQ7EFF2Q8Uiqpg3Vlr3BiaqU5FqMNYUTAefEhBvVFWrRvIdmYU1vQx0Vbk0GhSraXGT8YK6YozTwa1_DgJRbvmk7A",
    //           "place_id": "ChIJCaXKGjAR2jERV2b3bf4hj6Q"
    //        }

    if (logToConsole) console.log("searchforPlace: KEYWORD:", keyword);

    const placeFromTextURL = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${keyword}e&inputtype=textquery&fields=photos,formatted_address,name,geometry,place_id&key=${placesAPIKey}`;

    let response = await axios.get(placeFromTextURL);
    let place = response.data.candidates[0]; // get the first candidate (sorted by prominence)

    // let placeDetails = await response.photos.map(place => {
    //   place.photoReference = place.photos.photo_reference;
    //   place.location = place.geometry.location;
    //   return place;
    // })

    if (logToConsole) console.log(">>> searchForPlace", response.data);

    let result = {
        formattedAddress: place.formatted_address,
        location: place.geometry.location,
        name: place.name,
        photoReference: place.photos[0].photo_reference,
        placeId: place.place_id,
    };

    console.log("    >>> searchForPlace result", result);

    return result;
}

// async function getPhoto(photoReference) {
//   const photoReferenceURL = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=` +
//     `${photoReference}&` +
//     `key=${placesAPIKey}`;

//   if (logToConsole) console.log('>>> getPhoto', photoReferenceURL)

//   let response = await axios.get(photoReferenceURL);
//   response = response.data;

//   if (logToConsole) console.log('>>> getPhoto complete')

//   return response;
// }

async function getPlaceDetails(placeId) {
    const placeIdURL =
        `https://maps.googleapis.com/maps/api/place/details/json?` +
        `place_id=${placeId}` +
        `&fields=name,rating,formatted_phone_number,opening_hours,website,price_level,user_ratings_total,review` +
        `&key=${placesAPIKey}`;

    let response = await axios.get(placeIdURL);

    if (logToConsole) console.log(">>> getPlaceDetails", response.data);
    response = response.data.result;

    return response;
}

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
