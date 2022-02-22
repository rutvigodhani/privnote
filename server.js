const express = require('express')
const queries = require('./models/link')
const app = express()
const port = process.env.PORT || 3000

app.use(express.json());
app.use(express.urlencoded({extended: false}));
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

app.post('/created', (req, res) => {
    reqBody = req.body;
    let link = new queries(reqBody.note, reqBody.destroyWhen, reqBody.pwd, reqBody.hashValue);
    link.save();
    res.status(201).sendFile(__dirname + '/views/createNote.html')
});

app.get('/about', (req, res) => {
    res.sendFile(__dirname + '/views/about.html')
})

app.get(/[a-zA-Z0-9]{11,}/, (req, res) => {
    let content = queries.byId(req.path.substring(1));
    content.then(function(result){
        res.render(__dirname + '/views/viewNote', { text: result[0].note });
    })
    .catch(function(result){
        res.render(__dirname + '/views/viewNote', { text: "** Wrong Note Link Given **" });
    })
})

app.get('*', (req, res) => {
    res.render(__dirname + '/views/viewNote', { text: "** Wrong Note Link Given **" });
})

app.listen(port, () => console.info(`App listening on port ${port}`))
