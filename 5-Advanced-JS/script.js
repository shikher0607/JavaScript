//Function Constructor
/*
var john = {
    name: 'John',
    yearOfBirth: 1990,
    job: 'teacher'
};

var Person = function(name, yearOfBirth, job){
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
}

Person.prototype.calculateAge = function(){
    console.log(2018-this.yearOfBirth);
}

var john = new Person('John', 1990, 'teacher');
john.calculateAge();

var jane = new Person('Jane',1992,'designer');
var mark = new Person('Mark',1960,'Retired');
*/

//object. create
/*
var personProto = {
    calculateAge: function(){
        console.log(2018-this.yearOfBirth);
    }
}

var john = Object.create(personProto);
john.yearOfBirth = 1990;

var jane = Object.create(personProto,{
    yearOfBirth: {value: 1991}
});
*/

//Primitives vs objects

 //Functions
 /*
 var age = 27;
 var obj = {
     name: 'john',
     city: 'lisbon'
 };
function change(a, b){
    a = 30;
    b.city = 'New york';
}

change(age, obj);
console.log(age);
console.log(obj.city);*/

//Functions
/*
var years = [1990, 1992, 1994, 1996, 2016];
function arrayCalc(arr, fn){
    var arrRes = [];
    for(var i = 0; i< arr.length; i++){
        arrRes.push(fn(arr[i]));
    }
    return arrRes;
}

function calculateAge(el){
    return 2018-el;
}

function isFullAge(el){
    return el >= 18;
}

function maxHeartRate(el){
    if(el>18){
    return Math.round(206.9 -(0.67 * el));
    }else{
        return 'not-applicable';
    }
}
var ages =  arrayCalc(years, calculateAge);
console.log(ages);
var fullAges = arrayCalc(ages, isFullAge);
console.log(fullAges);
var heartRate = arrayCalc(ages, maxHeartRate);
console.log(heartRate);
*/

//Function Returning Functions

function interviewQuestion(job){
    if(job === 'designer'){
        return function (name){
            console.log(name + ', Can you explain UI/UX?');
        }
    }else if(job === 'teacher'){
        return function (name){
            console.log(name + ',What subject do you teach?');
        }
    }else{
        return function(name){
            console.log('Hello ' + name + ', What do you do?');
        }
    }
}

var teacherQuestion = interviewQuestion('teacher');
teacherQuestion('John');