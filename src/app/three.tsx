import { useEffect, useRef } from "react";
import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

export default function Three() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x101828);
    const camera = new THREE.PerspectiveCamera(
      75,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 100;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(
      mount.clientWidth,
      mount.clientHeight
    );
    mount.appendChild(renderer.domElement);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, 0, 100);
    scene.add(light);

    let textMesh: THREE.Mesh;

    const loader = new FontLoader();
    loader.load(
      "https://threejs.org/examples/fonts/helvetiker_regular.typeface.json",
      (font) => {
        const textGeometry = new TextGeometry("Mehmet Serhat Aslan", {
          font: font,
          size: 10,
          curveSegments: 12,
          depth: 5,
          bevelEnabled: true,
          bevelThickness: 0.5,
          bevelSize: 0.3,
          bevelOffset: 0,
          bevelSegments: 5,
        });

        const textMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
        textMesh = new THREE.Mesh(textGeometry, textMaterial);

        textGeometry.computeBoundingBox();
        if(!textGeometry.boundingBox) return;
        const centerOffset =
          -0.5 *
          (textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x);
        textMesh.position.x = centerOffset;
        textMesh.position.y = 0;
        textMesh.position.z = 0;

        scene.add(textMesh);

        const animate = () => {
          requestAnimationFrame(animate);
          textMesh.rotateX(0.01);
          renderer.render(scene, camera);
        };

        animate();
      }
    );

    const handleResize = () => {
      if (!mount) return;
      renderer.setSize(
        mount.clientWidth,
        mount.clientHeight
      );
      camera.aspect =
        mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (
        mount &&
        renderer.domElement.parentNode === mount
      ) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="w-full h-50 overflow-hidden" />;
}
