import { TokenData } from "../src/models/token.interface";
import createCookie from "../src/scripts/createCookie";
import { v4 as uuidv4 } from "uuid";
import app from "../src/app";
import { LoginDto } from "../src/user/validators/user.dto";
import request from "supertest";

let res;

describe("POST /user/getuserinfo", () => {
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
			res = await request(app.app).post(`/api/user/getuserinfo`).send(userData).set("Content-Type", "application/json").set("Accept", "application/json");
		});
		it("data should be 0, status should be 400, error code should be 'no token'", () => {
			expect(res.body.data).toEqual(0);
			expect(res.body.status).toEqual(400);
			expect(res.body.message).toEqual("ERR_NO_TOKEN");
		});
	});
	describe("2. if data is correct, it should", () => {
		beforeAll(async () => {
			const userData = {
				login: "test",
				description: "Привет, мир!",
			};
			res = await request(app.app).post(`/api/user/getuserinfo`).send(userData).set("Content-Type", "application/json").set("Accept", "application/json").set("Cookie", [cookie]);
		});
		it("return data and status should be 1", () => {
			expect(res.body.data).not.toEqual(0);
			expect(res.body.status).toEqual(1);
		});
	});
	describe("3. if data isnt correct", () => {
		beforeAll(async () => {
			const userData = {
				login:
					"testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest",
				description: "Привет, мир!",
			};
			res = await request(app.app).post(`/api/user/getuserinfo`).send(userData).set("Content-Type", "application/json").set("Accept", "application/json").set("Cookie", [cookie]);
		});
		it("error should be 'incorrect data', data should be 0 and status should be 400", () => {
			expect(res.body.message).toEqual("ERR_LOGIN_INCORRECT");
			expect(res.body.data).toEqual(0);
			expect(res.body.status).toEqual(400);
		});
	});
	const userData = {
		login: "unknownuser",
		description: "Привет, мир!",
	};
	describe("4. if the user isnt exists", () => {
		beforeAll(async () => {
			res = await request(app.app).post(`/api/user/getuserinfo`).send(userData).set("Content-Type", "application/json").set("Accept", "application/json").set("Cookie", [cookie]);
		});
		it("data should be [] and status should be 1", () => {
			expect(res.body.data).toEqual([]);
			expect(res.body.status).toEqual(1);
		});
	});
});
