$(document).ready(function(){
    $('.calendar').calendar({
        highlightRange: [],
        isRange: true,
        onChange: function() {}           
    });
    var absenteeismDate = [{'signDate': '2018-12-01'}],// 缺勤
    dailyCardDate = [{'signDate': '2018-12-02'}],// 正常
    leaveDate = [{'signDate': '2018-12-04'}];// 请假   
    // 缺勤
    if (absenteeismDate.length) {
        _.map(absenteeismDate, function(item) {
            var date = item.signDate.replace(/\-| |:/g, '');
            $('.calendar').find('#' + date).addClass('widget-highlight');
            //跳转至缺勤补卡页面
            $('.calendar').find('#' + date).click(function(){   
                // 将'yyyyMMdd'转换成'yyyy-MM-dd'                                 
                var day = item.signDate.replace(/^(\d{4})(\d{2})(\d{2})$/, "$1-$2-$3");                                   
                sessionStorage.setItem('signDate', day);
                window.open('../../view/shanDongYiStoreWebchat/applyForAddPunchCard.html', '_self');                                 
            })
        });
    };
    // 正常
    if (dailyCardDate.length) {
        _.map(dailyCardDate, function(item) {
            // 将'yyyy-MM-dd'转换成'yyyyMMdd'
            var date = item.signDate.replace(/\-| |:/g, '');
            $('.calendar').find('#' + date).addClass('widget-card');                             
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