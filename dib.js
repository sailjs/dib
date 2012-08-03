define(['sail',
        'anchor/dom'],
function(sail, DOM) {
  
  function Dib(name) {
    // TODO: Implement ability to pass elements directly (??)
    
    this._name = name;
  }
  
  Dib.prototype.container = function(container) {
    this._container = container;
    return this;
  }
  
  Dib.prototype.events = function(events, target) {
    this._events = events;
    this._target = target;
    return this;
  }
  
  Dib.prototype.create = function(locals, options) {
    var render = sail.render
      , $ = sail.$;
    
    var out = render(this._name, locals, options)
      , el;
    
    // TODO: Figure out how to extract variables for binding layer.
    
    if (this._container) {
      el = $(DOM.create(this._container['tag'], this._container['attrs']));
      if (typeof out == 'string') {
        el.html(out);
      } else if (typeof out == 'function') {
        el._template = out;
        el.render(locals, options);
      } else {
        throw new Error('Invalid template: render() must return a string or function');
      }
    } else {
      if (typeof out == 'string') {
        el = $(out);
      } else if (typeof out == 'function') {
        el = $(out(locals, options));
      } else {
        throw new Error('Invalid template: render() must return a string or function');
      }
    }
    
    connect(el, this._events, this._target);
    return el;
  }
  
  
  function connect(el, e, t) {
    var events = e;
    for (var key in events) {
      var parts = key.split(' ')
        , ev = parts[0]
        , selector = parts[1]
        , action = events[key]
        , target = t
        , handler;
        
      if (typeof action == 'function') {
        handler = action;
      } else if (typeof action == 'string') {
        if (!target) { throw new Error("Unspecified target for action: " + action) }
        handler = target[action].bind(target);
      } else if (typeof action == 'object') {
        target = action.target || target;
        if (!target) { throw new Error("Unspecified target for action: " + action.action) }
        handler = target[action.action].bind(target);
      }
      
      if (selector) {
        // TODO: Make sure these events are delegated, in case selected elements get replaced.
        el.find(selector).on(ev, handler);
        // TODO: This is the jQuery-delegated signature. Implement support for this in Anchor's
        //       DOM events.
        //el.on(ev, selector, handler);
      } else {
        el.on(ev, handler);
      }
    }
  }
  
  return Dib;
});
