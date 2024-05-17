import bcrypt from 'bcrypt'
export const hassedPassword=async(password)=>{
    try{
        const saltRounds=10
        const hasedPassword = bcrypt.hash(password,saltRounds)
        return hasedPassword
    }catch(err){
        console.log('Error in hashing password', err);
    }
}

export const comparePassword=async(password,hashedPassword)=>{
    return bcrypt.compare(password,hasedPassword);
}

