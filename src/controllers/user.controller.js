import app from "../app";
import User from "../models/user";
import Product from "../models/product";
import path from "path";
import { getPagination } from "../libs/getPagination";
import bcrypt from "bcrypt";
import passport from "passport";

import initialize from "../libs/passportConfig";
initialize(
    passport, 
    email => User.find({email: req.body.email}),
    id => User.find({_id: id}) 
    );


export const index = async (req,res) => {
    res.render(path.resolve(__dirname, '..', 'views', 'user', 'register'))
};

export const createUser = async (req, res)=> {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const newUser = new User()
    newUser.firstName = req.body.firstName;
    newUser.lastName = req.body.lastName;
    newUser.email = req.body.email;
    newUser.cuitCuil = req.body.cuitCuil;
    newUser.telephone = req.body.telephone;
    newUser.adress = req.body.adress;
    newUser.password = hashedPassword;
    
    await newUser.save()
    
    res.redirect('/login')
 };
export const enter = async (req,res)=> {
    res.render(path.resolve(__dirname, '..', 'views', 'user', 'login'))

};

export const loginUser = async (req, res)=> {
    const { email } = req.body; 
    try {
        const user = await User.findOne({email});
        await bcrypt.compare(req.body.password, user.password)
        res.redirect('/')

    if (!user){
        //return res.render(path.resolve(__dirname,  '..', 'views', 'user', 'login'))
        return res.send('Todo salió bien')}
        }catch (error) {
        res.send('No existe')
}
};

export const logOut = async (req,res)=> {
    req.logOut();
    res.redirect('/login')
};

export const findAllUsers = async (req, res)=> {
    try {
        const { size, page, lastName } = req.query

        const condition = lastName 
        ? {
            lastName : {$regex: new RegExp(lastName), $options: "i"},
            }
        : {};

        const { limit, offset } = getPagination (size, page)
        const data = await User.paginate(condition, { offset: offset, limit: limit})

    res.json({
        totalItems: data.totalDocs,
        users: data.docs,
        totalPages: data.totalPages,
        currentPage: data.page -1
    })
    } catch (error) {
        res.status(500)({
            message: error.message || "Something goes wrong"
        })
    }
};

export const findOneUser = async (req,res) => {
    const { id } = req.params;
    
    try {
    const user = await User.findById(id)

    if (!user)
        return res
            .status(404)
            .json({message: `El usuario con el id: ${id} no existe`})
    res.json(user)
    
    } catch (error) {
        res.status(500)({
            message: error.message || `Error devolviendo el id: ${id}`,
        });
    }
};

export const deleteUser = async (req,res) => {
    const { id } = req.params;

    try {
        await User.findByIdAndDelete(id)
    res.json({
        message: "User were deleted successfully"
    });
    } catch (error) {
        res.status(500)({
            message: error.message || `Error borrando el id: ${id}`
        })
    }
};

export const updateUser = async (req, res) => {
    const { id } = req.params;

   try {
        await User.findByIdAndUpdate(id, req.body);
    res.json({
        message: "User was updated successfully"
    });
   } catch (error) {
        res.status(500)({
            message: error.message || `Error actualizando el id: ${id}`
        })
   }
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