// DOM 요소 가져오기
const loginForm = document.getElementById('loginform');
const userIDInput = document.getElementById('userID');
const userPWInput = document.getElementById('userPW');

// 로그인 폼 제출 이벤트 핸들러
loginForm.addEventListener('submit', function(event) {
    event.preventDefault(); // 기본 폼 제출 동작 방지

    // 입력된 사용자 정보
    const enteredID = userIDInput.value.trim();
    const enteredPW = userPWInput.value.trim();

    // localStorage에서 저장된 사용자 정보 가져오기
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    // 사용자가 존재하는지 확인
    const user = users.find(user => user.id === enteredID && user.password === enteredPW);
    
    if (user) {
        // 로그인 성공 시 사용자 ID를 세션에 저장
        sessionStorage.setItem('loggedInUser', enteredID);

        // 메모 페이지로 이동
        location.href = 'memoPage.html';
    } else {
        // 로그인 실패
        alert("로그인 실패! 아이디 또는 비밀번호가 틀렸습니다.");
    }
});
