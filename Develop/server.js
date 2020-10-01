// Dependencies

const express = require ('express');
const path = require ('path');
const fs = require ('fs');

const app = express();

const PORT = process.env.PORT || 8080;

// Set up middle ware to handle data parsing
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static("./Develop/public"));

// Routes

app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "public", "index.html"))
})

app.get("/notes", function(req, res){
    res.sendFile(path.join(__dirname, "public", "notes.html"))
})

app.get("/api/notes", function(req,res){
    return res.sendFile(path.join(__dirname, "db/db.json"))
})

app.post("/api/notes", function(req,res){
    try{
        userNote = fs.readFileSync("db/db.json", "utf8");
        userNote = JSON.parse(userNote);
        req.body.id = userNote.length;
        userNote.push(req.body);
        userNote = JSON.stringify(userNote);
        fs.writeFile("db/db.json", userNote, "utf8", function(err){
            if (err) throw err;
        })
    res.json(JSON.parse(userNote));

    } catch (err){
        throw err;
    }
})

app.delete("/api/notes/:id", function(req,res){
    try{
        userNote = fs.readFileSync("db/db.json", "utf8")
        userNote = JSON.parse(userNote);
        userNote = userNote.filter(function(note){
            return note.id != req.params.id
        });
        userNote = JSON.stringify(userNote);
        fs.writeFile("./db/db.json", userNote, "utf8", function(err){
            if(err) throw err;;
        })
        res.json(JSON.parse(userNote));

    }catch (err){
        throw err;
    }
})


// Start server to begin listening
app.listen(PORT, function() {
    console.log(`Server listening on POST ${PORT}`)
})