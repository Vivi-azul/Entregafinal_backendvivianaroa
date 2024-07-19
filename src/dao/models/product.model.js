import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const productoSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: true
    }, 
    description: {
        type: String, 
        required: true
    }, 
    precio: {
        type: Number, 
        required: true
    }, 
    img: {
        type: String
    }, 
    code: {
        type: String, 
        required: true, 
        unique: true
    }, 
    stock: {
        type: Number, 
        required: true
    }, 
    category: {
        type: String, 
        required: true
    }, 
    status: {
        type: Boolean, 
        required: true
    }, 
    
});

productoSchema.plugin(mongoosePaginate);

const ProductModel = mongoose.model("Product", productoSchema);

export default ProductModel;