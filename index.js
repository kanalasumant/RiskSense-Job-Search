const express = require('express');
const path = require('path');

const app = express();

// Serve static files from the client directory
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/api/query', (req, res) => {
	res.json({
		test: "Working!",
		feel: "Hellos world"
	});
});

app.get('*', (req, res) => {
  res.json({
  	status: "Invalid URL"
  })
});

const port = process.env.PORT || 5000;
app.listen(port);
