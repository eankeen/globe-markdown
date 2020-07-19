import {main} from "./main";

const readmeFile = process.argv[1] || "README.md";
main(readmeFile).catch((err) => {
  console.error(err);
});
