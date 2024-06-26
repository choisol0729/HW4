import express from "express";
import * as mysql from "mysql2";
import { v2 as cloudinary} from "cloudinary";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "hw4",
});

// @@@@@@@@@@@@@@@@@@@@@@ GET CALL @@@@@@@@@@@@@@@@@@@@@@@

app.get("/api/questions", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const sqlQuery = "SELECT * FROM Questions WHERE deleted = 'f';";

    db.query(sqlQuery, (err, result) => {
        if (err) console.log(err);
        result = result.map((r) => {
            r.creationDate.setDate(r.creationDate.getDate() + 1);
            return {
                id: r.id,
                question: r.text,
                type: r.answerType,
                options: "" === r.multipleChoiceResponses ? [] : r.multipleChoiceResponses.split(" | "),
                date: r.creationDate.toISOString().slice(0, 10),
                deleted: r.deleted
            }
        });

        res.send(result);
    });
});

app.get("/api/responses", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const sqlQuery = "SELECT * FROM QuestionResponse;";

    db.query(sqlQuery, (err, result) => {
        if (err) console.log(err);
        result = result.map((r, idx) => {
            r.date.setDate(r.date.getDate() + 1);
            return {
                id: r.id,
                question: r.question,
                response: r.response,
                date: r.date.toISOString().slice(0,10)
            }
        });

        res.send(result);
    })
})

app.get("/getQuestion", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const sqlQuery = "SELECT text FROM Questions WHERE id = " + req.query["id"];

    db.query(sqlQuery, (err, result) => {
        if (err) console.log(err);
        res.send(result);
    })
})

app.get("/getProfileInfo", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    var name = req.query["name"];

    const sqlQuery = "SELECT * FROM User WHERE name = '" + name + "';";
    db.query(sqlQuery, (err, result) => {
        if(err) console.log(err);
        result = result.map((r, idx) => {
            return {
                name: r.name,
                email: r.email,
                address1: r.address.split(" | ")[0],
                address2: r.address.split(" | ")[1],
                profile: r.profile
            }
        })
        res.send(result[0]);
    })
})

app.get("/checkAuth", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    const sqlQuery = "SELECT * FROM Login;";
    db.query(sqlQuery, (err, result) => {
        if(err) console.log(err);

        res.send(result);
    })
})

// @@@@@@@@@@@@@@@@@ POST CALL @@@@@@@@@@@@@@@@@@@@@

app.post("/swapNotDeleted", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const sqlQuery = "DELETE FROM Questions WHERE deleted = 0;";
    db.query(sqlQuery, (err, result) => {
        if(err) console.log(err);
    })
})

app.post("/saveEditQuestion", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const sqlQuery = "INSERT INTO Questions(id, text, answerType, multipleChoiceResponses, creationDate, deleted) VALUES (?, ?, ?, ?, ?, ?);";

    var data = JSON.parse(req.query["data"]);

    for(let i = 0; i < data.length; i++){
        var opts = data[i].options.join(" | ");
        
        

        db.query(sqlQuery, [data[i].id, data[i].question, data[i].type, opts, data[i].date, data[i].deleted], (err, result) => {
            if(err) console.log(err);
        })
    }

    res.send(data);
});

app.post("/saveLogData", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const sqlQuery = "INSERT INTO QuestionResponse(id, response, question, date) VALUES (?, ?, ?, ?);";

    var data = JSON.parse(req.query["data"]);
    var date = new Date();
    
    for(let i = 0; i < data.length; i++){
        db.query(sqlQuery, [data[i].id, data[i].response, data[i].question, data[i].date], (err, result) => {
            if(err) console.log(err);
        })
    }
})

app.post("/saveProfileInfo", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    var info = JSON.parse(req.query["info"]);

    var name = info.name;
    var email = info.email;
    var profile = info.profile;
    var address = info.address1 + " | " + info.address2;

    const del = "DELETE FROM User;";
    const sqlQuery = "INSERT INTO User(name, email, profile, address) VALUES (?, ?, ?, ?);";
    db.query(del, (err) => {if(err) console.log(err)});
    db.query(sqlQuery, [name, email, profile, address], (err, result) => {
        if(err) console.log(err);
    })
})

app.post("/updateAuth", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    var auth = req.query["auth"];
    var name = req.query["name"];

    var sqlQuery;
    if(auth == "false") sqlQuery = "DELETE FROM Login;";
    else sqlQuery = "INSERT INTO Login(name, auth) VALUES (?, ?);";

    db.query(sqlQuery, [name, 1], (err, result) => {
        if(err) console.log(err);
    })
})

// @@@@@@@@@@@@@@@@@ START SERVER @@@@@@@@@@@@@@@@@@@@@

db.connect((err) => {
    if (err) throw err;
    console.log("Connected!");
}); 

app.listen(2424);
console.log("Listening on Port 2424...");