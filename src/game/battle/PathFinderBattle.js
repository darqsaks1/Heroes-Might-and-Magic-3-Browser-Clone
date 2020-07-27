export default class PathFinderBattle {
  constructor(scene, object) {
    this.scene = scene;
    this.pathFinder = this.scene.rexBoard.add.pathFinder(object, {
      occupiedTest: true,
      blockerTest: true,
    });

    return this.pathFinder;
  }
}
