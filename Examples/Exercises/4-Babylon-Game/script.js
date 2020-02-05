let canvas = document.getElementById("babylonCanvas"); // Get the canvas element
let engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine
let hitCounter = 0;

let createScene = function () {
    let scene = new BABYLON.Scene(engine); //takes engine into scene

    scene.gravity = new BABYLON.Vector3(0, -9.81, 0);  //adds gravity to scene
    scene.clearColor = new BABYLON.Color3(0.3, 0.5, 0.3); //sets background color
    scene.collisionsEnabled = true;  //turn on collisions

    scene.ambientColor = new BABYLON.Color3(0.3, 0.3, 0.3);
    scene.fogMode = BABYLON.Scene.FOGMODE_EXP;
    scene.fogDensity = 0.01;



    let camera = new BABYLON.FreeCamera("FreeCamera", new BABYLON.Vector3(0, -8, -20), scene);
    camera.attachControl(canvas, true);
    camera.applyGravity = true;
    camera.ellipsoid = new BABYLON.Vector3(1, 1, 1);
    camera.checkCollisions = true;

    // Add lights to the scene
    let light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);
    let light2 = new BABYLON.PointLight("light2", new BABYLON.Vector3(0, 1, -1), scene);
    let light3 = new BABYLON.PointLight("light3", new BABYLON.Vector3(-1, 1, 0), scene);
    let light4 = new BABYLON.PointLight("light4", new BABYLON.Vector3(0, 0, 0), scene);
    let light5 = new BABYLON.PointLight("light5", new BABYLON.Vector3(-1, 1, -1), scene);

    //Ground
    let ground = BABYLON.Mesh.CreatePlane("ground", 50.0, scene);
  //  ground.material = new BABYLON.StandardMaterial("groundMat", scene);
    var pbr = new BABYLON.PBRMetallicRoughnessMaterial("pbr", scene);
    pbr.baseColor = new BABYLON.Color3(1.000, 0.766, 0.336);
    pbr.metallic = 1.0;
    pbr.roughness = 0;
    ground.material = pbr;

    ground.material.diffuseColor = new BABYLON.Color3(1, 0, 0.3);
    ground.material.backFaceCulling = false;
    ground.position = new BABYLON.Vector3(5, -10, -15);
    ground.rotation = new BABYLON.Vector3(Math.PI / 2, 0, 0);
    ground.checkCollisions = true;


    let bluePlane = BABYLON.Mesh.CreatePlane("blue", 10, scene);
    let blueMat = new BABYLON.StandardMaterial("ground", scene);
    blueMat.diffuseColor = new BABYLON.Color3(0.4, 0.4, 0.4);
    blueMat.specularColor = new BABYLON.Color3(0.4, 0.4, 0.4);
    blueMat.emissiveColor = BABYLON.Color3.Blue();
    bluePlane.material = blueMat;
    bluePlane.position.x = 3;
    bluePlane.position.z = 20;
    bluePlane.position.y = -8;
    bluePlane.checkCollisions = true;

    //make crosshair
    let advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
    let crosshair = new BABYLON.GUI.Rectangle();
    crosshair.width = "7px";
    crosshair.height = "7px";
    crosshair.cornerRadius = 20;
    crosshair.color = "black";
    crosshair.thickness = 1;
    crosshair.background = "white";
    advancedTexture.addControl(crosshair);

    //counter of hits

    let text1 = new BABYLON.GUI.TextBlock();
    text1.text = "Hits: "+hitCounter;
    text1.color = "white";
    text1.fontSize = 24;
    text1.textHorizontalAlignment = 1;
    advancedTexture.addControl(text1);


    window.addEventListener("click", function (e) {
        var bullet = BABYLON.Mesh.CreateSphere('bullet', 3, 0.3, scene);
        var startPos = camera.position;

        bullet.position = new BABYLON.Vector3(startPos.x, startPos.y, startPos.z);
        bullet.material =  new BABYLON.StandardMaterial('texture1', scene);
        bullet.material.diffuseColor = new BABYLON.Color3(0.2, 0.2, 0.2);
        bullet.checkCollisions = true;
        bullet.applyGravity = true;

        var invView = new BABYLON.Matrix();
        camera.getViewMatrix().invertToRef(invView);
        var direction = BABYLON.Vector3.TransformNormal(new BABYLON.Vector3(0, 0, 1), invView);

        direction.normalize();

        scene.registerBeforeRender(function () {
            bullet.position.addInPlace(direction);

          if (bullet.intersectsMesh(bluePlane)) {
                    console.log(hitCounter);
                    hitCounter++;
                    console.log('boom')
                   text1.text = "Hits: "+hitCounter;

            }


        });
    });
    scene.registerBeforeRender(function(){

        if(camera.position.y < -200) {
            camera.position.set(0, 0, -20)
        }
        bluePlane.position.x += 0.01;
    });

    return scene;
};

let scene = createScene();

engine.runRenderLoop(function () {


    scene.render();
});

// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
    engine.resize();
});
