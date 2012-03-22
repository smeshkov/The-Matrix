function rand( min, max ) { // Generate a random integer
    //
    // +   original by: Leslie Hoare
 
    if( max ) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    } else {
        return Math.floor(Math.random() * (min + 1));
    }
}


var HexConverter = {
	hexDigits : '0123456789ABCDEF',

	dec2hex : function( dec )
	{
		//return( this.hexDigits[ dec >> 4 ] + this.hexDigits[ dec & 15 ] );
		return dec.toString(16);
	},

	hex2dec : function( hex )
	{
		return( parseInt( hex, 16 ) )
	}
}

/*function htmlentities(s){   // Convert all applicable characters to HTML entities
    //
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
 
    var div = document.createElement('div');
    var text = document.createTextNode(s);
    div.appendChild(text);
    return div.innerHTML;
}*/
