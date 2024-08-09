const mysql = require("mysql2")
const util = require('util')
const express = require("express")
const multer = require('multer')
const cors = require('cors')
const app = express()

const con = mysql.createConnection({
    host:"localhost",
    user:"mydbuser",
    password:"12345",
    database:"mizandb"
})
app.use(express.urlencoded({extended:true}))
app.use(cors());

// image upload

const storage = multer.diskStorage({
    destination:'uploads',
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage:storage})


// database creation and connection
// con.connect(function(err){
//     if(err) throw err;
//     console.log("connected");
//     con.query("CREATE DATABASE mizandb",function(err,result){
//         if(err) throw err;
//         console.log("Database created");
//     })
// })

// id,name,image,product_url,description,brief-description,storage-range,buying_link,pricerange,payment_options
// products{id,name,image_url}
// description{description_id,description,producturl}
// brief_description{brief_secription,storage_range}
// product_sale{price_range,buying_link,payment_options}
// additional_offers{Apple TV+,Apple Fitness+,Apple Arcade}

// table creation

// con.connect(function(err){
//     if(err) throw err;
//     console.log("connected");
// let products = "CREATE TABLE IF NOT EXISTS products (product_id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) not null, image_url VARCHAR(255) not null)"
// con.query(products,function(err,result){
//     if(err) throw err;
//     console.log("Products table Created");
// })
// let product_descripion = "CREATE TABLE IF NOT EXISTS product_descripion (descripion_id INT AUTO_INCREMENT PRIMARY KEY, product_id INT(15) not null, description VARCHAR(255) not null, product_url VARCHAR(255) not null,FOREIGN KEY (product_id) REFERENCES products(product_id))"
// con.query(product_descripion,function(err,result){
//     if(err) throw err;
//     console.log("product_descripion table Created");
// })
// let brief_description = "CREATE TABLE IF NOT EXISTS brief_description (brief_description_id INT AUTO_INCREMENT PRIMARY KEY, product_id INT(15) not null, brief_description TEXT not null, storage_range VARCHAR(255) not null,FOREIGN KEY (product_id) REFERENCES products(product_id))"
// con.query(brief_description,function(err,result){
//     if(err) throw err;
//     console.log("brief_description table created!!!");
// })
// let product_sale = "CREATE TABLE IF NOT EXISTS product_sale (product_sale_id INT AUTO_INCREMENT PRIMARY KEY, product_id INT(15) not null, price_range VARCHAR(255) not null, buying_link VARCHAR(255), payment_options TEXT not null, FOREIGN KEY (product_id) REFERENCES products(product_id))"
// con.query(product_sale,function(err,result){
//     if(err) throw err;
//     console.log("product_sale table created!!!");
// })
// let additional_offers = "CREATE TABLE IF NOT EXISTS additional_offers (additional_offers_id INT AUTO_INCREMENT PRIMARY KEY, product_id INT(15) not null, Apple_TV_plus TEXT not null, Apple_Fitness_plus TEXT not null,Apple_Arcade TEXT not null,FOREIGN KEY (product_id) REFERENCES products(product_id))"
// con.query(additional_offers,function(err,result){
//     if(err) throw err;
//     console.log("additional_offers table created!!!");
// })
// })


