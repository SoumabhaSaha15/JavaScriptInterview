import { exec } from 'child_process';
import { promises as fs } from 'fs';
import { join, parse } from 'path';

// Function to execute a file and redirect stdout to .out.txt
async function executeFile(filePath,log=false) {
  const { name,dir } = parse(filePath);
  const outputFilePath = `./${dir}/${name}.out.txt`;

  exec(`node ${filePath}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Execution error: ${error.message}`);
      return;
    }

    fs.writeFile(outputFilePath, stdout)
      .then(async () => {
        if(log){
          console.log(await fs.readFile(`${outputFilePath}`,"utf-8"))
        }
      })
      .catch(err => console.error(`Error writing to file: ${err.message}`));

    if (stderr) {
      console.error(`stderr: ${stderr}`);
    }
  });
}

// Function to create README.md
async function createReadme(targetDir) {
  const files = await fs.readdir(targetDir);
  const jsFiles = files.filter(file => file.endsWith('.js'));

  let readmeContent = `# JavaScript Interview\n`;

  for (const file of jsFiles) {
    const filePath = join(targetDir, file);
    const code = await fs.readFile(filePath, 'utf-8');
    const outputFilePath = join(targetDir, `${parse(file).name}.out.txt`);
    const output = await fs.readFile(outputFilePath, 'utf-8');

    readmeContent += `### ${file}\n\n`;
    readmeContent += `\`\`\`javascript\n${code}\n\`\`\`\n\n`;
    readmeContent += `## Output\n\n`;
    readmeContent += `\`\`\`\n${output}\n\`\`\`\n\n`;
  }

  await fs.writeFile('README.md', readmeContent);
}

// Main function to handle command line arguments
async function main() {
  const args = process.argv.slice(2);
  if (args.length > 0 && args[0]!='md') {
    // Execute the specified file
    await executeFile(args[0],true);
  } else {
    // No arguments provided, execute all .js files in ./Target directory
    const targetDir = './Target';
    
    try {
      const files = await fs.readdir(targetDir);
      const jsFiles = files.filter(file => file.endsWith('.js'));

      for (const file of jsFiles) {
        await executeFile(join(targetDir, file));
      }
      if(args.includes("md")){
        await createReadme(targetDir);
        console.log('README.md created successfully!');
      }
    } catch (err) {
      console.error(`Error reading directory: ${err.message}`);
    }
  }
}

main();