const express = require("express");
const app = express();
const port = 8200 || process.env.PORT;
var cors = require("cors");
var admin = require("firebase-admin");
const dotenv = require("dotenv");
const v1Routes = require("./routes/v1routes.js");

dotenv.config();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

let maindb = admin.initializeApp(
  {
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID1,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL1,
      privateKey: process.env.FIREBASE_PRIVATE_KEY1.replace(/\\n/g, "\n"),
    }),
  },
  "secondaryaccountfirebase"
);

const db = maindb.firestore();
app.get("/", async (req, res) => {
  const mainref = db.collection("test").doc("123");
  try {
    const data = await mainref.get();
    if (data.exists) {
      res.send({
        message: "success",
        messageText: "data found",
        data: { ...data.data() },
      });
    } else {
      res.send({
        message: "error",
        messageText: "data not found",
      });
    }
  } catch (err) {
    res.status(400).json({ error: "Something went wrong" });
  }
});
app.use("/v1", v1Routes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
