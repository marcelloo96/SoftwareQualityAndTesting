describe('1. a. Given a person under the age of 2 with no discounts', () => {
    it('The entrance fee should be 0 EUR.', () => {
        var ageTwo = new Person("James", "Johnson", 2, false, false, false);
        var ageOne = new Person("Jeremy", "Johnson", 1, false, false, false);
        expect(memberPrice(ageTwo)).toBe(0);
        expect(memberPrice(ageOne)).toBe(0);
    })
});

describe('1. b. Given a person between the age of 3 and 14 with no discounts', () => {
    it('The entrance fee should be 2.5 EUR.', () => {
        var ageThree = new Person("James", "Johnson", 3, false, false, false);
        var teenager = new Person("Jeremy", "Johnson", 14, false, false, false);
        var child = new Person("Jonah", "Johnson", 8, false, false, false);

        expect(memberPrice(ageThree)).toBe(2.5);
        expect(memberPrice(teenager)).toBe(2.5);
        expect(memberPrice(child)).toBe(2.5);
    })
});

describe('1. c. Given a person above 14 years old with no discounts', () => {
    it('The entrance fee should be 5.5 EUR.', () => {
        var child = new Person("James", "Johnson", 14, false, false, false);
        expect(memberPrice(child)).toBeLessThan(5.5);

        var adult = new Person("Jenny", "Johnson", 15, false, false, false);
        expect(memberPrice(adult)).toBe(5.5);

        var adult2 = new Person("Jonathan", "Johnson", 25, false, false, false);
        expect(memberPrice(adult2)).toBe(5.5);
    })
});

describe('2. a. Given a person with student ID and no other cards', () => {
    it('The entrance fee should be 6% off its regular price.', () => {
        var student = new Person("James", "Johnson", 18, true, false, false);
        var childStudent = new Person("James", "Johnson", 14, true, false, false);
        var child = new Person("James", "Johnson", 14, false, false, false);
        expect(studentPricePerPerson(student)).toBe(5.5 * 0.94);
        expect(studentPricePerPerson(childStudent)).toBe(2.5 * 0.94);
        expect(studentPricePerPerson(child)).toBe(2.5);
    })
});

describe('2. b. Given a person with loyalty card and no other cards', () => {
    it('The entrance fee should be 5% off its regular price.', () => {
        var loyal = new Person("James", "Johnson", 18, false, true, false);
        var notLoyal = new Person("James", "Johnson", 18, false, false, false);
        var loyalChild = new Person("James", "Johnson", 14, false, true, false);

        expect(loyaltyPricePerPerson(loyal)).toBe(5.5 * 0.95);
        expect(loyaltyPricePerPerson(notLoyal)).toBe(5.5);
        expect(loyaltyPricePerPerson(loyalChild)).toBe(2.5 * 0.95);
    })
});

describe('2. c. Given a person with senior ID and no other cards', () => {
    it('The entrance fee should be 6% off its regular price.', () => {
        var senior = new Person("James", "Johnson", 65, false, false, true);
        var notSenior = new Person("James", "Johnson", 55, false, false, false);
        
        expect(seniorPricePerPerson(senior)).toBe(5.5 * 0.94);
        expect(seniorPricePerPerson(notSenior)).toBe(5.5);
    })
});

// var member = new Person(firstName, lastName, age, student, loyality, senior)

describe('2. d. Given a person with student ID and loyalty card', () => {
    it('The entrance fee should be 6% off its regular price.', () => {
        var loyalStudent = new Person("James", "Johnson", 65, true, true, false);
        var loyalChildStudent = new Person("Jeremy", "Johnson", 14, true, true, false);
        
        expect(getLowestPrice([loyalStudent])).toBe(5.5 * 0.94);
        expect(getLowestPrice([loyalChildStudent])).toBe(2.5 * 0.94);
    })
});

describe('2. e. Given a person with student ID and senior ID', () => {
    it('The entrance fee should be 6% off its regular price.', () => {
        var seniorStudent = new Person("James", "Johnson", 65, true, false, true);
        
        expect(getLowestPrice([seniorStudent])).toBe(5.5 * 0.94);
    })
});

describe('2. f. Given a person with loyalty card and senior ID', () => {
    it('The entrance fee should be 6% off its regular price.', () => {
        var loyalSenior = new Person("James", "Johnson", 65, false, true, true);
        
        expect(getLowestPrice([loyalSenior])).toBe(5.5 * 0.94);
    })
});

describe('2. g. Given a person with student ID, loyalty card and senior ID', () => {
    it('The entrance fee should be 6% off its regular price.', () => {
        var loyalSenior = new Person("James", "Johnson", 65, true, true, true);
        
        expect(getLowestPrice([loyalSenior])).toBe(5.5 * 0.94);
    })
});