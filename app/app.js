/*	Author: Adam Hess
*   Contact: adamhess347@gmail.com
*/

//Sets up all the click functionality of the HTML page after the page i loaded


define(['./canvas',
	'./unit_tests',
	'css!./styling'],
	function(Canvas,
		 UnitTester,
		 PageCSS) {


	var aCanvas = new Canvas();	 
	document.getElementById('cleanCanvasButton').onclick = function() {
		aCanvas.cleanCanvas();
		aCanvas.displayCanvas(true);
	};
	document.getElementById('executeButton').onclick = function() {
		//the browser is treating all the numbers as strings
		//force it to use them as Numbers
		var isErrored = false; 
			document.getElementById('errorMessage').innerText =	'';
		switch(document.getElementById('action').value) {
			case 'create':
				var width = Number(document.getElementById('option_Width').value);
				var height = Number(document.getElementById('option_Height').value);
				isErrored = aCanvas.setDimensions(width, height);
				enableDropDownOptions();			
				break;
			case 'line':
				var x1 = Number(document.getElementById('option_X1').value);
				var y1 = Number(document.getElementById('option_Y1').value);
				var x2 = Number(document.getElementById('option_X2').value);
				var y2 = Number(document.getElementById('option_Y2').value);
				isErrored = aCanvas.drawLine(x1,y1,x2,y2, true);
				break;
			case 'rectangle':
				//underscores stops jshint from complaining
				var x_1 = Number(document.getElementById('option_X1').value);
				var y_1 = Number(document.getElementById('option_Y1').value);
				var x_2 = Number(document.getElementById('option_X2').value);
				var y_2 = Number(document.getElementById('option_Y2').value);
				isErrored = aCanvas.drawReq(x_1,y_1,x_2,y_2, true);
				break;
			case 'fill':
				var x = Number(document.getElementById('option_X').value);
				var y = Number(document.getElementById('option_Y').value);
				var color = document.getElementById('option_Color').value;
				isErrored = aCanvas.bucketFillArea(x,y,color);
				break;
		}		
		if (isErrored) {
			document.getElementById('errorMessage').innerText = 'Invalid Input: ' + isErrored;
		}
		else {
			aCanvas.displayCanvas(true);
		}
	};	

	function setCanvasOptions() {
		var optionsEl = document.getElementById('options');
		optionsEl.innerHTML = '';		
		var labels = [];
		var action = document.getElementById('action').value;
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
		optionsEl.innerHTML = optionHtml;
	};

	document.getElementById('action').onchange = setCanvasOptions;
	document.getElementById('runUnitTests').onclick = function() {
		//create a new canvas so the unit tests dont modify the one 
		// that we are currently working with
		var testerCanvas = new Canvas();
		document.getElementById('unitTestMessageArea').innerHTML ='';
		var testMessage = UnitTester.runAllTests(testerCanvas, true);	
		document.getElementById('unitTestMessageArea').innerHTML = testMessage;
	};


	function disableDropDownOptions() {
		document.getElementById('action_line').disabled = true;
		document.getElementById('action_rectangle').disabled = true;		
		document.getElementById('action_fill').disabled = true;				
	}
	function enableDropDownOptions() {
		document.getElementById('action_line').disabled = false;
		document.getElementById('action_rectangle').disabled = false;		
		document.getElementById('action_fill').disabled = false;					
	}
	//equivelent of Main	
	function initializePage() {
		aCanvas.resetCanvas();
		setCanvasOptions();
	};[]

	return initializePage;


});
