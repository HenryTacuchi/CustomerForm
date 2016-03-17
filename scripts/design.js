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


	/* center modal */
	function centerModals($element) {
	  var $modals;
	  if ($element.length) {
	    $modals = $element;
	  } else {
	    $modals = $('.modal-vcenter:visible');
	  }
	  $modals.each( function(i) {
	    var $clone = $(this).clone().css('display', 'block').appendTo('body');
	    var top = Math.round(($clone.height() - $clone.find('.modal-content').height()) / 2);
	    top = top > 0 ? top : 0;
	    $clone.remove();
	    $(this).find('.modal-content').css("margin-top", top).css("transition", "all 0.2s").css("-webkit-transition", "all 0.2s");
	  });
	}

	$('.modal').on('show.bs.modal', function(e) {
	  centerModals($(this));
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