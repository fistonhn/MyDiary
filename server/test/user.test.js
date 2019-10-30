import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import usersTest from '../models/usersData';

const { expect } = chai;
chai.use(chaiHttp);


describe('when user send non existed routes ', () => {
  it('should return Incorrect route! try again ', (done) => {
    chai.request(app)
      .get('/')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(400);
        expect(res.status).to.equal(400);
        done();
      });
  });
});

// sign up
describe('When the user try to signup --api/v1/auth/signup', () => {
  it('should return firstName is required ', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send(usersTest[0])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        expect(res.body.error).to.equal('"firstName" is required');
        done();
      });
  });
  it('should return lastName must be a string', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send(usersTest[1])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        expect(res.body.error).to.equal('"lastName" is not allowed to be empty');
        done();
      });
  });
  it('should return invalid email ', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send(usersTest[2])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        expect(res.body.error).to.equal('"email" must be a valid email');
        done();
      });
  });
  it('should return password must be 6 long string', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send(usersTest[3])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        expect(res.body.error).to.equal('"password" length must be at least 6 characters long');
        done();
      });
  });
  it('should return user created successfull', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send(usersTest[4])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(201);
        expect(res.body.status).to.equal(201);
        expect(res.body.message).to.equal('User created successfull');
        expect(res.body.data).to.have.property('token');
        expect(res.body.data.userInfo.firstName).to.equal('hbn');
        expect(res.body.data.userInfo.lastName).to.equal('fiston');
        done();
      });
  });
  it('should return Email already taken', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send(usersTest[5])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(409);
        expect(res.body.message).to.equal('Email address already taken');
        done();
      });
  });
});

// login user

describe(' When the user try to login --api/v1/auth/signin', () => {
  it('should return email is required!', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .set('Accept', 'application/json')
      .send(usersTest[6])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        done();
      });
  });
  it('should return password must be string!', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .set('Accept', 'application/json')
      .send(usersTest[7])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        done();
      });
  });
  it('should return No associated account with this email!', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .set('Accept', 'application/json')
      .send(usersTest[8])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(404);
        expect(res.body.status).to.equal(404);
        done();
      });
  });
  it('should return Incorrect password!', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .set('Accept', 'application/json')
      .send(usersTest[9])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(401);
        expect(res.body.status).to.equal(401);
        done();
      });
  });
  it('should user loggin successfull', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .set('Accept', 'application/json')
      .send(usersTest[10])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal(200);
        done();
      });
  });
});
