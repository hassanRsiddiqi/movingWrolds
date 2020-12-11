const request = require("supertest");
const expect = require("expect");
const app = require("../Index");

describe("POST /api/user/signup", async () => {
  it("should create a new user with success message", (done) => {
    return createUser().then(async (res) => {
      assert.equal(res.body.success, true);
    });
  });
});

async function createUser() {
  return request(app)
    .post("/api/user/signup")
    .send({ email: "test+2@test1.com", password: "123456" });
}
