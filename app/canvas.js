/*	Author: Adam Hess
*   Contact: adamhess347@gmail.com
*/

define([], function() {

//This file contains the raw logic for creating 
//and working with the Canvas object 
var Canvas = function () {
		this.size = { 
			xDimension: 5,
			yDimension: 5

		}; 
		this._unRenderedCanvas= [];
		this.setDimensions =  function(x, y) {
			if ((x <=0) || (y <= 0)) {
				return 'Dimensions must be greater than 0';
			}
			var changed = false;
			if ((x !== this.xDimension) || (y !== this.yDimension))
			{
				changed = true;
			}
			this.size.xDimension = x;
			this.size.yDimension = y;
			if (changed) {
				this.cleanCanvas();
			}
			return false;

		};
		//wipes canvas clean of anything
		this.cleanCanvas =function() {
			var canvas  = [];
			var blankArray=[];
			//create a blank row xDimension long
			for (var i = 0; i <this.size.xDimension; i++ ) {
				blankArray[i] = ' ';
			}
			//add yDimension number of copies 
			for (var j = 0; j < this.size.yDimension; j++) {
				canvas[j] = (blankArray.slice(0));
			}
			this._unRenderedCanvas = canvas;
			return false;
		};
		//completely obliterates canvas.
		this.resetCanvas = function() {	
			this.size.xDimension = 0;
			this.size.yDimension = 0;
			this.cleanCanvas();
		}


		this.displayCanvas = function(displayInBrowser) {
			if (this.size.xDimension ===0 ||
			 	this.size.yDimension ===0) {
				return 'Canvas has Invalid Dimensions';
			}
			var horizontalBar = '   ';
			var xAxis = '   ';
			for (var i = 0; i < this.size.xDimension; i++) {
				horizontalBar += '_';
				xAxis += i.toString();
			}
			horizontalBar += '   ';
			xAxis += '   ';
			
			//Need to define the correct line break character so 
			//that we can display the "canvas" in either
			//the browser or console.
			var lbChar = '\n';

			if (displayInBrowser) {
				lbChar = '<br/>';

			}
			var textToDisplay = xAxis + lbChar;
			if (!displayInBrowser) {
				textToDisplay += horizontalBar + lbChar;
			} 

			for (var j = 0; j <this.size.yDimension; j++) {					
				var line = this._unRenderedCanvas[j];
				var lineText = line.toString().replace(/,/g, '');
				var lineTextFormatted = j+ ' |' + lineText + '|';
				textToDisplay += lineTextFormatted + lbChar;
			}
			if (!displayInBrowser) {
				textToDisplay += horizontalBar;
			}
			if (displayInBrowser) {
				textToDisplay = textToDisplay.split(' ').join('_');
				var browserCanvas = document.getElementById('canvas');
				browserCanvas.innerHTML =  textToDisplay;
			}
			else {
				console.log(textToDisplay);
			}
			return false;
		};

		this.drawLine =  function(x1, y1, x2, y2, supressDisplayCanvasInConsole) {
			if ((x1 !== x2 ) && (y1 !== y2)) { 
				return 'Diagonal Lines are not supported';
			}
			else if ((x1 > x2) || (y1 > y2)) {
				return 'X1 and Y1 cannot be greater than X2 or Y2';
			}
			else if ((x1 >= this.size.xDimension) || 
				(x2 >= this.size.xDimension) ||
				(x1 < 0)					 ||
				(x2 < 0)					 ||
				(y1 >= this.size.xDimension) || 
				(y2 >= this.size.xDimension) ||
				(y1 < 0)					 ||
				(y2 < 0))  {
				return 'Line Dimensions are out of bounds ' + 
							this.size.xDimension + ' by ' +
							this.size.yDimension;

			}
			//done with bound checking 
			if (y1 === y2) {
				var line = this._unRenderedCanvas[y1];
				for (var xIndex = x1; xIndex < x2+1; xIndex++) {
					line[xIndex] = 'x';
				}
			}
			else { 
				// x1 === x2 in this case 
				//we need to do this line by line... 
				for (var yIndex = y1; yIndex < y2+1; yIndex ++) {
					this._unRenderedCanvas[yIndex][x1] = 'x';
				}
			}
			if (!supressDisplayCanvasInConsole) {
				this.displayCanvas();
			}
			return false;
		};

		this.drawReq = function(x1, y1, x2, y2, supressDisplayCanvasInConsole) {
			if ((x1 > x2) || (y1 > y2)) {
				return 'X1 and Y1 cannot be greater than X2 or Y2';
			}
			else if ((x1 >= this.size.xDimension) || 
				(x2 >= this.size.xDimension) ||
				(x1 < 0)					 ||
				(x2 < 0)					 ||
				(y1 >= this.size.xDimension) || 
				(y2 >= this.size.xDimension) ||
				(y1 < 0)					 ||
				(y2 < 0))  {
				return 'Rectangle\'s Points are out of bounds';
			}
			//reuse line drawing utility 
			this.drawLine(x1, y1, x2, y1, true);
			this.drawLine(x1, y2, x2, y2, true);
			this.drawLine(x1, y1, x1, y2, true);
			this.drawLine(x2, y1, x2, y2, true);
			if (!supressDisplayCanvasInConsole) {
				this.displayCanvas();
			}
			return false;
		};

		this.bucketFillArea =  function(x,y, color, supressDisplayCanvasInConsole) { 
			if (color ==='x') {
				return 'Cannot use \'x\' as a fill color ';
			}
			if (this._unRenderedCanvas[y][x] === 'x') {
				return 'Cannot bucket fill. Location contains an x';
			}
			this._notTraversed = [[x,y]];
			this._traversed = {};
			while ((this._notTraversed.length !== 0))  {
				var currNode = this._notTraversed.pop();
				this._walkInEachDirection(currNode[0], 
										  currNode[1],
										  color);
			}
			if (!supressDisplayCanvasInConsole) {
				this.displayCanvas();
			}
			return false;

		};

		this._walkInEachDirection= function(x, y, color) {
			//mark currecnt spot 
			this._currentSquare = '';
			//walk left till you hit a wall
			var currentSquareIsX = false;
			for (var iLeft = x; iLeft >= 0; iLeft--) {
				currentSquareIsX = this._handleVisit(iLeft, y, color)	;	
				if (currentSquareIsX) {
					break;
				}
			}

			//walk right
			for (var iRight = x+1; iRight < this.size.xDimension; iRight++) {
				currentSquareIsX = this._handleVisit(iRight, y, color)	;	
				if (currentSquareIsX) {
					break;
				}
			}
			//walk up
			for (var iUp = y; iUp >= 0; iUp--) {
				currentSquareIsX = this._handleVisit(x, iUp, color)	;	
				if (currentSquareIsX) {
					break;
				}
			}
			//walk down
			for (var iDown = y+1; iDown < this.size.yDimension; iDown++) {
				currentSquareIsX = this._handleVisit(x, iDown, color)	;	
				if (currentSquareIsX) {
					break;
				}
			}

		};

		this._handleVisit= function(currX, currY, color) {
			this._currentSquare = this._unRenderedCanvas[currY][currX];
			if (this._currentSquare === 'x') {
				this._markSpot(currX, currY);		
				return true;
			}
			else if (!this._haveVisted(currX, currY) ){				
				this._markSpot(currX, currY);
				this._unRenderedCanvas[currY][currX] = color;					
				this._notTraversed.push([currX, currY]);
				return false;
			}
			else {	
				return false;
			}
		};

		this._markSpot= function(x,y) {

			var key = 	x + ',' + y;
			this._traversed[key] = true;
		};

		this._haveVisted= function(x, y) {
			var key = 	x + ',' + y;
			return this._traversed[key] === true;

		};

		this.getCanvasArray= function() {
			return this._unRenderedCanvas;
		};	

	};

	return Canvas;
});
