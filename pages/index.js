import Layout from "../components/Layout";
import Link from "next/link";

import React from "react";

const index = () => {
	return (
		<Layout title="Home">
			<Link href="/profile">
				<a>Go to profile</a>
			</Link>
		</Layout>
	);
};

export default index;
