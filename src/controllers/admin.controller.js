import Product from "../models/product";
import User from "../models/user";
import Cart from "../models/cart";
import path from "path";

export const index = async (req,res) => {
    res.render(path.resolve(__dirname, '..', 'views','admin','dashboard'));
};

export const showAllProducts =async (req,res) => {
    const products = await Product.find();
    res.render(path.resolve(__dirname, '..', 'views','admin','list'), {products});
};


export const createProduct = async (req, res)=> {
    const newProduct = new Product()
    newProduct.supplier = req.body.supplier;
    newProduct.brand = req.body.brand;
    newProduct.category = req.body.category;
    newProduct.size = req.body.size;
    newProduct.box = req.body.box;
    newProduct.description = req.body.description;
    newProduct.price = req.body.price;
    newProduct.tax = req.body.tax;
    newProduct.stock = req.body.stock;
    newProduct.active = req.body.active;
    newProduct.image = req.body.image;

    await newProduct.save()

    res.redirect('/dashboard/product-list')
};

export const create = async (req,res) => {
    res.render(path.resolve(__dirname, '..', 'views','admin','create'));
};

export const deleteProduct = async (req,res) => {
    const { id } = req.params.id;

    try {
        await Product.findByIdAndDelete(id)
        res.redirect('/dashboard/product-list')

    } catch (error) {
        res.status(500)({
            message: error.message || `Error borrando el id: ${id}`
        })
    }
};

export const editProduct =async (req,res) => {
    const {id}  = req.params;
    try {
        let productEdit = await Product.findOne({_id:id}) 
        res.render(path.resolve(__dirname, '..', 'views','admin','edit'), {productEdit});
    } catch (error) {
        res.status(500)({
            message: error.message || `Error actualizando el id: ${id}`
        })
    }
};

export const updateProduct = async (req, res) => {
    const { id } = req.params;

   try {
        await Product.findByIdAndUpdate(id, req.body);
    res.redirect('/dashboard/product-list')
    
   } catch (error) {
        res.status(500)({
            message: error.message || `Error actualizando el id: ${id}`
        })
   }
}

export const stock =async (req,res) => {
    const products = await Product.find();
    res.render(path.resolve(__dirname, '..', 'views','admin','stock'), {products});
};

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