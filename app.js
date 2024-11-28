
const firebaseConfig = {
    apiKey: "AIzaSyCvpVTxeZqaFrVi-3rD1_fAE5A7BeIb_h4",
    authDomain: "personally-todo.firebaseapp.com",
    projectId: "personally-todo",
    storageBucket: "personally-todo.firebasestorage.app",
    messagingSenderId: "553714623117",
    appId: "1:553714623117:web:1ecb1f9cd2282c44dc78c4"
  };

  firebase.initializeApp(firebaseConfig);


//check 

var db = firebase.firestore()
var input = document.getElementById("todo")
var uId = localStorage.getItem("userId")




var listContainer = document.getElementById('listContainer')

function post(){

    var todoList = document.getElementById("todo").value

    var todoCon = {
        todo : todoList,
        userId : uId,
    }

    db.collection("todos").add(todoCon).then((docRef) => {
        console.log("Document written  id: ", docRef.id);
        getData()
    }).catch((error) => {
        console.log("Error");
    })



    todoList.value = ""
}

function getData() {

    var userId = db.collection("todos").get().then((storeData) => {
        listContainer.innerHTML = ""
        storeData.forEach((data) => {

            var todoValue = document.getElementById('todo').value
            var newTodo = document.createElement('div');
            var todo = document.createElement('h6')
            var todoText = document.createTextNode(data.data().todo)
            todo.appendChild(todoText)
            newTodo.appendChild(todo)
            listContainer.appendChild(newTodo)
            newTodo.setAttribute('class', 'todoContainer')
            newTodo.setAttribute('id', data.id)
        
            var dltBtn = document.createElement('button');
            var dltText = document.createTextNode('Remove');
            dltBtn.setAttribute('class' , 'btn btn-danger')
            dltBtn.setAttribute('onclick' , 'removeTodo()')
            dltBtn.appendChild(dltText)
            newTodo.appendChild(dltBtn)
            
            var editBtn = document.createElement('button');
            var editText = document.createTextNode('Edit');
            editBtn.setAttribute('class' , 'btn btn-secondary')
            editBtn.setAttribute('onclick', 'editTodo()')
            editBtn.appendChild(editText)
            newTodo.appendChild(editBtn)
            var updateBtn = document.createElement('button');
            var updateText = document.createTextNode('Update');
            updateBtn.setAttribute('class' , 'btn btn-success hide')
            updateBtn.setAttribute('onclick', 'updateTodo()')
            updateBtn.appendChild(updateText)
            newTodo.appendChild(updateBtn)

        })
    }).catch((error) => {
        console.log("Error");
    })
}

getData()


function removeTodo(){
var btn = event.target;
btn.parentNode.remove()

db.collection("todos").doc(btn.parentNode.id).delete().then(() => {
    btn.parentNode.remove
}).catch((error) => {
console.log("Error");
})
}


function editTodo(){
    alert('Kindly Click on text to edit')
    var btn = event.target;
    btn.style.display = 'none';
    btn.parentNode.lastChild.style.display = 'inline-block'
    btn.parentNode.firstChild.contentEditable  ="true"
}

function updateTodo(){
    var btn = event.target;
    btn.style.display = 'none';
    btn.parentNode.childNodes[2].style.display = 'inline-block'
      btn.parentNode.firstChild.contentEditable  ="false"
}


function RemoveAll(){
    listContainer.innerHTML = ""
}