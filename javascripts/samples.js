// *** Samples for tinkering with ***

var testData = {
  items: [
    {"name": "teal"},
    {"name": "olive"},
    {"name": "darkgoldenrod"},
    {"name": "darkred"},
    {"name": "indigo"},
    {"name": "mediumseagreen"}
  ]
};

var ContainerView = DropView.extend({
  //
  className: "container",
  initialize: function() {
    this.render();
  },
  render: function() {
    var self = this;
    this.collection.each(function(model) {
      var itemView = new ItemView({model: model, parent: self});
    });
    this.$el.appendTo( $('body') );
  }
      
});

var ItemView = DragView.extend({
  //
  className: "item",
  initialize: function() {
    this.render();
  },
  render: function() {
    this.$el.css( "background-color", this.model.get('name') );
    //console.log(this);
    this.$el.appendTo($('body'));
    // console.log(this.parent.$el);
  }
});

var collection;
var container1;
$( function() {
  collection = new DragdropCollection(testData.items);
  container1 = new ContainerView({collection: collection});
  //var container2 = new ContainerView();
  //var model = new DragdropModel();
});
