const express = require("express");
const app = express();
const mailer = require("nodemailer");
const ejs = require("ejs");

// Express settings
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
require("dotenv").config();

// Start the server
app.listen(3000, () => {
  console.log(`App is running on http://localhost:3000`);
});

// Videos
app.get("/", (req, res) => {
  let videos = [
    {
      name: "Mohammed Usama",
      age: 12,
      countryIcon: "assets/icons/eg.svg",
      videoSrc:
        "https://drive.google.com/file/d/1ENT2Uj1X05nITlatHgqrSj175cjamYY1/preview",
    },
    {
      name: "Sajda Hossam",
      age: 17,
      countryIcon: "assets/icons/eg.svg",
      videoSrc:
        "https://drive.google.com/file/d/14zzerI37ZcQSf2EzxsJ3Z-rWKIQ2Weje/preview",
    },
    {
      name: "Sajda Hossam",
      age: 17,
      countryIcon: "assets/icons/eg.svg",
      videoSrc:
        "https://drive.google.com/file/d/14zzerI37ZcQSf2EzxsJ3Z-rWKIQ2Weje/preview",
    },
    {
      name: "Ahmed Mohamed",
      age: 16,
      countryIcon: "assets/icons/eg.svg",
      videoSrc:
        "https://drive.google.com/file/d/1BbVGZO7Nh8Bume8fnQ8zboF2iK9hC1XF/preview",
    },
    {
      name: "Sajda Hossam",
      age: 17,
      countryIcon: "assets/icons/eg.svg",
      videoSrc:
        "https://drive.google.com/file/d/14zzerI37ZcQSf2EzxsJ3Z-rWKIQ2Weje/preview",
    },
    {
      name: "Sajda Hossam",
      age: 17,
      countryIcon: "assets/icons/eg.svg",
      videoSrc:
        "https://drive.google.com/file/d/14zzerI37ZcQSf2EzxsJ3Z-rWKIQ2Weje/preview",
    },
    {
      name: "Ahmed Mohamed",
      age: 16,
      countryIcon: "assets/icons/eg.svg",
      videoSrc:
        "https://drive.google.com/file/d/1BbVGZO7Nh8Bume8fnQ8zboF2iK9hC1XF/preview",
    },
    {
      name: "Sajda Hossam",
      age: 17,
      countryIcon: "assets/icons/eg.svg",
      videoSrc:
        "https://drive.google.com/file/d/14zzerI37ZcQSf2EzxsJ3Z-rWKIQ2Weje/preview",
    },
    {
      name: "Sajda Hossam",
      age: 17,
      countryIcon: "assets/icons/eg.svg",
      videoSrc:
        "https://drive.google.com/file/d/14zzerI37ZcQSf2EzxsJ3Z-rWKIQ2Weje/preview",
    },
  ];
  res.render("index", { videos: videos, message: "Hello, World!" });
});

const transporter = mailer.createTransport({
  host: "mail.digitalmindshub.org",
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL,
    pass: process.env.MAIL_PASS,
  },
});

app.post("/register", (req, res) => {
  const data = {
    name: req.body.name,
    date: req.body.date,
    email: req.body.email,
    citizien: req.body.citizien,
    gender: req.body.gender,
    resident: req.body.rcountry,
    phone: req.body.phone,
    school: req.body.school,
    schoolType: req.body.schoolType,
    // Parent
    pname: req.body.pname,
    pemail: req.body.pemail,
    course: req.body.course,
    pcountry: req.body.country,
    city: req.body.city,
    // other
    street: req.body.street,
    postal: req.body.postal,
    promocode: req.body.promocode,
    referral: req.body.referral,
    initiative: req.body.initiative,
    aid: req.body.aid,
    caption: "His",
    cap: "He",
  };

  if (req.body.gender == "female") {
    data.caption = "Her";
    data.cap = "She";
  }

  if (req.body.initiative == "on") {
    data.initiative = "Applying For DMH Literacy";
  } else {
    data.initiative = "Not Applying For DML Literacy";
  }

  if (req.body.aid == "on") {
    data.aid = "Appling For Financial Aid";
  } else {
    data.aid = "Not Appling For Financial Aid";
  }
  
  // res.render('regmail.ejs', data)

  ejs.renderFile("./views/regmail.ejs", data, async function (err, ejsout) {
    await new Promise((resolve, reject) => {
      transporter.sendMail(
        {
          from: process.env.MAIL,
          to: process.env.MAIL,
          subject: "New Student want to register 😊",
          html: ejsout,
        },
        (err, info) => {
          if (err) {
            res.render("msg", {
              msg: "Sorry there was an error. Please contact us via Mail or Whatsapp.",
            });
          } else {
            res.render("msg", {
              msg: "Thank you, our team will mail you within 48 hours. please check your email and WhatsApp.",
            });
          }
        }
      );
    });
  });
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.use((req, res) => {
  res.status(404).json({
    error: "404 Not Found",
    message: "Sorry, the page you are looking for does not exist.",
  });
});
