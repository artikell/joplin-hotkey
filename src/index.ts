import joplin from 'api';
import { MenuItemLocation } from 'api/types';
import { SettingItemSubType, SettingItemType, ToolbarButtonLocation } from 'api/types';

joplin.plugins.register({
	onStart: async function() {

		/** Common Function */
		const supplyText = async (line, text) => {
			const { curline, curCh } = await joplin.commands.execute('editor.execCommand', {name: "getLine", args: [line]});
			await joplin.commands.execute('editor.execCommand', { name: 'replaceRange' , args: [text, { line: line, ch: 0 }, { line: line, ch: curCh }] });
		};

		const supplyCurText = async (text) => {
			const { line, ch } = await joplin.commands.execute('editor.execCommand', {name: "getCursor"});
			await supplyText(line, text)
		}

		const removeHeadTag = (text) => {
			return text.replace(/^([#]+ )(.*?)$/,  "$2")
		}

		const supplyHeadText = async (headTag) => {
			const selections = await joplin.commands.execute('editor.execCommand', {name: "listSelections"});
			if (selections.length > 0) {
				for (let i = 0; i < selections.length; i++) {
					const s = selections[i];

					for (let line = s.head.line; line <= s.anchor.line; line++) {
						const text = await joplin.commands.execute('editor.execCommand', {name: "getLine", args:[line]});
						await supplyText(line, headTag + " " + removeHeadTag(text))
					}
				}
			} else {
				const text = await joplin.commands.execute('editor.execCommand', {name: "getCurrentLine"});
				await supplyCurText(headTag + " " + removeHeadTag(text))
			}
		}

		/** Command List */
		await joplin.commands.register({
			name: 'TitleH1Command',
			label: 'H1',
			iconName: 'fas fa-music',
			enabledCondition: "noteIsMarkdown",
			execute: async () => {
				await supplyHeadText("#")
			},
		});

		await joplin.commands.register({
			name: 'TitleH2Command',
			label: 'H2',
			iconName: 'fas fa-music',
			enabledCondition: "noteIsMarkdown",
			execute: async () => {
				await supplyHeadText("##")
			},
		});

		await joplin.commands.register({
			name: 'TitleH3Command',
			label: 'H3',
			iconName: 'fas fa-music',
			enabledCondition: "noteIsMarkdown",
			execute: async () => {
				await supplyHeadText("###")
			},
		});

		await joplin.commands.register({
			name: 'TitleH4Command',
			label: 'H4',
			iconName: 'fas fa-music',
			enabledCondition: "noteIsMarkdown",
			execute: async () => {
				await supplyHeadText("####")
			},
		});

		await joplin.commands.register({
			name: 'TitleH5Command',
			label: 'H5',
			iconName: 'fas fa-music',
			enabledCondition: "noteIsMarkdown",
			execute: async () => {
				await supplyHeadText("#####")
			},
		});

		await joplin.commands.register({
			name: 'aboutCommand',
			label: 'AboutHotKey',
			iconName: 'fas fa-drum',
			execute: async () => {
				console.info('about from https://github.com/laurent22/joplin/issues/7943');
			},
		});

		// Add the commands to the menu
		await joplin.views.menuItems.create('TitleH1MenuItem', 'TitleH1Command', MenuItemLocation.Edit, { accelerator: 'CmdOrCtrl+1' });
		await joplin.views.menuItems.create('TitleH2MenuItem', 'TitleH2Command', MenuItemLocation.Edit, { accelerator: 'CmdOrCtrl+2' });
		await joplin.views.menuItems.create('TitleH3MenuItem', 'TitleH3Command', MenuItemLocation.Edit, { accelerator: 'CmdOrCtrl+3' });
		await joplin.views.menuItems.create('TitleH4MenuItem', 'TitleH4Command', MenuItemLocation.Edit, { accelerator: 'CmdOrCtrl+4' });
		await joplin.views.menuItems.create('TitleH5MenuItem', 'TitleH5Command', MenuItemLocation.Edit, { accelerator: 'CmdOrCtrl+5' });
		await joplin.views.menuItems.create('aboutMenuItem', 'aboutCommand', MenuItemLocation.Edit);
	},
});