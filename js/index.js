// Initialize Cloud Firestore through Firebase
var result = document.getElementById("resultName")

const firebaseConfig = {
    apiKey: "AIzaSyDoWzEj5pKsM4d9RrxSoNCqjqgWYMBs-LE",
    authDomain: "learn-mindx.firebaseapp.com",
    databaseURL: "https://learn-mindx.firebaseio.com",
    projectId: "learn-mindx",
    storageBucket: "learn-mindx.appspot.com",
    messagingSenderId: "145607883345",
    appId: "1:145607883345:web:9450ce44f126d04e019670"
  };

firebase.initializeApp(firebaseConfig);
  
  var db = firebase.firestore();
  
document.getElementById('dk').addEventListener('click',()=>{
    let username = document.getElementById('usernm').value
    let password = document.getElementById('matkhau').value
    let retypepass = document.getElementById('nhaplai').value
    console.log(username,password,retypepass)

    let isPasswordOK= true;
    // validate password
    if(password.length < 0){
        alert('mời nhập thông tin')
        isPasswordOK = false
    }
    if (password != retypepass){
        alert('mật khẩu không trùng')
    }
    else{
        db.collection("Learn-Mindx").get()
        .then((querySnapshot) => {

            let  user = querySnapshot.docs.map(val=>{
                return val.data()
            })
            
            return user

        })
        .then((user)=>{
            console.log(user)
        })
        alert('ok')
    }
    
    
})

// db.collection("Learn-Mindx").doc("2").update({
//     messages: firebase.firestore.FieldValue.arrayUnion({
//         password: localStorage.getItem("id"),
//         username: text.value
//     })
// })
//     .then(() => {
//         text.value = ""
//         renderData()
//         console.log(`Save success`)
//     })

document.getElementById('btn').addEventListener('click',()=>{
    let username = document.getElementById('usernm').value
    let password = document.getElementById('pass').value
    
    
    db.collection("Learn-Mindx").get()
    .then((querySnapshot) => {

        let  user = querySnapshot.docs.map(val=>{
            return val.data()
        })
        return user

    })
    // normali data
    .then(user=>{
        for(let i = 0;i<user.length;i++){
            if(user[i].username == username){
                if(user[i].password == password){
                    alert('Đăng nhập thành công, chuyễn sang todo của bạn')
                    result.innerHTML += "chào admin " + username
                    document.querySelector("#anne").style.display = "none";
                    document.querySelector("#hientodo").style.display = "block";
                    console.log(user);
                    return user[i];
                }else{
                    alert(' Sai Mật Khẩu')
                    return null;
                    break;
                }
            }
        }
        alert('Kiểm tra lại tài khoản')
    })

    // checking
    .then((user)=>{
        console.log(user)

    })

    // co infomation ve user
    .catch(er=>{
        console.log(er.message)
    })
    ;

})


function renderData() {
    document.getElementById("list").innerHTML = ""
    db.collection("todo").doc("todo").get()
        .then((doc) => {
            if (doc.exists) {
                console.log(doc.data())
                return doc.data()
            }
        })
        .then(data => {
            let id = localStorage.id
            console.log(id)
            let chat = document.getElementById("list")
            let messages = data.messages
            messages.forEach(value => {
                let temp =
                    `
                        <div class="thich">
                            <div class="input-group mb-3">
				                <input class="input-style form-control" type="text" name="" id="sua" value="${value.content}">
                                <div class="input-group-prepend">
                                    <button class=" input-group-text btn xoa" id="xoa">Xóa</button>
                                    <button class=" input-group-text btn sua" id="update">sửa</button>
                                </div>
                            </div>
                        </div>

                    `
                chat.insertAdjacentHTML("beforeend", temp)
            })
        })
}

renderData()

document.getElementById("gui").addEventListener("click", () => {
    sendMess()
})
function sendMess() {
    let text = document.getElementById("txtInput")
    if (text.value != "") {
        console.log(text.value)

        db.collection("todo").doc("todo").update({
            messages: firebase.firestore.FieldValue.arrayUnion({
                belong: localStorage.getItem("id"),
                content:text.value
            })
        })
            .then(() => {
                text.value = ""
                renderData()
                console.log(`Save success`)
            })
    }
}

// document.getElementById("xoa").addEventListener("click", () => {
//     delete()
// })
// function delete() {

//     db.collection("todo").doc("todo").delete().then(function() {
//         console.log("Document successfully deleted!");
//     }).catch(function(error) {
//         console.error("Error removing document: ", error);
//     });
    
// }