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
	fetch('https://fakenametool.net/random-name-generator/random/id_ID/indonesia/1', {
		method: 'GET'
	})
	.then(res => res.text())
	.then(result => {
		const $ = cheerio.load(result);
		const resText = $('div[class=col-lg-10] span').text();
		resolve(resText);
	})
	.catch(err => {
		reject(err)
	})
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

    boday = {"phone":`+${phoneNumber}`}

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

(async () => {
    try{

        const uniknya = await bikinunik(16);
		const acakadut = await bikinunik(13);
        const emailnya = `${acakadut}@gmail.com`;
        const namanya = await bikinnama();
		console.log(chalk.yellow("													"));
		console.log(chalk.yellow('          Gojek Get Token and Set PIN          	'));
		console.log(chalk.yellow('     Powered by Erza Jullian x Easy to Learn     	'));
		console.log(chalk.yellow('   Recode by Rian Hoirul Afandi x Easy to Learn   '));
		console.log(chalk.yellow('       Suppory by Erza Jullian & Amin Udin        '));
		console.log(chalk.yellow("													"));
		console.log(chalk.yellow("  ----------------------------------------------  "));
		console.log(chalk.yellow("       Now we will check your account Boss!       "));
		console.log(chalk.yellow("  ----------------------------------------------  "));
		console.log("");
		// await delay(2000)
        const phoneNumber = readline.question(chalk.yellow("[+] Enter the number you want to login : "))
        const sendOTP = await functionGojekSendOtp(phoneNumber, sessionnya, uniknya)
        // console.log(sendOTP)
		await delay(2000)
		if(sendOTP.success === true){
        const otpToken = sendOTP.data.login_token
		console.log(chalk.green("[-] Verification code has been sent to your number"));
		await delay(2000);
        const otpLogin = readline.question(chalk.yellow("[+] Enter the verification code : "));
        const verifyOTP = await functionGojekVerify(otpToken, otpLogin, sessionnya, uniknya)
        // console.log(verifyOTP)
		await delay(2000)
		console.log(chalk.green("[-] Verification code is correct"));
        const aksestoken = verifyOTP.data.access_token
		const checkacc = await functionredeemvoc(sessionnya, uniknya, aksestoken);
        console.log(chalk.green(`[-] Checking account...`));
		console.log(chalk.yellow('[-] This may take a few minutes. Please wait a moment...'));
		await delay(2000)
		if (checkacc.errors[0].code === `GPS-Proxy-CustomerBlocked`) {
			console.log(chalk.red("[-]",`Oh noo! Your account is temporarily blocked!!!`))
			// const badlist = await fs.appendFile('log-set-or-reg-voc-set.txt',`${phoneNumber} | ${aksestoken}\n`, function (err) {
        // if (err) throw err;
            // console.log(chalk.red('[!] Failed to save list, boss!'));});
			// const bodlist = await fs.appendFile('log-set-or-reg-voc-set-justtoken.txt',`${aksestoken}\n`, function (err) {
        // if (err) throw err;
            // console.log(chalk.red('[!] Failed to save list, boss!'));});
        }else{
            console.log(chalk.green(`[-] Hooray! Your account is LIVE `))
        };
		
		console.log(chalk.yellow(`[+] Got it! This is your access token : ${aksestoken}`))
		
		// - - - CHECK PROFILE - - -
		const ambildatasaya = await datasaya(sessionnya, uniknya, aksestoken);
        const idsaya = ambildatasaya.customer.id
        const namasaya = ambildatasaya.customer.name
        const emailsaya = ambildatasaya.customer.email
        const bikinnya = ambildatasaya.customer.created_at
        const nomorsaya = ambildatasaya.customer.phone
        const cekwalletsaya = await cekwallet(sessionnya, uniknya, aksestoken);
        const balancesaya = cekwalletsaya.data.balance
        console.log(chalk.yellow(`[-] Name : ${namasaya}\n[-] User ID : ${idsaya}\n[-] Balance : Rp. ${balancesaya}\n[-] Email : ${emailsaya}\n[-] Phone number : ${nomorsaya}`))
        const getdata = await ambildata(sessionnya, uniknya, aksestoken);
        const jumlahvoucher = getdata.voucher_stats.total_vouchers
		await delay(2000)
        if(jumlahvoucher === 0){
            console.log(chalk.red("[!] You don't have any voucher yet."))
        }else{
            console.log(chalk.yellow(`[+] You have ${jumlahvoucher} vouchers: `))
            const isivoucher = getdata.data.map(datas => {
            console.log(chalk.yellow(`[-] ${datas.title} Exp: ${datas.expiry_date}`))
             })
        }
        console.log(chalk.green(`[-] Account created at: ${bikinnya}`))
		await delay(2000);
		
		const badlist = await fs.appendFile('fullinfo.txt',`${phoneNumber} | ${aksestoken} | ${bikinnya}\n`, function (err) {
        if (err) throw err;
            console.log(chalk.red('[!] Failed to save list, boss!'));});
		const bodlist = await fs.appendFile('justtoken.txt',`${aksestoken}\n`, function (err) {
        if (err) throw err;
            console.log(chalk.red('[!] Failed to save list, boss!'));});
		// await delay(2000);
		
		console.log("");
		console.log(chalk.yellow("  ----------------------------------------------  "));
		console.log(chalk.yellow("      Now we will setting a PIN for you Boss!     "));
		console.log(chalk.yellow("  ----------------------------------------------  "));
		console.log("")
		await delay(2000)
		const acakadut = await bikinunik(8);
		// const aksestoken = readline.question(chalk.yellow("Input your access token: "))
		console.log(chalk.yellow(`[+] We will setup a PIN for this token : ${phoneNumber}`))
		await delay(2000)
        // const pin = readline.question(chalk.yellow("Input your PIN: "))
		const pin = "080599";
		const setOtpPin = await functionSetPin(pin, '', aksestoken, sessionnya, uniknya);
		await delay(2000)
		if (setOtpPin.errors[0].code === `GoPay-111`) {
			console.log(chalk.red("[!] Sorry boss! This account already have a PIN!!! "));
			console.log("");
		}else if(setOtpPin.errors[0].code === `GoPay-1603`){
			console.log(chalk.green("[-] Verification code has been sent to your number"));
			await delay(2000)
			const otpPin = readline.question(chalk.yellow("[+] Enter the verification code : "));
			const setPin = await functionSetPin(pin, otpPin, aksestoken, sessionnya, uniknya);
			await delay(2000)
			// await delay(2000)
			if (setOtpPin.errors[0].code === `GoPay-1604`) {
				console.log(chalk.red("[!] The code you entered is incorrect! Please try again \n"));
				console.log("")
			}else{
			console.log(chalk.green("[-] Verification code is correct"));
			// console.log(setPin)
			await delay(2000)
			console.log(chalk.green("[+] Hooray! This is PIN for your account boss! [ 080599 ] "));
			console.log("");
			}
		}
		}else if (sendOTP.errors[0].code === `AUTH:CUST:CUSTOMER_NOT_FOUND`){
		console.log(chalk.red(`[!] ${sendOTP.errors[0].message}`))
		await delay(2000)
		// - - - REGISTER ACCOUNT - - - REGISTER ACCOUNT - - - REGISTER ACCOUNT - - - 
        const resultnomorus = phoneNumber
		console.log("");
		console.log(chalk.yellow("  ----------------------------------------------  "));
		console.log(chalk.yellow("   Now we will create new account for you Boss!   "));
		console.log(chalk.yellow("  ----------------------------------------------  "));
		console.log("")
		await delay(2000)
        //console.log(chalk.yellow(`[+] Name : ${namanya}`))
        //console.log(chalk.yellow(`[+] Email : ${emailnya}`))
        const register = await regis(emailnya, namanya, resultnomorus, sessionnya, uniknya);
        console.log(chalk.green('[-] Verification code has been sent to your number'))
		await delay(2000)
        const otpnya = readline.question(chalk.yellow("[+] Enter the verification code : "));
		await delay(2000)
        const tokennya = register.data.otp_token
        const verifyOTP = await verify(sessionnya, uniknya, otpnya, tokennya);
        const aksestoken = verifyOTP.data.access_token
        const nomorhpbro = verifyOTP.data.customer.phone
        const idnyabro = verifyOTP.data.resource_owner_id
		const ambildatasaya = await datasaya(sessionnya, uniknya, aksestoken);
        const idsaya = ambildatasaya.customer.id
        const namasaya = ambildatasaya.customer.name
        const emailsaya = ambildatasaya.customer.email
        const bikinnya = ambildatasaya.customer.created_at
        const nomorsaya = ambildatasaya.customer.phone
        const cekwalletsaya = await cekwallet(sessionnya, uniknya, aksestoken);
        const balancesaya = cekwalletsaya.data.balance
        console.log(chalk.yellow(`[-] Name : ${namasaya}\n[-] User ID : ${idsaya}\n[-] Balance : Rp. ${balancesaya}\n[-] Email : ${emailsaya}\n[-] Phone number : ${nomorsaya}`))
        const getdata = await ambildata(sessionnya, uniknya, aksestoken);
        const jumlahvoucher = getdata.voucher_stats.total_vouchers
		await delay(2000)
        console.log(chalk.green(`[-] Account created at: ${bikinnya}`))
		await delay(2000);
        console.log(chalk.green("[+] Hooray! You get a new account boss! "));
		
		// - - - SAVE ACCESS TOKEN - - - SAVE ACCESS TOKEN - - - SAVE ACCESS TOKEN - - - SAVE ACCESS TOKEN - - -
		const badlist = await fs.appendFile('log-set-or-reg-voc-set.txt',`${phoneNumber} | ${aksestoken} | ${bikinnya}\n`, function (err) {
        if (err) throw err;
            console.log(chalk.red('[!] Failed to save list, boss!'));});
		const bodlist = await fs.appendFile('log-set-or-reg-voc-set-justtoken.txt',`${aksestoken}\n`, function (err) {
        if (err) throw err;
            console.log(chalk.red('[!] Failed to save list, boss!'));});

		// - - - REDEEM VOC - - - REDEEM VOC - - - REDEEM VOC - - - REDEEM VOC - - -
		//console.log("");
		//console.log(chalk.yellow("  ----------------------------------------------  "));
		//console.log(chalk.yellow("    Now we will Redeem a Voucher for you Boss!    "));
		//console.log(chalk.yellow("  ----------------------------------------------  "));
		//console.log("")
		//await delay(2000)
        //const kodevoucher = "COBAINGOJEK";
        //const redeem = await functionredeemvoc(kodevoucher, sessionnya, uniknya, aksestoken)
        // console.log(redeem)
		//await delay(2000)
        //if(redeem.success === false){
            //console.log(chalk.red(`[!] ${redeem.errors[0].message}`));
            //}else{
		//console.log(redeem)
        //const pesan = redeem.data.message
        //const yeay = redeem.data.title
        //console.log(chalk.yellow(`[+] ${yeay} ${pesan}`));
        // console.log(chalk.yellow('Your voucher was successfully redeemed!'))
        //}
		//if(jumlahvoucher === 0){
        //    console.log(chalk.red("[!] You don't have any voucher yet."))
        //}else{
        //    console.log(chalk.yellow(`[+] You have ${jumlahvoucher} vouchers: `))
        //    const isivoucher = getdata.data.map(datas => {
        //    console.log(chalk.yellow(`[-] ${datas.title} Exp: ${datas.expiry_date}`))
        //     })
        //}
		// - - - SET PIN - - - SET PIN - - - SET PIN - - - SET PIN - - - SET PIN - - -
		console.log("");
		console.log(chalk.yellow("  ----------------------------------------------  "));
		console.log(chalk.yellow("      Now we will setting a PIN for you Boss!     "));
		console.log(chalk.yellow("  ----------------------------------------------  "));
		console.log("")
		await delay(2000)
		const pin = "080599";
		const setOtpPin = await functionSetPin(pin, '', aksestoken, sessionnya, uniknya);
		if (setOtpPin.errors[0].code === `GoPay-111`) {
			console.log(chalk.red("[!] Sorry boss! This account already have a PIN!!! "));
			await delay(2000)
		}else if(setOtpPin.errors[0].code === `GoPay-1603`){
			console.log(chalk.green("[-] A verification code has been sent to your number"));
			await delay(2000)
			const otpPin = readline.question(chalk.yellow("[+] Enter the verification code : "));
			const setPin = await functionSetPin(pin, otpPin, aksestoken, sessionnya, uniknya);
			await delay(2000)
			if (setOtpPin.errors[0].code === `GoPay-1604`) {
				console.log(chalk.red("[!] The code you entered is incorrect! Please try again \n"));
				await delay(2000)
			}else{
			console.log(chalk.green("[-] Verification code is correct"));
			// console.log(setPin)
			console.log(chalk.green("[+] Hooray! This is PIN for your account boss! [ 080599 ] "));
			console.log(chalk.yellow("[+] Well done Boss. Let's create another account, don't waste your time.\n"))
			await delay(2000)
			}
		}
		}else if(sendOTP.errors[0].code === `AUTH:CUST:RATELIMITED`){
		console.log(chalk.red(`[!] ${sendOTP.errors[0].message}\n`))
		await delay(2000)
		}

	

    }catch(e){
        console.log(e)
    }

})();
