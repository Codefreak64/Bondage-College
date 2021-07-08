"use strict";

// Loads the item extension properties
function InventoryItemNeckAccessoriesCollarNameTagLoverLoad() {
	if (DialogFocusItem.Property == null) DialogFocusItem.Property = { Type: null };
}

// Draw the item extension screen
function InventoryItemNeckAccessoriesCollarNameTagLoverDraw() {
	// Draw the header and item
	DrawAssetPreview(1387, 125, DialogFocusItem.Asset);

	// Draw the possible tags
	if (!InventoryItemHasEffect(DialogFocusItem, "Lock", true)) {
		DrawText(DialogFindPlayer("SelectCollarNameTagLoverType"), 1500, 500, "white", "gray");
		var List = DialogFocusItem.Asset.AllowType;
		var X = 955;
		var Y = 530;
		for (let T = 0; T < List.length; T++) {
			if ((DialogFocusItem.Property.Type != List[T])) DrawButton(X, Y, 200, 55, DialogFindPlayer("CollarNameTagLoverType" + List[T]), "White");
			X = X + 210;
			if (T % 5 == 4) {
				X = 955;
				Y = Y + 60;
			}
		}
	}
	else {
		DrawText(DialogFindPlayer("SelectCollarNameTagLoverTypeLocked"), 1500, 500, "white", "gray");
	}
}

// Catches the item extension clicks
function InventoryItemNeckAccessoriesCollarNameTagLoverClick() {
	if ((MouseX >= 1885) && (MouseX <= 1975) && (MouseY >= 25) && (MouseY <= 110)) { DialogFocusItem = null; return; }
	if (!InventoryItemHasEffect(DialogFocusItem, "Lock", true)) {
		var List = DialogFocusItem.Asset.AllowType;
		var X = 955;
		var Y = 530;
		for (let T = 0; T < List.length; T++) {
			if ((MouseX >= X) && (MouseX <= X + 200) && (MouseY >= Y) && (MouseY <= Y + 55) && (DialogFocusItem.Property.Type != List[T]))
				InventoryItemNeckAccessoriesCollarNameTagLoverSetType(List[T]);
			X = X + 210;
			if (T % 5 == 4) {
				X = 955;
				Y = Y + 60;
			}
		}
	}
}

// Sets the type of tag
function InventoryItemNeckAccessoriesCollarNameTagLoverSetType(NewType) {
	var C = (Player.FocusGroup != null) ? Player : CurrentCharacter;
	if (CurrentScreen == "ChatRoom") {
		DialogFocusItem = InventoryGet(C, C.FocusGroup.Name);
		InventoryItemNeckAccessoriesCollarNameTagLoverLoad();
	}
	DialogFocusItem.Property.Type = NewType;
	DialogFocusItem.Property.Effect = [];

	// Refreshes the character and chatroom
	CharacterRefresh(C);
	var Dictionary = [];
	Dictionary.push({Tag: "DestinationCharacter", Text: C.Name, MemberNumber: C.MemberNumber});
	Dictionary.push({Tag: "SourceCharacter", Text: Player.Name, MemberNumber: Player.MemberNumber});
	Dictionary.push({Tag: "NameTagType", TextToLookUp: "CollarNameTagLoverType" + ((NewType) ? NewType : "")});
	ChatRoomPublishCustomAction("CollarNameTagLoverSet", true, Dictionary);
	if (DialogInventory != null) {
		DialogFocusItem = null;
		DialogMenuButtonBuild(C);
	}
}
