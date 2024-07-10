import { NextResponse } from "next/server";
import pool from "../../config/mysql";
import fs from 'fs';
import path from 'path';

export async function GET(){
    try {
        const db = await pool.getConnection();
        const query = "SELECT p.PRODUCTID, p.PRODUCTTITLE, p.PRODUCTNAME, p.PREDESCRIPTION, p.DESCRIPTIONTITLE, p.DESCRIPTION, p.IMAGELOCATION, p.STATUS, p.SORTID, p.CREATEDDATETIME, p.LASTUPDATEDDATETIME, p.CREATEDUSER, p.LASTUPDATEDUSER, GROUP_CONCAT(CASE WHEN pf.PRODUCTFEATURECATEGORY = '5' THEN pf.DESCRIPTION END SEPARATOR ' | ') AS MAINPRODUCTFEATURES, GROUP_CONCAT(CASE WHEN pf.PRODUCTFEATURECATEGORY = '4' THEN pf.DESCRIPTION END SEPARATOR ' | ') AS PRODUCTFEATURES, ppm.AMOUNT FROM product p LEFT JOIN productfeature pf ON p.PRODUCTID = pf.PRODUCT LEFT JOIN productpaymentmethod ppm ON p.PRODUCTID = ppm.PRODUCT GROUP BY p.PRODUCTID, p.PRODUCTTITLE, p.PRODUCTNAME, p.PREDESCRIPTION, p.DESCRIPTIONTITLE, p.DESCRIPTION, p.IMAGELOCATION, p.STATUS, p.CREATEDDATETIME, p.LASTUPDATEDDATETIME, p.CREATEDUSER, p.LASTUPDATEDUSER, ppm.AMOUNT ORDER BY p.SORTID ASC;";
        const [rows] = await db.execute(query);
        db.release();
        return NextResponse.json(rows)
    }catch(error){
        return NextResponse.json({
            error: error
        }, { status:500 })
    }
}

export async function POST(req) {
    try {
      const { productName, descriptionTitle, description, mainProductFeatures, amount, productFeatures } = await req.json();
  
      const db = await pool.getConnection();
      const insertProductQuery = "INSERT INTO product (PRODUCTNAME, DESCRIPTIONTITLE, DESCRIPTION) VALUES (?, ?, ?)";
      const [productResult] = await db.execute(insertProductQuery, [productName, descriptionTitle, description]);
  
      const productId = productResult.insertId;
      const insertFeaturesQuery = "INSERT INTO productfeature (PRODUCT, PRODUCTFEATURECATEGORY, DESCRIPTION) VALUES (?, ?, ?)";
      
      const mainFeaturesArray = mainProductFeatures.split('\n');
      for (const feature of mainFeaturesArray) {
        await db.execute(insertFeaturesQuery, [productId, '5', feature]);
      }
  
      const featuresArray = productFeatures.split('\n');
      for (const feature of featuresArray) {
        await db.execute(insertFeaturesQuery, [productId, '4', feature]);
      }
  
      const insertPaymentMethodQuery = "INSERT INTO productpaymentmethod (PRODUCT, AMOUNT) VALUES (?, ?)";
      await db.execute(insertPaymentMethodQuery, [productId, amount]);
  
      db.release();
      return NextResponse.json({ message: "Product added successfully!" });
    } catch (error) {
      return NextResponse.json({
        error: error.message,
      }, { status: 500 });
    }
  }
  

  export async function PATCH(req) {
    try {
      const { productId, productName, descriptionTitle, description, mainProductFeatures, amount, productFeatures, image } = await req.json();
  
      let imagePath = null;
      if (image) {
        const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
        const buffer = Buffer.from(base64Data, 'base64');
        imagePath = `product_${productId}_${Date.now()}.png`;
        fs.writeFileSync(path.join('./public/productImages', imagePath), buffer);
      }
  
      const db = await pool.getConnection();
      const updateProductQuery = "UPDATE product SET PRODUCTNAME = ?, DESCRIPTIONTITLE = ?, DESCRIPTION = ? WHERE PRODUCTID = ?";
      await db.execute(updateProductQuery, [productName, descriptionTitle, description, productId]);
  
      const deleteFeaturesQuery = "DELETE FROM productfeature WHERE PRODUCT = ?";
      await db.execute(deleteFeaturesQuery, [productId]);
  
      const insertFeaturesQuery = "INSERT INTO productfeature (PRODUCT, PRODUCTFEATURECATEGORY, DESCRIPTION, SORTID, `STATUS`, CREATEDUSER, LASTUPDATEDUSER) VALUES (?, ?, ?, ?, ?, ?, ?)";
  
      let sortId = 0;
  
      const mainFeaturesArray = mainProductFeatures.split(' | ');
      for (const feature of mainFeaturesArray) {
        await db.execute(insertFeaturesQuery, [productId, '5', feature, sortId, '1', 'admin', '1017']);
        sortId = sortId + 1;
      }
  
      const featuresArray = productFeatures.split(' | ');
      for (const feature of featuresArray) {
        await db.execute(insertFeaturesQuery, [productId, '4', feature, sortId, '1', 'admin', '1017']);
        sortId = sortId + 1;
      }
  
      const updatePaymentMethodQuery = "UPDATE productpaymentmethod SET AMOUNT = ? WHERE PRODUCT = ?";
      await db.execute(updatePaymentMethodQuery, [amount, productId]);
  
      if (imagePath) {
        const updateImageQuery = "UPDATE product SET IMAGELOCATION = ? WHERE PRODUCTID = ?";
        await db.execute(updateImageQuery, ["/productImages/"+imagePath, productId]);
      }
  
      db.release();
      return NextResponse.json({ message: "Product updated successfully!" });
    } catch (error) {
      return NextResponse.json({
        error: error.message,
      }, { status: 500 });
    }
  }