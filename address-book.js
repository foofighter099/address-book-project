var inquirer = require("inquirer");
var Table = require('cli-table');
var uniqueId = 0;

function displayTable(user) {
    var table = new Table();

    table.push({
        "First Name": user.firstName
    }, {
        "Last Name": user.lastName
    }, {
        "Birthday": user.birthday
        
    });



    return table.toString();
}



var users = [];

var question = {
    type: "list",
    name: "menuSelection",
    message: "What do you want to do?",
    choices: [{
        name: "Create an entry",
        value: "create"
    }, {
        name: "Search an Entry",
        value: "search"
    }, {
        name: "Exit the Program",
        value: "exit"
    }],
    default: "Create a new address book entry"
};

function createEdit(user) {
    if (!user) {
        user = {};
    }

    return [{
        name: "firstName",
        message: "First name",
        default: user.firstName
    }, {
        name: "lastName",
        message: "Last name",
        default: user.lastName
    }, {
        name: 'birthday',
        message: 'Birthday (Optional)',
        default: user.birthday
    }, {
        name: "address",
        message: "Choose the type(s) of address(es) you would like to add (use <spacebar> to select)",
        type: "checkbox",
        choices: [{
            name: "Home",
        }, {
            name: 'Work',
        }, {
            name: 'Other',
        }],
        default: user.address,
    }, {
        name: 'phone',
        message: 'Choose the type(s) of phone(s) you would like to add (use <spacebar> to select)',
        type: 'checkbox',
        choices: [{
            name: 'Home',
        }, {
            name: 'Work',
        }, {
            name: 'Other',
        }],
        default: user.phone,
    }, {
        name: 'email',
        message: 'Choose the type(s) of email(s) you would like to add (use <spacebar> to select)',
        type: 'checkbox',
        choices: [{
            name: 'Home',
        }, {
            name: 'Work',
        }, {
            name: 'Other',
        }],
        default: user.email,
    }, {
        name: "homeAddress1",
        message: 'Home Address Line 1',
        when: whenAddressHome,
        default: user.homeAddress1
    }, {
        name: "homeAddress2",
        message: 'Home Address Line 2 (Optional)',
        when: whenAddressHome,
        default: user.homeAddress2
    }, {
        name: "homeCity",
        message: 'Home City',
        when: whenAddressHome,
        default: user.homeCity
    }, {
        name: "homeProvince",
        message: 'Home Province',
        when: whenAddressHome,
        default: user.homeProvince
    }, {
        name: "homePostalCode",
        message: 'Home Postal Code',
        when: whenAddressHome,
        default: user.homePostalCode
    }, {
        name: "homeCountry",
        message: 'Home Country',
        when: whenAddressHome,
        default: user.homeCountry
    }, {
        name: "workAddress1",
        message: 'Work Address Line 1',
        when: whenAddressWork,
        default: user.workAddress1
    }, {
        name: "workAddress2",
        message: 'Work Address Line 2 (Optional)',
        when: whenAddressWork,
        default: user.workAddress2
    }, {
        name: "workCity",
        message: 'Work City',
        when: whenAddressWork,
        default: user.workCity
    }, {
        name: "workProvince",
        message: 'Work Province',
        when: whenAddressWork,
        default: user.workProvince
    }, {
        name: "workPostalCode",
        message: 'Work Postal Code',
        when: whenAddressWork,
        default: user.workPostalCode
    }, {
        name: "workCountry",
        message: 'Work Country',
        when: whenAddressWork,
        default: user.workCountry
    }, {
        name: "otherAddress1",
        message: 'Other Address Line 1',
        when: whenAddressOther,
        default: user.otherAddress1
    }, {
        name: "otherAddress2",
        message: 'Other Address Line 2 (Optional)',
        when: whenAddressOther,
        default: user.otherAddress2
    }, {
        name: "otherCity",
        message: 'Other City',
        when: whenAddressOther,
        default: user.otherCity
    }, {
        name: "otherProvince",
        message: 'Other Province',
        when: whenAddressOther,
        default: user.otherProvince
    }, {
        name: "otherPostalCode",
        message: 'Other Postal Code',
        when: whenAddressOther,
        default: user.otherPostalCode
    }, {
        name: "otherCountry",
        message: 'Other Country',
        when: whenAddressOther,
        default: user.otherCountry
    }, {
        name: "homePhone",
        message: 'Home Phone',
        when: whenPhoneHome,
        default: user.homePhone
    }, {
        type: "list",
        name: "phoneSelection",
        message: "What type of phone number is this?",
        when: whenPhoneHome,
        choices: [{
            name: "landline",
            value: "Landline"
    }, {
            name: "cellular",
            value: "Cellular"
    }, {
            name: "fax",
            value: "Fax"
    }],
    }, {
        name: "workPhone",
        message: 'Work Phone',
        when: whenPhoneWork,
        default: user.workPhone
    }, {
        type: "list",
        name: "phoneSelection",
        message: "What type of phone number is this?",
        when: whenPhoneWork,
        choices: [{
            name: "landline",
            value: "Landline"
    }, {
            name: "cellular",
            value: "Cellular"
    }, {
            name: "fax",
            value: "Fax"
    }],
    }, {
        name: "otherPhone",
        message: 'Other Phone',
        when: whenPhoneOther,
        default: user.otherPhone
    }, {
        type: "list",
        name: "phoneSelection",
        message: "What type of phone number is this?",
        when: whenPhoneOther,
        choices: [{
            name: "landline",
            value: "Landline"
    }, {
            name: "cellular",
            value: "Cellular"
    }, {
            name: "fax",
            value: "Fax"
    }],
    }, { 
        name: 'homeEmail',
        message: 'Home Email Address',
        default: user.homeEmail,
        when: function whenEmailHome(answers) {
        return answers.email.indexOf('Home') >= 0;
    }
    }, { 
        name: 'workEmail',
        message: 'Work Email Address',
        default: user.workEmail,
        when: function whenWorkHome(answers) {
        return answers.email.indexOf('Work') >= 0;
    }
    }, { 
        name: 'otherEmail',
        message: 'Other Email Address',
        default: user.otherEmail,
        when: function whenOtherHome(answers) {
        return answers.email.indexOf('Other') >= 0;
    }
    }];
}

