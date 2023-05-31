const { User } = require("../models");
const bcrypt = require("bcrypt");
// npm i jsonwebtoken
const jwt = require("jsonwebtoken");

exports.Login = async (req, res) => {
    try {
        const { user_id, user_pw } = req.body;
        const user = await User.findOne({ where : {user_id}});
        if(user === null){
            return res.send("회원가입한 유저가 아닙니다.");         
        }
        const same = bcrypt.compareSync(user_pw, user.user_pw);
        if(same){
            let token = jwt.sign({
                id : user_id,
                name : user.name,
                age : user.age
            },process.env.ACCESS_TOKEN_KEY,{
                expiresIn : "5m"
            });
            req.session.access_token = token;
            res.redirect('/border');
        }else {
            res.send("비밀번호가 틀렸습니다.");
        }
    } catch (error) {
        console.log(error);
    }
};