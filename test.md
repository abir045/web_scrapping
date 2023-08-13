// async function run() {

//     const browser = await puppeteer.launch({headless: "new"}) ;

//     const page = await browser.newPage();

    

//     await page.goto('https://www.ryanscomputers.com/category/laptop-all-laptop')


//     const laptops = await page.evaluate(()=> 
    
    
//     Array.from(document.querySelectorAll('.grid-container .product-home-card .category-single-product .card '),
//        (e)=> {
       
//         const liElements = e.querySelectorAll('.card-body .short-desc-attr .category-info .card-text') 
//         const descArray  = Array.from(liElements, li => li.innerText)
    
//         return {
//             desc: descArray 

//         }
    
    
//     }))
    
//     console.log(laptops)

//     //save data to json file
//     // fs.writeFile('asusLaptops.json', JSON.stringify(laptops), (err) => {
//     //     if(err) throw err;
//     //     console.log('file saved')
//     // } )

          
//     await browser.close()
// }


// run()