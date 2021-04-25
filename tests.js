function getRoundedPrice(price) {
    return Math.round(price * 100) / 100
}

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
    it('Student discount: 6% off regular price.', () => {
        var student = new Person("James", "Johnson", 18, true, false, false);
        var childStudent = new Person("James", "Johnson", 14, true, false, false);
        var child = new Person("James", "Johnson", 14, false, false, false);
        expect(studentPricePerPerson(student)).toBe(5.5 * 0.94);
        expect(studentPricePerPerson(childStudent)).toBe(2.5 * 0.94);
        expect(studentPricePerPerson(child)).toBe(2.5);
    })
});

describe('2. b. Given a person with loyalty card and no other cards', () => {
    it('Loyalty discount: 5% off regular price.', () => {
        var loyal = new Person("James", "Johnson", 18, false, true, false);
        var notLoyal = new Person("James", "Johnson", 18, false, false, false);
        var loyalChild = new Person("James", "Johnson", 14, false, true, false);

        expect(loyaltyPricePerPerson(loyal)).toBe(5.5 * 0.95);
        expect(loyaltyPricePerPerson(notLoyal)).toBe(5.5);
        expect(loyaltyPricePerPerson(loyalChild)).toBe(2.5 * 0.95);
    })
});

describe('2. c. Given a person with senior ID and no other cards', () => {
    it('Student discount: 6% off regular price.', () => {
        var senior = new Person("James", "Johnson", 65, false, false, true);
        var notSenior = new Person("James", "Johnson", 55, false, false, false);
        
        expect(seniorPricePerPerson(senior)).toBe(5.5 * 0.94);
        expect(seniorPricePerPerson(notSenior)).toBe(5.5);
    })
});

// var member = new Person(firstName, lastName, age, student, loyality, senior)

describe('2. d. Given a person with student ID and loyalty card', () => {
    it('Student discount: 6% off regular price.', () => {
        var loyalStudent = new Person("James", "Johnson", 65, true, true, false);
        var loyalChildStudent = new Person("Jeremy", "Johnson", 14, true, true, false);
        
        expect(getLowestPrice([loyalStudent])).toBe(getRoundedPrice(5.5 * 0.94));
        expect(getLowestPrice([loyalChildStudent])).toBe(getRoundedPrice(2.5 * 0.94));
    })
});

describe('2. e. Given a person with student ID and senior ID', () => {
    it('Senior discount: 6% off regular price.', () => {
        var seniorStudent = new Person("James", "Johnson", 65, true, false, true);
        
        expect(getLowestPrice([seniorStudent])).toBe(getRoundedPrice(5.5 * 0.94));
    })
});

describe('2. f. Given a person with loyalty card and senior ID', () => {
    it('Senior discount: 6% off regular price.', () => {
        var loyalSenior = new Person("James", "Johnson", 65, false, true, true);
        
        expect(getLowestPrice([loyalSenior])).toBe(getRoundedPrice(5.5 * 0.94));
    })
});

describe('2. g. Given a person with student ID, loyalty card and senior ID', () => {
    it('Senior discount: 6% off regular price.', () => {
        var loyalSenior = new Person("James", "Johnson", 65, true, true, true);
        
        expect(getLowestPrice([loyalSenior])).toBe(getRoundedPrice(5.5 * 0.94));
    })
});

describe('3. a. Given a group with 15 or more people, at least one of them having loyalty card', () => {
    it('Group discount: 8% off regular price for each person.', () => {
        var loyalSenior = new Person("James", "Johnson", 65, false, true, true);
        var basket = []
        for(i = 0; i < 15; i++) {
            basket.push(loyalSenior)
        }
        
        expect(groupPrice(basket)).toBe(5.5 * 0.92 * 15);
        expect(getLowestPrice(basket)).toBe(getRoundedPrice(groupPrice(basket)));

        var basket2 = []
        for(i = 0; i < 14; i++) {
            basket2.push(loyalSenior)
        }
        
        expect(getLowestPrice(basket2)).not.toBe(getRoundedPrice(groupPrice(basket2)));

        var child = new Person("Joanna", "Johnson", 10, true, false, false);
        var teacher = new Person("Jennifer", "Johnson", 25, false, true, false);
        var fourthGrade = []
        for(i = 0; i < 14; i++) {
            fourthGrade.push(child)
        }
        fourthGrade.push(teacher);
        
        expect(groupPrice(fourthGrade)).toBe(5.5 * 0.92 + 2.5 * 0.92 * 14);
        expect(getLowestPrice(fourthGrade)).toBe(getRoundedPrice(groupPrice(fourthGrade)));
    })
});

describe('3. b. Given a group with 2 adults and 3 or more children, all children having student IDs', () => {
    it('Family discount: 9% off regular price for each person.', () => {
        var mom = new Person("Jeanette", "Johnson", 36, false, true, false);
        var dad = new Person("James", "Johnson", 42, false, true, false);
        var jennifer = new Person("Jennifer", "Johnson", 12, true, false, false);
        var jeremy = new Person("Jeremy", "Johnson", 14, true, false, false);
        var jack = new Person("Jack", "Johnson", 15, true, false, false);
        var jamesFamily = [mom, dad, jennifer, jeremy, jack];
        
        expect(familyPrice(jamesFamily)).toBe(5.5 * 0.91 * 3 + 2.5 * 0.91 * 2);
        expect(regularPrice(jamesFamily)).toBe(5.5 * 3 + 2.5 * 2);
        expect(getLowestPrice(jamesFamily)).toBe(getRoundedPrice(familyPrice(jamesFamily)));

        var smallFamily = [mom, dad, jack]
        expect(familyPrice(smallFamily)).toBe(regularPrice(smallFamily));

        var singleMomFamily = [mom, jeremy];
        expect(familyPrice(singleMomFamily)).toBe(regularPrice(singleMomFamily));
    })
});

