export type CustomizedLabelProps = {
    cx: number;
    cy: number;
    midAngle: number;
    innerRadius: number;
    outerRadius: number;
    percent: number;
    index: number;
  };

export type DonutChartProps = {
    data: { name: string; value: number }[];
    COLORS: string[];
    RADIAN: number;
  };