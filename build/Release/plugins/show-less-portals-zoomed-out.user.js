// ==UserScript==
// @id             iitc-plugin-show-less-portals@jonatkins
// @name           IITC plugin: Show less portals when zoomed out
// @category       Tweaks
// @version        0.3.0.20160826.64659
// @namespace      https://github.com/jonatkins/ingress-intel-total-conversion
// @updateURL      https://raw.githubusercontent.com/ifchen0/IITC_TW/master/build/Release/plugins/show-less-portals-zoomed-out.meta.js
// @downloadURL    https://raw.githubusercontent.com/ifchen0/IITC_TW/master/build/Release/plugins/show-less-portals-zoomed-out.user.js
// @description    [Release-2016-08-26-064659] Vastly reduce the detail level when zoomed out to level 11 or less (L4+ portals), to significantly reduce data usage when viewing large areas.
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
plugin_info.pluginId = 'show-less-portals-zoomed-out';
//END PLUGIN AUTHORS NOTE



// PLUGIN START ////////////////////////////////////////////////////////


// use own namespace for plugin
window.plugin.showLessPortalsZoomedOut = function() {};

window.plugin.showLessPortalsZoomedOut.setup  = function() {

// NOTE: the logic required is closely tied to the IITC+stock map detail level code - so the logic is moved there now
// and just enabled by this flag
  window.CONFIG_ZOOM_SHOW_LESS_PORTALS_ZOOMED_OUT=true;

};

var setup =  window.plugin.showLessPortalsZoomedOut.setup;

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

