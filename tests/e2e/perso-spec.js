var reset = require('./characterDAOTest').reset;

function waitForAngular() {
    protractor.getInstance().waitForAngular();
}

function fillFields(fields, offset) {
    offset = (typeof offset === "undefined") ? 0 : offset;
    for (var i = 0; i < fields.length; i++) {
        var field = fields[i];
        if (typeof field === 'object') {
            field.fill(i + offset);
        } else {
            sendKeysToEmptyField(field, "" + (i + offset));
        }
    }
}

function sendKeysToEmptyField(model, value) {
    var field = element(by.id(model));
    checkNoValue(field);
    field.sendKeys(value);
}

function checkNoValue(field) {
    expect(field.getAttribute("value")).toEqual("", field + " value should be null");
}

function SelectFactory(id) {
    this.id = id;

    this.create = function (listName, index) {
        return new Select(this.id + "-" + listName + "-" + index);
    };

}

function verifyFields(fields, offset) {
    offset = (typeof offset === "undefined") ? 0 : offset;
    for (var i = 0; i < fields.length; i++) {
        var field = fields[i];
        if (typeof field === 'object') {
            field.verify(i + offset);
        } else {
            checkFieldSaved(field, "" + (i + offset));
        }
    }
}

function checkFieldSaved(model, value) {
    var field = element(by.id(model));
    expect(field.getAttribute("value")).toEqual(value, model + " value should be " + value);
}

function Select(name) {

    this.name = name;

    this.fill = function (index) {
        var options = element.all(by.css("#" + this.name + " option"));
        options.count().then(function (nb) {
            options.get(index % nb).click();
            waitForAngular();
        });
    };

    this.verify = function (index) {
        var name = this.name;
        var options = element.all(by.css("#" + name + " option"));
        options.count().then(function (nb) {
            expect(element(by.id(name)).getAttribute("value"))
                .toEqual(options.get(index % nb).getAttribute("value"));
        });
    };

}

function PowerFactory(id, addButtonId) {
    this.id = id;

    this.create = function (listName, index) {
        var names = [];
        for (var i = 0; i < 2; i++) {
            element(by.id(addButtonId + "-" + index)).click();
            waitForAngular();
            names.push(this.id + "-" + i + "-" + listName + "-" + index);
        }
        return new Power(names);
    };

}

function Power(names) {

    this.names = names;

    this.fill = function (index) {
        for (var i = 0; i < this.names.length; i++) {
            var name = this.names[i];
            fillFields(["name-" + name, "text-" + name, new Select("type-" + name)], index + i);
        }
    };

    this.verify = function (index) {
        for (var i = 0; i < this.names.length; i++) {
            var name = this.names[i];
            verifyFields(["name-" + name, "text-" + name, new Select("type-" + name)], index + i);
        }
    };

}

