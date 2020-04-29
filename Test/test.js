const request = require('supertest-as-promised');
const httpStatus = require('http-status');
const chai = require('chai');
const expect = require('chai').expect;
const start = require('../server');
const testData = require('./testdata');
const express = require('express');
const app = express();


it("should run and respond with a JSON type message", (done) => {
    request(app).get('/students').expect('Content-type', /JSON/);
    done();
});

/*
describe("REST API Automated Tests", () => {
    describe("GET requests on /students", () => {
        it("should run and return a 200 status code", (done) => {
            request(app).get('/students').expect(httpStatus.OK);
            done();
        });
        it("should run and respond with a JSON type message", (done) => {
            request(app).get('/students').expect('Content-type', /JSON/);
            done();
        });
        it("should run and handle empty data array", (done) => {
            request(app).get('/students').then(res => {
                expect(res.body.overview).to.equal("Eek! Your request went through but the server hasn't received any data yet. Just wait a moment and resend your request please.");
                done();
            });
        });
        it("should run and output 2 keys (overview and students)", (done) => {
            request(app).get('/test/students').then(res => {
                expect(res.body).that.includes.all.keys(['overview', 'students']);
            })
            done();
        });
        it("should run and output only unique students (no repeats)", (done) => {
            request(app).get('/test/students').then(res => {
                expect(res.body.students).to.have.lengthOf(55);
            });
            done();
        });
        it("should run and output the proper set of names for test data", (done) => {
            request(app).get('/test/students').then(res => {
                expect(res.body.students).to.equal('["Ronnie","Lonnie","Tonnie","Monnie","Jonnie","Connie"]');
            });
            done();
        });
    });



    describe("GET requests on /students/{id}", () => {
        it("should run and return a 200 status code", (done) => {
            request(app).get('/students/id').expect(httpStatus.OK);
            done();
        });
        it("should run and respond with a JSON type message", (done) => {
            request(app).get('/students/id').expect('Content-type', /JSON/);
            done();
        });
        it("should run and handle empty data array", (done) => {
            request(app).get('/students/id').then(res => {
                expect(res.body.overview).to.equal("Eek! Your request went through but the server hasn't received any data yet. Just wait a moment and resend your request please.");
                done();
            });
        })
        it("should run and output 3 keys (overview, scores, average_score)", (done) => {
            request(app).get('/test/students/Ronnie').then(res => {
                expect(res.body).that.includes.all.keys(['overview', 'scores', 'average_score']);
            })
            done();
        });
        it("should run and return an error for non-existent student/bad request", (done) => {
            request(app).get('/test/students/fakestudent').then(res => {
                expect(httpStatus.BAD_REQUEST);
            });
            done();
        });
        it("should run and output the right scores and average_score for test data", (done) => {
            request(app).get('/test/students/Ronnie').then(res => {
                expect(res.body.scores).to.equal('[10,1]');
                expect(res.body.average_score).to.equal(5.5);
            });
            done();
        });
    });

    describe("GET requests on /exams", () => {
        it("should run and return a 200 status code", (done) => {
            request(app).get('/exams').expect(httpStatus.OK);
            done();
        });
        it("should run and respond with a JSON type message", (done) => {
            request(app).get('/exams').expect('Content-type', /JSON/);
            done();
        });
        it("should run and handle empty data array", (done) => {
            request(app).get('/exams').then(res => {
                expect(res.body.overview).to.equal("Eek! Your request went through but the server hasn't received any data yet. Just wait a moment and resend your request please.");
                done();
            });
        });
        it("should run and output 2 keys (overview and exams)", (done) => {
            request(app).get('/test/exams').then(res => {
                expect(res.body).that.includes.all.keys(['overview', 'exams']);
            })
            done();
        });
        it("should run and output only unique exams (no repeats)", (done) => {
            request(app).get('/test/exams').then(res => {
                expect(res.body.exams).to.have.lengthOf(7);
            });
            done();
        });
        it("should run and output the proper set of exams for test data", (done) => {
            request(app).get('/test/exams').then(res => {
                expect(res.body.exams).to.equal('[65,66]');
            });
            done();
        });
    });

    describe("GET requests on /exams/{number}", () => {
        it("should run and return a 200 status code", (done) => {
            request(app).get('/exams/number').expect(httpStatus.OK);
            done();
        });
        it("should run and respond with a JSON type message", (done) => {
            request(app).get('/exams/number').expect('Content-type', /JSON/);
            done();
        });
        it("should run and handle empty data array", (done) => {
            request(app).get('/exams/number').then(res => {
                expect(res.body.overview).to.equal("Eek! Your request went through but the server hasn't received any data yet. Just wait a moment and resend your request please.");
                done();
            });
        });
        it("should run and output 3 keys (overview, exam_scores, average_score)", (done) => {
            request(app).get('/test/exams/65').then(res => {
                expect(res.body).that.includes.all.keys(['overview', 'exam_scores', 'average_score']);
            })
            done();
        });
        it("should run and return an error for non-existent exam/bad request", (done) => {
            request(app).get('/test/exams/67').then(res => {
                expect(httpStatus.BAD_REQUEST);
            });
            done();
        });
        it("should run and output the right scores and average_score for test data", (done) => {
            request(app).get('/test/exams/65').then(res => {
                expect(res.body.exam_scores).to.equal('[10,10,9,10,9,9]');
                expect(res.body.average_score).to.equal(9.5);
            });
            done();
        });
    });

}); */