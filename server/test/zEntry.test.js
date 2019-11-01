import dotenv from 'dotenv';
import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../../app';
import usersTest from '../models/usersData';
import entriesTest from '../models/entriesData';
import { generateToken } from '../helper/generateAuthToken';


const { expect } = chai;
chai.use(chaiHttp);
dotenv.config();

const token = generateToken(usersTest[4].id);
const unthToken = generateToken(usersTest[12].id);
const invalidToken = '';
const secondToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6MiwiaWF0IjoxNTcyNTg3MjQyLCJleHAiOjE1NzI1OTA4NDJ9.u0MRtrigyYDELGyM3Q2lQf78Vn6d0CYEK89jtD5H37U';

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
  it('should return this page have no entry', (done) => {
    chai
      .request(app)
      .get('/api/v1/entries')
      .set('Authorization', token)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.status).to.equal(404);
        expect(res.body.message).to.equal('this page have no entry');
        done();
      });
  });
  it('should return all display entry paging', (done) => {
    chai
      .request(app)
      .get('/api/v1/entries?p=1')
      .set('Authorization', token)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal(200);
        expect(res.body.message).to.equal('display entry paging');
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
  it('should return this entry does not belongs to you!', (done) => {
    chai
      .request(app)
      .get('/api/v1/entries/1')
      .set('Authorization', secondToken)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(403);
        expect(res.body.status).to.equal(403);
        expect(res.body.message).to.equal('this entry does not belongs to you!');
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
  it('should return this entry does not belongs to you!', (done) => {
    chai
      .request(app)
      .patch('/api/v1/entries/1')
      .set('Authorization', secondToken)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(403);
        expect(res.body.status).to.equal(403);
        expect(res.body.message).to.equal('this entry does not belongs to you!');
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
  it('should return You are not authorized to perform this action', (done) => {
    chai
      .request(app)
      .patch('/api/v1/entries/1')
      .set('Accept', 'application/json')
      .set('Authorization', unthToken)
      .send(entriesTest[5])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(401);
        expect(res.body.status).to.equal(401);
        expect(res.body.error).to.equal('You are not authorized to perform this action');
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
  it('should return this entry does not belongs to you!', (done) => {
    chai
      .request(app)
      .delete('/api/v1/entries/1')
      .set('Authorization', secondToken)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(403);
        expect(res.body.status).to.equal(403);
        expect(res.body.message).to.equal('this entry does not belongs to you!');
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
