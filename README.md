# Backbone DragDrop

This is a basic library to implement dragging and dropping of Backbone Views. It also includes constructors for Models and Collections to enable functionality like dragging a model from one collection to another.

## Creating draggabble or droppable views

This library offers several new View constructor subclasses, which can be further subclassed with `extend` just like regular BackBone Views. The new Views are:

- `DragView`: This creates a view instance that can be dragged.
- `DropView`: This creates a view instance that will receive dropped views.
- `DragDropView`: Just in case you need one view that can be both dragged and dropped.

## Using the View constructors

The emphasis in this library is on keeping everything as simple and familiar to use as possible. Set up your new views just as you would if they were generic BackBone views. Any `initialize` method that you define will be executed after the BackBone DragDrop `_preInit` method runs. 
