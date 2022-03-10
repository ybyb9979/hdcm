var focusableElements ="a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]";
var returnFocusPopup = [];
var returnFocusConfirm = [];
var accodYn;//동적 로딩시 아코디언 script 중복 체크를 위해 요소 추가
var loc = window.location.href;
var imgPath = '/docfiles/resources/mo/images';
var commonUi = {
    init: function () {
        this.common.init(); //공통
        if ($('header').length) { this.gnb.init(); }//gnb
        if ($('.accodWrap').length) { this.accodiran.init() }//accordion
        if ($('.box_input01').length) { this.inp.init() }
        if ($('.modal_pop').length) { this.layerPop.init() }
        if ($('.list_category01').length) { this.listCate.init() }
        if ($('.list_chkrdo01').length) { this.listChkrdo.init() }
        if ($('.box_table').length) { this.tableInit.init() }
        if ($('.box_sorting01').length) { this.sorting.init() }
        if ($('img.svg').length) { this.cardSvg.init() }
    },
    common: {
        init: function () {

            $(window).on('scroll', function () {
                var st = $(window).scrollTop();
                var header = $('header').height();

                if (st > header) {
                    $('body').addClass('fixed');
                } else {
                    $('body').removeClass('fixed');
                }
            });
        }
    },
    gnb: { //gnb
        header: '.header',
        headerH1: 'header > h1',
        listDep2: '.list_dep2',
        btnDep2: '.btn_dep2',
        boxDep3: '.box_dep3',
        listDep3Li: '.list_dep3 > li > a',
        boxEtc: '.box_etc',
        img_banner: '.img_banner a',
        init: function () {
            var _this = this;
            _this.event();
        },
        event: function ($this) {
            var _this = this;


        }
    },
    accodiran: {
        accodWrap: '.accodWrap',
        accodBtn: '.accodBtn',
        accodSlide: '.accodSlide',
        init: function () {
            var _this = this;
            if(accodYn !== true){
                _this.title();
                _this.event();
                accodYn = true;
            }
        },
        title: function () {
            var _this = this;
            $(_this.accodBtn).each(function () {
                var linkAttrTxt = $(this).text();
                var linkAttr = $(this).attr('data-title');
                // Q10474 아코디언 열린상태
                if ($(this).closest(_this.accodWrap).is('.on') && $(this).closest(_this.accodWrap).find(_this.accodSlide).is(':visible')) {
                    $(this).attr('title', linkAttr + ' 닫기');
                } else {
                    $(this).attr('title', linkAttr + ' 열기');
                }
            });
        },
        event: function () {
            var _this = this;
            $(document).on('click', _this.accodBtn, function (e) {
                e.preventDefault();
                _this.slideUpDown($(this));
            })
        },
        slideUpDown: function ($this) {
            var _this = this;
            var $btn = $(_this.accodBtn);
            var linkAttrTxt = $this.text();
            var linkAttr = $this.attr('data-title');
            // Q10474 아코디언 닫힌상태
            if ($this.closest(_this.accodWrap).is('.on') && $this.closest(_this.accodWrap).children(_this.accodSlide).is(':visible')) {
                $this.attr('title', linkAttr + ' 열기');
                $this.closest(_this.accodWrap).removeClass('on').children(_this.accodSlide).slideUp('300');
            } else {
                $this.attr('title', linkAttr + ' 닫기');
                $this.closest(_this.accodWrap).addClass('on').children(_this.accodSlide).slideDown('300');
            }

            // Q10112 이준우차장님(삼양데이타시스템)님 요청으로 콜백함수 추가 pc와 동일하게 추가
            if (typeof callback_slideUpDown === 'function') {
                callback_slideUpDown($this);
            }

        }
    },
    inp: {
        boxInp: '.box_input01',
        boxInpCellBox: '.input_cell_box',
        boxInpCell: '.input_cell',
        boxInpTxt: '.input_cell input',
        btnDelInput: '.input_cell_box .btn_del',
        init: function () {
            var _this = this;
            _this.event();
        },
        event: function () {
            var _this = this;

            $(document).on('focusin', _this.boxInpTxt, function () {
                _this.focusin($(this));
            });

            $(document).on('focusout', _this.boxInpTxt, function () {
                _this.focusout($(this));
            });

            $(document).on('keyup paste', _this.boxInpTxt, function () {
                _this.keyup($(this));
            });

            $(document).on('mousedown', _this.btnDelInput, function () {
                _this.deleteAct($(this));
            });

            $(document).on('keyup', _this.boxInpTxt, function () {
                var $keyThis = $(this);
                if ($keyThis.val().length > 0 || !$keyThis.val() == '') {
                    $keyThis.closest(_this.boxInpCellBox).addClass('on');
                } else {
                    $keyThis.closest(_this.boxInpCellBox).removeClass('on');
                }
            });
        },
        focusin: function ($this) {
            var _this = this;
            $this.closest(_this.boxInpCellBox).addClass('focused');
            $this.closest(_this.boxInpCellBox).removeClass('completed');
            var _notEmptyLength = 0;
            $this.closest(_this.boxInpCellBox).find("input[type='text'], input[type='password'], input[type='number'], input[type='tel']").each(function () {
                if ($(this).val() !== '') {
                    _notEmptyLength = _notEmptyLength + 1;
                }
            });
            if (_notEmptyLength == 0) {
                $this.closest(_this.boxInpCellBox).find(".btn_del").css("display", "");
            } else {
                $this.closest(_this.boxInpCellBox).find(".btn_del").css("display", "inline-block");
            }
        },
        focusout: function ($this) {
            var _this = this;
            var _notEmptyLength = 0;
            $this.closest(_this.boxInpCellBox).find("input[type='text'], input[type='password'], input[type='number'], input[type='tel']").each(function () {
                if ($(this).val() !== '') {
                    _notEmptyLength = _notEmptyLength + 1;
                }
            });
            $this.closest(_this.boxInpCellBox).find(".btn_del").css("display", ""); //focusout시 무조건 삭제버튼 hide
            $this.closest(_this.boxInpCellBox).removeClass('focused');//focusout시 무조건 focuese 클래스 삭제

            if (_notEmptyLength == 0) {
                $this.closest(_this.boxInpCellBox).removeClass('focused');
                $this.closest(_this.boxInpCellBox).removeClass('completed');
            } else {
                $this.closest(_this.boxInpCellBox).addClass('completed');
            }
        },
        keyup: function ($this) {
            var _this = this;
            var _notEmptyLength = 0;
            $this.closest(_this.boxInpCellBox).find("input[type='text'], input[type='password'], input[type='number'], input[type='tel']").each(function () {
                if ($(this).val() !== '') {
                    _notEmptyLength = _notEmptyLength + 1;
                }
            });
            if (_notEmptyLength == 0) {
                $this.closest(_this.boxInpCellBox).find(".btn_del").css("display", "");
                //$this.closest(_this.boxInpCellBox).find(".btn_search").show();
            } else {
                $this.closest(_this.boxInpCellBox).find(".btn_del").css("display", "inline-block");
                //$this.closest(_this.boxInpCellBox).find(".btn_search").hide();
            }
        },
        completedAct: function ($this) {
            var _this = this;
            $this.closest(_this.boxInpCellBox).addClass('completed');
        },
        errorAct: function ($this) {
            var _this = this;
            $this.closest(_this.boxInpCellBox).removeClass('completed').addClass('error');
        },
        deleteAct: function ($this) {
            var _this = this;
            $this.closest(_this.boxInpCellBox).find('input[type="text"], input[type="password"], input[type="number"], input[type="tel"]').val("");
            $this.closest(_this.boxInpCellBox).find('input')[0].focus();
            $this.closest(_this.boxInpCellBox).removeClass("on");
            $this.css("display", "");
            $this.closest(_this.boxInpCellBox).find(".btn_search").show();

        }
    },
    layerPop: {
        boxLayer: '.modal_pop',
        layerWrap: '.layer_wrap',
        layerHead: '.layer_head',
        layerBody: '.layer_body',
        layerBtn: '.layer_btn',
        layerOpen: '.layer_open',
        layerClose: '.layer_close a',
        layerFocus: '.layer_open.focus',
        init: function () {
            _this = this;

            _this.event();
        },
        event: function ($targetId) {
            var _this = this;

            /*
            $(document).on('click', _this.layerOpen, function(e){
                e.preventDefault();
                var $targetId = $(this).attr('data-id'); // 버튼에 data-id 와 layer id 값 연결

                _this.openLayer($targetId);
                $(this).addClass('focus');
            });
            */

            /*
            $(document).on('click', _this.layerClose, function(e){
                e.preventDefault();
                var btnObj = $(this);
                var $targetId = $(this).closest(_this.boxLayer).attr('id'); // 버튼에 data-id 와 layer id 값 연결

                _this.closeLayer($targetId);
            });
            */

        },
        getScrollbarWidth: function () {
            var inner = document.createElement('p');
            inner.style.width = "100%";
            inner.style.height = "200px";

            var outer = document.createElement('div');
            outer.style.position = "absolute";
            outer.style.top = "0px";
            outer.style.left = "0px";
            outer.style.visibility = "hidden";
            outer.style.width = "200px";
            outer.style.height = "150px";
            outer.style.overflow = "hidden";
            outer.appendChild(inner);

            document.body.appendChild(outer);
            var w1 = inner.offsetWidth;
            outer.style.overflow = 'scroll';
            var w2 = inner.offsetWidth;
            if (w1 == w2) w2 = outer.clientWidth;

            document.body.removeChild(outer);

            return (w1 - w2);
        },
        openLayer: function ($targetId, btnid, popAnchor, customurl) {
            var $html = $('html'); // 2021-12-29 Q10112 : isApp3 앱일때 추가
            var $body = $('body');
            var $targetIdMmodal = $('#' + $targetId);

            $body.addClass('modal-open').css('padding-right', commonUi.layerPop.getScrollbarWidth() + 'px');
            if (!$body.find('.modal-backdrop').length) {
                $body.append('<div class="modal-backdrop show"></div>');
            } else {
                $body.find('.modal-backdrop').addClass('show');
            }

            modalLoadType = $targetIdMmodal.attr('data-load-type');
            modalType = $targetIdMmodal.attr('data-pop-type');

            if (modalLoadType != 'ajax') {
                $targetIdMmodal.addClass("show").attr('tabindex', 0).focus();
            }
            commonUi.layerPop.openCase($targetId, customurl);

            //Q10011 2022-01-13 팝업 안에 팝업이 있는경우 버튼 높이 값을 찾지 못해 수정
            if ($targetIdMmodal.find('.layer_btn').length) {
                var _lbH = $('#' + $targetId + ' > .modal_wrap > .modal_container > .layer_wrap > .layer_btn').outerHeight();
                $targetIdMmodal.find('.layer_body').css('padding-bottom', _lbH);
            }

            // Q10071 460보다 클 경우 Full Layer로 전환
            var mlPopH = 0;
            var _default = $targetIdMmodal.find('.layer_head').innerHeight() + $targetIdMmodal.find('.box_content').height();
            if ($targetIdMmodal.find('.layer_btn').length) {
                mlPopH = _default + $targetIdMmodal.find('.layer_btn').innerHeight();
            } else {
                mlPopH = _default;
            }
            if (mlPopH > 460) {
                //Q10048 카드 선택 팝업인 경우 예외 처리
                if ($targetIdMmodal.hasClass('card_sel_pop')) {
                    if (mlPopH > 396) {
                        $targetIdMmodal.find('.modal_container').addClass('scrollable');
                    }
                //Q10293 날짜 선택 팝업인 경우 예외처리
                } else if ($targetIdMmodal.hasClass('day_pick_pop')) {
                    if (mlPopH > 396) {
                        $targetIdMmodal.find('.modal_container').addClass('scrollable');
                    }
                //Q10293 연회비 팝업인 경우 예외처리
                } else if ($targetIdMmodal.hasClass('member_fee_pop')) {
                    if (mlPopH > 396) {
                        $targetIdMmodal.find('.modal_container').addClass('scrollable');
                    }
                } else {
                    $targetIdMmodal.addClass('full').find('.modal_container').addClass('scrollable');
                }
            } else if ($targetIdMmodal.hasClass('full')) { // 2021-08-30 Q10112 : 디폴트 풀팝업일때 재설정
                $targetIdMmodal.addClass('full').find('.modal_container').addClass('scrollable');
            } else {
                $targetIdMmodal.removeClass('full').find('.modal_container').removeClass('scrollable');
            }

            // 2021-12-29 Q10112 : isApp3 앱일때 팝업 사이즈
            if($html.hasClass('isApp3')){
                $targetIdMmodal.removeClass('full').find('.modal_container').removeClass('scrollable'); // 팝업 높이는 common.css 에서 isApp3 설정되어있음
                if (mlPopH >= 560) {
                    $targetIdMmodal.addClass('full').find('.modal_container').addClass('scrollable'); // 팝업 560 보다 크면 높이는 common.css 에서 isApp3 설정되어있음
                } else if($targetIdMmodal.hasClass('acc_type01')){ // acc_type01 있을때 강제 풀팝업으로 변경
                    $targetIdMmodal.addClass('full').find('.modal_container').addClass('scrollable');
                }
            }

            /* 카드상세 팝업 탭 영역 바로가기 */
            if (popAnchor) {
                if ($targetIdMmodal.hasClass('modal_card_view')) {// 카드상세 팝업만 적용
                    if ($targetIdMmodal.find(".tab_default").length == 1) { //tab 팝업인 경우

                        $(".tab_default a").each(function () {
                            if ($(this).attr('href') == popAnchor) {
                                $(this).click();
                            }
                        });

                    } else {
                        //$(popAnchor).click();
                        /* Q10293 팝업 오픈시 아코디언 호출이 겹치는 부분 수정 */
                        if ($(popAnchor).hasClass('card_bundle') && !$(popAnchor).closest('accodWrap').hasClass('on') || $(popAnchor).closest('.accodWrap').siblings('.accodWrap').hasClass('on')) { // Q10293 해당 영역 호출시 다른 아코디언 열려있는 부분 수정
                            $(popAnchor).closest('.accodWrap').addClass('on').children('.accodSlide').slideDown('300');
                            $(popAnchor).closest('.accodWrap').siblings('.accodWrap').removeClass('on').children('.accodSlide').hide();
                        }
                        else if (!$(popAnchor).closest('.accodWrap').hasClass('on')) { $(popAnchor).trigger('click'); }

                        setTimeout(function () {
                            $targetIdMmodal.find(".layer_body").animate({
                                scrollTop: $(popAnchor).closest('.accodWrap').position().top
                            }, 500, 'easeInOutQuad');
                        }, 500);
                    }
                }
            }


            $targetIdMmodal.find('.layer_body').on('scroll', function () {
                var _headHeight = $targetIdMmodal.find('.layer_head').innerHeight();
                var st = $(this).scrollTop();

                if (st > _headHeight) {
                    $targetIdMmodal.addClass('fixed');
                } else {
                    $targetIdMmodal.removeClass('fixed');
                }
            });

            /*
            $(document).on('mouseup', '.modal_pop:not(.modal_alert).show', function (e) {
                if ($targetIdMmodal.find('.modal_container').has(e.target).length === 0) {
                    $targetIdMmodal.removeAttr('tabnidex').removeClass('show').find('.layer_close').removeClass('fixed').end().find('.layer_body').removeAttr('style');
                    $body.removeClass('modal-open').removeAttr('style').find('.modal-backdrop').remove();
                }
            });
            */
            //Q10011 멀티팝업일때 바탕 클릭시 전체 팝업 닫기
            $(document).on('click' , '.modal_pop:not(.modal_alert):not(.not_dim)' , function(e){
                var _this = $(e.target).attr('id');
                if($(e.target).closest('#container').hasClass('standard')) { // 2022-01-10 표준화일때 배경 클릭 x 예외처리 Q10011
                    return;
                }
                if(_this === $targetId){
                    $('.modal_pop:not(.modal_alert).show').removeAttr('tabnidex').removeClass('show').find('.layer_close').removeClass('fixed').end().find('.layer_body').removeAttr('style');
                    $body.removeClass('modal-open').removeAttr('style').find('.modal-backdrop').remove();
                }
                //console.log(_this , $targetId)
            });
            //멀티팝업일시 선행 팝업 z-index 조정
            var oply = $('.modal_pop.show');
            if(oply.length === 2){
                if($targetIdMmodal.closest('.layer_wrap').size()){//popup 안에 popup 케이스로 조건 추가 Q10011 2022-01-25
                    $targetIdMmodal.addClass('full');
                } else {
                    oply.eq(0).css('z-index','1000');
                }
            }
        },
        closeLayer: function ($targetId, focusid) {
            var _this = this;
            var $body = $('body');
            var $btnObj = $("#" + focusid);
            var $targetIdMmodal = $('#' + $targetId);

            $targetIdMmodal.removeAttr('tabnidex').removeClass('show').find('.layer_close').removeClass('fixed').end().find('.layer_body').removeAttr('style');
            //Q10011 멀티 팝업에서 닫기 클릭시 backdrop 삭제 조정
            if($('.modal_pop.show').length === 0){
                $body.removeClass('modal-open').removeAttr('style').find('.modal-backdrop').remove();
            }
            $(_this.boxLayer).find('.modal_wrap').css({ 'padding': '' });
            $('.modal_pop.show').css('z-index' , '');
            if (focusid) {
                $btnObj.focus();
            }
            modalLoadType = $targetIdMmodal.attr('data-load-type');
            modalType = $targetIdMmodal.attr('data-pop-type');
            if (modalLoadType === 'ajax') {
                $targetIdMmodal.empty();
            }
        },
        openCase: function ($targetId, customurl) {
            var _this = this;
            var $targetIdMmodal = $('#' + $targetId);
            modalType = $targetIdMmodal.attr('data-pop-type');
            //ajax 로딩
            if ($('#' + $targetId).attr('data-load-type') === 'ajax') {
                $.ajax({
                    type: 'GET',
                    url: customurl,
                    dataType: 'html',
                    success: function (data) {
                        // $targetIdMmodal.html(data);
                        // if(modalType === 'static'){
                        //     $targetIdMmodal.find('.scrBarWrap').addClass("active").animate({'opacity':'1'},100,function(){
                        //         $(this).find(commonUi.layerPop.layerWrap).attr('tabindex',0).focus();
                        //     });

                        // } else {
                        //     $targetIdMmodal.addClass("active").animate({'opacity':'1'},100,function(){
                        //         $(this).find(commonUi.layerPop.layerWrap).attr('tabindex',0).focus();
                        //     });


                        //     var windowHei = $(window).innerHeight();
                        //     var layerHeadH = $(_this.layerHead).innerHeight();
                        //     var layerBodyH = $(_this.layerBody).innerHeight();
                        //     var layerBodyH1 = $targetIdMmodal.find('.layer_body').height();
                        //     var layerBtnH = $(_this.layerBtn).innerHeight();

                        //     marTb = 320;
                        //     chgHei = windowHei - marTb - layerBodyH1 - layerBtnH;
                        //     popHei = layerHeadH + layerBodyH + layerBtnH + marTb;

                        //     if(chgHei < 0){//콘텐트 내용이 클때 스크롤 적용
                        //         $targetIdMmodal.find('.layer_body').css({ 'height': windowHei - layerHeadH - layerBtnH - marTb });
                        //         if (layerBtnH > 0) {
                        //             $targetIdMmodal.find('.layer_body').css({ 'padding': '0 18px 0 40px' });
                        //         }
                        //     } else {

                        //         $targetIdMmodal.find('.layer_body').removeClass('scrBarWrap');

                        //     }
                        // }

                    }
                });


            }

            var windowHei = $(window).innerHeight();
            var layerHeadH = $(_this.layerHead).innerHeight();
            var layerBodyH = $(_this.layerBody).innerHeight();
            var layerBodyH1 = $targetIdMmodal.find('.layer_body').outerHeight();
            var layerBtnH = $(_this.layerBtn).innerHeight();

            // 2021-11-22 초기화 세팅 개발팀 요청
            if ($targetIdMmodal.find('.c_detail_slide').length === 0 && $targetIdMmodal.find('.swiper-container').size()) {
                var swiper = $targetIdMmodal.find('.swiper-container')[0].swiper;
                if (swiper) {
                    if (!swiper.isBeginning) {
                        swiper.slideTo(0);
                    }
                } else {
                    if($targetId !== 'metalSelect'){
                        swiper = new Swiper($targetIdMmodal.find('.swiper-container')[0], {//q10011 0721 복수개의 스와이퍼 팝업이 있는 케이스로 해당 아이디로 실행
                            loop : false,
                            autoHeight : true,
                            navigation : {
                                prevEl : $targetIdMmodal.find('.swiper-button-prev')[0],
                                nextEl : $targetIdMmodal.find('.swiper-button-next')[0]
                            },
                            on : {
                                init : function() {
                                    $targetIdMmodal.find('.page_all').text(this.slides.length);
                                },
                                activeIndexChange : function() {
                                    $targetIdMmodal.find('.page_cur').text(this.realIndex + 1);
                                    if (this.$el.closest('.layer_body').length) {
                                        this.$el.closest('.layer_body')[0].scrollTop = 0;
                                    }
                                }
                            }
                        });
                    }
                }
            }
        }
    },
    listCate: {
        listCate01: '.list_category01',
        listCateLink01: '.list_category01 > li > a',
        init: function () {
            var _this = this;
            _this.event();
        },
        event: function () {
            var _this = this;
            $(document).on('click', _this.listCateLink01, function (e) {
                e.preventDefault();
                $(this).closest(_this.listCate01).find('li').removeClass('on').find('a').removeAttr('aria-current title');
                $(this).attr({ 'title': '선택됨', 'aria-current': 'location' }).parent('li').addClass('on');
            });
        }
    },
    listChkrdo: {
        listChkrdo01: '.list_chkrdo01',
        listChkrdoLink01: '.list_chkrdo01 > li label',
        listChkrdoLink02: '.list_chkrdo01 > li input',
        init: function () {
            var _this = this;
            _this.event();
        },
        event: function () {
            var _this = this;
            $(document).on('click', _this.listChkrdoLink01, function () {
                var dataInput = $(this).prev(_this.listChkrdoLink02).attr('type');
                if (dataInput == 'radio') {
                    $(this).closest(_this.listChkrdo01).find('input').attr('checked', '');
                    $(this).attr('checked', 'checked');
                } else if (dataInput == 'checkbox') {
                    if ($(this).is(':checked')) {
                        $(this).attr('checked', '');
                    } else {
                        $(this).attr('checked', 'checked');
                    }
                }
            });
        }
    },
    sorting: {
        boxSorting: '.box_sorting01',
        btnSorting: '.btn01',
        listSorting: '.list_sorting01',
        init: function () {
            var _this = this;
            _this.event();
        },
        event: function () {
            var _this = this;
            $(document).on('click', _this.btnSorting, function (e) {
                e.preventDefault();
                if ($(_this.btnSorting).closest(_this.boxSorting).find(_this.listSorting).is(':hidden')) {
                    $(_this.btnSorting).addClass('on').attr('title', '설정 상세 열기');
                    $(_this.btnSorting).closest(_this.boxSorting).find(_this.listSorting).show();
                } else {
                    $(_this.btnSorting).removeClass('on').attr('title', '설정 상세 닫기');
                    $(_this.btnSorting).closest(_this.boxSorting).find(_this.listSorting).hide();
                }
            });
        }
    },
    tableInit: {
        tableTarget: '.box_table table',
        init: function () {
            var _this = this;

            $(this.tableTarget).each(function () {
                var _this = $(this);
                tableCaption(_this)
            })
            function tableCaption(scope) {
                var tableCaption = $(scope).find('> caption');
                var captionPElem = tableCaption.find('p');

                if (
                    (tableCaption.length > 0) &&
                    (captionPElem.length == 0 || $.trim(captionPElem.text()) == '')

                ) {
                    var msg = '';
                    $(scope).find('> thead > tr >  th, > tbody > tr > th').each(function () {
                        var amsg = String($(this).clone().end().text() || '');
                        amsg = $.trim(amsg);

                        if ($.trim(amsg) != '') {
                            msg += ((msg == '') ? '' : ', ') + amsg;
                        }
                    });

                    captionPElem.remove();
                    $(document.createElement('p')).html(msg + '로 구성된 표입니다.').appendTo(tableCaption);
                };
            };
        }
    },
    cardSvg: {
        init: function () {
            jQuery('img.svg').each(function () {
                var $img = jQuery(this);
                //var imgID = $img.attr('id');
                var imgClass = $img.attr('class');
                var imgURL = $img.attr('src');

                jQuery.get(imgURL, function (data) {
                    // Get the SVG tag, ignore the rest
                    var $svg = jQuery(data).find('svg');

                    // Add replaced image's ID to the new SVG
                    // if(typeof imgID !== 'undefined') {
                    //  $svg = $svg.attr('id', imgID);
                    // }
                    // Add replaced image's classes to the new SVG
                    if (typeof imgClass !== 'undefined') {
                        $svg = $svg.attr('class', imgClass + ' replaced-svg');
                    }

                    // Remove any invalid XML tags as per http://validator.w3.org
                    $svg = $svg.removeAttr('xmlns:a');

                    // Check if the viewport is set, else we gonna set it if we can.
                    if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
                        $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
                    }

                    // Replace image with new SVG
                    $img.replaceWith($svg);

                }, 'xml');

            });
        }
    },
    headerInclude: {
        init: function(){
            if(loc.indexOf('/docfiles/resources/mo/html/') > -1 && loc.indexOf('.html') > -1 && $("body").find("header").length > 0 && loc.indexOf('overallguide') < 0){
                var $header = $('header');
                var headerName = $header.attr('data-header');

                var headerHtml = '<div id="header" class="header">\n\t';
                var preCode = '\n\t';
                var EndDiv = '\n</div>';
                var headerTitle = $('html').find('title').text().split("|")[0];
                // 2021-11-10 Q10293 : header 띄어쓰기 반영으로 인한 주석
                //headerTitle = headerTitle.replace(/(\s*)/g,'');
                switch(headerName) {
                    case 'main': // Q10011 메인 헤더타입 추가
                        headerHtml += '<h1><a href="javascript:;" class="logo"><span class="a11y">현대카드</span></a></h1>';
                        headerHtml += preCode + '<a class="btn_Menu" href="javascript:menu.open();"><span class="a11y">전체 메뉴</span></a>';
                        headerHtml += preCode + '<a class="btn_custom" href="javascript:;"><img src="'+ imgPath +'/com/icon/others//img_henry.png" alt="챗봇"></a>' + EndDiv;
                        break;
                    case 'logo1': // 로고형 , 메뉴, 닫기
                        headerHtml += '<h1><a href="javascript:;" class="logo"><span class="a11y">현대카드</span></a></h1>';
                        headerHtml += preCode + '<a class="btn_Menu" href="javascript:menu.open();"><span class="a11y">전체 메뉴</span></a>';
                        headerHtml += preCode + '<a class="btn_close" href="javascript:;"><span class="a11y">닫기</span></a>' + EndDiv;
                        break;
                    case 'logo2': // 로고형 , 이전, 닫기
                        headerHtml += '<h1><a href="javascript:;" class="logo"><span class="a11y">현대카드</span></a></h1>';
                        headerHtml += preCode +'<a class="btn_prev" href="javascript:;"><span class="a11y">이전</span></a>';
                        headerHtml += preCode +'<a class="btn_close" href="javascript:;"><span class="a11y">닫기</span></a>' + EndDiv;
                        break;
                    case 'logo3': // 로고형 , 이전
                        headerHtml += '<h1><a href="javascript:;" class="logo"><span class="a11y">현대카드</span></a></h1>';
                        headerHtml += preCode + '<a class="btn_prev" href="javascript:;"><span class="a11y">이전</span></a>' + EndDiv;
                        break;
                    case 'logo4': // 로고형 , 닫기
                        headerHtml += '<h1><a href="javascript:;" class="logo"><span class="a11y">현대카드</span></a></h1>';
                        headerHtml += preCode + '<a class="btn_close" href="javascript:;"><span class="a11y">닫기</span></a>' + EndDiv;
                        break;
                    case 'logo5': // 로고형 , 메뉴
                        headerHtml += '<h1><a href="javascript:;" class="logo"><span class="a11y">현대카드</span></a></h1>';
                        headerHtml += preCode + '<a class="btn_Menu" href="javascript:menu.open();;"><span class="a11y">메뉴</span></a>' + EndDiv;
                        break;
                    case 'text1': // 텍스트형 , 메뉴, 닫기
                        headerHtml += '<h1><p class="p1_b_ctr_1ln tit">' + headerTitle + '</p></h1>';
                        headerHtml += preCode + '<a class="btn_Menu" href="javascript:menu.open();;"><span class="a11y">메뉴</span></a>';
                        headerHtml += preCode + '<a class="btn_close" href="javascript:;"><span class="a11y">닫기</span></a>' + EndDiv;
                        break;
                    case 'text2': // 텍스트형 , 이전, 닫기
                        headerHtml += '<h1><p class="p1_b_ctr_1ln tit">' + headerTitle + '</p></h1>';
                        headerHtml += preCode + '<a class="btn_prev" href="javascript:;"><span class="a11y">이전</span></a>';
                        headerHtml += preCode + '<a class="btn_close" href="javascript:;"><span class="a11y">닫기</span></a>' + EndDiv;
                        break;
                    case 'text3': // 텍스트형 , 이전
                        headerHtml += '<h1><p class="p1_b_ctr_1ln tit">' + headerTitle + '</p></h1>';
                        headerHtml += preCode + '<a class="btn_prev" href="javascript:;"><span class="a11y">이전</span></a>' + EndDiv;
                        break;
                    case 'text4': // 텍스트형 , 닫기
                        headerHtml += '<h1><p class="p1_b_ctr_1ln tit">' + headerTitle + '</p></h1>';
                        headerHtml += preCode + '<a class="btn_close" href="javascript:;"><span class="a11y">닫기</span></a>' + EndDiv;
                        break;
                    case 'text5': // 텍스트형 , 메뉴
                        headerHtml += '<h1><p class="p1_b_ctr_1ln tit">' + headerTitle + '</p></h1>';
                        headerHtml += preCode + '<a class="btn_Menu" href="javascript:menu.open();"><span class="a11y">전체 메뉴</span></a>' + EndDiv;
                        break;
                    // 2021-12-01 Q10112 날짜 타입추가
                    case 'date1': // 날짜 , 텍스트형 , 이전
                        headerHtml += '<h1><p class="p1_b_ctr_1ln tit"><span class="date">4월 20일</span>' + headerTitle + '</p></h1>';
                        headerHtml += preCode + '<a class="btn_prev" href="javascript:;"><span class="a11y">이전</span></a>' + EndDiv;
                        break;
                    //Q10011 카드 프로그레스 타입 추가 //Q10474 wai 진행률 추가
                    case 'progress': // 텍스트형 , 메뉴
                        var progWh = $header.attr('data-bar');
                        headerHtml += '<div class="bar_container"><strong class="a11y">'+headerTitle+progWh+'% 진행중</strong><div class="bar"><span class="navi" style="width:'+ progWh +'%"></span></div></div>';
                        headerHtml += preCode + '<a class="btn_prev" href="javascript:;"><span class="a11y">이전</span></a>';
                        headerHtml += preCode + '<a class="btn_close" href="javascript:;"><span class="a11y">닫기</span></a>' + EndDiv;
                        break;
                    //Q10011 카드 프로그레스 타입 추가 //Q10474 wai 진행률 추가
                    case 'progress1': // 텍스트형 , 메뉴 뒤로가기 삭제
                        var progWh = $header.attr('data-bar');
                        headerHtml += '<div class="bar_container"><strong class="a11y">'+headerTitle+progWh+'% 진행중</strong><div class="bar"><span class="navi" style="width:'+ progWh +'%"></span></div></div>';
                        headerHtml += preCode + '<a class="btn_close" href="javascript:;"><span class="a11y">닫기</span></a>' + EndDiv;
                        break;
                    case 'dropdown': // 드롭다운 (기본 값)
                        headerHtml += '<h1><p class="p1_b_1ln tit"><a href="javascript:menu.toggle();" class="textbico_small" title="' + headerTitle + ' 리스트 열기"><span>' + headerTitle + '</span></a></p></h1>';
                        headerHtml += preCode + '<a class="btn_Menu" href="javascript:;"><span class="a11y">메뉴</span></a>' + EndDiv;
                        headerHtml += '<div class="dropdown_container"><div class="scroll_wrap">';
                        headerHtml += '<ul>';
                        headerHtml += '<li><a class="menuitem" href="#url">1번 아이템</a></li>';
                        headerHtml += '<li><a class="menuitem" href="#ur2">2번 아이템</a></li>';
                        headerHtml += '<li><a class="menuitem" href="#ur3">3번 아이템</a></li>';
                        headerHtml += '</ul>';
                        headerHtml += '</div></div>';
                        // headerHtml += ;
                        break;
                    case 'dropdownOpt': // 드롭다운 (클래스 정하기)
                        var dDClass = $header.attr('data-dropdown');
                        headerHtml += '<h1><p class="p1_b_1ln tit"><a href="javascript:menu.toggle();" class="textbico_small" title="' + headerTitle + ' 리스트 열기"><span>' + headerTitle + '</span></a></p></h1>';
                        headerHtml += preCode + '<a class="btn_Menu" href="javascript:;"><span class="a11y">전체 메뉴</span></a>' + EndDiv;
                        headerHtml += '\n<div class="dropdown_container"><div class="scroll_wrap"><ul>';
                        $('.' + dDClass).each(function(){
                            var $this = $(this);
                            headerHtml += '<li><a class="menuitem" href="#'+ $this.attr('id') +'">'+ $this.text() + '</a></li>';
                        });
                        headerHtml += '</ul></div></div>';
                    break;
                    case 'cardDtl': // 드롭다운 (카드상세 전용)
                        headerHtml += '<h1><p class="p1_b_1ln tit"><a href="javascript:menu.toggle();" class="textbico_small" title="' + headerTitle + ' 리스트 열기"><span>' + headerTitle + '</span></a></p></h1>';
                        headerHtml += preCode + '<a class="btn_Menu" href="javascript:menu.open();"><span class="a11y">전체 메뉴</span></a>' + EndDiv;
                        headerHtml += '\n<div class="dropdown_container"><div class="scroll_wrap"><ul>';
                        headerHtml += '<li><a class="menuitem" href="#carMd001">상품요약소개</a></li>';
                        $('.card-module').each(function(){
                            var $this = $(this);
                            headerHtml += '<li><a class="menuitem" href="#'+ $this.attr('id') +'">'+ $this.text() + '</a></li>';
                        });
                        headerHtml += '</ul></div></div>';
                        break;
                    case 'popup': // 팝업형(닫기)
                        headerHtml += preCode + '<a class="btn_close" href="javascript:;"><span class="a11y">닫기</span></a>' + EndDiv;
                        break;
                    case 'none': // header 없을 때
                        headerHtml = '';
                        break;
                    default: // 빈 값 or 값이 없을 때
                        headerHtml +=  '<h1><p class="p1_b_ctr_1ln tit">' + headerTitle  + ' </p></h1>\n\t<a class="btn_prev" href="javascript:;"><span class="a11y">이전</span></a>' + EndDiv;
                }

                if(headerName !== 'cardDtl' && headerName !== 'dropdown' && headerName !== 'dropdownOpt' ){
                    $header.append(headerHtml);
                } else if(headerName === 'dropdownOpt') {
                    $header.empty().html(headerHtml);
                } else  if(headerName === 'cardDtl') {
                    $header.empty().html('<div id="carMd001" class="card-module a11y">상품요약소개</div>' + headerHtml);
                }


                // 드롭다운 헤더 타입일 경우 스크롤 시에 current 변경 - Q10071
                function dpDwScrPos() {
                    var $dropDw = $('.dropdown_container');
                    $(window).on('scroll', function () {
                        var scrT = $(this).scrollTop();
                        if (scrT === 0) {
                            $dropDw.find('li.current').removeClass('current');
                            $dropDw.find('li:first').addClass('current');
                            return;
                        }
                        $dropDw.find('.menuitem').each(function () {
                            var currLink = $(this);
                            var refEl = $(currLink.attr('href'));
                            if (refEl.offset().top <= scrT && refEl.offset().top + refEl.height() >= scrT) {
                                currLink.closest('li').siblings().removeClass('current');
                                currLink.closest('li').addClass('current');
                            } else {
                                currLink.closest('li').removeClass('current');
                            }
                        });
                    });
                }
            }
        }
    },
    allMenu : {
        init: function(){
            var headerName = $('header').attr('data-header');
            var preCode = '\n\t';
            var EndDiv = '\n</div>';

            // 2021-08-30 Q10112 : header 추가
            if($('body').find('header').length > 0){

                //Q10011 메뉴 html 추가
                var menuHtml ='';
                var menuContainer = '<div class="menu_pop" tabindex="0">\n\t';
                var menuTop = '<div class="menu_top">\n\t';
                var menuAll = '<div class="menu_con">\n\t';
                menuHtml += menuContainer +  menuTop;
                //menu top
                menuHtml += '<div class="home"><a href="javascript:history.back()"><span class="a11y">홈으로 이동</span></a></div>';
                menuHtml += '<div class="close"><a href="javascript:menu.close();"><span class="a11y">메뉴 닫기</span></a></div>' + EndDiv;
                //navi
                menuHtml += menuAll + '<div class="menu_in">\n\t<nav>';
                menuHtml += preCode + '<a href="#url"><p class="h3_uni_b">My Account</p></a>'+
                '<a href="javascript:;" target="_blank" class="app">' +
                '<div class="textbico_large app_in" >' +
                '<span class="app_thumb">' +
                '<img src="'+ imgPath +'/com/badge/badge_Hyundaicard.png" alt="현대카드 앱">' +
                '</span>' +
                '<span class="p1_b_lt_1ln app_desc">내 카드 이용 내역을 앱에서 편리하게 확인하세요</span>' +
                '</div>' +
                '</a>'+
                '<a href="#url"><p class="h3_eb_lt">카드 신청하기</p></a>'+
                '<a href="#url"><p class="h3_eb_lt">금융 신청하기</p></a>'+
                '</nav>';
                menuHtml += '<p class="link_customer"><a href="#url" class="h4_b_lt">고객지원</a></p>';
                menuHtml += '<a href="#url" class="chat_banner">' +
                '<p class="p1_b_lt">실시간 채팅 상담으로<br>문제를 빠르게 해결하기</p>' +
                '<div class="chat_box"><span></span></div>' +
                '<div class="chat_img"><img src="'+ imgPath +'/com/icon/others//img_henry.png" alt=""></div>' +
                '</a>' + EndDiv;
                //menu_btm
                menuHtml += '<div class="menu_btm">' +
                '<p class="p1_b_lt">현대카드의 다양한<br>패밀리 서비스를 만나보세요.</p>' +
                '<ul>' +
                '<li>' +
                '<a href="#url">' +
                '<p class="img"><img src="'+ imgPath +'/com/icon/others//ico_mpoint.png"></p>' +
                '<p class="p3_m_ctr mt8">M포인트몰</p>' +
                '</a>' +
                '</li>' +
                '<li>' +
                '<a href="#url">' +
                '<p class="img"><img src="'+ imgPath +'/com/icon/others/ico_dive.png"></p>' +
                '<p class="p3_m_ctr mt8">DIVE</p>' +
                '</a>' +
                '</li>' +
                '<li>' +
                '<a href="#url">' +
                '<p class="img"><img src="'+ imgPath +'/com/icon/others/ico_weather.png"></p>' +
                '<p class="p3_m_ctr mt8">웨더</p>' +
                '</a>' +
                '</li>' +
                '</ul>' +
                '<div class="other">' +
                '<a href="#url" class="p1_b_lt"><span class="textbico_small">MY BUSINESS</span></a>' +
                '<a href="#url" class="p1_b_lt"><span class="textbico_small">MY COMPANY</span></a>' +
                '</div>' +
                '</div>' +
                '</div>'  + EndDiv;

                if(headerName === 'logo1' || headerName === 'logo5' || headerName === 'text1' || headerName === 'text5' || headerName === 'main' || headerName === 'cardDtl' || headerName === 'dropdownOpt' ){
                    $('header').append(menuHtml);
                }
            }
        }
    }
}


