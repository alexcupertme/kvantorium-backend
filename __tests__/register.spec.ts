// import app from "../src/app";
// import { RegisterDto } from "../src/user/validators/user.dto";
// import request from "supertest";
// import User from "../src/user/models/user.model";
// import { mongoose } from "../src/DatabaseConnection";

// let res;

// afterAll(async () => {
// 	let login = "autouser";
// 	await User.findOneAndRemove({ login }, {}).then((value) => {});
// });

// describe("POST /user/regiser", () => {
// 	describe("1. if data isnt correct", () => {
// 		const userData: RegisterDto = {
// 			login: "test",
// 			mail: "test@test.test",
// 			password: "incorrectpassword",
// 		};
// 		beforeAll(async () => {
// 			res = await request(app.app).post(`/api/user/register`).send(userData).set("Content-Type", "application/json").set("Accept", "application/json");
// 		});
// 		it("error should be 'incorrect data', data should be 0 and status should be 400", () => {
// 			expect(res.body.message).toEqual("ERR_PASSWORD_INCORRECT");
// 			expect(res.body.data).toEqual(0);
// 			expect(res.body.status).toEqual(400);
// 		});
// 	});
// 	describe("2. if mail already in use", () => {
// 		const userData: RegisterDto = {
// 			login: "newuser",
// 			mail: "test@test.test",
// 			password: "incorrectpassword-10N",
// 		};
// 		beforeAll(async () => {
// 			res = await request(app.app).post(`/api/user/register`).send(userData).set("Content-Type", "application/json").set("Accept", "application/json");
// 		});
// 		it("error should be 'mail already registered', data should be 0 and status should be 400", () => {
// 			expect(res.body.message).toEqual("ERR_EMAIL_ALREADY_REGISTERED");
// 			expect(res.body.data).toEqual(0);
// 			expect(res.body.status).toEqual(400);
// 		});
// 	});
// 	describe("3. if username already in use", () => {
// 		const userData: RegisterDto = {
// 			login: "test",
// 			mail: "newmail@test.test",
// 			password: "incorrectpassword-10N",
// 		};
// 		beforeAll(async () => {
// 			res = await request(app.app).post(`/api/user/register`).send(userData).set("Content-Type", "application/json").set("Accept", "application/json");
// 		});
// 		it("error should be 'nickname already taken', data should be 0 and status should be 400", () => {
// 			expect(res.body.message).toEqual("ERR_LOGIN_WAS_TAKEN");
// 			expect(res.body.data).toEqual(0);
// 			expect(res.body.status).toEqual(400);
// 		});
// 	});
// 	describe("4. if all is correct, user should be registered", () => {
// 		const userData = {
// 			login: "autouser",
// 			mail: "autogenerateduser@test.test",
// 			password: "autogeneratedpassword-10N",
// 		};
// 		beforeAll(async () => {
// 			res = await request(app.app).post(`/api/user/register`).send(userData).set("Content-Type", "application/json").set("Accept", "application/json");
// 		});
// 		describe("if response successfull", () => {
// 			it("token should exists, expiry date shouldnt be empty, token shouldnt be empty and should be encoded to Base64", () => {
// 				expect(typeof res.body.data.tokenData.token).toEqual("string");
// 				expect(typeof res.body.data.tokenData.expiresIn).toEqual("number");
// 				expect(res.body.data.tokenData.token).not.toEqual("");
// 				expect(res.body.data.tokenData.token).toMatch(/^(?=.*[0-9])(?=.*\W)(?![.\n])(?![\b])(?=.*[A-Z])(?=.*[a-z]).*$/);
// 			});
// 		});
// 		it("and status should be 1", () => {
// 			expect(res.body.status).toEqual(1);
// 		});
// 	});
// });
