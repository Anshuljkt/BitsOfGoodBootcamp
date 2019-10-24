const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes");

const app = express();
const port = process.env.port || 3000;
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// app.get("/", (request, response) => {
//     response.send("hello World");
// })

// app.get("/photos", (req, res) => { //CRUD READ
//     response.send("Hello world but with photos")
//     response.send(req.body);
// })

// app.post("/photos/:id", (req, res) => {
//     let success = false;
//     if (req.body.id == "james") {
//         success = true;
//     }
//     response.json({success});
//     response.send();
// }); //CREATE
// app.delete("/:id"); //DELETE
// app.put("/:id"); //UPDATE/Replacing
// app.patch("/:id"); //UPDATE/Modifying

app.use("/", routes);

app.listen(port, () => {
    console.log(`Server is running ${port}`);
})