// Canvas setup
const threejsCanvas = document.querySelector('#threejs-canvas')
let width = threejsCanvas.offsetWidth
let height = threejsCanvas.offsetHeight

//scene and camera setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

camera.position.set(10, 10, 10);
camera.lookAt(0, 0, 0);

//renderer setup
const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
})

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
threejsCanvas.appendChild(renderer.domElement);


function addStar() {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const star = new THREE.Mesh(geometry, material);
  
    const [x, y, z] = Array(3)
      .fill()
      .map(() => THREE.MathUtils.randFloatSpread(100));
  
    star.position.set(x, y, z);
    scene.add(star);
  }
  
  Array(200).fill().forEach(addStar);
  
  // Background
  
  const spaceTexture = new THREE.TextureLoader().load('space.jpg');
  scene.background = spaceTexture;
  
  // Avatar
  
  const jeffTexture = new THREE.TextureLoader().load('jeff.png');
  
  const jeff = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: jeffTexture }));
  
  scene.add(jeff);
  
  // Moon
  
  const moonTexture = new THREE.TextureLoader().load('moon.jpg');
  const normalTexture = new THREE.TextureLoader().load('normal.jpg');
  
  const moon = new THREE.Mesh(
    new THREE.SphereGeometry(3, 32, 32),
    new THREE.MeshStandardMaterial({
      map: moonTexture,
      normalMap: normalTexture,
    })
  );
  
  scene.add(moon);
  
  moon.position.z = 30;
  moon.position.setX(-10);
  
  jeff.position.z = -5;
  jeff.position.x = 2;
  
  // Scroll Animation
  
  function moveCamera() {
    const t = document.body.getBoundingClientRect().top;
    moon.rotation.x += 0.05;
    moon.rotation.y += 0.075;
    moon.rotation.z += 0.05;
  
    jeff.rotation.y += 0.01;
    jeff.rotation.z += 0.01;
  
    camera.position.z = t * -0.01;
    camera.position.x = t * -0.0002;
    camera.rotation.y = t * -0.0002;
  }
  
  document.body.onscroll = moveCamera;
  moveCamera();
  
  // Animation Loop
  
  function animate() {
    requestAnimationFrame(animate);
  
    torus.rotation.x += 0.01;
    torus.rotation.y += 0.005;
    torus.rotation.z += 0.01;
  
    moon.rotation.x += 0.005;
  
    // controls.update();
  
    renderer.render(scene, camera);
  }
  
  animate();




//update
update()


//resize check
window.addEventListener('resize', onResize)

function update() {
    box.rotation.x += 0.005
    box.rotation.y += 0.01
    box.rotation.z += 0.01

    renderer.render(scene, camera)
    window.requestAnimationFrame(update)
}


function onResize() {
    width = threejsCanvas.offsetWidth
    height = threejsCanvas.offsetHeight

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    camera.aspect = width / height
    camera.updateProjectionMatrix()
}