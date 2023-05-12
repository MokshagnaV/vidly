import Form from "./common/form";
import Joi from "joi-browser";
class NewMovieForm extends Form {
  state = {
    data: { title: "", genreId: "", numberInStock: "", dailyRentalRate: "" },
    errors: "",
  };

  schema = {
    title: Joi.string().required(),
    genreId: Joi.string().required(),
    numberInStock: Joi.number().min(0).max(100).required(),
    dailyRentalRate: Joi.number().min(1).max(10).required(),
  };

  onSubmit() {
    const movieDetails = { ...this.state.data };
    movieDetails["_id"] = Math.random().toString(36).substring(2, 20);

    console.log(movieDetails);

    console.log("Saved");
  }

  render() {
    const options = [
      { value: "5b21ca3eeb7f6fbccd471818", label: "Action" },
      { value: "5b21ca3eeb7f6fbccd471814", label: "Comedy" },
      { value: "5b21ca3eeb7f6fbccd471820", label: "Thriller" },
    ];
    return (
      <div className="container">
        <h1>Register</h1>
        <div className="row">
          <div className="col">
            <form onSubmit={this.handleSubmit}>
              {this.renderInput("title", "Title")}
              {this.renderSelect("genreId", "Genre", options)}
              {this.renderInput("numberInStock", "Stock", "number")}
              {this.renderInput("dailyRentalRate", "Rate")}
              {this.renderButton("Save")}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default NewMovieForm;
