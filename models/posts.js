const Sequelize = require("sequelize");

class Post extends Sequelize.Model {
    static init(sequelize){
        return super.init({
            // 컬럼의 내용
            msg : {
                type : Sequelize.STRING(20),
                allowNull : false ,
            }
        },{
            // 테이블의 내용
            sequelize,
            timestamps : true, // 생성 시간, 업데이트 시간 자동으로 생성
            modelName : "Post", // 모델 이름
            tableName : "posts", // 복수형으로 테이블 이름 설정
            paranoid : false, // 삭제 시간 생성 유무
            charset : "utf8", // 인코딩 방식은 꼭 설정해야 한다.
            collate : "utf8_general_ci", // 인코딩 방식은 꼭 설정 해야 한다.
        })
    }

    static associate(db) {
        db.Post.belongsTo(db.User, {foreignKey : "user_id", targetKey : "id"});
    }
}

module.exports = Post;