// second option
// app.get('/install',(req,res)=>{
//     con.connect(function(err){
//         if(err) throw err;
//         console.log("connected");
//     let products = "CREATE TABLE IF NOT EXISTS products (product_id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) not null, image_url VARCHAR(255) not null)"
//     con.query(products,function(err,result){
//         if(err) throw err;
//         console.log("Products table Created");
//     })
//     let product_descripion = "CREATE TABLE IF NOT EXISTS product_descripion (descripion_id INT AUTO_INCREMENT PRIMARY KEY, product_id INT(15) not null, description VARCHAR(255) not null, product_url VARCHAR(255) not null,FOREIGN KEY (product_id) REFERENCES products(product_id))"
//     con.query(product_descripion,function(err,result){
//         if(err) throw err;
//         console.log("product_descripion table Created");
//     })
//     let brief_description = "CREATE TABLE IF NOT EXISTS brief_description (brief_description_id INT AUTO_INCREMENT PRIMARY KEY, product_id INT(15) not null, brief_description TEXT not null, storage_range VARCHAR(255) not null,FOREIGN KEY (product_id) REFERENCES products(product_id))"
//     con.query(brief_description,function(err,result){
//         if(err) throw err;
//         console.log("brief_description table created!!!");
//     })
//     let product_sale = "CREATE TABLE IF NOT EXISTS product_sale (product_sale_id INT AUTO_INCREMENT PRIMARY KEY, product_id INT(15) not null, price_range VARCHAR(255) not null, buying_link VARCHAR(255), payment_options TEXT not null, FOREIGN KEY (product_id) REFERENCES products(product_id))"
//     con.query(product_sale,function(err,result){
//         if(err) throw err;
//         console.log("product_sale table created!!!");
//     })
//     let additional_offers = "CREATE TABLE IF NOT EXISTS additional_offers (additional_offers_id INT AUTO_INCREMENT PRIMARY KEY, product_id INT(15) not null, Apple_TV_plus TEXT not null, Apple_Fitness_plus TEXT not null,Apple_Arcade TEXT not null,FOREIGN KEY (product_id) REFERENCES products(product_id))"
//     con.query(additional_offers,function(err,result){
//         if(err) throw err;
//         console.log("additional_offers table created!!!");
//     })
//     })
//     res.end("<h1>CONGRATULATIONS!!!</h1> <h3>YOU HAVE CREATED FIVE TABLES SUCCESSFULLY!!!</h3>")
// })

con.connect(function(err){
    if(err) throw err;
    console.log("connected");
})

app.post("/add-product",upload.single('image_url'),(req,res)=>{
// let{product_name,image_url,description,product_url,
//     brief_description,storage_range,price_range,
//     buying_link,payment_options,Apple_TV_plus,Apple_Fitness_plus,
//     Apple_Arcade} = req.body;

    const product_name = req.body.product_name;
    const image_url = `uploads/${req.file.filename}`;
    const description = req.body.description;
    const product_url = req.body.product_url;
    const brief_description = req.body.brief_description;
    const storage_range = req.body.storage_range;
    const price_range = req.body.price_range;
    const buying_link = req.body.buying_link;
    const payment_options = req.body.payment_options;
    const Apple_TV_plus = req.body.Apple_TV_plus;
    const Apple_Fitness_plus = req.body.Apple_Fitness_plus;
    const Apple_Arcade = req.body.Apple_Arcade;
    let data = `INSERT INTO products (name, image_url) VALUES (?,?)`
    con.query(data,[product_name,image_url],function(err,result){
        console.log(result);
        if(err) throw err;
        console.log("data inserted into products table");
        let product_id = result.insertId

        //second table insertion
        let description_data = `INSERT INTO product_descripion 
        (product_id,description, product_url) VALUES (?,?,?)`
        con.query(description_data,[product_id,description,product_url],function(err,result){
            if(err) throw err;
            console.log("data inserted into product_descripion");
        })
        


        let brief_description_data = `INSERT INTO brief_description 
        (product_id,brief_description, storage_range) VALUES (?,?,?)`
        con.query(brief_description_data,[product_id, brief_description,storage_range],function(err,result){
            if(err) throw err;
            console.log("data inserted into brief_description dable");
        })
        let product_sale_data = `INSERT INTO product_sale 
        (product_id,price_range, buying_link,payment_options) VALUES (?,?,?,?)`
        con.query(product_sale_data,[product_id,price_range,buying_link,payment_options],function(err,result){
            if(err) throw err;
            console.log("data inserted into product_sale dable");
        })
        let additional_offers_data = `INSERT INTO additional_offers 
        (product_id,Apple_TV_plus, Apple_Fitness_plus,Apple_Arcade) VALUES (?,?,?,?)`
        con.query(additional_offers_data,[product_id,Apple_TV_plus,Apple_Fitness_plus,Apple_Arcade],function(err,result){
            if(err) throw err;
            console.log("data inserted into product_sale dable");
        })

    })



    res.status(200).send("Products added");
    
})


