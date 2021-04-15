import { TokenData } from "../src/models/token.interface";
import createCookie from "../src/scripts/createCookie";
import { mongoose } from "../src/DatabaseConnection";
import { v4 as uuidv4 } from "uuid";
import app from "../src/app";
import { LoginDto, RegisterDto } from "../src/user/validators/user.dto";
import request from "supertest";
import createToken from "../src/scripts/createToken";

jest.setTimeout(30000);

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
