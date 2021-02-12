# KvantoriumWeb backend
Node.js backend for Kvantorium Web

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
