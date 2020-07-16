import { main } from "./main.ts";

main("package.json").catch((err) => {
	console.error(err);
});
