/**
 * 검색창 제어
 */
// 돋보기 아이콘만 누르면 input 태그 focus 안 되는 현상 해결
const searchEl = document.querySelector('.search');
const searchInputEl = searchEl.querySelector('input');

searchEl.addEventListener('click', function () {
  searchInputEl.focus();
});

// input 요소 focus될 때
searchInputEl.addEventListener('focus', function () {
  searchEl.classList.add('focused');
  searchInputEl.setAttribute('placeholder', '통합검색'); // HTML 속성을 지정하는 메소드
});

// input 요소에서 blur가 될 때
searchInputEl.addEventListener('blur', function () {
  searchEl.classList.remove('focused');
  searchInputEl.setAttribute('placeholder', ''); // HTML 속성을 지정하는 메소드
});


/**
 * 페이지 스크롤에 따른 요소 제어
 */
// BADGES, To Top 버튼
const badgeEl = document.querySelector('header .badges');
const toToplEl = document.querySelector('#to-top');

window.addEventListener('scroll', _.throttle(function () {
  // console.log(window.scrollY)
  if (window.scrollY > 500) {
    // 배지 숨기기
    // badgeEl.style.display = 'none'
    // gsap.to(요소, 지속시간, 옵션);
    gsap.to(badgeEl, .6, {
      opacity: 0,
      display: 'none',
    });
    // To Top 버튼 보이기 !
    gsap.to(toToplEl, .2, {
      x: 0,
    });
  } else {
    // 배지 보이기
    // badgeEl.style.display = 'block'
    gsap.to(badgeEl, .6, {
      opacity: 1,
      display: 'block',
    });
    // To Top 버튼 숨기기 !
    gsap.to(toToplEl, .2, {
      x: 100,
    });
  }
}, 300));
// _.throttle(함수, 시간)

toToplEl.addEventListener('click', function () {
  gsap.to(window, .7, {
    scrollTo: 0,
  });
});


/**
 * 순차적 애니메이션
 */
const fadeEls = document.querySelectorAll('.visual .fade-in');
fadeEls.forEach(function (fadeEl, index) { // 반복적으로 실행
  // gsap.to(요소, 지속시간, 옵션);
  gsap.to(fadeEl, 1, {
    delay: (index + 1) * .7, // 0(첫번째), 1.4, 2.1, 2.7 ... 
    opacity: 1,
  });
});


/**
 * // Swiper, 슬라이드 요소 관리
 */
// new Siper(선택자, 옵션)
// new : 자바스크립트의 생성자(클래스) 
new Swiper('.notice-line .swiper', {
  // Optional parameters
  direction: 'vertical', // 기본값은 horizental(명시할 필요X)
  autoplay: true, // 자동 재생 여부
  loop: true, // 반복 재생 여부
});

new Swiper('.promotion .swiper', {
  slidesPerView: 3, // 한번에 보여줄 슬라이드 개수
  spaceBetween: 10, // 슬라이드 사이 여백
  centeredSlides: true, // 1번 슬라이드가 가운데 보이기
  loop: true,
  autoplay: {
    delay: 5000, // 5초마다 슬라이드 바뀜
  },
  pagination: {
    el: '.promotion .swiper-pagination', // 페이지 번호 요소 선택자
    clickable: true, // 사용자의 페이지 번호 요소 제어 가능 여부
  },
  navigation: {
    nextEl: '.promotion .swiper-button-next',
    prevEl: '.promotion .swiper-button-prev',
  },
});

new Swiper('.awards .swiper', {
  // direction: 'horizontal', // 수평 슬라이드
  autoplay: true, // 자동 재생 여부
  loop: true, // 반복 재생 여부
  spaceBetween: 30, // 슬라이드 사이 여백
  slidesPerView: 5, // 한 번에 보여줄 슬라이드 개수
  // slidesPerGroup: 5, // 한 번에 슬라이드 할 개수(전체 개수로 나뉘어야 함)
  navigation: { // 슬라이드 이전/다음 버튼 사용 여부
    prevEl: '.awards .swiper-button-prev', // 이전 버튼 선택자
    nextEl: '.awards .swiper-button-next' // 다음 버튼 선택자
  }
})


/**
 * // 슬라이드 토글
 */
const promotionEl = document.querySelector('.promotion');
const promotionToggleBtn = document.querySelector('.toggle-promotion');
let isHidePromotion = false; // 프로모션 버튼 숨겨져 있니? 아니. 보이고 있어
promotionToggleBtn.addEventListener('click', function () {
  isHidePromotion = !isHidePromotion
  if (isHidePromotion) {
    // 숨김 처리!
    promotionEl.classList.add('hide');
  } else {
    // 보임 처리!
    promotionEl.classList.remove('hide');
  }
});


// 범위 랜덤 함수(소수점 2자리까지)
function random(min, max) {
  // `.toFixed()`를 통해 반환된 문자 데이터를,
  // `parseFloat()`을 통해 소수점을 가지는 숫자 데이터로 변환
  return parseFloat((Math.random() * (max - min) + min).toFixed(2))
}
// 유튜브 배경 - 반복 애니메이션
function floatingObject(selector, delay, size) {
  // gsap.to(요소, 시간, 옵션);
  gsap.to(selector, // 선택자
    random(1.5, 2.5), // 애니메이션 동작 시간
    { // 옵션
    y: size, // `transform: translateY(수치);`와 같음. 수직으로 얼마나 움직일지 설정.
    repeat: -1, // 몇 번 반복하는지를 설정, '-1'은 무한 반복
    yoyo: true, // 한 번 재생된 애니메이션을 다시 뒤로 재생
    ease: Power1.easeInOut,
    delay: random(0, delay) // 최소값, 최대값
    }
  );
}
floatingObject('.floating1', 1, 15);
floatingObject('.floating2', .5, 15);
floatingObject('.floating3', 1.5, 20);


/**
 * 요소가 화면에 보여짐 여부에 따른 요소 관리
 */
// 관리할 요소들 검색!
const spyEls = document.querySelectorAll('section.scroll-spy')
// 요소들 반복 처리!
spyEls.forEach(function (spyEl) {
  new ScrollMagic
    .Scene({ // 감시할 장면(Scene)을 추가
      triggerElement: spyEl, // 보여짐 여부를 감시할 요소를 지정
      triggerHook: .8 // 화면의 80% 지점에서 보여짐 여부 감시
    })
    .setClassToggle(spyEl, 'show') // 요소가 화면에 보이면 show 클래스 추가
    .addTo(new ScrollMagic.Controller()) // 컨트롤러에 장면을 할당(필수!)
})


/**
 * 올해가 몇 년도 인지 계산
 */
const thisYear = document.querySelector('.this-year')
thisYear.textContent = new Date().getFullYear()
// 현재 년도의 정보 데이터가 반환됨