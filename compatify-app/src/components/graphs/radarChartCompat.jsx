import React, { Component } from "react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import CustomTooltipContent from "../common/customTooltipContent";

class RadarChartCompat extends Component {
  state = {};

  makeDataObject = data => {
    const {
      avg_track_valence,
      avg_track_instru,
      avg_track_popularity,
      avg_track_energy,
      range
    } = data;

    return [
      {
        trait: "V",
        A: avg_track_valence,
        fullMark: 1
      },
      {
        trait: "I",
        A: avg_track_instru,
        fullMark: 1
      },
      {
        trait: "P",
        A: avg_track_popularity,
        fullMark: 1
      },
      {
        trait: "E",
        A: avg_track_energy,
        fullMark: 1
      },
      {
        trait: "R",
        A: range,
        fullMark: 1
      }
    ];
  };

  render() {
    const { name, data } = this.props;
    const radarData = this.makeDataObject(data);

    return (
      <div className="card text-white bg-dark mb-3">
        <div className="card-body">
          <ResponsiveContainer height={300}>
            <RadarChart
              outerRadius={120}
              width={500}
              height={300}
              data={radarData}
            >
              <PolarGrid stroke="#ffffff" />
              <PolarAngleAxis dataKey="trait" stroke="#ffffff" />
              <PolarRadiusAxis angle={18} domain={[0, 1]} />
              <Radar
                name={name}
                dataKey="A"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.6}
              />
              <Legend />
              <Tooltip content={<CustomTooltipContent />}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }
}

export default RadarChartCompat;
