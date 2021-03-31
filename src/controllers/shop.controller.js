import path from "path";
import User from "../models/user";
import Product from "../models/product";

export const addToCart = (req,res) => {
    req.user.addToCart(req.body.id)
    .then(() => {
        res.redirect('/shoppingCart');
    }).catch(err => console.log(err));
}

export const getCart = (req, res, next) => {
    req.user
        .populate('cart.items.productId')
        .execPopulate()
        .then(user => {
            console.log(user);
            res.render(path.resolve(__dirname,  '..', 'views', 'product', 'shop'));
        })
        .catch(err => console.log(err));
}

export const deleteInCart = (req, res, next) => {
    req.user.removeFromCart(req.body.productId)
        .then(() => {
            res.redirect('/shoppingCart');
        }).catch(err => console.log(err));

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