import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const Schema = mongoose.Schema;
const model = mongoose.model;

const productSchema = new Schema({
    supplier: {type:String},
    brand: {type:String},
    category: {type:String},
    size: {type:String},
    box: {type:Number},
    description: {type:String},
    price: {type:Number},
    tax: {type:String},
    stock: {type:Number},
    active: {type:Boolean},
    image: {type:String},
}, {
    versionKey: false,
    timestamps: true
});

productSchema.plugin(mongoosePaginate);
export default model('Product', productSchema);