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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePlan = exports.setOutputChannelForCommand = void 0;
const vscode = require("vscode");
const { spawn } = require('child_process');
let outputChannel;
function setOutputChannelForCommand(oc) {
    outputChannel = oc;
}
exports.setOutputChannelForCommand = setOutputChannelForCommand;
function generatePlan(file) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            vscode.window.showInformationMessage(`Generating Plan..`);
            console.log("here");
            var workerProcess = spawn(`move2kube plan`, [`-p ${file.fsPath} -s ${file.fsPath}`]);
            const terminalCommand = `move2kube plan -p ${file.fsPath} -s ${file.fsPath}`;
            outputChannel.show();
            outputChannel.clear();
            const child = spawn(terminalCommand, [], {
                shell: true,
                env: process.env
            });
            child.stdout.on('data', (data) => {
                outputChannel.appendLine(data.toString());
            });
            child.stderr.on('data', (data) => {
                outputChannel.appendLine(data.toString());
            });
            child.on('exit', () => vscode.window.showInformationMessage(`Sucessfully generated plan to ${file.fsPath}`));
            return true;
        }
        catch (error) {
            vscode.window.showErrorMessage(`Failed to trigger clause ${error}`);
        }
        return false;
    });
}
exports.generatePlan = generatePlan;
//# sourceMappingURL=commandHandlers.js.map