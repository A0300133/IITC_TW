// ==UserScript==
// @id             iitc-plugin-basemap-blank@jonatkins
// @name           IITC plugin: Blank map
// @category       地圖
// @version        0.1.2.@@DATETIMEVERSION@@
// @namespace      https://github.com/jonatkins/ingress-intel-total-conversion
// @updateURL      @@UPDATEURL@@
// @downloadURL    @@DOWNLOADURL@@
// @description    [@@BUILDNAME@@-@@BUILDDATE@@] Add a blank map layer - no roads or other features.
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

@@PLUGINSTART@@

// PLUGIN START ////////////////////////////////////////////////////////


// use own namespace for plugin
window.plugin.mapTileBlank = function() {};

window.plugin.mapTileBlank.addLayer = function() {

  var blankOpt = {attribution: '', maxNativeZoom: 18, maxZoom: 21};
  var blankWhite = new L.TileLayer('@@INCLUDEIMAGE:images/basemap-blank-tile-white.png@@', blankOpt);
  var blankBlack = new L.TileLayer('@@INCLUDEIMAGE:images/basemap-blank-tile-black.png@@', blankOpt);

  layerChooser.addBaseLayer(blankWhite, "Blank Map (White)");
  layerChooser.addBaseLayer(blankBlack, "Blank Map (Black)");
};

var setup =  window.plugin.mapTileBlank.addLayer;

// PLUGIN END //////////////////////////////////////////////////////////

@@PLUGINEND@@
