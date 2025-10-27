const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://peppin03:peppin03@cluster0.u4lbeki.mongodb.net/bulkMail?retryWrites=true&w=majority&appName=Cluster0").then(() => {
  console.log("Database Start...")
  
});
const mail = mongoose.model("mail", { user: "string", pass: "string" }, "mail");
const history = mongoose.model(
  "history",
  {
    from: "string",
    to: ["string"],
    date: "string",
    time: "string",
    subject: "string",
    text: "string",
  },
  "history"
);



app.get('/mail',async(req,res)=>{
 const damail = await history.find()
 res.send(damail)
 

})

app.post("/mail", async (req, res) => {
  let { finalArr, text, subject, date, time } = req.body;

  let mailData = await mail.findOne();

  history
    .insertOne({
      from: `${mailData.user}`,
      to: finalArr,
      date,
      time,
      subject,
      text,
    })
    .then((val) => console.log('Data Added Successfully'))
    .catch((val) => console.log('Problem in data added process'));

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: mailData.user,
      pass: mailData.pass,
    },
  });

  try {
    for (let i = 0; i < finalArr.length; i++) {
      await transporter.sendMail({
        from: `${mailData.user}`,
        to: finalArr[i],
        subject,
        text,
      });

      console.log("Message sent to:", finalArr[i]);
    }
    res.send([false, true]);
  } catch (error) {
    console.log(error.message);

    res.send([false, false]);
  }
});

app.listen(3000, () => {
  console.log("Server start....");
});
