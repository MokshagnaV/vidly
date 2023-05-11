import Form from "./common/form";
import Joi from "joi-browser";

class Login extends Form {
  state = { data: { username: "", password: "" }, errors: {} };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  onSubmit() {
    // if not errors call server
    console.log("Submitted");
  }

  render() {
    return (
      <div className="row justify-content-center">
        <div className="col-sm-5">
          <h4 className="text-center">Login Page</h4>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("username", "Username")}
            {this.renderInput("password", "Password", "password")}
            {this.renderButton("Login")}
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
