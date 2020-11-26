const app = require("../../src/server/app");
const request = require("supertest");
let server, agent;

beforeAll(() => {
    server = app.listen(3000);
    agent = request(server);
});

describe("GET /user/login", () => {
    it.each([
        ["tidu.nguyen.2000@gmail.com", 1, "Patient"],
        ["tidu@good.edu.vn", 2, "Practitioner"],
        ["tidu@idrive.vn", 3, "Admin"]
    ])("should login %s,  set cookie sid and return role=%s", async (email, expected_id, expected_role) => {
        const res = await agent
            .post("/user/login")
            .send({
                email: email,
                password: email
            })
            .set('Accept', 'application/json');

        expect(res.headers).toHaveProperty("set-cookie");
        expect(res.headers['set-cookie'].some(c => c.includes("connect.sid="))).toBeTruthy();
        expect(res.status).toBe(200);
        expect(res.body.role).toEqual(expected_role);
    });

    it("should send reject code and empty body on wrong username or password", async () => {
        const res = await agent
            .post("/user/login")
            .send({
                email: "tidu@good.edu.vn",
                password: "tidu@good.edu.vn_"
            })
            .set('Accept', 'application/json');

        expect(res.status).toBe(401);
        expect(res.body).toEqual("");
    });

    it.each([
        ["'' or ''=''"],
        ["69 OR 1=1"]
    ])("should prevent SQL Injection: %s", async (injection) => {
        const res = await agent
            .post("/user/login")
            .send({
                email: injection,
                password: injection,
            })
            .set('Accept', 'application/json');

        expect(res.status).toBe(401);
        expect(res.body).toEqual("");
    });
});

afterAll(() => {
    server.close();
});
