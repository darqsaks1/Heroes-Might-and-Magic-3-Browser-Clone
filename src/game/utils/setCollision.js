const setCollision = (scene, collider, player, callback) => {
  scene.physics.add.collider(collider, player, () => callback(collider));
};

const setCollisionWithArg = (scene, collider, player, callback, arg) => {
  scene.physics.add.collider(collider, player, () => callback(arg, collider));
};
export { setCollision, setCollisionWithArg };
