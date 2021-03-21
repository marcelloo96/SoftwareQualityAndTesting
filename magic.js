function Person(firstName, lastName, age) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.toString = function() { return  this.firstName + this.lastName + this.age;}
}

function add_member(){

    var member = new Person(document.getElementById('firstName').value,
                            document.getElementById('lastName').value,
                            document.getElementById('age').value)

    
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

    refreshTotalPrice()
}

function memberPrice(person){
    if(person.age<3){
        return 0;
    }else if(person.age>3 && person.age<14){
        return 700;
    }else{
        return 1500;
    }
}

function refreshTotalPrice(){
    var prices = document.getElementsByClassName("price")
    var sum=0

    for(let price of prices){
        sum+=parseInt(price.innerHTML)
    }
    
    document.getElementById("totalPrice").innerHTML=sum+" Ft"
}