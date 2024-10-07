class ColorCycle {
    constructor() {
        this.colors = Array.from({ length: 5 }, (_, i) => document.getElementById(`color${i + 1}`).value);
        this.currentIndex = 0;
        this.intervalId = null;
        this.initUI();
    }

    initUI() {
        document.querySelectorAll('input[type="color"]').forEach((el, i) => {
            el.addEventListener('input', (e) => {
                this.colors[i] = e.target.value;
                // console.log(i, e.target.value);
            });
        });

        document.getElementById('start-button').addEventListener('click', () => this.startColorCycle());
        document.getElementById('stop-button').onclick = () => this.stopColorCycle(); // 비권장
    }

    startColorCycle() {
        this.stopColorCycle(); // 기존 타이머 제거
        this.intervalId = setInterval(() => {
            document.body.style.backgroundColor = this.colors[this.currentIndex];
            this.currentIndex = (this.currentIndex + 1) % this.colors.length;
            // console.log(this.currentIndex);
        }, 1000);
    }

    stopColorCycle() {
        clearInterval(this.intervalId);
        document.body.style.backgroundColor = '';
    }
}

new ColorCycle(); // ColorCycle 인스턴스 생성