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
  render: function() {
    var self = this;
    this.collection.each(function(model) {
      var itemView = new ItemView({model: model, parent: self});
    });
    this.$el.appendTo($('body'));
    return this;
  }
      
});

var ItemView = DragView.extend({
  //
  className: "item",
  render: function() {
    this.$el.css( "background-color", this.model.get('name') );
    this.$el.appendTo(this.parent.$el);
    return this;
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
