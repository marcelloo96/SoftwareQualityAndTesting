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
    newMemberPriceDiv.innerHTML = memberPrice(member)
    newMemberPriceDiv.className = "price"

    newMemberDiv.appendChild(newMemberNameDiv)
    newMemberDiv.appendChild(newMemberAgeDiv)
    newMemberDiv.appendChild(newMemberPriceDiv)
    
    document.getElementById('members').appendChild(newMemberDiv);

    console.log(member.toString())
    basket.push(member)
    
    var discountedPrices = [
        regularPrice(),
        groupPrice(),
        familyPrice(),
        studentPrice(),
        loyalityPrice(),
        seniorPrice()
    ]

    var lowestPrice = Number.MAX_SAFE_INTEGER

    for(let price of discountedPrices){
        if(price<lowestPrice){
            lowestPrice=price
        }
    }
    
    refreshTotalPrice(Math.round(lowestPrice * 100) / 100)
}

function memberPrice(person){
    if(person.age<3){
        return 0;
    }else if(person.age>3 && person.age<14){
        return 2.5;
    }else{
        return 5.5;
    }
}

function refreshTotalPrice(price){ 
    document.getElementById("totalPrice").innerHTML=price+" EUR"
}

function regularPrice(){
    var total=0

    for(let member of basket){
        total += memberPrice(member)
    }

    return total
}

function groupPrice(){
    total = 0

    for(let member of basket){
        total += memberPrice(member)
    }

    if(basket.length>=15){
        total*=0.92
        console.log("group price:" + total)
    }

    return total
}

function familyPrice(){
    total = 0
    numberOfAdults = 0
    numberOfChildren = 0

    for(let member of basket){
        if(member.age>=18){
            numberOfAdults++
        }else{
            numberOfChildren++
        }
        total += memberPrice(member)
    }

    if(numberOfAdults==2 && numberOfChildren>=3){
        total*=0.91
        console.log("family price:" + total)
    }

    return total    
}

function studentPrice(){
    total = 0

    for(let member of basket){
        if(member.isStudent){
            total += memberPrice(member)*0.94
        }else{
            total += memberPrice(member)
        }
    }

    return total    
}

function loyalityPrice(){
    total = 0

    for(let member of basket){
        if(member.isLoyality){
            total += memberPrice(member)*0.95
        }else{
            total += memberPrice(member)
        }
    }
    
    return total    
}

function seniorPrice(){
    total = 0

    for(let member of basket){
        if(member.isSenior){
            total += memberPrice(member)*0.94
        }else{
            total += memberPrice(member)
        }
    }
    
    return total 
}
