const normalizeUser = (user) => {
	try {
		const image = {
			url:
				user.image?.url ??
				"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
			alt: user.image?.alt ?? "avatar",
		};
		const name = {
			...user.name,
			middle: user.name?.middle ?? undefined,
		};
		const address = {
			...user.address,
			state: user.address?.state ?? undefined,
		};
		return {
			...user,
			name,
			image,
			address,
		};
	} catch (err) {
		return reject(err);
	}
};

export default normalizeUser;
