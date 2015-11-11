/*
 * The idea here is moving Views from one container View to
 * another. The Views can pass around information about the 
 * things being dragged and dropped, but shouldn't necessarily
 * do the moving from one collection to another--this is a
 * tool that will enable that kind of functionality, but not
 * implement it by default.
 *
 * In addition to the View constructor, there will be (optional)
 * Model and Collection constructors that listen for the events
 * the Views fire and use them to move things around.
 */

var _bbddTemp = {};

// PreInitView from https://github.com/dsbauer/backbone-preinitialize-view
var PreInitView = Backbone.View.extend({
  constructor: function() {
    this.initialize = function(){};
    Backbone.View.apply(this,arguments);
    this._preInit.apply(this,arguments);
    delete this.initialize;
    this.initialize.apply(this,arguments);
  },
  _preInit: function(opts) {
    //do overrideable magic
  }
});

var DragdropView = PreInitView.extend({
  // the ondragstart attribute is required by Firefox, not Chrome
  attributes: {'draggable'  : 'true',
               'ondragstart': "event.dataTransfer.setData('text/plain', 'This text may be dragged')"},
  events: {
    // Uses HTML 5 events
    "dragstart": "_dragItem",
    "dragend"  : "_endDragItem",
    "dragover" : "_overValid",
    "drop"     : "_dropItem"
  },
  _dragOk: false,
  _dropOk: false,
  _preInit: function(opts) {
    // parent: for DragViews, to list where they live
    // senders: for DropViews, to list things that want to live there
    // receivers: for DragViews, to list potential homes
    var self = this;
    if(opts) {
      this.parent = opts.parent;
      this.senders = arrayify(opts.senders);
      this.receivers = arrayify(opts.receivers);
      if(opts.reorder !== false) {
        this.receivers.push(this.parent);
      }
      console.log(opts);
    }

    // helper function to ensure senders & receivers are always arrays
    function arrayify(prop) {
      // turns single args into single-item array
      if (prop && prop.constructor !== Array) {
        return [prop];
      } else {
        return prop || [];
      }
    }
    // this._sendListener();
    this.render();
  },
  _sendListener: function() {
    // Probably can't be used practically, as it requires super Views
    // to know about sub Views on initialize. Though could be worth
    // setting up for edge cases.
    this.senders.forEach(function(sender) {
      this.listenTo(sender, 'bbdd:drag', function(x) {
        console.log('x');
        console.log(x);
        // need to prevent default on dragover event
      });
    });
  },
  _dragItem: function(event) {
    // This fires an event when the view is dragged
    this.receivers.forEach(function(receiver) {
      receiver._dropOk = true;
    });
    console.log(event);
    _bbddTemp.dragger = this;
    event.dataTransfer = 'true';
    event.originalEvent.dataTransfer.effectAllowed = "move";
    console.log('dragItem');
  },
  _endDragItem: function(event) {
    // This fires an event when a drag event on the view stops
    console.log('endDragItem');
    console.log(event);
    event.dataTransfer = '';
    this.trigger('bbdd:send', this);
    _bbddTemp.dragger = null;
    this.receivers.forEach(function(receiver) {
      receiver._dropOk = false;
    });
  },
  _overValid: function() {
    // enable dropping
    event.preventDefault();
  },
  _dropItem: function(event) {
    // This responds to something being dropped on the view
    var self = this;
    this.trigger('bbdd:receive', this);
    console.log('drop');
    console.log(event);
  },
  _scoot: function(event) {
    // For rearranging droppables
    // $spacer is visible but empty to respond to drag events
    // $clone is invisible but takes up the right amount of space
    // This should just be one of many possible behaviors.
    // For example, stacking freecell cards shoul dbe possible.
    // This means that the $clone may not always be used.
    console.log('scoot');
    var $spacer = $('<div class="spacer">');
    $spacer.css('height', '100%' );
    $spacer.css('width', '100%' );
    $spacer.css('visibility', 'visible');
    var $clone = this.$el.clone().css('visibility', 'hidden');
    $spacer.appendTo($clone);
    $clone.on('dragleave', function() {this.remove();} );
    this.$el.before($clone);
    $clone.on('drop', function(event) {
      console.log('scoot drop');
      console.log(event);
    });
  }
}, {color: 'blue'});

var DragView = DragdropView.extend({
  // remove drop-related functionality.
  // this is something that gets dragged and dropped.
  events: {
    // Uses HTML 5 events
    "dragstart": "_dragItem",
    "dragend"  : "_endDragItem",
    "dragover" : "_scoot"
  }
});

var DropView = DragdropView.extend({
  // remove drag-related functionality.
  // this is something that is a drop target.
  attributes: {'draggable': 'false'},
  events: {
    // Uses HTML 5 events
    "dragover" : "_overValid",
    "drop"     : "_dropItem"
  }
});

var DragdropModel = Backbone.Model.extend({
  //
});

var DragdropCollection = Backbone.Collection.extend({
  //
  model: DragdropModel
});

