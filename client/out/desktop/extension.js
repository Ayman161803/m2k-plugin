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
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = void 0;
const path = require("path");
const vscode = require("vscode");
const commandHandlers_1 = require("./commandHandlers");
function activate(context) {
    // Set the process.browser variable so that the Concerto logger doesn't try to create log files
    process.browser = true;
    // The server is implemented in node
    let serverModule = context.asAbsolutePath(path.join('server', 'out', 'server.js'));
    // The debug options for the server
    let debugOptions = {
        execArgv: ["--nolazy", "--inspect=6009"]
    };
    // create the output channel
    const outputChannel = vscode.window.createOutputChannel('Move2Kube');
    // Register commands
    context.subscriptions.push(vscode.commands
        .registerCommand('m2k-plugin.generatePlan', commandHandlers_1.generatePlan));
}
exports.activate = activate;
//# sourceMappingURL=extension.js.map