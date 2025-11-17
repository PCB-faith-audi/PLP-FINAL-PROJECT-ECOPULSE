import Card from "./Card.jsx";

export default function CarbonCard({ footprint }) {
  return (
    <Card title="Carbon Footprint">
      <p className="text-lg">Total CO₂: {footprint.total} kg</p>
      <p className="text-lg">Transport: {footprint.transport} kg</p>
      <p className="text-lg">Diet: {footprint.diet} kg</p>
    </Card>
  );
}
