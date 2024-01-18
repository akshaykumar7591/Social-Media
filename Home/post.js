
const profilePic = document.getElementById("uploadpicture");
// let newProfile = document.querySelectorAll(".newProfile");
const post = document.querySelector(".mind");
const createPost = document.querySelector(".addPost");
const cross = document.querySelector(".cro");
const container = document.querySelector(".container");
const posted = document.querySelector(".posted");
const textArea = document.getElementById("txt");
const postPic = document.querySelector(".post-pic");
const uploadPhoto = document.getElementById("post-picture");
const inside = document.querySelector(".inside2");
const profilePhoto = document.querySelectorAll(".profilePhoto");
let postName = document.querySelector(".post-name");
postName.innerHTML = window.localStorage.getItem("username")
let username1=document.querySelector("#userName")

let userimage;
 


username1.innerHTML=window.localStorage.getItem("username");
if (post) {

  post.addEventListener("click", () => {
    const token = window.localStorage.getItem("token");
    // const valid=jwt.verify(token,process.env.SECRET_KEY)
    if (token == undefined) {
      alert("Please LogIn ")
      return;
    }
    console.log("akdjkajsd")
    createPost.classList.remove("activePost");
    container.classList.add("activeCon");
  });
}
if (cross) {
  cross.addEventListener("click", () => {
    createPost.classList.add("activePost");
    container.classList.remove("activeCon");
    document.querySelector(".noPic").classList.remove("disableNopic");
    document.querySelector(".post-pic").classList.add("disableImg");
    posted.classList.add("disable");

    textArea.value = "";
    check = true;
  });
}

// outside the div

const convertBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

if (profilePic ) {
  profilePic.addEventListener("change", async () => {

    try {
      const token = window.localStorage.getItem("token");
      // const valid=jwt.verify(token,process.env.SECRET_KEY)
      if (token == undefined) {
        alert("Please Login ")
        return;
      }

     
      let base641=profilePic.files[0].name;
      
        let image = {
          name:base641
        }

        let dataSend=JSON.stringify(image)
        console.log(dataSend)

        var xhr = new XMLHttpRequest();
        let id=window.localStorage.getItem("id")
        console.log(id)
        xhr.open('POST', `http://localhost:3000/addImage/${id}`);
        // console.log()
        xhr.setRequestHeader("Content-Type", "application/json");
         xhr.onload  = function () {
          if ( xhr.status === 200) {
            // var posts = JSON.parse(xhr.responseText);
            const value=JSON.parse(xhr.responseText);
            window.localStorage.setItem("photo",value.image)
            userimage=value.image
            console.log("user photo done")
          }
          else {
            console.log("failed", xhr.status);
          }
        }
        xhr.onerror = function () {
          console.log("request")
    
        }

        
        xhr.send(dataSend);
      
  
      

      const len = profilePhoto.length;

      for (let i = 0; i < len; i++) {

        profilePhoto[i].src = window.localStorage.getItem("photo");
        // profilePhoto[i].src=URL.createObjectURL(profilePic.files[0])
      }
      profilePic.style.display = "none";
    }
    catch (e) {
      console.log(e);
    }


  });
};
(function (){
  if(window.localStorage.getItem("photo")!=null){
  const len = profilePhoto.length;

      for (let i = 0; i < len; i++) {

        profilePhoto[i].src = window.localStorage.getItem("photo");
        // profilePhoto[i].src=URL.createObjectURL(profilePic.files[0])
      }
      profilePic.style.display = "none";
    }
})();



let check = true;
if (uploadPhoto) {
  uploadPhoto.addEventListener("change", () => {
    postPic.src = URL.createObjectURL(uploadPhoto.files[0]);
    document.querySelector(".noPic").classList.add("disableNopic");
    document.querySelector(".post-pic").classList.remove("disableImg");
    posted.classList.remove("disable");

    check = false;
  });
}


