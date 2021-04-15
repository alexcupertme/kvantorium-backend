import { TokenData } from "../src/models/token.interface";
import createCookie from "../src/scripts/createCookie";
import { v4 as uuidv4 } from "uuid";
import app from "../src/app";
import { LoginDto } from "../src/user/validators/user.dto";
import request from "supertest";

let res;

describe("POST /post/createpost", () => {
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
	describe("1. if token didnt sent", () => {
		beforeAll(async () => {
			const userData = {
				mail: "teledurak@gmail.com",
			};
			res = await request(app.app).post(`/api/post/createpost`).send(userData).set("Content-Type", "application/json").set("Accept", "application/json");
		});
		it("data should be 0, status should be 400 and error should be 'no token'", () => {
			expect(res.body.data).toEqual(0);
			expect(res.body.status).toEqual(400);
			expect(res.body.message).toEqual("ERR_NO_TOKEN");
		});
	});
	describe("2. if request isnt correct", () => {
		beforeAll(async () => {
			const userData = {
				login:
					"testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest",
				description: "Привет, мир!",
			};
			res = await request(app.app).post(`/api/post/createpost`).send(userData).set("Content-Type", "application/json").set("Accept", "application/json").set("Cookie", [cookie]);
		});
		it("error should be 'incorrect data', data should be 0 and status should be 400", () => {
			expect(res.body.message).toEqual("ERR_EMPTY_REQ");
			expect(res.body.data).toEqual(0);
			expect(res.body.status).toEqual(400);
		});
	});
	describe("3. if type isnt correct", () => {
		beforeAll(async () => {
			const userData = {
				type: "unknowntype",
				data: "",
				anchor: "",
				cover: "",
			};
			res = await request(app.app).post(`/api/user/changeinfo`).send(userData).set("Content-Type", "application/json").set("Accept", "application/json").set("Cookie", [cookie]);
		});
		it("data should be 0, status should be 400 and error should be 'mail in use'", () => {
			expect(res.body.data).toEqual(0);
			expect(res.body.status).toEqual(400);
			expect(res.body.message).toEqual("ERR_UNKNOWN_TYPE");
		});
	});
	describe("4. if data", () => {
		beforeAll(async () => {
			const userData = {
				login: "test",
			};
			res = await request(app.app).post(`/api/user/changeinfo`).send(userData).set("Content-Type", "application/json").set("Accept", "application/json").set("Cookie", [cookie]);
		});
		it("data should be 0, status should be 400 and error should be 'login in use'", () => {
			expect(res.body.data).toEqual(0);
			expect(res.body.status).toEqual(400);
			expect(res.body.message).toEqual("ERR_LOGIN_WAS_TAKEN");
		});
	});
	describe("5. if all data is correct", () => {
		beforeAll(async () => {
			const userData = {
				login: "newnickname",
			};
			res = await request(app.app).post(`/api/user/changeinfo`).send(userData).set("Content-Type", "application/json").set("Accept", "application/json").set("Cookie", [cookie]);
		});
		afterAll(async () => {
			const userData = {
				login: "test",
			};
			await request(app.app).post(`/api/user/changeinfo`).send(userData).set("Content-Type", "application/json").set("Accept", "application/json").set("Cookie", [cookie]);
		});
		it("status should be 1, data should be 0", () => {
			expect(res.body.data).toEqual(0);
			expect(res.body.status).toEqual(1);
		});
	});
});
