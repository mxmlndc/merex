import mongoose from "mongoose";
import Product from "../models/product";
import mongoosePaginate from "mongoose-paginate-v2";

const Schema = mongoose.Schema;
const model = mongoose.model;

const userSchema = new Schema ({
    firstName: {type: String},
    lastName: {type: String},
    email: {type: String},
    cuitCuil: {type: Number},
    telephone: {type: Number},
    adress: {type: String},
    password: {type: String},
    cart: {
        items: [{
            productId: {
                type: mongoose.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            qty: {
                type: Number,
                required: true
            }
        }],
        totalPrice: Number
    }
}, {
    versionKey: false,
    timestamps: true
});

userSchema.plugin(mongoosePaginate);

userSchema.methods.addToCart = async function(productId) {
    const product = await Product.findById(productId);
    if (product) {
        const cart = this.cart;
        const isExisting = cart.items.findIndex(objInItems => new String(objInItems.productId).trim() === new String(product._id).trim());
        if (isExisting >= 0) {
            cart.items[isExisting].qty += 1;
        } else {
            cart.items.push({ productId: product._id, qty: 1 });
        }
        if (!cart.totalPrice) {
            cart.totalPrice = 0;
        }
        cart.totalPrice += product.price;
        return this.save();
    }

};

userSchema.methods.removeFromCart = function(productId) {
    const cart = this.cart;
    const isExisting = cart.items.findIndex(objInItems => new String(objInItems.productId).trim() === new String(productId).trim());
    if (isExisting >= 0) {
        cart.items.splice(isExisting, 1);
        return this.save();
    }
}



export default model('User', userSchema);