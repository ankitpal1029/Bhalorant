import { Engine, HemisphericLight, Mesh, MeshBuilder, UniversalCamera, Vector3 } from "@babylonjs/core";
import {Scene} from "@babylonjs/core/scene";
import {hideLoadingScreen, showLoadingScreen} from "./loadingScreen";

class App {
    public _canvas: HTMLCanvasElement;
    public _engine: Engine;
    public _scene: Scene;


    constructor(){
        console.log("hello");
        window.addEventListener("DOMContentLoaded",() =>{this._startGame();} );
    }

    public _startGame(): void{
        this._createCanvas();

        // initialize babylon scene and engine
        this._engine = new Engine(this._canvas, true);
        this._createGameScene();

        showLoadingScreen(this._canvas, this._engine);

        let sphere: Mesh = MeshBuilder.CreateSphere("sphere", {}, this._scene);

        let scene = this._scene;
        scene.afterRender = () => {hideLoadingScreen(this._engine)} ;
        this._engine.runRenderLoop(function(){
            scene.render();
        });
    }

     public _createCanvas(): HTMLCanvasElement {

        //Commented out for development
        document.documentElement.style["overflow"] = "hidden";
        document.documentElement.style.overflow = "hidden";
        document.documentElement.style.width = "100%";
        document.documentElement.style.height = "100%";
        document.documentElement.style.margin = "0";
        document.documentElement.style.padding = "0";
        document.body.style.overflow = "hidden";
        document.body.style.width = "100%";
        document.body.style.height = "100%";
        document.body.style.margin = "0";
        document.body.style.padding = "0";

        //create the canvas html element and attach it to the webpage
        this._canvas = document.createElement("canvas");
        this._canvas.style.width = "100%";
        this._canvas.style.height = "100%";
        this._canvas.id = "gameCanvas";
        document.body.appendChild(this._canvas);

        return this._canvas;
    }

    public _createGameScene(): void{
        this._scene = new Scene(this._engine);

        let camera = new UniversalCamera("Camera", new Vector3(2,2,2), this._scene);
        camera.attachControl(this._canvas, true);
        camera.setTarget(Vector3.Zero());

        camera.keysUp.push(87);
        camera.keysDown.push(83);
        camera.keysLeft.push(65);
        camera.keysRight.push(68);

        camera.speed = 1.5;
        camera.fov = 0.8;
        camera.inertia = 0;


        let light = new HemisphericLight("gamelight", new Vector3(1,1,0), this._scene);
    }
}
new App();

