import * as vscode from 'vscode';
import EmailFormatterProvider from './provide';

export function activate(context: vscode.ExtensionContext) {

	const provider = new EmailFormatterProvider();
	const completeProvider = vscode.languages.registerCompletionItemProvider('html',provider,'1','2','3');

	context.subscriptions.push(completeProvider);
}

export function deactivate() { }
