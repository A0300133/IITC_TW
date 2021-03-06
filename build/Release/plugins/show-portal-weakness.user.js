// ==UserScript==
// @id             iitc-plugin-show-portal-weakness@vita10gy
// @name           IITC plugin: show portal weakness
// @category       螢光筆
// @version        0.7.2.20170210.164403
// @namespace      https://github.com/jonatkins/ingress-intel-total-conversion
// @updateURL      https://raw.githubusercontent.com/ifchen0/IITC_TW/master/build/Release/plugins/show-portal-weakness.meta.js
// @downloadURL    https://raw.githubusercontent.com/ifchen0/IITC_TW/master/build/Release/plugins/show-portal-weakness.user.js
// @description    [Release-2017-02-10-164403] 使用Portal的填充顏色來顯示，如果Portal能量低下則會漸漸變成紅色, Portal圓的空洞代表缺少的震盪器數目.
// @include        https://*.ingress.com/intel*
// @include        http://*.ingress.com/intel*
// @match          https://*.ingress.com/intel*
// @match          http://*.ingress.com/intel*
// @include        https://*.ingress.com/mission/*
// @include        http://*.ingress.com/mission/*
// @match          https://*.ingress.com/mission/*
// @match          http://*.ingress.com/mission/*
// @grant          none
// ==/UserScript==


function wrapper(plugin_info) {
// ensure plugin framework is there, even if iitc is not yet loaded
if(typeof window.plugin !== 'function') window.plugin = function() {};

//PLUGIN AUTHORS: writing a plugin outside of the IITC build environment? if so, delete these lines!!
//(leaving them in place might break the 'About IITC' page or break update checks)
plugin_info.buildName = 'Release';
plugin_info.dateTimeVersion = '20170210.164403';
plugin_info.pluginId = 'show-portal-weakness';
//END PLUGIN AUTHORS NOTE



// PLUGIN START ////////////////////////////////////////////////////////

// use own namespace for plugin
window.plugin.portalWeakness = function() {};

window.plugin.portalWeakness.highlightWeakness = function(data) {

  if(data.portal.options.data.resCount !== undefined && data.portal.options.data.health !== undefined && data.portal.options.team != TEAM_NONE) {
    var res_count = data.portal.options.data.resCount;
    var portal_health = data.portal.options.data.health;
    if(portal_health < 100 || res_count < 8) {
      var params;
      if(portal_health > 90) {params = {fillOpacity: 0.4}; } else
      if(portal_health > 80) {params = {fillOpacity: 0.2}; } else
      if(portal_health > 70) {params = {fillColor: 'red', fillOpacity: 0.1}; } else
      if(portal_health > 60) {params = {fillColor: 'red', fillOpacity: 0.2}; } else
      if(portal_health > 50) {params = {fillColor: 'red', fillOpacity: 0.3}; } else
      if(portal_health > 40) {params = {fillColor: 'red', fillOpacity: 0.4}; } else
      if(portal_health > 30) {params = {fillColor: 'red', fillOpacity: 0.5}; } else
      if(portal_health > 20) {params = {fillColor: 'red', fillOpacity: 0.6}; } else
      if(portal_health > 10) {params = {fillColor: 'red', fillOpacity: 0.7}; } else
                             {params = {fillColor: 'red', fillOpacity: 0.8}; }
      // Hole per missing resonator
      if (res_count < 8) {
        var dash = new Array((8 - res_count) + 1).join("1,4,") + "100,0";
        params.dashArray = dash;
      }
      data.portal.setStyle(params);
    }
  }
};

var setup =  function() {
  window.addPortalHighlighter('能量塔強度', window.plugin.portalWeakness.highlightWeakness);
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


