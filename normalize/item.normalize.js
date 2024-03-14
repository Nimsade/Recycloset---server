const normalizeItems = async (items) => {
	try {
		let image = {
			url: "https://cdn.pixabay.com/photo/2023/12/01/21/16/laundry-8424501_1280.jpg",
			alt: "default image",
		};
		if (items.image && items.image.url) {
			image.url = items.image.url;
		}
		if (items.image && items.image.alt) {
			image.alt = items.image.alt;
		}
		return {
			...items,
			image,
			address: {
				...items.address,
				/* state: items.address.state, */
			},
			web: items.web || undefined,
			zip: items.zip || undefined,
		};
	} catch (err) {
		return Promise.reject(err);
	}
};

export default normalizeItems;
