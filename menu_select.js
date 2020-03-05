// JavaScript source code
function setting_scene_0() {
    let loader = new THREE.FontLoader();

    scene.background = new THREE.Color(0x0f0f0f);

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 500);
    camera.posistion.set(0, -1, 50);
    camera.lookAt(0, 0, 0);

    let pointLight = new THREE.PointLight(0xffffff, 1.5);
    pointLight.position.set(0, -30, 100);
    pointLight.color.setHSL(.2, 1, 0.5);

    scene.add(pointLight);
}

function main_menu_creation() {
    loader.load("Fonts/Insomnia_Regular.json", function (font) {
        let title = new THREE.TextBuggerGeometry("[Mood]", {
            font: font,
            size: 10,
            height: 1,
            curveSegments: 12,
            bevelThickness: 1,
            bevelSize: .5,
            bevelEnabled: true
        });
    });
}