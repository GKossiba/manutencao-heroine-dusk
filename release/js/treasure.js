/**
 Treasure
 Handles display and rewards for loot
 */

var TREASURE_ICON_SIZE = 32;
var TREASURE_POS_X = 64;
var TREASURE_POS_Y = 88;

var treasure = new Object();

treasure.img = new Image();
treasure.img_loaded = false;

treasure.gold_pos = new Array();

/*** Initialize **********************/
function treasure_init() {

  treasure.img.src = "images/treasure/treasure.png";
  treasure.img.onload = function() {treasure_img_onload();};  
  
  // icon positions on sprite sheet and on ground in 3D view
  // see art_src/treasure/gold_pos.xcf for destinations reference
  treasure.gold_pos[0] = {dest_x: 65, dest_y: 93};
  treasure.gold_pos[1] = {dest_x: 56, dest_y: 96};
  treasure.gold_pos[2] = {dest_x: 74, dest_y: 95};
  treasure.gold_pos[3] = {dest_x: 74, dest_y: 86};
  treasure.gold_pos[4] = {dest_x: 50, dest_y: 80};
  treasure.gold_pos[5] = {dest_x: 63, dest_y: 78};
  treasure.gold_pos[6] = {dest_x: 41, dest_y: 92};
  treasure.gold_pos[7] = {dest_x: 90, dest_y: 76};
  treasure.gold_pos[8] = {dest_x: 87, dest_y: 94};
  treasure.gold_pos[9] = {dest_x: 29, dest_y: 77};

}

/*** Image loading Helpers **********************/
function treasure_img_onload() {treasure.img_loaded = true;}

/**
 * This function renders a gold pile
 * with correct gold value up to 1023 currently
 */
const GOLD_DRAW_TABLE = [
  { mask: 128, icon: 7 },
  { mask: 512, icon: 9 },
  { mask: 32,  icon: 5 },
  { mask: 16,  icon: 4 },
  { mask: 8,   icon: 3 },
  { mask: 1,   icon: 0 },
  { mask: 4,   icon: 2 },
  { mask: 64,  icon: 6 },
  { mask: 2,   icon: 1 },
  { mask: 256, icon: 8 }
];

function treasure_render_gold(total_value) {
  GOLD_DRAW_TABLE.forEach(entry => {
    if (total_value & entry.mask) {
      treasure_render_gold_icon(entry.icon);
    }
  });
}


function treasure_render_gold_icon(item_id) {

  ctx.drawImage(
    treasure.img,
    (item_id * TREASURE_ICON_SIZE) * PRESCALE,
    0,
    TREASURE_ICON_SIZE * PRESCALE,
    TREASURE_ICON_SIZE * PRESCALE,
    treasure.gold_pos[item_id].dest_x * SCALE,
    treasure.gold_pos[item_id].dest_y * SCALE,
    TREASURE_ICON_SIZE * SCALE,
    TREASURE_ICON_SIZE * SCALE 
  );
}

function treasure_render_item(item_id) {
  ctx.drawImage(
    treasure.img,
    (item_id * TREASURE_ICON_SIZE) * PRESCALE,
    0,
    TREASURE_ICON_SIZE * PRESCALE,
    TREASURE_ICON_SIZE * PRESCALE,
    TREASURE_POS_X * SCALE,
    TREASURE_POS_Y * SCALE,
    TREASURE_ICON_SIZE * SCALE,
    TREASURE_ICON_SIZE * SCALE 
  );
}


