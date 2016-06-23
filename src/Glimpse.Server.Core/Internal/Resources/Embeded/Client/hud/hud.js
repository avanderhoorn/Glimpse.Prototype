/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// DEV TIME CODE
	if (false) {
	    require('fake');
	}
	// DEV TIME CODE
	
	__webpack_require__(/*! ./index.scss */ 1);
	
	var $ = __webpack_require__(/*! $jquery */ 5);
	var util = __webpack_require__(/*! lib/util */ 48);
	var state = __webpack_require__(/*! ./state */ 49);
	var repository = __webpack_require__(/*! ./repository */ 50);
	var sections = __webpack_require__(/*! ./sections/section */ 52);
	
	//var details = args.newData.hud;
	var setup = state.current();
	
	// get into dom asap to trigger asset loading
	$(function() {
		var url = util.resolveClientUrl(util.currentRequestId(), true);
		var html = '<div class="glimpse"><a class="glimpse-icon" target="_blank" href="' + url + '"><div class="glimpse-icon-text">Glimpse</div></a><div class="glimpse-hud"></div></div>'
		$(html).appendTo('body');
	});
	
	// only load things when we have the data ready to go
	repository.getData(function(details) { 
		$(function() { setTimeout(function() { 
			// generate the html needed for the sections
			var html = sections.render(details, setup);
			
			// insert the html into the dom
			var holder = $(html).appendTo('.glimpse-hud');
			
			// force the correct state from previous load
			state.setup(holder);
			
			// setup events that we need to listen to
			sections.postRender(holder, details);
		}, 0); });
	});

/***/ },
/* 1 */
/*!************************!*\
  !*** ./src/index.scss ***!
  \************************/
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(/*! !./../~/css-loader!./../~/autoprefixer-loader?browsers=last 2 version!./../../../~/sass-loader?includePaths[]=/Users/avanderhoorn/Projects/Glimpse.Client.Prototype/_temp/hud/~/bootstrap-sass/assets/stylesheets!./index.scss */ 2);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(/*! ./../~/style-loader/addStyles.js */ 4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./../node_modules/autoprefixer-loader/index.js?browsers=last 2 version!./../../../node_modules/sass-loader/index.js?includePaths[]=/Users/avanderhoorn/Projects/Glimpse.Client.Prototype/_temp/hud/node_modules/bootstrap-sass/assets/stylesheets!./index.scss", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./../node_modules/autoprefixer-loader/index.js?browsers=last 2 version!./../../../node_modules/sass-loader/index.js?includePaths[]=/Users/avanderhoorn/Projects/Glimpse.Client.Prototype/_temp/hud/node_modules/bootstrap-sass/assets/stylesheets!./index.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 2 */
/*!******************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./~/css-loader!./~/autoprefixer-loader?browsers=last 2 version!/Users/avanderhoorn/Projects/Glimpse.Client.Prototype/~/sass-loader?includePaths[]=/Users/avanderhoorn/Projects/Glimpse.Client.Prototype/_temp/hud/~/bootstrap-sass/assets/stylesheets!./src/index.scss ***!
  \******************************************************************************************************************************************************************************************************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ./../~/css-loader/lib/css-base.js */ 3)();
	// imports
	
	
	// module
	exports.push([module.id, "@font-face {\n  font-family: 'Selawik';\n  src: url('/glimpse/hud/assets/selawk.woff2') format('woff2'), url('/glimpse/hud/assets/selawk.woff') format('woff'); }\n\n@font-face {\n  font-family: 'Selawik Light';\n  src: url('/glimpse/hud/assets/selawkl.woff2') format('woff2'), url('/glimpse/hud/assets/selawkl.woff') format('woff'); }\n\n.glimpse, .glimpse *, .glimpse a, .glimpse td, .glimpse th, .glimpse table {\n  font-family: 'Segoe UI', 'Selawik', Tahoma, Geneva, Verdana, sans-serif;\n  background-color: transparent;\n  border: 0px;\n  text-align: left;\n  padding: 0;\n  margin: 0;\n  box-sizing: content-box;\n  direction: ltr; }\n\n.glimpse {\n  right: 0;\n  bottom: 0;\n  float: right;\n  position: fixed;\n  min-width: 0px;\n  -webkit-transform: translatez(0);\n          transform: translatez(0);\n  z-index: 100000;\n  height: 36px; }\n\n.glimpse td, .glimpse span, .glimpse div, .glimpse th {\n  color: #fff;\n  font-size: 13px;\n  line-height: 13px; }\n\n.glimpse table {\n  min-width: 0;\n  border-collapse: collapse;\n  border-spacing: 0;\n  width: 100%; }\n\n.glimpse .glimpse-icon {\n  background-color: #3c454f;\n  margin: 0;\n  padding: 0 8px;\n  float: right;\n  width: 39px;\n  background-image: url(/glimpse/hud/assets/glimpse-logo.png);\n  background-repeat: no-repeat;\n  background-size: 47px 37px;\n  height: 36px; }\n\n.glimpse .glimpse-icon-text {\n  font-size: 5px;\n  color: #3c454f;\n  -webkit-transform: rotate(270deg);\n          transform: rotate(270deg);\n  margin-left: 45px;\n  margin-top: 25px; }\n\n.glimpse .glimpse-hud {\n  padding: 0 5px 0 0;\n  float: right;\n  background-color: #3c454f; }\n\n.glimpse .glimpse-hud-section {\n  float: left;\n  transition: all 0.3s ease;\n  border-left: 11px solid #71b1d1;\n  position: relative;\n  cursor: default;\n  height: 37px; }\n\n.glimpse .glimpse-hud-title {\n  position: absolute;\n  color: white;\n  text-transform: uppercase;\n  cursor: pointer;\n  font-weight: bold;\n  height: 100%;\n  width: 12px;\n  left: -12px; }\n\n.glimpse .glimpse-hud-title span {\n  position: absolute;\n  line-height: 100%;\n  font-size: 9px;\n  top: 5px;\n  -webkit-transform-origin: 15px 13px;\n          transform-origin: 15px 13px;\n  -webkit-transform: rotate(270deg);\n          transform: rotate(270deg); }\n\n.glimpse .glimpse-hud-section-inner {\n  transition: all 0.3s ease;\n  max-width: 999px;\n  min-width: 0px;\n  margin-top: -1px;\n  overflow: hidden;\n  height: 37px; }\n\n.glimpse .glimpse-hud-section-input {\n  display: none !important;\n  font-size: 12px; }\n\n.glimpse .glimpse-hud-section-input:checked ~ .glimpse-hud-section-inner, .glimpse .glimpse-hud-section-input:checked ~ .glimpse-hud-popup-expander {\n  max-width: 0px;\n  overflow: hidden; }\n\n.glimpse .glimpse-hud-section-input:checked ~ .glimpse-hud-popup {\n  max-height: 0px;\n  overflow: hidden; }\n\n.glimpse .glimpse-hud-detail {\n  display: inline-block;\n  padding: 1px 10px 0; }\n\n.glimpse .glimpse-hud-section-inner .glimpse-hud-detail:first-child {\n  padding-left: 15px; }\n\n.glimpse .glimpse-hud-section-inner .glimpse-hud-detail:last-child {\n  padding-right: 20px; }\n\n.glimpse .glimpse-hud-data {\n  transition: color 0.3s ease; }\n\n.glimpse .glimpse-hud-data-important {\n  font-size: 1.2em;\n  font-weight: bold; }\n\n.glimpse .glimpse-hud-value-update {\n  color: #71b1d1; }\n\n.glimpse .glimpse-hud-detail-align-right .glimpse-hud-header {\n  text-align: right; }\n\n.glimpse .glimpse-hud-detail-extra-large, .glimpse-hud-detail-extra-large span {\n  font-size: 2em;\n  line-height: 100%; }\n\n.glimpse .glimpse-hud-detail-large, .glimpse-hud-detail-large span {\n  font-size: 1.45em;\n  line-height: 100%; }\n\n.glimpse .glimpse-hud-detail-normal, .glimpse-hud-detail-normal span, .glimpse-hud-detail-normal div {\n  font-size: 1.2em;\n  line-height: 100%; }\n\n.glimpse .glimpse-hud-detail-small, .glimpse-hud-detail-small span, .glimpse-hud-detail-small div {\n  font-size: 1.1em; }\n\n.glimpse .glimpse-hud-detail-extra-small, .glimpse-hud-detail-extra-small span, .glimpse-hud-detail-extra-small div {\n  font-size: 1em; }\n\n.glimpse .glimpse-hud-detail-position-left .glimpse-hud-value, .glimpse .glimpse-hud-detail-position-left div, .glimpse .glimpse-hud-detail-position-right div {\n  display: inline-block; }\n\n.glimpse .glimpse-hud-detail-position-left .glimpse-hud-header {\n  margin-right: 5px; }\n\n.glimpse .glimpse-hud-detail-position-right .glimpse-hud-header {\n  margin-left: 5px; }\n\n.glimpse .glimpse-hud-value {\n  font-size: 1em;\n  line-height: 100%;\n  margin-top: -3px; }\n\n@media screen\\0 {\n  .glimpse .glimpse-hud-value {\n    margin-top: -4px; }\n  .glimpse .glimpse-hud-detail-normal .glimpse-hud-header {\n    margin-bottom: 2px; } }\n\n.glimpse .glimpse-hud-header {\n  opacity: 0.6;\n  font-size: 0.7em;\n  line-height: 100%;\n  white-space: nowrap; }\n\n.glimpse .glimpse-hud-detail-extra-large .glimpse-hud-header {\n  font-size: 0.5em; }\n\n.glimpse .glimpse-hud-detail-large .glimpse-hud-header {\n  font-size: 0.6em; }\n\n.glimpse .glimpse-hud-detail-normal.glimpse-hud-detail-position-top .glimpse-hud-header {\n  padding-bottom: 2px; }\n\n.glimpse .glimpse-hud-prefix, .glimpse .glimpse-hud-postfix, .glimpse .glimpse-hud-spacer, .glimpse .glimpse-hud-plain {\n  opacity: 0.4;\n  font-size: 0.9em; }\n\n.glimpse .glimpse-hud-postfix {\n  padding-left: 2px; }\n\n.glimpse .glimpse-hud-prefix {\n  padding-right: 2px; }\n\n.glimpse .glimpse-hud-prefix-super {\n  font-size: 0.4em;\n  font-weight: normal;\n  opacity: 0.4;\n  position: relative;\n  top: -0.5em; }\n\n.glimpse .glimpse-hud-spacer {\n  padding: 0 10px; }\n\n.glimpse .glimpse-hud-quite, .glimpse .glimpse-hud-quite * {\n  opacity: 0.6; }\n\n.glimpse .glimpse-hud-error, .glimpse .glimpse-hud-error * {\n  color: #FF8C80; }\n\n.glimpse .glimpse-data-trivial {\n  display: none; }\n\n.glimpse .glimpse-hud-section-inner:hover ~ .glimpse-hud-popup, .glimpse .glimpse-hud-popup:hover {\n  max-height: 999px;\n  transition: max-height 0.3s ease 0.3s; }\n\n.glimpse .glimpse-hud-popup {\n  background-color: #3c454f;\n  border-left: 11px solid #71b1d1;\n  position: absolute;\n  left: -11px;\n  right: 0;\n  z-index: 1;\n  bottom: 0px;\n  max-height: 0px;\n  transition: max-height 0.3s ease 0.2s; }\n\n.glimpse .glimpse-hud-popup-expander {\n  min-width: 0px;\n  height: 1px;\n  transition: min-width 0.1s ease 0.5s; }\n\n.glimpse .glimpse-hud-section-inner:hover ~ .glimpse-hud-popup-expander, .glimpse .glimpse-hud-popup:hover ~ .glimpse-hud-popup-expander {\n  transition: min-width 0.1s ease 0.2s; }\n\n.glimpse .glimpse-hud-section-http .glimpse-hud-section-inner:hover ~ .glimpse-hud-popup-expander, .glimpse .glimpse-hud-section-http .glimpse-hud-popup:hover ~ .glimpse-hud-popup-expander {\n  min-width: 400px; }\n\n.glimpse .glimpse-hud-section-host .glimpse-hud-section-inner:hover ~ .glimpse-hud-popup-expander, .glimpse .glimpse-hud-section-host .glimpse-hud-popup:hover ~ .glimpse-hud-popup-expander {\n  min-width: 600px; }\n\n.glimpse .glimpse-hud-section-ajax .glimpse-hud-section-inner:hover ~ .glimpse-hud-popup-expander, .glimpse .glimpse-hud-section-ajax .glimpse-hud-popup:hover ~ .glimpse-hud-popup-expander {\n  min-width: 450px; }\n\n.glimpse .glimpse-hud-popup-clear {\n  clear: both; }\n\n.glimpse .glimpse-hud-popup-header {\n  margin-bottom: 5px; }\n\n.glimpse .glimpse-hud-popup .glimpse-hud-detail-extra-large {\n  margin-left: -2px; }\n\n.glimpse .glimpse-hud-popup-inner {\n  padding: 10px 15px; }\n\n.glimpse .glimpse-hud-popup .glimpse-hud-detail {\n  padding: 0; }\n\n.glimpse .glimpse-hud-bar {\n  height: 12px;\n  width: 100%;\n  margin: 5px 0 10px; }\n\n.glimpse .glimpse-hud-bar > div {\n  position: relative; }\n\n.glimpse .glimpse-hud-bar-item {\n  position: absolute;\n  height: 12px;\n  min-width: 1px; }\n\n.glimpse .glimpse-hud-summary {\n  width: auto; }\n\n.glimpse .glimpse-hud-summary-left {\n  float: left; }\n\n.glimpse .glimpse-hud-summary-right {\n  float: right; }\n\n.glimpse .glimpse-hud-summary tr {\n  vertical-align: bottom; }\n\n.glimpse .glimpse-hud-summary-space tr:first-child {\n  height: 65px; }\n\n.glimpse .glimpse-hud-summary tr {\n  height: 27px; }\n\n.glimpse .glimpse-hud-summary tr:last-child {\n  height: 35px; }\n\n.glimpse .glimpse-hud-summary-space tr:last-child {\n  height: 46px; }\n\n.glimpse .glimpse-hud-summary th {\n  font-weight: normal; }\n\n.glimpse .glimpse-hud-summary td .glimpse-hud-detail {\n  float: right; }\n\n.glimpse table.glimpse-hud-listing {\n  max-width: 100%;\n  width: 100%; }\n\n.glimpse .glimpse-hud-popup .glimpse-hud-listing {\n  margin-top: 10px; }\n\n.glimpse .glimpse-hud-listing td {\n  font-size: 1.025em;\n  line-height: 100%;\n  padding-top: 3px; }\n\n.glimpse .glimpse-hud-listing-row {\n  padding: 2px 0; }\n\n.glimpse .glimpse-hud-listing-row > div {\n  display: inline-block; }\n\n.glimpse .glimpse-hud-listing tr:first-child td {\n  padding-top: 1px; }\n\n.glimpse .glimpse-hud-listing td {\n  padding-bottom: 1px; }\n\n.glimpse .glimpse-hud-listing thead th {\n  white-space: nowrap;\n  opacity: 0.6;\n  font-weight: normal;\n  color: white;\n  line-height: 100%;\n  padding-bottom: 5px; }\n\n.glimpse .glimpse-hud-listing-overflow {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis; }\n\n.glimpse td.glimpse-hud-listing-value, .glimpse th.glimpse-hud-listing-value {\n  text-align: right; }\n\n.glimpse td.glimpse-hud-listing-value, .glimpse span.glimpse-hud-listing-value {\n  font-family: Consolas, monospace, serif;\n  opacity: 0.85; }\n\n.glimpse .glimpse-hud .glimpse-data-childless-duration, .glimpse .glimpse-hud .glimpse-data-duration, .glimpse .glimpse-hud .glimpse-data-content-type {\n  width: 90px; }\n\n.glimpse .glimpse-hud .glimpse-data-size {\n  width: 60px; }\n\n.glimpse .glimpse-hud .glimpse-data-content-method {\n  width: 40px; }\n\n.glimpse .glimpse-hud .glimpse-data-content-type, .glimpse .glimpse-hud .glimpse-data-content-time {\n  text-align: right; }\n\n.glimpse .glimpse-hud .glimpse-data-childless-start-point {\n  width: 100px; }\n\n.glimpse .glimpse-hud .glimpse-data-request-parts {\n  margin-top: 15px; }\n\n.glimpse .glimpse-hud .glimpse-data-wire-part {\n  width: 33%; }\n\n.glimpse .glimpse-hud .glimpse-data-server-part {\n  width: 34%;\n  text-align: center; }\n\n.glimpse .glimpse-hud .glimpse-data-client-part {\n  text-align: right;\n  width: 33%; }\n\n.glimpse .glimpse-hud .glimpse-data-ajax-method {\n  width: 30px;\n  text-align: right; }\n\n.glimpse .glimpse-hud .glimpse-data-ajax-uri {\n  max-width: 230px;\n  padding: 0 20px; }\n\n.glimpse .glimpse-hud .glimpse-data-query-summary .glimpse-hud-listing-value {\n  color: #e2875e; }\n\n.glimpse .glimpse-hud .glimpse-hud-section-ajax .glimpse-hud-listing-row {\n  position: relative;\n  top: -20px;\n  opacity: 0;\n  transition: all 0.6s ease; }\n\n.glimpse .glimpse-hud .glimpse-hud-section-ajax .glimpse-hud-listing-row.added {\n  top: 0px;\n  opacity: 1; }\n\n.glimpse .glimpse-hud .glimpse-data-ajax-detail tbody tr:first-child td {\n  padding-top: 10px; }\n\n.glimpse .glimpse-hud-controls {\n  text-align: right;\n  font-size: 1.2em;\n  margin-top: 7px; }\n\n.glimpse .glimpse-hud-controls span {\n  font-weight: bold;\n  color: #71b1d1;\n  cursor: pointer; }\n\n.glimpse .glimpse-data-ajax-detail a {\n  color: inherit; }\n", ""]);
	
	// exports


/***/ },
/* 3 */
/*!**************************************!*\
  !*** ./~/css-loader/lib/css-base.js ***!
  \**************************************/
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 4 */
/*!*************************************!*\
  !*** ./~/style-loader/addStyles.js ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 5 */
/*!***************************************!*\
  !*** ./src/lib/modules/jquery-hud.js ***!
  \***************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var jQuery = __webpack_require__(/*! jquery/src/core.js */ 6);
	__webpack_require__(/*! jquery/src/selector-native.js */ 16);
	__webpack_require__(/*! jquery/src/event.js */ 17);
	__webpack_require__(/*! jquery/src/event/alias.js */ 29);
	__webpack_require__(/*! jquery/src/manipulation.js */ 30);
	__webpack_require__(/*! jquery/src/ajax.js */ 36);
	__webpack_require__(/*! jquery/src/ajax/xhr.js */ 43);
	__webpack_require__(/*! jquery/src/core/parseHTML.js */ 44);
	__webpack_require__(/*! jquery/src/attributes/classes.js */ 45);
	__webpack_require__(/*! jquery/src/attributes/attr.js */ 46);
	
	module.exports = jQuery; 


/***/ },
/* 6 */
/*!******************************!*\
  !*** ./~/jquery/src/core.js ***!
  \******************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
		__webpack_require__(/*! ./var/arr */ 7),
		__webpack_require__(/*! ./var/slice */ 8),
		__webpack_require__(/*! ./var/concat */ 9),
		__webpack_require__(/*! ./var/push */ 10),
		__webpack_require__(/*! ./var/indexOf */ 11),
		__webpack_require__(/*! ./var/class2type */ 12),
		__webpack_require__(/*! ./var/toString */ 13),
		__webpack_require__(/*! ./var/hasOwn */ 14),
		__webpack_require__(/*! ./var/support */ 15)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function( arr, slice, concat, push, indexOf, class2type, toString, hasOwn, support ) {
	
	var
		// Use the correct document accordingly with window argument (sandbox)
		document = window.document,
	
		version = "@VERSION",
	
		// Define a local copy of jQuery
		jQuery = function( selector, context ) {
			// The jQuery object is actually just the init constructor 'enhanced'
			// Need init if jQuery is called (just allow error to be thrown if not included)
			return new jQuery.fn.init( selector, context );
		},
	
		// Support: Android<4.1
		// Make sure we trim BOM and NBSP
		rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
	
		// Matches dashed string for camelizing
		rmsPrefix = /^-ms-/,
		rdashAlpha = /-([\da-z])/gi,
	
		// Used by jQuery.camelCase as callback to replace()
		fcamelCase = function( all, letter ) {
			return letter.toUpperCase();
		};
	
	jQuery.fn = jQuery.prototype = {
		// The current version of jQuery being used
		jquery: version,
	
		constructor: jQuery,
	
		// Start with an empty selector
		selector: "",
	
		// The default length of a jQuery object is 0
		length: 0,
	
		toArray: function() {
			return slice.call( this );
		},
	
		// Get the Nth element in the matched element set OR
		// Get the whole matched element set as a clean array
		get: function( num ) {
			return num != null ?
	
				// Return just the one element from the set
				( num < 0 ? this[ num + this.length ] : this[ num ] ) :
	
				// Return all the elements in a clean array
				slice.call( this );
		},
	
		// Take an array of elements and push it onto the stack
		// (returning the new matched element set)
		pushStack: function( elems ) {
	
			// Build a new jQuery matched element set
			var ret = jQuery.merge( this.constructor(), elems );
	
			// Add the old object onto the stack (as a reference)
			ret.prevObject = this;
			ret.context = this.context;
	
			// Return the newly-formed element set
			return ret;
		},
	
		// Execute a callback for every element in the matched set.
		// (You can seed the arguments with an array of args, but this is
		// only used internally.)
		each: function( callback, args ) {
			return jQuery.each( this, callback, args );
		},
	
		map: function( callback ) {
			return this.pushStack( jQuery.map(this, function( elem, i ) {
				return callback.call( elem, i, elem );
			}));
		},
	
		slice: function() {
			return this.pushStack( slice.apply( this, arguments ) );
		},
	
		first: function() {
			return this.eq( 0 );
		},
	
		last: function() {
			return this.eq( -1 );
		},
	
		eq: function( i ) {
			var len = this.length,
				j = +i + ( i < 0 ? len : 0 );
			return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
		},
	
		end: function() {
			return this.prevObject || this.constructor(null);
		},
	
		// For internal use only.
		// Behaves like an Array's method, not like a jQuery method.
		push: push,
		sort: arr.sort,
		splice: arr.splice
	};
	
	jQuery.extend = jQuery.fn.extend = function() {
		var options, name, src, copy, copyIsArray, clone,
			target = arguments[0] || {},
			i = 1,
			length = arguments.length,
			deep = false;
	
		// Handle a deep copy situation
		if ( typeof target === "boolean" ) {
			deep = target;
	
			// Skip the boolean and the target
			target = arguments[ i ] || {};
			i++;
		}
	
		// Handle case when target is a string or something (possible in deep copy)
		if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
			target = {};
		}
	
		// Extend jQuery itself if only one argument is passed
		if ( i === length ) {
			target = this;
			i--;
		}
	
		for ( ; i < length; i++ ) {
			// Only deal with non-null/undefined values
			if ( (options = arguments[ i ]) != null ) {
				// Extend the base object
				for ( name in options ) {
					src = target[ name ];
					copy = options[ name ];
	
					// Prevent never-ending loop
					if ( target === copy ) {
						continue;
					}
	
					// Recurse if we're merging plain objects or arrays
					if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
						if ( copyIsArray ) {
							copyIsArray = false;
							clone = src && jQuery.isArray(src) ? src : [];
	
						} else {
							clone = src && jQuery.isPlainObject(src) ? src : {};
						}
	
						// Never move original objects, clone them
						target[ name ] = jQuery.extend( deep, clone, copy );
	
					// Don't bring in undefined values
					} else if ( copy !== undefined ) {
						target[ name ] = copy;
					}
				}
			}
		}
	
		// Return the modified object
		return target;
	};
	
	jQuery.extend({
		// Unique for each copy of jQuery on the page
		expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),
	
		// Assume jQuery is ready without the ready module
		isReady: true,
	
		error: function( msg ) {
			throw new Error( msg );
		},
	
		noop: function() {},
	
		isFunction: function( obj ) {
			return jQuery.type(obj) === "function";
		},
	
		isArray: Array.isArray,
	
		isWindow: function( obj ) {
			return obj != null && obj === obj.window;
		},
	
		isNumeric: function( obj ) {
			// parseFloat NaNs numeric-cast false positives (null|true|false|"")
			// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
			// subtraction forces infinities to NaN
			// adding 1 corrects loss of precision from parseFloat (#15100)
			return !jQuery.isArray( obj ) && (obj - parseFloat( obj ) + 1) >= 0;
		},
	
		isPlainObject: function( obj ) {
			// Not plain objects:
			// - Any object or value whose internal [[Class]] property is not "[object Object]"
			// - DOM nodes
			// - window
			if ( jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
				return false;
			}
	
			if ( obj.constructor &&
					!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
				return false;
			}
	
			// If the function hasn't returned already, we're confident that
			// |obj| is a plain object, created by {} or constructed with new Object
			return true;
		},
	
		isEmptyObject: function( obj ) {
			var name;
			for ( name in obj ) {
				return false;
			}
			return true;
		},
	
		type: function( obj ) {
			if ( obj == null ) {
				return obj + "";
			}
			// Support: Android<4.0, iOS<6 (functionish RegExp)
			return typeof obj === "object" || typeof obj === "function" ?
				class2type[ toString.call(obj) ] || "object" :
				typeof obj;
		},
	
		// Evaluates a script in a global context
		globalEval: function( code ) {
			var script,
				indirect = eval;
	
			code = jQuery.trim( code );
	
			if ( code ) {
				// If the code includes a valid, prologue position
				// strict mode pragma, execute code by injecting a
				// script tag into the document.
				if ( code.indexOf("use strict") === 1 ) {
					script = document.createElement("script");
					script.text = code;
					document.head.appendChild( script ).parentNode.removeChild( script );
				} else {
				// Otherwise, avoid the DOM node creation, insertion
				// and removal by using an indirect global eval
					indirect( code );
				}
			}
		},
	
		// Convert dashed to camelCase; used by the css and data modules
		// Support: IE9-11+
		// Microsoft forgot to hump their vendor prefix (#9572)
		camelCase: function( string ) {
			return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
		},
	
		nodeName: function( elem, name ) {
			return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
		},
	
		// args is for internal usage only
		each: function( obj, callback, args ) {
			var value,
				i = 0,
				length = obj.length,
				isArray = isArraylike( obj );
	
			if ( args ) {
				if ( isArray ) {
					for ( ; i < length; i++ ) {
						value = callback.apply( obj[ i ], args );
	
						if ( value === false ) {
							break;
						}
					}
				} else {
					for ( i in obj ) {
						value = callback.apply( obj[ i ], args );
	
						if ( value === false ) {
							break;
						}
					}
				}
	
			// A special, fast, case for the most common use of each
			} else {
				if ( isArray ) {
					for ( ; i < length; i++ ) {
						value = callback.call( obj[ i ], i, obj[ i ] );
	
						if ( value === false ) {
							break;
						}
					}
				} else {
					for ( i in obj ) {
						value = callback.call( obj[ i ], i, obj[ i ] );
	
						if ( value === false ) {
							break;
						}
					}
				}
			}
	
			return obj;
		},
	
		// Support: Android<4.1
		trim: function( text ) {
			return text == null ?
				"" :
				( text + "" ).replace( rtrim, "" );
		},
	
		// results is for internal usage only
		makeArray: function( arr, results ) {
			var ret = results || [];
	
			if ( arr != null ) {
				if ( isArraylike( Object(arr) ) ) {
					jQuery.merge( ret,
						typeof arr === "string" ?
						[ arr ] : arr
					);
				} else {
					push.call( ret, arr );
				}
			}
	
			return ret;
		},
	
		inArray: function( elem, arr, i ) {
			return arr == null ? -1 : indexOf.call( arr, elem, i );
		},
	
		merge: function( first, second ) {
			var len = +second.length,
				j = 0,
				i = first.length;
	
			for ( ; j < len; j++ ) {
				first[ i++ ] = second[ j ];
			}
	
			first.length = i;
	
			return first;
		},
	
		grep: function( elems, callback, invert ) {
			var callbackInverse,
				matches = [],
				i = 0,
				length = elems.length,
				callbackExpect = !invert;
	
			// Go through the array, only saving the items
			// that pass the validator function
			for ( ; i < length; i++ ) {
				callbackInverse = !callback( elems[ i ], i );
				if ( callbackInverse !== callbackExpect ) {
					matches.push( elems[ i ] );
				}
			}
	
			return matches;
		},
	
		// arg is for internal usage only
		map: function( elems, callback, arg ) {
			var value,
				i = 0,
				length = elems.length,
				isArray = isArraylike( elems ),
				ret = [];
	
			// Go through the array, translating each of the items to their new values
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback( elems[ i ], i, arg );
	
					if ( value != null ) {
						ret.push( value );
					}
				}
	
			// Go through every key on the object,
			} else {
				for ( i in elems ) {
					value = callback( elems[ i ], i, arg );
	
					if ( value != null ) {
						ret.push( value );
					}
				}
			}
	
			// Flatten any nested arrays
			return concat.apply( [], ret );
		},
	
		// A global GUID counter for objects
		guid: 1,
	
		// Bind a function to a context, optionally partially applying any
		// arguments.
		proxy: function( fn, context ) {
			var tmp, args, proxy;
	
			if ( typeof context === "string" ) {
				tmp = fn[ context ];
				context = fn;
				fn = tmp;
			}
	
			// Quick check to determine if target is callable, in the spec
			// this throws a TypeError, but we will just return undefined.
			if ( !jQuery.isFunction( fn ) ) {
				return undefined;
			}
	
			// Simulated bind
			args = slice.call( arguments, 2 );
			proxy = function() {
				return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
			};
	
			// Set the guid of unique handler to the same of original handler, so it can be removed
			proxy.guid = fn.guid = fn.guid || jQuery.guid++;
	
			return proxy;
		},
	
		now: Date.now,
	
		// jQuery.support is not used in Core but other projects attach their
		// properties to it so it needs to exist.
		support: support
	});
	
	// Populate the class2type map
	jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
		class2type[ "[object " + name + "]" ] = name.toLowerCase();
	});
	
	function isArraylike( obj ) {
	
		// Support: iOS 8.2 (not reproducible in simulator)
		// `in` check used to prevent JIT error (gh-2145)
		// hasOwn isn't used here due to false negatives
		// regarding Nodelist length in IE
		var length = "length" in obj && obj.length,
			type = jQuery.type( obj );
	
		if ( type === "function" || jQuery.isWindow( obj ) ) {
			return false;
		}
	
		if ( obj.nodeType === 1 && length ) {
			return true;
		}
	
		return type === "array" || length === 0 ||
			typeof length === "number" && length > 0 && ( length - 1 ) in obj;
	}
	
	return jQuery;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 7 */
/*!*********************************!*\
  !*** ./~/jquery/src/var/arr.js ***!
  \*********************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
		return [];
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 8 */
/*!***********************************!*\
  !*** ./~/jquery/src/var/slice.js ***!
  \***********************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
		__webpack_require__(/*! ./arr */ 7)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function( arr ) {
		return arr.slice;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 9 */
/*!************************************!*\
  !*** ./~/jquery/src/var/concat.js ***!
  \************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
		__webpack_require__(/*! ./arr */ 7)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function( arr ) {
		return arr.concat;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 10 */
/*!**********************************!*\
  !*** ./~/jquery/src/var/push.js ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
		__webpack_require__(/*! ./arr */ 7)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function( arr ) {
		return arr.push;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 11 */
/*!*************************************!*\
  !*** ./~/jquery/src/var/indexOf.js ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
		__webpack_require__(/*! ./arr */ 7)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function( arr ) {
		return arr.indexOf;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 12 */
/*!****************************************!*\
  !*** ./~/jquery/src/var/class2type.js ***!
  \****************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
		// [[Class]] -> type pairs
		return {};
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 13 */
/*!**************************************!*\
  !*** ./~/jquery/src/var/toString.js ***!
  \**************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
		__webpack_require__(/*! ./class2type */ 12)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function( class2type ) {
		return class2type.toString;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 14 */
/*!************************************!*\
  !*** ./~/jquery/src/var/hasOwn.js ***!
  \************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
		__webpack_require__(/*! ./class2type */ 12)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function( class2type ) {
		return class2type.hasOwnProperty;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 15 */
/*!*************************************!*\
  !*** ./~/jquery/src/var/support.js ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
		// All support tests are defined in their respective modules.
		return {};
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 16 */
/*!*****************************************!*\
  !*** ./~/jquery/src/selector-native.js ***!
  \*****************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
		__webpack_require__(/*! ./core */ 6)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function( jQuery ) {
	
	/*
	 * Optional (non-Sizzle) selector module for custom builds.
	 *
	 * Note that this DOES NOT SUPPORT many documented jQuery
	 * features in exchange for its smaller size:
	 *
	 * Attribute not equal selector
	 * Positional selectors (:first; :eq(n); :odd; etc.)
	 * Type selectors (:input; :checkbox; :button; etc.)
	 * State-based selectors (:animated; :visible; :hidden; etc.)
	 * :has(selector)
	 * :not(complex selector)
	 * custom selectors via Sizzle extensions
	 * Leading combinators (e.g., $collection.find("> *"))
	 * Reliable functionality on XML fragments
	 * Requiring all parts of a selector to match elements under context
	 *   (e.g., $div.find("div > *") now matches children of $div)
	 * Matching against non-elements
	 * Reliable sorting of disconnected nodes
	 * querySelectorAll bug fixes (e.g., unreliable :focus on WebKit)
	 *
	 * If any of these are unacceptable tradeoffs, either use Sizzle or
	 * customize this stub for the project's specific needs.
	 */
	
	var docElem = window.document.documentElement,
		selector_hasDuplicate,
		matches = docElem.matches ||
			docElem.webkitMatchesSelector ||
			docElem.mozMatchesSelector ||
			docElem.oMatchesSelector ||
			docElem.msMatchesSelector,
		selector_sortOrder = function( a, b ) {
			// Flag for duplicate removal
			if ( a === b ) {
				selector_hasDuplicate = true;
				return 0;
			}
	
			var compare = b.compareDocumentPosition && a.compareDocumentPosition && a.compareDocumentPosition( b );
	
			if ( compare ) {
				// Disconnected nodes
				if ( compare & 1 ) {
	
					// Choose the first element that is related to our document
					if ( a === document || jQuery.contains(document, a) ) {
						return -1;
					}
					if ( b === document || jQuery.contains(document, b) ) {
						return 1;
					}
	
					// Maintain original order
					return 0;
				}
	
				return compare & 4 ? -1 : 1;
			}
	
			// Not directly comparable, sort on existence of method
			return a.compareDocumentPosition ? -1 : 1;
		};
	
	jQuery.extend({
		find: function( selector, context, results, seed ) {
			var elem, nodeType,
				i = 0;
	
			results = results || [];
			context = context || document;
	
			// Same basic safeguard as Sizzle
			if ( !selector || typeof selector !== "string" ) {
				return results;
			}
	
			// Early return if context is not an element or document
			if ( (nodeType = context.nodeType) !== 1 && nodeType !== 9 ) {
				return [];
			}
	
			if ( seed ) {
				while ( (elem = seed[i++]) ) {
					if ( jQuery.find.matchesSelector(elem, selector) ) {
						results.push( elem );
					}
				}
			} else {
				jQuery.merge( results, context.querySelectorAll(selector) );
			}
	
			return results;
		},
		unique: function( results ) {
			var elem,
				duplicates = [],
				i = 0,
				j = 0;
	
			selector_hasDuplicate = false;
			results.sort( selector_sortOrder );
	
			if ( selector_hasDuplicate ) {
				while ( (elem = results[i++]) ) {
					if ( elem === results[ i ] ) {
						j = duplicates.push( i );
					}
				}
				while ( j-- ) {
					results.splice( duplicates[ j ], 1 );
				}
			}
	
			return results;
		},
		text: function( elem ) {
			var node,
				ret = "",
				i = 0,
				nodeType = elem.nodeType;
	
			if ( !nodeType ) {
				// If no nodeType, this is expected to be an array
				while ( (node = elem[i++]) ) {
					// Do not traverse comment nodes
					ret += jQuery.text( node );
				}
			} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
				// Use textContent for elements
				return elem.textContent;
			} else if ( nodeType === 3 || nodeType === 4 ) {
				return elem.nodeValue;
			}
			// Do not include comment or processing instruction nodes
	
			return ret;
		},
		contains: function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && adown.contains(bup) );
		},
		isXMLDoc: function( elem ) {
			return (elem.ownerDocument || elem).documentElement.nodeName !== "HTML";
		},
		expr: {
			attrHandle: {},
			match: {
				bool: /^(?:checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped)$/i,
				needsContext: /^[\x20\t\r\n\f]*[>+~]/
			}
		}
	});
	
	jQuery.extend( jQuery.find, {
		matches: function( expr, elements ) {
			return jQuery.find( expr, null, null, elements );
		},
		matchesSelector: function( elem, expr ) {
			return matches.call( elem, expr );
		},
		attr: function( elem, name ) {
			return elem.getAttribute( name );
		}
	});
	
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 17 */
/*!*******************************!*\
  !*** ./~/jquery/src/event.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
		__webpack_require__(/*! ./core */ 6),
		__webpack_require__(/*! ./var/strundefined */ 20),
		__webpack_require__(/*! ./var/rnotwhite */ 19),
		__webpack_require__(/*! ./var/hasOwn */ 14),
		__webpack_require__(/*! ./var/slice */ 8),
		__webpack_require__(/*! ./event/support */ 18),
		__webpack_require__(/*! ./data/var/data_priv */ 21),
	
		__webpack_require__(/*! ./core/init */ 24),
		__webpack_require__(/*! ./data/accepts */ 23),
		__webpack_require__(/*! ./selector */ 28)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function( jQuery, strundefined, rnotwhite, hasOwn, slice, support, data_priv ) {
	
	var
		rkeyEvent = /^key/,
		rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
		rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
		rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;
	
	function returnTrue() {
		return true;
	}
	
	function returnFalse() {
		return false;
	}
	
	function safeActiveElement() {
		try {
			return document.activeElement;
		} catch ( err ) { }
	}
	
	/*
	 * Helper functions for managing events -- not part of the public interface.
	 * Props to Dean Edwards' addEvent library for many of the ideas.
	 */
	jQuery.event = {
	
		global: {},
	
		add: function( elem, types, handler, data, selector ) {
	
			var handleObjIn, eventHandle, tmp,
				events, t, handleObj,
				special, handlers, type, namespaces, origType,
				elemData = data_priv.get( elem );
	
			// Don't attach events to noData or text/comment nodes (but allow plain objects)
			if ( !elemData ) {
				return;
			}
	
			// Caller can pass in an object of custom data in lieu of the handler
			if ( handler.handler ) {
				handleObjIn = handler;
				handler = handleObjIn.handler;
				selector = handleObjIn.selector;
			}
	
			// Make sure that the handler has a unique ID, used to find/remove it later
			if ( !handler.guid ) {
				handler.guid = jQuery.guid++;
			}
	
			// Init the element's event structure and main handler, if this is the first
			if ( !(events = elemData.events) ) {
				events = elemData.events = {};
			}
			if ( !(eventHandle = elemData.handle) ) {
				eventHandle = elemData.handle = function( e ) {
					// Discard the second event of a jQuery.event.trigger() and
					// when an event is called after a page has unloaded
					return typeof jQuery !== strundefined && jQuery.event.triggered !== e.type ?
						jQuery.event.dispatch.apply( elem, arguments ) : undefined;
				};
			}
	
			// Handle multiple events separated by a space
			types = ( types || "" ).match( rnotwhite ) || [ "" ];
			t = types.length;
			while ( t-- ) {
				tmp = rtypenamespace.exec( types[t] ) || [];
				type = origType = tmp[1];
				namespaces = ( tmp[2] || "" ).split( "." ).sort();
	
				// There *must* be a type, no attaching namespace-only handlers
				if ( !type ) {
					continue;
				}
	
				// If event changes its type, use the special event handlers for the changed type
				special = jQuery.event.special[ type ] || {};
	
				// If selector defined, determine special event api type, otherwise given type
				type = ( selector ? special.delegateType : special.bindType ) || type;
	
				// Update special based on newly reset type
				special = jQuery.event.special[ type ] || {};
	
				// handleObj is passed to all event handlers
				handleObj = jQuery.extend({
					type: type,
					origType: origType,
					data: data,
					handler: handler,
					guid: handler.guid,
					selector: selector,
					needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
					namespace: namespaces.join(".")
				}, handleObjIn );
	
				// Init the event handler queue if we're the first
				if ( !(handlers = events[ type ]) ) {
					handlers = events[ type ] = [];
					handlers.delegateCount = 0;
	
					// Only use addEventListener if the special events handler returns false
					if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
						if ( elem.addEventListener ) {
							elem.addEventListener( type, eventHandle, false );
						}
					}
				}
	
				if ( special.add ) {
					special.add.call( elem, handleObj );
	
					if ( !handleObj.handler.guid ) {
						handleObj.handler.guid = handler.guid;
					}
				}
	
				// Add to the element's handler list, delegates in front
				if ( selector ) {
					handlers.splice( handlers.delegateCount++, 0, handleObj );
				} else {
					handlers.push( handleObj );
				}
	
				// Keep track of which events have ever been used, for event optimization
				jQuery.event.global[ type ] = true;
			}
	
		},
	
		// Detach an event or set of events from an element
		remove: function( elem, types, handler, selector, mappedTypes ) {
	
			var j, origCount, tmp,
				events, t, handleObj,
				special, handlers, type, namespaces, origType,
				elemData = data_priv.hasData( elem ) && data_priv.get( elem );
	
			if ( !elemData || !(events = elemData.events) ) {
				return;
			}
	
			// Once for each type.namespace in types; type may be omitted
			types = ( types || "" ).match( rnotwhite ) || [ "" ];
			t = types.length;
			while ( t-- ) {
				tmp = rtypenamespace.exec( types[t] ) || [];
				type = origType = tmp[1];
				namespaces = ( tmp[2] || "" ).split( "." ).sort();
	
				// Unbind all events (on this namespace, if provided) for the element
				if ( !type ) {
					for ( type in events ) {
						jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
					}
					continue;
				}
	
				special = jQuery.event.special[ type ] || {};
				type = ( selector ? special.delegateType : special.bindType ) || type;
				handlers = events[ type ] || [];
				tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );
	
				// Remove matching events
				origCount = j = handlers.length;
				while ( j-- ) {
					handleObj = handlers[ j ];
	
					if ( ( mappedTypes || origType === handleObj.origType ) &&
						( !handler || handler.guid === handleObj.guid ) &&
						( !tmp || tmp.test( handleObj.namespace ) ) &&
						( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
						handlers.splice( j, 1 );
	
						if ( handleObj.selector ) {
							handlers.delegateCount--;
						}
						if ( special.remove ) {
							special.remove.call( elem, handleObj );
						}
					}
				}
	
				// Remove generic event handler if we removed something and no more handlers exist
				// (avoids potential for endless recursion during removal of special event handlers)
				if ( origCount && !handlers.length ) {
					if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
						jQuery.removeEvent( elem, type, elemData.handle );
					}
	
					delete events[ type ];
				}
			}
	
			// Remove the expando if it's no longer used
			if ( jQuery.isEmptyObject( events ) ) {
				delete elemData.handle;
				data_priv.remove( elem, "events" );
			}
		},
	
		trigger: function( event, data, elem, onlyHandlers ) {
	
			var i, cur, tmp, bubbleType, ontype, handle, special,
				eventPath = [ elem || document ],
				type = hasOwn.call( event, "type" ) ? event.type : event,
				namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];
	
			cur = tmp = elem = elem || document;
	
			// Don't do events on text and comment nodes
			if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
				return;
			}
	
			// focus/blur morphs to focusin/out; ensure we're not firing them right now
			if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
				return;
			}
	
			if ( type.indexOf(".") >= 0 ) {
				// Namespaced trigger; create a regexp to match event type in handle()
				namespaces = type.split(".");
				type = namespaces.shift();
				namespaces.sort();
			}
			ontype = type.indexOf(":") < 0 && "on" + type;
	
			// Caller can pass in a jQuery.Event object, Object, or just an event type string
			event = event[ jQuery.expando ] ?
				event :
				new jQuery.Event( type, typeof event === "object" && event );
	
			// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
			event.isTrigger = onlyHandlers ? 2 : 3;
			event.namespace = namespaces.join(".");
			event.namespace_re = event.namespace ?
				new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
				null;
	
			// Clean up the event in case it is being reused
			event.result = undefined;
			if ( !event.target ) {
				event.target = elem;
			}
	
			// Clone any incoming data and prepend the event, creating the handler arg list
			data = data == null ?
				[ event ] :
				jQuery.makeArray( data, [ event ] );
	
			// Allow special events to draw outside the lines
			special = jQuery.event.special[ type ] || {};
			if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
				return;
			}
	
			// Determine event propagation path in advance, per W3C events spec (#9951)
			// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
			if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {
	
				bubbleType = special.delegateType || type;
				if ( !rfocusMorph.test( bubbleType + type ) ) {
					cur = cur.parentNode;
				}
				for ( ; cur; cur = cur.parentNode ) {
					eventPath.push( cur );
					tmp = cur;
				}
	
				// Only add window if we got to document (e.g., not plain obj or detached DOM)
				if ( tmp === (elem.ownerDocument || document) ) {
					eventPath.push( tmp.defaultView || tmp.parentWindow || window );
				}
			}
	
			// Fire handlers on the event path
			i = 0;
			while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {
	
				event.type = i > 1 ?
					bubbleType :
					special.bindType || type;
	
				// jQuery handler
				handle = ( data_priv.get( cur, "events" ) || {} )[ event.type ] && data_priv.get( cur, "handle" );
				if ( handle ) {
					handle.apply( cur, data );
				}
	
				// Native handler
				handle = ontype && cur[ ontype ];
				if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
					event.result = handle.apply( cur, data );
					if ( event.result === false ) {
						event.preventDefault();
					}
				}
			}
			event.type = type;
	
			// If nobody prevented the default action, do it now
			if ( !onlyHandlers && !event.isDefaultPrevented() ) {
	
				if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
					jQuery.acceptData( elem ) ) {
	
					// Call a native DOM method on the target with the same name name as the event.
					// Don't do default actions on window, that's where global variables be (#6170)
					if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {
	
						// Don't re-trigger an onFOO event when we call its FOO() method
						tmp = elem[ ontype ];
	
						if ( tmp ) {
							elem[ ontype ] = null;
						}
	
						// Prevent re-triggering of the same event, since we already bubbled it above
						jQuery.event.triggered = type;
						elem[ type ]();
						jQuery.event.triggered = undefined;
	
						if ( tmp ) {
							elem[ ontype ] = tmp;
						}
					}
				}
			}
	
			return event.result;
		},
	
		dispatch: function( event ) {
	
			// Make a writable jQuery.Event from the native event object
			event = jQuery.event.fix( event );
	
			var i, j, ret, matched, handleObj,
				handlerQueue = [],
				args = slice.call( arguments ),
				handlers = ( data_priv.get( this, "events" ) || {} )[ event.type ] || [],
				special = jQuery.event.special[ event.type ] || {};
	
			// Use the fix-ed jQuery.Event rather than the (read-only) native event
			args[0] = event;
			event.delegateTarget = this;
	
			// Call the preDispatch hook for the mapped type, and let it bail if desired
			if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
				return;
			}
	
			// Determine handlers
			handlerQueue = jQuery.event.handlers.call( this, event, handlers );
	
			// Run delegates first; they may want to stop propagation beneath us
			i = 0;
			while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
				event.currentTarget = matched.elem;
	
				j = 0;
				while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {
	
					// Triggered event must either 1) have no namespace, or 2) have namespace(s)
					// a subset or equal to those in the bound event (both can have no namespace).
					if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {
	
						event.handleObj = handleObj;
						event.data = handleObj.data;
	
						ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
								.apply( matched.elem, args );
	
						if ( ret !== undefined ) {
							if ( (event.result = ret) === false ) {
								event.preventDefault();
								event.stopPropagation();
							}
						}
					}
				}
			}
	
			// Call the postDispatch hook for the mapped type
			if ( special.postDispatch ) {
				special.postDispatch.call( this, event );
			}
	
			return event.result;
		},
	
		handlers: function( event, handlers ) {
			var i, matches, sel, handleObj,
				handlerQueue = [],
				delegateCount = handlers.delegateCount,
				cur = event.target;
	
			// Find delegate handlers
			// Black-hole SVG <use> instance trees (#13180)
			// Avoid non-left-click bubbling in Firefox (#3861)
			if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {
	
				for ( ; cur !== this; cur = cur.parentNode || this ) {
	
					// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
					if ( cur.disabled !== true || event.type !== "click" ) {
						matches = [];
						for ( i = 0; i < delegateCount; i++ ) {
							handleObj = handlers[ i ];
	
							// Don't conflict with Object.prototype properties (#13203)
							sel = handleObj.selector + " ";
	
							if ( matches[ sel ] === undefined ) {
								matches[ sel ] = handleObj.needsContext ?
									jQuery( sel, this ).index( cur ) >= 0 :
									jQuery.find( sel, this, null, [ cur ] ).length;
							}
							if ( matches[ sel ] ) {
								matches.push( handleObj );
							}
						}
						if ( matches.length ) {
							handlerQueue.push({ elem: cur, handlers: matches });
						}
					}
				}
			}
	
			// Add the remaining (directly-bound) handlers
			if ( delegateCount < handlers.length ) {
				handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
			}
	
			return handlerQueue;
		},
	
		// Includes some event props shared by KeyEvent and MouseEvent
		props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
	
		fixHooks: {},
	
		keyHooks: {
			props: "char charCode key keyCode".split(" "),
			filter: function( event, original ) {
	
				// Add which for key events
				if ( event.which == null ) {
					event.which = original.charCode != null ? original.charCode : original.keyCode;
				}
	
				return event;
			}
		},
	
		mouseHooks: {
			props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
			filter: function( event, original ) {
				var eventDoc, doc, body,
					button = original.button;
	
				// Calculate pageX/Y if missing and clientX/Y available
				if ( event.pageX == null && original.clientX != null ) {
					eventDoc = event.target.ownerDocument || document;
					doc = eventDoc.documentElement;
					body = eventDoc.body;
	
					event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
					event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
				}
	
				// Add which for click: 1 === left; 2 === middle; 3 === right
				// Note: button is not normalized, so don't use it
				if ( !event.which && button !== undefined ) {
					event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
				}
	
				return event;
			}
		},
	
		fix: function( event ) {
			if ( event[ jQuery.expando ] ) {
				return event;
			}
	
			// Create a writable copy of the event object and normalize some properties
			var i, prop, copy,
				type = event.type,
				originalEvent = event,
				fixHook = this.fixHooks[ type ];
	
			if ( !fixHook ) {
				this.fixHooks[ type ] = fixHook =
					rmouseEvent.test( type ) ? this.mouseHooks :
					rkeyEvent.test( type ) ? this.keyHooks :
					{};
			}
			copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;
	
			event = new jQuery.Event( originalEvent );
	
			i = copy.length;
			while ( i-- ) {
				prop = copy[ i ];
				event[ prop ] = originalEvent[ prop ];
			}
	
			// Support: Cordova 2.5 (WebKit) (#13255)
			// All events should have a target; Cordova deviceready doesn't
			if ( !event.target ) {
				event.target = document;
			}
	
			// Support: Safari 6.0+, Chrome<28
			// Target should not be a text node (#504, #13143)
			if ( event.target.nodeType === 3 ) {
				event.target = event.target.parentNode;
			}
	
			return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
		},
	
		special: {
			load: {
				// Prevent triggered image.load events from bubbling to window.load
				noBubble: true
			},
			focus: {
				// Fire native event if possible so blur/focus sequence is correct
				trigger: function() {
					if ( this !== safeActiveElement() && this.focus ) {
						this.focus();
						return false;
					}
				},
				delegateType: "focusin"
			},
			blur: {
				trigger: function() {
					if ( this === safeActiveElement() && this.blur ) {
						this.blur();
						return false;
					}
				},
				delegateType: "focusout"
			},
			click: {
				// For checkbox, fire native event so checked state will be right
				trigger: function() {
					if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {
						this.click();
						return false;
					}
				},
	
				// For cross-browser consistency, don't fire native .click() on links
				_default: function( event ) {
					return jQuery.nodeName( event.target, "a" );
				}
			},
	
			beforeunload: {
				postDispatch: function( event ) {
	
					// Support: Firefox 20+
					// Firefox doesn't alert if the returnValue field is not set.
					if ( event.result !== undefined && event.originalEvent ) {
						event.originalEvent.returnValue = event.result;
					}
				}
			}
		},
	
		simulate: function( type, elem, event, bubble ) {
			// Piggyback on a donor event to simulate a different one.
			// Fake originalEvent to avoid donor's stopPropagation, but if the
			// simulated event prevents default then we do the same on the donor.
			var e = jQuery.extend(
				new jQuery.Event(),
				event,
				{
					type: type,
					isSimulated: true,
					originalEvent: {}
				}
			);
			if ( bubble ) {
				jQuery.event.trigger( e, null, elem );
			} else {
				jQuery.event.dispatch.call( elem, e );
			}
			if ( e.isDefaultPrevented() ) {
				event.preventDefault();
			}
		}
	};
	
	jQuery.removeEvent = function( elem, type, handle ) {
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle, false );
		}
	};
	
	jQuery.Event = function( src, props ) {
		// Allow instantiation without the 'new' keyword
		if ( !(this instanceof jQuery.Event) ) {
			return new jQuery.Event( src, props );
		}
	
		// Event object
		if ( src && src.type ) {
			this.originalEvent = src;
			this.type = src.type;
	
			// Events bubbling up the document may have been marked as prevented
			// by a handler lower down the tree; reflect the correct value.
			this.isDefaultPrevented = src.defaultPrevented ||
					src.defaultPrevented === undefined &&
					// Support: Android<4.0
					src.returnValue === false ?
				returnTrue :
				returnFalse;
	
		// Event type
		} else {
			this.type = src;
		}
	
		// Put explicitly provided properties onto the event object
		if ( props ) {
			jQuery.extend( this, props );
		}
	
		// Create a timestamp if incoming event doesn't have one
		this.timeStamp = src && src.timeStamp || jQuery.now();
	
		// Mark it as fixed
		this[ jQuery.expando ] = true;
	};
	
	// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
	// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
	jQuery.Event.prototype = {
		isDefaultPrevented: returnFalse,
		isPropagationStopped: returnFalse,
		isImmediatePropagationStopped: returnFalse,
	
		preventDefault: function() {
			var e = this.originalEvent;
	
			this.isDefaultPrevented = returnTrue;
	
			if ( e && e.preventDefault ) {
				e.preventDefault();
			}
		},
		stopPropagation: function() {
			var e = this.originalEvent;
	
			this.isPropagationStopped = returnTrue;
	
			if ( e && e.stopPropagation ) {
				e.stopPropagation();
			}
		},
		stopImmediatePropagation: function() {
			var e = this.originalEvent;
	
			this.isImmediatePropagationStopped = returnTrue;
	
			if ( e && e.stopImmediatePropagation ) {
				e.stopImmediatePropagation();
			}
	
			this.stopPropagation();
		}
	};
	
	// Create mouseenter/leave events using mouseover/out and event-time checks
	// Support: Chrome 15+
	jQuery.each({
		mouseenter: "mouseover",
		mouseleave: "mouseout",
		pointerenter: "pointerover",
		pointerleave: "pointerout"
	}, function( orig, fix ) {
		jQuery.event.special[ orig ] = {
			delegateType: fix,
			bindType: fix,
	
			handle: function( event ) {
				var ret,
					target = this,
					related = event.relatedTarget,
					handleObj = event.handleObj;
	
				// For mousenter/leave call the handler if related is outside the target.
				// NB: No relatedTarget if the mouse left/entered the browser window
				if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
					event.type = handleObj.origType;
					ret = handleObj.handler.apply( this, arguments );
					event.type = fix;
				}
				return ret;
			}
		};
	});
	
	// Support: Firefox, Chrome, Safari
	// Create "bubbling" focus and blur events
	if ( !support.focusinBubbles ) {
		jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {
	
			// Attach a single capturing handler on the document while someone wants focusin/focusout
			var handler = function( event ) {
					jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
				};
	
			jQuery.event.special[ fix ] = {
				setup: function() {
					var doc = this.ownerDocument || this,
						attaches = data_priv.access( doc, fix );
	
					if ( !attaches ) {
						doc.addEventListener( orig, handler, true );
					}
					data_priv.access( doc, fix, ( attaches || 0 ) + 1 );
				},
				teardown: function() {
					var doc = this.ownerDocument || this,
						attaches = data_priv.access( doc, fix ) - 1;
	
					if ( !attaches ) {
						doc.removeEventListener( orig, handler, true );
						data_priv.remove( doc, fix );
	
					} else {
						data_priv.access( doc, fix, attaches );
					}
				}
			};
		});
	}
	
	jQuery.fn.extend({
	
		on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
			var origFn, type;
	
			// Types can be a map of types/handlers
			if ( typeof types === "object" ) {
				// ( types-Object, selector, data )
				if ( typeof selector !== "string" ) {
					// ( types-Object, data )
					data = data || selector;
					selector = undefined;
				}
				for ( type in types ) {
					this.on( type, selector, data, types[ type ], one );
				}
				return this;
			}
	
			if ( data == null && fn == null ) {
				// ( types, fn )
				fn = selector;
				data = selector = undefined;
			} else if ( fn == null ) {
				if ( typeof selector === "string" ) {
					// ( types, selector, fn )
					fn = data;
					data = undefined;
				} else {
					// ( types, data, fn )
					fn = data;
					data = selector;
					selector = undefined;
				}
			}
			if ( fn === false ) {
				fn = returnFalse;
			} else if ( !fn ) {
				return this;
			}
	
			if ( one === 1 ) {
				origFn = fn;
				fn = function( event ) {
					// Can use an empty set, since event contains the info
					jQuery().off( event );
					return origFn.apply( this, arguments );
				};
				// Use same guid so caller can remove using origFn
				fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
			}
			return this.each( function() {
				jQuery.event.add( this, types, fn, data, selector );
			});
		},
		one: function( types, selector, data, fn ) {
			return this.on( types, selector, data, fn, 1 );
		},
		off: function( types, selector, fn ) {
			var handleObj, type;
			if ( types && types.preventDefault && types.handleObj ) {
				// ( event )  dispatched jQuery.Event
				handleObj = types.handleObj;
				jQuery( types.delegateTarget ).off(
					handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
					handleObj.selector,
					handleObj.handler
				);
				return this;
			}
			if ( typeof types === "object" ) {
				// ( types-object [, selector] )
				for ( type in types ) {
					this.off( type, selector, types[ type ] );
				}
				return this;
			}
			if ( selector === false || typeof selector === "function" ) {
				// ( types [, fn] )
				fn = selector;
				selector = undefined;
			}
			if ( fn === false ) {
				fn = returnFalse;
			}
			return this.each(function() {
				jQuery.event.remove( this, types, fn, selector );
			});
		},
	
		trigger: function( type, data ) {
			return this.each(function() {
				jQuery.event.trigger( type, data, this );
			});
		},
		triggerHandler: function( type, data ) {
			var elem = this[0];
			if ( elem ) {
				return jQuery.event.trigger( type, data, elem, true );
			}
		}
	});
	
	return jQuery;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 18 */
/*!***************************************!*\
  !*** ./~/jquery/src/event/support.js ***!
  \***************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
		__webpack_require__(/*! ../var/support */ 15)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function( support ) {
	
	support.focusinBubbles = "onfocusin" in window;
	
	return support;
	
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 19 */
/*!***************************************!*\
  !*** ./~/jquery/src/var/rnotwhite.js ***!
  \***************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
		return (/\S+/g);
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 20 */
/*!******************************************!*\
  !*** ./~/jquery/src/var/strundefined.js ***!
  \******************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
		return typeof undefined;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 21 */
/*!********************************************!*\
  !*** ./~/jquery/src/data/var/data_priv.js ***!
  \********************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
		__webpack_require__(/*! ../Data */ 22)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function( Data ) {
		return new Data();
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 22 */
/*!***********************************!*\
  !*** ./~/jquery/src/data/Data.js ***!
  \***********************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
		__webpack_require__(/*! ../core */ 6),
		__webpack_require__(/*! ../var/rnotwhite */ 19),
		__webpack_require__(/*! ./accepts */ 23)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function( jQuery, rnotwhite ) {
	
	function Data() {
		// Support: Android<4,
		// Old WebKit does not have Object.preventExtensions/freeze method,
		// return new empty object instead with no [[set]] accessor
		Object.defineProperty( this.cache = {}, 0, {
			get: function() {
				return {};
			}
		});
	
		this.expando = jQuery.expando + Data.uid++;
	}
	
	Data.uid = 1;
	Data.accepts = jQuery.acceptData;
	
	Data.prototype = {
		key: function( owner ) {
			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return the key for a frozen object.
			if ( !Data.accepts( owner ) ) {
				return 0;
			}
	
			var descriptor = {},
				// Check if the owner object already has a cache key
				unlock = owner[ this.expando ];
	
			// If not, create one
			if ( !unlock ) {
				unlock = Data.uid++;
	
				// Secure it in a non-enumerable, non-writable property
				try {
					descriptor[ this.expando ] = { value: unlock };
					Object.defineProperties( owner, descriptor );
	
				// Support: Android<4
				// Fallback to a less secure definition
				} catch ( e ) {
					descriptor[ this.expando ] = unlock;
					jQuery.extend( owner, descriptor );
				}
			}
	
			// Ensure the cache object
			if ( !this.cache[ unlock ] ) {
				this.cache[ unlock ] = {};
			}
	
			return unlock;
		},
		set: function( owner, data, value ) {
			var prop,
				// There may be an unlock assigned to this node,
				// if there is no entry for this "owner", create one inline
				// and set the unlock as though an owner entry had always existed
				unlock = this.key( owner ),
				cache = this.cache[ unlock ];
	
			// Handle: [ owner, key, value ] args
			if ( typeof data === "string" ) {
				cache[ data ] = value;
	
			// Handle: [ owner, { properties } ] args
			} else {
				// Fresh assignments by object are shallow copied
				if ( jQuery.isEmptyObject( cache ) ) {
					jQuery.extend( this.cache[ unlock ], data );
				// Otherwise, copy the properties one-by-one to the cache object
				} else {
					for ( prop in data ) {
						cache[ prop ] = data[ prop ];
					}
				}
			}
			return cache;
		},
		get: function( owner, key ) {
			// Either a valid cache is found, or will be created.
			// New caches will be created and the unlock returned,
			// allowing direct access to the newly created
			// empty data object. A valid owner object must be provided.
			var cache = this.cache[ this.key( owner ) ];
	
			return key === undefined ?
				cache : cache[ key ];
		},
		access: function( owner, key, value ) {
			var stored;
			// In cases where either:
			//
			//   1. No key was specified
			//   2. A string key was specified, but no value provided
			//
			// Take the "read" path and allow the get method to determine
			// which value to return, respectively either:
			//
			//   1. The entire cache object
			//   2. The data stored at the key
			//
			if ( key === undefined ||
					((key && typeof key === "string") && value === undefined) ) {
	
				stored = this.get( owner, key );
	
				return stored !== undefined ?
					stored : this.get( owner, jQuery.camelCase(key) );
			}
	
			// [*]When the key is not a string, or both a key and value
			// are specified, set or extend (existing objects) with either:
			//
			//   1. An object of properties
			//   2. A key and value
			//
			this.set( owner, key, value );
	
			// Since the "set" path can have two possible entry points
			// return the expected data based on which path was taken[*]
			return value !== undefined ? value : key;
		},
		remove: function( owner, key ) {
			var i, name, camel,
				unlock = this.key( owner ),
				cache = this.cache[ unlock ];
	
			if ( key === undefined ) {
				this.cache[ unlock ] = {};
	
			} else {
				// Support array or space separated string of keys
				if ( jQuery.isArray( key ) ) {
					// If "name" is an array of keys...
					// When data is initially created, via ("key", "val") signature,
					// keys will be converted to camelCase.
					// Since there is no way to tell _how_ a key was added, remove
					// both plain key and camelCase key. #12786
					// This will only penalize the array argument path.
					name = key.concat( key.map( jQuery.camelCase ) );
				} else {
					camel = jQuery.camelCase( key );
					// Try the string as a key before any manipulation
					if ( key in cache ) {
						name = [ key, camel ];
					} else {
						// If a key with the spaces exists, use it.
						// Otherwise, create an array by matching non-whitespace
						name = camel;
						name = name in cache ?
							[ name ] : ( name.match( rnotwhite ) || [] );
					}
				}
	
				i = name.length;
				while ( i-- ) {
					delete cache[ name[ i ] ];
				}
			}
		},
		hasData: function( owner ) {
			return !jQuery.isEmptyObject(
				this.cache[ owner[ this.expando ] ] || {}
			);
		},
		discard: function( owner ) {
			if ( owner[ this.expando ] ) {
				delete this.cache[ owner[ this.expando ] ];
			}
		}
	};
	
	return Data;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 23 */
/*!**************************************!*\
  !*** ./~/jquery/src/data/accepts.js ***!
  \**************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
		__webpack_require__(/*! ../core */ 6)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function( jQuery ) {
	
	/**
	 * Determines whether an object can have data
	 */
	jQuery.acceptData = function( owner ) {
		// Accepts only:
		//  - Node
		//    - Node.ELEMENT_NODE
		//    - Node.DOCUMENT_NODE
		//  - Object
		//    - Any
		/* jshint -W018 */
		return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
	};
	
	return jQuery.acceptData;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 24 */
/*!***********************************!*\
  !*** ./~/jquery/src/core/init.js ***!
  \***********************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// Initialize a jQuery object
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
		__webpack_require__(/*! ../core */ 6),
		__webpack_require__(/*! ./var/rsingleTag */ 25),
		__webpack_require__(/*! ../traversing/findFilter */ 26)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function( jQuery, rsingleTag ) {
	
	// A central reference to the root jQuery(document)
	var rootjQuery,
	
		// A simple way to check for HTML strings
		// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
		// Strict HTML recognition (#11290: must start with <)
		rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
	
		init = jQuery.fn.init = function( selector, context ) {
			var match, elem;
	
			// HANDLE: $(""), $(null), $(undefined), $(false)
			if ( !selector ) {
				return this;
			}
	
			// Handle HTML strings
			if ( typeof selector === "string" ) {
				if ( selector[0] === "<" && selector[ selector.length - 1 ] === ">" && selector.length >= 3 ) {
					// Assume that strings that start and end with <> are HTML and skip the regex check
					match = [ null, selector, null ];
	
				} else {
					match = rquickExpr.exec( selector );
				}
	
				// Match html or make sure no context is specified for #id
				if ( match && (match[1] || !context) ) {
	
					// HANDLE: $(html) -> $(array)
					if ( match[1] ) {
						context = context instanceof jQuery ? context[0] : context;
	
						// Option to run scripts is true for back-compat
						// Intentionally let the error be thrown if parseHTML is not present
						jQuery.merge( this, jQuery.parseHTML(
							match[1],
							context && context.nodeType ? context.ownerDocument || context : document,
							true
						) );
	
						// HANDLE: $(html, props)
						if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
							for ( match in context ) {
								// Properties of context are called as methods if possible
								if ( jQuery.isFunction( this[ match ] ) ) {
									this[ match ]( context[ match ] );
	
								// ...and otherwise set as attributes
								} else {
									this.attr( match, context[ match ] );
								}
							}
						}
	
						return this;
	
					// HANDLE: $(#id)
					} else {
						elem = document.getElementById( match[2] );
	
						// Support: Blackberry 4.6
						// gEBID returns nodes no longer in the document (#6963)
						if ( elem && elem.parentNode ) {
							// Inject the element directly into the jQuery object
							this.length = 1;
							this[0] = elem;
						}
	
						this.context = document;
						this.selector = selector;
						return this;
					}
	
				// HANDLE: $(expr, $(...))
				} else if ( !context || context.jquery ) {
					return ( context || rootjQuery ).find( selector );
	
				// HANDLE: $(expr, context)
				// (which is just equivalent to: $(context).find(expr)
				} else {
					return this.constructor( context ).find( selector );
				}
	
			// HANDLE: $(DOMElement)
			} else if ( selector.nodeType ) {
				this.context = this[0] = selector;
				this.length = 1;
				return this;
	
			// HANDLE: $(function)
			// Shortcut for document ready
			} else if ( jQuery.isFunction( selector ) ) {
				return typeof rootjQuery.ready !== "undefined" ?
					rootjQuery.ready( selector ) :
					// Execute immediately if ready is not present
					selector( jQuery );
			}
	
			if ( selector.selector !== undefined ) {
				this.selector = selector.selector;
				this.context = selector.context;
			}
	
			return jQuery.makeArray( selector, this );
		};
	
	// Give the init function the jQuery prototype for later instantiation
	init.prototype = jQuery.fn;
	
	// Initialize central reference
	rootjQuery = jQuery( document );
	
	return init;
	
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 25 */
/*!*********************************************!*\
  !*** ./~/jquery/src/core/var/rsingleTag.js ***!
  \*********************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
		// Match a standalone tag
		return (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 26 */
/*!***********************************************!*\
  !*** ./~/jquery/src/traversing/findFilter.js ***!
  \***********************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
		__webpack_require__(/*! ../core */ 6),
		__webpack_require__(/*! ../var/indexOf */ 11),
		__webpack_require__(/*! ./var/rneedsContext */ 27),
		__webpack_require__(/*! ../selector */ 28)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function( jQuery, indexOf, rneedsContext ) {
	
	var risSimple = /^.[^:#\[\.,]*$/;
	
	// Implement the identical functionality for filter and not
	function winnow( elements, qualifier, not ) {
		if ( jQuery.isFunction( qualifier ) ) {
			return jQuery.grep( elements, function( elem, i ) {
				/* jshint -W018 */
				return !!qualifier.call( elem, i, elem ) !== not;
			});
	
		}
	
		if ( qualifier.nodeType ) {
			return jQuery.grep( elements, function( elem ) {
				return ( elem === qualifier ) !== not;
			});
	
		}
	
		if ( typeof qualifier === "string" ) {
			if ( risSimple.test( qualifier ) ) {
				return jQuery.filter( qualifier, elements, not );
			}
	
			qualifier = jQuery.filter( qualifier, elements );
		}
	
		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) >= 0 ) !== not;
		});
	}
	
	jQuery.filter = function( expr, elems, not ) {
		var elem = elems[ 0 ];
	
		if ( not ) {
			expr = ":not(" + expr + ")";
		}
	
		return elems.length === 1 && elem.nodeType === 1 ?
			jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
			jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
				return elem.nodeType === 1;
			}));
	};
	
	jQuery.fn.extend({
		find: function( selector ) {
			var i,
				len = this.length,
				ret = [],
				self = this;
	
			if ( typeof selector !== "string" ) {
				return this.pushStack( jQuery( selector ).filter(function() {
					for ( i = 0; i < len; i++ ) {
						if ( jQuery.contains( self[ i ], this ) ) {
							return true;
						}
					}
				}) );
			}
	
			for ( i = 0; i < len; i++ ) {
				jQuery.find( selector, self[ i ], ret );
			}
	
			// Needed because $( selector, context ) becomes $( context ).find( selector )
			ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
			ret.selector = this.selector ? this.selector + " " + selector : selector;
			return ret;
		},
		filter: function( selector ) {
			return this.pushStack( winnow(this, selector || [], false) );
		},
		not: function( selector ) {
			return this.pushStack( winnow(this, selector || [], true) );
		},
		is: function( selector ) {
			return !!winnow(
				this,
	
				// If this is a positional/relative selector, check membership in the returned set
				// so $("p:first").is("p:last") won't return true for a doc with two "p".
				typeof selector === "string" && rneedsContext.test( selector ) ?
					jQuery( selector ) :
					selector || [],
				false
			).length;
		}
	});
	
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 27 */
/*!******************************************************!*\
  !*** ./~/jquery/src/traversing/var/rneedsContext.js ***!
  \******************************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
		__webpack_require__(/*! ../../core */ 6),
		__webpack_require__(/*! ../../selector */ 28)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function( jQuery ) {
		return jQuery.expr.match.needsContext;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 28 */
/*!**********************************!*\
  !*** ./~/jquery/src/selector.js ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_FACTORY__ = ([ "./selector-sizzle" ]), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 29 */
/*!*************************************!*\
  !*** ./~/jquery/src/event/alias.js ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
		__webpack_require__(/*! ../core */ 6),
		__webpack_require__(/*! ../event */ 17)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function( jQuery ) {
	
	jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
		"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
		"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {
	
		// Handle event binding
		jQuery.fn[ name ] = function( data, fn ) {
			return arguments.length > 0 ?
				this.on( name, null, data, fn ) :
				this.trigger( name );
		};
	});
	
	jQuery.fn.extend({
		hover: function( fnOver, fnOut ) {
			return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
		},
	
		bind: function( types, data, fn ) {
			return this.on( types, null, data, fn );
		},
		unbind: function( types, fn ) {
			return this.off( types, null, fn );
		},
	
		delegate: function( selector, types, data, fn ) {
			return this.on( types, selector, data, fn );
		},
		undelegate: function( selector, types, fn ) {
			// ( namespace ) or ( selector, types [, fn] )
			return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
		}
	});
	
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 30 */
/*!**************************************!*\
  !*** ./~/jquery/src/manipulation.js ***!
  \**************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
		__webpack_require__(/*! ./core */ 6),
		__webpack_require__(/*! ./var/concat */ 9),
		__webpack_require__(/*! ./var/push */ 10),
		__webpack_require__(/*! ./core/access */ 32),
		__webpack_require__(/*! ./manipulation/var/rcheckableType */ 33),
		__webpack_require__(/*! ./manipulation/support */ 34),
		__webpack_require__(/*! ./data/var/data_priv */ 21),
		__webpack_require__(/*! ./data/var/data_user */ 31),
	
		__webpack_require__(/*! ./core/init */ 24),
		__webpack_require__(/*! ./data/accepts */ 23),
		__webpack_require__(/*! ./traversing */ 35),
		__webpack_require__(/*! ./selector */ 28),
		__webpack_require__(/*! ./event */ 17)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function( jQuery, concat, push, access, rcheckableType, support, data_priv, data_user ) {
	
	var
		rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
		rtagName = /<([\w:]+)/,
		rhtml = /<|&#?\w+;/,
		rnoInnerhtml = /<(?:script|style|link)/i,
		// checked="checked" or checked
		rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
		rscriptType = /^$|\/(?:java|ecma)script/i,
		rscriptTypeMasked = /^true\/(.*)/,
		rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
	
		// We have to close these tags to support XHTML (#13200)
		wrapMap = {
	
			// Support: IE9
			option: [ 1, "<select multiple='multiple'>", "</select>" ],
	
			thead: [ 1, "<table>", "</table>" ],
			col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
			tr: [ 2, "<table><tbody>", "</tbody></table>" ],
			td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
	
			_default: [ 0, "", "" ]
		};
	
	// Support: IE9
	wrapMap.optgroup = wrapMap.option;
	
	wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
	wrapMap.th = wrapMap.td;
	
	// Support: 1.x compatibility
	// Manipulating tables requires a tbody
	function manipulationTarget( elem, content ) {
		return jQuery.nodeName( elem, "table" ) &&
			jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?
	
			elem.getElementsByTagName("tbody")[0] ||
				elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
			elem;
	}
	
	// Replace/restore the type attribute of script elements for safe DOM manipulation
	function disableScript( elem ) {
		elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
		return elem;
	}
	function restoreScript( elem ) {
		var match = rscriptTypeMasked.exec( elem.type );
	
		if ( match ) {
			elem.type = match[ 1 ];
		} else {
			elem.removeAttribute("type");
		}
	
		return elem;
	}
	
	// Mark scripts as having already been evaluated
	function setGlobalEval( elems, refElements ) {
		var i = 0,
			l = elems.length;
	
		for ( ; i < l; i++ ) {
			data_priv.set(
				elems[ i ], "globalEval", !refElements || data_priv.get( refElements[ i ], "globalEval" )
			);
		}
	}
	
	function cloneCopyEvent( src, dest ) {
		var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;
	
		if ( dest.nodeType !== 1 ) {
			return;
		}
	
		// 1. Copy private data: events, handlers, etc.
		if ( data_priv.hasData( src ) ) {
			pdataOld = data_priv.access( src );
			pdataCur = data_priv.set( dest, pdataOld );
			events = pdataOld.events;
	
			if ( events ) {
				delete pdataCur.handle;
				pdataCur.events = {};
	
				for ( type in events ) {
					for ( i = 0, l = events[ type ].length; i < l; i++ ) {
						jQuery.event.add( dest, type, events[ type ][ i ] );
					}
				}
			}
		}
	
		// 2. Copy user data
		if ( data_user.hasData( src ) ) {
			udataOld = data_user.access( src );
			udataCur = jQuery.extend( {}, udataOld );
	
			data_user.set( dest, udataCur );
		}
	}
	
	function getAll( context, tag ) {
		var ret = context.getElementsByTagName ? context.getElementsByTagName( tag || "*" ) :
				context.querySelectorAll ? context.querySelectorAll( tag || "*" ) :
				[];
	
		return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
			jQuery.merge( [ context ], ret ) :
			ret;
	}
	
	// Fix IE bugs, see support tests
	function fixInput( src, dest ) {
		var nodeName = dest.nodeName.toLowerCase();
	
		// Fails to persist the checked state of a cloned checkbox or radio button.
		if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
			dest.checked = src.checked;
	
		// Fails to return the selected option to the default selected state when cloning options
		} else if ( nodeName === "input" || nodeName === "textarea" ) {
			dest.defaultValue = src.defaultValue;
		}
	}
	
	jQuery.extend({
		clone: function( elem, dataAndEvents, deepDataAndEvents ) {
			var i, l, srcElements, destElements,
				clone = elem.cloneNode( true ),
				inPage = jQuery.contains( elem.ownerDocument, elem );
	
			// Fix IE cloning issues
			if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
					!jQuery.isXMLDoc( elem ) ) {
	
				// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
				destElements = getAll( clone );
				srcElements = getAll( elem );
	
				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					fixInput( srcElements[ i ], destElements[ i ] );
				}
			}
	
			// Copy the events from the original to the clone
			if ( dataAndEvents ) {
				if ( deepDataAndEvents ) {
					srcElements = srcElements || getAll( elem );
					destElements = destElements || getAll( clone );
	
					for ( i = 0, l = srcElements.length; i < l; i++ ) {
						cloneCopyEvent( srcElements[ i ], destElements[ i ] );
					}
				} else {
					cloneCopyEvent( elem, clone );
				}
			}
	
			// Preserve script evaluation history
			destElements = getAll( clone, "script" );
			if ( destElements.length > 0 ) {
				setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
			}
	
			// Return the cloned set
			return clone;
		},
	
		buildFragment: function( elems, context, scripts, selection ) {
			var elem, tmp, tag, wrap, contains, j,
				fragment = context.createDocumentFragment(),
				nodes = [],
				i = 0,
				l = elems.length;
	
			for ( ; i < l; i++ ) {
				elem = elems[ i ];
	
				if ( elem || elem === 0 ) {
	
					// Add nodes directly
					if ( jQuery.type( elem ) === "object" ) {
						// Support: QtWebKit, PhantomJS
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );
	
					// Convert non-html into a text node
					} else if ( !rhtml.test( elem ) ) {
						nodes.push( context.createTextNode( elem ) );
	
					// Convert html into DOM nodes
					} else {
						tmp = tmp || fragment.appendChild( context.createElement("div") );
	
						// Deserialize a standard representation
						tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
						wrap = wrapMap[ tag ] || wrapMap._default;
						tmp.innerHTML = wrap[ 1 ] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[ 2 ];
	
						// Descend through wrappers to the right content
						j = wrap[ 0 ];
						while ( j-- ) {
							tmp = tmp.lastChild;
						}
	
						// Support: QtWebKit, PhantomJS
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( nodes, tmp.childNodes );
	
						// Remember the top-level container
						tmp = fragment.firstChild;
	
						// Ensure the created nodes are orphaned (#12392)
						tmp.textContent = "";
					}
				}
			}
	
			// Remove wrapper from fragment
			fragment.textContent = "";
	
			i = 0;
			while ( (elem = nodes[ i++ ]) ) {
	
				// #4087 - If origin and destination elements are the same, and this is
				// that element, do not do anything
				if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
					continue;
				}
	
				contains = jQuery.contains( elem.ownerDocument, elem );
	
				// Append to fragment
				tmp = getAll( fragment.appendChild( elem ), "script" );
	
				// Preserve script evaluation history
				if ( contains ) {
					setGlobalEval( tmp );
				}
	
				// Capture executables
				if ( scripts ) {
					j = 0;
					while ( (elem = tmp[ j++ ]) ) {
						if ( rscriptType.test( elem.type || "" ) ) {
							scripts.push( elem );
						}
					}
				}
			}
	
			return fragment;
		},
	
		cleanData: function( elems ) {
			var data, elem, type, key,
				special = jQuery.event.special,
				i = 0;
	
			for ( ; (elem = elems[ i ]) !== undefined; i++ ) {
				if ( jQuery.acceptData( elem ) ) {
					key = elem[ data_priv.expando ];
	
					if ( key && (data = data_priv.cache[ key ]) ) {
						if ( data.events ) {
							for ( type in data.events ) {
								if ( special[ type ] ) {
									jQuery.event.remove( elem, type );
	
								// This is a shortcut to avoid jQuery.event.remove's overhead
								} else {
									jQuery.removeEvent( elem, type, data.handle );
								}
							}
						}
						if ( data_priv.cache[ key ] ) {
							// Discard any remaining `private` data
							delete data_priv.cache[ key ];
						}
					}
				}
				// Discard any remaining `user` data
				delete data_user.cache[ elem[ data_user.expando ] ];
			}
		}
	});
	
	jQuery.fn.extend({
		text: function( value ) {
			return access( this, function( value ) {
				return value === undefined ?
					jQuery.text( this ) :
					this.empty().each(function() {
						if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
							this.textContent = value;
						}
					});
			}, null, value, arguments.length );
		},
	
		append: function() {
			return this.domManip( arguments, function( elem ) {
				if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
					var target = manipulationTarget( this, elem );
					target.appendChild( elem );
				}
			});
		},
	
		prepend: function() {
			return this.domManip( arguments, function( elem ) {
				if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
					var target = manipulationTarget( this, elem );
					target.insertBefore( elem, target.firstChild );
				}
			});
		},
	
		before: function() {
			return this.domManip( arguments, function( elem ) {
				if ( this.parentNode ) {
					this.parentNode.insertBefore( elem, this );
				}
			});
		},
	
		after: function() {
			return this.domManip( arguments, function( elem ) {
				if ( this.parentNode ) {
					this.parentNode.insertBefore( elem, this.nextSibling );
				}
			});
		},
	
		remove: function( selector, keepData /* Internal Use Only */ ) {
			var elem,
				elems = selector ? jQuery.filter( selector, this ) : this,
				i = 0;
	
			for ( ; (elem = elems[i]) != null; i++ ) {
				if ( !keepData && elem.nodeType === 1 ) {
					jQuery.cleanData( getAll( elem ) );
				}
	
				if ( elem.parentNode ) {
					if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
						setGlobalEval( getAll( elem, "script" ) );
					}
					elem.parentNode.removeChild( elem );
				}
			}
	
			return this;
		},
	
		empty: function() {
			var elem,
				i = 0;
	
			for ( ; (elem = this[i]) != null; i++ ) {
				if ( elem.nodeType === 1 ) {
	
					// Prevent memory leaks
					jQuery.cleanData( getAll( elem, false ) );
	
					// Remove any remaining nodes
					elem.textContent = "";
				}
			}
	
			return this;
		},
	
		clone: function( dataAndEvents, deepDataAndEvents ) {
			dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
			deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;
	
			return this.map(function() {
				return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
			});
		},
	
		html: function( value ) {
			return access( this, function( value ) {
				var elem = this[ 0 ] || {},
					i = 0,
					l = this.length;
	
				if ( value === undefined && elem.nodeType === 1 ) {
					return elem.innerHTML;
				}
	
				// See if we can take a shortcut and just use innerHTML
				if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
					!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {
	
					value = value.replace( rxhtmlTag, "<$1></$2>" );
	
					try {
						for ( ; i < l; i++ ) {
							elem = this[ i ] || {};
	
							// Remove element nodes and prevent memory leaks
							if ( elem.nodeType === 1 ) {
								jQuery.cleanData( getAll( elem, false ) );
								elem.innerHTML = value;
							}
						}
	
						elem = 0;
	
					// If using innerHTML throws an exception, use the fallback method
					} catch( e ) {}
				}
	
				if ( elem ) {
					this.empty().append( value );
				}
			}, null, value, arguments.length );
		},
	
		replaceWith: function() {
			var arg = arguments[ 0 ];
	
			// Make the changes, replacing each context element with the new content
			this.domManip( arguments, function( elem ) {
				arg = this.parentNode;
	
				jQuery.cleanData( getAll( this ) );
	
				if ( arg ) {
					arg.replaceChild( elem, this );
				}
			});
	
			// Force removal if there was no new content (e.g., from empty arguments)
			return arg && (arg.length || arg.nodeType) ? this : this.remove();
		},
	
		detach: function( selector ) {
			return this.remove( selector, true );
		},
	
		domManip: function( args, callback ) {
	
			// Flatten any nested arrays
			args = concat.apply( [], args );
	
			var fragment, first, scripts, hasScripts, node, doc,
				i = 0,
				l = this.length,
				set = this,
				iNoClone = l - 1,
				value = args[ 0 ],
				isFunction = jQuery.isFunction( value );
	
			// We can't cloneNode fragments that contain checked, in WebKit
			if ( isFunction ||
					( l > 1 && typeof value === "string" &&
						!support.checkClone && rchecked.test( value ) ) ) {
				return this.each(function( index ) {
					var self = set.eq( index );
					if ( isFunction ) {
						args[ 0 ] = value.call( this, index, self.html() );
					}
					self.domManip( args, callback );
				});
			}
	
			if ( l ) {
				fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
				first = fragment.firstChild;
	
				if ( fragment.childNodes.length === 1 ) {
					fragment = first;
				}
	
				if ( first ) {
					scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
					hasScripts = scripts.length;
	
					// Use the original fragment for the last item instead of the first because it can end up
					// being emptied incorrectly in certain situations (#8070).
					for ( ; i < l; i++ ) {
						node = fragment;
	
						if ( i !== iNoClone ) {
							node = jQuery.clone( node, true, true );
	
							// Keep references to cloned scripts for later restoration
							if ( hasScripts ) {
								// Support: QtWebKit
								// jQuery.merge because push.apply(_, arraylike) throws
								jQuery.merge( scripts, getAll( node, "script" ) );
							}
						}
	
						callback.call( this[ i ], node, i );
					}
	
					if ( hasScripts ) {
						doc = scripts[ scripts.length - 1 ].ownerDocument;
	
						// Reenable scripts
						jQuery.map( scripts, restoreScript );
	
						// Evaluate executable scripts on first document insertion
						for ( i = 0; i < hasScripts; i++ ) {
							node = scripts[ i ];
							if ( rscriptType.test( node.type || "" ) &&
								!data_priv.access( node, "globalEval" ) && jQuery.contains( doc, node ) ) {
	
								if ( node.src ) {
									// Optional AJAX dependency, but won't run scripts if not present
									if ( jQuery._evalUrl ) {
										jQuery._evalUrl( node.src );
									}
								} else {
									jQuery.globalEval( node.textContent.replace( rcleanScript, "" ) );
								}
							}
						}
					}
				}
			}
	
			return this;
		}
	});
	
	jQuery.each({
		appendTo: "append",
		prependTo: "prepend",
		insertBefore: "before",
		insertAfter: "after",
		replaceAll: "replaceWith"
	}, function( name, original ) {
		jQuery.fn[ name ] = function( selector ) {
			var elems,
				ret = [],
				insert = jQuery( selector ),
				last = insert.length - 1,
				i = 0;
	
			for ( ; i <= last; i++ ) {
				elems = i === last ? this : this.clone( true );
				jQuery( insert[ i ] )[ original ]( elems );
	
				// Support: QtWebKit
				// .get() because push.apply(_, arraylike) throws
				push.apply( ret, elems.get() );
			}
	
			return this.pushStack( ret );
		};
	});
	
	return jQuery;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 31 */
/*!********************************************!*\
  !*** ./~/jquery/src/data/var/data_user.js ***!
  \********************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
		__webpack_require__(/*! ../Data */ 22)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function( Data ) {
		return new Data();
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 32 */
/*!*************************************!*\
  !*** ./~/jquery/src/core/access.js ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
		__webpack_require__(/*! ../core */ 6)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function( jQuery ) {
	
	// Multifunctional method to get and set values of a collection
	// The value/s can optionally be executed if it's a function
	var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
		var i = 0,
			len = elems.length,
			bulk = key == null;
	
		// Sets many values
		if ( jQuery.type( key ) === "object" ) {
			chainable = true;
			for ( i in key ) {
				jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
			}
	
		// Sets one value
		} else if ( value !== undefined ) {
			chainable = true;
	
			if ( !jQuery.isFunction( value ) ) {
				raw = true;
			}
	
			if ( bulk ) {
				// Bulk operations run against the entire set
				if ( raw ) {
					fn.call( elems, value );
					fn = null;
	
				// ...except when executing function values
				} else {
					bulk = fn;
					fn = function( elem, key, value ) {
						return bulk.call( jQuery( elem ), value );
					};
				}
			}
	
			if ( fn ) {
				for ( ; i < len; i++ ) {
					fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
				}
			}
		}
	
		return chainable ?
			elems :
	
			// Gets
			bulk ?
				fn.call( elems ) :
				len ? fn( elems[0], key ) : emptyGet;
	};
	
	return access;
	
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 33 */
/*!*********************************************************!*\
  !*** ./~/jquery/src/manipulation/var/rcheckableType.js ***!
  \*********************************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
		return (/^(?:checkbox|radio)$/i);
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 34 */
/*!**********************************************!*\
  !*** ./~/jquery/src/manipulation/support.js ***!
  \**********************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
		__webpack_require__(/*! ../var/support */ 15)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function( support ) {
	
	(function() {
		var fragment = document.createDocumentFragment(),
			div = fragment.appendChild( document.createElement( "div" ) ),
			input = document.createElement( "input" );
	
		// Support: Safari<=5.1
		// Check state lost if the name is set (#11217)
		// Support: Windows Web Apps (WWA)
		// `name` and `type` must use .setAttribute for WWA (#14901)
		input.setAttribute( "type", "radio" );
		input.setAttribute( "checked", "checked" );
		input.setAttribute( "name", "t" );
	
		div.appendChild( input );
	
		// Support: Safari<=5.1, Android<4.2
		// Older WebKit doesn't clone checked state correctly in fragments
		support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;
	
		// Support: IE<=11+
		// Make sure textarea (and checkbox) defaultValue is properly cloned
		div.innerHTML = "<textarea>x</textarea>";
		support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
	})();
	
	return support;
	
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 35 */
/*!************************************!*\
  !*** ./~/jquery/src/traversing.js ***!
  \************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
		__webpack_require__(/*! ./core */ 6),
		__webpack_require__(/*! ./var/indexOf */ 11),
		__webpack_require__(/*! ./traversing/var/rneedsContext */ 27),
		__webpack_require__(/*! ./core/init */ 24),
		__webpack_require__(/*! ./traversing/findFilter */ 26),
		__webpack_require__(/*! ./selector */ 28)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function( jQuery, indexOf, rneedsContext ) {
	
	var rparentsprev = /^(?:parents|prev(?:Until|All))/,
		// Methods guaranteed to produce a unique set when starting from a unique set
		guaranteedUnique = {
			children: true,
			contents: true,
			next: true,
			prev: true
		};
	
	jQuery.extend({
		dir: function( elem, dir, until ) {
			var matched = [],
				truncate = until !== undefined;
	
			while ( (elem = elem[ dir ]) && elem.nodeType !== 9 ) {
				if ( elem.nodeType === 1 ) {
					if ( truncate && jQuery( elem ).is( until ) ) {
						break;
					}
					matched.push( elem );
				}
			}
			return matched;
		},
	
		sibling: function( n, elem ) {
			var matched = [];
	
			for ( ; n; n = n.nextSibling ) {
				if ( n.nodeType === 1 && n !== elem ) {
					matched.push( n );
				}
			}
	
			return matched;
		}
	});
	
	jQuery.fn.extend({
		has: function( target ) {
			var targets = jQuery( target, this ),
				l = targets.length;
	
			return this.filter(function() {
				var i = 0;
				for ( ; i < l; i++ ) {
					if ( jQuery.contains( this, targets[i] ) ) {
						return true;
					}
				}
			});
		},
	
		closest: function( selectors, context ) {
			var cur,
				i = 0,
				l = this.length,
				matched = [],
				pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
					jQuery( selectors, context || this.context ) :
					0;
	
			for ( ; i < l; i++ ) {
				for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
					// Always skip document fragments
					if ( cur.nodeType < 11 && (pos ?
						pos.index(cur) > -1 :
	
						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector(cur, selectors)) ) {
	
						matched.push( cur );
						break;
					}
				}
			}
	
			return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
		},
	
		// Determine the position of an element within the set
		index: function( elem ) {
	
			// No argument, return index in parent
			if ( !elem ) {
				return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
			}
	
			// Index in selector
			if ( typeof elem === "string" ) {
				return indexOf.call( jQuery( elem ), this[ 0 ] );
			}
	
			// Locate the position of the desired element
			return indexOf.call( this,
	
				// If it receives a jQuery object, the first element is used
				elem.jquery ? elem[ 0 ] : elem
			);
		},
	
		add: function( selector, context ) {
			return this.pushStack(
				jQuery.unique(
					jQuery.merge( this.get(), jQuery( selector, context ) )
				)
			);
		},
	
		addBack: function( selector ) {
			return this.add( selector == null ?
				this.prevObject : this.prevObject.filter(selector)
			);
		}
	});
	
	function sibling( cur, dir ) {
		while ( (cur = cur[dir]) && cur.nodeType !== 1 ) {}
		return cur;
	}
	
	jQuery.each({
		parent: function( elem ) {
			var parent = elem.parentNode;
			return parent && parent.nodeType !== 11 ? parent : null;
		},
		parents: function( elem ) {
			return jQuery.dir( elem, "parentNode" );
		},
		parentsUntil: function( elem, i, until ) {
			return jQuery.dir( elem, "parentNode", until );
		},
		next: function( elem ) {
			return sibling( elem, "nextSibling" );
		},
		prev: function( elem ) {
			return sibling( elem, "previousSibling" );
		},
		nextAll: function( elem ) {
			return jQuery.dir( elem, "nextSibling" );
		},
		prevAll: function( elem ) {
			return jQuery.dir( elem, "previousSibling" );
		},
		nextUntil: function( elem, i, until ) {
			return jQuery.dir( elem, "nextSibling", until );
		},
		prevUntil: function( elem, i, until ) {
			return jQuery.dir( elem, "previousSibling", until );
		},
		siblings: function( elem ) {
			return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
		},
		children: function( elem ) {
			return jQuery.sibling( elem.firstChild );
		},
		contents: function( elem ) {
			return elem.contentDocument || jQuery.merge( [], elem.childNodes );
		}
	}, function( name, fn ) {
		jQuery.fn[ name ] = function( until, selector ) {
			var matched = jQuery.map( this, fn, until );
	
			if ( name.slice( -5 ) !== "Until" ) {
				selector = until;
			}
	
			if ( selector && typeof selector === "string" ) {
				matched = jQuery.filter( selector, matched );
			}
	
			if ( this.length > 1 ) {
				// Remove duplicates
				if ( !guaranteedUnique[ name ] ) {
					jQuery.unique( matched );
				}
	
				// Reverse order for parents* and prev-derivatives
				if ( rparentsprev.test( name ) ) {
					matched.reverse();
				}
			}
	
			return this.pushStack( matched );
		};
	});
	
	return jQuery;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 36 */
/*!******************************!*\
  !*** ./~/jquery/src/ajax.js ***!
  \******************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
		__webpack_require__(/*! ./core */ 6),
		__webpack_require__(/*! ./var/rnotwhite */ 19),
		__webpack_require__(/*! ./ajax/var/nonce */ 37),
		__webpack_require__(/*! ./ajax/var/rquery */ 38),
		__webpack_require__(/*! ./core/init */ 24),
		__webpack_require__(/*! ./ajax/parseJSON */ 39),
		__webpack_require__(/*! ./ajax/parseXML */ 40),
		__webpack_require__(/*! ./deferred */ 41)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function( jQuery, rnotwhite, nonce, rquery ) {
	
	var
		rhash = /#.*$/,
		rts = /([?&])_=[^&]*/,
		rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
		// #7653, #8125, #8152: local protocol detection
		rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
		rnoContent = /^(?:GET|HEAD)$/,
		rprotocol = /^\/\//,
		rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
	
		/* Prefilters
		 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
		 * 2) These are called:
		 *    - BEFORE asking for a transport
		 *    - AFTER param serialization (s.data is a string if s.processData is true)
		 * 3) key is the dataType
		 * 4) the catchall symbol "*" can be used
		 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
		 */
		prefilters = {},
	
		/* Transports bindings
		 * 1) key is the dataType
		 * 2) the catchall symbol "*" can be used
		 * 3) selection will start with transport dataType and THEN go to "*" if needed
		 */
		transports = {},
	
		// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
		allTypes = "*/".concat( "*" ),
	
		// Document location
		ajaxLocation = window.location.href,
	
		// Segment location into parts
		ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];
	
	// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
	function addToPrefiltersOrTransports( structure ) {
	
		// dataTypeExpression is optional and defaults to "*"
		return function( dataTypeExpression, func ) {
	
			if ( typeof dataTypeExpression !== "string" ) {
				func = dataTypeExpression;
				dataTypeExpression = "*";
			}
	
			var dataType,
				i = 0,
				dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];
	
			if ( jQuery.isFunction( func ) ) {
				// For each dataType in the dataTypeExpression
				while ( (dataType = dataTypes[i++]) ) {
					// Prepend if requested
					if ( dataType[0] === "+" ) {
						dataType = dataType.slice( 1 ) || "*";
						(structure[ dataType ] = structure[ dataType ] || []).unshift( func );
	
					// Otherwise append
					} else {
						(structure[ dataType ] = structure[ dataType ] || []).push( func );
					}
				}
			}
		};
	}
	
	// Base inspection function for prefilters and transports
	function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {
	
		var inspected = {},
			seekingTransport = ( structure === transports );
	
		function inspect( dataType ) {
			var selected;
			inspected[ dataType ] = true;
			jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
				var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
				if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
					options.dataTypes.unshift( dataTypeOrTransport );
					inspect( dataTypeOrTransport );
					return false;
				} else if ( seekingTransport ) {
					return !( selected = dataTypeOrTransport );
				}
			});
			return selected;
		}
	
		return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
	}
	
	// A special extend for ajax options
	// that takes "flat" options (not to be deep extended)
	// Fixes #9887
	function ajaxExtend( target, src ) {
		var key, deep,
			flatOptions = jQuery.ajaxSettings.flatOptions || {};
	
		for ( key in src ) {
			if ( src[ key ] !== undefined ) {
				( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
			}
		}
		if ( deep ) {
			jQuery.extend( true, target, deep );
		}
	
		return target;
	}
	
	/* Handles responses to an ajax request:
	 * - finds the right dataType (mediates between content-type and expected dataType)
	 * - returns the corresponding response
	 */
	function ajaxHandleResponses( s, jqXHR, responses ) {
	
		var ct, type, finalDataType, firstDataType,
			contents = s.contents,
			dataTypes = s.dataTypes;
	
		// Remove auto dataType and get content-type in the process
		while ( dataTypes[ 0 ] === "*" ) {
			dataTypes.shift();
			if ( ct === undefined ) {
				ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
			}
		}
	
		// Check if we're dealing with a known content-type
		if ( ct ) {
			for ( type in contents ) {
				if ( contents[ type ] && contents[ type ].test( ct ) ) {
					dataTypes.unshift( type );
					break;
				}
			}
		}
	
		// Check to see if we have a response for the expected dataType
		if ( dataTypes[ 0 ] in responses ) {
			finalDataType = dataTypes[ 0 ];
		} else {
			// Try convertible dataTypes
			for ( type in responses ) {
				if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
					finalDataType = type;
					break;
				}
				if ( !firstDataType ) {
					firstDataType = type;
				}
			}
			// Or just use first one
			finalDataType = finalDataType || firstDataType;
		}
	
		// If we found a dataType
		// We add the dataType to the list if needed
		// and return the corresponding response
		if ( finalDataType ) {
			if ( finalDataType !== dataTypes[ 0 ] ) {
				dataTypes.unshift( finalDataType );
			}
			return responses[ finalDataType ];
		}
	}
	
	/* Chain conversions given the request and the original response
	 * Also sets the responseXXX fields on the jqXHR instance
	 */
	function ajaxConvert( s, response, jqXHR, isSuccess ) {
		var conv2, current, conv, tmp, prev,
			converters = {},
			// Work with a copy of dataTypes in case we need to modify it for conversion
			dataTypes = s.dataTypes.slice();
	
		// Create converters map with lowercased keys
		if ( dataTypes[ 1 ] ) {
			for ( conv in s.converters ) {
				converters[ conv.toLowerCase() ] = s.converters[ conv ];
			}
		}
	
		current = dataTypes.shift();
	
		// Convert to each sequential dataType
		while ( current ) {
	
			if ( s.responseFields[ current ] ) {
				jqXHR[ s.responseFields[ current ] ] = response;
			}
	
			// Apply the dataFilter if provided
			if ( !prev && isSuccess && s.dataFilter ) {
				response = s.dataFilter( response, s.dataType );
			}
	
			prev = current;
			current = dataTypes.shift();
	
			if ( current ) {
	
			// There's only work to do if current dataType is non-auto
				if ( current === "*" ) {
	
					current = prev;
	
				// Convert response if prev dataType is non-auto and differs from current
				} else if ( prev !== "*" && prev !== current ) {
	
					// Seek a direct converter
					conv = converters[ prev + " " + current ] || converters[ "* " + current ];
	
					// If none found, seek a pair
					if ( !conv ) {
						for ( conv2 in converters ) {
	
							// If conv2 outputs current
							tmp = conv2.split( " " );
							if ( tmp[ 1 ] === current ) {
	
								// If prev can be converted to accepted input
								conv = converters[ prev + " " + tmp[ 0 ] ] ||
									converters[ "* " + tmp[ 0 ] ];
								if ( conv ) {
									// Condense equivalence converters
									if ( conv === true ) {
										conv = converters[ conv2 ];
	
									// Otherwise, insert the intermediate dataType
									} else if ( converters[ conv2 ] !== true ) {
										current = tmp[ 0 ];
										dataTypes.unshift( tmp[ 1 ] );
									}
									break;
								}
							}
						}
					}
	
					// Apply converter (if not an equivalence)
					if ( conv !== true ) {
	
						// Unless errors are allowed to bubble, catch and return them
						if ( conv && s[ "throws" ] ) {
							response = conv( response );
						} else {
							try {
								response = conv( response );
							} catch ( e ) {
								return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
							}
						}
					}
				}
			}
		}
	
		return { state: "success", data: response };
	}
	
	jQuery.extend({
	
		// Counter for holding the number of active queries
		active: 0,
	
		// Last-Modified header cache for next request
		lastModified: {},
		etag: {},
	
		ajaxSettings: {
			url: ajaxLocation,
			type: "GET",
			isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
			global: true,
			processData: true,
			async: true,
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			/*
			timeout: 0,
			data: null,
			dataType: null,
			username: null,
			password: null,
			cache: null,
			throws: false,
			traditional: false,
			headers: {},
			*/
	
			accepts: {
				"*": allTypes,
				text: "text/plain",
				html: "text/html",
				xml: "application/xml, text/xml",
				json: "application/json, text/javascript"
			},
	
			contents: {
				xml: /xml/,
				html: /html/,
				json: /json/
			},
	
			responseFields: {
				xml: "responseXML",
				text: "responseText",
				json: "responseJSON"
			},
	
			// Data converters
			// Keys separate source (or catchall "*") and destination types with a single space
			converters: {
	
				// Convert anything to text
				"* text": String,
	
				// Text to html (true = no transformation)
				"text html": true,
	
				// Evaluate text as a json expression
				"text json": jQuery.parseJSON,
	
				// Parse text as xml
				"text xml": jQuery.parseXML
			},
	
			// For options that shouldn't be deep extended:
			// you can add your own custom options here if
			// and when you create one that shouldn't be
			// deep extended (see ajaxExtend)
			flatOptions: {
				url: true,
				context: true
			}
		},
	
		// Creates a full fledged settings object into target
		// with both ajaxSettings and settings fields.
		// If target is omitted, writes into ajaxSettings.
		ajaxSetup: function( target, settings ) {
			return settings ?
	
				// Building a settings object
				ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :
	
				// Extending ajaxSettings
				ajaxExtend( jQuery.ajaxSettings, target );
		},
	
		ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
		ajaxTransport: addToPrefiltersOrTransports( transports ),
	
		// Main method
		ajax: function( url, options ) {
	
			// If url is an object, simulate pre-1.5 signature
			if ( typeof url === "object" ) {
				options = url;
				url = undefined;
			}
	
			// Force options to be an object
			options = options || {};
	
			var transport,
				// URL without anti-cache param
				cacheURL,
				// Response headers
				responseHeadersString,
				responseHeaders,
				// timeout handle
				timeoutTimer,
				// Cross-domain detection vars
				parts,
				// To know if global events are to be dispatched
				fireGlobals,
				// Loop variable
				i,
				// Create the final options object
				s = jQuery.ajaxSetup( {}, options ),
				// Callbacks context
				callbackContext = s.context || s,
				// Context for global events is callbackContext if it is a DOM node or jQuery collection
				globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,
				// Deferreds
				deferred = jQuery.Deferred(),
				completeDeferred = jQuery.Callbacks("once memory"),
				// Status-dependent callbacks
				statusCode = s.statusCode || {},
				// Headers (they are sent all at once)
				requestHeaders = {},
				requestHeadersNames = {},
				// The jqXHR state
				state = 0,
				// Default abort message
				strAbort = "canceled",
				// Fake xhr
				jqXHR = {
					readyState: 0,
	
					// Builds headers hashtable if needed
					getResponseHeader: function( key ) {
						var match;
						if ( state === 2 ) {
							if ( !responseHeaders ) {
								responseHeaders = {};
								while ( (match = rheaders.exec( responseHeadersString )) ) {
									responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
								}
							}
							match = responseHeaders[ key.toLowerCase() ];
						}
						return match == null ? null : match;
					},
	
					// Raw string
					getAllResponseHeaders: function() {
						return state === 2 ? responseHeadersString : null;
					},
	
					// Caches the header
					setRequestHeader: function( name, value ) {
						var lname = name.toLowerCase();
						if ( !state ) {
							name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
							requestHeaders[ name ] = value;
						}
						return this;
					},
	
					// Overrides response content-type header
					overrideMimeType: function( type ) {
						if ( !state ) {
							s.mimeType = type;
						}
						return this;
					},
	
					// Status-dependent callbacks
					statusCode: function( map ) {
						var code;
						if ( map ) {
							if ( state < 2 ) {
								for ( code in map ) {
									// Lazy-add the new callback in a way that preserves old ones
									statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
								}
							} else {
								// Execute the appropriate callbacks
								jqXHR.always( map[ jqXHR.status ] );
							}
						}
						return this;
					},
	
					// Cancel the request
					abort: function( statusText ) {
						var finalText = statusText || strAbort;
						if ( transport ) {
							transport.abort( finalText );
						}
						done( 0, finalText );
						return this;
					}
				};
	
			// Attach deferreds
			deferred.promise( jqXHR ).complete = completeDeferred.add;
			jqXHR.success = jqXHR.done;
			jqXHR.error = jqXHR.fail;
	
			// Remove hash character (#7531: and string promotion)
			// Add protocol if not provided (prefilters might expect it)
			// Handle falsy url in the settings object (#10093: consistency with old signature)
			// We also use the url parameter if available
			s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" )
				.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );
	
			// Alias method option to type as per ticket #12004
			s.type = options.method || options.type || s.method || s.type;
	
			// Extract dataTypes list
			s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];
	
			// A cross-domain request is in order when we have a protocol:host:port mismatch
			if ( s.crossDomain == null ) {
				parts = rurl.exec( s.url.toLowerCase() );
				s.crossDomain = !!( parts &&
					( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
						( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
							( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
				);
			}
	
			// Convert data if not already a string
			if ( s.data && s.processData && typeof s.data !== "string" ) {
				s.data = jQuery.param( s.data, s.traditional );
			}
	
			// Apply prefilters
			inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );
	
			// If request was aborted inside a prefilter, stop there
			if ( state === 2 ) {
				return jqXHR;
			}
	
			// We can fire global events as of now if asked to
			// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
			fireGlobals = jQuery.event && s.global;
	
			// Watch for a new set of requests
			if ( fireGlobals && jQuery.active++ === 0 ) {
				jQuery.event.trigger("ajaxStart");
			}
	
			// Uppercase the type
			s.type = s.type.toUpperCase();
	
			// Determine if request has content
			s.hasContent = !rnoContent.test( s.type );
	
			// Save the URL in case we're toying with the If-Modified-Since
			// and/or If-None-Match header later on
			cacheURL = s.url;
	
			// More options handling for requests with no content
			if ( !s.hasContent ) {
	
				// If data is available, append data to url
				if ( s.data ) {
					cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
					// #9682: remove data so that it's not used in an eventual retry
					delete s.data;
				}
	
				// Add anti-cache in url if needed
				if ( s.cache === false ) {
					s.url = rts.test( cacheURL ) ?
	
						// If there is already a '_' parameter, set its value
						cacheURL.replace( rts, "$1_=" + nonce++ ) :
	
						// Otherwise add one to the end
						cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
				}
			}
	
			// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
			if ( s.ifModified ) {
				if ( jQuery.lastModified[ cacheURL ] ) {
					jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
				}
				if ( jQuery.etag[ cacheURL ] ) {
					jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
				}
			}
	
			// Set the correct header, if data is being sent
			if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
				jqXHR.setRequestHeader( "Content-Type", s.contentType );
			}
	
			// Set the Accepts header for the server, depending on the dataType
			jqXHR.setRequestHeader(
				"Accept",
				s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
					s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
					s.accepts[ "*" ]
			);
	
			// Check for headers option
			for ( i in s.headers ) {
				jqXHR.setRequestHeader( i, s.headers[ i ] );
			}
	
			// Allow custom headers/mimetypes and early abort
			if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
				// Abort if not done already and return
				return jqXHR.abort();
			}
	
			// Aborting is no longer a cancellation
			strAbort = "abort";
	
			// Install callbacks on deferreds
			for ( i in { success: 1, error: 1, complete: 1 } ) {
				jqXHR[ i ]( s[ i ] );
			}
	
			// Get transport
			transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );
	
			// If no transport, we auto-abort
			if ( !transport ) {
				done( -1, "No Transport" );
			} else {
				jqXHR.readyState = 1;
	
				// Send global event
				if ( fireGlobals ) {
					globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
				}
				// Timeout
				if ( s.async && s.timeout > 0 ) {
					timeoutTimer = setTimeout(function() {
						jqXHR.abort("timeout");
					}, s.timeout );
				}
	
				try {
					state = 1;
					transport.send( requestHeaders, done );
				} catch ( e ) {
					// Propagate exception as error if not done
					if ( state < 2 ) {
						done( -1, e );
					// Simply rethrow otherwise
					} else {
						throw e;
					}
				}
			}
	
			// Callback for when everything is done
			function done( status, nativeStatusText, responses, headers ) {
				var isSuccess, success, error, response, modified,
					statusText = nativeStatusText;
	
				// Called once
				if ( state === 2 ) {
					return;
				}
	
				// State is "done" now
				state = 2;
	
				// Clear timeout if it exists
				if ( timeoutTimer ) {
					clearTimeout( timeoutTimer );
				}
	
				// Dereference transport for early garbage collection
				// (no matter how long the jqXHR object will be used)
				transport = undefined;
	
				// Cache response headers
				responseHeadersString = headers || "";
	
				// Set readyState
				jqXHR.readyState = status > 0 ? 4 : 0;
	
				// Determine if successful
				isSuccess = status >= 200 && status < 300 || status === 304;
	
				// Get response data
				if ( responses ) {
					response = ajaxHandleResponses( s, jqXHR, responses );
				}
	
				// Convert no matter what (that way responseXXX fields are always set)
				response = ajaxConvert( s, response, jqXHR, isSuccess );
	
				// If successful, handle type chaining
				if ( isSuccess ) {
	
					// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
					if ( s.ifModified ) {
						modified = jqXHR.getResponseHeader("Last-Modified");
						if ( modified ) {
							jQuery.lastModified[ cacheURL ] = modified;
						}
						modified = jqXHR.getResponseHeader("etag");
						if ( modified ) {
							jQuery.etag[ cacheURL ] = modified;
						}
					}
	
					// if no content
					if ( status === 204 || s.type === "HEAD" ) {
						statusText = "nocontent";
	
					// if not modified
					} else if ( status === 304 ) {
						statusText = "notmodified";
	
					// If we have data, let's convert it
					} else {
						statusText = response.state;
						success = response.data;
						error = response.error;
						isSuccess = !error;
					}
				} else {
					// Extract error from statusText and normalize for non-aborts
					error = statusText;
					if ( status || !statusText ) {
						statusText = "error";
						if ( status < 0 ) {
							status = 0;
						}
					}
				}
	
				// Set data for the fake xhr object
				jqXHR.status = status;
				jqXHR.statusText = ( nativeStatusText || statusText ) + "";
	
				// Success/Error
				if ( isSuccess ) {
					deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
				} else {
					deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
				}
	
				// Status-dependent callbacks
				jqXHR.statusCode( statusCode );
				statusCode = undefined;
	
				if ( fireGlobals ) {
					globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
						[ jqXHR, s, isSuccess ? success : error ] );
				}
	
				// Complete
				completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );
	
				if ( fireGlobals ) {
					globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
					// Handle the global AJAX counter
					if ( !( --jQuery.active ) ) {
						jQuery.event.trigger("ajaxStop");
					}
				}
			}
	
			return jqXHR;
		},
	
		getJSON: function( url, data, callback ) {
			return jQuery.get( url, data, callback, "json" );
		},
	
		getScript: function( url, callback ) {
			return jQuery.get( url, undefined, callback, "script" );
		}
	});
	
	jQuery.each( [ "get", "post" ], function( i, method ) {
		jQuery[ method ] = function( url, data, callback, type ) {
			// Shift arguments if data argument was omitted
			if ( jQuery.isFunction( data ) ) {
				type = type || callback;
				callback = data;
				data = undefined;
			}
	
			return jQuery.ajax({
				url: url,
				type: method,
				dataType: type,
				data: data,
				success: callback
			});
		};
	});
	
	return jQuery;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 37 */
/*!****************************************!*\
  !*** ./~/jquery/src/ajax/var/nonce.js ***!
  \****************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
		__webpack_require__(/*! ../../core */ 6)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function( jQuery ) {
		return jQuery.now();
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 38 */
/*!*****************************************!*\
  !*** ./~/jquery/src/ajax/var/rquery.js ***!
  \*****************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
		return (/\?/);
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 39 */
/*!****************************************!*\
  !*** ./~/jquery/src/ajax/parseJSON.js ***!
  \****************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
		__webpack_require__(/*! ../core */ 6)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function( jQuery ) {
	
	// Support: Android 2.3
	// Workaround failure to string-cast null input
	jQuery.parseJSON = function( data ) {
		return JSON.parse( data + "" );
	};
	
	return jQuery.parseJSON;
	
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 40 */
/*!***************************************!*\
  !*** ./~/jquery/src/ajax/parseXML.js ***!
  \***************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
		__webpack_require__(/*! ../core */ 6)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function( jQuery ) {
	
	// Cross-browser xml parsing
	jQuery.parseXML = function( data ) {
		var xml, tmp;
		if ( !data || typeof data !== "string" ) {
			return null;
		}
	
		// Support: IE9
		try {
			tmp = new DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} catch ( e ) {
			xml = undefined;
		}
	
		if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
			jQuery.error( "Invalid XML: " + data );
		}
		return xml;
	};
	
	return jQuery.parseXML;
	
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 41 */
/*!**********************************!*\
  !*** ./~/jquery/src/deferred.js ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
		__webpack_require__(/*! ./core */ 6),
		__webpack_require__(/*! ./var/slice */ 8),
		__webpack_require__(/*! ./callbacks */ 42)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function( jQuery, slice ) {
	
	jQuery.extend({
	
		Deferred: function( func ) {
			var tuples = [
					// action, add listener, listener list, final state
					[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
					[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
					[ "notify", "progress", jQuery.Callbacks("memory") ]
				],
				state = "pending",
				promise = {
					state: function() {
						return state;
					},
					always: function() {
						deferred.done( arguments ).fail( arguments );
						return this;
					},
					then: function( /* fnDone, fnFail, fnProgress */ ) {
						var fns = arguments;
						return jQuery.Deferred(function( newDefer ) {
							jQuery.each( tuples, function( i, tuple ) {
								var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
								// deferred[ done | fail | progress ] for forwarding actions to newDefer
								deferred[ tuple[1] ](function() {
									var returned = fn && fn.apply( this, arguments );
									if ( returned && jQuery.isFunction( returned.promise ) ) {
										returned.promise()
											.done( newDefer.resolve )
											.fail( newDefer.reject )
											.progress( newDefer.notify );
									} else {
										newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
									}
								});
							});
							fns = null;
						}).promise();
					},
					// Get a promise for this deferred
					// If obj is provided, the promise aspect is added to the object
					promise: function( obj ) {
						return obj != null ? jQuery.extend( obj, promise ) : promise;
					}
				},
				deferred = {};
	
			// Keep pipe for back-compat
			promise.pipe = promise.then;
	
			// Add list-specific methods
			jQuery.each( tuples, function( i, tuple ) {
				var list = tuple[ 2 ],
					stateString = tuple[ 3 ];
	
				// promise[ done | fail | progress ] = list.add
				promise[ tuple[1] ] = list.add;
	
				// Handle state
				if ( stateString ) {
					list.add(function() {
						// state = [ resolved | rejected ]
						state = stateString;
	
					// [ reject_list | resolve_list ].disable; progress_list.lock
					}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
				}
	
				// deferred[ resolve | reject | notify ]
				deferred[ tuple[0] ] = function() {
					deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
					return this;
				};
				deferred[ tuple[0] + "With" ] = list.fireWith;
			});
	
			// Make the deferred a promise
			promise.promise( deferred );
	
			// Call given func if any
			if ( func ) {
				func.call( deferred, deferred );
			}
	
			// All done!
			return deferred;
		},
	
		// Deferred helper
		when: function( subordinate /* , ..., subordinateN */ ) {
			var i = 0,
				resolveValues = slice.call( arguments ),
				length = resolveValues.length,
	
				// the count of uncompleted subordinates
				remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,
	
				// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
				deferred = remaining === 1 ? subordinate : jQuery.Deferred(),
	
				// Update function for both resolve and progress values
				updateFunc = function( i, contexts, values ) {
					return function( value ) {
						contexts[ i ] = this;
						values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
						if ( values === progressValues ) {
							deferred.notifyWith( contexts, values );
						} else if ( !( --remaining ) ) {
							deferred.resolveWith( contexts, values );
						}
					};
				},
	
				progressValues, progressContexts, resolveContexts;
	
			// Add listeners to Deferred subordinates; treat others as resolved
			if ( length > 1 ) {
				progressValues = new Array( length );
				progressContexts = new Array( length );
				resolveContexts = new Array( length );
				for ( ; i < length; i++ ) {
					if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
						resolveValues[ i ].promise()
							.done( updateFunc( i, resolveContexts, resolveValues ) )
							.fail( deferred.reject )
							.progress( updateFunc( i, progressContexts, progressValues ) );
					} else {
						--remaining;
					}
				}
			}
	
			// If we're not waiting on anything, resolve the master
			if ( !remaining ) {
				deferred.resolveWith( resolveContexts, resolveValues );
			}
	
			return deferred.promise();
		}
	});
	
	return jQuery;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 42 */
/*!***********************************!*\
  !*** ./~/jquery/src/callbacks.js ***!
  \***********************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
		__webpack_require__(/*! ./core */ 6),
		__webpack_require__(/*! ./var/rnotwhite */ 19)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function( jQuery, rnotwhite ) {
	
	// String to Object options format cache
	var optionsCache = {};
	
	// Convert String-formatted options into Object-formatted ones and store in cache
	function createOptions( options ) {
		var object = optionsCache[ options ] = {};
		jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
			object[ flag ] = true;
		});
		return object;
	}
	
	/*
	 * Create a callback list using the following parameters:
	 *
	 *	options: an optional list of space-separated options that will change how
	 *			the callback list behaves or a more traditional option object
	 *
	 * By default a callback list will act like an event callback list and can be
	 * "fired" multiple times.
	 *
	 * Possible options:
	 *
	 *	once:			will ensure the callback list can only be fired once (like a Deferred)
	 *
	 *	memory:			will keep track of previous values and will call any callback added
	 *					after the list has been fired right away with the latest "memorized"
	 *					values (like a Deferred)
	 *
	 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
	 *
	 *	stopOnFalse:	interrupt callings when a callback returns false
	 *
	 */
	jQuery.Callbacks = function( options ) {
	
		// Convert options from String-formatted to Object-formatted if needed
		// (we check in cache first)
		options = typeof options === "string" ?
			( optionsCache[ options ] || createOptions( options ) ) :
			jQuery.extend( {}, options );
	
		var // Last fire value (for non-forgettable lists)
			memory,
			// Flag to know if list was already fired
			fired,
			// Flag to know if list is currently firing
			firing,
			// First callback to fire (used internally by add and fireWith)
			firingStart,
			// End of the loop when firing
			firingLength,
			// Index of currently firing callback (modified by remove if needed)
			firingIndex,
			// Actual callback list
			list = [],
			// Stack of fire calls for repeatable lists
			stack = !options.once && [],
			// Fire callbacks
			fire = function( data ) {
				memory = options.memory && data;
				fired = true;
				firingIndex = firingStart || 0;
				firingStart = 0;
				firingLength = list.length;
				firing = true;
				for ( ; list && firingIndex < firingLength; firingIndex++ ) {
					if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
						memory = false; // To prevent further calls using add
						break;
					}
				}
				firing = false;
				if ( list ) {
					if ( stack ) {
						if ( stack.length ) {
							fire( stack.shift() );
						}
					} else if ( memory ) {
						list = [];
					} else {
						self.disable();
					}
				}
			},
			// Actual Callbacks object
			self = {
				// Add a callback or a collection of callbacks to the list
				add: function() {
					if ( list ) {
						// First, we save the current length
						var start = list.length;
						(function add( args ) {
							jQuery.each( args, function( _, arg ) {
								var type = jQuery.type( arg );
								if ( type === "function" ) {
									if ( !options.unique || !self.has( arg ) ) {
										list.push( arg );
									}
								} else if ( arg && arg.length && type !== "string" ) {
									// Inspect recursively
									add( arg );
								}
							});
						})( arguments );
						// Do we need to add the callbacks to the
						// current firing batch?
						if ( firing ) {
							firingLength = list.length;
						// With memory, if we're not firing then
						// we should call right away
						} else if ( memory ) {
							firingStart = start;
							fire( memory );
						}
					}
					return this;
				},
				// Remove a callback from the list
				remove: function() {
					if ( list ) {
						jQuery.each( arguments, function( _, arg ) {
							var index;
							while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
								list.splice( index, 1 );
								// Handle firing indexes
								if ( firing ) {
									if ( index <= firingLength ) {
										firingLength--;
									}
									if ( index <= firingIndex ) {
										firingIndex--;
									}
								}
							}
						});
					}
					return this;
				},
				// Check if a given callback is in the list.
				// If no argument is given, return whether or not list has callbacks attached.
				has: function( fn ) {
					return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
				},
				// Remove all callbacks from the list
				empty: function() {
					list = [];
					firingLength = 0;
					return this;
				},
				// Have the list do nothing anymore
				disable: function() {
					list = stack = memory = undefined;
					return this;
				},
				// Is it disabled?
				disabled: function() {
					return !list;
				},
				// Lock the list in its current state
				lock: function() {
					stack = undefined;
					if ( !memory ) {
						self.disable();
					}
					return this;
				},
				// Is it locked?
				locked: function() {
					return !stack;
				},
				// Call all callbacks with the given context and arguments
				fireWith: function( context, args ) {
					if ( list && ( !fired || stack ) ) {
						args = args || [];
						args = [ context, args.slice ? args.slice() : args ];
						if ( firing ) {
							stack.push( args );
						} else {
							fire( args );
						}
					}
					return this;
				},
				// Call all the callbacks with the given arguments
				fire: function() {
					self.fireWith( this, arguments );
					return this;
				},
				// To know if the callbacks have already been called at least once
				fired: function() {
					return !!fired;
				}
			};
	
		return self;
	};
	
	return jQuery;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 43 */
/*!**********************************!*\
  !*** ./~/jquery/src/ajax/xhr.js ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
		__webpack_require__(/*! ../core */ 6),
		__webpack_require__(/*! ../var/support */ 15),
		__webpack_require__(/*! ../ajax */ 36)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function( jQuery, support ) {
	
	jQuery.ajaxSettings.xhr = function() {
		try {
			return new XMLHttpRequest();
		} catch( e ) {}
	};
	
	var xhrId = 0,
		xhrCallbacks = {},
		xhrSuccessStatus = {
			// file protocol always yields status code 0, assume 200
			0: 200,
			// Support: IE9
			// #1450: sometimes IE returns 1223 when it should be 204
			1223: 204
		},
		xhrSupported = jQuery.ajaxSettings.xhr();
	
	// Support: IE9
	// Open requests must be manually aborted on unload (#5280)
	// See https://support.microsoft.com/kb/2856746 for more info
	if ( window.attachEvent ) {
		window.attachEvent( "onunload", function() {
			for ( var key in xhrCallbacks ) {
				xhrCallbacks[ key ]();
			}
		});
	}
	
	support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
	support.ajax = xhrSupported = !!xhrSupported;
	
	jQuery.ajaxTransport(function( options ) {
		var callback;
	
		// Cross domain only allowed if supported through XMLHttpRequest
		if ( support.cors || xhrSupported && !options.crossDomain ) {
			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;
	
					xhr.open( options.type, options.url, options.async, options.username, options.password );
	
					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}
	
					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}
	
					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers["X-Requested-With"] ) {
						headers["X-Requested-With"] = "XMLHttpRequest";
					}
	
					// Set headers
					for ( i in headers ) {
						xhr.setRequestHeader( i, headers[ i ] );
					}
	
					// Callback
					callback = function( type ) {
						return function() {
							if ( callback ) {
								delete xhrCallbacks[ id ];
								callback = xhr.onload = xhr.onerror = null;
	
								if ( type === "abort" ) {
									xhr.abort();
								} else if ( type === "error" ) {
									complete(
										// file: protocol always yields status 0; see #8605, #14207
										xhr.status,
										xhr.statusText
									);
								} else {
									complete(
										xhrSuccessStatus[ xhr.status ] || xhr.status,
										xhr.statusText,
										// Support: IE9
										// Accessing binary-data responseText throws an exception
										// (#11426)
										typeof xhr.responseText === "string" ? {
											text: xhr.responseText
										} : undefined,
										xhr.getAllResponseHeaders()
									);
								}
							}
						};
					};
	
					// Listen to events
					xhr.onload = callback();
					xhr.onerror = callback("error");
	
					// Create the abort callback
					callback = xhrCallbacks[ id ] = callback("abort");
	
					try {
						// Do send the request (this may raise an exception)
						xhr.send( options.hasContent && options.data || null );
					} catch ( e ) {
						// #14683: Only rethrow if this hasn't been notified as an error yet
						if ( callback ) {
							throw e;
						}
					}
				},
	
				abort: function() {
					if ( callback ) {
						callback();
					}
				}
			};
		}
	});
	
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 44 */
/*!****************************************!*\
  !*** ./~/jquery/src/core/parseHTML.js ***!
  \****************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
		__webpack_require__(/*! ../core */ 6),
		__webpack_require__(/*! ./var/rsingleTag */ 25),
		__webpack_require__(/*! ../manipulation */ 30) // buildFragment
	], __WEBPACK_AMD_DEFINE_RESULT__ = function( jQuery, rsingleTag ) {
	
	// data: string of html
	// context (optional): If specified, the fragment will be created in this context, defaults to document
	// keepScripts (optional): If true, will include scripts passed in the html string
	jQuery.parseHTML = function( data, context, keepScripts ) {
		if ( !data || typeof data !== "string" ) {
			return null;
		}
		if ( typeof context === "boolean" ) {
			keepScripts = context;
			context = false;
		}
		context = context || document;
	
		var parsed = rsingleTag.exec( data ),
			scripts = !keepScripts && [];
	
		// Single tag
		if ( parsed ) {
			return [ context.createElement( parsed[1] ) ];
		}
	
		parsed = jQuery.buildFragment( [ data ], context, scripts );
	
		if ( scripts && scripts.length ) {
			jQuery( scripts ).remove();
		}
	
		return jQuery.merge( [], parsed.childNodes );
	};
	
	return jQuery.parseHTML;
	
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 45 */
/*!********************************************!*\
  !*** ./~/jquery/src/attributes/classes.js ***!
  \********************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
		__webpack_require__(/*! ../core */ 6),
		__webpack_require__(/*! ../var/rnotwhite */ 19),
		__webpack_require__(/*! ../var/strundefined */ 20),
		__webpack_require__(/*! ../data/var/data_priv */ 21),
		__webpack_require__(/*! ../core/init */ 24)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function( jQuery, rnotwhite, strundefined, data_priv ) {
	
	var rclass = /[\t\r\n\f]/g;
	
	jQuery.fn.extend({
		addClass: function( value ) {
			var classes, elem, cur, clazz, j, finalValue,
				proceed = typeof value === "string" && value,
				i = 0,
				len = this.length;
	
			if ( jQuery.isFunction( value ) ) {
				return this.each(function( j ) {
					jQuery( this ).addClass( value.call( this, j, this.className ) );
				});
			}
	
			if ( proceed ) {
				// The disjunction here is for better compressibility (see removeClass)
				classes = ( value || "" ).match( rnotwhite ) || [];
	
				for ( ; i < len; i++ ) {
					elem = this[ i ];
					cur = elem.nodeType === 1 && ( elem.className ?
						( " " + elem.className + " " ).replace( rclass, " " ) :
						" "
					);
	
					if ( cur ) {
						j = 0;
						while ( (clazz = classes[j++]) ) {
							if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
								cur += clazz + " ";
							}
						}
	
						// only assign if different to avoid unneeded rendering.
						finalValue = jQuery.trim( cur );
						if ( elem.className !== finalValue ) {
							elem.className = finalValue;
						}
					}
				}
			}
	
			return this;
		},
	
		removeClass: function( value ) {
			var classes, elem, cur, clazz, j, finalValue,
				proceed = arguments.length === 0 || typeof value === "string" && value,
				i = 0,
				len = this.length;
	
			if ( jQuery.isFunction( value ) ) {
				return this.each(function( j ) {
					jQuery( this ).removeClass( value.call( this, j, this.className ) );
				});
			}
			if ( proceed ) {
				classes = ( value || "" ).match( rnotwhite ) || [];
	
				for ( ; i < len; i++ ) {
					elem = this[ i ];
					// This expression is here for better compressibility (see addClass)
					cur = elem.nodeType === 1 && ( elem.className ?
						( " " + elem.className + " " ).replace( rclass, " " ) :
						""
					);
	
					if ( cur ) {
						j = 0;
						while ( (clazz = classes[j++]) ) {
							// Remove *all* instances
							while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
								cur = cur.replace( " " + clazz + " ", " " );
							}
						}
	
						// Only assign if different to avoid unneeded rendering.
						finalValue = value ? jQuery.trim( cur ) : "";
						if ( elem.className !== finalValue ) {
							elem.className = finalValue;
						}
					}
				}
			}
	
			return this;
		},
	
		toggleClass: function( value, stateVal ) {
			var type = typeof value;
	
			if ( typeof stateVal === "boolean" && type === "string" ) {
				return stateVal ? this.addClass( value ) : this.removeClass( value );
			}
	
			if ( jQuery.isFunction( value ) ) {
				return this.each(function( i ) {
					jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
				});
			}
	
			return this.each(function() {
				if ( type === "string" ) {
					// Toggle individual class names
					var className,
						i = 0,
						self = jQuery( this ),
						classNames = value.match( rnotwhite ) || [];
	
					while ( (className = classNames[ i++ ]) ) {
						// Check each className given, space separated list
						if ( self.hasClass( className ) ) {
							self.removeClass( className );
						} else {
							self.addClass( className );
						}
					}
	
				// Toggle whole class name
				} else if ( type === strundefined || type === "boolean" ) {
					if ( this.className ) {
						// store className if set
						data_priv.set( this, "__className__", this.className );
					}
	
					// If the element has a class name or if we're passed `false`,
					// then remove the whole classname (if there was one, the above saved it).
					// Otherwise bring back whatever was previously saved (if anything),
					// falling back to the empty string if nothing was stored.
					this.className = this.className || value === false ? "" : data_priv.get( this, "__className__" ) || "";
				}
			});
		},
	
		hasClass: function( selector ) {
			var className = " " + selector + " ",
				i = 0,
				l = this.length;
			for ( ; i < l; i++ ) {
				if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
					return true;
				}
			}
	
			return false;
		}
	});
	
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 46 */
/*!*****************************************!*\
  !*** ./~/jquery/src/attributes/attr.js ***!
  \*****************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
		__webpack_require__(/*! ../core */ 6),
		__webpack_require__(/*! ../var/rnotwhite */ 19),
		__webpack_require__(/*! ../var/strundefined */ 20),
		__webpack_require__(/*! ../core/access */ 32),
		__webpack_require__(/*! ./support */ 47),
		__webpack_require__(/*! ../selector */ 28)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function( jQuery, rnotwhite, strundefined, access, support ) {
	
	var nodeHook, boolHook,
		attrHandle = jQuery.expr.attrHandle;
	
	jQuery.fn.extend({
		attr: function( name, value ) {
			return access( this, jQuery.attr, name, value, arguments.length > 1 );
		},
	
		removeAttr: function( name ) {
			return this.each(function() {
				jQuery.removeAttr( this, name );
			});
		}
	});
	
	jQuery.extend({
		attr: function( elem, name, value ) {
			var hooks, ret,
				nType = elem.nodeType;
	
			// don't get/set attributes on text, comment and attribute nodes
			if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
				return;
			}
	
			// Fallback to prop when attributes are not supported
			if ( typeof elem.getAttribute === strundefined ) {
				return jQuery.prop( elem, name, value );
			}
	
			// All attributes are lowercase
			// Grab necessary hook if one is defined
			if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
				name = name.toLowerCase();
				hooks = jQuery.attrHooks[ name ] ||
					( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
			}
	
			if ( value !== undefined ) {
	
				if ( value === null ) {
					jQuery.removeAttr( elem, name );
	
				} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
					return ret;
	
				} else {
					elem.setAttribute( name, value + "" );
					return value;
				}
	
			} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
				return ret;
	
			} else {
				ret = jQuery.find.attr( elem, name );
	
				// Non-existent attributes return null, we normalize to undefined
				return ret == null ?
					undefined :
					ret;
			}
		},
	
		removeAttr: function( elem, value ) {
			var name, propName,
				i = 0,
				attrNames = value && value.match( rnotwhite );
	
			if ( attrNames && elem.nodeType === 1 ) {
				while ( (name = attrNames[i++]) ) {
					propName = jQuery.propFix[ name ] || name;
	
					// Boolean attributes get special treatment (#10870)
					if ( jQuery.expr.match.bool.test( name ) ) {
						// Set corresponding property to false
						elem[ propName ] = false;
					}
	
					elem.removeAttribute( name );
				}
			}
		},
	
		attrHooks: {
			type: {
				set: function( elem, value ) {
					if ( !support.radioValue && value === "radio" &&
						jQuery.nodeName( elem, "input" ) ) {
						var val = elem.value;
						elem.setAttribute( "type", value );
						if ( val ) {
							elem.value = val;
						}
						return value;
					}
				}
			}
		}
	});
	
	// Hooks for boolean attributes
	boolHook = {
		set: function( elem, value, name ) {
			if ( value === false ) {
				// Remove boolean attributes when set to false
				jQuery.removeAttr( elem, name );
			} else {
				elem.setAttribute( name, name );
			}
			return name;
		}
	};
	jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
		var getter = attrHandle[ name ] || jQuery.find.attr;
	
		attrHandle[ name ] = function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {
				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		};
	});
	
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 47 */
/*!********************************************!*\
  !*** ./~/jquery/src/attributes/support.js ***!
  \********************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
		__webpack_require__(/*! ../var/support */ 15)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function( support ) {
	
	(function() {
		var input = document.createElement( "input" ),
			select = document.createElement( "select" ),
			opt = select.appendChild( document.createElement( "option" ) );
	
		input.type = "checkbox";
	
		// Support: iOS<=5.1, Android<=4.2+
		// Default value for a checkbox should be "on"
		support.checkOn = input.value !== "";
	
		// Support: IE<=11+
		// Must access selectedIndex to make default options select
		support.optSelected = opt.selected;
	
		// Support: Android<=2.3
		// Options inside disabled selects are incorrectly marked as disabled
		select.disabled = true;
		support.optDisabled = !opt.disabled;
	
		// Support: IE<=11+
		// An input loses its value after becoming a radio
		input = document.createElement( "input" );
		input.value = "t";
		input.type = "radio";
		support.radioValue = input.value === "t";
	})();
	
	return support;
	
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 48 */
/*!*************************!*\
  !*** ./src/lib/util.js ***!
  \*************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $ = __webpack_require__(/*! $jquery */ 5);
	
	var camelCaseRegEx = /^([A-Z])|[\s-_](\w)/g;
	var usedMessageTypes = function() {
	    return 'environment,user-identification,end-request,begin-request,after-action-invoked,after-action-view-invoked,before-execute-command,after-execute-command,after-view-component';
	}
	var hudScriptElement = document.getElementById('__glimpse_hud');
	    
	module.exports = {
	    localStorage: function (key, value) {
	        if (arguments.length == 1) {
	            return JSON.parse(localStorage.getItem(key));
	        }
	        localStorage.setItem(key, JSON.stringify(value)); 
	    },
	    toCamelCase: function(value) {
	        return value.replace(camelCaseRegEx, function(match, p1, p2, offset) {
	            if (p2) {
	                return p2.toUpperCase();
	            }
	            return p1.toLowerCase();        
	        });
	    },
	    currentRequestId: function() {
	        return hudScriptElement.getAttribute('data-request-id');
	    },
	    resolveClientUrl: function(requestId, follow) {
	        var clientTemplate = hudScriptElement.getAttribute('data-client-template');
	                
	        var params = '&requestId=' + requestId;
	        params += '&metadataUri=' + encodeURIComponent(hudScriptElement.getAttribute('data-metadata-template')); // This happens to be fully resolved already
	        params += follow ? '&follow=true' : '';
	        
	        return clientTemplate.replace('{&requestId,follow,metadataUri}', params); // TODO: This should probably be resolved with a URI Template library
	    },
	    resolveContextUrl: function(requestId) {
	        var contextTemplate = hudScriptElement.getAttribute('data-context-template');
	        
	        var params = requestId + '&types=' + usedMessageTypes()
	        
	        var uri = contextTemplate.replace('{contextId}{&types}', params); // TODO: This should probably be resolved with a URI Template library
	        return encodeURI(uri);
	    },
	    isLocalUri: function(uri) {
	        return uri && (!(uri.indexOf('http://') == 0 || uri.indexOf('https://') == 0 || uri.indexOf('//') == 0) || 
	                (uri.substring(uri.indexOf('//') + 2, uri.length) + '/').indexOf(window.location.host + '/') == 0);
	    },
	    htmlEncode: function (value) {
	        return !(value == null) ? value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;') : '';
	    }
	};

/***/ },
/* 49 */
/*!**********************!*\
  !*** ./src/state.js ***!
  \**********************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var util = __webpack_require__(/*! lib/util.js */ 48);
	
	module.exports = { 
		setup: function (holder) {
			// find the inputs and as selected, make sure we are synced with local storage
			var inputs = holder.find('.glimpse-hud-section-input').change(function() {
				var state = [];
				inputs.each(function() { state.push(this.checked); });
				util.localStorage('glimpseHudDisplay', state);
			});
		},
		current: function () {
			// get out the array stored which represents current state
			return util.localStorage('glimpseHudDisplay') || [];
		}
	};

/***/ },
/* 50 */
/*!***************************!*\
  !*** ./src/repository.js ***!
  \***************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $ = __webpack_require__(/*! $jquery */ 5);
	var util = __webpack_require__(/*! lib/util */ 48);
	var messageProcessor = __webpack_require__(/*! ./util/request-message-processor */ 51);
	
	var process = (function() {
		var getIndex = function(messages) {
			var index = {}
			for (var i = 0; i < messages.length; i++) {
				var message = messages[i];
				for (var x = 0; x < message.types.length; x++) {
					var type = message.types[x];
					if (!index[type]) {
						index[type] = [];
					}
					index[type].push(message);
				}
			}
			
			return index;
		};
		var getPayload = function(index) {
			var processItem = messageProcessor.getTypePayloadItem;
			var processList = messageProcessor.getTypePayloadList;
			var messageList = messageProcessor.getTypeMessageList;
			
			return messageProcessor.getTypeStucture(index, {
				'begin-request': processItem,
				'environment': processItem,
				'user-identification': processItem,
				//'browser-navigation-timing': processItem,
				'after-action-invoked': processItem,
				'after-action-view-invoked': processItem,
				'before-execute-command': messageList,
				'after-execute-command': messageList,
				'after-view-component': processList,
				'end-request': processItem
			});
		}
		
	 	var getModel = (function() {
			var add = function(model, item, name) {
				model[name] = {
					'data': item,
					'name': name	
				};
			}
			
			var strategies = {
				environment: function(payload) {
					var environment = payload.environment || {};
					var userIdentification = payload.userIdentification || {};
					
					var result = {};
					result.serverName = environment.serverName;
					result.serverTime = environment.serverTime;
					result.serverTimezoneOffset = environment.serverTimezoneOffset;
					result.serverDaylightSavingTime = environment.serverDaylightSavingTime;
					result.user = !userIdentification.isAnonymous ? userIdentification.username : null;
					
					return result;
				},
				mvc: function(payload) {
					var afterActionInvoked = payload.afterActionInvoked || {};
					var afterActionViewInvoked = payload.afterActionViewInvoked || {};
					
					var result = {};
					result.actionName = afterActionInvoked.actionName;
					result.controllerName = afterActionInvoked.actionControllerName;
					result.actionExecutionTime = afterActionInvoked.actionInvokedDuration;
					result.viewRenderTime = afterActionViewInvoked.viewDuration;
					// result.viewName = '';
					// result.childActionCount = 0;
					// result.childViewCount = 0;
					// result.matchedRouteName = 0;
					
					return result;
				},
				sql: function(payload) {
					var afterExecuteCommand = payload.afterExecuteCommand || [];
					
					var result = {};
					result.queryCount = afterExecuteCommand.length;
					// result.connectionCount = 0;
					// result.transactionCount = 0;
					// result.connectionOpenTime = 0;
					result.queryExecutionTime = 0;
					for (var i = 0; i < afterExecuteCommand.length; i++) {
						result.queryExecutionTime += afterExecuteCommand[i].payload.commandDuration;
					}
					
					return result;
				},
				request: function(payload) { 
					var beginRequest = payload.beginRequest || {};
					var endRequest = payload.endRequest || {};
					//var browserNavigationTiming = payload.browserNavigationTiming || {};
					
					var result = {};
					result.requestMethod = beginRequest.requestMethod;
					result.requestUrl = beginRequest.requestUrl;
					result.requestPath = beginRequest.requestPath;
					result.requestQueryString = beginRequest.requestQueryString;
					result.responseContentLength = endRequest.responseContentLength;
					result.responseContentType = endRequest.responseContentType;
					result.responseStatusCode = endRequest.responseStatusCode;
					result.responseStatusText = endRequest.responseStatusText;
					result.responseDuration = endRequest.responseDuration;
					
					return result;
				},
				timings: function(payload) {
					var afterActionInvoked = payload.afterActionInvoked || {};
					var afterActionViewInvoked = payload.afterActionViewInvoked || {};
					var beforeExecuteCommand = payload.beforeExecuteCommand || [];
					var afterExecuteCommand = payload.afterExecuteCommand || [];
					var afterViewComponent = payload.afterViewComponent || [];
					
					var result = [];
					result.push({
						title: 'Controller: ' + afterActionInvoked.actionControllerName + '.' + afterActionInvoked.actionName,
						startTime: 'NOT SET',
						duration: afterActionInvoked.actionInvokedDuration,
						startPoint: afterActionInvoked.actionInvokedOffset,
						category: 'Controller'
					});
					result.push({
						title: 'Render: ' + afterActionInvoked.actionControllerName + '.' + afterActionInvoked.actionName,
						startTime: 'NOT SET',
						duration: afterActionViewInvoked.viewDuration,
						startPoint: afterActionViewInvoked.viewOffset,
						category: 'View'
					});
					for (var i = 0; i < afterViewComponent.length; i++) {
						var component = afterViewComponent[i];
						result.push({
							title: 'Component: ' + component.componentName,
							startTime: component.componentEndTime,
							duration: component.componentDuration,
							startPoint: component.componentOffset,
							category: 'Controller'
						});
					}	
					afterExecuteCommand = afterExecuteCommand.sort(function(a, b) { return a.ordinal - b.ordinal; });
					beforeExecuteCommand = beforeExecuteCommand.sort(function(a, b) { return a.ordinal - b.ordinal; });
					for (var i = 0; i < afterExecuteCommand.length; i++) {
						var afterCommand = afterExecuteCommand[i].payload;
						var beforeCommand = beforeExecuteCommand[i].payload;
						result.push({
							title: 'Command: ' + beforeCommand.commandMethod,
							startTime: afterCommand.commandEndTime,
							duration: afterCommand.commandDuration,
							startPoint: afterCommand.commandOffset,
							category: 'Command'
						});
					}		
					
					result = result.sort(function(a, b) { return (a.startPoint || 0) - (b.startPoint || 0); });	
					
					return result;
				}
			};
			
			return function(payload) {
				var model = {};
				add(model, strategies.environment(payload), 'environment');
				add(model, strategies.mvc(payload), 'mvc');
				add(model, strategies.sql(payload), 'sql');
				add(model, strategies.request(payload), 'request');
				add(model, strategies.timings(payload), 'timings');
				
				return model;
			};
		})();
	
		return function(messages) {
			var index = getIndex(messages);
			var payload = getPayload(index);
			var model = getModel(payload);
			
			return model;
		};
	})();
	
	var getData = function(callback) {
		$.getJSON(util.resolveContextUrl(util.currentRequestId()), null, function(data) {
			var model = process(data);
			callback(model);
		});
	}
	
	module.exports = {
		getData: getData
	};

/***/ },
/* 51 */
/*!***********************************************!*\
  !*** ./src/util/request-message-processor.js ***!
  \***********************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var util = __webpack_require__(/*! lib/util.js */ 48);
	
	module.exports = {
		getTypeStucture: function(index, typeOptions) {
			var result = {};
			for (var key in typeOptions) {
				var callback = typeOptions[key];
				result[util.toCamelCase(key)] = callback(index, key)
			}
			
			return result;
		},
		getTypePayloadItem: function(index, type) {
			var messages = index[type]; 
			if (messages) {
				return messages[0].payload;
			}
		},
		getTypePayloadList: function(index, type) {
			var messages = index[type]; 
			if (messages) {
				return messages.map(function(message) { return message.payload; });
			}
		},
		getTypeMessageItem: function(index, type) {
			var messages = index[type]; 
			if (messages) {
				return messages[0];
			}
		},
		getTypeMessageList: function(index, type) {
			var messages = index[type]; 
			if (messages) {
				return messages;
			}
		}
	};

/***/ },
/* 52 */
/*!*********************************!*\
  !*** ./src/sections/section.js ***!
  \*********************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _sections = [];
	
	var register = function(section) {
		_sections.push(section);
	}
	var render = function(details, state) {
		var html = '';
		for (var i = 0; i < _sections.length; i++) {
			html += _sections[i].render(details, state[i]);
		}
		return html;
	}
	var postRender = function(holder, details) {
		for (var i = 0; i < _sections.length; i++) {
			if (_sections[i].postRender) {
				_sections[i].postRender(holder, details);
			}
		}
	}
	
	module.exports = {
		register: register,
	    render: render,
	    postRender: postRender
	};
	
	// TODO: Need to come up with a better self registration process
	__webpack_require__(/*! ./section-http */ 53);
	__webpack_require__(/*! ./section-host */ 56);
	__webpack_require__(/*! ./section-ajax */ 57);


/***/ },
/* 53 */
/*!**************************************!*\
  !*** ./src/sections/section-http.js ***!
  \**************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var rendering = __webpack_require__(/*! ./util/rendering */ 54);
	var process = __webpack_require__(/*! ./util/process */ 55);
	var $ = __webpack_require__(/*! $jquery */ 5);
	
	var timingsRaw = (window.performance || window.mozPerformance || window.msPerformance || window.webkitPerformance || {}).timing;
	var timingIncomplete = false;
	
	var structure = {
		title: 'HTTP',
		id: 'http', 
		color: '#e2875e',
		popup: {
			render: function(details) {
				var requestDetails = details.request.data,
					html = '<div class="glimpse-hud-popup-header">Browser Request</div>';
				html += '<div><div class="glimpse-hud-summary-left">' + rendering.item(structure.layout.popup.request, details) + '</div>';
				html += '<table class="glimpse-hud-summary glimpse-hud-summary-right"><tr><td width="1" class="glimpse-hud-listing-overflow">' + rendering.item(structure.layout.popup.host, details) + '</td></tr><tr><td class="glimpse-hud-listing-overflow">' + rendering.item(structure.layout.popup.principal, details)  + '</td></tr></table></div>';
				html += '<div class="glimpse-hud-popup-clear"></div>';
				html += '<div class="glimpse-data-request-parts"><table><tr><td colspan="3"><div class="glimpse-hud-bar glimpse-hud-tooltips-non"><div><div class="glimpse-hud-bar-item" style="width: 100%;background-color: ' + requestDetails.browser.categoryColor + '"></div><div class="glimpse-hud-bar-item glimpse-hud-bar-item-server" style="width: ' + (requestDetails.server.percentage + requestDetails.network.percentage) + '%;background-color: ' + requestDetails.server.categoryColor + ';"></div><div class="glimpse-hud-bar-item glimpse-hud-bar-item-network" style="width: ' + requestDetails.network.percentage + '%;background-color: ' + requestDetails.network.categoryColor + ';"></div></div></div></td></tr><tr><td class="glimpse-data-wire-part">' + rendering.item(structure.layout.popup.wire, details) + '</td><td class="glimpse-data-server-part">' + rendering.item(structure.layout.popup.server, details) + '</td><td class="glimpse-data-client-part">' + rendering.item(structure.layout.popup.client, details) + '</td></tr></table></div>'; 
	
				return html;
			}
		},
		defaults: {
			request: { title: 'Request', description: 'Total request time from click to dom ready', visible: true, size: 1, position: 0, align: 0, postfix: 'ms', getData: function(details) { return details.request.data.total.duration; }, id: 'glimpse-hud-data-request' },
			wire: { title: 'Network', description: 'Total time on the network', visible: true, size: 2, position: 0, align: 0, postfix: 'ms', getData: function(details) { var duration = details.request.data.network.duration; return duration === null ? '...' : duration; }, id: 'glimpse-hud-data-network' },
			server: { title: 'Server', description: 'Total time on the server', visible: true, size: 2, position: 0, align: 0, postfix: 'ms', getData: function(details) { return details.request.data.server.duration; }, id: 'glimpse-hud-data-server' },
			client: { title: 'Client', description: 'Total time in browser (to load)', visible: true, size: 2, position: 0, align: 0, postfix: 'ms', getData: function(details) { var duration = details.request.data.browser.duration; return duration === null ? '...' : duration; }, id: 'glimpse-hud-data-client' }, 
			host: { title: 'Host', description: 'Server that responded to the request', visible: true, size: 2, position: 1, align: 1, postfix: '', getLayoutData: function(details) { return '<div class="glimpse-hud-listing-overflow" style="max-width:170px;">' + details.environment.data.serverName + '</div>'; } }, 
			principal: { title: 'Principal', description: 'Principal that is currently logged in for this session', visible: function(details) { return details.environment.data.user; }, size: 2, position: 1, align: 1, postfix: '', getLayoutData: function(details) { return '<div class="glimpse-hud-listing-overflow" style="max-width:120px;">' + details.environment.data.user + '</div>'; } }
		},
		layout: {
			mini: {
				request: {},
				wire: {},
				server: {},
				client: {}
			},
			popup: {
				request: { title: 'Total Request Time', size: 0, position: 1, align: 1 },
				wire: { position: 1, align: 1 },
				server: { position: 1, align: 1 },
				client: { position: 1, align: 1 },
				host: { },
				principal: { }
			}
		}
	};
	
	var calculateTimings = function(timingsRaw, startIndex, finishIndex) { 
		return timingsRaw[finishIndex] - timingsRaw[startIndex];
	};
	var getTimings = function(details, timingsRaw) {
		var network = calculateTimings(timingsRaw, 'responseStart', 'responseEnd') + calculateTimings(timingsRaw, 'navigationStart', 'requestStart'),
			server = calculateTimings(timingsRaw, 'requestStart', 'responseEnd'),
			browser = calculateTimings(timingsRaw, 'responseStart', 'loadEventEnd'),
			total = calculateTimings(timingsRaw, 'navigationStart', 'loadEventEnd');
			
		// trying to avoid negitive values showing up
		if (server <= 0) {
			server = praseInt(details.request.data.responseDuration);
		}
		if (network < 0 || browser < 0) {
			if (network < 0) {
				network = 0;
			}
			if (browser < 0) {
				browser = 0;
			}
			timingIncomplete = true;
		}
		else {
			timingIncomplete = false;
		}
		
		return { network: network, server: server, browser: browser, total: total };
	};
	var processTimings = function(details, timingsRaw) {
		var timing = getTimings(details, timingsRaw),
			result = {
				network: { categoryColor: '#FDBF45', duration: timing.network === 0 ? null : timing.network, percentage: (timing.network / timing.total) * 100 },
				server: { categoryColor: '#AF78DD', duration: timing.server, percentage: (timing.server / timing.total) * 100 },
				browser: { categoryColor: '#72A3E4', duration: timing.browser === 0 ? null : timing.browser, percentage: (timing.browser / timing.total) * 100 },
				total: { categoryColor: '#10E309', duration: timing.total, percentage: 100 }
			};
			
		details.request = { data: result, name: 'Request' };
	};
		
	var render = function(details, opened) {
		var html = '';
		
		if (timingsRaw) {
			process.init(structure);
			processTimings(details, timingsRaw); 
			
			html = rendering.section(structure, details, opened); 
		}
	
		return html;
	};
	var postRender = function(holder, details) {
		if (timingIncomplete) {
			tryUpdateBrowserData(details);
		}
	};
	
	var tryUpdateBrowserData = function(details) {
		var timing = getTimings(details, timingsRaw);
		if (timingIncomplete) {
			setTimeout(function() { tryUpdateBrowserData(details); }, 100)
		}
		else {
			updateBrowserData(details, timing);
		}
	};
	var updateBrowserData = function(details, timing) {
		var data = details.request.data;
		
		// adjust timings
		data.network.duration = timing.network;
		data.browser.duration = timing.browser;
		data.server.duration = timing.server;
		data.total.duration = timing.total;
		
		// adjust percentage
		data.browser.percentage = (data.browser.duration / data.total.duration) * 100;
		data.server.percentage = (data.server.duration / data.total.duration) * 100;
		data.network.percentage = (data.network.duration / data.total.duration) * 100;
		
		// manually update the dom
		$('.glimpse-hud-data-network .glimpse-hud-data').text(data.network.duration);
		$('.glimpse-hud-data-client .glimpse-hud-data').text(data.browser.duration);
		$('.glimpse-hud-data-server .glimpse-hud-data').text(data.server.duration);
		$('.glimpse-hud-data-request .glimpse-hud-data').text(data.total.duration);
		
		$('.glimpse-hud-bar-item-server').attr('style', 'background-color: ' + data.server.categoryColor + ';width:' + (data.server.percentage + data.network.percentage) + '%');
		$('.glimpse-hud-bar-item-network').attr('style', 'background-color: ' + data.network.categoryColor + ';width:' + data.network.percentage + '%');
	}
	
	module.exports = {
		render: render,
		postRender: postRender
	};
	
	// TODO: Need to come up with a better self registration process
	(function () {
	    var section = __webpack_require__(/*! sections/section */ 52);
	
	    section.register(module.exports);
	})();

/***/ },
/* 54 */
/*!****************************************!*\
  !*** ./src/sections/util/rendering.js ***!
  \****************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $ = __webpack_require__(/*! $jquery */ 5);
	
	var sizes = [ 'extra-large', 'large', 'normal', 'small', 'extra-small' ];
	var position = [ 'top', 'bottom', 'left', 'right' ];
	var align = [ 'left', 'right' ];
	
	var shouldUse = function(isVisible, details) {
		if (isVisible !== undefined && isVisible) {
			var isFunction = $.isFunction(isVisible);
			return (isFunction && isVisible(details)) || (!isFunction && isVisible);
		}
		return true;
	};
	var popup = function(structure, details) {
		return '<div class="glimpse-hud-popup" style="border-color:' + structure.color + ';"><label class="glimpse-hud-title" for="glimpse-hud-section-input-' + structure.id + '"><span>' + structure.title + '</span></label><div class="glimpse-hud-popup-inner">' + structure.popup.render(details) + '</div></div><div class="glimpse-hud-popup-expander"></div>';
	};
	var section = function(structure, details, opened) {
		var html = '<div class="glimpse-hud-section glimpse-hud-section-' + structure.id + '" style="border-color:' + structure.color + '">';
		
		html += '<label class="glimpse-hud-title" for="glimpse-hud-section-input-' + structure.id + '"><span>' + structure.title + '</span></label><input type="checkbox" class="glimpse-hud-section-input" id="glimpse-hud-section-input-' + structure.id + '"' + (opened ? ' checked="checked"' : '') + ' />';
		html += '<div class="glimpse-hud-section-inner">';  
		for (var key in structure.layout.mini) {
			html += item(structure.layout.mini[key], details);
		}
		html += '</div>';
		
		if (!structure.popup.suppress) { html += popup(structure, details); }
		
		return html + '</div>';
	};
	var item = function(item, details) {
		var html = '';
		if (shouldUse(item.visible, details)) {
			var title = '<div class="glimpse-hud-header">' + item.title + '</div>',
				postfix = item.postfix ? '<span class="glimpse-hud-postfix">' + item.postfix + '</span>' : '',
				value = item.getLayoutData ? item.getLayoutData(details) : '<span class="glimpse-hud-data">' + item.getData(details) + '</span>' + postfix,
				id = item.id ? ' ' + item.id : '';
			
			html += item.getLayout ? item.getLayout(details) : '<div class="glimpse-hud-detail glimpse-hud-detail-' + sizes[item.size] + ' glimpse-hud-detail-position-' + position[item.position] + ' glimpse-hud-detail-align-' + align[item.align] + id + '" title="' + item.description + '">' + (item.position % 2 == 0 ? title : '') + '<div class="glimpse-hud-value">' + value + '</div>' + (item.position % 2 == 1 ? title : '') + '</div>';
		}
	
		return html;
	};
	
	module.exports = {
		section: section,
		item: item,
		popup: popup
	};

/***/ },
/* 55 */
/*!**************************************!*\
  !*** ./src/sections/util/process.js ***!
  \**************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $ = __webpack_require__(/*! $jquery */ 5);
	
	var item = function(layout, defaults) {
		for (var key in layout) {
			layout[key] = $.extend(true, {}, defaults[key], layout[key]);
		}
	};
	
	module.exports = {
		init: function(payload) {
			item(payload.layout.mini, payload.defaults);
			item(payload.layout.popup, payload.defaults);
		}
	};

/***/ },
/* 56 */
/*!**************************************!*\
  !*** ./src/sections/section-host.js ***!
  \**************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $ = __webpack_require__(/*! $jquery */ 5);
	
	var rendering = __webpack_require__(/*! ./util/rendering */ 54);
	var process = __webpack_require__(/*! ./util/process */ 55);
	
	var getTimeValue = function(value) {
	    return value < 1 ? '<span class="glimpse-hud-prefix-super">&lt;</span>1' : value;
	};
	
	var structure = {
	    title: 'Host',
	    id: 'host', 
	    color: '#6161e0',
	    popup: {
	        render: function(details) {
	            var hasTrivial = false,
	                html = '<div class="glimpse-hud-popup-header">Server Side</div>';
	            html += '<div><div style="position: absolute; right: 0; margin-right: 16px;">' + rendering.item(structure.layout.popup.time, details) + '</div><table class="glimpse-hud-summary glimpse-hud-summary-space glimpse-hud-summary-left"><tr><th>' + (rendering.item(structure.layout.popup.action, details) || rendering.item(structure.layout.popup.loading, details)) + '</th></tr><tr><td>' + (rendering.item(structure.layout.popup.controller, details) || rendering.item(structure.layout.popup.viewStateSize, details)) + '</td></tr></table>';
	            html += '<table class="glimpse-hud-summary glimpse-hud-summary-space glimpse-hud-summary-right"><tr><td width="1">' + (rendering.item(structure.layout.popup.view, details) || rendering.item(structure.layout.popup.rendering, details)) + '</td>' + (details.sql ? '<td width="60"></td><td>' + rendering.item(structure.layout.popup.queries, details) + '</td>' : '') + '</tr><tr><td>' + rendering.item(structure.layout.popup.server, details) + '</td>' + (details.sql ? '<td></td><td>' + rendering.item(structure.layout.popup.connections, details) + '</td>' : '') + '</tr></table></div>';
	            html += '<div class="glimpse-hud-popup-clear"></div>'; 
	            html += '<table class="glimpse-hud-listing" style="table-layout:fixed;"><thead><tr><th></th><th class="glimpse-hud-listing-value glimpse-data-childless-duration">duration (ms)</th><th class="glimpse-hud-listing-value glimpse-data-childless-start-point">from start (ms)</th></tr></thead>';  
	            for (var i = 0; i < details.timings.data.length; i++) {
	                var item = details.timings.data[i],
	                    isTrivial = false;
	                    // TODO: need to put this back in at some point
	                    //isTrivial = item.duration < 2;
	                
	                if (!item.suppress) {
	                    var maxLength = (16 + (details.sql ? 10 : 0)) - item.nesting * 2;
	                    
	                    var rowClass = '';
	                    if (item.id || isTrivial) {
	                        rowClass = ' class="' + (item.id ? item.id : '' ) + (isTrivial ? ' glimpse-hud-quite' : '') + '"';
	                    }
	                    
	                    html += '<tbody' + (isTrivial ? ' class="glimpse-data-trivial"' : '') + '>';
	                    html += '<tr' + rowClass + '><td class="glimpse-hud-listing-overflow" style="padding-left:' + (item.nesting * 15) + 'px;" ' + (item.description.length > maxLength ? 'title="' + item.description + '"' : '') +'>' + item.description + '</td><td class="glimpse-hud-listing-value glimpse-data-childless-duration glimpse-hud-data">' + item.duration + '</td><td class="glimpse-hud-listing-value glimpse-data-childless-start-point"><span class="glimpse-hud-prefix">+</span>' + item.startPoint + '</td></tr>';
	                    if (item.queries && item.queries.listing.length > 0) {
	                        html += '<tr><td class="glimpse-data-query-summary" style="padding-left:' + ((item.nesting * 15) + 20) + 'px;"><span class="glimpse-hud-prefix">➥</span><span class="glimpse-hud-listing-value">' + item.queries.listing.length + '</span><span class="glimpse-hud-postfix">' + (item.queries.listing.length == 1 ? 'query' : 'queries') + '</span> <span class="glimpse-hud-listing-value">' + item.queries.durationSum.toFixed(2) + '</span><span class="glimpse-hud-postfix">ms</span></td><td></td><td></td></tr>';
	                    }
	                    html += '</tbody>';
	                    if (isTrivial) { hasTrivial = true; }
	                }
	            }    
	            html += '</table>';
	            if (hasTrivial) {
	                html += '<div class="glimpse-hud-controls"><span class="glimpse-control-trivial">Show Trivial</span><span class="glimpse-control-trivial" style="display:none">Hide Trivial</span></div>';
	            }
	
	            return html;
	        }
	    },
	    defaults: {
	        server: { title: 'Server Time', description: 'Total time on the server', visible: function(details) { return details.request; }, size: 1, position: 1, align: 1, postfix: 'ms', getData: function (details) { return details.request.data.server.duration; }, id: 'glimpse-hud-data-server' },
	        action: { title: 'Action', description: 'How long root Action took to execute', visible: function(details) { return details.mvc && details.mvc.data && details.mvc.data.actionExecutionTime != null; }, size: 1, position: 0, align: 0, postfix: 'ms', getData: function(details) { return getTimeValue(parseInt(details.mvc.data.actionExecutionTime)); } },
	        view: { title: 'View', description: 'How long root View took to render', visible: function(details) { return details.mvc && details.mvc.data && details.mvc.data.viewRenderTime != null; }, size: 1, position: 0, align: 0, postfix: 'ms', getData: function(details) { return getTimeValue(parseInt(details.mvc.data.viewRenderTime)); } },
	        controller: { title: 'Controller/Action', description: 'Name of the root Controller and Action', visible: function(details) { return details.mvc && details.mvc.data; }, size: 2, position: 0, align: 0, postfix: 'ms', getLayoutData: function(details) { return '<span class="glimpse-hud-data">' + details.mvc.data.controllerName + '</span><span class="glimpse-hud-plain">.</span><span class="glimpse-hud-data">' + details.mvc.data.actionName + '</span><span class="glimpse-hud-plain">(...)</span>'; } },
	        queries: { title: 'DB Queries', description: 'Total query duration and number of all SQL queries', visible: function(details) { return details.sql && details.sql.data; }, size: 1, position: 0, align: 0, getLayoutData: function(details) { return '<span class="glimpse-hud-data">' + parseInt(details.sql.data.queryExecutionTime) + '</span><span class="glimpse-hud-postfix">ms</span><span class="glimpse-hud-spacer">/</span><span class="glimpse-hud-data">'  + details.sql.data.queryCount + '</span>'; } },
	        connections: { title: 'DB Connections', description: 'Total connection open time and number of all SQL connections used', visible: function (details) { return details.sql && details.sql.data && details.sql.data.connectionCount; }, size: 1, position: 1, align: 1, getLayoutData: function (details) { return '<span class="glimpse-hud-data">' + parseInt(details.sql.data.connectionOpenTime) + '</span><span class="glimpse-hud-postfix">ms</span><span class="glimpse-hud-spacer">/</span><span class="glimpse-hud-data">' + details.sql.data.connectionCount + '</span>'; } },
	        time: { title: 'Server Time', description: 'Time on the server', visible: function (details) { return details.environment && details.environment.data; }, size: 4, position: 2, align: 1, getLayoutData: function (details) { var diff = parseInt((new Date(details.environment.data.serverTime + ' ' + details.environment.data.serverTimezoneOffset) - new Date()) / 1000 / 60 / 60); return '<span class="glimpse-hud-data">' + details.environment.data.serverTime + '</span> <span class="glimpse-hud-prefix" title="Coordinated Universal Time">UTC</span><span class="glimpse-hud-data">' + details.environment.data.serverTimezoneOffset + '</span> ' + (details.environment.data.serverDaylightSavingTime ? ' <span class="glimpse-hud-plain">(</span><span class="glimpse-hud-data">w/DLS</span><span class="glimpse-hud-plain">)</span>' : '') + (diff ? '<span class="glimpse-hud-spacer"> </span><span title="Time difference between server and client"><span class="glimpse-hud-prefix">Δ</span><span class="glimpse-hud-data glimpse-hud-data-important">' + (diff > 0 ? '+' : '') + diff + '</span></span>' : ''); } },
	        viewStateSize: { title: 'ViewState', description: 'Size of your page ViewState', visible: function (details) { return details.webforms && details.webforms.data; }, size: 1, position: 0, align: 0, postfix: 'bytes', getData: function (details) { var viewstate; return (viewstate = $('#__VIEWSTATE').val()) ? viewstate.length : 0; } },
	        loading: { title: 'Load', description: 'Time between Begin PreLoad and End LoadComplete', visible: function (details) { return details.webforms && details.webforms.data && details.webforms.data.loadingTime != null; }, size: 1, position: 0, align: 0, postfix: 'ms', getData: function (details) { return parseInt(details.webforms.data.loadingTime); } },
	        rendering: { title: 'Render', description: 'Time between Begin PreRender and End Render (including SaveState events)', visible: function (details) { return details.webforms && details.webforms.data && details.webforms.data.renderingTime != null; }, size: 1, position: 0, align: 0, postfix: 'ms', getData: function (details) { return parseInt(details.webforms.data.renderingTime); } },
	    },
	    layout: {
	        mini: {
	            action: {},
	            view: {},
	            controller: {},
	            loading: {},
	            rendering: {},
	            viewStateSize: {},
	            queries: {}
	        },
	        popup: {
	            server: {},
	            action: { title: 'Total Action Time', position: 1, align: 1, size: 0 },
	            view: { title: 'Render View', position: 1, align: 1 },
	            controller: { position: 1, align: 1 },
	            queries: { position: 1, align: 1 },
	            connections: {},
	            time: {},
	            viewStateSize: { title: 'ViewState Size', position: 1, align: 1, size: 2 },
	            loading: { title: 'Total Loading Time', position: 1, align: 1, size: 0 },
	            rendering: { title: 'Rendering Page', position: 1, align: 1 }
	        }
	    }
	};
	
	var processEvents = function(details) {
	    var eventStack = [], 
	        lastEvent = { startPoint : 0, duration : 0, childlessDuration : 0, endPoint : 0 },
	        lastControllerEvent = { },
	        rootDuration = details.request ? details.request.data.server.duration : 1,
	        rootChildlessDuration = rootDuration;
	
	    details.timings.data.unshift({
	        category: 'Request',
	        title: 'Request: ' + (window.location.pathname + window.location.search),
	        duration: rootDuration,
	        startPoint: 0,
	        startTime: 'NOT SURE',
	        id: 'glimpse-hud-data-server'
	    });
	    
	    for (var i = 0; i < details.timings.data.length; i += 1) {
	        var event = details.timings.data[i],
	            topEvent = eventStack.length > 0 ? eventStack[eventStack.length - 1] : null, 
	            left = (event.startPoint / rootDuration) * 100,  
	            width = (event.duration / rootDuration) * 100, 
	            stackParsed = false;
	
	        event.endPoint = parseFloat((event.startPoint + event.duration).toFixed(2));
	
	        //Work out how queries are to be parsed
	        if (event.category == "Controller" || event.category == "Request" || event.category == "Webforms") {
	            lastControllerEvent = event;
	            lastControllerEvent.queries = { durationSum: 0, listing: [] };
	        }
	        else if (event.category == "Command" && lastControllerEvent.queries) { 
	            lastControllerEvent.queries.listing.push(event);
	            lastControllerEvent.queries.durationSum += event.duration;
	            event.suppress = true;
	        }
	
	        //Derive event nesting  
	        while (!stackParsed) {
	            if (event.startPoint > lastEvent.startPoint && event.endPoint <= lastEvent.endPoint) { 
	                eventStack.push(lastEvent); 
	                stackParsed = true;
	            }
	            else if (topEvent != null && topEvent.endPoint < event.endPoint) {
	                eventStack.pop(); 
	                topEvent = eventStack.length > 0 ? eventStack[eventStack.length - 1] : null; 
	                stackParsed = false;
	            }
	            else 
	                stackParsed = true; 
	        }
	
	        //Work out childless timings 
	        var temp = eventStack.length > 0 ? eventStack[eventStack.length - 1] : undefined; 
	        if (temp) {
	            temp.childlessDuration = parseFloat((temp.childlessDuration - event.duration).toFixed(2));
	        } 
	
	        //Work out root childless timings 
	        if (eventStack.length == 0)
	            rootChildlessDuration -= event.duration;
	
	        //Save calculate data
	        event.duration = event.duration;
	        event.childlessDuration = event.duration;
	        event.startPercent = left;
	        event.endPercent = left + width;
	        event.widthPercent = width;
	        event.nesting = eventStack.length + 1; 
	        event.description = event.title; 
	
	        lastEvent = event;
	    }
	};
	
	var render = function(details, opened) {
	    var html = '';
	    //Only checking MVC/Webforms as we can't show just SQL very well
	    if ((details.mvc && details.mvc.data) || (details.webforms && details.webforms.data)) {
	        process.init(structure); 
	        processEvents(details);
	        html = rendering.section(structure, details, opened); 
	    }
	
	    return html;
	};
	var postRender = function() {
	    $('.glimpse-hud .glimpse-control-trivial').click(function() { $('.glimpse-hud .glimpse-control-trivial, .glimpse-hud .glimpse-data-trivial').toggle(); });
	};
	                    
	module.exports = {
	    render: render,
	    postRender: postRender
	};
	
	// TODO: Need to come up with a better self registration process
	(function () {
	    var section = __webpack_require__(/*! sections/section */ 52);
	
	    section.register(module.exports);
	})();

/***/ },
/* 57 */
/*!**************************************!*\
  !*** ./src/sections/section-ajax.js ***!
  \**************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $ = __webpack_require__(/*! $jquery */ 5);
	
	var rendering = __webpack_require__(/*! ./util/rendering */ 54);
	var process = __webpack_require__(/*! ./util/process */ 55);
	var util = __webpack_require__(/*! lib/util */ 48);
	
	var count = 0;
	var summaryStack = [];
	var detailStack = [];
	var structure = {
		title: 'Ajax',
		id: 'ajax',
		color: '#559fdf',
		popup: {
			suppress: true,
			render: function(details) {
				var html = '<div class="glimpse-hud-popup-header">Ajax Requests</div>';
				html += '<div>' + rendering.item(structure.layout.popup.requests, details) + '</div>';
				html += '<div class="glimpse-hud-popup-clear"></div>';
				html += '<table style="table-layout:fixed;" class="glimpse-hud-listing glimpse-data-ajax-detail"><thead><tr><th class="glimpse-data-content-method"></th><th></th><th class="glimpse-hud-listing-value glimpse-data-duration">duration (ms)</th><th class="glimpse-hud-listing-value glimpse-data-size">size (kb)</th></tr></thead>';
				html += '</table>';
	
				return html;
			}
		},
		defaults: {
			requests: { title: 'Count', id: 'glimpse-data-ajax-count', description: 'Total Ajax requests detected on this page', visible: true, size: 1, position: 0, align: 0, getData: function(details) { return 0; } }
		},
		layout: {
			mini: {
				requests: { }
			},
			popup: {
				requests: { title: 'Total Ajax Requests', size: 0, position: 1, align: 1 }
			}
		}
	};
	
	var processContentType = function(type) {
		return type ? type.substring(0, type.indexOf(';')) : '--';
	};
	var processSize = function(size) {
		return size ? (Math.round((size / 1024) * 10) / 10) : '--';
	}
	var update = function(method, uri, duration, size, status, statusText, time, contentType, requestId) {
		//Add it when needed
		if (count == 0) {
			var section = $('.glimpse-hud-section-ajax');
			section.find('.glimpse-hud-section-inner').append('<div class="glimpse-hud-detail glimpse-hud-detail-small glimpse-hud-listing glimpse-data-ajax-summary"></div>');
			section.append(rendering.popup(structure, { }));
			
			section.find('.glimpse-data-ajax-detail').on('click', '.glimpse-ajax-link', function () {
				window.open(util.resolveClientUrl($(this).attr('data-requestId')), 'GlimpseClient');
			});
		}
	
		//Set the counter
		var counter = $('.glimpse-data-ajax-count .glimpse-hud-data').text(++count).addClass('glimpse-hud-value-update');
		setTimeout(function() {
			counter.removeClass('glimpse-hud-value-update');
		}, 2000);
			
		//Update data records
		var rowClass = (status == 304 ? ' glimpse-hud-quite' : !(status >= 200 && status < 300) ? ' glimpse-hud-error' : '');
	
		//Build the rows that we are inserting
		uri = util.htmlEncode(uri);
	
		var clickableUri = uri;
		if(requestId) {
			clickableUri = '<a href="javascript:void(0)" class="glimpse-ajax-link" data-requestId="' + requestId + '">' + uri + '</a>';
		}
		
		recordItem('<div class="glimpse-hud-listing-row glimpse-hud-value' + rowClass + '"><div class="glimpse-hud-data glimpse-hud-quite glimpse-data-ajax-method">' + method + '</div><div class="glimpse-hud-data glimpse-hud-listing-overflow glimpse-data-ajax-uri" title="' + uri + '">' + uri + '</div><div class="glimpse-data-ajax-duration"><span class="glimpse-hud-data">' + duration + '</span><span class="glimpse-hud-postfix">ms</span></div></div>', '.glimpse-hud-section-ajax .glimpse-data-ajax-summary', summaryStack, 2);
		recordItem('<tbody class="' + rowClass + '"><tr><td class="glimpse-hud-listing-overflow" title="' + uri + '" colspan="2">' + clickableUri + '</td><td class="glimpse-hud-listing-value glimpse-data-duration">' + duration + '</td><td class="glimpse-hud-listing-value glimpse-data-size">' + processSize(size) + '</td></tr><tr><td class="glimpse-hud-quite glimpse-data-content-method">' + method + '</td><td class="glimpse-hud-quite glimpse-hud-listing-overflow">' + status + ' - ' + statusText + '</td><td class="glimpse-hud-quite glimpse-data-content-type glimpse-hud-listing-overflow" title="' + contentType + '">' + processContentType(contentType) + '</td><td class="glimpse-hud-quite glimpse-data-content-time">' + time.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1") + '</td></tr></tbody>', '.glimpse-hud-section-ajax .glimpse-data-ajax-detail', detailStack, 6);
	};
	var recordItem = function(html, selector, stack, length) {
		//Set row
		var row = $(html).prependTo(selector);
		setTimeout(function() {
			row.addClass('added');
		}, 1);
	
		//Track state of the details
		if (stack.length >= length)
			stack.shift().remove();
		stack.push(row);
	};
	
	var render = function(details, opened) {
		process.init(structure);
	
		return rendering.section(structure, details, opened);
	};
	var postRender = function() {
		var open = XMLHttpRequest.prototype.open; 
		XMLHttpRequest.prototype.open = function(method, uri) {
			if (util.isLocalUri(uri) && uri.indexOf('/glimpse/') == -1) { 
				this._uri = uri;
				
				var startTime = new Date().getTime(); 
				this.addEventListener('readystatechange', function() {
						if (this.readyState == 4 && this.getResponseHeader('__glimpse-id'))  { 
							update(method, uri, new Date().getTime() - startTime, this.getResponseHeader('Content-Length'), this.status, this.statusText, new Date(), this.getResponseHeader('Content-Type'), this.getResponseHeader('__glimpse-id'));
						}
					}, false); 
			}
	
			open.apply(this, arguments);
		};    
		
		var send = XMLHttpRequest.prototype.send; 
		XMLHttpRequest.prototype.send = function() {
			if (this._uri){
				this.setRequestHeader('__glimpse-isAjax', true);
			}
			
			send.apply(this, arguments);
		};                      
	};
	
	module.exports = {
		render: render,
		postRender: postRender
	};
	
	// TODO: Need to come up with a better self registration process
	(function () {
	    var section = __webpack_require__(/*! sections/section */ 52);
	
	    section.register(module.exports);
	})();

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgM2M1NWFjNTdlMWNlYWRjNDcxMzYiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5zY3NzPzBkZDciLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnNjc3MiLCJ3ZWJwYWNrOi8vLy4vfi9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qcyIsIndlYnBhY2s6Ly8vLi9+L3N0eWxlLWxvYWRlci9hZGRTdHlsZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xpYi9tb2R1bGVzL2pxdWVyeS1odWQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9qcXVlcnkvc3JjL2NvcmUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9qcXVlcnkvc3JjL3Zhci9hcnIuanMiLCJ3ZWJwYWNrOi8vLy4vfi9qcXVlcnkvc3JjL3Zhci9zbGljZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2pxdWVyeS9zcmMvdmFyL2NvbmNhdC5qcyIsIndlYnBhY2s6Ly8vLi9+L2pxdWVyeS9zcmMvdmFyL3B1c2guanMiLCJ3ZWJwYWNrOi8vLy4vfi9qcXVlcnkvc3JjL3Zhci9pbmRleE9mLmpzIiwid2VicGFjazovLy8uL34vanF1ZXJ5L3NyYy92YXIvY2xhc3MydHlwZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2pxdWVyeS9zcmMvdmFyL3RvU3RyaW5nLmpzIiwid2VicGFjazovLy8uL34vanF1ZXJ5L3NyYy92YXIvaGFzT3duLmpzIiwid2VicGFjazovLy8uL34vanF1ZXJ5L3NyYy92YXIvc3VwcG9ydC5qcyIsIndlYnBhY2s6Ly8vLi9+L2pxdWVyeS9zcmMvc2VsZWN0b3ItbmF0aXZlLmpzIiwid2VicGFjazovLy8uL34vanF1ZXJ5L3NyYy9ldmVudC5qcyIsIndlYnBhY2s6Ly8vLi9+L2pxdWVyeS9zcmMvZXZlbnQvc3VwcG9ydC5qcyIsIndlYnBhY2s6Ly8vLi9+L2pxdWVyeS9zcmMvdmFyL3Jub3R3aGl0ZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2pxdWVyeS9zcmMvdmFyL3N0cnVuZGVmaW5lZC5qcyIsIndlYnBhY2s6Ly8vLi9+L2pxdWVyeS9zcmMvZGF0YS92YXIvZGF0YV9wcml2LmpzIiwid2VicGFjazovLy8uL34vanF1ZXJ5L3NyYy9kYXRhL0RhdGEuanMiLCJ3ZWJwYWNrOi8vLy4vfi9qcXVlcnkvc3JjL2RhdGEvYWNjZXB0cy5qcyIsIndlYnBhY2s6Ly8vLi9+L2pxdWVyeS9zcmMvY29yZS9pbml0LmpzIiwid2VicGFjazovLy8uL34vanF1ZXJ5L3NyYy9jb3JlL3Zhci9yc2luZ2xlVGFnLmpzIiwid2VicGFjazovLy8uL34vanF1ZXJ5L3NyYy90cmF2ZXJzaW5nL2ZpbmRGaWx0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vfi9qcXVlcnkvc3JjL3RyYXZlcnNpbmcvdmFyL3JuZWVkc0NvbnRleHQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9qcXVlcnkvc3JjL3NlbGVjdG9yLmpzIiwid2VicGFjazovLy8uL34vanF1ZXJ5L3NyYy9ldmVudC9hbGlhcy5qcyIsIndlYnBhY2s6Ly8vLi9+L2pxdWVyeS9zcmMvbWFuaXB1bGF0aW9uLmpzIiwid2VicGFjazovLy8uL34vanF1ZXJ5L3NyYy9kYXRhL3Zhci9kYXRhX3VzZXIuanMiLCJ3ZWJwYWNrOi8vLy4vfi9qcXVlcnkvc3JjL2NvcmUvYWNjZXNzLmpzIiwid2VicGFjazovLy8uL34vanF1ZXJ5L3NyYy9tYW5pcHVsYXRpb24vdmFyL3JjaGVja2FibGVUeXBlLmpzIiwid2VicGFjazovLy8uL34vanF1ZXJ5L3NyYy9tYW5pcHVsYXRpb24vc3VwcG9ydC5qcyIsIndlYnBhY2s6Ly8vLi9+L2pxdWVyeS9zcmMvdHJhdmVyc2luZy5qcyIsIndlYnBhY2s6Ly8vLi9+L2pxdWVyeS9zcmMvYWpheC5qcyIsIndlYnBhY2s6Ly8vLi9+L2pxdWVyeS9zcmMvYWpheC92YXIvbm9uY2UuanMiLCJ3ZWJwYWNrOi8vLy4vfi9qcXVlcnkvc3JjL2FqYXgvdmFyL3JxdWVyeS5qcyIsIndlYnBhY2s6Ly8vLi9+L2pxdWVyeS9zcmMvYWpheC9wYXJzZUpTT04uanMiLCJ3ZWJwYWNrOi8vLy4vfi9qcXVlcnkvc3JjL2FqYXgvcGFyc2VYTUwuanMiLCJ3ZWJwYWNrOi8vLy4vfi9qcXVlcnkvc3JjL2RlZmVycmVkLmpzIiwid2VicGFjazovLy8uL34vanF1ZXJ5L3NyYy9jYWxsYmFja3MuanMiLCJ3ZWJwYWNrOi8vLy4vfi9qcXVlcnkvc3JjL2FqYXgveGhyLmpzIiwid2VicGFjazovLy8uL34vanF1ZXJ5L3NyYy9jb3JlL3BhcnNlSFRNTC5qcyIsIndlYnBhY2s6Ly8vLi9+L2pxdWVyeS9zcmMvYXR0cmlidXRlcy9jbGFzc2VzLmpzIiwid2VicGFjazovLy8uL34vanF1ZXJ5L3NyYy9hdHRyaWJ1dGVzL2F0dHIuanMiLCJ3ZWJwYWNrOi8vLy4vfi9qcXVlcnkvc3JjL2F0dHJpYnV0ZXMvc3VwcG9ydC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbGliL3V0aWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0YXRlLmpzIiwid2VicGFjazovLy8uL3NyYy9yZXBvc2l0b3J5LmpzIiwid2VicGFjazovLy8uL3NyYy91dGlsL3JlcXVlc3QtbWVzc2FnZS1wcm9jZXNzb3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlY3Rpb25zL3NlY3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlY3Rpb25zL3NlY3Rpb24taHR0cC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VjdGlvbnMvdXRpbC9yZW5kZXJpbmcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlY3Rpb25zL3V0aWwvcHJvY2Vzcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VjdGlvbnMvc2VjdGlvbi1ob3N0LmpzIiwid2VicGFjazovLy8uL3NyYy9zZWN0aW9ucy9zZWN0aW9uLWFqYXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7QUN0Q0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7O0FBRUQ7QUFDQSx1QztBQUNBLGdCQUFlLHdCO0FBQ2Y7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUUsS0FBSyxFQUFFO0FBQ1QsRUFBQyxFOzs7Ozs7Ozs7QUN6Q0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3RkFBZ0Y7QUFDaEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQSxpQ0FBZ0MsVUFBVSxFQUFFO0FBQzVDLEU7Ozs7Ozs7OztBQ3BCQTtBQUNBOzs7QUFHQTtBQUNBLHVDQUFzQywyQkFBMkIsd0hBQXdILEVBQUUsZ0JBQWdCLGlDQUFpQywwSEFBMEgsRUFBRSxnRkFBZ0YsNEVBQTRFLGtDQUFrQyxnQkFBZ0IscUJBQXFCLGVBQWUsY0FBYyw0QkFBNEIsbUJBQW1CLEVBQUUsY0FBYyxhQUFhLGNBQWMsaUJBQWlCLG9CQUFvQixzQkFBc0IscUNBQXFDLHFDQUFxQyxvQkFBb0IsaUJBQWlCLEVBQUUsMkRBQTJELGdCQUFnQixvQkFBb0Isc0JBQXNCLEVBQUUsb0JBQW9CLGlCQUFpQiw4QkFBOEIsc0JBQXNCLGdCQUFnQixFQUFFLDRCQUE0Qiw4QkFBOEIsY0FBYyxtQkFBbUIsaUJBQWlCLGdCQUFnQixnRUFBZ0UsaUNBQWlDLCtCQUErQixpQkFBaUIsRUFBRSxpQ0FBaUMsbUJBQW1CLG1CQUFtQixzQ0FBc0Msc0NBQXNDLHNCQUFzQixxQkFBcUIsRUFBRSwyQkFBMkIsdUJBQXVCLGlCQUFpQiw4QkFBOEIsRUFBRSxtQ0FBbUMsZ0JBQWdCLDhCQUE4QixvQ0FBb0MsdUJBQXVCLG9CQUFvQixpQkFBaUIsRUFBRSxpQ0FBaUMsdUJBQXVCLGlCQUFpQiw4QkFBOEIsb0JBQW9CLHNCQUFzQixpQkFBaUIsZ0JBQWdCLGdCQUFnQixFQUFFLHNDQUFzQyx1QkFBdUIsc0JBQXNCLG1CQUFtQixhQUFhLHdDQUF3Qyx3Q0FBd0Msc0NBQXNDLHNDQUFzQyxFQUFFLHlDQUF5Qyw4QkFBOEIscUJBQXFCLG1CQUFtQixxQkFBcUIscUJBQXFCLGlCQUFpQixFQUFFLHlDQUF5Qyw2QkFBNkIsb0JBQW9CLEVBQUUseUpBQXlKLG1CQUFtQixxQkFBcUIsRUFBRSxzRUFBc0Usb0JBQW9CLHFCQUFxQixFQUFFLGtDQUFrQywwQkFBMEIsd0JBQXdCLEVBQUUseUVBQXlFLHVCQUF1QixFQUFFLHdFQUF3RSx3QkFBd0IsRUFBRSxnQ0FBZ0MsZ0NBQWdDLEVBQUUsMENBQTBDLHFCQUFxQixzQkFBc0IsRUFBRSx3Q0FBd0MsbUJBQW1CLEVBQUUsa0VBQWtFLHNCQUFzQixFQUFFLG9GQUFvRixtQkFBbUIsc0JBQXNCLEVBQUUsd0VBQXdFLHNCQUFzQixzQkFBc0IsRUFBRSwwR0FBMEcscUJBQXFCLHNCQUFzQixFQUFFLHVHQUF1RyxxQkFBcUIsRUFBRSx5SEFBeUgsbUJBQW1CLEVBQUUsb0tBQW9LLDBCQUEwQixFQUFFLG9FQUFvRSxzQkFBc0IsRUFBRSxxRUFBcUUscUJBQXFCLEVBQUUsaUNBQWlDLG1CQUFtQixzQkFBc0IscUJBQXFCLEVBQUUsc0JBQXNCLGlDQUFpQyx1QkFBdUIsRUFBRSw2REFBNkQseUJBQXlCLEVBQUUsRUFBRSxrQ0FBa0MsaUJBQWlCLHFCQUFxQixzQkFBc0Isd0JBQXdCLEVBQUUsa0VBQWtFLHFCQUFxQixFQUFFLDREQUE0RCxxQkFBcUIsRUFBRSw2RkFBNkYsd0JBQXdCLEVBQUUsNEhBQTRILGlCQUFpQixxQkFBcUIsRUFBRSxtQ0FBbUMsc0JBQXNCLEVBQUUsa0NBQWtDLHVCQUF1QixFQUFFLHdDQUF3QyxxQkFBcUIsd0JBQXdCLGlCQUFpQix1QkFBdUIsZ0JBQWdCLEVBQUUsa0NBQWtDLG9CQUFvQixFQUFFLGdFQUFnRSxpQkFBaUIsRUFBRSxnRUFBZ0UsbUJBQW1CLEVBQUUsb0NBQW9DLGtCQUFrQixFQUFFLHVHQUF1RyxzQkFBc0IsMENBQTBDLEVBQUUsaUNBQWlDLDhCQUE4QixvQ0FBb0MsdUJBQXVCLGdCQUFnQixhQUFhLGVBQWUsZ0JBQWdCLG9CQUFvQiwwQ0FBMEMsRUFBRSwwQ0FBMEMsbUJBQW1CLGdCQUFnQix5Q0FBeUMsRUFBRSw4SUFBOEkseUNBQXlDLEVBQUUsa01BQWtNLHFCQUFxQixFQUFFLGtNQUFrTSxxQkFBcUIsRUFBRSxrTUFBa00scUJBQXFCLEVBQUUsdUNBQXVDLGdCQUFnQixFQUFFLHdDQUF3Qyx1QkFBdUIsRUFBRSxpRUFBaUUsc0JBQXNCLEVBQUUsdUNBQXVDLHVCQUF1QixFQUFFLHFEQUFxRCxlQUFlLEVBQUUsK0JBQStCLGlCQUFpQixnQkFBZ0IsdUJBQXVCLEVBQUUscUNBQXFDLHVCQUF1QixFQUFFLG9DQUFvQyx1QkFBdUIsaUJBQWlCLG1CQUFtQixFQUFFLG1DQUFtQyxnQkFBZ0IsRUFBRSx3Q0FBd0MsZ0JBQWdCLEVBQUUseUNBQXlDLGlCQUFpQixFQUFFLHNDQUFzQywyQkFBMkIsRUFBRSx3REFBd0QsaUJBQWlCLEVBQUUsc0NBQXNDLGlCQUFpQixFQUFFLGlEQUFpRCxpQkFBaUIsRUFBRSx1REFBdUQsaUJBQWlCLEVBQUUsc0NBQXNDLHdCQUF3QixFQUFFLDBEQUEwRCxpQkFBaUIsRUFBRSx3Q0FBd0Msb0JBQW9CLGdCQUFnQixFQUFFLHNEQUFzRCxxQkFBcUIsRUFBRSxzQ0FBc0MsdUJBQXVCLHNCQUFzQixxQkFBcUIsRUFBRSx1Q0FBdUMsbUJBQW1CLEVBQUUsNkNBQTZDLDBCQUEwQixFQUFFLHFEQUFxRCxxQkFBcUIsRUFBRSxzQ0FBc0Msd0JBQXdCLEVBQUUsNENBQTRDLHdCQUF3QixpQkFBaUIsd0JBQXdCLGlCQUFpQixzQkFBc0Isd0JBQXdCLEVBQUUsNENBQTRDLHdCQUF3QixxQkFBcUIsNEJBQTRCLEVBQUUsa0ZBQWtGLHNCQUFzQixFQUFFLG9GQUFvRiw0Q0FBNEMsa0JBQWtCLEVBQUUsNEpBQTRKLGdCQUFnQixFQUFFLDhDQUE4QyxnQkFBZ0IsRUFBRSx3REFBd0QsZ0JBQWdCLEVBQUUsd0dBQXdHLHNCQUFzQixFQUFFLCtEQUErRCxpQkFBaUIsRUFBRSx1REFBdUQscUJBQXFCLEVBQUUsbURBQW1ELGVBQWUsRUFBRSxxREFBcUQsZUFBZSx1QkFBdUIsRUFBRSxxREFBcUQsc0JBQXNCLGVBQWUsRUFBRSxxREFBcUQsZ0JBQWdCLHNCQUFzQixFQUFFLGtEQUFrRCxxQkFBcUIsb0JBQW9CLEVBQUUsa0ZBQWtGLG1CQUFtQixFQUFFLDhFQUE4RSx1QkFBdUIsZUFBZSxlQUFlLDhCQUE4QixFQUFFLG9GQUFvRixhQUFhLGVBQWUsRUFBRSw2RUFBNkUsc0JBQXNCLEVBQUUsb0NBQW9DLHNCQUFzQixxQkFBcUIsb0JBQW9CLEVBQUUseUNBQXlDLHNCQUFzQixtQkFBbUIsb0JBQW9CLEVBQUUsMENBQTBDLG1CQUFtQixFQUFFOztBQUVyblc7Ozs7Ozs7Ozs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxpQkFBZ0IsaUJBQWlCO0FBQ2pDO0FBQ0E7QUFDQSx5Q0FBd0MsZ0JBQWdCO0FBQ3hELEtBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBZ0IsaUJBQWlCO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBWSxvQkFBb0I7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDakRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQW9CO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUJBQWdCLG1CQUFtQjtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBZ0Isc0JBQXNCO0FBQ3RDO0FBQ0E7QUFDQSxtQkFBa0IsMkJBQTJCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGdCQUFlLG1CQUFtQjtBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFpQiwyQkFBMkI7QUFDNUM7QUFDQTtBQUNBLFNBQVEsdUJBQXVCO0FBQy9CO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQSxrQkFBaUIsdUJBQXVCO0FBQ3hDO0FBQ0E7QUFDQSw0QkFBMkI7QUFDM0I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdCQUFlLGlCQUFpQjtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBYztBQUNkO0FBQ0EsaUNBQWdDLHNCQUFzQjtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQSxHQUFFO0FBQ0Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQzs7QUFFRDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHdEQUF1RDtBQUN2RDs7QUFFQSw4QkFBNkIsbUJBQW1COztBQUVoRDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUN2UEE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEseUI7Ozs7Ozs7Ozs7aUVDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7O0FBRUY7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUU7O0FBRUY7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSCxHQUFFOztBQUVGO0FBQ0E7QUFDQSxHQUFFOztBQUVGO0FBQ0E7QUFDQSxHQUFFOztBQUVGO0FBQ0E7QUFDQSxHQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTs7QUFFRjtBQUNBO0FBQ0EsR0FBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDhCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsU0FBUSxZQUFZO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE9BQU07QUFDTjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUU7O0FBRUYscUJBQW9COztBQUVwQjtBQUNBO0FBQ0EsR0FBRTs7QUFFRjs7QUFFQTtBQUNBO0FBQ0EsR0FBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw0Q0FBMkM7QUFDM0M7QUFDQSxHQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTs7QUFFRixpQ0FBZ0M7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFOztBQUVGO0FBQ0E7QUFDQSxHQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsWUFBVyxZQUFZO0FBQ3ZCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLElBQUc7QUFDSDtBQUNBLFlBQVcsWUFBWTtBQUN2Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7QUFDSjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7O0FBRUY7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFFOztBQUVGO0FBQ0E7QUFDQSxHQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFVBQVMsU0FBUztBQUNsQjtBQUNBOztBQUVBOztBQUVBO0FBQ0EsR0FBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFVBQVMsWUFBWTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVSxZQUFZO0FBQ3RCOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRTs7QUFFRjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxHQUFFOztBQUVGOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0EsRUFBQzs7QUFFRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxFQUFDOzs7Ozs7Ozs7O21DQ3JmRDtBQUNBO0FBQ0EsRUFBQzs7Ozs7Ozs7OztpRUNGRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7Ozs7Ozs7Ozs7aUVDSkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDOzs7Ozs7Ozs7O2lFQ0pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQzs7Ozs7Ozs7OztpRUNKRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7Ozs7Ozs7Ozs7bUNDSkQ7QUFDQTtBQUNBO0FBQ0EsRUFBQzs7Ozs7Ozs7OztpRUNIRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7Ozs7Ozs7Ozs7aUVDSkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDOzs7Ozs7Ozs7O21DQ0pEO0FBQ0E7QUFDQTtBQUNBLEVBQUM7Ozs7Ozs7Ozs7aUVDSEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWdDLFFBQVEsTUFBTTtBQUM5QywyQkFBMEIsV0FBVyxTQUFTO0FBQzlDLHFDQUFvQyxVQUFVLFNBQVM7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQSxHQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQSxpQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0EsRUFBQzs7QUFFRCxFQUFDOzs7Ozs7Ozs7O2lFQzNLRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFFLGdCQUFnQjtBQUNsQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFlBQVc7O0FBRVg7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFJO0FBQ0o7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsR0FBRTs7QUFFRjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSw0Q0FBMkM7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFOztBQUVGOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHVDQUFzQztBQUN0QztBQUNBO0FBQ0E7O0FBRUE7QUFDQSwwQkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSwrQ0FBOEM7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw0Q0FBMkM7QUFDM0M7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFVLEtBQUs7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbURBQWtEO0FBQ2xEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUU7O0FBRUY7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxzREFBcUQ7QUFDckQ7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsMEJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLCtEQUE4RDtBQUM5RDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsV0FBVSxjQUFjOztBQUV4QjtBQUNBO0FBQ0E7QUFDQSxrQkFBaUIsbUJBQW1CO0FBQ3BDOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBeUIsK0JBQStCO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBc0Isd0RBQXdEO0FBQzlFOztBQUVBO0FBQ0EsR0FBRTs7QUFFRjtBQUNBOztBQUVBLGNBQWE7O0FBRWI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsdUNBQXNDLGNBQWM7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esc0NBQXFDO0FBQ3JDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7QUFDSjtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFJO0FBQ0o7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsdUNBQXNDO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUU7QUFDRjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBLGVBQWMscUNBQXFDOztBQUVuRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0gsR0FBRTtBQUNGO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSCxHQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSCxHQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQzs7QUFFRDtBQUNBLEVBQUM7Ozs7Ozs7Ozs7aUVDbjJCRDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsRUFBQzs7Ozs7Ozs7OzttQ0NSRDtBQUNBO0FBQ0EsRUFBQzs7Ozs7Ozs7OzttQ0NGRDtBQUNBO0FBQ0EsRUFBQzs7Ozs7Ozs7OztpRUNGRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7Ozs7Ozs7Ozs7aUVDSkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF1QztBQUN2QztBQUNBO0FBQ0E7QUFDQSxHQUFFOztBQUVGO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHNCQUFxQjtBQUNyQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbUNBQWtDO0FBQ2xDOztBQUVBO0FBQ0E7QUFDQSxLQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHdCQUF1QixhQUFhO0FBQ3BDLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsRUFBQzs7Ozs7Ozs7OztpRUNwTEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsRUFBQzs7Ozs7Ozs7OztBQ25CRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsS0FBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsU0FBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsTUFBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSTtBQUNKOztBQUVBO0FBQ0E7QUFDQSxLQUFJO0FBQ0o7QUFDQTs7QUFFQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBLEVBQUM7Ozs7Ozs7Ozs7bUNDMUhEO0FBQ0E7QUFDQTtBQUNBLEVBQUM7Ozs7Ozs7Ozs7aUVDSEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7O0FBRUg7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBRzs7QUFFSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxpQkFBZ0IsU0FBUztBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7QUFDSjs7QUFFQSxlQUFjLFNBQVM7QUFDdkI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDOztBQUVELEVBQUM7Ozs7Ozs7Ozs7aUVDbkdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDOzs7Ozs7Ozs7O21FQ0xEOzs7Ozs7Ozs7O2lFQ0FBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBLEdBQUU7O0FBRUY7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBO0FBQ0EsR0FBRTs7QUFFRjtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQzs7QUFFRCxFQUFDOzs7Ozs7Ozs7O2lFQ3RDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG9CQUFtQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsU0FBUSxPQUFPO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDRDQUEyQyxPQUFPO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsK0JBQThCOztBQUU5QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUU7QUFDRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHdDQUF1QyxPQUFPO0FBQzlDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHlDQUF3QyxPQUFPO0FBQy9DO0FBQ0E7QUFDQSxLQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFVBQVMsT0FBTztBQUNoQjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsTUFBSztBQUNMOztBQUVBO0FBQ0EsTUFBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxVQUFTLG1DQUFtQztBQUM1QztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxTQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMLElBQUc7QUFDSCxHQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSCxHQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSCxHQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0gsR0FBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNILEdBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsVUFBUywyQkFBMkI7QUFDcEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRTs7QUFFRjtBQUNBO0FBQ0E7O0FBRUEsVUFBUywwQkFBMEI7QUFDbkM7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUU7O0FBRUY7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFHO0FBQ0gsR0FBRTs7QUFFRjtBQUNBO0FBQ0EsOEJBQTZCO0FBQzdCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLGFBQVksT0FBTztBQUNuQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxNQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNILEdBQUU7O0FBRUY7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRTs7QUFFRjtBQUNBO0FBQ0EsR0FBRTs7QUFFRjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSTtBQUNKOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxZQUFXLE9BQU87QUFDbEI7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLGtCQUFpQixnQkFBZ0I7QUFDakM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxVQUFTLFdBQVc7QUFDcEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBQzs7QUFFRDtBQUNBLEVBQUM7Ozs7Ozs7Ozs7aUVDbmtCRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7Ozs7Ozs7Ozs7aUVDSkQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFFO0FBQ0Y7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsV0FBVSxTQUFTO0FBQ25CO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxFQUFDOzs7Ozs7Ozs7O21DQzNERDtBQUNBO0FBQ0EsRUFBQzs7Ozs7Ozs7OztpRUNGRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQzs7QUFFRDs7QUFFQSxFQUFDOzs7Ozs7Ozs7O2lFQy9CRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTs7QUFFRjtBQUNBOztBQUVBLFVBQVMsR0FBRztBQUNaO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFVLE9BQU87QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0gsR0FBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFVBQVMsT0FBTztBQUNoQix3QkFBdUIsd0JBQXdCO0FBQy9DO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUU7O0FBRUY7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQSxpREFBZ0Q7QUFDaEQsR0FBRTtBQUNGO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUM7O0FBRUQ7QUFDQSxFQUFDOzs7Ozs7Ozs7O2lFQ3RNRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWdCOztBQUVoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWdCOztBQUVoQixpREFBZ0Q7QUFDaEQ7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsb0JBQW1CO0FBQ25COztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7QUFDSjtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHdEQUF1RDtBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWlCO0FBQ2pCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFNO0FBQ047QUFDQTtBQUNBLFFBQU87QUFDUCxnQkFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxVQUFTO0FBQ1Q7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLGtCQUFpQjtBQUNqQixVQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbURBQWtEO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7O0FBRUg7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRTs7QUFFRjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFrQztBQUNsQztBQUNBLHVCQUFzQjtBQUN0Qiw0QkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvRkFBbUY7QUFDbkY7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxlQUFjLG9DQUFvQztBQUNsRDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLE1BQUs7QUFDTDs7QUFFQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUU7O0FBRUY7QUFDQTtBQUNBLEdBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0EsRUFBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBLEVBQUM7O0FBRUQ7QUFDQSxFQUFDOzs7Ozs7Ozs7O2lFQ2p4QkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDOzs7Ozs7Ozs7O21DQ0pEO0FBQ0E7QUFDQSxFQUFDOzs7Ozs7Ozs7O2lFQ0ZEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLEVBQUM7Ozs7Ozs7Ozs7aUVDWkQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsRUFBQzs7Ozs7Ozs7OztpRUMzQkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUTtBQUNSLFFBQU87QUFDUDtBQUNBLE9BQU07QUFDTixNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7QUFDSjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSwrQ0FBOEM7QUFDOUMsTUFBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7O0FBRUg7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxLQUFJOztBQUVKOztBQUVBLDZDQUE0QztBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVUsWUFBWTtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFDOztBQUVEO0FBQ0EsRUFBQzs7Ozs7Ozs7OztpRUNwSkQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFtQjs7QUFFbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVSxvQ0FBb0M7QUFDOUM7QUFDQSxxQkFBb0I7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUCxPQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU07QUFDTjtBQUNBO0FBQ0EsS0FBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0EsS0FBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBLEtBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxFQUFDOzs7Ozs7Ozs7O2lFQzVNRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjs7QUFFQTtBQUNBLG1CQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFRO0FBQ1I7QUFDQSxtREFBa0Q7QUFDbEQ7QUFDQTtBQUNBO0FBQ0EsU0FBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7O0FBRUQsRUFBQzs7Ozs7Ozs7OztpRUN2SUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQSxFQUFDOzs7Ozs7Ozs7O2lFQ3RDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSTtBQUNKOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxXQUFVLFNBQVM7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUEsV0FBVSxTQUFTO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFFOztBQUVGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7QUFDSjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNILEdBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTLE9BQU87QUFDaEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUM7O0FBRUQsRUFBQzs7Ozs7Ozs7OztpRUM3SkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0EsRUFBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBLEtBQUk7QUFDSjs7QUFFQSxLQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBLElBQUc7QUFDSDs7QUFFQSxJQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7O0FBRUQsRUFBQzs7Ozs7Ozs7OztpRUM1SUQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQzs7QUFFRDs7QUFFQSxFQUFDOzs7Ozs7Ozs7O0FDbENEOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBEO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQztBQUNBLFVBQVM7QUFDVCxNQUFLO0FBQ0w7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0EsaUhBQWdIO0FBQ2hIOztBQUVBLHlDQUF3Qyw4QkFBOEIsV0FBVztBQUNqRixNQUFLO0FBQ0w7QUFDQTs7QUFFQTs7QUFFQSw2Q0FBNEMsV0FBVyxPQUFPLFdBQVc7QUFDekU7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0EsNkRBQTRELHdCQUF3Qix1QkFBdUIsc0JBQXNCLHNCQUFzQjtBQUN2SjtBQUNBLEc7Ozs7Ozs7OztBQ3BEQTs7QUFFQTs7QUFFQSxtQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTJCLDBCQUEwQixFQUFFO0FBQ3ZEO0FBQ0EsSUFBRztBQUNILEdBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEc7Ozs7Ozs7OztBQ2pCQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0JBQWlCLHFCQUFxQjtBQUN0QztBQUNBLG1CQUFrQiwwQkFBMEI7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFJO0FBQ0o7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBbUIsZ0NBQWdDO0FBQ25EO0FBQ0E7O0FBRUE7QUFDQSxLQUFJO0FBQ0osZ0M7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTCxvQkFBbUIsK0JBQStCO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTTtBQUNOLE07QUFDQSxvRUFBbUUsOEJBQThCLEVBQUU7QUFDbkcsc0VBQXFFLDhCQUE4QixFQUFFO0FBQ3JHLG9CQUFtQixnQ0FBZ0M7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU07QUFDTixNOztBQUVBLDBDQUF5QyxrREFBa0QsRUFBRSxFOztBQUU3RjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7O0FBRUE7QUFDQTtBQUNBLEc7Ozs7Ozs7OztBQ2xNQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUU7QUFDRjtBQUNBLDhCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0EsOEI7QUFDQTtBQUNBLDJDQUEwQyx3QkFBd0IsRUFBRTtBQUNwRTtBQUNBLEdBQUU7QUFDRjtBQUNBLDhCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0EsOEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEc7Ozs7Ozs7OztBQ3RDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWdCLHNCQUFzQjtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWdCLHNCQUFzQjtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUMvQkE7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHdIQUF1SDtBQUN2SDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ01BQStMLGtPQUFrTyw4REFBOEQsZ0lBQWdJLCtEQUErRCwyVzs7QUFFOXBCO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQSxhQUFZLHdLQUF3Syw0Q0FBNEMsRUFBRSxrQ0FBa0M7QUFDcFEsVUFBUyx1SkFBdUosc0RBQXNELDZDQUE2QyxFQUFFLGtDQUFrQztBQUN2UyxZQUFXLHFKQUFxSiw2Q0FBNkMsRUFBRSxpQ0FBaUM7QUFDaFAsWUFBVyw0SkFBNEosc0RBQXNELDZDQUE2QyxFQUFFLGlDQUFpQztBQUM3UyxVQUFTLG1LQUFtSywwRUFBMEUscURBQXFELEVBQUUsRUFBRTtBQUMvUyxlQUFjLHdIQUF3SCxzQ0FBc0MsRUFBRSxpRkFBaUYsMEVBQTBFLCtDQUErQyxFQUFFO0FBQzFYLEdBQUU7QUFDRjtBQUNBO0FBQ0EsZUFBYztBQUNkLFlBQVc7QUFDWCxjQUFhO0FBQ2I7QUFDQSxJQUFHO0FBQ0g7QUFDQSxjQUFhLDhEQUE4RDtBQUMzRSxXQUFVLHdCQUF3QjtBQUNsQyxhQUFZLHdCQUF3QjtBQUNwQyxhQUFZLHdCQUF3QjtBQUNwQyxXQUFVLEVBQUU7QUFDWixnQkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQSx1RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWEsc0lBQXNJO0FBQ25KLGFBQVksc0dBQXNHO0FBQ2xILGNBQWEsc0lBQXNJO0FBQ25KLFlBQVc7QUFDWDs7QUFFQSxxQkFBb0I7QUFDcEI7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUM7O0FBRUEsd0Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSwwQkFBeUIsK0JBQStCLEVBQUU7QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHVHQUFzRztBQUN0Ryx5R0FBd0c7QUFDeEc7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsRUFBQyxJOzs7Ozs7Ozs7QUN4SkQ7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxRkFBb0Y7QUFDcEY7QUFDQTtBQUNBOztBQUVBO0FBQ0Esb0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxrQ0FBaUMsbUNBQW1DOztBQUVwRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRzs7Ozs7Ozs7O0FDbERBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxrQ0FBaUM7QUFDakM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRzs7Ozs7Ozs7O0FDZkE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG9FQUFtRTtBQUNuRTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMERBQXlELFVBQVUsb0JBQW9CO0FBQ3ZGO0FBQ0EsbUU7QUFDQSxtRkFBa0YsME47QUFDbEYsNEJBQTJCLGlDQUFpQztBQUM1RDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNklBQTRJO0FBQzVJO0FBQ0Esc0lBQXFJO0FBQ3JJO0FBQ0E7QUFDQSxxQ0FBb0MsbUJBQW1CO0FBQ3ZEO0FBQ0EsYztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQSxrQkFBaUIsNEZBQTRGLHdCQUF3QixFQUFFLDhFQUE4RSw2Q0FBNkMsRUFBRSxpQ0FBaUM7QUFDclMsa0JBQWlCLG1HQUFtRyx3RkFBd0YsRUFBRSw2RUFBNkUscUVBQXFFLEVBQUUsRUFBRTtBQUNwVyxnQkFBZSw4RkFBOEYsbUZBQW1GLEVBQUUsNkVBQTZFLGdFQUFnRSxFQUFFLEVBQUU7QUFDblYsc0JBQXFCLGdIQUFnSCx3Q0FBd0MsRUFBRSxtRkFBbUYscVBBQXFQLEVBQUUsRUFBRTtBQUMzZixtQkFBa0IscUhBQXFILHdDQUF3QyxFQUFFLG9FQUFvRSxvUUFBb1EsRUFBRSxFQUFFO0FBQzdmLHVCQUFzQix5SUFBeUksNEVBQTRFLEVBQUUscUVBQXFFLHdRQUF3USxFQUFFLEVBQUU7QUFDOWpCLGdCQUFlLHVGQUF1Rix3REFBd0QsRUFBRSxxRUFBcUUsMEpBQTBKLDRzQkFBNHNCLEVBQUUsRUFBRTtBQUMva0MseUJBQXdCLDhGQUE4RixrREFBa0QsRUFBRSxpRkFBaUYsZUFBZSxxRUFBcUUsRUFBRSxFQUFFO0FBQ25WLG1CQUFrQiw2R0FBNkcsK0ZBQStGLEVBQUUsOEVBQThFLG9EQUFvRCxFQUFFLEVBQUU7QUFDdFcscUJBQW9CLHdJQUF3SSxpR0FBaUcsRUFBRSw4RUFBOEUsc0RBQXNELEVBQUUsRUFBRTtBQUN2WSxNQUFLO0FBQ0w7QUFDQTtBQUNBLHVCQUFzQjtBQUN0QixxQkFBb0I7QUFDcEIsMkJBQTBCO0FBQzFCLHdCQUF1QjtBQUN2QiwwQkFBeUI7QUFDekIsOEJBQTZCO0FBQzdCO0FBQ0EsVUFBUztBQUNUO0FBQ0EsdUJBQXNCO0FBQ3RCLHNCQUFxQiw2REFBNkQ7QUFDbEYsb0JBQW1CLDhDQUE4QztBQUNqRSwwQkFBeUIsd0JBQXdCO0FBQ2pELHVCQUFzQix3QkFBd0I7QUFDOUMsNEJBQTJCO0FBQzNCLHFCQUFvQjtBQUNwQiw2QkFBNEIsMERBQTBEO0FBQ3RGLHVCQUFzQiw4REFBOEQ7QUFDcEYseUJBQXdCO0FBQ3hCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esc0JBQXFCLG9FQUFvRTtBQUN6RixnQ0FBK0IsRUFBRTtBQUNqQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTCxvQkFBbUIsaUNBQWlDO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsNENBQTJDO0FBQzNDO0FBQ0EsK0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbUc7QUFDQSw0QztBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDO0FBQ0EsNkY7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQztBQUNBOztBQUVBO0FBQ0EsMEY7QUFDQTtBQUNBO0FBQ0EsVTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0M7QUFDQSx5Qzs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQztBQUNBO0FBQ0EsOEQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrRUFBaUUseUZBQXlGLEVBQUU7QUFDNUo7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsRUFBQyxJOzs7Ozs7Ozs7QUM5TEQ7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOENBQTZDO0FBQzdDOztBQUVBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQSxjQUFhLHFMQUFxTCxVQUFVLEVBQUU7QUFDOU0sR0FBRTtBQUNGO0FBQ0E7QUFDQSxlQUFjO0FBQ2QsSUFBRztBQUNIO0FBQ0EsZUFBYztBQUNkO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGlEQUFnRDtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBNkMsRUFBRTs7QUFFL0M7QUFDQTtBQUNBLElBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7O0FBRUY7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsZ3ZCQUErdUIsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFO0FBQzd2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSwyQztBQUNBO0FBQ0EsZ0U7QUFDQTs7QUFFQSx5QztBQUNBO0FBQ0EsNEU7QUFDQTtBQUNBO0FBQ0EsTUFBSyxTO0FBQ0w7O0FBRUE7QUFDQSxJOztBQUVBLDJDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsRUFBQyxJIiwiZmlsZSI6Ii4vbWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgM2M1NWFjNTdlMWNlYWRjNDcxMzZcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbi8vIERFViBUSU1FIENPREVcbmlmIChGQUtFX1NFUlZFUikge1xuICAgIHJlcXVpcmUoJ2Zha2UnKTtcbn1cbi8vIERFViBUSU1FIENPREVcblxucmVxdWlyZSgnLi9pbmRleC5zY3NzJyk7XG5cbnZhciAkID0gcmVxdWlyZSgnJGpxdWVyeScpO1xudmFyIHV0aWwgPSByZXF1aXJlKCdsaWIvdXRpbCcpO1xudmFyIHN0YXRlID0gcmVxdWlyZSgnLi9zdGF0ZScpO1xudmFyIHJlcG9zaXRvcnkgPSByZXF1aXJlKCcuL3JlcG9zaXRvcnknKTtcbnZhciBzZWN0aW9ucyA9IHJlcXVpcmUoJy4vc2VjdGlvbnMvc2VjdGlvbicpO1xuXG4vL3ZhciBkZXRhaWxzID0gYXJncy5uZXdEYXRhLmh1ZDtcbnZhciBzZXR1cCA9IHN0YXRlLmN1cnJlbnQoKTtcblxuLy8gZ2V0IGludG8gZG9tIGFzYXAgdG8gdHJpZ2dlciBhc3NldCBsb2FkaW5nXG4kKGZ1bmN0aW9uKCkge1xuXHR2YXIgdXJsID0gdXRpbC5yZXNvbHZlQ2xpZW50VXJsKHV0aWwuY3VycmVudFJlcXVlc3RJZCgpLCB0cnVlKTtcblx0dmFyIGh0bWwgPSAnPGRpdiBjbGFzcz1cImdsaW1wc2VcIj48YSBjbGFzcz1cImdsaW1wc2UtaWNvblwiIHRhcmdldD1cIl9ibGFua1wiIGhyZWY9XCInICsgdXJsICsgJ1wiPjxkaXYgY2xhc3M9XCJnbGltcHNlLWljb24tdGV4dFwiPkdsaW1wc2U8L2Rpdj48L2E+PGRpdiBjbGFzcz1cImdsaW1wc2UtaHVkXCI+PC9kaXY+PC9kaXY+J1xuXHQkKGh0bWwpLmFwcGVuZFRvKCdib2R5Jyk7XG59KTtcblxuLy8gb25seSBsb2FkIHRoaW5ncyB3aGVuIHdlIGhhdmUgdGhlIGRhdGEgcmVhZHkgdG8gZ29cbnJlcG9zaXRvcnkuZ2V0RGF0YShmdW5jdGlvbihkZXRhaWxzKSB7IFxuXHQkKGZ1bmN0aW9uKCkgeyBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkgeyBcblx0XHQvLyBnZW5lcmF0ZSB0aGUgaHRtbCBuZWVkZWQgZm9yIHRoZSBzZWN0aW9uc1xuXHRcdHZhciBodG1sID0gc2VjdGlvbnMucmVuZGVyKGRldGFpbHMsIHNldHVwKTtcblx0XHRcblx0XHQvLyBpbnNlcnQgdGhlIGh0bWwgaW50byB0aGUgZG9tXG5cdFx0dmFyIGhvbGRlciA9ICQoaHRtbCkuYXBwZW5kVG8oJy5nbGltcHNlLWh1ZCcpO1xuXHRcdFxuXHRcdC8vIGZvcmNlIHRoZSBjb3JyZWN0IHN0YXRlIGZyb20gcHJldmlvdXMgbG9hZFxuXHRcdHN0YXRlLnNldHVwKGhvbGRlcik7XG5cdFx0XG5cdFx0Ly8gc2V0dXAgZXZlbnRzIHRoYXQgd2UgbmVlZCB0byBsaXN0ZW4gdG9cblx0XHRzZWN0aW9ucy5wb3N0UmVuZGVyKGhvbGRlciwgZGV0YWlscyk7XG5cdH0sIDApOyB9KTtcbn0pO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSAwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLy4uL25vZGVfbW9kdWxlcy9hdXRvcHJlZml4ZXItbG9hZGVyL2luZGV4LmpzP2Jyb3dzZXJzPWxhc3QgMiB2ZXJzaW9uIS4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2luZGV4LmpzP2luY2x1ZGVQYXRoc1tdPS9Vc2Vycy9hdmFuZGVyaG9vcm4vUHJvamVjdHMvR2xpbXBzZS5DbGllbnQuUHJvdG90eXBlL190ZW1wL2h1ZC9ub2RlX21vZHVsZXMvYm9vdHN0cmFwLXNhc3MvYXNzZXRzL3N0eWxlc2hlZXRzIS4vaW5kZXguc2Nzc1wiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCB7fSk7XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcblx0Ly8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0aWYoIWNvbnRlbnQubG9jYWxzKSB7XG5cdFx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi8uLi9ub2RlX21vZHVsZXMvYXV0b3ByZWZpeGVyLWxvYWRlci9pbmRleC5qcz9icm93c2Vycz1sYXN0IDIgdmVyc2lvbiEuLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9pbmRleC5qcz9pbmNsdWRlUGF0aHNbXT0vVXNlcnMvYXZhbmRlcmhvb3JuL1Byb2plY3RzL0dsaW1wc2UuQ2xpZW50LlByb3RvdHlwZS9fdGVtcC9odWQvbm9kZV9tb2R1bGVzL2Jvb3RzdHJhcC1zYXNzL2Fzc2V0cy9zdHlsZXNoZWV0cyEuL2luZGV4LnNjc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi8uLi9ub2RlX21vZHVsZXMvYXV0b3ByZWZpeGVyLWxvYWRlci9pbmRleC5qcz9icm93c2Vycz1sYXN0IDIgdmVyc2lvbiEuLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9pbmRleC5qcz9pbmNsdWRlUGF0aHNbXT0vVXNlcnMvYXZhbmRlcmhvb3JuL1Byb2plY3RzL0dsaW1wc2UuQ2xpZW50LlByb3RvdHlwZS9fdGVtcC9odWQvbm9kZV9tb2R1bGVzL2Jvb3RzdHJhcC1zYXNzL2Fzc2V0cy9zdHlsZXNoZWV0cyEuL2luZGV4LnNjc3NcIik7XG5cdFx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblx0XHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0XHR9KTtcblx0fVxuXHQvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvaW5kZXguc2Nzc1xuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSgpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogJ1NlbGF3aWsnO1xcbiAgc3JjOiB1cmwoJy9nbGltcHNlL2h1ZC9hc3NldHMvc2VsYXdrLndvZmYyJykgZm9ybWF0KCd3b2ZmMicpLCB1cmwoJy9nbGltcHNlL2h1ZC9hc3NldHMvc2VsYXdrLndvZmYnKSBmb3JtYXQoJ3dvZmYnKTsgfVxcblxcbkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6ICdTZWxhd2lrIExpZ2h0JztcXG4gIHNyYzogdXJsKCcvZ2xpbXBzZS9odWQvYXNzZXRzL3NlbGF3a2wud29mZjInKSBmb3JtYXQoJ3dvZmYyJyksIHVybCgnL2dsaW1wc2UvaHVkL2Fzc2V0cy9zZWxhd2tsLndvZmYnKSBmb3JtYXQoJ3dvZmYnKTsgfVxcblxcbi5nbGltcHNlLCAuZ2xpbXBzZSAqLCAuZ2xpbXBzZSBhLCAuZ2xpbXBzZSB0ZCwgLmdsaW1wc2UgdGgsIC5nbGltcHNlIHRhYmxlIHtcXG4gIGZvbnQtZmFtaWx5OiAnU2Vnb2UgVUknLCAnU2VsYXdpaycsIFRhaG9tYSwgR2VuZXZhLCBWZXJkYW5hLCBzYW5zLXNlcmlmO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICBib3JkZXI6IDBweDtcXG4gIHRleHQtYWxpZ246IGxlZnQ7XFxuICBwYWRkaW5nOiAwO1xcbiAgbWFyZ2luOiAwO1xcbiAgYm94LXNpemluZzogY29udGVudC1ib3g7XFxuICBkaXJlY3Rpb246IGx0cjsgfVxcblxcbi5nbGltcHNlIHtcXG4gIHJpZ2h0OiAwO1xcbiAgYm90dG9tOiAwO1xcbiAgZmxvYXQ6IHJpZ2h0O1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgbWluLXdpZHRoOiAxMzcwcHg7XFxuICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRleigwKTtcXG4gICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGV6KDApO1xcbiAgei1pbmRleDogMTAwMDAwO1xcbiAgaGVpZ2h0OiAzNnB4OyB9XFxuXFxuLmdsaW1wc2UgdGQsIC5nbGltcHNlIHNwYW4sIC5nbGltcHNlIGRpdiwgLmdsaW1wc2UgdGgge1xcbiAgY29sb3I6ICNmZmY7XFxuICBmb250LXNpemU6IDEzcHg7XFxuICBsaW5lLWhlaWdodDogMTNweDsgfVxcblxcbi5nbGltcHNlIHRhYmxlIHtcXG4gIG1pbi13aWR0aDogMDtcXG4gIGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XFxuICBib3JkZXItc3BhY2luZzogMDtcXG4gIHdpZHRoOiAxMDAlOyB9XFxuXFxuLmdsaW1wc2UgLmdsaW1wc2UtaWNvbiB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjM2M0NTRmO1xcbiAgbWFyZ2luOiAwO1xcbiAgcGFkZGluZzogMCA4cHg7XFxuICBmbG9hdDogcmlnaHQ7XFxuICB3aWR0aDogMzlweDtcXG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybCgvZ2xpbXBzZS9odWQvYXNzZXRzL2dsaW1wc2UtbG9nby5wbmcpO1xcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcXG4gIGJhY2tncm91bmQtc2l6ZTogNDdweCAzN3B4O1xcbiAgaGVpZ2h0OiAzNnB4OyB9XFxuXFxuLmdsaW1wc2UgLmdsaW1wc2UtaWNvbi10ZXh0IHtcXG4gIGZvbnQtc2l6ZTogNXB4O1xcbiAgY29sb3I6ICMzYzQ1NGY7XFxuICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDI3MGRlZyk7XFxuICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDI3MGRlZyk7XFxuICBtYXJnaW4tbGVmdDogNDVweDtcXG4gIG1hcmdpbi10b3A6IDI1cHg7IH1cXG5cXG4uZ2xpbXBzZSAuZ2xpbXBzZS1odWQge1xcbiAgcGFkZGluZzogMCA1cHggMCAwO1xcbiAgZmxvYXQ6IHJpZ2h0O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzNjNDU0ZjsgfVxcblxcbi5nbGltcHNlIC5nbGltcHNlLWh1ZC1zZWN0aW9uIHtcXG4gIGZsb2F0OiBsZWZ0O1xcbiAgdHJhbnNpdGlvbjogYWxsIDAuM3MgZWFzZTtcXG4gIGJvcmRlci1sZWZ0OiAxMXB4IHNvbGlkICM3MWIxZDE7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBjdXJzb3I6IGRlZmF1bHQ7XFxuICBoZWlnaHQ6IDM3cHg7IH1cXG5cXG4uZ2xpbXBzZSAuZ2xpbXBzZS1odWQtdGl0bGUge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgY29sb3I6IHdoaXRlO1xcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgd2lkdGg6IDEycHg7XFxuICBsZWZ0OiAtMTJweDsgfVxcblxcbi5nbGltcHNlIC5nbGltcHNlLWh1ZC10aXRsZSBzcGFuIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGxpbmUtaGVpZ2h0OiAxMDAlO1xcbiAgZm9udC1zaXplOiA5cHg7XFxuICB0b3A6IDVweDtcXG4gIC13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjogMTVweCAxM3B4O1xcbiAgICAgICAgICB0cmFuc2Zvcm0tb3JpZ2luOiAxNXB4IDEzcHg7XFxuICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDI3MGRlZyk7XFxuICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDI3MGRlZyk7IH1cXG5cXG4uZ2xpbXBzZSAuZ2xpbXBzZS1odWQtc2VjdGlvbi1pbm5lciB7XFxuICB0cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlO1xcbiAgbWF4LXdpZHRoOiA5OTlweDtcXG4gIG1pbi13aWR0aDogMHB4O1xcbiAgbWFyZ2luLXRvcDogLTFweDtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxuICBoZWlnaHQ6IDM3cHg7IH1cXG5cXG4uZ2xpbXBzZSAuZ2xpbXBzZS1odWQtc2VjdGlvbi1pbnB1dCB7XFxuICBkaXNwbGF5OiBub25lICFpbXBvcnRhbnQ7XFxuICBmb250LXNpemU6IDEycHg7IH1cXG5cXG4uZ2xpbXBzZSAuZ2xpbXBzZS1odWQtc2VjdGlvbi1pbnB1dDpjaGVja2VkIH4gLmdsaW1wc2UtaHVkLXNlY3Rpb24taW5uZXIsIC5nbGltcHNlIC5nbGltcHNlLWh1ZC1zZWN0aW9uLWlucHV0OmNoZWNrZWQgfiAuZ2xpbXBzZS1odWQtcG9wdXAtZXhwYW5kZXIge1xcbiAgbWF4LXdpZHRoOiAwcHg7XFxuICBvdmVyZmxvdzogaGlkZGVuOyB9XFxuXFxuLmdsaW1wc2UgLmdsaW1wc2UtaHVkLXNlY3Rpb24taW5wdXQ6Y2hlY2tlZCB+IC5nbGltcHNlLWh1ZC1wb3B1cCB7XFxuICBtYXgtaGVpZ2h0OiAwcHg7XFxuICBvdmVyZmxvdzogaGlkZGVuOyB9XFxuXFxuLmdsaW1wc2UgLmdsaW1wc2UtaHVkLWRldGFpbCB7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICBwYWRkaW5nOiAxcHggMTBweCAwOyB9XFxuXFxuLmdsaW1wc2UgLmdsaW1wc2UtaHVkLXNlY3Rpb24taW5uZXIgLmdsaW1wc2UtaHVkLWRldGFpbDpmaXJzdC1jaGlsZCB7XFxuICBwYWRkaW5nLWxlZnQ6IDE1cHg7IH1cXG5cXG4uZ2xpbXBzZSAuZ2xpbXBzZS1odWQtc2VjdGlvbi1pbm5lciAuZ2xpbXBzZS1odWQtZGV0YWlsOmxhc3QtY2hpbGQge1xcbiAgcGFkZGluZy1yaWdodDogMjBweDsgfVxcblxcbi5nbGltcHNlIC5nbGltcHNlLWh1ZC1kYXRhIHtcXG4gIHRyYW5zaXRpb246IGNvbG9yIDAuM3MgZWFzZTsgfVxcblxcbi5nbGltcHNlIC5nbGltcHNlLWh1ZC1kYXRhLWltcG9ydGFudCB7XFxuICBmb250LXNpemU6IDEuMmVtO1xcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7IH1cXG5cXG4uZ2xpbXBzZSAuZ2xpbXBzZS1odWQtdmFsdWUtdXBkYXRlIHtcXG4gIGNvbG9yOiAjNzFiMWQxOyB9XFxuXFxuLmdsaW1wc2UgLmdsaW1wc2UtaHVkLWRldGFpbC1hbGlnbi1yaWdodCAuZ2xpbXBzZS1odWQtaGVhZGVyIHtcXG4gIHRleHQtYWxpZ246IHJpZ2h0OyB9XFxuXFxuLmdsaW1wc2UgLmdsaW1wc2UtaHVkLWRldGFpbC1leHRyYS1sYXJnZSwgLmdsaW1wc2UtaHVkLWRldGFpbC1leHRyYS1sYXJnZSBzcGFuIHtcXG4gIGZvbnQtc2l6ZTogMmVtO1xcbiAgbGluZS1oZWlnaHQ6IDEwMCU7IH1cXG5cXG4uZ2xpbXBzZSAuZ2xpbXBzZS1odWQtZGV0YWlsLWxhcmdlLCAuZ2xpbXBzZS1odWQtZGV0YWlsLWxhcmdlIHNwYW4ge1xcbiAgZm9udC1zaXplOiAxLjQ1ZW07XFxuICBsaW5lLWhlaWdodDogMTAwJTsgfVxcblxcbi5nbGltcHNlIC5nbGltcHNlLWh1ZC1kZXRhaWwtbm9ybWFsLCAuZ2xpbXBzZS1odWQtZGV0YWlsLW5vcm1hbCBzcGFuLCAuZ2xpbXBzZS1odWQtZGV0YWlsLW5vcm1hbCBkaXYge1xcbiAgZm9udC1zaXplOiAxLjJlbTtcXG4gIGxpbmUtaGVpZ2h0OiAxMDAlOyB9XFxuXFxuLmdsaW1wc2UgLmdsaW1wc2UtaHVkLWRldGFpbC1zbWFsbCwgLmdsaW1wc2UtaHVkLWRldGFpbC1zbWFsbCBzcGFuLCAuZ2xpbXBzZS1odWQtZGV0YWlsLXNtYWxsIGRpdiB7XFxuICBmb250LXNpemU6IDEuMWVtOyB9XFxuXFxuLmdsaW1wc2UgLmdsaW1wc2UtaHVkLWRldGFpbC1leHRyYS1zbWFsbCwgLmdsaW1wc2UtaHVkLWRldGFpbC1leHRyYS1zbWFsbCBzcGFuLCAuZ2xpbXBzZS1odWQtZGV0YWlsLWV4dHJhLXNtYWxsIGRpdiB7XFxuICBmb250LXNpemU6IDFlbTsgfVxcblxcbi5nbGltcHNlIC5nbGltcHNlLWh1ZC1kZXRhaWwtcG9zaXRpb24tbGVmdCAuZ2xpbXBzZS1odWQtdmFsdWUsIC5nbGltcHNlIC5nbGltcHNlLWh1ZC1kZXRhaWwtcG9zaXRpb24tbGVmdCBkaXYsIC5nbGltcHNlIC5nbGltcHNlLWh1ZC1kZXRhaWwtcG9zaXRpb24tcmlnaHQgZGl2IHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jazsgfVxcblxcbi5nbGltcHNlIC5nbGltcHNlLWh1ZC1kZXRhaWwtcG9zaXRpb24tbGVmdCAuZ2xpbXBzZS1odWQtaGVhZGVyIHtcXG4gIG1hcmdpbi1yaWdodDogNXB4OyB9XFxuXFxuLmdsaW1wc2UgLmdsaW1wc2UtaHVkLWRldGFpbC1wb3NpdGlvbi1yaWdodCAuZ2xpbXBzZS1odWQtaGVhZGVyIHtcXG4gIG1hcmdpbi1sZWZ0OiA1cHg7IH1cXG5cXG4uZ2xpbXBzZSAuZ2xpbXBzZS1odWQtdmFsdWUge1xcbiAgZm9udC1zaXplOiAxZW07XFxuICBsaW5lLWhlaWdodDogMTAwJTtcXG4gIG1hcmdpbi10b3A6IC0zcHg7IH1cXG5cXG5AbWVkaWEgc2NyZWVuXFxcXDAge1xcbiAgLmdsaW1wc2UgLmdsaW1wc2UtaHVkLXZhbHVlIHtcXG4gICAgbWFyZ2luLXRvcDogLTRweDsgfVxcbiAgLmdsaW1wc2UgLmdsaW1wc2UtaHVkLWRldGFpbC1ub3JtYWwgLmdsaW1wc2UtaHVkLWhlYWRlciB7XFxuICAgIG1hcmdpbi1ib3R0b206IDJweDsgfSB9XFxuXFxuLmdsaW1wc2UgLmdsaW1wc2UtaHVkLWhlYWRlciB7XFxuICBvcGFjaXR5OiAwLjY7XFxuICBmb250LXNpemU6IDAuN2VtO1xcbiAgbGluZS1oZWlnaHQ6IDEwMCU7XFxuICB3aGl0ZS1zcGFjZTogbm93cmFwOyB9XFxuXFxuLmdsaW1wc2UgLmdsaW1wc2UtaHVkLWRldGFpbC1leHRyYS1sYXJnZSAuZ2xpbXBzZS1odWQtaGVhZGVyIHtcXG4gIGZvbnQtc2l6ZTogMC41ZW07IH1cXG5cXG4uZ2xpbXBzZSAuZ2xpbXBzZS1odWQtZGV0YWlsLWxhcmdlIC5nbGltcHNlLWh1ZC1oZWFkZXIge1xcbiAgZm9udC1zaXplOiAwLjZlbTsgfVxcblxcbi5nbGltcHNlIC5nbGltcHNlLWh1ZC1kZXRhaWwtbm9ybWFsLmdsaW1wc2UtaHVkLWRldGFpbC1wb3NpdGlvbi10b3AgLmdsaW1wc2UtaHVkLWhlYWRlciB7XFxuICBwYWRkaW5nLWJvdHRvbTogMnB4OyB9XFxuXFxuLmdsaW1wc2UgLmdsaW1wc2UtaHVkLXByZWZpeCwgLmdsaW1wc2UgLmdsaW1wc2UtaHVkLXBvc3RmaXgsIC5nbGltcHNlIC5nbGltcHNlLWh1ZC1zcGFjZXIsIC5nbGltcHNlIC5nbGltcHNlLWh1ZC1wbGFpbiB7XFxuICBvcGFjaXR5OiAwLjQ7XFxuICBmb250LXNpemU6IDAuOWVtOyB9XFxuXFxuLmdsaW1wc2UgLmdsaW1wc2UtaHVkLXBvc3RmaXgge1xcbiAgcGFkZGluZy1sZWZ0OiAycHg7IH1cXG5cXG4uZ2xpbXBzZSAuZ2xpbXBzZS1odWQtcHJlZml4IHtcXG4gIHBhZGRpbmctcmlnaHQ6IDJweDsgfVxcblxcbi5nbGltcHNlIC5nbGltcHNlLWh1ZC1wcmVmaXgtc3VwZXIge1xcbiAgZm9udC1zaXplOiAwLjRlbTtcXG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XFxuICBvcGFjaXR5OiAwLjQ7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICB0b3A6IC0wLjVlbTsgfVxcblxcbi5nbGltcHNlIC5nbGltcHNlLWh1ZC1zcGFjZXIge1xcbiAgcGFkZGluZzogMCAxMHB4OyB9XFxuXFxuLmdsaW1wc2UgLmdsaW1wc2UtaHVkLXF1aXRlLCAuZ2xpbXBzZSAuZ2xpbXBzZS1odWQtcXVpdGUgKiB7XFxuICBvcGFjaXR5OiAwLjY7IH1cXG5cXG4uZ2xpbXBzZSAuZ2xpbXBzZS1odWQtZXJyb3IsIC5nbGltcHNlIC5nbGltcHNlLWh1ZC1lcnJvciAqIHtcXG4gIGNvbG9yOiAjRkY4QzgwOyB9XFxuXFxuLmdsaW1wc2UgLmdsaW1wc2UtZGF0YS10cml2aWFsIHtcXG4gIGRpc3BsYXk6IG5vbmU7IH1cXG5cXG4uZ2xpbXBzZSAuZ2xpbXBzZS1odWQtc2VjdGlvbi1pbm5lcjpob3ZlciB+IC5nbGltcHNlLWh1ZC1wb3B1cCwgLmdsaW1wc2UgLmdsaW1wc2UtaHVkLXBvcHVwOmhvdmVyIHtcXG4gIG1heC1oZWlnaHQ6IDk5OXB4O1xcbiAgdHJhbnNpdGlvbjogbWF4LWhlaWdodCAwLjNzIGVhc2UgMC4zczsgfVxcblxcbi5nbGltcHNlIC5nbGltcHNlLWh1ZC1wb3B1cCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjM2M0NTRmO1xcbiAgYm9yZGVyLWxlZnQ6IDExcHggc29saWQgIzcxYjFkMTtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGxlZnQ6IC0xMXB4O1xcbiAgcmlnaHQ6IDA7XFxuICB6LWluZGV4OiAxO1xcbiAgYm90dG9tOiAwcHg7XFxuICBtYXgtaGVpZ2h0OiAwcHg7XFxuICB0cmFuc2l0aW9uOiBtYXgtaGVpZ2h0IDAuM3MgZWFzZSAwLjJzOyB9XFxuXFxuLmdsaW1wc2UgLmdsaW1wc2UtaHVkLXBvcHVwLWV4cGFuZGVyIHtcXG4gIG1pbi13aWR0aDogMHB4O1xcbiAgaGVpZ2h0OiAxcHg7XFxuICB0cmFuc2l0aW9uOiBtaW4td2lkdGggMC4xcyBlYXNlIDAuNXM7IH1cXG5cXG4uZ2xpbXBzZSAuZ2xpbXBzZS1odWQtc2VjdGlvbi1pbm5lcjpob3ZlciB+IC5nbGltcHNlLWh1ZC1wb3B1cC1leHBhbmRlciwgLmdsaW1wc2UgLmdsaW1wc2UtaHVkLXBvcHVwOmhvdmVyIH4gLmdsaW1wc2UtaHVkLXBvcHVwLWV4cGFuZGVyIHtcXG4gIHRyYW5zaXRpb246IG1pbi13aWR0aCAwLjFzIGVhc2UgMC4yczsgfVxcblxcbi5nbGltcHNlIC5nbGltcHNlLWh1ZC1zZWN0aW9uLWh0dHAgLmdsaW1wc2UtaHVkLXNlY3Rpb24taW5uZXI6aG92ZXIgfiAuZ2xpbXBzZS1odWQtcG9wdXAtZXhwYW5kZXIsIC5nbGltcHNlIC5nbGltcHNlLWh1ZC1zZWN0aW9uLWh0dHAgLmdsaW1wc2UtaHVkLXBvcHVwOmhvdmVyIH4gLmdsaW1wc2UtaHVkLXBvcHVwLWV4cGFuZGVyIHtcXG4gIG1pbi13aWR0aDogNDAwcHg7IH1cXG5cXG4uZ2xpbXBzZSAuZ2xpbXBzZS1odWQtc2VjdGlvbi1ob3N0IC5nbGltcHNlLWh1ZC1zZWN0aW9uLWlubmVyOmhvdmVyIH4gLmdsaW1wc2UtaHVkLXBvcHVwLWV4cGFuZGVyLCAuZ2xpbXBzZSAuZ2xpbXBzZS1odWQtc2VjdGlvbi1ob3N0IC5nbGltcHNlLWh1ZC1wb3B1cDpob3ZlciB+IC5nbGltcHNlLWh1ZC1wb3B1cC1leHBhbmRlciB7XFxuICBtaW4td2lkdGg6IDYwMHB4OyB9XFxuXFxuLmdsaW1wc2UgLmdsaW1wc2UtaHVkLXNlY3Rpb24tYWpheCAuZ2xpbXBzZS1odWQtc2VjdGlvbi1pbm5lcjpob3ZlciB+IC5nbGltcHNlLWh1ZC1wb3B1cC1leHBhbmRlciwgLmdsaW1wc2UgLmdsaW1wc2UtaHVkLXNlY3Rpb24tYWpheCAuZ2xpbXBzZS1odWQtcG9wdXA6aG92ZXIgfiAuZ2xpbXBzZS1odWQtcG9wdXAtZXhwYW5kZXIge1xcbiAgbWluLXdpZHRoOiA0NTBweDsgfVxcblxcbi5nbGltcHNlIC5nbGltcHNlLWh1ZC1wb3B1cC1jbGVhciB7XFxuICBjbGVhcjogYm90aDsgfVxcblxcbi5nbGltcHNlIC5nbGltcHNlLWh1ZC1wb3B1cC1oZWFkZXIge1xcbiAgbWFyZ2luLWJvdHRvbTogNXB4OyB9XFxuXFxuLmdsaW1wc2UgLmdsaW1wc2UtaHVkLXBvcHVwIC5nbGltcHNlLWh1ZC1kZXRhaWwtZXh0cmEtbGFyZ2Uge1xcbiAgbWFyZ2luLWxlZnQ6IC0ycHg7IH1cXG5cXG4uZ2xpbXBzZSAuZ2xpbXBzZS1odWQtcG9wdXAtaW5uZXIge1xcbiAgcGFkZGluZzogMTBweCAxNXB4OyB9XFxuXFxuLmdsaW1wc2UgLmdsaW1wc2UtaHVkLXBvcHVwIC5nbGltcHNlLWh1ZC1kZXRhaWwge1xcbiAgcGFkZGluZzogMDsgfVxcblxcbi5nbGltcHNlIC5nbGltcHNlLWh1ZC1iYXIge1xcbiAgaGVpZ2h0OiAxMnB4O1xcbiAgd2lkdGg6IDEwMCU7XFxuICBtYXJnaW46IDVweCAwIDEwcHg7IH1cXG5cXG4uZ2xpbXBzZSAuZ2xpbXBzZS1odWQtYmFyID4gZGl2IHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTsgfVxcblxcbi5nbGltcHNlIC5nbGltcHNlLWh1ZC1iYXItaXRlbSB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBoZWlnaHQ6IDEycHg7XFxuICBtaW4td2lkdGg6IDFweDsgfVxcblxcbi5nbGltcHNlIC5nbGltcHNlLWh1ZC1zdW1tYXJ5IHtcXG4gIHdpZHRoOiBhdXRvOyB9XFxuXFxuLmdsaW1wc2UgLmdsaW1wc2UtaHVkLXN1bW1hcnktbGVmdCB7XFxuICBmbG9hdDogbGVmdDsgfVxcblxcbi5nbGltcHNlIC5nbGltcHNlLWh1ZC1zdW1tYXJ5LXJpZ2h0IHtcXG4gIGZsb2F0OiByaWdodDsgfVxcblxcbi5nbGltcHNlIC5nbGltcHNlLWh1ZC1zdW1tYXJ5IHRyIHtcXG4gIHZlcnRpY2FsLWFsaWduOiBib3R0b207IH1cXG5cXG4uZ2xpbXBzZSAuZ2xpbXBzZS1odWQtc3VtbWFyeS1zcGFjZSB0cjpmaXJzdC1jaGlsZCB7XFxuICBoZWlnaHQ6IDY1cHg7IH1cXG5cXG4uZ2xpbXBzZSAuZ2xpbXBzZS1odWQtc3VtbWFyeSB0ciB7XFxuICBoZWlnaHQ6IDI3cHg7IH1cXG5cXG4uZ2xpbXBzZSAuZ2xpbXBzZS1odWQtc3VtbWFyeSB0cjpsYXN0LWNoaWxkIHtcXG4gIGhlaWdodDogMzVweDsgfVxcblxcbi5nbGltcHNlIC5nbGltcHNlLWh1ZC1zdW1tYXJ5LXNwYWNlIHRyOmxhc3QtY2hpbGQge1xcbiAgaGVpZ2h0OiA0NnB4OyB9XFxuXFxuLmdsaW1wc2UgLmdsaW1wc2UtaHVkLXN1bW1hcnkgdGgge1xcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDsgfVxcblxcbi5nbGltcHNlIC5nbGltcHNlLWh1ZC1zdW1tYXJ5IHRkIC5nbGltcHNlLWh1ZC1kZXRhaWwge1xcbiAgZmxvYXQ6IHJpZ2h0OyB9XFxuXFxuLmdsaW1wc2UgdGFibGUuZ2xpbXBzZS1odWQtbGlzdGluZyB7XFxuICBtYXgtd2lkdGg6IDEwMCU7XFxuICB3aWR0aDogMTAwJTsgfVxcblxcbi5nbGltcHNlIC5nbGltcHNlLWh1ZC1wb3B1cCAuZ2xpbXBzZS1odWQtbGlzdGluZyB7XFxuICBtYXJnaW4tdG9wOiAxMHB4OyB9XFxuXFxuLmdsaW1wc2UgLmdsaW1wc2UtaHVkLWxpc3RpbmcgdGQge1xcbiAgZm9udC1zaXplOiAxLjAyNWVtO1xcbiAgbGluZS1oZWlnaHQ6IDEwMCU7XFxuICBwYWRkaW5nLXRvcDogM3B4OyB9XFxuXFxuLmdsaW1wc2UgLmdsaW1wc2UtaHVkLWxpc3Rpbmctcm93IHtcXG4gIHBhZGRpbmc6IDJweCAwOyB9XFxuXFxuLmdsaW1wc2UgLmdsaW1wc2UtaHVkLWxpc3Rpbmctcm93ID4gZGl2IHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jazsgfVxcblxcbi5nbGltcHNlIC5nbGltcHNlLWh1ZC1saXN0aW5nIHRyOmZpcnN0LWNoaWxkIHRkIHtcXG4gIHBhZGRpbmctdG9wOiAxcHg7IH1cXG5cXG4uZ2xpbXBzZSAuZ2xpbXBzZS1odWQtbGlzdGluZyB0ZCB7XFxuICBwYWRkaW5nLWJvdHRvbTogMXB4OyB9XFxuXFxuLmdsaW1wc2UgLmdsaW1wc2UtaHVkLWxpc3RpbmcgdGhlYWQgdGgge1xcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcXG4gIG9wYWNpdHk6IDAuNjtcXG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XFxuICBjb2xvcjogd2hpdGU7XFxuICBsaW5lLWhlaWdodDogMTAwJTtcXG4gIHBhZGRpbmctYm90dG9tOiA1cHg7IH1cXG5cXG4uZ2xpbXBzZSAuZ2xpbXBzZS1odWQtbGlzdGluZy1vdmVyZmxvdyB7XFxuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzOyB9XFxuXFxuLmdsaW1wc2UgdGQuZ2xpbXBzZS1odWQtbGlzdGluZy12YWx1ZSwgLmdsaW1wc2UgdGguZ2xpbXBzZS1odWQtbGlzdGluZy12YWx1ZSB7XFxuICB0ZXh0LWFsaWduOiByaWdodDsgfVxcblxcbi5nbGltcHNlIHRkLmdsaW1wc2UtaHVkLWxpc3RpbmctdmFsdWUsIC5nbGltcHNlIHNwYW4uZ2xpbXBzZS1odWQtbGlzdGluZy12YWx1ZSB7XFxuICBmb250LWZhbWlseTogQ29uc29sYXMsIG1vbm9zcGFjZSwgc2VyaWY7XFxuICBvcGFjaXR5OiAwLjg1OyB9XFxuXFxuLmdsaW1wc2UgLmdsaW1wc2UtaHVkIC5nbGltcHNlLWRhdGEtY2hpbGRsZXNzLWR1cmF0aW9uLCAuZ2xpbXBzZSAuZ2xpbXBzZS1odWQgLmdsaW1wc2UtZGF0YS1kdXJhdGlvbiwgLmdsaW1wc2UgLmdsaW1wc2UtaHVkIC5nbGltcHNlLWRhdGEtY29udGVudC10eXBlIHtcXG4gIHdpZHRoOiA5MHB4OyB9XFxuXFxuLmdsaW1wc2UgLmdsaW1wc2UtaHVkIC5nbGltcHNlLWRhdGEtc2l6ZSB7XFxuICB3aWR0aDogNjBweDsgfVxcblxcbi5nbGltcHNlIC5nbGltcHNlLWh1ZCAuZ2xpbXBzZS1kYXRhLWNvbnRlbnQtbWV0aG9kIHtcXG4gIHdpZHRoOiA0MHB4OyB9XFxuXFxuLmdsaW1wc2UgLmdsaW1wc2UtaHVkIC5nbGltcHNlLWRhdGEtY29udGVudC10eXBlLCAuZ2xpbXBzZSAuZ2xpbXBzZS1odWQgLmdsaW1wc2UtZGF0YS1jb250ZW50LXRpbWUge1xcbiAgdGV4dC1hbGlnbjogcmlnaHQ7IH1cXG5cXG4uZ2xpbXBzZSAuZ2xpbXBzZS1odWQgLmdsaW1wc2UtZGF0YS1jaGlsZGxlc3Mtc3RhcnQtcG9pbnQge1xcbiAgd2lkdGg6IDEwMHB4OyB9XFxuXFxuLmdsaW1wc2UgLmdsaW1wc2UtaHVkIC5nbGltcHNlLWRhdGEtcmVxdWVzdC1wYXJ0cyB7XFxuICBtYXJnaW4tdG9wOiAxNXB4OyB9XFxuXFxuLmdsaW1wc2UgLmdsaW1wc2UtaHVkIC5nbGltcHNlLWRhdGEtd2lyZS1wYXJ0IHtcXG4gIHdpZHRoOiAzMyU7IH1cXG5cXG4uZ2xpbXBzZSAuZ2xpbXBzZS1odWQgLmdsaW1wc2UtZGF0YS1zZXJ2ZXItcGFydCB7XFxuICB3aWR0aDogMzQlO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyOyB9XFxuXFxuLmdsaW1wc2UgLmdsaW1wc2UtaHVkIC5nbGltcHNlLWRhdGEtY2xpZW50LXBhcnQge1xcbiAgdGV4dC1hbGlnbjogcmlnaHQ7XFxuICB3aWR0aDogMzMlOyB9XFxuXFxuLmdsaW1wc2UgLmdsaW1wc2UtaHVkIC5nbGltcHNlLWRhdGEtYWpheC1tZXRob2Qge1xcbiAgd2lkdGg6IDMwcHg7XFxuICB0ZXh0LWFsaWduOiByaWdodDsgfVxcblxcbi5nbGltcHNlIC5nbGltcHNlLWh1ZCAuZ2xpbXBzZS1kYXRhLWFqYXgtdXJpIHtcXG4gIG1heC13aWR0aDogMjMwcHg7XFxuICBwYWRkaW5nOiAwIDIwcHg7IH1cXG5cXG4uZ2xpbXBzZSAuZ2xpbXBzZS1odWQgLmdsaW1wc2UtZGF0YS1xdWVyeS1zdW1tYXJ5IC5nbGltcHNlLWh1ZC1saXN0aW5nLXZhbHVlIHtcXG4gIGNvbG9yOiAjZTI4NzVlOyB9XFxuXFxuLmdsaW1wc2UgLmdsaW1wc2UtaHVkIC5nbGltcHNlLWh1ZC1zZWN0aW9uLWFqYXggLmdsaW1wc2UtaHVkLWxpc3Rpbmctcm93IHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIHRvcDogLTIwcHg7XFxuICBvcGFjaXR5OiAwO1xcbiAgdHJhbnNpdGlvbjogYWxsIDAuNnMgZWFzZTsgfVxcblxcbi5nbGltcHNlIC5nbGltcHNlLWh1ZCAuZ2xpbXBzZS1odWQtc2VjdGlvbi1hamF4IC5nbGltcHNlLWh1ZC1saXN0aW5nLXJvdy5hZGRlZCB7XFxuICB0b3A6IDBweDtcXG4gIG9wYWNpdHk6IDE7IH1cXG5cXG4uZ2xpbXBzZSAuZ2xpbXBzZS1odWQgLmdsaW1wc2UtZGF0YS1hamF4LWRldGFpbCB0Ym9keSB0cjpmaXJzdC1jaGlsZCB0ZCB7XFxuICBwYWRkaW5nLXRvcDogMTBweDsgfVxcblxcbi5nbGltcHNlIC5nbGltcHNlLWh1ZC1jb250cm9scyB7XFxuICB0ZXh0LWFsaWduOiByaWdodDtcXG4gIGZvbnQtc2l6ZTogMS4yZW07XFxuICBtYXJnaW4tdG9wOiA3cHg7IH1cXG5cXG4uZ2xpbXBzZSAuZ2xpbXBzZS1odWQtY29udHJvbHMgc3BhbiB7XFxuICBmb250LXdlaWdodDogYm9sZDtcXG4gIGNvbG9yOiAjNzFiMWQxO1xcbiAgY3Vyc29yOiBwb2ludGVyOyB9XFxuXFxuLmdsaW1wc2UgLmdsaW1wc2UtZGF0YS1hamF4LWRldGFpbCBhIHtcXG4gIGNvbG9yOiBpbmhlcml0OyB9XFxuXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vY3NzLWxvYWRlciEuL34vYXV0b3ByZWZpeGVyLWxvYWRlcj9icm93c2Vycz1sYXN0IDIgdmVyc2lvbiEvVXNlcnMvYXZhbmRlcmhvb3JuL1Byb2plY3RzL0dsaW1wc2UuQ2xpZW50LlByb3RvdHlwZS9+L3Nhc3MtbG9hZGVyP2luY2x1ZGVQYXRoc1tdPS9Vc2Vycy9hdmFuZGVyaG9vcm4vUHJvamVjdHMvR2xpbXBzZS5DbGllbnQuUHJvdG90eXBlL190ZW1wL2h1ZC9+L2Jvb3RzdHJhcC1zYXNzL2Fzc2V0cy9zdHlsZXNoZWV0cyEuL3NyYy9pbmRleC5zY3NzXG4gKiogbW9kdWxlIGlkID0gMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLypcclxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxyXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcclxuKi9cclxuLy8gY3NzIGJhc2UgY29kZSwgaW5qZWN0ZWQgYnkgdGhlIGNzcy1sb2FkZXJcclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcclxuXHR2YXIgbGlzdCA9IFtdO1xyXG5cclxuXHQvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXHJcblx0bGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xyXG5cdFx0dmFyIHJlc3VsdCA9IFtdO1xyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGl0ZW0gPSB0aGlzW2ldO1xyXG5cdFx0XHRpZihpdGVtWzJdKSB7XHJcblx0XHRcdFx0cmVzdWx0LnB1c2goXCJAbWVkaWEgXCIgKyBpdGVtWzJdICsgXCJ7XCIgKyBpdGVtWzFdICsgXCJ9XCIpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJlc3VsdC5wdXNoKGl0ZW1bMV0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gcmVzdWx0LmpvaW4oXCJcIik7XHJcblx0fTtcclxuXHJcblx0Ly8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcclxuXHRsaXN0LmkgPSBmdW5jdGlvbihtb2R1bGVzLCBtZWRpYVF1ZXJ5KSB7XHJcblx0XHRpZih0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIilcclxuXHRcdFx0bW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgXCJcIl1dO1xyXG5cdFx0dmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpZCA9IHRoaXNbaV1bMF07XHJcblx0XHRcdGlmKHR5cGVvZiBpZCA9PT0gXCJudW1iZXJcIilcclxuXHRcdFx0XHRhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XHJcblx0XHR9XHJcblx0XHRmb3IoaSA9IDA7IGkgPCBtb2R1bGVzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpdGVtID0gbW9kdWxlc1tpXTtcclxuXHRcdFx0Ly8gc2tpcCBhbHJlYWR5IGltcG9ydGVkIG1vZHVsZVxyXG5cdFx0XHQvLyB0aGlzIGltcGxlbWVudGF0aW9uIGlzIG5vdCAxMDAlIHBlcmZlY3QgZm9yIHdlaXJkIG1lZGlhIHF1ZXJ5IGNvbWJpbmF0aW9uc1xyXG5cdFx0XHQvLyAgd2hlbiBhIG1vZHVsZSBpcyBpbXBvcnRlZCBtdWx0aXBsZSB0aW1lcyB3aXRoIGRpZmZlcmVudCBtZWRpYSBxdWVyaWVzLlxyXG5cdFx0XHQvLyAgSSBob3BlIHRoaXMgd2lsbCBuZXZlciBvY2N1ciAoSGV5IHRoaXMgd2F5IHdlIGhhdmUgc21hbGxlciBidW5kbGVzKVxyXG5cdFx0XHRpZih0eXBlb2YgaXRlbVswXSAhPT0gXCJudW1iZXJcIiB8fCAhYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xyXG5cdFx0XHRcdGlmKG1lZGlhUXVlcnkgJiYgIWl0ZW1bMl0pIHtcclxuXHRcdFx0XHRcdGl0ZW1bMl0gPSBtZWRpYVF1ZXJ5O1xyXG5cdFx0XHRcdH0gZWxzZSBpZihtZWRpYVF1ZXJ5KSB7XHJcblx0XHRcdFx0XHRpdGVtWzJdID0gXCIoXCIgKyBpdGVtWzJdICsgXCIpIGFuZCAoXCIgKyBtZWRpYVF1ZXJ5ICsgXCIpXCI7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGxpc3QucHVzaChpdGVtKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH07XHJcblx0cmV0dXJuIGxpc3Q7XHJcbn07XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXG4gKiogbW9kdWxlIGlkID0gM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLypcclxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxyXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcclxuKi9cclxudmFyIHN0eWxlc0luRG9tID0ge30sXHJcblx0bWVtb2l6ZSA9IGZ1bmN0aW9uKGZuKSB7XHJcblx0XHR2YXIgbWVtbztcclxuXHRcdHJldHVybiBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdGlmICh0eXBlb2YgbWVtbyA9PT0gXCJ1bmRlZmluZWRcIikgbWVtbyA9IGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcblx0XHRcdHJldHVybiBtZW1vO1xyXG5cdFx0fTtcclxuXHR9LFxyXG5cdGlzT2xkSUUgPSBtZW1vaXplKGZ1bmN0aW9uKCkge1xyXG5cdFx0cmV0dXJuIC9tc2llIFs2LTldXFxiLy50ZXN0KHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkpO1xyXG5cdH0pLFxyXG5cdGdldEhlYWRFbGVtZW50ID0gbWVtb2l6ZShmdW5jdGlvbiAoKSB7XHJcblx0XHRyZXR1cm4gZG9jdW1lbnQuaGVhZCB8fCBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF07XHJcblx0fSksXHJcblx0c2luZ2xldG9uRWxlbWVudCA9IG51bGwsXHJcblx0c2luZ2xldG9uQ291bnRlciA9IDAsXHJcblx0c3R5bGVFbGVtZW50c0luc2VydGVkQXRUb3AgPSBbXTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obGlzdCwgb3B0aW9ucykge1xyXG5cdGlmKHR5cGVvZiBERUJVRyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBERUJVRykge1xyXG5cdFx0aWYodHlwZW9mIGRvY3VtZW50ICE9PSBcIm9iamVjdFwiKSB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgc3R5bGUtbG9hZGVyIGNhbm5vdCBiZSB1c2VkIGluIGEgbm9uLWJyb3dzZXIgZW52aXJvbm1lbnRcIik7XHJcblx0fVxyXG5cclxuXHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcclxuXHQvLyBGb3JjZSBzaW5nbGUtdGFnIHNvbHV0aW9uIG9uIElFNi05LCB3aGljaCBoYXMgYSBoYXJkIGxpbWl0IG9uIHRoZSAjIG9mIDxzdHlsZT5cclxuXHQvLyB0YWdzIGl0IHdpbGwgYWxsb3cgb24gYSBwYWdlXHJcblx0aWYgKHR5cGVvZiBvcHRpb25zLnNpbmdsZXRvbiA9PT0gXCJ1bmRlZmluZWRcIikgb3B0aW9ucy5zaW5nbGV0b24gPSBpc09sZElFKCk7XHJcblxyXG5cdC8vIEJ5IGRlZmF1bHQsIGFkZCA8c3R5bGU+IHRhZ3MgdG8gdGhlIGJvdHRvbSBvZiA8aGVhZD4uXHJcblx0aWYgKHR5cGVvZiBvcHRpb25zLmluc2VydEF0ID09PSBcInVuZGVmaW5lZFwiKSBvcHRpb25zLmluc2VydEF0ID0gXCJib3R0b21cIjtcclxuXHJcblx0dmFyIHN0eWxlcyA9IGxpc3RUb1N0eWxlcyhsaXN0KTtcclxuXHRhZGRTdHlsZXNUb0RvbShzdHlsZXMsIG9wdGlvbnMpO1xyXG5cclxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcclxuXHRcdHZhciBtYXlSZW1vdmUgPSBbXTtcclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XHJcblx0XHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xyXG5cdFx0XHRkb21TdHlsZS5yZWZzLS07XHJcblx0XHRcdG1heVJlbW92ZS5wdXNoKGRvbVN0eWxlKTtcclxuXHRcdH1cclxuXHRcdGlmKG5ld0xpc3QpIHtcclxuXHRcdFx0dmFyIG5ld1N0eWxlcyA9IGxpc3RUb1N0eWxlcyhuZXdMaXN0KTtcclxuXHRcdFx0YWRkU3R5bGVzVG9Eb20obmV3U3R5bGVzLCBvcHRpb25zKTtcclxuXHRcdH1cclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBtYXlSZW1vdmUubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGRvbVN0eWxlID0gbWF5UmVtb3ZlW2ldO1xyXG5cdFx0XHRpZihkb21TdHlsZS5yZWZzID09PSAwKSB7XHJcblx0XHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKVxyXG5cdFx0XHRcdFx0ZG9tU3R5bGUucGFydHNbal0oKTtcclxuXHRcdFx0XHRkZWxldGUgc3R5bGVzSW5Eb21bZG9tU3R5bGUuaWRdO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fTtcclxufVxyXG5cclxuZnVuY3Rpb24gYWRkU3R5bGVzVG9Eb20oc3R5bGVzLCBvcHRpb25zKSB7XHJcblx0Zm9yKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XHJcblx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcclxuXHRcdGlmKGRvbVN0eWxlKSB7XHJcblx0XHRcdGRvbVN0eWxlLnJlZnMrKztcclxuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSB7XHJcblx0XHRcdFx0ZG9tU3R5bGUucGFydHNbal0oaXRlbS5wYXJ0c1tqXSk7XHJcblx0XHRcdH1cclxuXHRcdFx0Zm9yKDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcclxuXHRcdFx0XHRkb21TdHlsZS5wYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0sIG9wdGlvbnMpKTtcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dmFyIHBhcnRzID0gW107XHJcblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XHJcblx0XHRcdFx0cGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XHJcblx0XHRcdH1cclxuXHRcdFx0c3R5bGVzSW5Eb21baXRlbS5pZF0gPSB7aWQ6IGl0ZW0uaWQsIHJlZnM6IDEsIHBhcnRzOiBwYXJ0c307XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiBsaXN0VG9TdHlsZXMobGlzdCkge1xyXG5cdHZhciBzdHlsZXMgPSBbXTtcclxuXHR2YXIgbmV3U3R5bGVzID0ge307XHJcblx0Zm9yKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcclxuXHRcdHZhciBpdGVtID0gbGlzdFtpXTtcclxuXHRcdHZhciBpZCA9IGl0ZW1bMF07XHJcblx0XHR2YXIgY3NzID0gaXRlbVsxXTtcclxuXHRcdHZhciBtZWRpYSA9IGl0ZW1bMl07XHJcblx0XHR2YXIgc291cmNlTWFwID0gaXRlbVszXTtcclxuXHRcdHZhciBwYXJ0ID0ge2NzczogY3NzLCBtZWRpYTogbWVkaWEsIHNvdXJjZU1hcDogc291cmNlTWFwfTtcclxuXHRcdGlmKCFuZXdTdHlsZXNbaWRdKVxyXG5cdFx0XHRzdHlsZXMucHVzaChuZXdTdHlsZXNbaWRdID0ge2lkOiBpZCwgcGFydHM6IFtwYXJ0XX0pO1xyXG5cdFx0ZWxzZVxyXG5cdFx0XHRuZXdTdHlsZXNbaWRdLnBhcnRzLnB1c2gocGFydCk7XHJcblx0fVxyXG5cdHJldHVybiBzdHlsZXM7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBzdHlsZUVsZW1lbnQpIHtcclxuXHR2YXIgaGVhZCA9IGdldEhlYWRFbGVtZW50KCk7XHJcblx0dmFyIGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wID0gc3R5bGVFbGVtZW50c0luc2VydGVkQXRUb3Bbc3R5bGVFbGVtZW50c0luc2VydGVkQXRUb3AubGVuZ3RoIC0gMV07XHJcblx0aWYgKG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwidG9wXCIpIHtcclxuXHRcdGlmKCFsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcCkge1xyXG5cdFx0XHRoZWFkLmluc2VydEJlZm9yZShzdHlsZUVsZW1lbnQsIGhlYWQuZmlyc3RDaGlsZCk7XHJcblx0XHR9IGVsc2UgaWYobGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AubmV4dFNpYmxpbmcpIHtcclxuXHRcdFx0aGVhZC5pbnNlcnRCZWZvcmUoc3R5bGVFbGVtZW50LCBsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcC5uZXh0U2libGluZyk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRoZWFkLmFwcGVuZENoaWxkKHN0eWxlRWxlbWVudCk7XHJcblx0XHR9XHJcblx0XHRzdHlsZUVsZW1lbnRzSW5zZXJ0ZWRBdFRvcC5wdXNoKHN0eWxlRWxlbWVudCk7XHJcblx0fSBlbHNlIGlmIChvcHRpb25zLmluc2VydEF0ID09PSBcImJvdHRvbVwiKSB7XHJcblx0XHRoZWFkLmFwcGVuZENoaWxkKHN0eWxlRWxlbWVudCk7XHJcblx0fSBlbHNlIHtcclxuXHRcdHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgdmFsdWUgZm9yIHBhcmFtZXRlciAnaW5zZXJ0QXQnLiBNdXN0IGJlICd0b3AnIG9yICdib3R0b20nLlwiKTtcclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcclxuXHRzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xyXG5cdHZhciBpZHggPSBzdHlsZUVsZW1lbnRzSW5zZXJ0ZWRBdFRvcC5pbmRleE9mKHN0eWxlRWxlbWVudCk7XHJcblx0aWYoaWR4ID49IDApIHtcclxuXHRcdHN0eWxlRWxlbWVudHNJbnNlcnRlZEF0VG9wLnNwbGljZShpZHgsIDEpO1xyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlU3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcclxuXHR2YXIgc3R5bGVFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xyXG5cdHN0eWxlRWxlbWVudC50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xyXG5cdGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBzdHlsZUVsZW1lbnQpO1xyXG5cdHJldHVybiBzdHlsZUVsZW1lbnQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUxpbmtFbGVtZW50KG9wdGlvbnMpIHtcclxuXHR2YXIgbGlua0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlua1wiKTtcclxuXHRsaW5rRWxlbWVudC5yZWwgPSBcInN0eWxlc2hlZXRcIjtcclxuXHRpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgbGlua0VsZW1lbnQpO1xyXG5cdHJldHVybiBsaW5rRWxlbWVudDtcclxufVxyXG5cclxuZnVuY3Rpb24gYWRkU3R5bGUob2JqLCBvcHRpb25zKSB7XHJcblx0dmFyIHN0eWxlRWxlbWVudCwgdXBkYXRlLCByZW1vdmU7XHJcblxyXG5cdGlmIChvcHRpb25zLnNpbmdsZXRvbikge1xyXG5cdFx0dmFyIHN0eWxlSW5kZXggPSBzaW5nbGV0b25Db3VudGVyKys7XHJcblx0XHRzdHlsZUVsZW1lbnQgPSBzaW5nbGV0b25FbGVtZW50IHx8IChzaW5nbGV0b25FbGVtZW50ID0gY3JlYXRlU3R5bGVFbGVtZW50KG9wdGlvbnMpKTtcclxuXHRcdHVwZGF0ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZUVsZW1lbnQsIHN0eWxlSW5kZXgsIGZhbHNlKTtcclxuXHRcdHJlbW92ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZUVsZW1lbnQsIHN0eWxlSW5kZXgsIHRydWUpO1xyXG5cdH0gZWxzZSBpZihvYmouc291cmNlTWFwICYmXHJcblx0XHR0eXBlb2YgVVJMID09PSBcImZ1bmN0aW9uXCIgJiZcclxuXHRcdHR5cGVvZiBVUkwuY3JlYXRlT2JqZWN0VVJMID09PSBcImZ1bmN0aW9uXCIgJiZcclxuXHRcdHR5cGVvZiBVUkwucmV2b2tlT2JqZWN0VVJMID09PSBcImZ1bmN0aW9uXCIgJiZcclxuXHRcdHR5cGVvZiBCbG9iID09PSBcImZ1bmN0aW9uXCIgJiZcclxuXHRcdHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcclxuXHRcdHN0eWxlRWxlbWVudCA9IGNyZWF0ZUxpbmtFbGVtZW50KG9wdGlvbnMpO1xyXG5cdFx0dXBkYXRlID0gdXBkYXRlTGluay5iaW5kKG51bGwsIHN0eWxlRWxlbWVudCk7XHJcblx0XHRyZW1vdmUgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0cmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XHJcblx0XHRcdGlmKHN0eWxlRWxlbWVudC5ocmVmKVxyXG5cdFx0XHRcdFVSTC5yZXZva2VPYmplY3RVUkwoc3R5bGVFbGVtZW50LmhyZWYpO1xyXG5cdFx0fTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0c3R5bGVFbGVtZW50ID0gY3JlYXRlU3R5bGVFbGVtZW50KG9wdGlvbnMpO1xyXG5cdFx0dXBkYXRlID0gYXBwbHlUb1RhZy5iaW5kKG51bGwsIHN0eWxlRWxlbWVudCk7XHJcblx0XHRyZW1vdmUgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0cmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XHJcblx0XHR9O1xyXG5cdH1cclxuXHJcblx0dXBkYXRlKG9iaik7XHJcblxyXG5cdHJldHVybiBmdW5jdGlvbiB1cGRhdGVTdHlsZShuZXdPYmopIHtcclxuXHRcdGlmKG5ld09iaikge1xyXG5cdFx0XHRpZihuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXApXHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR1cGRhdGUob2JqID0gbmV3T2JqKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJlbW92ZSgpO1xyXG5cdFx0fVxyXG5cdH07XHJcbn1cclxuXHJcbnZhciByZXBsYWNlVGV4dCA9IChmdW5jdGlvbiAoKSB7XHJcblx0dmFyIHRleHRTdG9yZSA9IFtdO1xyXG5cclxuXHRyZXR1cm4gZnVuY3Rpb24gKGluZGV4LCByZXBsYWNlbWVudCkge1xyXG5cdFx0dGV4dFN0b3JlW2luZGV4XSA9IHJlcGxhY2VtZW50O1xyXG5cdFx0cmV0dXJuIHRleHRTdG9yZS5maWx0ZXIoQm9vbGVhbikuam9pbignXFxuJyk7XHJcblx0fTtcclxufSkoKTtcclxuXHJcbmZ1bmN0aW9uIGFwcGx5VG9TaW5nbGV0b25UYWcoc3R5bGVFbGVtZW50LCBpbmRleCwgcmVtb3ZlLCBvYmopIHtcclxuXHR2YXIgY3NzID0gcmVtb3ZlID8gXCJcIiA6IG9iai5jc3M7XHJcblxyXG5cdGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xyXG5cdFx0c3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IHJlcGxhY2VUZXh0KGluZGV4LCBjc3MpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHR2YXIgY3NzTm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcyk7XHJcblx0XHR2YXIgY2hpbGROb2RlcyA9IHN0eWxlRWxlbWVudC5jaGlsZE5vZGVzO1xyXG5cdFx0aWYgKGNoaWxkTm9kZXNbaW5kZXhdKSBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoY2hpbGROb2Rlc1tpbmRleF0pO1xyXG5cdFx0aWYgKGNoaWxkTm9kZXMubGVuZ3RoKSB7XHJcblx0XHRcdHN0eWxlRWxlbWVudC5pbnNlcnRCZWZvcmUoY3NzTm9kZSwgY2hpbGROb2Rlc1tpbmRleF0pO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0c3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGNzc05vZGUpO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gYXBwbHlUb1RhZyhzdHlsZUVsZW1lbnQsIG9iaikge1xyXG5cdHZhciBjc3MgPSBvYmouY3NzO1xyXG5cdHZhciBtZWRpYSA9IG9iai5tZWRpYTtcclxuXHR2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcclxuXHJcblx0aWYobWVkaWEpIHtcclxuXHRcdHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJtZWRpYVwiLCBtZWRpYSlcclxuXHR9XHJcblxyXG5cdGlmKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XHJcblx0XHRzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xyXG5cdH0gZWxzZSB7XHJcblx0XHR3aGlsZShzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xyXG5cdFx0XHRzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xyXG5cdFx0fVxyXG5cdFx0c3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gdXBkYXRlTGluayhsaW5rRWxlbWVudCwgb2JqKSB7XHJcblx0dmFyIGNzcyA9IG9iai5jc3M7XHJcblx0dmFyIG1lZGlhID0gb2JqLm1lZGlhO1xyXG5cdHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xyXG5cclxuXHRpZihzb3VyY2VNYXApIHtcclxuXHRcdC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzI2NjAzODc1XHJcblx0XHRjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiICsgYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSArIFwiICovXCI7XHJcblx0fVxyXG5cclxuXHR2YXIgYmxvYiA9IG5ldyBCbG9iKFtjc3NdLCB7IHR5cGU6IFwidGV4dC9jc3NcIiB9KTtcclxuXHJcblx0dmFyIG9sZFNyYyA9IGxpbmtFbGVtZW50LmhyZWY7XHJcblxyXG5cdGxpbmtFbGVtZW50LmhyZWYgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xyXG5cclxuXHRpZihvbGRTcmMpXHJcblx0XHRVUkwucmV2b2tlT2JqZWN0VVJMKG9sZFNyYyk7XHJcbn1cclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vc3R5bGUtbG9hZGVyL2FkZFN0eWxlcy5qc1xuICoqIG1vZHVsZSBpZCA9IDRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxudmFyIGpRdWVyeSA9IHJlcXVpcmUoJ2pxdWVyeS9zcmMvY29yZS5qcycpO1xucmVxdWlyZSgnanF1ZXJ5L3NyYy9zZWxlY3Rvci1uYXRpdmUuanMnKTtcbnJlcXVpcmUoJ2pxdWVyeS9zcmMvZXZlbnQuanMnKTtcbnJlcXVpcmUoJ2pxdWVyeS9zcmMvZXZlbnQvYWxpYXMuanMnKTtcbnJlcXVpcmUoJ2pxdWVyeS9zcmMvbWFuaXB1bGF0aW9uLmpzJyk7XG5yZXF1aXJlKCdqcXVlcnkvc3JjL2FqYXguanMnKTtcbnJlcXVpcmUoJ2pxdWVyeS9zcmMvYWpheC94aHIuanMnKTtcbnJlcXVpcmUoJ2pxdWVyeS9zcmMvY29yZS9wYXJzZUhUTUwuanMnKTtcbnJlcXVpcmUoJ2pxdWVyeS9zcmMvYXR0cmlidXRlcy9jbGFzc2VzLmpzJyk7XG5yZXF1aXJlKCdqcXVlcnkvc3JjL2F0dHJpYnV0ZXMvYXR0ci5qcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGpRdWVyeTsgXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2xpYi9tb2R1bGVzL2pxdWVyeS1odWQuanNcbiAqKiBtb2R1bGUgaWQgPSA1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJkZWZpbmUoW1xuXHRcIi4vdmFyL2FyclwiLFxuXHRcIi4vdmFyL3NsaWNlXCIsXG5cdFwiLi92YXIvY29uY2F0XCIsXG5cdFwiLi92YXIvcHVzaFwiLFxuXHRcIi4vdmFyL2luZGV4T2ZcIixcblx0XCIuL3Zhci9jbGFzczJ0eXBlXCIsXG5cdFwiLi92YXIvdG9TdHJpbmdcIixcblx0XCIuL3Zhci9oYXNPd25cIixcblx0XCIuL3Zhci9zdXBwb3J0XCJcbl0sIGZ1bmN0aW9uKCBhcnIsIHNsaWNlLCBjb25jYXQsIHB1c2gsIGluZGV4T2YsIGNsYXNzMnR5cGUsIHRvU3RyaW5nLCBoYXNPd24sIHN1cHBvcnQgKSB7XG5cbnZhclxuXHQvLyBVc2UgdGhlIGNvcnJlY3QgZG9jdW1lbnQgYWNjb3JkaW5nbHkgd2l0aCB3aW5kb3cgYXJndW1lbnQgKHNhbmRib3gpXG5cdGRvY3VtZW50ID0gd2luZG93LmRvY3VtZW50LFxuXG5cdHZlcnNpb24gPSBcIkBWRVJTSU9OXCIsXG5cblx0Ly8gRGVmaW5lIGEgbG9jYWwgY29weSBvZiBqUXVlcnlcblx0alF1ZXJ5ID0gZnVuY3Rpb24oIHNlbGVjdG9yLCBjb250ZXh0ICkge1xuXHRcdC8vIFRoZSBqUXVlcnkgb2JqZWN0IGlzIGFjdHVhbGx5IGp1c3QgdGhlIGluaXQgY29uc3RydWN0b3IgJ2VuaGFuY2VkJ1xuXHRcdC8vIE5lZWQgaW5pdCBpZiBqUXVlcnkgaXMgY2FsbGVkIChqdXN0IGFsbG93IGVycm9yIHRvIGJlIHRocm93biBpZiBub3QgaW5jbHVkZWQpXG5cdFx0cmV0dXJuIG5ldyBqUXVlcnkuZm4uaW5pdCggc2VsZWN0b3IsIGNvbnRleHQgKTtcblx0fSxcblxuXHQvLyBTdXBwb3J0OiBBbmRyb2lkPDQuMVxuXHQvLyBNYWtlIHN1cmUgd2UgdHJpbSBCT00gYW5kIE5CU1Bcblx0cnRyaW0gPSAvXltcXHNcXHVGRUZGXFx4QTBdK3xbXFxzXFx1RkVGRlxceEEwXSskL2csXG5cblx0Ly8gTWF0Y2hlcyBkYXNoZWQgc3RyaW5nIGZvciBjYW1lbGl6aW5nXG5cdHJtc1ByZWZpeCA9IC9eLW1zLS8sXG5cdHJkYXNoQWxwaGEgPSAvLShbXFxkYS16XSkvZ2ksXG5cblx0Ly8gVXNlZCBieSBqUXVlcnkuY2FtZWxDYXNlIGFzIGNhbGxiYWNrIHRvIHJlcGxhY2UoKVxuXHRmY2FtZWxDYXNlID0gZnVuY3Rpb24oIGFsbCwgbGV0dGVyICkge1xuXHRcdHJldHVybiBsZXR0ZXIudG9VcHBlckNhc2UoKTtcblx0fTtcblxualF1ZXJ5LmZuID0galF1ZXJ5LnByb3RvdHlwZSA9IHtcblx0Ly8gVGhlIGN1cnJlbnQgdmVyc2lvbiBvZiBqUXVlcnkgYmVpbmcgdXNlZFxuXHRqcXVlcnk6IHZlcnNpb24sXG5cblx0Y29uc3RydWN0b3I6IGpRdWVyeSxcblxuXHQvLyBTdGFydCB3aXRoIGFuIGVtcHR5IHNlbGVjdG9yXG5cdHNlbGVjdG9yOiBcIlwiLFxuXG5cdC8vIFRoZSBkZWZhdWx0IGxlbmd0aCBvZiBhIGpRdWVyeSBvYmplY3QgaXMgMFxuXHRsZW5ndGg6IDAsXG5cblx0dG9BcnJheTogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIHNsaWNlLmNhbGwoIHRoaXMgKTtcblx0fSxcblxuXHQvLyBHZXQgdGhlIE50aCBlbGVtZW50IGluIHRoZSBtYXRjaGVkIGVsZW1lbnQgc2V0IE9SXG5cdC8vIEdldCB0aGUgd2hvbGUgbWF0Y2hlZCBlbGVtZW50IHNldCBhcyBhIGNsZWFuIGFycmF5XG5cdGdldDogZnVuY3Rpb24oIG51bSApIHtcblx0XHRyZXR1cm4gbnVtICE9IG51bGwgP1xuXG5cdFx0XHQvLyBSZXR1cm4ganVzdCB0aGUgb25lIGVsZW1lbnQgZnJvbSB0aGUgc2V0XG5cdFx0XHQoIG51bSA8IDAgPyB0aGlzWyBudW0gKyB0aGlzLmxlbmd0aCBdIDogdGhpc1sgbnVtIF0gKSA6XG5cblx0XHRcdC8vIFJldHVybiBhbGwgdGhlIGVsZW1lbnRzIGluIGEgY2xlYW4gYXJyYXlcblx0XHRcdHNsaWNlLmNhbGwoIHRoaXMgKTtcblx0fSxcblxuXHQvLyBUYWtlIGFuIGFycmF5IG9mIGVsZW1lbnRzIGFuZCBwdXNoIGl0IG9udG8gdGhlIHN0YWNrXG5cdC8vIChyZXR1cm5pbmcgdGhlIG5ldyBtYXRjaGVkIGVsZW1lbnQgc2V0KVxuXHRwdXNoU3RhY2s6IGZ1bmN0aW9uKCBlbGVtcyApIHtcblxuXHRcdC8vIEJ1aWxkIGEgbmV3IGpRdWVyeSBtYXRjaGVkIGVsZW1lbnQgc2V0XG5cdFx0dmFyIHJldCA9IGpRdWVyeS5tZXJnZSggdGhpcy5jb25zdHJ1Y3RvcigpLCBlbGVtcyApO1xuXG5cdFx0Ly8gQWRkIHRoZSBvbGQgb2JqZWN0IG9udG8gdGhlIHN0YWNrIChhcyBhIHJlZmVyZW5jZSlcblx0XHRyZXQucHJldk9iamVjdCA9IHRoaXM7XG5cdFx0cmV0LmNvbnRleHQgPSB0aGlzLmNvbnRleHQ7XG5cblx0XHQvLyBSZXR1cm4gdGhlIG5ld2x5LWZvcm1lZCBlbGVtZW50IHNldFxuXHRcdHJldHVybiByZXQ7XG5cdH0sXG5cblx0Ly8gRXhlY3V0ZSBhIGNhbGxiYWNrIGZvciBldmVyeSBlbGVtZW50IGluIHRoZSBtYXRjaGVkIHNldC5cblx0Ly8gKFlvdSBjYW4gc2VlZCB0aGUgYXJndW1lbnRzIHdpdGggYW4gYXJyYXkgb2YgYXJncywgYnV0IHRoaXMgaXNcblx0Ly8gb25seSB1c2VkIGludGVybmFsbHkuKVxuXHRlYWNoOiBmdW5jdGlvbiggY2FsbGJhY2ssIGFyZ3MgKSB7XG5cdFx0cmV0dXJuIGpRdWVyeS5lYWNoKCB0aGlzLCBjYWxsYmFjaywgYXJncyApO1xuXHR9LFxuXG5cdG1hcDogZnVuY3Rpb24oIGNhbGxiYWNrICkge1xuXHRcdHJldHVybiB0aGlzLnB1c2hTdGFjayggalF1ZXJ5Lm1hcCh0aGlzLCBmdW5jdGlvbiggZWxlbSwgaSApIHtcblx0XHRcdHJldHVybiBjYWxsYmFjay5jYWxsKCBlbGVtLCBpLCBlbGVtICk7XG5cdFx0fSkpO1xuXHR9LFxuXG5cdHNsaWNlOiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gdGhpcy5wdXNoU3RhY2soIHNsaWNlLmFwcGx5KCB0aGlzLCBhcmd1bWVudHMgKSApO1xuXHR9LFxuXG5cdGZpcnN0OiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gdGhpcy5lcSggMCApO1xuXHR9LFxuXG5cdGxhc3Q6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiB0aGlzLmVxKCAtMSApO1xuXHR9LFxuXG5cdGVxOiBmdW5jdGlvbiggaSApIHtcblx0XHR2YXIgbGVuID0gdGhpcy5sZW5ndGgsXG5cdFx0XHRqID0gK2kgKyAoIGkgPCAwID8gbGVuIDogMCApO1xuXHRcdHJldHVybiB0aGlzLnB1c2hTdGFjayggaiA+PSAwICYmIGogPCBsZW4gPyBbIHRoaXNbal0gXSA6IFtdICk7XG5cdH0sXG5cblx0ZW5kOiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gdGhpcy5wcmV2T2JqZWN0IHx8IHRoaXMuY29uc3RydWN0b3IobnVsbCk7XG5cdH0sXG5cblx0Ly8gRm9yIGludGVybmFsIHVzZSBvbmx5LlxuXHQvLyBCZWhhdmVzIGxpa2UgYW4gQXJyYXkncyBtZXRob2QsIG5vdCBsaWtlIGEgalF1ZXJ5IG1ldGhvZC5cblx0cHVzaDogcHVzaCxcblx0c29ydDogYXJyLnNvcnQsXG5cdHNwbGljZTogYXJyLnNwbGljZVxufTtcblxualF1ZXJ5LmV4dGVuZCA9IGpRdWVyeS5mbi5leHRlbmQgPSBmdW5jdGlvbigpIHtcblx0dmFyIG9wdGlvbnMsIG5hbWUsIHNyYywgY29weSwgY29weUlzQXJyYXksIGNsb25lLFxuXHRcdHRhcmdldCA9IGFyZ3VtZW50c1swXSB8fCB7fSxcblx0XHRpID0gMSxcblx0XHRsZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoLFxuXHRcdGRlZXAgPSBmYWxzZTtcblxuXHQvLyBIYW5kbGUgYSBkZWVwIGNvcHkgc2l0dWF0aW9uXG5cdGlmICggdHlwZW9mIHRhcmdldCA9PT0gXCJib29sZWFuXCIgKSB7XG5cdFx0ZGVlcCA9IHRhcmdldDtcblxuXHRcdC8vIFNraXAgdGhlIGJvb2xlYW4gYW5kIHRoZSB0YXJnZXRcblx0XHR0YXJnZXQgPSBhcmd1bWVudHNbIGkgXSB8fCB7fTtcblx0XHRpKys7XG5cdH1cblxuXHQvLyBIYW5kbGUgY2FzZSB3aGVuIHRhcmdldCBpcyBhIHN0cmluZyBvciBzb21ldGhpbmcgKHBvc3NpYmxlIGluIGRlZXAgY29weSlcblx0aWYgKCB0eXBlb2YgdGFyZ2V0ICE9PSBcIm9iamVjdFwiICYmICFqUXVlcnkuaXNGdW5jdGlvbih0YXJnZXQpICkge1xuXHRcdHRhcmdldCA9IHt9O1xuXHR9XG5cblx0Ly8gRXh0ZW5kIGpRdWVyeSBpdHNlbGYgaWYgb25seSBvbmUgYXJndW1lbnQgaXMgcGFzc2VkXG5cdGlmICggaSA9PT0gbGVuZ3RoICkge1xuXHRcdHRhcmdldCA9IHRoaXM7XG5cdFx0aS0tO1xuXHR9XG5cblx0Zm9yICggOyBpIDwgbGVuZ3RoOyBpKysgKSB7XG5cdFx0Ly8gT25seSBkZWFsIHdpdGggbm9uLW51bGwvdW5kZWZpbmVkIHZhbHVlc1xuXHRcdGlmICggKG9wdGlvbnMgPSBhcmd1bWVudHNbIGkgXSkgIT0gbnVsbCApIHtcblx0XHRcdC8vIEV4dGVuZCB0aGUgYmFzZSBvYmplY3Rcblx0XHRcdGZvciAoIG5hbWUgaW4gb3B0aW9ucyApIHtcblx0XHRcdFx0c3JjID0gdGFyZ2V0WyBuYW1lIF07XG5cdFx0XHRcdGNvcHkgPSBvcHRpb25zWyBuYW1lIF07XG5cblx0XHRcdFx0Ly8gUHJldmVudCBuZXZlci1lbmRpbmcgbG9vcFxuXHRcdFx0XHRpZiAoIHRhcmdldCA9PT0gY29weSApIHtcblx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIFJlY3Vyc2UgaWYgd2UncmUgbWVyZ2luZyBwbGFpbiBvYmplY3RzIG9yIGFycmF5c1xuXHRcdFx0XHRpZiAoIGRlZXAgJiYgY29weSAmJiAoIGpRdWVyeS5pc1BsYWluT2JqZWN0KGNvcHkpIHx8IChjb3B5SXNBcnJheSA9IGpRdWVyeS5pc0FycmF5KGNvcHkpKSApICkge1xuXHRcdFx0XHRcdGlmICggY29weUlzQXJyYXkgKSB7XG5cdFx0XHRcdFx0XHRjb3B5SXNBcnJheSA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0Y2xvbmUgPSBzcmMgJiYgalF1ZXJ5LmlzQXJyYXkoc3JjKSA/IHNyYyA6IFtdO1xuXG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGNsb25lID0gc3JjICYmIGpRdWVyeS5pc1BsYWluT2JqZWN0KHNyYykgPyBzcmMgOiB7fTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvLyBOZXZlciBtb3ZlIG9yaWdpbmFsIG9iamVjdHMsIGNsb25lIHRoZW1cblx0XHRcdFx0XHR0YXJnZXRbIG5hbWUgXSA9IGpRdWVyeS5leHRlbmQoIGRlZXAsIGNsb25lLCBjb3B5ICk7XG5cblx0XHRcdFx0Ly8gRG9uJ3QgYnJpbmcgaW4gdW5kZWZpbmVkIHZhbHVlc1xuXHRcdFx0XHR9IGVsc2UgaWYgKCBjb3B5ICE9PSB1bmRlZmluZWQgKSB7XG5cdFx0XHRcdFx0dGFyZ2V0WyBuYW1lIF0gPSBjb3B5O1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Ly8gUmV0dXJuIHRoZSBtb2RpZmllZCBvYmplY3Rcblx0cmV0dXJuIHRhcmdldDtcbn07XG5cbmpRdWVyeS5leHRlbmQoe1xuXHQvLyBVbmlxdWUgZm9yIGVhY2ggY29weSBvZiBqUXVlcnkgb24gdGhlIHBhZ2Vcblx0ZXhwYW5kbzogXCJqUXVlcnlcIiArICggdmVyc2lvbiArIE1hdGgucmFuZG9tKCkgKS5yZXBsYWNlKCAvXFxEL2csIFwiXCIgKSxcblxuXHQvLyBBc3N1bWUgalF1ZXJ5IGlzIHJlYWR5IHdpdGhvdXQgdGhlIHJlYWR5IG1vZHVsZVxuXHRpc1JlYWR5OiB0cnVlLFxuXG5cdGVycm9yOiBmdW5jdGlvbiggbXNnICkge1xuXHRcdHRocm93IG5ldyBFcnJvciggbXNnICk7XG5cdH0sXG5cblx0bm9vcDogZnVuY3Rpb24oKSB7fSxcblxuXHRpc0Z1bmN0aW9uOiBmdW5jdGlvbiggb2JqICkge1xuXHRcdHJldHVybiBqUXVlcnkudHlwZShvYmopID09PSBcImZ1bmN0aW9uXCI7XG5cdH0sXG5cblx0aXNBcnJheTogQXJyYXkuaXNBcnJheSxcblxuXHRpc1dpbmRvdzogZnVuY3Rpb24oIG9iaiApIHtcblx0XHRyZXR1cm4gb2JqICE9IG51bGwgJiYgb2JqID09PSBvYmoud2luZG93O1xuXHR9LFxuXG5cdGlzTnVtZXJpYzogZnVuY3Rpb24oIG9iaiApIHtcblx0XHQvLyBwYXJzZUZsb2F0IE5hTnMgbnVtZXJpYy1jYXN0IGZhbHNlIHBvc2l0aXZlcyAobnVsbHx0cnVlfGZhbHNlfFwiXCIpXG5cdFx0Ly8gLi4uYnV0IG1pc2ludGVycHJldHMgbGVhZGluZy1udW1iZXIgc3RyaW5ncywgcGFydGljdWxhcmx5IGhleCBsaXRlcmFscyAoXCIweC4uLlwiKVxuXHRcdC8vIHN1YnRyYWN0aW9uIGZvcmNlcyBpbmZpbml0aWVzIHRvIE5hTlxuXHRcdC8vIGFkZGluZyAxIGNvcnJlY3RzIGxvc3Mgb2YgcHJlY2lzaW9uIGZyb20gcGFyc2VGbG9hdCAoIzE1MTAwKVxuXHRcdHJldHVybiAhalF1ZXJ5LmlzQXJyYXkoIG9iaiApICYmIChvYmogLSBwYXJzZUZsb2F0KCBvYmogKSArIDEpID49IDA7XG5cdH0sXG5cblx0aXNQbGFpbk9iamVjdDogZnVuY3Rpb24oIG9iaiApIHtcblx0XHQvLyBOb3QgcGxhaW4gb2JqZWN0czpcblx0XHQvLyAtIEFueSBvYmplY3Qgb3IgdmFsdWUgd2hvc2UgaW50ZXJuYWwgW1tDbGFzc11dIHByb3BlcnR5IGlzIG5vdCBcIltvYmplY3QgT2JqZWN0XVwiXG5cdFx0Ly8gLSBET00gbm9kZXNcblx0XHQvLyAtIHdpbmRvd1xuXHRcdGlmICggalF1ZXJ5LnR5cGUoIG9iaiApICE9PSBcIm9iamVjdFwiIHx8IG9iai5ub2RlVHlwZSB8fCBqUXVlcnkuaXNXaW5kb3coIG9iaiApICkge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdGlmICggb2JqLmNvbnN0cnVjdG9yICYmXG5cdFx0XHRcdCFoYXNPd24uY2FsbCggb2JqLmNvbnN0cnVjdG9yLnByb3RvdHlwZSwgXCJpc1Byb3RvdHlwZU9mXCIgKSApIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHQvLyBJZiB0aGUgZnVuY3Rpb24gaGFzbid0IHJldHVybmVkIGFscmVhZHksIHdlJ3JlIGNvbmZpZGVudCB0aGF0XG5cdFx0Ly8gfG9ianwgaXMgYSBwbGFpbiBvYmplY3QsIGNyZWF0ZWQgYnkge30gb3IgY29uc3RydWN0ZWQgd2l0aCBuZXcgT2JqZWN0XG5cdFx0cmV0dXJuIHRydWU7XG5cdH0sXG5cblx0aXNFbXB0eU9iamVjdDogZnVuY3Rpb24oIG9iaiApIHtcblx0XHR2YXIgbmFtZTtcblx0XHRmb3IgKCBuYW1lIGluIG9iaiApIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdFx0cmV0dXJuIHRydWU7XG5cdH0sXG5cblx0dHlwZTogZnVuY3Rpb24oIG9iaiApIHtcblx0XHRpZiAoIG9iaiA9PSBudWxsICkge1xuXHRcdFx0cmV0dXJuIG9iaiArIFwiXCI7XG5cdFx0fVxuXHRcdC8vIFN1cHBvcnQ6IEFuZHJvaWQ8NC4wLCBpT1M8NiAoZnVuY3Rpb25pc2ggUmVnRXhwKVxuXHRcdHJldHVybiB0eXBlb2Ygb2JqID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBvYmogPT09IFwiZnVuY3Rpb25cIiA/XG5cdFx0XHRjbGFzczJ0eXBlWyB0b1N0cmluZy5jYWxsKG9iaikgXSB8fCBcIm9iamVjdFwiIDpcblx0XHRcdHR5cGVvZiBvYmo7XG5cdH0sXG5cblx0Ly8gRXZhbHVhdGVzIGEgc2NyaXB0IGluIGEgZ2xvYmFsIGNvbnRleHRcblx0Z2xvYmFsRXZhbDogZnVuY3Rpb24oIGNvZGUgKSB7XG5cdFx0dmFyIHNjcmlwdCxcblx0XHRcdGluZGlyZWN0ID0gZXZhbDtcblxuXHRcdGNvZGUgPSBqUXVlcnkudHJpbSggY29kZSApO1xuXG5cdFx0aWYgKCBjb2RlICkge1xuXHRcdFx0Ly8gSWYgdGhlIGNvZGUgaW5jbHVkZXMgYSB2YWxpZCwgcHJvbG9ndWUgcG9zaXRpb25cblx0XHRcdC8vIHN0cmljdCBtb2RlIHByYWdtYSwgZXhlY3V0ZSBjb2RlIGJ5IGluamVjdGluZyBhXG5cdFx0XHQvLyBzY3JpcHQgdGFnIGludG8gdGhlIGRvY3VtZW50LlxuXHRcdFx0aWYgKCBjb2RlLmluZGV4T2YoXCJ1c2Ugc3RyaWN0XCIpID09PSAxICkge1xuXHRcdFx0XHRzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xuXHRcdFx0XHRzY3JpcHQudGV4dCA9IGNvZGU7XG5cdFx0XHRcdGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoIHNjcmlwdCApLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoIHNjcmlwdCApO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdC8vIE90aGVyd2lzZSwgYXZvaWQgdGhlIERPTSBub2RlIGNyZWF0aW9uLCBpbnNlcnRpb25cblx0XHRcdC8vIGFuZCByZW1vdmFsIGJ5IHVzaW5nIGFuIGluZGlyZWN0IGdsb2JhbCBldmFsXG5cdFx0XHRcdGluZGlyZWN0KCBjb2RlICk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXG5cdC8vIENvbnZlcnQgZGFzaGVkIHRvIGNhbWVsQ2FzZTsgdXNlZCBieSB0aGUgY3NzIGFuZCBkYXRhIG1vZHVsZXNcblx0Ly8gU3VwcG9ydDogSUU5LTExK1xuXHQvLyBNaWNyb3NvZnQgZm9yZ290IHRvIGh1bXAgdGhlaXIgdmVuZG9yIHByZWZpeCAoIzk1NzIpXG5cdGNhbWVsQ2FzZTogZnVuY3Rpb24oIHN0cmluZyApIHtcblx0XHRyZXR1cm4gc3RyaW5nLnJlcGxhY2UoIHJtc1ByZWZpeCwgXCJtcy1cIiApLnJlcGxhY2UoIHJkYXNoQWxwaGEsIGZjYW1lbENhc2UgKTtcblx0fSxcblxuXHRub2RlTmFtZTogZnVuY3Rpb24oIGVsZW0sIG5hbWUgKSB7XG5cdFx0cmV0dXJuIGVsZW0ubm9kZU5hbWUgJiYgZWxlbS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpID09PSBuYW1lLnRvTG93ZXJDYXNlKCk7XG5cdH0sXG5cblx0Ly8gYXJncyBpcyBmb3IgaW50ZXJuYWwgdXNhZ2Ugb25seVxuXHRlYWNoOiBmdW5jdGlvbiggb2JqLCBjYWxsYmFjaywgYXJncyApIHtcblx0XHR2YXIgdmFsdWUsXG5cdFx0XHRpID0gMCxcblx0XHRcdGxlbmd0aCA9IG9iai5sZW5ndGgsXG5cdFx0XHRpc0FycmF5ID0gaXNBcnJheWxpa2UoIG9iaiApO1xuXG5cdFx0aWYgKCBhcmdzICkge1xuXHRcdFx0aWYgKCBpc0FycmF5ICkge1xuXHRcdFx0XHRmb3IgKCA7IGkgPCBsZW5ndGg7IGkrKyApIHtcblx0XHRcdFx0XHR2YWx1ZSA9IGNhbGxiYWNrLmFwcGx5KCBvYmpbIGkgXSwgYXJncyApO1xuXG5cdFx0XHRcdFx0aWYgKCB2YWx1ZSA9PT0gZmFsc2UgKSB7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZvciAoIGkgaW4gb2JqICkge1xuXHRcdFx0XHRcdHZhbHVlID0gY2FsbGJhY2suYXBwbHkoIG9ialsgaSBdLCBhcmdzICk7XG5cblx0XHRcdFx0XHRpZiAoIHZhbHVlID09PSBmYWxzZSApIHtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0Ly8gQSBzcGVjaWFsLCBmYXN0LCBjYXNlIGZvciB0aGUgbW9zdCBjb21tb24gdXNlIG9mIGVhY2hcblx0XHR9IGVsc2Uge1xuXHRcdFx0aWYgKCBpc0FycmF5ICkge1xuXHRcdFx0XHRmb3IgKCA7IGkgPCBsZW5ndGg7IGkrKyApIHtcblx0XHRcdFx0XHR2YWx1ZSA9IGNhbGxiYWNrLmNhbGwoIG9ialsgaSBdLCBpLCBvYmpbIGkgXSApO1xuXG5cdFx0XHRcdFx0aWYgKCB2YWx1ZSA9PT0gZmFsc2UgKSB7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZvciAoIGkgaW4gb2JqICkge1xuXHRcdFx0XHRcdHZhbHVlID0gY2FsbGJhY2suY2FsbCggb2JqWyBpIF0sIGksIG9ialsgaSBdICk7XG5cblx0XHRcdFx0XHRpZiAoIHZhbHVlID09PSBmYWxzZSApIHtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBvYmo7XG5cdH0sXG5cblx0Ly8gU3VwcG9ydDogQW5kcm9pZDw0LjFcblx0dHJpbTogZnVuY3Rpb24oIHRleHQgKSB7XG5cdFx0cmV0dXJuIHRleHQgPT0gbnVsbCA/XG5cdFx0XHRcIlwiIDpcblx0XHRcdCggdGV4dCArIFwiXCIgKS5yZXBsYWNlKCBydHJpbSwgXCJcIiApO1xuXHR9LFxuXG5cdC8vIHJlc3VsdHMgaXMgZm9yIGludGVybmFsIHVzYWdlIG9ubHlcblx0bWFrZUFycmF5OiBmdW5jdGlvbiggYXJyLCByZXN1bHRzICkge1xuXHRcdHZhciByZXQgPSByZXN1bHRzIHx8IFtdO1xuXG5cdFx0aWYgKCBhcnIgIT0gbnVsbCApIHtcblx0XHRcdGlmICggaXNBcnJheWxpa2UoIE9iamVjdChhcnIpICkgKSB7XG5cdFx0XHRcdGpRdWVyeS5tZXJnZSggcmV0LFxuXHRcdFx0XHRcdHR5cGVvZiBhcnIgPT09IFwic3RyaW5nXCIgP1xuXHRcdFx0XHRcdFsgYXJyIF0gOiBhcnJcblx0XHRcdFx0KTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHB1c2guY2FsbCggcmV0LCBhcnIgKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gcmV0O1xuXHR9LFxuXG5cdGluQXJyYXk6IGZ1bmN0aW9uKCBlbGVtLCBhcnIsIGkgKSB7XG5cdFx0cmV0dXJuIGFyciA9PSBudWxsID8gLTEgOiBpbmRleE9mLmNhbGwoIGFyciwgZWxlbSwgaSApO1xuXHR9LFxuXG5cdG1lcmdlOiBmdW5jdGlvbiggZmlyc3QsIHNlY29uZCApIHtcblx0XHR2YXIgbGVuID0gK3NlY29uZC5sZW5ndGgsXG5cdFx0XHRqID0gMCxcblx0XHRcdGkgPSBmaXJzdC5sZW5ndGg7XG5cblx0XHRmb3IgKCA7IGogPCBsZW47IGorKyApIHtcblx0XHRcdGZpcnN0WyBpKysgXSA9IHNlY29uZFsgaiBdO1xuXHRcdH1cblxuXHRcdGZpcnN0Lmxlbmd0aCA9IGk7XG5cblx0XHRyZXR1cm4gZmlyc3Q7XG5cdH0sXG5cblx0Z3JlcDogZnVuY3Rpb24oIGVsZW1zLCBjYWxsYmFjaywgaW52ZXJ0ICkge1xuXHRcdHZhciBjYWxsYmFja0ludmVyc2UsXG5cdFx0XHRtYXRjaGVzID0gW10sXG5cdFx0XHRpID0gMCxcblx0XHRcdGxlbmd0aCA9IGVsZW1zLmxlbmd0aCxcblx0XHRcdGNhbGxiYWNrRXhwZWN0ID0gIWludmVydDtcblxuXHRcdC8vIEdvIHRocm91Z2ggdGhlIGFycmF5LCBvbmx5IHNhdmluZyB0aGUgaXRlbXNcblx0XHQvLyB0aGF0IHBhc3MgdGhlIHZhbGlkYXRvciBmdW5jdGlvblxuXHRcdGZvciAoIDsgaSA8IGxlbmd0aDsgaSsrICkge1xuXHRcdFx0Y2FsbGJhY2tJbnZlcnNlID0gIWNhbGxiYWNrKCBlbGVtc1sgaSBdLCBpICk7XG5cdFx0XHRpZiAoIGNhbGxiYWNrSW52ZXJzZSAhPT0gY2FsbGJhY2tFeHBlY3QgKSB7XG5cdFx0XHRcdG1hdGNoZXMucHVzaCggZWxlbXNbIGkgXSApO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBtYXRjaGVzO1xuXHR9LFxuXG5cdC8vIGFyZyBpcyBmb3IgaW50ZXJuYWwgdXNhZ2Ugb25seVxuXHRtYXA6IGZ1bmN0aW9uKCBlbGVtcywgY2FsbGJhY2ssIGFyZyApIHtcblx0XHR2YXIgdmFsdWUsXG5cdFx0XHRpID0gMCxcblx0XHRcdGxlbmd0aCA9IGVsZW1zLmxlbmd0aCxcblx0XHRcdGlzQXJyYXkgPSBpc0FycmF5bGlrZSggZWxlbXMgKSxcblx0XHRcdHJldCA9IFtdO1xuXG5cdFx0Ly8gR28gdGhyb3VnaCB0aGUgYXJyYXksIHRyYW5zbGF0aW5nIGVhY2ggb2YgdGhlIGl0ZW1zIHRvIHRoZWlyIG5ldyB2YWx1ZXNcblx0XHRpZiAoIGlzQXJyYXkgKSB7XG5cdFx0XHRmb3IgKCA7IGkgPCBsZW5ndGg7IGkrKyApIHtcblx0XHRcdFx0dmFsdWUgPSBjYWxsYmFjayggZWxlbXNbIGkgXSwgaSwgYXJnICk7XG5cblx0XHRcdFx0aWYgKCB2YWx1ZSAhPSBudWxsICkge1xuXHRcdFx0XHRcdHJldC5wdXNoKCB2YWx1ZSApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHQvLyBHbyB0aHJvdWdoIGV2ZXJ5IGtleSBvbiB0aGUgb2JqZWN0LFxuXHRcdH0gZWxzZSB7XG5cdFx0XHRmb3IgKCBpIGluIGVsZW1zICkge1xuXHRcdFx0XHR2YWx1ZSA9IGNhbGxiYWNrKCBlbGVtc1sgaSBdLCBpLCBhcmcgKTtcblxuXHRcdFx0XHRpZiAoIHZhbHVlICE9IG51bGwgKSB7XG5cdFx0XHRcdFx0cmV0LnB1c2goIHZhbHVlICk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBGbGF0dGVuIGFueSBuZXN0ZWQgYXJyYXlzXG5cdFx0cmV0dXJuIGNvbmNhdC5hcHBseSggW10sIHJldCApO1xuXHR9LFxuXG5cdC8vIEEgZ2xvYmFsIEdVSUQgY291bnRlciBmb3Igb2JqZWN0c1xuXHRndWlkOiAxLFxuXG5cdC8vIEJpbmQgYSBmdW5jdGlvbiB0byBhIGNvbnRleHQsIG9wdGlvbmFsbHkgcGFydGlhbGx5IGFwcGx5aW5nIGFueVxuXHQvLyBhcmd1bWVudHMuXG5cdHByb3h5OiBmdW5jdGlvbiggZm4sIGNvbnRleHQgKSB7XG5cdFx0dmFyIHRtcCwgYXJncywgcHJveHk7XG5cblx0XHRpZiAoIHR5cGVvZiBjb250ZXh0ID09PSBcInN0cmluZ1wiICkge1xuXHRcdFx0dG1wID0gZm5bIGNvbnRleHQgXTtcblx0XHRcdGNvbnRleHQgPSBmbjtcblx0XHRcdGZuID0gdG1wO1xuXHRcdH1cblxuXHRcdC8vIFF1aWNrIGNoZWNrIHRvIGRldGVybWluZSBpZiB0YXJnZXQgaXMgY2FsbGFibGUsIGluIHRoZSBzcGVjXG5cdFx0Ly8gdGhpcyB0aHJvd3MgYSBUeXBlRXJyb3IsIGJ1dCB3ZSB3aWxsIGp1c3QgcmV0dXJuIHVuZGVmaW5lZC5cblx0XHRpZiAoICFqUXVlcnkuaXNGdW5jdGlvbiggZm4gKSApIHtcblx0XHRcdHJldHVybiB1bmRlZmluZWQ7XG5cdFx0fVxuXG5cdFx0Ly8gU2ltdWxhdGVkIGJpbmRcblx0XHRhcmdzID0gc2xpY2UuY2FsbCggYXJndW1lbnRzLCAyICk7XG5cdFx0cHJveHkgPSBmdW5jdGlvbigpIHtcblx0XHRcdHJldHVybiBmbi5hcHBseSggY29udGV4dCB8fCB0aGlzLCBhcmdzLmNvbmNhdCggc2xpY2UuY2FsbCggYXJndW1lbnRzICkgKSApO1xuXHRcdH07XG5cblx0XHQvLyBTZXQgdGhlIGd1aWQgb2YgdW5pcXVlIGhhbmRsZXIgdG8gdGhlIHNhbWUgb2Ygb3JpZ2luYWwgaGFuZGxlciwgc28gaXQgY2FuIGJlIHJlbW92ZWRcblx0XHRwcm94eS5ndWlkID0gZm4uZ3VpZCA9IGZuLmd1aWQgfHwgalF1ZXJ5Lmd1aWQrKztcblxuXHRcdHJldHVybiBwcm94eTtcblx0fSxcblxuXHRub3c6IERhdGUubm93LFxuXG5cdC8vIGpRdWVyeS5zdXBwb3J0IGlzIG5vdCB1c2VkIGluIENvcmUgYnV0IG90aGVyIHByb2plY3RzIGF0dGFjaCB0aGVpclxuXHQvLyBwcm9wZXJ0aWVzIHRvIGl0IHNvIGl0IG5lZWRzIHRvIGV4aXN0LlxuXHRzdXBwb3J0OiBzdXBwb3J0XG59KTtcblxuLy8gUG9wdWxhdGUgdGhlIGNsYXNzMnR5cGUgbWFwXG5qUXVlcnkuZWFjaChcIkJvb2xlYW4gTnVtYmVyIFN0cmluZyBGdW5jdGlvbiBBcnJheSBEYXRlIFJlZ0V4cCBPYmplY3QgRXJyb3JcIi5zcGxpdChcIiBcIiksIGZ1bmN0aW9uKGksIG5hbWUpIHtcblx0Y2xhc3MydHlwZVsgXCJbb2JqZWN0IFwiICsgbmFtZSArIFwiXVwiIF0gPSBuYW1lLnRvTG93ZXJDYXNlKCk7XG59KTtcblxuZnVuY3Rpb24gaXNBcnJheWxpa2UoIG9iaiApIHtcblxuXHQvLyBTdXBwb3J0OiBpT1MgOC4yIChub3QgcmVwcm9kdWNpYmxlIGluIHNpbXVsYXRvcilcblx0Ly8gYGluYCBjaGVjayB1c2VkIHRvIHByZXZlbnQgSklUIGVycm9yIChnaC0yMTQ1KVxuXHQvLyBoYXNPd24gaXNuJ3QgdXNlZCBoZXJlIGR1ZSB0byBmYWxzZSBuZWdhdGl2ZXNcblx0Ly8gcmVnYXJkaW5nIE5vZGVsaXN0IGxlbmd0aCBpbiBJRVxuXHR2YXIgbGVuZ3RoID0gXCJsZW5ndGhcIiBpbiBvYmogJiYgb2JqLmxlbmd0aCxcblx0XHR0eXBlID0galF1ZXJ5LnR5cGUoIG9iaiApO1xuXG5cdGlmICggdHlwZSA9PT0gXCJmdW5jdGlvblwiIHx8IGpRdWVyeS5pc1dpbmRvdyggb2JqICkgKSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0aWYgKCBvYmoubm9kZVR5cGUgPT09IDEgJiYgbGVuZ3RoICkge1xuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cblx0cmV0dXJuIHR5cGUgPT09IFwiYXJyYXlcIiB8fCBsZW5ndGggPT09IDAgfHxcblx0XHR0eXBlb2YgbGVuZ3RoID09PSBcIm51bWJlclwiICYmIGxlbmd0aCA+IDAgJiYgKCBsZW5ndGggLSAxICkgaW4gb2JqO1xufVxuXG5yZXR1cm4galF1ZXJ5O1xufSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9qcXVlcnkvc3JjL2NvcmUuanNcbiAqKiBtb2R1bGUgaWQgPSA2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJkZWZpbmUoZnVuY3Rpb24oKSB7XG5cdHJldHVybiBbXTtcbn0pO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vanF1ZXJ5L3NyYy92YXIvYXJyLmpzXG4gKiogbW9kdWxlIGlkID0gN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZGVmaW5lKFtcblx0XCIuL2FyclwiXG5dLCBmdW5jdGlvbiggYXJyICkge1xuXHRyZXR1cm4gYXJyLnNsaWNlO1xufSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9qcXVlcnkvc3JjL3Zhci9zbGljZS5qc1xuICoqIG1vZHVsZSBpZCA9IDhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImRlZmluZShbXG5cdFwiLi9hcnJcIlxuXSwgZnVuY3Rpb24oIGFyciApIHtcblx0cmV0dXJuIGFyci5jb25jYXQ7XG59KTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2pxdWVyeS9zcmMvdmFyL2NvbmNhdC5qc1xuICoqIG1vZHVsZSBpZCA9IDlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImRlZmluZShbXG5cdFwiLi9hcnJcIlxuXSwgZnVuY3Rpb24oIGFyciApIHtcblx0cmV0dXJuIGFyci5wdXNoO1xufSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9qcXVlcnkvc3JjL3Zhci9wdXNoLmpzXG4gKiogbW9kdWxlIGlkID0gMTBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImRlZmluZShbXG5cdFwiLi9hcnJcIlxuXSwgZnVuY3Rpb24oIGFyciApIHtcblx0cmV0dXJuIGFyci5pbmRleE9mO1xufSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9qcXVlcnkvc3JjL3Zhci9pbmRleE9mLmpzXG4gKiogbW9kdWxlIGlkID0gMTFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImRlZmluZShmdW5jdGlvbigpIHtcblx0Ly8gW1tDbGFzc11dIC0+IHR5cGUgcGFpcnNcblx0cmV0dXJuIHt9O1xufSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9qcXVlcnkvc3JjL3Zhci9jbGFzczJ0eXBlLmpzXG4gKiogbW9kdWxlIGlkID0gMTJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImRlZmluZShbXG5cdFwiLi9jbGFzczJ0eXBlXCJcbl0sIGZ1bmN0aW9uKCBjbGFzczJ0eXBlICkge1xuXHRyZXR1cm4gY2xhc3MydHlwZS50b1N0cmluZztcbn0pO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vanF1ZXJ5L3NyYy92YXIvdG9TdHJpbmcuanNcbiAqKiBtb2R1bGUgaWQgPSAxM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZGVmaW5lKFtcblx0XCIuL2NsYXNzMnR5cGVcIlxuXSwgZnVuY3Rpb24oIGNsYXNzMnR5cGUgKSB7XG5cdHJldHVybiBjbGFzczJ0eXBlLmhhc093blByb3BlcnR5O1xufSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9qcXVlcnkvc3JjL3Zhci9oYXNPd24uanNcbiAqKiBtb2R1bGUgaWQgPSAxNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZGVmaW5lKGZ1bmN0aW9uKCkge1xuXHQvLyBBbGwgc3VwcG9ydCB0ZXN0cyBhcmUgZGVmaW5lZCBpbiB0aGVpciByZXNwZWN0aXZlIG1vZHVsZXMuXG5cdHJldHVybiB7fTtcbn0pO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vanF1ZXJ5L3NyYy92YXIvc3VwcG9ydC5qc1xuICoqIG1vZHVsZSBpZCA9IDE1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJkZWZpbmUoW1xuXHRcIi4vY29yZVwiXG5dLCBmdW5jdGlvbiggalF1ZXJ5ICkge1xuXG4vKlxuICogT3B0aW9uYWwgKG5vbi1TaXp6bGUpIHNlbGVjdG9yIG1vZHVsZSBmb3IgY3VzdG9tIGJ1aWxkcy5cbiAqXG4gKiBOb3RlIHRoYXQgdGhpcyBET0VTIE5PVCBTVVBQT1JUIG1hbnkgZG9jdW1lbnRlZCBqUXVlcnlcbiAqIGZlYXR1cmVzIGluIGV4Y2hhbmdlIGZvciBpdHMgc21hbGxlciBzaXplOlxuICpcbiAqIEF0dHJpYnV0ZSBub3QgZXF1YWwgc2VsZWN0b3JcbiAqIFBvc2l0aW9uYWwgc2VsZWN0b3JzICg6Zmlyc3Q7IDplcShuKTsgOm9kZDsgZXRjLilcbiAqIFR5cGUgc2VsZWN0b3JzICg6aW5wdXQ7IDpjaGVja2JveDsgOmJ1dHRvbjsgZXRjLilcbiAqIFN0YXRlLWJhc2VkIHNlbGVjdG9ycyAoOmFuaW1hdGVkOyA6dmlzaWJsZTsgOmhpZGRlbjsgZXRjLilcbiAqIDpoYXMoc2VsZWN0b3IpXG4gKiA6bm90KGNvbXBsZXggc2VsZWN0b3IpXG4gKiBjdXN0b20gc2VsZWN0b3JzIHZpYSBTaXp6bGUgZXh0ZW5zaW9uc1xuICogTGVhZGluZyBjb21iaW5hdG9ycyAoZS5nLiwgJGNvbGxlY3Rpb24uZmluZChcIj4gKlwiKSlcbiAqIFJlbGlhYmxlIGZ1bmN0aW9uYWxpdHkgb24gWE1MIGZyYWdtZW50c1xuICogUmVxdWlyaW5nIGFsbCBwYXJ0cyBvZiBhIHNlbGVjdG9yIHRvIG1hdGNoIGVsZW1lbnRzIHVuZGVyIGNvbnRleHRcbiAqICAgKGUuZy4sICRkaXYuZmluZChcImRpdiA+ICpcIikgbm93IG1hdGNoZXMgY2hpbGRyZW4gb2YgJGRpdilcbiAqIE1hdGNoaW5nIGFnYWluc3Qgbm9uLWVsZW1lbnRzXG4gKiBSZWxpYWJsZSBzb3J0aW5nIG9mIGRpc2Nvbm5lY3RlZCBub2Rlc1xuICogcXVlcnlTZWxlY3RvckFsbCBidWcgZml4ZXMgKGUuZy4sIHVucmVsaWFibGUgOmZvY3VzIG9uIFdlYktpdClcbiAqXG4gKiBJZiBhbnkgb2YgdGhlc2UgYXJlIHVuYWNjZXB0YWJsZSB0cmFkZW9mZnMsIGVpdGhlciB1c2UgU2l6emxlIG9yXG4gKiBjdXN0b21pemUgdGhpcyBzdHViIGZvciB0aGUgcHJvamVjdCdzIHNwZWNpZmljIG5lZWRzLlxuICovXG5cbnZhciBkb2NFbGVtID0gd2luZG93LmRvY3VtZW50LmRvY3VtZW50RWxlbWVudCxcblx0c2VsZWN0b3JfaGFzRHVwbGljYXRlLFxuXHRtYXRjaGVzID0gZG9jRWxlbS5tYXRjaGVzIHx8XG5cdFx0ZG9jRWxlbS53ZWJraXRNYXRjaGVzU2VsZWN0b3IgfHxcblx0XHRkb2NFbGVtLm1vek1hdGNoZXNTZWxlY3RvciB8fFxuXHRcdGRvY0VsZW0ub01hdGNoZXNTZWxlY3RvciB8fFxuXHRcdGRvY0VsZW0ubXNNYXRjaGVzU2VsZWN0b3IsXG5cdHNlbGVjdG9yX3NvcnRPcmRlciA9IGZ1bmN0aW9uKCBhLCBiICkge1xuXHRcdC8vIEZsYWcgZm9yIGR1cGxpY2F0ZSByZW1vdmFsXG5cdFx0aWYgKCBhID09PSBiICkge1xuXHRcdFx0c2VsZWN0b3JfaGFzRHVwbGljYXRlID0gdHJ1ZTtcblx0XHRcdHJldHVybiAwO1xuXHRcdH1cblxuXHRcdHZhciBjb21wYXJlID0gYi5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbiAmJiBhLmNvbXBhcmVEb2N1bWVudFBvc2l0aW9uICYmIGEuY29tcGFyZURvY3VtZW50UG9zaXRpb24oIGIgKTtcblxuXHRcdGlmICggY29tcGFyZSApIHtcblx0XHRcdC8vIERpc2Nvbm5lY3RlZCBub2Rlc1xuXHRcdFx0aWYgKCBjb21wYXJlICYgMSApIHtcblxuXHRcdFx0XHQvLyBDaG9vc2UgdGhlIGZpcnN0IGVsZW1lbnQgdGhhdCBpcyByZWxhdGVkIHRvIG91ciBkb2N1bWVudFxuXHRcdFx0XHRpZiAoIGEgPT09IGRvY3VtZW50IHx8IGpRdWVyeS5jb250YWlucyhkb2N1bWVudCwgYSkgKSB7XG5cdFx0XHRcdFx0cmV0dXJuIC0xO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmICggYiA9PT0gZG9jdW1lbnQgfHwgalF1ZXJ5LmNvbnRhaW5zKGRvY3VtZW50LCBiKSApIHtcblx0XHRcdFx0XHRyZXR1cm4gMTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIE1haW50YWluIG9yaWdpbmFsIG9yZGVyXG5cdFx0XHRcdHJldHVybiAwO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gY29tcGFyZSAmIDQgPyAtMSA6IDE7XG5cdFx0fVxuXG5cdFx0Ly8gTm90IGRpcmVjdGx5IGNvbXBhcmFibGUsIHNvcnQgb24gZXhpc3RlbmNlIG9mIG1ldGhvZFxuXHRcdHJldHVybiBhLmNvbXBhcmVEb2N1bWVudFBvc2l0aW9uID8gLTEgOiAxO1xuXHR9O1xuXG5qUXVlcnkuZXh0ZW5kKHtcblx0ZmluZDogZnVuY3Rpb24oIHNlbGVjdG9yLCBjb250ZXh0LCByZXN1bHRzLCBzZWVkICkge1xuXHRcdHZhciBlbGVtLCBub2RlVHlwZSxcblx0XHRcdGkgPSAwO1xuXG5cdFx0cmVzdWx0cyA9IHJlc3VsdHMgfHwgW107XG5cdFx0Y29udGV4dCA9IGNvbnRleHQgfHwgZG9jdW1lbnQ7XG5cblx0XHQvLyBTYW1lIGJhc2ljIHNhZmVndWFyZCBhcyBTaXp6bGVcblx0XHRpZiAoICFzZWxlY3RvciB8fCB0eXBlb2Ygc2VsZWN0b3IgIT09IFwic3RyaW5nXCIgKSB7XG5cdFx0XHRyZXR1cm4gcmVzdWx0cztcblx0XHR9XG5cblx0XHQvLyBFYXJseSByZXR1cm4gaWYgY29udGV4dCBpcyBub3QgYW4gZWxlbWVudCBvciBkb2N1bWVudFxuXHRcdGlmICggKG5vZGVUeXBlID0gY29udGV4dC5ub2RlVHlwZSkgIT09IDEgJiYgbm9kZVR5cGUgIT09IDkgKSB7XG5cdFx0XHRyZXR1cm4gW107XG5cdFx0fVxuXG5cdFx0aWYgKCBzZWVkICkge1xuXHRcdFx0d2hpbGUgKCAoZWxlbSA9IHNlZWRbaSsrXSkgKSB7XG5cdFx0XHRcdGlmICggalF1ZXJ5LmZpbmQubWF0Y2hlc1NlbGVjdG9yKGVsZW0sIHNlbGVjdG9yKSApIHtcblx0XHRcdFx0XHRyZXN1bHRzLnB1c2goIGVsZW0gKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRqUXVlcnkubWVyZ2UoIHJlc3VsdHMsIGNvbnRleHQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikgKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gcmVzdWx0cztcblx0fSxcblx0dW5pcXVlOiBmdW5jdGlvbiggcmVzdWx0cyApIHtcblx0XHR2YXIgZWxlbSxcblx0XHRcdGR1cGxpY2F0ZXMgPSBbXSxcblx0XHRcdGkgPSAwLFxuXHRcdFx0aiA9IDA7XG5cblx0XHRzZWxlY3Rvcl9oYXNEdXBsaWNhdGUgPSBmYWxzZTtcblx0XHRyZXN1bHRzLnNvcnQoIHNlbGVjdG9yX3NvcnRPcmRlciApO1xuXG5cdFx0aWYgKCBzZWxlY3Rvcl9oYXNEdXBsaWNhdGUgKSB7XG5cdFx0XHR3aGlsZSAoIChlbGVtID0gcmVzdWx0c1tpKytdKSApIHtcblx0XHRcdFx0aWYgKCBlbGVtID09PSByZXN1bHRzWyBpIF0gKSB7XG5cdFx0XHRcdFx0aiA9IGR1cGxpY2F0ZXMucHVzaCggaSApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHR3aGlsZSAoIGotLSApIHtcblx0XHRcdFx0cmVzdWx0cy5zcGxpY2UoIGR1cGxpY2F0ZXNbIGogXSwgMSApO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiByZXN1bHRzO1xuXHR9LFxuXHR0ZXh0OiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHR2YXIgbm9kZSxcblx0XHRcdHJldCA9IFwiXCIsXG5cdFx0XHRpID0gMCxcblx0XHRcdG5vZGVUeXBlID0gZWxlbS5ub2RlVHlwZTtcblxuXHRcdGlmICggIW5vZGVUeXBlICkge1xuXHRcdFx0Ly8gSWYgbm8gbm9kZVR5cGUsIHRoaXMgaXMgZXhwZWN0ZWQgdG8gYmUgYW4gYXJyYXlcblx0XHRcdHdoaWxlICggKG5vZGUgPSBlbGVtW2krK10pICkge1xuXHRcdFx0XHQvLyBEbyBub3QgdHJhdmVyc2UgY29tbWVudCBub2Rlc1xuXHRcdFx0XHRyZXQgKz0galF1ZXJ5LnRleHQoIG5vZGUgKTtcblx0XHRcdH1cblx0XHR9IGVsc2UgaWYgKCBub2RlVHlwZSA9PT0gMSB8fCBub2RlVHlwZSA9PT0gOSB8fCBub2RlVHlwZSA9PT0gMTEgKSB7XG5cdFx0XHQvLyBVc2UgdGV4dENvbnRlbnQgZm9yIGVsZW1lbnRzXG5cdFx0XHRyZXR1cm4gZWxlbS50ZXh0Q29udGVudDtcblx0XHR9IGVsc2UgaWYgKCBub2RlVHlwZSA9PT0gMyB8fCBub2RlVHlwZSA9PT0gNCApIHtcblx0XHRcdHJldHVybiBlbGVtLm5vZGVWYWx1ZTtcblx0XHR9XG5cdFx0Ly8gRG8gbm90IGluY2x1ZGUgY29tbWVudCBvciBwcm9jZXNzaW5nIGluc3RydWN0aW9uIG5vZGVzXG5cblx0XHRyZXR1cm4gcmV0O1xuXHR9LFxuXHRjb250YWluczogZnVuY3Rpb24oIGEsIGIgKSB7XG5cdFx0dmFyIGFkb3duID0gYS5ub2RlVHlwZSA9PT0gOSA/IGEuZG9jdW1lbnRFbGVtZW50IDogYSxcblx0XHRcdGJ1cCA9IGIgJiYgYi5wYXJlbnROb2RlO1xuXHRcdHJldHVybiBhID09PSBidXAgfHwgISEoIGJ1cCAmJiBidXAubm9kZVR5cGUgPT09IDEgJiYgYWRvd24uY29udGFpbnMoYnVwKSApO1xuXHR9LFxuXHRpc1hNTERvYzogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0cmV0dXJuIChlbGVtLm93bmVyRG9jdW1lbnQgfHwgZWxlbSkuZG9jdW1lbnRFbGVtZW50Lm5vZGVOYW1lICE9PSBcIkhUTUxcIjtcblx0fSxcblx0ZXhwcjoge1xuXHRcdGF0dHJIYW5kbGU6IHt9LFxuXHRcdG1hdGNoOiB7XG5cdFx0XHRib29sOiAvXig/OmNoZWNrZWR8c2VsZWN0ZWR8YXN5bmN8YXV0b2ZvY3VzfGF1dG9wbGF5fGNvbnRyb2xzfGRlZmVyfGRpc2FibGVkfGhpZGRlbnxpc21hcHxsb29wfG11bHRpcGxlfG9wZW58cmVhZG9ubHl8cmVxdWlyZWR8c2NvcGVkKSQvaSxcblx0XHRcdG5lZWRzQ29udGV4dDogL15bXFx4MjBcXHRcXHJcXG5cXGZdKls+K35dL1xuXHRcdH1cblx0fVxufSk7XG5cbmpRdWVyeS5leHRlbmQoIGpRdWVyeS5maW5kLCB7XG5cdG1hdGNoZXM6IGZ1bmN0aW9uKCBleHByLCBlbGVtZW50cyApIHtcblx0XHRyZXR1cm4galF1ZXJ5LmZpbmQoIGV4cHIsIG51bGwsIG51bGwsIGVsZW1lbnRzICk7XG5cdH0sXG5cdG1hdGNoZXNTZWxlY3RvcjogZnVuY3Rpb24oIGVsZW0sIGV4cHIgKSB7XG5cdFx0cmV0dXJuIG1hdGNoZXMuY2FsbCggZWxlbSwgZXhwciApO1xuXHR9LFxuXHRhdHRyOiBmdW5jdGlvbiggZWxlbSwgbmFtZSApIHtcblx0XHRyZXR1cm4gZWxlbS5nZXRBdHRyaWJ1dGUoIG5hbWUgKTtcblx0fVxufSk7XG5cbn0pO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vanF1ZXJ5L3NyYy9zZWxlY3Rvci1uYXRpdmUuanNcbiAqKiBtb2R1bGUgaWQgPSAxNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZGVmaW5lKFtcblx0XCIuL2NvcmVcIixcblx0XCIuL3Zhci9zdHJ1bmRlZmluZWRcIixcblx0XCIuL3Zhci9ybm90d2hpdGVcIixcblx0XCIuL3Zhci9oYXNPd25cIixcblx0XCIuL3Zhci9zbGljZVwiLFxuXHRcIi4vZXZlbnQvc3VwcG9ydFwiLFxuXHRcIi4vZGF0YS92YXIvZGF0YV9wcml2XCIsXG5cblx0XCIuL2NvcmUvaW5pdFwiLFxuXHRcIi4vZGF0YS9hY2NlcHRzXCIsXG5cdFwiLi9zZWxlY3RvclwiXG5dLCBmdW5jdGlvbiggalF1ZXJ5LCBzdHJ1bmRlZmluZWQsIHJub3R3aGl0ZSwgaGFzT3duLCBzbGljZSwgc3VwcG9ydCwgZGF0YV9wcml2ICkge1xuXG52YXJcblx0cmtleUV2ZW50ID0gL15rZXkvLFxuXHRybW91c2VFdmVudCA9IC9eKD86bW91c2V8cG9pbnRlcnxjb250ZXh0bWVudSl8Y2xpY2svLFxuXHRyZm9jdXNNb3JwaCA9IC9eKD86Zm9jdXNpbmZvY3VzfGZvY3Vzb3V0Ymx1cikkLyxcblx0cnR5cGVuYW1lc3BhY2UgPSAvXihbXi5dKikoPzpcXC4oLispfCkkLztcblxuZnVuY3Rpb24gcmV0dXJuVHJ1ZSgpIHtcblx0cmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIHJldHVybkZhbHNlKCkge1xuXHRyZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIHNhZmVBY3RpdmVFbGVtZW50KCkge1xuXHR0cnkge1xuXHRcdHJldHVybiBkb2N1bWVudC5hY3RpdmVFbGVtZW50O1xuXHR9IGNhdGNoICggZXJyICkgeyB9XG59XG5cbi8qXG4gKiBIZWxwZXIgZnVuY3Rpb25zIGZvciBtYW5hZ2luZyBldmVudHMgLS0gbm90IHBhcnQgb2YgdGhlIHB1YmxpYyBpbnRlcmZhY2UuXG4gKiBQcm9wcyB0byBEZWFuIEVkd2FyZHMnIGFkZEV2ZW50IGxpYnJhcnkgZm9yIG1hbnkgb2YgdGhlIGlkZWFzLlxuICovXG5qUXVlcnkuZXZlbnQgPSB7XG5cblx0Z2xvYmFsOiB7fSxcblxuXHRhZGQ6IGZ1bmN0aW9uKCBlbGVtLCB0eXBlcywgaGFuZGxlciwgZGF0YSwgc2VsZWN0b3IgKSB7XG5cblx0XHR2YXIgaGFuZGxlT2JqSW4sIGV2ZW50SGFuZGxlLCB0bXAsXG5cdFx0XHRldmVudHMsIHQsIGhhbmRsZU9iaixcblx0XHRcdHNwZWNpYWwsIGhhbmRsZXJzLCB0eXBlLCBuYW1lc3BhY2VzLCBvcmlnVHlwZSxcblx0XHRcdGVsZW1EYXRhID0gZGF0YV9wcml2LmdldCggZWxlbSApO1xuXG5cdFx0Ly8gRG9uJ3QgYXR0YWNoIGV2ZW50cyB0byBub0RhdGEgb3IgdGV4dC9jb21tZW50IG5vZGVzIChidXQgYWxsb3cgcGxhaW4gb2JqZWN0cylcblx0XHRpZiAoICFlbGVtRGF0YSApIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvLyBDYWxsZXIgY2FuIHBhc3MgaW4gYW4gb2JqZWN0IG9mIGN1c3RvbSBkYXRhIGluIGxpZXUgb2YgdGhlIGhhbmRsZXJcblx0XHRpZiAoIGhhbmRsZXIuaGFuZGxlciApIHtcblx0XHRcdGhhbmRsZU9iakluID0gaGFuZGxlcjtcblx0XHRcdGhhbmRsZXIgPSBoYW5kbGVPYmpJbi5oYW5kbGVyO1xuXHRcdFx0c2VsZWN0b3IgPSBoYW5kbGVPYmpJbi5zZWxlY3Rvcjtcblx0XHR9XG5cblx0XHQvLyBNYWtlIHN1cmUgdGhhdCB0aGUgaGFuZGxlciBoYXMgYSB1bmlxdWUgSUQsIHVzZWQgdG8gZmluZC9yZW1vdmUgaXQgbGF0ZXJcblx0XHRpZiAoICFoYW5kbGVyLmd1aWQgKSB7XG5cdFx0XHRoYW5kbGVyLmd1aWQgPSBqUXVlcnkuZ3VpZCsrO1xuXHRcdH1cblxuXHRcdC8vIEluaXQgdGhlIGVsZW1lbnQncyBldmVudCBzdHJ1Y3R1cmUgYW5kIG1haW4gaGFuZGxlciwgaWYgdGhpcyBpcyB0aGUgZmlyc3Rcblx0XHRpZiAoICEoZXZlbnRzID0gZWxlbURhdGEuZXZlbnRzKSApIHtcblx0XHRcdGV2ZW50cyA9IGVsZW1EYXRhLmV2ZW50cyA9IHt9O1xuXHRcdH1cblx0XHRpZiAoICEoZXZlbnRIYW5kbGUgPSBlbGVtRGF0YS5oYW5kbGUpICkge1xuXHRcdFx0ZXZlbnRIYW5kbGUgPSBlbGVtRGF0YS5oYW5kbGUgPSBmdW5jdGlvbiggZSApIHtcblx0XHRcdFx0Ly8gRGlzY2FyZCB0aGUgc2Vjb25kIGV2ZW50IG9mIGEgalF1ZXJ5LmV2ZW50LnRyaWdnZXIoKSBhbmRcblx0XHRcdFx0Ly8gd2hlbiBhbiBldmVudCBpcyBjYWxsZWQgYWZ0ZXIgYSBwYWdlIGhhcyB1bmxvYWRlZFxuXHRcdFx0XHRyZXR1cm4gdHlwZW9mIGpRdWVyeSAhPT0gc3RydW5kZWZpbmVkICYmIGpRdWVyeS5ldmVudC50cmlnZ2VyZWQgIT09IGUudHlwZSA/XG5cdFx0XHRcdFx0alF1ZXJ5LmV2ZW50LmRpc3BhdGNoLmFwcGx5KCBlbGVtLCBhcmd1bWVudHMgKSA6IHVuZGVmaW5lZDtcblx0XHRcdH07XG5cdFx0fVxuXG5cdFx0Ly8gSGFuZGxlIG11bHRpcGxlIGV2ZW50cyBzZXBhcmF0ZWQgYnkgYSBzcGFjZVxuXHRcdHR5cGVzID0gKCB0eXBlcyB8fCBcIlwiICkubWF0Y2goIHJub3R3aGl0ZSApIHx8IFsgXCJcIiBdO1xuXHRcdHQgPSB0eXBlcy5sZW5ndGg7XG5cdFx0d2hpbGUgKCB0LS0gKSB7XG5cdFx0XHR0bXAgPSBydHlwZW5hbWVzcGFjZS5leGVjKCB0eXBlc1t0XSApIHx8IFtdO1xuXHRcdFx0dHlwZSA9IG9yaWdUeXBlID0gdG1wWzFdO1xuXHRcdFx0bmFtZXNwYWNlcyA9ICggdG1wWzJdIHx8IFwiXCIgKS5zcGxpdCggXCIuXCIgKS5zb3J0KCk7XG5cblx0XHRcdC8vIFRoZXJlICptdXN0KiBiZSBhIHR5cGUsIG5vIGF0dGFjaGluZyBuYW1lc3BhY2Utb25seSBoYW5kbGVyc1xuXHRcdFx0aWYgKCAhdHlwZSApIHtcblx0XHRcdFx0Y29udGludWU7XG5cdFx0XHR9XG5cblx0XHRcdC8vIElmIGV2ZW50IGNoYW5nZXMgaXRzIHR5cGUsIHVzZSB0aGUgc3BlY2lhbCBldmVudCBoYW5kbGVycyBmb3IgdGhlIGNoYW5nZWQgdHlwZVxuXHRcdFx0c3BlY2lhbCA9IGpRdWVyeS5ldmVudC5zcGVjaWFsWyB0eXBlIF0gfHwge307XG5cblx0XHRcdC8vIElmIHNlbGVjdG9yIGRlZmluZWQsIGRldGVybWluZSBzcGVjaWFsIGV2ZW50IGFwaSB0eXBlLCBvdGhlcndpc2UgZ2l2ZW4gdHlwZVxuXHRcdFx0dHlwZSA9ICggc2VsZWN0b3IgPyBzcGVjaWFsLmRlbGVnYXRlVHlwZSA6IHNwZWNpYWwuYmluZFR5cGUgKSB8fCB0eXBlO1xuXG5cdFx0XHQvLyBVcGRhdGUgc3BlY2lhbCBiYXNlZCBvbiBuZXdseSByZXNldCB0eXBlXG5cdFx0XHRzcGVjaWFsID0galF1ZXJ5LmV2ZW50LnNwZWNpYWxbIHR5cGUgXSB8fCB7fTtcblxuXHRcdFx0Ly8gaGFuZGxlT2JqIGlzIHBhc3NlZCB0byBhbGwgZXZlbnQgaGFuZGxlcnNcblx0XHRcdGhhbmRsZU9iaiA9IGpRdWVyeS5leHRlbmQoe1xuXHRcdFx0XHR0eXBlOiB0eXBlLFxuXHRcdFx0XHRvcmlnVHlwZTogb3JpZ1R5cGUsXG5cdFx0XHRcdGRhdGE6IGRhdGEsXG5cdFx0XHRcdGhhbmRsZXI6IGhhbmRsZXIsXG5cdFx0XHRcdGd1aWQ6IGhhbmRsZXIuZ3VpZCxcblx0XHRcdFx0c2VsZWN0b3I6IHNlbGVjdG9yLFxuXHRcdFx0XHRuZWVkc0NvbnRleHQ6IHNlbGVjdG9yICYmIGpRdWVyeS5leHByLm1hdGNoLm5lZWRzQ29udGV4dC50ZXN0KCBzZWxlY3RvciApLFxuXHRcdFx0XHRuYW1lc3BhY2U6IG5hbWVzcGFjZXMuam9pbihcIi5cIilcblx0XHRcdH0sIGhhbmRsZU9iakluICk7XG5cblx0XHRcdC8vIEluaXQgdGhlIGV2ZW50IGhhbmRsZXIgcXVldWUgaWYgd2UncmUgdGhlIGZpcnN0XG5cdFx0XHRpZiAoICEoaGFuZGxlcnMgPSBldmVudHNbIHR5cGUgXSkgKSB7XG5cdFx0XHRcdGhhbmRsZXJzID0gZXZlbnRzWyB0eXBlIF0gPSBbXTtcblx0XHRcdFx0aGFuZGxlcnMuZGVsZWdhdGVDb3VudCA9IDA7XG5cblx0XHRcdFx0Ly8gT25seSB1c2UgYWRkRXZlbnRMaXN0ZW5lciBpZiB0aGUgc3BlY2lhbCBldmVudHMgaGFuZGxlciByZXR1cm5zIGZhbHNlXG5cdFx0XHRcdGlmICggIXNwZWNpYWwuc2V0dXAgfHwgc3BlY2lhbC5zZXR1cC5jYWxsKCBlbGVtLCBkYXRhLCBuYW1lc3BhY2VzLCBldmVudEhhbmRsZSApID09PSBmYWxzZSApIHtcblx0XHRcdFx0XHRpZiAoIGVsZW0uYWRkRXZlbnRMaXN0ZW5lciApIHtcblx0XHRcdFx0XHRcdGVsZW0uYWRkRXZlbnRMaXN0ZW5lciggdHlwZSwgZXZlbnRIYW5kbGUsIGZhbHNlICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGlmICggc3BlY2lhbC5hZGQgKSB7XG5cdFx0XHRcdHNwZWNpYWwuYWRkLmNhbGwoIGVsZW0sIGhhbmRsZU9iaiApO1xuXG5cdFx0XHRcdGlmICggIWhhbmRsZU9iai5oYW5kbGVyLmd1aWQgKSB7XG5cdFx0XHRcdFx0aGFuZGxlT2JqLmhhbmRsZXIuZ3VpZCA9IGhhbmRsZXIuZ3VpZDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBBZGQgdG8gdGhlIGVsZW1lbnQncyBoYW5kbGVyIGxpc3QsIGRlbGVnYXRlcyBpbiBmcm9udFxuXHRcdFx0aWYgKCBzZWxlY3RvciApIHtcblx0XHRcdFx0aGFuZGxlcnMuc3BsaWNlKCBoYW5kbGVycy5kZWxlZ2F0ZUNvdW50KyssIDAsIGhhbmRsZU9iaiApO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aGFuZGxlcnMucHVzaCggaGFuZGxlT2JqICk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIEtlZXAgdHJhY2sgb2Ygd2hpY2ggZXZlbnRzIGhhdmUgZXZlciBiZWVuIHVzZWQsIGZvciBldmVudCBvcHRpbWl6YXRpb25cblx0XHRcdGpRdWVyeS5ldmVudC5nbG9iYWxbIHR5cGUgXSA9IHRydWU7XG5cdFx0fVxuXG5cdH0sXG5cblx0Ly8gRGV0YWNoIGFuIGV2ZW50IG9yIHNldCBvZiBldmVudHMgZnJvbSBhbiBlbGVtZW50XG5cdHJlbW92ZTogZnVuY3Rpb24oIGVsZW0sIHR5cGVzLCBoYW5kbGVyLCBzZWxlY3RvciwgbWFwcGVkVHlwZXMgKSB7XG5cblx0XHR2YXIgaiwgb3JpZ0NvdW50LCB0bXAsXG5cdFx0XHRldmVudHMsIHQsIGhhbmRsZU9iaixcblx0XHRcdHNwZWNpYWwsIGhhbmRsZXJzLCB0eXBlLCBuYW1lc3BhY2VzLCBvcmlnVHlwZSxcblx0XHRcdGVsZW1EYXRhID0gZGF0YV9wcml2Lmhhc0RhdGEoIGVsZW0gKSAmJiBkYXRhX3ByaXYuZ2V0KCBlbGVtICk7XG5cblx0XHRpZiAoICFlbGVtRGF0YSB8fCAhKGV2ZW50cyA9IGVsZW1EYXRhLmV2ZW50cykgKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Ly8gT25jZSBmb3IgZWFjaCB0eXBlLm5hbWVzcGFjZSBpbiB0eXBlczsgdHlwZSBtYXkgYmUgb21pdHRlZFxuXHRcdHR5cGVzID0gKCB0eXBlcyB8fCBcIlwiICkubWF0Y2goIHJub3R3aGl0ZSApIHx8IFsgXCJcIiBdO1xuXHRcdHQgPSB0eXBlcy5sZW5ndGg7XG5cdFx0d2hpbGUgKCB0LS0gKSB7XG5cdFx0XHR0bXAgPSBydHlwZW5hbWVzcGFjZS5leGVjKCB0eXBlc1t0XSApIHx8IFtdO1xuXHRcdFx0dHlwZSA9IG9yaWdUeXBlID0gdG1wWzFdO1xuXHRcdFx0bmFtZXNwYWNlcyA9ICggdG1wWzJdIHx8IFwiXCIgKS5zcGxpdCggXCIuXCIgKS5zb3J0KCk7XG5cblx0XHRcdC8vIFVuYmluZCBhbGwgZXZlbnRzIChvbiB0aGlzIG5hbWVzcGFjZSwgaWYgcHJvdmlkZWQpIGZvciB0aGUgZWxlbWVudFxuXHRcdFx0aWYgKCAhdHlwZSApIHtcblx0XHRcdFx0Zm9yICggdHlwZSBpbiBldmVudHMgKSB7XG5cdFx0XHRcdFx0alF1ZXJ5LmV2ZW50LnJlbW92ZSggZWxlbSwgdHlwZSArIHR5cGVzWyB0IF0sIGhhbmRsZXIsIHNlbGVjdG9yLCB0cnVlICk7XG5cdFx0XHRcdH1cblx0XHRcdFx0Y29udGludWU7XG5cdFx0XHR9XG5cblx0XHRcdHNwZWNpYWwgPSBqUXVlcnkuZXZlbnQuc3BlY2lhbFsgdHlwZSBdIHx8IHt9O1xuXHRcdFx0dHlwZSA9ICggc2VsZWN0b3IgPyBzcGVjaWFsLmRlbGVnYXRlVHlwZSA6IHNwZWNpYWwuYmluZFR5cGUgKSB8fCB0eXBlO1xuXHRcdFx0aGFuZGxlcnMgPSBldmVudHNbIHR5cGUgXSB8fCBbXTtcblx0XHRcdHRtcCA9IHRtcFsyXSAmJiBuZXcgUmVnRXhwKCBcIihefFxcXFwuKVwiICsgbmFtZXNwYWNlcy5qb2luKFwiXFxcXC4oPzouKlxcXFwufClcIikgKyBcIihcXFxcLnwkKVwiICk7XG5cblx0XHRcdC8vIFJlbW92ZSBtYXRjaGluZyBldmVudHNcblx0XHRcdG9yaWdDb3VudCA9IGogPSBoYW5kbGVycy5sZW5ndGg7XG5cdFx0XHR3aGlsZSAoIGotLSApIHtcblx0XHRcdFx0aGFuZGxlT2JqID0gaGFuZGxlcnNbIGogXTtcblxuXHRcdFx0XHRpZiAoICggbWFwcGVkVHlwZXMgfHwgb3JpZ1R5cGUgPT09IGhhbmRsZU9iai5vcmlnVHlwZSApICYmXG5cdFx0XHRcdFx0KCAhaGFuZGxlciB8fCBoYW5kbGVyLmd1aWQgPT09IGhhbmRsZU9iai5ndWlkICkgJiZcblx0XHRcdFx0XHQoICF0bXAgfHwgdG1wLnRlc3QoIGhhbmRsZU9iai5uYW1lc3BhY2UgKSApICYmXG5cdFx0XHRcdFx0KCAhc2VsZWN0b3IgfHwgc2VsZWN0b3IgPT09IGhhbmRsZU9iai5zZWxlY3RvciB8fCBzZWxlY3RvciA9PT0gXCIqKlwiICYmIGhhbmRsZU9iai5zZWxlY3RvciApICkge1xuXHRcdFx0XHRcdGhhbmRsZXJzLnNwbGljZSggaiwgMSApO1xuXG5cdFx0XHRcdFx0aWYgKCBoYW5kbGVPYmouc2VsZWN0b3IgKSB7XG5cdFx0XHRcdFx0XHRoYW5kbGVycy5kZWxlZ2F0ZUNvdW50LS07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmICggc3BlY2lhbC5yZW1vdmUgKSB7XG5cdFx0XHRcdFx0XHRzcGVjaWFsLnJlbW92ZS5jYWxsKCBlbGVtLCBoYW5kbGVPYmogKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gUmVtb3ZlIGdlbmVyaWMgZXZlbnQgaGFuZGxlciBpZiB3ZSByZW1vdmVkIHNvbWV0aGluZyBhbmQgbm8gbW9yZSBoYW5kbGVycyBleGlzdFxuXHRcdFx0Ly8gKGF2b2lkcyBwb3RlbnRpYWwgZm9yIGVuZGxlc3MgcmVjdXJzaW9uIGR1cmluZyByZW1vdmFsIG9mIHNwZWNpYWwgZXZlbnQgaGFuZGxlcnMpXG5cdFx0XHRpZiAoIG9yaWdDb3VudCAmJiAhaGFuZGxlcnMubGVuZ3RoICkge1xuXHRcdFx0XHRpZiAoICFzcGVjaWFsLnRlYXJkb3duIHx8IHNwZWNpYWwudGVhcmRvd24uY2FsbCggZWxlbSwgbmFtZXNwYWNlcywgZWxlbURhdGEuaGFuZGxlICkgPT09IGZhbHNlICkge1xuXHRcdFx0XHRcdGpRdWVyeS5yZW1vdmVFdmVudCggZWxlbSwgdHlwZSwgZWxlbURhdGEuaGFuZGxlICk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRkZWxldGUgZXZlbnRzWyB0eXBlIF07XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gUmVtb3ZlIHRoZSBleHBhbmRvIGlmIGl0J3Mgbm8gbG9uZ2VyIHVzZWRcblx0XHRpZiAoIGpRdWVyeS5pc0VtcHR5T2JqZWN0KCBldmVudHMgKSApIHtcblx0XHRcdGRlbGV0ZSBlbGVtRGF0YS5oYW5kbGU7XG5cdFx0XHRkYXRhX3ByaXYucmVtb3ZlKCBlbGVtLCBcImV2ZW50c1wiICk7XG5cdFx0fVxuXHR9LFxuXG5cdHRyaWdnZXI6IGZ1bmN0aW9uKCBldmVudCwgZGF0YSwgZWxlbSwgb25seUhhbmRsZXJzICkge1xuXG5cdFx0dmFyIGksIGN1ciwgdG1wLCBidWJibGVUeXBlLCBvbnR5cGUsIGhhbmRsZSwgc3BlY2lhbCxcblx0XHRcdGV2ZW50UGF0aCA9IFsgZWxlbSB8fCBkb2N1bWVudCBdLFxuXHRcdFx0dHlwZSA9IGhhc093bi5jYWxsKCBldmVudCwgXCJ0eXBlXCIgKSA/IGV2ZW50LnR5cGUgOiBldmVudCxcblx0XHRcdG5hbWVzcGFjZXMgPSBoYXNPd24uY2FsbCggZXZlbnQsIFwibmFtZXNwYWNlXCIgKSA/IGV2ZW50Lm5hbWVzcGFjZS5zcGxpdChcIi5cIikgOiBbXTtcblxuXHRcdGN1ciA9IHRtcCA9IGVsZW0gPSBlbGVtIHx8IGRvY3VtZW50O1xuXG5cdFx0Ly8gRG9uJ3QgZG8gZXZlbnRzIG9uIHRleHQgYW5kIGNvbW1lbnQgbm9kZXNcblx0XHRpZiAoIGVsZW0ubm9kZVR5cGUgPT09IDMgfHwgZWxlbS5ub2RlVHlwZSA9PT0gOCApIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvLyBmb2N1cy9ibHVyIG1vcnBocyB0byBmb2N1c2luL291dDsgZW5zdXJlIHdlJ3JlIG5vdCBmaXJpbmcgdGhlbSByaWdodCBub3dcblx0XHRpZiAoIHJmb2N1c01vcnBoLnRlc3QoIHR5cGUgKyBqUXVlcnkuZXZlbnQudHJpZ2dlcmVkICkgKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0aWYgKCB0eXBlLmluZGV4T2YoXCIuXCIpID49IDAgKSB7XG5cdFx0XHQvLyBOYW1lc3BhY2VkIHRyaWdnZXI7IGNyZWF0ZSBhIHJlZ2V4cCB0byBtYXRjaCBldmVudCB0eXBlIGluIGhhbmRsZSgpXG5cdFx0XHRuYW1lc3BhY2VzID0gdHlwZS5zcGxpdChcIi5cIik7XG5cdFx0XHR0eXBlID0gbmFtZXNwYWNlcy5zaGlmdCgpO1xuXHRcdFx0bmFtZXNwYWNlcy5zb3J0KCk7XG5cdFx0fVxuXHRcdG9udHlwZSA9IHR5cGUuaW5kZXhPZihcIjpcIikgPCAwICYmIFwib25cIiArIHR5cGU7XG5cblx0XHQvLyBDYWxsZXIgY2FuIHBhc3MgaW4gYSBqUXVlcnkuRXZlbnQgb2JqZWN0LCBPYmplY3QsIG9yIGp1c3QgYW4gZXZlbnQgdHlwZSBzdHJpbmdcblx0XHRldmVudCA9IGV2ZW50WyBqUXVlcnkuZXhwYW5kbyBdID9cblx0XHRcdGV2ZW50IDpcblx0XHRcdG5ldyBqUXVlcnkuRXZlbnQoIHR5cGUsIHR5cGVvZiBldmVudCA9PT0gXCJvYmplY3RcIiAmJiBldmVudCApO1xuXG5cdFx0Ly8gVHJpZ2dlciBiaXRtYXNrOiAmIDEgZm9yIG5hdGl2ZSBoYW5kbGVyczsgJiAyIGZvciBqUXVlcnkgKGFsd2F5cyB0cnVlKVxuXHRcdGV2ZW50LmlzVHJpZ2dlciA9IG9ubHlIYW5kbGVycyA/IDIgOiAzO1xuXHRcdGV2ZW50Lm5hbWVzcGFjZSA9IG5hbWVzcGFjZXMuam9pbihcIi5cIik7XG5cdFx0ZXZlbnQubmFtZXNwYWNlX3JlID0gZXZlbnQubmFtZXNwYWNlID9cblx0XHRcdG5ldyBSZWdFeHAoIFwiKF58XFxcXC4pXCIgKyBuYW1lc3BhY2VzLmpvaW4oXCJcXFxcLig/Oi4qXFxcXC58KVwiKSArIFwiKFxcXFwufCQpXCIgKSA6XG5cdFx0XHRudWxsO1xuXG5cdFx0Ly8gQ2xlYW4gdXAgdGhlIGV2ZW50IGluIGNhc2UgaXQgaXMgYmVpbmcgcmV1c2VkXG5cdFx0ZXZlbnQucmVzdWx0ID0gdW5kZWZpbmVkO1xuXHRcdGlmICggIWV2ZW50LnRhcmdldCApIHtcblx0XHRcdGV2ZW50LnRhcmdldCA9IGVsZW07XG5cdFx0fVxuXG5cdFx0Ly8gQ2xvbmUgYW55IGluY29taW5nIGRhdGEgYW5kIHByZXBlbmQgdGhlIGV2ZW50LCBjcmVhdGluZyB0aGUgaGFuZGxlciBhcmcgbGlzdFxuXHRcdGRhdGEgPSBkYXRhID09IG51bGwgP1xuXHRcdFx0WyBldmVudCBdIDpcblx0XHRcdGpRdWVyeS5tYWtlQXJyYXkoIGRhdGEsIFsgZXZlbnQgXSApO1xuXG5cdFx0Ly8gQWxsb3cgc3BlY2lhbCBldmVudHMgdG8gZHJhdyBvdXRzaWRlIHRoZSBsaW5lc1xuXHRcdHNwZWNpYWwgPSBqUXVlcnkuZXZlbnQuc3BlY2lhbFsgdHlwZSBdIHx8IHt9O1xuXHRcdGlmICggIW9ubHlIYW5kbGVycyAmJiBzcGVjaWFsLnRyaWdnZXIgJiYgc3BlY2lhbC50cmlnZ2VyLmFwcGx5KCBlbGVtLCBkYXRhICkgPT09IGZhbHNlICkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8vIERldGVybWluZSBldmVudCBwcm9wYWdhdGlvbiBwYXRoIGluIGFkdmFuY2UsIHBlciBXM0MgZXZlbnRzIHNwZWMgKCM5OTUxKVxuXHRcdC8vIEJ1YmJsZSB1cCB0byBkb2N1bWVudCwgdGhlbiB0byB3aW5kb3c7IHdhdGNoIGZvciBhIGdsb2JhbCBvd25lckRvY3VtZW50IHZhciAoIzk3MjQpXG5cdFx0aWYgKCAhb25seUhhbmRsZXJzICYmICFzcGVjaWFsLm5vQnViYmxlICYmICFqUXVlcnkuaXNXaW5kb3coIGVsZW0gKSApIHtcblxuXHRcdFx0YnViYmxlVHlwZSA9IHNwZWNpYWwuZGVsZWdhdGVUeXBlIHx8IHR5cGU7XG5cdFx0XHRpZiAoICFyZm9jdXNNb3JwaC50ZXN0KCBidWJibGVUeXBlICsgdHlwZSApICkge1xuXHRcdFx0XHRjdXIgPSBjdXIucGFyZW50Tm9kZTtcblx0XHRcdH1cblx0XHRcdGZvciAoIDsgY3VyOyBjdXIgPSBjdXIucGFyZW50Tm9kZSApIHtcblx0XHRcdFx0ZXZlbnRQYXRoLnB1c2goIGN1ciApO1xuXHRcdFx0XHR0bXAgPSBjdXI7XG5cdFx0XHR9XG5cblx0XHRcdC8vIE9ubHkgYWRkIHdpbmRvdyBpZiB3ZSBnb3QgdG8gZG9jdW1lbnQgKGUuZy4sIG5vdCBwbGFpbiBvYmogb3IgZGV0YWNoZWQgRE9NKVxuXHRcdFx0aWYgKCB0bXAgPT09IChlbGVtLm93bmVyRG9jdW1lbnQgfHwgZG9jdW1lbnQpICkge1xuXHRcdFx0XHRldmVudFBhdGgucHVzaCggdG1wLmRlZmF1bHRWaWV3IHx8IHRtcC5wYXJlbnRXaW5kb3cgfHwgd2luZG93ICk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gRmlyZSBoYW5kbGVycyBvbiB0aGUgZXZlbnQgcGF0aFxuXHRcdGkgPSAwO1xuXHRcdHdoaWxlICggKGN1ciA9IGV2ZW50UGF0aFtpKytdKSAmJiAhZXZlbnQuaXNQcm9wYWdhdGlvblN0b3BwZWQoKSApIHtcblxuXHRcdFx0ZXZlbnQudHlwZSA9IGkgPiAxID9cblx0XHRcdFx0YnViYmxlVHlwZSA6XG5cdFx0XHRcdHNwZWNpYWwuYmluZFR5cGUgfHwgdHlwZTtcblxuXHRcdFx0Ly8galF1ZXJ5IGhhbmRsZXJcblx0XHRcdGhhbmRsZSA9ICggZGF0YV9wcml2LmdldCggY3VyLCBcImV2ZW50c1wiICkgfHwge30gKVsgZXZlbnQudHlwZSBdICYmIGRhdGFfcHJpdi5nZXQoIGN1ciwgXCJoYW5kbGVcIiApO1xuXHRcdFx0aWYgKCBoYW5kbGUgKSB7XG5cdFx0XHRcdGhhbmRsZS5hcHBseSggY3VyLCBkYXRhICk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIE5hdGl2ZSBoYW5kbGVyXG5cdFx0XHRoYW5kbGUgPSBvbnR5cGUgJiYgY3VyWyBvbnR5cGUgXTtcblx0XHRcdGlmICggaGFuZGxlICYmIGhhbmRsZS5hcHBseSAmJiBqUXVlcnkuYWNjZXB0RGF0YSggY3VyICkgKSB7XG5cdFx0XHRcdGV2ZW50LnJlc3VsdCA9IGhhbmRsZS5hcHBseSggY3VyLCBkYXRhICk7XG5cdFx0XHRcdGlmICggZXZlbnQucmVzdWx0ID09PSBmYWxzZSApIHtcblx0XHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGV2ZW50LnR5cGUgPSB0eXBlO1xuXG5cdFx0Ly8gSWYgbm9ib2R5IHByZXZlbnRlZCB0aGUgZGVmYXVsdCBhY3Rpb24sIGRvIGl0IG5vd1xuXHRcdGlmICggIW9ubHlIYW5kbGVycyAmJiAhZXZlbnQuaXNEZWZhdWx0UHJldmVudGVkKCkgKSB7XG5cblx0XHRcdGlmICggKCFzcGVjaWFsLl9kZWZhdWx0IHx8IHNwZWNpYWwuX2RlZmF1bHQuYXBwbHkoIGV2ZW50UGF0aC5wb3AoKSwgZGF0YSApID09PSBmYWxzZSkgJiZcblx0XHRcdFx0alF1ZXJ5LmFjY2VwdERhdGEoIGVsZW0gKSApIHtcblxuXHRcdFx0XHQvLyBDYWxsIGEgbmF0aXZlIERPTSBtZXRob2Qgb24gdGhlIHRhcmdldCB3aXRoIHRoZSBzYW1lIG5hbWUgbmFtZSBhcyB0aGUgZXZlbnQuXG5cdFx0XHRcdC8vIERvbid0IGRvIGRlZmF1bHQgYWN0aW9ucyBvbiB3aW5kb3csIHRoYXQncyB3aGVyZSBnbG9iYWwgdmFyaWFibGVzIGJlICgjNjE3MClcblx0XHRcdFx0aWYgKCBvbnR5cGUgJiYgalF1ZXJ5LmlzRnVuY3Rpb24oIGVsZW1bIHR5cGUgXSApICYmICFqUXVlcnkuaXNXaW5kb3coIGVsZW0gKSApIHtcblxuXHRcdFx0XHRcdC8vIERvbid0IHJlLXRyaWdnZXIgYW4gb25GT08gZXZlbnQgd2hlbiB3ZSBjYWxsIGl0cyBGT08oKSBtZXRob2Rcblx0XHRcdFx0XHR0bXAgPSBlbGVtWyBvbnR5cGUgXTtcblxuXHRcdFx0XHRcdGlmICggdG1wICkge1xuXHRcdFx0XHRcdFx0ZWxlbVsgb250eXBlIF0gPSBudWxsO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdC8vIFByZXZlbnQgcmUtdHJpZ2dlcmluZyBvZiB0aGUgc2FtZSBldmVudCwgc2luY2Ugd2UgYWxyZWFkeSBidWJibGVkIGl0IGFib3ZlXG5cdFx0XHRcdFx0alF1ZXJ5LmV2ZW50LnRyaWdnZXJlZCA9IHR5cGU7XG5cdFx0XHRcdFx0ZWxlbVsgdHlwZSBdKCk7XG5cdFx0XHRcdFx0alF1ZXJ5LmV2ZW50LnRyaWdnZXJlZCA9IHVuZGVmaW5lZDtcblxuXHRcdFx0XHRcdGlmICggdG1wICkge1xuXHRcdFx0XHRcdFx0ZWxlbVsgb250eXBlIF0gPSB0bXA7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGV2ZW50LnJlc3VsdDtcblx0fSxcblxuXHRkaXNwYXRjaDogZnVuY3Rpb24oIGV2ZW50ICkge1xuXG5cdFx0Ly8gTWFrZSBhIHdyaXRhYmxlIGpRdWVyeS5FdmVudCBmcm9tIHRoZSBuYXRpdmUgZXZlbnQgb2JqZWN0XG5cdFx0ZXZlbnQgPSBqUXVlcnkuZXZlbnQuZml4KCBldmVudCApO1xuXG5cdFx0dmFyIGksIGosIHJldCwgbWF0Y2hlZCwgaGFuZGxlT2JqLFxuXHRcdFx0aGFuZGxlclF1ZXVlID0gW10sXG5cdFx0XHRhcmdzID0gc2xpY2UuY2FsbCggYXJndW1lbnRzICksXG5cdFx0XHRoYW5kbGVycyA9ICggZGF0YV9wcml2LmdldCggdGhpcywgXCJldmVudHNcIiApIHx8IHt9IClbIGV2ZW50LnR5cGUgXSB8fCBbXSxcblx0XHRcdHNwZWNpYWwgPSBqUXVlcnkuZXZlbnQuc3BlY2lhbFsgZXZlbnQudHlwZSBdIHx8IHt9O1xuXG5cdFx0Ly8gVXNlIHRoZSBmaXgtZWQgalF1ZXJ5LkV2ZW50IHJhdGhlciB0aGFuIHRoZSAocmVhZC1vbmx5KSBuYXRpdmUgZXZlbnRcblx0XHRhcmdzWzBdID0gZXZlbnQ7XG5cdFx0ZXZlbnQuZGVsZWdhdGVUYXJnZXQgPSB0aGlzO1xuXG5cdFx0Ly8gQ2FsbCB0aGUgcHJlRGlzcGF0Y2ggaG9vayBmb3IgdGhlIG1hcHBlZCB0eXBlLCBhbmQgbGV0IGl0IGJhaWwgaWYgZGVzaXJlZFxuXHRcdGlmICggc3BlY2lhbC5wcmVEaXNwYXRjaCAmJiBzcGVjaWFsLnByZURpc3BhdGNoLmNhbGwoIHRoaXMsIGV2ZW50ICkgPT09IGZhbHNlICkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8vIERldGVybWluZSBoYW5kbGVyc1xuXHRcdGhhbmRsZXJRdWV1ZSA9IGpRdWVyeS5ldmVudC5oYW5kbGVycy5jYWxsKCB0aGlzLCBldmVudCwgaGFuZGxlcnMgKTtcblxuXHRcdC8vIFJ1biBkZWxlZ2F0ZXMgZmlyc3Q7IHRoZXkgbWF5IHdhbnQgdG8gc3RvcCBwcm9wYWdhdGlvbiBiZW5lYXRoIHVzXG5cdFx0aSA9IDA7XG5cdFx0d2hpbGUgKCAobWF0Y2hlZCA9IGhhbmRsZXJRdWV1ZVsgaSsrIF0pICYmICFldmVudC5pc1Byb3BhZ2F0aW9uU3RvcHBlZCgpICkge1xuXHRcdFx0ZXZlbnQuY3VycmVudFRhcmdldCA9IG1hdGNoZWQuZWxlbTtcblxuXHRcdFx0aiA9IDA7XG5cdFx0XHR3aGlsZSAoIChoYW5kbGVPYmogPSBtYXRjaGVkLmhhbmRsZXJzWyBqKysgXSkgJiYgIWV2ZW50LmlzSW1tZWRpYXRlUHJvcGFnYXRpb25TdG9wcGVkKCkgKSB7XG5cblx0XHRcdFx0Ly8gVHJpZ2dlcmVkIGV2ZW50IG11c3QgZWl0aGVyIDEpIGhhdmUgbm8gbmFtZXNwYWNlLCBvciAyKSBoYXZlIG5hbWVzcGFjZShzKVxuXHRcdFx0XHQvLyBhIHN1YnNldCBvciBlcXVhbCB0byB0aG9zZSBpbiB0aGUgYm91bmQgZXZlbnQgKGJvdGggY2FuIGhhdmUgbm8gbmFtZXNwYWNlKS5cblx0XHRcdFx0aWYgKCAhZXZlbnQubmFtZXNwYWNlX3JlIHx8IGV2ZW50Lm5hbWVzcGFjZV9yZS50ZXN0KCBoYW5kbGVPYmoubmFtZXNwYWNlICkgKSB7XG5cblx0XHRcdFx0XHRldmVudC5oYW5kbGVPYmogPSBoYW5kbGVPYmo7XG5cdFx0XHRcdFx0ZXZlbnQuZGF0YSA9IGhhbmRsZU9iai5kYXRhO1xuXG5cdFx0XHRcdFx0cmV0ID0gKCAoalF1ZXJ5LmV2ZW50LnNwZWNpYWxbIGhhbmRsZU9iai5vcmlnVHlwZSBdIHx8IHt9KS5oYW5kbGUgfHwgaGFuZGxlT2JqLmhhbmRsZXIgKVxuXHRcdFx0XHRcdFx0XHQuYXBwbHkoIG1hdGNoZWQuZWxlbSwgYXJncyApO1xuXG5cdFx0XHRcdFx0aWYgKCByZXQgIT09IHVuZGVmaW5lZCApIHtcblx0XHRcdFx0XHRcdGlmICggKGV2ZW50LnJlc3VsdCA9IHJldCkgPT09IGZhbHNlICkge1xuXHRcdFx0XHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBDYWxsIHRoZSBwb3N0RGlzcGF0Y2ggaG9vayBmb3IgdGhlIG1hcHBlZCB0eXBlXG5cdFx0aWYgKCBzcGVjaWFsLnBvc3REaXNwYXRjaCApIHtcblx0XHRcdHNwZWNpYWwucG9zdERpc3BhdGNoLmNhbGwoIHRoaXMsIGV2ZW50ICk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGV2ZW50LnJlc3VsdDtcblx0fSxcblxuXHRoYW5kbGVyczogZnVuY3Rpb24oIGV2ZW50LCBoYW5kbGVycyApIHtcblx0XHR2YXIgaSwgbWF0Y2hlcywgc2VsLCBoYW5kbGVPYmosXG5cdFx0XHRoYW5kbGVyUXVldWUgPSBbXSxcblx0XHRcdGRlbGVnYXRlQ291bnQgPSBoYW5kbGVycy5kZWxlZ2F0ZUNvdW50LFxuXHRcdFx0Y3VyID0gZXZlbnQudGFyZ2V0O1xuXG5cdFx0Ly8gRmluZCBkZWxlZ2F0ZSBoYW5kbGVyc1xuXHRcdC8vIEJsYWNrLWhvbGUgU1ZHIDx1c2U+IGluc3RhbmNlIHRyZWVzICgjMTMxODApXG5cdFx0Ly8gQXZvaWQgbm9uLWxlZnQtY2xpY2sgYnViYmxpbmcgaW4gRmlyZWZveCAoIzM4NjEpXG5cdFx0aWYgKCBkZWxlZ2F0ZUNvdW50ICYmIGN1ci5ub2RlVHlwZSAmJiAoIWV2ZW50LmJ1dHRvbiB8fCBldmVudC50eXBlICE9PSBcImNsaWNrXCIpICkge1xuXG5cdFx0XHRmb3IgKCA7IGN1ciAhPT0gdGhpczsgY3VyID0gY3VyLnBhcmVudE5vZGUgfHwgdGhpcyApIHtcblxuXHRcdFx0XHQvLyBEb24ndCBwcm9jZXNzIGNsaWNrcyBvbiBkaXNhYmxlZCBlbGVtZW50cyAoIzY5MTEsICM4MTY1LCAjMTEzODIsICMxMTc2NClcblx0XHRcdFx0aWYgKCBjdXIuZGlzYWJsZWQgIT09IHRydWUgfHwgZXZlbnQudHlwZSAhPT0gXCJjbGlja1wiICkge1xuXHRcdFx0XHRcdG1hdGNoZXMgPSBbXTtcblx0XHRcdFx0XHRmb3IgKCBpID0gMDsgaSA8IGRlbGVnYXRlQ291bnQ7IGkrKyApIHtcblx0XHRcdFx0XHRcdGhhbmRsZU9iaiA9IGhhbmRsZXJzWyBpIF07XG5cblx0XHRcdFx0XHRcdC8vIERvbid0IGNvbmZsaWN0IHdpdGggT2JqZWN0LnByb3RvdHlwZSBwcm9wZXJ0aWVzICgjMTMyMDMpXG5cdFx0XHRcdFx0XHRzZWwgPSBoYW5kbGVPYmouc2VsZWN0b3IgKyBcIiBcIjtcblxuXHRcdFx0XHRcdFx0aWYgKCBtYXRjaGVzWyBzZWwgXSA9PT0gdW5kZWZpbmVkICkge1xuXHRcdFx0XHRcdFx0XHRtYXRjaGVzWyBzZWwgXSA9IGhhbmRsZU9iai5uZWVkc0NvbnRleHQgP1xuXHRcdFx0XHRcdFx0XHRcdGpRdWVyeSggc2VsLCB0aGlzICkuaW5kZXgoIGN1ciApID49IDAgOlxuXHRcdFx0XHRcdFx0XHRcdGpRdWVyeS5maW5kKCBzZWwsIHRoaXMsIG51bGwsIFsgY3VyIF0gKS5sZW5ndGg7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRpZiAoIG1hdGNoZXNbIHNlbCBdICkge1xuXHRcdFx0XHRcdFx0XHRtYXRjaGVzLnB1c2goIGhhbmRsZU9iaiApO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAoIG1hdGNoZXMubGVuZ3RoICkge1xuXHRcdFx0XHRcdFx0aGFuZGxlclF1ZXVlLnB1c2goeyBlbGVtOiBjdXIsIGhhbmRsZXJzOiBtYXRjaGVzIH0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIEFkZCB0aGUgcmVtYWluaW5nIChkaXJlY3RseS1ib3VuZCkgaGFuZGxlcnNcblx0XHRpZiAoIGRlbGVnYXRlQ291bnQgPCBoYW5kbGVycy5sZW5ndGggKSB7XG5cdFx0XHRoYW5kbGVyUXVldWUucHVzaCh7IGVsZW06IHRoaXMsIGhhbmRsZXJzOiBoYW5kbGVycy5zbGljZSggZGVsZWdhdGVDb3VudCApIH0pO1xuXHRcdH1cblxuXHRcdHJldHVybiBoYW5kbGVyUXVldWU7XG5cdH0sXG5cblx0Ly8gSW5jbHVkZXMgc29tZSBldmVudCBwcm9wcyBzaGFyZWQgYnkgS2V5RXZlbnQgYW5kIE1vdXNlRXZlbnRcblx0cHJvcHM6IFwiYWx0S2V5IGJ1YmJsZXMgY2FuY2VsYWJsZSBjdHJsS2V5IGN1cnJlbnRUYXJnZXQgZXZlbnRQaGFzZSBtZXRhS2V5IHJlbGF0ZWRUYXJnZXQgc2hpZnRLZXkgdGFyZ2V0IHRpbWVTdGFtcCB2aWV3IHdoaWNoXCIuc3BsaXQoXCIgXCIpLFxuXG5cdGZpeEhvb2tzOiB7fSxcblxuXHRrZXlIb29rczoge1xuXHRcdHByb3BzOiBcImNoYXIgY2hhckNvZGUga2V5IGtleUNvZGVcIi5zcGxpdChcIiBcIiksXG5cdFx0ZmlsdGVyOiBmdW5jdGlvbiggZXZlbnQsIG9yaWdpbmFsICkge1xuXG5cdFx0XHQvLyBBZGQgd2hpY2ggZm9yIGtleSBldmVudHNcblx0XHRcdGlmICggZXZlbnQud2hpY2ggPT0gbnVsbCApIHtcblx0XHRcdFx0ZXZlbnQud2hpY2ggPSBvcmlnaW5hbC5jaGFyQ29kZSAhPSBudWxsID8gb3JpZ2luYWwuY2hhckNvZGUgOiBvcmlnaW5hbC5rZXlDb2RlO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gZXZlbnQ7XG5cdFx0fVxuXHR9LFxuXG5cdG1vdXNlSG9va3M6IHtcblx0XHRwcm9wczogXCJidXR0b24gYnV0dG9ucyBjbGllbnRYIGNsaWVudFkgb2Zmc2V0WCBvZmZzZXRZIHBhZ2VYIHBhZ2VZIHNjcmVlblggc2NyZWVuWSB0b0VsZW1lbnRcIi5zcGxpdChcIiBcIiksXG5cdFx0ZmlsdGVyOiBmdW5jdGlvbiggZXZlbnQsIG9yaWdpbmFsICkge1xuXHRcdFx0dmFyIGV2ZW50RG9jLCBkb2MsIGJvZHksXG5cdFx0XHRcdGJ1dHRvbiA9IG9yaWdpbmFsLmJ1dHRvbjtcblxuXHRcdFx0Ly8gQ2FsY3VsYXRlIHBhZ2VYL1kgaWYgbWlzc2luZyBhbmQgY2xpZW50WC9ZIGF2YWlsYWJsZVxuXHRcdFx0aWYgKCBldmVudC5wYWdlWCA9PSBudWxsICYmIG9yaWdpbmFsLmNsaWVudFggIT0gbnVsbCApIHtcblx0XHRcdFx0ZXZlbnREb2MgPSBldmVudC50YXJnZXQub3duZXJEb2N1bWVudCB8fCBkb2N1bWVudDtcblx0XHRcdFx0ZG9jID0gZXZlbnREb2MuZG9jdW1lbnRFbGVtZW50O1xuXHRcdFx0XHRib2R5ID0gZXZlbnREb2MuYm9keTtcblxuXHRcdFx0XHRldmVudC5wYWdlWCA9IG9yaWdpbmFsLmNsaWVudFggKyAoIGRvYyAmJiBkb2Muc2Nyb2xsTGVmdCB8fCBib2R5ICYmIGJvZHkuc2Nyb2xsTGVmdCB8fCAwICkgLSAoIGRvYyAmJiBkb2MuY2xpZW50TGVmdCB8fCBib2R5ICYmIGJvZHkuY2xpZW50TGVmdCB8fCAwICk7XG5cdFx0XHRcdGV2ZW50LnBhZ2VZID0gb3JpZ2luYWwuY2xpZW50WSArICggZG9jICYmIGRvYy5zY3JvbGxUb3AgIHx8IGJvZHkgJiYgYm9keS5zY3JvbGxUb3AgIHx8IDAgKSAtICggZG9jICYmIGRvYy5jbGllbnRUb3AgIHx8IGJvZHkgJiYgYm9keS5jbGllbnRUb3AgIHx8IDAgKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gQWRkIHdoaWNoIGZvciBjbGljazogMSA9PT0gbGVmdDsgMiA9PT0gbWlkZGxlOyAzID09PSByaWdodFxuXHRcdFx0Ly8gTm90ZTogYnV0dG9uIGlzIG5vdCBub3JtYWxpemVkLCBzbyBkb24ndCB1c2UgaXRcblx0XHRcdGlmICggIWV2ZW50LndoaWNoICYmIGJ1dHRvbiAhPT0gdW5kZWZpbmVkICkge1xuXHRcdFx0XHRldmVudC53aGljaCA9ICggYnV0dG9uICYgMSA/IDEgOiAoIGJ1dHRvbiAmIDIgPyAzIDogKCBidXR0b24gJiA0ID8gMiA6IDAgKSApICk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBldmVudDtcblx0XHR9XG5cdH0sXG5cblx0Zml4OiBmdW5jdGlvbiggZXZlbnQgKSB7XG5cdFx0aWYgKCBldmVudFsgalF1ZXJ5LmV4cGFuZG8gXSApIHtcblx0XHRcdHJldHVybiBldmVudDtcblx0XHR9XG5cblx0XHQvLyBDcmVhdGUgYSB3cml0YWJsZSBjb3B5IG9mIHRoZSBldmVudCBvYmplY3QgYW5kIG5vcm1hbGl6ZSBzb21lIHByb3BlcnRpZXNcblx0XHR2YXIgaSwgcHJvcCwgY29weSxcblx0XHRcdHR5cGUgPSBldmVudC50eXBlLFxuXHRcdFx0b3JpZ2luYWxFdmVudCA9IGV2ZW50LFxuXHRcdFx0Zml4SG9vayA9IHRoaXMuZml4SG9va3NbIHR5cGUgXTtcblxuXHRcdGlmICggIWZpeEhvb2sgKSB7XG5cdFx0XHR0aGlzLmZpeEhvb2tzWyB0eXBlIF0gPSBmaXhIb29rID1cblx0XHRcdFx0cm1vdXNlRXZlbnQudGVzdCggdHlwZSApID8gdGhpcy5tb3VzZUhvb2tzIDpcblx0XHRcdFx0cmtleUV2ZW50LnRlc3QoIHR5cGUgKSA/IHRoaXMua2V5SG9va3MgOlxuXHRcdFx0XHR7fTtcblx0XHR9XG5cdFx0Y29weSA9IGZpeEhvb2sucHJvcHMgPyB0aGlzLnByb3BzLmNvbmNhdCggZml4SG9vay5wcm9wcyApIDogdGhpcy5wcm9wcztcblxuXHRcdGV2ZW50ID0gbmV3IGpRdWVyeS5FdmVudCggb3JpZ2luYWxFdmVudCApO1xuXG5cdFx0aSA9IGNvcHkubGVuZ3RoO1xuXHRcdHdoaWxlICggaS0tICkge1xuXHRcdFx0cHJvcCA9IGNvcHlbIGkgXTtcblx0XHRcdGV2ZW50WyBwcm9wIF0gPSBvcmlnaW5hbEV2ZW50WyBwcm9wIF07XG5cdFx0fVxuXG5cdFx0Ly8gU3VwcG9ydDogQ29yZG92YSAyLjUgKFdlYktpdCkgKCMxMzI1NSlcblx0XHQvLyBBbGwgZXZlbnRzIHNob3VsZCBoYXZlIGEgdGFyZ2V0OyBDb3Jkb3ZhIGRldmljZXJlYWR5IGRvZXNuJ3Rcblx0XHRpZiAoICFldmVudC50YXJnZXQgKSB7XG5cdFx0XHRldmVudC50YXJnZXQgPSBkb2N1bWVudDtcblx0XHR9XG5cblx0XHQvLyBTdXBwb3J0OiBTYWZhcmkgNi4wKywgQ2hyb21lPDI4XG5cdFx0Ly8gVGFyZ2V0IHNob3VsZCBub3QgYmUgYSB0ZXh0IG5vZGUgKCM1MDQsICMxMzE0Mylcblx0XHRpZiAoIGV2ZW50LnRhcmdldC5ub2RlVHlwZSA9PT0gMyApIHtcblx0XHRcdGV2ZW50LnRhcmdldCA9IGV2ZW50LnRhcmdldC5wYXJlbnROb2RlO1xuXHRcdH1cblxuXHRcdHJldHVybiBmaXhIb29rLmZpbHRlciA/IGZpeEhvb2suZmlsdGVyKCBldmVudCwgb3JpZ2luYWxFdmVudCApIDogZXZlbnQ7XG5cdH0sXG5cblx0c3BlY2lhbDoge1xuXHRcdGxvYWQ6IHtcblx0XHRcdC8vIFByZXZlbnQgdHJpZ2dlcmVkIGltYWdlLmxvYWQgZXZlbnRzIGZyb20gYnViYmxpbmcgdG8gd2luZG93LmxvYWRcblx0XHRcdG5vQnViYmxlOiB0cnVlXG5cdFx0fSxcblx0XHRmb2N1czoge1xuXHRcdFx0Ly8gRmlyZSBuYXRpdmUgZXZlbnQgaWYgcG9zc2libGUgc28gYmx1ci9mb2N1cyBzZXF1ZW5jZSBpcyBjb3JyZWN0XG5cdFx0XHR0cmlnZ2VyOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0aWYgKCB0aGlzICE9PSBzYWZlQWN0aXZlRWxlbWVudCgpICYmIHRoaXMuZm9jdXMgKSB7XG5cdFx0XHRcdFx0dGhpcy5mb2N1cygpO1xuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdGRlbGVnYXRlVHlwZTogXCJmb2N1c2luXCJcblx0XHR9LFxuXHRcdGJsdXI6IHtcblx0XHRcdHRyaWdnZXI6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRpZiAoIHRoaXMgPT09IHNhZmVBY3RpdmVFbGVtZW50KCkgJiYgdGhpcy5ibHVyICkge1xuXHRcdFx0XHRcdHRoaXMuYmx1cigpO1xuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdGRlbGVnYXRlVHlwZTogXCJmb2N1c291dFwiXG5cdFx0fSxcblx0XHRjbGljazoge1xuXHRcdFx0Ly8gRm9yIGNoZWNrYm94LCBmaXJlIG5hdGl2ZSBldmVudCBzbyBjaGVja2VkIHN0YXRlIHdpbGwgYmUgcmlnaHRcblx0XHRcdHRyaWdnZXI6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRpZiAoIHRoaXMudHlwZSA9PT0gXCJjaGVja2JveFwiICYmIHRoaXMuY2xpY2sgJiYgalF1ZXJ5Lm5vZGVOYW1lKCB0aGlzLCBcImlucHV0XCIgKSApIHtcblx0XHRcdFx0XHR0aGlzLmNsaWNrKCk7XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXG5cdFx0XHQvLyBGb3IgY3Jvc3MtYnJvd3NlciBjb25zaXN0ZW5jeSwgZG9uJ3QgZmlyZSBuYXRpdmUgLmNsaWNrKCkgb24gbGlua3Ncblx0XHRcdF9kZWZhdWx0OiBmdW5jdGlvbiggZXZlbnQgKSB7XG5cdFx0XHRcdHJldHVybiBqUXVlcnkubm9kZU5hbWUoIGV2ZW50LnRhcmdldCwgXCJhXCIgKTtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0YmVmb3JldW5sb2FkOiB7XG5cdFx0XHRwb3N0RGlzcGF0Y2g6IGZ1bmN0aW9uKCBldmVudCApIHtcblxuXHRcdFx0XHQvLyBTdXBwb3J0OiBGaXJlZm94IDIwK1xuXHRcdFx0XHQvLyBGaXJlZm94IGRvZXNuJ3QgYWxlcnQgaWYgdGhlIHJldHVyblZhbHVlIGZpZWxkIGlzIG5vdCBzZXQuXG5cdFx0XHRcdGlmICggZXZlbnQucmVzdWx0ICE9PSB1bmRlZmluZWQgJiYgZXZlbnQub3JpZ2luYWxFdmVudCApIHtcblx0XHRcdFx0XHRldmVudC5vcmlnaW5hbEV2ZW50LnJldHVyblZhbHVlID0gZXZlbnQucmVzdWx0O1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXG5cdHNpbXVsYXRlOiBmdW5jdGlvbiggdHlwZSwgZWxlbSwgZXZlbnQsIGJ1YmJsZSApIHtcblx0XHQvLyBQaWdneWJhY2sgb24gYSBkb25vciBldmVudCB0byBzaW11bGF0ZSBhIGRpZmZlcmVudCBvbmUuXG5cdFx0Ly8gRmFrZSBvcmlnaW5hbEV2ZW50IHRvIGF2b2lkIGRvbm9yJ3Mgc3RvcFByb3BhZ2F0aW9uLCBidXQgaWYgdGhlXG5cdFx0Ly8gc2ltdWxhdGVkIGV2ZW50IHByZXZlbnRzIGRlZmF1bHQgdGhlbiB3ZSBkbyB0aGUgc2FtZSBvbiB0aGUgZG9ub3IuXG5cdFx0dmFyIGUgPSBqUXVlcnkuZXh0ZW5kKFxuXHRcdFx0bmV3IGpRdWVyeS5FdmVudCgpLFxuXHRcdFx0ZXZlbnQsXG5cdFx0XHR7XG5cdFx0XHRcdHR5cGU6IHR5cGUsXG5cdFx0XHRcdGlzU2ltdWxhdGVkOiB0cnVlLFxuXHRcdFx0XHRvcmlnaW5hbEV2ZW50OiB7fVxuXHRcdFx0fVxuXHRcdCk7XG5cdFx0aWYgKCBidWJibGUgKSB7XG5cdFx0XHRqUXVlcnkuZXZlbnQudHJpZ2dlciggZSwgbnVsbCwgZWxlbSApO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRqUXVlcnkuZXZlbnQuZGlzcGF0Y2guY2FsbCggZWxlbSwgZSApO1xuXHRcdH1cblx0XHRpZiAoIGUuaXNEZWZhdWx0UHJldmVudGVkKCkgKSB7XG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdH1cblx0fVxufTtcblxualF1ZXJ5LnJlbW92ZUV2ZW50ID0gZnVuY3Rpb24oIGVsZW0sIHR5cGUsIGhhbmRsZSApIHtcblx0aWYgKCBlbGVtLnJlbW92ZUV2ZW50TGlzdGVuZXIgKSB7XG5cdFx0ZWxlbS5yZW1vdmVFdmVudExpc3RlbmVyKCB0eXBlLCBoYW5kbGUsIGZhbHNlICk7XG5cdH1cbn07XG5cbmpRdWVyeS5FdmVudCA9IGZ1bmN0aW9uKCBzcmMsIHByb3BzICkge1xuXHQvLyBBbGxvdyBpbnN0YW50aWF0aW9uIHdpdGhvdXQgdGhlICduZXcnIGtleXdvcmRcblx0aWYgKCAhKHRoaXMgaW5zdGFuY2VvZiBqUXVlcnkuRXZlbnQpICkge1xuXHRcdHJldHVybiBuZXcgalF1ZXJ5LkV2ZW50KCBzcmMsIHByb3BzICk7XG5cdH1cblxuXHQvLyBFdmVudCBvYmplY3Rcblx0aWYgKCBzcmMgJiYgc3JjLnR5cGUgKSB7XG5cdFx0dGhpcy5vcmlnaW5hbEV2ZW50ID0gc3JjO1xuXHRcdHRoaXMudHlwZSA9IHNyYy50eXBlO1xuXG5cdFx0Ly8gRXZlbnRzIGJ1YmJsaW5nIHVwIHRoZSBkb2N1bWVudCBtYXkgaGF2ZSBiZWVuIG1hcmtlZCBhcyBwcmV2ZW50ZWRcblx0XHQvLyBieSBhIGhhbmRsZXIgbG93ZXIgZG93biB0aGUgdHJlZTsgcmVmbGVjdCB0aGUgY29ycmVjdCB2YWx1ZS5cblx0XHR0aGlzLmlzRGVmYXVsdFByZXZlbnRlZCA9IHNyYy5kZWZhdWx0UHJldmVudGVkIHx8XG5cdFx0XHRcdHNyYy5kZWZhdWx0UHJldmVudGVkID09PSB1bmRlZmluZWQgJiZcblx0XHRcdFx0Ly8gU3VwcG9ydDogQW5kcm9pZDw0LjBcblx0XHRcdFx0c3JjLnJldHVyblZhbHVlID09PSBmYWxzZSA/XG5cdFx0XHRyZXR1cm5UcnVlIDpcblx0XHRcdHJldHVybkZhbHNlO1xuXG5cdC8vIEV2ZW50IHR5cGVcblx0fSBlbHNlIHtcblx0XHR0aGlzLnR5cGUgPSBzcmM7XG5cdH1cblxuXHQvLyBQdXQgZXhwbGljaXRseSBwcm92aWRlZCBwcm9wZXJ0aWVzIG9udG8gdGhlIGV2ZW50IG9iamVjdFxuXHRpZiAoIHByb3BzICkge1xuXHRcdGpRdWVyeS5leHRlbmQoIHRoaXMsIHByb3BzICk7XG5cdH1cblxuXHQvLyBDcmVhdGUgYSB0aW1lc3RhbXAgaWYgaW5jb21pbmcgZXZlbnQgZG9lc24ndCBoYXZlIG9uZVxuXHR0aGlzLnRpbWVTdGFtcCA9IHNyYyAmJiBzcmMudGltZVN0YW1wIHx8IGpRdWVyeS5ub3coKTtcblxuXHQvLyBNYXJrIGl0IGFzIGZpeGVkXG5cdHRoaXNbIGpRdWVyeS5leHBhbmRvIF0gPSB0cnVlO1xufTtcblxuLy8galF1ZXJ5LkV2ZW50IGlzIGJhc2VkIG9uIERPTTMgRXZlbnRzIGFzIHNwZWNpZmllZCBieSB0aGUgRUNNQVNjcmlwdCBMYW5ndWFnZSBCaW5kaW5nXG4vLyBodHRwOi8vd3d3LnczLm9yZy9UUi8yMDAzL1dELURPTS1MZXZlbC0zLUV2ZW50cy0yMDAzMDMzMS9lY21hLXNjcmlwdC1iaW5kaW5nLmh0bWxcbmpRdWVyeS5FdmVudC5wcm90b3R5cGUgPSB7XG5cdGlzRGVmYXVsdFByZXZlbnRlZDogcmV0dXJuRmFsc2UsXG5cdGlzUHJvcGFnYXRpb25TdG9wcGVkOiByZXR1cm5GYWxzZSxcblx0aXNJbW1lZGlhdGVQcm9wYWdhdGlvblN0b3BwZWQ6IHJldHVybkZhbHNlLFxuXG5cdHByZXZlbnREZWZhdWx0OiBmdW5jdGlvbigpIHtcblx0XHR2YXIgZSA9IHRoaXMub3JpZ2luYWxFdmVudDtcblxuXHRcdHRoaXMuaXNEZWZhdWx0UHJldmVudGVkID0gcmV0dXJuVHJ1ZTtcblxuXHRcdGlmICggZSAmJiBlLnByZXZlbnREZWZhdWx0ICkge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdH1cblx0fSxcblx0c3RvcFByb3BhZ2F0aW9uOiBmdW5jdGlvbigpIHtcblx0XHR2YXIgZSA9IHRoaXMub3JpZ2luYWxFdmVudDtcblxuXHRcdHRoaXMuaXNQcm9wYWdhdGlvblN0b3BwZWQgPSByZXR1cm5UcnVlO1xuXG5cdFx0aWYgKCBlICYmIGUuc3RvcFByb3BhZ2F0aW9uICkge1xuXHRcdFx0ZS5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHR9XG5cdH0sXG5cdHN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbjogZnVuY3Rpb24oKSB7XG5cdFx0dmFyIGUgPSB0aGlzLm9yaWdpbmFsRXZlbnQ7XG5cblx0XHR0aGlzLmlzSW1tZWRpYXRlUHJvcGFnYXRpb25TdG9wcGVkID0gcmV0dXJuVHJ1ZTtcblxuXHRcdGlmICggZSAmJiBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbiApIHtcblx0XHRcdGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG5cdFx0fVxuXG5cdFx0dGhpcy5zdG9wUHJvcGFnYXRpb24oKTtcblx0fVxufTtcblxuLy8gQ3JlYXRlIG1vdXNlZW50ZXIvbGVhdmUgZXZlbnRzIHVzaW5nIG1vdXNlb3Zlci9vdXQgYW5kIGV2ZW50LXRpbWUgY2hlY2tzXG4vLyBTdXBwb3J0OiBDaHJvbWUgMTUrXG5qUXVlcnkuZWFjaCh7XG5cdG1vdXNlZW50ZXI6IFwibW91c2VvdmVyXCIsXG5cdG1vdXNlbGVhdmU6IFwibW91c2VvdXRcIixcblx0cG9pbnRlcmVudGVyOiBcInBvaW50ZXJvdmVyXCIsXG5cdHBvaW50ZXJsZWF2ZTogXCJwb2ludGVyb3V0XCJcbn0sIGZ1bmN0aW9uKCBvcmlnLCBmaXggKSB7XG5cdGpRdWVyeS5ldmVudC5zcGVjaWFsWyBvcmlnIF0gPSB7XG5cdFx0ZGVsZWdhdGVUeXBlOiBmaXgsXG5cdFx0YmluZFR5cGU6IGZpeCxcblxuXHRcdGhhbmRsZTogZnVuY3Rpb24oIGV2ZW50ICkge1xuXHRcdFx0dmFyIHJldCxcblx0XHRcdFx0dGFyZ2V0ID0gdGhpcyxcblx0XHRcdFx0cmVsYXRlZCA9IGV2ZW50LnJlbGF0ZWRUYXJnZXQsXG5cdFx0XHRcdGhhbmRsZU9iaiA9IGV2ZW50LmhhbmRsZU9iajtcblxuXHRcdFx0Ly8gRm9yIG1vdXNlbnRlci9sZWF2ZSBjYWxsIHRoZSBoYW5kbGVyIGlmIHJlbGF0ZWQgaXMgb3V0c2lkZSB0aGUgdGFyZ2V0LlxuXHRcdFx0Ly8gTkI6IE5vIHJlbGF0ZWRUYXJnZXQgaWYgdGhlIG1vdXNlIGxlZnQvZW50ZXJlZCB0aGUgYnJvd3NlciB3aW5kb3dcblx0XHRcdGlmICggIXJlbGF0ZWQgfHwgKHJlbGF0ZWQgIT09IHRhcmdldCAmJiAhalF1ZXJ5LmNvbnRhaW5zKCB0YXJnZXQsIHJlbGF0ZWQgKSkgKSB7XG5cdFx0XHRcdGV2ZW50LnR5cGUgPSBoYW5kbGVPYmoub3JpZ1R5cGU7XG5cdFx0XHRcdHJldCA9IGhhbmRsZU9iai5oYW5kbGVyLmFwcGx5KCB0aGlzLCBhcmd1bWVudHMgKTtcblx0XHRcdFx0ZXZlbnQudHlwZSA9IGZpeDtcblx0XHRcdH1cblx0XHRcdHJldHVybiByZXQ7XG5cdFx0fVxuXHR9O1xufSk7XG5cbi8vIFN1cHBvcnQ6IEZpcmVmb3gsIENocm9tZSwgU2FmYXJpXG4vLyBDcmVhdGUgXCJidWJibGluZ1wiIGZvY3VzIGFuZCBibHVyIGV2ZW50c1xuaWYgKCAhc3VwcG9ydC5mb2N1c2luQnViYmxlcyApIHtcblx0alF1ZXJ5LmVhY2goeyBmb2N1czogXCJmb2N1c2luXCIsIGJsdXI6IFwiZm9jdXNvdXRcIiB9LCBmdW5jdGlvbiggb3JpZywgZml4ICkge1xuXG5cdFx0Ly8gQXR0YWNoIGEgc2luZ2xlIGNhcHR1cmluZyBoYW5kbGVyIG9uIHRoZSBkb2N1bWVudCB3aGlsZSBzb21lb25lIHdhbnRzIGZvY3VzaW4vZm9jdXNvdXRcblx0XHR2YXIgaGFuZGxlciA9IGZ1bmN0aW9uKCBldmVudCApIHtcblx0XHRcdFx0alF1ZXJ5LmV2ZW50LnNpbXVsYXRlKCBmaXgsIGV2ZW50LnRhcmdldCwgalF1ZXJ5LmV2ZW50LmZpeCggZXZlbnQgKSwgdHJ1ZSApO1xuXHRcdFx0fTtcblxuXHRcdGpRdWVyeS5ldmVudC5zcGVjaWFsWyBmaXggXSA9IHtcblx0XHRcdHNldHVwOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0dmFyIGRvYyA9IHRoaXMub3duZXJEb2N1bWVudCB8fCB0aGlzLFxuXHRcdFx0XHRcdGF0dGFjaGVzID0gZGF0YV9wcml2LmFjY2VzcyggZG9jLCBmaXggKTtcblxuXHRcdFx0XHRpZiAoICFhdHRhY2hlcyApIHtcblx0XHRcdFx0XHRkb2MuYWRkRXZlbnRMaXN0ZW5lciggb3JpZywgaGFuZGxlciwgdHJ1ZSApO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGRhdGFfcHJpdi5hY2Nlc3MoIGRvYywgZml4LCAoIGF0dGFjaGVzIHx8IDAgKSArIDEgKTtcblx0XHRcdH0sXG5cdFx0XHR0ZWFyZG93bjogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhciBkb2MgPSB0aGlzLm93bmVyRG9jdW1lbnQgfHwgdGhpcyxcblx0XHRcdFx0XHRhdHRhY2hlcyA9IGRhdGFfcHJpdi5hY2Nlc3MoIGRvYywgZml4ICkgLSAxO1xuXG5cdFx0XHRcdGlmICggIWF0dGFjaGVzICkge1xuXHRcdFx0XHRcdGRvYy5yZW1vdmVFdmVudExpc3RlbmVyKCBvcmlnLCBoYW5kbGVyLCB0cnVlICk7XG5cdFx0XHRcdFx0ZGF0YV9wcml2LnJlbW92ZSggZG9jLCBmaXggKTtcblxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGRhdGFfcHJpdi5hY2Nlc3MoIGRvYywgZml4LCBhdHRhY2hlcyApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fTtcblx0fSk7XG59XG5cbmpRdWVyeS5mbi5leHRlbmQoe1xuXG5cdG9uOiBmdW5jdGlvbiggdHlwZXMsIHNlbGVjdG9yLCBkYXRhLCBmbiwgLypJTlRFUk5BTCovIG9uZSApIHtcblx0XHR2YXIgb3JpZ0ZuLCB0eXBlO1xuXG5cdFx0Ly8gVHlwZXMgY2FuIGJlIGEgbWFwIG9mIHR5cGVzL2hhbmRsZXJzXG5cdFx0aWYgKCB0eXBlb2YgdHlwZXMgPT09IFwib2JqZWN0XCIgKSB7XG5cdFx0XHQvLyAoIHR5cGVzLU9iamVjdCwgc2VsZWN0b3IsIGRhdGEgKVxuXHRcdFx0aWYgKCB0eXBlb2Ygc2VsZWN0b3IgIT09IFwic3RyaW5nXCIgKSB7XG5cdFx0XHRcdC8vICggdHlwZXMtT2JqZWN0LCBkYXRhIClcblx0XHRcdFx0ZGF0YSA9IGRhdGEgfHwgc2VsZWN0b3I7XG5cdFx0XHRcdHNlbGVjdG9yID0gdW5kZWZpbmVkO1xuXHRcdFx0fVxuXHRcdFx0Zm9yICggdHlwZSBpbiB0eXBlcyApIHtcblx0XHRcdFx0dGhpcy5vbiggdHlwZSwgc2VsZWN0b3IsIGRhdGEsIHR5cGVzWyB0eXBlIF0sIG9uZSApO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fVxuXG5cdFx0aWYgKCBkYXRhID09IG51bGwgJiYgZm4gPT0gbnVsbCApIHtcblx0XHRcdC8vICggdHlwZXMsIGZuIClcblx0XHRcdGZuID0gc2VsZWN0b3I7XG5cdFx0XHRkYXRhID0gc2VsZWN0b3IgPSB1bmRlZmluZWQ7XG5cdFx0fSBlbHNlIGlmICggZm4gPT0gbnVsbCApIHtcblx0XHRcdGlmICggdHlwZW9mIHNlbGVjdG9yID09PSBcInN0cmluZ1wiICkge1xuXHRcdFx0XHQvLyAoIHR5cGVzLCBzZWxlY3RvciwgZm4gKVxuXHRcdFx0XHRmbiA9IGRhdGE7XG5cdFx0XHRcdGRhdGEgPSB1bmRlZmluZWQ7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQvLyAoIHR5cGVzLCBkYXRhLCBmbiApXG5cdFx0XHRcdGZuID0gZGF0YTtcblx0XHRcdFx0ZGF0YSA9IHNlbGVjdG9yO1xuXHRcdFx0XHRzZWxlY3RvciA9IHVuZGVmaW5lZDtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYgKCBmbiA9PT0gZmFsc2UgKSB7XG5cdFx0XHRmbiA9IHJldHVybkZhbHNlO1xuXHRcdH0gZWxzZSBpZiAoICFmbiApIHtcblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH1cblxuXHRcdGlmICggb25lID09PSAxICkge1xuXHRcdFx0b3JpZ0ZuID0gZm47XG5cdFx0XHRmbiA9IGZ1bmN0aW9uKCBldmVudCApIHtcblx0XHRcdFx0Ly8gQ2FuIHVzZSBhbiBlbXB0eSBzZXQsIHNpbmNlIGV2ZW50IGNvbnRhaW5zIHRoZSBpbmZvXG5cdFx0XHRcdGpRdWVyeSgpLm9mZiggZXZlbnQgKTtcblx0XHRcdFx0cmV0dXJuIG9yaWdGbi5hcHBseSggdGhpcywgYXJndW1lbnRzICk7XG5cdFx0XHR9O1xuXHRcdFx0Ly8gVXNlIHNhbWUgZ3VpZCBzbyBjYWxsZXIgY2FuIHJlbW92ZSB1c2luZyBvcmlnRm5cblx0XHRcdGZuLmd1aWQgPSBvcmlnRm4uZ3VpZCB8fCAoIG9yaWdGbi5ndWlkID0galF1ZXJ5Lmd1aWQrKyApO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcy5lYWNoKCBmdW5jdGlvbigpIHtcblx0XHRcdGpRdWVyeS5ldmVudC5hZGQoIHRoaXMsIHR5cGVzLCBmbiwgZGF0YSwgc2VsZWN0b3IgKTtcblx0XHR9KTtcblx0fSxcblx0b25lOiBmdW5jdGlvbiggdHlwZXMsIHNlbGVjdG9yLCBkYXRhLCBmbiApIHtcblx0XHRyZXR1cm4gdGhpcy5vbiggdHlwZXMsIHNlbGVjdG9yLCBkYXRhLCBmbiwgMSApO1xuXHR9LFxuXHRvZmY6IGZ1bmN0aW9uKCB0eXBlcywgc2VsZWN0b3IsIGZuICkge1xuXHRcdHZhciBoYW5kbGVPYmosIHR5cGU7XG5cdFx0aWYgKCB0eXBlcyAmJiB0eXBlcy5wcmV2ZW50RGVmYXVsdCAmJiB0eXBlcy5oYW5kbGVPYmogKSB7XG5cdFx0XHQvLyAoIGV2ZW50ICkgIGRpc3BhdGNoZWQgalF1ZXJ5LkV2ZW50XG5cdFx0XHRoYW5kbGVPYmogPSB0eXBlcy5oYW5kbGVPYmo7XG5cdFx0XHRqUXVlcnkoIHR5cGVzLmRlbGVnYXRlVGFyZ2V0ICkub2ZmKFxuXHRcdFx0XHRoYW5kbGVPYmoubmFtZXNwYWNlID8gaGFuZGxlT2JqLm9yaWdUeXBlICsgXCIuXCIgKyBoYW5kbGVPYmoubmFtZXNwYWNlIDogaGFuZGxlT2JqLm9yaWdUeXBlLFxuXHRcdFx0XHRoYW5kbGVPYmouc2VsZWN0b3IsXG5cdFx0XHRcdGhhbmRsZU9iai5oYW5kbGVyXG5cdFx0XHQpO1xuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fVxuXHRcdGlmICggdHlwZW9mIHR5cGVzID09PSBcIm9iamVjdFwiICkge1xuXHRcdFx0Ly8gKCB0eXBlcy1vYmplY3QgWywgc2VsZWN0b3JdIClcblx0XHRcdGZvciAoIHR5cGUgaW4gdHlwZXMgKSB7XG5cdFx0XHRcdHRoaXMub2ZmKCB0eXBlLCBzZWxlY3RvciwgdHlwZXNbIHR5cGUgXSApO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fVxuXHRcdGlmICggc2VsZWN0b3IgPT09IGZhbHNlIHx8IHR5cGVvZiBzZWxlY3RvciA9PT0gXCJmdW5jdGlvblwiICkge1xuXHRcdFx0Ly8gKCB0eXBlcyBbLCBmbl0gKVxuXHRcdFx0Zm4gPSBzZWxlY3Rvcjtcblx0XHRcdHNlbGVjdG9yID0gdW5kZWZpbmVkO1xuXHRcdH1cblx0XHRpZiAoIGZuID09PSBmYWxzZSApIHtcblx0XHRcdGZuID0gcmV0dXJuRmFsc2U7XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKSB7XG5cdFx0XHRqUXVlcnkuZXZlbnQucmVtb3ZlKCB0aGlzLCB0eXBlcywgZm4sIHNlbGVjdG9yICk7XG5cdFx0fSk7XG5cdH0sXG5cblx0dHJpZ2dlcjogZnVuY3Rpb24oIHR5cGUsIGRhdGEgKSB7XG5cdFx0cmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpIHtcblx0XHRcdGpRdWVyeS5ldmVudC50cmlnZ2VyKCB0eXBlLCBkYXRhLCB0aGlzICk7XG5cdFx0fSk7XG5cdH0sXG5cdHRyaWdnZXJIYW5kbGVyOiBmdW5jdGlvbiggdHlwZSwgZGF0YSApIHtcblx0XHR2YXIgZWxlbSA9IHRoaXNbMF07XG5cdFx0aWYgKCBlbGVtICkge1xuXHRcdFx0cmV0dXJuIGpRdWVyeS5ldmVudC50cmlnZ2VyKCB0eXBlLCBkYXRhLCBlbGVtLCB0cnVlICk7XG5cdFx0fVxuXHR9XG59KTtcblxucmV0dXJuIGpRdWVyeTtcbn0pO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vanF1ZXJ5L3NyYy9ldmVudC5qc1xuICoqIG1vZHVsZSBpZCA9IDE3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJkZWZpbmUoW1xuXHRcIi4uL3Zhci9zdXBwb3J0XCJcbl0sIGZ1bmN0aW9uKCBzdXBwb3J0ICkge1xuXG5zdXBwb3J0LmZvY3VzaW5CdWJibGVzID0gXCJvbmZvY3VzaW5cIiBpbiB3aW5kb3c7XG5cbnJldHVybiBzdXBwb3J0O1xuXG59KTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2pxdWVyeS9zcmMvZXZlbnQvc3VwcG9ydC5qc1xuICoqIG1vZHVsZSBpZCA9IDE4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJkZWZpbmUoZnVuY3Rpb24oKSB7XG5cdHJldHVybiAoL1xcUysvZyk7XG59KTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2pxdWVyeS9zcmMvdmFyL3Jub3R3aGl0ZS5qc1xuICoqIG1vZHVsZSBpZCA9IDE5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJkZWZpbmUoZnVuY3Rpb24oKSB7XG5cdHJldHVybiB0eXBlb2YgdW5kZWZpbmVkO1xufSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9qcXVlcnkvc3JjL3Zhci9zdHJ1bmRlZmluZWQuanNcbiAqKiBtb2R1bGUgaWQgPSAyMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZGVmaW5lKFtcblx0XCIuLi9EYXRhXCJcbl0sIGZ1bmN0aW9uKCBEYXRhICkge1xuXHRyZXR1cm4gbmV3IERhdGEoKTtcbn0pO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vanF1ZXJ5L3NyYy9kYXRhL3Zhci9kYXRhX3ByaXYuanNcbiAqKiBtb2R1bGUgaWQgPSAyMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZGVmaW5lKFtcblx0XCIuLi9jb3JlXCIsXG5cdFwiLi4vdmFyL3Jub3R3aGl0ZVwiLFxuXHRcIi4vYWNjZXB0c1wiXG5dLCBmdW5jdGlvbiggalF1ZXJ5LCBybm90d2hpdGUgKSB7XG5cbmZ1bmN0aW9uIERhdGEoKSB7XG5cdC8vIFN1cHBvcnQ6IEFuZHJvaWQ8NCxcblx0Ly8gT2xkIFdlYktpdCBkb2VzIG5vdCBoYXZlIE9iamVjdC5wcmV2ZW50RXh0ZW5zaW9ucy9mcmVlemUgbWV0aG9kLFxuXHQvLyByZXR1cm4gbmV3IGVtcHR5IG9iamVjdCBpbnN0ZWFkIHdpdGggbm8gW1tzZXRdXSBhY2Nlc3NvclxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoIHRoaXMuY2FjaGUgPSB7fSwgMCwge1xuXHRcdGdldDogZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4ge307XG5cdFx0fVxuXHR9KTtcblxuXHR0aGlzLmV4cGFuZG8gPSBqUXVlcnkuZXhwYW5kbyArIERhdGEudWlkKys7XG59XG5cbkRhdGEudWlkID0gMTtcbkRhdGEuYWNjZXB0cyA9IGpRdWVyeS5hY2NlcHREYXRhO1xuXG5EYXRhLnByb3RvdHlwZSA9IHtcblx0a2V5OiBmdW5jdGlvbiggb3duZXIgKSB7XG5cdFx0Ly8gV2UgY2FuIGFjY2VwdCBkYXRhIGZvciBub24tZWxlbWVudCBub2RlcyBpbiBtb2Rlcm4gYnJvd3NlcnMsXG5cdFx0Ly8gYnV0IHdlIHNob3VsZCBub3QsIHNlZSAjODMzNS5cblx0XHQvLyBBbHdheXMgcmV0dXJuIHRoZSBrZXkgZm9yIGEgZnJvemVuIG9iamVjdC5cblx0XHRpZiAoICFEYXRhLmFjY2VwdHMoIG93bmVyICkgKSB7XG5cdFx0XHRyZXR1cm4gMDtcblx0XHR9XG5cblx0XHR2YXIgZGVzY3JpcHRvciA9IHt9LFxuXHRcdFx0Ly8gQ2hlY2sgaWYgdGhlIG93bmVyIG9iamVjdCBhbHJlYWR5IGhhcyBhIGNhY2hlIGtleVxuXHRcdFx0dW5sb2NrID0gb3duZXJbIHRoaXMuZXhwYW5kbyBdO1xuXG5cdFx0Ly8gSWYgbm90LCBjcmVhdGUgb25lXG5cdFx0aWYgKCAhdW5sb2NrICkge1xuXHRcdFx0dW5sb2NrID0gRGF0YS51aWQrKztcblxuXHRcdFx0Ly8gU2VjdXJlIGl0IGluIGEgbm9uLWVudW1lcmFibGUsIG5vbi13cml0YWJsZSBwcm9wZXJ0eVxuXHRcdFx0dHJ5IHtcblx0XHRcdFx0ZGVzY3JpcHRvclsgdGhpcy5leHBhbmRvIF0gPSB7IHZhbHVlOiB1bmxvY2sgfTtcblx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnRpZXMoIG93bmVyLCBkZXNjcmlwdG9yICk7XG5cblx0XHRcdC8vIFN1cHBvcnQ6IEFuZHJvaWQ8NFxuXHRcdFx0Ly8gRmFsbGJhY2sgdG8gYSBsZXNzIHNlY3VyZSBkZWZpbml0aW9uXG5cdFx0XHR9IGNhdGNoICggZSApIHtcblx0XHRcdFx0ZGVzY3JpcHRvclsgdGhpcy5leHBhbmRvIF0gPSB1bmxvY2s7XG5cdFx0XHRcdGpRdWVyeS5leHRlbmQoIG93bmVyLCBkZXNjcmlwdG9yICk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gRW5zdXJlIHRoZSBjYWNoZSBvYmplY3Rcblx0XHRpZiAoICF0aGlzLmNhY2hlWyB1bmxvY2sgXSApIHtcblx0XHRcdHRoaXMuY2FjaGVbIHVubG9jayBdID0ge307XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHVubG9jaztcblx0fSxcblx0c2V0OiBmdW5jdGlvbiggb3duZXIsIGRhdGEsIHZhbHVlICkge1xuXHRcdHZhciBwcm9wLFxuXHRcdFx0Ly8gVGhlcmUgbWF5IGJlIGFuIHVubG9jayBhc3NpZ25lZCB0byB0aGlzIG5vZGUsXG5cdFx0XHQvLyBpZiB0aGVyZSBpcyBubyBlbnRyeSBmb3IgdGhpcyBcIm93bmVyXCIsIGNyZWF0ZSBvbmUgaW5saW5lXG5cdFx0XHQvLyBhbmQgc2V0IHRoZSB1bmxvY2sgYXMgdGhvdWdoIGFuIG93bmVyIGVudHJ5IGhhZCBhbHdheXMgZXhpc3RlZFxuXHRcdFx0dW5sb2NrID0gdGhpcy5rZXkoIG93bmVyICksXG5cdFx0XHRjYWNoZSA9IHRoaXMuY2FjaGVbIHVubG9jayBdO1xuXG5cdFx0Ly8gSGFuZGxlOiBbIG93bmVyLCBrZXksIHZhbHVlIF0gYXJnc1xuXHRcdGlmICggdHlwZW9mIGRhdGEgPT09IFwic3RyaW5nXCIgKSB7XG5cdFx0XHRjYWNoZVsgZGF0YSBdID0gdmFsdWU7XG5cblx0XHQvLyBIYW5kbGU6IFsgb3duZXIsIHsgcHJvcGVydGllcyB9IF0gYXJnc1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyBGcmVzaCBhc3NpZ25tZW50cyBieSBvYmplY3QgYXJlIHNoYWxsb3cgY29waWVkXG5cdFx0XHRpZiAoIGpRdWVyeS5pc0VtcHR5T2JqZWN0KCBjYWNoZSApICkge1xuXHRcdFx0XHRqUXVlcnkuZXh0ZW5kKCB0aGlzLmNhY2hlWyB1bmxvY2sgXSwgZGF0YSApO1xuXHRcdFx0Ly8gT3RoZXJ3aXNlLCBjb3B5IHRoZSBwcm9wZXJ0aWVzIG9uZS1ieS1vbmUgdG8gdGhlIGNhY2hlIG9iamVjdFxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Zm9yICggcHJvcCBpbiBkYXRhICkge1xuXHRcdFx0XHRcdGNhY2hlWyBwcm9wIF0gPSBkYXRhWyBwcm9wIF07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGNhY2hlO1xuXHR9LFxuXHRnZXQ6IGZ1bmN0aW9uKCBvd25lciwga2V5ICkge1xuXHRcdC8vIEVpdGhlciBhIHZhbGlkIGNhY2hlIGlzIGZvdW5kLCBvciB3aWxsIGJlIGNyZWF0ZWQuXG5cdFx0Ly8gTmV3IGNhY2hlcyB3aWxsIGJlIGNyZWF0ZWQgYW5kIHRoZSB1bmxvY2sgcmV0dXJuZWQsXG5cdFx0Ly8gYWxsb3dpbmcgZGlyZWN0IGFjY2VzcyB0byB0aGUgbmV3bHkgY3JlYXRlZFxuXHRcdC8vIGVtcHR5IGRhdGEgb2JqZWN0LiBBIHZhbGlkIG93bmVyIG9iamVjdCBtdXN0IGJlIHByb3ZpZGVkLlxuXHRcdHZhciBjYWNoZSA9IHRoaXMuY2FjaGVbIHRoaXMua2V5KCBvd25lciApIF07XG5cblx0XHRyZXR1cm4ga2V5ID09PSB1bmRlZmluZWQgP1xuXHRcdFx0Y2FjaGUgOiBjYWNoZVsga2V5IF07XG5cdH0sXG5cdGFjY2VzczogZnVuY3Rpb24oIG93bmVyLCBrZXksIHZhbHVlICkge1xuXHRcdHZhciBzdG9yZWQ7XG5cdFx0Ly8gSW4gY2FzZXMgd2hlcmUgZWl0aGVyOlxuXHRcdC8vXG5cdFx0Ly8gICAxLiBObyBrZXkgd2FzIHNwZWNpZmllZFxuXHRcdC8vICAgMi4gQSBzdHJpbmcga2V5IHdhcyBzcGVjaWZpZWQsIGJ1dCBubyB2YWx1ZSBwcm92aWRlZFxuXHRcdC8vXG5cdFx0Ly8gVGFrZSB0aGUgXCJyZWFkXCIgcGF0aCBhbmQgYWxsb3cgdGhlIGdldCBtZXRob2QgdG8gZGV0ZXJtaW5lXG5cdFx0Ly8gd2hpY2ggdmFsdWUgdG8gcmV0dXJuLCByZXNwZWN0aXZlbHkgZWl0aGVyOlxuXHRcdC8vXG5cdFx0Ly8gICAxLiBUaGUgZW50aXJlIGNhY2hlIG9iamVjdFxuXHRcdC8vICAgMi4gVGhlIGRhdGEgc3RvcmVkIGF0IHRoZSBrZXlcblx0XHQvL1xuXHRcdGlmICgga2V5ID09PSB1bmRlZmluZWQgfHxcblx0XHRcdFx0KChrZXkgJiYgdHlwZW9mIGtleSA9PT0gXCJzdHJpbmdcIikgJiYgdmFsdWUgPT09IHVuZGVmaW5lZCkgKSB7XG5cblx0XHRcdHN0b3JlZCA9IHRoaXMuZ2V0KCBvd25lciwga2V5ICk7XG5cblx0XHRcdHJldHVybiBzdG9yZWQgIT09IHVuZGVmaW5lZCA/XG5cdFx0XHRcdHN0b3JlZCA6IHRoaXMuZ2V0KCBvd25lciwgalF1ZXJ5LmNhbWVsQ2FzZShrZXkpICk7XG5cdFx0fVxuXG5cdFx0Ly8gWypdV2hlbiB0aGUga2V5IGlzIG5vdCBhIHN0cmluZywgb3IgYm90aCBhIGtleSBhbmQgdmFsdWVcblx0XHQvLyBhcmUgc3BlY2lmaWVkLCBzZXQgb3IgZXh0ZW5kIChleGlzdGluZyBvYmplY3RzKSB3aXRoIGVpdGhlcjpcblx0XHQvL1xuXHRcdC8vICAgMS4gQW4gb2JqZWN0IG9mIHByb3BlcnRpZXNcblx0XHQvLyAgIDIuIEEga2V5IGFuZCB2YWx1ZVxuXHRcdC8vXG5cdFx0dGhpcy5zZXQoIG93bmVyLCBrZXksIHZhbHVlICk7XG5cblx0XHQvLyBTaW5jZSB0aGUgXCJzZXRcIiBwYXRoIGNhbiBoYXZlIHR3byBwb3NzaWJsZSBlbnRyeSBwb2ludHNcblx0XHQvLyByZXR1cm4gdGhlIGV4cGVjdGVkIGRhdGEgYmFzZWQgb24gd2hpY2ggcGF0aCB3YXMgdGFrZW5bKl1cblx0XHRyZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCA/IHZhbHVlIDoga2V5O1xuXHR9LFxuXHRyZW1vdmU6IGZ1bmN0aW9uKCBvd25lciwga2V5ICkge1xuXHRcdHZhciBpLCBuYW1lLCBjYW1lbCxcblx0XHRcdHVubG9jayA9IHRoaXMua2V5KCBvd25lciApLFxuXHRcdFx0Y2FjaGUgPSB0aGlzLmNhY2hlWyB1bmxvY2sgXTtcblxuXHRcdGlmICgga2V5ID09PSB1bmRlZmluZWQgKSB7XG5cdFx0XHR0aGlzLmNhY2hlWyB1bmxvY2sgXSA9IHt9O1xuXG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vIFN1cHBvcnQgYXJyYXkgb3Igc3BhY2Ugc2VwYXJhdGVkIHN0cmluZyBvZiBrZXlzXG5cdFx0XHRpZiAoIGpRdWVyeS5pc0FycmF5KCBrZXkgKSApIHtcblx0XHRcdFx0Ly8gSWYgXCJuYW1lXCIgaXMgYW4gYXJyYXkgb2Yga2V5cy4uLlxuXHRcdFx0XHQvLyBXaGVuIGRhdGEgaXMgaW5pdGlhbGx5IGNyZWF0ZWQsIHZpYSAoXCJrZXlcIiwgXCJ2YWxcIikgc2lnbmF0dXJlLFxuXHRcdFx0XHQvLyBrZXlzIHdpbGwgYmUgY29udmVydGVkIHRvIGNhbWVsQ2FzZS5cblx0XHRcdFx0Ly8gU2luY2UgdGhlcmUgaXMgbm8gd2F5IHRvIHRlbGwgX2hvd18gYSBrZXkgd2FzIGFkZGVkLCByZW1vdmVcblx0XHRcdFx0Ly8gYm90aCBwbGFpbiBrZXkgYW5kIGNhbWVsQ2FzZSBrZXkuICMxMjc4NlxuXHRcdFx0XHQvLyBUaGlzIHdpbGwgb25seSBwZW5hbGl6ZSB0aGUgYXJyYXkgYXJndW1lbnQgcGF0aC5cblx0XHRcdFx0bmFtZSA9IGtleS5jb25jYXQoIGtleS5tYXAoIGpRdWVyeS5jYW1lbENhc2UgKSApO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Y2FtZWwgPSBqUXVlcnkuY2FtZWxDYXNlKCBrZXkgKTtcblx0XHRcdFx0Ly8gVHJ5IHRoZSBzdHJpbmcgYXMgYSBrZXkgYmVmb3JlIGFueSBtYW5pcHVsYXRpb25cblx0XHRcdFx0aWYgKCBrZXkgaW4gY2FjaGUgKSB7XG5cdFx0XHRcdFx0bmFtZSA9IFsga2V5LCBjYW1lbCBdO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdC8vIElmIGEga2V5IHdpdGggdGhlIHNwYWNlcyBleGlzdHMsIHVzZSBpdC5cblx0XHRcdFx0XHQvLyBPdGhlcndpc2UsIGNyZWF0ZSBhbiBhcnJheSBieSBtYXRjaGluZyBub24td2hpdGVzcGFjZVxuXHRcdFx0XHRcdG5hbWUgPSBjYW1lbDtcblx0XHRcdFx0XHRuYW1lID0gbmFtZSBpbiBjYWNoZSA/XG5cdFx0XHRcdFx0XHRbIG5hbWUgXSA6ICggbmFtZS5tYXRjaCggcm5vdHdoaXRlICkgfHwgW10gKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRpID0gbmFtZS5sZW5ndGg7XG5cdFx0XHR3aGlsZSAoIGktLSApIHtcblx0XHRcdFx0ZGVsZXRlIGNhY2hlWyBuYW1lWyBpIF0gXTtcblx0XHRcdH1cblx0XHR9XG5cdH0sXG5cdGhhc0RhdGE6IGZ1bmN0aW9uKCBvd25lciApIHtcblx0XHRyZXR1cm4gIWpRdWVyeS5pc0VtcHR5T2JqZWN0KFxuXHRcdFx0dGhpcy5jYWNoZVsgb3duZXJbIHRoaXMuZXhwYW5kbyBdIF0gfHwge31cblx0XHQpO1xuXHR9LFxuXHRkaXNjYXJkOiBmdW5jdGlvbiggb3duZXIgKSB7XG5cdFx0aWYgKCBvd25lclsgdGhpcy5leHBhbmRvIF0gKSB7XG5cdFx0XHRkZWxldGUgdGhpcy5jYWNoZVsgb3duZXJbIHRoaXMuZXhwYW5kbyBdIF07XG5cdFx0fVxuXHR9XG59O1xuXG5yZXR1cm4gRGF0YTtcbn0pO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vanF1ZXJ5L3NyYy9kYXRhL0RhdGEuanNcbiAqKiBtb2R1bGUgaWQgPSAyMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZGVmaW5lKFtcblx0XCIuLi9jb3JlXCJcbl0sIGZ1bmN0aW9uKCBqUXVlcnkgKSB7XG5cbi8qKlxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIGFuIG9iamVjdCBjYW4gaGF2ZSBkYXRhXG4gKi9cbmpRdWVyeS5hY2NlcHREYXRhID0gZnVuY3Rpb24oIG93bmVyICkge1xuXHQvLyBBY2NlcHRzIG9ubHk6XG5cdC8vICAtIE5vZGVcblx0Ly8gICAgLSBOb2RlLkVMRU1FTlRfTk9ERVxuXHQvLyAgICAtIE5vZGUuRE9DVU1FTlRfTk9ERVxuXHQvLyAgLSBPYmplY3Rcblx0Ly8gICAgLSBBbnlcblx0LyoganNoaW50IC1XMDE4ICovXG5cdHJldHVybiBvd25lci5ub2RlVHlwZSA9PT0gMSB8fCBvd25lci5ub2RlVHlwZSA9PT0gOSB8fCAhKCArb3duZXIubm9kZVR5cGUgKTtcbn07XG5cbnJldHVybiBqUXVlcnkuYWNjZXB0RGF0YTtcbn0pO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vanF1ZXJ5L3NyYy9kYXRhL2FjY2VwdHMuanNcbiAqKiBtb2R1bGUgaWQgPSAyM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gSW5pdGlhbGl6ZSBhIGpRdWVyeSBvYmplY3RcbmRlZmluZShbXG5cdFwiLi4vY29yZVwiLFxuXHRcIi4vdmFyL3JzaW5nbGVUYWdcIixcblx0XCIuLi90cmF2ZXJzaW5nL2ZpbmRGaWx0ZXJcIlxuXSwgZnVuY3Rpb24oIGpRdWVyeSwgcnNpbmdsZVRhZyApIHtcblxuLy8gQSBjZW50cmFsIHJlZmVyZW5jZSB0byB0aGUgcm9vdCBqUXVlcnkoZG9jdW1lbnQpXG52YXIgcm9vdGpRdWVyeSxcblxuXHQvLyBBIHNpbXBsZSB3YXkgdG8gY2hlY2sgZm9yIEhUTUwgc3RyaW5nc1xuXHQvLyBQcmlvcml0aXplICNpZCBvdmVyIDx0YWc+IHRvIGF2b2lkIFhTUyB2aWEgbG9jYXRpb24uaGFzaCAoIzk1MjEpXG5cdC8vIFN0cmljdCBIVE1MIHJlY29nbml0aW9uICgjMTEyOTA6IG11c3Qgc3RhcnQgd2l0aCA8KVxuXHRycXVpY2tFeHByID0gL14oPzpcXHMqKDxbXFx3XFxXXSs+KVtePl0qfCMoW1xcdy1dKikpJC8sXG5cblx0aW5pdCA9IGpRdWVyeS5mbi5pbml0ID0gZnVuY3Rpb24oIHNlbGVjdG9yLCBjb250ZXh0ICkge1xuXHRcdHZhciBtYXRjaCwgZWxlbTtcblxuXHRcdC8vIEhBTkRMRTogJChcIlwiKSwgJChudWxsKSwgJCh1bmRlZmluZWQpLCAkKGZhbHNlKVxuXHRcdGlmICggIXNlbGVjdG9yICkge1xuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fVxuXG5cdFx0Ly8gSGFuZGxlIEhUTUwgc3RyaW5nc1xuXHRcdGlmICggdHlwZW9mIHNlbGVjdG9yID09PSBcInN0cmluZ1wiICkge1xuXHRcdFx0aWYgKCBzZWxlY3RvclswXSA9PT0gXCI8XCIgJiYgc2VsZWN0b3JbIHNlbGVjdG9yLmxlbmd0aCAtIDEgXSA9PT0gXCI+XCIgJiYgc2VsZWN0b3IubGVuZ3RoID49IDMgKSB7XG5cdFx0XHRcdC8vIEFzc3VtZSB0aGF0IHN0cmluZ3MgdGhhdCBzdGFydCBhbmQgZW5kIHdpdGggPD4gYXJlIEhUTUwgYW5kIHNraXAgdGhlIHJlZ2V4IGNoZWNrXG5cdFx0XHRcdG1hdGNoID0gWyBudWxsLCBzZWxlY3RvciwgbnVsbCBdO1xuXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRtYXRjaCA9IHJxdWlja0V4cHIuZXhlYyggc2VsZWN0b3IgKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gTWF0Y2ggaHRtbCBvciBtYWtlIHN1cmUgbm8gY29udGV4dCBpcyBzcGVjaWZpZWQgZm9yICNpZFxuXHRcdFx0aWYgKCBtYXRjaCAmJiAobWF0Y2hbMV0gfHwgIWNvbnRleHQpICkge1xuXG5cdFx0XHRcdC8vIEhBTkRMRTogJChodG1sKSAtPiAkKGFycmF5KVxuXHRcdFx0XHRpZiAoIG1hdGNoWzFdICkge1xuXHRcdFx0XHRcdGNvbnRleHQgPSBjb250ZXh0IGluc3RhbmNlb2YgalF1ZXJ5ID8gY29udGV4dFswXSA6IGNvbnRleHQ7XG5cblx0XHRcdFx0XHQvLyBPcHRpb24gdG8gcnVuIHNjcmlwdHMgaXMgdHJ1ZSBmb3IgYmFjay1jb21wYXRcblx0XHRcdFx0XHQvLyBJbnRlbnRpb25hbGx5IGxldCB0aGUgZXJyb3IgYmUgdGhyb3duIGlmIHBhcnNlSFRNTCBpcyBub3QgcHJlc2VudFxuXHRcdFx0XHRcdGpRdWVyeS5tZXJnZSggdGhpcywgalF1ZXJ5LnBhcnNlSFRNTChcblx0XHRcdFx0XHRcdG1hdGNoWzFdLFxuXHRcdFx0XHRcdFx0Y29udGV4dCAmJiBjb250ZXh0Lm5vZGVUeXBlID8gY29udGV4dC5vd25lckRvY3VtZW50IHx8IGNvbnRleHQgOiBkb2N1bWVudCxcblx0XHRcdFx0XHRcdHRydWVcblx0XHRcdFx0XHQpICk7XG5cblx0XHRcdFx0XHQvLyBIQU5ETEU6ICQoaHRtbCwgcHJvcHMpXG5cdFx0XHRcdFx0aWYgKCByc2luZ2xlVGFnLnRlc3QoIG1hdGNoWzFdICkgJiYgalF1ZXJ5LmlzUGxhaW5PYmplY3QoIGNvbnRleHQgKSApIHtcblx0XHRcdFx0XHRcdGZvciAoIG1hdGNoIGluIGNvbnRleHQgKSB7XG5cdFx0XHRcdFx0XHRcdC8vIFByb3BlcnRpZXMgb2YgY29udGV4dCBhcmUgY2FsbGVkIGFzIG1ldGhvZHMgaWYgcG9zc2libGVcblx0XHRcdFx0XHRcdFx0aWYgKCBqUXVlcnkuaXNGdW5jdGlvbiggdGhpc1sgbWF0Y2ggXSApICkge1xuXHRcdFx0XHRcdFx0XHRcdHRoaXNbIG1hdGNoIF0oIGNvbnRleHRbIG1hdGNoIF0gKTtcblxuXHRcdFx0XHRcdFx0XHQvLyAuLi5hbmQgb3RoZXJ3aXNlIHNldCBhcyBhdHRyaWJ1dGVzXG5cdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5hdHRyKCBtYXRjaCwgY29udGV4dFsgbWF0Y2ggXSApO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cblx0XHRcdFx0Ly8gSEFORExFOiAkKCNpZClcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRlbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoIG1hdGNoWzJdICk7XG5cblx0XHRcdFx0XHQvLyBTdXBwb3J0OiBCbGFja2JlcnJ5IDQuNlxuXHRcdFx0XHRcdC8vIGdFQklEIHJldHVybnMgbm9kZXMgbm8gbG9uZ2VyIGluIHRoZSBkb2N1bWVudCAoIzY5NjMpXG5cdFx0XHRcdFx0aWYgKCBlbGVtICYmIGVsZW0ucGFyZW50Tm9kZSApIHtcblx0XHRcdFx0XHRcdC8vIEluamVjdCB0aGUgZWxlbWVudCBkaXJlY3RseSBpbnRvIHRoZSBqUXVlcnkgb2JqZWN0XG5cdFx0XHRcdFx0XHR0aGlzLmxlbmd0aCA9IDE7XG5cdFx0XHRcdFx0XHR0aGlzWzBdID0gZWxlbTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHR0aGlzLmNvbnRleHQgPSBkb2N1bWVudDtcblx0XHRcdFx0XHR0aGlzLnNlbGVjdG9yID0gc2VsZWN0b3I7XG5cdFx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHRcdH1cblxuXHRcdFx0Ly8gSEFORExFOiAkKGV4cHIsICQoLi4uKSlcblx0XHRcdH0gZWxzZSBpZiAoICFjb250ZXh0IHx8IGNvbnRleHQuanF1ZXJ5ICkge1xuXHRcdFx0XHRyZXR1cm4gKCBjb250ZXh0IHx8IHJvb3RqUXVlcnkgKS5maW5kKCBzZWxlY3RvciApO1xuXG5cdFx0XHQvLyBIQU5ETEU6ICQoZXhwciwgY29udGV4dClcblx0XHRcdC8vICh3aGljaCBpcyBqdXN0IGVxdWl2YWxlbnQgdG86ICQoY29udGV4dCkuZmluZChleHByKVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuY29uc3RydWN0b3IoIGNvbnRleHQgKS5maW5kKCBzZWxlY3RvciApO1xuXHRcdFx0fVxuXG5cdFx0Ly8gSEFORExFOiAkKERPTUVsZW1lbnQpXG5cdFx0fSBlbHNlIGlmICggc2VsZWN0b3Iubm9kZVR5cGUgKSB7XG5cdFx0XHR0aGlzLmNvbnRleHQgPSB0aGlzWzBdID0gc2VsZWN0b3I7XG5cdFx0XHR0aGlzLmxlbmd0aCA9IDE7XG5cdFx0XHRyZXR1cm4gdGhpcztcblxuXHRcdC8vIEhBTkRMRTogJChmdW5jdGlvbilcblx0XHQvLyBTaG9ydGN1dCBmb3IgZG9jdW1lbnQgcmVhZHlcblx0XHR9IGVsc2UgaWYgKCBqUXVlcnkuaXNGdW5jdGlvbiggc2VsZWN0b3IgKSApIHtcblx0XHRcdHJldHVybiB0eXBlb2Ygcm9vdGpRdWVyeS5yZWFkeSAhPT0gXCJ1bmRlZmluZWRcIiA/XG5cdFx0XHRcdHJvb3RqUXVlcnkucmVhZHkoIHNlbGVjdG9yICkgOlxuXHRcdFx0XHQvLyBFeGVjdXRlIGltbWVkaWF0ZWx5IGlmIHJlYWR5IGlzIG5vdCBwcmVzZW50XG5cdFx0XHRcdHNlbGVjdG9yKCBqUXVlcnkgKTtcblx0XHR9XG5cblx0XHRpZiAoIHNlbGVjdG9yLnNlbGVjdG9yICE9PSB1bmRlZmluZWQgKSB7XG5cdFx0XHR0aGlzLnNlbGVjdG9yID0gc2VsZWN0b3Iuc2VsZWN0b3I7XG5cdFx0XHR0aGlzLmNvbnRleHQgPSBzZWxlY3Rvci5jb250ZXh0O1xuXHRcdH1cblxuXHRcdHJldHVybiBqUXVlcnkubWFrZUFycmF5KCBzZWxlY3RvciwgdGhpcyApO1xuXHR9O1xuXG4vLyBHaXZlIHRoZSBpbml0IGZ1bmN0aW9uIHRoZSBqUXVlcnkgcHJvdG90eXBlIGZvciBsYXRlciBpbnN0YW50aWF0aW9uXG5pbml0LnByb3RvdHlwZSA9IGpRdWVyeS5mbjtcblxuLy8gSW5pdGlhbGl6ZSBjZW50cmFsIHJlZmVyZW5jZVxucm9vdGpRdWVyeSA9IGpRdWVyeSggZG9jdW1lbnQgKTtcblxucmV0dXJuIGluaXQ7XG5cbn0pO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vanF1ZXJ5L3NyYy9jb3JlL2luaXQuanNcbiAqKiBtb2R1bGUgaWQgPSAyNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZGVmaW5lKGZ1bmN0aW9uKCkge1xuXHQvLyBNYXRjaCBhIHN0YW5kYWxvbmUgdGFnXG5cdHJldHVybiAoL148KFxcdyspXFxzKlxcLz8+KD86PFxcL1xcMT58KSQvKTtcbn0pO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vanF1ZXJ5L3NyYy9jb3JlL3Zhci9yc2luZ2xlVGFnLmpzXG4gKiogbW9kdWxlIGlkID0gMjVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImRlZmluZShbXG5cdFwiLi4vY29yZVwiLFxuXHRcIi4uL3Zhci9pbmRleE9mXCIsXG5cdFwiLi92YXIvcm5lZWRzQ29udGV4dFwiLFxuXHRcIi4uL3NlbGVjdG9yXCJcbl0sIGZ1bmN0aW9uKCBqUXVlcnksIGluZGV4T2YsIHJuZWVkc0NvbnRleHQgKSB7XG5cbnZhciByaXNTaW1wbGUgPSAvXi5bXjojXFxbXFwuLF0qJC87XG5cbi8vIEltcGxlbWVudCB0aGUgaWRlbnRpY2FsIGZ1bmN0aW9uYWxpdHkgZm9yIGZpbHRlciBhbmQgbm90XG5mdW5jdGlvbiB3aW5ub3coIGVsZW1lbnRzLCBxdWFsaWZpZXIsIG5vdCApIHtcblx0aWYgKCBqUXVlcnkuaXNGdW5jdGlvbiggcXVhbGlmaWVyICkgKSB7XG5cdFx0cmV0dXJuIGpRdWVyeS5ncmVwKCBlbGVtZW50cywgZnVuY3Rpb24oIGVsZW0sIGkgKSB7XG5cdFx0XHQvKiBqc2hpbnQgLVcwMTggKi9cblx0XHRcdHJldHVybiAhIXF1YWxpZmllci5jYWxsKCBlbGVtLCBpLCBlbGVtICkgIT09IG5vdDtcblx0XHR9KTtcblxuXHR9XG5cblx0aWYgKCBxdWFsaWZpZXIubm9kZVR5cGUgKSB7XG5cdFx0cmV0dXJuIGpRdWVyeS5ncmVwKCBlbGVtZW50cywgZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRyZXR1cm4gKCBlbGVtID09PSBxdWFsaWZpZXIgKSAhPT0gbm90O1xuXHRcdH0pO1xuXG5cdH1cblxuXHRpZiAoIHR5cGVvZiBxdWFsaWZpZXIgPT09IFwic3RyaW5nXCIgKSB7XG5cdFx0aWYgKCByaXNTaW1wbGUudGVzdCggcXVhbGlmaWVyICkgKSB7XG5cdFx0XHRyZXR1cm4galF1ZXJ5LmZpbHRlciggcXVhbGlmaWVyLCBlbGVtZW50cywgbm90ICk7XG5cdFx0fVxuXG5cdFx0cXVhbGlmaWVyID0galF1ZXJ5LmZpbHRlciggcXVhbGlmaWVyLCBlbGVtZW50cyApO1xuXHR9XG5cblx0cmV0dXJuIGpRdWVyeS5ncmVwKCBlbGVtZW50cywgZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0cmV0dXJuICggaW5kZXhPZi5jYWxsKCBxdWFsaWZpZXIsIGVsZW0gKSA+PSAwICkgIT09IG5vdDtcblx0fSk7XG59XG5cbmpRdWVyeS5maWx0ZXIgPSBmdW5jdGlvbiggZXhwciwgZWxlbXMsIG5vdCApIHtcblx0dmFyIGVsZW0gPSBlbGVtc1sgMCBdO1xuXG5cdGlmICggbm90ICkge1xuXHRcdGV4cHIgPSBcIjpub3QoXCIgKyBleHByICsgXCIpXCI7XG5cdH1cblxuXHRyZXR1cm4gZWxlbXMubGVuZ3RoID09PSAxICYmIGVsZW0ubm9kZVR5cGUgPT09IDEgP1xuXHRcdGpRdWVyeS5maW5kLm1hdGNoZXNTZWxlY3RvciggZWxlbSwgZXhwciApID8gWyBlbGVtIF0gOiBbXSA6XG5cdFx0alF1ZXJ5LmZpbmQubWF0Y2hlcyggZXhwciwgalF1ZXJ5LmdyZXAoIGVsZW1zLCBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdHJldHVybiBlbGVtLm5vZGVUeXBlID09PSAxO1xuXHRcdH0pKTtcbn07XG5cbmpRdWVyeS5mbi5leHRlbmQoe1xuXHRmaW5kOiBmdW5jdGlvbiggc2VsZWN0b3IgKSB7XG5cdFx0dmFyIGksXG5cdFx0XHRsZW4gPSB0aGlzLmxlbmd0aCxcblx0XHRcdHJldCA9IFtdLFxuXHRcdFx0c2VsZiA9IHRoaXM7XG5cblx0XHRpZiAoIHR5cGVvZiBzZWxlY3RvciAhPT0gXCJzdHJpbmdcIiApIHtcblx0XHRcdHJldHVybiB0aGlzLnB1c2hTdGFjayggalF1ZXJ5KCBzZWxlY3RvciApLmZpbHRlcihmdW5jdGlvbigpIHtcblx0XHRcdFx0Zm9yICggaSA9IDA7IGkgPCBsZW47IGkrKyApIHtcblx0XHRcdFx0XHRpZiAoIGpRdWVyeS5jb250YWlucyggc2VsZlsgaSBdLCB0aGlzICkgKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pICk7XG5cdFx0fVxuXG5cdFx0Zm9yICggaSA9IDA7IGkgPCBsZW47IGkrKyApIHtcblx0XHRcdGpRdWVyeS5maW5kKCBzZWxlY3Rvciwgc2VsZlsgaSBdLCByZXQgKTtcblx0XHR9XG5cblx0XHQvLyBOZWVkZWQgYmVjYXVzZSAkKCBzZWxlY3RvciwgY29udGV4dCApIGJlY29tZXMgJCggY29udGV4dCApLmZpbmQoIHNlbGVjdG9yIClcblx0XHRyZXQgPSB0aGlzLnB1c2hTdGFjayggbGVuID4gMSA/IGpRdWVyeS51bmlxdWUoIHJldCApIDogcmV0ICk7XG5cdFx0cmV0LnNlbGVjdG9yID0gdGhpcy5zZWxlY3RvciA/IHRoaXMuc2VsZWN0b3IgKyBcIiBcIiArIHNlbGVjdG9yIDogc2VsZWN0b3I7XG5cdFx0cmV0dXJuIHJldDtcblx0fSxcblx0ZmlsdGVyOiBmdW5jdGlvbiggc2VsZWN0b3IgKSB7XG5cdFx0cmV0dXJuIHRoaXMucHVzaFN0YWNrKCB3aW5ub3codGhpcywgc2VsZWN0b3IgfHwgW10sIGZhbHNlKSApO1xuXHR9LFxuXHRub3Q6IGZ1bmN0aW9uKCBzZWxlY3RvciApIHtcblx0XHRyZXR1cm4gdGhpcy5wdXNoU3RhY2soIHdpbm5vdyh0aGlzLCBzZWxlY3RvciB8fCBbXSwgdHJ1ZSkgKTtcblx0fSxcblx0aXM6IGZ1bmN0aW9uKCBzZWxlY3RvciApIHtcblx0XHRyZXR1cm4gISF3aW5ub3coXG5cdFx0XHR0aGlzLFxuXG5cdFx0XHQvLyBJZiB0aGlzIGlzIGEgcG9zaXRpb25hbC9yZWxhdGl2ZSBzZWxlY3RvciwgY2hlY2sgbWVtYmVyc2hpcCBpbiB0aGUgcmV0dXJuZWQgc2V0XG5cdFx0XHQvLyBzbyAkKFwicDpmaXJzdFwiKS5pcyhcInA6bGFzdFwiKSB3b24ndCByZXR1cm4gdHJ1ZSBmb3IgYSBkb2Mgd2l0aCB0d28gXCJwXCIuXG5cdFx0XHR0eXBlb2Ygc2VsZWN0b3IgPT09IFwic3RyaW5nXCIgJiYgcm5lZWRzQ29udGV4dC50ZXN0KCBzZWxlY3RvciApID9cblx0XHRcdFx0alF1ZXJ5KCBzZWxlY3RvciApIDpcblx0XHRcdFx0c2VsZWN0b3IgfHwgW10sXG5cdFx0XHRmYWxzZVxuXHRcdCkubGVuZ3RoO1xuXHR9XG59KTtcblxufSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9qcXVlcnkvc3JjL3RyYXZlcnNpbmcvZmluZEZpbHRlci5qc1xuICoqIG1vZHVsZSBpZCA9IDI2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJkZWZpbmUoW1xuXHRcIi4uLy4uL2NvcmVcIixcblx0XCIuLi8uLi9zZWxlY3RvclwiXG5dLCBmdW5jdGlvbiggalF1ZXJ5ICkge1xuXHRyZXR1cm4galF1ZXJ5LmV4cHIubWF0Y2gubmVlZHNDb250ZXh0O1xufSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9qcXVlcnkvc3JjL3RyYXZlcnNpbmcvdmFyL3JuZWVkc0NvbnRleHQuanNcbiAqKiBtb2R1bGUgaWQgPSAyN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZGVmaW5lKFsgXCIuL3NlbGVjdG9yLXNpenpsZVwiIF0pO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vanF1ZXJ5L3NyYy9zZWxlY3Rvci5qc1xuICoqIG1vZHVsZSBpZCA9IDI4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJkZWZpbmUoW1xuXHRcIi4uL2NvcmVcIixcblx0XCIuLi9ldmVudFwiXG5dLCBmdW5jdGlvbiggalF1ZXJ5ICkge1xuXG5qUXVlcnkuZWFjaCggKFwiYmx1ciBmb2N1cyBmb2N1c2luIGZvY3Vzb3V0IGxvYWQgcmVzaXplIHNjcm9sbCB1bmxvYWQgY2xpY2sgZGJsY2xpY2sgXCIgK1xuXHRcIm1vdXNlZG93biBtb3VzZXVwIG1vdXNlbW92ZSBtb3VzZW92ZXIgbW91c2VvdXQgbW91c2VlbnRlciBtb3VzZWxlYXZlIFwiICtcblx0XCJjaGFuZ2Ugc2VsZWN0IHN1Ym1pdCBrZXlkb3duIGtleXByZXNzIGtleXVwIGVycm9yIGNvbnRleHRtZW51XCIpLnNwbGl0KFwiIFwiKSwgZnVuY3Rpb24oIGksIG5hbWUgKSB7XG5cblx0Ly8gSGFuZGxlIGV2ZW50IGJpbmRpbmdcblx0alF1ZXJ5LmZuWyBuYW1lIF0gPSBmdW5jdGlvbiggZGF0YSwgZm4gKSB7XG5cdFx0cmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPiAwID9cblx0XHRcdHRoaXMub24oIG5hbWUsIG51bGwsIGRhdGEsIGZuICkgOlxuXHRcdFx0dGhpcy50cmlnZ2VyKCBuYW1lICk7XG5cdH07XG59KTtcblxualF1ZXJ5LmZuLmV4dGVuZCh7XG5cdGhvdmVyOiBmdW5jdGlvbiggZm5PdmVyLCBmbk91dCApIHtcblx0XHRyZXR1cm4gdGhpcy5tb3VzZWVudGVyKCBmbk92ZXIgKS5tb3VzZWxlYXZlKCBmbk91dCB8fCBmbk92ZXIgKTtcblx0fSxcblxuXHRiaW5kOiBmdW5jdGlvbiggdHlwZXMsIGRhdGEsIGZuICkge1xuXHRcdHJldHVybiB0aGlzLm9uKCB0eXBlcywgbnVsbCwgZGF0YSwgZm4gKTtcblx0fSxcblx0dW5iaW5kOiBmdW5jdGlvbiggdHlwZXMsIGZuICkge1xuXHRcdHJldHVybiB0aGlzLm9mZiggdHlwZXMsIG51bGwsIGZuICk7XG5cdH0sXG5cblx0ZGVsZWdhdGU6IGZ1bmN0aW9uKCBzZWxlY3RvciwgdHlwZXMsIGRhdGEsIGZuICkge1xuXHRcdHJldHVybiB0aGlzLm9uKCB0eXBlcywgc2VsZWN0b3IsIGRhdGEsIGZuICk7XG5cdH0sXG5cdHVuZGVsZWdhdGU6IGZ1bmN0aW9uKCBzZWxlY3RvciwgdHlwZXMsIGZuICkge1xuXHRcdC8vICggbmFtZXNwYWNlICkgb3IgKCBzZWxlY3RvciwgdHlwZXMgWywgZm5dIClcblx0XHRyZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA9PT0gMSA/IHRoaXMub2ZmKCBzZWxlY3RvciwgXCIqKlwiICkgOiB0aGlzLm9mZiggdHlwZXMsIHNlbGVjdG9yIHx8IFwiKipcIiwgZm4gKTtcblx0fVxufSk7XG5cbn0pO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vanF1ZXJ5L3NyYy9ldmVudC9hbGlhcy5qc1xuICoqIG1vZHVsZSBpZCA9IDI5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJkZWZpbmUoW1xuXHRcIi4vY29yZVwiLFxuXHRcIi4vdmFyL2NvbmNhdFwiLFxuXHRcIi4vdmFyL3B1c2hcIixcblx0XCIuL2NvcmUvYWNjZXNzXCIsXG5cdFwiLi9tYW5pcHVsYXRpb24vdmFyL3JjaGVja2FibGVUeXBlXCIsXG5cdFwiLi9tYW5pcHVsYXRpb24vc3VwcG9ydFwiLFxuXHRcIi4vZGF0YS92YXIvZGF0YV9wcml2XCIsXG5cdFwiLi9kYXRhL3Zhci9kYXRhX3VzZXJcIixcblxuXHRcIi4vY29yZS9pbml0XCIsXG5cdFwiLi9kYXRhL2FjY2VwdHNcIixcblx0XCIuL3RyYXZlcnNpbmdcIixcblx0XCIuL3NlbGVjdG9yXCIsXG5cdFwiLi9ldmVudFwiXG5dLCBmdW5jdGlvbiggalF1ZXJ5LCBjb25jYXQsIHB1c2gsIGFjY2VzcywgcmNoZWNrYWJsZVR5cGUsIHN1cHBvcnQsIGRhdGFfcHJpdiwgZGF0YV91c2VyICkge1xuXG52YXJcblx0cnhodG1sVGFnID0gLzwoPyFhcmVhfGJyfGNvbHxlbWJlZHxocnxpbWd8aW5wdXR8bGlua3xtZXRhfHBhcmFtKSgoW1xcdzpdKylbXj5dKilcXC8+L2dpLFxuXHRydGFnTmFtZSA9IC88KFtcXHc6XSspLyxcblx0cmh0bWwgPSAvPHwmIz9cXHcrOy8sXG5cdHJub0lubmVyaHRtbCA9IC88KD86c2NyaXB0fHN0eWxlfGxpbmspL2ksXG5cdC8vIGNoZWNrZWQ9XCJjaGVja2VkXCIgb3IgY2hlY2tlZFxuXHRyY2hlY2tlZCA9IC9jaGVja2VkXFxzKig/OltePV18PVxccyouY2hlY2tlZC4pL2ksXG5cdHJzY3JpcHRUeXBlID0gL14kfFxcLyg/OmphdmF8ZWNtYSlzY3JpcHQvaSxcblx0cnNjcmlwdFR5cGVNYXNrZWQgPSAvXnRydWVcXC8oLiopLyxcblx0cmNsZWFuU2NyaXB0ID0gL15cXHMqPCEoPzpcXFtDREFUQVxcW3wtLSl8KD86XFxdXFxdfC0tKT5cXHMqJC9nLFxuXG5cdC8vIFdlIGhhdmUgdG8gY2xvc2UgdGhlc2UgdGFncyB0byBzdXBwb3J0IFhIVE1MICgjMTMyMDApXG5cdHdyYXBNYXAgPSB7XG5cblx0XHQvLyBTdXBwb3J0OiBJRTlcblx0XHRvcHRpb246IFsgMSwgXCI8c2VsZWN0IG11bHRpcGxlPSdtdWx0aXBsZSc+XCIsIFwiPC9zZWxlY3Q+XCIgXSxcblxuXHRcdHRoZWFkOiBbIDEsIFwiPHRhYmxlPlwiLCBcIjwvdGFibGU+XCIgXSxcblx0XHRjb2w6IFsgMiwgXCI8dGFibGU+PGNvbGdyb3VwPlwiLCBcIjwvY29sZ3JvdXA+PC90YWJsZT5cIiBdLFxuXHRcdHRyOiBbIDIsIFwiPHRhYmxlPjx0Ym9keT5cIiwgXCI8L3Rib2R5PjwvdGFibGU+XCIgXSxcblx0XHR0ZDogWyAzLCBcIjx0YWJsZT48dGJvZHk+PHRyPlwiLCBcIjwvdHI+PC90Ym9keT48L3RhYmxlPlwiIF0sXG5cblx0XHRfZGVmYXVsdDogWyAwLCBcIlwiLCBcIlwiIF1cblx0fTtcblxuLy8gU3VwcG9ydDogSUU5XG53cmFwTWFwLm9wdGdyb3VwID0gd3JhcE1hcC5vcHRpb247XG5cbndyYXBNYXAudGJvZHkgPSB3cmFwTWFwLnRmb290ID0gd3JhcE1hcC5jb2xncm91cCA9IHdyYXBNYXAuY2FwdGlvbiA9IHdyYXBNYXAudGhlYWQ7XG53cmFwTWFwLnRoID0gd3JhcE1hcC50ZDtcblxuLy8gU3VwcG9ydDogMS54IGNvbXBhdGliaWxpdHlcbi8vIE1hbmlwdWxhdGluZyB0YWJsZXMgcmVxdWlyZXMgYSB0Ym9keVxuZnVuY3Rpb24gbWFuaXB1bGF0aW9uVGFyZ2V0KCBlbGVtLCBjb250ZW50ICkge1xuXHRyZXR1cm4galF1ZXJ5Lm5vZGVOYW1lKCBlbGVtLCBcInRhYmxlXCIgKSAmJlxuXHRcdGpRdWVyeS5ub2RlTmFtZSggY29udGVudC5ub2RlVHlwZSAhPT0gMTEgPyBjb250ZW50IDogY29udGVudC5maXJzdENoaWxkLCBcInRyXCIgKSA/XG5cblx0XHRlbGVtLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwidGJvZHlcIilbMF0gfHxcblx0XHRcdGVsZW0uYXBwZW5kQ2hpbGQoIGVsZW0ub3duZXJEb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGJvZHlcIikgKSA6XG5cdFx0ZWxlbTtcbn1cblxuLy8gUmVwbGFjZS9yZXN0b3JlIHRoZSB0eXBlIGF0dHJpYnV0ZSBvZiBzY3JpcHQgZWxlbWVudHMgZm9yIHNhZmUgRE9NIG1hbmlwdWxhdGlvblxuZnVuY3Rpb24gZGlzYWJsZVNjcmlwdCggZWxlbSApIHtcblx0ZWxlbS50eXBlID0gKGVsZW0uZ2V0QXR0cmlidXRlKFwidHlwZVwiKSAhPT0gbnVsbCkgKyBcIi9cIiArIGVsZW0udHlwZTtcblx0cmV0dXJuIGVsZW07XG59XG5mdW5jdGlvbiByZXN0b3JlU2NyaXB0KCBlbGVtICkge1xuXHR2YXIgbWF0Y2ggPSByc2NyaXB0VHlwZU1hc2tlZC5leGVjKCBlbGVtLnR5cGUgKTtcblxuXHRpZiAoIG1hdGNoICkge1xuXHRcdGVsZW0udHlwZSA9IG1hdGNoWyAxIF07XG5cdH0gZWxzZSB7XG5cdFx0ZWxlbS5yZW1vdmVBdHRyaWJ1dGUoXCJ0eXBlXCIpO1xuXHR9XG5cblx0cmV0dXJuIGVsZW07XG59XG5cbi8vIE1hcmsgc2NyaXB0cyBhcyBoYXZpbmcgYWxyZWFkeSBiZWVuIGV2YWx1YXRlZFxuZnVuY3Rpb24gc2V0R2xvYmFsRXZhbCggZWxlbXMsIHJlZkVsZW1lbnRzICkge1xuXHR2YXIgaSA9IDAsXG5cdFx0bCA9IGVsZW1zLmxlbmd0aDtcblxuXHRmb3IgKCA7IGkgPCBsOyBpKysgKSB7XG5cdFx0ZGF0YV9wcml2LnNldChcblx0XHRcdGVsZW1zWyBpIF0sIFwiZ2xvYmFsRXZhbFwiLCAhcmVmRWxlbWVudHMgfHwgZGF0YV9wcml2LmdldCggcmVmRWxlbWVudHNbIGkgXSwgXCJnbG9iYWxFdmFsXCIgKVxuXHRcdCk7XG5cdH1cbn1cblxuZnVuY3Rpb24gY2xvbmVDb3B5RXZlbnQoIHNyYywgZGVzdCApIHtcblx0dmFyIGksIGwsIHR5cGUsIHBkYXRhT2xkLCBwZGF0YUN1ciwgdWRhdGFPbGQsIHVkYXRhQ3VyLCBldmVudHM7XG5cblx0aWYgKCBkZXN0Lm5vZGVUeXBlICE9PSAxICkge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdC8vIDEuIENvcHkgcHJpdmF0ZSBkYXRhOiBldmVudHMsIGhhbmRsZXJzLCBldGMuXG5cdGlmICggZGF0YV9wcml2Lmhhc0RhdGEoIHNyYyApICkge1xuXHRcdHBkYXRhT2xkID0gZGF0YV9wcml2LmFjY2Vzcyggc3JjICk7XG5cdFx0cGRhdGFDdXIgPSBkYXRhX3ByaXYuc2V0KCBkZXN0LCBwZGF0YU9sZCApO1xuXHRcdGV2ZW50cyA9IHBkYXRhT2xkLmV2ZW50cztcblxuXHRcdGlmICggZXZlbnRzICkge1xuXHRcdFx0ZGVsZXRlIHBkYXRhQ3VyLmhhbmRsZTtcblx0XHRcdHBkYXRhQ3VyLmV2ZW50cyA9IHt9O1xuXG5cdFx0XHRmb3IgKCB0eXBlIGluIGV2ZW50cyApIHtcblx0XHRcdFx0Zm9yICggaSA9IDAsIGwgPSBldmVudHNbIHR5cGUgXS5sZW5ndGg7IGkgPCBsOyBpKysgKSB7XG5cdFx0XHRcdFx0alF1ZXJ5LmV2ZW50LmFkZCggZGVzdCwgdHlwZSwgZXZlbnRzWyB0eXBlIF1bIGkgXSApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Ly8gMi4gQ29weSB1c2VyIGRhdGFcblx0aWYgKCBkYXRhX3VzZXIuaGFzRGF0YSggc3JjICkgKSB7XG5cdFx0dWRhdGFPbGQgPSBkYXRhX3VzZXIuYWNjZXNzKCBzcmMgKTtcblx0XHR1ZGF0YUN1ciA9IGpRdWVyeS5leHRlbmQoIHt9LCB1ZGF0YU9sZCApO1xuXG5cdFx0ZGF0YV91c2VyLnNldCggZGVzdCwgdWRhdGFDdXIgKTtcblx0fVxufVxuXG5mdW5jdGlvbiBnZXRBbGwoIGNvbnRleHQsIHRhZyApIHtcblx0dmFyIHJldCA9IGNvbnRleHQuZ2V0RWxlbWVudHNCeVRhZ05hbWUgPyBjb250ZXh0LmdldEVsZW1lbnRzQnlUYWdOYW1lKCB0YWcgfHwgXCIqXCIgKSA6XG5cdFx0XHRjb250ZXh0LnF1ZXJ5U2VsZWN0b3JBbGwgPyBjb250ZXh0LnF1ZXJ5U2VsZWN0b3JBbGwoIHRhZyB8fCBcIipcIiApIDpcblx0XHRcdFtdO1xuXG5cdHJldHVybiB0YWcgPT09IHVuZGVmaW5lZCB8fCB0YWcgJiYgalF1ZXJ5Lm5vZGVOYW1lKCBjb250ZXh0LCB0YWcgKSA/XG5cdFx0alF1ZXJ5Lm1lcmdlKCBbIGNvbnRleHQgXSwgcmV0ICkgOlxuXHRcdHJldDtcbn1cblxuLy8gRml4IElFIGJ1Z3MsIHNlZSBzdXBwb3J0IHRlc3RzXG5mdW5jdGlvbiBmaXhJbnB1dCggc3JjLCBkZXN0ICkge1xuXHR2YXIgbm9kZU5hbWUgPSBkZXN0Lm5vZGVOYW1lLnRvTG93ZXJDYXNlKCk7XG5cblx0Ly8gRmFpbHMgdG8gcGVyc2lzdCB0aGUgY2hlY2tlZCBzdGF0ZSBvZiBhIGNsb25lZCBjaGVja2JveCBvciByYWRpbyBidXR0b24uXG5cdGlmICggbm9kZU5hbWUgPT09IFwiaW5wdXRcIiAmJiByY2hlY2thYmxlVHlwZS50ZXN0KCBzcmMudHlwZSApICkge1xuXHRcdGRlc3QuY2hlY2tlZCA9IHNyYy5jaGVja2VkO1xuXG5cdC8vIEZhaWxzIHRvIHJldHVybiB0aGUgc2VsZWN0ZWQgb3B0aW9uIHRvIHRoZSBkZWZhdWx0IHNlbGVjdGVkIHN0YXRlIHdoZW4gY2xvbmluZyBvcHRpb25zXG5cdH0gZWxzZSBpZiAoIG5vZGVOYW1lID09PSBcImlucHV0XCIgfHwgbm9kZU5hbWUgPT09IFwidGV4dGFyZWFcIiApIHtcblx0XHRkZXN0LmRlZmF1bHRWYWx1ZSA9IHNyYy5kZWZhdWx0VmFsdWU7XG5cdH1cbn1cblxualF1ZXJ5LmV4dGVuZCh7XG5cdGNsb25lOiBmdW5jdGlvbiggZWxlbSwgZGF0YUFuZEV2ZW50cywgZGVlcERhdGFBbmRFdmVudHMgKSB7XG5cdFx0dmFyIGksIGwsIHNyY0VsZW1lbnRzLCBkZXN0RWxlbWVudHMsXG5cdFx0XHRjbG9uZSA9IGVsZW0uY2xvbmVOb2RlKCB0cnVlICksXG5cdFx0XHRpblBhZ2UgPSBqUXVlcnkuY29udGFpbnMoIGVsZW0ub3duZXJEb2N1bWVudCwgZWxlbSApO1xuXG5cdFx0Ly8gRml4IElFIGNsb25pbmcgaXNzdWVzXG5cdFx0aWYgKCAhc3VwcG9ydC5ub0Nsb25lQ2hlY2tlZCAmJiAoIGVsZW0ubm9kZVR5cGUgPT09IDEgfHwgZWxlbS5ub2RlVHlwZSA9PT0gMTEgKSAmJlxuXHRcdFx0XHQhalF1ZXJ5LmlzWE1MRG9jKCBlbGVtICkgKSB7XG5cblx0XHRcdC8vIFdlIGVzY2hldyBTaXp6bGUgaGVyZSBmb3IgcGVyZm9ybWFuY2UgcmVhc29uczogaHR0cDovL2pzcGVyZi5jb20vZ2V0YWxsLXZzLXNpenpsZS8yXG5cdFx0XHRkZXN0RWxlbWVudHMgPSBnZXRBbGwoIGNsb25lICk7XG5cdFx0XHRzcmNFbGVtZW50cyA9IGdldEFsbCggZWxlbSApO1xuXG5cdFx0XHRmb3IgKCBpID0gMCwgbCA9IHNyY0VsZW1lbnRzLmxlbmd0aDsgaSA8IGw7IGkrKyApIHtcblx0XHRcdFx0Zml4SW5wdXQoIHNyY0VsZW1lbnRzWyBpIF0sIGRlc3RFbGVtZW50c1sgaSBdICk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gQ29weSB0aGUgZXZlbnRzIGZyb20gdGhlIG9yaWdpbmFsIHRvIHRoZSBjbG9uZVxuXHRcdGlmICggZGF0YUFuZEV2ZW50cyApIHtcblx0XHRcdGlmICggZGVlcERhdGFBbmRFdmVudHMgKSB7XG5cdFx0XHRcdHNyY0VsZW1lbnRzID0gc3JjRWxlbWVudHMgfHwgZ2V0QWxsKCBlbGVtICk7XG5cdFx0XHRcdGRlc3RFbGVtZW50cyA9IGRlc3RFbGVtZW50cyB8fCBnZXRBbGwoIGNsb25lICk7XG5cblx0XHRcdFx0Zm9yICggaSA9IDAsIGwgPSBzcmNFbGVtZW50cy5sZW5ndGg7IGkgPCBsOyBpKysgKSB7XG5cdFx0XHRcdFx0Y2xvbmVDb3B5RXZlbnQoIHNyY0VsZW1lbnRzWyBpIF0sIGRlc3RFbGVtZW50c1sgaSBdICk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGNsb25lQ29weUV2ZW50KCBlbGVtLCBjbG9uZSApO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIFByZXNlcnZlIHNjcmlwdCBldmFsdWF0aW9uIGhpc3Rvcnlcblx0XHRkZXN0RWxlbWVudHMgPSBnZXRBbGwoIGNsb25lLCBcInNjcmlwdFwiICk7XG5cdFx0aWYgKCBkZXN0RWxlbWVudHMubGVuZ3RoID4gMCApIHtcblx0XHRcdHNldEdsb2JhbEV2YWwoIGRlc3RFbGVtZW50cywgIWluUGFnZSAmJiBnZXRBbGwoIGVsZW0sIFwic2NyaXB0XCIgKSApO1xuXHRcdH1cblxuXHRcdC8vIFJldHVybiB0aGUgY2xvbmVkIHNldFxuXHRcdHJldHVybiBjbG9uZTtcblx0fSxcblxuXHRidWlsZEZyYWdtZW50OiBmdW5jdGlvbiggZWxlbXMsIGNvbnRleHQsIHNjcmlwdHMsIHNlbGVjdGlvbiApIHtcblx0XHR2YXIgZWxlbSwgdG1wLCB0YWcsIHdyYXAsIGNvbnRhaW5zLCBqLFxuXHRcdFx0ZnJhZ21lbnQgPSBjb250ZXh0LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKSxcblx0XHRcdG5vZGVzID0gW10sXG5cdFx0XHRpID0gMCxcblx0XHRcdGwgPSBlbGVtcy5sZW5ndGg7XG5cblx0XHRmb3IgKCA7IGkgPCBsOyBpKysgKSB7XG5cdFx0XHRlbGVtID0gZWxlbXNbIGkgXTtcblxuXHRcdFx0aWYgKCBlbGVtIHx8IGVsZW0gPT09IDAgKSB7XG5cblx0XHRcdFx0Ly8gQWRkIG5vZGVzIGRpcmVjdGx5XG5cdFx0XHRcdGlmICggalF1ZXJ5LnR5cGUoIGVsZW0gKSA9PT0gXCJvYmplY3RcIiApIHtcblx0XHRcdFx0XHQvLyBTdXBwb3J0OiBRdFdlYktpdCwgUGhhbnRvbUpTXG5cdFx0XHRcdFx0Ly8gcHVzaC5hcHBseShfLCBhcnJheWxpa2UpIHRocm93cyBvbiBhbmNpZW50IFdlYktpdFxuXHRcdFx0XHRcdGpRdWVyeS5tZXJnZSggbm9kZXMsIGVsZW0ubm9kZVR5cGUgPyBbIGVsZW0gXSA6IGVsZW0gKTtcblxuXHRcdFx0XHQvLyBDb252ZXJ0IG5vbi1odG1sIGludG8gYSB0ZXh0IG5vZGVcblx0XHRcdFx0fSBlbHNlIGlmICggIXJodG1sLnRlc3QoIGVsZW0gKSApIHtcblx0XHRcdFx0XHRub2Rlcy5wdXNoKCBjb250ZXh0LmNyZWF0ZVRleHROb2RlKCBlbGVtICkgKTtcblxuXHRcdFx0XHQvLyBDb252ZXJ0IGh0bWwgaW50byBET00gbm9kZXNcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR0bXAgPSB0bXAgfHwgZnJhZ21lbnQuYXBwZW5kQ2hpbGQoIGNvbnRleHQuY3JlYXRlRWxlbWVudChcImRpdlwiKSApO1xuXG5cdFx0XHRcdFx0Ly8gRGVzZXJpYWxpemUgYSBzdGFuZGFyZCByZXByZXNlbnRhdGlvblxuXHRcdFx0XHRcdHRhZyA9ICggcnRhZ05hbWUuZXhlYyggZWxlbSApIHx8IFsgXCJcIiwgXCJcIiBdIClbIDEgXS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0XHRcdHdyYXAgPSB3cmFwTWFwWyB0YWcgXSB8fCB3cmFwTWFwLl9kZWZhdWx0O1xuXHRcdFx0XHRcdHRtcC5pbm5lckhUTUwgPSB3cmFwWyAxIF0gKyBlbGVtLnJlcGxhY2UoIHJ4aHRtbFRhZywgXCI8JDE+PC8kMj5cIiApICsgd3JhcFsgMiBdO1xuXG5cdFx0XHRcdFx0Ly8gRGVzY2VuZCB0aHJvdWdoIHdyYXBwZXJzIHRvIHRoZSByaWdodCBjb250ZW50XG5cdFx0XHRcdFx0aiA9IHdyYXBbIDAgXTtcblx0XHRcdFx0XHR3aGlsZSAoIGotLSApIHtcblx0XHRcdFx0XHRcdHRtcCA9IHRtcC5sYXN0Q2hpbGQ7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Ly8gU3VwcG9ydDogUXRXZWJLaXQsIFBoYW50b21KU1xuXHRcdFx0XHRcdC8vIHB1c2guYXBwbHkoXywgYXJyYXlsaWtlKSB0aHJvd3Mgb24gYW5jaWVudCBXZWJLaXRcblx0XHRcdFx0XHRqUXVlcnkubWVyZ2UoIG5vZGVzLCB0bXAuY2hpbGROb2RlcyApO1xuXG5cdFx0XHRcdFx0Ly8gUmVtZW1iZXIgdGhlIHRvcC1sZXZlbCBjb250YWluZXJcblx0XHRcdFx0XHR0bXAgPSBmcmFnbWVudC5maXJzdENoaWxkO1xuXG5cdFx0XHRcdFx0Ly8gRW5zdXJlIHRoZSBjcmVhdGVkIG5vZGVzIGFyZSBvcnBoYW5lZCAoIzEyMzkyKVxuXHRcdFx0XHRcdHRtcC50ZXh0Q29udGVudCA9IFwiXCI7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBSZW1vdmUgd3JhcHBlciBmcm9tIGZyYWdtZW50XG5cdFx0ZnJhZ21lbnQudGV4dENvbnRlbnQgPSBcIlwiO1xuXG5cdFx0aSA9IDA7XG5cdFx0d2hpbGUgKCAoZWxlbSA9IG5vZGVzWyBpKysgXSkgKSB7XG5cblx0XHRcdC8vICM0MDg3IC0gSWYgb3JpZ2luIGFuZCBkZXN0aW5hdGlvbiBlbGVtZW50cyBhcmUgdGhlIHNhbWUsIGFuZCB0aGlzIGlzXG5cdFx0XHQvLyB0aGF0IGVsZW1lbnQsIGRvIG5vdCBkbyBhbnl0aGluZ1xuXHRcdFx0aWYgKCBzZWxlY3Rpb24gJiYgalF1ZXJ5LmluQXJyYXkoIGVsZW0sIHNlbGVjdGlvbiApICE9PSAtMSApIHtcblx0XHRcdFx0Y29udGludWU7XG5cdFx0XHR9XG5cblx0XHRcdGNvbnRhaW5zID0galF1ZXJ5LmNvbnRhaW5zKCBlbGVtLm93bmVyRG9jdW1lbnQsIGVsZW0gKTtcblxuXHRcdFx0Ly8gQXBwZW5kIHRvIGZyYWdtZW50XG5cdFx0XHR0bXAgPSBnZXRBbGwoIGZyYWdtZW50LmFwcGVuZENoaWxkKCBlbGVtICksIFwic2NyaXB0XCIgKTtcblxuXHRcdFx0Ly8gUHJlc2VydmUgc2NyaXB0IGV2YWx1YXRpb24gaGlzdG9yeVxuXHRcdFx0aWYgKCBjb250YWlucyApIHtcblx0XHRcdFx0c2V0R2xvYmFsRXZhbCggdG1wICk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIENhcHR1cmUgZXhlY3V0YWJsZXNcblx0XHRcdGlmICggc2NyaXB0cyApIHtcblx0XHRcdFx0aiA9IDA7XG5cdFx0XHRcdHdoaWxlICggKGVsZW0gPSB0bXBbIGorKyBdKSApIHtcblx0XHRcdFx0XHRpZiAoIHJzY3JpcHRUeXBlLnRlc3QoIGVsZW0udHlwZSB8fCBcIlwiICkgKSB7XG5cdFx0XHRcdFx0XHRzY3JpcHRzLnB1c2goIGVsZW0gKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gZnJhZ21lbnQ7XG5cdH0sXG5cblx0Y2xlYW5EYXRhOiBmdW5jdGlvbiggZWxlbXMgKSB7XG5cdFx0dmFyIGRhdGEsIGVsZW0sIHR5cGUsIGtleSxcblx0XHRcdHNwZWNpYWwgPSBqUXVlcnkuZXZlbnQuc3BlY2lhbCxcblx0XHRcdGkgPSAwO1xuXG5cdFx0Zm9yICggOyAoZWxlbSA9IGVsZW1zWyBpIF0pICE9PSB1bmRlZmluZWQ7IGkrKyApIHtcblx0XHRcdGlmICggalF1ZXJ5LmFjY2VwdERhdGEoIGVsZW0gKSApIHtcblx0XHRcdFx0a2V5ID0gZWxlbVsgZGF0YV9wcml2LmV4cGFuZG8gXTtcblxuXHRcdFx0XHRpZiAoIGtleSAmJiAoZGF0YSA9IGRhdGFfcHJpdi5jYWNoZVsga2V5IF0pICkge1xuXHRcdFx0XHRcdGlmICggZGF0YS5ldmVudHMgKSB7XG5cdFx0XHRcdFx0XHRmb3IgKCB0eXBlIGluIGRhdGEuZXZlbnRzICkge1xuXHRcdFx0XHRcdFx0XHRpZiAoIHNwZWNpYWxbIHR5cGUgXSApIHtcblx0XHRcdFx0XHRcdFx0XHRqUXVlcnkuZXZlbnQucmVtb3ZlKCBlbGVtLCB0eXBlICk7XG5cblx0XHRcdFx0XHRcdFx0Ly8gVGhpcyBpcyBhIHNob3J0Y3V0IHRvIGF2b2lkIGpRdWVyeS5ldmVudC5yZW1vdmUncyBvdmVyaGVhZFxuXHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdGpRdWVyeS5yZW1vdmVFdmVudCggZWxlbSwgdHlwZSwgZGF0YS5oYW5kbGUgKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAoIGRhdGFfcHJpdi5jYWNoZVsga2V5IF0gKSB7XG5cdFx0XHRcdFx0XHQvLyBEaXNjYXJkIGFueSByZW1haW5pbmcgYHByaXZhdGVgIGRhdGFcblx0XHRcdFx0XHRcdGRlbGV0ZSBkYXRhX3ByaXYuY2FjaGVbIGtleSBdO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0Ly8gRGlzY2FyZCBhbnkgcmVtYWluaW5nIGB1c2VyYCBkYXRhXG5cdFx0XHRkZWxldGUgZGF0YV91c2VyLmNhY2hlWyBlbGVtWyBkYXRhX3VzZXIuZXhwYW5kbyBdIF07XG5cdFx0fVxuXHR9XG59KTtcblxualF1ZXJ5LmZuLmV4dGVuZCh7XG5cdHRleHQ6IGZ1bmN0aW9uKCB2YWx1ZSApIHtcblx0XHRyZXR1cm4gYWNjZXNzKCB0aGlzLCBmdW5jdGlvbiggdmFsdWUgKSB7XG5cdFx0XHRyZXR1cm4gdmFsdWUgPT09IHVuZGVmaW5lZCA/XG5cdFx0XHRcdGpRdWVyeS50ZXh0KCB0aGlzICkgOlxuXHRcdFx0XHR0aGlzLmVtcHR5KCkuZWFjaChmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRpZiAoIHRoaXMubm9kZVR5cGUgPT09IDEgfHwgdGhpcy5ub2RlVHlwZSA9PT0gMTEgfHwgdGhpcy5ub2RlVHlwZSA9PT0gOSApIHtcblx0XHRcdFx0XHRcdHRoaXMudGV4dENvbnRlbnQgPSB2YWx1ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdH0sIG51bGwsIHZhbHVlLCBhcmd1bWVudHMubGVuZ3RoICk7XG5cdH0sXG5cblx0YXBwZW5kOiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gdGhpcy5kb21NYW5pcCggYXJndW1lbnRzLCBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdGlmICggdGhpcy5ub2RlVHlwZSA9PT0gMSB8fCB0aGlzLm5vZGVUeXBlID09PSAxMSB8fCB0aGlzLm5vZGVUeXBlID09PSA5ICkge1xuXHRcdFx0XHR2YXIgdGFyZ2V0ID0gbWFuaXB1bGF0aW9uVGFyZ2V0KCB0aGlzLCBlbGVtICk7XG5cdFx0XHRcdHRhcmdldC5hcHBlbmRDaGlsZCggZWxlbSApO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9LFxuXG5cdHByZXBlbmQ6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiB0aGlzLmRvbU1hbmlwKCBhcmd1bWVudHMsIGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0aWYgKCB0aGlzLm5vZGVUeXBlID09PSAxIHx8IHRoaXMubm9kZVR5cGUgPT09IDExIHx8IHRoaXMubm9kZVR5cGUgPT09IDkgKSB7XG5cdFx0XHRcdHZhciB0YXJnZXQgPSBtYW5pcHVsYXRpb25UYXJnZXQoIHRoaXMsIGVsZW0gKTtcblx0XHRcdFx0dGFyZ2V0Lmluc2VydEJlZm9yZSggZWxlbSwgdGFyZ2V0LmZpcnN0Q2hpbGQgKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fSxcblxuXHRiZWZvcmU6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiB0aGlzLmRvbU1hbmlwKCBhcmd1bWVudHMsIGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0aWYgKCB0aGlzLnBhcmVudE5vZGUgKSB7XG5cdFx0XHRcdHRoaXMucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoIGVsZW0sIHRoaXMgKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fSxcblxuXHRhZnRlcjogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIHRoaXMuZG9tTWFuaXAoIGFyZ3VtZW50cywgZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRpZiAoIHRoaXMucGFyZW50Tm9kZSApIHtcblx0XHRcdFx0dGhpcy5wYXJlbnROb2RlLmluc2VydEJlZm9yZSggZWxlbSwgdGhpcy5uZXh0U2libGluZyApO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9LFxuXG5cdHJlbW92ZTogZnVuY3Rpb24oIHNlbGVjdG9yLCBrZWVwRGF0YSAvKiBJbnRlcm5hbCBVc2UgT25seSAqLyApIHtcblx0XHR2YXIgZWxlbSxcblx0XHRcdGVsZW1zID0gc2VsZWN0b3IgPyBqUXVlcnkuZmlsdGVyKCBzZWxlY3RvciwgdGhpcyApIDogdGhpcyxcblx0XHRcdGkgPSAwO1xuXG5cdFx0Zm9yICggOyAoZWxlbSA9IGVsZW1zW2ldKSAhPSBudWxsOyBpKysgKSB7XG5cdFx0XHRpZiAoICFrZWVwRGF0YSAmJiBlbGVtLm5vZGVUeXBlID09PSAxICkge1xuXHRcdFx0XHRqUXVlcnkuY2xlYW5EYXRhKCBnZXRBbGwoIGVsZW0gKSApO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIGVsZW0ucGFyZW50Tm9kZSApIHtcblx0XHRcdFx0aWYgKCBrZWVwRGF0YSAmJiBqUXVlcnkuY29udGFpbnMoIGVsZW0ub3duZXJEb2N1bWVudCwgZWxlbSApICkge1xuXHRcdFx0XHRcdHNldEdsb2JhbEV2YWwoIGdldEFsbCggZWxlbSwgXCJzY3JpcHRcIiApICk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxlbS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKCBlbGVtICk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXM7XG5cdH0sXG5cblx0ZW1wdHk6IGZ1bmN0aW9uKCkge1xuXHRcdHZhciBlbGVtLFxuXHRcdFx0aSA9IDA7XG5cblx0XHRmb3IgKCA7IChlbGVtID0gdGhpc1tpXSkgIT0gbnVsbDsgaSsrICkge1xuXHRcdFx0aWYgKCBlbGVtLm5vZGVUeXBlID09PSAxICkge1xuXG5cdFx0XHRcdC8vIFByZXZlbnQgbWVtb3J5IGxlYWtzXG5cdFx0XHRcdGpRdWVyeS5jbGVhbkRhdGEoIGdldEFsbCggZWxlbSwgZmFsc2UgKSApO1xuXG5cdFx0XHRcdC8vIFJlbW92ZSBhbnkgcmVtYWluaW5nIG5vZGVzXG5cdFx0XHRcdGVsZW0udGV4dENvbnRlbnQgPSBcIlwiO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzO1xuXHR9LFxuXG5cdGNsb25lOiBmdW5jdGlvbiggZGF0YUFuZEV2ZW50cywgZGVlcERhdGFBbmRFdmVudHMgKSB7XG5cdFx0ZGF0YUFuZEV2ZW50cyA9IGRhdGFBbmRFdmVudHMgPT0gbnVsbCA/IGZhbHNlIDogZGF0YUFuZEV2ZW50cztcblx0XHRkZWVwRGF0YUFuZEV2ZW50cyA9IGRlZXBEYXRhQW5kRXZlbnRzID09IG51bGwgPyBkYXRhQW5kRXZlbnRzIDogZGVlcERhdGFBbmRFdmVudHM7XG5cblx0XHRyZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4galF1ZXJ5LmNsb25lKCB0aGlzLCBkYXRhQW5kRXZlbnRzLCBkZWVwRGF0YUFuZEV2ZW50cyApO1xuXHRcdH0pO1xuXHR9LFxuXG5cdGh0bWw6IGZ1bmN0aW9uKCB2YWx1ZSApIHtcblx0XHRyZXR1cm4gYWNjZXNzKCB0aGlzLCBmdW5jdGlvbiggdmFsdWUgKSB7XG5cdFx0XHR2YXIgZWxlbSA9IHRoaXNbIDAgXSB8fCB7fSxcblx0XHRcdFx0aSA9IDAsXG5cdFx0XHRcdGwgPSB0aGlzLmxlbmd0aDtcblxuXHRcdFx0aWYgKCB2YWx1ZSA9PT0gdW5kZWZpbmVkICYmIGVsZW0ubm9kZVR5cGUgPT09IDEgKSB7XG5cdFx0XHRcdHJldHVybiBlbGVtLmlubmVySFRNTDtcblx0XHRcdH1cblxuXHRcdFx0Ly8gU2VlIGlmIHdlIGNhbiB0YWtlIGEgc2hvcnRjdXQgYW5kIGp1c3QgdXNlIGlubmVySFRNTFxuXHRcdFx0aWYgKCB0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIgJiYgIXJub0lubmVyaHRtbC50ZXN0KCB2YWx1ZSApICYmXG5cdFx0XHRcdCF3cmFwTWFwWyAoIHJ0YWdOYW1lLmV4ZWMoIHZhbHVlICkgfHwgWyBcIlwiLCBcIlwiIF0gKVsgMSBdLnRvTG93ZXJDYXNlKCkgXSApIHtcblxuXHRcdFx0XHR2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoIHJ4aHRtbFRhZywgXCI8JDE+PC8kMj5cIiApO1xuXG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0Zm9yICggOyBpIDwgbDsgaSsrICkge1xuXHRcdFx0XHRcdFx0ZWxlbSA9IHRoaXNbIGkgXSB8fCB7fTtcblxuXHRcdFx0XHRcdFx0Ly8gUmVtb3ZlIGVsZW1lbnQgbm9kZXMgYW5kIHByZXZlbnQgbWVtb3J5IGxlYWtzXG5cdFx0XHRcdFx0XHRpZiAoIGVsZW0ubm9kZVR5cGUgPT09IDEgKSB7XG5cdFx0XHRcdFx0XHRcdGpRdWVyeS5jbGVhbkRhdGEoIGdldEFsbCggZWxlbSwgZmFsc2UgKSApO1xuXHRcdFx0XHRcdFx0XHRlbGVtLmlubmVySFRNTCA9IHZhbHVlO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGVsZW0gPSAwO1xuXG5cdFx0XHRcdC8vIElmIHVzaW5nIGlubmVySFRNTCB0aHJvd3MgYW4gZXhjZXB0aW9uLCB1c2UgdGhlIGZhbGxiYWNrIG1ldGhvZFxuXHRcdFx0XHR9IGNhdGNoKCBlICkge31cblx0XHRcdH1cblxuXHRcdFx0aWYgKCBlbGVtICkge1xuXHRcdFx0XHR0aGlzLmVtcHR5KCkuYXBwZW5kKCB2YWx1ZSApO1xuXHRcdFx0fVxuXHRcdH0sIG51bGwsIHZhbHVlLCBhcmd1bWVudHMubGVuZ3RoICk7XG5cdH0sXG5cblx0cmVwbGFjZVdpdGg6IGZ1bmN0aW9uKCkge1xuXHRcdHZhciBhcmcgPSBhcmd1bWVudHNbIDAgXTtcblxuXHRcdC8vIE1ha2UgdGhlIGNoYW5nZXMsIHJlcGxhY2luZyBlYWNoIGNvbnRleHQgZWxlbWVudCB3aXRoIHRoZSBuZXcgY29udGVudFxuXHRcdHRoaXMuZG9tTWFuaXAoIGFyZ3VtZW50cywgZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRhcmcgPSB0aGlzLnBhcmVudE5vZGU7XG5cblx0XHRcdGpRdWVyeS5jbGVhbkRhdGEoIGdldEFsbCggdGhpcyApICk7XG5cblx0XHRcdGlmICggYXJnICkge1xuXHRcdFx0XHRhcmcucmVwbGFjZUNoaWxkKCBlbGVtLCB0aGlzICk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHQvLyBGb3JjZSByZW1vdmFsIGlmIHRoZXJlIHdhcyBubyBuZXcgY29udGVudCAoZS5nLiwgZnJvbSBlbXB0eSBhcmd1bWVudHMpXG5cdFx0cmV0dXJuIGFyZyAmJiAoYXJnLmxlbmd0aCB8fCBhcmcubm9kZVR5cGUpID8gdGhpcyA6IHRoaXMucmVtb3ZlKCk7XG5cdH0sXG5cblx0ZGV0YWNoOiBmdW5jdGlvbiggc2VsZWN0b3IgKSB7XG5cdFx0cmV0dXJuIHRoaXMucmVtb3ZlKCBzZWxlY3RvciwgdHJ1ZSApO1xuXHR9LFxuXG5cdGRvbU1hbmlwOiBmdW5jdGlvbiggYXJncywgY2FsbGJhY2sgKSB7XG5cblx0XHQvLyBGbGF0dGVuIGFueSBuZXN0ZWQgYXJyYXlzXG5cdFx0YXJncyA9IGNvbmNhdC5hcHBseSggW10sIGFyZ3MgKTtcblxuXHRcdHZhciBmcmFnbWVudCwgZmlyc3QsIHNjcmlwdHMsIGhhc1NjcmlwdHMsIG5vZGUsIGRvYyxcblx0XHRcdGkgPSAwLFxuXHRcdFx0bCA9IHRoaXMubGVuZ3RoLFxuXHRcdFx0c2V0ID0gdGhpcyxcblx0XHRcdGlOb0Nsb25lID0gbCAtIDEsXG5cdFx0XHR2YWx1ZSA9IGFyZ3NbIDAgXSxcblx0XHRcdGlzRnVuY3Rpb24gPSBqUXVlcnkuaXNGdW5jdGlvbiggdmFsdWUgKTtcblxuXHRcdC8vIFdlIGNhbid0IGNsb25lTm9kZSBmcmFnbWVudHMgdGhhdCBjb250YWluIGNoZWNrZWQsIGluIFdlYktpdFxuXHRcdGlmICggaXNGdW5jdGlvbiB8fFxuXHRcdFx0XHQoIGwgPiAxICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIiAmJlxuXHRcdFx0XHRcdCFzdXBwb3J0LmNoZWNrQ2xvbmUgJiYgcmNoZWNrZWQudGVzdCggdmFsdWUgKSApICkge1xuXHRcdFx0cmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiggaW5kZXggKSB7XG5cdFx0XHRcdHZhciBzZWxmID0gc2V0LmVxKCBpbmRleCApO1xuXHRcdFx0XHRpZiAoIGlzRnVuY3Rpb24gKSB7XG5cdFx0XHRcdFx0YXJnc1sgMCBdID0gdmFsdWUuY2FsbCggdGhpcywgaW5kZXgsIHNlbGYuaHRtbCgpICk7XG5cdFx0XHRcdH1cblx0XHRcdFx0c2VsZi5kb21NYW5pcCggYXJncywgY2FsbGJhY2sgKTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdGlmICggbCApIHtcblx0XHRcdGZyYWdtZW50ID0galF1ZXJ5LmJ1aWxkRnJhZ21lbnQoIGFyZ3MsIHRoaXNbIDAgXS5vd25lckRvY3VtZW50LCBmYWxzZSwgdGhpcyApO1xuXHRcdFx0Zmlyc3QgPSBmcmFnbWVudC5maXJzdENoaWxkO1xuXG5cdFx0XHRpZiAoIGZyYWdtZW50LmNoaWxkTm9kZXMubGVuZ3RoID09PSAxICkge1xuXHRcdFx0XHRmcmFnbWVudCA9IGZpcnN0O1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIGZpcnN0ICkge1xuXHRcdFx0XHRzY3JpcHRzID0galF1ZXJ5Lm1hcCggZ2V0QWxsKCBmcmFnbWVudCwgXCJzY3JpcHRcIiApLCBkaXNhYmxlU2NyaXB0ICk7XG5cdFx0XHRcdGhhc1NjcmlwdHMgPSBzY3JpcHRzLmxlbmd0aDtcblxuXHRcdFx0XHQvLyBVc2UgdGhlIG9yaWdpbmFsIGZyYWdtZW50IGZvciB0aGUgbGFzdCBpdGVtIGluc3RlYWQgb2YgdGhlIGZpcnN0IGJlY2F1c2UgaXQgY2FuIGVuZCB1cFxuXHRcdFx0XHQvLyBiZWluZyBlbXB0aWVkIGluY29ycmVjdGx5IGluIGNlcnRhaW4gc2l0dWF0aW9ucyAoIzgwNzApLlxuXHRcdFx0XHRmb3IgKCA7IGkgPCBsOyBpKysgKSB7XG5cdFx0XHRcdFx0bm9kZSA9IGZyYWdtZW50O1xuXG5cdFx0XHRcdFx0aWYgKCBpICE9PSBpTm9DbG9uZSApIHtcblx0XHRcdFx0XHRcdG5vZGUgPSBqUXVlcnkuY2xvbmUoIG5vZGUsIHRydWUsIHRydWUgKTtcblxuXHRcdFx0XHRcdFx0Ly8gS2VlcCByZWZlcmVuY2VzIHRvIGNsb25lZCBzY3JpcHRzIGZvciBsYXRlciByZXN0b3JhdGlvblxuXHRcdFx0XHRcdFx0aWYgKCBoYXNTY3JpcHRzICkge1xuXHRcdFx0XHRcdFx0XHQvLyBTdXBwb3J0OiBRdFdlYktpdFxuXHRcdFx0XHRcdFx0XHQvLyBqUXVlcnkubWVyZ2UgYmVjYXVzZSBwdXNoLmFwcGx5KF8sIGFycmF5bGlrZSkgdGhyb3dzXG5cdFx0XHRcdFx0XHRcdGpRdWVyeS5tZXJnZSggc2NyaXB0cywgZ2V0QWxsKCBub2RlLCBcInNjcmlwdFwiICkgKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRjYWxsYmFjay5jYWxsKCB0aGlzWyBpIF0sIG5vZGUsIGkgKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmICggaGFzU2NyaXB0cyApIHtcblx0XHRcdFx0XHRkb2MgPSBzY3JpcHRzWyBzY3JpcHRzLmxlbmd0aCAtIDEgXS5vd25lckRvY3VtZW50O1xuXG5cdFx0XHRcdFx0Ly8gUmVlbmFibGUgc2NyaXB0c1xuXHRcdFx0XHRcdGpRdWVyeS5tYXAoIHNjcmlwdHMsIHJlc3RvcmVTY3JpcHQgKTtcblxuXHRcdFx0XHRcdC8vIEV2YWx1YXRlIGV4ZWN1dGFibGUgc2NyaXB0cyBvbiBmaXJzdCBkb2N1bWVudCBpbnNlcnRpb25cblx0XHRcdFx0XHRmb3IgKCBpID0gMDsgaSA8IGhhc1NjcmlwdHM7IGkrKyApIHtcblx0XHRcdFx0XHRcdG5vZGUgPSBzY3JpcHRzWyBpIF07XG5cdFx0XHRcdFx0XHRpZiAoIHJzY3JpcHRUeXBlLnRlc3QoIG5vZGUudHlwZSB8fCBcIlwiICkgJiZcblx0XHRcdFx0XHRcdFx0IWRhdGFfcHJpdi5hY2Nlc3MoIG5vZGUsIFwiZ2xvYmFsRXZhbFwiICkgJiYgalF1ZXJ5LmNvbnRhaW5zKCBkb2MsIG5vZGUgKSApIHtcblxuXHRcdFx0XHRcdFx0XHRpZiAoIG5vZGUuc3JjICkge1xuXHRcdFx0XHRcdFx0XHRcdC8vIE9wdGlvbmFsIEFKQVggZGVwZW5kZW5jeSwgYnV0IHdvbid0IHJ1biBzY3JpcHRzIGlmIG5vdCBwcmVzZW50XG5cdFx0XHRcdFx0XHRcdFx0aWYgKCBqUXVlcnkuX2V2YWxVcmwgKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRqUXVlcnkuX2V2YWxVcmwoIG5vZGUuc3JjICk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdGpRdWVyeS5nbG9iYWxFdmFsKCBub2RlLnRleHRDb250ZW50LnJlcGxhY2UoIHJjbGVhblNjcmlwdCwgXCJcIiApICk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcztcblx0fVxufSk7XG5cbmpRdWVyeS5lYWNoKHtcblx0YXBwZW5kVG86IFwiYXBwZW5kXCIsXG5cdHByZXBlbmRUbzogXCJwcmVwZW5kXCIsXG5cdGluc2VydEJlZm9yZTogXCJiZWZvcmVcIixcblx0aW5zZXJ0QWZ0ZXI6IFwiYWZ0ZXJcIixcblx0cmVwbGFjZUFsbDogXCJyZXBsYWNlV2l0aFwiXG59LCBmdW5jdGlvbiggbmFtZSwgb3JpZ2luYWwgKSB7XG5cdGpRdWVyeS5mblsgbmFtZSBdID0gZnVuY3Rpb24oIHNlbGVjdG9yICkge1xuXHRcdHZhciBlbGVtcyxcblx0XHRcdHJldCA9IFtdLFxuXHRcdFx0aW5zZXJ0ID0galF1ZXJ5KCBzZWxlY3RvciApLFxuXHRcdFx0bGFzdCA9IGluc2VydC5sZW5ndGggLSAxLFxuXHRcdFx0aSA9IDA7XG5cblx0XHRmb3IgKCA7IGkgPD0gbGFzdDsgaSsrICkge1xuXHRcdFx0ZWxlbXMgPSBpID09PSBsYXN0ID8gdGhpcyA6IHRoaXMuY2xvbmUoIHRydWUgKTtcblx0XHRcdGpRdWVyeSggaW5zZXJ0WyBpIF0gKVsgb3JpZ2luYWwgXSggZWxlbXMgKTtcblxuXHRcdFx0Ly8gU3VwcG9ydDogUXRXZWJLaXRcblx0XHRcdC8vIC5nZXQoKSBiZWNhdXNlIHB1c2guYXBwbHkoXywgYXJyYXlsaWtlKSB0aHJvd3Ncblx0XHRcdHB1c2guYXBwbHkoIHJldCwgZWxlbXMuZ2V0KCkgKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcy5wdXNoU3RhY2soIHJldCApO1xuXHR9O1xufSk7XG5cbnJldHVybiBqUXVlcnk7XG59KTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2pxdWVyeS9zcmMvbWFuaXB1bGF0aW9uLmpzXG4gKiogbW9kdWxlIGlkID0gMzBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImRlZmluZShbXG5cdFwiLi4vRGF0YVwiXG5dLCBmdW5jdGlvbiggRGF0YSApIHtcblx0cmV0dXJuIG5ldyBEYXRhKCk7XG59KTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2pxdWVyeS9zcmMvZGF0YS92YXIvZGF0YV91c2VyLmpzXG4gKiogbW9kdWxlIGlkID0gMzFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImRlZmluZShbXG5cdFwiLi4vY29yZVwiXG5dLCBmdW5jdGlvbiggalF1ZXJ5ICkge1xuXG4vLyBNdWx0aWZ1bmN0aW9uYWwgbWV0aG9kIHRvIGdldCBhbmQgc2V0IHZhbHVlcyBvZiBhIGNvbGxlY3Rpb25cbi8vIFRoZSB2YWx1ZS9zIGNhbiBvcHRpb25hbGx5IGJlIGV4ZWN1dGVkIGlmIGl0J3MgYSBmdW5jdGlvblxudmFyIGFjY2VzcyA9IGpRdWVyeS5hY2Nlc3MgPSBmdW5jdGlvbiggZWxlbXMsIGZuLCBrZXksIHZhbHVlLCBjaGFpbmFibGUsIGVtcHR5R2V0LCByYXcgKSB7XG5cdHZhciBpID0gMCxcblx0XHRsZW4gPSBlbGVtcy5sZW5ndGgsXG5cdFx0YnVsayA9IGtleSA9PSBudWxsO1xuXG5cdC8vIFNldHMgbWFueSB2YWx1ZXNcblx0aWYgKCBqUXVlcnkudHlwZSgga2V5ICkgPT09IFwib2JqZWN0XCIgKSB7XG5cdFx0Y2hhaW5hYmxlID0gdHJ1ZTtcblx0XHRmb3IgKCBpIGluIGtleSApIHtcblx0XHRcdGpRdWVyeS5hY2Nlc3MoIGVsZW1zLCBmbiwgaSwga2V5W2ldLCB0cnVlLCBlbXB0eUdldCwgcmF3ICk7XG5cdFx0fVxuXG5cdC8vIFNldHMgb25lIHZhbHVlXG5cdH0gZWxzZSBpZiAoIHZhbHVlICE9PSB1bmRlZmluZWQgKSB7XG5cdFx0Y2hhaW5hYmxlID0gdHJ1ZTtcblxuXHRcdGlmICggIWpRdWVyeS5pc0Z1bmN0aW9uKCB2YWx1ZSApICkge1xuXHRcdFx0cmF3ID0gdHJ1ZTtcblx0XHR9XG5cblx0XHRpZiAoIGJ1bGsgKSB7XG5cdFx0XHQvLyBCdWxrIG9wZXJhdGlvbnMgcnVuIGFnYWluc3QgdGhlIGVudGlyZSBzZXRcblx0XHRcdGlmICggcmF3ICkge1xuXHRcdFx0XHRmbi5jYWxsKCBlbGVtcywgdmFsdWUgKTtcblx0XHRcdFx0Zm4gPSBudWxsO1xuXG5cdFx0XHQvLyAuLi5leGNlcHQgd2hlbiBleGVjdXRpbmcgZnVuY3Rpb24gdmFsdWVzXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRidWxrID0gZm47XG5cdFx0XHRcdGZuID0gZnVuY3Rpb24oIGVsZW0sIGtleSwgdmFsdWUgKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGJ1bGsuY2FsbCggalF1ZXJ5KCBlbGVtICksIHZhbHVlICk7XG5cdFx0XHRcdH07XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKCBmbiApIHtcblx0XHRcdGZvciAoIDsgaSA8IGxlbjsgaSsrICkge1xuXHRcdFx0XHRmbiggZWxlbXNbaV0sIGtleSwgcmF3ID8gdmFsdWUgOiB2YWx1ZS5jYWxsKCBlbGVtc1tpXSwgaSwgZm4oIGVsZW1zW2ldLCBrZXkgKSApICk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIGNoYWluYWJsZSA/XG5cdFx0ZWxlbXMgOlxuXG5cdFx0Ly8gR2V0c1xuXHRcdGJ1bGsgP1xuXHRcdFx0Zm4uY2FsbCggZWxlbXMgKSA6XG5cdFx0XHRsZW4gPyBmbiggZWxlbXNbMF0sIGtleSApIDogZW1wdHlHZXQ7XG59O1xuXG5yZXR1cm4gYWNjZXNzO1xuXG59KTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2pxdWVyeS9zcmMvY29yZS9hY2Nlc3MuanNcbiAqKiBtb2R1bGUgaWQgPSAzMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZGVmaW5lKGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gKC9eKD86Y2hlY2tib3h8cmFkaW8pJC9pKTtcbn0pO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vanF1ZXJ5L3NyYy9tYW5pcHVsYXRpb24vdmFyL3JjaGVja2FibGVUeXBlLmpzXG4gKiogbW9kdWxlIGlkID0gMzNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImRlZmluZShbXG5cdFwiLi4vdmFyL3N1cHBvcnRcIlxuXSwgZnVuY3Rpb24oIHN1cHBvcnQgKSB7XG5cbihmdW5jdGlvbigpIHtcblx0dmFyIGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpLFxuXHRcdGRpdiA9IGZyYWdtZW50LmFwcGVuZENoaWxkKCBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCBcImRpdlwiICkgKSxcblx0XHRpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoIFwiaW5wdXRcIiApO1xuXG5cdC8vIFN1cHBvcnQ6IFNhZmFyaTw9NS4xXG5cdC8vIENoZWNrIHN0YXRlIGxvc3QgaWYgdGhlIG5hbWUgaXMgc2V0ICgjMTEyMTcpXG5cdC8vIFN1cHBvcnQ6IFdpbmRvd3MgV2ViIEFwcHMgKFdXQSlcblx0Ly8gYG5hbWVgIGFuZCBgdHlwZWAgbXVzdCB1c2UgLnNldEF0dHJpYnV0ZSBmb3IgV1dBICgjMTQ5MDEpXG5cdGlucHV0LnNldEF0dHJpYnV0ZSggXCJ0eXBlXCIsIFwicmFkaW9cIiApO1xuXHRpbnB1dC5zZXRBdHRyaWJ1dGUoIFwiY2hlY2tlZFwiLCBcImNoZWNrZWRcIiApO1xuXHRpbnB1dC5zZXRBdHRyaWJ1dGUoIFwibmFtZVwiLCBcInRcIiApO1xuXG5cdGRpdi5hcHBlbmRDaGlsZCggaW5wdXQgKTtcblxuXHQvLyBTdXBwb3J0OiBTYWZhcmk8PTUuMSwgQW5kcm9pZDw0LjJcblx0Ly8gT2xkZXIgV2ViS2l0IGRvZXNuJ3QgY2xvbmUgY2hlY2tlZCBzdGF0ZSBjb3JyZWN0bHkgaW4gZnJhZ21lbnRzXG5cdHN1cHBvcnQuY2hlY2tDbG9uZSA9IGRpdi5jbG9uZU5vZGUoIHRydWUgKS5jbG9uZU5vZGUoIHRydWUgKS5sYXN0Q2hpbGQuY2hlY2tlZDtcblxuXHQvLyBTdXBwb3J0OiBJRTw9MTErXG5cdC8vIE1ha2Ugc3VyZSB0ZXh0YXJlYSAoYW5kIGNoZWNrYm94KSBkZWZhdWx0VmFsdWUgaXMgcHJvcGVybHkgY2xvbmVkXG5cdGRpdi5pbm5lckhUTUwgPSBcIjx0ZXh0YXJlYT54PC90ZXh0YXJlYT5cIjtcblx0c3VwcG9ydC5ub0Nsb25lQ2hlY2tlZCA9ICEhZGl2LmNsb25lTm9kZSggdHJ1ZSApLmxhc3RDaGlsZC5kZWZhdWx0VmFsdWU7XG59KSgpO1xuXG5yZXR1cm4gc3VwcG9ydDtcblxufSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9qcXVlcnkvc3JjL21hbmlwdWxhdGlvbi9zdXBwb3J0LmpzXG4gKiogbW9kdWxlIGlkID0gMzRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImRlZmluZShbXG5cdFwiLi9jb3JlXCIsXG5cdFwiLi92YXIvaW5kZXhPZlwiLFxuXHRcIi4vdHJhdmVyc2luZy92YXIvcm5lZWRzQ29udGV4dFwiLFxuXHRcIi4vY29yZS9pbml0XCIsXG5cdFwiLi90cmF2ZXJzaW5nL2ZpbmRGaWx0ZXJcIixcblx0XCIuL3NlbGVjdG9yXCJcbl0sIGZ1bmN0aW9uKCBqUXVlcnksIGluZGV4T2YsIHJuZWVkc0NvbnRleHQgKSB7XG5cbnZhciBycGFyZW50c3ByZXYgPSAvXig/OnBhcmVudHN8cHJldig/OlVudGlsfEFsbCkpLyxcblx0Ly8gTWV0aG9kcyBndWFyYW50ZWVkIHRvIHByb2R1Y2UgYSB1bmlxdWUgc2V0IHdoZW4gc3RhcnRpbmcgZnJvbSBhIHVuaXF1ZSBzZXRcblx0Z3VhcmFudGVlZFVuaXF1ZSA9IHtcblx0XHRjaGlsZHJlbjogdHJ1ZSxcblx0XHRjb250ZW50czogdHJ1ZSxcblx0XHRuZXh0OiB0cnVlLFxuXHRcdHByZXY6IHRydWVcblx0fTtcblxualF1ZXJ5LmV4dGVuZCh7XG5cdGRpcjogZnVuY3Rpb24oIGVsZW0sIGRpciwgdW50aWwgKSB7XG5cdFx0dmFyIG1hdGNoZWQgPSBbXSxcblx0XHRcdHRydW5jYXRlID0gdW50aWwgIT09IHVuZGVmaW5lZDtcblxuXHRcdHdoaWxlICggKGVsZW0gPSBlbGVtWyBkaXIgXSkgJiYgZWxlbS5ub2RlVHlwZSAhPT0gOSApIHtcblx0XHRcdGlmICggZWxlbS5ub2RlVHlwZSA9PT0gMSApIHtcblx0XHRcdFx0aWYgKCB0cnVuY2F0ZSAmJiBqUXVlcnkoIGVsZW0gKS5pcyggdW50aWwgKSApIHtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0XHRtYXRjaGVkLnB1c2goIGVsZW0gKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIG1hdGNoZWQ7XG5cdH0sXG5cblx0c2libGluZzogZnVuY3Rpb24oIG4sIGVsZW0gKSB7XG5cdFx0dmFyIG1hdGNoZWQgPSBbXTtcblxuXHRcdGZvciAoIDsgbjsgbiA9IG4ubmV4dFNpYmxpbmcgKSB7XG5cdFx0XHRpZiAoIG4ubm9kZVR5cGUgPT09IDEgJiYgbiAhPT0gZWxlbSApIHtcblx0XHRcdFx0bWF0Y2hlZC5wdXNoKCBuICk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIG1hdGNoZWQ7XG5cdH1cbn0pO1xuXG5qUXVlcnkuZm4uZXh0ZW5kKHtcblx0aGFzOiBmdW5jdGlvbiggdGFyZ2V0ICkge1xuXHRcdHZhciB0YXJnZXRzID0galF1ZXJ5KCB0YXJnZXQsIHRoaXMgKSxcblx0XHRcdGwgPSB0YXJnZXRzLmxlbmd0aDtcblxuXHRcdHJldHVybiB0aGlzLmZpbHRlcihmdW5jdGlvbigpIHtcblx0XHRcdHZhciBpID0gMDtcblx0XHRcdGZvciAoIDsgaSA8IGw7IGkrKyApIHtcblx0XHRcdFx0aWYgKCBqUXVlcnkuY29udGFpbnMoIHRoaXMsIHRhcmdldHNbaV0gKSApIHtcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pO1xuXHR9LFxuXG5cdGNsb3Nlc3Q6IGZ1bmN0aW9uKCBzZWxlY3RvcnMsIGNvbnRleHQgKSB7XG5cdFx0dmFyIGN1cixcblx0XHRcdGkgPSAwLFxuXHRcdFx0bCA9IHRoaXMubGVuZ3RoLFxuXHRcdFx0bWF0Y2hlZCA9IFtdLFxuXHRcdFx0cG9zID0gcm5lZWRzQ29udGV4dC50ZXN0KCBzZWxlY3RvcnMgKSB8fCB0eXBlb2Ygc2VsZWN0b3JzICE9PSBcInN0cmluZ1wiID9cblx0XHRcdFx0alF1ZXJ5KCBzZWxlY3RvcnMsIGNvbnRleHQgfHwgdGhpcy5jb250ZXh0ICkgOlxuXHRcdFx0XHQwO1xuXG5cdFx0Zm9yICggOyBpIDwgbDsgaSsrICkge1xuXHRcdFx0Zm9yICggY3VyID0gdGhpc1tpXTsgY3VyICYmIGN1ciAhPT0gY29udGV4dDsgY3VyID0gY3VyLnBhcmVudE5vZGUgKSB7XG5cdFx0XHRcdC8vIEFsd2F5cyBza2lwIGRvY3VtZW50IGZyYWdtZW50c1xuXHRcdFx0XHRpZiAoIGN1ci5ub2RlVHlwZSA8IDExICYmIChwb3MgP1xuXHRcdFx0XHRcdHBvcy5pbmRleChjdXIpID4gLTEgOlxuXG5cdFx0XHRcdFx0Ly8gRG9uJ3QgcGFzcyBub24tZWxlbWVudHMgdG8gU2l6emxlXG5cdFx0XHRcdFx0Y3VyLm5vZGVUeXBlID09PSAxICYmXG5cdFx0XHRcdFx0XHRqUXVlcnkuZmluZC5tYXRjaGVzU2VsZWN0b3IoY3VyLCBzZWxlY3RvcnMpKSApIHtcblxuXHRcdFx0XHRcdG1hdGNoZWQucHVzaCggY3VyICk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcy5wdXNoU3RhY2soIG1hdGNoZWQubGVuZ3RoID4gMSA/IGpRdWVyeS51bmlxdWUoIG1hdGNoZWQgKSA6IG1hdGNoZWQgKTtcblx0fSxcblxuXHQvLyBEZXRlcm1pbmUgdGhlIHBvc2l0aW9uIG9mIGFuIGVsZW1lbnQgd2l0aGluIHRoZSBzZXRcblx0aW5kZXg6IGZ1bmN0aW9uKCBlbGVtICkge1xuXG5cdFx0Ly8gTm8gYXJndW1lbnQsIHJldHVybiBpbmRleCBpbiBwYXJlbnRcblx0XHRpZiAoICFlbGVtICkge1xuXHRcdFx0cmV0dXJuICggdGhpc1sgMCBdICYmIHRoaXNbIDAgXS5wYXJlbnROb2RlICkgPyB0aGlzLmZpcnN0KCkucHJldkFsbCgpLmxlbmd0aCA6IC0xO1xuXHRcdH1cblxuXHRcdC8vIEluZGV4IGluIHNlbGVjdG9yXG5cdFx0aWYgKCB0eXBlb2YgZWxlbSA9PT0gXCJzdHJpbmdcIiApIHtcblx0XHRcdHJldHVybiBpbmRleE9mLmNhbGwoIGpRdWVyeSggZWxlbSApLCB0aGlzWyAwIF0gKTtcblx0XHR9XG5cblx0XHQvLyBMb2NhdGUgdGhlIHBvc2l0aW9uIG9mIHRoZSBkZXNpcmVkIGVsZW1lbnRcblx0XHRyZXR1cm4gaW5kZXhPZi5jYWxsKCB0aGlzLFxuXG5cdFx0XHQvLyBJZiBpdCByZWNlaXZlcyBhIGpRdWVyeSBvYmplY3QsIHRoZSBmaXJzdCBlbGVtZW50IGlzIHVzZWRcblx0XHRcdGVsZW0uanF1ZXJ5ID8gZWxlbVsgMCBdIDogZWxlbVxuXHRcdCk7XG5cdH0sXG5cblx0YWRkOiBmdW5jdGlvbiggc2VsZWN0b3IsIGNvbnRleHQgKSB7XG5cdFx0cmV0dXJuIHRoaXMucHVzaFN0YWNrKFxuXHRcdFx0alF1ZXJ5LnVuaXF1ZShcblx0XHRcdFx0alF1ZXJ5Lm1lcmdlKCB0aGlzLmdldCgpLCBqUXVlcnkoIHNlbGVjdG9yLCBjb250ZXh0ICkgKVxuXHRcdFx0KVxuXHRcdCk7XG5cdH0sXG5cblx0YWRkQmFjazogZnVuY3Rpb24oIHNlbGVjdG9yICkge1xuXHRcdHJldHVybiB0aGlzLmFkZCggc2VsZWN0b3IgPT0gbnVsbCA/XG5cdFx0XHR0aGlzLnByZXZPYmplY3QgOiB0aGlzLnByZXZPYmplY3QuZmlsdGVyKHNlbGVjdG9yKVxuXHRcdCk7XG5cdH1cbn0pO1xuXG5mdW5jdGlvbiBzaWJsaW5nKCBjdXIsIGRpciApIHtcblx0d2hpbGUgKCAoY3VyID0gY3VyW2Rpcl0pICYmIGN1ci5ub2RlVHlwZSAhPT0gMSApIHt9XG5cdHJldHVybiBjdXI7XG59XG5cbmpRdWVyeS5lYWNoKHtcblx0cGFyZW50OiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHR2YXIgcGFyZW50ID0gZWxlbS5wYXJlbnROb2RlO1xuXHRcdHJldHVybiBwYXJlbnQgJiYgcGFyZW50Lm5vZGVUeXBlICE9PSAxMSA/IHBhcmVudCA6IG51bGw7XG5cdH0sXG5cdHBhcmVudHM6IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdHJldHVybiBqUXVlcnkuZGlyKCBlbGVtLCBcInBhcmVudE5vZGVcIiApO1xuXHR9LFxuXHRwYXJlbnRzVW50aWw6IGZ1bmN0aW9uKCBlbGVtLCBpLCB1bnRpbCApIHtcblx0XHRyZXR1cm4galF1ZXJ5LmRpciggZWxlbSwgXCJwYXJlbnROb2RlXCIsIHVudGlsICk7XG5cdH0sXG5cdG5leHQ6IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdHJldHVybiBzaWJsaW5nKCBlbGVtLCBcIm5leHRTaWJsaW5nXCIgKTtcblx0fSxcblx0cHJldjogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0cmV0dXJuIHNpYmxpbmcoIGVsZW0sIFwicHJldmlvdXNTaWJsaW5nXCIgKTtcblx0fSxcblx0bmV4dEFsbDogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0cmV0dXJuIGpRdWVyeS5kaXIoIGVsZW0sIFwibmV4dFNpYmxpbmdcIiApO1xuXHR9LFxuXHRwcmV2QWxsOiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRyZXR1cm4galF1ZXJ5LmRpciggZWxlbSwgXCJwcmV2aW91c1NpYmxpbmdcIiApO1xuXHR9LFxuXHRuZXh0VW50aWw6IGZ1bmN0aW9uKCBlbGVtLCBpLCB1bnRpbCApIHtcblx0XHRyZXR1cm4galF1ZXJ5LmRpciggZWxlbSwgXCJuZXh0U2libGluZ1wiLCB1bnRpbCApO1xuXHR9LFxuXHRwcmV2VW50aWw6IGZ1bmN0aW9uKCBlbGVtLCBpLCB1bnRpbCApIHtcblx0XHRyZXR1cm4galF1ZXJ5LmRpciggZWxlbSwgXCJwcmV2aW91c1NpYmxpbmdcIiwgdW50aWwgKTtcblx0fSxcblx0c2libGluZ3M6IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdHJldHVybiBqUXVlcnkuc2libGluZyggKCBlbGVtLnBhcmVudE5vZGUgfHwge30gKS5maXJzdENoaWxkLCBlbGVtICk7XG5cdH0sXG5cdGNoaWxkcmVuOiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRyZXR1cm4galF1ZXJ5LnNpYmxpbmcoIGVsZW0uZmlyc3RDaGlsZCApO1xuXHR9LFxuXHRjb250ZW50czogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0cmV0dXJuIGVsZW0uY29udGVudERvY3VtZW50IHx8IGpRdWVyeS5tZXJnZSggW10sIGVsZW0uY2hpbGROb2RlcyApO1xuXHR9XG59LCBmdW5jdGlvbiggbmFtZSwgZm4gKSB7XG5cdGpRdWVyeS5mblsgbmFtZSBdID0gZnVuY3Rpb24oIHVudGlsLCBzZWxlY3RvciApIHtcblx0XHR2YXIgbWF0Y2hlZCA9IGpRdWVyeS5tYXAoIHRoaXMsIGZuLCB1bnRpbCApO1xuXG5cdFx0aWYgKCBuYW1lLnNsaWNlKCAtNSApICE9PSBcIlVudGlsXCIgKSB7XG5cdFx0XHRzZWxlY3RvciA9IHVudGlsO1xuXHRcdH1cblxuXHRcdGlmICggc2VsZWN0b3IgJiYgdHlwZW9mIHNlbGVjdG9yID09PSBcInN0cmluZ1wiICkge1xuXHRcdFx0bWF0Y2hlZCA9IGpRdWVyeS5maWx0ZXIoIHNlbGVjdG9yLCBtYXRjaGVkICk7XG5cdFx0fVxuXG5cdFx0aWYgKCB0aGlzLmxlbmd0aCA+IDEgKSB7XG5cdFx0XHQvLyBSZW1vdmUgZHVwbGljYXRlc1xuXHRcdFx0aWYgKCAhZ3VhcmFudGVlZFVuaXF1ZVsgbmFtZSBdICkge1xuXHRcdFx0XHRqUXVlcnkudW5pcXVlKCBtYXRjaGVkICk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIFJldmVyc2Ugb3JkZXIgZm9yIHBhcmVudHMqIGFuZCBwcmV2LWRlcml2YXRpdmVzXG5cdFx0XHRpZiAoIHJwYXJlbnRzcHJldi50ZXN0KCBuYW1lICkgKSB7XG5cdFx0XHRcdG1hdGNoZWQucmV2ZXJzZSgpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzLnB1c2hTdGFjayggbWF0Y2hlZCApO1xuXHR9O1xufSk7XG5cbnJldHVybiBqUXVlcnk7XG59KTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2pxdWVyeS9zcmMvdHJhdmVyc2luZy5qc1xuICoqIG1vZHVsZSBpZCA9IDM1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJkZWZpbmUoW1xuXHRcIi4vY29yZVwiLFxuXHRcIi4vdmFyL3Jub3R3aGl0ZVwiLFxuXHRcIi4vYWpheC92YXIvbm9uY2VcIixcblx0XCIuL2FqYXgvdmFyL3JxdWVyeVwiLFxuXHRcIi4vY29yZS9pbml0XCIsXG5cdFwiLi9hamF4L3BhcnNlSlNPTlwiLFxuXHRcIi4vYWpheC9wYXJzZVhNTFwiLFxuXHRcIi4vZGVmZXJyZWRcIlxuXSwgZnVuY3Rpb24oIGpRdWVyeSwgcm5vdHdoaXRlLCBub25jZSwgcnF1ZXJ5ICkge1xuXG52YXJcblx0cmhhc2ggPSAvIy4qJC8sXG5cdHJ0cyA9IC8oWz8mXSlfPVteJl0qLyxcblx0cmhlYWRlcnMgPSAvXiguKj8pOlsgXFx0XSooW15cXHJcXG5dKikkL21nLFxuXHQvLyAjNzY1MywgIzgxMjUsICM4MTUyOiBsb2NhbCBwcm90b2NvbCBkZXRlY3Rpb25cblx0cmxvY2FsUHJvdG9jb2wgPSAvXig/OmFib3V0fGFwcHxhcHAtc3RvcmFnZXwuKy1leHRlbnNpb258ZmlsZXxyZXN8d2lkZ2V0KTokLyxcblx0cm5vQ29udGVudCA9IC9eKD86R0VUfEhFQUQpJC8sXG5cdHJwcm90b2NvbCA9IC9eXFwvXFwvLyxcblx0cnVybCA9IC9eKFtcXHcuKy1dKzopKD86XFwvXFwvKD86W15cXC8/I10qQHwpKFteXFwvPyM6XSopKD86OihcXGQrKXwpfCkvLFxuXG5cdC8qIFByZWZpbHRlcnNcblx0ICogMSkgVGhleSBhcmUgdXNlZnVsIHRvIGludHJvZHVjZSBjdXN0b20gZGF0YVR5cGVzIChzZWUgYWpheC9qc29ucC5qcyBmb3IgYW4gZXhhbXBsZSlcblx0ICogMikgVGhlc2UgYXJlIGNhbGxlZDpcblx0ICogICAgLSBCRUZPUkUgYXNraW5nIGZvciBhIHRyYW5zcG9ydFxuXHQgKiAgICAtIEFGVEVSIHBhcmFtIHNlcmlhbGl6YXRpb24gKHMuZGF0YSBpcyBhIHN0cmluZyBpZiBzLnByb2Nlc3NEYXRhIGlzIHRydWUpXG5cdCAqIDMpIGtleSBpcyB0aGUgZGF0YVR5cGVcblx0ICogNCkgdGhlIGNhdGNoYWxsIHN5bWJvbCBcIipcIiBjYW4gYmUgdXNlZFxuXHQgKiA1KSBleGVjdXRpb24gd2lsbCBzdGFydCB3aXRoIHRyYW5zcG9ydCBkYXRhVHlwZSBhbmQgVEhFTiBjb250aW51ZSBkb3duIHRvIFwiKlwiIGlmIG5lZWRlZFxuXHQgKi9cblx0cHJlZmlsdGVycyA9IHt9LFxuXG5cdC8qIFRyYW5zcG9ydHMgYmluZGluZ3Ncblx0ICogMSkga2V5IGlzIHRoZSBkYXRhVHlwZVxuXHQgKiAyKSB0aGUgY2F0Y2hhbGwgc3ltYm9sIFwiKlwiIGNhbiBiZSB1c2VkXG5cdCAqIDMpIHNlbGVjdGlvbiB3aWxsIHN0YXJ0IHdpdGggdHJhbnNwb3J0IGRhdGFUeXBlIGFuZCBUSEVOIGdvIHRvIFwiKlwiIGlmIG5lZWRlZFxuXHQgKi9cblx0dHJhbnNwb3J0cyA9IHt9LFxuXG5cdC8vIEF2b2lkIGNvbW1lbnQtcHJvbG9nIGNoYXIgc2VxdWVuY2UgKCMxMDA5OCk7IG11c3QgYXBwZWFzZSBsaW50IGFuZCBldmFkZSBjb21wcmVzc2lvblxuXHRhbGxUeXBlcyA9IFwiKi9cIi5jb25jYXQoIFwiKlwiICksXG5cblx0Ly8gRG9jdW1lbnQgbG9jYXRpb25cblx0YWpheExvY2F0aW9uID0gd2luZG93LmxvY2F0aW9uLmhyZWYsXG5cblx0Ly8gU2VnbWVudCBsb2NhdGlvbiBpbnRvIHBhcnRzXG5cdGFqYXhMb2NQYXJ0cyA9IHJ1cmwuZXhlYyggYWpheExvY2F0aW9uLnRvTG93ZXJDYXNlKCkgKSB8fCBbXTtcblxuLy8gQmFzZSBcImNvbnN0cnVjdG9yXCIgZm9yIGpRdWVyeS5hamF4UHJlZmlsdGVyIGFuZCBqUXVlcnkuYWpheFRyYW5zcG9ydFxuZnVuY3Rpb24gYWRkVG9QcmVmaWx0ZXJzT3JUcmFuc3BvcnRzKCBzdHJ1Y3R1cmUgKSB7XG5cblx0Ly8gZGF0YVR5cGVFeHByZXNzaW9uIGlzIG9wdGlvbmFsIGFuZCBkZWZhdWx0cyB0byBcIipcIlxuXHRyZXR1cm4gZnVuY3Rpb24oIGRhdGFUeXBlRXhwcmVzc2lvbiwgZnVuYyApIHtcblxuXHRcdGlmICggdHlwZW9mIGRhdGFUeXBlRXhwcmVzc2lvbiAhPT0gXCJzdHJpbmdcIiApIHtcblx0XHRcdGZ1bmMgPSBkYXRhVHlwZUV4cHJlc3Npb247XG5cdFx0XHRkYXRhVHlwZUV4cHJlc3Npb24gPSBcIipcIjtcblx0XHR9XG5cblx0XHR2YXIgZGF0YVR5cGUsXG5cdFx0XHRpID0gMCxcblx0XHRcdGRhdGFUeXBlcyA9IGRhdGFUeXBlRXhwcmVzc2lvbi50b0xvd2VyQ2FzZSgpLm1hdGNoKCBybm90d2hpdGUgKSB8fCBbXTtcblxuXHRcdGlmICggalF1ZXJ5LmlzRnVuY3Rpb24oIGZ1bmMgKSApIHtcblx0XHRcdC8vIEZvciBlYWNoIGRhdGFUeXBlIGluIHRoZSBkYXRhVHlwZUV4cHJlc3Npb25cblx0XHRcdHdoaWxlICggKGRhdGFUeXBlID0gZGF0YVR5cGVzW2krK10pICkge1xuXHRcdFx0XHQvLyBQcmVwZW5kIGlmIHJlcXVlc3RlZFxuXHRcdFx0XHRpZiAoIGRhdGFUeXBlWzBdID09PSBcIitcIiApIHtcblx0XHRcdFx0XHRkYXRhVHlwZSA9IGRhdGFUeXBlLnNsaWNlKCAxICkgfHwgXCIqXCI7XG5cdFx0XHRcdFx0KHN0cnVjdHVyZVsgZGF0YVR5cGUgXSA9IHN0cnVjdHVyZVsgZGF0YVR5cGUgXSB8fCBbXSkudW5zaGlmdCggZnVuYyApO1xuXG5cdFx0XHRcdC8vIE90aGVyd2lzZSBhcHBlbmRcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHQoc3RydWN0dXJlWyBkYXRhVHlwZSBdID0gc3RydWN0dXJlWyBkYXRhVHlwZSBdIHx8IFtdKS5wdXNoKCBmdW5jICk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH07XG59XG5cbi8vIEJhc2UgaW5zcGVjdGlvbiBmdW5jdGlvbiBmb3IgcHJlZmlsdGVycyBhbmQgdHJhbnNwb3J0c1xuZnVuY3Rpb24gaW5zcGVjdFByZWZpbHRlcnNPclRyYW5zcG9ydHMoIHN0cnVjdHVyZSwgb3B0aW9ucywgb3JpZ2luYWxPcHRpb25zLCBqcVhIUiApIHtcblxuXHR2YXIgaW5zcGVjdGVkID0ge30sXG5cdFx0c2Vla2luZ1RyYW5zcG9ydCA9ICggc3RydWN0dXJlID09PSB0cmFuc3BvcnRzICk7XG5cblx0ZnVuY3Rpb24gaW5zcGVjdCggZGF0YVR5cGUgKSB7XG5cdFx0dmFyIHNlbGVjdGVkO1xuXHRcdGluc3BlY3RlZFsgZGF0YVR5cGUgXSA9IHRydWU7XG5cdFx0alF1ZXJ5LmVhY2goIHN0cnVjdHVyZVsgZGF0YVR5cGUgXSB8fCBbXSwgZnVuY3Rpb24oIF8sIHByZWZpbHRlck9yRmFjdG9yeSApIHtcblx0XHRcdHZhciBkYXRhVHlwZU9yVHJhbnNwb3J0ID0gcHJlZmlsdGVyT3JGYWN0b3J5KCBvcHRpb25zLCBvcmlnaW5hbE9wdGlvbnMsIGpxWEhSICk7XG5cdFx0XHRpZiAoIHR5cGVvZiBkYXRhVHlwZU9yVHJhbnNwb3J0ID09PSBcInN0cmluZ1wiICYmICFzZWVraW5nVHJhbnNwb3J0ICYmICFpbnNwZWN0ZWRbIGRhdGFUeXBlT3JUcmFuc3BvcnQgXSApIHtcblx0XHRcdFx0b3B0aW9ucy5kYXRhVHlwZXMudW5zaGlmdCggZGF0YVR5cGVPclRyYW5zcG9ydCApO1xuXHRcdFx0XHRpbnNwZWN0KCBkYXRhVHlwZU9yVHJhbnNwb3J0ICk7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH0gZWxzZSBpZiAoIHNlZWtpbmdUcmFuc3BvcnQgKSB7XG5cdFx0XHRcdHJldHVybiAhKCBzZWxlY3RlZCA9IGRhdGFUeXBlT3JUcmFuc3BvcnQgKTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRyZXR1cm4gc2VsZWN0ZWQ7XG5cdH1cblxuXHRyZXR1cm4gaW5zcGVjdCggb3B0aW9ucy5kYXRhVHlwZXNbIDAgXSApIHx8ICFpbnNwZWN0ZWRbIFwiKlwiIF0gJiYgaW5zcGVjdCggXCIqXCIgKTtcbn1cblxuLy8gQSBzcGVjaWFsIGV4dGVuZCBmb3IgYWpheCBvcHRpb25zXG4vLyB0aGF0IHRha2VzIFwiZmxhdFwiIG9wdGlvbnMgKG5vdCB0byBiZSBkZWVwIGV4dGVuZGVkKVxuLy8gRml4ZXMgIzk4ODdcbmZ1bmN0aW9uIGFqYXhFeHRlbmQoIHRhcmdldCwgc3JjICkge1xuXHR2YXIga2V5LCBkZWVwLFxuXHRcdGZsYXRPcHRpb25zID0galF1ZXJ5LmFqYXhTZXR0aW5ncy5mbGF0T3B0aW9ucyB8fCB7fTtcblxuXHRmb3IgKCBrZXkgaW4gc3JjICkge1xuXHRcdGlmICggc3JjWyBrZXkgXSAhPT0gdW5kZWZpbmVkICkge1xuXHRcdFx0KCBmbGF0T3B0aW9uc1sga2V5IF0gPyB0YXJnZXQgOiAoIGRlZXAgfHwgKGRlZXAgPSB7fSkgKSApWyBrZXkgXSA9IHNyY1sga2V5IF07XG5cdFx0fVxuXHR9XG5cdGlmICggZGVlcCApIHtcblx0XHRqUXVlcnkuZXh0ZW5kKCB0cnVlLCB0YXJnZXQsIGRlZXAgKTtcblx0fVxuXG5cdHJldHVybiB0YXJnZXQ7XG59XG5cbi8qIEhhbmRsZXMgcmVzcG9uc2VzIHRvIGFuIGFqYXggcmVxdWVzdDpcbiAqIC0gZmluZHMgdGhlIHJpZ2h0IGRhdGFUeXBlIChtZWRpYXRlcyBiZXR3ZWVuIGNvbnRlbnQtdHlwZSBhbmQgZXhwZWN0ZWQgZGF0YVR5cGUpXG4gKiAtIHJldHVybnMgdGhlIGNvcnJlc3BvbmRpbmcgcmVzcG9uc2VcbiAqL1xuZnVuY3Rpb24gYWpheEhhbmRsZVJlc3BvbnNlcyggcywganFYSFIsIHJlc3BvbnNlcyApIHtcblxuXHR2YXIgY3QsIHR5cGUsIGZpbmFsRGF0YVR5cGUsIGZpcnN0RGF0YVR5cGUsXG5cdFx0Y29udGVudHMgPSBzLmNvbnRlbnRzLFxuXHRcdGRhdGFUeXBlcyA9IHMuZGF0YVR5cGVzO1xuXG5cdC8vIFJlbW92ZSBhdXRvIGRhdGFUeXBlIGFuZCBnZXQgY29udGVudC10eXBlIGluIHRoZSBwcm9jZXNzXG5cdHdoaWxlICggZGF0YVR5cGVzWyAwIF0gPT09IFwiKlwiICkge1xuXHRcdGRhdGFUeXBlcy5zaGlmdCgpO1xuXHRcdGlmICggY3QgPT09IHVuZGVmaW5lZCApIHtcblx0XHRcdGN0ID0gcy5taW1lVHlwZSB8fCBqcVhIUi5nZXRSZXNwb25zZUhlYWRlcihcIkNvbnRlbnQtVHlwZVwiKTtcblx0XHR9XG5cdH1cblxuXHQvLyBDaGVjayBpZiB3ZSdyZSBkZWFsaW5nIHdpdGggYSBrbm93biBjb250ZW50LXR5cGVcblx0aWYgKCBjdCApIHtcblx0XHRmb3IgKCB0eXBlIGluIGNvbnRlbnRzICkge1xuXHRcdFx0aWYgKCBjb250ZW50c1sgdHlwZSBdICYmIGNvbnRlbnRzWyB0eXBlIF0udGVzdCggY3QgKSApIHtcblx0XHRcdFx0ZGF0YVR5cGVzLnVuc2hpZnQoIHR5cGUgKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Ly8gQ2hlY2sgdG8gc2VlIGlmIHdlIGhhdmUgYSByZXNwb25zZSBmb3IgdGhlIGV4cGVjdGVkIGRhdGFUeXBlXG5cdGlmICggZGF0YVR5cGVzWyAwIF0gaW4gcmVzcG9uc2VzICkge1xuXHRcdGZpbmFsRGF0YVR5cGUgPSBkYXRhVHlwZXNbIDAgXTtcblx0fSBlbHNlIHtcblx0XHQvLyBUcnkgY29udmVydGlibGUgZGF0YVR5cGVzXG5cdFx0Zm9yICggdHlwZSBpbiByZXNwb25zZXMgKSB7XG5cdFx0XHRpZiAoICFkYXRhVHlwZXNbIDAgXSB8fCBzLmNvbnZlcnRlcnNbIHR5cGUgKyBcIiBcIiArIGRhdGFUeXBlc1swXSBdICkge1xuXHRcdFx0XHRmaW5hbERhdGFUeXBlID0gdHlwZTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0XHRpZiAoICFmaXJzdERhdGFUeXBlICkge1xuXHRcdFx0XHRmaXJzdERhdGFUeXBlID0gdHlwZTtcblx0XHRcdH1cblx0XHR9XG5cdFx0Ly8gT3IganVzdCB1c2UgZmlyc3Qgb25lXG5cdFx0ZmluYWxEYXRhVHlwZSA9IGZpbmFsRGF0YVR5cGUgfHwgZmlyc3REYXRhVHlwZTtcblx0fVxuXG5cdC8vIElmIHdlIGZvdW5kIGEgZGF0YVR5cGVcblx0Ly8gV2UgYWRkIHRoZSBkYXRhVHlwZSB0byB0aGUgbGlzdCBpZiBuZWVkZWRcblx0Ly8gYW5kIHJldHVybiB0aGUgY29ycmVzcG9uZGluZyByZXNwb25zZVxuXHRpZiAoIGZpbmFsRGF0YVR5cGUgKSB7XG5cdFx0aWYgKCBmaW5hbERhdGFUeXBlICE9PSBkYXRhVHlwZXNbIDAgXSApIHtcblx0XHRcdGRhdGFUeXBlcy51bnNoaWZ0KCBmaW5hbERhdGFUeXBlICk7XG5cdFx0fVxuXHRcdHJldHVybiByZXNwb25zZXNbIGZpbmFsRGF0YVR5cGUgXTtcblx0fVxufVxuXG4vKiBDaGFpbiBjb252ZXJzaW9ucyBnaXZlbiB0aGUgcmVxdWVzdCBhbmQgdGhlIG9yaWdpbmFsIHJlc3BvbnNlXG4gKiBBbHNvIHNldHMgdGhlIHJlc3BvbnNlWFhYIGZpZWxkcyBvbiB0aGUganFYSFIgaW5zdGFuY2VcbiAqL1xuZnVuY3Rpb24gYWpheENvbnZlcnQoIHMsIHJlc3BvbnNlLCBqcVhIUiwgaXNTdWNjZXNzICkge1xuXHR2YXIgY29udjIsIGN1cnJlbnQsIGNvbnYsIHRtcCwgcHJldixcblx0XHRjb252ZXJ0ZXJzID0ge30sXG5cdFx0Ly8gV29yayB3aXRoIGEgY29weSBvZiBkYXRhVHlwZXMgaW4gY2FzZSB3ZSBuZWVkIHRvIG1vZGlmeSBpdCBmb3IgY29udmVyc2lvblxuXHRcdGRhdGFUeXBlcyA9IHMuZGF0YVR5cGVzLnNsaWNlKCk7XG5cblx0Ly8gQ3JlYXRlIGNvbnZlcnRlcnMgbWFwIHdpdGggbG93ZXJjYXNlZCBrZXlzXG5cdGlmICggZGF0YVR5cGVzWyAxIF0gKSB7XG5cdFx0Zm9yICggY29udiBpbiBzLmNvbnZlcnRlcnMgKSB7XG5cdFx0XHRjb252ZXJ0ZXJzWyBjb252LnRvTG93ZXJDYXNlKCkgXSA9IHMuY29udmVydGVyc1sgY29udiBdO1xuXHRcdH1cblx0fVxuXG5cdGN1cnJlbnQgPSBkYXRhVHlwZXMuc2hpZnQoKTtcblxuXHQvLyBDb252ZXJ0IHRvIGVhY2ggc2VxdWVudGlhbCBkYXRhVHlwZVxuXHR3aGlsZSAoIGN1cnJlbnQgKSB7XG5cblx0XHRpZiAoIHMucmVzcG9uc2VGaWVsZHNbIGN1cnJlbnQgXSApIHtcblx0XHRcdGpxWEhSWyBzLnJlc3BvbnNlRmllbGRzWyBjdXJyZW50IF0gXSA9IHJlc3BvbnNlO1xuXHRcdH1cblxuXHRcdC8vIEFwcGx5IHRoZSBkYXRhRmlsdGVyIGlmIHByb3ZpZGVkXG5cdFx0aWYgKCAhcHJldiAmJiBpc1N1Y2Nlc3MgJiYgcy5kYXRhRmlsdGVyICkge1xuXHRcdFx0cmVzcG9uc2UgPSBzLmRhdGFGaWx0ZXIoIHJlc3BvbnNlLCBzLmRhdGFUeXBlICk7XG5cdFx0fVxuXG5cdFx0cHJldiA9IGN1cnJlbnQ7XG5cdFx0Y3VycmVudCA9IGRhdGFUeXBlcy5zaGlmdCgpO1xuXG5cdFx0aWYgKCBjdXJyZW50ICkge1xuXG5cdFx0Ly8gVGhlcmUncyBvbmx5IHdvcmsgdG8gZG8gaWYgY3VycmVudCBkYXRhVHlwZSBpcyBub24tYXV0b1xuXHRcdFx0aWYgKCBjdXJyZW50ID09PSBcIipcIiApIHtcblxuXHRcdFx0XHRjdXJyZW50ID0gcHJldjtcblxuXHRcdFx0Ly8gQ29udmVydCByZXNwb25zZSBpZiBwcmV2IGRhdGFUeXBlIGlzIG5vbi1hdXRvIGFuZCBkaWZmZXJzIGZyb20gY3VycmVudFxuXHRcdFx0fSBlbHNlIGlmICggcHJldiAhPT0gXCIqXCIgJiYgcHJldiAhPT0gY3VycmVudCApIHtcblxuXHRcdFx0XHQvLyBTZWVrIGEgZGlyZWN0IGNvbnZlcnRlclxuXHRcdFx0XHRjb252ID0gY29udmVydGVyc1sgcHJldiArIFwiIFwiICsgY3VycmVudCBdIHx8IGNvbnZlcnRlcnNbIFwiKiBcIiArIGN1cnJlbnQgXTtcblxuXHRcdFx0XHQvLyBJZiBub25lIGZvdW5kLCBzZWVrIGEgcGFpclxuXHRcdFx0XHRpZiAoICFjb252ICkge1xuXHRcdFx0XHRcdGZvciAoIGNvbnYyIGluIGNvbnZlcnRlcnMgKSB7XG5cblx0XHRcdFx0XHRcdC8vIElmIGNvbnYyIG91dHB1dHMgY3VycmVudFxuXHRcdFx0XHRcdFx0dG1wID0gY29udjIuc3BsaXQoIFwiIFwiICk7XG5cdFx0XHRcdFx0XHRpZiAoIHRtcFsgMSBdID09PSBjdXJyZW50ICkge1xuXG5cdFx0XHRcdFx0XHRcdC8vIElmIHByZXYgY2FuIGJlIGNvbnZlcnRlZCB0byBhY2NlcHRlZCBpbnB1dFxuXHRcdFx0XHRcdFx0XHRjb252ID0gY29udmVydGVyc1sgcHJldiArIFwiIFwiICsgdG1wWyAwIF0gXSB8fFxuXHRcdFx0XHRcdFx0XHRcdGNvbnZlcnRlcnNbIFwiKiBcIiArIHRtcFsgMCBdIF07XG5cdFx0XHRcdFx0XHRcdGlmICggY29udiApIHtcblx0XHRcdFx0XHRcdFx0XHQvLyBDb25kZW5zZSBlcXVpdmFsZW5jZSBjb252ZXJ0ZXJzXG5cdFx0XHRcdFx0XHRcdFx0aWYgKCBjb252ID09PSB0cnVlICkge1xuXHRcdFx0XHRcdFx0XHRcdFx0Y29udiA9IGNvbnZlcnRlcnNbIGNvbnYyIF07XG5cblx0XHRcdFx0XHRcdFx0XHQvLyBPdGhlcndpc2UsIGluc2VydCB0aGUgaW50ZXJtZWRpYXRlIGRhdGFUeXBlXG5cdFx0XHRcdFx0XHRcdFx0fSBlbHNlIGlmICggY29udmVydGVyc1sgY29udjIgXSAhPT0gdHJ1ZSApIHtcblx0XHRcdFx0XHRcdFx0XHRcdGN1cnJlbnQgPSB0bXBbIDAgXTtcblx0XHRcdFx0XHRcdFx0XHRcdGRhdGFUeXBlcy51bnNoaWZ0KCB0bXBbIDEgXSApO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIEFwcGx5IGNvbnZlcnRlciAoaWYgbm90IGFuIGVxdWl2YWxlbmNlKVxuXHRcdFx0XHRpZiAoIGNvbnYgIT09IHRydWUgKSB7XG5cblx0XHRcdFx0XHQvLyBVbmxlc3MgZXJyb3JzIGFyZSBhbGxvd2VkIHRvIGJ1YmJsZSwgY2F0Y2ggYW5kIHJldHVybiB0aGVtXG5cdFx0XHRcdFx0aWYgKCBjb252ICYmIHNbIFwidGhyb3dzXCIgXSApIHtcblx0XHRcdFx0XHRcdHJlc3BvbnNlID0gY29udiggcmVzcG9uc2UgKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRcdFx0cmVzcG9uc2UgPSBjb252KCByZXNwb25zZSApO1xuXHRcdFx0XHRcdFx0fSBjYXRjaCAoIGUgKSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiB7IHN0YXRlOiBcInBhcnNlcmVycm9yXCIsIGVycm9yOiBjb252ID8gZSA6IFwiTm8gY29udmVyc2lvbiBmcm9tIFwiICsgcHJldiArIFwiIHRvIFwiICsgY3VycmVudCB9O1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiB7IHN0YXRlOiBcInN1Y2Nlc3NcIiwgZGF0YTogcmVzcG9uc2UgfTtcbn1cblxualF1ZXJ5LmV4dGVuZCh7XG5cblx0Ly8gQ291bnRlciBmb3IgaG9sZGluZyB0aGUgbnVtYmVyIG9mIGFjdGl2ZSBxdWVyaWVzXG5cdGFjdGl2ZTogMCxcblxuXHQvLyBMYXN0LU1vZGlmaWVkIGhlYWRlciBjYWNoZSBmb3IgbmV4dCByZXF1ZXN0XG5cdGxhc3RNb2RpZmllZDoge30sXG5cdGV0YWc6IHt9LFxuXG5cdGFqYXhTZXR0aW5nczoge1xuXHRcdHVybDogYWpheExvY2F0aW9uLFxuXHRcdHR5cGU6IFwiR0VUXCIsXG5cdFx0aXNMb2NhbDogcmxvY2FsUHJvdG9jb2wudGVzdCggYWpheExvY1BhcnRzWyAxIF0gKSxcblx0XHRnbG9iYWw6IHRydWUsXG5cdFx0cHJvY2Vzc0RhdGE6IHRydWUsXG5cdFx0YXN5bmM6IHRydWUsXG5cdFx0Y29udGVudFR5cGU6IFwiYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkOyBjaGFyc2V0PVVURi04XCIsXG5cdFx0Lypcblx0XHR0aW1lb3V0OiAwLFxuXHRcdGRhdGE6IG51bGwsXG5cdFx0ZGF0YVR5cGU6IG51bGwsXG5cdFx0dXNlcm5hbWU6IG51bGwsXG5cdFx0cGFzc3dvcmQ6IG51bGwsXG5cdFx0Y2FjaGU6IG51bGwsXG5cdFx0dGhyb3dzOiBmYWxzZSxcblx0XHR0cmFkaXRpb25hbDogZmFsc2UsXG5cdFx0aGVhZGVyczoge30sXG5cdFx0Ki9cblxuXHRcdGFjY2VwdHM6IHtcblx0XHRcdFwiKlwiOiBhbGxUeXBlcyxcblx0XHRcdHRleHQ6IFwidGV4dC9wbGFpblwiLFxuXHRcdFx0aHRtbDogXCJ0ZXh0L2h0bWxcIixcblx0XHRcdHhtbDogXCJhcHBsaWNhdGlvbi94bWwsIHRleHQveG1sXCIsXG5cdFx0XHRqc29uOiBcImFwcGxpY2F0aW9uL2pzb24sIHRleHQvamF2YXNjcmlwdFwiXG5cdFx0fSxcblxuXHRcdGNvbnRlbnRzOiB7XG5cdFx0XHR4bWw6IC94bWwvLFxuXHRcdFx0aHRtbDogL2h0bWwvLFxuXHRcdFx0anNvbjogL2pzb24vXG5cdFx0fSxcblxuXHRcdHJlc3BvbnNlRmllbGRzOiB7XG5cdFx0XHR4bWw6IFwicmVzcG9uc2VYTUxcIixcblx0XHRcdHRleHQ6IFwicmVzcG9uc2VUZXh0XCIsXG5cdFx0XHRqc29uOiBcInJlc3BvbnNlSlNPTlwiXG5cdFx0fSxcblxuXHRcdC8vIERhdGEgY29udmVydGVyc1xuXHRcdC8vIEtleXMgc2VwYXJhdGUgc291cmNlIChvciBjYXRjaGFsbCBcIipcIikgYW5kIGRlc3RpbmF0aW9uIHR5cGVzIHdpdGggYSBzaW5nbGUgc3BhY2Vcblx0XHRjb252ZXJ0ZXJzOiB7XG5cblx0XHRcdC8vIENvbnZlcnQgYW55dGhpbmcgdG8gdGV4dFxuXHRcdFx0XCIqIHRleHRcIjogU3RyaW5nLFxuXG5cdFx0XHQvLyBUZXh0IHRvIGh0bWwgKHRydWUgPSBubyB0cmFuc2Zvcm1hdGlvbilcblx0XHRcdFwidGV4dCBodG1sXCI6IHRydWUsXG5cblx0XHRcdC8vIEV2YWx1YXRlIHRleHQgYXMgYSBqc29uIGV4cHJlc3Npb25cblx0XHRcdFwidGV4dCBqc29uXCI6IGpRdWVyeS5wYXJzZUpTT04sXG5cblx0XHRcdC8vIFBhcnNlIHRleHQgYXMgeG1sXG5cdFx0XHRcInRleHQgeG1sXCI6IGpRdWVyeS5wYXJzZVhNTFxuXHRcdH0sXG5cblx0XHQvLyBGb3Igb3B0aW9ucyB0aGF0IHNob3VsZG4ndCBiZSBkZWVwIGV4dGVuZGVkOlxuXHRcdC8vIHlvdSBjYW4gYWRkIHlvdXIgb3duIGN1c3RvbSBvcHRpb25zIGhlcmUgaWZcblx0XHQvLyBhbmQgd2hlbiB5b3UgY3JlYXRlIG9uZSB0aGF0IHNob3VsZG4ndCBiZVxuXHRcdC8vIGRlZXAgZXh0ZW5kZWQgKHNlZSBhamF4RXh0ZW5kKVxuXHRcdGZsYXRPcHRpb25zOiB7XG5cdFx0XHR1cmw6IHRydWUsXG5cdFx0XHRjb250ZXh0OiB0cnVlXG5cdFx0fVxuXHR9LFxuXG5cdC8vIENyZWF0ZXMgYSBmdWxsIGZsZWRnZWQgc2V0dGluZ3Mgb2JqZWN0IGludG8gdGFyZ2V0XG5cdC8vIHdpdGggYm90aCBhamF4U2V0dGluZ3MgYW5kIHNldHRpbmdzIGZpZWxkcy5cblx0Ly8gSWYgdGFyZ2V0IGlzIG9taXR0ZWQsIHdyaXRlcyBpbnRvIGFqYXhTZXR0aW5ncy5cblx0YWpheFNldHVwOiBmdW5jdGlvbiggdGFyZ2V0LCBzZXR0aW5ncyApIHtcblx0XHRyZXR1cm4gc2V0dGluZ3MgP1xuXG5cdFx0XHQvLyBCdWlsZGluZyBhIHNldHRpbmdzIG9iamVjdFxuXHRcdFx0YWpheEV4dGVuZCggYWpheEV4dGVuZCggdGFyZ2V0LCBqUXVlcnkuYWpheFNldHRpbmdzICksIHNldHRpbmdzICkgOlxuXG5cdFx0XHQvLyBFeHRlbmRpbmcgYWpheFNldHRpbmdzXG5cdFx0XHRhamF4RXh0ZW5kKCBqUXVlcnkuYWpheFNldHRpbmdzLCB0YXJnZXQgKTtcblx0fSxcblxuXHRhamF4UHJlZmlsdGVyOiBhZGRUb1ByZWZpbHRlcnNPclRyYW5zcG9ydHMoIHByZWZpbHRlcnMgKSxcblx0YWpheFRyYW5zcG9ydDogYWRkVG9QcmVmaWx0ZXJzT3JUcmFuc3BvcnRzKCB0cmFuc3BvcnRzICksXG5cblx0Ly8gTWFpbiBtZXRob2Rcblx0YWpheDogZnVuY3Rpb24oIHVybCwgb3B0aW9ucyApIHtcblxuXHRcdC8vIElmIHVybCBpcyBhbiBvYmplY3QsIHNpbXVsYXRlIHByZS0xLjUgc2lnbmF0dXJlXG5cdFx0aWYgKCB0eXBlb2YgdXJsID09PSBcIm9iamVjdFwiICkge1xuXHRcdFx0b3B0aW9ucyA9IHVybDtcblx0XHRcdHVybCA9IHVuZGVmaW5lZDtcblx0XHR9XG5cblx0XHQvLyBGb3JjZSBvcHRpb25zIHRvIGJlIGFuIG9iamVjdFxuXHRcdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG5cdFx0dmFyIHRyYW5zcG9ydCxcblx0XHRcdC8vIFVSTCB3aXRob3V0IGFudGktY2FjaGUgcGFyYW1cblx0XHRcdGNhY2hlVVJMLFxuXHRcdFx0Ly8gUmVzcG9uc2UgaGVhZGVyc1xuXHRcdFx0cmVzcG9uc2VIZWFkZXJzU3RyaW5nLFxuXHRcdFx0cmVzcG9uc2VIZWFkZXJzLFxuXHRcdFx0Ly8gdGltZW91dCBoYW5kbGVcblx0XHRcdHRpbWVvdXRUaW1lcixcblx0XHRcdC8vIENyb3NzLWRvbWFpbiBkZXRlY3Rpb24gdmFyc1xuXHRcdFx0cGFydHMsXG5cdFx0XHQvLyBUbyBrbm93IGlmIGdsb2JhbCBldmVudHMgYXJlIHRvIGJlIGRpc3BhdGNoZWRcblx0XHRcdGZpcmVHbG9iYWxzLFxuXHRcdFx0Ly8gTG9vcCB2YXJpYWJsZVxuXHRcdFx0aSxcblx0XHRcdC8vIENyZWF0ZSB0aGUgZmluYWwgb3B0aW9ucyBvYmplY3Rcblx0XHRcdHMgPSBqUXVlcnkuYWpheFNldHVwKCB7fSwgb3B0aW9ucyApLFxuXHRcdFx0Ly8gQ2FsbGJhY2tzIGNvbnRleHRcblx0XHRcdGNhbGxiYWNrQ29udGV4dCA9IHMuY29udGV4dCB8fCBzLFxuXHRcdFx0Ly8gQ29udGV4dCBmb3IgZ2xvYmFsIGV2ZW50cyBpcyBjYWxsYmFja0NvbnRleHQgaWYgaXQgaXMgYSBET00gbm9kZSBvciBqUXVlcnkgY29sbGVjdGlvblxuXHRcdFx0Z2xvYmFsRXZlbnRDb250ZXh0ID0gcy5jb250ZXh0ICYmICggY2FsbGJhY2tDb250ZXh0Lm5vZGVUeXBlIHx8IGNhbGxiYWNrQ29udGV4dC5qcXVlcnkgKSA/XG5cdFx0XHRcdGpRdWVyeSggY2FsbGJhY2tDb250ZXh0ICkgOlxuXHRcdFx0XHRqUXVlcnkuZXZlbnQsXG5cdFx0XHQvLyBEZWZlcnJlZHNcblx0XHRcdGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXG5cdFx0XHRjb21wbGV0ZURlZmVycmVkID0galF1ZXJ5LkNhbGxiYWNrcyhcIm9uY2UgbWVtb3J5XCIpLFxuXHRcdFx0Ly8gU3RhdHVzLWRlcGVuZGVudCBjYWxsYmFja3Ncblx0XHRcdHN0YXR1c0NvZGUgPSBzLnN0YXR1c0NvZGUgfHwge30sXG5cdFx0XHQvLyBIZWFkZXJzICh0aGV5IGFyZSBzZW50IGFsbCBhdCBvbmNlKVxuXHRcdFx0cmVxdWVzdEhlYWRlcnMgPSB7fSxcblx0XHRcdHJlcXVlc3RIZWFkZXJzTmFtZXMgPSB7fSxcblx0XHRcdC8vIFRoZSBqcVhIUiBzdGF0ZVxuXHRcdFx0c3RhdGUgPSAwLFxuXHRcdFx0Ly8gRGVmYXVsdCBhYm9ydCBtZXNzYWdlXG5cdFx0XHRzdHJBYm9ydCA9IFwiY2FuY2VsZWRcIixcblx0XHRcdC8vIEZha2UgeGhyXG5cdFx0XHRqcVhIUiA9IHtcblx0XHRcdFx0cmVhZHlTdGF0ZTogMCxcblxuXHRcdFx0XHQvLyBCdWlsZHMgaGVhZGVycyBoYXNodGFibGUgaWYgbmVlZGVkXG5cdFx0XHRcdGdldFJlc3BvbnNlSGVhZGVyOiBmdW5jdGlvbigga2V5ICkge1xuXHRcdFx0XHRcdHZhciBtYXRjaDtcblx0XHRcdFx0XHRpZiAoIHN0YXRlID09PSAyICkge1xuXHRcdFx0XHRcdFx0aWYgKCAhcmVzcG9uc2VIZWFkZXJzICkge1xuXHRcdFx0XHRcdFx0XHRyZXNwb25zZUhlYWRlcnMgPSB7fTtcblx0XHRcdFx0XHRcdFx0d2hpbGUgKCAobWF0Y2ggPSByaGVhZGVycy5leGVjKCByZXNwb25zZUhlYWRlcnNTdHJpbmcgKSkgKSB7XG5cdFx0XHRcdFx0XHRcdFx0cmVzcG9uc2VIZWFkZXJzWyBtYXRjaFsxXS50b0xvd2VyQ2FzZSgpIF0gPSBtYXRjaFsgMiBdO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRtYXRjaCA9IHJlc3BvbnNlSGVhZGVyc1sga2V5LnRvTG93ZXJDYXNlKCkgXTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuIG1hdGNoID09IG51bGwgPyBudWxsIDogbWF0Y2g7XG5cdFx0XHRcdH0sXG5cblx0XHRcdFx0Ly8gUmF3IHN0cmluZ1xuXHRcdFx0XHRnZXRBbGxSZXNwb25zZUhlYWRlcnM6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdHJldHVybiBzdGF0ZSA9PT0gMiA/IHJlc3BvbnNlSGVhZGVyc1N0cmluZyA6IG51bGw7XG5cdFx0XHRcdH0sXG5cblx0XHRcdFx0Ly8gQ2FjaGVzIHRoZSBoZWFkZXJcblx0XHRcdFx0c2V0UmVxdWVzdEhlYWRlcjogZnVuY3Rpb24oIG5hbWUsIHZhbHVlICkge1xuXHRcdFx0XHRcdHZhciBsbmFtZSA9IG5hbWUudG9Mb3dlckNhc2UoKTtcblx0XHRcdFx0XHRpZiAoICFzdGF0ZSApIHtcblx0XHRcdFx0XHRcdG5hbWUgPSByZXF1ZXN0SGVhZGVyc05hbWVzWyBsbmFtZSBdID0gcmVxdWVzdEhlYWRlcnNOYW1lc1sgbG5hbWUgXSB8fCBuYW1lO1xuXHRcdFx0XHRcdFx0cmVxdWVzdEhlYWRlcnNbIG5hbWUgXSA9IHZhbHVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdFx0fSxcblxuXHRcdFx0XHQvLyBPdmVycmlkZXMgcmVzcG9uc2UgY29udGVudC10eXBlIGhlYWRlclxuXHRcdFx0XHRvdmVycmlkZU1pbWVUeXBlOiBmdW5jdGlvbiggdHlwZSApIHtcblx0XHRcdFx0XHRpZiAoICFzdGF0ZSApIHtcblx0XHRcdFx0XHRcdHMubWltZVR5cGUgPSB0eXBlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdFx0fSxcblxuXHRcdFx0XHQvLyBTdGF0dXMtZGVwZW5kZW50IGNhbGxiYWNrc1xuXHRcdFx0XHRzdGF0dXNDb2RlOiBmdW5jdGlvbiggbWFwICkge1xuXHRcdFx0XHRcdHZhciBjb2RlO1xuXHRcdFx0XHRcdGlmICggbWFwICkge1xuXHRcdFx0XHRcdFx0aWYgKCBzdGF0ZSA8IDIgKSB7XG5cdFx0XHRcdFx0XHRcdGZvciAoIGNvZGUgaW4gbWFwICkge1xuXHRcdFx0XHRcdFx0XHRcdC8vIExhenktYWRkIHRoZSBuZXcgY2FsbGJhY2sgaW4gYSB3YXkgdGhhdCBwcmVzZXJ2ZXMgb2xkIG9uZXNcblx0XHRcdFx0XHRcdFx0XHRzdGF0dXNDb2RlWyBjb2RlIF0gPSBbIHN0YXR1c0NvZGVbIGNvZGUgXSwgbWFwWyBjb2RlIF0gXTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0Ly8gRXhlY3V0ZSB0aGUgYXBwcm9wcmlhdGUgY2FsbGJhY2tzXG5cdFx0XHRcdFx0XHRcdGpxWEhSLmFsd2F5cyggbWFwWyBqcVhIUi5zdGF0dXMgXSApO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdFx0fSxcblxuXHRcdFx0XHQvLyBDYW5jZWwgdGhlIHJlcXVlc3Rcblx0XHRcdFx0YWJvcnQ6IGZ1bmN0aW9uKCBzdGF0dXNUZXh0ICkge1xuXHRcdFx0XHRcdHZhciBmaW5hbFRleHQgPSBzdGF0dXNUZXh0IHx8IHN0ckFib3J0O1xuXHRcdFx0XHRcdGlmICggdHJhbnNwb3J0ICkge1xuXHRcdFx0XHRcdFx0dHJhbnNwb3J0LmFib3J0KCBmaW5hbFRleHQgKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZG9uZSggMCwgZmluYWxUZXh0ICk7XG5cdFx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cblx0XHQvLyBBdHRhY2ggZGVmZXJyZWRzXG5cdFx0ZGVmZXJyZWQucHJvbWlzZSgganFYSFIgKS5jb21wbGV0ZSA9IGNvbXBsZXRlRGVmZXJyZWQuYWRkO1xuXHRcdGpxWEhSLnN1Y2Nlc3MgPSBqcVhIUi5kb25lO1xuXHRcdGpxWEhSLmVycm9yID0ganFYSFIuZmFpbDtcblxuXHRcdC8vIFJlbW92ZSBoYXNoIGNoYXJhY3RlciAoIzc1MzE6IGFuZCBzdHJpbmcgcHJvbW90aW9uKVxuXHRcdC8vIEFkZCBwcm90b2NvbCBpZiBub3QgcHJvdmlkZWQgKHByZWZpbHRlcnMgbWlnaHQgZXhwZWN0IGl0KVxuXHRcdC8vIEhhbmRsZSBmYWxzeSB1cmwgaW4gdGhlIHNldHRpbmdzIG9iamVjdCAoIzEwMDkzOiBjb25zaXN0ZW5jeSB3aXRoIG9sZCBzaWduYXR1cmUpXG5cdFx0Ly8gV2UgYWxzbyB1c2UgdGhlIHVybCBwYXJhbWV0ZXIgaWYgYXZhaWxhYmxlXG5cdFx0cy51cmwgPSAoICggdXJsIHx8IHMudXJsIHx8IGFqYXhMb2NhdGlvbiApICsgXCJcIiApLnJlcGxhY2UoIHJoYXNoLCBcIlwiIClcblx0XHRcdC5yZXBsYWNlKCBycHJvdG9jb2wsIGFqYXhMb2NQYXJ0c1sgMSBdICsgXCIvL1wiICk7XG5cblx0XHQvLyBBbGlhcyBtZXRob2Qgb3B0aW9uIHRvIHR5cGUgYXMgcGVyIHRpY2tldCAjMTIwMDRcblx0XHRzLnR5cGUgPSBvcHRpb25zLm1ldGhvZCB8fCBvcHRpb25zLnR5cGUgfHwgcy5tZXRob2QgfHwgcy50eXBlO1xuXG5cdFx0Ly8gRXh0cmFjdCBkYXRhVHlwZXMgbGlzdFxuXHRcdHMuZGF0YVR5cGVzID0galF1ZXJ5LnRyaW0oIHMuZGF0YVR5cGUgfHwgXCIqXCIgKS50b0xvd2VyQ2FzZSgpLm1hdGNoKCBybm90d2hpdGUgKSB8fCBbIFwiXCIgXTtcblxuXHRcdC8vIEEgY3Jvc3MtZG9tYWluIHJlcXVlc3QgaXMgaW4gb3JkZXIgd2hlbiB3ZSBoYXZlIGEgcHJvdG9jb2w6aG9zdDpwb3J0IG1pc21hdGNoXG5cdFx0aWYgKCBzLmNyb3NzRG9tYWluID09IG51bGwgKSB7XG5cdFx0XHRwYXJ0cyA9IHJ1cmwuZXhlYyggcy51cmwudG9Mb3dlckNhc2UoKSApO1xuXHRcdFx0cy5jcm9zc0RvbWFpbiA9ICEhKCBwYXJ0cyAmJlxuXHRcdFx0XHQoIHBhcnRzWyAxIF0gIT09IGFqYXhMb2NQYXJ0c1sgMSBdIHx8IHBhcnRzWyAyIF0gIT09IGFqYXhMb2NQYXJ0c1sgMiBdIHx8XG5cdFx0XHRcdFx0KCBwYXJ0c1sgMyBdIHx8ICggcGFydHNbIDEgXSA9PT0gXCJodHRwOlwiID8gXCI4MFwiIDogXCI0NDNcIiApICkgIT09XG5cdFx0XHRcdFx0XHQoIGFqYXhMb2NQYXJ0c1sgMyBdIHx8ICggYWpheExvY1BhcnRzWyAxIF0gPT09IFwiaHR0cDpcIiA/IFwiODBcIiA6IFwiNDQzXCIgKSApIClcblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0Ly8gQ29udmVydCBkYXRhIGlmIG5vdCBhbHJlYWR5IGEgc3RyaW5nXG5cdFx0aWYgKCBzLmRhdGEgJiYgcy5wcm9jZXNzRGF0YSAmJiB0eXBlb2Ygcy5kYXRhICE9PSBcInN0cmluZ1wiICkge1xuXHRcdFx0cy5kYXRhID0galF1ZXJ5LnBhcmFtKCBzLmRhdGEsIHMudHJhZGl0aW9uYWwgKTtcblx0XHR9XG5cblx0XHQvLyBBcHBseSBwcmVmaWx0ZXJzXG5cdFx0aW5zcGVjdFByZWZpbHRlcnNPclRyYW5zcG9ydHMoIHByZWZpbHRlcnMsIHMsIG9wdGlvbnMsIGpxWEhSICk7XG5cblx0XHQvLyBJZiByZXF1ZXN0IHdhcyBhYm9ydGVkIGluc2lkZSBhIHByZWZpbHRlciwgc3RvcCB0aGVyZVxuXHRcdGlmICggc3RhdGUgPT09IDIgKSB7XG5cdFx0XHRyZXR1cm4ganFYSFI7XG5cdFx0fVxuXG5cdFx0Ly8gV2UgY2FuIGZpcmUgZ2xvYmFsIGV2ZW50cyBhcyBvZiBub3cgaWYgYXNrZWQgdG9cblx0XHQvLyBEb24ndCBmaXJlIGV2ZW50cyBpZiBqUXVlcnkuZXZlbnQgaXMgdW5kZWZpbmVkIGluIGFuIEFNRC11c2FnZSBzY2VuYXJpbyAoIzE1MTE4KVxuXHRcdGZpcmVHbG9iYWxzID0galF1ZXJ5LmV2ZW50ICYmIHMuZ2xvYmFsO1xuXG5cdFx0Ly8gV2F0Y2ggZm9yIGEgbmV3IHNldCBvZiByZXF1ZXN0c1xuXHRcdGlmICggZmlyZUdsb2JhbHMgJiYgalF1ZXJ5LmFjdGl2ZSsrID09PSAwICkge1xuXHRcdFx0alF1ZXJ5LmV2ZW50LnRyaWdnZXIoXCJhamF4U3RhcnRcIik7XG5cdFx0fVxuXG5cdFx0Ly8gVXBwZXJjYXNlIHRoZSB0eXBlXG5cdFx0cy50eXBlID0gcy50eXBlLnRvVXBwZXJDYXNlKCk7XG5cblx0XHQvLyBEZXRlcm1pbmUgaWYgcmVxdWVzdCBoYXMgY29udGVudFxuXHRcdHMuaGFzQ29udGVudCA9ICFybm9Db250ZW50LnRlc3QoIHMudHlwZSApO1xuXG5cdFx0Ly8gU2F2ZSB0aGUgVVJMIGluIGNhc2Ugd2UncmUgdG95aW5nIHdpdGggdGhlIElmLU1vZGlmaWVkLVNpbmNlXG5cdFx0Ly8gYW5kL29yIElmLU5vbmUtTWF0Y2ggaGVhZGVyIGxhdGVyIG9uXG5cdFx0Y2FjaGVVUkwgPSBzLnVybDtcblxuXHRcdC8vIE1vcmUgb3B0aW9ucyBoYW5kbGluZyBmb3IgcmVxdWVzdHMgd2l0aCBubyBjb250ZW50XG5cdFx0aWYgKCAhcy5oYXNDb250ZW50ICkge1xuXG5cdFx0XHQvLyBJZiBkYXRhIGlzIGF2YWlsYWJsZSwgYXBwZW5kIGRhdGEgdG8gdXJsXG5cdFx0XHRpZiAoIHMuZGF0YSApIHtcblx0XHRcdFx0Y2FjaGVVUkwgPSAoIHMudXJsICs9ICggcnF1ZXJ5LnRlc3QoIGNhY2hlVVJMICkgPyBcIiZcIiA6IFwiP1wiICkgKyBzLmRhdGEgKTtcblx0XHRcdFx0Ly8gIzk2ODI6IHJlbW92ZSBkYXRhIHNvIHRoYXQgaXQncyBub3QgdXNlZCBpbiBhbiBldmVudHVhbCByZXRyeVxuXHRcdFx0XHRkZWxldGUgcy5kYXRhO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBBZGQgYW50aS1jYWNoZSBpbiB1cmwgaWYgbmVlZGVkXG5cdFx0XHRpZiAoIHMuY2FjaGUgPT09IGZhbHNlICkge1xuXHRcdFx0XHRzLnVybCA9IHJ0cy50ZXN0KCBjYWNoZVVSTCApID9cblxuXHRcdFx0XHRcdC8vIElmIHRoZXJlIGlzIGFscmVhZHkgYSAnXycgcGFyYW1ldGVyLCBzZXQgaXRzIHZhbHVlXG5cdFx0XHRcdFx0Y2FjaGVVUkwucmVwbGFjZSggcnRzLCBcIiQxXz1cIiArIG5vbmNlKysgKSA6XG5cblx0XHRcdFx0XHQvLyBPdGhlcndpc2UgYWRkIG9uZSB0byB0aGUgZW5kXG5cdFx0XHRcdFx0Y2FjaGVVUkwgKyAoIHJxdWVyeS50ZXN0KCBjYWNoZVVSTCApID8gXCImXCIgOiBcIj9cIiApICsgXCJfPVwiICsgbm9uY2UrKztcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBTZXQgdGhlIElmLU1vZGlmaWVkLVNpbmNlIGFuZC9vciBJZi1Ob25lLU1hdGNoIGhlYWRlciwgaWYgaW4gaWZNb2RpZmllZCBtb2RlLlxuXHRcdGlmICggcy5pZk1vZGlmaWVkICkge1xuXHRcdFx0aWYgKCBqUXVlcnkubGFzdE1vZGlmaWVkWyBjYWNoZVVSTCBdICkge1xuXHRcdFx0XHRqcVhIUi5zZXRSZXF1ZXN0SGVhZGVyKCBcIklmLU1vZGlmaWVkLVNpbmNlXCIsIGpRdWVyeS5sYXN0TW9kaWZpZWRbIGNhY2hlVVJMIF0gKTtcblx0XHRcdH1cblx0XHRcdGlmICggalF1ZXJ5LmV0YWdbIGNhY2hlVVJMIF0gKSB7XG5cdFx0XHRcdGpxWEhSLnNldFJlcXVlc3RIZWFkZXIoIFwiSWYtTm9uZS1NYXRjaFwiLCBqUXVlcnkuZXRhZ1sgY2FjaGVVUkwgXSApO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIFNldCB0aGUgY29ycmVjdCBoZWFkZXIsIGlmIGRhdGEgaXMgYmVpbmcgc2VudFxuXHRcdGlmICggcy5kYXRhICYmIHMuaGFzQ29udGVudCAmJiBzLmNvbnRlbnRUeXBlICE9PSBmYWxzZSB8fCBvcHRpb25zLmNvbnRlbnRUeXBlICkge1xuXHRcdFx0anFYSFIuc2V0UmVxdWVzdEhlYWRlciggXCJDb250ZW50LVR5cGVcIiwgcy5jb250ZW50VHlwZSApO1xuXHRcdH1cblxuXHRcdC8vIFNldCB0aGUgQWNjZXB0cyBoZWFkZXIgZm9yIHRoZSBzZXJ2ZXIsIGRlcGVuZGluZyBvbiB0aGUgZGF0YVR5cGVcblx0XHRqcVhIUi5zZXRSZXF1ZXN0SGVhZGVyKFxuXHRcdFx0XCJBY2NlcHRcIixcblx0XHRcdHMuZGF0YVR5cGVzWyAwIF0gJiYgcy5hY2NlcHRzWyBzLmRhdGFUeXBlc1swXSBdID9cblx0XHRcdFx0cy5hY2NlcHRzWyBzLmRhdGFUeXBlc1swXSBdICsgKCBzLmRhdGFUeXBlc1sgMCBdICE9PSBcIipcIiA/IFwiLCBcIiArIGFsbFR5cGVzICsgXCI7IHE9MC4wMVwiIDogXCJcIiApIDpcblx0XHRcdFx0cy5hY2NlcHRzWyBcIipcIiBdXG5cdFx0KTtcblxuXHRcdC8vIENoZWNrIGZvciBoZWFkZXJzIG9wdGlvblxuXHRcdGZvciAoIGkgaW4gcy5oZWFkZXJzICkge1xuXHRcdFx0anFYSFIuc2V0UmVxdWVzdEhlYWRlciggaSwgcy5oZWFkZXJzWyBpIF0gKTtcblx0XHR9XG5cblx0XHQvLyBBbGxvdyBjdXN0b20gaGVhZGVycy9taW1ldHlwZXMgYW5kIGVhcmx5IGFib3J0XG5cdFx0aWYgKCBzLmJlZm9yZVNlbmQgJiYgKCBzLmJlZm9yZVNlbmQuY2FsbCggY2FsbGJhY2tDb250ZXh0LCBqcVhIUiwgcyApID09PSBmYWxzZSB8fCBzdGF0ZSA9PT0gMiApICkge1xuXHRcdFx0Ly8gQWJvcnQgaWYgbm90IGRvbmUgYWxyZWFkeSBhbmQgcmV0dXJuXG5cdFx0XHRyZXR1cm4ganFYSFIuYWJvcnQoKTtcblx0XHR9XG5cblx0XHQvLyBBYm9ydGluZyBpcyBubyBsb25nZXIgYSBjYW5jZWxsYXRpb25cblx0XHRzdHJBYm9ydCA9IFwiYWJvcnRcIjtcblxuXHRcdC8vIEluc3RhbGwgY2FsbGJhY2tzIG9uIGRlZmVycmVkc1xuXHRcdGZvciAoIGkgaW4geyBzdWNjZXNzOiAxLCBlcnJvcjogMSwgY29tcGxldGU6IDEgfSApIHtcblx0XHRcdGpxWEhSWyBpIF0oIHNbIGkgXSApO1xuXHRcdH1cblxuXHRcdC8vIEdldCB0cmFuc3BvcnRcblx0XHR0cmFuc3BvcnQgPSBpbnNwZWN0UHJlZmlsdGVyc09yVHJhbnNwb3J0cyggdHJhbnNwb3J0cywgcywgb3B0aW9ucywganFYSFIgKTtcblxuXHRcdC8vIElmIG5vIHRyYW5zcG9ydCwgd2UgYXV0by1hYm9ydFxuXHRcdGlmICggIXRyYW5zcG9ydCApIHtcblx0XHRcdGRvbmUoIC0xLCBcIk5vIFRyYW5zcG9ydFwiICk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGpxWEhSLnJlYWR5U3RhdGUgPSAxO1xuXG5cdFx0XHQvLyBTZW5kIGdsb2JhbCBldmVudFxuXHRcdFx0aWYgKCBmaXJlR2xvYmFscyApIHtcblx0XHRcdFx0Z2xvYmFsRXZlbnRDb250ZXh0LnRyaWdnZXIoIFwiYWpheFNlbmRcIiwgWyBqcVhIUiwgcyBdICk7XG5cdFx0XHR9XG5cdFx0XHQvLyBUaW1lb3V0XG5cdFx0XHRpZiAoIHMuYXN5bmMgJiYgcy50aW1lb3V0ID4gMCApIHtcblx0XHRcdFx0dGltZW91dFRpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRqcVhIUi5hYm9ydChcInRpbWVvdXRcIik7XG5cdFx0XHRcdH0sIHMudGltZW91dCApO1xuXHRcdFx0fVxuXG5cdFx0XHR0cnkge1xuXHRcdFx0XHRzdGF0ZSA9IDE7XG5cdFx0XHRcdHRyYW5zcG9ydC5zZW5kKCByZXF1ZXN0SGVhZGVycywgZG9uZSApO1xuXHRcdFx0fSBjYXRjaCAoIGUgKSB7XG5cdFx0XHRcdC8vIFByb3BhZ2F0ZSBleGNlcHRpb24gYXMgZXJyb3IgaWYgbm90IGRvbmVcblx0XHRcdFx0aWYgKCBzdGF0ZSA8IDIgKSB7XG5cdFx0XHRcdFx0ZG9uZSggLTEsIGUgKTtcblx0XHRcdFx0Ly8gU2ltcGx5IHJldGhyb3cgb3RoZXJ3aXNlXG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhyb3cgZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIENhbGxiYWNrIGZvciB3aGVuIGV2ZXJ5dGhpbmcgaXMgZG9uZVxuXHRcdGZ1bmN0aW9uIGRvbmUoIHN0YXR1cywgbmF0aXZlU3RhdHVzVGV4dCwgcmVzcG9uc2VzLCBoZWFkZXJzICkge1xuXHRcdFx0dmFyIGlzU3VjY2Vzcywgc3VjY2VzcywgZXJyb3IsIHJlc3BvbnNlLCBtb2RpZmllZCxcblx0XHRcdFx0c3RhdHVzVGV4dCA9IG5hdGl2ZVN0YXR1c1RleHQ7XG5cblx0XHRcdC8vIENhbGxlZCBvbmNlXG5cdFx0XHRpZiAoIHN0YXRlID09PSAyICkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdC8vIFN0YXRlIGlzIFwiZG9uZVwiIG5vd1xuXHRcdFx0c3RhdGUgPSAyO1xuXG5cdFx0XHQvLyBDbGVhciB0aW1lb3V0IGlmIGl0IGV4aXN0c1xuXHRcdFx0aWYgKCB0aW1lb3V0VGltZXIgKSB7XG5cdFx0XHRcdGNsZWFyVGltZW91dCggdGltZW91dFRpbWVyICk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIERlcmVmZXJlbmNlIHRyYW5zcG9ydCBmb3IgZWFybHkgZ2FyYmFnZSBjb2xsZWN0aW9uXG5cdFx0XHQvLyAobm8gbWF0dGVyIGhvdyBsb25nIHRoZSBqcVhIUiBvYmplY3Qgd2lsbCBiZSB1c2VkKVxuXHRcdFx0dHJhbnNwb3J0ID0gdW5kZWZpbmVkO1xuXG5cdFx0XHQvLyBDYWNoZSByZXNwb25zZSBoZWFkZXJzXG5cdFx0XHRyZXNwb25zZUhlYWRlcnNTdHJpbmcgPSBoZWFkZXJzIHx8IFwiXCI7XG5cblx0XHRcdC8vIFNldCByZWFkeVN0YXRlXG5cdFx0XHRqcVhIUi5yZWFkeVN0YXRlID0gc3RhdHVzID4gMCA/IDQgOiAwO1xuXG5cdFx0XHQvLyBEZXRlcm1pbmUgaWYgc3VjY2Vzc2Z1bFxuXHRcdFx0aXNTdWNjZXNzID0gc3RhdHVzID49IDIwMCAmJiBzdGF0dXMgPCAzMDAgfHwgc3RhdHVzID09PSAzMDQ7XG5cblx0XHRcdC8vIEdldCByZXNwb25zZSBkYXRhXG5cdFx0XHRpZiAoIHJlc3BvbnNlcyApIHtcblx0XHRcdFx0cmVzcG9uc2UgPSBhamF4SGFuZGxlUmVzcG9uc2VzKCBzLCBqcVhIUiwgcmVzcG9uc2VzICk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIENvbnZlcnQgbm8gbWF0dGVyIHdoYXQgKHRoYXQgd2F5IHJlc3BvbnNlWFhYIGZpZWxkcyBhcmUgYWx3YXlzIHNldClcblx0XHRcdHJlc3BvbnNlID0gYWpheENvbnZlcnQoIHMsIHJlc3BvbnNlLCBqcVhIUiwgaXNTdWNjZXNzICk7XG5cblx0XHRcdC8vIElmIHN1Y2Nlc3NmdWwsIGhhbmRsZSB0eXBlIGNoYWluaW5nXG5cdFx0XHRpZiAoIGlzU3VjY2VzcyApIHtcblxuXHRcdFx0XHQvLyBTZXQgdGhlIElmLU1vZGlmaWVkLVNpbmNlIGFuZC9vciBJZi1Ob25lLU1hdGNoIGhlYWRlciwgaWYgaW4gaWZNb2RpZmllZCBtb2RlLlxuXHRcdFx0XHRpZiAoIHMuaWZNb2RpZmllZCApIHtcblx0XHRcdFx0XHRtb2RpZmllZCA9IGpxWEhSLmdldFJlc3BvbnNlSGVhZGVyKFwiTGFzdC1Nb2RpZmllZFwiKTtcblx0XHRcdFx0XHRpZiAoIG1vZGlmaWVkICkge1xuXHRcdFx0XHRcdFx0alF1ZXJ5Lmxhc3RNb2RpZmllZFsgY2FjaGVVUkwgXSA9IG1vZGlmaWVkO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRtb2RpZmllZCA9IGpxWEhSLmdldFJlc3BvbnNlSGVhZGVyKFwiZXRhZ1wiKTtcblx0XHRcdFx0XHRpZiAoIG1vZGlmaWVkICkge1xuXHRcdFx0XHRcdFx0alF1ZXJ5LmV0YWdbIGNhY2hlVVJMIF0gPSBtb2RpZmllZDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBpZiBubyBjb250ZW50XG5cdFx0XHRcdGlmICggc3RhdHVzID09PSAyMDQgfHwgcy50eXBlID09PSBcIkhFQURcIiApIHtcblx0XHRcdFx0XHRzdGF0dXNUZXh0ID0gXCJub2NvbnRlbnRcIjtcblxuXHRcdFx0XHQvLyBpZiBub3QgbW9kaWZpZWRcblx0XHRcdFx0fSBlbHNlIGlmICggc3RhdHVzID09PSAzMDQgKSB7XG5cdFx0XHRcdFx0c3RhdHVzVGV4dCA9IFwibm90bW9kaWZpZWRcIjtcblxuXHRcdFx0XHQvLyBJZiB3ZSBoYXZlIGRhdGEsIGxldCdzIGNvbnZlcnQgaXRcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRzdGF0dXNUZXh0ID0gcmVzcG9uc2Uuc3RhdGU7XG5cdFx0XHRcdFx0c3VjY2VzcyA9IHJlc3BvbnNlLmRhdGE7XG5cdFx0XHRcdFx0ZXJyb3IgPSByZXNwb25zZS5lcnJvcjtcblx0XHRcdFx0XHRpc1N1Y2Nlc3MgPSAhZXJyb3I7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdC8vIEV4dHJhY3QgZXJyb3IgZnJvbSBzdGF0dXNUZXh0IGFuZCBub3JtYWxpemUgZm9yIG5vbi1hYm9ydHNcblx0XHRcdFx0ZXJyb3IgPSBzdGF0dXNUZXh0O1xuXHRcdFx0XHRpZiAoIHN0YXR1cyB8fCAhc3RhdHVzVGV4dCApIHtcblx0XHRcdFx0XHRzdGF0dXNUZXh0ID0gXCJlcnJvclwiO1xuXHRcdFx0XHRcdGlmICggc3RhdHVzIDwgMCApIHtcblx0XHRcdFx0XHRcdHN0YXR1cyA9IDA7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIFNldCBkYXRhIGZvciB0aGUgZmFrZSB4aHIgb2JqZWN0XG5cdFx0XHRqcVhIUi5zdGF0dXMgPSBzdGF0dXM7XG5cdFx0XHRqcVhIUi5zdGF0dXNUZXh0ID0gKCBuYXRpdmVTdGF0dXNUZXh0IHx8IHN0YXR1c1RleHQgKSArIFwiXCI7XG5cblx0XHRcdC8vIFN1Y2Nlc3MvRXJyb3Jcblx0XHRcdGlmICggaXNTdWNjZXNzICkge1xuXHRcdFx0XHRkZWZlcnJlZC5yZXNvbHZlV2l0aCggY2FsbGJhY2tDb250ZXh0LCBbIHN1Y2Nlc3MsIHN0YXR1c1RleHQsIGpxWEhSIF0gKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGRlZmVycmVkLnJlamVjdFdpdGgoIGNhbGxiYWNrQ29udGV4dCwgWyBqcVhIUiwgc3RhdHVzVGV4dCwgZXJyb3IgXSApO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBTdGF0dXMtZGVwZW5kZW50IGNhbGxiYWNrc1xuXHRcdFx0anFYSFIuc3RhdHVzQ29kZSggc3RhdHVzQ29kZSApO1xuXHRcdFx0c3RhdHVzQ29kZSA9IHVuZGVmaW5lZDtcblxuXHRcdFx0aWYgKCBmaXJlR2xvYmFscyApIHtcblx0XHRcdFx0Z2xvYmFsRXZlbnRDb250ZXh0LnRyaWdnZXIoIGlzU3VjY2VzcyA/IFwiYWpheFN1Y2Nlc3NcIiA6IFwiYWpheEVycm9yXCIsXG5cdFx0XHRcdFx0WyBqcVhIUiwgcywgaXNTdWNjZXNzID8gc3VjY2VzcyA6IGVycm9yIF0gKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gQ29tcGxldGVcblx0XHRcdGNvbXBsZXRlRGVmZXJyZWQuZmlyZVdpdGgoIGNhbGxiYWNrQ29udGV4dCwgWyBqcVhIUiwgc3RhdHVzVGV4dCBdICk7XG5cblx0XHRcdGlmICggZmlyZUdsb2JhbHMgKSB7XG5cdFx0XHRcdGdsb2JhbEV2ZW50Q29udGV4dC50cmlnZ2VyKCBcImFqYXhDb21wbGV0ZVwiLCBbIGpxWEhSLCBzIF0gKTtcblx0XHRcdFx0Ly8gSGFuZGxlIHRoZSBnbG9iYWwgQUpBWCBjb3VudGVyXG5cdFx0XHRcdGlmICggISggLS1qUXVlcnkuYWN0aXZlICkgKSB7XG5cdFx0XHRcdFx0alF1ZXJ5LmV2ZW50LnRyaWdnZXIoXCJhamF4U3RvcFwiKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBqcVhIUjtcblx0fSxcblxuXHRnZXRKU09OOiBmdW5jdGlvbiggdXJsLCBkYXRhLCBjYWxsYmFjayApIHtcblx0XHRyZXR1cm4galF1ZXJ5LmdldCggdXJsLCBkYXRhLCBjYWxsYmFjaywgXCJqc29uXCIgKTtcblx0fSxcblxuXHRnZXRTY3JpcHQ6IGZ1bmN0aW9uKCB1cmwsIGNhbGxiYWNrICkge1xuXHRcdHJldHVybiBqUXVlcnkuZ2V0KCB1cmwsIHVuZGVmaW5lZCwgY2FsbGJhY2ssIFwic2NyaXB0XCIgKTtcblx0fVxufSk7XG5cbmpRdWVyeS5lYWNoKCBbIFwiZ2V0XCIsIFwicG9zdFwiIF0sIGZ1bmN0aW9uKCBpLCBtZXRob2QgKSB7XG5cdGpRdWVyeVsgbWV0aG9kIF0gPSBmdW5jdGlvbiggdXJsLCBkYXRhLCBjYWxsYmFjaywgdHlwZSApIHtcblx0XHQvLyBTaGlmdCBhcmd1bWVudHMgaWYgZGF0YSBhcmd1bWVudCB3YXMgb21pdHRlZFxuXHRcdGlmICggalF1ZXJ5LmlzRnVuY3Rpb24oIGRhdGEgKSApIHtcblx0XHRcdHR5cGUgPSB0eXBlIHx8IGNhbGxiYWNrO1xuXHRcdFx0Y2FsbGJhY2sgPSBkYXRhO1xuXHRcdFx0ZGF0YSA9IHVuZGVmaW5lZDtcblx0XHR9XG5cblx0XHRyZXR1cm4galF1ZXJ5LmFqYXgoe1xuXHRcdFx0dXJsOiB1cmwsXG5cdFx0XHR0eXBlOiBtZXRob2QsXG5cdFx0XHRkYXRhVHlwZTogdHlwZSxcblx0XHRcdGRhdGE6IGRhdGEsXG5cdFx0XHRzdWNjZXNzOiBjYWxsYmFja1xuXHRcdH0pO1xuXHR9O1xufSk7XG5cbnJldHVybiBqUXVlcnk7XG59KTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2pxdWVyeS9zcmMvYWpheC5qc1xuICoqIG1vZHVsZSBpZCA9IDM2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJkZWZpbmUoW1xuXHRcIi4uLy4uL2NvcmVcIlxuXSwgZnVuY3Rpb24oIGpRdWVyeSApIHtcblx0cmV0dXJuIGpRdWVyeS5ub3coKTtcbn0pO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vanF1ZXJ5L3NyYy9hamF4L3Zhci9ub25jZS5qc1xuICoqIG1vZHVsZSBpZCA9IDM3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJkZWZpbmUoZnVuY3Rpb24oKSB7XG5cdHJldHVybiAoL1xcPy8pO1xufSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9qcXVlcnkvc3JjL2FqYXgvdmFyL3JxdWVyeS5qc1xuICoqIG1vZHVsZSBpZCA9IDM4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJkZWZpbmUoW1xuXHRcIi4uL2NvcmVcIlxuXSwgZnVuY3Rpb24oIGpRdWVyeSApIHtcblxuLy8gU3VwcG9ydDogQW5kcm9pZCAyLjNcbi8vIFdvcmthcm91bmQgZmFpbHVyZSB0byBzdHJpbmctY2FzdCBudWxsIGlucHV0XG5qUXVlcnkucGFyc2VKU09OID0gZnVuY3Rpb24oIGRhdGEgKSB7XG5cdHJldHVybiBKU09OLnBhcnNlKCBkYXRhICsgXCJcIiApO1xufTtcblxucmV0dXJuIGpRdWVyeS5wYXJzZUpTT047XG5cbn0pO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vanF1ZXJ5L3NyYy9hamF4L3BhcnNlSlNPTi5qc1xuICoqIG1vZHVsZSBpZCA9IDM5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJkZWZpbmUoW1xuXHRcIi4uL2NvcmVcIlxuXSwgZnVuY3Rpb24oIGpRdWVyeSApIHtcblxuLy8gQ3Jvc3MtYnJvd3NlciB4bWwgcGFyc2luZ1xualF1ZXJ5LnBhcnNlWE1MID0gZnVuY3Rpb24oIGRhdGEgKSB7XG5cdHZhciB4bWwsIHRtcDtcblx0aWYgKCAhZGF0YSB8fCB0eXBlb2YgZGF0YSAhPT0gXCJzdHJpbmdcIiApIHtcblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXG5cdC8vIFN1cHBvcnQ6IElFOVxuXHR0cnkge1xuXHRcdHRtcCA9IG5ldyBET01QYXJzZXIoKTtcblx0XHR4bWwgPSB0bXAucGFyc2VGcm9tU3RyaW5nKCBkYXRhLCBcInRleHQveG1sXCIgKTtcblx0fSBjYXRjaCAoIGUgKSB7XG5cdFx0eG1sID0gdW5kZWZpbmVkO1xuXHR9XG5cblx0aWYgKCAheG1sIHx8IHhtbC5nZXRFbGVtZW50c0J5VGFnTmFtZSggXCJwYXJzZXJlcnJvclwiICkubGVuZ3RoICkge1xuXHRcdGpRdWVyeS5lcnJvciggXCJJbnZhbGlkIFhNTDogXCIgKyBkYXRhICk7XG5cdH1cblx0cmV0dXJuIHhtbDtcbn07XG5cbnJldHVybiBqUXVlcnkucGFyc2VYTUw7XG5cbn0pO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vanF1ZXJ5L3NyYy9hamF4L3BhcnNlWE1MLmpzXG4gKiogbW9kdWxlIGlkID0gNDBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImRlZmluZShbXG5cdFwiLi9jb3JlXCIsXG5cdFwiLi92YXIvc2xpY2VcIixcblx0XCIuL2NhbGxiYWNrc1wiXG5dLCBmdW5jdGlvbiggalF1ZXJ5LCBzbGljZSApIHtcblxualF1ZXJ5LmV4dGVuZCh7XG5cblx0RGVmZXJyZWQ6IGZ1bmN0aW9uKCBmdW5jICkge1xuXHRcdHZhciB0dXBsZXMgPSBbXG5cdFx0XHRcdC8vIGFjdGlvbiwgYWRkIGxpc3RlbmVyLCBsaXN0ZW5lciBsaXN0LCBmaW5hbCBzdGF0ZVxuXHRcdFx0XHRbIFwicmVzb2x2ZVwiLCBcImRvbmVcIiwgalF1ZXJ5LkNhbGxiYWNrcyhcIm9uY2UgbWVtb3J5XCIpLCBcInJlc29sdmVkXCIgXSxcblx0XHRcdFx0WyBcInJlamVjdFwiLCBcImZhaWxcIiwgalF1ZXJ5LkNhbGxiYWNrcyhcIm9uY2UgbWVtb3J5XCIpLCBcInJlamVjdGVkXCIgXSxcblx0XHRcdFx0WyBcIm5vdGlmeVwiLCBcInByb2dyZXNzXCIsIGpRdWVyeS5DYWxsYmFja3MoXCJtZW1vcnlcIikgXVxuXHRcdFx0XSxcblx0XHRcdHN0YXRlID0gXCJwZW5kaW5nXCIsXG5cdFx0XHRwcm9taXNlID0ge1xuXHRcdFx0XHRzdGF0ZTogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHN0YXRlO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRhbHdheXM6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdGRlZmVycmVkLmRvbmUoIGFyZ3VtZW50cyApLmZhaWwoIGFyZ3VtZW50cyApO1xuXHRcdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHR0aGVuOiBmdW5jdGlvbiggLyogZm5Eb25lLCBmbkZhaWwsIGZuUHJvZ3Jlc3MgKi8gKSB7XG5cdFx0XHRcdFx0dmFyIGZucyA9IGFyZ3VtZW50cztcblx0XHRcdFx0XHRyZXR1cm4galF1ZXJ5LkRlZmVycmVkKGZ1bmN0aW9uKCBuZXdEZWZlciApIHtcblx0XHRcdFx0XHRcdGpRdWVyeS5lYWNoKCB0dXBsZXMsIGZ1bmN0aW9uKCBpLCB0dXBsZSApIHtcblx0XHRcdFx0XHRcdFx0dmFyIGZuID0galF1ZXJ5LmlzRnVuY3Rpb24oIGZuc1sgaSBdICkgJiYgZm5zWyBpIF07XG5cdFx0XHRcdFx0XHRcdC8vIGRlZmVycmVkWyBkb25lIHwgZmFpbCB8IHByb2dyZXNzIF0gZm9yIGZvcndhcmRpbmcgYWN0aW9ucyB0byBuZXdEZWZlclxuXHRcdFx0XHRcdFx0XHRkZWZlcnJlZFsgdHVwbGVbMV0gXShmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdFx0XHR2YXIgcmV0dXJuZWQgPSBmbiAmJiBmbi5hcHBseSggdGhpcywgYXJndW1lbnRzICk7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKCByZXR1cm5lZCAmJiBqUXVlcnkuaXNGdW5jdGlvbiggcmV0dXJuZWQucHJvbWlzZSApICkge1xuXHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuZWQucHJvbWlzZSgpXG5cdFx0XHRcdFx0XHRcdFx0XHRcdC5kb25lKCBuZXdEZWZlci5yZXNvbHZlIClcblx0XHRcdFx0XHRcdFx0XHRcdFx0LmZhaWwoIG5ld0RlZmVyLnJlamVjdCApXG5cdFx0XHRcdFx0XHRcdFx0XHRcdC5wcm9ncmVzcyggbmV3RGVmZXIubm90aWZ5ICk7XG5cdFx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRcdG5ld0RlZmVyWyB0dXBsZVsgMCBdICsgXCJXaXRoXCIgXSggdGhpcyA9PT0gcHJvbWlzZSA/IG5ld0RlZmVyLnByb21pc2UoKSA6IHRoaXMsIGZuID8gWyByZXR1cm5lZCBdIDogYXJndW1lbnRzICk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0Zm5zID0gbnVsbDtcblx0XHRcdFx0XHR9KS5wcm9taXNlKCk7XG5cdFx0XHRcdH0sXG5cdFx0XHRcdC8vIEdldCBhIHByb21pc2UgZm9yIHRoaXMgZGVmZXJyZWRcblx0XHRcdFx0Ly8gSWYgb2JqIGlzIHByb3ZpZGVkLCB0aGUgcHJvbWlzZSBhc3BlY3QgaXMgYWRkZWQgdG8gdGhlIG9iamVjdFxuXHRcdFx0XHRwcm9taXNlOiBmdW5jdGlvbiggb2JqICkge1xuXHRcdFx0XHRcdHJldHVybiBvYmogIT0gbnVsbCA/IGpRdWVyeS5leHRlbmQoIG9iaiwgcHJvbWlzZSApIDogcHJvbWlzZTtcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdGRlZmVycmVkID0ge307XG5cblx0XHQvLyBLZWVwIHBpcGUgZm9yIGJhY2stY29tcGF0XG5cdFx0cHJvbWlzZS5waXBlID0gcHJvbWlzZS50aGVuO1xuXG5cdFx0Ly8gQWRkIGxpc3Qtc3BlY2lmaWMgbWV0aG9kc1xuXHRcdGpRdWVyeS5lYWNoKCB0dXBsZXMsIGZ1bmN0aW9uKCBpLCB0dXBsZSApIHtcblx0XHRcdHZhciBsaXN0ID0gdHVwbGVbIDIgXSxcblx0XHRcdFx0c3RhdGVTdHJpbmcgPSB0dXBsZVsgMyBdO1xuXG5cdFx0XHQvLyBwcm9taXNlWyBkb25lIHwgZmFpbCB8IHByb2dyZXNzIF0gPSBsaXN0LmFkZFxuXHRcdFx0cHJvbWlzZVsgdHVwbGVbMV0gXSA9IGxpc3QuYWRkO1xuXG5cdFx0XHQvLyBIYW5kbGUgc3RhdGVcblx0XHRcdGlmICggc3RhdGVTdHJpbmcgKSB7XG5cdFx0XHRcdGxpc3QuYWRkKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdC8vIHN0YXRlID0gWyByZXNvbHZlZCB8IHJlamVjdGVkIF1cblx0XHRcdFx0XHRzdGF0ZSA9IHN0YXRlU3RyaW5nO1xuXG5cdFx0XHRcdC8vIFsgcmVqZWN0X2xpc3QgfCByZXNvbHZlX2xpc3QgXS5kaXNhYmxlOyBwcm9ncmVzc19saXN0LmxvY2tcblx0XHRcdFx0fSwgdHVwbGVzWyBpIF4gMSBdWyAyIF0uZGlzYWJsZSwgdHVwbGVzWyAyIF1bIDIgXS5sb2NrICk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIGRlZmVycmVkWyByZXNvbHZlIHwgcmVqZWN0IHwgbm90aWZ5IF1cblx0XHRcdGRlZmVycmVkWyB0dXBsZVswXSBdID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGRlZmVycmVkWyB0dXBsZVswXSArIFwiV2l0aFwiIF0oIHRoaXMgPT09IGRlZmVycmVkID8gcHJvbWlzZSA6IHRoaXMsIGFyZ3VtZW50cyApO1xuXHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdH07XG5cdFx0XHRkZWZlcnJlZFsgdHVwbGVbMF0gKyBcIldpdGhcIiBdID0gbGlzdC5maXJlV2l0aDtcblx0XHR9KTtcblxuXHRcdC8vIE1ha2UgdGhlIGRlZmVycmVkIGEgcHJvbWlzZVxuXHRcdHByb21pc2UucHJvbWlzZSggZGVmZXJyZWQgKTtcblxuXHRcdC8vIENhbGwgZ2l2ZW4gZnVuYyBpZiBhbnlcblx0XHRpZiAoIGZ1bmMgKSB7XG5cdFx0XHRmdW5jLmNhbGwoIGRlZmVycmVkLCBkZWZlcnJlZCApO1xuXHRcdH1cblxuXHRcdC8vIEFsbCBkb25lIVxuXHRcdHJldHVybiBkZWZlcnJlZDtcblx0fSxcblxuXHQvLyBEZWZlcnJlZCBoZWxwZXJcblx0d2hlbjogZnVuY3Rpb24oIHN1Ym9yZGluYXRlIC8qICwgLi4uLCBzdWJvcmRpbmF0ZU4gKi8gKSB7XG5cdFx0dmFyIGkgPSAwLFxuXHRcdFx0cmVzb2x2ZVZhbHVlcyA9IHNsaWNlLmNhbGwoIGFyZ3VtZW50cyApLFxuXHRcdFx0bGVuZ3RoID0gcmVzb2x2ZVZhbHVlcy5sZW5ndGgsXG5cblx0XHRcdC8vIHRoZSBjb3VudCBvZiB1bmNvbXBsZXRlZCBzdWJvcmRpbmF0ZXNcblx0XHRcdHJlbWFpbmluZyA9IGxlbmd0aCAhPT0gMSB8fCAoIHN1Ym9yZGluYXRlICYmIGpRdWVyeS5pc0Z1bmN0aW9uKCBzdWJvcmRpbmF0ZS5wcm9taXNlICkgKSA/IGxlbmd0aCA6IDAsXG5cblx0XHRcdC8vIHRoZSBtYXN0ZXIgRGVmZXJyZWQuIElmIHJlc29sdmVWYWx1ZXMgY29uc2lzdCBvZiBvbmx5IGEgc2luZ2xlIERlZmVycmVkLCBqdXN0IHVzZSB0aGF0LlxuXHRcdFx0ZGVmZXJyZWQgPSByZW1haW5pbmcgPT09IDEgPyBzdWJvcmRpbmF0ZSA6IGpRdWVyeS5EZWZlcnJlZCgpLFxuXG5cdFx0XHQvLyBVcGRhdGUgZnVuY3Rpb24gZm9yIGJvdGggcmVzb2x2ZSBhbmQgcHJvZ3Jlc3MgdmFsdWVzXG5cdFx0XHR1cGRhdGVGdW5jID0gZnVuY3Rpb24oIGksIGNvbnRleHRzLCB2YWx1ZXMgKSB7XG5cdFx0XHRcdHJldHVybiBmdW5jdGlvbiggdmFsdWUgKSB7XG5cdFx0XHRcdFx0Y29udGV4dHNbIGkgXSA9IHRoaXM7XG5cdFx0XHRcdFx0dmFsdWVzWyBpIF0gPSBhcmd1bWVudHMubGVuZ3RoID4gMSA/IHNsaWNlLmNhbGwoIGFyZ3VtZW50cyApIDogdmFsdWU7XG5cdFx0XHRcdFx0aWYgKCB2YWx1ZXMgPT09IHByb2dyZXNzVmFsdWVzICkge1xuXHRcdFx0XHRcdFx0ZGVmZXJyZWQubm90aWZ5V2l0aCggY29udGV4dHMsIHZhbHVlcyApO1xuXHRcdFx0XHRcdH0gZWxzZSBpZiAoICEoIC0tcmVtYWluaW5nICkgKSB7XG5cdFx0XHRcdFx0XHRkZWZlcnJlZC5yZXNvbHZlV2l0aCggY29udGV4dHMsIHZhbHVlcyApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fTtcblx0XHRcdH0sXG5cblx0XHRcdHByb2dyZXNzVmFsdWVzLCBwcm9ncmVzc0NvbnRleHRzLCByZXNvbHZlQ29udGV4dHM7XG5cblx0XHQvLyBBZGQgbGlzdGVuZXJzIHRvIERlZmVycmVkIHN1Ym9yZGluYXRlczsgdHJlYXQgb3RoZXJzIGFzIHJlc29sdmVkXG5cdFx0aWYgKCBsZW5ndGggPiAxICkge1xuXHRcdFx0cHJvZ3Jlc3NWYWx1ZXMgPSBuZXcgQXJyYXkoIGxlbmd0aCApO1xuXHRcdFx0cHJvZ3Jlc3NDb250ZXh0cyA9IG5ldyBBcnJheSggbGVuZ3RoICk7XG5cdFx0XHRyZXNvbHZlQ29udGV4dHMgPSBuZXcgQXJyYXkoIGxlbmd0aCApO1xuXHRcdFx0Zm9yICggOyBpIDwgbGVuZ3RoOyBpKysgKSB7XG5cdFx0XHRcdGlmICggcmVzb2x2ZVZhbHVlc1sgaSBdICYmIGpRdWVyeS5pc0Z1bmN0aW9uKCByZXNvbHZlVmFsdWVzWyBpIF0ucHJvbWlzZSApICkge1xuXHRcdFx0XHRcdHJlc29sdmVWYWx1ZXNbIGkgXS5wcm9taXNlKClcblx0XHRcdFx0XHRcdC5kb25lKCB1cGRhdGVGdW5jKCBpLCByZXNvbHZlQ29udGV4dHMsIHJlc29sdmVWYWx1ZXMgKSApXG5cdFx0XHRcdFx0XHQuZmFpbCggZGVmZXJyZWQucmVqZWN0IClcblx0XHRcdFx0XHRcdC5wcm9ncmVzcyggdXBkYXRlRnVuYyggaSwgcHJvZ3Jlc3NDb250ZXh0cywgcHJvZ3Jlc3NWYWx1ZXMgKSApO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdC0tcmVtYWluaW5nO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gSWYgd2UncmUgbm90IHdhaXRpbmcgb24gYW55dGhpbmcsIHJlc29sdmUgdGhlIG1hc3RlclxuXHRcdGlmICggIXJlbWFpbmluZyApIHtcblx0XHRcdGRlZmVycmVkLnJlc29sdmVXaXRoKCByZXNvbHZlQ29udGV4dHMsIHJlc29sdmVWYWx1ZXMgKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuXHR9XG59KTtcblxucmV0dXJuIGpRdWVyeTtcbn0pO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vanF1ZXJ5L3NyYy9kZWZlcnJlZC5qc1xuICoqIG1vZHVsZSBpZCA9IDQxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJkZWZpbmUoW1xuXHRcIi4vY29yZVwiLFxuXHRcIi4vdmFyL3Jub3R3aGl0ZVwiXG5dLCBmdW5jdGlvbiggalF1ZXJ5LCBybm90d2hpdGUgKSB7XG5cbi8vIFN0cmluZyB0byBPYmplY3Qgb3B0aW9ucyBmb3JtYXQgY2FjaGVcbnZhciBvcHRpb25zQ2FjaGUgPSB7fTtcblxuLy8gQ29udmVydCBTdHJpbmctZm9ybWF0dGVkIG9wdGlvbnMgaW50byBPYmplY3QtZm9ybWF0dGVkIG9uZXMgYW5kIHN0b3JlIGluIGNhY2hlXG5mdW5jdGlvbiBjcmVhdGVPcHRpb25zKCBvcHRpb25zICkge1xuXHR2YXIgb2JqZWN0ID0gb3B0aW9uc0NhY2hlWyBvcHRpb25zIF0gPSB7fTtcblx0alF1ZXJ5LmVhY2goIG9wdGlvbnMubWF0Y2goIHJub3R3aGl0ZSApIHx8IFtdLCBmdW5jdGlvbiggXywgZmxhZyApIHtcblx0XHRvYmplY3RbIGZsYWcgXSA9IHRydWU7XG5cdH0pO1xuXHRyZXR1cm4gb2JqZWN0O1xufVxuXG4vKlxuICogQ3JlYXRlIGEgY2FsbGJhY2sgbGlzdCB1c2luZyB0aGUgZm9sbG93aW5nIHBhcmFtZXRlcnM6XG4gKlxuICpcdG9wdGlvbnM6IGFuIG9wdGlvbmFsIGxpc3Qgb2Ygc3BhY2Utc2VwYXJhdGVkIG9wdGlvbnMgdGhhdCB3aWxsIGNoYW5nZSBob3dcbiAqXHRcdFx0dGhlIGNhbGxiYWNrIGxpc3QgYmVoYXZlcyBvciBhIG1vcmUgdHJhZGl0aW9uYWwgb3B0aW9uIG9iamVjdFxuICpcbiAqIEJ5IGRlZmF1bHQgYSBjYWxsYmFjayBsaXN0IHdpbGwgYWN0IGxpa2UgYW4gZXZlbnQgY2FsbGJhY2sgbGlzdCBhbmQgY2FuIGJlXG4gKiBcImZpcmVkXCIgbXVsdGlwbGUgdGltZXMuXG4gKlxuICogUG9zc2libGUgb3B0aW9uczpcbiAqXG4gKlx0b25jZTpcdFx0XHR3aWxsIGVuc3VyZSB0aGUgY2FsbGJhY2sgbGlzdCBjYW4gb25seSBiZSBmaXJlZCBvbmNlIChsaWtlIGEgRGVmZXJyZWQpXG4gKlxuICpcdG1lbW9yeTpcdFx0XHR3aWxsIGtlZXAgdHJhY2sgb2YgcHJldmlvdXMgdmFsdWVzIGFuZCB3aWxsIGNhbGwgYW55IGNhbGxiYWNrIGFkZGVkXG4gKlx0XHRcdFx0XHRhZnRlciB0aGUgbGlzdCBoYXMgYmVlbiBmaXJlZCByaWdodCBhd2F5IHdpdGggdGhlIGxhdGVzdCBcIm1lbW9yaXplZFwiXG4gKlx0XHRcdFx0XHR2YWx1ZXMgKGxpa2UgYSBEZWZlcnJlZClcbiAqXG4gKlx0dW5pcXVlOlx0XHRcdHdpbGwgZW5zdXJlIGEgY2FsbGJhY2sgY2FuIG9ubHkgYmUgYWRkZWQgb25jZSAobm8gZHVwbGljYXRlIGluIHRoZSBsaXN0KVxuICpcbiAqXHRzdG9wT25GYWxzZTpcdGludGVycnVwdCBjYWxsaW5ncyB3aGVuIGEgY2FsbGJhY2sgcmV0dXJucyBmYWxzZVxuICpcbiAqL1xualF1ZXJ5LkNhbGxiYWNrcyA9IGZ1bmN0aW9uKCBvcHRpb25zICkge1xuXG5cdC8vIENvbnZlcnQgb3B0aW9ucyBmcm9tIFN0cmluZy1mb3JtYXR0ZWQgdG8gT2JqZWN0LWZvcm1hdHRlZCBpZiBuZWVkZWRcblx0Ly8gKHdlIGNoZWNrIGluIGNhY2hlIGZpcnN0KVxuXHRvcHRpb25zID0gdHlwZW9mIG9wdGlvbnMgPT09IFwic3RyaW5nXCIgP1xuXHRcdCggb3B0aW9uc0NhY2hlWyBvcHRpb25zIF0gfHwgY3JlYXRlT3B0aW9ucyggb3B0aW9ucyApICkgOlxuXHRcdGpRdWVyeS5leHRlbmQoIHt9LCBvcHRpb25zICk7XG5cblx0dmFyIC8vIExhc3QgZmlyZSB2YWx1ZSAoZm9yIG5vbi1mb3JnZXR0YWJsZSBsaXN0cylcblx0XHRtZW1vcnksXG5cdFx0Ly8gRmxhZyB0byBrbm93IGlmIGxpc3Qgd2FzIGFscmVhZHkgZmlyZWRcblx0XHRmaXJlZCxcblx0XHQvLyBGbGFnIHRvIGtub3cgaWYgbGlzdCBpcyBjdXJyZW50bHkgZmlyaW5nXG5cdFx0ZmlyaW5nLFxuXHRcdC8vIEZpcnN0IGNhbGxiYWNrIHRvIGZpcmUgKHVzZWQgaW50ZXJuYWxseSBieSBhZGQgYW5kIGZpcmVXaXRoKVxuXHRcdGZpcmluZ1N0YXJ0LFxuXHRcdC8vIEVuZCBvZiB0aGUgbG9vcCB3aGVuIGZpcmluZ1xuXHRcdGZpcmluZ0xlbmd0aCxcblx0XHQvLyBJbmRleCBvZiBjdXJyZW50bHkgZmlyaW5nIGNhbGxiYWNrIChtb2RpZmllZCBieSByZW1vdmUgaWYgbmVlZGVkKVxuXHRcdGZpcmluZ0luZGV4LFxuXHRcdC8vIEFjdHVhbCBjYWxsYmFjayBsaXN0XG5cdFx0bGlzdCA9IFtdLFxuXHRcdC8vIFN0YWNrIG9mIGZpcmUgY2FsbHMgZm9yIHJlcGVhdGFibGUgbGlzdHNcblx0XHRzdGFjayA9ICFvcHRpb25zLm9uY2UgJiYgW10sXG5cdFx0Ly8gRmlyZSBjYWxsYmFja3Ncblx0XHRmaXJlID0gZnVuY3Rpb24oIGRhdGEgKSB7XG5cdFx0XHRtZW1vcnkgPSBvcHRpb25zLm1lbW9yeSAmJiBkYXRhO1xuXHRcdFx0ZmlyZWQgPSB0cnVlO1xuXHRcdFx0ZmlyaW5nSW5kZXggPSBmaXJpbmdTdGFydCB8fCAwO1xuXHRcdFx0ZmlyaW5nU3RhcnQgPSAwO1xuXHRcdFx0ZmlyaW5nTGVuZ3RoID0gbGlzdC5sZW5ndGg7XG5cdFx0XHRmaXJpbmcgPSB0cnVlO1xuXHRcdFx0Zm9yICggOyBsaXN0ICYmIGZpcmluZ0luZGV4IDwgZmlyaW5nTGVuZ3RoOyBmaXJpbmdJbmRleCsrICkge1xuXHRcdFx0XHRpZiAoIGxpc3RbIGZpcmluZ0luZGV4IF0uYXBwbHkoIGRhdGFbIDAgXSwgZGF0YVsgMSBdICkgPT09IGZhbHNlICYmIG9wdGlvbnMuc3RvcE9uRmFsc2UgKSB7XG5cdFx0XHRcdFx0bWVtb3J5ID0gZmFsc2U7IC8vIFRvIHByZXZlbnQgZnVydGhlciBjYWxscyB1c2luZyBhZGRcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0ZmlyaW5nID0gZmFsc2U7XG5cdFx0XHRpZiAoIGxpc3QgKSB7XG5cdFx0XHRcdGlmICggc3RhY2sgKSB7XG5cdFx0XHRcdFx0aWYgKCBzdGFjay5sZW5ndGggKSB7XG5cdFx0XHRcdFx0XHRmaXJlKCBzdGFjay5zaGlmdCgpICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2UgaWYgKCBtZW1vcnkgKSB7XG5cdFx0XHRcdFx0bGlzdCA9IFtdO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHNlbGYuZGlzYWJsZSgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSxcblx0XHQvLyBBY3R1YWwgQ2FsbGJhY2tzIG9iamVjdFxuXHRcdHNlbGYgPSB7XG5cdFx0XHQvLyBBZGQgYSBjYWxsYmFjayBvciBhIGNvbGxlY3Rpb24gb2YgY2FsbGJhY2tzIHRvIHRoZSBsaXN0XG5cdFx0XHRhZGQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRpZiAoIGxpc3QgKSB7XG5cdFx0XHRcdFx0Ly8gRmlyc3QsIHdlIHNhdmUgdGhlIGN1cnJlbnQgbGVuZ3RoXG5cdFx0XHRcdFx0dmFyIHN0YXJ0ID0gbGlzdC5sZW5ndGg7XG5cdFx0XHRcdFx0KGZ1bmN0aW9uIGFkZCggYXJncyApIHtcblx0XHRcdFx0XHRcdGpRdWVyeS5lYWNoKCBhcmdzLCBmdW5jdGlvbiggXywgYXJnICkge1xuXHRcdFx0XHRcdFx0XHR2YXIgdHlwZSA9IGpRdWVyeS50eXBlKCBhcmcgKTtcblx0XHRcdFx0XHRcdFx0aWYgKCB0eXBlID09PSBcImZ1bmN0aW9uXCIgKSB7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKCAhb3B0aW9ucy51bmlxdWUgfHwgIXNlbGYuaGFzKCBhcmcgKSApIHtcblx0XHRcdFx0XHRcdFx0XHRcdGxpc3QucHVzaCggYXJnICk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9IGVsc2UgaWYgKCBhcmcgJiYgYXJnLmxlbmd0aCAmJiB0eXBlICE9PSBcInN0cmluZ1wiICkge1xuXHRcdFx0XHRcdFx0XHRcdC8vIEluc3BlY3QgcmVjdXJzaXZlbHlcblx0XHRcdFx0XHRcdFx0XHRhZGQoIGFyZyApO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9KSggYXJndW1lbnRzICk7XG5cdFx0XHRcdFx0Ly8gRG8gd2UgbmVlZCB0byBhZGQgdGhlIGNhbGxiYWNrcyB0byB0aGVcblx0XHRcdFx0XHQvLyBjdXJyZW50IGZpcmluZyBiYXRjaD9cblx0XHRcdFx0XHRpZiAoIGZpcmluZyApIHtcblx0XHRcdFx0XHRcdGZpcmluZ0xlbmd0aCA9IGxpc3QubGVuZ3RoO1xuXHRcdFx0XHRcdC8vIFdpdGggbWVtb3J5LCBpZiB3ZSdyZSBub3QgZmlyaW5nIHRoZW5cblx0XHRcdFx0XHQvLyB3ZSBzaG91bGQgY2FsbCByaWdodCBhd2F5XG5cdFx0XHRcdFx0fSBlbHNlIGlmICggbWVtb3J5ICkge1xuXHRcdFx0XHRcdFx0ZmlyaW5nU3RhcnQgPSBzdGFydDtcblx0XHRcdFx0XHRcdGZpcmUoIG1lbW9yeSApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdH0sXG5cdFx0XHQvLyBSZW1vdmUgYSBjYWxsYmFjayBmcm9tIHRoZSBsaXN0XG5cdFx0XHRyZW1vdmU6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRpZiAoIGxpc3QgKSB7XG5cdFx0XHRcdFx0alF1ZXJ5LmVhY2goIGFyZ3VtZW50cywgZnVuY3Rpb24oIF8sIGFyZyApIHtcblx0XHRcdFx0XHRcdHZhciBpbmRleDtcblx0XHRcdFx0XHRcdHdoaWxlICggKCBpbmRleCA9IGpRdWVyeS5pbkFycmF5KCBhcmcsIGxpc3QsIGluZGV4ICkgKSA+IC0xICkge1xuXHRcdFx0XHRcdFx0XHRsaXN0LnNwbGljZSggaW5kZXgsIDEgKTtcblx0XHRcdFx0XHRcdFx0Ly8gSGFuZGxlIGZpcmluZyBpbmRleGVzXG5cdFx0XHRcdFx0XHRcdGlmICggZmlyaW5nICkge1xuXHRcdFx0XHRcdFx0XHRcdGlmICggaW5kZXggPD0gZmlyaW5nTGVuZ3RoICkge1xuXHRcdFx0XHRcdFx0XHRcdFx0ZmlyaW5nTGVuZ3RoLS07XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdGlmICggaW5kZXggPD0gZmlyaW5nSW5kZXggKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRmaXJpbmdJbmRleC0tO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0fSxcblx0XHRcdC8vIENoZWNrIGlmIGEgZ2l2ZW4gY2FsbGJhY2sgaXMgaW4gdGhlIGxpc3QuXG5cdFx0XHQvLyBJZiBubyBhcmd1bWVudCBpcyBnaXZlbiwgcmV0dXJuIHdoZXRoZXIgb3Igbm90IGxpc3QgaGFzIGNhbGxiYWNrcyBhdHRhY2hlZC5cblx0XHRcdGhhczogZnVuY3Rpb24oIGZuICkge1xuXHRcdFx0XHRyZXR1cm4gZm4gPyBqUXVlcnkuaW5BcnJheSggZm4sIGxpc3QgKSA+IC0xIDogISEoIGxpc3QgJiYgbGlzdC5sZW5ndGggKTtcblx0XHRcdH0sXG5cdFx0XHQvLyBSZW1vdmUgYWxsIGNhbGxiYWNrcyBmcm9tIHRoZSBsaXN0XG5cdFx0XHRlbXB0eTogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGxpc3QgPSBbXTtcblx0XHRcdFx0ZmlyaW5nTGVuZ3RoID0gMDtcblx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHR9LFxuXHRcdFx0Ly8gSGF2ZSB0aGUgbGlzdCBkbyBub3RoaW5nIGFueW1vcmVcblx0XHRcdGRpc2FibGU6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRsaXN0ID0gc3RhY2sgPSBtZW1vcnkgPSB1bmRlZmluZWQ7XG5cdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0fSxcblx0XHRcdC8vIElzIGl0IGRpc2FibGVkP1xuXHRcdFx0ZGlzYWJsZWQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4gIWxpc3Q7XG5cdFx0XHR9LFxuXHRcdFx0Ly8gTG9jayB0aGUgbGlzdCBpbiBpdHMgY3VycmVudCBzdGF0ZVxuXHRcdFx0bG9jazogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHN0YWNrID0gdW5kZWZpbmVkO1xuXHRcdFx0XHRpZiAoICFtZW1vcnkgKSB7XG5cdFx0XHRcdFx0c2VsZi5kaXNhYmxlKCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHR9LFxuXHRcdFx0Ly8gSXMgaXQgbG9ja2VkP1xuXHRcdFx0bG9ja2VkOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuICFzdGFjaztcblx0XHRcdH0sXG5cdFx0XHQvLyBDYWxsIGFsbCBjYWxsYmFja3Mgd2l0aCB0aGUgZ2l2ZW4gY29udGV4dCBhbmQgYXJndW1lbnRzXG5cdFx0XHRmaXJlV2l0aDogZnVuY3Rpb24oIGNvbnRleHQsIGFyZ3MgKSB7XG5cdFx0XHRcdGlmICggbGlzdCAmJiAoICFmaXJlZCB8fCBzdGFjayApICkge1xuXHRcdFx0XHRcdGFyZ3MgPSBhcmdzIHx8IFtdO1xuXHRcdFx0XHRcdGFyZ3MgPSBbIGNvbnRleHQsIGFyZ3Muc2xpY2UgPyBhcmdzLnNsaWNlKCkgOiBhcmdzIF07XG5cdFx0XHRcdFx0aWYgKCBmaXJpbmcgKSB7XG5cdFx0XHRcdFx0XHRzdGFjay5wdXNoKCBhcmdzICk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGZpcmUoIGFyZ3MgKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHR9LFxuXHRcdFx0Ly8gQ2FsbCBhbGwgdGhlIGNhbGxiYWNrcyB3aXRoIHRoZSBnaXZlbiBhcmd1bWVudHNcblx0XHRcdGZpcmU6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRzZWxmLmZpcmVXaXRoKCB0aGlzLCBhcmd1bWVudHMgKTtcblx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHR9LFxuXHRcdFx0Ly8gVG8ga25vdyBpZiB0aGUgY2FsbGJhY2tzIGhhdmUgYWxyZWFkeSBiZWVuIGNhbGxlZCBhdCBsZWFzdCBvbmNlXG5cdFx0XHRmaXJlZDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiAhIWZpcmVkO1xuXHRcdFx0fVxuXHRcdH07XG5cblx0cmV0dXJuIHNlbGY7XG59O1xuXG5yZXR1cm4galF1ZXJ5O1xufSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9qcXVlcnkvc3JjL2NhbGxiYWNrcy5qc1xuICoqIG1vZHVsZSBpZCA9IDQyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJkZWZpbmUoW1xuXHRcIi4uL2NvcmVcIixcblx0XCIuLi92YXIvc3VwcG9ydFwiLFxuXHRcIi4uL2FqYXhcIlxuXSwgZnVuY3Rpb24oIGpRdWVyeSwgc3VwcG9ydCApIHtcblxualF1ZXJ5LmFqYXhTZXR0aW5ncy54aHIgPSBmdW5jdGlvbigpIHtcblx0dHJ5IHtcblx0XHRyZXR1cm4gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cdH0gY2F0Y2goIGUgKSB7fVxufTtcblxudmFyIHhocklkID0gMCxcblx0eGhyQ2FsbGJhY2tzID0ge30sXG5cdHhoclN1Y2Nlc3NTdGF0dXMgPSB7XG5cdFx0Ly8gZmlsZSBwcm90b2NvbCBhbHdheXMgeWllbGRzIHN0YXR1cyBjb2RlIDAsIGFzc3VtZSAyMDBcblx0XHQwOiAyMDAsXG5cdFx0Ly8gU3VwcG9ydDogSUU5XG5cdFx0Ly8gIzE0NTA6IHNvbWV0aW1lcyBJRSByZXR1cm5zIDEyMjMgd2hlbiBpdCBzaG91bGQgYmUgMjA0XG5cdFx0MTIyMzogMjA0XG5cdH0sXG5cdHhoclN1cHBvcnRlZCA9IGpRdWVyeS5hamF4U2V0dGluZ3MueGhyKCk7XG5cbi8vIFN1cHBvcnQ6IElFOVxuLy8gT3BlbiByZXF1ZXN0cyBtdXN0IGJlIG1hbnVhbGx5IGFib3J0ZWQgb24gdW5sb2FkICgjNTI4MClcbi8vIFNlZSBodHRwczovL3N1cHBvcnQubWljcm9zb2Z0LmNvbS9rYi8yODU2NzQ2IGZvciBtb3JlIGluZm9cbmlmICggd2luZG93LmF0dGFjaEV2ZW50ICkge1xuXHR3aW5kb3cuYXR0YWNoRXZlbnQoIFwib251bmxvYWRcIiwgZnVuY3Rpb24oKSB7XG5cdFx0Zm9yICggdmFyIGtleSBpbiB4aHJDYWxsYmFja3MgKSB7XG5cdFx0XHR4aHJDYWxsYmFja3NbIGtleSBdKCk7XG5cdFx0fVxuXHR9KTtcbn1cblxuc3VwcG9ydC5jb3JzID0gISF4aHJTdXBwb3J0ZWQgJiYgKCBcIndpdGhDcmVkZW50aWFsc1wiIGluIHhoclN1cHBvcnRlZCApO1xuc3VwcG9ydC5hamF4ID0geGhyU3VwcG9ydGVkID0gISF4aHJTdXBwb3J0ZWQ7XG5cbmpRdWVyeS5hamF4VHJhbnNwb3J0KGZ1bmN0aW9uKCBvcHRpb25zICkge1xuXHR2YXIgY2FsbGJhY2s7XG5cblx0Ly8gQ3Jvc3MgZG9tYWluIG9ubHkgYWxsb3dlZCBpZiBzdXBwb3J0ZWQgdGhyb3VnaCBYTUxIdHRwUmVxdWVzdFxuXHRpZiAoIHN1cHBvcnQuY29ycyB8fCB4aHJTdXBwb3J0ZWQgJiYgIW9wdGlvbnMuY3Jvc3NEb21haW4gKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdHNlbmQ6IGZ1bmN0aW9uKCBoZWFkZXJzLCBjb21wbGV0ZSApIHtcblx0XHRcdFx0dmFyIGksXG5cdFx0XHRcdFx0eGhyID0gb3B0aW9ucy54aHIoKSxcblx0XHRcdFx0XHRpZCA9ICsreGhySWQ7XG5cblx0XHRcdFx0eGhyLm9wZW4oIG9wdGlvbnMudHlwZSwgb3B0aW9ucy51cmwsIG9wdGlvbnMuYXN5bmMsIG9wdGlvbnMudXNlcm5hbWUsIG9wdGlvbnMucGFzc3dvcmQgKTtcblxuXHRcdFx0XHQvLyBBcHBseSBjdXN0b20gZmllbGRzIGlmIHByb3ZpZGVkXG5cdFx0XHRcdGlmICggb3B0aW9ucy54aHJGaWVsZHMgKSB7XG5cdFx0XHRcdFx0Zm9yICggaSBpbiBvcHRpb25zLnhockZpZWxkcyApIHtcblx0XHRcdFx0XHRcdHhoclsgaSBdID0gb3B0aW9ucy54aHJGaWVsZHNbIGkgXTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBPdmVycmlkZSBtaW1lIHR5cGUgaWYgbmVlZGVkXG5cdFx0XHRcdGlmICggb3B0aW9ucy5taW1lVHlwZSAmJiB4aHIub3ZlcnJpZGVNaW1lVHlwZSApIHtcblx0XHRcdFx0XHR4aHIub3ZlcnJpZGVNaW1lVHlwZSggb3B0aW9ucy5taW1lVHlwZSApO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gWC1SZXF1ZXN0ZWQtV2l0aCBoZWFkZXJcblx0XHRcdFx0Ly8gRm9yIGNyb3NzLWRvbWFpbiByZXF1ZXN0cywgc2VlaW5nIGFzIGNvbmRpdGlvbnMgZm9yIGEgcHJlZmxpZ2h0IGFyZVxuXHRcdFx0XHQvLyBha2luIHRvIGEgamlnc2F3IHB1enpsZSwgd2Ugc2ltcGx5IG5ldmVyIHNldCBpdCB0byBiZSBzdXJlLlxuXHRcdFx0XHQvLyAoaXQgY2FuIGFsd2F5cyBiZSBzZXQgb24gYSBwZXItcmVxdWVzdCBiYXNpcyBvciBldmVuIHVzaW5nIGFqYXhTZXR1cClcblx0XHRcdFx0Ly8gRm9yIHNhbWUtZG9tYWluIHJlcXVlc3RzLCB3b24ndCBjaGFuZ2UgaGVhZGVyIGlmIGFscmVhZHkgcHJvdmlkZWQuXG5cdFx0XHRcdGlmICggIW9wdGlvbnMuY3Jvc3NEb21haW4gJiYgIWhlYWRlcnNbXCJYLVJlcXVlc3RlZC1XaXRoXCJdICkge1xuXHRcdFx0XHRcdGhlYWRlcnNbXCJYLVJlcXVlc3RlZC1XaXRoXCJdID0gXCJYTUxIdHRwUmVxdWVzdFwiO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gU2V0IGhlYWRlcnNcblx0XHRcdFx0Zm9yICggaSBpbiBoZWFkZXJzICkge1xuXHRcdFx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCBpLCBoZWFkZXJzWyBpIF0gKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIENhbGxiYWNrXG5cdFx0XHRcdGNhbGxiYWNrID0gZnVuY3Rpb24oIHR5cGUgKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0aWYgKCBjYWxsYmFjayApIHtcblx0XHRcdFx0XHRcdFx0ZGVsZXRlIHhockNhbGxiYWNrc1sgaWQgXTtcblx0XHRcdFx0XHRcdFx0Y2FsbGJhY2sgPSB4aHIub25sb2FkID0geGhyLm9uZXJyb3IgPSBudWxsO1xuXG5cdFx0XHRcdFx0XHRcdGlmICggdHlwZSA9PT0gXCJhYm9ydFwiICkge1xuXHRcdFx0XHRcdFx0XHRcdHhoci5hYm9ydCgpO1xuXHRcdFx0XHRcdFx0XHR9IGVsc2UgaWYgKCB0eXBlID09PSBcImVycm9yXCIgKSB7XG5cdFx0XHRcdFx0XHRcdFx0Y29tcGxldGUoXG5cdFx0XHRcdFx0XHRcdFx0XHQvLyBmaWxlOiBwcm90b2NvbCBhbHdheXMgeWllbGRzIHN0YXR1cyAwOyBzZWUgIzg2MDUsICMxNDIwN1xuXHRcdFx0XHRcdFx0XHRcdFx0eGhyLnN0YXR1cyxcblx0XHRcdFx0XHRcdFx0XHRcdHhoci5zdGF0dXNUZXh0XG5cdFx0XHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRjb21wbGV0ZShcblx0XHRcdFx0XHRcdFx0XHRcdHhoclN1Y2Nlc3NTdGF0dXNbIHhoci5zdGF0dXMgXSB8fCB4aHIuc3RhdHVzLFxuXHRcdFx0XHRcdFx0XHRcdFx0eGhyLnN0YXR1c1RleHQsXG5cdFx0XHRcdFx0XHRcdFx0XHQvLyBTdXBwb3J0OiBJRTlcblx0XHRcdFx0XHRcdFx0XHRcdC8vIEFjY2Vzc2luZyBiaW5hcnktZGF0YSByZXNwb25zZVRleHQgdGhyb3dzIGFuIGV4Y2VwdGlvblxuXHRcdFx0XHRcdFx0XHRcdFx0Ly8gKCMxMTQyNilcblx0XHRcdFx0XHRcdFx0XHRcdHR5cGVvZiB4aHIucmVzcG9uc2VUZXh0ID09PSBcInN0cmluZ1wiID8ge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR0ZXh0OiB4aHIucmVzcG9uc2VUZXh0XG5cdFx0XHRcdFx0XHRcdFx0XHR9IDogdW5kZWZpbmVkLFxuXHRcdFx0XHRcdFx0XHRcdFx0eGhyLmdldEFsbFJlc3BvbnNlSGVhZGVycygpXG5cdFx0XHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH07XG5cdFx0XHRcdH07XG5cblx0XHRcdFx0Ly8gTGlzdGVuIHRvIGV2ZW50c1xuXHRcdFx0XHR4aHIub25sb2FkID0gY2FsbGJhY2soKTtcblx0XHRcdFx0eGhyLm9uZXJyb3IgPSBjYWxsYmFjayhcImVycm9yXCIpO1xuXG5cdFx0XHRcdC8vIENyZWF0ZSB0aGUgYWJvcnQgY2FsbGJhY2tcblx0XHRcdFx0Y2FsbGJhY2sgPSB4aHJDYWxsYmFja3NbIGlkIF0gPSBjYWxsYmFjayhcImFib3J0XCIpO1xuXG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0Ly8gRG8gc2VuZCB0aGUgcmVxdWVzdCAodGhpcyBtYXkgcmFpc2UgYW4gZXhjZXB0aW9uKVxuXHRcdFx0XHRcdHhoci5zZW5kKCBvcHRpb25zLmhhc0NvbnRlbnQgJiYgb3B0aW9ucy5kYXRhIHx8IG51bGwgKTtcblx0XHRcdFx0fSBjYXRjaCAoIGUgKSB7XG5cdFx0XHRcdFx0Ly8gIzE0NjgzOiBPbmx5IHJldGhyb3cgaWYgdGhpcyBoYXNuJ3QgYmVlbiBub3RpZmllZCBhcyBhbiBlcnJvciB5ZXRcblx0XHRcdFx0XHRpZiAoIGNhbGxiYWNrICkge1xuXHRcdFx0XHRcdFx0dGhyb3cgZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cblx0XHRcdGFib3J0OiBmdW5jdGlvbigpIHtcblx0XHRcdFx0aWYgKCBjYWxsYmFjayApIHtcblx0XHRcdFx0XHRjYWxsYmFjaygpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fTtcblx0fVxufSk7XG5cbn0pO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vanF1ZXJ5L3NyYy9hamF4L3hoci5qc1xuICoqIG1vZHVsZSBpZCA9IDQzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJkZWZpbmUoW1xuXHRcIi4uL2NvcmVcIixcblx0XCIuL3Zhci9yc2luZ2xlVGFnXCIsXG5cdFwiLi4vbWFuaXB1bGF0aW9uXCIgLy8gYnVpbGRGcmFnbWVudFxuXSwgZnVuY3Rpb24oIGpRdWVyeSwgcnNpbmdsZVRhZyApIHtcblxuLy8gZGF0YTogc3RyaW5nIG9mIGh0bWxcbi8vIGNvbnRleHQgKG9wdGlvbmFsKTogSWYgc3BlY2lmaWVkLCB0aGUgZnJhZ21lbnQgd2lsbCBiZSBjcmVhdGVkIGluIHRoaXMgY29udGV4dCwgZGVmYXVsdHMgdG8gZG9jdW1lbnRcbi8vIGtlZXBTY3JpcHRzIChvcHRpb25hbCk6IElmIHRydWUsIHdpbGwgaW5jbHVkZSBzY3JpcHRzIHBhc3NlZCBpbiB0aGUgaHRtbCBzdHJpbmdcbmpRdWVyeS5wYXJzZUhUTUwgPSBmdW5jdGlvbiggZGF0YSwgY29udGV4dCwga2VlcFNjcmlwdHMgKSB7XG5cdGlmICggIWRhdGEgfHwgdHlwZW9mIGRhdGEgIT09IFwic3RyaW5nXCIgKSB7XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblx0aWYgKCB0eXBlb2YgY29udGV4dCA9PT0gXCJib29sZWFuXCIgKSB7XG5cdFx0a2VlcFNjcmlwdHMgPSBjb250ZXh0O1xuXHRcdGNvbnRleHQgPSBmYWxzZTtcblx0fVxuXHRjb250ZXh0ID0gY29udGV4dCB8fCBkb2N1bWVudDtcblxuXHR2YXIgcGFyc2VkID0gcnNpbmdsZVRhZy5leGVjKCBkYXRhICksXG5cdFx0c2NyaXB0cyA9ICFrZWVwU2NyaXB0cyAmJiBbXTtcblxuXHQvLyBTaW5nbGUgdGFnXG5cdGlmICggcGFyc2VkICkge1xuXHRcdHJldHVybiBbIGNvbnRleHQuY3JlYXRlRWxlbWVudCggcGFyc2VkWzFdICkgXTtcblx0fVxuXG5cdHBhcnNlZCA9IGpRdWVyeS5idWlsZEZyYWdtZW50KCBbIGRhdGEgXSwgY29udGV4dCwgc2NyaXB0cyApO1xuXG5cdGlmICggc2NyaXB0cyAmJiBzY3JpcHRzLmxlbmd0aCApIHtcblx0XHRqUXVlcnkoIHNjcmlwdHMgKS5yZW1vdmUoKTtcblx0fVxuXG5cdHJldHVybiBqUXVlcnkubWVyZ2UoIFtdLCBwYXJzZWQuY2hpbGROb2RlcyApO1xufTtcblxucmV0dXJuIGpRdWVyeS5wYXJzZUhUTUw7XG5cbn0pO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vanF1ZXJ5L3NyYy9jb3JlL3BhcnNlSFRNTC5qc1xuICoqIG1vZHVsZSBpZCA9IDQ0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJkZWZpbmUoW1xuXHRcIi4uL2NvcmVcIixcblx0XCIuLi92YXIvcm5vdHdoaXRlXCIsXG5cdFwiLi4vdmFyL3N0cnVuZGVmaW5lZFwiLFxuXHRcIi4uL2RhdGEvdmFyL2RhdGFfcHJpdlwiLFxuXHRcIi4uL2NvcmUvaW5pdFwiXG5dLCBmdW5jdGlvbiggalF1ZXJ5LCBybm90d2hpdGUsIHN0cnVuZGVmaW5lZCwgZGF0YV9wcml2ICkge1xuXG52YXIgcmNsYXNzID0gL1tcXHRcXHJcXG5cXGZdL2c7XG5cbmpRdWVyeS5mbi5leHRlbmQoe1xuXHRhZGRDbGFzczogZnVuY3Rpb24oIHZhbHVlICkge1xuXHRcdHZhciBjbGFzc2VzLCBlbGVtLCBjdXIsIGNsYXp6LCBqLCBmaW5hbFZhbHVlLFxuXHRcdFx0cHJvY2VlZCA9IHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIiAmJiB2YWx1ZSxcblx0XHRcdGkgPSAwLFxuXHRcdFx0bGVuID0gdGhpcy5sZW5ndGg7XG5cblx0XHRpZiAoIGpRdWVyeS5pc0Z1bmN0aW9uKCB2YWx1ZSApICkge1xuXHRcdFx0cmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiggaiApIHtcblx0XHRcdFx0alF1ZXJ5KCB0aGlzICkuYWRkQ2xhc3MoIHZhbHVlLmNhbGwoIHRoaXMsIGosIHRoaXMuY2xhc3NOYW1lICkgKTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdGlmICggcHJvY2VlZCApIHtcblx0XHRcdC8vIFRoZSBkaXNqdW5jdGlvbiBoZXJlIGlzIGZvciBiZXR0ZXIgY29tcHJlc3NpYmlsaXR5IChzZWUgcmVtb3ZlQ2xhc3MpXG5cdFx0XHRjbGFzc2VzID0gKCB2YWx1ZSB8fCBcIlwiICkubWF0Y2goIHJub3R3aGl0ZSApIHx8IFtdO1xuXG5cdFx0XHRmb3IgKCA7IGkgPCBsZW47IGkrKyApIHtcblx0XHRcdFx0ZWxlbSA9IHRoaXNbIGkgXTtcblx0XHRcdFx0Y3VyID0gZWxlbS5ub2RlVHlwZSA9PT0gMSAmJiAoIGVsZW0uY2xhc3NOYW1lID9cblx0XHRcdFx0XHQoIFwiIFwiICsgZWxlbS5jbGFzc05hbWUgKyBcIiBcIiApLnJlcGxhY2UoIHJjbGFzcywgXCIgXCIgKSA6XG5cdFx0XHRcdFx0XCIgXCJcblx0XHRcdFx0KTtcblxuXHRcdFx0XHRpZiAoIGN1ciApIHtcblx0XHRcdFx0XHRqID0gMDtcblx0XHRcdFx0XHR3aGlsZSAoIChjbGF6eiA9IGNsYXNzZXNbaisrXSkgKSB7XG5cdFx0XHRcdFx0XHRpZiAoIGN1ci5pbmRleE9mKCBcIiBcIiArIGNsYXp6ICsgXCIgXCIgKSA8IDAgKSB7XG5cdFx0XHRcdFx0XHRcdGN1ciArPSBjbGF6eiArIFwiIFwiO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdC8vIG9ubHkgYXNzaWduIGlmIGRpZmZlcmVudCB0byBhdm9pZCB1bm5lZWRlZCByZW5kZXJpbmcuXG5cdFx0XHRcdFx0ZmluYWxWYWx1ZSA9IGpRdWVyeS50cmltKCBjdXIgKTtcblx0XHRcdFx0XHRpZiAoIGVsZW0uY2xhc3NOYW1lICE9PSBmaW5hbFZhbHVlICkge1xuXHRcdFx0XHRcdFx0ZWxlbS5jbGFzc05hbWUgPSBmaW5hbFZhbHVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzO1xuXHR9LFxuXG5cdHJlbW92ZUNsYXNzOiBmdW5jdGlvbiggdmFsdWUgKSB7XG5cdFx0dmFyIGNsYXNzZXMsIGVsZW0sIGN1ciwgY2xhenosIGosIGZpbmFsVmFsdWUsXG5cdFx0XHRwcm9jZWVkID0gYXJndW1lbnRzLmxlbmd0aCA9PT0gMCB8fCB0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIgJiYgdmFsdWUsXG5cdFx0XHRpID0gMCxcblx0XHRcdGxlbiA9IHRoaXMubGVuZ3RoO1xuXG5cdFx0aWYgKCBqUXVlcnkuaXNGdW5jdGlvbiggdmFsdWUgKSApIHtcblx0XHRcdHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oIGogKSB7XG5cdFx0XHRcdGpRdWVyeSggdGhpcyApLnJlbW92ZUNsYXNzKCB2YWx1ZS5jYWxsKCB0aGlzLCBqLCB0aGlzLmNsYXNzTmFtZSApICk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdFx0aWYgKCBwcm9jZWVkICkge1xuXHRcdFx0Y2xhc3NlcyA9ICggdmFsdWUgfHwgXCJcIiApLm1hdGNoKCBybm90d2hpdGUgKSB8fCBbXTtcblxuXHRcdFx0Zm9yICggOyBpIDwgbGVuOyBpKysgKSB7XG5cdFx0XHRcdGVsZW0gPSB0aGlzWyBpIF07XG5cdFx0XHRcdC8vIFRoaXMgZXhwcmVzc2lvbiBpcyBoZXJlIGZvciBiZXR0ZXIgY29tcHJlc3NpYmlsaXR5IChzZWUgYWRkQ2xhc3MpXG5cdFx0XHRcdGN1ciA9IGVsZW0ubm9kZVR5cGUgPT09IDEgJiYgKCBlbGVtLmNsYXNzTmFtZSA/XG5cdFx0XHRcdFx0KCBcIiBcIiArIGVsZW0uY2xhc3NOYW1lICsgXCIgXCIgKS5yZXBsYWNlKCByY2xhc3MsIFwiIFwiICkgOlxuXHRcdFx0XHRcdFwiXCJcblx0XHRcdFx0KTtcblxuXHRcdFx0XHRpZiAoIGN1ciApIHtcblx0XHRcdFx0XHRqID0gMDtcblx0XHRcdFx0XHR3aGlsZSAoIChjbGF6eiA9IGNsYXNzZXNbaisrXSkgKSB7XG5cdFx0XHRcdFx0XHQvLyBSZW1vdmUgKmFsbCogaW5zdGFuY2VzXG5cdFx0XHRcdFx0XHR3aGlsZSAoIGN1ci5pbmRleE9mKCBcIiBcIiArIGNsYXp6ICsgXCIgXCIgKSA+PSAwICkge1xuXHRcdFx0XHRcdFx0XHRjdXIgPSBjdXIucmVwbGFjZSggXCIgXCIgKyBjbGF6eiArIFwiIFwiLCBcIiBcIiApO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdC8vIE9ubHkgYXNzaWduIGlmIGRpZmZlcmVudCB0byBhdm9pZCB1bm5lZWRlZCByZW5kZXJpbmcuXG5cdFx0XHRcdFx0ZmluYWxWYWx1ZSA9IHZhbHVlID8galF1ZXJ5LnRyaW0oIGN1ciApIDogXCJcIjtcblx0XHRcdFx0XHRpZiAoIGVsZW0uY2xhc3NOYW1lICE9PSBmaW5hbFZhbHVlICkge1xuXHRcdFx0XHRcdFx0ZWxlbS5jbGFzc05hbWUgPSBmaW5hbFZhbHVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzO1xuXHR9LFxuXG5cdHRvZ2dsZUNsYXNzOiBmdW5jdGlvbiggdmFsdWUsIHN0YXRlVmFsICkge1xuXHRcdHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuXG5cdFx0aWYgKCB0eXBlb2Ygc3RhdGVWYWwgPT09IFwiYm9vbGVhblwiICYmIHR5cGUgPT09IFwic3RyaW5nXCIgKSB7XG5cdFx0XHRyZXR1cm4gc3RhdGVWYWwgPyB0aGlzLmFkZENsYXNzKCB2YWx1ZSApIDogdGhpcy5yZW1vdmVDbGFzcyggdmFsdWUgKTtcblx0XHR9XG5cblx0XHRpZiAoIGpRdWVyeS5pc0Z1bmN0aW9uKCB2YWx1ZSApICkge1xuXHRcdFx0cmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiggaSApIHtcblx0XHRcdFx0alF1ZXJ5KCB0aGlzICkudG9nZ2xlQ2xhc3MoIHZhbHVlLmNhbGwodGhpcywgaSwgdGhpcy5jbGFzc05hbWUsIHN0YXRlVmFsKSwgc3RhdGVWYWwgKTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKSB7XG5cdFx0XHRpZiAoIHR5cGUgPT09IFwic3RyaW5nXCIgKSB7XG5cdFx0XHRcdC8vIFRvZ2dsZSBpbmRpdmlkdWFsIGNsYXNzIG5hbWVzXG5cdFx0XHRcdHZhciBjbGFzc05hbWUsXG5cdFx0XHRcdFx0aSA9IDAsXG5cdFx0XHRcdFx0c2VsZiA9IGpRdWVyeSggdGhpcyApLFxuXHRcdFx0XHRcdGNsYXNzTmFtZXMgPSB2YWx1ZS5tYXRjaCggcm5vdHdoaXRlICkgfHwgW107XG5cblx0XHRcdFx0d2hpbGUgKCAoY2xhc3NOYW1lID0gY2xhc3NOYW1lc1sgaSsrIF0pICkge1xuXHRcdFx0XHRcdC8vIENoZWNrIGVhY2ggY2xhc3NOYW1lIGdpdmVuLCBzcGFjZSBzZXBhcmF0ZWQgbGlzdFxuXHRcdFx0XHRcdGlmICggc2VsZi5oYXNDbGFzcyggY2xhc3NOYW1lICkgKSB7XG5cdFx0XHRcdFx0XHRzZWxmLnJlbW92ZUNsYXNzKCBjbGFzc05hbWUgKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0c2VsZi5hZGRDbGFzcyggY2xhc3NOYW1lICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdC8vIFRvZ2dsZSB3aG9sZSBjbGFzcyBuYW1lXG5cdFx0XHR9IGVsc2UgaWYgKCB0eXBlID09PSBzdHJ1bmRlZmluZWQgfHwgdHlwZSA9PT0gXCJib29sZWFuXCIgKSB7XG5cdFx0XHRcdGlmICggdGhpcy5jbGFzc05hbWUgKSB7XG5cdFx0XHRcdFx0Ly8gc3RvcmUgY2xhc3NOYW1lIGlmIHNldFxuXHRcdFx0XHRcdGRhdGFfcHJpdi5zZXQoIHRoaXMsIFwiX19jbGFzc05hbWVfX1wiLCB0aGlzLmNsYXNzTmFtZSApO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gSWYgdGhlIGVsZW1lbnQgaGFzIGEgY2xhc3MgbmFtZSBvciBpZiB3ZSdyZSBwYXNzZWQgYGZhbHNlYCxcblx0XHRcdFx0Ly8gdGhlbiByZW1vdmUgdGhlIHdob2xlIGNsYXNzbmFtZSAoaWYgdGhlcmUgd2FzIG9uZSwgdGhlIGFib3ZlIHNhdmVkIGl0KS5cblx0XHRcdFx0Ly8gT3RoZXJ3aXNlIGJyaW5nIGJhY2sgd2hhdGV2ZXIgd2FzIHByZXZpb3VzbHkgc2F2ZWQgKGlmIGFueXRoaW5nKSxcblx0XHRcdFx0Ly8gZmFsbGluZyBiYWNrIHRvIHRoZSBlbXB0eSBzdHJpbmcgaWYgbm90aGluZyB3YXMgc3RvcmVkLlxuXHRcdFx0XHR0aGlzLmNsYXNzTmFtZSA9IHRoaXMuY2xhc3NOYW1lIHx8IHZhbHVlID09PSBmYWxzZSA/IFwiXCIgOiBkYXRhX3ByaXYuZ2V0KCB0aGlzLCBcIl9fY2xhc3NOYW1lX19cIiApIHx8IFwiXCI7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH0sXG5cblx0aGFzQ2xhc3M6IGZ1bmN0aW9uKCBzZWxlY3RvciApIHtcblx0XHR2YXIgY2xhc3NOYW1lID0gXCIgXCIgKyBzZWxlY3RvciArIFwiIFwiLFxuXHRcdFx0aSA9IDAsXG5cdFx0XHRsID0gdGhpcy5sZW5ndGg7XG5cdFx0Zm9yICggOyBpIDwgbDsgaSsrICkge1xuXHRcdFx0aWYgKCB0aGlzW2ldLm5vZGVUeXBlID09PSAxICYmIChcIiBcIiArIHRoaXNbaV0uY2xhc3NOYW1lICsgXCIgXCIpLnJlcGxhY2UocmNsYXNzLCBcIiBcIikuaW5kZXhPZiggY2xhc3NOYW1lICkgPj0gMCApIHtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG59KTtcblxufSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9qcXVlcnkvc3JjL2F0dHJpYnV0ZXMvY2xhc3Nlcy5qc1xuICoqIG1vZHVsZSBpZCA9IDQ1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJkZWZpbmUoW1xuXHRcIi4uL2NvcmVcIixcblx0XCIuLi92YXIvcm5vdHdoaXRlXCIsXG5cdFwiLi4vdmFyL3N0cnVuZGVmaW5lZFwiLFxuXHRcIi4uL2NvcmUvYWNjZXNzXCIsXG5cdFwiLi9zdXBwb3J0XCIsXG5cdFwiLi4vc2VsZWN0b3JcIlxuXSwgZnVuY3Rpb24oIGpRdWVyeSwgcm5vdHdoaXRlLCBzdHJ1bmRlZmluZWQsIGFjY2Vzcywgc3VwcG9ydCApIHtcblxudmFyIG5vZGVIb29rLCBib29sSG9vayxcblx0YXR0ckhhbmRsZSA9IGpRdWVyeS5leHByLmF0dHJIYW5kbGU7XG5cbmpRdWVyeS5mbi5leHRlbmQoe1xuXHRhdHRyOiBmdW5jdGlvbiggbmFtZSwgdmFsdWUgKSB7XG5cdFx0cmV0dXJuIGFjY2VzcyggdGhpcywgalF1ZXJ5LmF0dHIsIG5hbWUsIHZhbHVlLCBhcmd1bWVudHMubGVuZ3RoID4gMSApO1xuXHR9LFxuXG5cdHJlbW92ZUF0dHI6IGZ1bmN0aW9uKCBuYW1lICkge1xuXHRcdHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKSB7XG5cdFx0XHRqUXVlcnkucmVtb3ZlQXR0ciggdGhpcywgbmFtZSApO1xuXHRcdH0pO1xuXHR9XG59KTtcblxualF1ZXJ5LmV4dGVuZCh7XG5cdGF0dHI6IGZ1bmN0aW9uKCBlbGVtLCBuYW1lLCB2YWx1ZSApIHtcblx0XHR2YXIgaG9va3MsIHJldCxcblx0XHRcdG5UeXBlID0gZWxlbS5ub2RlVHlwZTtcblxuXHRcdC8vIGRvbid0IGdldC9zZXQgYXR0cmlidXRlcyBvbiB0ZXh0LCBjb21tZW50IGFuZCBhdHRyaWJ1dGUgbm9kZXNcblx0XHRpZiAoICFlbGVtIHx8IG5UeXBlID09PSAzIHx8IG5UeXBlID09PSA4IHx8IG5UeXBlID09PSAyICkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8vIEZhbGxiYWNrIHRvIHByb3Agd2hlbiBhdHRyaWJ1dGVzIGFyZSBub3Qgc3VwcG9ydGVkXG5cdFx0aWYgKCB0eXBlb2YgZWxlbS5nZXRBdHRyaWJ1dGUgPT09IHN0cnVuZGVmaW5lZCApIHtcblx0XHRcdHJldHVybiBqUXVlcnkucHJvcCggZWxlbSwgbmFtZSwgdmFsdWUgKTtcblx0XHR9XG5cblx0XHQvLyBBbGwgYXR0cmlidXRlcyBhcmUgbG93ZXJjYXNlXG5cdFx0Ly8gR3JhYiBuZWNlc3NhcnkgaG9vayBpZiBvbmUgaXMgZGVmaW5lZFxuXHRcdGlmICggblR5cGUgIT09IDEgfHwgIWpRdWVyeS5pc1hNTERvYyggZWxlbSApICkge1xuXHRcdFx0bmFtZSA9IG5hbWUudG9Mb3dlckNhc2UoKTtcblx0XHRcdGhvb2tzID0galF1ZXJ5LmF0dHJIb29rc1sgbmFtZSBdIHx8XG5cdFx0XHRcdCggalF1ZXJ5LmV4cHIubWF0Y2guYm9vbC50ZXN0KCBuYW1lICkgPyBib29sSG9vayA6IG5vZGVIb29rICk7XG5cdFx0fVxuXG5cdFx0aWYgKCB2YWx1ZSAhPT0gdW5kZWZpbmVkICkge1xuXG5cdFx0XHRpZiAoIHZhbHVlID09PSBudWxsICkge1xuXHRcdFx0XHRqUXVlcnkucmVtb3ZlQXR0ciggZWxlbSwgbmFtZSApO1xuXG5cdFx0XHR9IGVsc2UgaWYgKCBob29rcyAmJiBcInNldFwiIGluIGhvb2tzICYmIChyZXQgPSBob29rcy5zZXQoIGVsZW0sIHZhbHVlLCBuYW1lICkpICE9PSB1bmRlZmluZWQgKSB7XG5cdFx0XHRcdHJldHVybiByZXQ7XG5cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGVsZW0uc2V0QXR0cmlidXRlKCBuYW1lLCB2YWx1ZSArIFwiXCIgKTtcblx0XHRcdFx0cmV0dXJuIHZhbHVlO1xuXHRcdFx0fVxuXG5cdFx0fSBlbHNlIGlmICggaG9va3MgJiYgXCJnZXRcIiBpbiBob29rcyAmJiAocmV0ID0gaG9va3MuZ2V0KCBlbGVtLCBuYW1lICkpICE9PSBudWxsICkge1xuXHRcdFx0cmV0dXJuIHJldDtcblxuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXQgPSBqUXVlcnkuZmluZC5hdHRyKCBlbGVtLCBuYW1lICk7XG5cblx0XHRcdC8vIE5vbi1leGlzdGVudCBhdHRyaWJ1dGVzIHJldHVybiBudWxsLCB3ZSBub3JtYWxpemUgdG8gdW5kZWZpbmVkXG5cdFx0XHRyZXR1cm4gcmV0ID09IG51bGwgP1xuXHRcdFx0XHR1bmRlZmluZWQgOlxuXHRcdFx0XHRyZXQ7XG5cdFx0fVxuXHR9LFxuXG5cdHJlbW92ZUF0dHI6IGZ1bmN0aW9uKCBlbGVtLCB2YWx1ZSApIHtcblx0XHR2YXIgbmFtZSwgcHJvcE5hbWUsXG5cdFx0XHRpID0gMCxcblx0XHRcdGF0dHJOYW1lcyA9IHZhbHVlICYmIHZhbHVlLm1hdGNoKCBybm90d2hpdGUgKTtcblxuXHRcdGlmICggYXR0ck5hbWVzICYmIGVsZW0ubm9kZVR5cGUgPT09IDEgKSB7XG5cdFx0XHR3aGlsZSAoIChuYW1lID0gYXR0ck5hbWVzW2krK10pICkge1xuXHRcdFx0XHRwcm9wTmFtZSA9IGpRdWVyeS5wcm9wRml4WyBuYW1lIF0gfHwgbmFtZTtcblxuXHRcdFx0XHQvLyBCb29sZWFuIGF0dHJpYnV0ZXMgZ2V0IHNwZWNpYWwgdHJlYXRtZW50ICgjMTA4NzApXG5cdFx0XHRcdGlmICggalF1ZXJ5LmV4cHIubWF0Y2guYm9vbC50ZXN0KCBuYW1lICkgKSB7XG5cdFx0XHRcdFx0Ly8gU2V0IGNvcnJlc3BvbmRpbmcgcHJvcGVydHkgdG8gZmFsc2Vcblx0XHRcdFx0XHRlbGVtWyBwcm9wTmFtZSBdID0gZmFsc2U7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRlbGVtLnJlbW92ZUF0dHJpYnV0ZSggbmFtZSApO1xuXHRcdFx0fVxuXHRcdH1cblx0fSxcblxuXHRhdHRySG9va3M6IHtcblx0XHR0eXBlOiB7XG5cdFx0XHRzZXQ6IGZ1bmN0aW9uKCBlbGVtLCB2YWx1ZSApIHtcblx0XHRcdFx0aWYgKCAhc3VwcG9ydC5yYWRpb1ZhbHVlICYmIHZhbHVlID09PSBcInJhZGlvXCIgJiZcblx0XHRcdFx0XHRqUXVlcnkubm9kZU5hbWUoIGVsZW0sIFwiaW5wdXRcIiApICkge1xuXHRcdFx0XHRcdHZhciB2YWwgPSBlbGVtLnZhbHVlO1xuXHRcdFx0XHRcdGVsZW0uc2V0QXR0cmlidXRlKCBcInR5cGVcIiwgdmFsdWUgKTtcblx0XHRcdFx0XHRpZiAoIHZhbCApIHtcblx0XHRcdFx0XHRcdGVsZW0udmFsdWUgPSB2YWw7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiB2YWx1ZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxufSk7XG5cbi8vIEhvb2tzIGZvciBib29sZWFuIGF0dHJpYnV0ZXNcbmJvb2xIb29rID0ge1xuXHRzZXQ6IGZ1bmN0aW9uKCBlbGVtLCB2YWx1ZSwgbmFtZSApIHtcblx0XHRpZiAoIHZhbHVlID09PSBmYWxzZSApIHtcblx0XHRcdC8vIFJlbW92ZSBib29sZWFuIGF0dHJpYnV0ZXMgd2hlbiBzZXQgdG8gZmFsc2Vcblx0XHRcdGpRdWVyeS5yZW1vdmVBdHRyKCBlbGVtLCBuYW1lICk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGVsZW0uc2V0QXR0cmlidXRlKCBuYW1lLCBuYW1lICk7XG5cdFx0fVxuXHRcdHJldHVybiBuYW1lO1xuXHR9XG59O1xualF1ZXJ5LmVhY2goIGpRdWVyeS5leHByLm1hdGNoLmJvb2wuc291cmNlLm1hdGNoKCAvXFx3Ky9nICksIGZ1bmN0aW9uKCBpLCBuYW1lICkge1xuXHR2YXIgZ2V0dGVyID0gYXR0ckhhbmRsZVsgbmFtZSBdIHx8IGpRdWVyeS5maW5kLmF0dHI7XG5cblx0YXR0ckhhbmRsZVsgbmFtZSBdID0gZnVuY3Rpb24oIGVsZW0sIG5hbWUsIGlzWE1MICkge1xuXHRcdHZhciByZXQsIGhhbmRsZTtcblx0XHRpZiAoICFpc1hNTCApIHtcblx0XHRcdC8vIEF2b2lkIGFuIGluZmluaXRlIGxvb3AgYnkgdGVtcG9yYXJpbHkgcmVtb3ZpbmcgdGhpcyBmdW5jdGlvbiBmcm9tIHRoZSBnZXR0ZXJcblx0XHRcdGhhbmRsZSA9IGF0dHJIYW5kbGVbIG5hbWUgXTtcblx0XHRcdGF0dHJIYW5kbGVbIG5hbWUgXSA9IHJldDtcblx0XHRcdHJldCA9IGdldHRlciggZWxlbSwgbmFtZSwgaXNYTUwgKSAhPSBudWxsID9cblx0XHRcdFx0bmFtZS50b0xvd2VyQ2FzZSgpIDpcblx0XHRcdFx0bnVsbDtcblx0XHRcdGF0dHJIYW5kbGVbIG5hbWUgXSA9IGhhbmRsZTtcblx0XHR9XG5cdFx0cmV0dXJuIHJldDtcblx0fTtcbn0pO1xuXG59KTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2pxdWVyeS9zcmMvYXR0cmlidXRlcy9hdHRyLmpzXG4gKiogbW9kdWxlIGlkID0gNDZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImRlZmluZShbXG5cdFwiLi4vdmFyL3N1cHBvcnRcIlxuXSwgZnVuY3Rpb24oIHN1cHBvcnQgKSB7XG5cbihmdW5jdGlvbigpIHtcblx0dmFyIGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggXCJpbnB1dFwiICksXG5cdFx0c2VsZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggXCJzZWxlY3RcIiApLFxuXHRcdG9wdCA9IHNlbGVjdC5hcHBlbmRDaGlsZCggZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggXCJvcHRpb25cIiApICk7XG5cblx0aW5wdXQudHlwZSA9IFwiY2hlY2tib3hcIjtcblxuXHQvLyBTdXBwb3J0OiBpT1M8PTUuMSwgQW5kcm9pZDw9NC4yK1xuXHQvLyBEZWZhdWx0IHZhbHVlIGZvciBhIGNoZWNrYm94IHNob3VsZCBiZSBcIm9uXCJcblx0c3VwcG9ydC5jaGVja09uID0gaW5wdXQudmFsdWUgIT09IFwiXCI7XG5cblx0Ly8gU3VwcG9ydDogSUU8PTExK1xuXHQvLyBNdXN0IGFjY2VzcyBzZWxlY3RlZEluZGV4IHRvIG1ha2UgZGVmYXVsdCBvcHRpb25zIHNlbGVjdFxuXHRzdXBwb3J0Lm9wdFNlbGVjdGVkID0gb3B0LnNlbGVjdGVkO1xuXG5cdC8vIFN1cHBvcnQ6IEFuZHJvaWQ8PTIuM1xuXHQvLyBPcHRpb25zIGluc2lkZSBkaXNhYmxlZCBzZWxlY3RzIGFyZSBpbmNvcnJlY3RseSBtYXJrZWQgYXMgZGlzYWJsZWRcblx0c2VsZWN0LmRpc2FibGVkID0gdHJ1ZTtcblx0c3VwcG9ydC5vcHREaXNhYmxlZCA9ICFvcHQuZGlzYWJsZWQ7XG5cblx0Ly8gU3VwcG9ydDogSUU8PTExK1xuXHQvLyBBbiBpbnB1dCBsb3NlcyBpdHMgdmFsdWUgYWZ0ZXIgYmVjb21pbmcgYSByYWRpb1xuXHRpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoIFwiaW5wdXRcIiApO1xuXHRpbnB1dC52YWx1ZSA9IFwidFwiO1xuXHRpbnB1dC50eXBlID0gXCJyYWRpb1wiO1xuXHRzdXBwb3J0LnJhZGlvVmFsdWUgPSBpbnB1dC52YWx1ZSA9PT0gXCJ0XCI7XG59KSgpO1xuXG5yZXR1cm4gc3VwcG9ydDtcblxufSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9qcXVlcnkvc3JjL2F0dHJpYnV0ZXMvc3VwcG9ydC5qc1xuICoqIG1vZHVsZSBpZCA9IDQ3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbnZhciAkID0gcmVxdWlyZSgnJGpxdWVyeScpO1xuXG52YXIgY2FtZWxDYXNlUmVnRXggPSAvXihbQS1aXSl8W1xccy1fXShcXHcpL2c7XG52YXIgdXNlZE1lc3NhZ2VUeXBlcyA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiAnZW52aXJvbm1lbnQsdXNlci1pZGVudGlmaWNhdGlvbixlbmQtcmVxdWVzdCxiZWdpbi1yZXF1ZXN0LGFmdGVyLWFjdGlvbi1pbnZva2VkLGFmdGVyLWFjdGlvbi12aWV3LWludm9rZWQsYmVmb3JlLWV4ZWN1dGUtY29tbWFuZCxhZnRlci1leGVjdXRlLWNvbW1hbmQsYWZ0ZXItdmlldy1jb21wb25lbnQnO1xufVxudmFyIGh1ZFNjcmlwdEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnX19nbGltcHNlX2h1ZCcpO1xuICAgIFxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgbG9jYWxTdG9yYWdlOiBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PSAxKSB7XG4gICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXkpKTtcbiAgICAgICAgfVxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShrZXksIEpTT04uc3RyaW5naWZ5KHZhbHVlKSk7IFxuICAgIH0sXG4gICAgdG9DYW1lbENhc2U6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZS5yZXBsYWNlKGNhbWVsQ2FzZVJlZ0V4LCBmdW5jdGlvbihtYXRjaCwgcDEsIHAyLCBvZmZzZXQpIHtcbiAgICAgICAgICAgIGlmIChwMikge1xuICAgICAgICAgICAgICAgIHJldHVybiBwMi50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHAxLnRvTG93ZXJDYXNlKCk7ICAgICAgICBcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBjdXJyZW50UmVxdWVzdElkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGh1ZFNjcmlwdEVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLXJlcXVlc3QtaWQnKTtcbiAgICB9LFxuICAgIHJlc29sdmVDbGllbnRVcmw6IGZ1bmN0aW9uKHJlcXVlc3RJZCwgZm9sbG93KSB7XG4gICAgICAgIHZhciBjbGllbnRUZW1wbGF0ZSA9IGh1ZFNjcmlwdEVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLWNsaWVudC10ZW1wbGF0ZScpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICB2YXIgcGFyYW1zID0gJyZyZXF1ZXN0SWQ9JyArIHJlcXVlc3RJZDtcbiAgICAgICAgcGFyYW1zICs9ICcmbWV0YWRhdGFVcmk9JyArIGVuY29kZVVSSUNvbXBvbmVudChodWRTY3JpcHRFbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1tZXRhZGF0YS10ZW1wbGF0ZScpKTsgLy8gVGhpcyBoYXBwZW5zIHRvIGJlIGZ1bGx5IHJlc29sdmVkIGFscmVhZHlcbiAgICAgICAgcGFyYW1zICs9IGZvbGxvdyA/ICcmZm9sbG93PXRydWUnIDogJyc7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gY2xpZW50VGVtcGxhdGUucmVwbGFjZSgneyZyZXF1ZXN0SWQsZm9sbG93LG1ldGFkYXRhVXJpfScsIHBhcmFtcyk7IC8vIFRPRE86IFRoaXMgc2hvdWxkIHByb2JhYmx5IGJlIHJlc29sdmVkIHdpdGggYSBVUkkgVGVtcGxhdGUgbGlicmFyeVxuICAgIH0sXG4gICAgcmVzb2x2ZUNvbnRleHRVcmw6IGZ1bmN0aW9uKHJlcXVlc3RJZCkge1xuICAgICAgICB2YXIgY29udGV4dFRlbXBsYXRlID0gaHVkU2NyaXB0RWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtY29udGV4dC10ZW1wbGF0ZScpO1xuICAgICAgICBcbiAgICAgICAgdmFyIHBhcmFtcyA9IHJlcXVlc3RJZCArICcmdHlwZXM9JyArIHVzZWRNZXNzYWdlVHlwZXMoKVxuICAgICAgICBcbiAgICAgICAgdmFyIHVyaSA9IGNvbnRleHRUZW1wbGF0ZS5yZXBsYWNlKCd7Y29udGV4dElkfXsmdHlwZXN9JywgcGFyYW1zKTsgLy8gVE9ETzogVGhpcyBzaG91bGQgcHJvYmFibHkgYmUgcmVzb2x2ZWQgd2l0aCBhIFVSSSBUZW1wbGF0ZSBsaWJyYXJ5XG4gICAgICAgIHJldHVybiBlbmNvZGVVUkkodXJpKTtcbiAgICB9LFxuICAgIGlzTG9jYWxVcmk6IGZ1bmN0aW9uKHVyaSkge1xuICAgICAgICByZXR1cm4gdXJpICYmICghKHVyaS5pbmRleE9mKCdodHRwOi8vJykgPT0gMCB8fCB1cmkuaW5kZXhPZignaHR0cHM6Ly8nKSA9PSAwIHx8IHVyaS5pbmRleE9mKCcvLycpID09IDApIHx8IFxuICAgICAgICAgICAgICAgICh1cmkuc3Vic3RyaW5nKHVyaS5pbmRleE9mKCcvLycpICsgMiwgdXJpLmxlbmd0aCkgKyAnLycpLmluZGV4T2Yod2luZG93LmxvY2F0aW9uLmhvc3QgKyAnLycpID09IDApO1xuICAgIH0sXG4gICAgaHRtbEVuY29kZTogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiAhKHZhbHVlID09IG51bGwpID8gdmFsdWUucmVwbGFjZSgvJi9nLCAnJmFtcDsnKS5yZXBsYWNlKC9cIi9nLCAnJnF1b3Q7JykucmVwbGFjZSgvJy9nLCAnJiMzOTsnKS5yZXBsYWNlKC88L2csICcmbHQ7JykucmVwbGFjZSgvPi9nLCAnJmd0OycpIDogJyc7XG4gICAgfVxufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2xpYi91dGlsLmpzXG4gKiogbW9kdWxlIGlkID0gNDhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWwgPSByZXF1aXJlKCdsaWIvdXRpbC5qcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHsgXG5cdHNldHVwOiBmdW5jdGlvbiAoaG9sZGVyKSB7XG5cdFx0Ly8gZmluZCB0aGUgaW5wdXRzIGFuZCBhcyBzZWxlY3RlZCwgbWFrZSBzdXJlIHdlIGFyZSBzeW5jZWQgd2l0aCBsb2NhbCBzdG9yYWdlXG5cdFx0dmFyIGlucHV0cyA9IGhvbGRlci5maW5kKCcuZ2xpbXBzZS1odWQtc2VjdGlvbi1pbnB1dCcpLmNoYW5nZShmdW5jdGlvbigpIHtcblx0XHRcdHZhciBzdGF0ZSA9IFtdO1xuXHRcdFx0aW5wdXRzLmVhY2goZnVuY3Rpb24oKSB7IHN0YXRlLnB1c2godGhpcy5jaGVja2VkKTsgfSk7XG5cdFx0XHR1dGlsLmxvY2FsU3RvcmFnZSgnZ2xpbXBzZUh1ZERpc3BsYXknLCBzdGF0ZSk7XG5cdFx0fSk7XG5cdH0sXG5cdGN1cnJlbnQ6IGZ1bmN0aW9uICgpIHtcblx0XHQvLyBnZXQgb3V0IHRoZSBhcnJheSBzdG9yZWQgd2hpY2ggcmVwcmVzZW50cyBjdXJyZW50IHN0YXRlXG5cdFx0cmV0dXJuIHV0aWwubG9jYWxTdG9yYWdlKCdnbGltcHNlSHVkRGlzcGxheScpIHx8IFtdO1xuXHR9XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvc3RhdGUuanNcbiAqKiBtb2R1bGUgaWQgPSA0OVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgJCA9IHJlcXVpcmUoJyRqcXVlcnknKTtcbnZhciB1dGlsID0gcmVxdWlyZSgnbGliL3V0aWwnKTtcbnZhciBtZXNzYWdlUHJvY2Vzc29yID0gcmVxdWlyZSgnLi91dGlsL3JlcXVlc3QtbWVzc2FnZS1wcm9jZXNzb3InKTtcblxudmFyIHByb2Nlc3MgPSAoZnVuY3Rpb24oKSB7XG5cdHZhciBnZXRJbmRleCA9IGZ1bmN0aW9uKG1lc3NhZ2VzKSB7XG5cdFx0dmFyIGluZGV4ID0ge31cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG1lc3NhZ2VzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgbWVzc2FnZSA9IG1lc3NhZ2VzW2ldO1xuXHRcdFx0Zm9yICh2YXIgeCA9IDA7IHggPCBtZXNzYWdlLnR5cGVzLmxlbmd0aDsgeCsrKSB7XG5cdFx0XHRcdHZhciB0eXBlID0gbWVzc2FnZS50eXBlc1t4XTtcblx0XHRcdFx0aWYgKCFpbmRleFt0eXBlXSkge1xuXHRcdFx0XHRcdGluZGV4W3R5cGVdID0gW107XG5cdFx0XHRcdH1cblx0XHRcdFx0aW5kZXhbdHlwZV0ucHVzaChtZXNzYWdlKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0XG5cdFx0cmV0dXJuIGluZGV4O1xuXHR9O1xuXHR2YXIgZ2V0UGF5bG9hZCA9IGZ1bmN0aW9uKGluZGV4KSB7XG5cdFx0dmFyIHByb2Nlc3NJdGVtID0gbWVzc2FnZVByb2Nlc3Nvci5nZXRUeXBlUGF5bG9hZEl0ZW07XG5cdFx0dmFyIHByb2Nlc3NMaXN0ID0gbWVzc2FnZVByb2Nlc3Nvci5nZXRUeXBlUGF5bG9hZExpc3Q7XG5cdFx0dmFyIG1lc3NhZ2VMaXN0ID0gbWVzc2FnZVByb2Nlc3Nvci5nZXRUeXBlTWVzc2FnZUxpc3Q7XG5cdFx0XG5cdFx0cmV0dXJuIG1lc3NhZ2VQcm9jZXNzb3IuZ2V0VHlwZVN0dWN0dXJlKGluZGV4LCB7XG5cdFx0XHQnYmVnaW4tcmVxdWVzdCc6IHByb2Nlc3NJdGVtLFxuXHRcdFx0J2Vudmlyb25tZW50JzogcHJvY2Vzc0l0ZW0sXG5cdFx0XHQndXNlci1pZGVudGlmaWNhdGlvbic6IHByb2Nlc3NJdGVtLFxuXHRcdFx0Ly8nYnJvd3Nlci1uYXZpZ2F0aW9uLXRpbWluZyc6IHByb2Nlc3NJdGVtLFxuXHRcdFx0J2FmdGVyLWFjdGlvbi1pbnZva2VkJzogcHJvY2Vzc0l0ZW0sXG5cdFx0XHQnYWZ0ZXItYWN0aW9uLXZpZXctaW52b2tlZCc6IHByb2Nlc3NJdGVtLFxuXHRcdFx0J2JlZm9yZS1leGVjdXRlLWNvbW1hbmQnOiBtZXNzYWdlTGlzdCxcblx0XHRcdCdhZnRlci1leGVjdXRlLWNvbW1hbmQnOiBtZXNzYWdlTGlzdCxcblx0XHRcdCdhZnRlci12aWV3LWNvbXBvbmVudCc6IHByb2Nlc3NMaXN0LFxuXHRcdFx0J2VuZC1yZXF1ZXN0JzogcHJvY2Vzc0l0ZW1cblx0XHR9KTtcblx0fVxuXHRcbiBcdHZhciBnZXRNb2RlbCA9IChmdW5jdGlvbigpIHtcblx0XHR2YXIgYWRkID0gZnVuY3Rpb24obW9kZWwsIGl0ZW0sIG5hbWUpIHtcblx0XHRcdG1vZGVsW25hbWVdID0ge1xuXHRcdFx0XHQnZGF0YSc6IGl0ZW0sXG5cdFx0XHRcdCduYW1lJzogbmFtZVx0XG5cdFx0XHR9O1xuXHRcdH1cblx0XHRcblx0XHR2YXIgc3RyYXRlZ2llcyA9IHtcblx0XHRcdGVudmlyb25tZW50OiBmdW5jdGlvbihwYXlsb2FkKSB7XG5cdFx0XHRcdHZhciBlbnZpcm9ubWVudCA9IHBheWxvYWQuZW52aXJvbm1lbnQgfHwge307XG5cdFx0XHRcdHZhciB1c2VySWRlbnRpZmljYXRpb24gPSBwYXlsb2FkLnVzZXJJZGVudGlmaWNhdGlvbiB8fCB7fTtcblx0XHRcdFx0XG5cdFx0XHRcdHZhciByZXN1bHQgPSB7fTtcblx0XHRcdFx0cmVzdWx0LnNlcnZlck5hbWUgPSBlbnZpcm9ubWVudC5zZXJ2ZXJOYW1lO1xuXHRcdFx0XHRyZXN1bHQuc2VydmVyVGltZSA9IGVudmlyb25tZW50LnNlcnZlclRpbWU7XG5cdFx0XHRcdHJlc3VsdC5zZXJ2ZXJUaW1lem9uZU9mZnNldCA9IGVudmlyb25tZW50LnNlcnZlclRpbWV6b25lT2Zmc2V0O1xuXHRcdFx0XHRyZXN1bHQuc2VydmVyRGF5bGlnaHRTYXZpbmdUaW1lID0gZW52aXJvbm1lbnQuc2VydmVyRGF5bGlnaHRTYXZpbmdUaW1lO1xuXHRcdFx0XHRyZXN1bHQudXNlciA9ICF1c2VySWRlbnRpZmljYXRpb24uaXNBbm9ueW1vdXMgPyB1c2VySWRlbnRpZmljYXRpb24udXNlcm5hbWUgOiBudWxsO1xuXHRcdFx0XHRcblx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHRcdH0sXG5cdFx0XHRtdmM6IGZ1bmN0aW9uKHBheWxvYWQpIHtcblx0XHRcdFx0dmFyIGFmdGVyQWN0aW9uSW52b2tlZCA9IHBheWxvYWQuYWZ0ZXJBY3Rpb25JbnZva2VkIHx8IHt9O1xuXHRcdFx0XHR2YXIgYWZ0ZXJBY3Rpb25WaWV3SW52b2tlZCA9IHBheWxvYWQuYWZ0ZXJBY3Rpb25WaWV3SW52b2tlZCB8fCB7fTtcblx0XHRcdFx0XG5cdFx0XHRcdHZhciByZXN1bHQgPSB7fTtcblx0XHRcdFx0cmVzdWx0LmFjdGlvbk5hbWUgPSBhZnRlckFjdGlvbkludm9rZWQuYWN0aW9uTmFtZTtcblx0XHRcdFx0cmVzdWx0LmNvbnRyb2xsZXJOYW1lID0gYWZ0ZXJBY3Rpb25JbnZva2VkLmFjdGlvbkNvbnRyb2xsZXJOYW1lO1xuXHRcdFx0XHRyZXN1bHQuYWN0aW9uRXhlY3V0aW9uVGltZSA9IGFmdGVyQWN0aW9uSW52b2tlZC5hY3Rpb25JbnZva2VkRHVyYXRpb247XG5cdFx0XHRcdHJlc3VsdC52aWV3UmVuZGVyVGltZSA9IGFmdGVyQWN0aW9uVmlld0ludm9rZWQudmlld0R1cmF0aW9uO1xuXHRcdFx0XHQvLyByZXN1bHQudmlld05hbWUgPSAnJztcblx0XHRcdFx0Ly8gcmVzdWx0LmNoaWxkQWN0aW9uQ291bnQgPSAwO1xuXHRcdFx0XHQvLyByZXN1bHQuY2hpbGRWaWV3Q291bnQgPSAwO1xuXHRcdFx0XHQvLyByZXN1bHQubWF0Y2hlZFJvdXRlTmFtZSA9IDA7XG5cdFx0XHRcdFxuXHRcdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdFx0fSxcblx0XHRcdHNxbDogZnVuY3Rpb24ocGF5bG9hZCkge1xuXHRcdFx0XHR2YXIgYWZ0ZXJFeGVjdXRlQ29tbWFuZCA9IHBheWxvYWQuYWZ0ZXJFeGVjdXRlQ29tbWFuZCB8fCBbXTtcblx0XHRcdFx0XG5cdFx0XHRcdHZhciByZXN1bHQgPSB7fTtcblx0XHRcdFx0cmVzdWx0LnF1ZXJ5Q291bnQgPSBhZnRlckV4ZWN1dGVDb21tYW5kLmxlbmd0aDtcblx0XHRcdFx0Ly8gcmVzdWx0LmNvbm5lY3Rpb25Db3VudCA9IDA7XG5cdFx0XHRcdC8vIHJlc3VsdC50cmFuc2FjdGlvbkNvdW50ID0gMDtcblx0XHRcdFx0Ly8gcmVzdWx0LmNvbm5lY3Rpb25PcGVuVGltZSA9IDA7XG5cdFx0XHRcdHJlc3VsdC5xdWVyeUV4ZWN1dGlvblRpbWUgPSAwO1xuXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGFmdGVyRXhlY3V0ZUNvbW1hbmQubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRyZXN1bHQucXVlcnlFeGVjdXRpb25UaW1lICs9IGFmdGVyRXhlY3V0ZUNvbW1hbmRbaV0ucGF5bG9hZC5jb21tYW5kRHVyYXRpb247XG5cdFx0XHRcdH1cblx0XHRcdFx0XG5cdFx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0XHR9LFxuXHRcdFx0cmVxdWVzdDogZnVuY3Rpb24ocGF5bG9hZCkgeyBcblx0XHRcdFx0dmFyIGJlZ2luUmVxdWVzdCA9IHBheWxvYWQuYmVnaW5SZXF1ZXN0IHx8IHt9O1xuXHRcdFx0XHR2YXIgZW5kUmVxdWVzdCA9IHBheWxvYWQuZW5kUmVxdWVzdCB8fCB7fTtcblx0XHRcdFx0Ly92YXIgYnJvd3Nlck5hdmlnYXRpb25UaW1pbmcgPSBwYXlsb2FkLmJyb3dzZXJOYXZpZ2F0aW9uVGltaW5nIHx8IHt9O1xuXHRcdFx0XHRcblx0XHRcdFx0dmFyIHJlc3VsdCA9IHt9O1xuXHRcdFx0XHRyZXN1bHQucmVxdWVzdE1ldGhvZCA9IGJlZ2luUmVxdWVzdC5yZXF1ZXN0TWV0aG9kO1xuXHRcdFx0XHRyZXN1bHQucmVxdWVzdFVybCA9IGJlZ2luUmVxdWVzdC5yZXF1ZXN0VXJsO1xuXHRcdFx0XHRyZXN1bHQucmVxdWVzdFBhdGggPSBiZWdpblJlcXVlc3QucmVxdWVzdFBhdGg7XG5cdFx0XHRcdHJlc3VsdC5yZXF1ZXN0UXVlcnlTdHJpbmcgPSBiZWdpblJlcXVlc3QucmVxdWVzdFF1ZXJ5U3RyaW5nO1xuXHRcdFx0XHRyZXN1bHQucmVzcG9uc2VDb250ZW50TGVuZ3RoID0gZW5kUmVxdWVzdC5yZXNwb25zZUNvbnRlbnRMZW5ndGg7XG5cdFx0XHRcdHJlc3VsdC5yZXNwb25zZUNvbnRlbnRUeXBlID0gZW5kUmVxdWVzdC5yZXNwb25zZUNvbnRlbnRUeXBlO1xuXHRcdFx0XHRyZXN1bHQucmVzcG9uc2VTdGF0dXNDb2RlID0gZW5kUmVxdWVzdC5yZXNwb25zZVN0YXR1c0NvZGU7XG5cdFx0XHRcdHJlc3VsdC5yZXNwb25zZVN0YXR1c1RleHQgPSBlbmRSZXF1ZXN0LnJlc3BvbnNlU3RhdHVzVGV4dDtcblx0XHRcdFx0cmVzdWx0LnJlc3BvbnNlRHVyYXRpb24gPSBlbmRSZXF1ZXN0LnJlc3BvbnNlRHVyYXRpb247XG5cdFx0XHRcdFxuXHRcdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdFx0fSxcblx0XHRcdHRpbWluZ3M6IGZ1bmN0aW9uKHBheWxvYWQpIHtcblx0XHRcdFx0dmFyIGFmdGVyQWN0aW9uSW52b2tlZCA9IHBheWxvYWQuYWZ0ZXJBY3Rpb25JbnZva2VkIHx8IHt9O1xuXHRcdFx0XHR2YXIgYWZ0ZXJBY3Rpb25WaWV3SW52b2tlZCA9IHBheWxvYWQuYWZ0ZXJBY3Rpb25WaWV3SW52b2tlZCB8fCB7fTtcblx0XHRcdFx0dmFyIGJlZm9yZUV4ZWN1dGVDb21tYW5kID0gcGF5bG9hZC5iZWZvcmVFeGVjdXRlQ29tbWFuZCB8fCBbXTtcblx0XHRcdFx0dmFyIGFmdGVyRXhlY3V0ZUNvbW1hbmQgPSBwYXlsb2FkLmFmdGVyRXhlY3V0ZUNvbW1hbmQgfHwgW107XG5cdFx0XHRcdHZhciBhZnRlclZpZXdDb21wb25lbnQgPSBwYXlsb2FkLmFmdGVyVmlld0NvbXBvbmVudCB8fCBbXTtcblx0XHRcdFx0XG5cdFx0XHRcdHZhciByZXN1bHQgPSBbXTtcblx0XHRcdFx0cmVzdWx0LnB1c2goe1xuXHRcdFx0XHRcdHRpdGxlOiAnQ29udHJvbGxlcjogJyArIGFmdGVyQWN0aW9uSW52b2tlZC5hY3Rpb25Db250cm9sbGVyTmFtZSArICcuJyArIGFmdGVyQWN0aW9uSW52b2tlZC5hY3Rpb25OYW1lLFxuXHRcdFx0XHRcdHN0YXJ0VGltZTogJ05PVCBTRVQnLFxuXHRcdFx0XHRcdGR1cmF0aW9uOiBhZnRlckFjdGlvbkludm9rZWQuYWN0aW9uSW52b2tlZER1cmF0aW9uLFxuXHRcdFx0XHRcdHN0YXJ0UG9pbnQ6IGFmdGVyQWN0aW9uSW52b2tlZC5hY3Rpb25JbnZva2VkT2Zmc2V0LFxuXHRcdFx0XHRcdGNhdGVnb3J5OiAnQ29udHJvbGxlcidcblx0XHRcdFx0fSk7XG5cdFx0XHRcdHJlc3VsdC5wdXNoKHtcblx0XHRcdFx0XHR0aXRsZTogJ1JlbmRlcjogJyArIGFmdGVyQWN0aW9uSW52b2tlZC5hY3Rpb25Db250cm9sbGVyTmFtZSArICcuJyArIGFmdGVyQWN0aW9uSW52b2tlZC5hY3Rpb25OYW1lLFxuXHRcdFx0XHRcdHN0YXJ0VGltZTogJ05PVCBTRVQnLFxuXHRcdFx0XHRcdGR1cmF0aW9uOiBhZnRlckFjdGlvblZpZXdJbnZva2VkLnZpZXdEdXJhdGlvbixcblx0XHRcdFx0XHRzdGFydFBvaW50OiBhZnRlckFjdGlvblZpZXdJbnZva2VkLnZpZXdPZmZzZXQsXG5cdFx0XHRcdFx0Y2F0ZWdvcnk6ICdWaWV3J1xuXHRcdFx0XHR9KTtcblx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBhZnRlclZpZXdDb21wb25lbnQubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHR2YXIgY29tcG9uZW50ID0gYWZ0ZXJWaWV3Q29tcG9uZW50W2ldO1xuXHRcdFx0XHRcdHJlc3VsdC5wdXNoKHtcblx0XHRcdFx0XHRcdHRpdGxlOiAnQ29tcG9uZW50OiAnICsgY29tcG9uZW50LmNvbXBvbmVudE5hbWUsXG5cdFx0XHRcdFx0XHRzdGFydFRpbWU6IGNvbXBvbmVudC5jb21wb25lbnRFbmRUaW1lLFxuXHRcdFx0XHRcdFx0ZHVyYXRpb246IGNvbXBvbmVudC5jb21wb25lbnREdXJhdGlvbixcblx0XHRcdFx0XHRcdHN0YXJ0UG9pbnQ6IGNvbXBvbmVudC5jb21wb25lbnRPZmZzZXQsXG5cdFx0XHRcdFx0XHRjYXRlZ29yeTogJ0NvbnRyb2xsZXInXG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cdFxuXHRcdFx0XHRhZnRlckV4ZWN1dGVDb21tYW5kID0gYWZ0ZXJFeGVjdXRlQ29tbWFuZC5zb3J0KGZ1bmN0aW9uKGEsIGIpIHsgcmV0dXJuIGEub3JkaW5hbCAtIGIub3JkaW5hbDsgfSk7XG5cdFx0XHRcdGJlZm9yZUV4ZWN1dGVDb21tYW5kID0gYmVmb3JlRXhlY3V0ZUNvbW1hbmQuc29ydChmdW5jdGlvbihhLCBiKSB7IHJldHVybiBhLm9yZGluYWwgLSBiLm9yZGluYWw7IH0pO1xuXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGFmdGVyRXhlY3V0ZUNvbW1hbmQubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHR2YXIgYWZ0ZXJDb21tYW5kID0gYWZ0ZXJFeGVjdXRlQ29tbWFuZFtpXS5wYXlsb2FkO1xuXHRcdFx0XHRcdHZhciBiZWZvcmVDb21tYW5kID0gYmVmb3JlRXhlY3V0ZUNvbW1hbmRbaV0ucGF5bG9hZDtcblx0XHRcdFx0XHRyZXN1bHQucHVzaCh7XG5cdFx0XHRcdFx0XHR0aXRsZTogJ0NvbW1hbmQ6ICcgKyBiZWZvcmVDb21tYW5kLmNvbW1hbmRNZXRob2QsXG5cdFx0XHRcdFx0XHRzdGFydFRpbWU6IGFmdGVyQ29tbWFuZC5jb21tYW5kRW5kVGltZSxcblx0XHRcdFx0XHRcdGR1cmF0aW9uOiBhZnRlckNvbW1hbmQuY29tbWFuZER1cmF0aW9uLFxuXHRcdFx0XHRcdFx0c3RhcnRQb2ludDogYWZ0ZXJDb21tYW5kLmNvbW1hbmRPZmZzZXQsXG5cdFx0XHRcdFx0XHRjYXRlZ29yeTogJ0NvbW1hbmQnXG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cdFx0XG5cdFx0XHRcdFxuXHRcdFx0XHRyZXN1bHQgPSByZXN1bHQuc29ydChmdW5jdGlvbihhLCBiKSB7IHJldHVybiAoYS5zdGFydFBvaW50IHx8IDApIC0gKGIuc3RhcnRQb2ludCB8fCAwKTsgfSk7XHRcblx0XHRcdFx0XG5cdFx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0XHR9XG5cdFx0fTtcblx0XHRcblx0XHRyZXR1cm4gZnVuY3Rpb24ocGF5bG9hZCkge1xuXHRcdFx0dmFyIG1vZGVsID0ge307XG5cdFx0XHRhZGQobW9kZWwsIHN0cmF0ZWdpZXMuZW52aXJvbm1lbnQocGF5bG9hZCksICdlbnZpcm9ubWVudCcpO1xuXHRcdFx0YWRkKG1vZGVsLCBzdHJhdGVnaWVzLm12YyhwYXlsb2FkKSwgJ212YycpO1xuXHRcdFx0YWRkKG1vZGVsLCBzdHJhdGVnaWVzLnNxbChwYXlsb2FkKSwgJ3NxbCcpO1xuXHRcdFx0YWRkKG1vZGVsLCBzdHJhdGVnaWVzLnJlcXVlc3QocGF5bG9hZCksICdyZXF1ZXN0Jyk7XG5cdFx0XHRhZGQobW9kZWwsIHN0cmF0ZWdpZXMudGltaW5ncyhwYXlsb2FkKSwgJ3RpbWluZ3MnKTtcblx0XHRcdFxuXHRcdFx0cmV0dXJuIG1vZGVsO1xuXHRcdH07XG5cdH0pKCk7XG5cblx0cmV0dXJuIGZ1bmN0aW9uKG1lc3NhZ2VzKSB7XG5cdFx0dmFyIGluZGV4ID0gZ2V0SW5kZXgobWVzc2FnZXMpO1xuXHRcdHZhciBwYXlsb2FkID0gZ2V0UGF5bG9hZChpbmRleCk7XG5cdFx0dmFyIG1vZGVsID0gZ2V0TW9kZWwocGF5bG9hZCk7XG5cdFx0XG5cdFx0cmV0dXJuIG1vZGVsO1xuXHR9O1xufSkoKTtcblxudmFyIGdldERhdGEgPSBmdW5jdGlvbihjYWxsYmFjaykge1xuXHQkLmdldEpTT04odXRpbC5yZXNvbHZlQ29udGV4dFVybCh1dGlsLmN1cnJlbnRSZXF1ZXN0SWQoKSksIG51bGwsIGZ1bmN0aW9uKGRhdGEpIHtcblx0XHR2YXIgbW9kZWwgPSBwcm9jZXNzKGRhdGEpO1xuXHRcdGNhbGxiYWNrKG1vZGVsKTtcblx0fSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXHRnZXREYXRhOiBnZXREYXRhXG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvcmVwb3NpdG9yeS5qc1xuICoqIG1vZHVsZSBpZCA9IDUwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlsID0gcmVxdWlyZSgnbGliL3V0aWwuanMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cdGdldFR5cGVTdHVjdHVyZTogZnVuY3Rpb24oaW5kZXgsIHR5cGVPcHRpb25zKSB7XG5cdFx0dmFyIHJlc3VsdCA9IHt9O1xuXHRcdGZvciAodmFyIGtleSBpbiB0eXBlT3B0aW9ucykge1xuXHRcdFx0dmFyIGNhbGxiYWNrID0gdHlwZU9wdGlvbnNba2V5XTtcblx0XHRcdHJlc3VsdFt1dGlsLnRvQ2FtZWxDYXNlKGtleSldID0gY2FsbGJhY2soaW5kZXgsIGtleSlcblx0XHR9XG5cdFx0XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSxcblx0Z2V0VHlwZVBheWxvYWRJdGVtOiBmdW5jdGlvbihpbmRleCwgdHlwZSkge1xuXHRcdHZhciBtZXNzYWdlcyA9IGluZGV4W3R5cGVdOyBcblx0XHRpZiAobWVzc2FnZXMpIHtcblx0XHRcdHJldHVybiBtZXNzYWdlc1swXS5wYXlsb2FkO1xuXHRcdH1cblx0fSxcblx0Z2V0VHlwZVBheWxvYWRMaXN0OiBmdW5jdGlvbihpbmRleCwgdHlwZSkge1xuXHRcdHZhciBtZXNzYWdlcyA9IGluZGV4W3R5cGVdOyBcblx0XHRpZiAobWVzc2FnZXMpIHtcblx0XHRcdHJldHVybiBtZXNzYWdlcy5tYXAoZnVuY3Rpb24obWVzc2FnZSkgeyByZXR1cm4gbWVzc2FnZS5wYXlsb2FkOyB9KTtcblx0XHR9XG5cdH0sXG5cdGdldFR5cGVNZXNzYWdlSXRlbTogZnVuY3Rpb24oaW5kZXgsIHR5cGUpIHtcblx0XHR2YXIgbWVzc2FnZXMgPSBpbmRleFt0eXBlXTsgXG5cdFx0aWYgKG1lc3NhZ2VzKSB7XG5cdFx0XHRyZXR1cm4gbWVzc2FnZXNbMF07XG5cdFx0fVxuXHR9LFxuXHRnZXRUeXBlTWVzc2FnZUxpc3Q6IGZ1bmN0aW9uKGluZGV4LCB0eXBlKSB7XG5cdFx0dmFyIG1lc3NhZ2VzID0gaW5kZXhbdHlwZV07IFxuXHRcdGlmIChtZXNzYWdlcykge1xuXHRcdFx0cmV0dXJuIG1lc3NhZ2VzO1xuXHRcdH1cblx0fVxufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL3V0aWwvcmVxdWVzdC1tZXNzYWdlLXByb2Nlc3Nvci5qc1xuICoqIG1vZHVsZSBpZCA9IDUxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbnZhciBfc2VjdGlvbnMgPSBbXTtcblxudmFyIHJlZ2lzdGVyID0gZnVuY3Rpb24oc2VjdGlvbikge1xuXHRfc2VjdGlvbnMucHVzaChzZWN0aW9uKTtcbn1cbnZhciByZW5kZXIgPSBmdW5jdGlvbihkZXRhaWxzLCBzdGF0ZSkge1xuXHR2YXIgaHRtbCA9ICcnO1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IF9zZWN0aW9ucy5sZW5ndGg7IGkrKykge1xuXHRcdGh0bWwgKz0gX3NlY3Rpb25zW2ldLnJlbmRlcihkZXRhaWxzLCBzdGF0ZVtpXSk7XG5cdH1cblx0cmV0dXJuIGh0bWw7XG59XG52YXIgcG9zdFJlbmRlciA9IGZ1bmN0aW9uKGhvbGRlciwgZGV0YWlscykge1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IF9zZWN0aW9ucy5sZW5ndGg7IGkrKykge1xuXHRcdGlmIChfc2VjdGlvbnNbaV0ucG9zdFJlbmRlcikge1xuXHRcdFx0X3NlY3Rpb25zW2ldLnBvc3RSZW5kZXIoaG9sZGVyLCBkZXRhaWxzKTtcblx0XHR9XG5cdH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cdHJlZ2lzdGVyOiByZWdpc3RlcixcbiAgICByZW5kZXI6IHJlbmRlcixcbiAgICBwb3N0UmVuZGVyOiBwb3N0UmVuZGVyXG59O1xuXG4vLyBUT0RPOiBOZWVkIHRvIGNvbWUgdXAgd2l0aCBhIGJldHRlciBzZWxmIHJlZ2lzdHJhdGlvbiBwcm9jZXNzXG5yZXF1aXJlKCcuL3NlY3Rpb24taHR0cCcpO1xucmVxdWlyZSgnLi9zZWN0aW9uLWhvc3QnKTtcbnJlcXVpcmUoJy4vc2VjdGlvbi1hamF4Jyk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL3NlY3Rpb25zL3NlY3Rpb24uanNcbiAqKiBtb2R1bGUgaWQgPSA1MlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgcmVuZGVyaW5nID0gcmVxdWlyZSgnLi91dGlsL3JlbmRlcmluZycpO1xudmFyIHByb2Nlc3MgPSByZXF1aXJlKCcuL3V0aWwvcHJvY2VzcycpO1xudmFyICQgPSByZXF1aXJlKCckanF1ZXJ5Jyk7XG5cbnZhciB0aW1pbmdzUmF3ID0gKHdpbmRvdy5wZXJmb3JtYW5jZSB8fCB3aW5kb3cubW96UGVyZm9ybWFuY2UgfHwgd2luZG93Lm1zUGVyZm9ybWFuY2UgfHwgd2luZG93LndlYmtpdFBlcmZvcm1hbmNlIHx8IHt9KS50aW1pbmc7XG52YXIgdGltaW5nSW5jb21wbGV0ZSA9IGZhbHNlO1xuXG52YXIgc3RydWN0dXJlID0ge1xuXHR0aXRsZTogJ0hUVFAnLFxuXHRpZDogJ2h0dHAnLCBcblx0Y29sb3I6ICcjZTI4NzVlJyxcblx0cG9wdXA6IHtcblx0XHRyZW5kZXI6IGZ1bmN0aW9uKGRldGFpbHMpIHtcblx0XHRcdHZhciByZXF1ZXN0RGV0YWlscyA9IGRldGFpbHMucmVxdWVzdC5kYXRhLFxuXHRcdFx0XHRodG1sID0gJzxkaXYgY2xhc3M9XCJnbGltcHNlLWh1ZC1wb3B1cC1oZWFkZXJcIj5Ccm93c2VyIFJlcXVlc3Q8L2Rpdj4nO1xuXHRcdFx0aHRtbCArPSAnPGRpdj48ZGl2IGNsYXNzPVwiZ2xpbXBzZS1odWQtc3VtbWFyeS1sZWZ0XCI+JyArIHJlbmRlcmluZy5pdGVtKHN0cnVjdHVyZS5sYXlvdXQucG9wdXAucmVxdWVzdCwgZGV0YWlscykgKyAnPC9kaXY+Jztcblx0XHRcdGh0bWwgKz0gJzx0YWJsZSBjbGFzcz1cImdsaW1wc2UtaHVkLXN1bW1hcnkgZ2xpbXBzZS1odWQtc3VtbWFyeS1yaWdodFwiPjx0cj48dGQgd2lkdGg9XCIxXCIgY2xhc3M9XCJnbGltcHNlLWh1ZC1saXN0aW5nLW92ZXJmbG93XCI+JyArIHJlbmRlcmluZy5pdGVtKHN0cnVjdHVyZS5sYXlvdXQucG9wdXAuaG9zdCwgZGV0YWlscykgKyAnPC90ZD48L3RyPjx0cj48dGQgY2xhc3M9XCJnbGltcHNlLWh1ZC1saXN0aW5nLW92ZXJmbG93XCI+JyArIHJlbmRlcmluZy5pdGVtKHN0cnVjdHVyZS5sYXlvdXQucG9wdXAucHJpbmNpcGFsLCBkZXRhaWxzKSAgKyAnPC90ZD48L3RyPjwvdGFibGU+PC9kaXY+Jztcblx0XHRcdGh0bWwgKz0gJzxkaXYgY2xhc3M9XCJnbGltcHNlLWh1ZC1wb3B1cC1jbGVhclwiPjwvZGl2Pic7XG5cdFx0XHRodG1sICs9ICc8ZGl2IGNsYXNzPVwiZ2xpbXBzZS1kYXRhLXJlcXVlc3QtcGFydHNcIj48dGFibGU+PHRyPjx0ZCBjb2xzcGFuPVwiM1wiPjxkaXYgY2xhc3M9XCJnbGltcHNlLWh1ZC1iYXIgZ2xpbXBzZS1odWQtdG9vbHRpcHMtbm9uXCI+PGRpdj48ZGl2IGNsYXNzPVwiZ2xpbXBzZS1odWQtYmFyLWl0ZW1cIiBzdHlsZT1cIndpZHRoOiAxMDAlO2JhY2tncm91bmQtY29sb3I6ICcgKyByZXF1ZXN0RGV0YWlscy5icm93c2VyLmNhdGVnb3J5Q29sb3IgKyAnXCI+PC9kaXY+PGRpdiBjbGFzcz1cImdsaW1wc2UtaHVkLWJhci1pdGVtIGdsaW1wc2UtaHVkLWJhci1pdGVtLXNlcnZlclwiIHN0eWxlPVwid2lkdGg6ICcgKyAocmVxdWVzdERldGFpbHMuc2VydmVyLnBlcmNlbnRhZ2UgKyByZXF1ZXN0RGV0YWlscy5uZXR3b3JrLnBlcmNlbnRhZ2UpICsgJyU7YmFja2dyb3VuZC1jb2xvcjogJyArIHJlcXVlc3REZXRhaWxzLnNlcnZlci5jYXRlZ29yeUNvbG9yICsgJztcIj48L2Rpdj48ZGl2IGNsYXNzPVwiZ2xpbXBzZS1odWQtYmFyLWl0ZW0gZ2xpbXBzZS1odWQtYmFyLWl0ZW0tbmV0d29ya1wiIHN0eWxlPVwid2lkdGg6ICcgKyByZXF1ZXN0RGV0YWlscy5uZXR3b3JrLnBlcmNlbnRhZ2UgKyAnJTtiYWNrZ3JvdW5kLWNvbG9yOiAnICsgcmVxdWVzdERldGFpbHMubmV0d29yay5jYXRlZ29yeUNvbG9yICsgJztcIj48L2Rpdj48L2Rpdj48L2Rpdj48L3RkPjwvdHI+PHRyPjx0ZCBjbGFzcz1cImdsaW1wc2UtZGF0YS13aXJlLXBhcnRcIj4nICsgcmVuZGVyaW5nLml0ZW0oc3RydWN0dXJlLmxheW91dC5wb3B1cC53aXJlLCBkZXRhaWxzKSArICc8L3RkPjx0ZCBjbGFzcz1cImdsaW1wc2UtZGF0YS1zZXJ2ZXItcGFydFwiPicgKyByZW5kZXJpbmcuaXRlbShzdHJ1Y3R1cmUubGF5b3V0LnBvcHVwLnNlcnZlciwgZGV0YWlscykgKyAnPC90ZD48dGQgY2xhc3M9XCJnbGltcHNlLWRhdGEtY2xpZW50LXBhcnRcIj4nICsgcmVuZGVyaW5nLml0ZW0oc3RydWN0dXJlLmxheW91dC5wb3B1cC5jbGllbnQsIGRldGFpbHMpICsgJzwvdGQ+PC90cj48L3RhYmxlPjwvZGl2Pic7IFxuXG5cdFx0XHRyZXR1cm4gaHRtbDtcblx0XHR9XG5cdH0sXG5cdGRlZmF1bHRzOiB7XG5cdFx0cmVxdWVzdDogeyB0aXRsZTogJ1JlcXVlc3QnLCBkZXNjcmlwdGlvbjogJ1RvdGFsIHJlcXVlc3QgdGltZSBmcm9tIGNsaWNrIHRvIGRvbSByZWFkeScsIHZpc2libGU6IHRydWUsIHNpemU6IDEsIHBvc2l0aW9uOiAwLCBhbGlnbjogMCwgcG9zdGZpeDogJ21zJywgZ2V0RGF0YTogZnVuY3Rpb24oZGV0YWlscykgeyByZXR1cm4gZGV0YWlscy5yZXF1ZXN0LmRhdGEudG90YWwuZHVyYXRpb247IH0sIGlkOiAnZ2xpbXBzZS1odWQtZGF0YS1yZXF1ZXN0JyB9LFxuXHRcdHdpcmU6IHsgdGl0bGU6ICdOZXR3b3JrJywgZGVzY3JpcHRpb246ICdUb3RhbCB0aW1lIG9uIHRoZSBuZXR3b3JrJywgdmlzaWJsZTogdHJ1ZSwgc2l6ZTogMiwgcG9zaXRpb246IDAsIGFsaWduOiAwLCBwb3N0Zml4OiAnbXMnLCBnZXREYXRhOiBmdW5jdGlvbihkZXRhaWxzKSB7IHZhciBkdXJhdGlvbiA9IGRldGFpbHMucmVxdWVzdC5kYXRhLm5ldHdvcmsuZHVyYXRpb247IHJldHVybiBkdXJhdGlvbiA9PT0gbnVsbCA/ICcuLi4nIDogZHVyYXRpb247IH0sIGlkOiAnZ2xpbXBzZS1odWQtZGF0YS1uZXR3b3JrJyB9LFxuXHRcdHNlcnZlcjogeyB0aXRsZTogJ1NlcnZlcicsIGRlc2NyaXB0aW9uOiAnVG90YWwgdGltZSBvbiB0aGUgc2VydmVyJywgdmlzaWJsZTogdHJ1ZSwgc2l6ZTogMiwgcG9zaXRpb246IDAsIGFsaWduOiAwLCBwb3N0Zml4OiAnbXMnLCBnZXREYXRhOiBmdW5jdGlvbihkZXRhaWxzKSB7IHJldHVybiBkZXRhaWxzLnJlcXVlc3QuZGF0YS5zZXJ2ZXIuZHVyYXRpb247IH0sIGlkOiAnZ2xpbXBzZS1odWQtZGF0YS1zZXJ2ZXInIH0sXG5cdFx0Y2xpZW50OiB7IHRpdGxlOiAnQ2xpZW50JywgZGVzY3JpcHRpb246ICdUb3RhbCB0aW1lIGluIGJyb3dzZXIgKHRvIGxvYWQpJywgdmlzaWJsZTogdHJ1ZSwgc2l6ZTogMiwgcG9zaXRpb246IDAsIGFsaWduOiAwLCBwb3N0Zml4OiAnbXMnLCBnZXREYXRhOiBmdW5jdGlvbihkZXRhaWxzKSB7IHZhciBkdXJhdGlvbiA9IGRldGFpbHMucmVxdWVzdC5kYXRhLmJyb3dzZXIuZHVyYXRpb247IHJldHVybiBkdXJhdGlvbiA9PT0gbnVsbCA/ICcuLi4nIDogZHVyYXRpb247IH0sIGlkOiAnZ2xpbXBzZS1odWQtZGF0YS1jbGllbnQnIH0sIFxuXHRcdGhvc3Q6IHsgdGl0bGU6ICdIb3N0JywgZGVzY3JpcHRpb246ICdTZXJ2ZXIgdGhhdCByZXNwb25kZWQgdG8gdGhlIHJlcXVlc3QnLCB2aXNpYmxlOiB0cnVlLCBzaXplOiAyLCBwb3NpdGlvbjogMSwgYWxpZ246IDEsIHBvc3RmaXg6ICcnLCBnZXRMYXlvdXREYXRhOiBmdW5jdGlvbihkZXRhaWxzKSB7IHJldHVybiAnPGRpdiBjbGFzcz1cImdsaW1wc2UtaHVkLWxpc3Rpbmctb3ZlcmZsb3dcIiBzdHlsZT1cIm1heC13aWR0aDoxNzBweDtcIj4nICsgZGV0YWlscy5lbnZpcm9ubWVudC5kYXRhLnNlcnZlck5hbWUgKyAnPC9kaXY+JzsgfSB9LCBcblx0XHRwcmluY2lwYWw6IHsgdGl0bGU6ICdQcmluY2lwYWwnLCBkZXNjcmlwdGlvbjogJ1ByaW5jaXBhbCB0aGF0IGlzIGN1cnJlbnRseSBsb2dnZWQgaW4gZm9yIHRoaXMgc2Vzc2lvbicsIHZpc2libGU6IGZ1bmN0aW9uKGRldGFpbHMpIHsgcmV0dXJuIGRldGFpbHMuZW52aXJvbm1lbnQuZGF0YS51c2VyOyB9LCBzaXplOiAyLCBwb3NpdGlvbjogMSwgYWxpZ246IDEsIHBvc3RmaXg6ICcnLCBnZXRMYXlvdXREYXRhOiBmdW5jdGlvbihkZXRhaWxzKSB7IHJldHVybiAnPGRpdiBjbGFzcz1cImdsaW1wc2UtaHVkLWxpc3Rpbmctb3ZlcmZsb3dcIiBzdHlsZT1cIm1heC13aWR0aDoxMjBweDtcIj4nICsgZGV0YWlscy5lbnZpcm9ubWVudC5kYXRhLnVzZXIgKyAnPC9kaXY+JzsgfSB9XG5cdH0sXG5cdGxheW91dDoge1xuXHRcdG1pbmk6IHtcblx0XHRcdHJlcXVlc3Q6IHt9LFxuXHRcdFx0d2lyZToge30sXG5cdFx0XHRzZXJ2ZXI6IHt9LFxuXHRcdFx0Y2xpZW50OiB7fVxuXHRcdH0sXG5cdFx0cG9wdXA6IHtcblx0XHRcdHJlcXVlc3Q6IHsgdGl0bGU6ICdUb3RhbCBSZXF1ZXN0IFRpbWUnLCBzaXplOiAwLCBwb3NpdGlvbjogMSwgYWxpZ246IDEgfSxcblx0XHRcdHdpcmU6IHsgcG9zaXRpb246IDEsIGFsaWduOiAxIH0sXG5cdFx0XHRzZXJ2ZXI6IHsgcG9zaXRpb246IDEsIGFsaWduOiAxIH0sXG5cdFx0XHRjbGllbnQ6IHsgcG9zaXRpb246IDEsIGFsaWduOiAxIH0sXG5cdFx0XHRob3N0OiB7IH0sXG5cdFx0XHRwcmluY2lwYWw6IHsgfVxuXHRcdH1cblx0fVxufTtcblxudmFyIGNhbGN1bGF0ZVRpbWluZ3MgPSBmdW5jdGlvbih0aW1pbmdzUmF3LCBzdGFydEluZGV4LCBmaW5pc2hJbmRleCkgeyBcblx0cmV0dXJuIHRpbWluZ3NSYXdbZmluaXNoSW5kZXhdIC0gdGltaW5nc1Jhd1tzdGFydEluZGV4XTtcbn07XG52YXIgZ2V0VGltaW5ncyA9IGZ1bmN0aW9uKGRldGFpbHMsIHRpbWluZ3NSYXcpIHtcblx0dmFyIG5ldHdvcmsgPSBjYWxjdWxhdGVUaW1pbmdzKHRpbWluZ3NSYXcsICdyZXNwb25zZVN0YXJ0JywgJ3Jlc3BvbnNlRW5kJykgKyBjYWxjdWxhdGVUaW1pbmdzKHRpbWluZ3NSYXcsICduYXZpZ2F0aW9uU3RhcnQnLCAncmVxdWVzdFN0YXJ0JyksXG5cdFx0c2VydmVyID0gY2FsY3VsYXRlVGltaW5ncyh0aW1pbmdzUmF3LCAncmVxdWVzdFN0YXJ0JywgJ3Jlc3BvbnNlRW5kJyksXG5cdFx0YnJvd3NlciA9IGNhbGN1bGF0ZVRpbWluZ3ModGltaW5nc1JhdywgJ3Jlc3BvbnNlU3RhcnQnLCAnbG9hZEV2ZW50RW5kJyksXG5cdFx0dG90YWwgPSBjYWxjdWxhdGVUaW1pbmdzKHRpbWluZ3NSYXcsICduYXZpZ2F0aW9uU3RhcnQnLCAnbG9hZEV2ZW50RW5kJyk7XG5cdFx0XG5cdC8vIHRyeWluZyB0byBhdm9pZCBuZWdpdGl2ZSB2YWx1ZXMgc2hvd2luZyB1cFxuXHRpZiAoc2VydmVyIDw9IDApIHtcblx0XHRzZXJ2ZXIgPSBwcmFzZUludChkZXRhaWxzLnJlcXVlc3QuZGF0YS5yZXNwb25zZUR1cmF0aW9uKTtcblx0fVxuXHRpZiAobmV0d29yayA8IDAgfHwgYnJvd3NlciA8IDApIHtcblx0XHRpZiAobmV0d29yayA8IDApIHtcblx0XHRcdG5ldHdvcmsgPSAwO1xuXHRcdH1cblx0XHRpZiAoYnJvd3NlciA8IDApIHtcblx0XHRcdGJyb3dzZXIgPSAwO1xuXHRcdH1cblx0XHR0aW1pbmdJbmNvbXBsZXRlID0gdHJ1ZTtcblx0fVxuXHRlbHNlIHtcblx0XHR0aW1pbmdJbmNvbXBsZXRlID0gZmFsc2U7XG5cdH1cblx0XG5cdHJldHVybiB7IG5ldHdvcms6IG5ldHdvcmssIHNlcnZlcjogc2VydmVyLCBicm93c2VyOiBicm93c2VyLCB0b3RhbDogdG90YWwgfTtcbn07XG52YXIgcHJvY2Vzc1RpbWluZ3MgPSBmdW5jdGlvbihkZXRhaWxzLCB0aW1pbmdzUmF3KSB7XG5cdHZhciB0aW1pbmcgPSBnZXRUaW1pbmdzKGRldGFpbHMsIHRpbWluZ3NSYXcpLFxuXHRcdHJlc3VsdCA9IHtcblx0XHRcdG5ldHdvcms6IHsgY2F0ZWdvcnlDb2xvcjogJyNGREJGNDUnLCBkdXJhdGlvbjogdGltaW5nLm5ldHdvcmsgPT09IDAgPyBudWxsIDogdGltaW5nLm5ldHdvcmssIHBlcmNlbnRhZ2U6ICh0aW1pbmcubmV0d29yayAvIHRpbWluZy50b3RhbCkgKiAxMDAgfSxcblx0XHRcdHNlcnZlcjogeyBjYXRlZ29yeUNvbG9yOiAnI0FGNzhERCcsIGR1cmF0aW9uOiB0aW1pbmcuc2VydmVyLCBwZXJjZW50YWdlOiAodGltaW5nLnNlcnZlciAvIHRpbWluZy50b3RhbCkgKiAxMDAgfSxcblx0XHRcdGJyb3dzZXI6IHsgY2F0ZWdvcnlDb2xvcjogJyM3MkEzRTQnLCBkdXJhdGlvbjogdGltaW5nLmJyb3dzZXIgPT09IDAgPyBudWxsIDogdGltaW5nLmJyb3dzZXIsIHBlcmNlbnRhZ2U6ICh0aW1pbmcuYnJvd3NlciAvIHRpbWluZy50b3RhbCkgKiAxMDAgfSxcblx0XHRcdHRvdGFsOiB7IGNhdGVnb3J5Q29sb3I6ICcjMTBFMzA5JywgZHVyYXRpb246IHRpbWluZy50b3RhbCwgcGVyY2VudGFnZTogMTAwIH1cblx0XHR9O1xuXHRcdFxuXHRkZXRhaWxzLnJlcXVlc3QgPSB7IGRhdGE6IHJlc3VsdCwgbmFtZTogJ1JlcXVlc3QnIH07XG59O1xuXHRcbnZhciByZW5kZXIgPSBmdW5jdGlvbihkZXRhaWxzLCBvcGVuZWQpIHtcblx0dmFyIGh0bWwgPSAnJztcblx0XG5cdGlmICh0aW1pbmdzUmF3KSB7XG5cdFx0cHJvY2Vzcy5pbml0KHN0cnVjdHVyZSk7XG5cdFx0cHJvY2Vzc1RpbWluZ3MoZGV0YWlscywgdGltaW5nc1Jhdyk7IFxuXHRcdFxuXHRcdGh0bWwgPSByZW5kZXJpbmcuc2VjdGlvbihzdHJ1Y3R1cmUsIGRldGFpbHMsIG9wZW5lZCk7IFxuXHR9XG5cblx0cmV0dXJuIGh0bWw7XG59O1xudmFyIHBvc3RSZW5kZXIgPSBmdW5jdGlvbihob2xkZXIsIGRldGFpbHMpIHtcblx0aWYgKHRpbWluZ0luY29tcGxldGUpIHtcblx0XHR0cnlVcGRhdGVCcm93c2VyRGF0YShkZXRhaWxzKTtcblx0fVxufTtcblxudmFyIHRyeVVwZGF0ZUJyb3dzZXJEYXRhID0gZnVuY3Rpb24oZGV0YWlscykge1xuXHR2YXIgdGltaW5nID0gZ2V0VGltaW5ncyhkZXRhaWxzLCB0aW1pbmdzUmF3KTtcblx0aWYgKHRpbWluZ0luY29tcGxldGUpIHtcblx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkgeyB0cnlVcGRhdGVCcm93c2VyRGF0YShkZXRhaWxzKTsgfSwgMTAwKVxuXHR9XG5cdGVsc2Uge1xuXHRcdHVwZGF0ZUJyb3dzZXJEYXRhKGRldGFpbHMsIHRpbWluZyk7XG5cdH1cbn07XG52YXIgdXBkYXRlQnJvd3NlckRhdGEgPSBmdW5jdGlvbihkZXRhaWxzLCB0aW1pbmcpIHtcblx0dmFyIGRhdGEgPSBkZXRhaWxzLnJlcXVlc3QuZGF0YTtcblx0XG5cdC8vIGFkanVzdCB0aW1pbmdzXG5cdGRhdGEubmV0d29yay5kdXJhdGlvbiA9IHRpbWluZy5uZXR3b3JrO1xuXHRkYXRhLmJyb3dzZXIuZHVyYXRpb24gPSB0aW1pbmcuYnJvd3Nlcjtcblx0ZGF0YS5zZXJ2ZXIuZHVyYXRpb24gPSB0aW1pbmcuc2VydmVyO1xuXHRkYXRhLnRvdGFsLmR1cmF0aW9uID0gdGltaW5nLnRvdGFsO1xuXHRcblx0Ly8gYWRqdXN0IHBlcmNlbnRhZ2Vcblx0ZGF0YS5icm93c2VyLnBlcmNlbnRhZ2UgPSAoZGF0YS5icm93c2VyLmR1cmF0aW9uIC8gZGF0YS50b3RhbC5kdXJhdGlvbikgKiAxMDA7XG5cdGRhdGEuc2VydmVyLnBlcmNlbnRhZ2UgPSAoZGF0YS5zZXJ2ZXIuZHVyYXRpb24gLyBkYXRhLnRvdGFsLmR1cmF0aW9uKSAqIDEwMDtcblx0ZGF0YS5uZXR3b3JrLnBlcmNlbnRhZ2UgPSAoZGF0YS5uZXR3b3JrLmR1cmF0aW9uIC8gZGF0YS50b3RhbC5kdXJhdGlvbikgKiAxMDA7XG5cdFxuXHQvLyBtYW51YWxseSB1cGRhdGUgdGhlIGRvbVxuXHQkKCcuZ2xpbXBzZS1odWQtZGF0YS1uZXR3b3JrIC5nbGltcHNlLWh1ZC1kYXRhJykudGV4dChkYXRhLm5ldHdvcmsuZHVyYXRpb24pO1xuXHQkKCcuZ2xpbXBzZS1odWQtZGF0YS1jbGllbnQgLmdsaW1wc2UtaHVkLWRhdGEnKS50ZXh0KGRhdGEuYnJvd3Nlci5kdXJhdGlvbik7XG5cdCQoJy5nbGltcHNlLWh1ZC1kYXRhLXNlcnZlciAuZ2xpbXBzZS1odWQtZGF0YScpLnRleHQoZGF0YS5zZXJ2ZXIuZHVyYXRpb24pO1xuXHQkKCcuZ2xpbXBzZS1odWQtZGF0YS1yZXF1ZXN0IC5nbGltcHNlLWh1ZC1kYXRhJykudGV4dChkYXRhLnRvdGFsLmR1cmF0aW9uKTtcblx0XG5cdCQoJy5nbGltcHNlLWh1ZC1iYXItaXRlbS1zZXJ2ZXInKS5hdHRyKCdzdHlsZScsICdiYWNrZ3JvdW5kLWNvbG9yOiAnICsgZGF0YS5zZXJ2ZXIuY2F0ZWdvcnlDb2xvciArICc7d2lkdGg6JyArIChkYXRhLnNlcnZlci5wZXJjZW50YWdlICsgZGF0YS5uZXR3b3JrLnBlcmNlbnRhZ2UpICsgJyUnKTtcblx0JCgnLmdsaW1wc2UtaHVkLWJhci1pdGVtLW5ldHdvcmsnKS5hdHRyKCdzdHlsZScsICdiYWNrZ3JvdW5kLWNvbG9yOiAnICsgZGF0YS5uZXR3b3JrLmNhdGVnb3J5Q29sb3IgKyAnO3dpZHRoOicgKyBkYXRhLm5ldHdvcmsucGVyY2VudGFnZSArICclJyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXHRyZW5kZXI6IHJlbmRlcixcblx0cG9zdFJlbmRlcjogcG9zdFJlbmRlclxufTtcblxuLy8gVE9ETzogTmVlZCB0byBjb21lIHVwIHdpdGggYSBiZXR0ZXIgc2VsZiByZWdpc3RyYXRpb24gcHJvY2Vzc1xuKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc2VjdGlvbiA9IHJlcXVpcmUoJ3NlY3Rpb25zL3NlY3Rpb24nKTtcblxuICAgIHNlY3Rpb24ucmVnaXN0ZXIobW9kdWxlLmV4cG9ydHMpO1xufSkoKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL3NlY3Rpb25zL3NlY3Rpb24taHR0cC5qc1xuICoqIG1vZHVsZSBpZCA9IDUzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbnZhciAkID0gcmVxdWlyZSgnJGpxdWVyeScpO1xuXG52YXIgc2l6ZXMgPSBbICdleHRyYS1sYXJnZScsICdsYXJnZScsICdub3JtYWwnLCAnc21hbGwnLCAnZXh0cmEtc21hbGwnIF07XG52YXIgcG9zaXRpb24gPSBbICd0b3AnLCAnYm90dG9tJywgJ2xlZnQnLCAncmlnaHQnIF07XG52YXIgYWxpZ24gPSBbICdsZWZ0JywgJ3JpZ2h0JyBdO1xuXG52YXIgc2hvdWxkVXNlID0gZnVuY3Rpb24oaXNWaXNpYmxlLCBkZXRhaWxzKSB7XG5cdGlmIChpc1Zpc2libGUgIT09IHVuZGVmaW5lZCAmJiBpc1Zpc2libGUpIHtcblx0XHR2YXIgaXNGdW5jdGlvbiA9ICQuaXNGdW5jdGlvbihpc1Zpc2libGUpO1xuXHRcdHJldHVybiAoaXNGdW5jdGlvbiAmJiBpc1Zpc2libGUoZGV0YWlscykpIHx8ICghaXNGdW5jdGlvbiAmJiBpc1Zpc2libGUpO1xuXHR9XG5cdHJldHVybiB0cnVlO1xufTtcbnZhciBwb3B1cCA9IGZ1bmN0aW9uKHN0cnVjdHVyZSwgZGV0YWlscykge1xuXHRyZXR1cm4gJzxkaXYgY2xhc3M9XCJnbGltcHNlLWh1ZC1wb3B1cFwiIHN0eWxlPVwiYm9yZGVyLWNvbG9yOicgKyBzdHJ1Y3R1cmUuY29sb3IgKyAnO1wiPjxsYWJlbCBjbGFzcz1cImdsaW1wc2UtaHVkLXRpdGxlXCIgZm9yPVwiZ2xpbXBzZS1odWQtc2VjdGlvbi1pbnB1dC0nICsgc3RydWN0dXJlLmlkICsgJ1wiPjxzcGFuPicgKyBzdHJ1Y3R1cmUudGl0bGUgKyAnPC9zcGFuPjwvbGFiZWw+PGRpdiBjbGFzcz1cImdsaW1wc2UtaHVkLXBvcHVwLWlubmVyXCI+JyArIHN0cnVjdHVyZS5wb3B1cC5yZW5kZXIoZGV0YWlscykgKyAnPC9kaXY+PC9kaXY+PGRpdiBjbGFzcz1cImdsaW1wc2UtaHVkLXBvcHVwLWV4cGFuZGVyXCI+PC9kaXY+Jztcbn07XG52YXIgc2VjdGlvbiA9IGZ1bmN0aW9uKHN0cnVjdHVyZSwgZGV0YWlscywgb3BlbmVkKSB7XG5cdHZhciBodG1sID0gJzxkaXYgY2xhc3M9XCJnbGltcHNlLWh1ZC1zZWN0aW9uIGdsaW1wc2UtaHVkLXNlY3Rpb24tJyArIHN0cnVjdHVyZS5pZCArICdcIiBzdHlsZT1cImJvcmRlci1jb2xvcjonICsgc3RydWN0dXJlLmNvbG9yICsgJ1wiPic7XG5cdFxuXHRodG1sICs9ICc8bGFiZWwgY2xhc3M9XCJnbGltcHNlLWh1ZC10aXRsZVwiIGZvcj1cImdsaW1wc2UtaHVkLXNlY3Rpb24taW5wdXQtJyArIHN0cnVjdHVyZS5pZCArICdcIj48c3Bhbj4nICsgc3RydWN0dXJlLnRpdGxlICsgJzwvc3Bhbj48L2xhYmVsPjxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBjbGFzcz1cImdsaW1wc2UtaHVkLXNlY3Rpb24taW5wdXRcIiBpZD1cImdsaW1wc2UtaHVkLXNlY3Rpb24taW5wdXQtJyArIHN0cnVjdHVyZS5pZCArICdcIicgKyAob3BlbmVkID8gJyBjaGVja2VkPVwiY2hlY2tlZFwiJyA6ICcnKSArICcgLz4nO1xuXHRodG1sICs9ICc8ZGl2IGNsYXNzPVwiZ2xpbXBzZS1odWQtc2VjdGlvbi1pbm5lclwiPic7ICBcblx0Zm9yICh2YXIga2V5IGluIHN0cnVjdHVyZS5sYXlvdXQubWluaSkge1xuXHRcdGh0bWwgKz0gaXRlbShzdHJ1Y3R1cmUubGF5b3V0Lm1pbmlba2V5XSwgZGV0YWlscyk7XG5cdH1cblx0aHRtbCArPSAnPC9kaXY+Jztcblx0XG5cdGlmICghc3RydWN0dXJlLnBvcHVwLnN1cHByZXNzKSB7IGh0bWwgKz0gcG9wdXAoc3RydWN0dXJlLCBkZXRhaWxzKTsgfVxuXHRcblx0cmV0dXJuIGh0bWwgKyAnPC9kaXY+Jztcbn07XG52YXIgaXRlbSA9IGZ1bmN0aW9uKGl0ZW0sIGRldGFpbHMpIHtcblx0dmFyIGh0bWwgPSAnJztcblx0aWYgKHNob3VsZFVzZShpdGVtLnZpc2libGUsIGRldGFpbHMpKSB7XG5cdFx0dmFyIHRpdGxlID0gJzxkaXYgY2xhc3M9XCJnbGltcHNlLWh1ZC1oZWFkZXJcIj4nICsgaXRlbS50aXRsZSArICc8L2Rpdj4nLFxuXHRcdFx0cG9zdGZpeCA9IGl0ZW0ucG9zdGZpeCA/ICc8c3BhbiBjbGFzcz1cImdsaW1wc2UtaHVkLXBvc3RmaXhcIj4nICsgaXRlbS5wb3N0Zml4ICsgJzwvc3Bhbj4nIDogJycsXG5cdFx0XHR2YWx1ZSA9IGl0ZW0uZ2V0TGF5b3V0RGF0YSA/IGl0ZW0uZ2V0TGF5b3V0RGF0YShkZXRhaWxzKSA6ICc8c3BhbiBjbGFzcz1cImdsaW1wc2UtaHVkLWRhdGFcIj4nICsgaXRlbS5nZXREYXRhKGRldGFpbHMpICsgJzwvc3Bhbj4nICsgcG9zdGZpeCxcblx0XHRcdGlkID0gaXRlbS5pZCA/ICcgJyArIGl0ZW0uaWQgOiAnJztcblx0XHRcblx0XHRodG1sICs9IGl0ZW0uZ2V0TGF5b3V0ID8gaXRlbS5nZXRMYXlvdXQoZGV0YWlscykgOiAnPGRpdiBjbGFzcz1cImdsaW1wc2UtaHVkLWRldGFpbCBnbGltcHNlLWh1ZC1kZXRhaWwtJyArIHNpemVzW2l0ZW0uc2l6ZV0gKyAnIGdsaW1wc2UtaHVkLWRldGFpbC1wb3NpdGlvbi0nICsgcG9zaXRpb25baXRlbS5wb3NpdGlvbl0gKyAnIGdsaW1wc2UtaHVkLWRldGFpbC1hbGlnbi0nICsgYWxpZ25baXRlbS5hbGlnbl0gKyBpZCArICdcIiB0aXRsZT1cIicgKyBpdGVtLmRlc2NyaXB0aW9uICsgJ1wiPicgKyAoaXRlbS5wb3NpdGlvbiAlIDIgPT0gMCA/IHRpdGxlIDogJycpICsgJzxkaXYgY2xhc3M9XCJnbGltcHNlLWh1ZC12YWx1ZVwiPicgKyB2YWx1ZSArICc8L2Rpdj4nICsgKGl0ZW0ucG9zaXRpb24gJSAyID09IDEgPyB0aXRsZSA6ICcnKSArICc8L2Rpdj4nO1xuXHR9XG5cblx0cmV0dXJuIGh0bWw7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblx0c2VjdGlvbjogc2VjdGlvbixcblx0aXRlbTogaXRlbSxcblx0cG9wdXA6IHBvcHVwXG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvc2VjdGlvbnMvdXRpbC9yZW5kZXJpbmcuanNcbiAqKiBtb2R1bGUgaWQgPSA1NFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgJCA9IHJlcXVpcmUoJyRqcXVlcnknKTtcblxudmFyIGl0ZW0gPSBmdW5jdGlvbihsYXlvdXQsIGRlZmF1bHRzKSB7XG5cdGZvciAodmFyIGtleSBpbiBsYXlvdXQpIHtcblx0XHRsYXlvdXRba2V5XSA9ICQuZXh0ZW5kKHRydWUsIHt9LCBkZWZhdWx0c1trZXldLCBsYXlvdXRba2V5XSk7XG5cdH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXHRpbml0OiBmdW5jdGlvbihwYXlsb2FkKSB7XG5cdFx0aXRlbShwYXlsb2FkLmxheW91dC5taW5pLCBwYXlsb2FkLmRlZmF1bHRzKTtcblx0XHRpdGVtKHBheWxvYWQubGF5b3V0LnBvcHVwLCBwYXlsb2FkLmRlZmF1bHRzKTtcblx0fVxufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL3NlY3Rpb25zL3V0aWwvcHJvY2Vzcy5qc1xuICoqIG1vZHVsZSBpZCA9IDU1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbnZhciAkID0gcmVxdWlyZSgnJGpxdWVyeScpO1xuXG52YXIgcmVuZGVyaW5nID0gcmVxdWlyZSgnLi91dGlsL3JlbmRlcmluZycpO1xudmFyIHByb2Nlc3MgPSByZXF1aXJlKCcuL3V0aWwvcHJvY2VzcycpO1xuXG52YXIgZ2V0VGltZVZhbHVlID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUgPCAxID8gJzxzcGFuIGNsYXNzPVwiZ2xpbXBzZS1odWQtcHJlZml4LXN1cGVyXCI+Jmx0Ozwvc3Bhbj4xJyA6IHZhbHVlO1xufTtcblxudmFyIHN0cnVjdHVyZSA9IHtcbiAgICB0aXRsZTogJ0hvc3QnLFxuICAgIGlkOiAnaG9zdCcsIFxuICAgIGNvbG9yOiAnIzYxNjFlMCcsXG4gICAgcG9wdXA6IHtcbiAgICAgICAgcmVuZGVyOiBmdW5jdGlvbihkZXRhaWxzKSB7XG4gICAgICAgICAgICB2YXIgaGFzVHJpdmlhbCA9IGZhbHNlLFxuICAgICAgICAgICAgICAgIGh0bWwgPSAnPGRpdiBjbGFzcz1cImdsaW1wc2UtaHVkLXBvcHVwLWhlYWRlclwiPlNlcnZlciBTaWRlPC9kaXY+JztcbiAgICAgICAgICAgIGh0bWwgKz0gJzxkaXY+PGRpdiBzdHlsZT1cInBvc2l0aW9uOiBhYnNvbHV0ZTsgcmlnaHQ6IDA7IG1hcmdpbi1yaWdodDogMTZweDtcIj4nICsgcmVuZGVyaW5nLml0ZW0oc3RydWN0dXJlLmxheW91dC5wb3B1cC50aW1lLCBkZXRhaWxzKSArICc8L2Rpdj48dGFibGUgY2xhc3M9XCJnbGltcHNlLWh1ZC1zdW1tYXJ5IGdsaW1wc2UtaHVkLXN1bW1hcnktc3BhY2UgZ2xpbXBzZS1odWQtc3VtbWFyeS1sZWZ0XCI+PHRyPjx0aD4nICsgKHJlbmRlcmluZy5pdGVtKHN0cnVjdHVyZS5sYXlvdXQucG9wdXAuYWN0aW9uLCBkZXRhaWxzKSB8fCByZW5kZXJpbmcuaXRlbShzdHJ1Y3R1cmUubGF5b3V0LnBvcHVwLmxvYWRpbmcsIGRldGFpbHMpKSArICc8L3RoPjwvdHI+PHRyPjx0ZD4nICsgKHJlbmRlcmluZy5pdGVtKHN0cnVjdHVyZS5sYXlvdXQucG9wdXAuY29udHJvbGxlciwgZGV0YWlscykgfHwgcmVuZGVyaW5nLml0ZW0oc3RydWN0dXJlLmxheW91dC5wb3B1cC52aWV3U3RhdGVTaXplLCBkZXRhaWxzKSkgKyAnPC90ZD48L3RyPjwvdGFibGU+JztcbiAgICAgICAgICAgIGh0bWwgKz0gJzx0YWJsZSBjbGFzcz1cImdsaW1wc2UtaHVkLXN1bW1hcnkgZ2xpbXBzZS1odWQtc3VtbWFyeS1zcGFjZSBnbGltcHNlLWh1ZC1zdW1tYXJ5LXJpZ2h0XCI+PHRyPjx0ZCB3aWR0aD1cIjFcIj4nICsgKHJlbmRlcmluZy5pdGVtKHN0cnVjdHVyZS5sYXlvdXQucG9wdXAudmlldywgZGV0YWlscykgfHwgcmVuZGVyaW5nLml0ZW0oc3RydWN0dXJlLmxheW91dC5wb3B1cC5yZW5kZXJpbmcsIGRldGFpbHMpKSArICc8L3RkPicgKyAoZGV0YWlscy5zcWwgPyAnPHRkIHdpZHRoPVwiNjBcIj48L3RkPjx0ZD4nICsgcmVuZGVyaW5nLml0ZW0oc3RydWN0dXJlLmxheW91dC5wb3B1cC5xdWVyaWVzLCBkZXRhaWxzKSArICc8L3RkPicgOiAnJykgKyAnPC90cj48dHI+PHRkPicgKyByZW5kZXJpbmcuaXRlbShzdHJ1Y3R1cmUubGF5b3V0LnBvcHVwLnNlcnZlciwgZGV0YWlscykgKyAnPC90ZD4nICsgKGRldGFpbHMuc3FsID8gJzx0ZD48L3RkPjx0ZD4nICsgcmVuZGVyaW5nLml0ZW0oc3RydWN0dXJlLmxheW91dC5wb3B1cC5jb25uZWN0aW9ucywgZGV0YWlscykgKyAnPC90ZD4nIDogJycpICsgJzwvdHI+PC90YWJsZT48L2Rpdj4nO1xuICAgICAgICAgICAgaHRtbCArPSAnPGRpdiBjbGFzcz1cImdsaW1wc2UtaHVkLXBvcHVwLWNsZWFyXCI+PC9kaXY+JzsgXG4gICAgICAgICAgICBodG1sICs9ICc8dGFibGUgY2xhc3M9XCJnbGltcHNlLWh1ZC1saXN0aW5nXCIgc3R5bGU9XCJ0YWJsZS1sYXlvdXQ6Zml4ZWQ7XCI+PHRoZWFkPjx0cj48dGg+PC90aD48dGggY2xhc3M9XCJnbGltcHNlLWh1ZC1saXN0aW5nLXZhbHVlIGdsaW1wc2UtZGF0YS1jaGlsZGxlc3MtZHVyYXRpb25cIj5kdXJhdGlvbiAobXMpPC90aD48dGggY2xhc3M9XCJnbGltcHNlLWh1ZC1saXN0aW5nLXZhbHVlIGdsaW1wc2UtZGF0YS1jaGlsZGxlc3Mtc3RhcnQtcG9pbnRcIj5mcm9tIHN0YXJ0IChtcyk8L3RoPjwvdHI+PC90aGVhZD4nOyAgXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRldGFpbHMudGltaW5ncy5kYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIGl0ZW0gPSBkZXRhaWxzLnRpbWluZ3MuZGF0YVtpXSxcbiAgICAgICAgICAgICAgICAgICAgaXNUcml2aWFsID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IG5lZWQgdG8gcHV0IHRoaXMgYmFjayBpbiBhdCBzb21lIHBvaW50XG4gICAgICAgICAgICAgICAgICAgIC8vaXNUcml2aWFsID0gaXRlbS5kdXJhdGlvbiA8IDI7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKCFpdGVtLnN1cHByZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBtYXhMZW5ndGggPSAoMTYgKyAoZGV0YWlscy5zcWwgPyAxMCA6IDApKSAtIGl0ZW0ubmVzdGluZyAqIDI7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB2YXIgcm93Q2xhc3MgPSAnJztcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0uaWQgfHwgaXNUcml2aWFsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByb3dDbGFzcyA9ICcgY2xhc3M9XCInICsgKGl0ZW0uaWQgPyBpdGVtLmlkIDogJycgKSArIChpc1RyaXZpYWwgPyAnIGdsaW1wc2UtaHVkLXF1aXRlJyA6ICcnKSArICdcIic7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGh0bWwgKz0gJzx0Ym9keScgKyAoaXNUcml2aWFsID8gJyBjbGFzcz1cImdsaW1wc2UtZGF0YS10cml2aWFsXCInIDogJycpICsgJz4nO1xuICAgICAgICAgICAgICAgICAgICBodG1sICs9ICc8dHInICsgcm93Q2xhc3MgKyAnPjx0ZCBjbGFzcz1cImdsaW1wc2UtaHVkLWxpc3Rpbmctb3ZlcmZsb3dcIiBzdHlsZT1cInBhZGRpbmctbGVmdDonICsgKGl0ZW0ubmVzdGluZyAqIDE1KSArICdweDtcIiAnICsgKGl0ZW0uZGVzY3JpcHRpb24ubGVuZ3RoID4gbWF4TGVuZ3RoID8gJ3RpdGxlPVwiJyArIGl0ZW0uZGVzY3JpcHRpb24gKyAnXCInIDogJycpICsnPicgKyBpdGVtLmRlc2NyaXB0aW9uICsgJzwvdGQ+PHRkIGNsYXNzPVwiZ2xpbXBzZS1odWQtbGlzdGluZy12YWx1ZSBnbGltcHNlLWRhdGEtY2hpbGRsZXNzLWR1cmF0aW9uIGdsaW1wc2UtaHVkLWRhdGFcIj4nICsgaXRlbS5kdXJhdGlvbiArICc8L3RkPjx0ZCBjbGFzcz1cImdsaW1wc2UtaHVkLWxpc3RpbmctdmFsdWUgZ2xpbXBzZS1kYXRhLWNoaWxkbGVzcy1zdGFydC1wb2ludFwiPjxzcGFuIGNsYXNzPVwiZ2xpbXBzZS1odWQtcHJlZml4XCI+Kzwvc3Bhbj4nICsgaXRlbS5zdGFydFBvaW50ICsgJzwvdGQ+PC90cj4nO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5xdWVyaWVzICYmIGl0ZW0ucXVlcmllcy5saXN0aW5nLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGh0bWwgKz0gJzx0cj48dGQgY2xhc3M9XCJnbGltcHNlLWRhdGEtcXVlcnktc3VtbWFyeVwiIHN0eWxlPVwicGFkZGluZy1sZWZ0OicgKyAoKGl0ZW0ubmVzdGluZyAqIDE1KSArIDIwKSArICdweDtcIj48c3BhbiBjbGFzcz1cImdsaW1wc2UtaHVkLXByZWZpeFwiPuKepTwvc3Bhbj48c3BhbiBjbGFzcz1cImdsaW1wc2UtaHVkLWxpc3RpbmctdmFsdWVcIj4nICsgaXRlbS5xdWVyaWVzLmxpc3RpbmcubGVuZ3RoICsgJzwvc3Bhbj48c3BhbiBjbGFzcz1cImdsaW1wc2UtaHVkLXBvc3RmaXhcIj4nICsgKGl0ZW0ucXVlcmllcy5saXN0aW5nLmxlbmd0aCA9PSAxID8gJ3F1ZXJ5JyA6ICdxdWVyaWVzJykgKyAnPC9zcGFuPiA8c3BhbiBjbGFzcz1cImdsaW1wc2UtaHVkLWxpc3RpbmctdmFsdWVcIj4nICsgaXRlbS5xdWVyaWVzLmR1cmF0aW9uU3VtLnRvRml4ZWQoMikgKyAnPC9zcGFuPjxzcGFuIGNsYXNzPVwiZ2xpbXBzZS1odWQtcG9zdGZpeFwiPm1zPC9zcGFuPjwvdGQ+PHRkPjwvdGQ+PHRkPjwvdGQ+PC90cj4nO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGh0bWwgKz0gJzwvdGJvZHk+JztcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzVHJpdmlhbCkgeyBoYXNUcml2aWFsID0gdHJ1ZTsgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gICAgXG4gICAgICAgICAgICBodG1sICs9ICc8L3RhYmxlPic7XG4gICAgICAgICAgICBpZiAoaGFzVHJpdmlhbCkge1xuICAgICAgICAgICAgICAgIGh0bWwgKz0gJzxkaXYgY2xhc3M9XCJnbGltcHNlLWh1ZC1jb250cm9sc1wiPjxzcGFuIGNsYXNzPVwiZ2xpbXBzZS1jb250cm9sLXRyaXZpYWxcIj5TaG93IFRyaXZpYWw8L3NwYW4+PHNwYW4gY2xhc3M9XCJnbGltcHNlLWNvbnRyb2wtdHJpdmlhbFwiIHN0eWxlPVwiZGlzcGxheTpub25lXCI+SGlkZSBUcml2aWFsPC9zcGFuPjwvZGl2Pic7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBodG1sO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBkZWZhdWx0czoge1xuICAgICAgICBzZXJ2ZXI6IHsgdGl0bGU6ICdTZXJ2ZXIgVGltZScsIGRlc2NyaXB0aW9uOiAnVG90YWwgdGltZSBvbiB0aGUgc2VydmVyJywgdmlzaWJsZTogZnVuY3Rpb24oZGV0YWlscykgeyByZXR1cm4gZGV0YWlscy5yZXF1ZXN0OyB9LCBzaXplOiAxLCBwb3NpdGlvbjogMSwgYWxpZ246IDEsIHBvc3RmaXg6ICdtcycsIGdldERhdGE6IGZ1bmN0aW9uIChkZXRhaWxzKSB7IHJldHVybiBkZXRhaWxzLnJlcXVlc3QuZGF0YS5zZXJ2ZXIuZHVyYXRpb247IH0sIGlkOiAnZ2xpbXBzZS1odWQtZGF0YS1zZXJ2ZXInIH0sXG4gICAgICAgIGFjdGlvbjogeyB0aXRsZTogJ0FjdGlvbicsIGRlc2NyaXB0aW9uOiAnSG93IGxvbmcgcm9vdCBBY3Rpb24gdG9vayB0byBleGVjdXRlJywgdmlzaWJsZTogZnVuY3Rpb24oZGV0YWlscykgeyByZXR1cm4gZGV0YWlscy5tdmMgJiYgZGV0YWlscy5tdmMuZGF0YSAmJiBkZXRhaWxzLm12Yy5kYXRhLmFjdGlvbkV4ZWN1dGlvblRpbWUgIT0gbnVsbDsgfSwgc2l6ZTogMSwgcG9zaXRpb246IDAsIGFsaWduOiAwLCBwb3N0Zml4OiAnbXMnLCBnZXREYXRhOiBmdW5jdGlvbihkZXRhaWxzKSB7IHJldHVybiBnZXRUaW1lVmFsdWUocGFyc2VJbnQoZGV0YWlscy5tdmMuZGF0YS5hY3Rpb25FeGVjdXRpb25UaW1lKSk7IH0gfSxcbiAgICAgICAgdmlldzogeyB0aXRsZTogJ1ZpZXcnLCBkZXNjcmlwdGlvbjogJ0hvdyBsb25nIHJvb3QgVmlldyB0b29rIHRvIHJlbmRlcicsIHZpc2libGU6IGZ1bmN0aW9uKGRldGFpbHMpIHsgcmV0dXJuIGRldGFpbHMubXZjICYmIGRldGFpbHMubXZjLmRhdGEgJiYgZGV0YWlscy5tdmMuZGF0YS52aWV3UmVuZGVyVGltZSAhPSBudWxsOyB9LCBzaXplOiAxLCBwb3NpdGlvbjogMCwgYWxpZ246IDAsIHBvc3RmaXg6ICdtcycsIGdldERhdGE6IGZ1bmN0aW9uKGRldGFpbHMpIHsgcmV0dXJuIGdldFRpbWVWYWx1ZShwYXJzZUludChkZXRhaWxzLm12Yy5kYXRhLnZpZXdSZW5kZXJUaW1lKSk7IH0gfSxcbiAgICAgICAgY29udHJvbGxlcjogeyB0aXRsZTogJ0NvbnRyb2xsZXIvQWN0aW9uJywgZGVzY3JpcHRpb246ICdOYW1lIG9mIHRoZSByb290IENvbnRyb2xsZXIgYW5kIEFjdGlvbicsIHZpc2libGU6IGZ1bmN0aW9uKGRldGFpbHMpIHsgcmV0dXJuIGRldGFpbHMubXZjICYmIGRldGFpbHMubXZjLmRhdGE7IH0sIHNpemU6IDIsIHBvc2l0aW9uOiAwLCBhbGlnbjogMCwgcG9zdGZpeDogJ21zJywgZ2V0TGF5b3V0RGF0YTogZnVuY3Rpb24oZGV0YWlscykgeyByZXR1cm4gJzxzcGFuIGNsYXNzPVwiZ2xpbXBzZS1odWQtZGF0YVwiPicgKyBkZXRhaWxzLm12Yy5kYXRhLmNvbnRyb2xsZXJOYW1lICsgJzwvc3Bhbj48c3BhbiBjbGFzcz1cImdsaW1wc2UtaHVkLXBsYWluXCI+Ljwvc3Bhbj48c3BhbiBjbGFzcz1cImdsaW1wc2UtaHVkLWRhdGFcIj4nICsgZGV0YWlscy5tdmMuZGF0YS5hY3Rpb25OYW1lICsgJzwvc3Bhbj48c3BhbiBjbGFzcz1cImdsaW1wc2UtaHVkLXBsYWluXCI+KC4uLik8L3NwYW4+JzsgfSB9LFxuICAgICAgICBxdWVyaWVzOiB7IHRpdGxlOiAnREIgUXVlcmllcycsIGRlc2NyaXB0aW9uOiAnVG90YWwgcXVlcnkgZHVyYXRpb24gYW5kIG51bWJlciBvZiBhbGwgU1FMIHF1ZXJpZXMnLCB2aXNpYmxlOiBmdW5jdGlvbihkZXRhaWxzKSB7IHJldHVybiBkZXRhaWxzLnNxbCAmJiBkZXRhaWxzLnNxbC5kYXRhOyB9LCBzaXplOiAxLCBwb3NpdGlvbjogMCwgYWxpZ246IDAsIGdldExheW91dERhdGE6IGZ1bmN0aW9uKGRldGFpbHMpIHsgcmV0dXJuICc8c3BhbiBjbGFzcz1cImdsaW1wc2UtaHVkLWRhdGFcIj4nICsgcGFyc2VJbnQoZGV0YWlscy5zcWwuZGF0YS5xdWVyeUV4ZWN1dGlvblRpbWUpICsgJzwvc3Bhbj48c3BhbiBjbGFzcz1cImdsaW1wc2UtaHVkLXBvc3RmaXhcIj5tczwvc3Bhbj48c3BhbiBjbGFzcz1cImdsaW1wc2UtaHVkLXNwYWNlclwiPi88L3NwYW4+PHNwYW4gY2xhc3M9XCJnbGltcHNlLWh1ZC1kYXRhXCI+JyAgKyBkZXRhaWxzLnNxbC5kYXRhLnF1ZXJ5Q291bnQgKyAnPC9zcGFuPic7IH0gfSxcbiAgICAgICAgY29ubmVjdGlvbnM6IHsgdGl0bGU6ICdEQiBDb25uZWN0aW9ucycsIGRlc2NyaXB0aW9uOiAnVG90YWwgY29ubmVjdGlvbiBvcGVuIHRpbWUgYW5kIG51bWJlciBvZiBhbGwgU1FMIGNvbm5lY3Rpb25zIHVzZWQnLCB2aXNpYmxlOiBmdW5jdGlvbiAoZGV0YWlscykgeyByZXR1cm4gZGV0YWlscy5zcWwgJiYgZGV0YWlscy5zcWwuZGF0YSAmJiBkZXRhaWxzLnNxbC5kYXRhLmNvbm5lY3Rpb25Db3VudDsgfSwgc2l6ZTogMSwgcG9zaXRpb246IDEsIGFsaWduOiAxLCBnZXRMYXlvdXREYXRhOiBmdW5jdGlvbiAoZGV0YWlscykgeyByZXR1cm4gJzxzcGFuIGNsYXNzPVwiZ2xpbXBzZS1odWQtZGF0YVwiPicgKyBwYXJzZUludChkZXRhaWxzLnNxbC5kYXRhLmNvbm5lY3Rpb25PcGVuVGltZSkgKyAnPC9zcGFuPjxzcGFuIGNsYXNzPVwiZ2xpbXBzZS1odWQtcG9zdGZpeFwiPm1zPC9zcGFuPjxzcGFuIGNsYXNzPVwiZ2xpbXBzZS1odWQtc3BhY2VyXCI+Lzwvc3Bhbj48c3BhbiBjbGFzcz1cImdsaW1wc2UtaHVkLWRhdGFcIj4nICsgZGV0YWlscy5zcWwuZGF0YS5jb25uZWN0aW9uQ291bnQgKyAnPC9zcGFuPic7IH0gfSxcbiAgICAgICAgdGltZTogeyB0aXRsZTogJ1NlcnZlciBUaW1lJywgZGVzY3JpcHRpb246ICdUaW1lIG9uIHRoZSBzZXJ2ZXInLCB2aXNpYmxlOiBmdW5jdGlvbiAoZGV0YWlscykgeyByZXR1cm4gZGV0YWlscy5lbnZpcm9ubWVudCAmJiBkZXRhaWxzLmVudmlyb25tZW50LmRhdGE7IH0sIHNpemU6IDQsIHBvc2l0aW9uOiAyLCBhbGlnbjogMSwgZ2V0TGF5b3V0RGF0YTogZnVuY3Rpb24gKGRldGFpbHMpIHsgdmFyIGRpZmYgPSBwYXJzZUludCgobmV3IERhdGUoZGV0YWlscy5lbnZpcm9ubWVudC5kYXRhLnNlcnZlclRpbWUgKyAnICcgKyBkZXRhaWxzLmVudmlyb25tZW50LmRhdGEuc2VydmVyVGltZXpvbmVPZmZzZXQpIC0gbmV3IERhdGUoKSkgLyAxMDAwIC8gNjAgLyA2MCk7IHJldHVybiAnPHNwYW4gY2xhc3M9XCJnbGltcHNlLWh1ZC1kYXRhXCI+JyArIGRldGFpbHMuZW52aXJvbm1lbnQuZGF0YS5zZXJ2ZXJUaW1lICsgJzwvc3Bhbj4gPHNwYW4gY2xhc3M9XCJnbGltcHNlLWh1ZC1wcmVmaXhcIiB0aXRsZT1cIkNvb3JkaW5hdGVkIFVuaXZlcnNhbCBUaW1lXCI+VVRDPC9zcGFuPjxzcGFuIGNsYXNzPVwiZ2xpbXBzZS1odWQtZGF0YVwiPicgKyBkZXRhaWxzLmVudmlyb25tZW50LmRhdGEuc2VydmVyVGltZXpvbmVPZmZzZXQgKyAnPC9zcGFuPiAnICsgKGRldGFpbHMuZW52aXJvbm1lbnQuZGF0YS5zZXJ2ZXJEYXlsaWdodFNhdmluZ1RpbWUgPyAnIDxzcGFuIGNsYXNzPVwiZ2xpbXBzZS1odWQtcGxhaW5cIj4oPC9zcGFuPjxzcGFuIGNsYXNzPVwiZ2xpbXBzZS1odWQtZGF0YVwiPncvRExTPC9zcGFuPjxzcGFuIGNsYXNzPVwiZ2xpbXBzZS1odWQtcGxhaW5cIj4pPC9zcGFuPicgOiAnJykgKyAoZGlmZiA/ICc8c3BhbiBjbGFzcz1cImdsaW1wc2UtaHVkLXNwYWNlclwiPiA8L3NwYW4+PHNwYW4gdGl0bGU9XCJUaW1lIGRpZmZlcmVuY2UgYmV0d2VlbiBzZXJ2ZXIgYW5kIGNsaWVudFwiPjxzcGFuIGNsYXNzPVwiZ2xpbXBzZS1odWQtcHJlZml4XCI+zpQ8L3NwYW4+PHNwYW4gY2xhc3M9XCJnbGltcHNlLWh1ZC1kYXRhIGdsaW1wc2UtaHVkLWRhdGEtaW1wb3J0YW50XCI+JyArIChkaWZmID4gMCA/ICcrJyA6ICcnKSArIGRpZmYgKyAnPC9zcGFuPjwvc3Bhbj4nIDogJycpOyB9IH0sXG4gICAgICAgIHZpZXdTdGF0ZVNpemU6IHsgdGl0bGU6ICdWaWV3U3RhdGUnLCBkZXNjcmlwdGlvbjogJ1NpemUgb2YgeW91ciBwYWdlIFZpZXdTdGF0ZScsIHZpc2libGU6IGZ1bmN0aW9uIChkZXRhaWxzKSB7IHJldHVybiBkZXRhaWxzLndlYmZvcm1zICYmIGRldGFpbHMud2ViZm9ybXMuZGF0YTsgfSwgc2l6ZTogMSwgcG9zaXRpb246IDAsIGFsaWduOiAwLCBwb3N0Zml4OiAnYnl0ZXMnLCBnZXREYXRhOiBmdW5jdGlvbiAoZGV0YWlscykgeyB2YXIgdmlld3N0YXRlOyByZXR1cm4gKHZpZXdzdGF0ZSA9ICQoJyNfX1ZJRVdTVEFURScpLnZhbCgpKSA/IHZpZXdzdGF0ZS5sZW5ndGggOiAwOyB9IH0sXG4gICAgICAgIGxvYWRpbmc6IHsgdGl0bGU6ICdMb2FkJywgZGVzY3JpcHRpb246ICdUaW1lIGJldHdlZW4gQmVnaW4gUHJlTG9hZCBhbmQgRW5kIExvYWRDb21wbGV0ZScsIHZpc2libGU6IGZ1bmN0aW9uIChkZXRhaWxzKSB7IHJldHVybiBkZXRhaWxzLndlYmZvcm1zICYmIGRldGFpbHMud2ViZm9ybXMuZGF0YSAmJiBkZXRhaWxzLndlYmZvcm1zLmRhdGEubG9hZGluZ1RpbWUgIT0gbnVsbDsgfSwgc2l6ZTogMSwgcG9zaXRpb246IDAsIGFsaWduOiAwLCBwb3N0Zml4OiAnbXMnLCBnZXREYXRhOiBmdW5jdGlvbiAoZGV0YWlscykgeyByZXR1cm4gcGFyc2VJbnQoZGV0YWlscy53ZWJmb3Jtcy5kYXRhLmxvYWRpbmdUaW1lKTsgfSB9LFxuICAgICAgICByZW5kZXJpbmc6IHsgdGl0bGU6ICdSZW5kZXInLCBkZXNjcmlwdGlvbjogJ1RpbWUgYmV0d2VlbiBCZWdpbiBQcmVSZW5kZXIgYW5kIEVuZCBSZW5kZXIgKGluY2x1ZGluZyBTYXZlU3RhdGUgZXZlbnRzKScsIHZpc2libGU6IGZ1bmN0aW9uIChkZXRhaWxzKSB7IHJldHVybiBkZXRhaWxzLndlYmZvcm1zICYmIGRldGFpbHMud2ViZm9ybXMuZGF0YSAmJiBkZXRhaWxzLndlYmZvcm1zLmRhdGEucmVuZGVyaW5nVGltZSAhPSBudWxsOyB9LCBzaXplOiAxLCBwb3NpdGlvbjogMCwgYWxpZ246IDAsIHBvc3RmaXg6ICdtcycsIGdldERhdGE6IGZ1bmN0aW9uIChkZXRhaWxzKSB7IHJldHVybiBwYXJzZUludChkZXRhaWxzLndlYmZvcm1zLmRhdGEucmVuZGVyaW5nVGltZSk7IH0gfSxcbiAgICB9LFxuICAgIGxheW91dDoge1xuICAgICAgICBtaW5pOiB7XG4gICAgICAgICAgICBhY3Rpb246IHt9LFxuICAgICAgICAgICAgdmlldzoge30sXG4gICAgICAgICAgICBjb250cm9sbGVyOiB7fSxcbiAgICAgICAgICAgIGxvYWRpbmc6IHt9LFxuICAgICAgICAgICAgcmVuZGVyaW5nOiB7fSxcbiAgICAgICAgICAgIHZpZXdTdGF0ZVNpemU6IHt9LFxuICAgICAgICAgICAgcXVlcmllczoge31cbiAgICAgICAgfSxcbiAgICAgICAgcG9wdXA6IHtcbiAgICAgICAgICAgIHNlcnZlcjoge30sXG4gICAgICAgICAgICBhY3Rpb246IHsgdGl0bGU6ICdUb3RhbCBBY3Rpb24gVGltZScsIHBvc2l0aW9uOiAxLCBhbGlnbjogMSwgc2l6ZTogMCB9LFxuICAgICAgICAgICAgdmlldzogeyB0aXRsZTogJ1JlbmRlciBWaWV3JywgcG9zaXRpb246IDEsIGFsaWduOiAxIH0sXG4gICAgICAgICAgICBjb250cm9sbGVyOiB7IHBvc2l0aW9uOiAxLCBhbGlnbjogMSB9LFxuICAgICAgICAgICAgcXVlcmllczogeyBwb3NpdGlvbjogMSwgYWxpZ246IDEgfSxcbiAgICAgICAgICAgIGNvbm5lY3Rpb25zOiB7fSxcbiAgICAgICAgICAgIHRpbWU6IHt9LFxuICAgICAgICAgICAgdmlld1N0YXRlU2l6ZTogeyB0aXRsZTogJ1ZpZXdTdGF0ZSBTaXplJywgcG9zaXRpb246IDEsIGFsaWduOiAxLCBzaXplOiAyIH0sXG4gICAgICAgICAgICBsb2FkaW5nOiB7IHRpdGxlOiAnVG90YWwgTG9hZGluZyBUaW1lJywgcG9zaXRpb246IDEsIGFsaWduOiAxLCBzaXplOiAwIH0sXG4gICAgICAgICAgICByZW5kZXJpbmc6IHsgdGl0bGU6ICdSZW5kZXJpbmcgUGFnZScsIHBvc2l0aW9uOiAxLCBhbGlnbjogMSB9XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG52YXIgcHJvY2Vzc0V2ZW50cyA9IGZ1bmN0aW9uKGRldGFpbHMpIHtcbiAgICB2YXIgZXZlbnRTdGFjayA9IFtdLCBcbiAgICAgICAgbGFzdEV2ZW50ID0geyBzdGFydFBvaW50IDogMCwgZHVyYXRpb24gOiAwLCBjaGlsZGxlc3NEdXJhdGlvbiA6IDAsIGVuZFBvaW50IDogMCB9LFxuICAgICAgICBsYXN0Q29udHJvbGxlckV2ZW50ID0geyB9LFxuICAgICAgICByb290RHVyYXRpb24gPSBkZXRhaWxzLnJlcXVlc3QgPyBkZXRhaWxzLnJlcXVlc3QuZGF0YS5zZXJ2ZXIuZHVyYXRpb24gOiAxLFxuICAgICAgICByb290Q2hpbGRsZXNzRHVyYXRpb24gPSByb290RHVyYXRpb247XG5cbiAgICBkZXRhaWxzLnRpbWluZ3MuZGF0YS51bnNoaWZ0KHtcbiAgICAgICAgY2F0ZWdvcnk6ICdSZXF1ZXN0JyxcbiAgICAgICAgdGl0bGU6ICdSZXF1ZXN0OiAnICsgKHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSArIHdpbmRvdy5sb2NhdGlvbi5zZWFyY2gpLFxuICAgICAgICBkdXJhdGlvbjogcm9vdER1cmF0aW9uLFxuICAgICAgICBzdGFydFBvaW50OiAwLFxuICAgICAgICBzdGFydFRpbWU6ICdOT1QgU1VSRScsXG4gICAgICAgIGlkOiAnZ2xpbXBzZS1odWQtZGF0YS1zZXJ2ZXInXG4gICAgfSk7XG4gICAgXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkZXRhaWxzLnRpbWluZ3MuZGF0YS5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICB2YXIgZXZlbnQgPSBkZXRhaWxzLnRpbWluZ3MuZGF0YVtpXSxcbiAgICAgICAgICAgIHRvcEV2ZW50ID0gZXZlbnRTdGFjay5sZW5ndGggPiAwID8gZXZlbnRTdGFja1tldmVudFN0YWNrLmxlbmd0aCAtIDFdIDogbnVsbCwgXG4gICAgICAgICAgICBsZWZ0ID0gKGV2ZW50LnN0YXJ0UG9pbnQgLyByb290RHVyYXRpb24pICogMTAwLCAgXG4gICAgICAgICAgICB3aWR0aCA9IChldmVudC5kdXJhdGlvbiAvIHJvb3REdXJhdGlvbikgKiAxMDAsIFxuICAgICAgICAgICAgc3RhY2tQYXJzZWQgPSBmYWxzZTtcblxuICAgICAgICBldmVudC5lbmRQb2ludCA9IHBhcnNlRmxvYXQoKGV2ZW50LnN0YXJ0UG9pbnQgKyBldmVudC5kdXJhdGlvbikudG9GaXhlZCgyKSk7XG5cbiAgICAgICAgLy9Xb3JrIG91dCBob3cgcXVlcmllcyBhcmUgdG8gYmUgcGFyc2VkXG4gICAgICAgIGlmIChldmVudC5jYXRlZ29yeSA9PSBcIkNvbnRyb2xsZXJcIiB8fCBldmVudC5jYXRlZ29yeSA9PSBcIlJlcXVlc3RcIiB8fCBldmVudC5jYXRlZ29yeSA9PSBcIldlYmZvcm1zXCIpIHtcbiAgICAgICAgICAgIGxhc3RDb250cm9sbGVyRXZlbnQgPSBldmVudDtcbiAgICAgICAgICAgIGxhc3RDb250cm9sbGVyRXZlbnQucXVlcmllcyA9IHsgZHVyYXRpb25TdW06IDAsIGxpc3Rpbmc6IFtdIH07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZXZlbnQuY2F0ZWdvcnkgPT0gXCJDb21tYW5kXCIgJiYgbGFzdENvbnRyb2xsZXJFdmVudC5xdWVyaWVzKSB7IFxuICAgICAgICAgICAgbGFzdENvbnRyb2xsZXJFdmVudC5xdWVyaWVzLmxpc3RpbmcucHVzaChldmVudCk7XG4gICAgICAgICAgICBsYXN0Q29udHJvbGxlckV2ZW50LnF1ZXJpZXMuZHVyYXRpb25TdW0gKz0gZXZlbnQuZHVyYXRpb247XG4gICAgICAgICAgICBldmVudC5zdXBwcmVzcyA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICAvL0Rlcml2ZSBldmVudCBuZXN0aW5nICBcbiAgICAgICAgd2hpbGUgKCFzdGFja1BhcnNlZCkge1xuICAgICAgICAgICAgaWYgKGV2ZW50LnN0YXJ0UG9pbnQgPiBsYXN0RXZlbnQuc3RhcnRQb2ludCAmJiBldmVudC5lbmRQb2ludCA8PSBsYXN0RXZlbnQuZW5kUG9pbnQpIHsgXG4gICAgICAgICAgICAgICAgZXZlbnRTdGFjay5wdXNoKGxhc3RFdmVudCk7IFxuICAgICAgICAgICAgICAgIHN0YWNrUGFyc2VkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHRvcEV2ZW50ICE9IG51bGwgJiYgdG9wRXZlbnQuZW5kUG9pbnQgPCBldmVudC5lbmRQb2ludCkge1xuICAgICAgICAgICAgICAgIGV2ZW50U3RhY2sucG9wKCk7IFxuICAgICAgICAgICAgICAgIHRvcEV2ZW50ID0gZXZlbnRTdGFjay5sZW5ndGggPiAwID8gZXZlbnRTdGFja1tldmVudFN0YWNrLmxlbmd0aCAtIDFdIDogbnVsbDsgXG4gICAgICAgICAgICAgICAgc3RhY2tQYXJzZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgXG4gICAgICAgICAgICAgICAgc3RhY2tQYXJzZWQgPSB0cnVlOyBcbiAgICAgICAgfVxuXG4gICAgICAgIC8vV29yayBvdXQgY2hpbGRsZXNzIHRpbWluZ3MgXG4gICAgICAgIHZhciB0ZW1wID0gZXZlbnRTdGFjay5sZW5ndGggPiAwID8gZXZlbnRTdGFja1tldmVudFN0YWNrLmxlbmd0aCAtIDFdIDogdW5kZWZpbmVkOyBcbiAgICAgICAgaWYgKHRlbXApIHtcbiAgICAgICAgICAgIHRlbXAuY2hpbGRsZXNzRHVyYXRpb24gPSBwYXJzZUZsb2F0KCh0ZW1wLmNoaWxkbGVzc0R1cmF0aW9uIC0gZXZlbnQuZHVyYXRpb24pLnRvRml4ZWQoMikpO1xuICAgICAgICB9IFxuXG4gICAgICAgIC8vV29yayBvdXQgcm9vdCBjaGlsZGxlc3MgdGltaW5ncyBcbiAgICAgICAgaWYgKGV2ZW50U3RhY2subGVuZ3RoID09IDApXG4gICAgICAgICAgICByb290Q2hpbGRsZXNzRHVyYXRpb24gLT0gZXZlbnQuZHVyYXRpb247XG5cbiAgICAgICAgLy9TYXZlIGNhbGN1bGF0ZSBkYXRhXG4gICAgICAgIGV2ZW50LmR1cmF0aW9uID0gZXZlbnQuZHVyYXRpb247XG4gICAgICAgIGV2ZW50LmNoaWxkbGVzc0R1cmF0aW9uID0gZXZlbnQuZHVyYXRpb247XG4gICAgICAgIGV2ZW50LnN0YXJ0UGVyY2VudCA9IGxlZnQ7XG4gICAgICAgIGV2ZW50LmVuZFBlcmNlbnQgPSBsZWZ0ICsgd2lkdGg7XG4gICAgICAgIGV2ZW50LndpZHRoUGVyY2VudCA9IHdpZHRoO1xuICAgICAgICBldmVudC5uZXN0aW5nID0gZXZlbnRTdGFjay5sZW5ndGggKyAxOyBcbiAgICAgICAgZXZlbnQuZGVzY3JpcHRpb24gPSBldmVudC50aXRsZTsgXG5cbiAgICAgICAgbGFzdEV2ZW50ID0gZXZlbnQ7XG4gICAgfVxufTtcblxudmFyIHJlbmRlciA9IGZ1bmN0aW9uKGRldGFpbHMsIG9wZW5lZCkge1xuICAgIHZhciBodG1sID0gJyc7XG4gICAgLy9Pbmx5IGNoZWNraW5nIE1WQy9XZWJmb3JtcyBhcyB3ZSBjYW4ndCBzaG93IGp1c3QgU1FMIHZlcnkgd2VsbFxuICAgIGlmICgoZGV0YWlscy5tdmMgJiYgZGV0YWlscy5tdmMuZGF0YSkgfHwgKGRldGFpbHMud2ViZm9ybXMgJiYgZGV0YWlscy53ZWJmb3Jtcy5kYXRhKSkge1xuICAgICAgICBwcm9jZXNzLmluaXQoc3RydWN0dXJlKTsgXG4gICAgICAgIHByb2Nlc3NFdmVudHMoZGV0YWlscyk7XG4gICAgICAgIGh0bWwgPSByZW5kZXJpbmcuc2VjdGlvbihzdHJ1Y3R1cmUsIGRldGFpbHMsIG9wZW5lZCk7IFxuICAgIH1cblxuICAgIHJldHVybiBodG1sO1xufTtcbnZhciBwb3N0UmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gICAgJCgnLmdsaW1wc2UtaHVkIC5nbGltcHNlLWNvbnRyb2wtdHJpdmlhbCcpLmNsaWNrKGZ1bmN0aW9uKCkgeyAkKCcuZ2xpbXBzZS1odWQgLmdsaW1wc2UtY29udHJvbC10cml2aWFsLCAuZ2xpbXBzZS1odWQgLmdsaW1wc2UtZGF0YS10cml2aWFsJykudG9nZ2xlKCk7IH0pO1xufTtcbiAgICAgICAgICAgICAgICAgICAgXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICByZW5kZXI6IHJlbmRlcixcbiAgICBwb3N0UmVuZGVyOiBwb3N0UmVuZGVyXG59O1xuXG4vLyBUT0RPOiBOZWVkIHRvIGNvbWUgdXAgd2l0aCBhIGJldHRlciBzZWxmIHJlZ2lzdHJhdGlvbiBwcm9jZXNzXG4oZnVuY3Rpb24gKCkge1xuICAgIHZhciBzZWN0aW9uID0gcmVxdWlyZSgnc2VjdGlvbnMvc2VjdGlvbicpO1xuXG4gICAgc2VjdGlvbi5yZWdpc3Rlcihtb2R1bGUuZXhwb3J0cyk7XG59KSgpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvc2VjdGlvbnMvc2VjdGlvbi1ob3N0LmpzXG4gKiogbW9kdWxlIGlkID0gNTZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxudmFyICQgPSByZXF1aXJlKCckanF1ZXJ5Jyk7XG5cbnZhciByZW5kZXJpbmcgPSByZXF1aXJlKCcuL3V0aWwvcmVuZGVyaW5nJyk7XG52YXIgcHJvY2VzcyA9IHJlcXVpcmUoJy4vdXRpbC9wcm9jZXNzJyk7XG52YXIgdXRpbCA9IHJlcXVpcmUoJ2xpYi91dGlsJyk7XG5cbnZhciBjb3VudCA9IDA7XG52YXIgc3VtbWFyeVN0YWNrID0gW107XG52YXIgZGV0YWlsU3RhY2sgPSBbXTtcbnZhciBzdHJ1Y3R1cmUgPSB7XG5cdHRpdGxlOiAnQWpheCcsXG5cdGlkOiAnYWpheCcsXG5cdGNvbG9yOiAnIzU1OWZkZicsXG5cdHBvcHVwOiB7XG5cdFx0c3VwcHJlc3M6IHRydWUsXG5cdFx0cmVuZGVyOiBmdW5jdGlvbihkZXRhaWxzKSB7XG5cdFx0XHR2YXIgaHRtbCA9ICc8ZGl2IGNsYXNzPVwiZ2xpbXBzZS1odWQtcG9wdXAtaGVhZGVyXCI+QWpheCBSZXF1ZXN0czwvZGl2Pic7XG5cdFx0XHRodG1sICs9ICc8ZGl2PicgKyByZW5kZXJpbmcuaXRlbShzdHJ1Y3R1cmUubGF5b3V0LnBvcHVwLnJlcXVlc3RzLCBkZXRhaWxzKSArICc8L2Rpdj4nO1xuXHRcdFx0aHRtbCArPSAnPGRpdiBjbGFzcz1cImdsaW1wc2UtaHVkLXBvcHVwLWNsZWFyXCI+PC9kaXY+Jztcblx0XHRcdGh0bWwgKz0gJzx0YWJsZSBzdHlsZT1cInRhYmxlLWxheW91dDpmaXhlZDtcIiBjbGFzcz1cImdsaW1wc2UtaHVkLWxpc3RpbmcgZ2xpbXBzZS1kYXRhLWFqYXgtZGV0YWlsXCI+PHRoZWFkPjx0cj48dGggY2xhc3M9XCJnbGltcHNlLWRhdGEtY29udGVudC1tZXRob2RcIj48L3RoPjx0aD48L3RoPjx0aCBjbGFzcz1cImdsaW1wc2UtaHVkLWxpc3RpbmctdmFsdWUgZ2xpbXBzZS1kYXRhLWR1cmF0aW9uXCI+ZHVyYXRpb24gKG1zKTwvdGg+PHRoIGNsYXNzPVwiZ2xpbXBzZS1odWQtbGlzdGluZy12YWx1ZSBnbGltcHNlLWRhdGEtc2l6ZVwiPnNpemUgKGtiKTwvdGg+PC90cj48L3RoZWFkPic7XG5cdFx0XHRodG1sICs9ICc8L3RhYmxlPic7XG5cblx0XHRcdHJldHVybiBodG1sO1xuXHRcdH1cblx0fSxcblx0ZGVmYXVsdHM6IHtcblx0XHRyZXF1ZXN0czogeyB0aXRsZTogJ0NvdW50JywgaWQ6ICdnbGltcHNlLWRhdGEtYWpheC1jb3VudCcsIGRlc2NyaXB0aW9uOiAnVG90YWwgQWpheCByZXF1ZXN0cyBkZXRlY3RlZCBvbiB0aGlzIHBhZ2UnLCB2aXNpYmxlOiB0cnVlLCBzaXplOiAxLCBwb3NpdGlvbjogMCwgYWxpZ246IDAsIGdldERhdGE6IGZ1bmN0aW9uKGRldGFpbHMpIHsgcmV0dXJuIDA7IH0gfVxuXHR9LFxuXHRsYXlvdXQ6IHtcblx0XHRtaW5pOiB7XG5cdFx0XHRyZXF1ZXN0czogeyB9XG5cdFx0fSxcblx0XHRwb3B1cDoge1xuXHRcdFx0cmVxdWVzdHM6IHsgdGl0bGU6ICdUb3RhbCBBamF4IFJlcXVlc3RzJywgc2l6ZTogMCwgcG9zaXRpb246IDEsIGFsaWduOiAxIH1cblx0XHR9XG5cdH1cbn07XG5cbnZhciBwcm9jZXNzQ29udGVudFR5cGUgPSBmdW5jdGlvbih0eXBlKSB7XG5cdHJldHVybiB0eXBlID8gdHlwZS5zdWJzdHJpbmcoMCwgdHlwZS5pbmRleE9mKCc7JykpIDogJy0tJztcbn07XG52YXIgcHJvY2Vzc1NpemUgPSBmdW5jdGlvbihzaXplKSB7XG5cdHJldHVybiBzaXplID8gKE1hdGgucm91bmQoKHNpemUgLyAxMDI0KSAqIDEwKSAvIDEwKSA6ICctLSc7XG59XG52YXIgdXBkYXRlID0gZnVuY3Rpb24obWV0aG9kLCB1cmksIGR1cmF0aW9uLCBzaXplLCBzdGF0dXMsIHN0YXR1c1RleHQsIHRpbWUsIGNvbnRlbnRUeXBlLCByZXF1ZXN0SWQpIHtcblx0Ly9BZGQgaXQgd2hlbiBuZWVkZWRcblx0aWYgKGNvdW50ID09IDApIHtcblx0XHR2YXIgc2VjdGlvbiA9ICQoJy5nbGltcHNlLWh1ZC1zZWN0aW9uLWFqYXgnKTtcblx0XHRzZWN0aW9uLmZpbmQoJy5nbGltcHNlLWh1ZC1zZWN0aW9uLWlubmVyJykuYXBwZW5kKCc8ZGl2IGNsYXNzPVwiZ2xpbXBzZS1odWQtZGV0YWlsIGdsaW1wc2UtaHVkLWRldGFpbC1zbWFsbCBnbGltcHNlLWh1ZC1saXN0aW5nIGdsaW1wc2UtZGF0YS1hamF4LXN1bW1hcnlcIj48L2Rpdj4nKTtcblx0XHRzZWN0aW9uLmFwcGVuZChyZW5kZXJpbmcucG9wdXAoc3RydWN0dXJlLCB7IH0pKTtcblx0XHRcblx0XHRzZWN0aW9uLmZpbmQoJy5nbGltcHNlLWRhdGEtYWpheC1kZXRhaWwnKS5vbignY2xpY2snLCAnLmdsaW1wc2UtYWpheC1saW5rJywgZnVuY3Rpb24gKCkge1xuXHRcdFx0d2luZG93Lm9wZW4odXRpbC5yZXNvbHZlQ2xpZW50VXJsKCQodGhpcykuYXR0cignZGF0YS1yZXF1ZXN0SWQnKSksICdHbGltcHNlQ2xpZW50Jyk7XG5cdFx0fSk7XG5cdH1cblxuXHQvL1NldCB0aGUgY291bnRlclxuXHR2YXIgY291bnRlciA9ICQoJy5nbGltcHNlLWRhdGEtYWpheC1jb3VudCAuZ2xpbXBzZS1odWQtZGF0YScpLnRleHQoKytjb3VudCkuYWRkQ2xhc3MoJ2dsaW1wc2UtaHVkLXZhbHVlLXVwZGF0ZScpO1xuXHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXHRcdGNvdW50ZXIucmVtb3ZlQ2xhc3MoJ2dsaW1wc2UtaHVkLXZhbHVlLXVwZGF0ZScpO1xuXHR9LCAyMDAwKTtcblx0XHRcblx0Ly9VcGRhdGUgZGF0YSByZWNvcmRzXG5cdHZhciByb3dDbGFzcyA9IChzdGF0dXMgPT0gMzA0ID8gJyBnbGltcHNlLWh1ZC1xdWl0ZScgOiAhKHN0YXR1cyA+PSAyMDAgJiYgc3RhdHVzIDwgMzAwKSA/ICcgZ2xpbXBzZS1odWQtZXJyb3InIDogJycpO1xuXG5cdC8vQnVpbGQgdGhlIHJvd3MgdGhhdCB3ZSBhcmUgaW5zZXJ0aW5nXG5cdHVyaSA9IHV0aWwuaHRtbEVuY29kZSh1cmkpO1xuXG5cdHZhciBjbGlja2FibGVVcmkgPSB1cmk7XG5cdGlmKHJlcXVlc3RJZCkge1xuXHRcdGNsaWNrYWJsZVVyaSA9ICc8YSBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCIgY2xhc3M9XCJnbGltcHNlLWFqYXgtbGlua1wiIGRhdGEtcmVxdWVzdElkPVwiJyArIHJlcXVlc3RJZCArICdcIj4nICsgdXJpICsgJzwvYT4nO1xuXHR9XG5cdFxuXHRyZWNvcmRJdGVtKCc8ZGl2IGNsYXNzPVwiZ2xpbXBzZS1odWQtbGlzdGluZy1yb3cgZ2xpbXBzZS1odWQtdmFsdWUnICsgcm93Q2xhc3MgKyAnXCI+PGRpdiBjbGFzcz1cImdsaW1wc2UtaHVkLWRhdGEgZ2xpbXBzZS1odWQtcXVpdGUgZ2xpbXBzZS1kYXRhLWFqYXgtbWV0aG9kXCI+JyArIG1ldGhvZCArICc8L2Rpdj48ZGl2IGNsYXNzPVwiZ2xpbXBzZS1odWQtZGF0YSBnbGltcHNlLWh1ZC1saXN0aW5nLW92ZXJmbG93IGdsaW1wc2UtZGF0YS1hamF4LXVyaVwiIHRpdGxlPVwiJyArIHVyaSArICdcIj4nICsgdXJpICsgJzwvZGl2PjxkaXYgY2xhc3M9XCJnbGltcHNlLWRhdGEtYWpheC1kdXJhdGlvblwiPjxzcGFuIGNsYXNzPVwiZ2xpbXBzZS1odWQtZGF0YVwiPicgKyBkdXJhdGlvbiArICc8L3NwYW4+PHNwYW4gY2xhc3M9XCJnbGltcHNlLWh1ZC1wb3N0Zml4XCI+bXM8L3NwYW4+PC9kaXY+PC9kaXY+JywgJy5nbGltcHNlLWh1ZC1zZWN0aW9uLWFqYXggLmdsaW1wc2UtZGF0YS1hamF4LXN1bW1hcnknLCBzdW1tYXJ5U3RhY2ssIDIpO1xuXHRyZWNvcmRJdGVtKCc8dGJvZHkgY2xhc3M9XCInICsgcm93Q2xhc3MgKyAnXCI+PHRyPjx0ZCBjbGFzcz1cImdsaW1wc2UtaHVkLWxpc3Rpbmctb3ZlcmZsb3dcIiB0aXRsZT1cIicgKyB1cmkgKyAnXCIgY29sc3Bhbj1cIjJcIj4nICsgY2xpY2thYmxlVXJpICsgJzwvdGQ+PHRkIGNsYXNzPVwiZ2xpbXBzZS1odWQtbGlzdGluZy12YWx1ZSBnbGltcHNlLWRhdGEtZHVyYXRpb25cIj4nICsgZHVyYXRpb24gKyAnPC90ZD48dGQgY2xhc3M9XCJnbGltcHNlLWh1ZC1saXN0aW5nLXZhbHVlIGdsaW1wc2UtZGF0YS1zaXplXCI+JyArIHByb2Nlc3NTaXplKHNpemUpICsgJzwvdGQ+PC90cj48dHI+PHRkIGNsYXNzPVwiZ2xpbXBzZS1odWQtcXVpdGUgZ2xpbXBzZS1kYXRhLWNvbnRlbnQtbWV0aG9kXCI+JyArIG1ldGhvZCArICc8L3RkPjx0ZCBjbGFzcz1cImdsaW1wc2UtaHVkLXF1aXRlIGdsaW1wc2UtaHVkLWxpc3Rpbmctb3ZlcmZsb3dcIj4nICsgc3RhdHVzICsgJyAtICcgKyBzdGF0dXNUZXh0ICsgJzwvdGQ+PHRkIGNsYXNzPVwiZ2xpbXBzZS1odWQtcXVpdGUgZ2xpbXBzZS1kYXRhLWNvbnRlbnQtdHlwZSBnbGltcHNlLWh1ZC1saXN0aW5nLW92ZXJmbG93XCIgdGl0bGU9XCInICsgY29udGVudFR5cGUgKyAnXCI+JyArIHByb2Nlc3NDb250ZW50VHlwZShjb250ZW50VHlwZSkgKyAnPC90ZD48dGQgY2xhc3M9XCJnbGltcHNlLWh1ZC1xdWl0ZSBnbGltcHNlLWRhdGEtY29udGVudC10aW1lXCI+JyArIHRpbWUudG9UaW1lU3RyaW5nKCkucmVwbGFjZSgvLiooXFxkezJ9OlxcZHsyfTpcXGR7Mn0pLiovLCBcIiQxXCIpICsgJzwvdGQ+PC90cj48L3Rib2R5PicsICcuZ2xpbXBzZS1odWQtc2VjdGlvbi1hamF4IC5nbGltcHNlLWRhdGEtYWpheC1kZXRhaWwnLCBkZXRhaWxTdGFjaywgNik7XG59O1xudmFyIHJlY29yZEl0ZW0gPSBmdW5jdGlvbihodG1sLCBzZWxlY3Rvciwgc3RhY2ssIGxlbmd0aCkge1xuXHQvL1NldCByb3dcblx0dmFyIHJvdyA9ICQoaHRtbCkucHJlcGVuZFRvKHNlbGVjdG9yKTtcblx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcblx0XHRyb3cuYWRkQ2xhc3MoJ2FkZGVkJyk7XG5cdH0sIDEpO1xuXG5cdC8vVHJhY2sgc3RhdGUgb2YgdGhlIGRldGFpbHNcblx0aWYgKHN0YWNrLmxlbmd0aCA+PSBsZW5ndGgpXG5cdFx0c3RhY2suc2hpZnQoKS5yZW1vdmUoKTtcblx0c3RhY2sucHVzaChyb3cpO1xufTtcblxudmFyIHJlbmRlciA9IGZ1bmN0aW9uKGRldGFpbHMsIG9wZW5lZCkge1xuXHRwcm9jZXNzLmluaXQoc3RydWN0dXJlKTtcblxuXHRyZXR1cm4gcmVuZGVyaW5nLnNlY3Rpb24oc3RydWN0dXJlLCBkZXRhaWxzLCBvcGVuZWQpO1xufTtcbnZhciBwb3N0UmVuZGVyID0gZnVuY3Rpb24oKSB7XG5cdHZhciBvcGVuID0gWE1MSHR0cFJlcXVlc3QucHJvdG90eXBlLm9wZW47IFxuXHRYTUxIdHRwUmVxdWVzdC5wcm90b3R5cGUub3BlbiA9IGZ1bmN0aW9uKG1ldGhvZCwgdXJpKSB7XG5cdFx0aWYgKHV0aWwuaXNMb2NhbFVyaSh1cmkpICYmIHVyaS5pbmRleE9mKCcvZ2xpbXBzZS8nKSA9PSAtMSkgeyBcblx0XHRcdHRoaXMuX3VyaSA9IHVyaTtcblx0XHRcdFxuXHRcdFx0dmFyIHN0YXJ0VGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpOyBcblx0XHRcdHRoaXMuYWRkRXZlbnRMaXN0ZW5lcigncmVhZHlzdGF0ZWNoYW5nZScsIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdGlmICh0aGlzLnJlYWR5U3RhdGUgPT0gNCAmJiB0aGlzLmdldFJlc3BvbnNlSGVhZGVyKCdfX2dsaW1wc2UtaWQnKSkgIHsgXG5cdFx0XHRcdFx0XHR1cGRhdGUobWV0aG9kLCB1cmksIG5ldyBEYXRlKCkuZ2V0VGltZSgpIC0gc3RhcnRUaW1lLCB0aGlzLmdldFJlc3BvbnNlSGVhZGVyKCdDb250ZW50LUxlbmd0aCcpLCB0aGlzLnN0YXR1cywgdGhpcy5zdGF0dXNUZXh0LCBuZXcgRGF0ZSgpLCB0aGlzLmdldFJlc3BvbnNlSGVhZGVyKCdDb250ZW50LVR5cGUnKSwgdGhpcy5nZXRSZXNwb25zZUhlYWRlcignX19nbGltcHNlLWlkJykpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSwgZmFsc2UpOyBcblx0XHR9XG5cblx0XHRvcGVuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cdH07ICAgIFxuXHRcblx0dmFyIHNlbmQgPSBYTUxIdHRwUmVxdWVzdC5wcm90b3R5cGUuc2VuZDsgXG5cdFhNTEh0dHBSZXF1ZXN0LnByb3RvdHlwZS5zZW5kID0gZnVuY3Rpb24oKSB7XG5cdFx0aWYgKHRoaXMuX3VyaSl7XG5cdFx0XHR0aGlzLnNldFJlcXVlc3RIZWFkZXIoJ19fZ2xpbXBzZS1pc0FqYXgnLCB0cnVlKTtcblx0XHR9XG5cdFx0XG5cdFx0c2VuZC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXHR9OyAgICAgICAgICAgICAgICAgICAgICBcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXHRyZW5kZXI6IHJlbmRlcixcblx0cG9zdFJlbmRlcjogcG9zdFJlbmRlclxufTtcblxuLy8gVE9ETzogTmVlZCB0byBjb21lIHVwIHdpdGggYSBiZXR0ZXIgc2VsZiByZWdpc3RyYXRpb24gcHJvY2Vzc1xuKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc2VjdGlvbiA9IHJlcXVpcmUoJ3NlY3Rpb25zL3NlY3Rpb24nKTtcblxuICAgIHNlY3Rpb24ucmVnaXN0ZXIobW9kdWxlLmV4cG9ydHMpO1xufSkoKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL3NlY3Rpb25zL3NlY3Rpb24tYWpheC5qc1xuICoqIG1vZHVsZSBpZCA9IDU3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9