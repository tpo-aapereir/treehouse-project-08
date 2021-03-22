const test = require('th_unit08_test_suite');
var path = require('path');

// we define a global app root variable so we can determine the root of the application
global.appRoot = path.resolve(__dirname + "\\..\\");

// we manually execute the tests in the included package
test.executeMeetsTest();