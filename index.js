const inputBox = document.getElementById('input-value');
const taskContainer = document.querySelector('.tasks');

document.getElementById('add-btn').addEventListener('click', () => {
    addTask();
});
inputBox.addEventListener('keypress', (event) => {
    if(event.key === 'Enter'){
        addTask();
    };
});
taskContainer.addEventListener('click', (event) => {
    if (event.target.tagName === 'LI') {
        event.target.classList.toggle('checked');
        saveInfo();
    } else if (event.target.tagName === 'I') {
        event.target.parentElement.remove();
        saveInfo();
    };
}, false);

function addTask() {
    try {
        if (inputBox.value !== '') {
            let li = document.createElement('li');
            let span_task = document.createElement('span');
            let span_time = document.createElement('span');
            let iconTag = document.createElement('i');

            const currentTime = new Date();
            let hours = currentTime.getHours();
            const minutes = currentTime.getMinutes();
            let period = 'AM';
            if (hours >= 12) {
                period = 'PM';
                if (hours > 12) {
                    hours -= 12;
                };
            };
            span_task.innerHTML = inputBox.value;
            span_time.innerHTML = `${hours}:${minutes} ${period}`;

            span_task.classList.add('task-name');
            span_time.classList.add('time');
            iconTag.classList.add('fa-regular', 'fa-trash-can', 'delete-btn');

            li.appendChild(span_task);
            li.appendChild(iconTag)
            li.appendChild(span_time);
            taskContainer.appendChild(li);
        } else {
            alert('Please enter a task name.');
        };
        inputBox.value = '';
        saveInfo();
    } catch (error) {
        console.log(error);
    };
};

function saveInfo() {
    localStorage.setItem('data', taskContainer.innerHTML);
};

function showTask() {
    if (localStorage.getItem('data')) {
        taskContainer.innerHTML = localStorage.getItem('data');
    };
};
showTask();