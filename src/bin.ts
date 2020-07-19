import fs from 'fs'
import { main } from './main'

const readmeFile = process.argv[2] || 'README.md'
main(readmeFile)
	.then(async (text: string) => {
		try {
			await fs.promises.writeFile(readmeFile, text)
		} catch (err) {
			console.error(`error writing to readmefile '${readmeFile}'`)
			console.error(err)
			process.exitCode = 1
		}
	})
	.catch((err) => {
		console.error(err)
	})
