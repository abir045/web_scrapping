const puppeteer = require('puppeteer')
const fs = require('fs')

// async function run() {

//     const browser = await puppeteer.launch({headless: "new"}) ;

//     const page = await browser.newPage();

    

//     await page.goto('https://www.ryanscomputers.com/category/all-laptop-asus?limit=120&osp=0&page=1')


//     const laptops = await page.evaluate(()=> Array.from(document.querySelectorAll('.grid-container .product-home-card .category-single-product .card  '), (e)=> ({
//           title: e.querySelector( '.card-body .card-text a').innerText,
//           price: e.querySelector( '.card-body .pr-text').innerText,
//           url:   e.querySelector( '.card-body .card-text a').href,
//           img:   e.querySelector('.image-box img ').getAttribute("src")  
//     }))
//     )
    
    
//     console.log(laptops)

    // save data to json file
    // fs.writeFile('asusLaptops.json', JSON.stringify(laptops), (err) => {
    //     if(err) throw err;
    //     console.log('file saved')
    // } )

//                                       //.category-single-product for each product
//                                       // .product-home-card
//     await browser.close()
// }


// run()


async function run() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  const baseUrl = 'https://www.ryanscomputers.com/category/all-laptop-asus';
  const laptopsPerPage = 20; // Assuming there are 10 laptops per page

  // Function to get laptops from the current page
  async function getLaptopsFromPage() {
    return await page.evaluate(() =>
      Array.from(document.querySelectorAll('.grid-container .product-home-card .category-single-product .card  '), (e) => {
        const priceElement = e.querySelector('.card-body .pr-text');
        return {
        title: e.querySelector('.card-body .card-text a').innerText,
        price: priceElement ? priceElement.innerText : 'N/A',
        url:   e.querySelector( '.card-body .card-text a').href,
        img:   e.querySelector('.image-box img ').getAttribute("src")
        } 

        
      }))
    
  }

  // Function to click on the "Next" button to go to the next page
  async function goToNextPage() {
    const nextPageButton = await page.$('.pagination li.active + li a'); // Assumes the active page has the class "active"
    if (nextPageButton) {
      await nextPageButton.click();
      await page.waitForNavigation({ waitUntil: 'networkidle0' });
    } else {
      // If there is no "Next" button, we have reached the last page
      return false;
    }
    return true;
  }

  const allLaptops = [];

  await page.goto(baseUrl);
  let hasNextPage = true;
  let pageCounter = 1;

  while (hasNextPage) {
    console.log(`Scraping page ${pageCounter}...`);
    const laptopsOnPage = await getLaptopsFromPage();
    allLaptops.push(...laptopsOnPage);

    hasNextPage = await goToNextPage();
    pageCounter++;
  }

  // save data to json file
  fs.writeFile('asusLaptopsRyans.json', JSON.stringify(allLaptops), (err) => {
    if(err) throw err;
    console.log('file saved')
} )
  await browser.close();
}

run();



















