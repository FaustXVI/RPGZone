var reset = require('../dropCharacters').reset;
var insert = require('../dropCharacters').insert;


describe('Homepage', function () {

    beforeEach(function () {
        reset();
        browser.get('http://localhost:8080');
    });

    it('should have a create button', function () {
        var createButton = element(by.id("createCharacter"));
        expect(createButton).toBeDefined();
        expect(createButton).not.toBeNull();
        createButton.click();
        expect(browser.getCurrentUrl()).toEqual("http://localhost:8080/perso.html");
    });

});

describe('Homepage', function () {

    beforeEach(function () {
        reset();
        insert([
            {"id": {name: "Jim"}},
            {"id": {name: "Sarah"}}
        ]);
        browser.get('http://localhost:8080');
    });

    it('should have the list of characters', function () {
        var characters = element.all(by.css("li.character"));
        expect(characters.count()).toEqual(2);
    });

    it('should allow deletion of characters', function () {
        var characters = element.all(by.css("li.character"));
        expect(characters.count()).toEqual(2);
        characters.get(0).findElement(by.css(".btn-danger")).click();
        element(by.id("validate")).click();
        expect(characters.count()).toEqual(1);
    });

    it('should allow cancel deletion of characters', function () {
        var characters = element.all(by.css("li.character"));
        expect(characters.count()).toEqual(2);
        characters.get(0).findElement(by.css(".btn-danger")).click();
        element(by.id("invalidate")).click();
        expect(characters.count()).toEqual(2);
    });

});