var invalidMsg = {
    add : function(id, txt, error){
        // error 메세지
        var boxInpCellBox = $('#' + id).closest("[class^='box_input']");
        var messageArea = boxInpCellBox.find(".p3_m_lt_1ln:visible");
        if(messageArea.length > 0){
            var originText = messageArea.html();
            if ( !messageArea.attr("data-origin-text") && !messageArea.hasClass("msg_error") ) {
                messageArea.attr("data-origin-text", originText).html(txt).addClass("msg_error");
            } else {
                messageArea.html(txt).addClass("msg_error");
            }
        } else {
            boxInpCellBox.append($('<p class="p3_m_lt_1ln msg_error">' + txt + '</p>'));
        }
        // error 박스
        if(error == true){
            boxInpCellBox.find(".input_cell_box").addClass("error");
        }
        $('#' + id).focus();
    },

    del : function(id, error){
        // error 메세지
        var boxInpCellBox = $('#' + id).closest("[class^='box_input']");
        var messageArea = boxInpCellBox.find(".p3_m_lt_1ln:visible");
        if(messageArea.attr("data-origin-text")){
            var originText = messageArea.attr("data-origin-text");
            messageArea.html(originText).removeClass("msg_error").removeAttr("data-origin-text");
        }else{
            if ( messageArea.hasClass("msg_error") ) {
                messageArea.remove();
            }
        }

        // error 박스
        if(error == false){
            boxInpCellBox.find(".input_cell_box").removeClass("error");
        }
    }

};
/*
var popup = {
    open : function(id, btn, scroll, url){
        commonUi.layerPop.openLayer(id, btn, scroll, url);
      //2022-01-20 hash change event 추가 Q10011
        if($('.card_detail_view').size()){
            window.location.hash = '#modalPop'
            $(window).on('hashchange' , function(){
                if(location.hash === ''){
                    popup.close(id , '');
                }
            });
        }
    },
    close : function(id, btn){
      //2022-01-20 hash change event 추가 Q10011
        commonUi.layerPop.closeLayer(id, btn);
        if(location.hash !== ''){
            window.history.back();
        }
    }
}
*/
var popup = {
    open : function(id, btn, scroll, url){
        commonUi.layerPop.openLayer(id, btn, scroll, url);
      //2022-01-20 hash change event 추가 Q10011
        if($('.card_detail_view').size()){
            window.location.hash = id;
        }
    },
    close : function(id, btn){
      //2022-01-20 hash change event 추가 Q10011
        commonUi.layerPop.closeLayer(id, btn);
        if(location.hash == '#'+id){
            window.history.back();
        }
    }
}
var modal = {
    open : function(id, btnid){
        var mdl = $("#" + id);
        returnFocusConfirm.push({pid : id, bid: btnid});
        if(mdl.find('[class^=h4_]').length) {
            mdl.find(".layer_body").find("[class^='h4_']").eq(0).attr("id", id + "Title");
            mdl.attr("aria-labelledby", id + "Title");
        }
        mdl.find(".layer_body").find("[class^='p1_'], [class^='p2_']").eq(0).attr("id", id + "Desc");
        mdl.attr({"role": "alertdialog", "aria-describedby": id + "Desc"}).addClass('active');
        mdl.find('.modal_container').attr({'role': 'document', 'tabIndex': 0}).focus();
    },
    close : function(id, btnid){
        var mdl = $("#" + id);
        var btn = $("#" + btnid);
        mdl.removeClass("active").find('.modal_container').removeAttr('tabIndex');
        if(btnid){
            btn.focus();
        }else{
            $.each(returnFocusConfirm, function(index, value){
                if(value.pid == id) $("#" + value.bid).focus();
            });
        }
        returnFocusConfirm = returnFocusConfirm.filter(function(o){
            return id !== o.pid;
        });
        mdl.off("keydown");
    }
}

