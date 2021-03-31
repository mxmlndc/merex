import Product from "../models/product";
import Cart from "../models/cart";
import path from "path";
import { getPagination } from "../libs/getPagination";

export const showAllProducts =async (req,res) => {
    const products = await Product.find();
    res.render(path.resolve(__dirname, '..', 'views','product','shop'), {products});
};

export const detailProduct = async (req,res) => {
    const { id } = req.params;
    const product = await Product.findById (id);
    res.render(path.resolve(__dirname, '..', 'views','product','productDetail'), {product});
};

export const findAllProducts = async (req, res)=> {
    try {
        const { size, page, lastName } = req.query

        const condition = lastName 
        ? {
            lastName : {$regex: new RegExp(lastName), $options: "i"},
            }
        : {};

        const { limit, offset } = getPagination (size, page)
        const data = await Product.paginate(condition, { offset: offset, limit: limit})

    res.json({
        totalItems: data.totalDocs,
        products: data.docs,
        totalPages: data.totalPages,
        currentPage: data.page -1
    })
    } catch (error) {
        res.status(500)({
            message: error.message || "Something goes wrong"
        })
    }
};

export const findOneProduct = async (req,res) => {
    let searchOptions = {}
    if (req.query.description != null && req.query.description !== '') {
        searchOptions.description = new RegExp(req.query.description, 'i')
    }
    try{
        const products = await Product.find(searchOptions)
        res.render('/search-result/index', {
            products: products,
            searchOptions: req.query })
    }catch{
        res.redirect('/')
    }
};