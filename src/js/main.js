document.addEventListener('DOMContentLoaded', (e)=> {
	
	function findAncestor (el, cls) {
		while ((el = el.parentElement) && !el.classList.contains(cls));
		return el
	}
	
	// fixed header
	document.querySelector('body > header').style.marginTop = getComputedStyle(document.querySelector('body > header nav')).getPropertyValue('height')
	
	document.querySelector('body > header nav').style.position = 'fixed'
	document.querySelector('body > header nav').style.zIndex = '1'
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
	
})
