import bcrypt from "bcryptjs";


const generateHash =async (password) =>await bcrypt.hash(password, 10);

const cmpHash =async (password, hash) =>await bcrypt.compare(password, hash);

export { generateHash, cmpHash };
