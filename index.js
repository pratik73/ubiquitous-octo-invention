const express = require("express");
const app = express();
const upload = require("express-fileupload");
var axios = require("axios");
var FormData = require("form-data");
var fs = require("fs");

app.use(upload());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

const port = 4000;

app.get("/", (req, res) => {
  putToTargetServer(res);

  // res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const putToTargetServer = (res) => {
  var data = new FormData();
  data.append("temp", fs.createReadStream("./DJI_0528.MP4"));

  var config = {
    method: "put",
    url: "http://localhost:3000",
    headers: {
      ...data.getHeaders(),
    },
    data: data,
    maxBodyLength: Infinity,
  };

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      res.send("Upload Successful");
    })
    .catch(function (error) {
      console.log(error);
      res.send("Upload Failed");
    });
};
