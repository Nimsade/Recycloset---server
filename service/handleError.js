import Chalk from "chalk";

const handleError =async (res, status, message) => {
  console.log(Chalk.redBright(message));
  res.status(status).send(message);
};

export default handleError;
