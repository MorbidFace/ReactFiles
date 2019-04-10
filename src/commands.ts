import * as vscode from 'vscode';
import * as fs from 'fs';
import { toCamelCase, toUpperCase, toTileCase, toPascalCase } from './formatting';

export const CreateComponent = async (uri: vscode.Uri) => {
  let path = uri.fsPath;
  let re = /\\/gi;
  let newPath = path.replace(re, '/');

  const componentName = await vscode.window.showInputBox({
    placeHolder: 'Name Your Component'
  });

  if (componentName != undefined) {
    let lowerCaseComponent = componentName.toLowerCase();
    const titleCaseComponent = toPascalCase(componentName);
    let formattedTitleCaseComponent = titleCaseComponent.replace(re, '');
    if (!fs.existsSync(`${newPath}/${formattedTitleCaseComponent}`)) {
      fs.mkdirSync(`${newPath}/${formattedTitleCaseComponent}`);
    }
    if (
      !fs.existsSync(
        `${newPath}/${formattedTitleCaseComponent}/${formattedTitleCaseComponent}.jsx`
      )
    ) {
      let componentTemplate = fs.readFileSync(
        `${__dirname}/templates/component.templ`
      );
      re = /[$][{]upperName[}]/gm;
      let formattedTemplate = componentTemplate
        .toString()
        .replace(re, formattedTitleCaseComponent);
      fs.writeFileSync(
        `${newPath}/${formattedTitleCaseComponent}/${formattedTitleCaseComponent}.jsx`,
        formattedTemplate
      );
    }
  }
};
