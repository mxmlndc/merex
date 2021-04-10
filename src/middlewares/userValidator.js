import path from 'path';
import User from "../models/user";
import bcrypt from 'bcrypt';
import { check } from 'express-validator';
import { truncate } from 'fs';


export const signIn = [
        check('email').custom( async (value, { req } ) => {
            const signInPassword = req.body.signInPassword;
            const userToLogin = await User.findOne({ email: new RegExp(`^${value}$`, 'i')});
            if ( userToLogin && bcrypt.compareSync(signInPassword, userToLogin.password) ) {
                return true;
            }
            return Promise.reject('Non-existent user or invalid password');
        })
    ]

export const signUp = [
        check('firstName')
            .not()
            .isEmpty()
            .withMessage('El nombre no puede estar vacío'),
        check('firstName')
            .isLength({ min: 2 }).withMessage('El nombre tiene que tener al menos 2 caracteres')
            .isLength({ max: 50 }).withMessage('El nombre tiene que tener menos de 50 caracteres'),
        check('lastName')
            .not()
            .isEmpty()
            .withMessage('El apellido no puede estar vacío'),
        check('lastName')
            .isLength({ min: 2 }).withMessage('El apellido tiene que tener al menos 2 caracteres')
            .isLength({ max: 50 }).withMessage('El apellido tiene que tener menos de 50 caracteres'),
        check('email')
            .isEmail()
            .normalizeEmail()
            .withMessage('El email tiene que ser válido'),
        check('email').custom( async value => {
            const userToSignUp = await User.findOne({ email: new RegExp(`^${value}$`, 'i') })
                if( userToSignUp ) {
                    return Promise.reject('Ya existe un usuario con ese email');
                } else {
                    return true
                }
        }),
        check('cuitCuil')
            .isLength(11)
            .withMessage('El CUIT/CUIL debe ir sin guiónes'),
        check('telephone')
            .isLength({ min: 10 })
            .withMessage('Debe ser un celular, con código de área (ej. 11) más el número completo sin guiónes'),
        check('city')
            .isLength({ min: 2 })
            .withMessage('El nombre de la ciudad/localidad debe que tener al menos 2 caracteres'),
        check('street')
            .isLength({ min: 2 })
            .withMessage('El nombre de la calle debe que tener al menos 2 caracteres'),
        check('number')
            .isLength({ min: 1 })
            .withMessage('La altura de la calle debe que tener al menos 1 caracter'),   
        check('password')
            .isLength({ min: 8 })
            .withMessage('La contraseña tiene que tener al menos 8 caracteres'), 

    ]