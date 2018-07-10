import * as vscode from 'vscode'
import process from './process'

export default class Provider implements vscode.CompletionItemProvider {
    constructor(private process: process) { }

    provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken): Thenable<vscode.CompletionItem[]> {
        return new Promise((resolve, reject) => {
            const lineText = document.getText(new vscode.Range(position.with(undefined, 0), position));
            const res = this.process.convert(lineText);
            if (!res) {
                return resolve([]);
            }

            const item = new vscode.CompletionItem(`${res.pxValue}px -> ${res.vw}`, vscode.CompletionItemKind.Snippet);
            item.insertText = res.vw;
            return resolve([item]);
        });
    }
}