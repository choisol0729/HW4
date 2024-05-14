import express from "express";
import * as mysql from "mysql2";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "hw3",
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

db.connect((err) => {
    if (err) throw err;
    console.log("Connected!");
}); 

app.listen(2424);
console.log("Listening on Port 2424...");