const app = require("../../src/server/app");
const request = require("supertest");
let server, agent;

beforeAll(() => {
    server = app.listen(3000);
    agent = request(server);
});

describe("Test login API", () => {
    it("should login on correct username and password", async () => {
        try {
            const res = await agent
                .post("/user/login")
                .send({
                    email: "tidu@good.edu.vn",
                    password: "tidu@good.edu.vn"
                })
                .set('Accept', 'application/json');

            expect(res.status).toBe(200);
            expect(res.body).toEqual({
                "id": true,
                "role": "Practitioner"
            });
        } catch (e) {
            expect(e).toMatch('error');
            throw e;
        }
    });

    it("should send reject code and empty body on wrong username or password", async () => {
        try {
            const res = await agent
                .post("/user/login")
                .send({
                    email: "tidu@good.edu.vn",
                    password: "tidu@good.edu.vn_"
                })
                .set('Accept', 'application/json');

            expect(res.status).toBe(401);
            expect(res.body).toEqual("");
        } catch (e) {
            expect(e).toMatch('error');
            throw e;
        }
    });

    it("should send reject code and empty body on wrong username or password", async () => {
        try {
            const res = await agent
                .post("/user/login")
                .send({
                    email: "tidu@good.edu.vn",
                    password: "tidu@good.edu.vn_"
                })
                .set('Accept', 'application/json');

            expect(res.status).toBe(401);
            expect(res.body).toEqual("");
        } catch (e) {
            expect(e).toMatch('error');
            throw e;
        }
    });
});

afterAll(() => {
    server.close();
});
