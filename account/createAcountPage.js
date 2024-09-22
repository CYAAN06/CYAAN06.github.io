const userIDInput = document.querySelector("#userID");
const userPWInput = document.querySelector('#userPW');
const userPWconfirmInput = document.querySelector('#userPWconfirm');

document.querySelector('#userPWconfirm').addEventListener('input', () => {
    if (userPWInput.value !== userPWconfirmInput.value) {
        document.querySelector(".wrongPW").hidden = false;
    }else{
        document.querySelector(".wrongPW").hidden = true;
    }
});

document.querySelector('#createAcountform').addEventListener('submit', (event) => {
    event.preventDefault();
    
    const userID = userIDInput.value;
    const userPW = userPWInput.value;
    const userPWconfirm = userPWconfirmInput.value;

    // 비밀번호 확인
    if (userPW !== userPWconfirm) {
        alert("비밀번호가 다릅니다.");
        return;
    }
    
    // 로컬스트리지에 키와 아이디를 저장하는 users 불러오고, 없으면 빈 리스트 대입
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    // 아이디 중복 체크
    for (let i = 0; i < users.length; i++) {
        // console.log(`${userID} ${users[i].id}`);
        if (users[i].id === userID) {
            alert("이미 존재하는 아이디 입니다");
            return;
        }
    }

    // 아이디와 비밀번호 로컬스토리지에 저장
    users.push({id:userID, password:userPW});
    localStorage.setItem("users", JSON.stringify(users));

    // 계정 생성 후 로그인 페이지로 이동
    location.href = "loginPage.html";
});

