window.onload = () => {
	const list = document.querySelector('.project-list');
	const popup = document.querySelector('.popup');
	const btn = document.getElementById('btnNewProject');
	const form = document.getElementById('form');
	const input = document.getElementById('name');
	const error = document.querySelector('.error');

	const ul = document.createElement('ul');

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
				li.appendChild(a);
				ul.appendChild(li);
			});
		});

	list.appendChild(ul);

	btn.addEventListener('click', () => {
		popup.style.display = 'block';
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
