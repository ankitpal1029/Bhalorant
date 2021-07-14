import {Mesh, MeshBuilder, PhysicsImpostor, Scene} from "@babylonjs/core";

export class EnemyPlayer{
    // Rendering variables
    public _playerMesh: Mesh;
    public _scene: Scene;


    // Player variables
    public _playerId: Number;
    public _playerHealth: Number = 100;

    constructor(scene: Scene, id: Number){
        this._scene = scene;
        this._playerId = id;
        this._createPlayerMesh();

    }

    public _createPlayerMesh(): void{
        this._playerMesh = MeshBuilder.CreateSphere(`enemy${this._playerId}`, {}, this._scene);
        let playerPhysicsImposter = new PhysicsImpostor(
            this._playerMesh,
            PhysicsImpostor.BoxImpostor,
            {
                mass: 1000000,
                friction: 0.1,
                restitution: 1 
            },
            this._scene
        );
        this._playerMesh.checkCollisions = true;
    }

}
