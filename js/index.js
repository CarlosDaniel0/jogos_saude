$(function() {
    $('.btn').on('click', function () {
        var name = $(this).attr('data-name')
        window.location.assign(`quiz/?${name}`)
    })

    $('.container-fluid').delay(1000).fadeIn('slow');
})