const Product = require("../models/products")

const getAllProductsStatic = async (req,res) => {
    const products = await Product.find({}).sort("name").select("name price").limit(3)
    res.status(200).json({ nbHits:products.length, products})
}

const getAllProducts = async (req,res) => {
    const {featured, company, name, sort, fields} = req.query

    const queryObject = {}

    if(featured){
        queryObject.featured = featured === 'true' ? true : false
    }
    if(company){
        queryObject.company = company
    }
    if(name){
        queryObject.name = {$regex:name, $options:'i'}
    }
    // console.log(queryObject);

    let result = Product.find(queryObject)

    if(sort){
        const sortList = sort.split(",").join(" ")
        // console.log(sortList);
        result = result.sort(sortList)
    }else {
        result = result.sort("createdAt")
    }

    if(fields){
        const selectList = fields.split(",").join(" ")
        result = result.select(selectList)
    }

    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page-1)*limit

    result = result.skip(skip).limit(limit)

    const products = await result

    res.status(200).json({nbHits:products.length, products})
}

const createProduct = async (req,res) =>{
    const product = await Product.create(req.body)
    res.status(201).json({product})
}

module.exports = {getAllProducts, getAllProductsStatic, createProduct}