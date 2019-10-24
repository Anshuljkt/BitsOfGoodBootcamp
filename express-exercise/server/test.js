// NPM Imports
const chaiHttp = require("chai-http");
const chai = require("chai");

// Local Imports & Config
const server = require("./app");
const should = chai.should;
const expect = chai.expect;
chai.use(chaiHttp);

// Test boilerplate is set up properly
describe("Express Generator", () => {
  it("Boilerplate setup", done => {
    chai
      .request(server)
      .get("/")
      .end((err, res) => {
        should().not.exist(err);
        res.should.have.status(200);
        return done();
      });
  });
});

// Test Health Endpoint
describe("Health endpoint", () => {
  it("Works as aspected", done => {
    chai
      .request(server)
      .get("/health")
      .end((err, res) => {
        should().not.exist(err);
        res.should.have.status(200);
        res.body.should.have.key("status", "version");
        const status = res.body.status;
        const version = res.body.version;
        expect(status).to.be.equal("pass", "Expected status to be 'pass' ");
        expect(version).to.be.equal("1.0", "Expected status to be '1.0' ");

        return done();
      });
  });
});

// Test Multiply Endpoint
describe("Multiply Endpoint", () => {
  it("Works with [1,2,3,4,5]", done => {
    const factors = [1, 2, 3, 4, 5];
    const correctResult = factors.reduce((prev, cur) => prev * cur);
    chai
      .request(server)
      .post("/multiply")
      .send({ factors })
      .end((err, res) => {
        should().not.exist(err);
        res.should.have.status(200);
        res.body.should.have.key("result");
        const result = res.body.result;
        expect(result).to.be.equal(
          correctResult,
          `Expected result to be ${correctResult}`
        );
        return done();
      });
  });

  it("Fails when factors not sent", done => {
    chai
      .request(server)
      .post("/multiply")
      .end((err, res) => {
        should().not.exist(err);
        res.should.have.status(400);
        res.body.should.have.key("error");
        return done();
      });
  });

  it("Fails when factors is not an array", done => {
    const factors = "1,2,3,4,5";
    chai
      .request(server)
      .post("/multiply")
      .send({ factors })
      .end((err, res) => {
        should().not.exist(err);
        res.should.have.status(400);
        res.body.should.have.key("error");
        return done();
      });
  });

  it("Fails when factors are not all numbers", done => {
    const factors = ["woot", 2, 3, 4, 5];
    chai
      .request(server)
      .post("/multiply")
      .send({ factors })
      .end((err, res) => {
        should().not.exist(err);
        res.should.have.status(400);
        res.body.should.have.key("error");
        return done();
      });
  });
});

// Test Fibonacci Endpoint
describe("Fibonacci Endpoint", () => {
  it("Works with limit=10", done => {
    function fibonacci(num) {
      if (num <= 1) return 1;
      return fibonacci(num - 1) + fibonacci(num - 2);
    }
    const limit = 10;
    const fib = fibonacci(limit);
    chai
      .request(server)
      .get("/fibonacci?limit=10")
      .end((err, res) => {
        should().not.exist(err);
        res.should.have.status(200);
        res.body.should.have.key("result");
        const result = res.body.result;
        expect(result).to.be.equal(fib, `Expected result to be ${fib}`);
        return done();
      });
  });

  it("Fails when limit not sent", done => {
    chai
      .request(server)
      .get("/fibonacci")
      .end((err, res) => {
        should().not.exist(err);
        res.should.have.status(400);
        res.body.should.have.key("error");
        return done();
      });
  });

  it("Fails when limit is not a number", done => {
    chai
      .request(server)
      .get("/fibonacci?limit=bog")
      .end((err, res) => {
        should().not.exist(err);
        res.should.have.status(400);
        res.body.should.have.key("error");
        return done();
      });
  });

  it("Fails when limit is less than zero", done => {
    chai
      .request(server)
      .get("/fibonacci?limit=-1")
      .end((err, res) => {
        should().not.exist(err);
        res.should.have.status(400);
        res.body.should.have.key("error");
        return done();
      });
  });
});