if (textArea) {
  textArea.addEventListener("input", () => {
    console.log(" oho ki haal chall ");
    let val = textArea.value;
    console.log(val, val.length);
    if (parseInt(val.length) == 0 && check) {
      posted.classList.add("disable");
    } else {
      posted.classList.remove("disable");
    }
  });
}

let nameArray = [];
let imgPath = [];


let profileImg = [];

let description = [];
let timig = [];

let likeCounter = [];
const map = {};

inside.addEventListener("click", (event) => {
  console.log(event.target);
  if (event.target.parentNode.closest('.cros')) {
    map[event.target.parentNode.id] = "1";
    // console.log("event " , map[event.target.parentNode.id]);
    const item = event.target.parentNode.parentNode.parentNode.parentNode;
    inside.removeChild(item);
  }
  let clickedEle = event.target;

  let topmost = clickedEle.closest('.doLike');
  if (topmost) {
    console.log(" top " + topmost);
    console.log(topmost);
    const parent = topmost.parentNode.parentNode;
    console.log(parent);
    const parentId = parent.querySelector(".cros").id;
    const likeP = parent.querySelector(".countLike");
    likeP.innerText = parseInt(likeP.innerText) + 1;
    likeCounter[parseInt(parentId)] = likeP.innerText;
  }

})

