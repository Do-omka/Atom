document.addEventListener('DOMContentLoaded', (e)=> {
	
	function findAncestor (el, cls) {
		while ((el = el.parentElement) && !el.classList.contains(cls));
		return el
	}
	
	let recalls = document.querySelectorAll('.recall')
	for (let i = 0; i < recalls.length; i++) {
		recalls[i].addEventListener('click', (e)=> {
			document.getElementById('recall_popup').classList.add('active')
			document.getElementById('recall_popup').classList.remove('inactive')
		})
	}
	
	let close = document.querySelectorAll('.close')
	for (let i = 0; i < close.length; i++) {
		close[i].addEventListener('click', (e)=> {
			let pop = findAncestor(close[i], 'popup')
			pop.classList.add('inactive')
			pop.classList.remove('active')
		})
	}
	
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
	
})
