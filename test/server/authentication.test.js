const MockDate = require('mockdate');
const app = require("../../src/server/app");
const request = require("supertest");
const {do_hash} = require("../../src/server/modules/helper");
const db = require('../../src/server/db');
let server, agent;

jest.mock('../../src/server/db');
beforeAll(() => {
    server = app.listen(3000);
    agent = request(server);
});

describe("POST /user/login", () => {
    it.each([
        ["tidu.nguyen.2000@gmail.com", "Patient", 1, null, 1],
        ["tidu@good.edu.vn", "Practitioner", 2, 1, null],
        ["tidu@idrive.vn", "Admin", 3, null, null]
    ])("should login %s, set last_login,  set cookie sid and return role=%s", async (email, expected_id, expected_role, prac_id, pat_id) => {
        db.query.mockImplementationOnce(() => Promise.resolve({
            rowCount: 1,
            rows: [
                {
                    id: expected_id,
                    password: do_hash(email),
                    avatar: 'https://image.tmdb.org/t/p/original/hoVQIlZTprEAX7icPRYD8jvzK8K.jpg',
                    name: 'Lena Paul',
                    email: email,
                    phone: '115',
                    created_on: '2020-10-06T07:54:23.916Z',
                    last_login: '2020-10-06T07:54:23.916Z',
                    practitioner_id: prac_id,
                    patient_id: pat_id,
                    gender: 'female'
                }
            ]
        })).mockImplementationOnce(() => Promise.resolve({
            rowCount: 1,
            rows: []
        }));
        ;
        MockDate.set(1606711442801);
        const res = await agent
            .post("/user/login")
            .send({
                email: email,
                password: email
            })
            .set('Accept', 'application/json');

        expect(db.query).toHaveBeenCalledTimes(2);
        expect(db.query).toHaveBeenNthCalledWith(1, `SELECT * FROM accounts where email = $1 and password = $2`, [email, do_hash(email)]);
        expect(db.query).toHaveBeenNthCalledWith(2, `UPDATE accounts SET last_login = $1 WHERE id = $2`, ["2020-11-30T04:44:02.801Z", expected_id]);
        expect(res.headers).toHaveProperty("set-cookie");
        expect(res.headers['set-cookie'].some(c => c.includes("connect.sid="))).toBeTruthy();
        expect(res.status).toBe(200);
        expect(res.body.role).toEqual(expected_role);
    });

    it("should send reject code and empty body on wrong username or password", async () => {
        db.query.mockResolvedValue({
            rowCount: 0,
            rows: []
        });
        const email = "tidu@good.edu.vn";
        const pass = "12345abcde";
        const res = await agent
            .post("/user/login")
            .send({
                email: email,
                password: pass
            })
            .set('Accept', 'application/json');

        expect(db.query).toHaveBeenCalledTimes(1);
        expect(db.query).toHaveBeenCalledWith(`SELECT * FROM accounts where email = $1 and password = $2`, [email, do_hash(pass)]);

        expect(res.status).toBe(401);
        // expect(res.body).toEqual("");
    });

    // it.each([
    //     ["'' or ''=''"],
    //     ["69 OR 1=1"],
    //     [";^%2F25/_"]
    // ])("should prevent SQL Injection: %s", async (injection) => {
    //     db.query.mockResolvedValue({
    //         rowCount: 0,
    //         rows: []
    //     });
    //     const res = await agent
    //         .post("/user/login")
    //         .send({
    //             email: injection,
    //             password: injection,
    //         })
    //         .set('Accept', 'application/json');
    //
    //     expect(db.query).toHaveBeenCalledTimes(1);
    //     expect(db.query).toHaveBeenCalledWith(`SELECT * FROM accounts where email = $1 and password = $2`, [injection, do_hash(injection)]);
    //     expect(res.status).toBe(401);
    //     expect(res.body).toEqual("");
    // });
});

describe("POST /user/register", () => {
    it("should register successfully", async () => {
        const mockUser = {
            name: "TiDu",
            email: "a@b.c",
            password: "abcde12345",
            phone: "112312445",
            gender: "female"
        };
        db.query.mockResolvedValue({
            rowCount: 1,
            rows: []
        });
        const res = await agent
            .post("/user/register")
            .send(mockUser)
            .set('Accept', 'application/json');

        expect(res.status).toBe(200);
        expect(db.query).toHaveBeenCalledTimes(1);
        expect(db.query).toHaveBeenCalledWith(`INSERT INTO accounts (name, email, password, phone, gender) VALUES($1,$2,$3,$4,$5)`, [mockUser.name, mockUser.email, do_hash(mockUser.password), mockUser.phone, mockUser.gender]);
    });
});


afterAll(() => {
    server.close();
});
