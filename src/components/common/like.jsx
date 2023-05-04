const Like = (props) => {
  return (
    <i
      className={
        props.liked ? "clickable fa fa-heart" : "clickable fa fa-heart-o"
      }
      onClick={props.onLike}
    ></i>
  );
};

export default Like;
