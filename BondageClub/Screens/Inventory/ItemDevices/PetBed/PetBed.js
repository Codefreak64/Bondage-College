"use strict";

var InventoryItemDevicesPetBedOptions = [
	{
		Name: "NoBlanket",
		Property: { Type: null },
	},
	{
		Name: "Blanket",
		Property: { Type: "Blanket" },
	},
];

// Loads the item extension properties
function InventoryItemDevicesPetBedLoad() {
	ExtendedItemLoad(InventoryItemDevicesPetBedOptions, "SelectPetBedType");
}

// Draw the item extension screen
function InventoryItemDevicesPetBedDraw() {
	ExtendedItemDraw(InventoryItemDevicesPetBedOptions, "PetBedType");
}

// Catches the item extension clicks
function InventoryItemDevicesPetBedClick() {
	ExtendedItemClick(InventoryItemDevicesPetBedOptions);
}

function InventoryItemDevicesPetBedAction(C, Option) {
	var msg = "PedBedSet" + Option.Name;
	var Dictionary = [
		{ Tag: "SourceCharacter", Text: Player.Name, MemberNumber: Player.MemberNumber },
		{ Tag: "TargetCharacter", Text: C.Name, MemberNumber: C.MemberNumber },
	];
	ChatRoomPublishCustomAction(msg, true, Dictionary);
}

function InventoryItemDevicesPetBedNpcDialog(C, Option) {
	C.CurrentDialog = DialogFind(C, "PetBedSet" + Option.Name, "ItemDevices");
}