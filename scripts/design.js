$(document).ready(function () {

	$('#formScreen').addClass('hideForm');

	$('.btnStartRegistration').click(function(){

		$('#formScreen')
		.removeClass('hideForm')
		.addClass('showForm');
		

		$('#startScreen')
		.removeClass('showStart')
		.addClass('hideStart');

	});

	$('.btnReturn').click(function(){

		$('#formScreen')
		.removeClass('showForm')
		.addClass('hideForm');

		$('#startScreen')
		.removeClass('hideStart')
		.addClass('showStart');

	});

});

$(window).load(function(){
	$('.sizeRow')
	.height(
		$('body').height() - $('nav').height() - $('footer').height()
	);

	$('#birthday').click(function(){
		$('#modalDatePicker').modal('show');
	});
});