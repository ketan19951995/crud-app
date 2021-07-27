const request = require('supertest')
const app = require("./server");




// First time register test case 
describe("POST /register", () => {
    test("It responds with the newly created user", async () => {
        const newUser = await request(app)
            .post("/register")
            .send({
                email: "ketan@gmail.com",
                passowrd : "1234"
            });
        expect(newUser.statusCode).toBe(200)
    })
})


// User already registered test case
describe("POST /register", () => {
    test("User already registered", async () => {
        const newUser = await request(app)
            .post("/register")
            .send({
                email: "ketan@gmail.com",
                passowrd : "1234"
            });
            expect(newUser.body).toEqual({ message: "User already registered" });
    })
})


// Delete user test case where user exists  
describe("DELETE /user/", () => {
    test("It responds with a message Record Deleted", async () => {
      const newUser = await request(app)
        .post("/user")
        .send({
          email: "ketan@gmail.com"
        });
        const removedStudent = await request(app).delete('/user');
      expect(removedStudent.body).toEqual({ message: "Record Deleted" });
      expect(removedStudent.statusCode).toBe(200);
     });
  });



// Delete  user test case where user does not exist
describe("DELETE /user/", () => {
    test("No account exists with this email ID", async () => {
        const newUser = await request(app)
            .post("/user")
            .send({
                email: "ketan@gmail.com"
            });
        const removedStudent = await request(app).delete('/user');
        expect(removedStudent.body).toEqual({ message: "No account exists with this email ID" });
        expect(removedStudent.statusCode).toBe(200);
    });
});






let auth = {};
auth.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtldGFuQGdtYWlsLmNvbSIsImlhdCI6MTYyNzMyNTExMX0.8erzMB_txWaRTox5fXfA3qDaIfwpsQ7xgsQBr9BF6dc"
// Test case for  get all the users  
describe("GET /users", () => {
    test("It responds with an array of users", async () => {
        const response = await request(app)
            .get("/users")
            // add an authorization header with the token
            .set("authorization", auth.token);
        //expect(response.body.length).toBe(1);
        expect(response.statusCode).toBe(200);
    });
});