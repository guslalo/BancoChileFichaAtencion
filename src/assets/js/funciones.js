$(document).ready(function(){
    $(".custom-file-input").on("change",function(){
        $(this).siblings("label").html($(this).val().replace(/^.*\\/, ""));
    });
}); 
