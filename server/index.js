const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const mysql = require('mysql');
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tutorials_reactjs'
});
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/get", (req, res) => {
    const RetrieveTutorials = "SELECT * FROM tutorials";
    db.query(RetrieveTutorials, (err, result) => {
        res.send(result);
    })
});

app.post("/api/insert", (req, res) => {
    const title = req.body.titleName;
    const description = req.body.descriptionName;
    const InsertTutorial = "INSERT INTO tutorials (title, description) VALUES (?,?)";
    db.query(InsertTutorial, [title, description], (err, result) => {
        console.log(err);
    })
});

app.delete("/api/delete/:id", (req, res) => {
    const title = req.params.id;
    const deleteTutorial = "DELETE FROM tutorials WHERE id = ?";
    db.query(deleteTutorial, title, (err, result) => {
        console.log(err);
    })
});

app.put("/api/update/:id", (req, res) => {
    const id = req.params.id;
    const UpdateTutorial = "UPDATE tutorials SET publish_status = 'Pending' WHERE id = ?";
    db.query(UpdateTutorial, id, (err, result) => {
        console.log(err);
    })
});

app.get('/Search', function (req, res) {
    con.query("select * from tutorials where title like '%username%'",
        function (err, searchrs) {
            console.log("Search results:", searchrs);
            res.json(searchrs);
        })
});

app.put("/api/update1/:id", (req, res) => {
    const id = req.params.id;
    //const title = req.body.titleName;
    const description1 = req.body.descriptionName1;
    const Update1Tutorial = "UPDATE tutorials SET description = ? WHERE id = ?";
    db.query(Update1Tutorial, [description1, id], (err, result) => {
        console.log(err);
    })
});

app.listen(3001, () => {
    console.log("Running on port 3001!");

})