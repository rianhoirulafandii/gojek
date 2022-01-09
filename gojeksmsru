const chalk = require('chalk');
const moment = require('moment');
const fetch = require('node-fetch');
const SMSActivate = require('sms-activate');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config()
const sms = new SMSActivate(process.env.SMS_ACTIVATE_TOKEN);
const delay = require('delay');
const fs = require('async-file');

const randstr = length =>
    new Promise((resolve, reject) => {
        var text = "";
        var possible =
            "abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ";

        for (var i = 0; i < length; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        resolve(text);
    });

const genUniqueId = length =>
    new Promise((resolve, reject) => {
        var text = "";
        var possible =
            "abcdefghijklmnopqrstuvwxyz1234567890";

        for (var i = 0; i < length; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        resolve(text);
    });

const generateIndoName = () => new Promise((resolve, reject) => {
    fetch('https://swappery.site/data.php?qty=1', {
        method: 'GET'
    })
        .then(res => res.json())
        .then(res => {
            resolve(res)
        })
        .catch(err => {
            reject(err)
        })
});

const sendOtp = (name, email, sessionId, phoneNumber, uniqueId) => new Promise((resolve, reject) => {

    fetch('https://api.gojekapi.com/v5/customers', {
        method: 'POST',
        headers: {
            'X-Signature': '2002',
            'X-Signature-Time': moment().unix().toString(),
            'X-Session-ID': sessionId,
            'Accept': 'application/json',
            'X-AppVersion': '4.27.2',
            'X-AppId': 'com.gojek.app',
            'X-Platform': 'Android',
            'X-UniqueId': uniqueId,
            'D1': '17:AC:A3:A5:AD:0B:5E:27:A1:A1:42:32:FF:CF:15:CB:2C:11:C6:8C:BB:8E:6B:BB:F2:70:DA:EE:38:47:BE:60',
            'X-DeviceOS': 'Android,7.0',
            'X-User-Type': 'customer',
            'X-PhoneMake': 'unknown',
            'X-DeviceToken': '',
            'X-PushTokenType': 'FCM',
            'X-PhoneModel': 'Android,xiaomi redmi note 7',
            'User-uuid': '',
            'Authorization': 'Bearer',
            'Accept-Language': 'en-null',
            'X-User-Locale': 'en_null',
            'X-Location': '0.0,0.0',
            'X-Location-Accuracy': '0.0',
            'X-M1': '1:UNKNOWN,2:UNKNOWN,3:1631626880354-3511426940583375156,4:12756,5:|UNKNOWN|4,6:UNKNOWN,7:\"WiredSSID\",8:768x1184,9:,10:1,11:UNKNOWN,12:VALUE_NOT_PRESENT,13:2002,14:1631627037',
            'Content-Type': 'application/json; charset=UTF-8',
            'Content-Length': '107',
            'Host': 'api.gojekapi.com',
            'Connection': 'close',
            'Accept-Encoding': 'gzip, deflate',
            'User-Agent': 'okhttp/3.12.13'
        },
        body: `{"email":"${email}","name":"${name}","phone":"+${phoneNumber}","signed_up_country":"ID"}`
    }).then(res => res.json())
        .then(res => {
            resolve(res)
        })
        .catch(err => {
            reject(err)
        })
});

const veryfOtp = (otp, otpToken, sessionId, uniqueId) => new Promise((resolve, reject) => {

    fetch('https://api.gojekapi.com/v5/customers/phone/verify', {
        method: 'POST',
        headers: {
            'X-Session-ID': sessionId,
            'Accept': 'application/json',
            'X-AppVersion': '4.27.2',
            'X-AppId': 'com.gojek.app',
            'X-Platform': 'Android',
            'X-UniqueId': uniqueId,
            'D1': '17:AC:A3:A5:AD:0B:5E:27:A1:A1:42:32:FF:CF:15:CB:2C:11:C6:8C:BB:8E:6B:BB:F2:70:DA:EE:38:47:BE:60',
            'X-DeviceOS': 'Android,7.0',
            'X-User-Type': 'customer',
            'X-PhoneMake': 'unknown',
            'X-DeviceToken': '',
            'X-PushTokenType': 'FCM',
            'X-PhoneModel': 'Android,xiaomi redmi note 7',
            'User-uuid': '',
            'Authorization': 'Bearer',
            'Accept-Language': 'en-null',
            'X-User-Locale': 'en_null',
            'X-Location': '0.0,0.0',
            'X-Location-Accuracy': '0.0',
            'X-M1': '1:UNKNOWN,2:UNKNOWN,3:1631626880354-3511426940583375156,4:12756,5:|UNKNOWN|4,6:UNKNOWN,7:\"WiredSSID\",8:768x1184,9:,10:1,11:UNKNOWN,12:VALUE_NOT_PRESENT,13:2002,14:1631627063',
            'Content-Type': 'application/json; charset=UTF-8',
            'Content-Length': '158',
            'Host': 'api.gojekapi.com',
            'Connection': 'close',
            'Accept-Encoding': 'gzip, deflate',
            'User-Agent': 'okhttp/3.12.13'
        },
        body: `{"client_name":"gojek:consumer:app","client_secret":"pGwQ7oi8bKqqwvid09UrjqpkMEHklb","data":{"otp":"${otp}","otp_token":"${otpToken}"}}`
    }).then(res => res.json())
        .then(res => {
            resolve(res)
        })
        .catch(err => {
            reject(err)
        })
});

const requestGetNewJwt = (refreshToken, sessionId, jwt, userId, uniqueId) => new Promise((resolve, reject) => {
    fetch('https://goid.gojekapi.com/goid/token', {
        method: 'POST',
        headers: {
            'X-Signature': '2001',
            'X-Signature-Time': moment().unix().toString(),
            'X-Platform': 'Android',
            'X-UniqueId': uniqueId,
            'D1': '9A:C9:4F:37:14:82:43:AC:08:0E:69:64:80:70:69:F7:08:A5:AF:FC:A2:EA:20:1C:F8:3C:FE:6E:A1:6E:C3:CB',
            'X-Session-ID': sessionId,
            'Accept': 'application/json',
            'X-AppVersion': '4.27.2',
            'X-AppId': 'com.gojek.app',
            'X-DeviceOS': 'Android,7.0',
            'X-User-Type': 'customer',
            'X-PhoneMake': 'unknown',
            'X-DeviceToken': '',
            'X-PushTokenType': 'FCM',
            'X-PhoneModel': 'Android,xiaomi redmi note 7',
            'User-uuid': userId,
            'Authorization': `Bearer ${jwt}`,
            'Accept-Language': 'en-ID',
            'X-User-Locale': 'en_ID',
            'X-M1': '1:UNKNOWN,2:UNKNOWN,3:1631626880354-3511426940583375156,4:12756,5:|UNKNOWN|4,6:UNKNOWN,7:\"WiredSSID\",8:768x1184,9:,10:1,11:UNKNOWN,12:VALUE_NOT_PRESENT,13:2001,14:1631633881',
            'Content-Type': 'application/json; charset=UTF-8',
            'Content-Length': '189',
            'Host': 'goid.gojekapi.com',
            'Connection': 'close',
            'Accept-Encoding': 'gzip, deflate',
            'User-Agent': 'okhttp/3.12.13'
        },
        body: `{"client_id":"gojek:consumer:app","client_secret":"pGwQ7oi8bKqqwvid09UrjqpkMEHklb","data":{"refresh_token":"${refreshToken}"},"grant_type":"refresh_token","scopes":[]}`
    }).then(res => res.json())
        .then(res => {
            resolve(res)
        })
        .catch(err => {
            reject(err)
        })
});

const firstSetPin = (sessionId, jwt, userId, uniqueId) => new Promise((resolve, reject) => {
    fetch('https://customer.gopayapi.com/v1/users/pin', {
        method: 'POST',
        headers: {
            'X-Platform': 'Android',
            'X-UniqueId': uniqueId,
            'D1': '9A:C9:4F:37:14:82:43:AC:08:0E:69:64:80:70:69:F7:08:A5:AF:FC:A2:EA:20:1C:F8:3C:FE:6E:A1:6E:C3:CB',
            'X-Session-ID': sessionId,
            'Accept': 'application/json',
            'X-AppVersion': '4.27.2',
            'X-AppId': 'com.gojek.app',
            'X-DeviceOS': 'Android,7.0',
            'X-User-Type': 'customer',
            'X-PhoneMake': 'unknown',
            'X-DeviceToken': '',
            'X-PushTokenType': 'FCM',
            'X-PhoneModel': 'Android,xiaomi redmi note 7',
            'User-uuid': userId,
            'Authorization': `Bearer ${jwt}`,
            'Accept-Language': 'en-ID',
            'X-User-Locale': 'en_ID',
            'X-Location': '65.9667,-18.5333',
            'X-Location-Accuracy': '0.0',
            'Gojek-Country-Code': 'ID',
            'X-M1': '1:UNKNOWN,2:UNKNOWN,3:1631626880354-3511426940583375156,4:12756,5:|UNKNOWN|4,6:UNKNOWN,7:\"WiredSSID\",8:768x1184,9:,10:1,11:UNKNOWN,12:VALUE_NOT_PRESENT,13:2002,14:1631633940',
            'Content-Type': 'application/json; charset=UTF-8',
            'Content-Length': '16',
            'Host': 'customer.gopayapi.com',
            'Connection': 'close',
            'Accept-Encoding': 'gzip, deflate',
            'User-Agent': 'okhttp/3.12.13'
        },
        body: '{"pin":"080599"}'
    }).then(res => res.json())
        .then(res => {
            resolve(res)
        })
        .catch(err => {
            reject(err)
        })
});

const secondSetPin = (otp, sessionId, jwt, userId, uniqueId) => new Promise((resolve, reject) => {
    console.log(otp, sessionId, jwt, userId, uniqueId)
    fetch('https://customer.gopayapi.com/v1/users/pin', {
        method: 'POST',
        headers: {
            'otp': otp,
            'X-Platform': 'Android',
            'X-UniqueId': uniqueId,
            'D1': '9A:C9:4F:37:14:82:43:AC:08:0E:69:64:80:70:69:F7:08:A5:AF:FC:A2:EA:20:1C:F8:3C:FE:6E:A1:6E:C3:CB',
            'X-Session-ID': sessionId,
            'Accept': 'application/json',
            'X-AppVersion': '4.27.2',
            'X-AppId': 'com.gojek.app',
            'X-DeviceOS': 'Android,7.0',
            'X-User-Type': 'customer',
            'X-PhoneMake': 'unknown',
            'X-DeviceToken': '',
            'X-PushTokenType': 'FCM',
            'X-PhoneModel': 'Android,xiaomi redmi note 7',
            'User-uuid': userId,
            'Authorization': `Bearer ${jwt}`,
            'Accept-Language': 'en-ID',
            'X-User-Locale': 'en_ID',
            'X-Location': '65.9667,-18.5333',
            'X-Location-Accuracy': '0.0',
            'Gojek-Country-Code': 'ID',
            'X-M1': '1:UNKNOWN,2:UNKNOWN,3:1631626880354-3511426940583375156,4:12756,5:|UNKNOWN|4,6:UNKNOWN,7:\"WiredSSID\",8:768x1184,9:,10:1,11:UNKNOWN,12:VALUE_NOT_PRESENT,13:2002,14:1631633963',
            'Content-Type': 'application/json; charset=UTF-8',
            'Content-Length': '16',
            'Host': 'customer.gopayapi.com',
            'Connection': 'close',
            'Accept-Encoding': 'gzip, deflate',
            'User-Agent': 'okhttp/3.12.13'
        },
        body: '{"pin":"080599"}'
    }).then(res => res.json())
        .then(res => {
            resolve(res)
        })
        .catch(err => {
            reject(err)
        })
});

const checkvoucher = (sessionId, jwt, userId, uniqueId) => new Promise((resolve, reject) => {
    //console.log(otp, sessionId, jwt, userId, uniqueId)
    const saveacc = fs.appendFile('GOJEKFOOD.txt',`${sessionId}|${jwt}|${userId}|${uniqueId}\n`);
    fetch('https://api.gojekapi.com/gopoints/v3/wallet/vouchers?limit=200&page=1', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'D1': '9A:C9:4F:37:14:82:43:AC:08:0E:69:64:80:70:69:F7:08:A5:AF:FC:A2:EA:20:1C:F8:3C:FE:6E:A1:6E:C3:CB',
            'X-AppVersion': '4.27.2',
            'X-AppId': 'com.gojek.app',
            'X-Platform': 'Android',
            'X-UniqueId': uniqueId,
            'X-Session-ID': sessionId,
            'X-DeviceOS': 'Android,7.0',
            'X-User-Type': 'customer',
            'X-PhoneMake': 'unknown',
            'X-DeviceToken': '',
            'X-PushTokenType': 'FCM',
            'X-PhoneModel': 'Android,xiaomi redmi note 7',
            'User-uuid': userId,
            'Authorization': `Bearer ${jwt}`,
            'Accept-Language': 'en-ID',
            'X-User-Locale': 'en_ID',
            'X-Location': '65.9667,-18.5333',
            'X-Location-Accuracy': '0.0',
            'Gojek-Country-Code': 'ID',
            'X-M1': '1:UNKNOWN,2:UNKNOWN,3:1631626880354-3511426940583375156,4:12756,5:|UNKNOWN|4,6:UNKNOWN,7:\"WiredSSID\",8:768x1184,9:,10:1,11:UNKNOWN,12:VALUE_NOT_PRESENT,13:2002,14:1631633963',
            'Content-Type': 'application/json; charset=UTF-8',
            'Host': 'api.gojekapi.com',
            'Connection': 'close',
            'Accept-Encoding': 'gzip, deflate',
            'User-Agent': 'okhttp/3.12.13',
            'If-Modified-Since': 'Sat, 08 Jan 2022 18:02:00 GMT'
        }
    }).then(res => res.json())
        .then(res => {
            resolve(res)
        })
        .catch(err => {
            reject(err)
        })
});


