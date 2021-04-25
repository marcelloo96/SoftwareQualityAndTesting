function Person(firstName, lastName, age, student, loyality, senior) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.isStudent = student;
    this.isLoyality = loyality;
    this.isSenior = senior;
    this.toString = function() { return  this.firstName + " " +
                                         this.lastName + " " + 
                                         this.age + " " +
                                         this.isStudent + " " +
                                         this.isLoyality + " " +
                                         this.isSenior}
}

var basket = []

function addToBasket(){

    var member = new Person(document.getElementById('firstName').value,
                            document.getElementById('lastName').value,
                            document.getElementById('age').value,
                            document.getElementById('student').checked,
                            document.getElementById('loyality').checked,
                            document.getElementById('senior').checked)

    
    var newMemberDiv = document.createElement('div'),
        newMemberNameDiv = document.createElement('div'),
        newMemberAgeDiv = document.createElement('div'),
        newMemberPriceDiv = document.createElement('div')

    newMemberNameDiv.innerHTML ="Name: "+ member.firstName +" "+member.lastName
    newMemberAgeDiv.innerHTML = "Age: "+ member.age
    newMemberPriceDiv.innerHTML = "Individual price without discounts: " + memberPrice(member) + "EUR";
    newMemberPriceDiv.className = "price"

    newMemberDiv.appendChild(newMemberNameDiv)
    newMemberDiv.appendChild(newMemberAgeDiv)
    newMemberDiv.appendChild(newMemberPriceDiv)
    
    document.getElementById('members').appendChild(newMemberDiv);

    console.log(member.toString())
    basket.push(member)
    
    var lowestPrice = getLowestPrice(basket)
    
    refreshTotalPrice(lowestPrice)

    document.getElementById('firstName').value = ""
    document.getElementById('lastName').value = ""
    document.getElementById('age').value = null
    document.getElementById('student').checked = false
    document.getElementById('loyality').checked = false
    document.getElementById('senior').checked = false 
}


function getLowestPrice(basket) {
    var discountedPrices = [
        regularPrice(basket),
        groupPrice(basket),
        familyPrice(basket),
        studentPrice(basket),
        loyalityPrice(basket),
        seniorPrice(basket)
    ]

    var lowestPrice = Number.MAX_SAFE_INTEGER

    for(let price of discountedPrices){
        if(price<lowestPrice){
            lowestPrice=price
        }
    }

    return Math.round(lowestPrice * 100) / 100
}

function memberPrice(person){
    if(person.age<3){
        return 0;
    }else if(person.age>=3 && person.age<=14){
        return 2.5;
    }else{
        return 5.5;
    }
}

function refreshTotalPrice(price){ 
    document.getElementById("totalPrice").innerHTML=price+" EUR"
}

function regularPrice(basket){
    var total=0

    for(let member of basket){
        total += memberPrice(member)
    }

    return total
}

function groupPrice(basket){
    total = 0
    loyaltyCards = 0

    for(let member of basket){
        total += memberPrice(member)
        if(member.isLoyality) {
            loyaltyCards++;
        }
    }

    if(basket.length>=15 && loyaltyCards >= 1){
        total*=0.92
        console.log("group price:" + total)
    }

    return total
}

function familyPrice(basket){
    total = 0
    studentIDs = 0
    numberOfAdults = 0
    numberOfChildren = 0

    for(let member of basket){
        if(member.age>=18){
            numberOfAdults++
        }else{
            if(member.isStudent) {
                studentIDs++;
            }
            numberOfChildren++
        }
        total += memberPrice(member)
    }

    if(numberOfAdults==2 && numberOfChildren>=3 && studentIDs == numberOfChildren){
        total*=0.91
        console.log("family price:" + total)
    }

    return total    
}

function studentPrice(basket){
    total = 0

    for(let member of basket){
        total += studentPricePerPerson(member)
    }

    return total    
}

function studentPricePerPerson(member){
    return member.isStudent ? memberPrice(member)*0.94 : memberPrice(member)
}


function loyalityPrice(basket){
    total = 0

    for(let member of basket){
        total += loyaltyPricePerPerson(member)
    }
    
    return total    
}

function loyaltyPricePerPerson(member){
    return member.isLoyality ? memberPrice(member)*0.95 : memberPrice(member)
}

function seniorPrice(basket){
    total = 0

    for(let member of basket){
        total += seniorPricePerPerson(member)
    }
    
    return total 
}

function seniorPricePerPerson(member){
    return member.isSenior ? memberPrice(member)*0.94 : memberPrice(member)
}
