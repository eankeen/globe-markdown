import fs from "fs";
import path from "path";
import remark from "remark";
import remarkTableOfContents from "remark-toc";
// import remarkStarchart from "remark-starchart";
import remarkLicense from "@fox-land/remark-license";
import remarkTitle from "@fox-land/remark-title";

export async function main(readmePath : string): Promise<void> {
  let readmeFile;
  try {
    readmeFile = await fs.promises.readFile(readmePath, {encoding: "utf8"});
  } catch (err) {
    console.error(`Could not read readme file '${readmeFile}`);
    console.error(err);
  }

  remark().use(remarkTitle, {title: path.dirname(readmePath)}).use(remarkLicense, {spdxId: "Apache-2.0"}).process(readmeFile).then((vfile) => {
    console.info(vfile);
  }).catch((err) => {
    console.error(err);
  });
}
