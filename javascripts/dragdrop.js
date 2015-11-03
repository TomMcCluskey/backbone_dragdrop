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

var DragdropView = Backbone.View.extend({
  //
  attributes: {'draggable': 'true'},
  events: {
    // Uses HTML 5 events
    "dragstart": "dragItem",
    "dragend"  : "endDragItem",
    "dragover" : "overValid",
    "drop"     : "dropItem"
  },
  initialize: function(opts) {
    // parent: for DragViews, to list where they live
    // senders: for DropViews, to list things that want to live there
    // receivers: for DragViews, to list potential homes
    var self = this;
    if(opts) {
      this.parent = opts.parent;
      this.senders = arrayify(opts.senders);
      this.receivers = arrayify(opts.receivers);
    }

    // helper function to ensure senders & receivers are always arrays
    function arrayify(prop) {
      // turns single args into single-item array
      if (prop && prop.constructor !== Array) {
        return [prop];
      } else {
        return prop;
      }
    }

  },
  dragItem: function() {
    // This fires an event when the view is dragged
    console.log("dragItem");
  },
  endDragItem: function() {
    // This fires an event when a drag event on the view stops
    console.log("endDragItem");
  },
  overValid: function() {
    // enable dropping
    event.preventDefault();
  },
  drop: function() {
    // This responds to something being dropped on the view
    console.log("drop");
  }
});

var DragView = DragdropView.extend({
  // remove drop-related functionality.
  // this is something that gets dragged and dropped.
  events: {
    // Uses HTML 5 events
    "dragstart": "dragItem",
    "dragend"  : "endDragItem"
  }
});

var DropView = DragdropView.extend({
  // remove drag-related functionality.
  // this is something that is a drop target.
  attributes: {'draggable': 'false'},
  events: {
    // Uses HTML 5 events
    "dragover" : "overValid",
    "drop"     : "dropItem"
  }
});

var DragdropModel = Backbone.Model.extend({
  //
});

var DragdropCollection = Backbone.Collection.extend({
  //
  model: DragdropModel
});

