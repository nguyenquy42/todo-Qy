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
  
//   xong pham config => cho firebase biet

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

// const Input = document.getElementById("txtInput")
// const list = document.querySelector(".list");

// function init() {
//     document.getElementById("gui").addEventListener("click", () => {
//         if (Input.value != "") {
//             new Items(Input.value);
//             sendMess()
//             Input.value = "";
//             Input.focus();
//         }
//     })
// }

// init()

// class Items {
//     constructor(New_Item) {
//         this.Create(New_Item);
//     }

//     Create(New_Item) {
//         /// create div and add className
//         let box = document.createElement('div');
//         box.classList.add('items');

//         // /// create a checkbox and class name
//         let check = document.createElement('checkbox');
//         check.innerHTML = '<input type="checkbox" class="check"></input>'
//         check.classList.add('myCheck');

//         /// create input and another things :)
//         let input = document.createElement('span');
//         input.innerHTML = New_Item;
//         var att = document.createAttribute("contenteditable");
//         att.value = "true";
//         input.setAttributeNode(att)
//         input.classList.add('item_input');

//         /// create button to remove
//         let removeButton = document.createElement('button');
//         removeButton.innerHTML = "Delete"
//         removeButton.classList.add('removeButton')

//         /// thêm một thẻ div vào thẻ list
//         list.appendChild(box);
//         /// sau khi tạo thì thêm vào thẻ cần thiết
//         box.appendChild(check);
//         box.appendChild(input);
//         box.appendChild(removeButton);


//         removeButton.addEventListener('click', () => this.del(box))
//     }

//     del(box) {
//         list.removeChild(box);
//     }

// }

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
                        <div>
				            <input class="form-style form-control" type="text" name="" id="sua" value="${value.content}">
                            <button class="btn" id="xoa">Xóa</button>
                            <button class="btn" id="update">sửa</button>
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

document.getElementById("xoa").addEventListener("click", () => {
    delete()
})
function delete() {

    db.collection("todo").doc("todo").delete().then(function() {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
    
}