import axios from "axios";
import * as cheerio from "cheerio";

//const URL =
  "https://www.amazon.se/-/en/gp/product/B0CY5GTPQC/ref=ox_sc_saved_title_1?smid=ANU9KP01APNAG&psc=1";

 // const URL = "https://www.amazon.se/-/en/gp/product/B07L3JZD6D/ref=ewc_pr_img_1?smid=ANU9KP01APNAG&psc=1";

type Tproduct={title?:string,
                photo?:string,
                price?:string // em breve um int
}

class ProductService{

    public create= async(URL:string)=>{
        const product:Tproduct={};
        const response = await axios(URL);
        const html = response.data;
        const $ = cheerio.load(html); 
        const $itemName = $("#productTitle");
        const $divBox = $("div.a-section.a-spacing-micro");  
        const $img = $("#imgTagWrapperId > img");

        let totalPrice='';
        $divBox.each(function(){ //pega o preco do item
            const price = $(this).find(".a-price-whole").text();
            const priceParcel = $(this).find(".a-price-fraction").text();
           if (price && priceParcel) {
                totalPrice = `${price}${priceParcel}`;
                return false; 
              }
            
               
        })
        product.photo=$img.attr("src");
        product.price=totalPrice;
        product.title=$itemName.text().trim();
        return product;
          

    };
    
};

export const productService = new ProductService();