import {DefaultLoadingScreen, Engine} from "@babylonjs/core";

export const showLoadingScreen = (canvas: HTMLCanvasElement, engine: Engine) => {
    let defaultLoadingScreen = new DefaultLoadingScreen(canvas, "Please Wait...","black");

    engine.loadingScreen = defaultLoadingScreen;
    engine.displayLoadingUI();
}

export const hideLoadingScreen = (engine: Engine) => {
    engine.hideLoadingUI();
}
