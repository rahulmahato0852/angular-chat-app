const expressAsyncHandler = require('express-async-handler')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { ValidationNew } = require('../utils/validation');
const sendEmail = require('../utils/sendEmail');
const User = require('../models/User');
const uploadImage = require('../utils/uploadImage');


exports.registerUser = expressAsyncHandler(async (req, res) => {

    uploadImage(req, res, async (err) => {

        if (err) {
            return res.status(400).json({ message: err.message || "Upload Error" })
        }


        const { email, password, name, mobile } = req.body

        const x = ValidationNew(res, [
            { value: email, validations: [{ key: "isEmpty", except: false }, { key: "isEmail", except: true }] },
            { value: password, validations: [{ key: "isEmpty", except: false }, { key: "isStrongPassword", except: true }] },
            { value: name, validations: [{ key: "isEmpty", except: false }] },
            { value: mobile, validations: [{ key: "isEmpty", except: false }, { key: "isMobilePhone", except: true }] },
        ])

        const result = await User.findOne({ email })
        if (result) {
            return res.status(400).json({ message: "Email Already Exists" })
        }
        const hashPass = await bcrypt.hash(password, 10)

        await User.create({ name, email, mobile, password: hashPass, hero: req.file.filename })

        res.status(200).json({ message: "Register Success" })
    })
});


exports.loginUser = expressAsyncHandler(async (req, res) => {
    const { userName, password } = req.body
    ValidationNew(res, [
        { value: userName, validations: [{ key: "isEmpty", except: false }] },
        { value: password, validations: [{ key: "isEmpty", except: false }, { key: "isStrongPassword", except: true }] },
    ])
    const result = await User.findOne({
        $or: [
            { email: userName },
            { mobile: userName },
        ]
    })
    if (!result) {
        return res.status(400).json({ message: "Email Not Found" })
    }

    const isCorrect = await bcrypt.compare(password, result.password)
    if (!isCorrect) {
        return res.status(403).json({ message: "Wrong Password" })
    }
    const otp = Math.floor(Math.random() * 9999)
    await User.findByIdAndUpdate(result._id, { otp })
    await sendEmail({ to: result.email, subject: "Login OTP From Chat APP", message: `Your Login OTP Is ${otp}` })

    res.status(200).json({ message: "Email Sent to to your email" })

})



exports.verifyOtp = expressAsyncHandler(async (req, res) => {

    const { otp, userName } = req.body

    ValidationNew(res, [
        { value: `${otp}`, validations: [{ key: "isEmpty", except: false }] },
        { value: userName, validations: [{ key: "isEmpty", except: false }] },
    ])

    const result = await User.findOne({
        $or: [
            { email: userName },
            { mobile: userName },
        ]
    }).lean()
    if (!result) {
        return res.status(400).json({ message: "Email Not Found" })
    }
    if (result.otp !== otp) {
        return res.status(403).json({ message: "Invalid OTP" })
    }
    const token = jwt.sign({ userId: result._id }, process.env.JWT_KEY, { expiresIn: 3600000 })

    res.cookie("chatUser", token, {
        httpOnly: true,
        secure: true,
        sameSite: 'None'
    })
    res.status(200).json({ message: "Login Success", result: { _id: result._id, name: result.name, email: result.email, mobile: result.mobile, hero: result.hero } })
})


exports.logOutUser = expressAsyncHandler(async (req, res, next) => {
    res.clearCookie("chatUser")
    res.status(200).json({ message: "Log Out success" })
})
