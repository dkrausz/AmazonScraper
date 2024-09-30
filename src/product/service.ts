import axios from "axios";
import * as cheerio from "cheerio";
import { prisma } from "../database/prisma";
import { TCreatePriceBody, TCreateProduct, TFindproduct } from "./interfaces";
import { returnRegisteredProduct, returnSearchProduct } from "./schemas";
import { AppError } from "../@shared/error";

class ProductService {
  public findProduct = async (URL: string) => {
    const product: TFindproduct = {};
    const response = await axios(URL);
    const html = response.data;
    const $ = cheerio.load(html);
    const $itemName = $("#productTitle");
    const $divBox = $("div.a-section.a-spacing-micro");
    const $img = $("#imgTagWrapperId > img");

    let totalPrice = "";
    $divBox.each(function () {
     
      const price = $(this).find(".a-price-whole").text();
      const priceParcel = $(this).find(".a-price-fraction").text();
      if (price && priceParcel) {
        totalPrice = `${price}${priceParcel}`;
        return false;
      }
    });
    product.photo = $img.attr("src");
    totalPrice = totalPrice.replace(",", "");
    product.price = Math.round(Number(totalPrice) * 100);
    product.name = $itemName.text().trim();

    return returnSearchProduct.parse(product);
  };

  public addProduct = async (URL: string, userId: string, name?: string) => {
    const findedProduct = await this.findProduct(URL);

    let productName;

    if (name) {
      productName = name;
    } else {
      productName = findedProduct.name;
    }

    const product = {
      name: productName,
      photo: findedProduct.photo,
      URL: URL,
      userId: userId,
    };

    const registeredProduct = await prisma.product.create({ data: product });

    const date = new Date();
    const price = findedProduct.price;
    const registeredPrice = await prisma.price.create({
      data: { date: date, price: price, productId: registeredProduct.id },
    });

    const newProduct = await prisma.product.findFirst({
      where: { id: registeredProduct.id },
      include: { price: true },
    });


    return returnRegisteredProduct.parse(newProduct);
  };

  public registerNewPrice = async (id: string) => {
    const retrivedProduct = await prisma.product.findFirst({ where: { id } });

    if (!retrivedProduct) {
      throw new AppError(404, "product not found");
    }

    const updatedPrice = await this.findProduct(retrivedProduct.URL);
    const date = new Date();

    const priceObject: TCreatePriceBody = {
      date: date,
      price: updatedPrice.price,
      productId: id,
    };

    const newPrice = await prisma.price.create({ data: priceObject });
  };

  public updatePrices = async () => {
    const products = await prisma.product.findMany({
      include: { price: true },
    });

 products.forEach(async(product)=>{
    await this.registerNewPrice(product.id);
 })


  };


  public getAllProducts = async(userId:string)=>{

    const products = await prisma.product.findMany({where:{userId},include:{price:true}});

    return returnRegisteredProduct.array().parse(products);

  };

  public deleteProduct = async(id:string)=>{

    return await prisma.product.delete({where:{id}});

     
};

};





export const productService = new ProductService();
