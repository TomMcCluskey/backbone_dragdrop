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
  initialize: function() {
    //
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
});

var ContainerView = DropView.extend({
  //
});

var ItemView = DragView.extend({
  //
});

var container1 = new ContainerView();
var container2 = new ContainerView();
var model = new DragdropModel();
var collection = new DragdropCollection();
