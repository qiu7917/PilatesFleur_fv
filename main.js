// ===============================================
//     ハンバーガーメニュー
// ===============================================


$(function () {
    $('.hamburger').on('click', function () {
        $('header').toggleClass('open');
    });

    $('.mask, nav a, main').on('click', function () {
        $('header').removeClass('open');
    });
});



// ===============================================
//     flow画像
// ===============================================


document.addEventListener('DOMContentLoaded', () => {
    const flowItems = document.querySelectorAll('.flow-item');
    const flowImages = document.querySelectorAll('.flow-img img');

    if (flowItems.length === 0 || flowImages.length === 0) {
        console.warn('フローアイテムまたは画像が見つかりません。体験レッスンの流れの画像切り替え処理を停止します。');
        return;
    }

    // 初期状態として最初の画像をアクティブにする
    if (flowImages[0]) {
        flowImages[0].classList.add('active');
    } else {
        console.warn('初期画像をアクティブにできませんでした。画像要素が存在しません。');
        return;
    }

    const options = {
        root: null,
        rootMargin: '0px 0px -50% 0px',
        threshold: 0
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            const itemIndex = Array.from(flowItems).indexOf(entry.target);

            if (entry.isIntersecting) {
                let imageToShowIndex;

                // flow-item のインデックスに基づいて表示する画像を決定
                if (itemIndex === 0) {
                    // 1個目の flow-item の場合（インデックス0,）
                    // 最初の画像を表示
                    imageToShowIndex = 0; // flowImages[0]
                } else if (itemIndex === 1 || itemIndex === 2) {
                    // 2個目、3個目の flow-item の場合（インデックス1, 2）
                    // 2番目の画像を表示
                    imageToShowIndex = 1; // flowImages[1]
                } else if (itemIndex === 3 || itemIndex === 4) {
                    // 4個目、5個目の flow-item の場合（インデックス3, 4）
                    // 3番目の画像を表示
                    imageToShowIndex = 2; // flowImages[2]
                } else {
                    // それ以外の flow-item の場合（もしあれば）
                    // ここでは最後の画像を表示するが、必要に応じて調整
                    imageToShowIndex = flowImages.length - 1;
                }

                // 画像の数が足りない場合でもエラーにならないように、最終的なインデックスを調整
                imageToShowIndex = Math.min(imageToShowIndex, flowImages.length - 1);


                flowImages.forEach((img, imgIndex) => {
                    if (imgIndex === imageToShowIndex) {
                        img.classList.add('active');
                    } else {
                        img.classList.remove('active');
                    }
                });
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, options);

    flowItems.forEach(item => {
        observer.observe(item);
    });

});


// ===============================================
//     slick
// ===============================================


$(function () {
    // Slickスライダーのオプション
    const slickOptions = {
        autoplay: true,
        autoplaySpeed: 4000,
        infinite: true,
        arrows: true, // 矢印
        prevArrow: '<div class="slide-arrow prev-arrow"></div>',
        nextArrow: '<div class="slide-arrow next-arrow"></div>',
        dots: true,
        speed: 2000,
        adaptiveHeight: true,
        slidesToShow: 1, // SPで1枚表示
        slidesToScroll: 1, // 1枚ずつスクロール
    };

    // ウィンドウ幅に応じてSlickを有効/無効にする関数
    function initializeSlick() {
        const $slider = $(".slider");
        const breakpoint = 500; // 例: 768px以下でSlickを有効にする (SPのブレークポイント)

        if ($(window).width() < breakpoint) {
            // SPサイズの場合、Slickを初期化 (まだ初期化されていなければ)
            if (!$slider.hasClass('slick-initialized')) {
                $slider.slick(slickOptions);
            }
        } else {
            // PCサイズの場合、Slickを破棄 (初期化されていれば)
            if ($slider.hasClass('slick-initialized')) {
                $slider.slick('unslick');
            }
        }
    }

    // 初回ロード時とウィンドウサイズ変更時に実行
    initializeSlick();
    $(window).on('resize', initializeSlick);
});


/*=================================================
//    fadein
===================================================*/
$(window).on('load scroll', function () {
    $(".fadein").each(function () {
        let scroll = $(window).scrollTop();
        let target = $(this).offset().top;
        let windowHeight = $(window).height();

        if (scroll > target - windowHeight + 100) {
            $(this).addClass("show");
        }
    });
});



/*=================================================
//    cta fadein
===================================================*/

let cta = $(".cta");
cta.hide();

$(window).scroll(function () {
    let scrollThreshold = 500;

    if ($(window).scrollTop() > scrollThreshold) {
        cta.fadeIn();
    } else {
        cta.fadeOut();
    }
});
