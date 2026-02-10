import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Cylinder, TorusKnot, Circle, Float, PresentationControls, Sphere, Cone } from '@react-three/drei';
import * as THREE from 'three';

const Candle = (props) => {
    const light = useRef();
    const flame = useRef();

    useFrame((state) => {
        if (light.current) {
            // Flicker effect
            light.current.intensity = 1.5 + Math.sin(state.clock.elapsedTime * 15) * 0.3 + Math.random() * 0.2;
        }
        if (flame.current) {
            // "Dynamic" flame: scale jitter
            const jitter = 1 + Math.sin(state.clock.elapsedTime * 20) * 0.1 + Math.random() * 0.1;
            flame.current.scale.set(1, jitter, 1);
            flame.current.rotation.z = Math.sin(state.clock.elapsedTime * 10) * 0.1;
        }
    });

    // Scale down the whole candle by 0.7 as requested
    return (
        <group {...props} scale={[0.7, 0.7, 0.7]}>
            {/* Candle Stick */}
            <Cylinder args={[0.2, 0.2, 2, 16]} position={[0, 1, 0]}>
                <meshStandardMaterial color="#fff0f5" />
            </Cylinder>
            {/* Flame */}
            <pointLight ref={light} position={[0, 2.2, 0]} color="#ffaa00" distance={10} decay={2} />
            <mesh ref={flame} position={[0, 2.1, 0]}>
                {/* Teardrop shape approximation with scaled sphere or cone */}
                <coneGeometry args={[0.15, 0.4, 16]} />
                <meshBasicMaterial color="#ffaa00" />
            </mesh>
        </group>
    );
};

const Turtle = (props) => {
    return (
        <group {...props}>
            {/* Shell */}
            <mesh position={[0, 0.13, 0]} castShadow>
                <sphereGeometry args={[0.4, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
                <meshStandardMaterial color="#228b22" roughness={0.4} />
            </mesh>
            {/* Body/Belly */}
            <mesh position={[0, 0.1, 0]} scale={[1, 0.2, 1]}>
                <cylinderGeometry args={[0.35, 0.35, 0.5, 16]} />
                <meshStandardMaterial color="#8fbc8f" />
            </mesh>
            {/* Head */}
            <mesh position={[0.45, 0.3, 0]}>
                <sphereGeometry args={[0.2, 16, 16]} />
                <meshStandardMaterial color="#8fbc8f" />
            </mesh>
            {/* Eyes */}
            <mesh position={[0.6, 0.35, 0.1]}>
                <sphereGeometry args={[0.03, 8, 8]} />
                <meshBasicMaterial color="black" />
            </mesh>
            <mesh position={[0.6, 0.35, -0.1]}>
                <sphereGeometry args={[0.03, 8, 8]} />
                <meshBasicMaterial color="black" />
            </mesh>
            {/* Feet */}
            <mesh position={[0.3, 0.1, 0.3]} rotation={[0, 0, 0.2]}>
                <sphereGeometry args={[0.1, 8, 8]} />
                <meshStandardMaterial color="#8fbc8f" />
            </mesh>
            <mesh position={[0.3, 0.1, -0.3]} rotation={[0, 0, 0.2]}>
                <sphereGeometry args={[0.1, 8, 8]} />
                <meshStandardMaterial color="#8fbc8f" />
            </mesh>
            <mesh position={[-0.3, 0.1, 0.3]} rotation={[0, 0, -0.2]}>
                <sphereGeometry args={[0.1, 8, 8]} />
                <meshStandardMaterial color="#8fbc8f" />
            </mesh>
            <mesh position={[-0.3, 0.1, -0.3]} rotation={[0, 0, -0.2]}>
                <sphereGeometry args={[0.1, 8, 8]} />
                <meshStandardMaterial color="#8fbc8f" />
            </mesh>
        </group>
    );
};

const Panda = (props) => {
    return (
        <group {...props}>
            {/* Body */}
            <mesh position={[0, 0.35, 0]}>
                <sphereGeometry args={[0.35, 16, 16]} />
                <meshStandardMaterial color="white" />
            </mesh>
            {/* Head */}
            <mesh position={[0, 0.8, 0]}>
                <sphereGeometry args={[0.3, 16, 16]} />
                <meshStandardMaterial color="white" />
            </mesh>
            {/* Ears */}
            <mesh position={[0.2, 1, 0]}>
                <sphereGeometry args={[0.08, 16, 16]} />
                <meshStandardMaterial color="black" />
            </mesh>
            <mesh position={[-0.2, 1, 0]}>
                <sphereGeometry args={[0.08, 16, 16]} />
                <meshStandardMaterial color="black" />
            </mesh>
            {/* Eyes (Black patches) */}
            <mesh position={[0.1, 0.85, 0.22]} rotation={[0, 0.2, 0]}>
                <sphereGeometry args={[0.06, 16, 16]} />
                <meshStandardMaterial color="black" />
            </mesh>
            <mesh position={[-0.1, 0.85, 0.22]} rotation={[0, -0.2, 0]}>
                <sphereGeometry args={[0.06, 16, 16]} />
                <meshStandardMaterial color="black" />
            </mesh>
            {/* Arms */}
            <mesh position={[0.3, 0.5, 0]} rotation={[0, 0, -0.5]}>
                <capsuleGeometry args={[0.08, 0.4, 4, 8]} />
                <meshStandardMaterial color="black" />
            </mesh>
            <mesh position={[-0.3, 0.5, 0]} rotation={[0, 0, 0.5]}>
                <capsuleGeometry args={[0.08, 0.4, 4, 8]} />
                <meshStandardMaterial color="black" />
            </mesh>
            {/* Legs */}
            <mesh position={[0.15, 0.1, 0.1]}>
                <capsuleGeometry args={[0.09, 0.3, 4, 8]} />
                <meshStandardMaterial color="black" />
            </mesh>
            <mesh position={[-0.15, 0.1, 0.1]}>
                <capsuleGeometry args={[0.09, 0.3, 4, 8]} />
                <meshStandardMaterial color="black" />
            </mesh>
        </group>
    );
};

const DinnerScene = (props) => {
    return (
        <group {...props}>
            {/* Table */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
                <circleGeometry args={[8, 64]} />
                <meshStandardMaterial color="#4a0e16" roughness={0.8} />
            </mesh>

            {/* Table Cloth */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.99, 0]}>
                <circleGeometry args={[6, 64]} />
                <meshStandardMaterial color="#ffccd5" roughness={1} />
            </mesh>

            <PresentationControls
                global={false}
                cursor={true}
                snap={true}
                speed={1.5}
                zoom={1}
                rotation={[0, 0, 0]}
                polar={[-Math.PI / 6, Math.PI / 6]} // Limited vertical
                azimuth={[-Math.PI / 4, Math.PI / 4]} // Limited horizontal
            >
                <group position={[0, -1.5, 0]}>
                    {/* Candles */}
                    <Candle position={[0, 0, -2.5]} />
                    <Candle position={[-2, 0, -1.5]} />
                    <Candle position={[2, 0, -1.5]} />
                    <Candle position={[-1.5, 0, 1]} />
                    <Candle position={[1.5, 0, 1]} />

                    {/* Centerpieces */}
                    <Turtle position={[-0.6, 0.1, 0]} rotation={[0, -0.5, 0]} scale={[1.2, 1.2, 1.2]} />
                    <Panda position={[0.6, 0.1, 0]} rotation={[0, -0.2, 0]} scale={[1.2, 1.2, 1.2]} />
                </group>
            </PresentationControls>
        </group>
    );
};

export default DinnerScene;
