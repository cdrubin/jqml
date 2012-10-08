/* jqml - jQuery-free JsonML Utility
 * Author: Trevor Norris
 * This document is licensed as free software under the terms of the
 * MIT License: http://www.opensource.org/licenses/mit-license.php */
(function(document, global) {

var toString = Object.prototype.toString,

	// set element attributes
	// check for IE specific functionality and set function accordingly
	setEleAttr = document.documentElement.style.setAttribute ? function(args, iTem) {
		var aKey;
		// loop through and apply attributes
		for (aKey in args) {
			// check if aKey is 'style' attribute
			if (aKey != 'style') {
				iTem.setAttribute(aKey, args[aKey]);
			} else {
				// technique from http://www.kadimi.com/en/setattribute-getattribute-315
				iTem.style.setAttribute('cssText', args[aKey]);
			}
		}
		return iTem;
	} : function(args, iTem) {
		var aKey;
		// loop through and apply attributes
		for (aKey in args) {
				iTem.setAttribute(aKey, args[aKey]);
		}
		return iTem;
	};

// Check if string or number
function isStringy(arg) {
	var tmp = typeof arg;
	return tmp === 'string' || tmp === 'number';
}

// Check if array
function isArray(arg) {
	return toString.call(arg) === '[object Array]';
}

// main function
function jqml(elems) {
	// create/set element
	var node = elems[ 0 ].nodeType ? elems[0] : document.createElement(elems[0]),
		i = 1;
	// loop though passed arguments
	for (; i < elems.length; i++) {
		// check if string or number
		isStringy(elems[i])
			? node.appendChild(document.createTextNode(elems[i]))
		// check if argument is array
		: isArray(elems[i])
			? node.appendChild(jqml(elems[i]))
		// check if DOM element
		: elems[i].nodeType
			? node.appendChild(elems[i])
		// set element attributes
		: setEleAttr(elems[i], node);
	}
	return node;
};

// expose jqml
global.jqml = jqml;

}(document, this));