var toggleCheckAll = function(elem){
    if(elem.find(".agree_list").length == 0){
        return;
    }
    var inpAll = elem.find(".box_chk01");
    var inpChild = elem.find(".agree_list");
    inpAll.on("change", "input[type='checkbox']", function(){
        if($(this).prop("checked") == true){
            inpChild.find("input[type='checkbox']").prop("checked", true);
            if (inpAll.hasClass('error')) {
                inpAll.removeClass('error');
                inpChild.find('.error').removeClass('error');
            }
        } else {
            inpChild.find("input[type='checkbox']").prop("checked", false);
        }
    });
    inpChild.on("change", "input[type='checkbox']", function(){
        if($(this).prop("checked") == false){
            inpAll.find("input[type='checkbox']").prop("checked", false);
        }else{
            if(inpChild.find("li:visible input[type='checkbox']:not(:checked)").length == 0){
                inpAll.find("input[type='checkbox']").prop("checked", true);
                inpAll.removeClass('error');
            }
        }
        if($(this).closest('.error').length) {
            $(this).closest('.error').removeClass('error');
        }
    });
};

/* Q10048 모바일 가상키패드 가림 방지 */
var keyPad = {
    up: function (id) {
        var keyInput = $("#" + id);
        var containerH = $('#container').height();

        if (containerH < $(window).height()) { //스크롤이 생기지 않는 페이지에서 가려짐 방지
            $('html, body').stop().animate({
                scrollTop: keyInput.offset().top
            }, 800);
        }

    }
}

