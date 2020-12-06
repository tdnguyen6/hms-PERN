// const app = require("../../src/server/app");
// const request = require("supertest");
// const expect = require('chai').expect;

it('test to see if Jest works', () => {
    expect(1).toBe(1)
})


// describe("GET requests", function () {
//     let agent;
//     let server;
//     let cookies;

// beforeAll((done) => {
//     server = app.listen(3000);
//     agent = request(server);
//     agent.post("/user/login")
//         .send({
//             email: "tidu@good.edu.vn",
//             password: "tidu@good.edu.vn"
//         })
//         .expect(200, (err, res) => {
//             if (err) return done(err);
//             expect(res.headers).to.have.property("set-cookie");
//             cookies = res.headers["set-cookie"].pop().split(";")[0];
//             console.log(cookies);
//             done();
//         });
// });
//
// afterAll((done) => {
//     server.close(done);
// });
// after((done) => {
//     app.close(done);
// });

// it("should return a 200 HTTP status code", function (done) {
//     // agent
//     //     .get("/api/someendpoint")
//     //     .set("Cookie", [cookies])
//     //     .end(function(err, res) {
//     //         if (err) return done(err);
//     //         expect(res.status).to.equal(200);
//     //         done();
//     //     });
//     agent.post("/user/login")
//         .send({
//             email: "tidu@good.edu.vn",
//             password: "tidu@good.edu.vn"
//         })
//         .expect(200, (err, res) => {
//             if (err) return done(err);
//             expect(res.headers).to.have.property("set-cookie");
//             cookies = res.headers["set-cookie"].pop().split(";")[0];
//             console.log(cookies);
//             done();
//         });
// });
// });