#!/usr/bin/env node
import got from "got";
import meow from "meow";
import clipboard from 'clipboardy';
import {createSpinner} from "nanospinner";

const cli = meow(`
	Usage
	  $ publicip <options>

	Options
	  --copy, -c  Copy the adress to the clipboard
	  --v6, -6  Fetches IPv6 address

	Examples
	  $ publicip -c
	  95.90.201.234 - Copied!
`, {
    importMeta: import.meta,
    flags: {
        copy: {
            type: 'boolean',
            alias: 'c'
        },
        v6: {
            type: 'boolean',
            alias: '6'
        }
    }
});

const spinner = createSpinner('Fetching IP...').start()
let text;
if(cli.flags.v6) {
    text = await got('https://api64.ipify.org').text();
} else {
    text = await got('https://api.ipify.org').text();
}

if(cli.flags.copy) {
    clipboard.writeSync(text);
    text += ' - Copied! ✅';
}
spinner.clear();
spinner.reset();
console.log(text);