$(document).ready(function(){
    // Слайдер на сайте
    $('.carousel__inner').slick({
        speed: 1000,
        // adaptiveHeight: true,
        fade: true,
        cssEase: 'linear',
        prevArrow: '<button type="button" class="slick-prev"><img src="img/icons/left_arrow.png"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="img/icons/right_arrow.png"></button>',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    dots: true,
                    arrows: false
                }
            }
        ]
      });

    //   Команда для кликов на Табы
      $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
      });

    //   При клики на "подробнее" или "назад" выводиться контент карточки
    function toggleSlide(item) {
    $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            });
        });
    };

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    //Modal

    // При клике на кнопку появляется подальное окно
    $('[data-modal=consultation]').on('click', function() {
      $('.overlay, #consultation').fadeIn('slow');
    });
    //При клике на крестик - модальное окно закрывается
    $('.modal__close').on('click', function() {
      $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
    });
    // При клике на кнопку появляется подальное окно и заменяет заголовки в модальных окнах из оригинала
    $('.catalog-item__btn').each(function(i) {
      $(this).on('click', function() {
        $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
        $('.overlay, #order').fadeIn('slow');
      });
    });

    // При неправильном заполнении формы выводятся ошибки
    function validateForms(form){
      $(form).validate({
        rules: {
          name: {
            required: true,
            minlength: 2
          },
          number: "required",
          email: {
            required: true,
            email: true
          }
        },
        messages: {
          name: {
            required: "Пожалуйста, введите свое имя",
            minlength: jQuery.validator.format("Введите {0} символа")
          },
          number: "Пожалуйста, введите свой номер телефона",
          email: {
            required: "Пожалуйста, введите свою почту",
            email: "Неправильно введен адрес почты" 
          }
        }
      });
    };

    validateForms('#order form');
    validateForms('#consultation form');
    validateForms('#consultation-form');

    // Маска ввода для телефона
    $('input[name=number]').mask("+38(999) 999-99-99");

    $('form').submit(function(e) {
      e.preventDefault(); // Отменяет стандартное поведение браузера
      $.ajax({
        type: "POST", //Отдаю данные на сервер
        url: "mailer/smart.php", //Куда отправляется наш запрос
        data: $(this).serialize()
      }).done(function() {
        $(this).find("input").val("");
        $('#consultation, #order').fadeOut();
        $('.overlay, #thanks').fadeIn('slow');

        $('form').trigger('reset');
      });
      return false;
    });

    // Smooth scroll and pageup

    $(window).scroll(function() {
      // При скроле больше чем 1600px
      if ($(this).scrollTop() > 1100) {
        $('.pageup').fadeIn();
      } else {  
        $('.pageup').fadeOut();
      }
    });

    $('.pageup').click(function() {
      $('html, body').animate({scrollTop: 0},500);
      return false;
    })
  });
  