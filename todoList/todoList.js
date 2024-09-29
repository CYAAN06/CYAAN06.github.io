document.addEventListener('DOMContentLoaded', function() {
    const todoTableBody = document.querySelector('#todoTable tbody'); // tbody 선택
    const addTodoForm = document.querySelector('form.addList-group');
    const sortOptions = document.getElementById('sortOptions');
    const saveButton = document.getElementById('saveButton');
    const loadButton = document.getElementById('loadButton');
    
    let todos = []; // 할 일을 저장할 배열

    // 할 일 추가 함수
    function addTodo(todoText, addedTime = new Date()) {
        const todoItem = {
            text: todoText,
            addedTime: new Date(addedTime) // 추가된 시간 저장
        };
        todos.push(todoItem); // 할 일을 배열에 추가
        renderTodos(todos); // 할 일 목록을 화면에 출력
    }

    // 할 일 추가 버튼 클릭 이벤트
    addTodoForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const todoText = document.getElementById('addList').value;
        if (todoText) {
            addTodo(todoText); // 할 일 추가
            document.getElementById('addList').value = '';  // 입력 필드 초기화
        }
    });

    // 할 일 목록 렌더링 함수 (todos 배열을 기반으로 테이블을 다시 생성)
    function renderTodos(todosArray) {
        todoTableBody.innerHTML = ''; // 기존 내용 초기화
        todosArray.forEach(todo => {
            const row = createTodoRow(todo.text); // 각 할 일의 텍스트로 행을 생성
            todoTableBody.appendChild(row); // tbody에 추가
        });
    }

    // 행 생성 및 버튼 추가 헬퍼 함수
    function createTodoRow(todoText) {
        const row = document.createElement('tr');
        const listCell = document.createElement('td');
        const actionCell = document.createElement('td');

        listCell.textContent = todoText;

        // 수정 및 삭제 버튼
        const modifyButton = createButton('Modify', () => modifyTask(listCell, todoText));
        const deleteButton = createButton('Delete', () => deleteTask(row));

        actionCell.appendChild(modifyButton);
        actionCell.appendChild(deleteButton);
        row.appendChild(listCell);
        row.appendChild(actionCell);

        return row;
    }

    // 버튼 생성 헬퍼 함수
    function createButton(text, onClick) {
        const button = document.createElement('button');
        button.textContent = text;
        button.addEventListener('click', onClick);
        return button;
    }

    // 수정 및 삭제 핸들러 함수
    function modifyTask(cell, oldText) {
        const newText = prompt('Modify your task:', oldText);
        if (newText) {
            cell.textContent = newText;
            updateTodoList();
        }
    }

    function deleteTask(row) {
        const index = Array.from(todoTableBody.children).indexOf(row); // 해당 행의 인덱스 구하기
        todos.splice(index, 1); // 해당 인덱스의 항목을 배열에서 삭제
        row.remove();
        updateTodoList();
    }

    // 정렬 기능 구현 (옵션 변경 시 이벤트)
    sortOptions.addEventListener('change', function() {
        const sortValue = sortOptions.value;
        if (sortValue === 'alphabeticalOrder') {
            sortAlphabetically(); // 가나다 순 정렬
        } else if (sortValue === 'dateAdded') {
            sortByDateAdded(); // 시간 순 정렬
        }
    });

    // 시간 순 정렬 함수
    function sortByDateAdded() {
        const sortedTodos = [...todos].sort((a, b) => a.addedTime - b.addedTime); // 시간 순으로 정렬
        renderTodos(sortedTodos); // 정렬된 할 일 목록을 다시 렌더링
    }

    // 가나다 순 정렬 함수
    function sortAlphabetically() {
        const sortedTodos = [...todos].sort((a, b) => a.text.localeCompare(b.text)); // 알파벳 순 정렬
        renderTodos(sortedTodos); // 정렬된 할 일 목록을 다시 렌더링
    }

    // 할 일이 수정되거나 삭제될 때 호출 (배열 및 화면 업데이트)
    function updateTodoList() {
        renderTodos(todos); // 수정된 내용을 다시 렌더링
    }

    // ---------------- 파일 저장 (Save 기능) ----------------
    saveButton.addEventListener('click', function() {
        const todoData = JSON.stringify(todos, null, 2); // todos 배열을 JSON 문자열로 변환
        const blob = new Blob([todoData], { type: 'application/json' }); // Blob 객체 생성
        const url = URL.createObjectURL(blob); // Blob을 URL로 변환
        const a = document.createElement('a');
        a.href = url;
        a.download = 'todoList.json'; // 다운로드 파일 이름 설정
        document.body.appendChild(a); // 링크를 문서에 추가
        a.click(); // 클릭해서 파일 다운로드
        document.body.removeChild(a); // 다운로드 후 링크 제거
        URL.revokeObjectURL(url); // URL 해제
    });

    // ---------------- 파일 불러오기 (Load 기능) ----------------
    loadButton.addEventListener('click', function() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'application/json'; // JSON 파일만 불러올 수 있도록 설정
        input.addEventListener('change', function(event) {
            const file = event.target.files[0]; // 선택된 파일
            const reader = new FileReader(); // FileReader 객체 생성
            reader.onload = function(e) {
                const loadedTodos = JSON.parse(e.target.result); // 파일 내용을 JSON으로 파싱
                todos = loadedTodos; // 현재 todos 배열을 불러온 데이터로 교체
                renderTodos(todos); // 화면에 다시 렌더링
            };
            reader.readAsText(file); // 파일 읽기 시작
        });
        input.click(); // 파일 선택 창 열기
    });
});
