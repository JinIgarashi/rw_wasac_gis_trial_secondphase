L.Control.SmallWidget = L.Control.extend({
  _container:   null,
  _buttonOpen:  null,
  _buttonClose: null,
  _toggler:     null,
  _state:       'closed',

  onAdd: function(map) {
    //L.DomUtil.empty(this._container);

    // Set defaults
    var icon = (this._icon != undefined) ? this._icon : '';
    var name = (this._name != undefined) ? this._name : 'small-widget-instance';

    // Create widget
    this._container   = L.DomUtil.create('div', 'leaflet-control leaflet-small-widget leaflet-bar leaflet-' + name + '  ' + this._state);
    this._toggler     = L.DomUtil.create('a',   'leaflet-small-widget-toggle ' + ((this._state == 'closed') ? 'opened' : 'closed'), this._container);
    this._buttonOpen  = L.DomUtil.create('i',   'fa ' + icon,                                                                       this._toggler);
    this._buttonClose = L.DomUtil.create('i',   'fa fa-window-close', this._container);
    this._buttonClose.setAttribute('aria-hidden', true);

    // Disable events on container
    //if (!L.Browser.touch) {
    L.DomEvent.disableScrollPropagation(this._container);
    L.DomEvent.disableClickPropagation(this._container);
    L.DomEvent.on(this._container, 'wheel', L.DomEvent.stopPropagation);
    //} else {
    //  L.DomEvent.on(this._container, 'click', L.DomEvent.stopPropagation);
    //}

    // Expand/collapse mechanics for the whole legend control
    L.DomEvent.on(this._toggler, 'click', function () {
      this.toggle();
    }, this);

    // Expand/collapse mechanics for the whole legend control
    L.DomEvent.on(this._buttonClose, 'click', function () {
      this.toggle();
    }, this);

    // Custom render method
    if (this.render != undefined) {
      this.render(map);
    }
   
    return this._container;
  },

  toggle: function () {
    // Custom toggle method
    if (this.customToggle != undefined) {
      this.customToggle();
    }

    if (L.DomUtil.hasClass(this._container,  'closed')) {
      L.DomUtil.removeClass(this._container, 'closed');
      L.DomUtil.addClass(this._toggler,      'closed');
    }
    else {
      L.DomUtil.addClass(this._container,   'closed');
      L.DomUtil.removeClass(this._toggler,  'closed');
    }

    if (this._state == 'closed') {
      this._state = 'opened';
    }
    else {
      this._state = 'closed';
    }
  },
});

L.control.smallwidget = function(opts) {
  return new L.Control.SmallWidget(opts);
}