describe('Character creation page', function () {

    var saveButton;
    var currentSection;

    beforeEach(function () {
        reset();
        browser.get('http://localhost:8000/perso.html');
        waitForAngular();
        saveButton = element(by.id("saveButton"));
    });

    function clickSectionButton() {
        element(by.id(currentSection + "Button")).click();
        waitForAngular();
    }

    function checkSaveButton(callBack) {
        expect(saveButton.isDisplayed()).toBe(true, "Save button is not display");
        saveButton.click();
        waitForAngular();
        expect(saveButton.isDisplayed()).toBe(false, "Save button is still display");
        var currentUrl = browser.getCurrentUrl();
        expect(currentUrl).toMatch(/http:\/\/localhost:8000\/perso.html\?id=[0-9a-f]+/, "Url should change to match character id");
        currentUrl.then(function (res) {
            browser.get(res);
            clickSectionButton();
            callBack();
        });
    }

    function checkFields(fields, beforeVerify) {
        fillFields(fields);
        checkSaveButton(function () {
            if (beforeVerify) {
                beforeVerify();
            }
            verifyFields(fields);
        });
    }

    function checkListFields(listName, elementFields, beforeVerify) {
        var number = 2;
        var fields = [];
        for (var i = 0; i < number; i++) {
            element(by.id(listName + "Add")).click();
            waitForAngular();
            for (var j = 0; j < elementFields.length; j++) {
                var elementField = elementFields[j];
                if (typeof elementField === 'object') {
                    fields.push(elementField.create(listName, i));
                } else {
                    fields.push(listName + "-" + elementField + "-" + i);
                }
            }
        }
        expect(element.all(by.css("#" + listName + "List > li")).count()).toEqual(number, "Element not added");
        checkFields(fields, beforeVerify);
//        FIXME comprendre pourquoi tout ça n'est pas executé correctement
//        element(by.id(listName + "Delete-0")).click();
//        element(by.id("validate")).click();
//        waitForAngular();
//        expect(element.all(by.css("#" + listName + "List > li")).count()).toEqual(number-1, "Element not deleted");
    }

    describe('id section', function () {

        beforeEach(function () {
            currentSection = "id";
            clickSectionButton();
        });

        it('should have a text field for each id field', function () {
            var fields = ["name", "class", "race", "level", "gender", "diety", "alignment", "paragonPath", "epicPath", "playerName"];
            checkFields(fields);
        });

    });

    describe('movement section', function () {

        beforeEach(function () {
            currentSection = "movement";
            clickSectionButton();
        });

        it('should have a text field for each ability', function () {
            var fields = ["speed"];
            checkFields(fields);
        });

    });

    describe('ability section', function () {

        beforeEach(function () {
            currentSection = "ability";
            clickSectionButton();
        });

        it('should have a text field for each ability', function () {
            var fields = ["strength", "constitution", "dexterity", "intelligence", "wisdom", "charisma"];
            checkFields(fields);
        });

    });

    describe('hp section', function () {

        beforeEach(function () {
            currentSection = "hp";
            clickSectionButton();
        });

        it('should have a text field for current and max hp', function () {
            var fields = ["current", "temporary", "max", "currentSurge", "maxSurge"];
            checkFields(fields);
        });

    });

    describe('defenses section', function () {

        beforeEach(function () {
            currentSection = "defenses";
            clickSectionButton();
        });

        it('should have a text field for each defense', function () {
            var fields = ["armor", "fortitude", "reflex", "will"];
            checkFields(fields);
        });

    });

    describe('skills section', function () {

        beforeEach(function () {
            currentSection = "skills";
            clickSectionButton();
        });

        it('should have a text field for training and bonus of each skill', function () {
            var skills = [
                "acrobatics",
                "arcana",
                "athletics",
                "bluff",
                "diplomacy",
                "dungeoneering",
                "endurance",
                "heal",
                "history",
                "insight",
                "intimidate",
                "nature",
                "perception",
                "religion",
                "stealth",
                "streetwise",
                "thievery",
                "alchemy"
            ];
            var fields = [];
            for (var i = 0; i < skills.length; i++) {
                fields.push(skills[i] + "-trained");
                fields.push(skills[i] + "-bonus");
            }
            checkFields(fields);
        });

    });

    describe('powers section', function () {

        beforeEach(function () {
            currentSection = "powers";
            clickSectionButton();
        });

        function checkPowerTextField(type, powerFields) {
            element(by.id(type + "Show")).click();
            waitForAngular();
            checkListFields(type, powerFields, function () {
                element(by.id(type + "Show")).click();
                waitForAngular();
            });
        }

        function checkDamagePower(type) {
            var powerFields = ["name", "numberDice", "text", new SelectFactory("ability-vs"), new SelectFactory("defense-vs"), new SelectFactory("ability-modifier")];
            checkPowerTextField(type, powerFields);
        }

        function checkBasicPower(type) {
            var powerFields = ["name", "text"];
            checkPowerTextField(type, powerFields);
        }

        it('should have a at will powers list', function () {
            checkDamagePower("atWill");
        });

        it('should have a encounter powers list', function () {
            checkDamagePower("encounter");
        });

        it('should have a daily powers list', function () {
            checkDamagePower("daily");
        });

        it('should have a utility powers list', function () {
            checkBasicPower("utility");
        });

    });

    describe('feats section', function () {

        beforeEach(function () {
            currentSection = "feats";
            clickSectionButton();
        });


        it('should have a feat list', function () {
            var featFields = ["name", "text"];
            var listName = "feat";
            checkListFields(listName, featFields);
        });

    });

    describe('equipments section', function () {

        beforeEach(function () {
            currentSection = "equipments";
            clickSectionButton();
        });


        it('should have a equipment list', function () {
            var equipmentFields = ["name", "text", new SelectFactory("position"), new PowerFactory("power", "add-power-equipment")];
            var listName = "equipment";
            checkListFields(listName, equipmentFields);
        });

    });

    describe('wealth section', function () {

        beforeEach(function () {
            currentSection = "wealth";
            clickSectionButton();
        });

        it('should have a text field for each wealth', function () {
            var fields = ["gold", "silver", "bronze"];
            checkFields(fields);
        });

    });

    describe('notes section', function () {

        beforeEach(function () {
            currentSection = "notes";
            clickSectionButton();
        });


        it('should have a note list', function () {
            var featFields = ["text"];
            var listName = "note";
            checkListFields(listName, featFields);
        });

    });

});