import path from "path";
import Product from "../models/product";

export const index = async (req,res) => {
    const products = await Product.find();
    res.render(path.resolve(__dirname, '..', 'views','web','index'), {products});
}

export const findOneProduct = async (req,res) => {
    let searchOptions = {}
    if (req.query.description != null && req.query.description !== '') {
        searchOptions.description = new RegExp(req.query.description, 'i')
    }
    try{
        const products = await Product.find(searchOptions)
        res.render(path.resolve(__dirname, '..', 'views','product','search'), {
            products: products,
            searchOptions: req.query })
    }catch{
        res.redirect('/')
    }
};