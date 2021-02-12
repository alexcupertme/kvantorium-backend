# KvantoriumWeb backend
Node.js backend for Kvantorium Web

## API requests
### Registration
* ```/reg``` - registration

Request                                 | Response
--------------------------------------- | --------------------------------------
Request:                         ```                                    
{ login:                               
    req.body.login,                    
    name: req.body.name, 
    mail: req.body.mail, 
    password: req.body.password 
}```
|
Respond:
```
{ success: %ERROR CODE% }
```
### Authorization
* ```/auth``` - authorization

Request:
```
{
    login: req.body.login,
    password: req.body.password,
}
```
Respond:
```
{
    success: "SUCCESS",
    token: token,
} // SUCCESSFUL RESPOND

{
    success: %ERROR_CODE%,
} // UNSUCCESSFUL RESPONSE
```
### Token authorization
* ```/start_session``` - start session (authorization middle request)

Request:
```
{
    token: token
}
```
Respond:
```
{ success: %ERROR CODE% }
```
## Error codes
* ```SUCCESS``` - success request
* ```ERROR_EMPTY_FIELD``` - some fields are empty.
* ```ERROR_BAD_LENGTH``` - some data has length above or below the validator
  * Login: 3 - 30
  * Name: 1 - 50
  * Mail: 1+
  * Password: 8+
* ```ERROR_BAD_PASSWORD``` - password doesnt match validator
* ```ERROR_BAD_EMAIL``` - email doesnt match validator
* ```ERROR_USER_NOT_ADDED``` - server-side error (registration)
* ```ERROR_MAIL_HAS_REGISTERED``` - email has been already used while register
* ```ERROR_USER_ALREADY_EXISTS``` - login has been already used while register
* ```ERR_USER_NOT_FOUND``` - incorrect login
* ```ERR_INCORRECT_PASSWORD``` - incorrect password
* ```ERR_INVALID_TOKEN``` - incorrect token
