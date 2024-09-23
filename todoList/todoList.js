document.addEventListener('DOMContentLoaded', function() {
    const todoTable = document.getElementById('todoTable');
    const addListButton = document.getElementById('addListButton');
    const searchInput = document.getElementById('todoListSearch');
    const saveButton = document.getElementById('saveButton');
    const loadButton = document.getElementById('loadButton');
    
    let todos = [];

    // 할 일 추가 함수
    function addTodo(todoText) {
        const row = document.createElement('tr');
        const listCell = document.createElement('td');
        const actionCell = document.createElement('td');

        listCell.textContent = todoText;

        // 수정 버튼
        const modifyButton = document.createElement('button');
        modifyButton.textContent = 'Modify';
        modifyButton.onclick = function() {
            const newText = prompt('Modify your task:', todoText);
            if (newText) {
                listCell.textContent = newText;
                updateTodoList(); // 수정된 내용 반영
            }
        };

        // 삭제 버튼
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = function() {
            row.remove();
            updateTodoList(); // 삭제된 내용 반영
        };

        actionCell.appendChild(modifyButton);
        actionCell.appendChild(deleteButton);
        row.appendChild(listCell);
        row.appendChild(actionCell);

        todoTable.appendChild(row);
        todos.push(todoText); // 추가할 때 배열에도 저장
    }

    // 할 일 추가 버튼 클릭 이벤트
    addListButton.addEventListener('click', function() {
        const todoText = document.getElementById('addList').value;
        if (todoText) {
            addTodo(todoText);
            document.getElementById('addList').value = '';  // 입력 필드 초기화
        }
    });

    // 실시간 검색 기능
    searchInput.addEventListener('input', function() {
        const searchText = searchInput.value.toLowerCase();
        const rows = todoTable.getElementsByTagName('tr');
        for (let i = 1; i < rows.length; i++) {
            const taskText = rows[i].getElementsByTagName('td')[0].textContent.toLowerCase();
            if (taskText.includes(searchText)) {
                rows[i].style.display = '';
            } else {
                rows[i].style.display = 'none';
            }
        }
    });

    // 할 일 목록 저장 (파일 다운로드)
    saveButton.addEventListener('click', function() {
        const currentTodos = [];
        const rows = todoTable.getElementsByTagName('tr');

        for (let i = 1; i < rows.length; i++) { // 첫 행은 제목 행이므로 제외
            const taskText = rows[i].getElementsByTagName('td')[0].textContent;
            currentTodos.push(taskText);
        }

        const blob = new Blob([JSON.stringify(currentTodos)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'todoList.json';
        a.click();
        URL.revokeObjectURL(url);
    });

    // 할 일 목록 로드 (파일 읽기)
    loadButton.addEventListener('click', function() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'application/json';
        input.onchange = function(event) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = function(e) {
                const loadedTodos = JSON.parse(e.target.result);
                todoTable.innerHTML = '<tr><th>List</th><th>Action</th></tr>'; // 기존 테이블 초기화
                todos = []; // 기존 목록 초기화
                loadedTodos.forEach(todo => addTodo(todo)); // 로드된 목록 추가
            };
            reader.readAsText(file);
        };
        input.click();
    });

    // 할 일이 수정 또는 삭제될 때 todos 배열을 업데이트하는 함수
    function updateTodoList() {
        todos = [];
        const rows = todoTable.getElementsByTagName('tr');

        for (let i = 1; i < rows.length; i++) { // 첫 행은 제목 행이므로 제외
            const taskText = rows[i].getElementsByTagName('td')[0].textContent;
            todos.push(taskText); // 현재 테이블에 남아있는 목록만 배열에 추가
        }
    }
});
