/**
 * Created by pilagod on 3/13/15.
 */
(function(){
    var count = 0;

    $('html').on('mousewheel', function(event){
        count ++ ;

        if(count == 10){
            $("#bubble1").removeClass('hide');
            $("#bubble1").addClass('show');
        }else if(count == 20){
            $("#bubble2").removeClass('hide');
            $("#bubble2").addClass('show');
        }else if(count == 30){
            $("#bubble3").removeClass('hide');
            $("#bubble3").addClass('show');
        }else if(count == 40){
            $("#bubble4").addClass('show');
            $("#bubble4").removeClass('hide');
        }
        console.log(count);
        // return false;
    })

}());