function whenAddressHome(answers) {
    return answers.address.indexOf('Home') >= 0;
}

function whenAddressWork(answers) {
    return answers.address.indexOf('Work') >= 0;
}

function whenAddressOther(answers) {
    return answers.address.indexOf('Other') >= 0;
}

function whenPhoneHome(answers) {
    return answers.phone.indexOf('Home') >= 0;
}

function whenPhoneWork(answers) {
    return answers.phone.indexOf('Work') >= 0;
}

function whenPhoneOther(answers) {
    return answers.phone.indexOf('Other') >= 0;
}
var searchInfo = [{
    name: "searchName",
    message: "Please enter the name you would like to search for:"
}];

var newPrompt = {
    type: 'list',
    name: "nextMove",
    message: "What would you like to do now?",
    choices: [{
        name: "Do another search",
        value: "search_again"
    }, {
        name: "Exit to Main Menu",
        value: "exit_mm"
    }],
};

var edit_delContact = {
    type: 'list',
    name: 'edit_Del',
    message: "What would you like to do now?",
    choices: [{
        name: "Edit contact",
        value: "edit_contact"
    }, {
        name: "Delete contact",
        value: "delContact"
    }, {
        name: "Exit to Main Menu",
        value: "exit_mm"
    }],
};

var delContact = {
    type: 'confirm',
    name: 'delThisConact',
    message: 'Are you sure you want to delete this contact?',
    default: false
};

function delUser(userToDel) {
    inquirer.prompt(delContact, function(answers) {
        if (answers.delContact !== false) {
            users = users.filter(function(user) {
                if (userToDel === user) {
                    return false;
                }
                else {
                    return true;
                }
            });
            address_book();
        }
    });
}

function edit_delContacts(user) {
    console.log(user);
    inquirer.prompt(edit_delContact, function(answers) {
        if (answers.edit_Del === "edit_contact") {
            editCreate(user);
        }


        if (answers.edit_Del === "delContact") {
            delUser(user);  
        }

        if (answers.edit_Del === "exit_mm") {
            address_book();
        }
    });
}

function editCreate(curUser) {
    console.log(curUser);
    inquirer.prompt(createEdit(curUser), function(answers) {

        var userEdited = answers;
        users = users.filter(function(user) {
            if (user.id === userEdited.id) {
                return false;
            }
        });
        userEdited.id = uniqueId++;
        users.push(userEdited);
        console.log(displayTable(userEdited));
        edit_delContacts(userEdited);
    });
}


function searchContacts() {
    inquirer.prompt(searchInfo, function(answers) {
        var resultPrompt = Object.assign({}, newPrompt);
        var searchResult = [];


        users.forEach(function(person) {
            if (answers.searchName === person.firstName || answers.searchName === person.lastName) {
                searchResult.push({
                    name: person.firstName + " " + person.lastName,
                    value: person
                });
            }
            else {
                console.log("No matches were found!");
            }
        });

        resultPrompt.choices = searchResult.concat(resultPrompt.choices);

        function searchAgain(result) {
            inquirer.prompt(result, function(answers) {
                if (typeof answers.nextMove === "object") {
                    console.log(displayTable(answers.nextMove));
                    edit_delContacts(answers); 


                }
                if (answers.nextMove === "exit_mm") {
                    address_book();
                }

                if (answers.nextMove === "search_again") {
                    searchContacts();
                }
            });

        }
        searchAgain(resultPrompt);

    });
}

function address_book() {
    inquirer.prompt(question, function(answers) {
        if (answers.menuSelection === "create") {
            inquirer.prompt(createEdit(answers), function(answers) {
                answers.id = uniqueId++;
                users.push(answers);
                console.log(displayTable(answers));
                edit_delContacts(answers); //insert code to edit/delete contact.
            });

        }

        else if (answers.menuSelection === "search") {
            console.log("Searching...");
            searchContacts();
        }




        else if (answers.menuSelection === "exit") {
            console.log("Thank you, Goodbye");
            //exit
        }
    });
}


address_book();