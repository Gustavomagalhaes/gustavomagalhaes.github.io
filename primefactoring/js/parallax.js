setTimeout(function () {
	const elems = document.querySelectorAll('.layer');
	const front_layer_1 = document.querySelector('.front-layer-1');
	const middle_layer_1 = document.querySelector('.middle-layer-1');

	const front_layer_2 = document.querySelector('.front-layer-2');
	const middle_layer_2 = document.querySelector('.middle-layer-2');

	elems.forEach(function (elem, index) {
		elem.style.animation = "none";
	});

	document.getElementById('top').addEventListener('mousemove', function (e) {
		if (!e.currentTarget.dataset.triggered) {
			elems.forEach(function (elem, index) {
				if (elem.getAttribute('style')) {
					elem.style.transition = "all .5s";
					elem.style.transform = "none";
				}
			});
		}
		e.currentTarget.dataset.triggered = true;
		
		let width = window.innerWidth / 3;
		let height = window.innerHeight / 3;

		let mouseX1 = ((width - e.clientX) / 60);
		let mouseX2 = ((width - e.clientX) / 120);

		let mouseY1 = ((height - e.clientY) / 60);
		let mouseY2 = ((height - e.clientY) / 120);

		front_layer_1.style.transform = "translate("+ -mouseX1 + "px," + -mouseY1 + "px)";
		middle_layer_1.style.transform = "translate("+ mouseX2 + "px," + mouseY2 + "px)";
		
		front_layer_2.style.transform = "translate("+ -mouseX1 + "px," + -mouseY1 + "px)";
		middle_layer_2.style.transform = "translate("+ mouseX2 + "px," + mouseY2 + "px)";
	});
	
	document.body.addEventListener('mouseleave', function (e) {
		elems.forEach(function (elem, index) {
			elem.style.transition = "all .5s";
			elem.style.transform = "none";
		});
	});
	
	document.body.addEventListener('mouseenter', function (e) {
		elems.forEach(function (elem, index) {
			setTimeout(function () {
				elem.style.transition = "none";
			}, 500);
		});
	});
}, 1500);
