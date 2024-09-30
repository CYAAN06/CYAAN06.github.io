document.addEventListener('DOMContentLoaded', function() { // 문서가 완전히 로딩된 후 실행
    const todoTableBody = document.querySelector('#todoTable tbody'); // 할일 표
    const addTodoForm = document.querySelector('form.addList-group'); // 할일 추가 그룹
    const sortOptions = document.getElementById('sortOptions'); // 할일 정렬 선택지
    const saveButton = document.getElementById('saveButton'); // 저장 버튼
    const loadButton = document.getElementById('loadButton'); // 로드 버튼
    const searchInput = document.getElementById('todoListSearch'); // 할일 검색 창

    let todos = []; // 할일 배열
    let sortMetric = ''; // 할일 정렬 상태
    let searchText = ''; // 검색어

    // 할 일 추가 함수
    function addTodo(todoText, addedTime = new Date()) { // 입력된 텍스트, 시간
        todos.push({ text: todoText, addedTime: new Date(addedTime) }); // 배열에 텍스트과 추가된 시간 삽입
        renderTodos();
    }

    // 할 일 목록 렌더링 함수
    function renderTodos() {
        const processedTodos = todos // 사용자에게 보여줄 배열
            .filter(todo => todo.text.toLowerCase().includes(searchText)) // 목록을 소문자로 바꾼 후, 검색어가 포함된 목록만 남기기
            .sort((a, b) => {
                if (sortMetric === 'dateAdded') return a.addedTime - b.addedTime; // 정렬 기준이 시간순이라면 추가된 시간의 오름차 순으로 정렬
                if (sortMetric === 'alphabeticalOrder') return a.text.localeCompare(b.text); // 정렬 기준이 가나다순이라면 배열의 가나다 순으로 정렬
                return 0;
            });

        todoTableBody.innerHTML = ''; // 기존 표 내용 초기화

        processedTodos.forEach(todo => { // 배열의 각 행 마다
            const row = createTodoRow(todo); // 행 생성 함수
            todoTableBody.appendChild(row); // 생성된 행을 표에 넣기
        });
    }

    // 행 생성 및 버튼 추가 헬퍼 함수
    function createTodoRow(todo) {
        const row = document.createElement('tr'); // 테이블의 비어있는 행 생성
        row.innerHTML = `
            <td>${todo.text}</td>
            <td>
                <button class="modifyBtn">Modify</button>
                <button class="deleteBtn">Delete</button>
            </td>`; // 행의 리스트 열에 텍스트, 액션 열에 수정, 삭제 버튼 생성
        
        row.querySelector('.modifyBtn').addEventListener('click', () => modifyTask(todo)); // 수정 버튼 클릭 함수
        row.querySelector('.deleteBtn').addEventListener('click', () => deleteTask(todo)); // 삭제 버튼 클릭 함수

        return row; // 생성된 행 반환
    }

    // 수정 및 삭제 핸들러 함수
    function modifyTask(todo) {
        const newText = prompt('Modify your task:', todo.text); // 현재의 텍스트를 보여준 후, 수정 사항 저장
        if (newText) {
            todo.text = newText;
            renderTodos();
        } // 변경사항 적용
    }

    function deleteTask(todo) {
        todos = todos.filter(t => t !== todo); // 삭제 항목을 제외한 항목만 남기고 삭제
        renderTodos();
    }

    // 파일 저장 로직
    function saveToFile() {
        const blob = new Blob([JSON.stringify(todos, null, 2)], { type: 'application/json' }); // todos 배열을 json 문자열로 반환
        const url = URL.createObjectURL(blob); // blob 데이터를 url로 변환
        const a = document.createElement('a'); // 파일 다운을 위한 요소
        a.href = url; // 앵커가 해당 파일 참조 가능
        a.download = 'todoList.json'; // 다운로드될 파일 이름 지정
        document.body.appendChild(a); //문서의 body에 앵커를 추가해 클릭 가능하게 만듬
        a.click(); // 자동으로 앵커 클릭
        document.body.removeChild(a); // 앵커 삭제
        URL.revokeObjectURL(url); // 생성한 url 삭제
    }

    // 파일 불러오기 로직
    function loadFromFile(event) {
        const file = event.target.files[0]; // 선택된 파일 가져오기
        const reader = new FileReader(); // 파일 읽기 객체 생성
        reader.onload = e => { // 성공적으로 읽었다면
            todos = JSON.parse(e.target.result); // 파일의 텍스트를 js 객체로 변환해 배열에 할당
            renderTodos();
        };
        reader.readAsText(file); // 파일 텍스트로 읽기 시작 *성공 시 onload 이벤트 발생
    }

    //-------------------이벤트 리스너-------------------

    // 할일 추가 이벤트
    addTodoForm.addEventListener('submit', event => {
        event.preventDefault();
        const todoText = document.getElementById('addList').value;
        if (todoText) {
            addTodo(todoText);
            document.getElementById('addList').value = '';  // 입력 필드 초기화
        }
    });

    // 검색창 입력 이벤트
    searchInput.addEventListener('input', () => {
        searchText = searchInput.value.toLowerCase();
        renderTodos();
    });

    // 정렬값 변경 이벤트
    sortOptions.addEventListener('change', () => {
        sortMetric = sortOptions.value;
        renderTodos();
    });

    // 저장 버튼 이벤트
    saveButton.addEventListener('click', saveToFile);

    // 로드 버튼 이벤트
    loadButton.addEventListener('click', () => {
        const input = document.createElement('input');
        input.type = 'file'; // 실행 시 파일 선택창 오픈
        input.accept = 'application/json'; // json 파일만 선택 가능
        input.addEventListener('change', loadFromFile);
        input.click(); // 자동 실행
    });
});
