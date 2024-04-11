import ipads from '../data/ipads.js';
import navigations from '../data/navigations.js';
// js파일에서 import라는 함수를 사용하고자 하면 js를 불러오는 html에서 script type을 module로 변경해야 가져올 수 있음

const basketStarterEl = document.querySelector('header .basket-starter');
const basketEl = basketStarterEl.querySelector('.basket');

basketStarterEl.addEventListener('click',(e)=>{
  e.stopPropagation();
  // basketStarter클릭시에는 버블링 스탑해서 window이벤트는 작동하지 않음.
  // basketEl.classList.contains('show'); 해당 엘리먼트에 클래스(show) 포함여부 확인
  if(basketEl.classList.contains('show'))
  {
    hideBasket();
  }
  else
  {
    showBasket();
  }
})

basketEl.addEventListener('click',(e)=>{
  // basketEl 클릭시에는 버블링 스탑해서 basketStarterEl 이벤트는 작동하지 않음.
  e.stopPropagation();
})

window.addEventListener('click',()=>{
  hideBasket();
})

// 함수 추상화
function showBasket() {
  basketEl.classList.add('show');

}
function hideBasket() {
  basketEl.classList.remove('show');
}

// 검색!
const headerEl = document.querySelector('header');
//전개 연산자 + 얕게 복사자
const headerMenuEls = [...headerEl.querySelectorAll('ul.menu>li')];
const searchWrapEl = headerEl.querySelector('.search-wrap');
const searchStarterEl = headerEl.querySelector('.search-starter');
const searchCloserEl = searchWrapEl.querySelector('.search-closer');
const shadowEl = searchWrapEl.querySelector('.shadow');
const searchInputEl = searchWrapEl.querySelector('input');
const searchDelayEls = [...searchWrapEl.querySelectorAll('li')];


searchStarterEl.addEventListener('click',showSearch);
searchCloserEl.addEventListener('click', (e)=>{
  e.stopPropagation();
  hideSearch();
});
shadowEl.addEventListener('click', hideSearch);


function showSearch() {
  headerEl.classList.add('searching');
  stopScroll();
  // document.documentElement = html태그임
  headerMenuEls.reverse().forEach((el, index)=>{
    el.style.transitionDelay = index * .4 / headerMenuEls.length + 's';
  })

  searchDelayEls.forEach((el, index)=>{
    el.style.transitionDelay = index * .4 / searchDelayEls.length + 's';
  })
  setTimeout(() => {
    searchInputEl.focus();
  }, 600);
}

function hideSearch() {
  headerEl.classList.remove('searching');
  playScroll();
  headerMenuEls.reverse().forEach((el, index)=>{
    el.style.transitionDelay = index * .4 / headerMenuEls.length + 's';
  })

  searchDelayEls.reverse().forEach((el, index)=>{
    el.style.transitionDelay = index * .4 / searchDelayEls.length + 's';
  })
  searchDelayEls.reverse();
  searchInputEl.value = "";
}

function playScroll() {
  document.documentElement.classList.remove('fixed');

}

function stopScroll() {
  document.documentElement.classList.add('fixed');
}

//해더 메뉴 토글
const menuStarterEl = document.querySelector('header .menu-starter');
menuStarterEl.addEventListener('click',()=>{
  if(headerEl.classList.contains('menuing')){
    headerEl.classList.remove('menuing');  
    searchInputEl.value = "";
    playScroll();
  }else{
    headerEl.classList.add('menuing');
    stopScroll();
  }
})

// 헤더 검색
const searchTextFieldEl = document.querySelector('header .textfield');
const searchCancelEl = document.querySelector('header .search-canceler');
searchTextFieldEl.addEventListener('click',()=>{
  headerEl.classList.add('searching--mobile');
})
searchCancelEl.addEventListener('click',()=>{
  searchInputEl.focus();
  headerEl.classList.remove('searching--mobile');
})

