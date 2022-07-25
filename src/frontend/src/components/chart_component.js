import React, { useEffect } from "react";
import Dygraph from "dygraphs";

//props can also be declared as prop-types and define explict types.
const SpeedChart = (props) => {
  var dygraphCanvas = React.createRef();

  useEffect(() => {
    if (props.data.length === 0 || dygraphCanvas === null) {
      return;
    }

    var motorSpeedDygraph = new Dygraph(
      document.getElementById("speed_dygraph"),
      props.data,
      {
        drawPoints: true,
        showRoller: false,
        rollPeriod: 1,
        errorBars: false,
        valueRange: props.value_range,
        labels: props.labels,
        showRangeSelector: true,
        rangeSelectorPlotFillGradientColor: "blue",
        rangeSelectorPlotStrokeColor: "rgb(2, 44, 112)",
        ylabel: props.y,
        xlabel: props.xx,
      }
    );

    window.graphInterval = setInterval(function () {
      //limit the max number of data points
      if (props.data.length > props.max_data_points) {
        props.data.splice(0, props.data.length - props.max_data_points);
      }

      motorSpeedDygraph.updateOptions({ file: props.data });
    }, 1000);

    return () => {
      clearInterval(window.graphInterval);
    };
  }, [props, dygraphCanvas]);

  return (
    <div>
      <div className="card mt-2">
        <div
          className="card-body p-0"
          id="dual_x_div"
          style={{ width: "60%", height: "auto" }}
        >
          <div
            ref={dygraphCanvas}
            id="speed_dygraph"
            style={{
              position: "relative",
              inset: "150px, 10px 10px 200px",
              width: "auto",
            }}
          ></div>
        </div>
        <div className="card-footer">{props.name}</div>
      </div>
    </div>
  );
};

export default SpeedChart;
