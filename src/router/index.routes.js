import { Router } from "express";
import { URLSearchParams } from "url";

const router = Router();

const user = {
	name: "aaa",
	password: "aaa",
	isLogged: false,
	admin: true,
};

// GET
router.get("/", (req, res) => {
	user.isLogged = req.query.isLogged === "true";
	res.render("layout/template", { file: "home" });
});

// AUTHENTICATION ROUTES
router.get("/authentication/sign-in", (req, res) => {
	res.render("layout/template", { file: "sign-in" });
});

router.get("/authentication/sign-out", (req, res) => {
    req.session.destroy();
    res.clearCookie("connect.sid");
	res.redirect("/authentication/sign-in");
});

// POST
router.post("/authentication/sign-in", (req, res) => {
    const userInfo = {
        name: req.body.username,
        isLogged: true,
    }
	req.session.user = userInfo;

	res.redirect("/");
});

// NOT FOUND
router.get("/*splat", (req, res) => {
	res.send("<h1>not found</h1>");
});

export default router;
