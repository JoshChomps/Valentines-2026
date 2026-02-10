import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PresentationControls, Float, Sparkles, Stars } from '@react-three/drei';
import * as THREE from 'three';
import DinnerScene from './DinnerScene.jsx';

const Heart = (props) => {
  const mesh = useRef();

  const { geometry } = useMemo(() => {
    const x = 0, y = 0;
    const heartShape = new THREE.Shape();
    heartShape.moveTo(x + 5, y + 5);
    heartShape.bezierCurveTo(x + 5, y + 5, x + 4, y, x, y);
    heartShape.bezierCurveTo(x - 6, y, x - 6, y + 7, x - 6, y + 7);
    heartShape.bezierCurveTo(x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19);
    heartShape.bezierCurveTo(x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7);
    heartShape.bezierCurveTo(x + 16, y + 7, x + 16, y, x + 10, y);
    heartShape.bezierCurveTo(x + 7, y, x + 5, y + 5, x + 5, y + 5);

    const extrudeSettings = {
      depth: 4,
      bevelEnabled: true,
      bevelSegments: 20,
      steps: 5,
      bevelSize: 1.5,
      bevelThickness: 1.5,
      curveSegments: 60
    };

    const geo = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);
    geo.center();
    return { geometry: geo };
  }, []);

  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.rotation.y += delta * 0.1;
      const scale = 0.1 + Math.sin(state.clock.elapsedTime * 1.5) * 0.005;
      mesh.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group {...props}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <mesh ref={mesh} geometry={geometry} rotation={[Math.PI, 0, 0]}>
          <meshPhysicalMaterial
            color="#ff0040"
            emissive="#500010"
            roughness={0.1}
            metalness={0.2}
            clearcoat={1}
            clearcoatRoughness={0.1}
          />
        </mesh>
      </Float>
    </group>
  );
};

const AntigravityStars = ({ count = 5000 }) => {
  const mesh = useRef();
  const { viewport, mouse, camera } = useThree();

  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Store initial positions
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 100;
      const y = (Math.random() - 0.5) * 100;
      const z = (Math.random() - 0.5) * 30 - 50;
      temp.push({ x, y, z, ox: x, oy: y, oz: z });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    // Vector to reuse for projection
    const tempVec = new THREE.Vector3();

    particles.forEach((particle, i) => {
      let { ox, oy, oz } = particle;

      // Project particle position to screen space to check distance from mouse
      tempVec.set(ox, oy, oz);
      tempVec.project(camera); // Now in NDC (-1 to 1)

      // Calculate distance in screen space (NDC)
      const dx = tempVec.x - mouse.x;
      const dy = tempVec.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      let x = ox;
      let y = oy;
      let z = oz;

      // Screen space radius (NDC is 0-2 range, so 0.5 is huge. Use smaller)
      const radius = 0.4;
      const forceStr = 2; // World space displacement amount

      if (dist < radius) {
        // Calculate repulsion direction in screen space
        const angle = Math.atan2(dy, dx);

        // We need to displace in world space, but based on screen direction.
        // Rough approximation: displace in X/Y plane perpendicular to camera?
        // Simplification: Displace in world X/Y if facing Z, but since we rotate...

        // Better approach for "Antigravity": 
        // Just push it away from the camera-to-particle ray? 
        // Or just simple world space displacement is usually fine if camera Z is main axis.
        // Let's stick to World X/Y displacement but triggered by Screen proximity.

        const force = (radius - dist) / radius;
        x += Math.cos(angle) * force * forceStr;
        y += Math.sin(angle) * force * forceStr;
      }

      // Update instance
      dummy.position.set(x, y, z);
      const scale = 1.0;
      dummy.scale.set(scale, scale, scale);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[null, null, count]}>
      <sphereGeometry args={[0.05, 10, 10]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.8} />
    </instancedMesh>
  );
};

const CameraController = ({ accepted }) => {
  const { camera } = useThree();
  const targetPos = useRef(new THREE.Vector3(0, 0, 8));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((state, delta) => {
    // Lerp camera position
    if (accepted) {
      // Pan Up and Look Down (Closer to table to see Turtle/Panda)
      targetPos.current.set(0, 4, 5);
      targetLookAt.current.set(0, -1, 0);
    } else {
      // Default
      targetPos.current.set(0, 0, 8);
      targetLookAt.current.set(0, 0, 0);
    }

    camera.position.lerp(targetPos.current, delta * 1.5);

    // LookAt logic:
    // We essentially want `camera.lookAt(targetLookAt)` but smoothed.
    // Since `lookAt` is instantaneous, we can lerp a dummy target vector.
    // Or just simpler:
    const currentLook = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion).add(camera.position);
    const smoothedLook = currentLook.lerp(targetLookAt.current, delta * 2);
    camera.lookAt(smoothedLook);
  });
  return null;
};

const Experience = ({ accepted }) => {
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 35 }}>
      <CameraController accepted={accepted} />
      <color attach="background" args={['#1a0b14']} />

      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffdddd" />
      <spotLight position={[-10, 10, 10]} angle={0.3} penumbra={1} intensity={2} color="#ff0000" castShadow />
      <pointLight position={[0, -5, 5]} intensity={0.5} color="#400010" />

      <AntigravityStars />
      <Sparkles count={200} scale={15} size={3} speed={0.4} opacity={0.7} color="#ffb3c6" />

      <group visible={!accepted}>
        <PresentationControls
          global={false}
          cursor={true}
          snap={true}
          speed={1.5}
          zoom={1}
          rotation={[0, 0, 0]}
          polar={[-Math.PI / 4, Math.PI / 4]}
          azimuth={[-Math.PI / 2, Math.PI / 2]}
        >
          <Heart position={[0, -1, 0]} />
        </PresentationControls>
      </group>

      {accepted && <DinnerScene />}
    </Canvas>
  );
};

export default Experience;
