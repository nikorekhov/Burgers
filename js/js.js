$(function () {

	$('.hamburger-menu-link').on('click', function (e) {
		e.preventDefault()

		$('.phone-menu').fadeIn(1000);

	});

	$('.close__link').on('click', function (e) {
		e.preventDefault()

		$('.phone-menu').fadeOut(1000);

	});

});

$(function () {

	$('.ingredients').on('click', function () {

		$('.composition').slideToggle(300);
	});

});

$(function () {

	$('.menu-acco__img').on('click', function (e) {
		e.preventDefault()

		var elem = $(e.target),
			item = elem.closest('.menu-acco__item'),
			content = item.find('.menu-acco__content'),
			items = item.siblings(),
			otherContent = items.find('.menu-acco__content');



		if (!item.hasClass('active')) {
			items.removeClass('active');
			item.addClass('active');
			item.show('active');

			otherContent.css({
				'width': 0
			})

			content.css({
				'width': '20rem'
			})
		} else {
			item.removeClass('active')
			content.css({
				'width': 0
			})
		}


	});

});

$(function () {

	$('.team-acco__title').on('click', function (e) {
		e.preventDefault()

		var elem = $(e.target),
			item = elem.closest('.team-acco__item'),
			content = item.find('.team-acco__content'),
			items = item.siblings(),
			otherContent = items.find('.team-acco__content');



		if (!item.hasClass('active')) {
			items.removeClass('active');
			item.addClass('active');
			item.show('active');

			otherContent.css({
				'height': 0,
				'animation': 'slideUp .3s'
			})

			content.css({
				'height': '100%',
				'animation': 'slideDown .3s'
			})
		} else {
			item.removeClass('active')
			content.css({
				'height': 0,
				'animation': 'slideUp .3s'
			})
		}


	});

});

$(function () {

	ymaps.ready(init);
	var myMap;

	function init() {
		myMap = new ymaps.Map("map", {
			center: [59.93, 30.35],
			zoom: 11,
			controls: ["zoomControl", "fullscreenControl"]
		});

		myMap.behaviors.disable('scrollZoom');

		var myPlacemark = new ymaps.Placemark([59.939095, 30.315868
], {}, {
			iconLayout: 'default#image',
			iconImageHref: './img/icons/map-marker.svg',
			iconImageSize: [60, 60],
			iconImageOffset: [-3, -42]
		});
		myMap.geoObjects.add(myPlacemark);

		var myPlacemark = new ymaps.Placemark([59.934888, 30.439817], {}, {
			iconLayout: 'default#image',
			iconImageHref: './img/icons/map-marker.svg',
			iconImageSize: [60, 60],
			iconImageOffset: [-3, -42]
		});
		myMap.geoObjects.add(myPlacemark);
	};

});

$(function () {
	var sections = $('.section'),
		display = $('.maincontent'),
		inScroll = false;

	var md = new MobileDetect(window.navigator.userAgent),
		isMobile = md.mobile();

	var performTransition = function (sectionEq) {
		if (inScroll) return

		inScroll = true;

		var position = (sectionEq * -100) + '%';

		display.css({
			'transform': 'translateY(' + position + ')',
			'-webkit-transform': 'translateY(' + position + ')'
		})

		sections.eq(sectionEq).addClass('active')
			.siblings().removeClass('active');

		setTimeout(function () {
			inScroll = false;
			$('.fixed-menu__item').eq(sectionEq).addClass('active')
				.siblings().removeClass('active');
		}, 200);
	}

	var defineSections = function (sections) {
		var activeSection = sections.filter('.active');
		return {
			activeSection: activeSection,
			nextSection: activeSection.next(),
			prevSection: activeSection.prev()
		}
	}

	var scrollToSection = function (direction) {
		var section = defineSections(sections);

		if (direction == 'up' && section.nextSection.length) {
			performTransition(section.nextSection.index());
		}

		if (direction == 'down' && section.prevSection.length) {
			performTransition(section.prevSection.index());
		}
	}

	$('.wrapper').on({
		wheel: function (e) {
			var deltaY = e.originalEvent.deltaY;
			var direction = deltaY > 0 ?
				'up' :
				'down';

			scrollToSection(direction)
		},
		touchmove: function (e) {
			e.preventDefault();
		}
	});

	$(document).on('keydown', function (e) {
		var section = defineSections(sections);

		switch (e.keyCode) {
			case 40:
				if (section.nextSection.length) {
					performTransition(section.nextSection.index());
				}
				break;
			case 38:
				if (section.prevSection.length) {
					performTransition(section.prevSection.index());
				}
				break;
		}
	});

	$('[data-scroll-to]').on('click touchstart', function (e) {
		e.preventDefault();

		var elem = $(e.target);
		var sectionNum = parseInt(elem.attr('data-scroll-to'));
		performTransition(sectionNum);
	});

	if (isMobile) {
		$(window).swipe({
			swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
				scrollToSection(direction);
			}
		});
	}

});

