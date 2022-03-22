import Items from "./Items";
import "./Transactions.css";
const Transactions = (props) => {
  const { items } = props;
  return (
    <div>
      <ul className="Items-list">
        {items.map((element) => {
          return (
            <Items
              title={element.title}
              amount={element.amount}
              key={element.id}
            />)
        })}
      </ul>
    </div>
  );
};
export default Transactions;
