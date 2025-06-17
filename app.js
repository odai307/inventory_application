const express = require("express");
const app = express();


const categoriesRouter = require("./routes/categoriesRouter");
const itemsRouter = require("./routes/itemsRouter");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.redirect("/categories")
});


app.use("/categories", categoriesRouter);
app.use("/items", itemsRouter);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})