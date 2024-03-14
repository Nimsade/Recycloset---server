import { createItem } from "../model/dbAdapter.js";

const initialItems = async (itemId) => {
	let items = [
		{
			title: "beautiful shirt",
			subtitle: "cotton shirt",
			description: "very beautiful cotton shirt",
			price: 200,
			typeOfItem: "shirt",
			phone: "050000000",
			email: "card1@gmail.com",
			image: {
				url: "https://cdn.pixabay.com/photo/2016/11/23/06/57/isolated-t-shirt-1852114_960_720.png",
				alt: "cotton shirt",
			},
			address: {
				state: "USA",
				country: "USA",
				city: "New York",
				street: "street 1",
				houseNumber: 10,
			},
		},
		{
			title: "nice shirt",
			subtitle: "silk shirt",
			description: "very nice silk shirt",
			price: 200,
			typeOfItem: "shirt",
			phone: "050000000",
			email: "card2@gmail.com",
			image: {
				url: "https://cdn.pixabay.com/photo/2014/03/07/03/55/shirt-281455_1280.jpg",
				alt: "silk shirt",
			},
			address: {
				state: "IL",
				country: "israel",
				city: "natanya",
				street: "street 1",
				houseNumber: 10,
			},
		},
		{
			title: "fine shirt",
			subtitle: "polyester shirt",
			description: "very fine polyester shirt",
			price: 200,
			typeOfItem: "shirt",
			phone: "0123211234",
			email: "qwe@gmail.com",
			image: {
				url: "https://cdn.pixabay.com/photo/2017/08/10/08/00/shirt-2619788_1280.jpg",
				alt: "polyester shirt",
			},
			address: {
				state: "IL",
				country: "Israel",
				city: "Arad",
				street: "Shoham",
				houseNumber: 5,
				zip: 8920435,
			},
		},
	];
	try {
		for (let item of items) {
			await createItem(item);
		}
	} catch (err) {
		handleError(res, 400, err.message);
	}
};

export { initialItems };
