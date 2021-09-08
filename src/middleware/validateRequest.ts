import { Request, Response, NextFunction } from 'express'
import { AnySchema } from 'yup'


export const validateRequest = (schema: AnySchema) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        await schema.validate({
            body: req.body,
            query: req.query,
            params: req.params
        })
        return next()
        
    } catch(error) {
        console.log(error)
        return res.status(400).send(error.errors)
    }
}