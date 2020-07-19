import path from 'path'
import remark from 'remark'
import remarkTableOfContents from 'remark-toc'
import remarkStarchart from 'remark-starchart'
import remarkLicense from '@fox-land/remark-license'
import remarkTitle from '@fox-land/remark-title'

interface Plugin {
	fn: Function
	options: Record<string, any>
}
export function doRemark(
	input: string,
	plugins: Plugin[],
	output: string
): Promise<any> {
	// @ts-ignore
	let result = remark()
	for (const plugin of plugins) {
		result = result().use(plugin.fn, plugin.options)
	}
	return result.process(input)
}

// TODO: table of contents is not showing up
const plugins = [
	{
		fn: remarkTitle,
		options: {
			title: path.basename(path.resolve(__dirname, '..')),
		},
	},
	{
		fn: remarkTableOfContents,
		options: {
			maxDepth: 3,
			tight: true,
		},
	},
	{
		fn: remarkStarchart,
		options: {
			owner: 'eankeen',
			repo: 'sync-readme',
		},
	},
	{
		fn: remarkLicense,
		options: {
			spdxId: 'Apache-2.0',
		},
	},
]

test('ensure it works normally', async () => {
	const input = '# Main Title\n'
	const output = `# globe-sync-readme

## Star Chart

[![Stargazers over time](https://starchart.cc/eankeen/sync-readme.svg)](https://starchart.cc/eankeen/sync-readme)

## License

Licensed under Apache-2.0
`

	const vfile = await doRemark(input, plugins, output)
	expect(vfile.contents).toBe(output)
})
