// Dependencies

const express = require ('express');
const path = require ('path');
const fs = require ('path');

const app = express();

const PORT = process.env.PORT || 8080;

// Set up middle ware to handle data parsing
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static("public"));

// Routes

app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "index.html"))
})


// Start server to begin listening
app.listen(PORT, function() {
    console.log(`Server listening on POST ${PORT}`)
})