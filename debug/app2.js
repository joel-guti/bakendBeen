const app = require("../app");
const bodypasser = require("body-parser");
const helpers = require("../models/HelpContact");
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.post("/createHelperText", async(req, res) => {
    let body = req.body;
    let newHelper = helpers.create(body);
    console.log(newHelper)
    res.send({
        ok: true,
        newHelper
    })
});
app.listen(3000, () => {
    console.log("escuchando");
});