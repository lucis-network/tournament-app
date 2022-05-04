import { ReactDiagram } from "gojs-react";
import * as go from "gojs";
import s from "./index.module.sass";

function initDiagram() {
  const $ = go.GraphObject.make;
  const diagram = $(go.Diagram, {
    "undoManager.isEnabled": true, // must be set to allow for model change listening
    // 'undoManager.maxHistoryLength': 0,  // uncomment disable undo/redo functionality
    "clickCreatingTool.archetypeNodeData": {
      text: "new node",
      color: "lightblue",
    },
  });

  //   diagram.nodeTemplate = $(
  //     go.Node,
  //     "Auto", // the Shape will go around the TextBlock
  //     new go.Binding("location", "loc", go.Point.parse).makeTwoWay(
  //       go.Point.stringify
  //     ),
  //     $(
  //       go.Shape,
  //       "RoundedRectangle",
  //       { name: "SHAPE", fill: "white", strokeWidth: 0 },
  //       // Shape.fill is bound to Node.data.color
  //       new go.Binding("fill", "color")
  //     ),
  //     $(
  //       go.TextBlock,
  //       { margin: 8, editable: true }, // some room around the text
  //       new go.Binding("text").makeTwoWay()
  //     )
  //   );

  const node1 = $(
    go.Node,
    "Auto",
    $(go.Shape, { figure: "RoundedRectangle", fill: "lightblue" }),
    $(go.TextBlock, { text: "Win", margin: 5 })
  );

  const node2 = $(
    go.Node,
    "Auto",
    $(go.Shape, { figure: "RoundedRectangle", fill: "pink" }),
    $(go.TextBlock, { text: "Final", margin: 5 })
  );

  const node3 = $(
    go.Node,
    "Auto",
    $(go.Shape, { figure: "RoundedRectangle", fill: "pink" }),
    $(go.TextBlock, { text: "Lose", margin: 5 })
  );

  diagram.add(node1);
  diagram.add(node2);
  diagram.add(node3);
  diagram.add($(go.Link, { fromNode: node1, toNode: node2 }, $(go.Shape)));
  diagram.add($(go.Link, { fromNode: node3, toNode: node2 }, $(go.Shape)));

  return diagram;
}

// function handleModelChange(changes: any) {
//   alert("GoJS model changed!");
// }

const GoBracket = () => {
  return (
    <>
      <h1>123</h1>
      <ReactDiagram
        initDiagram={initDiagram}
        divClassName={s.diagramContainer}
        // nodeDataArray={[
        //   { key: 0, text: "Alpha", color: "lightblue", loc: "0 0" },
        //   { key: 1, text: "Beta", color: "orange", loc: "150 0" },
        //   { key: 2, text: "Gamma", color: "lightgreen", loc: "0 150" },
        // ]}
        // linkDataArray={[
        //   { key: -1, from: 1, to: 0 },
        //   { key: -2, from: 2, to: 0 },
        //   //   { key: -3, from: 1, to: 1 },
        //   //   { key: -4, from: 2, to: 3 },
        //   //   { key: -5, from: 3, to: 0 },
        // ]}
        // onModelChange={handleModelChange}
      />
    </>
  );
};

export default GoBracket;
