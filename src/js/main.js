document.addEventListener('DOMContentLoaded', (e)=> {
	
	function findAncestor (el, cls) {
		while ((el = el.parentElement) && !el.classList.contains(cls));
		return el
	}
	
	// fixed header
	document.querySelector('body > header').style.marginTop = getComputedStyle(document.querySelector('body > header nav')).getPropertyValue('height')
	
	document.querySelector('body > header nav').style.position = 'fixed'
	document.querySelector('body > header nav').style.zIndex = '2'
	document.querySelector('body > header nav').style.top = '0'
	document.querySelector('body > header nav').style.width = '100%'
	
	// recall popup
	let recalls = document.querySelectorAll('.recall')
	for (let i = 0; i < recalls.length; i++) {
		recalls[i].addEventListener('click', (e)=> {
			document.getElementById('recall_popup').classList.add('active')
			document.getElementById('recall_popup').classList.remove('inactive')
		})
	}
	
	// close buttons
	let close = document.querySelectorAll('.close')
	for (let i = 0; i < close.length; i++) {
		close[i].addEventListener('click', (e)=> {
			let pop = findAncestor(close[i], 'popup')
			pop.classList.add('inactive')
			pop.classList.remove('active')
		})
	}
	
	//close popup on click outside
	let popup_close = document.querySelectorAll('.popup')
	for (let i = 0; i < popup_close.length; i++) {
		popup_close[i].addEventListener('click', (e)=> {
			popup_close[i].classList.add('inactive')
			popup_close[i].classList.remove('active')
		})
	}
	
	document.querySelector('.popup form').addEventListener('click', (e)=> {
		e.stopPropagation()
	})
	
	// city select drop down
	document.querySelector('.city_select .select').addEventListener('click', (e)=> {
		e.stopPropagation()
	})
	document.querySelector('.city_select').addEventListener('click', (e)=> {
		if (document.querySelector('.city_select').classList.contains('active')) {
			document.querySelector('.city_select').classList.add('inactive')
			document.querySelector('.city_select').classList.remove('active')
		} else {
			document.querySelector('.city_select').classList.add('active')
			document.querySelector('.city_select').classList.remove('inactive')
		}
	})
	
//	slider

let slider_position = 0;

	let next = document.querySelectorAll('.next')
	for (let i = 0; i < next.length; i++) {
		next[i].addEventListener('click', (e)=> {
			let slider = findAncestor(next[i], 'slider')
			let active_slide = slider.querySelector('.article.active')
			if (active_slide.nextElementSibling) {
				active_slide.classList.remove('active')
				active_slide.nextElementSibling.classList.add('active')
				//move
				let slides = slider.querySelectorAll('.article')
				for (let j = 0; j < slides.length; j++) {
					if (slides[j].classList.contains('active')) {
						slider.querySelector('.slide').style.transform = 'translateX(-' + (j*active_slide.clientWidth).toString() + 'px)';
					}
				}
			}
		})
	}
	
	let prev = document.querySelectorAll('.prev')
	for (let i = 0; i < prev.length; i++) {
		prev[i].addEventListener('click', (e)=> {
			let slider = findAncestor(prev[i], 'slider')
			let active_slide = slider.querySelector('.article.active')
			if (active_slide.previousElementSibling) {
				active_slide.classList.remove('active')
				active_slide.previousElementSibling.classList.add('active')
				//move
				let slides = slider.querySelectorAll('.article')
				for (let j = 0; j < slides.length; j++) {
					if (slides[j].classList.contains('active')) {
						slider.querySelector('.slide').style.transform = 'translateX(-' + (j*active_slide.clientWidth).toString() + 'px)';
					}
				}
				
			}
		})
	}
	
})
