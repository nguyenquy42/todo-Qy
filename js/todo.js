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

const Input = document.getElementById("txtInput")
const list = document.querySelector(".list");

function init() {
    document.getElementById("gui").addEventListener("click", () => {
        if (Input.value != "") {
            new Items(Input.value);
            sendMess()
            Input.value = "";
            Input.focus();
        }
    })
}

init()

class Items {
    constructor(New_Item) {
        this.Create(New_Item);
    }

    Create(New_Item) {
        /// create div and add className
        let box = document.createElement('div');
        box.classList.add('items');

        // /// create a checkbox and class name
        let check = document.createElement('checkbox');
        check.innerHTML = '<input type="checkbox" class="check"></input>'
        check.classList.add('myCheck');

        /// create input and another things :)
        let input = document.createElement('span');
        input.innerHTML = New_Item;
        var att = document.createAttribute("contenteditable");
        att.value = "true";
        input.setAttributeNode(att)
        input.classList.add('item_input');

        /// create button to remove
        let removeButton = document.createElement('button');
        removeButton.innerHTML = "Delete"
        removeButton.classList.add('removeButton')

        /// thêm một thẻ div vào thẻ list
        list.appendChild(box);
        /// sau khi tạo thì thêm vào thẻ cần thiết
        box.appendChild(check);
        box.appendChild(input);
        box.appendChild(removeButton);


        removeButton.addEventListener('click', () => this.del(box))
    }

    del(box) {
        list.removeChild(box);
    }

}

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
            let message = data.messages
            message.forEach(value => {
                new Items(value.content);
            })
        })
}

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