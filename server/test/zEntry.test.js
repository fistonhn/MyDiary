import dotenv from 'dotenv';
import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../app';
import usersTest from '../models/usersData';
import entriesTest from '../models/entriesData';
import { generateToken } from '../helper/generateAuthToken';


const { expect } = chai;
chai.use(chaiHttp);
dotenv.config();

const token = generateToken(usersTest[4].id);
const invalidToken = '';

// GET all entries but no entry created
describe('When users tries to view all their diaries--- GET entry,api/v1/entries', () => {
  it('should return Unauthorised user - Header Not Set', (done) => {
    chai
      .request(app)
      .get('/api/v1/entries')
      .end((err, res) => {
        expect(res.status).to.equal(401);
        done();
      });
  });
  it('should return invalid token or expired', (done) => {
    chai
      .request(app)
      .get('/api/v1/entries')
      .set('Authorization', invalidToken)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(400);
        done();
      });
  });
  it('should return no created entry ', (done) => {
    chai
      .request(app)
      .get('/api/v1/entries')
      .set('Authorization', token)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
  });
});

// create an entry
describe('When the user try to create a new entry--- POST entry,api/v1/entries', () => {
  it('should return Unauthorised user - Header Not Set', (done) => {
    chai
      .request(app)
      .post('/api/v1/entries')
      .end((err, res) => {
        expect(res.status).to.equal(401);
        done();
      });
  });
  it('should return invalid token or expired', (done) => {
    chai
      .request(app)
      .post('/api/v1/entries')
      .set('Authorization', invalidToken)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(400);
        done();
      });
  });
  it('should return title must be required ', (done) => {
    chai
      .request(app)
      .post('/api/v1/entries')
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .send(entriesTest[0])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        done();
      });
  });
  it('should return description must be a string ', (done) => {
    chai
      .request(app)
      .post('/api/v1/entries')
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .send(entriesTest[1])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        done();
      });
  });
  it('should return Entry successfull created ', (done) => {
    chai
      .request(app)
      .post('/api/v1/entries')
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .send(entriesTest[2])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(201);
        expect(res.body.status).to.equal(201);
        done();
      });
  });
});

// GET all created entries

describe('When users tries to view all their diaries--- GET entry,api/v1/entries', () => {
  it('should return Unauthorised user - Header Not Set', (done) => {
    chai
      .request(app)
      .get('/api/v1/entries')
      .end((err, res) => {
        expect(res.status).to.equal(401);
        done();
      });
  });
  it('should return invalid token or expired', (done) => {
    chai
      .request(app)
      .get('/api/v1/entries')
      .set('Authorization', invalidToken)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(400);
        done();
      });
  });
  it('should return all created entries  ', (done) => {
    chai
      .request(app)
      .get('/api/v1/entries')
      .set('Authorization', token)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal(200);
        done();
      });
  });
});

// GET one entry

describe('When the user tries to view a specific entry--- GET entry,api/v1/entries/id', () => {
  it('should return Unauthorised user - Header Not Set', (done) => {
    chai
      .request(app)
      .get('/api/v1/entries')
      .end((err, res) => {
        expect(res.status).to.equal(401);
        done();
      });
  });
  it('should return invalid token or expired', (done) => {
    chai
      .request(app)
      .get('/api/v1/entries')
      .set('Authorization', invalidToken)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(400);
        done();
      });
  });
  it('should return params id must be a number ', (done) => {
    chai
      .request(app)
      .get('/api/v1/entries/h')
      .set('Authorization', token)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        done();
      });
  });
  it('should return entry not found ', (done) => {
    chai
      .request(app)
      .get('/api/v1/entries/3')
      .set('Authorization', token)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(404);
        expect(res.body.status).to.equal(404);
        done();
      });
  });
  it('should return selected entry to the user ', (done) => {
    chai
      .request(app)
      .get('/api/v1/entries/1')
      .set('Authorization', token)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal(200);
        done();
      });
  });
});


// UPDATE an entry

describe('When the user tries to UPDATE a specific diary--- PATCH entry,api/v1/entries/id', () => {
  it('should return Unauthorised user - Header Not Set', (done) => {
    chai
      .request(app)
      .patch('/api/v1/entries/1')
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.err).to.equal('Unauthorised - Header Not Set');
        done();
      });
  });
  it('should return invalid token or expired', (done) => {
    chai
      .request(app)
      .patch('/api/v1/entries/1')
      .set('Authorization', invalidToken)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(400);
        expect(res.body.error).to.equal('Invalid token');
        done();
      });
  });
  it('should return params id must be a number ', (done) => {
    chai
      .request(app)
      .patch('/api/v1/entries/h')
      .set('Authorization', token)
      .send(entriesTest[5])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        expect(res.body.error).to.equal('"id" must be a number');
        done();
      });
  });
  it('should return title must be string', (done) => {
    chai
      .request(app)
      .patch('/api/v1/entries/1')
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .send(entriesTest[3])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        expect(res.body.error).to.equal('"title" must be a string');
        done();
      });
  });
  it('should return description must be string', (done) => {
    chai
      .request(app)
      .patch('/api/v1/entries/1')
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .send(entriesTest[4])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        expect(res.body.error).to.equal('"description" must be a string');
        done();
      });
  });
  it('should return There is no entry with that id', (done) => {
    chai
      .request(app)
      .patch('/api/v1/entries/145')
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .send(entriesTest[5])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(404);
        expect(res.body.status).to.equal(404);
        done();
      });
  });
  it('should return entry successfull updated ', (done) => {
    chai
      .request(app)
      .patch('/api/v1/entries/1')
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .send(entriesTest[5])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal(200);
        expect(res.body.message).to.equal('entry successfully updated');
        done();
      });
  });
});

// DELETE entries

describe('delete entry, --api/v1/entries/id', () => {
  it('should return Unauthorised user - Header Not Set', (done) => {
    chai
      .request(app)
      .delete('/api/v1/entries/1')
      .end((err, res) => {
        expect(res.status).to.equal(401);
        done();
      });
  });
  it('should return invalid token or expired', (done) => {
    chai
      .request(app)
      .delete('/api/v1/entries/1')
      .set('Authorization', invalidToken)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(400);
        done();
      });
  });
  it('should return prams id must be a number', (done) => {
    chai
      .request(app)
      .delete('/api/v1/entries/h')
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        done();
      });
  });
  it('should return There is no entry with that id', (done) => {
    chai
      .request(app)
      .delete('/api/v1/entries/145')
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(404);
        expect(res.body.status).to.equal(404);
        done();
      });
  });
  it('should return  entry successfull deleted', (done) => {
    chai
      .request(app)
      .delete('/api/v1/entries/1')
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal(200);
        done();
      });
  });
});
