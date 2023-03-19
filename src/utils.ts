import joplin from 'api';

export default class Utils {

	public static async replaceLineText(line, text) {
		const { curline, curCh } = await joplin.commands.execute('editor.execCommand', {name: "getLine", args: [line]});
		await joplin.commands.execute('editor.execCommand', { name: 'replaceRange' , args: [text, { line: line, ch: 0 }, { line: line, ch: curCh }] });
	};

	public static async replaceCurrentLineText(text) {
		const { line, ch } = await joplin.commands.execute('editor.execCommand', {name: "getCursor"});
		await this.replaceLineText(line, text)
	}

	public static removeHeadTag(text) {
		return text.replace(/^([#]+ )(.*?)$/,  "$2")
	}

	public static async supplyHeadText(headTag) {
		const selections = await joplin.commands.execute('editor.execCommand', {name: "listSelections"});
		if (selections.length > 0) {
			for (let i = 0; i < selections.length; i++) {
				const s = selections[i];

				for (let line = s.head.line; line <= s.anchor.line; line++) {
					const text = await joplin.commands.execute('editor.execCommand', {name: "getLine", args:[line]});
					await this.replaceLineText(line, headTag + " " + this.removeHeadTag(text))
				}
			}
		} else {
			const text = await joplin.commands.execute('editor.execCommand', {name: "getCurrentLine"});
			await this.replaceCurrentLineText(headTag + " " + this.removeHeadTag(text))
		}
	}
}