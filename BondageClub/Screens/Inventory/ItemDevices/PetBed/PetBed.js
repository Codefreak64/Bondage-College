"use strict";

var InventoryItemDevicesPetBedOptions = [
	{
		Name: "NoBlanket",
		Property: { Type: null },
	},
	{
		Name: "Cat",
		Property: { Type: "Cat" },
	},
];

// Loads the item extension properties
function InventoryItemDevicesPetBedLoad() {
	ExtendedItemLoad(InventoryItemDevicesPetBedrOptions, "SelectFamiliarType");
}

// Draw the item extension screen
function InventoryItemDevicesPetBedDraw() {
	ExtendedItemDraw(InventoryItemDevicesPetBedOptions, "FamiliarType");
}

// Catches the item extension clicks
function InventoryItemDevicesPetBedClick() {
	ExtendedItemClick(InventoryItemDevicesPetBedOptions);
}

function InventoryItemDevicesPetBedAction(C, Option) {
	var msg = "FamiliarSet" + Option.Name;
	var Dictionary = [
		{ Tag: "SourceCharacter", Text: Player.Name, MemberNumber: Player.MemberNumber },
		{ Tag: "TargetCharacter", Text: C.Name, MemberNumber: C.MemberNumber },
	];
	ChatRoomPublishCustomAction(msg, true, Dictionary);
}

function InventoryItemDevicesPetBedNpcDialog(C, Option) {
	C.CurrentDialog = DialogFind(C, "FamiliarSet" + Option.Name, "ItemDevices");
}