# Backbone DragDrop

This is a basic library to implement dragging and dropping of Backbone Views. It also includes constructors for Models and Collections to enable functionality like dragging a model from one collection to another.

## Creating draggabble or droppable views

This library offers several new View constructor subclasses, which can be further subclassed with `extend` just like regular BackBone Views. The new Views are:

- `DragView`: This creates a view instance that can be dragged.
- `DropView`: This creates a view instance that will receive dropped views.
- `DragDropView`: Just in case you need one view that can be both dragged and dropped.

## Using the View constructors

The emphasis in this library is on keeping everything as simple and familiar to use as possible. Set up your new views just as you would if they were generic BackBone views. Any `initialize` method that you define will be executed after the BackBone DragDrop `_preInit` method runs. The Views require a minimal amount of extra information to do their work.

### Drag View

*parent:* An optional View that is draggable is presumed to be a child view of a Drop View. It expects to be passed a `parent` attribute referencing the View that contains it. By default, it will enable dropping on the `parent` View, so that drag views can be reordered.

*receivers:* To enable the view to be dropped on drop views other than its parent view, you can include them in the `receivers` array on view creation.

*putBack:* If you don't want a draggable view to be able to be dropped where it came from, you can pass in `{putBack: false}` on drag view creation.

### Drop View

*senders:* In progress. Will enable things other than those listed in a drag view's `receivers` to be dropped.

## Working Notes

At present, there is a built-in `scoot` method. This means that views that get dragged over will scoot out of the way, which is nice for some applications (like RoboDerby), but not for others (like FreeCell). The ideal then is to have a couple of default behaviors (like scoot, stack, swap, etc) and the possibility of passing in a callback. This would mean that DragView invocations would look like:

```
var item = new DragView({
  model   : model,
  parent  : parent,
  behavior: 'scoot'
});
```

Where the `behavior` attribute defines what the view does on dragover. In addition to whatever built-in behaviors are implemented, the user should be able to specify a callback function which will take three parameters:

```
function customBehavior( dragoverView, draggedView, event) {};
```

If the `behavior` attribute is not defined, views will not do anything on dragover.