/* GGCZ05 추가 - AS-IS 커스텀 셀렉트박스 및 의존 함수 */
var IEUA = (function(){
    var ua = navigator.userAgent.toLowerCase();
    var mua = {
            IE: /msie 8/.test(ua) || /msie 9/.test(ua) || /msie 7/.test(ua) || /msie 6/.test(ua) || /msie 5/.test(ua)
    };
    return mua;
})();
var _trans = true,
    _conScroll = false,
    _lastScroll = 0,
    _scrollTop = 0,
    _scrollDown = true,
    _topBtn = false,
    _hgt = $(window).height(),
_curFocus = null,
_curFocusObj = null;


jQuery(document).ready(function(){
    commonUi.init();

    $(document).find(".agree_wrap").each(function(){
        toggleCheckAll($(this));
    });

    if ($('.tab_slide').length > 0) {
        /* 모바일 탭 스크롤 위치 */
        $('.tab_slide').each(function () {
            var scrollW = 0;
            var _this = $(this);
            _this.find('a').each(function () {
                if ($(this).hasClass('current')) {
                    return false;
                } else {
                    scrollW = scrollW + $(this).outerWidth();
                }
            });
            setTimeout(function () {
                _this.find('.inner').scrollLeft(scrollW);
            }, 200);

        });

        /* 모바일 탭 전체보기 */
        $(".btn_all_tab").on('click', function () {
            $(this).toggleClass('on');
        });

        /* 카드상세 tab click 이벤트 */
        $('.modal_card_view .tab_default a').on('click', function (e) {
            e.preventDefault();
            $('.modal_card_view .tab_default a').removeClass('current');
            $(this).addClass('current');

            var activeTab = $(this).attr('href');
            $('.modal_card_view .tab_container').hide();
            $(activeTab).show();

            $('.tab_slide').each(function () {
                var scrollW = 0;
                var _this = $(this);
                _this.find('a').each(function () {
                    if ($(this).hasClass('current')) {
                        return false;
                    } else {
                        scrollW = scrollW + $(this).outerWidth();
                    }
                });
                _this.find('.inner').animate({
                    scrollLeft: scrollW
                }, 300);

            });

        });
    }

    // fix button 여백
    /* load 이슈로 load function 으로 이동
    setTimeout(function(){
        if ($(document).find('.btn_bottom').length) {
            var $tabCont = $(".tab_content");
            var $btnBtm = $('.btn_bottom');
            var _btnBh = $btnBtm.innerHeight();
            _btnBh = (_btnBh <= 64) ? 64 : _btnBh; //64 Default height 값

            if($btnBtm.hasClass('fix')) {
                $('.sub_container').css('padding-bottom', _btnBh);
            }
        };
    }, 1000);
    */
    // 고객지원 textarea
    $(document).find(".input_textarea").each(function () {
        var textA = $(this).find('textarea');
        textA.on('focus', function () {
            $(this).closest('.input_textarea').addClass('on');
        });

        textA.on('focusout', function () {
            $(this).closest('.input_textarea').removeClass('on');
        });

    });

    /* select placeholder */
    $(document).find(".box_select select").each(function () {

        $(".box_select select").on('change', function () {
            if ($(this).find('option:selected').prop('value') == "") {
                $(this).removeClass('selected v-selected').addClass('selected');
            } else {
                $(this).removeClass('selected v-selected').addClass('v-selected');
            }
        });
    });

});
//Q10011 전체메뉴 open , close
var menu = {
    open : function(){
        $('.menu_pop').show(0 , function(){
            $('.menu_pop').addClass('active').focus();
        });
        $('body').addClass('modal-open menu-open'); // 2022-02-04 Q10112 : lnb 클릭시  menu-open 추가
    },
    close : function(cls){
        var transitionEnd = 'transitionend  webkitTransitionEnd';//transition 종료 감지
        $('.menu_pop').removeClass('active').on(transitionEnd , function(){
            $('.menu_pop').hide().blur();
            $('.btn_Menu').focus();
        }).off(transitionEnd);
        $('body').removeClass('modal-open menu-open'); // 2022-02-04 Q10112 : lnb 클릭시  menu-open 추가

        // 2022-02-07 Q10112 : lnb close 일때 태그 삭제
        $('.menu_pop .lnb_bg').remove();
        // 2022-02-07 Q10112 : lnb 닫기 클릭시 스크롤위치 되돌림
        $(window).scrollTop(window.oriScroll);
        return false;
    },
    toggle : function(){
        var $body = $('body');
        var $header = $('header');
        var linkClicked = false;

        if(!$('h1').hasClass('active')){
            $body.addClass('modal-open').css('padding-right', commonUi.layerPop.getScrollbarWidth() + 'px');
            if (!$body.find('.modal-backdrop').length) {
                $body.append('<div class="modal-backdrop show"></div>');
            } else {
                $body.find('.modal-backdrop').addClass('show');
            }
            $header.find('h1').addClass('active').find('a').attr('title' , '카드상세 리스트 닫기');
            $header.find('.dropdown_container').addClass('on').slideDown(200);

        } else {
            $header.find('.dropdown_container').removeClass('on').slideUp(200);
            $header.find('h1').removeClass('active').find('a').attr('title' , '카드상세 리스트 열기');
            $body.removeClass('modal-open').removeAttr('style').find('.modal-backdrop').removeClass('show');
        }

        $header.on('click' , '.dropdown_container a', function(e){
            var _this = $(this);
            var _target = _this.attr('href');
            var pos = 0;
            if(_target !=='#url' && _target !== 'javascript:;' && _target !== '#carMd001') {
                pos = $(_target).offset().top - $('header').height() - 15; // 15은 여백을 위해
            } else if (_target === '#carMd001') {
                pos = 0;
            }
            $('html, body').stop().animate({
                scrollTop: pos
            }, 800, 'easeInOutQuad');
            _this.closest('li').addClass('current').siblings().removeClass('current');
            $header.find('.dropdown_container').slideUp(200);
            $header.find('h1').removeClass('active');
            $body.removeClass('modal-open').find('.modal-backdrop').removeClass('show');
            linkClicked = true;
            e.preventDefault();
        });
        $(document).on('click', function(e){
            if($header.has(e.target).length === 0){
                $header.find('h1').removeClass('active').find('a').attr('title' , '카드상세 리스트 열기');
                $header.find('.dropdown_container').removeClass('on').slideUp(200);
                $body.removeClass('modal-open').removeAttr('style').find('.modal-backdrop').removeClass('show');
            }
        });
    },
};

