var rowSize = 20,
	colSize = 20,
	rowsCount,
	colsCount;

var colorIncrement;
var divId = 'thematrix', 
	mainDiv;

var arRows = [];

var container;

/*********************************************
 * 
 *         STRUCTURE
 * 
 ********************************************/
function cell(row, cell, num, char, clr) {
	this.row = row;
	this.col = cell;
	this.char = char;
	this.elem = $('<div />')
					.attr('id', 'cell-' + num + '-' + row)
					.attr('data-num', cell)
					.attr('data-color', clr)
					.attr('class', 'cell-' + num)
					.width(rowSize).height(colSize)
					.html(char);
}
function row(row, sp, sc) {
	this.row = row;
	this.symPadding = sp;
	this.symCount = sc;
	this.elem = $('<div />')
					.attr('id', 'row-' + row)
					.attr('class', 'row')
					.width(rowSize).height($(window).innerHeight());
}

/*********************************************
 * 
 *         MANIPULATION
 * 
 ********************************************/
function getJapanSym()
{	
	return '&#x' + HexConverter.dec2hex(rand(HexConverter.hex2dec('0x3040'), HexConverter.hex2dec('0x30FF'))) + ';';
}

function setSize() {
	rowsCount = Math.floor($(window).innerWidth()/rowSize);
	colsCount = Math.floor($(window).innerHeight()/colSize);	
}

function makeFrame() {
	mainDiv.html('');
	for(var i = 0; i<rowsCount; i++) {		
		arRows['row-'+i] = new row(i);		
		
		var symPadding = rand(0, colsCount); // Row padding from the top in cells
		var symCount = colsCount - symPadding; // Symbols count in a rowl
		
		arRows['row-'+i].elem.data('sympadding', symPadding).attr('data-sympadding', symPadding);
		arRows['row-'+i].elem.data('symcount', symCount).attr('data-symcount', symCount);
		
		mainDiv.append(arRows['row-'+i].elem);		
		
		var printCol = 16; // Color of the symbol
		var colorIncrement = Math.floor(254 / symCount); // Increment of color intensity in a row
		var k = 0;
		for(var j = 0; j<colsCount; j++) {
			if(j < symPadding) {
				var e = new cell(i, 0, j, '', '00');
				arRows['row-'+i].elem.append(e.elem);
			} else {				
				var e = new cell(i, k, j, getJapanSym(), printCol);
				k++;
				arRows['row-'+i].elem.append(e.elem);
				e.elem.css('color', '#00'+HexConverter.dec2hex(printCol)+'00');
				//printCol += colorIncrement;
			}	
			printCol += colorIncrement;	
		}
	}
}

function mFrm(j) {
	if(j == 0) {
		$('.row').each(function(ind){
			var sp = rand(0, colsCount);
			var sc = colsCount - sp;
			$(this).data('sympadding', sp).attr('data-sympadding', sp);
			$(this).data('symcount', sc).attr('data-symcount', sc);
		});		
	}	
	setTimeout(function() {
		$('.cell-' + j).each(function(ind){
			var row = $(this).parent();			
			if(
					j < row.data('sympadding') ||
					parseInt($(this).data('num')) >= (parseInt(row.data('symcount'))-1)
			) {
				$(this).html('');
				$(this).css('color','#000000');
				$(this).data('color', '00').attr('data-color', '00');
				$(this).data('num', 0).attr('num', 0);
			} else {
				$(this).html(getJapanSym());
				var prev = $(this).prev();
				var num = parseInt(prev.data('num')) + 1;
				var prevcolor = parseInt(prev.data('color'));				
				var color = prevcolor > 0 ? (prevcolor + Math.floor(254 / parseInt(row.data('symcount')))) : 16;
				$(this).css('color','#00'+HexConverter.dec2hex(color)+'00');
				$(this).data('color', color).attr('data-color', color);
				$(this).data('num', num).attr('num', num);
			}		
		});
		mFrm(j<colsCount ? (j+1) : 0);
	}, 30);
}


/*********************************************
 * 
 *         ONLOAD
 * 
 ********************************************/
$(document).ready(function(){
	mainDiv = $('#'+divId);
	setSize();
	makeFrame();
	mFrm(0);
});