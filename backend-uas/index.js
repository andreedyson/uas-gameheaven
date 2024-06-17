const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const port = 3000;

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/users", require("./routes/user"));
app.use("/category", require("./routes/category"));
app.use("/brand", require("./routes/brand"));
app.use("/product", require("./routes/product"));
app.use("/transaction", require("./routes/transaction"));
app.use("/img/product", express.static(path.join(__dirname, "upload"))); // Get Product Image

app.listen(port, () => {
  console.log(`Backend UAS Pemrograman 3 berjalan di port ${port}`);
});
