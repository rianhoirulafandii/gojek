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


const bikinunik = length =>
    new Promise((resolve, reject) => {
        var text = "";
        var possible =
            "abcdefghijklmnopqrstuvwxyz1234567890";

        for (var i = 0; i < length; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        resolve(text);
    });

const bikimesin = length =>
    new Promise((resolve, reject) => {
        var text = "";
        var possible =
            "ABCDEFGHIJKLMNOPQRSTUVWQYZ";

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
    

const addmotor = (token, angka, mesin) => new Promise((resolve, reject) => {
    const url = 'https://api-ahass.wahanahonda.com/api/motorcycle/add'
    const badan = {
    "engine_number":mesin,
    "ut_code":"B5D02M29M2 M/T",
    "unit":5,"type":26,"assembly_year":"2018",
    "purchase_date":"","pa_insurance_date":"",
    "vehicle_number":`B ${angka} JG`,"3_digit_code":"EG0",
    "2_digit_code":"EG",
    "dealer_id":"","color":""}
    fetch(url, {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Content-Length': '235',
            'Host': 'api-ahass.wahanahonda.com',
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


const motor = (token) => new Promise((resolve, reject) => {
    const url = 'https://api-ahass.wahanahonda.com/api/motorcycle/firstreward/choose'
    const badan = {"id":"441"}
    fetch(url, {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Content-Length': '12',
            'Host': 'api-ahass.wahanahonda.com',
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

const motor2 = (token) => new Promise((resolve, reject) => {
    const url = 'https://api-ahass.wahanahonda.com/api/motorcycle/firstreward/choose'
    const badan = {"id":"442"}
    fetch(url, {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Content-Length': '12',
            'Host': 'api-ahass.wahanahonda.com',
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

const motor3 = (token) => new Promise((resolve, reject) => {
    const url = 'https://api-ahass.wahanahonda.com/api/motorcycle/firstreward/choose'
    const badan = {"id":"443"}
    fetch(url, {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Content-Length': '12',
            'Host': 'api-ahass.wahanahonda.com',
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

const motor4 = (token) => new Promise((resolve, reject) => {
    const url = 'https://api-ahass.wahanahonda.com/api/motorcycle/firstreward/choose'
    const badan = {"id":"440"}
    fetch(url, {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Content-Length': '12',
            'Host': 'api-ahass.wahanahonda.com',
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

const redeempoint = (token) => new Promise((resolve, reject) => {
    const url = 'https://api-ahass.wahanahonda.com/api/redeem/point'
    const badan = {"item_id":401}
    fetch(url, {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Content-Length': '12',
            'Host': 'api-ahass.wahanahonda.com',
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

(async () => {
    // while(true){
    try{
        const uniknya = await bikinunik(16);
        const acakadut = await bikinunik(13);
        const angka = await bikinangka(4);
        const mesin = await bikimesin(9);
        // console.log(mesin)
        const token = "d34df6b7fcf5eed204f7f5b3d4a9d155e0f18652454ec4695dddd158b9501041"
        //const token = readline.question(chalk.yellow("[+] Enter your Bearer Token : "))
        const add = await addmotor(token, angka, mesin)
        console.log(add)
        const redeem = await motor(token)
        console.log(redeem)
        const redeem2 = await motor2(token)
        console.log(redeem2)
        const redeem3 = await motor3(token)
        console.log(redeem3)
        const redeem4 = await motor4(token)
        console.log(redeem4)
        const redpoint = await redeempoint(token)
        console.log(redpoint)
        console.log("")
    }catch(e){
        console.log(e)
    }
//}
})();
