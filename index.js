const express = require("express");
const app = express();
const path = require("path");
const config = require("./config");

app.set("view engine", "pug");
app.set('views', path.join(__dirname, 'views'));


app.get('/authorize', (req, res) => {
  console.log(req.query);
  console.log(req.query.redirect_uri);
  const redirectUri = new URL(req.query.redirect_uri);
  redirectUri.searchParams.append('code', '11231231123');
  redirectUri.searchParams.append('state', req.query.state);
  return res.render('authorize', {redirect: redirectUri.toString()});
});

app.post('/authorize', (req, res) => {
  return res.redirect(req.query.redirect_uri);
});

app.post('/token', (req, res) => {
  console.log('token');
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
  console.log('userinfo - get');
  res.set('Content-Type', 'text/xml');
  return res.status(200).send('<root><userinfo userid="rg1201" taxid="068933130   " lastname="ΒΑΒΟΥΛΑ" firstname="ΕΥΤΥΧΙΑ" fathername="ΕΜΜΑΝΟΥΗΛ" mothername="ΑΝΝΑ" birthyear="1950"/></root>')
});

app.get('/logout/*', (req, res) => {
  console.log('Logout, ', req.query.url);
  return res.redirect(req.query.url);
})

app.post('/userinfo', (req, res) => {
  console.log('userinfo - post');
  return res.status(200).json(
    {
      "root": {
        "userinfo": {
          "taxid": "068933130",
          "userid": "User068933130",
          "lastname": "βαβουλα",
          "firstname": "ΕΥΤΥΧΙΑ",
          "fathername": "ΕΜΜΑΝΟΥΗΛ",
          "mothername": "ΑΝΝΑ",
          "birthyear": "1950"
        }
      }
    });
});

const server = app.listen(config.port || 4099, config.address || '0.0.0.0', () => {
  console.log(
    "Listening on: " + server.address().address + ":" + server.address().port
  );
});
