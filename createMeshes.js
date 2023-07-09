import * as THREE from 'three';

// Constants
const EARTH_RADIUS = 1.0;
const MERCURY_RADIUS = 0.38;
const VENUS_RADIUS = 0.95;
const MARS_RADIUS = 0.53;
const JUPITER_RADIUS = 11.2;
const SATURN_RADIUS = 9.45;
const URANUS_RADIUS = 4.0;
const NEPTUNE_RADIUS = 3.88;
const SUN_RADIUS = 15.0;

const MERCURY_POSITION = 23;
const VENUS_POSITION = 1.2 * MERCURY_POSITION;
const EARTH_POSITION = 1.2 * VENUS_POSITION;
const MARS_POSITION = 1.2 * EARTH_POSITION;
const JUPITER_POSITION = 1.4 * MARS_POSITION;
const SATURN_POSITION = 1.7 * JUPITER_POSITION;
const URANUS_POSITION = 1.3 * SATURN_POSITION;
const NEPTUNE_POSITION = 1.1 * URANUS_POSITION;

const textureLoader = new THREE.TextureLoader();

export function createMeshes(scene) {
    // Sun
    textureLoader.load('./Assets/Textures/Planets/2k_sun.jpg', (texture) => {
        createSun(texture, scene)
    });

    // Mercury
    textureLoader.load('./Assets/Textures/Planets/2k_mercury.jpg', (texture) => {
        createMercury(texture, scene)
    });

    // Venus
    textureLoader.load('./Assets/Textures/Planets/Venus/2k_venus_surface.jpg', (texture) => {
        createVenus(texture, scene)
    });

    // Earth
    textureLoader.load('./Assets/Textures/Planets/Earth/2k_earth_daymap.jpg', (texture) => {
        createEarth(texture, scene)
    });

    // Mars
    textureLoader.load('./Assets/Textures/Planets/2k_mars.jpg', (texture) => {
        createMars(texture, scene)
    });

    // Jupiter
    textureLoader.load('./Assets/Textures/Planets/2k_jupiter.jpg', (texture) => {
        createJupiter(texture, scene)
    });

    // Saturn
    textureLoader.load('./Assets/Textures/Planets/2k_saturn.jpg', (texture) => {
        createSaturn(texture, scene)
    });

    // Uranus
    textureLoader.load('./Assets/Textures/Planets/2k_uranus.jpg', (texture) => {
        createUranus(texture, scene)
    });

    // Neptune
    textureLoader.load('./Assets/Textures/Planets/2k_neptune.jpg', (texture) => {
        createNeptune(texture, scene)
    });
}

// Sun Mesh
function createSun(texture, scene) {
    const sunMesh = new THREE.Mesh(new THREE.SphereGeometry(SUN_RADIUS, 20, 20),
        //new THREE.MeshBasicMaterial({ color: 0xffff00, wireframe: true }));
        new THREE.MeshPhongMaterial({ map: texture, emissive: 0x7E5C09 }));

    var sAxis = new THREE.AxesHelper(4.8);
    sunMesh.add(sAxis);
    sunMesh.name = "Sun";
    scene.add(sunMesh);

    // Super simple glow effect using sprite
    textureLoader.load('./Assets/glow.png', (texture) => {
        var spriteMaterial = new THREE.SpriteMaterial(
            {
                map: texture,
                color: 0xFDB813,
                transparent: true,
                blending: THREE.AdditiveBlending
            });
        var glowSprite = new THREE.Sprite(spriteMaterial);
        glowSprite.scale.set(70, 70, 1);
        sunMesh.add(glowSprite); // this centers the glow at the mesh
    })
}

// Mercury Mesh
function createMercury(texture, scene) {
    const mercuryMesh = new THREE.Mesh(new THREE.SphereGeometry(MERCURY_RADIUS, 20, 20),
        new THREE.MeshPhongMaterial({ map: texture }));

    mercuryMesh.name = "Mercury";
    mercuryMesh.position.set(MERCURY_POSITION, 0, 0);
    scene.add(mercuryMesh)
}

// Venus Mesh
function createVenus(texture, scene) {
    const venusMesh = new THREE.Mesh(new THREE.SphereGeometry(VENUS_RADIUS, 20, 20),
        new THREE.MeshPhongMaterial({ map: texture }));

    venusMesh.name = "Venus";
    venusMesh.position.set(VENUS_POSITION, 0, 0);
    scene.add(venusMesh)
}

