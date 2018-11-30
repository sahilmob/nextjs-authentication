const next = require("next");
const express = require("express");

const dev = process.env.NODE_ENV !== "production";
const port = process.env.PORT || 3000;
const handle = app.getRequestHandler();

const app = next({ dev });

app.prepare().then(() => {
	const server = express();

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