app.get("/iphones", (req, res) => {
    const sql = `
    SELECT 
        products.name AS product_name,
        products.image_url,
        product_descripion.description,
        product_descripion.product_url,
        brief_description.brief_description,
        brief_description.storage_range,
        product_sale.price_range,
        product_sale.buying_link,
        product_sale.payment_options,
        additional_offers.Apple_TV_plus,
        additional_offers.Apple_Fitness_plus,
        additional_offers.Apple_Arcade
    FROM 
        products
    JOIN 
        product_descripion ON products.product_id = product_descripion.product_id
    JOIN 
        brief_description ON products.product_id = brief_description.product_id
    JOIN 
        product_sale ON products.product_id = product_sale.product_id
    JOIN 
        additional_offers ON products.product_id = additional_offers.product_id;
  `;
  con.query(sql, (err, results) => {
    if (err) {
        res.status(500).json({ error: err.message });
        return;
    }
    res.json(results); 
});
});



//update

const query = util.promisify(con.query).bind(con);

app.patch("/update-product", upload.single('image_url'), async (req, res) => {
    try {
        const {
            product_id,
            product_name,
            description,
            product_url,
            brief_description,
            storage_range,
            price_range,
            buying_link,
            payment_options,
            Apple_TV_plus,
            Apple_Fitness_plus,
            Apple_Arcade
        } = req.body;

        let image_url;
        if (req.file) {
            image_url = `uploads/${req.file.filename}`;
        }

        
        let productData = `UPDATE products SET name = ? ${image_url ? ', image_url = ?' : ''} WHERE product_id = ?`;
        let productParams = image_url ? [product_name, image_url, product_id] : [product_name, product_id];
        await query(productData, productParams);
        console.log("Data updated in products table");
        let descriptionData = `UPDATE product_descripion SET description = ?, product_url = ? WHERE product_id = ?`;
        await query(descriptionData, [description, product_url, product_id]);
        console.log("Data updated in product_description table");
        let briefDescriptionData = `UPDATE brief_description SET brief_description = ?, storage_range = ? WHERE product_id = ?`;
        await query(briefDescriptionData, [brief_description, storage_range, product_id]);
        console.log("Data updated in brief_description table");
        let productSaleData = `UPDATE product_sale SET price_range = ?, buying_link = ?, payment_options = ? WHERE product_id = ?`;
        await query(productSaleData, [price_range, buying_link, payment_options, product_id]);
        console.log("Data updated in product_sale table");
        let additionalOffersData = `UPDATE additional_offers SET Apple_TV_plus = ?, Apple_Fitness_plus = ?, Apple_Arcade = ? WHERE product_id = ?`;
        await query(additionalOffersData, [Apple_TV_plus, Apple_Fitness_plus, Apple_Arcade, product_id]);
        console.log("Data updated in additional_offers table");

        res.status(200).send("Product updated successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error updating product");
    }
});


//delete
app.delete("/delete-product/:product_id", async (req, res) => {
    try {
        const product_id = req.params.product_id;

        await query('DELETE FROM additional_offers WHERE product_id = ?', [product_id]);
        console.log('Additional offers table deleted');

        await query('DELETE FROM product_sale WHERE product_id = ?', [product_id]);
        console.log('Product sale table deleted');

        await query('DELETE FROM brief_description WHERE product_id = ?', [product_id]);
        console.log('Brief description table deleted');

        await query('DELETE FROM product_descripion WHERE product_id = ?', [product_id]);
        console.log('Product description table deleted');

        await query('DELETE FROM products WHERE product_id = ?', [product_id]);
        console.log('Products table deleted');

        res.status(200).send("Product deleted successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error deleting product");
    }
});









app.listen(5000, () => {
    console.log("Listening on port 5000");
});



































































