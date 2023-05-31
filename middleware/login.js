const jwt = require('jsonwebtoken');

exports.isLogin = (req, res, next) => {
    const { access_token } = req.session;
    jwt.verify(access_token, process.env.ACCESS_TOKEN_KEY, (err, acc_decoded) => {
        if(err){
            res.send("로그인 다시 하세요")
        }else{
            // acc_decoded 키를 추가해서 값을 전달
            req.acc_decoded = acc_decoded; // 검증된 값 req에 넣음
            // 유저의 토큰이 유효한 동안 로그인이 되어있는거니까 
            // 유저의 필요한 정보도 payload값에 있기 때문에 복호화해서 사용 가능 하다. 
            // 다음 미들 웨어 실행
            next();
        }
    })
}