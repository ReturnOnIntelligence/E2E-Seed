$(document).ready(function() {

    $('.collapse').on('hide.bs.collapse', function(e) {
        e.stopPropagation();
        $(this).prev().removeClass('open');
    }).on('show.bs.collapse', function(e) {
        e.stopPropagation();
        $(this).prev().addClass('open');
    });

    $('a.toggle').on('click', function() {
        if ($(this).text() === 'Screenshot -') {
            $(this).text('Screenshot +');
            $(this).next('a.screenshot').find('img').hide();
        } else {
            $(this).text('Screenshot -');
            $(this).next('a.screenshot').find('img').show();
        }
    });
    var $generated = $('.generated-on');

    $generated.text('Generated ' + moment($generated.text()).fromNow());
	
	$('#show-passed').on('click', function() {
		$("[id=failed]").hide();
		$("[id=passed]").show();
    });
	
	$('#show-failed').on('click', function() {
		$("[id=passed]").hide();
		$("[id=failed]").show();
    });
	
	$('#show-all').on('click', function() {
		$("[id=passed]").show();
		$("[id=failed]").show();
    });

	$("[id=passed]").hide();

});
