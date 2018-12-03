$(document).ready(function(){

    $('.calendar').calendar({
        highlightRange: [],
        isRange: true,
        onChange: function() {}           
    });

    var absenteeismDate = [{'signDate': '2018-12-01'}],
    dailyCardDate = [{'signDate': '2018-12-02'}],
    leaveDate = [{'signDate': '2018-12-04'}];
    // 正常
    if (dailyCardDate.length) {
        _.map(dailyCardDate, function(item) {
            var date = item.signDate.replace(/\-| |:/g, '');
            $('.calendar').find('#' + date).addClass('widget-card');                             
        });
    };
    // 缺勤
    if (absenteeismDate.length) {
        _.map(absenteeismDate, function(item) {
            var date = item.signDate.replace(/\-| |:/g, '');
            $('.calendar').find('#' + date).addClass('widget-highlight');
            //跳转至缺勤补卡页面
            $('.calendar').find('#' + date).click(function(){                                    
                var day = item.signDate.replace(/^(\d{4})(\d{2})(\d{2})$/, "$1-$2-$3");                                   
                // sessionStorage.setItem(item.signDate, day);
                window.open('../../view/shanDongYiStoreWebchat/applyForAddPunchCard.html', '_self');                                 
            })
        });
    };
    // 请假
    if (leaveDate.length) {
        _.map(leaveDate, function(item) {
            var date = item.signDate.replace(/\-| |:/g, '');
            $('.calendar').find('#' + date).addClass('widget-leave');                             
        });
    };
   
})