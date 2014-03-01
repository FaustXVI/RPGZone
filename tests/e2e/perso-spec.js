var reset = require('characterDAOTest').reset;

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

    function checkSaveButton() {
        expect(saveButton.isDisplayed()).toBe(true, "Save button is not display");
        saveButton.click();
        expect(saveButton.isDisplayed()).toBe(false, "Save button is still display");
    }

    function checkFieldSaved(model, value) {
        var currentUrl = browser.getCurrentUrl();
        expect(currentUrl).toMatch(/http:\/\/localhost:8080\/perso.html\?id=[0-9a-f]+/, "Url should change to match character id");
        currentUrl.then(function (res) {
            browser.get(res);
            clickSectionButton();
            var field = element(by.model(model));
            expect(field.getAttribute("value")).toEqual(value, model + " value should be " + value);
        });
    }

    function checkNoValue(field) {
        expect(field.getAttribute("value")).toEqual("", field + " value should be null");
    }

    function checkTextField(model, value) {
        var field = element(by.model(model));
        checkNoValue(field);
        field.sendKeys(value);
        checkSaveButton();
        checkFieldSaved(model, value);
    }

    describe('id section', function () {

        var idNameInScope = characterNameInScope + ".id";

        beforeEach(function () {
            currentSection = "id";
            clickSectionButton();
        });

        it('should have a text field for name', function () {
            var model = idNameInScope + ".name";
            var value = "testName";
            checkTextField(model, value);
        });

        it('should have a text field for class', function () {
            var model = idNameInScope + ".class";
            var value = "testClass";
            checkTextField(model, value);
        });

        it('should have a text field for race', function () {
            var model = idNameInScope + ".race";
            var value = "testRace";
            checkTextField(model, value);
        });

        it('should have a text field for level', function () {
            var model = idNameInScope + ".level";
            var value = "12";
            checkTextField(model, value);
        });

        it('should have a text field for gender', function () {
            var model = idNameInScope + ".gender";
            var value = "testGender";
            checkTextField(model, value);
        });

        it('should have a text field for alignment', function () {
            var model = idNameInScope + ".alignment";
            var value = "testAlignment";
            checkTextField(model, value);
        });

        it('should have a text field for paragon path', function () {
            var model = idNameInScope + ".paragonPath";
            var value = "testParagonPath";
            checkTextField(model, value);
        });

        it('should have a text field for player name', function () {
            var model = idNameInScope + ".playerName";
            var value = "testPlayerName";
            checkTextField(model, value);
        });

    });

    describe('movement section', function () {

        var idNameInScope = characterNameInScope + ".movement";

        beforeEach(function () {
            currentSection = "movement";
            clickSectionButton();
        });

        it('should have a text field for speed', function () {
            var model = idNameInScope + ".speed";
            var value = "42";
            checkTextField(model, value);
        });
    });

    describe('ability section', function () {

        var idNameInScope = characterNameInScope + ".ability";

        beforeEach(function () {
            currentSection = "ability";
            clickSectionButton();
        });

        it('should have a text field for strength', function () {
            var model = idNameInScope + ".strength";
            var value = "42";
            checkTextField(model, value);
        });

        it('should have a text field for constitution', function () {
            var model = idNameInScope + ".constitution";
            var value = "42";
            checkTextField(model, value);
        });

        it('should have a text field for dexterity', function () {
            var model = idNameInScope + ".dexterity";
            var value = "42";
            checkTextField(model, value);
        });

        it('should have a text field for intelligence', function () {
            var model = idNameInScope + ".intelligence";
            var value = "42";
            checkTextField(model, value);
        });

        it('should have a text field for wisdom', function () {
            var model = idNameInScope + ".wisdom";
            var value = "42";
            checkTextField(model, value);
        });

        it('should have a text field for charisma', function () {
            var model = idNameInScope + ".charisma";
            var value = "42";
            checkTextField(model, value);
        });

    });

});