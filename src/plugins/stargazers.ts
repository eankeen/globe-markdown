// @ts-ignore
import fs from "fs";
// @ts-ignore
import remark from "remark";
// @ts-ignore
import visit from "unist-util-visit";
// @ts-expect-error
import vfile from "vfile";

export default function plugin({
	owner,
	repo,
}: {
	owner: string;
	repo: string;
}) {
	return function transform(ast, file) {
		const stargazerLink = {
			type: "link",
			url: `https://starchart.cc/${owner}/${repo}`,
			children: [
				{
					type: "image",
					url: `https://starchart.cc/${owner}/${repo}.svg`,
					alt: "Stargazers over time",
				},
			],
		};

		for (let i = 0; i < ast.children.length; ++i) {
			const node = ast.children[i];
			const nextNode = ast.children[i + 1];

			if (
				node.type === "heading" &&
				node.children?.[0]?.value === "Star Chart"
			) {
				// optional chaining used when
				// star chart is the last header
				if (nextNode?.type !== "text") {
					ast.children.splice(i + 1, 0, stargazerLink);
				}
				break;
			}
		}
	};
}
