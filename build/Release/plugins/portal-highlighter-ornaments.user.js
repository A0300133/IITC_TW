// ==UserScript==
// @id             iitc-plugin-highlight-ornaments@jonatkins
// @name           IITC plugin: hightlight portals with ornaments
// @category       Highlighter
// @version        0.0.1.20160826.64659
// @namespace      https://github.com/jonatkins/ingress-intel-total-conversion
// @updateURL      https://raw.githubusercontent.com/ifchen0/IITC_TW/master/build/Release/plugins/portal-highlighter-ornaments.meta.js
// @downloadURL    https://raw.githubusercontent.com/ifchen0/IITC_TW/master/build/Release/plugins/portal-highlighter-ornaments.user.js
// @description    [Release-2016-08-26-064659] Use the portal fill color to denote portals with additional 'ornament' markers. e.g. Anomaly portals
// @include        https://www.ingress.com/intel*
// @include        http://www.ingress.com/intel*
// @match          https://www.ingress.com/intel*
// @match          http://www.ingress.com/intel*
// @include        https://www.ingress.com/mission/*
// @include        http://www.ingress.com/mission/*
// @match          https://www.ingress.com/mission/*
// @match          http://www.ingress.com/mission/*
// @grant          none
// ==/UserScript==


function wrapper(plugin_info) {
// ensure plugin framework is there, even if iitc is not yet loaded
if(typeof window.plugin !== 'function') window.plugin = function() {};

//PLUGIN AUTHORS: writing a plugin outside of the IITC build environment? if so, delete these lines!!
//(leaving them in place might break the 'About IITC' page or break update checks)
plugin_info.buildName = 'Release';
plugin_info.dateTimeVersion = '20160826.64659';
plugin_info.pluginId = 'portal-highlighter-ornaments';
//END PLUGIN AUTHORS NOTE



// PLUGIN START ////////////////////////////////////////////////////////

// use own namespace for plugin
window.plugin.portalHighlightOrnaments = function() {};

window.plugin.portalHighlightOrnaments.highlight = function(data) {
  var d = data.portal.options.data;
  if(d.ornaments && d.ornaments.length > 0) {
    var fill_opacity = 0.75;
    var color = 'red';

    // TODO? match specific cases of ornament name and/or portals with multiple ornaments, and highlight in different colours?

    var params = {fillColor: color, fillOpacity: fill_opacity};
    data.portal.setStyle(params);
  }
}

var setup =  function() {
  window.addPortalHighlighter('Ornaments (anomaly portals)', window.plugin.portalHighlightOrnaments.highlight);
}

// PLUGIN END //////////////////////////////////////////////////////////


setup.info = plugin_info; //add the script info data to the function as a property
if(!window.bootPlugins) window.bootPlugins = [];
window.bootPlugins.push(setup);
// if IITC has already booted, immediately run the 'setup' function
if(window.iitcLoaded && typeof setup === 'function') setup();
} // wrapper end
// inject code into site context
var script = document.createElement('script');
var info = {};
if (typeof GM_info !== 'undefined' && GM_info && GM_info.script) info.script = { version: GM_info.script.version, name: GM_info.script.name, description: GM_info.script.description };
script.appendChild(document.createTextNode('('+ wrapper +')('+JSON.stringify(info)+');'));
(document.body || document.head || document.documentElement).appendChild(script);

