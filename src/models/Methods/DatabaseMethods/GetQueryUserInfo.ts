import UserSchema from "../../Interfaces/UserSchema";

interface IQuery {
  // token: string;
  login?: string;
  name?: string;
  skills?: Array<Object | string | number>;
  achievements?: Array<Object | string | number>;
  kvantums?: Array<Object | string | number>;
  description?: string;
  role?: string;
}
interface IQueryOutput {
  login: string;
  name: string;
  skills: Array<Object | string | number>;
  achievements: Array<Object | string | number>;
  kvantums: Array<Object | string | number>;
  description: string;
  role: string;
}

export = function getQueryUserInfo(query, callback) {
  let validQuery = ["login", "name"];
  let params: IQuery = {};
  for (const key in validQuery) {
    if (query[key] !== "") {
      console.log(query[key]);
      params[key] = query[key];
    }
  }
  UserSchema.find(params, (err, user) => {
    let userArray = [];
    let element: any;
    for (element of user) {
      let userdata: IQueryOutput = {
        login: element.login,
        name: element.name,
        skills: element.skills,
        achievements: element.achievements,
        kvantums: element.kvantums,
        description: element.description,
        role: element.role,
      };
      userArray.push(userdata);
    }
    return callback(err, userArray);
  });
};