$(function () {
	$('.reviews-launcher').fancybox();

	$('.close__link').on('click', function (e) {
		e.preventDefault()

		$.fancybox.close();
	});

});

(function( $ ){

$(function() {

  $('.order__form-tag').each(function(){
    // Объявляем переменные (форма и кнопка отправки)
	var form = $(this),
        btn = form.find('.order__form-button');

    // Добавляем каждому проверяемому полю, указание что поле пустое
	form.find('.order__form-input-error').addClass('empty_field');

    // Функция проверки полей формы
    function checkInput(){
      form.find('.order__form-input-error').each(function(){
        if($(this).val() != ''){
          // Если поле не пустое удаляем класс-указание
		$(this).removeClass('empty_field');
        } else {
          // Если поле пустое добавляем класс-указание
		$(this).addClass('empty_field');
        }
      });
    }

    // Функция подсветки незаполненных полей
    function lightEmpty(){
      form.find('.empty_field').css({'border': '2px solid #d8512d'});
      // Через полсекунды удаляем подсветку
      setTimeout(function(){
        form.find('.empty_field').removeAttr('style');
      },1500);
    }

    // Проверка в режиме реального времени
    setInterval(function(){
      // Запускаем функцию проверки полей на заполненность
	  checkInput();
      // Считаем к-во незаполненных полей
      var count = $('.empty_field').length;
      // Вешаем условие-тригер на кнопку отправки формы
      if(count > 0){
        if(btn.hasClass('disabled')){
          return false
        } else {
          btn.addClass('disabled')
        }
      } else {
        btn.removeClass('disabled')
      }
    },500);

    // Событие клика по кнопке отправить
    btn.click(function(){
      if($(this).hasClass('disabled')){
        // подсвечиваем незаполненные поля и форму не отправляем, если есть незаполненные поля
		lightEmpty();
        return false
      } else {
        // Все хорошо, все заполнено, отправляем форму
			var submitForm = function (ev) {
			ev.preventDefault();
			// console.log(ev);

			var form = $(ev.target);

			var request = ajaxForm(form);

			request.done(function (msg) {
				var mes = msg.mes,
					status = msg.status;

			if (status === 'OK') {
				$(document).ready(function () {
					$("#form-popup").fancybox().trigger('click');
				});
				form.append('');
			} else {
				$(document).ready(function () {
					$("#form-popup").fancybox().trigger('click');
				});
			}
			});

			request.fail(function (jqXHR, textStatus) {
				alert("Request failed: " + textStatus);
			});
			}

			var ajaxForm = function (form) {

				var url = form.attr('action'),
					data = form.serialize();

				return $.ajax({
					type: 'POST',
					url: url,
					data: data,
					dataType: 'JSON'
				});

			}

			$('#order-form').on('submit', submitForm);
      }
    });
  });
});



})( jQuery );
$(document).ready(function () {
	$(".owl-carousel").owlCarousel({
		responsive: {
			0: {
				items: 1,
				nav: true
			}
		}
	});
});
