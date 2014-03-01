var reset = require('./characterDAOTest').reset;

describe('Character creation page', function () {

    var saveButton;
    var currentSection;
    var characterNameInScope = "character";

    beforeEach(function () {
        reset();
        browser.get('http://localhost:8080/perso.html');
        saveButton = element(by.id("saveButton"));
    });

    function clickSectionButton() {
        element(by.id(currentSection + "Button")).click();
    }

    function checkSaveButton(callBack) {
        expect(saveButton.isDisplayed()).toBe(true, "Save button is not display");
        saveButton.click();
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
        var field = element(by.model(model));
        expect(field.getAttribute("value")).toEqual(value, model + " value should be " + value);
    }

    function checkNoValue(field) {
        expect(field.getAttribute("value")).toEqual("", field + " value should be null");
    }

    function sendKeysToEmptyField(model, value) {
        var field = element(by.model(model));
        checkNoValue(field);
        field.sendKeys(value);
    }


    function checkFields(fields, idNameInScope) {
        var field;
        var i;
        for (i = 0; i < fields.length; i++) {
            field = fields[i];
            sendKeysToEmptyField(idNameInScope + "." + field, "" + i);
        }
        checkSaveButton(function () {
            for (i = 0; i < fields.length; i++) {
                field = fields[i];
                checkFieldSaved(idNameInScope + "." + field, "" + i);
            }
        });
    }


    describe('id section', function () {

        var idNameInScope = characterNameInScope + ".id";

        beforeEach(function () {
            currentSection = "id";
            clickSectionButton();
        });

        it('should have a text field for each id field', function () {
            var fields = ["name", "class", "race", "level", "gender", "diety", "alignment", "paragonPath", "playerName"];
            checkFields(fields, idNameInScope);
        });

    });

    describe('movement section', function () {

        var idNameInScope = characterNameInScope + ".movement";

        beforeEach(function () {
            currentSection = "movement";
            clickSectionButton();
        });

        it('should have a text field for each ability', function () {
            var fields = ["speed"];
            checkFields(fields, idNameInScope);
        });

    });

    describe('ability section', function () {

        var idNameInScope = characterNameInScope + ".ability";

        beforeEach(function () {
            currentSection = "ability";
            clickSectionButton();
        });

        it('should have a text field for each ability', function () {
            var fields = ["strength", "constitution", "dexterity", "intelligence", "wisdom", "charisma"];
            checkFields(fields, idNameInScope);
        });

    });

    describe('hp section', function () {

        var idNameInScope = characterNameInScope + ".hp";

        beforeEach(function () {
            currentSection = "hp";
            clickSectionButton();
        });

        it('should have a text field for current and max hp', function () {
            var fields = ["current", "max"];
            checkFields(fields, idNameInScope);
        });

    });

    describe('defenses section', function () {

        var idNameInScope = characterNameInScope + ".defenses";

        beforeEach(function () {
            currentSection = "defenses";
            clickSectionButton();
        });

        it('should have a text field for each defense', function () {
            var fields = ["armor", "fortitude", "reflex", "will"];
            checkFields(fields, idNameInScope);
        });

    });

    describe('skills section', function () {

        var idNameInScope = characterNameInScope + ".skills";

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
                fields.push(skills[i] + ".trained");
                fields.push(skills[i] + ".bonus");
            }
            checkFields(fields, idNameInScope);
        });

    });

});