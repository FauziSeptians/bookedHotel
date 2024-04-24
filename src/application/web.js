import express from "express";
import { publicRouter } from "../router/publicApi.js";
import { connectDB } from "./database.js";
import { privateRouter } from "../router/Api.js";
import { errorMiddleware } from "../middleware/error-middleware.js";
import 'dotenv/config'

export const web = express();
web.set("view engine", "ejs");

web.use(express.static("public"));

web.get("/", (req, res) => {
   res.render("index");
});


// about
web.get("/about", (req, res) => {
    res.render("about")/*, { title: "VIMIGA | About" }*/;
});

// room
web.get("/room", (req, res) => {
    res.render("room")/*, { title: "VIMIGA | Rooms" }*/;
});

// service
web.get("/service", (req, res) => {
    res.render("service")/*, { title: "VIMIGA | Services" }*/;
});

// explore
web.get("/explore", (req, res) => {
    res.render("explore")/*, { title: "VIMIGA | Explore" }*/;
});

// contact
web.get("/contact", (req, res) => {
    res.render("contact")/*, { title: "VIMIGA | Contact" }*/;
});

// login
web.get("/login", (req, res) => {
    res.render("login")/*, { title: "VIMIGA | Login" }*/;
});



web.use(express.json());
web.use(publicRouter);
web.use(privateRouter);
web.use(errorMiddleware);

connectDB();
