
// class 정의
class Calc{
    constructor(){
        this.value = 0;

        //출력값 생성 및 초기화
        this.allWrapper = document.createElement('div');

        // 텍스트 생성 및 초기화
        this.displayWrapper = document.createElement('p');
        this.displayWrapper.innerText = "Current value = ";

        this.displayNumber = document.createElement('span');
        this.displayNumber.innerText = this.value;

        //버튼 생성 및 초기화
        this.incB = document.createElement('button');
        this.incB.innerHTML = "Increase Value";

        this.decB = document.createElement('button');
        this.decB.innerHTML = "Decrease Value";

        //이벤트 리스너 추가
        this.incB.addEventListener('click', () => this.increaseButton());
        this.decB.addEventListener('click', () => this.decreaseButton());

        //텍스트를 dom에 추가
        this.displayWrapper.append(this.displayNumber);
        this.allWrapper.append(this.displayWrapper);

        //버튼을 dom에 추가
        this.allWrapper.append(this.incB);
        this.allWrapper.append(this.decB);

        //출력값 dom에 추가
        document.body.append(this.allWrapper);

    }

    //값 증가 메서드
    increaseButton(){
        this.value += 1;
        this.updateValue();
    }

    //값 감소 메서드
    decreaseButton(){
        this.value -= 1;
        this.updateValue();
    }

    //값 반영 메서드
    updateValue(){
        this.displayNumber.innerText = this.value;
    }
}

const calculator = new Calc();
