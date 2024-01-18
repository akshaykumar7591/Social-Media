const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");
const sign_in_btn2 = document.querySelector("#sign-in-btn2");
const sign_up_btn2 = document.querySelector("#sign-up-btn2");
const err=document.getElementById("textError")

let username;
let email;
let password;

sign_up_btn.addEventListener("click", () => {
    container.classList.add("sign-up-mode");
    

});
sign_in_btn.addEventListener("click", () => {
    container.classList.remove("sign-up-mode");
});
sign_up_btn2.addEventListener("click", () => {
    container.classList.add("sign-up-mode2");
});
sign_in_btn2.addEventListener("click", () => {
    container.classList.remove("sign-up-mode2");
});



document.getElementsByClassName('register')[0].addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Get form values
    console.log("register")
   
    username = document.getElementById("username").value;
    email = document.getElementById('email').value;
    password = document.getElementById('password').value;
    // Create data object
    data = {
        name: username,
        email: email,
        password: password
    };
    
    
    const dataSend = JSON.stringify(data);
    console.log(username);

    var xhr = new XMLHttpRequest();

   
    xhr.open("Post", "http://localhost:3000/singUp",true)
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = function () {
        if (xhr.status === 200) {
            console.log("request successful ...");
            alert(xhr.responseText);
            console.log(xhr.responseText);
            // console.log(JSON.parse(xhr.responseText));


        }
        else if(xhr.status===201){
            alert(xhr.responseText)
        }
        else {
            console.log("failed", xhr.status);
        }
    }
    xhr.onerror = function () {
        console.log("request")

    }
    xhr.send(dataSend);

})


document.getElementsByClassName('login')[0].addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Get form values
    console.log("register123")
    username = document.getElementById("loginusername").value;
    password = document.getElementById('loginpassword').value;
    // Create data object
    data = {
        name: username,
        password: password
    };
    
    
    const dataSend = JSON.stringify(data);
    console.log(dataSend);

    var xhr = new XMLHttpRequest();
    // xhr.withCredentials = true;
    xhr.open("Post", "http://localhost:3000/singIn",true)
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = function () {
        if (xhr.status === 200) {
            console.log("request successful ...");
            const value=JSON.parse(xhr.responseText);
            // console.log(value.success);
            window.localStorage.setItem("token", value.token)
            window.localStorage.setItem("id", value.id)
            window.localStorage.setItem("username", value.username)
            // window.localStorage.setItem("username", value.username)
            // console.log(window.localStorage.token)
            alert(value.success);
            window.location.assign("../Home/home.html")
            // console.log(JSON.parse(xhr.responseText));


        }
        else if(xhr.status===201){
            alert(xhr.responseText)
        }
        else {
            console.log("failed", xhr.status);
        }
    }
    xhr.onerror = function () {
        console.log("request")

    }

   
    xhr.send(dataSend);

})

