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
    const { id } = req.params;
    
    try {
    const product = await Product.findById(id)

    if (!product)
        return res
            .status(404)
            .json({message: `El producto con el id: ${id} no existe`})
    res.json(product)
    
    } catch (error) {
        res.status(500)({
            message: error.message || `Error devolviendo el id: ${id}`,
        });
    }
};