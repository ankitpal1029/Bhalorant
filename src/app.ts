import { Axis, 
    CannonJSPlugin,
    Engine, 
    HemisphericLight, 
    Mesh, 
    MeshBuilder, 
    PhysicsImpostor, 
    Space, 
    UniversalCamera, 
    Vector3 } from "@babylonjs/core";
import { Scene } from "@babylonjs/core/scene";
import { hideLoadingScreen, showLoadingScreen } from "./loadingScreen";
import { CurrentPlayer } from "./player/currentPlayer";
import { EnemyPlayer } from "./player/enemyPlayer";

class App {
    public _canvas: HTMLCanvasElement;
    public _engine: Engine;
    public _scene: Scene;
    public _camera: UniversalCamera;
    public _light: HemisphericLight;

    // Game variables
    public _enemyList: EnemyPlayer[] = [];
    //public _bulletList: 

    //public sphere: Mesh;


    constructor(){
        console.log("hello");
        window.addEventListener("DOMContentLoaded",() =>{this._startGame();} );
    }

    public _startGame(): void{
        this._createCanvas();

        // initialize babylon scene and engine
        this._engine = new Engine(this._canvas, true);
        this._createGameScene();
        this._createPointerLock();

        showLoadingScreen(this._canvas, this._engine);

        // generate Enemies
        this._generateEnemies(1);


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

        this._scene.gravity = new Vector3(0, -.4, 0);
        let physicsPlugin = new CannonJSPlugin();
        this._scene.enablePhysics(this._scene.gravity, physicsPlugin); 

        // Enable collisions
        this._scene.collisionsEnabled = true;

        this._camera = new UniversalCamera("Camera", new Vector3(2,2,2), this._scene);
        this._camera.attachControl(this._canvas, true);
        this._camera.setTarget(Vector3.Zero());

        // setting up key movements
        this._camera.keysUp.push(87);
        this._camera.keysDown.push(83);
        this._camera.keysLeft.push(65);
        this._camera.keysRight.push(68);


        //camera properties
        this._camera.speed = 1.5;
        this._camera.fov = 0.8;
        this._camera.inertia = 0;

        this._camera.ellipsoid = new Vector3(1.5, 0.5, 1.5);
        this._camera.checkCollisions = true;
        this._camera.applyGravity = true;

        // generate current players mesh
        new CurrentPlayer(this._scene, this._camera);


        //plane generation for world
        let plane = MeshBuilder.CreatePlane("ground", {
            height: 20,
            width: 20
        }, this._scene);


        plane.rotate(Axis.X, Math.PI /2, Space.WORLD);
        plane.position.y = -0.75;
        let groundPhysicsImposter = new PhysicsImpostor(
            plane,
            PhysicsImpostor.BoxImpostor,
            {
                mass: 0,
                friction: 0.1, 
                restitution: 1.0
            },
            this._scene 
          );
        //plane.collisionsEnabled = true;
        plane.checkCollisions = true;

        //this._physicsEngine();


        this._light = new HemisphericLight("gamelight", new Vector3(1,1,0), this._scene);
    }

    public _createPointerLock(): void {
        let canvas = this._scene.getEngine().getRenderingCanvas();
        canvas.addEventListener("click", event => {
            canvas.requestPointerLock = canvas.requestPointerLock || 
                canvas.msRequestPointerLock  ||
                canvas.mozRequestPointerLock || 
                canvas.webkitRequestPointerLock;

            if(canvas.requestPointerLock){
                canvas.requestPointerLock();
            };
        }, false);
    }

    public _generateEnemies(enemies: Number): void{
        for(let i = 0; i < enemies; i++){
            let enemy1 = new EnemyPlayer(this._scene, this._enemyList.length || 1);
            this._enemyList.push(enemy1);
        }
    }

}
new App();
