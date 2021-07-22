tip_percent=15
// Function for error detaction
function error_detection(e)
{
    value=$(e).val()
    if(value<=0)
    {
        $(e).addClass("error")
        error_element=$(e).parent(".input-box").parent(".each-input").find(".label-box .error")
        if(value==0)
            $(error_element).text("Cant't be zero");
        else
            $(error_element).text("Cant't be negative");
        $(error_element).show("fast")
        return 0;
    }
    else
    {
        $(e).removeClass("error")
        error_element=$(e).parent(".input-box").parent(".each-input").find(".label-box .error")
        $(error_element).text("");
        $(error_element).hide("fast")
        return 1;
    }
}
// Function for calculating tip 
function calculate_tip(){
    if(error_detection($("#bill")) && error_detection($("#nofpeople")))
    {
        nofpeople=parseInt($("#nofpeople").val())
        bill=parseInt($("#bill").val())
        tip=tip_percent*bill/100
        total=bill+tip
        tip_per_person=tip/nofpeople
        total_per_person=total/nofpeople
        $("#calc-tip").text("$"+tip_per_person.toFixed(2))
        $("#calc-total").text("$"+total_per_person.toFixed(2))
        $(".reset").addClass("active")
        $(".reset").attr('disabled',false);
    }
    else
    {
        $(".reset").removeClass("active")
        $(".reset").attr('disabled',true);
    }
}
// Function for reset 
function reset(){
    tip_percent=15
    $(".each-input .tip-val").removeClass("active")
    $(".tip-val.default").addClass("active")
    $("#custom-tip-input").slideUp("fast",function(){
        $("#custom-button").slideDown("fast");
    });
    $(".each-input input").val("").removeClass(".error")
    $(".value-box p").text("$0.00")
}

// EventListeners 
$(".reset").click(reset)
$("#nofpeople").on("input",calculate_tip)
$("#bill").on("input",calculate_tip)
$("#custom-tip-input").on("input",function(){
    tip_percent=parseInt($(this).val())
    calculate_tip()
})
$("#custom-button").click(function(){
    $("#custom-button").slideUp("fast",function(){
        $("#custom-tip-input").slideDown("fast");
        $("#custom-tip-input").focus();
    });
})
$(".each-input .tip-val").click(function(){
    $(".each-input .tip-val").removeClass("active")
    $(this).addClass("active")
    percent=$(this).find("p").text()
    percent=percent.substr(0,percent.length-1)
    tip_percent=parseInt(percent)
    calculate_tip()
    $("#custom-tip-input").slideUp("fast",function(){
        $("#custom-button").slideDown("fast");
    });
})