;(function(window, document, $){
    "use strict";
      // 전체 공통 탭 메뉴
      $.fn.tabMenus = function(options){
        var settings = $.extend({}, $.fn.tabMenus.defaults, options || {});
        var self = this;

        return self.each(function(){
          self.$selector = $(this);
          self.$menu = self.$selector.find('> .' + settings.tabMenuClass);
          self.$contents = self.$selector.find('> .' + settings.tabContsClass);
          self.$activate = settings.activeClass;
          self._eAction = settings.event;

          self._create = function() { // 기본세팅
            $(self.$contents).css('display', 'none');
            self.$menu.attr('role', 'tablist');
            self.$menu.find('> li').each(function(){
              var _this = $(this);
              if (!_this.find('a').length) { return }
              var str = /\#/gi;
              var _anchor = _this.find('a').attr('href');

              _this.attr({
                'id': _anchor.replace(str,'anchor-'),
                'role': 'tab',
                'tabindex': 0,
                'aria-selected': false,
                'aria-expanded': false
              }).find('a').attr({
                'role': 'presentation',
                'tabindex': -1
              }).addClass('tabs-anchor');
            });
            self.$contents.each(function(i){
              var _this = $(this);
              _this.attr({
                'role': 'tabpanel',
                'aria-hidden': true,
                'aria-labelledby': self.$menu.find('> li').eq(i).attr('id')
              });
            });

            self._isLocal();
          };

          self._isLocal = function(){ //재설정
            var elem;
            if (settings.startItem > 1) {
              elem = self.$menu.find('> li:nth-child(' + settings.startItem + ') ').find('a').attr('href');

              self.$menu.find('.' + self.$activate).attr({
                'aria-selected': false,
                'aria-expanded': false
              }).removeClass(self.$activate);
              self.$menu.find('> li:nth-child(' + settings.startItem + ') ').attr({
                'tabindex': 0,
                'aria-selected': true,
                'aria-expanded': true
              }).find('a').addClass(self.$activate);
              $(elem).css('display', 'block').attr('aria-hidden', false);
            } else {
                elem = self.$menu.find('> li:first').find('a').attr('href');

              self.$menu.find('> li:first').attr({
                'tabindex': 0,
                'aria-selected': true,
                'aria-expanded': true
              }).find('a').addClass(self.$activate).attr('title', '선택됨');// Q10474 WAI title 추가
              $(elem).css('display', 'block').attr('aria-hidden', false);
            }

            self.Action();
          };

          self.Action = function() {
            self.$menu.on(self._eAction, 'a', function(e){
              var _this = $(this);

              if(!_this.hasClass(self.$activate)) {
                _this.addClass(self.$activate).closest('li').attr({
                  'tabindex': 0,
                  'aria-selected': true,
                  'aria-expanded': true
                }).siblings().attr({
                  'tabindex': -1,
                  'aria-selected': false,
                  'aria-expanded': false
                }).find('.' + self.$activate).removeClass(self.$activate).attr('title', '');
                _this.addClass(self.$activate).closest('li').find('a').attr('title', '선택됨');// Q10474 WAI title 추가
                if( $( _this.attr('href') ) !=='#' || $( _this.attr('href') ) !=='#none' || $(_this.attr('href')) !== '' ) {
                    $( _this.attr('href') ).css('display', 'block').attr('aria-hidden', false).siblings('div' + ('.' + settings.tabContsClass) ).css('display', 'none').attr('aria-hidden', true);
                }
              }

              return false;
            });
          };

          self._init = function(){
            if(!self.$menu.length) { return; }
            self._create();
          };


          self._init();
        });
      };


      $.fn.tabMenus.defaults = {
        startItem: 1,
        tabMenuClass: 'ui_tabs_menu',
        tabContsClass: 'ui_tab_content',
        activeClass: 'is-current',
        event: 'click' //mouseenter, mouseover
      };
  })(window, document, jQuery);

