const next = require("next");
const express = require("express");
const axios = require("axios");
const cookieParser = require("cookie-parser");

import { api } from "./costants";

const dev = process.env.NODE_ENV !== "production";
const port = process.env.PORT || 3000;

const app = next({ dev });
const handle = app.getRequestHandler();
const AUTH_USER_TYPE = "authenticated";
const cookieSecret = "wsrth%#$sdgafr34w2fv24w43ew2fefv";
const COOKIE_OPTIONS = {
	httpOnly: true,
	secure: !dev,
	signed: true
};

const authenticate = async (email, password) => {
	const { data } = await axios.get(api);
	return data.find(user => {
		if (user.email === email && user.website === password) {
			return user;
		}
	});
};

app.prepare().then(() => {
	const server = express();
	server.use(express.json());
	server.use(cookieParser(cookieSecret));

	server.post("/api/login", async (req, res) => {
		const { email, password } = req.body;
		const user = await authenticate(email, password);
		if (!user) {
			return res.status(403).send('"Invalid email or password');
		}
		const userData = {
			name: user.name,
			email: user.email,
			type: AUTH_USER_TYPE
		};
		res.cookie("token", userData, COOKIE_OPTIONS);
		res.json(userData);
	});

	server.get("/api/logout", (req, res) => {
		res.clearCookie("token", COOKIE_OPTIONS);
		res.send(204);
	});

	server.get("/api/profile", async (req, res) => {
		// if no signedCookies, the default is empty object
		const { signedCookies = {} } = req;
		const { token } = signedCookies;
		if (token && token.email) {
			const { data } = await axios.get(api);
			const userProfile = data.find(user => user.email === token.email);
			return res.json({ user: userProfile });
		}
		res.status(404);
	});

	server.get("*", (req, res) => {
		return handle(req, res);
	});

	server.listen(port, err => {
		if (err) {
			throw err;
		} else {
			console.log(`Listening on PORT ${port}`);
		}
	});
});
