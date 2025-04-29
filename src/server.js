import "dotenv/config";
import express from "express";
import path from "path";
import { URLSearchParams } from "url";

const PORT = process.env.PORT || 9000;

const app = express();
const protectedPath = ["/admin", "/contact"];
const user = {
	name: "aaa",
	password: "aaa",
	isLogged: false,
	admin: true,
};

app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "src", "views"));

app.use(express.urlencoded());
app.use(express.static(path.join(process.cwd(), "public")));

app.use((req, res, next) => {
	res.locals.user = user;
	res.locals.error = req.query.error || null;

	next();
});

app.use((req, res, next) => {
	if (!protectedPath.includes(req.url)) {
		next();
	} else {
		if (user.admin) res.send("<h1>ADMIN PANEL</h1>");
		else res.send("<h1>not found</h1>");
	}
});

app.get("/", (req, res) => {
	user.isLogged = req.query.isLogged === "true";
	res.render("layout/template", { file: "home" });
});

app.get("/authentication/sign-in", (req, res) => {
	res.render("layout/template", { file: "sign-in" });
});

app.post("/authentication/sign-in", (req, res) => {
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

app.get("/authentication/sign-out", (req, res) => {
	const params = new URLSearchParams({
		isLogged: false,
	});
	res.redirect("/?" + params.toString());
});

app.listen(PORT, () => console.log("Running at http://localhost:" + PORT));