function loading(post) {

  const grandParent = document.createElement("div");
  const start = document.createElement("div");
  const leftPart = document.createElement("div");
  const profile = document.createElement("div");
  profile.setAttribute("id", "profil");
  const profilePostLogo = document.createElement("img");

  profilePostLogo.src = window.localStorage.getItem("photo");
  profile.appendChild(profilePostLogo);

  const info = document.createElement("info");
  const intro = document.createElement("p");
  intro.innerText = window.localStorage.getItem('username')
  info.appendChild(intro);
  const pref = document.createElement("pre")

  pref.innerHTML = `${post.time}`;
  info.appendChild(pref);

  const rightPart = document.createElement("div");
  rightPart.innerHTML = `
   <div  class="threeDot hov">
       <div class="dot"></div>
       <div class="dot"></div>
       <div class="dot"></div>
    </div>
    <div class="cros hov" id="${0}">
       <i data-visualcompletion="css-img" class="x1b0d499 x1d69dk1" style="background-image: url(&quot;https://static.xx.fbcdn.net/rsrc.php/v3/yd/r/L1k-kkbTA1u.png&quot;); background-position: 0px -110px; background-size: 190px 182px; width: 20px; height: 20px; background-repeat: no-repeat; display: inline-block;"></i>

    </div>
   `;

  const pref2 = document.createElement("pre");

  pref2.innerHTML = post.content;


  const postPicture = document.createElement("img");

  postPicture.src = post.photo;
  postPicture.style.width = "100%";
  postPicture.style.height = "500px";
  postPicture.style.borderRadius = "10px";

  postPicture.classList.add("post-photo");


  const counter = document.createElement("div");
  counter.innerHTML = `
   <div class="like">
   <img class="x16dsc37" height="18" role="presentation" src="data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 16 16'%3e%3cdefs%3e%3clinearGradient id='a' x1='50%25' x2='50%25' y1='0%25' y2='100%25'%3e%3cstop offset='0%25' stop-color='%2318AFFF'/%3e%3cstop offset='100%25' stop-color='%230062DF'/%3e%3c/linearGradient%3e%3cfilter id='c' width='118.8%25' height='118.8%25' x='-9.4%25' y='-9.4%25' filterUnits='objectBoundingBox'%3e%3cfeGaussianBlur in='SourceAlpha' result='shadowBlurInner1' stdDeviation='1'/%3e%3cfeOffset dy='-1' in='shadowBlurInner1' result='shadowOffsetInner1'/%3e%3cfeComposite in='shadowOffsetInner1' in2='SourceAlpha' k2='-1' k3='1' operator='arithmetic' result='shadowInnerInner1'/%3e%3cfeColorMatrix in='shadowInnerInner1' values='0 0 0 0 0 0 0 0 0 0.299356041 0 0 0 0 0.681187726 0 0 0 0.3495684 0'/%3e%3c/filter%3e%3cpath id='b' d='M8 0a8 8 0 00-8 8 8 8 0 1016 0 8 8 0 00-8-8z'/%3e%3c/defs%3e%3cg fill='none'%3e%3cuse fill='url(%23a)' xlink:href='%23b'/%3e%3cuse fill='black' filter='url(%23c)' xlink:href='%23b'/%3e%3cpath fill='white' d='M12.162 7.338c.176.123.338.245.338.674 0 .43-.229.604-.474.725a.73.73 0 01.089.546c-.077.344-.392.611-.672.69.121.194.159.385.015.62-.185.295-.346.407-1.058.407H7.5c-.988 0-1.5-.546-1.5-1V7.665c0-1.23 1.467-2.275 1.467-3.13L7.361 3.47c-.005-.065.008-.224.058-.27.08-.079.301-.2.635-.2.218 0 .363.041.534.123.581.277.732.978.732 1.542 0 .271-.414 1.083-.47 1.364 0 0 .867-.192 1.879-.199 1.061-.006 1.749.19 1.749.842 0 .261-.219.523-.316.666zM3.6 7h.8a.6.6 0 01.6.6v3.8a.6.6 0 01-.6.6h-.8a.6.6 0 01-.6-.6V7.6a.6.6 0 01.6-.6z'/%3e%3c/g%3e%3c/svg%3e" width="18">                   
   <p class = "countLike">${45}</p>
   
</div>
<div class="shares">
   <pre><span>45 </span>comments</pre>
   <pre><span>34 </span>shares</pre>
</div>
   
   `;

  const command = document.createElement("div");
  command.innerHTML = `
   <div class="doLike"> 
   <i data-visualcompletion="css-img" class="x1b0d499 x1d69dk1" style="background-image: url(&quot;https://static.xx.fbcdn.net/rsrc.php/v3/yN/r/fSIH5kPU1qz.png&quot;); background-position: 0px -180px; background-size: 26px 556px; width: 18px; height: 18px; background-repeat: no-repeat; display: inline-block;"></i>
   <p>Like</p>
</div>
<div>
   <i data-visualcompletion="css-img" class="x1b0d499 x1d69dk1" style="background-image: url(&quot;https://static.xx.fbcdn.net/rsrc.php/v3/yN/r/fSIH5kPU1qz.png&quot;); background-position: 0px -140px; background-size: 26px 556px; width: 18px; height: 18px; background-repeat: no-repeat; display: inline-block;"></i>       
    <p>Comment</p>
</div>
<div>
   <i data-visualcompletion="css-img" class="x1b0d499 x1d69dk1" style="background-image: url(&quot;https://static.xx.fbcdn.net/rsrc.php/v3/yN/r/fSIH5kPU1qz.png&quot;); background-position: 0px -200px; background-size: 26px 556px; width: 18px; height: 18px; background-repeat: no-repeat; display: inline-block;"></i>
    <p>Share</p>
</div>
   `;

  // now concatinate
  grandParent.appendChild(start);
  start.appendChild(leftPart);
  start.appendChild(rightPart);
  leftPart.appendChild(profile);
  leftPart.appendChild(info);
  grandParent.appendChild(pref2); //

  grandParent.appendChild(postPicture); //
  // console.log(inside);
  grandParent.appendChild(counter);//
  grandParent.appendChild(command);
  inside.appendChild(grandParent);

  //   add classes
  grandParent.classList.add("new-post");
  start.classList.add("start");
  leftPart.classList.add("leftPart");
  rightPart.classList.add("rightPart");
  info.classList.add("info");
  pref2.classList.add("des");
  counter.classList.add("counter");
  command.classList.add("command");
  // grandParent.style.gap="1.3em"
}



