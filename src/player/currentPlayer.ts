import {Axis, Mesh, MeshBuilder, Scene, Space, StandardMaterial, Texture, TransformNode, UniversalCamera, Vector3} from "@babylonjs/core";

export class CurrentPlayer{
    // Rendering variables
    public _playerMesh: Mesh;
    public _scene: Scene;
    public _camera: UniversalCamera;

    public _gun: Mesh;


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
        //MeshBuilder.CreateBox("mygun", {}, this._scene);
        //
        // make crosshair
        var aim = Mesh.CreateSphere("aim1", 16, 0.01, this._scene);
        aim.parent = this._camera;
        aim.position.z = 2; 
        aim.isPickable = false;
    }

}
