import * as vscode from 'vscode';

class EmailFormatterProvider implements vscode.CompletionItemProvider {
  constructor () {}

  provideCompletionItems (
    document: vscode.TextDocument,
    position: vscode.Position
  ): Thenable<vscode.CompletionItem[]> {
    return new Promise((resolve, reject) => {
        const line = document.lineAt(position);
	    const lineText = line.text.substring(0, position.character);
        const result = /^\s*tx$/.test(lineText);
        if (!result) {
            return resolve([]);
        }
        const fontFamily = vscode.workspace.getConfiguration().get('emailFormatter.fontFamily');
        const snippetCompletion = new vscode.CompletionItem('tx');
        snippetCompletion.insertText = new vscode.SnippetString('<td style="font-family:' + fontFamily + ';font-size:${1};color${2};">${3}</td>');
        snippetCompletion.documentation = new vscode.MarkdownString("包含style的td标签");
        return resolve([snippetCompletion]);
    });
  }
}

export default EmailFormatterProvider;
