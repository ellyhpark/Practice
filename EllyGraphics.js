import * as THREE from "../node_modules/three/build/three.module.js";

class EllyGraphics {

	constructor(options={}) {
		this.width = options.width || window.innerWidth;
		this.height = options.height || window.innerHeight;

		this.dom = options.dom;
		if (!this.dom) {
			this.dom = document.createElement('div');
			document.body.appendChild(this.dom);
		}
		// this.scene = new THREE.Scene();
	}

	init() {
		this.scene = new THREE.Scene();

		this.camera = new THREE.PerspectiveCamera(60, this.width/this.height, 0.1, 1000);
		this.camera.position.z = 50;

		this.createBackground();
		this.createLights();

		this.renderer = new THREE.WebGLRenderer();
		this.renderer.setSize(this.width, this.height);
		this.dom.appendChild(this.renderer.domElement);

		window.addEventListener('resize', () => {this.onResize()}, false);
		this.dom.addEventListener('mousemove', (e) => {this.onMouseMove(e)}, false);
		this.dom.addEventListener('mousedown', (e) => {this.onMouseDown(e)}, false);

		return this;
	}

	createBackground() {
		const color = new THREE.Color(0x87ceeb);
		this.scene.background = color;
	}

	createLights() {
		// const light = new THREE.DirectionalLight(0xffffff, 1);
		const light = new THREE.SpotLight(0xffffff,100,1000,Math.PI/2,0,0);
		light.position.set(0, 500, 0);
		this.scene.add(light);

		const ambientLight = new THREE.AmbientLight();
		this.scene.add(ambientLight);
	}

	animate() {
		const scope = this;
		this.renderer.setAnimationLoop((time) => {
			scope.update(time);
			scope.render();
		});
	}

	update(time) {
		const children = this.scene.children;
		for (let i = 0; i<children.length; i++) {
			if (children[i].isMesh) {
				children[i].rotation.x = time/2000;
				children[i].rotation.y = time/1000;
			}
		}
	}

	render() {
		this.renderer.render(this.scene, this.camera);
	}

	onResize() {
		this.width = window.innerWidth;
		this.height = window.innerHeight;
		this.camera.aspect = this.width/this.height;
		this.camera.updateProjectionMatrix();
		this.renderer.setSize(this.width, this.height);
	}

	onMouseMove(event) {

	}

	onMouseDown(event) {
		console.log('onMouseDown called')
	}

	add(param) {
		if (param.type === 'box') {
			const geometry = new THREE.BoxGeometry(...param.size);
			const material = new THREE.MeshStandardMaterial({
				color: param.color
			});
			const mesh = new THREE.Mesh(geometry, material);
			mesh.position.set(...param.position);
			this.scene.add(mesh);
		}
		else {
			console.log('111');
			console.log('222');
		}
	}
}

export { EllyGraphics };
