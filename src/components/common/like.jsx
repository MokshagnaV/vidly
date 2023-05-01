const Like = (props) => {
  return (
    <i
      className={props.liked ? "fa fa-heart" : "fa fa-heart-o"}
      style={{ cursor: "pointer" }}
      onClick={props.onLike}
    ></i>
  );
};

export default Like;
