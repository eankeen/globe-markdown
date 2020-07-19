import { main } from "./main";

main("package.json").catch((err) => {
	console.error(err);
});