const requestAnotherCode = (id, phoneNumber) => new Promise((resolve, reject) => {

    fetch(`https://sms-activate.ru/stubs/handler_api.php?api_key=${process.env.SMS_ACTIVATE_TOKEN}&action=setStatus&status=3&id=${id}&forward=${phoneNumber}`, {
        method: 'GET'
    }).then(res => res.text())
        .then(res => {
            resolve(res)
        })
        .catch(err => {
            reject(err)
        })
});


(async () => {
    for (var a = 0; a < 8; a++) {
    const balance = await sms.getBalance();
    if (balance > 1) {
        const { id, number } = await sms.getNumber('ni', 6);
        await sms.setStatus(id, 1)
        const phoneNumber = number;
        console.log("");
        const indoName = await generateIndoName();
        const { result } = indoName;
        const name = result[0].firstname.toLowerCase() + result[0].lastname.toLowerCase();
        const realName = `${result[0].firstname} ${result[0].lastname}`;
        const email = `${name}@eonohocn.com`;
        console.log(`[ ${moment().format("HH:mm:ss")} ] `, chalk.green(`Mencoba register dengan no hp ${phoneNumber}`));
        const sessionId = uuidv4();
        const uniqueId = await genUniqueId(16);
        const sendOtpResult = await sendOtp(realName, email, sessionId, phoneNumber, uniqueId);

        if (sendOtpResult.success) {
            console.log(`[ ${moment().format("HH:mm:ss")} ] `, chalk.green(`${sendOtpResult.data.message}`))
            let otpCode1;
            console.log(`[ ${moment().format("HH:mm:ss")} ] `, chalk.green(`Mencoba mengambil otp dari nomer ${phoneNumber}`))
            do {
                otpCode1 = await sms.getCode(id);
                if (otpCode1) {
                    await sms.setStatus(id, 3)
                }
            } while (!otpCode1);

            console.log(`[ ${moment().format("HH:mm:ss")} ] `, chalk.green(`Berhasil mendapatkan otp ${otpCode1}`))
            const verifOtpResult = await veryfOtp(otpCode1, sendOtpResult.data.otp_token, sessionId, uniqueId);
            if (verifOtpResult.success) {
                console.log(`[ ${moment().format("HH:mm:ss")} ] `, chalk.yellow(`Berhasil mendaftarkan akun ini ${verifOtpResult.success}`))
            }
        } else {
            console.log(`[ ${moment().format("HH:mm:ss")} ] `, chalk.red(`Gagal ${sendOtpResult.errors[0].message}`))
        }

    } else {
        console.log('You don\'t have enough money')
    }
}
})();
