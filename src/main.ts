import fs from 'fs'
import path from 'path'
import remark from 'remark'
import remarkTableOfContents from 'remark-toc'
// import remarkStarchart from "remark-starchart";
import remarkLicense from '@fox-land/remark-license'
import remarkTitle from '@fox-land/remark-title'

export async function main(readmePath: string): Promise<string> {
	let readmeFile
	try {
		readmeFile = await fs.promises.readFile(readmePath, { encoding: 'utf8' })
	} catch (err) {
		console.error(`Could not read readme file '${readmeFile}`)
		console.error(err)
		process.exitCode = 1
	}

	let title = path.basename(path.dirname(readmePath))
	if (title === '.') title = path.basename(process.cwd())

	// @ts-ignore
	return remark()
		.use(remarkTitle, { title })
		.use(remarkLicense, { spdxId: 'Apache-2.0' })
		.process(readmeFile)
		.then((vfile) => {
			return vfile.contents
		})
		.catch((err) => {
			console.error(
				`An unexpected error occured when processing your markdown file`
			)
			console.error(err)
			process.exitCode = 1
		})
}
