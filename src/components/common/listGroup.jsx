import PropTypes from "prop-types";

const ListGroup = ({
  items,
  textProperty,
  valueProperty,
  itemOnSelect,
  selectedItem,
}) => {
  return (
    <ul className="list-group">
      {items.map((i) => (
        <li
          key={i[valueProperty] ? i[valueProperty] : 1}
          className={
            selectedItem === i[textProperty]
              ? "clickable list-group-item active"
              : "clickable list-group-item"
          }
          onClick={() => itemOnSelect(i)}
        >
          {i[textProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

ListGroup.propTypes = {
  items: PropTypes.array.isRequired,
  itemOnSelect: PropTypes.func.isRequired,
  selectedItem: PropTypes.string,
};
export default ListGroup;
