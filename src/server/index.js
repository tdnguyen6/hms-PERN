const app = require('./app');
const port = process.env.PORT || 3001;

<<<<<<< HEAD
app.use(express.json());
app.use(session({
    cookie: { maxAge: 86400000 },
    saveUninitialized: true,
    store: new MemoryStore({
        checkPeriod: 86400000 // prune expired entries every 24h
    }),
    resave: true,
    secret: 'Shigeo Tokuda'
}))
app.use(express.static(path.join(__dirname, '../client/build')));
app.use(function (req, res, next) {
    res.set({
        'content-type': 'application/json',
        'access-control-allow-headers': 'origin, x-requested-with, content-type, accept',
        'access-control-allow-origin': '*',
        // 'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT'
    });
    next();
});

// api for user
app.post("/user/register", auth.registerAccount);
app.post("/user/login", auth.loginAccount);
app.post("/user/logout", auth.logout);
app.post("/user/forget", auth.forgetPassword);
app.post("/user/reset/:userToken", auth.resetPassword);
app.post("/user/checkEmailExist", auth.checkEmailExist);
// api for admin
app.post("/admin/listPatients", admin.listPatients)
app.post("/admin/listPractioners", admin.listPractitioners)

app.post("/appointment/create", appointment.createAppointment);

app.post("/disease/findDisease", disease.findDiseasesBySymptoms);
app.post("/disease/all", disease.queryAllDiseases);

app.post("/practitioner/findPractitioner", disease.findDiseasesBySymptoms);

=======
>>>>>>> d79047a81ac5ca8cc418bf10f13577348c5705a1
app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});