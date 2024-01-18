import { v4 } from 'uuid';
window.addEventListener('DOMContentLoaded', () => {
	const addBtn = document.querySelector('.btn-primary');
	const taskInput = document.querySelector('.form-control');
	const taskList = document.querySelector('tbody');
	const modal = document.querySelector('.modal');
	const modalInput = modal.querySelector('.form-control');
	const modalBtn = modal.querySelector('.btn-primary');
	let changeIndex;
	let tasks;
	if (localStorage.getItem('tasks')) {
		tasks = Array.from(JSON.parse(localStorage.getItem('tasks')));
	} else {
		tasks = [];
	}

	tasks.forEach((item, index) => addTask(item, index));

	addBtn.addEventListener('click', (event) => {
		event?.preventDefault();
		if (taskInput.value === null || taskInput.value === '') {
			taskInput.focus();
			return 0;
		} else {
			loadTask(taskInput.value);
		}
	});

	taskList.addEventListener('click', (event) => {
		event.preventDefault();
		const target = event.target;
		if (target && target.classList.contains('btn-outline-danger')) {
			const delElemIndex =
				target.parentElement.parentElement.firstElementChild.querySelector(
					'span',
				);
			tasks.forEach((item, idx) => {
				if (parseInt(delElemIndex.textContent) - 1 === idx) {
					tasks.splice(idx, 1);
					taskList.innerHTML = '';
					tasks.forEach((item, index) => addTask(item, index));
					localStorage.setItem('tasks', JSON.stringify(tasks));
				}
			});
		}

		if (target && target.classList.contains('btn-outline-primary')) {
			const editElemIndex =
				target.parentElement.parentElement.firstElementChild.querySelector(
					'span',
				);
			tasks.forEach((item, idx) => {
				if (parseInt(editElemIndex.textContent) - 1 === idx) {
					changeIndex = idx;
					modalInput.value = tasks[idx].task;
					modalInput.focus();
				}
			});
		}
	});

	modalBtn.addEventListener('click', () => {
		tasks[changeIndex].task = modalInput.value;
		taskList.innerHTML = '';
		tasks.forEach((item, index) => addTask(item, index));
		localStorage.setItem('tasks', JSON.stringify(tasks));
	});

	// Functions
	function loadTask(task) {
		let newObj = {
			id: v4(),
			task: task,
			completed: true,
		};
		tasks.push(newObj);
		let objIndex = tasks.indexOf(newObj);
		localStorage.setItem('tasks', JSON.stringify(tasks));
		addTask(newObj, objIndex);
		document.querySelector('form').reset();
	}
	function addTask(element, index) {
		let newTask = document.createElement('tr');
		newTask.classList.add('text-start');
		newTask.innerHTML = `
<td class="ps-4 align-middle"><span class="me-4">${index + 1}.</span> ${element.task}</td>
<td> <button type="submit" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#myModal">Edit</button></td>
<td><button type="submit" class="btn btn-outline-danger">Delete</button></td>
`;
		taskList.appendChild(newTask);
	}
});