/* cms 로드 후 init */
$(window).load(function () {
    if ($('img.svg').length) { commonUi.cardSvg.init() }
    if ($('.accodWrap').length) { commonUi.accodiran.init() }
    if ($('.modal_pop').length) { commonUi.layerPop.init() }
    if ($('.box_input01').length) { commonUi.inp.init() }
    if ($('.wrap_tooltip').length || $('.tooltip_wrap').length) { ttCont(); }
    if(loc.indexOf('/docfiles/resources/mo/html/') > -1 && loc.indexOf('.html') > -1 && $("body").find("header").length > 0){ commonUi.headerInclude.init() }
    if($('body').find('header').length) { commonUi.allMenu.init() }

    /* 카드상세 tab click 이벤트 */
    $('.modal_card_view .tab_default a').on('click', function (e) {
        e.preventDefault();
        $('.modal_card_view .tab_default a').removeClass('current');
        $(this).addClass('current');

        var activeTab = $(this).attr('href');
        $('.modal_card_view .tab_container').hide();
        $(activeTab).show();

        $('.tab_slide').each(function () {
            var scrollW = 0;
            var _this = $(this);
            _this.find('a').each(function () {
                if ($(this).hasClass('current')) {
                    return false;
                } else {
                    scrollW = scrollW + $(this).outerWidth();
                }
            });
            _this.find('.inner').animate({
                scrollLeft: scrollW
            }, 300);

        });

    });
    if ($(document).find('.btn_bottom').length) {
        //var $tabCont = $(".tab_content");
        var $btnBtm = $('.btn_bottom:visible:last');
        var _btnBh = $btnBtm.innerHeight();
        _btnBh = (_btnBh <= 64) ? 64 : _btnBh; //64 Default height 값

        if($btnBtm.hasClass('fix')) {
            $('.sub_container').css('padding-bottom', _btnBh);
        }
    };
    inputSetProperty();

    // 2022-02-07 Q10112 : lnb open 일때 뒤에 뒤에 스크롤 막기 (개발쪽이랑 구조가 틀려 추가함)
    $('#header .btn_Menu').on('click' , function(){
        $('.menu_pop .menu_top').before('<div class="lnb_bg"></div>');
        // 메뉴 버튼 클릭시 현재 스크롤값 기억
        window.oriScroll = $(window).scrollTop();
    });
});

