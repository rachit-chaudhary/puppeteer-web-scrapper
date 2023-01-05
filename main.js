const pupperteer = require('puppeteer')
const fs = require('fs/promises')

async function start() {
    const browser = await pupperteer.launch()
    const page = await browser.newPage()

    await page.setViewport( {width: 1920, height: 1080} )
    await page.goto("https://digimarconindia.in/exhibitors/")

    await page.waitForSelector('p.main__sign-in-container > a')
    const signInLink = await page.$('p.main__sign-in-container > a')

    await signInLink.click()
    await page.waitForNavigation( {waitUntil: 'networkidle0'} )

    await page.type("#username", "astutihaiarora@gmail.com")
    await page.type("#password", "c14sector6noida")

    await page.click("div.login__form_action_container > button")
    await page.waitForNavigation()

    const profileNames = await page.$$eval("div.t-roman.t-sans > div > span > span > a", (anchor) => {
        return anchor.map(el => el.textContent)
    })

    //await fs.writeFile("profile-names.txt", profileNames.join("\r\n"))

    //console.log(profileNames)

    const title = await page.title()
    const url = await page.url()

    //await page.screenshot({path: "logged-in-screen.png"})

    console.log("Page Title: " +title)
    console.log("Page URL: " +url)

    await browser.close()
}

start()