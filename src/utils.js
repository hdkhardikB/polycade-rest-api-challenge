const Validator = require('validatorjs')

export const wrap = (fn) => (ctx, next) =>
    new Promise((resolve, reject) => {
        resolve(fn(ctx, next))
    }).then(data => {
        ctx.body = {
            success: true,
            data,
        }
    }).catch(err => {
        console.log(err)
        ctx.response.status = 500;
        let exceptionMessage = "Internal server error"
        if (err && err.message && err.status) {
            exceptionMessage = err.message
            ctx.response.status = err.status;
        }
        ctx.body = {
            success: false,
            error: exceptionMessage
        }
    })

export function error(status, message, data) {
    let err = new Error(message)
    err.status = status
    err.data = data
    return err
}

export function validate(data, rules, next, customErrorMessages) {
    const validator = new Validator(data, rules, customErrorMessages)

    if (validator.fails()) {
        return next(error(400, 'Bad Request', validator.errors.all()))
    }

    next()
}

export function validateBody(rules, customErrorMessages) {
    return function (req, res, next) {
        validate(req.body, rules, next, customErrorMessages)
    }
}

export function validateQuery(rules, customErrorMessages) {
    return function (req, res, next) {
        validate(req.query, rules, next, customErrorMessages)
    }
}

export function validateParams(rules, customErrorMessages) {
    return function (req, res, next) {
        validate(req.params, rules, next, customErrorMessages)
    }
}