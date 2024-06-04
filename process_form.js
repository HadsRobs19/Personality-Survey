//for first name and last nama create a span tag through DOM and show either a success that something was entered correctly (maybe impliment RegEx for both names) or Error with a hint telling users how  each name should be formatted

//focus = hints; blur = validation

//RegEx for firstname: something has been entered and starts with a capital letter and is ONLY letters

function userFirstRegEx(userFirst) {
    let userFirstReg = /^[A-Z][a-z]*/;

    if (userFirst.match(userFirstReg)) {
        console.log("First name is valid");
        return true;
    } else {
        console.log("First name is invalid");
        return false;
    }
}

//RegEx for lastname: something has been entered and the users only have letters, spaces, and apostrophes
function lastNameRegEx(userLast) {
    let lastNameReg = /^[a-zA-Z\s']+$/;
    if (userLast.match(lastNameReg)) {
        console.log("Last Name is valid")
        return true;
    } else {
        console.log("Last name is not valid");
        return false;
    }
}

//RegEx for email: input checks for "blah@blah.com" or "blah@blah.edu"
function userEmailRegEx(userEmail) {
    let userEmailReg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (userEmail.match(userEmailReg)) {
        console.log("Email is valid");
        return true;
    } else {
        console.log("Email is not valid");
        return false;
    }

}

//RegEx for phone number: implement regEx for phone number entry in patter XXX XXX-XXXX
function userPhoneRegEx(userNumber) {
    let userPhoneReg = /^\d\d\d \d\d\d-\d\d\d\d$/;

    //match to compare an inputted string against a regex in conditional; console.log to check for errors(comment out when done)
    if (userNumber.match(userPhoneReg)) {
        console.log("Phone number is valid");
        return true;
    } else {
        console.log("Phone number is invalid");
        return false;
    }
}

//RegEx for a URL: implement regEx for url that checks for a tilde (~), a trailing slash (/), and begins with https://
function userURLRegEx(userURL) {
    let userURLReg = /^https:\/\/.*~.*\/$/;
    if (userURL.match(userURLReg)) {
        console.log("URL is valid");
        return true;
    } else {
        console.log("URL is not valid");
        return false;
    }
}


//next create function for actual form validation; onblur and onfocus
function validateData() {

    //user flag variables to test validation in code,
    let firstname_valid = false;
    let lastname_valid = false;
    let userEmail_valid = false;
    let userPhone_valid = false;
    let userURL_valid = false;

    document.myForm.firstname.onblur = function () {
        //onblur outline:
        //attach the id for the form tag to new variable (getElementById)

        //literally the same as writing this.value out in the if statment
        let userThisFirst = this.value;
        let name1Blur = document.getElementById("firstName");
        //use DOMscripting to create a span element (don't like the way empty span tags look in html)
        let name1Span = document.createElement("span");

        //append new span tag to its new form parent(it exists now in the html!!)
        name1Blur.appendChild(name1Span);

        //now create a variable for the new tag span and retrieve it from the html to use in conditional (getElementsByTagName)
        let span = name1Blur.getElementsByTagName("span");

        //create conditional to test if the value within the forms id matches its regex rules in seperate function (function call with this.value parameter)
        if (userFirstRegEx(userThisFirst)) {

            //nested conditonal to test if the node value of the span tag is set to null
            if (span[0].firstChild.nodeValue == null) {

                //if so, append a new text node (CreateTextNode) that tells the user that their entry in valid (new node attached to span)
                span[0].appendChild(document.createTextNode("Success!"));

                //flag is set to true to actually execute
                firstname_valid = true;
            } else {

                //node value starting at the start of the span tag is set to "Success!"
                span[0].firstChild.nodeValue = "Success!";
                firstname_valid = true;
            }
        } else {
            //if the node value of the first child of a span string is empty then...
            if (span[0].firstChild.nodeValue == null) {
                //a text node will be created saying "ERROR" for the user to see and the flag is false
                span[0].appendChild(document.createTextNode("ERROR!"));
                firstname_valid = false;
            } else {
                //node value is actual set to text node value so the user can see
                span[0].firstChild.nodeValue = "ERROR!";
                firstname_valid = false;
            }
        }
    };

    //hint portion of firstname input; what would usually show up in the terminal for developers is visible to users (just notes for myself!) "Please enter your firstname"
    document.myForm.firstname.onfocus = function () {

        //target my firstName id in the input and set the span tag inside to a variable
        let name1Focus = document.getElementById("firstName");
        let spanTag = document.getElementsByTagName("span");

        //if the length of the value of the span tag is more than 0 AND the first child of the span node is empty, set the node value to prompt the user to actually enter something
        if (spanTag.length > 0 && spanTag[0].firstChild) {
            spanTag[0].firstChild.nodeValue = "Please enter your first name";
        } else {
            //make a new span element for the user hint and append the text for the prompt to the span so that it is visible next to the firstname input field for the user
            let name1Span = document.createElement("span");
            name1Span.appendChild(document.createTextNode("Please enter your first name"));

            name1Focus.appendChild(name1Span);
        }

    };

    //using the same format for onblur and onfocus so this is my time to chill with the comments! :D

    //validation for last name(literally just the same thing as the first name onblur an onfocus)
    document.myForm.lastname.onblur = function () {
        let userThisLast = this.value;
        let name2Blur = document.getElementById("lastName");

        let span2 = name2Blur.getElementsByTagName("span");

        //was having issues with all of the new span elements attaching to first name and no onblurs were appearing

        //try checking if a span exists before appending a new one to the lastname id
        if (span2.length === 0) {
            let name2Span = document.createElement("span");
            name2Blur.appendChild(name2Span);
            span2 = name2Blur.getElementsByTagName("span");
        }

        //getting errors in everything (except for first name) with setting the node valuse of the new span elements to null
        if (lastNameRegEx(userThisLast)) {
            //instead of setting node value to null, test if span2 has anything in it before appending the success and error text nodes to it  (if not span has at least 1 character, create text that displays "Success!" on the first child of the span)
            if (!span2[0].firstChild) {
                //if this checks out, a textnode for "Success" will be made to show that the user input is valid
                span2[0].appendChild(document.createTextNode("Success!"));
                lastname_valid = true;
            } else {
                span2[0].firstChild.nodeValue = "Success!"
                lastname_valid = true;
            }
        } else {
            if (!span2[0].firstChild) {
                span2[0].appendChild(document.createTextNode("ERROR!"));
                lastname_valid = false;
            } else {
                span2[0].firstChild.nodeValue = "ERROR!";
                lastname_valid = false;
            }
        }
    }

    document.myForm.lastname.onfocus = function () {
        let name2Focus = document.getElementById("lastName");

        //problem solved! get the tag that already exists in the lastName id instead of the document
        let span2Tag = name2Focus.getElementsByTagName("span");

        if (span2Tag.length > 0 && span2Tag[0].firstChild) {
            span2Tag[0].firstChild.nodeValue = "Please enter your last name";
        } else {
            let name2Span = document.createElement("span");
            name2Span.appendChild(document.createTextNode("Please enter your last name"))

            name2Focus.appendChild(name2Span);
        }
    }

    //validation the user email
    document.myForm.user_email.onblur = function () {
        let userThisEmail = this.value;
        let emailBlur = document.getElementById("email");

        let span3 = emailBlur.getElementsByTagName("span");
        if (span3 === 0) {
            let emailSpan = document.createElement("span");
            emailBlur.appendChild(emailSpan);
            span3 = emailBlur.getElementsByTagName("span")
        }

        if (userEmailRegEx(userThisEmail)) {
            if (!span3[0].firstChild) {
                span3[0].appendChild(document.createTextNode("Success!"));
                userEmail_valid = true;
            } else {
                span3[0].firstChild.nodeValue = "Success!"
                userEmail_valid = true;
            }
        } else {
            if (!span3[0].firstChild) {
                span3[0].appendChild(document.createTextNode("ERROR!"));
                userEmail_valid = false;
            } else {
                span3[0].firstChild.nodeValue = "ERROR!";
                userEmail_valid = false;
            }
        }
    }

    //hint for the user email
    document.myForm.user_email.onfocus = function () {
        let emailFocus = document.getElementById("email");
        let emailTag = emailFocus.getElementsByTagName("span");

        if (emailTag.length > 0 && emailTag[0].firstChild) {
            emailTag[0].firstChild.nodeValue = "Please enter your Email";
        } else {
            let emailSpan2 = document.createElement("span");
            emailSpan2.appendChild(document.createTextNode("Please enter your Email"))

            emailFocus.appendChild(emailSpan2);
        }
    }

    //user phone number validation
    document.myForm.user_phone.onblur = function () {
        let userThisPhone = this.value;
        let phoneBlur = document.getElementById("phone");

        //also just in case you see the renaming of span over and over and think "thats weird and unnecessary!", it just helped me seperate everything in my head! :)
        let span4 = phoneBlur.getElementsByTagName("span");

        if (span4.length === 0) {
            let phoneSpan = document.createElement("span");
            phoneBlur.appendChild(phoneSpan);
            span4 = phoneBlur.getElementsByTagName("span");
        }

        if (userPhoneRegEx(userThisPhone)) {
            if (!span4[0].firstChild) {
                span4[0].appendChild(document.createTextNode("Success!"));
                userPhone_valid = true;
            } else {
                span4[0].firstChild.nodeValue = "Success!"
                userPhone_valid = true;
            }
        } else {
            if (!span4[0].firstChild) {
                span4[0].appendChild(document.createTextNode("ERROR!"));
                userPhone_valid = false;
            } else {
                span4[0].firstChild.nodeValue = "ERROR!";
                userPhone_valid = false;
            }
        }
    }

    //hint for the user phone number
    document.myForm.user_phone.onfocus = function () {
        let phoneFocus = document.getElementById("phone");
        let phoneTag = phoneFocus.getElementsByTagName("span");

        if (phoneTag.length > 0 && phoneTag[0].firstChild) {
            phoneTag[0].firstChild.nodeValue = "Please enter your phone number (XXX XXX-XXXX)";
        } else {
            let phoneSpan2 = document.createElement("span");
            phoneSpan2.appendChild(document.createTextNode("Please enter your phone number (XXX XXX-XXXX)"));

            phoneFocus.appendChild(phoneSpan2);
        }
    }

    //user url validation
    document.myForm.user_url.onblur = function () {
        let userThisURL = this.value;
        let urlBlur = document.getElementById("url");

        let span5 = urlBlur.getElementsByTagName("span");

        if (span5.length === 0) {
            let urlSpan = document.createElement("span");
            urlBlur.appendChild(urlSpan);
            span5 = urlBlur.getElementsByTagName("span");
        }

        if (userURLRegEx(userThisURL)) {
            if (!span5[0].firstChild) {
                span5[0].appendChild(document.createTextNode("Success!"));
                userURL_valid = true;
            } else {
                span5[0].firstChild.nodeValue = "Success!"
                userURL_valid = true;
            }
        } else {
            if (!span5[0].firstChild) {
                span5[0].appendChild(document.createTextNode("ERROR!"));
                userURL_valid = false;
            } else {
                span5[0].firstChild.nodeValue = "ERROR!";
                userURL_valid = false;
            }
        }
    }

    //hint for user url
    document.myForm.user_url.onfocus = function () {
        let urlFocus = document.getElementById("url");
        let urlTag = urlFocus.getElementsByTagName("span");

        if (urlTag.length > 0 && urlTag[0].firstChild) {
            urlTag[0].firstChild.nodeValue = "Please enter a website";
        } else {
            let urlSpan2 = document.createElement("span");
            urlSpan2.appendChild(document.createTextNode("Please enter a website"));

            urlFocus.appendChild(urlSpan2);
        }
    }

    //to make sure text submission are valid using the RegEx functions, set variables to a function call of each RegEx with the emply value field on the input tag as the parameters
    document.myForm.onsubmit = function () {
        let firstname_valid = userFirstRegEx(document.myForm.firstname.value);
        let lastname_valid = lastNameRegEx(document.myForm.lastname.value);
        let userEmail_valid = userEmailRegEx(document.myForm.user_email.value);
        let userPhone_valid = userPhoneRegEx(document.myForm.user_phone.value);
        let userURL_valid = userURLRegEx(document.myForm.user_url.value);

    }

    //if all information is valid with the validation flags, the processForm function is called
    if (firstname_valid && lastname_valid && userEmail_valid && userPhone_valid && userURL_valid) {
        processForm();
    }

    document.myForm.addEventListener("submit", processForm);

}


function processForm(event) {
    event.preventDefault();

    //create for loops to make it so that users can only check one radio button at a time for each survey question
    //provide console.log log to check that elements of each input name are correct
    for (let i = 0; i < document.myForm.elements["color"].length; i++) {
        if (document.myForm.elements["color"][i].checked) {
            //console.log("Radio: " + document.myForm.elements["color"][i].value);
            break;
        }
    }
    for (let i = 0; i < document.myForm.elements["activity"].length; i++) {
        if (document.myForm.elements["activity"][i].checked) {
            //console.log("Radio: " + document.myForm.elements[activity][i].value);
            break;
        }
    }
    for (let i = 0; i < document.myForm.elements["describe"].length; i++) {
        if (document.myForm.elements["describe"][i].checked) {
            //console.log("Radio: " + document.myForm.elements["describe"][i].value);
            break;
        }
    }

    // user query selector to take the actual input name value from the html and mark the radio buttons as checked; since these values will not need to be changed, keep them constant

    const color = document.querySelector('input[name="color"]:checked');
    const activity = document.querySelector('input[name="activity"]:checked');
    const self = document.querySelector('input[name="describe"]:checked');

    //now do conditional statements that actually test what image will come up based on which radio buttons are checked at the same time

    if (color && activity && self) {
        let bannerDiv = document.createElement("div");
        let imgBanner = document.createElement("img");
        let text = document.createElement("h3");

        //do conditionals for different input combinations to display one of the badges
        // i tried to make as many combinations as possible!
        if ((color.value == 'green' || color.value == 'blue') && (activity.value == 'read' || activity.value == 'hike') && self.value == 'alone') {
            imgBanner.setAttribute("src", "img/catperson.jpg");
            imgBanner.setAttribute("alt", "Image of a cat wearing a black hoodie");
            text = document.createTextNode("You are a Cat Person!");
        } else if ((color.value == 'yellow' || color.value == 'red') && (activity.value == 'concert' || activity.value == 'bar') && self.value == 'people') {
            imgBanner.setAttribute("src", "img/dogperson.jpg");
            imgBanner.setAttribute("alt", "image of John Wick and his dog");
            text = document.createTextNode("You are a Dog Person!");
        } else if ((color.value == 'green' || color.value == 'yellow') && (activity.value == 'concert' || activity.value == 'hike') && self.value == 'people') {
            imgBanner.setAttribute("src", "img/dogperson.jpg");
            imgBanner.setAttribute("alt", "image of John Wick and his dog");
            text = document.createTextNode("You are a Dog Person!");
        } else if ((color.value == 'red' || color.value == 'blue') && (activity.value == 'read' || activity.value == 'bar') && self.value == 'alone') {
            imgBanner.setAttribute("src", "img/catperson.jpg");
            imgBanner.setAttribute("alt", "Image of a cat wearing a black hoodie");
            text = document.createTextNode("You are a Cat Person!");
        } else {
            imgBanner.setAttribute("src", "img/catperson.jpg");
            imgBanner.setAttribute("alt", "Image of a cat wearing a black hoodie");
            text = document.createTextNode("You are a Cat Person!");
        }

        bannerDiv.appendChild(imgBanner);
        bannerDiv.appendChild(text);

        //PUT DIV FOR WHERE I WANT MY IMAGE SHOWN ON MY WEBPAGE
        let bannerHtml = document.getElementById("bannerSpot");

        //make sure area is cleared before putting up a new banner
        while (bannerHtml.hasChildNodes()) {
            bannerHtml.removeChild(bannerHtml.lastChild);
        }
        bannerHtml.appendChild(bannerDiv);

    }

    //now I need to display the users personal information under the banner after they submit the form

    //create a new p tag for each new personal info variable and interpolate the value from each input with a new text variable with a createTextNode
    //append both new variables together
    let firstNameP = document.createElement("p");
    let nameText1 = document.createTextNode(`First Name: ${document.myForm.firstname.value}`);
    firstNameP.appendChild(nameText1);

    let lastNameP = document.createElement("p");
    let nameText2 = document.createTextNode(`Last Name: ${document.myForm.lastname.value}`);
    lastNameP.appendChild(nameText2);

    let emailP = document.createElement("p");
    let emailText = document.createTextNode(`Email: ${document.myForm.user_email.value}`);
    emailP.appendChild(emailText);

    let phoneP = document.createElement("p");
    let phoneText = document.createTextNode(`Phone Number: ${document.myForm.user_phone.value}`);
    phoneP.appendChild(phoneText);

    let urlP = document.createElement("p");
    let urlText = document.createTextNode(`URL: ${document.myForm.user_url.value}`);
    urlP.appendChild(urlText);

    //new div id right under image div to display personal information
    let infoSpot = document.getElementById("personInfoSpot");

    //keep empty for each new submit
    while (infoSpot.hasChildNodes()) {
        infoSpot.removeChild(infoSpot.lastChild);
    }

    //REMEBER TO APPEND EACH NEW PERSONAL INFO VARIABLE TO DIV I WANT INFO TO APPEAR IN!!
    infoSpot.appendChild(firstNameP);
    infoSpot.appendChild(lastNameP);
    infoSpot.appendChild(emailP);
    infoSpot.appendChild(phoneP);
    infoSpot.appendChild(urlP);


}

//add sidebar to page (?)
window.addEventListener("load", validateData, false);

//I HAVE NO IDEA HOW I DID THIS MANY LINES OF CODE I AM SO SORRY