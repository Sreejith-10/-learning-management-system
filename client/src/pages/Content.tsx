import Footer from "@/components/Footer";
import Header from "@/components/ui/Header";
import ClientRoute from "@/routes/ClientRoute";

const Content = () => {
	return (
		<div>
			<Header />
			<div>
				<ClientRoute />
				<Footer />
			</div>
		</div>
	);
};

export default Content;
