// المتغيرات الأساسية للمؤقت
let timer;
let timeLeft = 25 * 60; // 25 دقيقة بالثواني
let isRunning = false;

const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');

// تحديث واجهة العداد
function updateDisplay() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    
    // إضافة صفر على اليسار إذا كان الرقم أقل من 10
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    
    timerDisplay.textContent = `${minutes}:${seconds}`;
}

// تشغيل العداد
startBtn.addEventListener('click', () => {
    if (!isRunning) {
        isRunning = true;
        timer = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateDisplay();
            } else {
                clearInterval(timer);
                alert("انتهى وقت التركيز! خذ استراحة قصيرة.");
                timeLeft = 25 * 60;
                isRunning = false;
                updateDisplay();
            }
        }, 1000);
    }
});

// إيقاف مؤقت
pauseBtn.addEventListener('click', () => {
    clearInterval(timer);
    isRunning = false;
});

// إعادة تعيين العداد
resetBtn.addEventListener('click', () => {
    clearInterval(timer);
    isRunning = false;
    timeLeft = 25 * 60;
    updateDisplay();
});

// ---------------------------------------------------
// منطق قائمة المهام (To-Do List)
const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');

// إضافة مهمة جديدة
addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') return; // تجاهل إذا كان الحقل فارغاً

    const li = document.createElement('li');
    
    // نص المهمة
    const span = document.createElement('span');
    span.textContent = taskText;
    li.appendChild(span);

    // عند الضغط على المهمة يتم شطبها (اكتملت)
    span.addEventListener('click', () => {
        li.classList.toggle('completed');
    });

    // زر الحذف
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'حذف';
    deleteBtn.className = 'delete-btn';
    deleteBtn.addEventListener('click', () => {
        taskList.removeChild(li);
    });

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
    
    taskInput.value = ''; // تفريغ الحقل
}
