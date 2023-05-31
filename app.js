// 로그인 하고 게시판에 글 작성, 수정, 삭제

// package.json
// express express-session mysql2 ejs dotenv sequelize
// view 엔진 경로 설정
// view 엔진 ejs 설정
// body 객체 사용
// 서버 객체 만들고 대기 상태

const express = require("express");
const session = require("express-session");
const dot = require("dotenv").config();
const path = require("path");
const app = express();
const { sequelize } = require("./models");
const SignUpRouters = require("./routers/signUp");
const LoginRouters = require("./routers/login");
const BorderRouters = require("./routers/border");

app.set("views", path.join(__dirname, "page"));
app.set("view engine", "ejs");
app.use(express.urlencoded({extended : false}));
app.use(session({
    secret : process.env.SESSION_KEY ,// 세션 키 넣을 것.
    resave : false, // 다시 저장 할 지 여부
    saveUninitialized : false // 초기화 할 지 여부
}))

// force : 초기화 여부
sequelize.sync({force : false}).then((e)=> {
    console.log("연결 성공");
}).catch((err) => {
    console.log(err);
})

app.use("/signUp", SignUpRouters);
app.use("/login", LoginRouters);
app.use("/border", BorderRouters);

app.listen(5050, () => {
    console.log("5050 서버 열림");
})