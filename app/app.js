/*	Author: Adam Hess
*   Contact: adamhess347@gmail.com
*/

//Sets up all the click functionality of the HTML page after the page i loaded


define(['./canvas',
	'./unit_tests',
	'css!./styling',
	'jquery'],
	function(Canvas,
		 UnitTester,
		 PageCSS,
		 $) {


	var aCanvas = new Canvas();	 
	$('#cleanCanvasButton').click( function() {
		aCanvas.cleanCanvas();
		aCanvas.displayCanvas(true);
	});
	$('#executeButton').click(function() {
		//the browser is treating all the numbers as strings
		//force it to use them as Numbers
		var isErrored = false; 
		$('#errorMessage').empty();
		var action = $('#action').val();
		if (action === 'create') {
			var width = Number($('#option_Width').val());
			var height = Number($('#option_Height').val());
			isErrored = aCanvas.setDimensions(width, height);
			enableDropDownOptions();			
		}
		else if ((action === 'line') ||  (action == 'rectangle')) {
			var x1 = Number($('#option_X1').val());
			var y1 = Number($('#option_Y1').val());
			var x2 = Number($('#option_X2').val());
			var y2 = Number($('#option_Y2').val());
			if (action === 'line') {
				isErrored = aCanvas.drawLine(x1,y1,x2,y2);
			}
			else {
				isErrored = aCanvas.drawReq(x1,y1,x2,y2);
			}
		}
		else if (action == 'fill') {
			var x = Number($('#option_X').val());
			var y = Number($('#option_Y').val());
			var color = $('#option_Color').val();
			isErrored = aCanvas.bucketFillArea(x,y,color);
		}

		if (isErrored) {
			$('#errorMessage').html('Invalid Input: ' + isErrored);
		}
		else {
			aCanvas.displayCanvas(true);
		}
	
	});	

	function setCanvasOptions() {
		var optionsEl = $('#options');	
		var labels = [];
		var action = $('#action').val();
		switch(action) {
			case 'create':
				labels = ['Width', 'Height'];
				break;
			case 'line':
				labels = ['X1', 'Y1', 'X2', 'Y2' ];
				break;
			case 'rectangle':
				labels = ['X1', 'Y1', 'X2', 'Y2' ];
				break;
			case 'fill':
				labels = ['X', 'Y', 'Color'];			
				break;
		}
		var optionHtml  = '';
		for (var i =0; i< labels.length; i++ ) {
			if (labels[i] === 'Color') {	
				optionHtml += '<input type=\"text\" '+ 
					'name=\"Color\"' +
					'id=\"option_'+ labels[i]+'\"maxlength=\"1\" minlength=\"1\" class=\"anOption\" requred>';	

			}
			else {

				var maxDim = '';
				if (action !== 'create') {
					
					if (labels[i][0] === 'X') {
						maxDim = aCanvas.size.xDimension-1;
					}
					if (labels[i][0] === 'Y') {
						maxDim = aCanvas.size.yDimension-1;
					}
				}
				optionHtml += '<input type=\"number\" '+ 
								'name=\"' + labels[i]+'\"' +
								'id=\"option_'+ labels[i]+'\"  min=\"0\" max=\"' + maxDim+ '\" class=\"anOption\" requred>';
			}
			optionHtml += '<label for=\"'+ labels[i]+'\">'+
							labels[i] +
							'</label>';

		}
		optionsEl.html(optionHtml);
	}

	$('#action').change(setCanvasOptions);
	$('#runUnitTests').click( function() {
		//create a new canvas so the unit tests dont modify the one 
		// that we are currently working with
		var testerCanvas = new Canvas();
		$('#unitTestMessageArea').empty();
		var testMessage = UnitTester.runAllTests(testerCanvas, true);	
		$('#unitTestMessageArea').append(testMessage);
	});


	function disableDropDownOptions() {
		$('#action_line').prop('disabled', true);
		$('#action_rectangle').prop('disabled', true);
		$('#action_fill').prop('disabled', true);
	}
	function enableDropDownOptions() {
		$('#action_line').prop('disabled', false);
		$('#action_rectangle').prop('disabled', false);
		$('#action_fill').prop('disabled', false);
	}
	//equivelent of Main	
	function initializePage() {
		aCanvas.resetCanvas();
		disableDropDownOptions();
		setCanvasOptions();
	}

	return initializePage;


});
