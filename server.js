const express = require('express')
const queries = require('./models/link')
const db = require('./config/db')
const app = express()
const port = process.env.PORT || 3000

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + 'public'));
app.use("/posts", require('./routes/linkRoutes'))
app.use('/css', express.static(__dirname + '/public/css'))
app.use('/js', express.static(__dirname + '/public/js'))
app.use('/img', express.static(__dirname + '/public/images'))

app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html')
})

app.get('/about', (req, res) => {
    res.sendFile(__dirname + '/views/about.html')
})

app.get(/[a-zA-Z0-9]{11,}/, (req, res) => {
    let sqlQuery = queries.byId(req.path.substring(1));
    let deleted = true;
    db.query(sqlQuery)
        .then(result => {
            if(result.rows.length == 0)
                res.render(__dirname + '/views/viewNote', { text: "** Wrong Note Link Given **" })
            else if (result.rows[0].destroywhen === 'reading'){
                deleted = false;
                res.render(__dirname + '/views/viewNote', { text: result.rows[0].note });
            }
            else if (result.rows[0].destroywhen !== 'reading')
                res.render(__dirname + '/views/viewNote', { text: result.rows[0].note });
        })
        .catch(e => console.error(e.stack))
        .then((result) => {
            if (!deleted) {
                let isDelete = queries.deletebyId(req.path.substring(1));
                db.query(isDelete)
                    .then((result) => console.log(req.path.substring(1), "entry deleted"))
                    .catch((result) => console.error(result))
            }
        })
        .catch((err) => res.render(__dirname + '/views/viewNote', { text: "** Wrong Note Link Given **" }))
})

app.post('/created', (req, res) => {
    reqBody = req.body;
    let link = new queries(reqBody.note, reqBody.destroyWhen, reqBody.pwd, reqBody.hashValue);
    link.save();
    res.status(201).sendFile(__dirname + '/views/createNote.html')
});

app.delete('/deleted', (req, res) => {
    let isDelete = queries.deletebyId(req.body.noteId);
    console.log(isDelete);
    db.query(isDelete)
        .then((result) => res.status(201).sendFile(__dirname + '/views/createNote.html'))
        .catch((result) => res.status(201).sendFile(__dirname + '/views/createNote.html'))
});

app.get('*', (req, res) => {
    res.render(__dirname + '/views/viewNote', { text: "** Wrong Note Link Given **" });
})

app.listen(port, () => console.info(`App listening on port ${port}`))
