# Joplin-hotkey

Optimized hotkey plugin for Joplin.

## How to?

You can achieve the corresponding effect by using the shortcut keys below.

| Name | Description | Default key binding |
| --- | --- | --- |
| toggleTitleH1 | Toggle # H1 title |  CmdOrCtrl+1   |
| toggleTitleH2 | Toggle ## H2 title |  CmdOrCtrl+2   |
| toggleTitleH3 | Toggle ### H3 title |  CmdOrCtrl+3   |
| toggleTitleH4 | Toggle #### H4 title |  CmdOrCtrl+4   |
| toggleTitleH5 | Toggle ##### H5 title |  CmdOrCtrl+5   |

## Contributing

### For User

You can propose an [issue](https://github.com/artikell/joplin-hotkey/issues/new) to describe the hotkeys you want to have. For example:

```
Title：Heading
Default key binding：CmdOrCtrl+1
Description：
- Add a "# " prefix to the selected line (or the line where the cursor is located)
```

### For Developer

As a developer, you need to understand how to create a hotkey. You can refer to the API [documentation](https://joplinapp.org/api/references/plugin_api/classes/joplincommands.html)

In the current project, you need to modify two places:

The method of editor.execCommand can be queried from this [useCursorUtils.ts](https://github.com/laurent22/joplin/blob/dev/packages/app-desktop/gui/NoteEditor/NoteBody/CodeMirror/utils/useCursorUtils.ts)
- defineExtension method
- CodeMirror own method

Utils is a public method class in which you can implement desired functions:

```
// Utils.ts
import joplin from 'api';

export default class Utils {

	public static async replaceLineText(line, text) {
		const { curline, curCh } = await joplin.commands.execute('editor.execCommand', {name: "getLine", args: [line]});
		await joplin.commands.execute('editor.execCommand', { name: 'replaceRange' , args: [text, { line: line, ch: 0 }, { line: line, ch: curCh }] });
	};

}
```
Then, you can add your hotkeys to index.ts and call the method you just added.

```
const hotKeyList = [
	{
		name: "TitleH1",
		lable: "H1",
		iconName: "fas fa-music",
		enabledCondition: "noteIsMarkdown",
		menuItemLocation: MenuItemLocation.Edit,
		accelerator:"CmdOrCtrl+1",
		commandName: "supplyHeadText",
		args: [ "#" ]
	},
]
```

## Notes

- Welcome to participate in the implementation of hotkey. It's not complicated, but it's effective