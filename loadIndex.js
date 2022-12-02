window.onload = () => {
	const list = document.querySelector('.project-list');
	const popupWraper = document.querySelector('.popup-wraper');
	const popup = document.querySelector('.popup');
	const blur = document.getElementById('blur');
	const btn = document.getElementById('btnNewProject');
	const btnCloseProject = document.getElementById('btnCloseProject');
	const form = document.getElementById('form');
	const input = document.getElementById('name');
	const error = document.querySelector('.error');

	const ul = document.createElement('ul');
	ul.className = 'flex';

	fetch('http://localhost/canvas/projects.php')
		.then((response) => {
			if (!response) {
				list.innerHTML += "<div class='error'>problem z pobreniem projektow</div>";
			}
			return response.json();
		})
		.then((names) => {
			names.map((name) => {
				const li = document.createElement('li');
				const a = document.createElement('a');
				a.href = `http://localhost/canvas/canvas.html?q=${name}`;
				a.innerText = `${name}`;
				a.classList.add('btn-primary', 'block');
				li.appendChild(a);
				ul.appendChild(li);
			});
		});

	list.appendChild(ul);

	// pop up logic
	btn.addEventListener('click', (e) => {
		e.stopPropagation;
		popupWraper.style.display = 'block';
		blur.classList.add('blur');
	});

	btnCloseProject.addEventListener('click', (e) => {
		e.stopPropagation;
		popupWraper.style.display = 'none';
		blur.classList.remove('blur');
	});

	popupWraper.addEventListener('click', (e) => {
		e.preventDefault;
		e.stopPropagation;
		popupWraper.style.display = 'none';
		blur.classList.remove('blur');
	});

	popup.addEventListener('click', (e) => {
		e.stopPropagation;
		e.cancelBubble = true;
	});

	document.body.addEventListener('submit', (e) => {
		e.preventDefault();
		const name = input.value;
		fetch(`http://localhost/canvas/projects.php`)
			.then((response) => {
				if (!response) {
					error.innerText += 'problem z pobreniem projektow';
				}
				return response.json();
			})
			.then((names) => {
				if (names.includes(name)) {
					error.innerText += 'podana nazwa istnieje ';
				} else {
					fetch(`http://localhost/canvas/projects.php?q=${name}`, { method: 'POST' }).then(() => {
						window.location.replace(`http://localhost/canvas/canvas.html?q=${name}`);
					});
				}
			});
	});
};