//Q10011 개발팀 요청에 해당 스크립트 추가 2022-01-11
function inputSetProperty(target){
    var _target = target ? target : $('input');
    var inputValProp = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value');
    inputValProp.set = function(value) {
        var orgInputValProp = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value');
        Object.defineProperty(this, 'value', {
            set : orgInputValProp.set
        });
        this.value = value;
        setInputAction(this);
        Object.defineProperty(this, 'value', inputValProp);
    }

    _target.map(function(i, o) {
        if (/text|tel/.test(this.type)) {
            return o;
        }
    }).each(function() {
        setInputAction(this);
        Object.defineProperty(this, 'value', inputValProp);
    });
}

//Q10011 개발팀 요청에 해당 스크립트 추가 2022-01-11
function setInputAction(_this) {
    var inputCellBox = $(_this).closest('.input_cell_box');
    if (inputCellBox.size()) {
        if (_this.value) {
            if (!inputCellBox.hasClass('completed')) {
                inputCellBox.addClass('completed');
            }
        } else {
            if (inputCellBox.hasClass('completed')) {
                inputCellBox.removeClass('completed');
            }
            if (inputCellBox.hasClass('on')) {
                inputCellBox.removeClass('on');
            }
            if (inputCellBox.hasClass('focused') && !$(_this).is(':focus')) {
                inputCellBox.removeClass('focused');
            }
        }
    }
}
// Tooltip title="" 상태 안내 추가 - Q10474
function ttCont() {
    var ttw = $(".wrap_tooltip");
    ttw.each(function(){
        var tta = $(".btn_tooltip01", this);
        var ttb = $("span", tta).text();
        tta.attr("title", ttb + " 툴팁 열기");
        tta.on("mouseenter focus focusin",function(){
            $(this).attr("title", ttb + " 툴팁 닫기");
        }).on("mouseleave blur focusout", function(){
            $(this).attr("title", ttb + " 툴팁 열기");            
        })
    });
    var ttw2 = $(".tooltip_wrap");
    ttw2.each(function(){
        var tta = $(".btn_tooltip01", this);
        var ttb = $("span", tta).text();
        tta.attr("title", ttb + " 툴팁 열기");
        tta.on("mouseenter focus focusin",function(){
            $(this).attr("title", ttb + " 툴팁 닫기");
        }).on("mouseleave blur focusout", function(){
            $(this).attr("title", ttb + " 툴팁 열기");            
        })
    });

}
$(document).on("ready",function(){
  ttCont();
});

