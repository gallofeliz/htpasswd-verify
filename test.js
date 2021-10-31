const username = 'superAdmin27!'
const originalPassword = 'iAmNotHacker27!'
const assert = require('assert')
const HtpasswdValidator = require('.')

const credentials = [
    'superAdmin27!:{SHA}m3eMTmxi2IBKIZgAnySjD/tg8W8=', // sha
    'superAdmin27!:$2y$05$L/jPI05ltEKrwIjQThJ4keBFKH/aRDpxY9CaaVWYIZcPu0FXdRO6i', //bcrypt
    'superAdmin27!:$apr1$GZ650zxv$99/Dg0Y6os0zquEMaYoJx1', // default
    'superAdmin27!:5G1OI2SwmK4v6', // crypt
    'superAdmin27!:iAmNotHacker27!' // plain
]

const validator = new HtpasswdValidator

for (const credential of credentials) {
    assert(validator.verifyCredentials(username, originalPassword, credential), credential)
}

console.log('Ok !')
