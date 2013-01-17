/**
 * @author Charlie Calvert
 */

var MyObject = (function() {
	'use strict';
	
	// constructor
	function MyObject() {
		
	}
	
	// Clear the list
	MyObject.prototype.clear = function() {
		$("#myList").empty();
	}
	
	// Add items to the list.
	MyObject.prototype.addItems = function() {
		for (var i = 0; i < 10; i++) {
			$("#myList").append("<li>New Item0" + i +"</li>");
		}
	}
	
	return MyObject;
})();

$(document).ready(function() {
	var myObject = new MyObject();
	$("#buttonClear").click(myObject.clear);
	$("#buttonAdd").click(myObject.addItems);
});
