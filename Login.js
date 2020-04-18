const fetch = require('node-fetch');
const readline = require('readline-sync');
const uuidv2 = require('uuid/v4');
const uuidv4 = require('uuid/v4');
const cheerio = require('cheerio');
const chalk = require('chalk');
const delay = require('delay');
const replaceString = require("replace-string")
const fs = require('async-file');
var sessionnya = uuidv2();
var requestid = uuidv2();
const uuid = uuidv4();
const { URLSearchParams } = require('url');
const moment = require('moment');
const date = `${moment().format("MM/DD/YYYY")}`;
const time2 = `${moment().format("HH:mm:ss")}`;


const bikinunik = length =>
    new Promise((resolve, reject) => {
        var text = "";
        var possible =
            "abcdefghijklmnopqrstuvwxyz1234567890";

        for (var i = 0; i < length; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        resolve(text);
    });

const bikinangka = length =>
    new Promise((resolve, reject) => {
        var text = "";
        var possible =
            "1234567890";

        for (var i = 0; i < length; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        resolve(text);
    });
	
// - - - FUNCTION REGIS ACCOUNT - - - FUNCTION REGIS ACCOUNT - - - FUNCTION REGIS ACCOUNT - - - FUNCTION REGIS ACCOUNT - - - FUNCTION REGIS ACCOUNT - - - 	
const regis = (emailnya, namanya, resultnomorus, sessionnya, uniknya) => new Promise((resolve, reject) => {
    // emailnya, namanya, nomornya, sessionnya, uniknya
    const url = 'https://api.gojekapi.com/v5/customers';
    const badan = {
        "email": emailnya,
		"name": namanya,
		"phone": `${resultnomorus}`, // (660) 209-2670
		"signed_up_country":"ID"
    }
    fetch(url, {
        method: 'POST',
        headers: { 
            'X-Session-ID': sessionnya,
			'X-Platform': 'Android',
			'X-UniqueId': uniknya,
			'X-AppVersion': '3.34.1',
			'X-AppId': 'com.gojek.app',
			'Accept': 'application/json',
			// 'D1': '03:25:1E:AE:CD:AF:35:FE:18:3C:15:B4:1F:94:6C:C2:0E:54:3D:84:3A:49:89:59:D9:90:EB:62:B8:AC:26:9C',
			'X-PhoneModel': 'Android,Custom',
			'X-PushTokenType': 'FCM',
			'X-DeviceOS': 'Android,6.0', 
			'Authorization': 'Bearer',
			'Accept-Language': 'en-ID',
			'X-User-Locale': 'en_ID',
			'Content-Type': 'application/json; charset=UTF-8',
			'User-Agent': 'okhttp/3.12.1'
        },
        body: JSON.stringify(badan)
    })
    .then(res => res.json())
    .then(result => {
        resolve(result) // console.log(result) PENTING
    })
    .catch(err => {
        reject(err) // console.log(err) PENTING
    })

});

const verify = (sessionnya, uniknya, otpnya, tokennya) => new Promise((resolve, reject) => {
        const url = 'https://api.gojekapi.com/v5/customers/phone/verify';
    
        const boday = {
            "client_name":"gojek:cons:android",
            "client_secret":"83415d06-ec4e-11e6-a41b-6c40088ab51e",
            "data":
            {
                "otp": otpnya,
                "otp_token": tokennya
            }
        };
    
        fetch (url, {
            method : 'POST',
            headers : {
                'X-Session-ID': sessionnya,
                'X-Platform': 'Android',
                'X-UniqueId': uniknya,
                'X-AppVersion': '3.34.1',
                'X-AppId': 'com.gojek.app',
                'Accept': 'application/json',
                // 'D1': '03:25:1E:AE:CD:AF:35:FE:18:3C:15:B4:1F:94:6C:C2:0E:54:3D:84:3A:49:89:59:D9:90:EB:62:B8:AC:26:9C',
                'X-PhoneModel': 'Android,Custom',
                'X-PushTokenType': 'FCM',
                'X-DeviceOS': 'Android,6.0', 
                'Authorization': 'Bearer',
                'Accept-Language': 'en-ID',
                'X-User-Locale': 'en_ID',
                'Content-Type': 'application/json; charset=UTF-8',
                'User-Agent': 'okhttp/3.12.1'
            },
            body: JSON.stringify(boday)
        })
        .then(res => res.json())
        .then(result => {
            resolve(result)
        })
        .catch(err => {
            reject(err)
        })
    });	
	
// - - - FUNCTION LOGIN ACCOUNT - - - FUNCTION LOGIN ACCOUNT - - - FUNCTION LOGIN ACCOUNT - - - FUNCTION LOGIN ACCOUNT - - - FUNCTION LOGIN ACCOUNT - - - 
const functionGojekSendOtp = (phoneNumber, sessionnya, uniknya, randnumber) => new Promise((resolve, reject) => {
    const url = 'https://api.gojekapi.com/v4/customers/login_with_phone'

    boday = {"phone":`+62${phoneNumber}`}

    fetch(url, {
        method: 'POST',
        headers: {
            'X-Session-ID': sessionnya,
            'X-Platform': 'Android',
            'X-UniqueId': uniknya,
            'X-AppVersion': '3.34.1',
            'X-AppId': 'com.gojek.app',
            'Accept': 'application/json',
            'X-PhoneModel': 'Android,Custom',
            'X-PushTokenType': 'FCM',
            'X-DeviceOS': 'Android,6.0',
            'Authorization': 'Bearer',
            'Accept-Language': 'en-ID',
            'X-User-Locale': 'en_ID',
            'Content-Type': 'application/json; charset=UTF-8',
            'User-Agent': 'okhttp/3.12.1'
        },
        body: JSON.stringify(boday)
    })
    .then(res => res.json())
    .then(result => {
        resolve(result)
		// console.log(result)
    })
    .catch(err => {
        resolve(err)
    })
});

const functionGojekVerify = (otpToken, otpLogin, sessionnya, uniknya) => new Promise((resolve, reject) => {
    const url = 'https://api.gojekapi.com/v4/customers/login/verify'

    boday = {
        "client_name":"gojek:cons:android",
        "client_secret":"83415d06-ec4e-11e6-a41b-6c40088ab51e",
        "data": {
            "otp": otpLogin,
            "otp_token": otpToken
        },
        "grant_type":"otp",
        "scopes":"gojek:customer:transaction gojek:customer:readonly"
    };

    fetch(url, {
        method: 'POST',
        headers: {
           'X-Session-ID': sessionnya,
            'X-Platform': 'Android',
            'X-UniqueId': uniknya,
            'X-AppVersion': '3.34.1',
            'X-AppId': 'com.gojek.app',
            'Accept': 'application/json',
            'X-PhoneModel': 'Android,Custom',
            'X-PushTokenType': 'FCM',
            'X-DeviceOS': 'Android,6.0',
            'Authorization': 'Bearer',
            'Accept-Language': 'en-ID',
            'X-User-Locale': 'en_ID',
            'Content-Type': 'application/json; charset=UTF-8',
            'User-Agent': 'okhttp/3.12.1'
        },
        body: JSON.stringify(boday)
    })
    .then(res => res.json())
    .then(result => {
        resolve(result)
		// console.log(result)
    })
    .catch(err => {
        reject(err)
    })
});

const functionSetPin = (pin, otpPin, aksestoken, uniknya, sessionnya) => new Promise((resolve, reject) => {
	const url = 'https://api.gojekapi.com/wallet/pin';

	const badan = {
		"pin":pin
	};

	fetch (url, {
		method : 'POST',
		headers : {
			'otp': otpPin,
			'X-Session-ID': sessionnya,
			'X-Platform': 'Android',
			'X-UniqueId': uniknya,
			'X-AppVersion': '3.34.1',
			'X-AppId': 'com.gojek.app',
			'Accept': 'application/json',
			// 'D1': '03:25:1E:AE:CD:AF:35:FE:18:3C:15:B4:1F:94:6C:C2:0E:54:3D:84:3A:49:89:59:D9:90:EB:62:B8:AC:26:9C',
			'X-PhoneModel': 'Android,Custom',
			'X-PushTokenType': 'FCM',
			'X-DeviceOS': 'Android,6.0',
			// 'User-uuid': accountId, 
			'Authorization': `Bearer ${aksestoken}`,
			'Accept-Language': 'en-ID',
			'X-User-Locale': 'en_ID',
			'Content-Type': 'application/json; charset=UTF-8',
			'User-Agent': 'okhttp/3.12.1'
		},
		body: JSON.stringify(badan)
	})
	.then(res => res.json())
	.then(result => {
		resolve(result)
		// console.log(result)
	})
	.catch(err => {
		reject(err)
	})
});

const functionredeemvoc = (sessionnya, uniknya, aksestoken, kodevoucher) => new Promise((resolve, reject) => {
    const url = 'https://api.gojekapi.com/go-promotions/v1/promotions/enrollments'
    const badan = {
        "promo_code": kodevoucher
    }
    fetch(url, {
        method: 'POST',
        headers: {
            'X-Session-ID': sessionnya,
            'X-Platform': 'Android',
            'X-UniqueId': uniknya,
            'X-AppVersion': '3.34.1',
            'X-AppId': 'com.gojek.apn',
            // D1: 9E:7B:05:A1:39:3E:15:9C:B5:3D:85:E5:0A:6D:9B:3B:61:0F:50:6A:3A:EB:67:35:73:7B:EB:5F:6E:80:B1:2B 
            'Accept': 'application/json',
            'X-PhoneModel': 'Xiaomi,Redmi Note 4',
            'X-PushTokenType': 'FCM',
            'X-DeviceOS': 'Android,6.0',
            // 'User-uuid': useridnya,
            'X-DeviceToken': 'dEThVxynoKw:APA91bGaRm71ebDIFW-UZu4FDnRA-EqYUIVbZEKgFcdjR0yBTNZeQcFjsG1BQ4RYLS1NtaDy45q6GravAZOnRI9aC4bZYpwyocwhjLB2V0vRv5JcoHgrruUPK01OtlCKNGH8_Ti-FA5U',
            'Authorization': `Bearer ${aksestoken}`,
            'Accept-Language': 'en-ID',
            'X-User-Locale': 'en_ID',
            'X-Location': '-6.2178388,106.8953128',
            'X-Location-Accuracy': '4.433',
            'X-M1': '1:__9de1deadafae46bbbb6703b54a521a40,2:794723806,3:1566304446377-7239558093263557724,4:54335,5:mt6797|1391|10,6:02:00:00:00:00:00,7:".",8:1080x1920,9:passive\,gps\,network,10:1,11:ZkRNSG5FVHNvb0pGe2FiaFpld0ZlZFdUd1FURFFlUQA=',
            'Content-Type': 'application/json; charset=UTF-8',
            'Content-Length': '24',
            'Host': 'api.gojekapi.com',
            'Connection': 'Keep-Alive',
            'Accept-Encoding': 'gzip',
            'User-Agent': 'okhttp/3.12.1'
        },
        body: JSON.stringify(badan)
    })
    .then(res => res.json())
    .then(result => {
        resolve(result) 
		// console.log(result) // PENTING
    })
    .catch(err => {
        reject(err) 
		// console.log(err) // PENTING
    })

});

const functionredeemvoc2 = (sessionnya, uniknya, aksestoken, kodepromonya) => new Promise((resolve, reject) => {
    const url = 'https://api.gojekapi.com/go-promotions/v1/promotions/enrollments'
    const badan = {
        "promo_code": kodepromonya
    }
    fetch(url, {
        method: 'POST',
        headers: {
            'X-Session-ID': sessionnya,
            'X-Platform': 'Android',
            'X-UniqueId': uniknya,
            'X-AppVersion': '3.34.1',
            'X-AppId': 'com.gojek.apn',
            // D1: 9E:7B:05:A1:39:3E:15:9C:B5:3D:85:E5:0A:6D:9B:3B:61:0F:50:6A:3A:EB:67:35:73:7B:EB:5F:6E:80:B1:2B 
            'Accept': 'application/json',
            'X-PhoneModel': 'Xiaomi,Redmi Note 4',
            'X-PushTokenType': 'FCM',
            'X-DeviceOS': 'Android,6.0',
            // 'User-uuid': useridnya,
            'X-DeviceToken': 'dEThVxynoKw:APA91bGaRm71ebDIFW-UZu4FDnRA-EqYUIVbZEKgFcdjR0yBTNZeQcFjsG1BQ4RYLS1NtaDy45q6GravAZOnRI9aC4bZYpwyocwhjLB2V0vRv5JcoHgrruUPK01OtlCKNGH8_Ti-FA5U',
            'Authorization': `Bearer ${aksestoken}`,
            'Accept-Language': 'en-ID',
            'X-User-Locale': 'en_ID',
            'X-Location': '-6.2178388,106.8953128',
            'X-Location-Accuracy': '4.433',
            'X-M1': '1:__9de1deadafae46bbbb6703b54a521a40,2:794723806,3:1566304446377-7239558093263557724,4:54335,5:mt6797|1391|10,6:02:00:00:00:00:00,7:".",8:1080x1920,9:passive\,gps\,network,10:1,11:ZkRNSG5FVHNvb0pGe2FiaFpld0ZlZFdUd1FURFFlUQA=',
            'Content-Type': 'application/json; charset=UTF-8',
            'Content-Length': '24',
            'Host': 'api.gojekapi.com',
            'Connection': 'Keep-Alive',
            'Accept-Encoding': 'gzip',
            'User-Agent': 'okhttp/3.12.1'
        },
        body: JSON.stringify(badan)
    })
    .then(res => res.json())
    .then(result => {
        resolve(result) // console.log(result) PENTING
    })
    .catch(err => {
        reject(err) // console.log(err) PENTING
    })

});

const functionredeemvoc3 = (sessionnya, uniknya, aksestoken, kodepromonya3) => new Promise((resolve, reject) => {
    const url = 'https://api.gojekapi.com/go-promotions/v1/promotions/enrollments'
    const badan = {
        "promo_code": kodepromonya3
    }
    fetch(url, {
        method: 'POST',
        headers: {
            'X-Session-ID': sessionnya,
            'X-Platform': 'Android',
            'X-UniqueId': uniknya,
            'X-AppVersion': '3.34.1',
            'X-AppId': 'com.gojek.apn',
            // D1: 9E:7B:05:A1:39:3E:15:9C:B5:3D:85:E5:0A:6D:9B:3B:61:0F:50:6A:3A:EB:67:35:73:7B:EB:5F:6E:80:B1:2B 
            'Accept': 'application/json',
            'X-PhoneModel': 'Xiaomi,Redmi Note 4',
            'X-PushTokenType': 'FCM',
            'X-DeviceOS': 'Android,6.0',
            // 'User-uuid': useridnya,
            'X-DeviceToken': 'dEThVxynoKw:APA91bGaRm71ebDIFW-UZu4FDnRA-EqYUIVbZEKgFcdjR0yBTNZeQcFjsG1BQ4RYLS1NtaDy45q6GravAZOnRI9aC4bZYpwyocwhjLB2V0vRv5JcoHgrruUPK01OtlCKNGH8_Ti-FA5U',
            'Authorization': `Bearer ${aksestoken}`,
            'Accept-Language': 'en-ID',
            'X-User-Locale': 'en_ID',
            'X-Location': '-6.2178388,106.8953128',
            'X-Location-Accuracy': '4.433',
            'X-M1': '1:__9de1deadafae46bbbb6703b54a521a40,2:794723806,3:1566304446377-7239558093263557724,4:54335,5:mt6797|1391|10,6:02:00:00:00:00:00,7:".",8:1080x1920,9:passive\,gps\,network,10:1,11:ZkRNSG5FVHNvb0pGe2FiaFpld0ZlZFdUd1FURFFlUQA=',
            'Content-Type': 'application/json; charset=UTF-8',
            'Content-Length': '24',
            'Host': 'api.gojekapi.com',
            'Connection': 'Keep-Alive',
            'Accept-Encoding': 'gzip',
            'User-Agent': 'okhttp/3.12.1'
        },
        body: JSON.stringify(badan)
    })
    .then(res => res.json())
    .then(result => {
        resolve(result) // console.log(result) PENTING
    })
    .catch(err => {
        reject(err) // console.log(err) PENTING
    })

});

const getkodevoucher = (sessionnya, uniknya, aksestoken) => new Promise((resolve, reject) => {
    fetch('https://api.gojekapi.com/v2/customer/cards/food', {
        method: 'GET',
        headers: {
        
            'X-Session-ID': sessionnya,
            'X-Platform': 'Android',
            'X-UniqueId': uniknya,
            'X-AppVersion': '3.34.1',
            'X-AppId': 'com.gojek.app',
            'Accept': 'application/json',
            // 'D1': '03:25:1E:AE:CD:AF:35:FE:18:3C:15:B4:1F:94:6C:C2:0E:54:3D:84:3A:49:89:59:D9:90:EB:62:B8:AC:26:9C',
            'X-PhoneModel': 'Android,Custom',
            'X-PushTokenType': 'FCM',
            'X-DeviceOS': 'Android,6.0', 
            'Authorization': `Bearer ${aksestoken}`,
            'Accept-Language': 'en-ID',
            'X-User-Locale': 'en_ID',
            'Content-Type': 'application/json; charset=UTF-8',
            'User-Agent': 'okhttp/3.12.1'
        },
        
    })
    .then(res => res.json())
        .then(result => {
            resolve(result)
        })
        .catch(err => {
            reject(result)
        })
});

// - - - FUNCTION CHECK PROFILE - - - FUNCTION CHECK PROFILE - - - FUNCTION CHECK PROFILE - - - FUNCTION CHECK PROFILE - - - FUNCTION CHECK PROFILE - - - 
const ambildata = (sessionnya, uniknya, aksestoken) => new Promise((resolve, reject) => {
    fetch('https://api.gojekapi.com/gopoints/v3/wallet/vouchers?limit=10&page=1', {
        method: 'GET',
        headers: {
        
            'X-Session-ID': sessionnya,
			'X-Platform': 'Android',
			'X-UniqueId': uniknya,
			'X-AppVersion': '3.34.1',
			'X-AppId': 'com.gojek.app',
			'Accept': 'application/json',
			// 'D1': '03:25:1E:AE:CD:AF:35:FE:18:3C:15:B4:1F:94:6C:C2:0E:54:3D:84:3A:49:89:59:D9:90:EB:62:B8:AC:26:9C',
			'X-PhoneModel': 'Android,Custom',
			'X-PushTokenType': 'FCM',
			'X-DeviceOS': 'Android,6.0', 
			'Authorization': `Bearer ${aksestoken}`,
			'Accept-Language': 'en-ID',
			'X-User-Locale': 'en_ID',
			'Content-Type': 'application/json; charset=UTF-8',
            'User-Agent': 'okhttp/3.12.1'
        },
        
    })
    .then(res => res.json())
        .then(result => {
            resolve(result)
        })
        .catch(err => {
            reject(result)
        })
});

const datasaya = (sessionnya, uniknya, aksestoken) => new Promise((resolve, reject) => {
    fetch('https://api.gojekapi.com/gojek/v2/customer', {
        method: 'GET',
        headers: {
            'X-Session-ID': sessionnya,
			'X-Platform': 'Android',
			'X-UniqueId': uniknya,
			'X-AppVersion': '3.34.1',
			'X-AppId': 'com.gojek.app',
            'Accept': 'application/json',
			'X-PhoneModel': 'Android,Custom',
			'X-PushTokenType': 'FCM',
			'X-DeviceOS': 'Android,6.0', 
			'Authorization': `Bearer ${aksestoken}`,
			'Accept-Language': 'en-ID',
			'X-User-Locale': 'en_ID',
			'Content-Type': 'application/json; charset=UTF-8',
            'User-Agent': 'okhttp/3.12.1'
        },
        
    })
    .then(res => res.json())
    .then(result => {
        resolve(result)
    })
    .then(err => {
        reject(err)
    })
});

const cekwallet = (sessionnya, uniknya, aksestoken) => new Promise((resolve, reject) => {
    fetch('https://api.gojekapi.com/wallet/profile', {
    method: 'GET',
        headers: {
        
            'X-Session-ID': sessionnya,
			'X-Platform': 'Android',
			'X-UniqueId': uniknya,
			'X-AppVersion': '3.34.1',
			'X-AppId': 'com.gojek.app',
			'Accept': 'application/json',
			'X-PhoneModel': 'Android,Custom',
			'X-PushTokenType': 'FCM',
			'X-DeviceOS': 'Android,6.0', 
			'Authorization': `Bearer ${aksestoken}`,
			'Accept-Language': 'en-ID',
			'X-User-Locale': 'en_ID',
			'Content-Type': 'application/json; charset=UTF-8',
            'User-Agent': 'okhttp/3.12.1'
        },
        
    })
    .then(res => res.json())
        .then(result => {
            resolve(result)
        })
        .catch(err => {
            reject(result)
        })
});

const authpin = (aksestoken, oldpin, idsaya, uuid, uniknya) => new Promise((resolve, reject) => {
    const url = 'https://api.gojekapi.com/gopay/authenticate'
    const badan = {
        "pin":oldpin 
    }
    fetch(url, {
        method: 'POST',
        headers: {
            'X-AppVersion': '3.34.1',
            'X-AppId': 'com.gojek.app',
            'X-Platform': 'Android',
            'X-UniqueId': uniknya,
            'Accept': 'application/json',
            // 'D1': '03:25:1E:AE:CD:AF:35:FE:18:3C:15:B4:1F:94:6C:C2:0E:54:3D:84:3A:49:89:59:D9:90:EB:62:B8:AC:26:9C',
            'X-Session-ID': uuid,
            'Authorization': `Bearer ${aksestoken}`,
            'X-User-Type': 'customer',
            'X-DeviceOS': 'Android,6.0',
            'User-uuid': idsaya,
            'X-PhoneModel': 'Android,Custom',
            'X-PushTokenType': 'FCM',
            'Accept-Language': 'en-ID',
            'X-User-Locale': 'en_ID',
            'Content-Type': 'application/json; charset=UTF-8',
            'User-Agent': 'okhttp/3.12.1'
        },
    body: JSON.stringify(badan)
    })
    .then(res => res.json())
    .then(result => {
        resolve(result) // 
        // console.log(result) // PENTING
    })
    .catch(err => {
        reject(err) // 
        // console.log(err) // PENTING
    })

});

const chgepin = (aksestoken, newpin, oldpin, idsaya, uuid, uniknya) => new Promise((resolve, reject) => {
    const url = 'https://api.gojekapi.com/wallet/update-pin'
    const badan = {
        "new_pin": newpin
    }
    fetch(url, {
        method: 'PUT',
        headers: {
            'pin':oldpin,
            'X-AppVersion': '3.34.1',
            'X-AppId': 'com.gojek.app',
            'X-Platform': 'Android',
            'X-UniqueId': uniknya,
            'Accept': 'application/json',
            // 'D1': '03:25:1E:AE:CD:AF:35:FE:18:3C:15:B4:1F:94:6C:C2:0E:54:3D:84:3A:49:89:59:D9:90:EB:62:B8:AC:26:9C',
            'X-Session-ID': uuid,
            'Authorization': `Bearer ${aksestoken}`,
            'X-User-Type': 'customer',
            'X-DeviceOS': 'Android,6.0',
            'User-uuid': idsaya,
            'X-PhoneModel': 'Android,Custom',
            'X-PushTokenType': 'FCM',
            'Accept-Language': 'en-ID',
            'X-User-Locale': 'en_ID',
            'Content-Type': 'application/json; charset=UTF-8',
            'Content-Length': 16,
            'Host': 'api.gojekapi.com',
            'Connection': 'Keep-Alive',
            'Accept-Encoding': 'gzip',
            'User-Agent': 'okhttp/3.12.1'
        },
    body: JSON.stringify(badan)
    })
    .then(res => res.json())
    .then(result => {
        resolve(result) // 
        // console.log(result) // PENTING
    })
    .catch(err => {
        reject(err) // 
        // console.log(err) // PENTING
    })

});

const cekmisi = (sessionnya, uniknya, aksestoken) => new Promise((resolve, reject) => {
    fetch('https://api.gojekapi.com/gobenefits/v1/journeys', {
    method: 'GET',
        headers: {
        
            'X-Session-ID': sessionnya,
            'X-Platform': 'Android',
            'X-UniqueId': uniknya,
            'X-AppVersion': '3.34.1',
            'X-AppId': 'com.gojek.app',
            'Accept': 'application/json',
            'X-PhoneModel': 'Android,Custom',
            'X-PushTokenType': 'FCM',
            'X-DeviceOS': 'Android,6.0', 
            'Authorization': `Bearer ${aksestoken}`,
            'Accept-Language': 'en-ID',
            'X-User-Locale': 'en_ID',
            'Content-Type': 'application/json; charset=UTF-8',
            'User-Agent': 'okhttp/3.12.1'
        },
        
    })
    .then(res => res.json())
        .then(result => {
            resolve(result)
        })
        .catch(err => {
            reject(result)
        })
});

(async () => {
    while(true){
    try{
        const uniknya = await bikinunik(16);
		const acakadut = await bikinunik(13);
        const emailnya = `${acakadut}@mailnesia.com`;
		console.log(chalk.yellow(""));
        console.log(chalk.yellow('          Gojek Get Token and Set PIN          	'));
 		console.log(chalk.yellow("       Now we will check your account Boss!       "));
		console.log("");
		// // 
        const phoneaja = readline.question(chalk.yellow("[+] Enter the number you want to login : 62"))
        const phoneNumber = `62${phoneaja}`;
        const sendOTP = await functionGojekSendOtp(phoneNumber, sessionnya, uniknya)
		
		if(sendOTP.success === true){
        const otpToken = sendOTP.data.login_token
		console.log(chalk.green(`[-] ${sendOTP.data.message}`));
		// ;
        const otpLogin = readline.question(chalk.yellow("[+] Enter the verification code : "));
        const verifyOTP = await functionGojekVerify(otpToken, otpLogin, sessionnya, uniknya)
        // console.log(verifyOTP)
		// 
		console.log(chalk.green("[-] Verification code is correct"));
        const aksestoken = verifyOTP.data.access_token
		const checkacc = await functionredeemvoc(sessionnya, uniknya, aksestoken);
        console.log(chalk.green(`[-] Checking account...`));
		console.log(chalk.yellow('[-] This may take a few minutes. Please wait a moment...'));
		// 
		if (checkacc.errors[0].code === `GPS-Proxy-CustomerBlocked`) {
            console.log(chalk.red("[-]",`Oh noo! Your account is temporarily blocked!!!`))   
            const pins = "080599";
            const badlist = await fs.appendFile('ALLGOJEKINFO.txt',`${phoneNumber}|${aksestoken}|${pins}|DIED|${date}\n`, function (err) {
            if (err) throw err;
                console.log(chalk.red('[!] Failed to save list, boss!'));});
        }else{
        console.log(chalk.green(`[-] Hooray! Your account is LIVE `))
		const kodepromonya = "KEALFAYUK";
        const redeemvoc = await functionredeemvoc2(sessionnya, uniknya, aksestoken, kodepromonya);
        // console.log(redeemvoc);
        if (redeemvoc.success === true) {
            console.log(chalk.green(`[+] ${redeemvoc.data.message}`));
            const pins = "080599";
            const badlist = await fs.appendFile('ALLGOJEKINFO.txt',`${phoneNumber}|${aksestoken}|${pins}|LIVE|${date}\n`, function (err) {
            if (err) throw err;
                console.log(chalk.red('[!] Failed to save list, boss!'));});
        }else if(redeemvoc.errors[0].code === 'GoPromo-BlockedCustomer') {
            console.log(chalk.red(`[!] ${redeemvoc.errors[0].message}`));
            const pins = "080599";
            const badlist = await fs.appendFile('ALLGOJEKINFO.txt',`${phoneNumber}|${aksestoken}|${pins}|DIED|${date}\n`, function (err) {
            if (err) throw err;
                console.log(chalk.red('[!] Failed to save list, boss!'));});
        }else if(redeemvoc.errors[0].code === 'GoPromo-InvalidPromoCode') {
            console.log(chalk.red(`[!] ${redeemvoc.errors[0].message}`));
            const pins = "080599";
            const badlist = await fs.appendFile('ALLGOJEKINFO.txt',`${phoneNumber}|${aksestoken}|${pins}|LIVE|${date}\n`, function (err) {
            if (err) throw err;
                console.log(chalk.red('[!] Failed to save list, boss!'));});
        }
		await delay(5000);
		const kodepromonya3 = "NEWMLCCMAR220";
        const redeemvoc3 = await functionredeemvoc3(sessionnya, uniknya, aksestoken, kodepromonya3);
        // console.log(redeemvoc);
        if (redeemvoc3.success === false) {
            console.log(chalk.red(`[!] ${redeemvoc3.errors[0].message}`));
        } else {
            console.log(chalk.green(`[+] ${redeemvoc3.data.message}`));
			const badlist = await fs.appendFile('COBAMLCC.txt',`${aksestoken}\n`);
            };
        };
		
		console.log(chalk.yellow(`[+] Got it! This is your access token : ${aksestoken}`))
		
		// - - - CHECK PROFILE - - -
		const ambildatasaya = await datasaya(sessionnya, uniknya, aksestoken);
        const idsaya = ambildatasaya.customer.id
        const bikinnya = ambildatasaya.customer.created_at
        const nomorsaya = ambildatasaya.customer.phone
        const cekwalletsaya = await cekwallet(sessionnya, uniknya, aksestoken);
        const balancesaya = cekwalletsaya.data.balance
        console.log(chalk.yellow(`[-] Phone number : ${nomorsaya}\n[-] Balance : Rp. ${balancesaya}`))
        const getdata = await ambildata(sessionnya, uniknya, aksestoken);
        const jumlahvoucher = getdata.voucher_stats.total_vouchers
		// 
        if(jumlahvoucher === 0){
            console.log(chalk.red("[!] You don't have any voucher yet."))
        }else{
            console.log(chalk.yellow(`[+] You have ${jumlahvoucher} vouchers: `))
            const isivoucher = getdata.data.map(datas => {
            console.log(chalk.yellow(`[-] ${datas.title} Exp: ${datas.expiry_date}`))
             })
        }
        console.log(chalk.green(`[-] Account created at: ${bikinnya}`))
		// // ;
		
		console.log("");
		console.log(chalk.yellow("  ----------------------------------------------  "));
		console.log(chalk.yellow("      Now we will setting a PIN for you Boss!     "));
		console.log(chalk.yellow("  ----------------------------------------------  "));
		console.log("")
		// 
		// const acakadut = await bikinunik(8);
		// const aksestoken = readline.question(chalk.yellow("Input your access token: "))
		console.log(chalk.yellow(`[+] We will setup a PIN for this number : ${nomorsaya}`))
        // const pin = readline.question(chalk.yellow("Input your PIN: "))
		const pin = "080599"
        const setOtpPin = await functionSetPin(pin, '', aksestoken, sessionnya, uniknya);
        // console.log(setOtpPin)
		if (setOtpPin.errors[0].code === `GoPay-111`) {
            // console.log(chalk.red(`[!] ${setOtpPin.errors[0].message}`));
            console.log(chalk.yellow(`[+] Try to change your PIN `));
            // const oldpin = readline.question(chalk.yellow("[+] Enter your OLD PIN : "))
            const oldpin = "080599";
            const auth = await authpin(aksestoken, oldpin, idsaya, uuid, uniknya)
            console.log(auth)
            if (auth.success === false){
                if (auth.errors[0].code === 'GoPay-1203'){
                    console.log(chalk.red(`[!] ${auth.errors[0].message}`));
                    // const badlist = await fs.appendFile('ciLIMITPIN.txt',`${nomorsaya}|${aksestoken}\n`);
                }else if(auth.errors[0].code === 'GoPay-119'){
                    console.log(chalk.red(`[!] ${auth.errors[0].message}`));
                    // const badlist = await fs.appendFile('ciSALAHPIN.txt',`${nomorsaya}|${aksestoken}\n`);
                }else{
                    console.log(chalk.red(`[!] ${auth.errors[0].message}`));
                    // const badlist = await fs.appendFile('ciBELUMSETPIN.txt',`${nomorsaya}|${aksestoken}\n`);
                }
            }else{
            // const newpin = readline.question(chalk.yellow("[+] Enter your NEW PIN : "))
            const newpin = "080599";
            const verifpin = await chgepin(aksestoken, newpin, oldpin, idsaya, uuid, uniknya)
            // console.log(verifpin)
            if (verifpin.success === true){
                console.log(chalk.green(`[+] Hooray! This is your new PIN : ${newpin} `))
            }else{
                console.log(chalk.red(`[!] ${verifpin.errors[0].message}`));
            }
        }
        console.log("")
        }else if(setOtpPin.errors[0].code === `GoPay-4003`){
            console.log(chalk.red(`[!] ${setOtpPin.errors[0].message}`));
        }else if(setOtpPin.errors[0].code === `GoPay-1603`){
			console.log(chalk.green(`[-] A verification code has been sent to your number`));
			// 
			const otpPin = readline.question(chalk.yellow("[+] Enter the verification code : "));
			const setPin = await functionSetPin(pin, otpPin, aksestoken, sessionnya, uniknya);
			// 
            console.log(chalk.green(`[-] Verification code is correct`));
			// console.log(setPin)
			console.log(chalk.green("[+] Hooray! This is PIN for your account boss! [ 080599 ] "));
			console.log("");
            }

        const cekmisisaya = await cekmisi(sessionnya, uniknya, aksestoken);
        // console.log(cekmisisaya)
        console.log(chalk.green(`[+] Your New Mission`));
        const misisaya = cekmisisaya.data.new_journeys.map(new_journeys => {
            console.log(chalk.yellow(`[-] Reward : ${new_journeys.total_rewards}, Mission : ${new_journeys.sub_heading_two} Exp : ${new_journeys.journey_config_end_date}`))
            // console.log(chalk.yellow(`[-] ${new_journeys.sub_heading_two} Exp: ${new_journeys.journey_config_end_date} \n Description : ${new_journeys.description}\n\n`))
             })
        

        console.log(chalk.green(`[+] Your On Going Mission`));
        const misisaya2 = cekmisisaya.data.ongoing_journeys.map(ongoing_journeys => {
            console.log(chalk.yellow(`[-] Reward : ${ongoing_journeys.total_rewards}, Mission : ${ongoing_journeys.sub_heading_two} Exp : ${ongoing_journeys.journey_config_end_date}`))
            // console.log(chalk.yellow(`[-] ${ongoing_journeys.sub_heading_two} Exp: ${ongoing_journeys.journey_config_end_date} \n Description : ${ongoing_journeys.description}\n\n`))
             })
        }else if (sendOTP.errors[0].code === `AUTH:CUST:CUSTOMER_NOT_FOUND`)
        {
		console.log(chalk.red(`[!] ${sendOTP.errors[0].message}`));
		}else if(sendOTP.errors[0].code === `AUTH:CUST:RATELIMITED`){
		console.log(chalk.red(`[!] ${sendOTP.errors[0].message}\n`))
		// 
        }
        
    }catch(e){
        console.log(e)
}
    }
})();
