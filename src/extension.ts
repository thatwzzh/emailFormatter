// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	let provider = vscode.languages.registerCompletionItemProvider('html', {

		provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext) {

			const str = '${1|'+'e,2,4,6'+'|}';
			const snippetCompletion = new vscode.CompletionItem('tx');
			snippetCompletion.insertText = new vscode.SnippetString('<td '+ str +'>${2}</td>');
			snippetCompletion.documentation = new vscode.MarkdownString("包含style的td标签");
			return [
				snippetCompletion
			];
		}
	},'tx');

	context.subscriptions.push(provider);
}

// this method is called when your extension is deactivated
export function deactivate() { }
