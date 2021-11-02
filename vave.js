const fetch = require('node-fetch');
const readline = require('readline-sync');
const chalk = require('chalk');
const delay = require('delay');
const fs = require('fs');

const bikinangka = length =>
    new Promise((resolve, reject) => {
        var text = "";
        var possible =
            "123456789";

        for (var i = 0; i < length; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        resolve(text);
    });


const register = (username, namanya, tahun, bulan, tanggal, nomorhp, email) => new Promise((resolve, reject) => {
    const url = 'https://mobapi.vave.co.id/V1/index.php'
    const badan = {
        "cmd":"registerAccount",
        "formData":{
            "username":username,
            "fullname":namanya,
            "birthday":`${tahun}-${bulan}-${tanggal}`,
            "mobile":nomorhp,
            "email":email,
            "refcode":"9NAY858E"
            },
            "manifest":{
                "os":"android",
                "app_version":"4.3.0",
                "code_version":301,
                "id_session":"4dbc392b-bd62-4e76-a6ff-a1d720c306b8",
                "id_install":"754ba688-d02a-445f-ad34-99b1953efc71",
                "branch":"production",
                "device":"SM-G911N"
                },
        }
        fetch(url, {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            "content-length": 403,
            'accept-encoding': 'gzip',
            //cookie: PHPSESSID=dk5i9epm9aksu5d2c0b8kci6oi; AWSALB=iLTkT70O5Fo48ikoXDCillTiW8fEm5SUeE6hUkDVBs3TFFsM/0PIz7Ql3CLSo81S3S87znbeHxOYqg+iXq8AX1UfrUR4fqiPdiL0Mkaoj7S2bITvt3r/Q/uz1UuQ; AWSALBCORS=iLTkT70O5Fo48ikoXDCillTiW8fEm5SUeE6hUkDVBs3TFFsM/0PIz7Ql3CLSo81S3S87znbeHxOYqg+iXq8AX1UfrUR4fqiPdiL0Mkaoj7S2bITvt3r/Q/uz1UuQ
            'user-agent': 'okhttp/3.14.9'
        },
        body: JSON.stringify(badan)
    })
    .then(res => res.json())
    .then(result => {
        resolve(result) // 
        //console.log(result)
        //console.log(result.id_register) //PENTING
        //const idregister1 = `${result.id_register1}`
    })
    .catch(err => {
        reject(err) // 
        //console.log(err) //PENTING
        console.log(chalk.red(`[!] Error ! ! !\n`));
    })

});

const verifyy = (idregister) => new Promise((resolve, reject) => {
    const url = 'https://mobapi.vave.co.id/V1/index.php'
    const badan = {
        "cmd":"registerAccount",
        "action":"proceed_register",
        "id_register":idregister,
        "manifest":{
            "os":"android",
            "app_version":"4.3.0",
            "code_version":301,
            "id_session":"9d88b715-8f01-4e39-a1b3-68d158c96cbc",
            "id_install":"754ba688-d02a-445f-ad34-99b1953efc71",
            "branch":"production",
            "device":"SM-G911N"
            }
        }
        fetch(url, {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            "content-length": 403,
            'accept-encoding': 'gzip',
            //cookie: PHPSESSID=dk5i9epm9aksu5d2c0b8kci6oi; AWSALB=iLTkT70O5Fo48ikoXDCillTiW8fEm5SUeE6hUkDVBs3TFFsM/0PIz7Ql3CLSo81S3S87znbeHxOYqg+iXq8AX1UfrUR4fqiPdiL0Mkaoj7S2bITvt3r/Q/uz1UuQ; AWSALBCORS=iLTkT70O5Fo48ikoXDCillTiW8fEm5SUeE6hUkDVBs3TFFsM/0PIz7Ql3CLSo81S3S87znbeHxOYqg+iXq8AX1UfrUR4fqiPdiL0Mkaoj7S2bITvt3r/Q/uz1UuQ
            'user-agent': 'okhttp/3.14.9'
        },
        body: JSON.stringify(badan)
    })
    .then(res => res.json())
    .then(result => {
        resolve(result) // 
        //console.log(result) //PENTING
    })
    .catch(err => {
        reject(err) // 
        //console.log(err) //PENTING
        console.log(chalk.red(`[!] Error ! ! !\n`));
    })

});

const getotp = (nomorhp) => new Promise((resolve, reject) => {
    const url = 'https://mobapi.vave.co.id/V1/index.php'
    const badan = {
        "cmd":"loginAttempt",
        "mobileNumber":nomorhp,
        "refcode":"9NAY858E",
        "manifest":{
            "os":"android",
            "app_version":"4.3.0",
            "code_version":301,
            "id_session":"a2fd929c-3634-4a1e-8fea-c04a151ff056",
            "id_install":"754ba688-d02a-445f-ad34-99b1953efc71",
            "branch":"production",
            "device":"SM-G911N"}
        }
        fetch(url, {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            "content-length": 403,
            'accept-encoding': 'gzip',
            //cookie: PHPSESSID=dk5i9epm9aksu5d2c0b8kci6oi; AWSALB=iLTkT70O5Fo48ikoXDCillTiW8fEm5SUeE6hUkDVBs3TFFsM/0PIz7Ql3CLSo81S3S87znbeHxOYqg+iXq8AX1UfrUR4fqiPdiL0Mkaoj7S2bITvt3r/Q/uz1UuQ; AWSALBCORS=iLTkT70O5Fo48ikoXDCillTiW8fEm5SUeE6hUkDVBs3TFFsM/0PIz7Ql3CLSo81S3S87znbeHxOYqg+iXq8AX1UfrUR4fqiPdiL0Mkaoj7S2bITvt3r/Q/uz1UuQ
            'user-agent': 'okhttp/3.14.9'
        },
        body: JSON.stringify(badan)
    })
    .then(res => res.json())
    .then(result => {
        resolve(result) // 
        //console.log(result) //PENTING
    })
    .catch(err => {
        reject(err) // 
        //console.log(err) //PENTING
        console.log(chalk.red(`[!] Error ! ! !\n`));
    })

});

