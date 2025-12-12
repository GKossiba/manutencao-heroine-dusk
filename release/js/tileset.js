/**
TileSet class.
  
2013 Clint Bellanger
*/

var TILE_COUNT = 19;
var BACKGROUND_COUNT = 4;

var tileset = new Object();
tileset.tile_img = new Array();
tileset.background_img = new Array();

tileset.walkable = new Array();
tileset.background = new Image();
tileset.render_offset = { x: 0, y: 0 };

// notice we skip 0 which means "no tile"
for (i = 1; i <= TILE_COUNT; i++) {
    tileset.tile_img[i] = new Image();
}

for (i = 0; i < BACKGROUND_COUNT; i++) {
    tileset.background_img[i] = new Image();
}

// image loader progress
tileset.load_counter = 0;

//---- Properties ---------------------------------------------------

//---- Tiles --------------------------------------------------------

// Each tile has the same layout on the sprite sheet
// tiles 0-12 also represent position 0-12
tileset.draw_area = [
    { "width": 80, "height": 120, "src_x": 0, "src_y": 0, "dest_x": 0, "dest_y": 0 },
    { "width": 80, "height": 120, "src_x": 80, "src_y": 0, "dest_x": 80, "dest_y": 0 },
    { "width": 80, "height": 120, "src_x": 160, "src_y": 0, "dest_x": 0, "dest_y": 0 },
    { "width": 80, "height": 120, "src_x": 240, "src_y": 0, "dest_x": 80, "dest_y": 0 },
    { "width": 160, "height": 120, "src_x": 320, "src_y": 0, "dest_x": 0, "dest_y": 0 },
    { "width": 80, "height": 120, "src_x": 480, "src_y": 0, "dest_x": 0, "dest_y": 0 },
    { "width": 80, "height": 120, "src_x": 560, "src_y": 0, "dest_x": 80, "dest_y": 0 },
    { "width": 80, "height": 120, "src_x": 0, "src_y": 120, "dest_x": 0, "dest_y": 0 },
    { "width": 80, "height": 120, "src_x": 80, "src_y": 120, "dest_x": 80, "dest_y": 0 },
    { "width": 160, "height": 120, "src_x": 160, "src_y": 120, "dest_x": 0, "dest_y": 0 },
    { "width": 80, "height": 120, "src_x": 320, "src_y": 120, "dest_x": 0, "dest_y": 0 },
    { "width": 80, "height": 120, "src_x": 400, "src_y": 120, "dest_x": 80, "dest_y": 0 },
    { "width": 160, "height": 120, "src_x": 480, "src_y": 120, "dest_x": 0, "dest_y": 0 }
];

//---- Public Functions ---------------------------------------------

const IMG_PATH = {
    BG: "images/backgrounds/",
    TILE: "images/tiles/"
};

// --- Extract Method
function loadImage(img, src) {
    img.src = src;
    img.onload = tileset_onload;
}
--
function tileset_init() {

    // TABLE OF BACKGROUND DEFINITIONS
    const BACKGROUND_DEFS = [
        IMG_PATH.BG + "black.png",
        IMG_PATH.BG + "nightsky.png",
        IMG_PATH.BG + "tempest.png",
        IMG_PATH.BG + "interior.png"
    ];

    // load backgrounds (agora usando helper)
    BACKGROUND_DEFS.forEach((src, index) => {
        loadImage(tileset.background_img[index], src);
    });

    tileset.walkable[0] = false;

    // TABLE OF TILE DEFINITIONS
    const TILE_DEFS = [
        { src: IMG_PATH.TILE + "dungeon_floor.png", walk: true },
        { src: IMG_PATH.TILE + "dungeon_wall.png", walk: false },
        { src: IMG_PATH.TILE + "dungeon_door.png", walk: true },
        { src: IMG_PATH.TILE + "pillar_exterior.png", walk: false },
        { src: IMG_PATH.TILE + "dungeon_ceiling.png", walk: true },
        { src: IMG_PATH.TILE + "grass.png", walk: true },
        { src: IMG_PATH.TILE + "pillar_interior.png", walk: false },
        { src: IMG_PATH.TILE + "chest_interior.png", walk: true },
        { src: IMG_PATH.TILE + "chest_exterior.png", walk: true },
        { src: IMG_PATH.TILE + "medieval_house.png", walk: false },
        { src: IMG_PATH.TILE + "medieval_door.png", walk: true },
        { src: IMG_PATH.TILE + "tree_evergreen.png", walk: false },
        { src: IMG_PATH.TILE + "grave_cross.png", walk: false },
        { src: IMG_PATH.TILE + "grave_stone.png", walk: false },
        { src: IMG_PATH.TILE + "water.png", walk: false },
        { src: IMG_PATH.TILE + "skull_pile.png", walk: false },
        { src: IMG_PATH.TILE + "hay_pile.png", walk: true },
        { src: IMG_PATH.TILE + "locked_door.png", walk: false },
        { src: IMG_PATH.TILE + "death_speaker.png", walk: true }
    ];

    // load tiles
    TILE_DEFS.forEach((tile, i) => {
        const id = i + 1; 
        loadImage(tileset.tile_img[id], tile.src);
        tileset.walkable[id] = tile.walk;
    });
}

function tileset_onload() {
    tileset.load_counter++;
    var percent_loaded = (tileset.load_counter * 100) / (TILE_COUNT + BACKGROUND_COUNT);

    if (percent_loaded == 100) redraw = true;

    // we can get the game moving if at least the tiles are finished loading
    else loadbar_render(percent_loaded);

}

/**
 * Draw the default background for this map
 */
function tileset_background() {
    tileset_background_render(atlas.maps[mazemap.current_id].background);
}

/**
 * Render a specific background
 */
function tileset_background_render(background_id) {
    ctx.drawImage(tileset.background_img[background_id], 0, 0, 160 * SCALE, 120 * SCALE);
}

function tileset_render(tile_id, position) {

    // 0 reserved for completely empty
    if (tile_id == 0) return;

    ctx.drawImage(
        tileset.tile_img[tile_id],
        tileset.draw_area[position].src_x * PRESCALE,
        tileset.draw_area[position].src_y * PRESCALE,
        tileset.draw_area[position].width * PRESCALE,
        tileset.draw_area[position].height * PRESCALE,
        (tileset.draw_area[position].dest_x + tileset.render_offset.x) * SCALE,
        (tileset.draw_area[position].dest_y + tileset.render_offset.y) * SCALE,
        tileset.draw_area[position].width * SCALE,
        tileset.draw_area[position].height * SCALE
    );

}
