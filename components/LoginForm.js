import Router from "next/router";

import { loginUser } from "../lib/auth";

export class LoginForm extends React.Component {
	state = {
		email: "Sincere@april.biz",
		password: "hildegard.org",
		err: "",
		isLoading: false
	};

	handleChange = event => {
		this.setState({
			[event.target.name]: event.target.value
		});
	};

	handleSubmit = event => {
		const { email, password } = this.state;
		event.preventDefault();
		this.setState({
			err: "",
			isLoading: true
		});
		loginUser(email, password)
			.then(() => {
				Router.push("/profile");
			})
			.catch(this.showError);
	};

	showError = err => {
		console.error(err);
		const error = (err.response && err.response.data) || err.message;
		this.setState({
			err: error,
			isLoading: false
		});
	};

	render() {
		const { email, password, err, isLoading } = this.state;
		return (
			<form onSubmit={this.handleSubmit}>
				<div>
					<input
						type="email"
						name="email"
						placeholder="email"
						onChange={this.handleChange}
						value={email}
					/>
				</div>
				<div>
					<input
						type="password"
						name="password"
						placeholder="placeholder"
						onChange={this.handleChange}
						value={password}
					/>
				</div>
				<button disabled={isLoading} type="submit">
					{isLoading ? "Sending" : "Submit"}
				</button>
				{err && <div>{err}</div>}
			</form>
		);
	}
}

export default LoginForm;
