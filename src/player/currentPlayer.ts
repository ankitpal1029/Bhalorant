import {Color3, Mesh, MeshBuilder, Scene, StandardMaterial, Tools, UniversalCamera} from "@babylonjs/core";
import {Bullet} from "../bullets/bullet";

export class CurrentPlayer{
    // Rendering variables
    public _playerMesh: Mesh;
    public _scene: Scene;
    public _camera: UniversalCamera;

    public _gun: Mesh;
    public _aim: Mesh;
    public _bulletList: Bullet[];


    // Player variables
    public _playerHealth: Number = 100;

    constructor(scene: Scene, camera: UniversalCamera){
        this._scene = scene;
        this._camera = camera;
        this._createPlayerMesh();

    }

    public _createPlayerMesh(): void{
        this._playerMesh = MeshBuilder.CreateSphere(`current`, {}, this._scene);
        this._playerMesh.position = this._camera.position;

        // make gun mesh
        var gun = MeshBuilder.CreateBox("mygun", {width: 0.25, height: 0.25, depth: 0.5}, this._scene);
        gun.parent = this._camera;
        gun.position.z = 1.5;
        gun.position.x= 1.0;
        gun.position.y = -0.5;

        gun.rotation.x = Tools.ToRadians(-30);
        gun.rotation.z = Tools.ToRadians(-60);
        gun.isPickable = false;

        // make crosshair
        this._aim = Mesh.CreateSphere("aim1",32, 0.01, this._scene);
        this._aim.parent = this._camera;
        this._aim.position.z = 1.25; 
        this._aim.isPickable = false;

        var aimMaterial = new StandardMaterial("aimMaterial", this._scene);
        aimMaterial.diffuseColor = Color3.Black();
        this._aim.material = aimMaterial;


        this._scene.onPointerDown = this.pointerCallback;
    }

    public pointerCallback = (event: any, pickResult: any) => {
        console.log("clicked");
        new Bullet(this._scene, this._camera);
    }

}
