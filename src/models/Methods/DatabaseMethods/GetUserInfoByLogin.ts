import UserSchema from "../../Interfaces/UserSchema";

interface IQuery {
  // token: string;
  login: string;
}

export = function getQueryUserInfo(query, callback) {
  let params: IQuery = {
    login: query.login,
  };
  UserSchema.findOne(params, (err, user) => {
    return callback(err, user);
  });
};
