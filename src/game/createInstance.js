import makeObservable from "../utils/makeObservable";

function createGameInstance(onGameCreatedHook) {
  const instance = makeObservable({
    value: {},
  });

  instance.observe((key, value) => {
    if (key === "value") {
      onGameCreatedHook(value);
    }
  });

  return instance;
}

export default createGameInstance;
