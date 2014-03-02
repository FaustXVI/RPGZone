var reset = require('./characterDAOTest').reset;
var insert = require('./characterDAOTest').insert;


describe('Homepage', function () {

    describe('create button', function () {

        beforeEach(function () {
            reset();
            browser.get('http://localhost:8000');
        });

        it('should go to creation page', function () {
            var createButton = element(by.id("createCharacter"));
            expect(createButton).toBeDefined();
            expect(createButton).not.toBeNull();
            createButton.click();
            expect(browser.getCurrentUrl()).toEqual("http://localhost:8000/perso.html");
        });
    });

    describe('character list', function () {

        beforeEach(function () {
            reset();
            insert([
                {"id": {name: "Jim"}},
                {"id": {name: "Sarah"}}
            ]);
            browser.get('http://localhost:8080');
        });

        it('should show all characters', function () {
            var characters = element.all(by.css("li.character"));
            expect(characters.count()).toEqual(2);
        });

        it('should allow character deletion', function () {
            var characters = element.all(by.css("li.character"));
            expect(characters.count()).toEqual(2);
            characters.get(0).findElement(by.css(".btn-danger")).click();
            element(by.id("validate")).click();
            expect(characters.count()).toEqual(1);
        });

        it('should allow to cancel character deletion', function () {
            var characters = element.all(by.css("li.character"));
            expect(characters.count()).toEqual(2);
            characters.get(0).findElement(by.css(".btn-danger")).click();
            element(by.id("invalidate")).click();
            expect(characters.count()).toEqual(2);
        });

    });

});