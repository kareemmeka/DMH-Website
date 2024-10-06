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
      "https://drive.google.com/file/d/1b_LWQ0MYp9rGPBcx4ftV5jVMAjqvefJf/preview",
    },
    {
      name: "Micheal Victor",
      age: 14,
      countryIcon: "assets/icons/eg.svg",
      videoSrc:
        "https://drive.google.com/file/d/1ivj-O0JC-hjNNldW0HOIjP2q0C-a42EX/preview",
    },
    {
      name: "Ahmed Mohamed",
      age: 15,
      countryIcon: "assets/icons/eg.svg",
      videoSrc:
        "https://drive.google.com/file/d/1aAkR7qRbPs1T230FjmVu3AMqIGfDpbXW/preview",
    },
    {
      name: "Islam Ahmed",
      age: 12,
      countryIcon: "assets/icons/eg.svg",
      videoSrc:
        "https://drive.google.com/file/d/1bTeo0TIKhqqatCIhtgXB1p-FAaVzFu0d/preview",
    },
    {
      name: "Adam Mohammed",
      age: 10,
      countryIcon: "assets/icons/eg.svg",
      videoSrc:
        "https://drive.google.com/file/d/1x6D9H_Hrvy1VwNGkzr2NZ8G_8LhdjdHE/preview",
    },
    {
      name: "Jana Hosny",
      age: 12,
      countryIcon: "assets/icons/eg.svg",
      videoSrc:
        "https://drive.google.com/file/d/1rhB7HCWTeFjz_OXRvwY5aUov_9oTUeHO/preview",
    },
    {
      name: "Omar Abulwaffa",
      age: 12,
      countryIcon: "assets/icons/eg.svg",
      videoSrc:
        "https://drive.google.com/file/d/1VGczIW-zg0lQ6I9pYjKUZOZPasu_GVK4/preview",
    },
    {
      name: "Mohammed Elsayed",
      age: 12,
      countryIcon: "assets/icons/eg.svg",
      videoSrc:
        "https://drive.google.com/file/d/1JdQdVYm0iD1IuidEO_2Qly8AGjCXRV92/preview",
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
