import { GameService } from "../services/GameService";
import {
  CONFIG,
  SpriteTypes,
  FOG_OF_WAR_CONFIG,
} from "../constants/configuration";

export class FogWar {
  constructor(scene) {
    this.scene = scene; // Scene.
    this.rt; // Render Texture
    this.noVisionRt;
    this.gameService = new GameService(scene); // Game Service.
    this.delay = 0; // delay to call the update.
    this.team = this.scene.team; // Team to update the Texture.
    this.maskImg = this.scene.add.image(0, 0, "mask");
    this.maskImg.visible = false;
  }

  createFogTwo(map) {
    map.alpha = 0.8;
  }

  createFog() {
    const { width } = this.scene.scale;
    const { height } = this.scene.scale;

    // make a RenderTexture that is the size of the screen
    this.rt = this.scene.make.renderTexture(
      {
        x: 0,
        y: 0,
        width: this.scene.collision.width,
        height: this.scene.collision.height,
      },
      true
    );
    // make a RenderTexture that is the size of the screen
    // This RT is the One that Blocks the User Vision.
    this.noVisionRT = this.scene.make.renderTexture(
      {
        x: 0,
        y: 0,
        width: this.scene.collision.width,
        height: this.scene.collision.height,
      },
      true
    );

    // fill it with black
    this.rt.fill(0x000000, FOG_OF_WAR_CONFIG.overlay);
    this.noVisionRT.fill(0x000000, 1);

    // draw the floorLayer into it
    // this.rt.draw(this.shadow);

    // set a dark blue tint
    this.rt.setTint(0x0a2948);
    this.noVisionRT.setTint(0x0a2948);

    this.rt.depth = 999999;
    this.noVisionRT.depth = 999999;
  }

  updateFog(time) {
    this.UIScene = this.scene.scene.get("UIScene");
    // Updates the View position of the MiniMap
    if (this.UIScene) this.UIScene.updateCameraViewMiniMapPosition();
    if (this.delay < time) {
      this.delay = time + 350;
      const allyUnits = this.gameService.getAllyUnits();
      const enemyUnits = this.gameService.getEnemyUnits();
      // console.log(allyUnits);

      this.redraw(); // Recreates the Fog.

      if (this.UIScene.miniMapFog) this.UIScene.redrawMiniMapFog(); // Recreates the Fog of the MiniMap.

      // Canges the Vision of the Enemy Units to NOT Visible.
      if (enemyUnits)
        enemyUnits.forEach((unit) => {
          if (
            unit.team != this.team &&
            unit.team != 0 &&
            unit.spriteType != SpriteTypes.BUILDING
          ) {
            unit.visible = false;
            // unit.setSelection(false);
            if (this.UIScene.miniMapFog) {
              unit.updateDot(false);
            }
          }
        });
      // Clears outline of all units before adding it again.
      this.scene.outlineEffect.clear();
      if (allyUnits)
        allyUnits.forEach((unit) => {
          // If it's a Unit or a Building that is not Constructing;
          if (
            (unit.spriteType == SpriteTypes.UNIT && unit.team == this.team) ||
            (unit.spriteType == SpriteTypes.BUILDING && !unit.isConstructing)
          ) {
            let scale;
            if (unit.status.fog_range < this.maskImg.width) {
              scale = this.maskImg.width / unit.status.fog_range;
            } else {
              scale = unit.status.fog_range / this.maskImg.width;
            }
            this.maskImg.setScale(scale);
            const count = 5;
            // The more it erases, the more it gets a clear vision.
            // This is because of the Brush we are using.
            for (let times = 0; times < count; times++) {
              this.rt.erase(this.maskImg, unit.container.x, unit.container.y);
              this.noVisionRT.erase(
                this.maskImg,
                unit.container.x,
                unit.container.y
              );
            }
            if (this.UIScene.miniMapFog) {
              this.UIScene.miniMapFog.erase(
                this.maskImg,
                unit.container.x,
                unit.container.y
              );
              this.UIScene.miniMapBlockingFog.erase(
                this.maskImg,
                unit.container.x,
                unit.container.y
              );
            }
            const enemiesInRange = this.scene.physics.overlapCirc(
              unit.container.x,
              unit.container.y,
              unit.circlePerceptionRange.radius
            );

            for (let i = 0; i < enemiesInRange.length; i++) {
              const rangeUnit = enemiesInRange[i].gameObject;
              if (
                rangeUnit.type == "Container" &&
                rangeUnit.list[1] &&
                this.team &&
                rangeUnit.list[1].team != this.team
              ) {
                rangeUnit.list[1].visible = true;
                if (this.UIScene.miniMapFog && rangeUnit.list[1].id)
                  rangeUnit.list[1].updateDot(true);
                // Hiddes units out of the Sight of the given Unit.
                // Keeps Resources visible.
              }

              if (unit.spriteType == SpriteTypes.UNIT) {
                this.scene.physics.overlap(
                  rangeUnit,
                  unit.container,
                  (overlapObject, unit) => {
                    if (
                      overlapObject.list &&
                      overlapObject.list[1].spriteType ==
                        SpriteTypes.BUILDING &&
                      overlapObject.type == "Container" &&
                      unit.depth < overlapObject.depth
                    ) {
                      this.scene.outlineEffect.applyEffect(unit);
                    }
                  }
                );
              }
            }
          }
        });
    }
  }

  redraw() {
    this.rt.clear();
    // fill it with black
    this.rt.fill(0x000000, FOG_OF_WAR_CONFIG.overlay);

    // set a dark blue tint
    this.rt.setTint(0x0a2948);
  }
}
