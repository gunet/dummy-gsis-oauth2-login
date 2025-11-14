const express = require("express");
const app = express();
const path = require("path");

app.use(express.json());
app.set("view engine", "pug");
app.set('views', path.join(__dirname, 'views'));


app.get('/authorize', (req, res) => {
  // If we are not given a redirect_uri, we cannot continue (and log the error)
  if (!req.query.redirect_uri) {
    console.error('Missing redirect_uri parameter');
    return res.status(400).send('Missing redirect_uri parameter');
  }
  console.log('authorize (client IP ' + req.ip + ') with redirect uri:' + req.query.redirect_uri);
  const redirectUri = new URL(req.query.redirect_uri);
  // Create a random 16 digit code for demonstration purposes
  const code = Math.random().toString().slice(2, 18);
  redirectUri.searchParams.append('code', code);
  redirectUri.searchParams.append('state', req.query.state);
  return res.render('authorize', {redirect: redirectUri.toString()});
});

app.post('/authorize', (req, res) => {
  return res.redirect(req.query.redirect_uri);
});

app.post('/setuserinfo', (req, res) => {
  const { user, afm, lastname } = req.body;
  console.log(`Set userinfo called with user: ${user}, afm: ${afm} and lastname: ${lastname}`);

  process.env.USERID = user;
  process.env.LASTNAME = lastname;
  process.env.TAXID = afm;

  return res.status(200).json({ message: 'User info set successfully' });
});

app.post('/token', (req, res) => {
  console.log('token (client IP ' + req.ip + ')');
  const responseObject = {
    access_token: 'blabla',
    token_type: "example",
    expires_in: '1000',
    refresh_token: 'bla',
    example_parameter: "ignored??",
    scope: 'test'
  };

  return res.status(200).send(responseObject)
});

app.get('/userinfo', (req, res) => {
  console.log('userinfo - get (client IP ' + req.ip + ')');
  res.set('Content-Type', 'text/xml');
  const userid = process.env.USERID || 'gunetdemo';
  const taxid = process.env.TAXID || '012345678';
  const lastname = process.env.LASTNAME || 'ΔΟΚΙΜΑΣΤΙΚΟΣ';
  
  return res.status(200).send(`<root><userinfo userid="${userid}" taxid="${taxid}" lastname="${lastname}" firstname="ΕΥΤΥΧΙΑ" fathername="ΕΜΜΑΝΟΥΗΛ" mothername="ΑΝΝΑ" birthyear="1950"/></root>`)
});

app.get('/logout/*', (req, res) => {
  console.log('Logout, ', req.query.url);
  return res.redirect(req.query.url);
})

app.post('/userinfo', (req, res) => {
  console.log('userinfo - post (client IP ' + req.ip + ')');
  const userid = process.env.USERID || 'gunetdemo';
  const taxid = process.env.TAXID || '012345678';
  const lastname = process.env.LASTNAME || 'ΔΟΚΙΜΑΣΤΙΚΟΣ';
  
  return res.status(200).json(
    {
      "root": {
        "userinfo": {
          "taxid": taxid,
          "userid": userid,
          "lastname": lastname,
          "firstname": "ΕΥΤΥΧΙΑ",
          "fathername": "ΕΜΜΑΝΟΥΗΛ",
          "mothername": "ΑΝΝΑ",
          "birthyear": "1950"
        }
      }
    });
});

// Listen on env.PORT or 4099
const server = app.listen(process.env.PORT || 4099, process.env.ADDRESS || '0.0.0.0', () => {
  console.log(
    "Listening on: " + server.address().address + ":" + server.address().port
  );
});

// Graceful shutdown handling
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
    process.exit(0);
  });
});
