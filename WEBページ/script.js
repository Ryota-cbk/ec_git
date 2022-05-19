$(function () {
    $('#login-show').click(function () {
        $('#login-modal').fadeIn();
    });

    $('.close-modal').click(function () {
        $('#login-modal').fadeOut();
        $('#signup-modal').fadeOut();
    });

    $('#subImg img').on('click', function () {
        img = $(this).attr('src');
        $('#subImg a').removeClass('current');
        $(this).parent().addClass('current');
        $('#mainImg img').fadeOut(50, function () {
            $('#mainImg img').attr('src', img).on('load', function () {
                $(this).fadeIn();
            })
        })
    });

    $(function () {
        var headerHeight = 100;
        $('a[href^="#"]').click(function () {
            var speed = 800;
            var href = $(this).attr("href");
            var target = $(href == "#" || href == "" ? 'html' : href);
            var position = target.offset().top - headerHeight;
            $("html, body").animate({
                scrollTop: position
            }, speed, "swing");
            return false;
        });
    });;

    $(function () {
        $(window).scroll(function () {
            $(".scroll-block").each(function () {
                var scroll = $(window).scrollTop();
                var blockPosition = $(this).offset().top;
                var windowHeihgt = $(window).height();
                if (scroll > blockPosition - windowHeihgt + 300) {
                    $(this).addClass("blockIn");
                }
            });
        });
    });

});


let search = document.getElementById('search');
search.addEventListener('click', () => {

    let api = 'https://zipcloud.ibsnet.co.jp/api/search?zipcode=';
    let error = document.getElementById('error');
    let input = document.getElementById('input');
    let address1 = document.getElementById('address1');
    let address2 = document.getElementById('address2');
    let address3 = document.getElementById('address3');
    let param = input.value.replace("-", ""); //入力された郵便番号から「-」を削除
    let url = api + param;

    fetchJsonp(url, {
            timeout: 10000, //タイムアウト時間
        })
        .then((response) => {
            error.textContent = ''; //HTML側のエラーメッセージ初期化
            return response.json();
        })
        .then((data) => {
            if (data.status === 400) { //エラー時
                error.textContent = data.message;
            } else if (data.results === null) {
                error.textContent = '郵便番号から住所が見つかりませんでした。';
            } else {
                address1.value = data.results[0].address1;
                address2.value = data.results[0].address2;
                address3.value = data.results[0].address3;
            }
        })
        .catch((ex) => { //例外処理
            console.log(ex);
        });
}, false);