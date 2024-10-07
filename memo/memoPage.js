// DOM 요소 가져오기
const memoInput = document.getElementById('memoInput');
const saveMemoButton = document.getElementById('saveMemo');

// 로그인한 사용자 ID 가져오기 (sessionStorage에 저장된 ID)
const loggedInUser = sessionStorage.getItem('loggedInUser');

// localStorage에서 저장된 사용자 정보 가져오기
const users = JSON.parse(localStorage.getItem('users') || '[]');
const user = users.find(user => user.id === loggedInUser);

// 페이지 로드 시 메모 불러오기
window.onload = function() {
    if (user && user.memo) {
        memoInput.value = user.memo; // 사용자의 기존 메모를 표시
    }
};

// 메모 저장 버튼 클릭 이벤트 핸들러
saveMemoButton.addEventListener('click', function() {
    const updatedMemo = memoInput.value.trim();

    // 사용자 데이터 업데이트
    if (user) {
        user.memo = updatedMemo;

        // 사용자 정보 저장
        localStorage.setItem('users', JSON.stringify(users));

        alert("메모가 저장되었습니다!");
    }
});
