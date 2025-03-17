;
(function( $ ) {

    $('.home-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        dots: false,
        fade: true,

    });

    jQuery(document).ready(function($) {
        $('.openService').on('click', function() {
            $(this).closest('.our-service__item').find('.our-service__text').stop(true, true).toggle('fast');
        });
    });

    $(document).ready(function () {
        $(window).on('scroll', function () {
            if ($(this).scrollTop() > 0) { // Adjust the threshold as needed
                $('.header').addClass('header-scrolled');
            } else {
                $('.header').removeClass('header-scrolled');
            }
        });
    });

    $(document).ready(function () {
        const monthNames = ["Sausis", "Vasaris", "Kovas", "Balandis", "Gegužė", "Birželis", "Liepa", "Rugpjūtis", "Rugsėjis", "Spalis", "Lapkritis", "Gruodis"];
        const startYear = 2015;
        const endYear = 2026;
        let currentDate = new Date();
        let today = new Date();

        function populateMonthYear() {
            $('#month-year').empty();
            for (let year = startYear; year <= endYear; year++) {
                for (let month = 0; month < 12; month++) {
                    let option = `<option value="${year}-${month}" ${year === currentDate.getFullYear() && month === currentDate.getMonth() ? 'selected' : ''}>${monthNames[month]} ${year}</option>`;
                    $('#month-year').append(option);
                }
            }
        }

        function renderCalendar(year, month) {
            if (year < startYear || year > endYear) return;
            $('.calendar-days').empty();
            let firstDay = new Date(year, month, 1).getDay();
            let daysInMonth = new Date(year, month + 1, 0).getDate();
            let calendarHtml = '';

            for (let i = 0; i < firstDay; i++) {
                calendarHtml += '<div></div>';
            }
            for (let day = 1; day <= daysInMonth; day++) {
                let isToday = year === today.getFullYear() && month === today.getMonth() && day === today.getDate();
                calendarHtml += `<div class="day ${isToday ? 'today' : ''}">${day}</div>`;
            }
            $('.calendar-days').html(calendarHtml);
        }

        populateMonthYear();
        renderCalendar(currentDate.getFullYear(), currentDate.getMonth());

        $('#prev-month').click(function () {
            let selected = $('#month-year').val().split('-');
            let year = parseInt(selected[0]);
            let month = parseInt(selected[1]) - 1;
            if (month < 0) { month = 11; year--; }
            $('#month-year').val(`${year}-${month}`).change();
        });

        $('#next-month').click(function () {
            let selected = $('#month-year').val().split('-');
            let year = parseInt(selected[0]);
            let month = parseInt(selected[1]) + 1;
            if (month > 11) { month = 0; year++; }
            $('#month-year').val(`${year}-${month}`).change();
        });

        $('#month-year').change(function () {
            let selected = $(this).val().split('-');
            let year = parseInt(selected[0]);
            let month = parseInt(selected[1]);
            renderCalendar(year, month);
        });
    });


    $('.testimonials__slider').slick({
        dots: false,
        infinite: true,
        arrows: false,
        speed: 300,
        slidesToShow: 2,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    fade: true,
                }
            },
        ]
    });

    $(document).ready(function() {
        $('.header__button-open').click(function() {
            $('#menu').toggleClass('mega-header-active');
            $('.header__button').toggleClass('header__button-active');
            $('body').toggleClass('no-scroll');
        });
    });

    jQuery(document).ready(function ($) {
        $(".openSearch").on("click", function () {
            $(".body-overlay").addClass("body-overlay-active");
            $(".form-search-block").addClass("form-search-block-active");
        });

        $(".button-close").on("click", function () {
            closeSearch();
        });

        $(document).on("keydown", function (e) {
            if (e.key === "Escape") {
                closeSearch();
            }
        });

        function closeSearch() {
            $(".body-overlay").removeClass("body-overlay-active");
            $(".form-search-block").removeClass("form-search-block-active");
        }
    });

    const div = document.getElementById("clickWrapper");

    div.addEventListener('click', () => {
        const span = div.firstElementChild; // Get the first child element (the <span>)

        if(span.classList.contains("close")){
            span.className = "menu animate";
        } else {
            span.className = "close animate";
        }
    });

    $(document).ready(function() {
        const months = ["Sausis", "Vasaris", "Kovas", "Balandis", "Gegužė", "Birželis", "Liepa", "Rugpjūtis", "Rugsėjis", "Spalis", "Lapkritis", "Gruodis"];
        let currentYear = 2025;
        let currentMonth = 0;

        // Define events
        const events = {
            "2025-01-15": '<button class="openEvent openEvent-01-15">Lorem ipsum dolor</button>',
            "2025-01-23": '<div class="events-open-buttons"><button class="openEvent openEvent-01-23-1">Lorem ipsum dolor</button><button class="openEvent openEvent-01-23-2">Lorem ipsum dolor</button></div>',
            "2025-01-25": '<button class="openEvent openEvent-01-25">Lorem ipsum dolor</button>',
        };

        function renderCalendar(year, month) {
            $("#calendar-title-big").text(`${months[month]} ${year}`);
            let firstDay = new Date(year, month, 1).getDay();
            let lastDate = new Date(year, month + 1, 0).getDate();
            let prevLastDate = new Date(year, month, 0).getDate();
            let nextDays = 42 - (firstDay + lastDate);
            let gridHtml = "";

            for (let i = firstDay; i > 0; i--) {
                gridHtml += `<div class="calendar-day-big prev-month"><span>${prevLastDate - i + 1}</span></div>`;
            }
            for (let i = 1; i <= lastDate; i++) {
                let eventKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
                let eventHtml = events[eventKey] ? events[eventKey] : "";
                gridHtml += `<div class="calendar-day-big"><span>${i}</span>${eventHtml}</div>`;
            }
            for (let i = 1; i <= nextDays; i++) {
                gridHtml += `<div class="calendar-day-big next-month"><span>${i}</span></div>`;
            }
            $("#calendar-grid-big").html(gridHtml);
        }

        $("#prev-month-big").click(function() {
            if (currentYear > 2024 || (currentYear === 2024 && currentMonth > 0)) {
                currentMonth--;
                if (currentMonth < 0) {
                    currentMonth = 11;
                    currentYear--;
                }
                renderCalendar(currentYear, currentMonth);
            }
        });

        $("#next-month-big").click(function() {
            if (currentYear < 2025 || (currentYear === 2025 && currentMonth < 11)) {
                currentMonth++;
                if (currentMonth > 11) {
                    currentMonth = 0;
                    currentYear++;
                }
                renderCalendar(currentYear, currentMonth);
            }
        });

        renderCalendar(currentYear, currentMonth);
    });

    $(document).ready(function () {
        $(".openEvent-01-15").click(function () {
            $(".events-page__tab-calendar-big .calendar-popups #openEvent-01-15").toggleClass("calendar-popup-active");
            $(".events-page__tab-calendar-big .events-overlay").toggleClass("events-overlay-active");
        });

        $(".closeCalendarPopup-01-15").click(function () {
            $(".events-page__tab-calendar-big .calendar-popups #openEvent-01-15").toggleClass("calendar-popup-active");
            $(".events-page__tab-calendar-big .events-overlay").toggleClass("events-overlay-active");
        });
    });

    $(document).ready(function () {
        $(".openEvent-01-23-1").click(function () {
            $(".events-page__tab-calendar-big .calendar-popups #openEvent-01-23-1").toggleClass("calendar-popup-active");
            $(".events-page__tab-calendar-big .events-overlay").toggleClass("events-overlay-active");
        });

        $(".closeCalendarPopup-01-23-1").click(function () {
            $(".events-page__tab-calendar-big .calendar-popups #openEvent-01-23-1").toggleClass("calendar-popup-active");
            $(".events-page__tab-calendar-big .events-overlay").toggleClass("events-overlay-active");
        });
    });

    $(document).ready(function () {
        $(".openEvent-01-23-2").click(function () {
            $(".events-page__tab-calendar-big .calendar-popups #openEvent-01-23-2").toggleClass("calendar-popup-active");
            $(".events-page__tab-calendar-big .events-overlay").toggleClass("events-overlay-active");
        });

        $(".closeCalendarPopup-01-23-2").click(function () {
            $(".events-page__tab-calendar-big .calendar-popups #openEvent-01-23-2").toggleClass("calendar-popup-active");
            $(".events-page__tab-calendar-big .events-overlay").toggleClass("events-overlay-active");
        });
    });

    $(document).ready(function () {
        $(".openEvent-01-25").click(function () {
            $(".events-page__tab-calendar-big .calendar-popups #openEvent-01-25").toggleClass("calendar-popup-active");
            $(".events-page__tab-calendar-big .events-overlay").toggleClass("events-overlay-active");
        });

        $(".closeCalendarPopup-01-25").click(function () {
            $(".events-page__tab-calendar-big .calendar-popups #openEvent-01-25").toggleClass("calendar-popup-active");
            $(".events-page__tab-calendar-big .events-overlay").toggleClass("events-overlay-active");
        });
    });

    $(document).ready(function () {
        $('.events-tab-list').on('click', function (e) {
            e.preventDefault();

            // Remove active class from all buttons
            $('.events-tab-list').removeClass('events-tab-list-active');

            // Add active class to clicked button
            $(this).addClass('events-tab-list-active');

            // Get target tab ID from href attribute
            let targetTab = $(this).attr('href');

            // Hide all tabs
            $('.events-page__tab').removeClass('events-page__tab-active');

            // Show the selected tab
            $(targetTab).addClass('events-page__tab-active');
        });
    });

    $('.image-slider__list').slick({
        dots: false,
        infinite: true,
        speed: 500,
        fade: true,
        arrows: true,
        cssEase: 'linear'
    });

    $(document).ready(function() {
        $('.vacancy__title').on('click', function() {
            var $vacancy = $(this).closest('.vacancy'); // Find the closest .vacancy
            $vacancy.toggleClass('vacancy-active'); // Toggle the .vacancy-active class
            $vacancy.find('.vacancy__block').toggle('fast'); // Toggle visibility of the .vacancy__block
        });
    });

    $(document).ready(function() {
        let currentStep = 0;
        let steps = $(".form-step");

        // Hide all steps except the first one
        steps.hide().eq(currentStep).show();

        $(".step-next").on("click", function() {
            if (currentStep < steps.length - 1) {
                steps.eq(currentStep).hide();
                currentStep++;
                steps.eq(currentStep).show();
            }
        });

        $(".step-prev").on("click", function() {
            if (currentStep > 0) {
                steps.eq(currentStep).hide();
                currentStep--;
                steps.eq(currentStep).show();
            }
        });
    });



}( jQuery ));
