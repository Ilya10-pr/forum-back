const HttpStatus = require("http-status-codes");
const {
  updateDataUserServices,
} = require("../services/usersServices");
require("dotenv").config();
const nodemailer = require("nodemailer");
require("dotenv").config();
const crypto = require("crypto");
const { User } = require("../database/models/usersModels");

const BASE_URL = process.env.BASE_URL;

const transporter = nodemailer.createTransport({
  host: "smtp.yandex.ru",
  port: 465,
  secure: true,
  auth: {
    user: "i.pribylsky@yandex.ru",
    pass: "axqyffrkcomavyrz",
  },
  tls: {
    rejectUnauthorized: false,
  },
});


const updateDataUserController = async (req, res) => {
  try {
    const user = await updateDataUserServices(req);
    if (user) {
      return res.status(HttpStatus.OK).json(user);
    }
    return res
      .status(HttpStatus.CONFLICT)
      .json({ message: "Пароли не совпали" });
  } catch (error) {
    console.log(error)
  }
};


const resetPasswordController = async (req, res) => {
  try {
    crypto.randomBytes(32, async (err, buffer) => {
      if (err) {
        res.status(500).json({ message: "Что то пошло не так" });
        return res.redirect("/reset");
      }
      const token = buffer.toString("hex");

      const candidate = await User.findOne({
        where: { email: req.body.email },
      });

      if (candidate) {
        candidate.resetToken = token;
        candidate.resetTokenExp = Date.now() + 60 * 60 * 1000;
        await transporter.sendMail({ 
          from: "i.pribylsky@yandex.ru", 
          to: req.body.email,
          subject: "Восстановление доступа",
          html: `
        <h1>Вы забыли пароль.</h1>
        <p>Перейдите по ссылке для восстановления пароля</p>
        <p><a href="${BASE_URL}/reset/password/${token}">Восстановить доступ</a></p>
        `,
        });
        res.json({ message: "Сообщение отправлено" });
      }
    });
  } catch (error) {
    console.log(error);
  }
};



module.exports = {
  updateDataUserController,
  resetPasswordController,
};