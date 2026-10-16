const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/:date?', (req, res) => {
  const { date } = req.params;
  let d;

  if (!date) {
    d = new Date();
  } else if (/^-?\d+$/.test(date)) {
    d = new Date(parseInt(date, 10));
  } else {
    d = new Date(date);
  }

  if (isNaN(d.getTime())) {
    return res.json({ error: 'Invalid Date' });
  }

  res.json({ unix: d.getTime(), utc: d.toUTCString() });
});

const listener = app.listen(process.env.PORT || 8000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
