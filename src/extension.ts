import * as vscode from 'vscode';
import EmailFormatterProvider from './provide';

export function activate(context: vscode.ExtensionContext) {

	//属性替换和emmet有所冲突，需要设置"emmet.showExpandedAbbreviation":"never"
	vscode.window.showInformationMessage('please set "emmet.showExpandedAbbreviation" to "never" in "settings.json"');

	const provider = new EmailFormatterProvider();
	const completeProvider = vscode.languages.registerCompletionItemProvider('html',provider,'1','2','3');

	context.subscriptions.push(completeProvider);
}

export function deactivate() { }
