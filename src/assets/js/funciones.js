$(document).ready(function(){
    $(".custom-file-input").change(function(){
        $(this).siblings("label").html($(this).val().replace(/^.*\\/, ""));
    });
}); 
