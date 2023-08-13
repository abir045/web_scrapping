const puppeteer = require('puppeteer')
const fs = require('fs')

async function run() {

    const browser = await puppeteer.launch({headless: "new"}) ;

    const page = await browser.newPage();

    

    await page.goto('https://www.startech.com.bd/laptop-notebook/laptop/asus-laptop')


    const laptops = await page.evaluate(()=> 
    
    
    Array.from(document.querySelectorAll('.product-listing .main-content .p-item .p-item-inner .p-item-details'),
       (e)=> {
       
        // const liElements = e.querySelectorAll('.card-body .short-desc-attr .category-info .card-text') 
        // const descArray  = Array.from(liElements, li => li.innerText)
        const title = e.querySelector('.p-item-name a').innerText
    
        return {
            // desc: descArray 
            title 

        }
    
    
    }))
    
    console.log(laptops)

    //save data to json file
    // fs.writeFile('asusLaptops.json', JSON.stringify(laptops), (err) => {
    //     if(err) throw err;
    //     console.log('file saved')
    // } )

          
    await browser.close()
}


run()