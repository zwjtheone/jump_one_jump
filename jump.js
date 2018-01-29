/**
 * Created by beiwan on 2017/12/29.
 */
const util = require("util");
const fs = require("fs");
const path = require("path");
const exec = util.promisify(require("child_process").exec);
const ADB_PATH = "adb";
const SCREENCAP_REMOTE_PATH = "/sdcard/screencap.png";
const SCREENCAP_PATH = path.resolve(".", "public/images/jump_screencap");
const BOOM = 4.88;
jumpGo = async (timeout) => {
	const r = Math.random() * 20;
	const { stdout } = await exec(`${ADB_PATH} shell input touchscreen swipe ${150 + r} ${200 + r} ${140 + r} ${100 + r} ${timeout}`);
	console.log(stdout);
};
fetchScreenCap = async () => {
	const { stdout, stderr } = await exec(`${ADB_PATH} shell /system/bin/screencap -p /sdcard/screenshot.png`);
	console.log("fetch...");
	pullScreenCap();
};
pullScreenCap = async () => {
	const { stdout, stderr } = await exec(`adb pull /sdcard/screenshot.png C:\/Users\/Jay99\/Desktop\/you_jump_i_jump-master\/public\/images\/jump_screencap\/screencap.png`, []);
	// adb pull /sdcard/screenshot.png C:\Users\Jay99\Desktop\you_jump_i_jump-master\public\images\jump_screencap
	console.log("pull...");
};
distance = (start, end) => {
	return Math.sqrt(Math.pow((start.x - end.x), 2) + Math.pow((start.y - end.y), 2));
};
iJump = async (distance) => {
	await jumpGo(parseInt(distance * BOOM));
	// await setTimeout(async () => {
	// 	await fetchScreenCap();
	// }, 100);
};
refreshScreencap = async () => {
	await fetchScreenCap();
};
module.exports = {
	iJump,
	refreshScreencap
};
