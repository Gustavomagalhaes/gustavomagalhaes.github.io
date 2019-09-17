setTimeout(function () {
	const elems = document.querySelectorAll('.layer');
	const goal_layer1 = document.querySelector('.goal-layer-1');
	const goal_layer2 = document.querySelector('.goal-layer-2');

	const deal_layer1 = document.querySelector('.deal-layer-1');
	const deal_layer2 = document.querySelector('.deal-layer-2');

	// const layer3 = document.querySelector('.layer-3');

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
		
		let width = window.innerWidth / 2;
		let height = window.innerHeight / 2;

		let mouseX1 = ((width - e.clientX) / 30);
		let mouseX2 = ((width - e.clientX) / 60);
		// let mouseX3 = ((width - e.clientX) / 90);
		let mouseY1 = ((height - e.clientY) / 30);
		let mouseY2 = ((height - e.clientY) / 60);
		// let mouseY3 = ((height - e.clientY) / 90);

		goal_layer1.style.transform = "translate("+ -mouseX1 + "px," + -mouseY1 + "px)";
		goal_layer2.style.transform = "translate("+ mouseX2 + "px," + mouseY2 + "px)";
		// layer3.style.transform = "translate("+ -mouseX3 + "px," + -mouseY3 + "px)";
		
		deal_layer1.style.transform = "translate("+ -mouseX1 + "px," + -mouseY1 + "px)";
		deal_layer2.style.transform = "translate("+ mouseX2 + "px," + mouseY2 + "px)";
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
