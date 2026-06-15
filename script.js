let timer;
let timeLeft = 25 * 60; 
let isRunning = false;
let currentMode = 25; 

const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');

const preset25 = document.getElementById('preset-25');
const preset50 = document.getElementById('preset-50');

// عناصر الإحصائيات
const completedCountEl = document.getElementById('completed-count');
const progressPercentEl = document.getElementById('progress-percent');
const taskList = document.getElementById('task-list');
const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');

// تحديث الواجهة الرقمية للعداد
function updateDisplay() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    
    timerDisplay.textContent = `${minutes}:${seconds}`;
}

// التبديل بين أوضاع التحكم بالوقت
preset25.addEventListener('click', () => switchMode(25, preset25));
preset50.addEventListener('click', () => switchMode(50, preset50));

function switchMode(minutes, button) {
    clearInterval(timer);
    isRunning = false;
    currentMode = minutes;
    timeLeft = minutes * 60;
    updateDisplay();
    
    document.querySelectorAll('.preset-btn').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
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
                alert(currentMode === 50 ? "انتهت الـ 50 دقيقة بنجاح! استرح الآن لمدة 10 دقائق." : "انتهت جلسة البومودورو! خذ استراحة قصيرة.");
                timeLeft = currentMode * 60;
                isRunning = false;
                updateDisplay();
            }
        }, 1000);
    }
});

pauseBtn.addEventListener('click', () => {
    clearInterval(timer);
    isRunning = false;
});

resetBtn.addEventListener('click', () => {
    clearInterval(timer);
    isRunning = false;
    timeLeft = currentMode * 60;
    updateDisplay();
});

// ---------------------------------------------------
// حساب وتحديث نسب الإنجاز والمهام
function updateStats() {
    const totalTasks = taskList.children.length;
    const completedTasks = taskList.querySelectorAll('.completed').length;
    
    completedCountEl.textContent = completedTasks;
    
    if (totalTasks === 0) {
        progressPercentEl.textContent = '0%';
    } else {
        const percentage = Math.round((completedTasks / totalTasks) * 100);
        progressPercentEl.textContent = `${percentage}%`;
    }
}

// إضافة مهمة جديدة
addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    const li = document.createElement('li');
    
    // نص المهمة
    const span = document.createElement('span');
    span.textContent = taskText;
    li.appendChild(span);

    // حاوية الأزرار (إنجاز + حذف) عشان تطلع بجنب بعض
    const btnGroup = document.createElement('div');
    btnGroup.style.display = 'flex';
    btnGroup.style.gap = '5px';

    // 1. زر تم الإنجاز الجديد ✅
    const completeBtn = document.createElement('button');
    completeBtn.textContent = 'إنجاز';
    completeBtn.style.padding = '4px 10px';
    completeBtn.style.fontSize = '0.8rem';
    completeBtn.style.backgroundColor = '#2d2d2d';
    completeBtn.style.color = '#ffffff';
    completeBtn.style.border = '1px solid #444';
    
    completeBtn.addEventListener('click', () => {
        li.classList.toggle('completed');
        if(li.classList.contains('completed')) {
            completeBtn.textContent = 'تراجع';
            completeBtn.style.backgroundColor = '#ffffff';
            completeBtn.style.color = '#121212';
        } else {
            completeBtn.textContent = 'إنجاز';
            completeBtn.style.backgroundColor = '#2d2d2d';
            completeBtn.style.color = '#ffffff';
        }
        updateStats();
    });

    // 2. زر الحذف ❌
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'حذف';
    deleteBtn.className = 'delete-btn';
    deleteBtn.style.padding = '4px 10px';
    deleteBtn.style.fontSize = '0.8rem';
    
    deleteBtn.addEventListener('click', () => {
        taskList.removeChild(li);
        updateStats();
    });

    // تركيب العناصر
    btnGroup.appendChild(completeBtn);
    btnGroup.appendChild(deleteBtn);
    li.appendChild(btnGroup);
    taskList.appendChild(li);
    
    taskInput.value = ''; 
    updateStats(); 
}
