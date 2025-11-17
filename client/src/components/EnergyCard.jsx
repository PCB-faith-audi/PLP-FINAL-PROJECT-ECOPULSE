import Card from "./Card.jsx";

export default function EnergyCard({ usage }) {
  return (
    <Card title="Energy Usage">
      <p className="text-lg">This week: {usage.weekly} kWh</p>
      <p className="text-lg">This month: {usage.monthly} kWh</p>
    </Card>
  );
}