window.addEventListener('resize', ()=>{
  if(window.innerWidth <=740) {
    headerEl.classList.remove('searching');
  }else{
    headerEl.classList.remove('searching--mobile');
  }
})

// 헤더
const navEl = document.querySelector('nav');
const navMenuToggleEl = navEl.querySelector('.menu-toggler');
const navMenuShadowEl = navEl.querySelector('.shadow');
navMenuToggleEl.addEventListener('click',()=>{
  if(navEl.classList.contains('menuing')){
    hideNavMenu();
  }else{
    showNavMenu();
  }
})

function showNavMenu(){
  navEl.classList.add('menuing');
}

function hideNavMenu(){
  navEl.classList.remove('menuing');
}
navEl.addEventListener('click',(e)=>{
  e.stopPropagation();
})
navMenuShadowEl.addEventListener('click',hideNavMenu)

window.addEventListener('click',hideNavMenu)



// 요소의 가시성(요서가 화면에 보이는 지 보이지 않는지 확인, spy보다 더 쉬운 유사한 기능)
const io = new IntersectionObserver((entries)=>{
  entries.forEach((entry)=>{
    if(!entry.isIntersecting) { entry.target.classList.remove('show'); return }
    // 해당 요소가 화면에 나타나지 않으면 클래스 제거
    entry.target.classList.add('show');
    // 해당 요소가 화면에 나타나면 클래스 추가
  })
})

const infoEls = document.querySelectorAll('.info');
infoEls.forEach((el)=>{
  io.observe(el);
  // 해당 요소들을 io안에 배열값으로 넣어줌
})

// 비디오 재생!
const video = document.querySelector('.stage video');
const playBtn = document.querySelector('.stage .controller--play');
const pauseBtn = document.querySelector('.stage .controller--pause');

playBtn.addEventListener('click',()=>{
  video.play();
  playBtn.classList.add('hide')
  pauseBtn.classList.remove('hide')
})

pauseBtn.addEventListener('click',()=>{
  video.pause();
  playBtn.classList.remove('hide');
  pauseBtn.classList.add('hide');
})

const itemsEl = document.querySelector('section.compare .items');
ipads.forEach((ipad)=>{
  const itemEl = document.createElement('div');
  itemEl.classList.add('item');

  let colorList = '';
  ipad.colors.forEach((color)=>{
    colorList += /* html */`
      <li style="background-color:${color};"></li>
    `
  })

  itemEl.innerHTML = /* html */`
    <div class="thumbnail">
      <img src="${ipad.thumbnail}" alt="${ipad.name}">
    </div>
    <ul class="colors">
      ${colorList}
    </ul>
    <h3 class="name">${ipad.name}</h3>
    <p class="tagline">${ipad.tagline}</p>
    <p class="price">￦${ipad.price.toLocaleString('en-Us')}</p>
    <button class="btn">구입하기</button>
    <a href="${ipad.url}" class="link">더 알아보기</a>
  `;
  itemsEl.append(itemEl);
})

const navigationsEl = document.querySelector("footer .navigations");
navigations.forEach((nav)=>{
  const mapEl = document.createElement('div');
  mapEl.classList.add('map');
  let mapList = '';
  nav.maps.forEach((map)=>{
    mapList += /* html */`
      <li>
        <a href="${map.url}">${map.name}</a>
      </li>
    `
  })
  mapEl.innerHTML = /*html*/`
    <h3>
      <span class="text">${nav.title}</span>
      <span class="icon">+</span>
    </h3>
    <ul>
      ${mapList}
    </ul>
  `
  navigationsEl.append(mapEl);
})

const thisYearEl = document.querySelector('span.this-year');
thisYearEl.textContent = new Date().getFullYear();

const mapEls = document.querySelectorAll('footer .navigations .map');
mapEls.forEach((el)=>{
  const h3El = el.querySelector('h3');
  h3El.addEventListener('click',()=>{
    el.classList.toggle('active');
    // add, remove역할을 동시에 할 수 있음, contains 조건문을 없애도 됨
  })
})