/*  Author: Adam Hess
*   Contact: adamhess347@gmail.com
*/

define([], function() {
//Basic unit tests for all features 
var UnitTester = {
  log: function(text) {
    this.testMessage += text;
    //line breaks for displaying in browser
    //need to be <br/> tags as '\n' will only
    //work for displaying in the correct format 
    //in the console
    if (this.displayInBrowser) {
      this.testMessage += '<br/>';
    }
    else {
      this.testMessage += '\n';
    }
  },
 runAllTests: function(aCanvas, displayInBrowser) {
    this.testMessage ='';
    this.displayInBrowser = displayInBrowser;
    this.test_create_canvas(aCanvas);
    this.test_create_line(aCanvas);
    this.test_create_square(aCanvas);
    this.test_bucket_fill(aCanvas);
    if (!displayInBrowser) {
      console.log(this.testMessage);
      return '';
    }
    else {
      return this.testMessage;
    }
  },
  _compareMatrix: function(array1, array2) {
    return JSON.stringify(array1) === JSON.stringify(array2);
  },
  test_create_canvas: function(aCanvas) {  
      this.log('---------Create Canvas Unit Test ----');
      var canvas1 = [[' ']];
      var canvas2 = [[' ',' ',' ',' ',' '],
               [' ',' ',' ',' ',' '],
               [' ',' ',' ',' ',' '],
               [' ',' ',' ',' ',' '],
               [' ',' ',' ',' ',' ']];
      var canvas3 = [[' ', ' ', ' '],
               [' ', ' ', ' '],
               [' ', ' ', ' '],
               [' ', ' ', ' '],
               [' ', ' ', ' '],
               [' ', ' ', ' '],
               [' ', ' ', ' '],
               [' ', ' ', ' '],
               [' ', ' ', ' '],
               [' ', ' ', ' ']];

      aCanvas.setDimensions(1,1);
      var result = this._compareMatrix(canvas1, 
              aCanvas.getCanvasArray()) ? 'Passed!' : 'Failed!';
      this.log('Test 1: Create (1,1) Canvas: ' + result);
      
      aCanvas.setDimensions(5,5);
      result = this._compareMatrix(canvas2, 
              aCanvas.getCanvasArray()) ? 'Passed!' : 'Failed!';
      this.log('Test 2: Create (5,5) Canvas: '+ result);
      
      aCanvas.setDimensions(3,10);  
      result = this._compareMatrix(canvas3, 
              aCanvas.getCanvasArray()) ? 'Passed!' : 'Failed!';
      this.log('Test 3: Create (3,10) Canvas: ' + result);      
      this.log('-----------------');
    },
    test_create_line: function(aCanvas) {
      this.log('---------Create Lines Unit Test ----');

      var canvas1 = [[' ',' ',' ',' ',' '],
               [' ',' ',' ',' ',' '],
               [' ','x','x','x','x'],
               [' ',' ',' ',' ',' '],
               [' ',' ',' ',' ',' ']];

      var canvas2 = [[' ',' ',' ','x',' '],
               [' ',' ',' ','x',' '],
               [' ',' ',' ','x',' '],
               [' ',' ',' ','x',' '],
               [' ',' ',' ',' ',' ']];

      var canvas3 = [[' ',' ','x',' ',' '],
               [' ',' ','x',' ',' '],
               ['x','x','x','x','x'],
               [' ',' ','x',' ',' '],
               [' ',' ','x',' ',' ']];

       aCanvas.setDimensions(5,5);
       aCanvas.resetCanvas();

      aCanvas.drawLine(1,2,4,2, true);
      var result = this._compareMatrix(canvas1, 
              aCanvas.getCanvasArray()) ? 'Passed!' : 'Failed!';
      this.log('Test 1: Draw Line Horizontal line from (1,2) to (4,2): ' + result);
      aCanvas.resetCanvas();
      aCanvas.drawLine(3,0,3,3, true);
      result = this._compareMatrix(canvas2, 
              aCanvas.getCanvasArray()) ? 'Passed!' : 'Failed!';
      this.log('Test 2: Draw Line Vertical line from (3,0) to (3,3): ' + result);

      aCanvas.resetCanvas();
      aCanvas.drawLine(2,0,2,4, true);
      aCanvas.drawLine(0,2,4,2, true);    
      result = this._compareMatrix(canvas3, 
              aCanvas.getCanvasArray()) ? 'Passed!' : 'Failed!';
      this.log('Test 3: Draw Line Vertical line from (2,0) to (2,4)\n' + 
            '\t\tand Draw Horizontal Line (0,2) to (4,2): ' + result);
      this.log('---------------------');

    },
    test_create_square: function(aCanvas) { 
      this.log('--------Create Rectangle Unit Test ------');
      //(2,2) (6,5)
      var canvas1 = [[' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
               [' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
               [' ',' ','x','x','x','x','x',' ',' ',' '],
               [' ',' ','x',' ',' ',' ','x',' ',' ',' '],
               [' ',' ','x',' ',' ',' ','x',' ',' ',' '],
               [' ',' ','x','x','x','x','x',' ',' ',' '],
               [' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
               [' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
               [' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
               [' ',' ',' ',' ',' ',' ',' ',' ',' ',' ']];
      //(1,0) (3,3)
      var canvas2 = [[' ','x','x','x',' ',' ',' ',' ',' ',' '],
               [' ','x',' ','x',' ',' ',' ',' ',' ',' '],
               [' ','x',' ','x',' ',' ',' ',' ',' ',' '],
               [' ','x','x','x',' ',' ',' ',' ',' ',' '],
               [' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
               [' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
               [' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
               [' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
               [' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
               [' ',' ',' ',' ',' ',' ',' ',' ',' ',' ']];
       //rec 1 (0,0) (5,4)
       //rec 2 (3,2) (8,7)
        var canvas3 = [['x','x','x','x','x','x',' ',' ',' ',' '],
               ['x',' ',' ',' ',' ','x',' ',' ',' ',' '],
               ['x',' ',' ','x','x','x','x','x','x',' '],
               ['x',' ',' ','x',' ','x',' ',' ','x',' '],
               ['x','x','x','x','x','x',' ',' ','x',' '],
               [' ',' ',' ','x',' ',' ',' ',' ','x',' '],
               [' ',' ',' ','x',' ',' ',' ',' ','x',' '],
               [' ',' ',' ','x','x','x','x','x','x',' '],
               [' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
               [' ',' ',' ',' ',' ',' ',' ',' ',' ',' ']];
      aCanvas.setDimensions(10,10);
       
      aCanvas.resetCanvas();
      aCanvas.drawReq(2,2,6,5,true);
    var result = this._compareMatrix(canvas1, 
              aCanvas.getCanvasArray()) ? 'Passed!' : 'Failed!';
      this.log('Test 1: Draw Rectangle using points (2,2) (6,5): ' + result);

    aCanvas.resetCanvas();
      aCanvas.drawReq(1,0,3,3,true);
    result = this._compareMatrix(canvas2, 
              aCanvas.getCanvasArray()) ? 'Passed!' : 'Failed!';
      this.log('Test 2: Draw Rectangle using points (1,0) (3,3): ' + result);
    aCanvas.resetCanvas();
      aCanvas.drawReq(0,0,5,4,true);
      aCanvas.drawReq(3,2,8,7,true);
      result = this._compareMatrix(canvas3, 
              aCanvas.getCanvasArray()) ? 'Passed!' : 'Failed!';
      this.log('Test 3: Draw 2 Rectangle using points (0,0) (5,4)  and (3,2) (8,7): ' + result);
      this.log('---------------------------------');
    },
    test_bucket_fill: function(aCanvas) {
      var canvas1 = [['x','x','x','x','x','x',' ',' ',' ',' '],
    				   ['x','@','@','@','@','x',' ',' ',' ',' '],
    				   ['x','@','@','x','x','x','x','x','x',' '],
    				   ['x','@','@','x',' ','x',' ',' ','x',' '],
    				   ['x','x','x','x','x','x',' ',' ','x',' '],
    				   [' ',' ',' ','x',' ',' ',' ',' ','x',' '],
    				   [' ',' ',' ','x',' ',' ',' ',' ','x',' '],
    				   [' ',' ',' ','x','x','x','x','x','x',' '],
    				   [' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
    				   [' ',' ',' ',' ',' ',' ',' ',' ',' ',' ']];

	    var canvas2 = [['x','x','x','x','x','x',' ',' ',' ',' '],
    				   ['x',' ',' ',' ',' ','x',' ',' ',' ',' '],
    				   ['x',' ',' ','x','x','x','x','x','x',' '],
    				   ['x',' ',' ','x',' ','x','@','@','x',' '],
    				   ['x','x','x','x','x','x','@','@','x',' '],
    				   [' ',' ',' ','x','@','@','@','@','x',' '],
    				   [' ',' ',' ','x','@','@','@','@','x',' '],
    				   [' ',' ',' ','x','x','x','x','x','x',' '],
    				   [' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
    				   [' ',' ',' ',' ',' ',' ',' ',' ',' ',' ']];
		  var canvas3 = [['x','x','x','x','x','x','@','@','@','@'],
    				   ['x',' ',' ',' ',' ','x','@','@','@','@'],
    				   ['x',' ',' ','x','x','x','x','x','x','@'],
    				   ['x',' ',' ','x',' ','x',' ',' ','x','@'],
    				   ['x','x','x','x','x','x',' ',' ','x','@'],
    				   ['@','@','@','x',' ',' ',' ',' ','x','@'],
    				   ['@','@','@','x',' ',' ',' ',' ','x','@'],
    				   ['@','@','@','x','x','x','x','x','x','@'],
    				   ['@','@','@','@','@','@','@','@','@','@'],
    				   ['@','@','@','@','@','@','@','@','@','@']];

  		aCanvas.setDimensions(10,10);
  		var resetBucketFillTest = function() {
	  		aCanvas.resetCanvas();
	  		aCanvas.drawReq(0,0,5,4,true);
	  		aCanvas.drawReq(3,2,8,7,true);
	  	};
	  	this.log('--------------Bucket Fill Unit Test -------');
	  	resetBucketFillTest();
	  	aCanvas.bucketFillArea(1,1,'@', true);
	  	var result = this._compareMatrix(canvas1, 
    					aCanvas.getCanvasArray()) ? 'Passed!' : 'Failed!';
    	this.log('Test 1: Fill Bucket at (1,1): ' + result);

	  	resetBucketFillTest();
	  	aCanvas.bucketFillArea(7,4,'@', true);
	  	result = this._compareMatrix(canvas2, 
    					aCanvas.getCanvasArray()) ? 'Passed!' : 'Failed!';
    	this.log('Test 1: Fill Bucket at (7,4): ' + result);

	  	resetBucketFillTest();
	  	aCanvas.bucketFillArea(1,7,'@', true);
	  	result = this._compareMatrix(canvas3, 
    					aCanvas.getCanvasArray()) ? 'Passed!' : 'Failed!';
    	this.log('Test 3: Fill Bucket at (1,7): ' + result);

	  	this.log('---------------------');

    }

};
return UnitTester;
});
