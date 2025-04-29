import express from "express";
import path from "path";

import router from "./router/index.routes.js";

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

app.use(router);

export default app;