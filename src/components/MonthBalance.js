export default function MonthBalance({ balanceMes }) {
  return (
    <>
      <h2 className="balance-title">
        Balance del mes
      </h2>
      <p className="balance-amount">${balanceMes}</p>
    </>
  );
}
