const puppeteer = require('puppeteer')
const fs = require('fs/promises')

async function start() {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    
    await page.goto("https://digimarconindia.in/exhibitors/")

    const list = await page.evaluate(() => {
        return Array.from(document.querySelectorAll(".exhi p")).map(x => x.textContent)
    })
    await fs.writeFile("list.csv", list.join("\r\n"))

    await browser.close()
}
start()