// @ts-ignore
import remark from "remark";
import remarkStargazers from "../src/plugins/stargazers";

test("ensure it works normally", () => {
	const input = "# Main Title\n\n## Star Chart\n\n## Conclusion\n";
	const output = `# Main Title

## Star Chart

[![Stargazers over time](https://starchart.cc/eankeen/sync-readme.svg)](https://starchart.cc/eankeen/sync-readme)

## Conclusion
`;

	doRemark(input, output);
});

test("ensure it works as last header", () => {
	const input = "# Main Title\n\n## Star Chart\n";
	const output = `# Main Title

## Star Chart

[![Stargazers over time](https://starchart.cc/eankeen/sync-readme.svg)](https://starchart.cc/eankeen/sync-readme)
`;

	doRemark(input, output);
});

function doRemark(input: string, output: string) {
	remark()
		// @ts-ignore
		.use(remarkStargazers, {
			owner: "eankeen",
			repo: "sync-readme",
		})
		.process(input)
		.then((vfile) => {
			expect(vfile.contents).toBe(output);
		})
		.catch((err) => {
			console.error(err);
		});
}
