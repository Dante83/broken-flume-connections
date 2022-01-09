# Project Description

This is an example project that has been stripped down to try and isolate an issue in flume.js (awesome library, see [Flume.js](https://github.com/chrisjpatty/flume) to give it a go.). The primary problem this is trying to demonstrate is that connections between nodes are not persisting for some reason when I save them. If you run the application, you should be able to make two types of nodes, Matrix 2 and Vector 2 nodes. You can hook vector 2 nodes into the matrix two nodes. Nothing fancy, just a watered down example.

The types of files are all listed on the right hand side. Clicking each should attempt to reload all the information for the previous node graph. If you give the application a run, the nodes and comments should save, but the connections between them don't and when you go to create new connections after old ones have broken, the new ones will be broken, too!

I don't think I'm doing anything particularly crazy here. Each time the nodes/comments in flume.js are updated, it triggers an event that saves the current node/comment state into a react slice. Then upon open any file or redrawing things, the node state is pulled from these slices and put into the `<NodeEditor />` object located in `src/components/NodeGraphPane.js`

To update...
```javascript
function recordCurrentNodeChanges(){
  if(nodeEditor && nodeEditor.current){
    const currentNodes = nodeEditor.current.getNodes();
    dispatch(updateMaterialNodes(currentNodes));
  }
}
```

To show the currently selected node graph
```javascript
const nodes = useSelector(selectActiveNodes);
const comments = useSelector(selectActiveComments);
//... some ways later...
return(
  <div id="node-drawing-pane">
    <NodeEditor
      key={activeMaterial}
      nodeTypes={flumeConfig.nodeTypes}
      portTypes={flumeConfig.portTypes}
      comments={comments}
      nodes={nodes}
      onChange={()=>recordCurrentNodeChanges()}
      onCommentsChange={()=>recordCurrentCommentChanges()}
      ref={nodeEditor}
    />
  </div>
);
```

The selectors and slice information is all stored inside of `src/application/js/features/materialListPaneSlice.js`. Under the state, the currently selected graph is set by `activeMaterial` and the data for each of the graphs is stored under `materialGraphs`. The state starts out with two graphs right off the start, both of which are empty. `materialGraph` stores the nodes and `materialComments` stores the comments for each graph. The selector for this at the bottom shows this returning `selectActiveNodes`...

```javascript
export const selectActiveNodes = function(state){
  const materialGraphs = state.materialListPane.materialGraphs;
  const activeMaterial = state.materialListPane.activeMaterial;
  if(activeMaterial && materialGraphs.hasOwnProperty(activeMaterial)){
    const nodes = materialGraphs[activeMaterial].materialGraph;
    return !!nodes ? nodes : {};
  }
  return {};
}
```

So we grab the name of the active material and if this exists in our list of materials, we return the nodes. I should probably return a default of {}, but that isn't the particular issue here. We are getting the nodes, but they're just not connecting.
