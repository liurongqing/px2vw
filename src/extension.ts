import * as vscode from 'vscode'
import process from './process'
import provider from './provider'

export function activate(context: vscode.ExtensionContext) {

    let config = vscode.workspace.getConfiguration('px2vw');
    const Process = new process(config);
    const Provider = new provider(Process);
    const LANS = ['html', 'css', 'less', 'scss', 'sass', 'stylus'];

    for (let lan of LANS) {
        let providerDisposable = vscode.languages.registerCompletionItemProvider(lan, Provider);
        context.subscriptions.push(providerDisposable);
    }

    let disposable = vscode.commands.registerTextEditorCommand('extension.px2vw', function (textEditor, edit) {
        const doc = textEditor.document;
        let selection: vscode.Selection | vscode.Range = textEditor.selection;

        if (selection.isEmpty) {
            const start = new vscode.Position(0, 0);
            const end = new vscode.Position(doc.lineCount - 1, doc.lineAt(doc.lineCount - 1).text.length);
            selection = new vscode.Range(start, end);
        }

        let text = doc.getText(selection);

        textEditor.edit(builder => {
            builder.replace(selection, Process.convertAll(text))
        });
    })

    context.subscriptions.push(disposable);
}

export function deactivate() { }