const sendotp = (nomorhp, otpnya) => new Promise((resolve, reject) => {
    const url = 'https://mobapi.vave.co.id/V1/index.php'
    const badan = {
            "cmd":"loginAttempt",
            "action":"otpVerify",
            "mobileNumber":nomorhp,
            "otpType":"otp_verify_finpay",
            "otpCode":otpnya,
            "manifest":{
                "os":"android",
                "app_version":"4.3.0",
                "code_version":301,
                "id_session":"a2fd929c-3634-4a1e-8fea-c04a151ff056",
                "id_install":"754ba688-d02a-445f-ad34-99b1953efc71",
                "branch":"production",
                "device":"SM-G911N"
            }
        }
        fetch(url, {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            "content-length": 403,
            'accept-encoding': 'gzip',
            //cookie: PHPSESSID=dk5i9epm9aksu5d2c0b8kci6oi; AWSALB=iLTkT70O5Fo48ikoXDCillTiW8fEm5SUeE6hUkDVBs3TFFsM/0PIz7Ql3CLSo81S3S87znbeHxOYqg+iXq8AX1UfrUR4fqiPdiL0Mkaoj7S2bITvt3r/Q/uz1UuQ; AWSALBCORS=iLTkT70O5Fo48ikoXDCillTiW8fEm5SUeE6hUkDVBs3TFFsM/0PIz7Ql3CLSo81S3S87znbeHxOYqg+iXq8AX1UfrUR4fqiPdiL0Mkaoj7S2bITvt3r/Q/uz1UuQ
            'user-agent': 'okhttp/3.14.9'
        },
        body: JSON.stringify(badan)
    })
    .then(res => res.json())
    .then(result => {
        resolve(result) // 
        console.log(result) //PENTING
    })
    .catch(err => {
        reject(err) // 
        //console.log(err) //PENTING
        console.log(chalk.red(`[!] Error ! ! !\n`));
    })

});

(async () => {
    while(true){    
        try{
        console.log(chalk.green(` - - - REGISTER - - -`));

        const angka = await bikinangka(1);
        const angka3 = await bikinangka(3);
        const angka4 = await bikinangka(4);
        var exe = fs.readFileSync(`name.txt`, 'utf8')                    
                            .replace(/\r\n|\r|\n/g, " ")
                            .split(" ");
        var email1 = exe[`${angka4}`]
        //console.log(email1);
        //const username = await readline.question(chalk.yellow('[-] Username : '));
        const username = `${email1}${angka3}`
        const namanya = `${username}`
        const tahun = `199${angka}`
        const bulan = `0${angka}`
        const tanggal = `1${angka}`
        const nomorhp1= await readline.question(chalk.yellow('[-] Nomor HP : '));
        const nomorhp2 = nomorhp1.split(`628`);
        const nomorhp = `08${nomorhp2[1]}`
        //console.log(nomorhp)
        const email = `${username}${angka}@gmail.com`
        const registcek = await register(username, namanya, tahun, bulan, tanggal, nomorhp, email);
        const idregister = await registcek.id_register
        await delay(2000);
        const verify1 = await verifyy(idregister);
        const resultt1 = `${verify1.status}`
        if (resultt1 === "ok") {
            console.log(chalk.green(`[-] Successfully ${username}\n`));
        }else{
            console.log(chalk.red(`[!] Already registered ! \n`));
        }
        await delay(2000);

        console.log(chalk.green(` - - - - LOGIN - - - -`));
        const getotp1 = await getotp(nomorhp);
        const resultt2 = `${getotp1.status}`
        if (resultt2 === "ok") {
            console.log(chalk.green(`[-] OTP has been send . . . `));
            }else{
                console.log(chalk.red(`[!] Failed request OTP`));
            }
            const otpnya = await readline.question(chalk.yellow('[-] OTP : '));
            const sendotp1 = await sendotp(nomorhp, otpnya);
            const resultt = `${sendotp1.status}`
            if (resultt === "ok") {
                console.log(chalk.green(`[-] Successfully login\n`));
            }else{
                console.log(chalk.red(`[!] ${resultt1}\n`));
                await delay(2000);

                console.log(chalk.green(` - - - - LOGIN - - - -`));
                const getotp1 = await getotp(nomorhp);
                const resultt2 = `${getotp1.status}`
                if (resultt2 === "ok") {
                    console.log(chalk.green(`[-] OTP has been send . . . `));
                    }else{
                        console.log(chalk.red(`[!] Failed request OTP`));
                    }
                    const otpnya = await readline.question(chalk.yellow('[-] OTP : '));
                    const sendotp1 = await sendotp(nomorhp, otpnya);
                    const resultt = `${sendotp1.status}`
                    if (resultt === "ok") {
                        console.log(chalk.green(`[-] Successfully login\n`));
                    }else{
                        console.log(chalk.red(`[!] ${resultt1}\n`));
                    }
                }

    }catch(e){
        //console.log(e)
    }
}
})();
