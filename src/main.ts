import fs from "fs";
import path from "path";
import remark from "remark";
import remarkTableOfContents from "remark-toc";
// import remarkStarchart from "remark-starchart";
import remarkLicense from "@fox-land/remark-license";
import remarkTitle from "@fox-land/remark-title";

export async function main(readmePath: string): Promise<void> {
	const readmeFile = await fs.promises.readFile(readmePath, {
		encoding: "utf8",
	});
	remark()
		.use(remarkTableOfContents, {
			maxDepth: 3,
			tight: true,
		})
		.use(remarkLicense, {
			name: "Edwin Kofler",
			license: "Apache-2.0",
			url: "https://edwinkofler.com",
		})
		.use(remarkTitle, { title: path.dirname(readmePath) })
		// .use(remarkStargazers)
		.process(readmeFile)
		.then((vfile) => {
			console.info(vfile);
		})
		.catch((err) => {
			console.error(err);
		});
}
