const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

// Define keywords to search for
const sensitiveKeywords = ['password', 'username', 'secret'];

let statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right);

function activate(context) {
	let scanningInterval;
	let isScanning = false;

	// Register the command to toggle the scanning process
	let disposable = vscode.commands.registerCommand('extension.toggleSensitiveDataScan', () => {
		isScanning = !isScanning;

		if (isScanning) {
			// Start scanning with a 1-minute interval (adjust as needed)
			scanningInterval = setInterval(() => {
				scanForSensitiveData(vscode.workspace.rootPath);
			}, 60000);

			statusBarItem.text = `$(search) Scanning for sensitive data`;
			statusBarItem.show();
		} else {
			// Stop the scanning
			clearInterval(scanningInterval);
			statusBarItem.text = '';
			statusBarItem.hide();
		}
	});

	context.subscriptions.push(disposable);

	// Initial check to see if the extension should start scanning at startup
	const isAutoScanEnabled = vscode.workspace.getConfiguration('yourExtensionName').get('autoScanOnStartup');
	if (isAutoScanEnabled) {
		vscode.commands.executeCommand('extension.toggleSensitiveDataScan');
	}
}

function scanForSensitiveData(directoryPath) {
	// Implement the scanning logic here, similar to the previous example
	// ...
}

function containsSensitiveKeywords(content) {
	// Implement the keyword checking logic here
	// ...
}

module.exports = {
	activate
};