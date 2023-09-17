import jwt from 'jsonwebtoken'

export function authJwt(token: string | undefined){
    if(token === undefined){
        return [false, "Bad Token"]
    }

    jwt.verify(token, process.env.JWT_SECRET as string, (err, name) => {
        if(err){
            return [false, "Bad Token"]
        }
        return [true, name]
    })
}