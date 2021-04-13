"use strict";
var InfiltrationPerksBackground = "Sheet";
var InfiltrationPerksList = ["Strength", "Charisma", "Agility", "Resilience", "Endurance", "Lockpicking", "KeenEye", "Running", "Mapping", "Forgery", "Begging", "Bribery", "Negotiation", "Recruiter"];

/**
 * Checks if a named perk is activated or not
 * @returns {boolean} - TRUE if the perk is active
 */
function InfiltrationPerksActive(PerkName) {
	let Index = InfiltrationPerksList.indexOf(PerkName);
	if (Index < 0) return false;
	return (Player.Infiltration.Perks.substr(Index, 1) == "1");
}

/**
 * Activate or deactivate a perk from the player choice
 * @returns {void} - Nothing
 */
function InfiltrationPerksActivate(PerkName) {
	while (Player.Infiltration.Perks.length < InfiltrationPerksList.length)
		Player.Infiltration.Perks = Player.Infiltration.Perks + "0";
	let Index = InfiltrationPerksList.indexOf(PerkName);
	if (Index < 0) return false;
	let Active = !InfiltrationPerksActive(PerkName);
	if (Active && (InfiltrationPerksAvail() <= InfiltrationPerksTaken())) return;
	Player.Infiltration.Perks = Player.Infiltration.Perks.substring(0, Index) + (Active ? "1" : "0") + Player.Infiltration.Perks.substring(Index + 1);
}

/**
 * Returns the number of perks taken by the player
 * @returns {void} - Nothing
 */
function InfiltrationPerksTaken() {
	return (Player.Infiltration.Perks.match(/1/g)||[]).length;
}

/**
 * Returns the number of perks available for the player
 * @returns {void} - Nothing
 */
function InfiltrationPerksAvail() {
	return SkillGetLevel(Player, "Infiltration") + 1;
}

/**
 * Loads the infiltration perks screen
 * @returns {void} - Nothing
 */
function InfiltrationPerksLoad() {
}

/**
 * Runs and draws the infiltration perks screen
 * @returns {void} - Nothing
 */
function InfiltrationPerksRun() {

	// List all the perks
	MainCanvas.textAlign = "left";
	for (let P = 0; P < InfiltrationPerksList.length; P++) {
		DrawButton(150 + Math.floor(P / 8) * 850, 115 + ((P % 8) * 100), 64, 64, "", "White", InfiltrationPerksActive(InfiltrationPerksList[P]) ? "Icons/Checked.png" : "");
		DrawText(TextGet(InfiltrationPerksList[P]), 250 + Math.floor(P / 8) * 850, 147 + ((P % 8) * 100), "Black", "Gray");
	}

	// Draw the exit button and avail perks
	MainCanvas.textAlign = "center";
	DrawText(TextGet("Perks") + " " + InfiltrationPerksTaken().toString() + " / " + InfiltrationPerksAvail().toString(), 1430, 845, (InfiltrationPerksAvail() > InfiltrationPerksTaken()) ? "Blue" : "Black", "Gray");
	DrawButton(1815, 75, 90, 90, "", "White", "Icons/Exit.png");
	
	DrawText("UNDER CONSTRUCTION", 1430, 750, "Red", "Gray");

}

/**
 * Handles clicks in the infiltration perks screen.
 * @returns {void} - Nothing
 */
function InfiltrationPerksClick() {
	if (MouseIn(1815, 75, 90, 90)) InfiltrationPerksExit();
	for (let P = 0; P < InfiltrationPerksList.length; P++)
		if (MouseIn(150 + Math.floor(P / 8) * 850, 115 + ((P % 8) * 100), 64, 64))
			InfiltrationPerksActivate(InfiltrationPerksList[P]);
}

/**
 * Updates the infiltration data for the player
 * @returns {void} - Nothing
 */
function InfiltrationPerksExit() {
	ServerSend("AccountUpdate", { Infiltration: Player.Infiltration });
	CommonSetScreen("Room", "Infiltration");
}