if (posted) {
  posted.addEventListener("click", async () => {
    //    createPost.style.display="none"


    createPost.classList.add("activePost");
    console.log("ki hall hai")

    let val = textArea.value;
    console.log("val " + val);
    description.push(val);



    console.log(" poast name hai ye " + postName)
    nameArray.push(postName);

    if (postPic.src != "http://127.0.0.1:5500/welcome.html") {
      imgPath.push(postPic.src);
      postPic.src = "";
    }
    else {
      imgPath.push("");
    }
    const sr = profilePhoto[0].src;


    profileImg.push(`${sr}`);



    likeCounter.push(0);
    const date = new Date();
    console.log(date);
    timig.push(`${date.getDate()}`);
    inside.innerHTML = "";

    createPost.classList.add("activePost");
    container.classList.remove("activeCon");
    document.querySelector(".noPic").classList.remove("disableNopic");
    document.querySelector(".post-pic").classList.add("disableImg");
    posted.classList.add("disable");

    textArea.value = "";
    check = true;



    let base64;
    if (uploadPhoto.files[0] != undefined) {
      base64 = uploadPhoto.files[0].name;
    }
    // let encoding="xcjgcjfcjgcfjgvhgvghk"
    console.log(base64)

    // // formData.append('title', postName);
    // // formData.append('content', description);
    data = {
      content: description[0],
      userId: window.localStorage.getItem("id"),
      photo: base64
    };

    const dataSend = JSON.stringify(data);
    console.log(dataSend);
    // console.log(typeof(dataSend))
    var xhr = new XMLHttpRequest();

    xhr.open("Post", "http://127.0.0.1:3000/addPost")
    // xhr.setRequestHeader('Authorization', 'Bearer ' +window.localStorage.getItem('token'))
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader('X-CSRF-TOKEN', window.csrfToken);
    xhr.onload = function () {
      if (xhr.status === 200) {
        console.log("request successful ...");
        console.log(xhr.responseText);
        nameArray = [];
        imgPath = [];
        profileImg = []
        description = [];
        timig = [];
        likeCounter = [];
        // map = {};
        // console.log(JSON.parse(xhr.responseText));


      }
      else if (xhr.status === 201) {
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




}


window.onload = function () {
  username1.innerHTML=window.localStorage.getItem("username");
  fetchPosts();
};
function fetchPosts() {

  var xhr = new XMLHttpRequest();
  let id=window.localStorage.getItem("id")
  xhr.open('GET', `http://localhost:3000/getPosts/${id}`);
  // console.log()
  xhr.setRequestHeader('Authorization', 'Bearer ' + window.localStorage.getItem('token'));
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var posts = JSON.parse(xhr.responseText);

      // console.log(posts);
      if(window.localStorage.getItem("token")!=null){
        displayPosts(posts);

      }
    }
  };
  xhr.send();
}

function displayPosts(posts) {
  var userId = window.localStorage.getItem('username');
  var postsContainer = document.getElementById('posts-container');
  postsContainer.innerHTML = ''; // Clear existing posts
  // loading(posts[0]);
  posts.forEach(post => {
    //     var postElement = document.createElement('div');
    //     postElement.innerHTML = `
    //   <h3>${post.title}</h3>
    //   <p>${post.content}</p>
    // ${post.userId === userId ?
    //         `<button onclick="editPost('${post._id}')">Edit</button>
    // <button onclick="deletePost('${post._id}')">Delete</button>` : ''}
    // <hr>
    // `;
    // console.log(post);
    loading(post);

    // postsContainer.appendChild(postElement);
  });
}
const requ=document.querySelectorAll(".request");
let count=0;
const accept=function(){
  
  alert("request accept succesfully")
  requ[count].style.display="none"
  count+=1

}
const decline=function(){
  alert("request decline succesfully")
  requ[count].style.display="none"
  count+=1
}

