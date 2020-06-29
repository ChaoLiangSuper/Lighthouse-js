const { readFileSync, writeFileSync } = require('fs');
const path = require('path');

const BUILD_FOLDER = 'dist';

function main() {
  const sourceFile = readFileSync(process.env.PWD + '/package.json').toString('utf-8');
  const project = JSON.parse(sourceFile);
  delete project.files;
  delete project.scripts;
  delete project.devDependencies;
  delete project.publishConfig;
  project.main = path.basename(project.main);
  project.types = path.basename(project.types);
  writeFileSync(
    process.env.PWD + `/${BUILD_FOLDER}/package.json`,
    Buffer.from(JSON.stringify(project, null, 2), 'utf-8')
  );
  writeFileSync(process.env.PWD + `/${BUILD_FOLDER}/version.txt`, Buffer.from(project.version, 'utf-8'));
}

main();
