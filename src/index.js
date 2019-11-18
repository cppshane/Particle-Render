var THREE = require('three');
var OrbitControls = require('three-orbitcontrols');

// Particle Sprite
var particleSprite = "data:image/png;base64,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";

// Vertex Shader
var vertexShaderString = 
"attribute float size;" +
"attribute vec3 customColor;" +
"varying vec3 vColor;" +
"varying float brightness;" +
"void main() {" +
"    vColor = customColor;" +
"    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);" +
"    brightness = max(1.0, -mvPosition.z / 600.0);" +
"    gl_PointSize = size * ( 300.0 / -mvPosition.z );" +
"    gl_Position = projectionMatrix * mvPosition;" + 
"}";

// Fragment Shader
var fragmentShaderString = 
"uniform vec3 color;" +
"uniform sampler2D pointTexture;" +
"varying vec3 vColor;" +
"varying float brightness;" +
"void main() {" +
"    gl_FragColor = vec4(color * vColor, 1.0);" +
"    gl_FragColor = gl_FragColor * texture2D(pointTexture, gl_PointCoord) * (3.0 * brightness);" +
"}";

// Canvas
var canvas;

// Camera
var camera;
var fieldOfView;
var nearPlane;
var farPlane;
var initialX;
var initialY;
var initialZ;

// Rendering
var scene;
var renderer;
var pixelRatio;
var renderHeight;
var renderWidth;

var physicsStop;

// Geometries
var geometry;
var particles;

// Materials
var material;

// Controls
var controls;

// Particle position data
var particlePositions;

// Particle size data
var particleSizes;

// Particle color data
var particleColors;

// Timestep function
var timestepFunction;

// Previously iterated time
var previousTime;

// BufferGeometry positions
var bufferPositions;

// BufferGeometry sizes
var bufferSizes;

// BufferGeometry colors
var bufferColors;

// Simulation background color
var backgroundColor;

// Animation frame
var animationFrame;

// Internal Functionality
function init() {
    var i;

    physicsStop = false;

    // Initialize camera
    camera = new THREE.PerspectiveCamera(window.fieldOfView, window.aspectRatio, window.nearPlane, window.farPlane);
    
    if (typeof window.initialX !== 'undefined') {
        camera.position.x = window.initialX;
    }

    if (typeof window.initialY !== 'undefined') {
        camera.position.y = window.initialY;
    }

    if (typeof window.initialZ !== 'undefined') {
        camera.position.z = window.initialZ;
    }

    // Initialize scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(window.backgroundColor);

    // Determine real initial time
    previousTime = Date.now() * 0.001;

    // Set initial positions
    particlePositions = window.timestepFunction(0);

    bufferPositions = new Float32Array(particlePositions.length * 3);
    bufferColors = new Float32Array(particlePositions.length * 3);
    bufferSizes = new Float32Array(particlePositions.length);

    for (i = 0; i < particlePositions.length; i++) {
        var x = particlePositions[i][0];
        var y = particlePositions[i][1];
        var z = particlePositions[i][2];

        bufferPositions[i * 3] = x;
        bufferPositions[i * 3 + 1] = y;
        bufferPositions[i * 3 + 2] = z;

        var color = new THREE.Color(window.particleColors[i]);
        color.toArray(bufferColors, i * 3);

        bufferSizes[i] = window.particleSizes[i];
    }

    geometry = new THREE.BufferGeometry();

    geometry.setAttribute( 'position', new THREE.BufferAttribute( bufferPositions, 3 ) );
    geometry.setAttribute( 'customColor', new THREE.BufferAttribute( bufferColors, 3 ) );
    geometry.setAttribute( 'size', new THREE.BufferAttribute( bufferSizes, 1 ) );

    material = new THREE.ShaderMaterial({
        uniforms: {
            color: { value: new THREE.Color( 0xffffff ) },
            pointTexture: { value: new THREE.TextureLoader().load(particleSprite) }
        },
        vertexShader: vertexShaderString,
        fragmentShader: fragmentShaderString,
        transparent: true,
        depthTest: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending
    });

    particles = new THREE.Points(geometry, material);
    particles.sortParticles = true;

    scene.add(particles);

    renderer = new THREE.WebGLRenderer( { canvas: window.canvas } );
    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(window.renderWidth, window.renderHeight);
    renderer.setClearColor(window.backgroundColor, 1);

    controls = new THREE.OrbitControls(camera, renderer.domElement);
}

function updateCanvasSize() {
    if (typeof camera !== 'undefined') {
        camera.aspect = window.renderWidth / window.renderHeight;
        camera.updateProjectionMatrix();
    }

    if (typeof renderer !== 'undefined') {
        renderer.setSize(window.renderWidth, window.renderHeight);
    }
}

function animate() {
    animationFrame = requestAnimationFrame(animate);
    render();
}

function render() {
    camera.lookAt(scene.position);

    if (physicsStop == false) {
        var i;
        var time = Date.now() * 0.001;

        particlePositions = window.timestepFunction(time - previousTime);

        for (i = 0; i < particlePositions.length; i++) {
            geometry.attributes.position.array[i * 3] = particlePositions[i][0];
            geometry.attributes.position.array[i * 3 + 1] = particlePositions[i][1];
            geometry.attributes.position.array[i * 3 + 2] = particlePositions[i][2];
        }

        geometry.attributes.position.needsUpdate = true;
        geometry.attributes.size.needsUpdate = true;

        previousTime = time;
    }

    renderer.render(scene, camera);
}

// API Mutators
export function SetCanvas(canvas) {
    window.canvas = canvas;
}

export function SetFieldOfView(fieldOfView) {
    window.fieldOfView = fieldOfView;
}

export function SetNearPlane(nearPlane) {
    window.nearPlane = nearPlane;
}

export function SetFarPlane(farPlane) {
    window.farPlane = farPlane;
}

export function SetPixelRatio(pixelRatio) {
    window.pixelRatio = pixelRatio;
}

export function SetHeight(height) {
    window.renderHeight = height;

    updateCanvasSize();
}

export function SetWidth(width) {
    window.renderWidth = width;

    updateCanvasSize();
}

export function SetCameraInitialX(initialX) {
    window.initialX = initialX;
}

export function SetCameraInitialY(initialY) {
    window.initialY = initialY;
}

export function SetCameraInitialZ(initialZ) {
    window.initialZ = initialZ;
}

export function SetTimestepFunction(timestepFunction) {
    window.timestepFunction = function(dt) { return timestepFunction(dt) };
}

export function SetBackgroundColor(backgroundColor) {
    window.backgroundColor = backgroundColor;
}

export function SetParticleSizes(particleSizes) {
    window.particleSizes = particleSizes;
}

export function SetParticleColors(particleColors) {
    window.particleColors = particleColors;
}

export function Start() {
    init();
    animate();
}

export function Reinitialize() {
    init();
}

export function StopPhysics() {
    physicsStop = true;
}

export function StartPhysics() {
    previousTime = Date.now() * 0.001;
    physicsStop = false;
}