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
	const params = new URLSearchParams({
		isLogged: false,
	});
	res.redirect("/?" + params.toString());
});

// POST
router.post("/authentication/sign-in", (req, res) => {
	if (
		req.body.username !== user.name ||
		req.body.password !== user.password
	) {
		const params = new URLSearchParams({
			error: "Identifiants incorrects",
		});
		res.redirect("/authentication/sign-in?" + params.toString());
		return;
	}
	const params = new URLSearchParams({
		isLogged: true,
	});
	res.redirect("/?" + params.toString());
});

// NOT FOUND
router.get("/*splat", (req, res) => {
	res.send("<h1>not found</h1>");
});

export default router;