import User from "../models/user";

export const list =  async (req, res) => {
        let usersInDb = await User.findAll();
        let usersEmails = [];
        usersInDb.forEach(user => usersEmails.push(user.email));
        let users = {
            meta:{
                status: 200,
                length: usersEmails.length,
                url: req.originalUrl
            },
            data: usersEmails
        }
        res.json(users);
    }   