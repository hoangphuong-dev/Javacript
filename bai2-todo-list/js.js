const input_value = document.getElementById("input_value")
const btn_todo = document.getElementById("btn_todo")
const list_todo = document.getElementById("todo-list")
const filter_todo = document.getElementById("select_todo")

btn_todo.addEventListener("click", addtodo);
list_todo.addEventListener("click", deleteTodo);
filter_todo.addEventListener("click", filterTodo);

function filterTodo(event) {
	const task = list_todo.childNodes;
	task.forEach(function(todo) {
		switch (event.target.value) {
			case "tatca":
			todo.style.display = "block";
			break;

			case "hoanthanh":
			if(todo.classList.contains("completed")) {
				todo.style.display = "block";
			} else {
				todo.style.display = "none";
			}
			break;

			case "abc":
			if(!todo.classList.contains("completed")) {
				todo.style.display = "block";
			} else {
				todo.style.display = "none";
			}
			break;
		}

	});
}
listTodoStorage();
function deleteTodo(event) {
	const item = event.target;
	// delete todo
	if(item.classList[0] === 'delete_btn') {
		const todo = item.parentElement;
		todo.remove();
		removeStorageTodo(todo);
	}
	// complete button
	if(item.classList[0] === 'completed_btn') {
		const todo = item.parentElement;
		todo.classList.toggle("completed");
		updateStorageItem(todo);
	}
}
function updateStorageItem(todo) {
	let task;
	if(localStorage.getItem("task")=== null) {
		task = [];
	} else {
		task = JSON.parse(localStorage.getItem("task"));
	}
	const todoText = todo.children[0].innerText;

	index = task.findIndex(obj => obj.text === todoText);
	console.log(index);
	task[index].complete = true;
	localStorage.setItem("task", JSON.stringify(task))
}
function removeStorageTodo(todo) {
	let task;
	if(localStorage.getItem("task")=== null) {
		task = [];
	} else {
		task = JSON.parse(localStorage.getItem("task"));
	}
	const todoIndex = todo.children[0].innerText; // lấy text trong todo 
	task.splice(task.indexOf(todoIndex), 1);  // splice : cắt theo cái chuỗi vừa lấy 
	localStorage.setItem("task", JSON.stringify(task))
}

function addtodo(event) {
	event.preventDefault();
	todo = input_value.value;
	if(todo) {
		saveLocalStorage(todo);
		const newDiv = document.createElement("div");
		newDiv.classList.add('todo');
		// tạo list todo 
		const newTodo = document.createElement("li");
		newTodo.innerText = todo; 
		newTodo.classList.add('todo-item');
		// appendChild chèn vào thành phần con
		newDiv.appendChild(newTodo);
		input_value.value = "";
		// tạo nút hoàn thành 
		const btn_hoan_thanh = document.createElement("button");
		btn_hoan_thanh.innerText = "Hoàn thành";
		btn_hoan_thanh.classList.add("completed_btn");
		newDiv.appendChild(btn_hoan_thanh);
		// tạo nút xoá 
		const btn_xoa = document.createElement("button");
		btn_xoa.innerText = "Xoá";
		btn_xoa.classList.add('delete_btn');
		newDiv.appendChild(btn_xoa);

		list_todo.appendChild(newDiv);
		
	}
}

function saveLocalStorage(todo) {
	let task;
	if(localStorage.getItem("task")== null) {
		task = [];
	} else {
		task = JSON.parse(localStorage.getItem("task"));
	}
	task.push({
		text:todo,	
		complete:false
	});
	localStorage.setItem("task", JSON.stringify(task))
}

function listTodoStorage() {
	let task;
	if(localStorage.getItem("task")== null) {
		task = [];
	} else {
		task = JSON.parse(localStorage.getItem("task"));
	}
	task.forEach(nhiemvu =>  {
		const newDiv = document.createElement("div");
		newDiv.classList.add('todo');
		// tạo list todo 
		const newTodo = document.createElement("li");
		newTodo.innerText = nhiemvu.text; 
		newTodo.classList.add('todo-item')
		// appendChild chèn vào thành phần con
		newDiv.appendChild(newTodo)

		// tạo nút hoàn thành 
		const btn_hoan_thanh = document.createElement("button")
		btn_hoan_thanh.innerText = "Hoàn thành"
		btn_hoan_thanh.classList.add("completed_btn")
		newDiv.appendChild(btn_hoan_thanh)
		// tạo nút xoá 
		const btn_xoa = document.createElement("button")
		btn_xoa.innerText = "Xoá"
		btn_xoa.classList.add('delete_btn')
		newDiv.appendChild(btn_xoa)

		list_todo.appendChild(newDiv);
		if(nhiemvu.complete == true) {
			newDiv.classList.add("completed");
			btn_hoan_thanh.innerText = "Đã hoàn thành";
			btn_hoan_thanh.style.color = "green";
			btn_hoan_thanh.disabled = true;
		}
	});
}
