//sidebar
// const validate=require("../middleware/auth")
const menuItems = document.querySelectorAll('.menu-item');
const messagesNotification = document.querySelector('#messages-notifications');
const messages = document.querySelector('.messages');
const message = messages.querySelectorAll('.message');
const messageSearch = document.querySelector('#message-search');
const signIn=document.querySelector('#signIn')
const signOut=document.querySelector('#signOut');

(function(){
    if(window.localStorage.getItem("token")!=undefined){
        signIn.style.display="none";
        signOut.style.display="block";
    }
    else{
        signIn.style.display="block";
        signOut.style.display="none";
    }

    })();
//remove active class from all menu items
const changeActiveItem = () => {
    menuItems.forEach(item => {
        item.classList.remove('active');
    })
}
signIn.addEventListener("click",()=>{
    console.log("inside signIn")
    window.location.assign("../Login/login.html");
   
})

signOut.addEventListener("click",()=>{
    window.localStorage.clear();
    signIn.style.display="block";
    signOut.style.display="none";
    window.location.assign("../Home/home.html")
})
 

menuItems.forEach(item => {
    item.addEventListener('click', () => {
        changeActiveItem();
        item.classList.add('active');
        
        if (item.id != 'notifications') {
            document.querySelector('.notifications-popup').style.display = 'none';
        } else {
            document.querySelector('.notifications-popup').style.display = 'block';
            document.querySelector('#notifications .notification-count').style.display='none';
        }
    })
})


const searchMessage = () => {
    const val = messageSearch.value.toLowerCase();
    message.forEach(chat => {
        let name=chat.querySelector('h5').textContent.toLowerCase();
        if(name.indexOf(val) != -1){
            chat.style.display = 'flex';
        } else{
            chat.style.display = 'none';
        }
    })
}

messageSearch.addEventListener('keyup', searchMessage);


messagesNotification.addEventListener('click', () => {
    messages.style.boxShadow = '0 0 1rem var(--color-primary)';
    messagesNotification.querySelector('.notification-count').style.display = 'none';
    setTimeout(() => {
        messages.style.boxShadow = 'none';
    }, 2000);
})