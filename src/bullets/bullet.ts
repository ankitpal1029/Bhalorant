import {Mesh, MeshBuilder, PhysicsImpostor, PointerEventTypes, Scene, UniversalCamera, Vector3} from "@babylonjs/core";

export class Bullet{
    public _bulletDirection: Vector3;
    public _bullet: Mesh;

    constructor(scene: Scene, camera: UniversalCamera){
        console.log("new bullet created");
        this._bullet = MeshBuilder.CreateSphere("bullet", {diameter: 0.1, segments: 32}, scene);
        this._bullet.physicsImpostor = new PhysicsImpostor(this._bullet, PhysicsImpostor.SphereImpostor, { mass: 0, restitution: 0}, scene)
        this._bullet.position.z = camera.position.z ;
        this._bullet.position.y = camera.position.y ;
        this._bullet.position.x = camera.position.x ;

        this._bulletDirection = camera.cameraDirection;
        console.log(this._bulletDirection);


    }

    public _generateBullet(): void{
    }
}
