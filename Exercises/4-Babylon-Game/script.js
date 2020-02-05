let canvas = document.getElementById("babylonCanvas"); // Get the canvas element
let engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

let createScene = function () {
    let scene = new BABYLON.Scene(engine); //takes engine into scene


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
