const puppeteer = require('puppeteer');
require('console-stamp')(console, 'HH:MM:ss.l');
const fs = require('fs');
const { promisify } = require('util');
const sleep = promisify(setTimeout);



(async () => {
    console.log("Bot Started")
    while(true) {
        let credentials = fs.readFileSync('credentials.txt', {encoding:'utf8', flag:'r'});

        let targetUsername = fs.readFileSync('target.txt', {encoding:'utf8', flag:'r'});
    
        let username = credentials.split(':')[0]
        let password = credentials.split(':')[1]
    
        console.log("Generating Browser")
    
        const args = [
            '--no-sandbox',
            '--window-size=1000,650',
            '--disable-setuid-sandbox',
            '--disable-infobars',
            '--window-position=0,0',
            '--ignore-certifcate-errors',
            '--ignore-certifcate-errors-spki-list',
            '--user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0 Safari/537.36"'
        ];
    
        const browser = await puppeteer.launch({
            args,
            headless: false,
            ignoreHTTPSErrors: true,
        });
    
        const page = await browser.newPage();
        await page.setViewport({
            width: 1000,
            height: 650,
        });
        console.log("Login")
    
        await page.goto('https://www.instagram.com/accounts/login/', { "waitUntil": "networkidle2" });
    
        await page.type('input[name="username"]', username);
        await page.type('input[name="password"]', password);
        await page.click('button[type="submit"]');
    
        await page.waitForNavigation();
    
        console.log("Going to Target Account")
    
        await page.goto(`https://www.instagram.com/${targetUsername}/`, { "waitUntil": "networkidle2" });
    
        console.log("Reporting target user")
    
        await page.click('button[class="_abl-"]');
    
        await sleep(1500);
    
        const elements = await page.$x('/html/body/div[2]/div/div/div[2]/div/div/div[1]/div/div[2]/div/div/div/div/div[2]/div/div/div/button[3]')
        await elements[0].click() 
    
        await sleep(1500);
    
        const elements2 = await page.$x('/html/body/div[2]/div/div/div[2]/div/div/div[1]/div/div[2]/div/div/div/div/div[2]/div/div/div[2]/div/div/div/div[3]/button[2]/div')
        await elements2[0].click() 
    
        await sleep(1500);
    
        const elements3 = await page.$x('/html/body/div[2]/div/div/div[2]/div/div/div[1]/div/div[2]/div/div/div/div/div[2]/div/div/div[2]/div/div/div/div[1]/button[1]/div')
        await elements3[0].click()
    
        await sleep(1500);
    
        const elements4 = await page.$x('/html/body/div[2]/div/div/div[2]/div/div/div[1]/div/div[2]/div/div/div/div/div[2]/div/div/div[2]/div/div/div/div[1]/button[1]/div')
        await elements4[0].click()
    
        await sleep(2500)
    
        await browser.close();
    
        console.log("Reported User")
    }
})();
