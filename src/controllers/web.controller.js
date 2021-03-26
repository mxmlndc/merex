import path from "path";
import Product from "../models/product";

export const index = async (req,res) => {
    const products = await Product.find();
    res.render(path.resolve(__dirname, '..', 'views','web','index'), {products});
}