'use strict';

const app = require('../server');
const chai = require('chai');
const chaiHttp = require('chai-http');

const expect = chai.expect;

chai.use(chaiHttp);

describe('Reality check', function () {

  it('true should be true', function () {
    expect(true).to.be.true;
  });

  it('2 + 2 should equal 4', function () {
    expect(2 + 2).to.equal(4);
  });

});

describe('Express static', function () {

  it('GET request "/" should return the index page', function () {
    return chai.request(app)
      .get('/')
      .then(function (res) {
        expect(res).to.exist;
        expect(res).to.have.status(200);
        expect(res).to.be.html;
      });
  });

});

describe('404 handler', function () {

  it('should respond with 404 when given a bad path', function () {
    return chai.request(app)
      .get('/DOES/NOT/EXIST')
      .then(res => {
        expect(res).to.have.status(404);
      });
  });

});

describe('GET /api/notes', function () {

  it('GET request "/api/notes" should return the 10 default notes', function () {
    return chai.request(app)
      .get('/api/notes')
      .then(function (res) {
        expect(res).to.exist;
        expect(res.body).to.be.a('array');
        expect(res).to.have.status(200);
        expect(res.body.length).to.be.at.least(10); //change if the default list changes length
        
        const expectedKeys = ['id','title','content'];
        res.body.forEach(function(item){
          expect(item).to.be.a('object');
          expect(item).to.include.keys(expectedKeys);
        });
      });
  });

  it('GET request "api/notes?searchTerm=you" to search for notes with "you" in title"', function(){
    return chai.request(app)
      .get('/api/notes?searchTerm=you')
      .then(function(res){
        res.body.forEach(function(item){
          expect(item).to.be.a('object');
          expect(item.title).to.match(/(?:you)/);
        });
      });
  });

  const idsToTest = [1002, 1008, 2000, 1000, 667];
  idsToTest.forEach(function(testId){
    it(`GET request "api/notes/:${testId}" should return note with that ID`, function(){
      if(testId >= 1000 && testId < 1010){
        return chai.request(app)
          .get(`/api/notes/${testId}`)
          .then(function (res) {
            expect(res).to.exist;
            expect(res.body.id).to.equal(testId);
            expect(res).to.have.status(200);
          });
      } else {
        return chai.request(app)
          .get(`/api/notes/${testId}`)
          .then(function (res) {
            expect(res).to.have.status(404);
          });
      }
    });
  });

});
