var reset = require('./characterDAOTest').reset;

function waitForAngular() {
    protractor.getInstance().waitForAngular();
}

describe('Character creation page', function () {

    var saveButton;
    var currentSection;

    beforeEach(function () {
        reset();
        browser.get('http://localhost:8080/perso.html');
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
        expect(currentUrl).toMatch(/http:\/\/localhost:8080\/perso.html\?id=[0-9a-f]+/, "Url should change to match character id");
        currentUrl.then(function (res) {
            browser.get(res);
            clickSectionButton();
            callBack();
        });
    }

    function checkFieldSaved(model, value) {
        var field = element(by.id(model));
        expect(field.getAttribute("value")).toEqual(value, model + " value should be " + value);
    }

    function checkNoValue(field) {
        expect(field.getAttribute("value")).toEqual("", field + " value should be null");
    }

    function sendKeysToEmptyField(model, value) {
        var field = element(by.id(model));
        checkNoValue(field);
        field.sendKeys(value);
    }

    function checkFields(fields) {
        var field;
        var i;
        for (i = 0; i < fields.length; i++) {
            field = fields[i];
            sendKeysToEmptyField(field, "" + i);
        }
        checkSaveButton(function () {
            for (i = 0; i < fields.length; i++) {
                field = fields[i];
                checkFieldSaved(field, "" + i);
            }
        });
    }

    function checkListFields(listName, featFields) {
        var number = 2;
        var fields = [];
        for (var i = 0; i < number; i++) {
            element(by.id(listName + "Add")).click();
            waitForAngular();
            protractor.getInstance().waitForAngular();
            for (var j = 0; j < featFields.length; j++) {
                fields.push(listName + "-" + featFields[j] + "-" + i);
            }
        }
        checkFields(fields);
    }

    describe('id section', function () {

        beforeEach(function () {
            currentSection = "id";
            clickSectionButton();
        });

        it('should have a text field for each id field', function () {
            var fields = ["name", "class", "race", "level", "gender", "diety", "alignment", "paragonPath", "playerName"];
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
            var fields = ["current", "max"];
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
            checkListFields(type, powerFields);
        }

        function checkDamagePower(type) {
            var powerFields = ["name", "numberDice", "text"];
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
            var featFields = ["name", "text"];
            var listName = "equipment";
            checkListFields(listName, featFields);
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