// Tab 초점이동- Q10474
if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach;
}
window.addEventListener('DOMContentLoaded', function () {
    var tabFocus = 0;
    var tabs = document.querySelectorAll('[role="tab"]');
    var tabs01 = document.querySelectorAll('[role="tab01"]');
    var tabs02 = document.querySelectorAll('[role="tab02"]');
    var tabs03 = document.querySelectorAll('[role="tab03"]');
    var tabs04 = document.querySelectorAll('[role="tab04"]');
    var tabList = document.querySelector('[role="tablist"]');
    var tabList01 = document.querySelector('[role="tablist01"]');
    var tabList02 = document.querySelector('[role="tablist02"]');
    var tabList03 = document.querySelector('[role="tablist03"]');
    var tabList04 = document.querySelector('[role="tablist04"]');
    tabs.forEach(function (tab) {
        tab.addEventListener('click', changeTabs);
    });
    tabs01.forEach(function (tab01) {
        tab01.addEventListener('click', changeTabs);
    });
    tabs02.forEach(function (tab02) {
        tab02.addEventListener('click', changeTabs);
    });
    tabs03.forEach(function (tab03) {
        tab03.addEventListener('click', changeTabs);
    });
    tabs04.forEach(function (tab04) {
        tab04.addEventListener('click', changeTabs);
    });
    if(tabs.length){
        tabList.addEventListener('keydown', function (e) {
            if (e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 40) {
                tabs[tabFocus].setAttribute('tabindex', -1);
                if (e.keyCode === 39 || e.keyCode === 40) {
                    tabFocus++;
                    if (tabFocus >= tabs.length) {
                        tabFocus = 0;
                    }
                } else if (e.keyCode === 37 || e.keyCode === 38) {
                    tabFocus--;
                    if (tabFocus < 0) {
                        tabFocus = tabs.length - 1;
                    }
                }
                tabs[tabFocus].setAttribute('tabindex', 0);
                tabs[tabFocus].focus();
            }
        });
    }
    if(tabs01.length){
        tabList01.addEventListener('keydown', function (e) {
            if (e.keyCode === 37 || e.keyCode === 39) {
                tabs01[tabFocus].setAttribute('tabindex', -1);
                if (e.keyCode === 39) {
                    tabFocus++;
                    if (tabFocus >= tabs01.length) {
                        tabFocus = 0;
                    }
                } else if (e.keyCode === 37) {
                    tabFocus--;
                    if (tabFocus < 0) {
                        tabFocus = tabs01.length - 1;
                    }
                }
                tabs01[tabFocus].setAttribute('tabindex', 0);
                tabs01[tabFocus].focus();
            }
        });
    }
    if(tabs02.length){
        tabList02.addEventListener('keydown', function (e) {
            if (e.keyCode === 37 || e.keyCode === 39) {
                tabs02[tabFocus].setAttribute('tabindex', -1);
                if (e.keyCode === 39) {
                    tabFocus++;
                    if (tabFocus >= tabs02.length) {
                        tabFocus = 0;
                    }
                } else if (e.keyCode === 37) {
                    tabFocus--;
                    if (tabFocus < 0) {
                        tabFocus = tabs02.length - 1;
                    }
                }
                tabs02[tabFocus].setAttribute('tabindex', 0);
                tabs02[tabFocus].focus();
            }
        });
    }
    if(tabs03.length){
        tabList03.addEventListener('keydown', function (e) {
            if (e.keyCode === 37 || e.keyCode === 39) {
                tabs03[tabFocus].setAttribute('tabindex', -1);
                if (e.keyCode === 39) {
                    tabFocus++;
                    if (tabFocus >= tabs03.length) {
                        tabFocus = 0;
                    }
                } else if (e.keyCode === 37) {
                    tabFocus--;
                    if (tabFocus < 0) {
                        tabFocus = tabs03.length - 1;
                    }
                }
                tabs03[tabFocus].setAttribute('tabindex', 0);
                tabs03[tabFocus].focus();
            }
        });
    }
    if(tabs04.length){
        tabList04.addEventListener('keydown', function (e) {
            if (e.keyCode === 37 || e.keyCode === 39) {
                tabs04[tabFocus].setAttribute('tabindex', -1);
                if (e.keyCode === 39) {
                    tabFocus++;
                    if (tabFocus >= tabs04.length) {
                        tabFocus = 0;
                    }
                } else if (e.keyCode === 37) {
                    tabFocus--;
                    if (tabFocus < 0) {
                        tabFocus = tabs04.length - 1;
                    }
                }
                tabs04[tabFocus].setAttribute('tabindex', 0);
                tabs04[tabFocus].focus();
            }
        });
    }
});
function changeTabs(e) {
    var target = e.target;
    if(target.id === ''){//이벤트 타겟이 a가 아닐때 a로 조정
        target = target.closest('a');
    }
    var parent = target.parentNode;
    var grandparent = parent.parentNode;
    
   grandparent.querySelectorAll('[aria-selected="true"]').forEach(function (t) {        
        t.removeAttribute('title');
        t.setAttribute('tabindex' , '-1');
        return t.setAttribute('aria-selected', false);
    });   

    parent.querySelectorAll('[aria-selected="false"]').forEach(function (t) {        
        target.setAttribute('title', '선택됨');
        t.setAttribute('tabindex' , '0');
        return t.setAttribute('aria-selected', true);
    });

    if(grandparent.querySelectorAll('style').length){
        grandparent.querySelectorAll('[role="tabpanel"]').forEach(function (p) {
            return p.setAttribute('style', 'display:none;');
        });
        grandparent.parentNode.querySelector('#' + target.getAttribute('aria-controls')).removeAttribute('style');
    }
    
}

