const fetch = require('node-fetch');
const readline = require('readline-sync');
const uuid = require('uuid/v4');
const cheerio = require('cheerio');
const chalk = require('chalk');
const delay = require('delay');
const replaceString = require("replace-string")
const fs = require('async-file');
var sessionnya = uuid();
var requestid = uuid();
const { URLSearchParams } = require('url');
const moment = require('moment');
const date = `${moment().format("MM/DD/YYYY")}`;
const moment2 = `${moment().format("HH:mm:ss")}`;

function getString(start, end, all) {
	const regex = new RegExp(`${start}(.*?)${end}`);
	const str = all
	const result = regex.exec(str);
	return result;
}

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

const bikinnama = () => new Promise((resolve, reject) => {
	fetch('http://fakenametool.net/fake-name-generator/id_ID')
        .then(async res => { 
            const result = {
                // headers: res.headers.raw(),
                body: await res.text()
                }
            resolve(result)
        });
});	
	
// - - - FUNCTION REGIS ACCOUNT - - - FUNCTION REGIS ACCOUNT - - - FUNCTION REGIS ACCOUNT - - - FUNCTION REGIS ACCOUNT - - - FUNCTION REGIS ACCOUNT - - - 	
const regis = (emailnya, namanya, phoneNumber, sessionnya, uniknya) => new Promise((resolve, reject) => {
    // emailnya, namanya, nomornya, sessionnya, uniknya
    const url = 'https://api.gojekapi.com/v5/customers';
    const badan = {
        "email": emailnya,
		"name": namanya,
		"phone": `+${phoneNumber}`, // (660) 209-2670
		"signed_up_country":"ID"
    }
    // console.log(badan)
    fetch(url, {
        method: 'POST',
        headers: { 
            'X-Session-ID': sessionnya,
            'X-Platform': 'Android',
            'X-UniqueId': uniknya,
            'X-AppVersion': '3.46.1',
            'X-AppId': 'com.gojek.app',
            // 'D1': '9E:7B:05:A1:39:3E:15:9C:B5:3D:85:E5:0A:6D:9B:3B:61:0F:50:6A:3A:EB:67:35:73:7B:EB:5F:6E:80:B1:2B', 
            'Accept': 'application/json',
            'X-PhoneModel': 'xiaomi,Redmi Note 7',
            'X-PushTokenType': 'FCM',
            'X-DeviceOS': 'Android,6.0',
            'User-uuid': "",
            'X-DeviceToken': 'dEThVxynoKw:APA91bGaRm71ebDIFW-UZu4FDnRA-EqYUIVbZEKgFcdjR0yBTNZeQcFjsG1BQ4RYLS1NtaDy45q6GravAZOnRI9aC4bZYpwyocwhjLB2V0vRv5JcoHgrruUPK01OtlCKNGH8_Ti-FA5U',
            'Authorization': `Bearer`,
            'X-User-Type': 'costumer',
            'Accept-Language': 'id-ID',
            'X-User-Locale': 'id_ID',
            'X-Location': '-6.1924994,106.8748129',
            'X-Location-Accuracy': '699.999',
            'X-M1': '1:__447be17ee60a4622afcea1df19263a04,2:UNKNOWN,3:1580338730087-5756061431288808100,4:51014,5:sdm660|1843|8,6:48:2C:A0:E3:0D:C8,7:"HUAWEI-NMP7",8:1080x2131,9:passive\,gps\,network,10:1,11:U0yCKEipakkj/+3v7+rAg1Hp2XEPDVhIeIXDdL0Rq/o=',
            'Content-Type': 'application/json; charset=UTF-8',
            'Content-Length': '102',
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

const functionSetPin = (pin, otpPin, aksestoken, uuid, uniqid) => new Promise((resolve, reject) => {
	const url = 'https://api.gojekapi.com/wallet/pin';

	const badan = {
		"pin":pin
	};

	fetch (url, {
		method : 'POST',
		headers : {
			'otp': otpPin,
			'X-Session-ID': uuid,
			'X-Platform': 'Android',
			'X-UniqueId': uniqid,
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
    const url = 'https://api.gojekapi.com/customer_referrals/v1/campaign/enrolment'
    const badan = {
        "referral_code": kodepromonya3
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

(async () => {

        console.log(chalk.yellow("													"));
		console.log(chalk.yellow('          Gojek Get Token and Set PIN          	'));
		console.log(chalk.yellow('     Powered by Erza Jullian x Easy to Learn     	'));
		console.log(chalk.yellow('   Recode by Rian Hoirul Afandi x Easy to Learn   '));
		console.log(chalk.yellow('       Suppory by Erza Jullian & Amin Udin        '));
        console.log(chalk.yellow("													"));
        
    while(true){
    try{
        const uniknya = await bikinunik(16);
        const acakadut = await bikinunik(13);
        const emailnya = `${acakadut}@mailnesia.com`;
        const getnama = await bikinnama();
        // console.log(namanya.body)
        const getRefId = await getString("<tr><td width=30%>Fake Name:</td><td>", "</td></tr>", getnama.body);
        const namanya = getRefId[1];
        // 
        console.log(chalk.yellow("   Now we will create new account for you Boss!   "));
        console.log("")
        const phoneNumber2 = readline.question(chalk.yellow("[+] Enter the number you want to register : 62"))
        const phoneNumber = `62${phoneNumber2}`
        const sendOTP = await regis(emailnya, namanya, phoneNumber, sessionnya, uniknya);
        // console.log(sendOTP)
		if(sendOTP.success === true){
        const emailnya = `${acakadut}@mailnesia.com`;
        const getnama = await bikinnama();
        // console.log(namanya.body)
        const getRefId = await getString("<tr><td width=30%>Fake Name:</td><td>", "</td></tr>", getnama.body);
        const namanya = getRefId[1];
		// - - - REGISTER ACCOUNT - - - REGISTER ACCOUNT - - - REGISTER ACCOUNT - - - 
        console.log(chalk.green(`[-] ${sendOTP.data.message}`))
        const otpnya = readline.question(chalk.yellow("[+] Enter the verification code : "));
        const tokennya = sendOTP.data.otp_token
        const verifyOTP = await verify(sessionnya, uniknya, otpnya, tokennya);
        const aksestoken = verifyOTP.data.access_token
        console.log(chalk.yellow(`[-] Name : ${namanya}`));
        console.log(chalk.yellow(`[-] Email : ${emailnya}`));
        // - - - SAVE ACCESS TOKEN - - - SAVE ACCESS TOKEN - - - SAVE ACCESS TOKEN - - - SAVE ACCESS TOKEN - - -
        const pins = "080599";
        const badlist = await fs.appendFile('MYACCOUNTNEW2.txt',`${phoneNumber}|${aksestoken}|${pins}|LIVE|${date}\n`, function (err) {
            if (err) throw err;
                console.log(chalk.red('[!] Failed to save list, boss!'));});
        console.log(chalk.yellow(`[+] Your accessToken is ${aksestoken} `));
        console.log(chalk.green("[+] Hooray! You get a new account boss! "));
		
		// - - - SET PIN - - - SET PIN - - - SET PIN - - - SET PIN - - - SET PIN - - -
		console.log("");
		// console.log(chalk.yellow("  ----------------------------------------------  "));
		console.log(chalk.yellow("      Now we will setting a PIN for you Boss!     "));
		// console.log(chalk.yellow("  ----------------------------------------------  "));
		console.log("")
		const pin = "080599";
		const setOtpPin = await functionSetPin(pin, '', aksestoken, sessionnya, uniknya);
		if (setOtpPin.errors[0].code === `GoPay-111`) {
			console.log(chalk.red("[!] Sorry boss! This account already have a PIN!!! "));
		}else if(setOtpPin.errors[0].code === `GoPay-1603`){
			console.log(chalk.green("[-] A verification code has been sent to your number"));
			const otpPin = readline.question(chalk.yellow("[+] Enter the verification code : "));
			const setPin = await functionSetPin(pin, otpPin, aksestoken, sessionnya, uniknya);
			await delay(2000)
			if (setOtpPin.errors[0].code === `GoPay-1604`) {
				console.log(chalk.red("[!] The code you entered is incorrect! Please try again \n"));
			}else{
			console.log(chalk.green("[-] Verification code is correct"));
			console.log(setPin)
			console.log(chalk.green("[+] Hooray! This is PIN for your account boss! [ 080599 ] "));
			console.log(chalk.yellow("[+] Well done Boss. Let's create another account, don't waste your time.\n"))
			}
		}
    }else if (sendOTP.errors[0].code === `CO:CUST:phone_already_taken`)
    {
        console.log(chalk.red(`[!] ${sendOTP.errors[0].message}\n`))
    }else if(sendOTP.errors[0].code === `AUTH:CUST:RATELIMITED`){
		console.log(chalk.red(`[!] ${sendOTP.errors[0].message}\n`))
        }
    
    }catch(e){
        console.log(e)
    }
}
})();
