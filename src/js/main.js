document.addEventListener('DOMContentLoaded', (e)=> {
	
	function getCookie(name) {
	  let matches = document.cookie.match(new RegExp(
	    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
	  ));
	  return matches ? decodeURIComponent(matches[1]) : undefined;
	}

	function setCookie(name, value, options) {
	  options = options || {};
		let expires = options.expires;

	  if (typeof expires == "number" && expires) {
	    let d = new Date();
	    d.setDate(d.getDate() + expires);
	    expires = options.expires = d;
	  } else {
			let d = new Date();
	    d.setDate(d.getDate() + 30);
	    expires = options.expires = d;
		}
		
	  if (expires && expires.toUTCString) {
	    options.expires = expires.toUTCString();
	  }
	  
		console.log(options.expires)
	  value = encodeURIComponent(value);
	  
	  let updatedCookie = name + "=" + value;
	  
	  for (let propName in options) {
	    updatedCookie += "; " + propName;
	    let propValue = options[propName];
	    if (propValue !== true) {
	      updatedCookie += "=" + propValue;
	    }
	  }
	  document.cookie = updatedCookie;
	}
	
	function findAncestor (el, cls) {
		while ((el = el.parentElement) && !el.classList.contains(cls));
		return el
	}
	
	//get user's city from cookie
	if (getCookie('user_city')!==undefined) {
		 document.querySelector('.city_select > p').innerHTML = getCookie('user_city')
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
	document.querySelector('.city_select > p').addEventListener('click', (e)=> {
		if (document.querySelector('.city_select').classList.contains('active')) {
			document.querySelector('.city_select').classList.add('inactive')
			document.querySelector('.city_select').classList.remove('active')
			document.querySelector('.city_select .autocomplete-suggestions').style.display = 'none'
		} else {
			document.querySelector('.city_select').classList.add('active')
			document.querySelector('.city_select').classList.remove('inactive')
			document.querySelector('#user_city').select()
			document.querySelector('#user_city').dispatchEvent(new Event('focus'))
		}
	})
	
//	slider
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
	
	//city select autocomplete
	new autoComplete({
		selector: '#user_city',
		minChars: 0,
		offsetLeft: -5,
		offsetTop: 5,
		source: function(term, suggest){
			term = term.toLowerCase()
			let choices = []
			let cities = document.querySelectorAll('#cities li')
			for (let i = 0; i < cities.length; i++) {
				choices.push(cities[i].innerHTML)
			}
			let matches = [];
			for (let i=0; i<choices.length; i++)
			if (~choices[i].toLowerCase().indexOf(term)) matches.push(choices[i])
			suggest(matches)
		},
		onSelect: function (event, term, item) {
			document.querySelector('.city_select > p').innerHTML = term
			setCookie('user_city', term)
			document.querySelector('#user_city').value = ''
			document.querySelector('.city_select').classList.add('inactive')
			document.querySelector('.city_select').classList.remove('active')
		}
	})
	
})