// Earth Mesh
function createEarth(texture, scene) {
    const earthMesh = new THREE.Mesh(new THREE.SphereGeometry(EARTH_RADIUS, 20, 20),
        new THREE.MeshPhongMaterial({ map: texture }));

    earthMesh.name = "Earth";
    earthMesh.position.set(EARTH_POSITION, 0, 0);
    scene.add(earthMesh)

    // adding clouds
    textureLoader.load("./Assets/Textures/Planets/Earth/2k_earth_clouds.jpg", (texture) => {
        const cloudsMaterial = new THREE.MeshPhongMaterial({
            map: texture,
            transparent: true,
            opacity: 0.5
        });

        const cloudsMesh = new THREE.Mesh(new THREE.SphereGeometry(EARTH_RADIUS + 0.01, 20, 20), cloudsMaterial);
        cloudsMesh.name = "Clouds";
        earthMesh.add(cloudsMesh);
    });
}

// Mars Mesh
function createMars(texture, scene) {
    const marsMesh = new THREE.Mesh(new THREE.SphereGeometry(MARS_RADIUS, 20, 20),
        new THREE.MeshPhongMaterial({ map: texture }));

    marsMesh.name = "Mars";
    marsMesh.position.set(MARS_POSITION, 0, 0);
    scene.add(marsMesh)
}

// Jupiter Mesh
function createJupiter(texture, scene) {
    const jupiterMesh = new THREE.Mesh(new THREE.SphereGeometry(JUPITER_RADIUS, 20, 20),
        new THREE.MeshPhongMaterial({ map: texture }));

    jupiterMesh.name = "Jupiter";
    jupiterMesh.position.set(JUPITER_POSITION, 0, 0);
    scene.add(jupiterMesh)
}

// Saturn Mesh
function createSaturn(texture, scene) {
    const saturnMesh = new THREE.Mesh(new THREE.SphereGeometry(SATURN_RADIUS, 20, 20),
        new THREE.MeshPhongMaterial({ map: texture }));

    saturnMesh.name = "Saturn";
    saturnMesh.position.set(SATURN_POSITION, 0, 0);
    scene.add(saturnMesh)

    // adding rings
    textureLoader.load("./Assets/Textures/Planets/2k_saturn_ring_alpha.png", (texture) => {
        const ringsMaterial = new THREE.MeshPhongMaterial({
            map: texture,
            transparent: true,
            side: THREE.DoubleSide
        });

        // mapping uv coordinates so the inner radius is (0, 1) and the outer radius is (1, 1)
        const inner_radius = 12;
        const ringsGeom = new THREE.RingGeometry(inner_radius, 20, 60);
        var pos = ringsGeom.attributes.position; // get the position buffer with the coordinate of each vertex on the ring frame
        var v3 = new THREE.Vector3();
        for (let i = 0; i < pos.count; i++) { // iterate over all the vertices
            v3.fromBufferAttribute(pos, i); // assingning v3 the position of the i-th vertex
            ringsGeom.attributes.uv.setXY(i, v3.length() < inner_radius + 1 ? 0 : 1, 1); // mapping the u position to 0 for the first vertices and 1 for the last ones
        }

        var rings = new THREE.Mesh(ringsGeom, ringsMaterial);
        rings.name = "rings";
        rings.visible = true;
        rings.rotateX(Math.PI / 2.0);
        saturnMesh.add(rings);
        
    });
}

// Uranus Mesh
function createUranus(texture, scene) {
    const uranusMesh = new THREE.Mesh(new THREE.SphereGeometry(URANUS_RADIUS, 20, 20),
        new THREE.MeshPhongMaterial({ map: texture }));

    uranusMesh.name = "Uranus";
    uranusMesh.position.set(URANUS_POSITION, 0, 0);
    scene.add(uranusMesh)
}

// Neptune Mesh
function createNeptune(texture, scene) {
    const neptuneMesh = new THREE.Mesh(new THREE.SphereGeometry(NEPTUNE_RADIUS, 20, 20),
        new THREE.MeshPhongMaterial({ map: texture }));

    neptuneMesh.name = "Neptune";
    neptuneMesh.position.set(NEPTUNE_POSITION, 0, 0);
    scene.add(neptuneMesh)
}