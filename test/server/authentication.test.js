const MockDate = require('mockdate');
const getPort = require('get-port');
const app = require("../../src/server/app");
const request = require("supertest");
const {do_hash} = require("../../src/server/modules/helper");
const db = require('../../src/server/db');
let server, agent;

jest.mock('../../src/server/db');
beforeAll(async () => {
    server = app.listen(await getPort({port: 6996}));
    agent = request(server);
});

describe.each([
    ["tidu.nguyen.2000@gmail.com", "Patient", "pass1", 1, null, 1],
    ["tidu@good.edu.vn", "Practitioner", "pass2", 2, 1, null],
    ["tidu@idrive.vn", "Admin", "pass3", 3, null, null]
])("Log %s in as %s", (email, expected_role, passwd, expected_id, practitioner_id, patient_id, needed_fields) => {
    let res;
    beforeEach(async () => {
        db.query.mockImplementationOnce(() => Promise.resolve({
            rowCount: 1,
            rows: [
                {
                    id: expected_id,
                    password: do_hash(passwd),
                    avatar: 'https://image.tmdb.org/t/p/original/hoVQIlZTprEAX7icPRYD8jvzK8K.jpg',
                    name: 'Lena Paul',
                    email: email,
                    phone: '115',
                    created_on: '2020-10-06T07:54:23.916Z',
                    last_login: '2020-10-06T07:54:23.916Z',
                    practitioner_id: practitioner_id,
                    patient_id: patient_id,
                    gender: 'female'
                }
            ]
        })).mockImplementationOnce(() => Promise.resolve({
            rowCount: 1,
            rows: []
        }));
        MockDate.set(1606711442801);
        res = await agent
            .post("/user/login")
            .send({
                email: email,
                password: passwd
            })
            .set('Accept', 'application/json');
    });
    afterEach(() => {
       db.query.mockReset();
    });
    it(`should be successful`, () => {
        expect(res.status).toBe(200);
    })
    // it(`should query database for email="${email}" and password=do_hash("${passwd}")`, () => {
    //     expect(db.query).toHaveBeenNthCalledWith(1, `SELECT * FROM accounts where email = $1 and password = $2`, [email, do_hash(passwd)]);
    // });
    it(`should update last_login field of id=${expected_id}`, () => {
        expect(db.query).toHaveBeenNthCalledWith(2, `UPDATE accounts SET last_login = $1 WHERE id = $2`, [(new Date()), expected_id]);
    });
    it(`should set cookie for session ID`, () => {
        expect(res.headers).toHaveProperty("set-cookie");
        expect(res.headers['set-cookie'].some(c => c.includes("connect.sid="))).toBeTruthy();
    });
    it(`should return json`, () => {
        expect(res.body).not.toBe("");
        expect(typeof res.body).toStrictEqual("object");
    });
    it(`should contains in body all data needed for role=${expected_role} with id=${expected_id}`, () => {
        expect(res.body).toHaveProperty("role", expected_role);
    });
});
MockDate.set(1606711442801);
console.log(new Date());
MockDate.reset();
console.log(new Date());
it("Log in with wrong credentials should be rejected by 401 with no return data", async () => {
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

    // expect(db.query).toHaveBeenCalledWith(`SELECT * FROM accounts where email = $1 and password = $2`, [email, do_hash(pass)]);
    expect(res.status).toBe(401);
    expect(res.body).toBe("");
});

describe("Register", () => {
    it("should be successful", async () => {
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
        // expect(db.query).toHaveBeenCalledTimes(1);
        // expect(db.query).toHaveBeenCalledWith(`INSERT INTO accounts (name, email, password, phone, gender) VALUES($1,$2,$3,$4,$5)`, [mockUser.name, mockUser.email, do_hash(mockUser.password), mockUser.phone, mockUser.gender]);
    });
});

describe("Check If Email Exist", () => {
    let res;
    beforeEach(async () => {
        db.query.mockResolvedValue({
            rowCount: 1,
            rows: []
        }).mockResolvedValue({
            rowCount: 0,
            rows: []
        });
        const res = await agent
            .post("/user/register")
            .send(mockUser)
            .set('Accept', 'application/json');

        expect(res.status).toBe(200);
        // expect(db.query).toHaveBeenCalledTimes(1);
        // expect(db.query).toHaveBeenCalledWith(`INSERT INTO accounts (name, email, password, phone, gender) VALUES($1,$2,$3,$4,$5)`, [mockUser.name, mockUser.email, do_hash(mockUser.password), mockUser.phone, mockUser.gender]);
    });
});

afterAll(() => {
    server.close();
});
