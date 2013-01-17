/**
 * @author Charlie Calvert
 */

var MyObject = (function() {
	'use strict';
	
	function MyObject() {
		
	}
	
	MyObject.prototype.clear = function() {
		$("#myList").empty();
	}
	
	MyObject.prototype.addItems = function() {
		$("#myList").append("<li>New Item01</li>");
		$("#myList").append("<li>New Item02</li>");
		$("#myList").append("<li>New Item03</li>");
		$("#myList").append("<li>New Item04</li>");
	}
	
	return MyObject;
})();

$(document).ready(function() {
	var myObject = new MyObject();
	$("#buttonClear").click(myObject.clear);
	$("#buttonAdd").click(myObject.addItems);
});
