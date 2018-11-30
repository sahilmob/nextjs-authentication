import { getUserProfile, authInitialProps } from "../lib/auth";
import Layout from "../components/Layout";
export default class profile extends React.Component {
	state = {
		user: null
	};

	componentDidMount() {
		getUserProfile().then(user => {
			this.setState({
				user
			});
		});
	}

	render() {
		return (
			<Layout title="profile" {...this.props}>
				<pre>{JSON.stringify(this.state.user, null, 2)}</pre>
			</Layout>
		);
	}
}

profile.getInitialProps = authInitialProps(true);
