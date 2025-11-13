# Docker

## Main

* Build: `docker compose build`
* Run: `docker compose up -d`
  * Default port: `4099`

## Environment variables

* `PORT=4099`
* `ADDRESS=0.0.0.0`
* `USERID=gunetdemo`
* `TAXID=012345678`
* `LASTNAME=ΔΟΚΙΜΑΣΤΙΚΟΣ`

## Size

* Image size: `200 MB`

## Usage

* Authorize: `curl http://localhost:4099/authorize?redirect_uri=<url>`
* Token: `curl -X POST http://localhost:4099/token`

  ```json
  {
    "access_token": "blabla",
    "token_type": "example",
    "expires_in": "1000",
    "refresh_token": "bla",
    "example_parameter": "ignored??",
    "scope": "test"
  }
  ```

> [!NOTE]
> The `/userinfo` endpoint dynamically returns the user data entered during the /authorize flow
> (which sends a POST request to `/setuserinfo`). When the user submits the User, AFM, and Last Name fields
> in the authorization form, these values are stored and later reflected in the /userinfo response.
> If the form is left blank, the endpoint falls back to the default environment variable values:

* Userinfo (`GET`): `curl http://localhost:4099/userinfo`

  ```xml
  <root><userinfo userid="gunetdemo" taxid="012345678" lastname="ΔΟΚΙΜΑΣΤΙΚΟΣ" firstname="ΕΥΤΥΧΙΑ" fathername="ΕΜΜΑΝΟΥΗΛ" mothername="ΑΝΝΑ" birthyear="1950"/></root>
  ```

* Userinfo (`POST`): `curl -X POST http://localhost:4099/userinfo`

  ```json
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
  }
  ```
