import axios from "axios";
import * as cheerio from "cheerio";
import { prisma } from "../database/prisma";
import { TCreateProduct, TFindproduct } from "./interfaces";
import { returnRegisteredProduct, returnSearchProduct } from "./schemas";

class ProductService{

    public findProduct= async(URL:string)=>{
        const product:TFindproduct={};
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
        totalPrice=totalPrice.replace(",","");     
        product.price=Math.round(Number(totalPrice)*100); 
        product.name=$itemName.text().trim();
      
        console.log(totalPrice);
        console.log(Number(totalPrice));
        
        return returnSearchProduct.parse(product);
          

    };

    public addProduct= async(URL:string, userId:string, name?:string)=>{
       
        const response = await axios(URL);
        const html = response.data;
        const $ = cheerio.load(html); 
        const $itemName = $("#productTitle");
        const $divBox = $("div.a-section.a-spacing-micro");  
        const $img = $("#imgTagWrapperId > img");

        let totalPrice='';
        $divBox.each(function(){ 
            const price = $(this).find(".a-price-whole").text();
            const priceParcel = $(this).find(".a-price-fraction").text();
           if (price && priceParcel) {
                totalPrice = `${price}${priceParcel}`;
                return false; 
              }
            
               
        })
        const productPhoto=$img.attr("src") as string;
        const productPrice=totalPrice.replace(",","");
        let productName;
        if(name)
        {
            productName=name;
        }else{
            productName=$itemName.text().trim();

        }

      
        const product={
            name:productName,
            photo: productPhoto,
            URL:URL,
            userId:userId  
        };
        const registeredProduct = await prisma.product.create({data:product});

        const date = new Date();
        const price =Math.round(Number(totalPrice)*100);       
        const registeredPrice = await prisma.price.create({data:{date:date,price:price,productId: registeredProduct.id}})

        const newProduct = await prisma.product.findFirst({where:{id:registeredProduct.id},include:{price:true}});
       
        console.log(newProduct);
        
        return returnRegisteredProduct.parse(newProduct);
              
    };
    
};

export const productService = new ProductService();