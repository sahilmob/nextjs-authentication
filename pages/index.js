import Layout from "../components/Layout";
import Link from "next/link";

import React from "react";

import { authInitialProps } from "../lib/auth";

const index = props => {
	return (
		<Layout title="Home" {...props}>
			<Link href="/profile">
				<a>Go to profile</a>
			</Link>
		</Layout>
	);
};

index.getInitialProps = authInitialProps();

export default index;
