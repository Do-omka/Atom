"use strict";document.addEventListener("DOMContentLoaded",function(e){for(var t=document.querySelectorAll(".recall"),c=0;c<t.length;c++)t[c].addEventListener("click",function(e){document.getElementById("recall_popup").classList.add("active"),document.getElementById("recall_popup").classList.remove("inactive")});for(var n=document.querySelectorAll(".close"),i=function(c){n[c].addEventListener("click",function(e){var t=function(e,t){for(;(e=e.parentElement)&&!e.classList.contains(t););return e}(n[c],"popup");t.classList.add("inactive"),t.classList.remove("active")})},o=0;o<n.length;o++)i(o);for(var s=document.querySelectorAll(".popup"),l=function(t){s[t].addEventListener("click",function(e){s[t].classList.add("inactive"),s[t].classList.remove("active")})},r=0;r<s.length;r++)l(r);document.querySelector(".popup form").addEventListener("click",function(e){e.stopPropagation()}),document.querySelector(".city_select .select").addEventListener("click",function(e){e.stopPropagation()}),document.querySelector(".city_select").addEventListener("click",function(e){document.querySelector(".city_select").classList.contains("active")?(document.querySelector(".city_select").classList.add("inactive"),document.querySelector(".city_select").classList.remove("active")):(document.querySelector(".city_select").classList.add("active"),document.querySelector(".city_select").classList.remove("inactive"))})});
//# sourceMappingURL=main.js.map
