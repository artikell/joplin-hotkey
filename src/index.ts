import joplin from 'api';
import Utils from './utils';
import { MenuItemLocation } from 'api/types';
import { SettingItemSubType, SettingItemType, ToolbarButtonLocation } from 'api/types';

joplin.plugins.register({
	onStart: async function() {

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
			{
				name: "TitleH2",
				lable: "H2",
				iconName: "fas fa-music",
				enabledCondition: "noteIsMarkdown",
				menuItemLocation: MenuItemLocation.Edit,
				accelerator:"CmdOrCtrl+2",
				commandName: "supplyHeadText",
				args: [ "##" ]
			},
			{
				name: "TitleH3",
				lable: "H3",
				iconName: "fas fa-music",
				enabledCondition: "noteIsMarkdown",
				menuItemLocation: MenuItemLocation.Edit,
				accelerator:"CmdOrCtrl+3",
				commandName: "supplyHeadText",
				args: [ "###" ]
			},
			{
				name: "TitleH4",
				lable: "H4",
				iconName: "fas fa-music",
				enabledCondition: "noteIsMarkdown",
				menuItemLocation: MenuItemLocation.Edit,
				accelerator:"CmdOrCtrl+4",
				commandName: "supplyHeadText",
				args: [ "####" ]
			},
			{
				name: "TitleH5",
				lable: "H5",
				iconName: "fas fa-music",
				enabledCondition: "noteIsMarkdown",
				menuItemLocation: MenuItemLocation.Edit,
				accelerator:"CmdOrCtrl+5",
				commandName: "supplyHeadText",
				args: [ "#####" ]
			},
		]

		for (const item of hotKeyList) {
			await joplin.commands.register({
				name: item.name + 'Command',
				label: item.lable,
				iconName: item.iconName,
				enabledCondition: item.enabledCondition,
				execute: async () => {
					await Utils[item.commandName](...item.args)
				},
			});

			await joplin.views.menuItems.create(item.name + 'MenuItem', item.name + 'Command', item.menuItemLocation, { accelerator: item.accelerator });
		}

		await joplin.commands.register({
			name: 'aboutCommand',
			label: 'AboutHotKey',
			iconName: 'fas fa-drum',
			execute: async () => {
				console.info('about from https://github.com/laurent22/joplin/issues/7943');
			},
		});
		await joplin.views.menuItems.create('aboutMenuItem', 'aboutCommand', MenuItemLocation.Edit);
	},
});