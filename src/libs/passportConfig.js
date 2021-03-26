import bcrypt from "bcrypt";
import passlocal from "passport-local";

const localStrategy = passlocal.Strategy;

export const initialize = (passport, getUserByEmail, getUserById) => {
    const authenticateUser = async (email, password, done) => {
        const user = getUserByEmail(email)
        if (user == null) {
            return done(null, false, { message: 'No hay usuarios con ese email'})
        }

        try {
            if (await bcrypt.compare(password, user.password)){
                return done(null, user)
            }else{
                return done(null, false, { message: 'password incorrecto'})
            }
        } catch (e) {
            return done(e)
        }
    }
    
    passport.use(new localStrategy({ usernameField: 'email'}, authenticateUser))
    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser((id, done) => { 
        return done(null, getUserById(id))
    })
}