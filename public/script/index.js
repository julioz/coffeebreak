$(document).ready(function() {
    var displayPag = function(page){
        $(".pagina").css("display", "none");
        
        $(page).css("display", "block");
    };
    
    displayPag(".paginaUm");
    
    var saveUserToDB = function(user) {
        user.set("displayName", response.name);
        user.set("email", response.email);
        user.set("firstName", response.first_name);
        user.set("lastName", response.last_name);
        user.set("gender", response.gender);
        user.save(null, {
            success: function(user) {
                console.log("User saved to the database");
            },
            error: function(user, error) {
                console.log("Oops, something went wrong saving your name.");
            }
        });
    };
    
    var mobileConf = function(cb_success) {
        Parse.Cloud.run('mobileConf', {}, {
            success: function(json) {
                cb_success(json);
            },
            error: function(error) {
                
            }
        });
    };
    
    var populateCategories = function(json) {
        var subjects = json.subjects;
        if (subjects !== null) {
            var container = $('.categorias');
            for (var i=0; i < subjects.length; i++) {
                var check = $("<input >")
                            .attr("type", "checkbox")
                            .attr("value", subjects[i].name)
                            .attr("id", "check-" + subjects[i].id);
                
                container.append(check);
                container.append(subjects[i].name);
                container.append("<br />");
            }
            
            displayPag(".paginaDois");
        }
    };
    
    var login = function() {
        Parse.FacebookUtils.logIn("basic_info,email", {
            success: function(user) {
                // Handle successful login
                console.log("User logged in with facebook.");
                
                FB.api('/me?fields=email,name,first_name,last_name,gender', function(response) {
                    if (!response.error) {
                        // We save the data on the Parse user
                        saveUserToDB(user);
                        
                        mobileConf(populateCategories);
                    } else {
                        console.log("Oops something went wrong with facebook.");
                    }
                });
            },
            error: function(user, error) {
                // Handle errors and cancellation
                console.log("logIn failed " + user);
            }
        });
    };
    
    // TODO mapear checkboxes para objetos javascript dos subjects
    var getUnknownKnowledge = function() {
        var unCheckedArray = $(".paginaDois input[type=checkbox]").not( $(".paginaDois :checked") );
        
        var json = { "subjects" : [] };
        unCheckedArray.each(function(index, obj) {
            json.subjects.push( { "id" : index, "name" : obj.value } );
        });
        
        return json;
    }
    
    var findUsersByKnowledge = function(subjects, cb_success) {
        Parse.Cloud.run('findUsersByKnowledge', subjects, {
            success: function(json) {
                cb_success(json);
            },
            error: function(error) {
                
            }
        });
    };

    var listSmartUsers = function(json) {
        var users = json.users;
        
        if (users !== null) {
            var container = $('.paginaTres');
            container.find('ul').remove();
            
            var resultList = $("<ul />");
            for (var item in users) {
                var listItem = $("<li />").html(item).addClass("subjectTitle");
                resultList.append(listItem);
                
                for (var index = 0; index < users[item].length; index++) {
                    var user = users[item][index];

                    var userRow = $("<li />").addClass("userRow");
                    var divWrapper = $("<div>");
                    var img = $("<img />");
                    var divData = $("<div>");
                    var h2 = $("<h2>");
                    var p = $("<p>");

                    p.html(user.email);
                    h2.html(user.first_name + " " + user.last_name);
                    img.attr("src","http://graph.facebook.com/" + user.id + "/picture")

                    divData.append(h2)
                           .append(p);

                    divWrapper.append(img)
                              .append(divData);


                    userRow.append(divWrapper);
                    resultList.append(userRow);
                }
            }
            
            container.append(resultList);
            
            displayPag('.paginaTres');
        }
    };
    
    $('#btSelectedKnowledge').click(function() {
        // enviar o que ele sabe pro banco
        findUsersByKnowledge(getUnknownKnowledge(), listSmartUsers);
    });
    
    $('#btLogin').click(function() {
        //login();
        mobileConf(populateCategories);
    });
});