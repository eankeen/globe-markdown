import { main } from "./main";

const readmeFile = process.argv[2] || "README.md";
main(readmeFile).catch((err) => {
	console.error(err);
});
