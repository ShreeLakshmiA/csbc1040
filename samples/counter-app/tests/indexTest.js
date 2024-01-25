const chai = require('chai');
const supertest = require('supertest');
const chaiHttp = require('chai-http');
const { describe, it, after } = require('mocha');
const { app, server } = require('../index.js');

const expect = chai.expect;
chai.use(chaiHttp);

describe('Counter App', () => {
  // Test the home route
  describe('GET /', () => {
    it('should return HTML content with status 200', (done) => {
      supertest(app)
        .get('/')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.html;
          done();
        });
    });

    it('should contain the Counter App title in the response', (done) => {
      supertest(app)
        .get('/')
        .end((err, res) => {
          expect(res.text).to.include('Counter App');
          done();
        });
    });
  });
});

// Add a cleanup function to close the server after tests
after((done) => {
  server.close(() => {
    done();
  });
});
