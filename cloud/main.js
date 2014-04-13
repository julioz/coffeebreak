require('cloud/app.js');

// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("hello", function(request, response) {
  response.success("Hello world!");
});

Parse.Cloud.define("mobileConf", function(request, response) {
    response.success(
        {
            "subjects" : [
                {
                    "id" : 1,
                    "name" : "html5"
                },
                {
                    "id" : 2,
                    "name" : "css3"                    
                },
                {
                    "id" : 3,
                    "name" : "node.js"
                },
                {
                    "id" : 4,
                    "name" : "android"
                },
                {
                    "id" : 5,
                    "name" : "ios"
                }
            ]
        }
    );
});

Parse.Cloud.define("findUsersByKnowledge", function(request, response) {
    response.success(
        {
            "users" : {
                "html5" : [
                    {
                        "id" : "1210402271",
                        "first_name" : "Julio",
                        "last_name" : "Zynger",
                        "gender" : "male",
                        "email" : "emailuserone@domain.com"
                    },
                    {
                        "id" : "1253103400",
                        "first_name" : "Daniel",
                        "last_name" : "Antunes",
                        "gender" : "male",
                        "email" : "quemolequefeio@domaindois.com"
                    }
                ],
                "android" : [
                    {
                        "id" : "100000582247827",
                        "first_name" : "Silvia",
                        "last_name" : "Sailon",
                        "gender" : "female",
                        "email" : "sailon@domain.com"
                    }
                ]
            }
        }
    );
});

