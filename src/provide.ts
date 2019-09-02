import * as vscode from 'vscode';

class EmailFormatterProvider implements vscode.CompletionItemProvider {
  constructor () {}

  provideCompletionItems (
    document: vscode.TextDocument,
    position: vscode.Position
  ): Thenable<vscode.CompletionItem[]> {
    return new Promise((resolve, reject) => {
      //获取光标所在行的字符串
      const line = document.lineAt(position);
      const lineText = line.text.substring(0, position.character);
      const result = /^\s*t[1|2|3]$/.test(lineText);
      if (!result) {
          return resolve([]);
      }

      //获取默认的td样式
      const lineNum = position.line;
      const characterNum = position.character;
      const dafaultFontFamily = vscode.workspace.getConfiguration().get('emailFormatter.fontFamily');
      let defaultFontSize = '12px';
      let defaultColor = ':#333333';
      for(let i = lineNum - 1; i>=0;i-- ){
        const text = document.lineAt(i).text;
        const index = text.indexOf('<td style="font-family:');
        if( index >= 0 && index <= characterNum - 2 ){
          const size = text.slice(text.indexOf('font-size:') + 10,text.indexOf(';color:'));
          defaultFontSize = size;
          const color = text.slice(text.indexOf('color') + 5,text.indexOf(';font-family:'));
          defaultColor = color;
          break;
        }
      }

      //格式化的table
      const snippetCompletion1 = new vscode.CompletionItem('t1');
      snippetCompletion1.insertText = new vscode.SnippetString('<table border="0" cellpadding="0" cellspacing="0" width="${1:100%}" ${2}>${3}</table>');
      snippetCompletion1.documentation = new vscode.MarkdownString("包含默认属性的table标签");
      //格式化的td
      const snippetCompletion2 = new vscode.CompletionItem('t2');
      snippetCompletion2.insertText = new vscode.SnippetString('<td style="font-size:${1:' + defaultFontSize + '};color${2:' + defaultColor + '};font-family:' + dafaultFontFamily + ';${3}">${4}</td>');
      snippetCompletion2.documentation = new vscode.MarkdownString("包含style的td标签");
      //格式化的占位td
      const snippetCompletion3 = new vscode.CompletionItem('t3');
      snippetCompletion3.insertText = new vscode.SnippetString('<tr><td height="${1:1}" colspan="${2:1}" bgcolor="${3:#ffffff}"></td></tr>');
      snippetCompletion3.documentation = new vscode.MarkdownString("包含默认高度的占位标签");

      return resolve([snippetCompletion1,snippetCompletion2,snippetCompletion3]);
    });
  }
}

export default EmailFormatterProvider;
