import { TokenData } from "../src/models/token.interface";
import createCookie from "../src/scripts/createCookie";
import { mongoose } from "../src/DatabaseConnection";
import * as typeorm from "typeorm";
import { v4 as uuidv4 } from "uuid";
import app from "../src/app";
import User from "../src/user/models/user.model";
import { GetUserInfoDto, LoginDto, RegisterDto } from "../src/user/validators/user.dto";
import request from "supertest";
import createToken from "../src/scripts/createToken";

jest.setTimeout(30000);

beforeAll(async (done) => {
	done();
});

afterAll(async () => {
	let login = "autouser";
	await User.findOneAndRemove({ login }, {}).then((value) => {});
	await mongoose.disconnect();
});

describe("Checking cookie creating", () => {
	describe("when creating a cookie", () => {
		it("should return a string", () => {
			let uuid = uuidv4();
			const tokenData: TokenData = {
				uuid,
				login: "test",
				token: "",
				expiresIn: 1,
			};
			expect(typeof createCookie(tokenData)).toEqual("string");
		});
	});
});

describe("Checking token creating", () => {
	describe("when creating a token", () => {
		it("should return a string", async () => {
			expect(typeof (await createToken("test")).token).toEqual("string");
		});
	});
});

describe("API checking", () => {
	let res;
	describe("POST /user/login", () => {
		describe("if data isnt correct", () => {
			const userData: LoginDto = {
				login: "test",
				password: "incorrectpassword",
			};
			beforeAll(async () => {
				res = await request(app.app).post(`/api/user/login`).send(userData).set("Content-Type", "application/json").set("Accept", "application/json");
			});
			it("error should be 'incorrect data'", () => {
				expect(res.body.message).toEqual("ERR_PASSWORD_INCORRECT");
			});
			it("and data should be 0", () => {
				expect(res.body.data).toEqual(0);
			});
			it("and status should be 400", () => {
				expect(res.body.status).toEqual(400);
			});
		});
		describe("if all data is correct,", () => {
			const userData: LoginDto = {
				login: "test",
				password: "Test-1-Test",
			};
			beforeAll(async () => {
				res = await request(app.app).post(`/api/user/login`).send(userData).set("Content-Type", "application/json").set("Accept", "application/json");
			});

			it("response should be successfull", () => {
				expect(typeof res.body.data.tokenData.token).toEqual("string");
			});
			it("and expiry date shouldnt be empty", () => {
				expect(typeof res.body.data.tokenData.expiresIn).toEqual("number");
			});
			it("and token shouldnt be empty", () => {
				expect(res.body.data.tokenData.token).not.toEqual("");
			});
			it("and token should be encoded to Base64", () => {
				expect(res.body.data.tokenData.token).toMatch(/^(?=.*[0-9])(?=.*\W)(?![.\n])(?![\b])(?=.*[A-Z])(?=.*[a-z]).*$/);
			});
			it("and status should be 1", () => {
				expect(res.body.status).toEqual(1);
			});
		});
		describe("if the user isnt exists", () => {
			const userData: LoginDto = {
				login: "usernotexists",
				password: "Test-1-Test",
			};
			beforeAll(async () => {
				res = await request(app.app).post(`/api/user/login`).send(userData).set("Content-Type", "application/json").set("Accept", "application/json");
			});
			it("error should be 'USER NOT EXISTS'", () => {
				expect(res.body.message).toEqual("ERR_USER_NOT_FOUND");
			});
			it("and data should be 0", () => {
				expect(res.body.data).toEqual(0);
			});
			it("and status should be 400", () => {
				expect(res.body.status).toEqual(400);
			});
		});
		describe("if password not correct", () => {
			const userData: LoginDto = {
				login: "test",
				password: "incorrectpassword-10N",
			};
			beforeAll(async () => {
				res = await request(app.app).post(`/api/user/login`).send(userData).set("Content-Type", "application/json").set("Accept", "application/json");
			});
			it("error should be 'wrong password'", () => {
				expect(res.body.message).toEqual("ERR_WRONG_PASSWORD");
			});
			it("and data should be 0", () => {
				expect(res.body.data).toEqual(0);
			});
			it("and status should be 400", () => {
				expect(res.body.status).toEqual(400);
			});
		});
	});
	describe("POST /user/regiser", () => {
		describe("if data isnt correct", () => {
			const userData: RegisterDto = {
				login: "test",
				mail: "test@test.test",
				password: "incorrectpassword",
			};
			beforeAll(async () => {
				res = await request(app.app).post(`/api/user/register`).send(userData).set("Content-Type", "application/json").set("Accept", "application/json");
			});
			it("error should be 'incorrect data'", () => {
				expect(res.body.message).toEqual("ERR_PASSWORD_INCORRECT");
			});
			it("and data should be 0", () => {
				expect(res.body.data).toEqual(0);
			});
			it("and status should be 400", () => {
				expect(res.body.status).toEqual(400);
			});
		});
		describe("if mail already in use", () => {
			const userData: RegisterDto = {
				login: "newuser",
				mail: "test@test.test",
				password: "incorrectpassword-10N",
			};
			beforeAll(async () => {
				res = await request(app.app).post(`/api/user/register`).send(userData).set("Content-Type", "application/json").set("Accept", "application/json");
			});
			it("error should be 'mail already registered'", () => {
				expect(res.body.message).toEqual("ERR_EMAIL_ALREADY_REGISTERED");
			});
			it("and data should be 0", () => {
				expect(res.body.data).toEqual(0);
			});
			it("and status should be 400", () => {
				expect(res.body.status).toEqual(400);
			});
		});
		describe("if username already in use", () => {
			const userData: RegisterDto = {
				login: "test",
				mail: "newmail@test.test",
				password: "incorrectpassword-10N",
			};
			beforeAll(async () => {
				res = await request(app.app).post(`/api/user/register`).send(userData).set("Content-Type", "application/json").set("Accept", "application/json");
			});
			it("error should be 'mail already registered'", () => {
				expect(res.body.message).toEqual("ERR_LOGIN_WAS_TAKEN");
			});
			it("and data should be 0", () => {
				expect(res.body.data).toEqual(0);
			});
			it("and status should be 400", () => {
				expect(res.body.status).toEqual(400);
			});
		});
		describe("if all is correct, user should be registered", () => {
			const userData = {
				login: "autouser",
				mail: "autogenerateduser@test.test",
				password: "autogeneratedpassword-10N",
			};
			beforeAll(async () => {
				res = await request(app.app).post(`/api/user/register`).send(userData).set("Content-Type", "application/json").set("Accept", "application/json");
			});
			describe("response should be successfull", () => {
				it("token should exists", () => {
					expect(typeof res.body.data.tokenData.token).toEqual("string");
				});
				it("and expiry date shouldnt be empty", () => {
					expect(typeof res.body.data.tokenData.expiresIn).toEqual("number");
				});
				it("and token shouldnt be empty", () => {
					expect(res.body.data.tokenData.token).not.toEqual("");
				});
				it("and token should be encoded to Base64", () => {
					expect(res.body.data.tokenData.token).toMatch(/^(?=.*[0-9])(?=.*\W)(?![.\n])(?![\b])(?=.*[A-Z])(?=.*[a-z]).*$/);
				});
			});
			it("and status should be 1", () => {
				expect(res.body.status).toEqual(1);
			});
		});
	});
	describe("POST /getuserinfo", () => {
		let cookie;
		beforeAll(async () => {
			const authUserData: LoginDto = {
				login: "test",
				password: "Test-1-Test",
			};
			let tokenRes = await request(app.app).post(`/api/user/login`).send(authUserData).set("Content-Type", "application/json").set("Accept", "application/json");
			let mainToken = await tokenRes.body.data.tokenData.token;
			let uuid = uuidv4();
			const tokenData: TokenData = {
				uuid,
				login: tokenRes.body.data.tokenData.login,
				token: mainToken,
				expiresIn: 999,
			};
			cookie = createCookie(tokenData);
		});
		describe("if token didnt sent", () => {
			beforeAll(async () => {
				const userData = {
					mail: "teledurak@gmail.com",
				};
				res = await request(app.app).post(`/api/getuserinfo`).send(userData).set("Content-Type", "application/json").set("Accept", "application/json");
			});
			it("data should be 0", () => {
				expect(res.body.data).toEqual(0);
			});
			it("and status should be 400", () => {
				expect(res.body.status).toEqual(400);
			});
			it("and error should be 'no token'", () => {
				expect(res.body.message).toEqual("ERR_NO_TOKEN");
			});
		});
		describe("if data isnt correct", () => {
			beforeAll(async () => {
				const userData = {
					login:
						"testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest",
					description: "Привет, мир!",
				};
				res = await request(app.app).post(`/api/getuserinfo`).send(userData).set("Content-Type", "application/json").set("Accept", "application/json").set("Cookie", [cookie]);
			});
			it("error should be 'incorrect data'", () => {
				expect(res.body.message).toEqual("ERR_LOGIN_INCORRECT");
			});
			it("and data should be 0", () => {
				expect(res.body.data).toEqual(0);
			});
			it("and status should be 400", () => {
				expect(res.body.status).toEqual(400);
			});
		});
		const userData = {
			login: "unknownuser",
			description: "Привет, мир!",
		};
		describe("if the user isnt exists", () => {
			beforeAll(async () => {
				res = await request(app.app).post(`/api/getuserinfo`).send(userData).set("Content-Type", "application/json").set("Accept", "application/json").set("Cookie", [cookie]);
			});
			it("data should be []", () => {
				expect(res.body.data).toEqual([]);
			});
			it("and status should be 1", () => {
				expect(res.body.status).toEqual(1);
			});
		});
	});
	describe("POST /getmyinfo", () => {
		let cookie;
		beforeAll(async () => {
			const authUserData: LoginDto = {
				login: "test",
				password: "Test-1-Test",
			};
			let tokenRes = await request(app.app).post(`/api/user/login`).send(authUserData).set("Content-Type", "application/json").set("Accept", "application/json");
			let mainToken = await tokenRes.body.data.tokenData.token;
			let uuid = uuidv4();
			const tokenData: TokenData = {
				uuid,
				login: tokenRes.body.data.tokenData.login,
				token: mainToken,
				expiresIn: 999,
			};
			cookie = createCookie(tokenData);
		});
		describe("if token didnt sent", () => {
			beforeAll(async () => {
				res = await request(app.app).post(`/api/getmyinfo`).set("Content-Type", "application/json").set("Accept", "application/json");
			});
			it("data should be 0", () => {
				expect(res.body.data).toEqual(0);
			});
			it("and status should be 400", () => {
				expect(res.body.status).toEqual(400);
			});
			it("and error should be 'no token'", () => {
				expect(res.body.message).toEqual("ERR_NO_TOKEN");
			});
		});
		describe("if token is correct, it should", () => {
			beforeAll(async () => {
				const userData = {
					login: "unknownuser",
					description: "Привет, мир!",
				};
				res = await request(app.app).post(`/api/getmyinfo`).send(userData).set("Content-Type", "application/json").set("Accept", "application/json").set("Cookie", [cookie]);
			});
			it("return data", () => {
				expect(res.body.data).not.toEqual(0);
			});
			it("and status should be 1", () => {
				expect(res.body.status).toEqual(1);
			});
		});
	});
	describe("POST /changeinfo", () => {
		let cookie;
		beforeAll(async () => {
			const authUserData: LoginDto = {
				login: "test",
				password: "Test-1-Test",
			};
			let tokenRes = await request(app.app).post(`/api/user/login`).send(authUserData).set("Content-Type", "application/json").set("Accept", "application/json");
			let mainToken = await tokenRes.body.data.tokenData.token;
			let uuid = uuidv4();
			const tokenData: TokenData = {
				uuid,
				login: tokenRes.body.data.tokenData.login,
				token: mainToken,
				expiresIn: 999,
			};
			cookie = createCookie(tokenData);
		});
		describe("if token didnt sent", () => {
			beforeAll(async () => {
				const userData = {
					mail: "teledurak@gmail.com",
				};
				res = await request(app.app).post(`/api/changeinfo`).send(userData).set("Content-Type", "application/json").set("Accept", "application/json");
			});
			it("data should be 0", () => {
				expect(res.body.data).toEqual(0);
			});
			it("and status should be 400", () => {
				expect(res.body.status).toEqual(400);
			});
			it("and error should be 'no token'", () => {
				expect(res.body.message).toEqual("ERR_NO_TOKEN");
			});
		});
		describe("if data isnt correct", () => {
			beforeAll(async () => {
				const userData = {
					login:
						"testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest",
					description: "Привет, мир!",
				};
				res = await request(app.app).post(`/api/changeinfo`).send(userData).set("Content-Type", "application/json").set("Accept", "application/json").set("Cookie", [cookie]);
			});
			it("error should be 'incorrect data'", () => {
				expect(res.body.message).toEqual("ERR_LOGIN_INCORRECT");
			});
			it("and data should be 0", () => {
				expect(res.body.data).toEqual(0);
			});
			it("and status should be 400", () => {
				expect(res.body.status).toEqual(400);
			});
		});
		describe("if mail already registered", () => {
			beforeAll(async () => {
				const userData = {
					mail: "teledurak@gmail.com",
				};
				res = await request(app.app).post(`/api/changeinfo`).send(userData).set("Content-Type", "application/json").set("Accept", "application/json").set("Cookie", [cookie]);
			});
			it("data should be 0", () => {
				expect(res.body.data).toEqual(0);
			});
			it("and status should be 400", () => {
				expect(res.body.status).toEqual(400);
			});
			it("and error should be 'mail in use'", () => {
				expect(res.body.message).toEqual("ERR_EMAIL_ALREADY_REGISTERED");
			});
		});
		describe("if login already in use", () => {
			beforeAll(async () => {
				const userData = {
					login: "test",
				};
				res = await request(app.app).post(`/api/changeinfo`).send(userData).set("Content-Type", "application/json").set("Accept", "application/json").set("Cookie", [cookie]);
			});
			it("data should be 0", () => {
				expect(res.body.data).toEqual(0);
			});
			it("and status should be 400", () => {
				expect(res.body.status).toEqual(400);
			});
			it("and error should be 'login in use'", () => {
				expect(res.body.message).toEqual("ERR_LOGIN_WAS_TAKEN");
			});
		});
	});
});
