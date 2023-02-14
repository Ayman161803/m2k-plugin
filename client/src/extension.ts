/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 * http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

import * as path from 'path';

import * as vscode from 'vscode';
import { generatePlan, setOutputChannelForCommand } from './commandHandlers';

export function activate(context: vscode.ExtensionContext) {

	// Set the process.browser variable so that the Concerto logger doesn't try to create log files
	(process as any).browser = true;

	// The server is implemented in node
	let serverModule = context.asAbsolutePath(path.join('server', 'out', 'server.js'));

	// The debug options for the server
	let debugOptions = {
		execArgv: ["--nolazy", "--inspect=6009"]
	};
	// create the output channel
	const outputChannel = vscode.window.createOutputChannel('Move2Kube');
	setOutputChannelForCommand(outputChannel)

	// Register commands
	context.subscriptions.push(vscode.commands
		.registerCommand('m2k-plugin.generatePlan', generatePlan));
	
}