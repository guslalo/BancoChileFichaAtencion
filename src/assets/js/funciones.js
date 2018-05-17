$(document).ready(function(){
    $(".custom-file-input").change(function(){
        $(this).siblings("label").html($(this).val().replace(/^.*\\/, ""));
    });
}); 
$(".custom-file-input").on("change",function(){
    $(this).siblings("label").html($(this).val().replace(/^.*\\/, ""));
});