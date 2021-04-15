import app from "../src/app";
import { LoginDto } from "../src/user/validators/user.dto";
import request from "supertest";

let res;
describe("POST /user/login", () => {
	describe("1. if data isnt correct", () => {
		const userData: LoginDto = {
			login: "test",
			password: "incorrectpassword",
		};
		beforeAll(async () => {
			res = await request(app.app).post(`/api/user/login`).send(userData).set("Content-Type", "application/json").set("Accept", "application/json");
		});
		it("error should be 'incorrect data', data should be 0 and status should be 400", () => {
			expect(res.body.message).toEqual("ERR_PASSWORD_INCORRECT");
			expect(res.body.data).toEqual(0);
			expect(res.body.status).toEqual(400);
		});
	});
	describe("2. if all data is correct,", () => {
		const userData: LoginDto = {
			login: "test",
			password: "Test-1-Test",
		};
		beforeAll(async () => {
			res = await request(app.app).post(`/api/user/login`).send(userData).set("Content-Type", "application/json").set("Accept", "application/json");
		});

		it("response should be successfull, expiry date shouldnt be empty, token shouldnt be empty, should be encoded to Base64 and status should be 1", () => {
			expect(typeof res.body.data.tokenData.token).toEqual("string");
			expect(typeof res.body.data.tokenData.expiresIn).toEqual("number");
			expect(res.body.data.tokenData.token).not.toEqual("");
			expect(res.body.data.tokenData.token).toMatch(/^(?=.*[0-9])(?=.*\W)(?![.\n])(?![\b])(?=.*[A-Z])(?=.*[a-z]).*$/);
			expect(res.body.status).toEqual(1);
		});
	});
	describe("3. if the user isnt exists", () => {
		const userData: LoginDto = {
			login: "usernotexists",
			password: "Test-1-Test",
		};
		beforeAll(async () => {
			res = await request(app.app).post(`/api/user/login`).send(userData).set("Content-Type", "application/json").set("Accept", "application/json");
		});
		it("error should be 'USER NOT EXISTS', data should be 0 and status should be 400", () => {
			expect(res.body.message).toEqual("ERR_USER_NOT_FOUND");
			expect(res.body.data).toEqual(0);
			expect(res.body.status).toEqual(400);
		});
	});
	describe("4. if password not correct", () => {
		const userData: LoginDto = {
			login: "test",
			password: "incorrectpassword-10N",
		};
		beforeAll(async () => {
			res = await request(app.app).post(`/api/user/login`).send(userData).set("Content-Type", "application/json").set("Accept", "application/json");
		});
		it("error should be 'wrong password', data should be 0 and status should be 400", () => {
			expect(res.body.message).toEqual("ERR_WRONG_PASSWORD");
			expect(res.body.data).toEqual(0);
			expect(res.body.status).toEqual(400);
		});
	});
});
