'use client';

import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, ContactShadows, Text, Edges } from '@react-three/drei';
import * as THREE from 'three';

function SkillsOrbit() {
    const groupRef = useRef<THREE.Group>(null);
    const skills = [
        { name: 'JavaScript', color: '#F7DF1E' },
        { name: 'Node.js', color: '#339933' },
        { name: 'React', color: '#61DAFB' },
        { name: 'Next.js', color: '#ffffff' },
        { name: 'TypeScript', color: '#3178C6' },
        { name: 'Docker', color: '#2496ED' },
        { name: 'GitHub', color: '#ffffff' },
        { name: 'Three.js', color: '#00f0ff' },
        { name: 'Python', color: '#3776AB' },
        { name: 'PHP', color: '#777BB4' },
        { name: 'Laravel', color: '#FF2D20' }
    ];

    useFrame((state) => {
        if (!groupRef.current) return;
        const t = state.clock.elapsedTime;
        // Smooth 3D tumbling motion instead of flat carousel
        groupRef.current.rotation.y = t * 0.15;
        groupRef.current.rotation.z = Math.sin(t * 0.2) * 0.15 - 0.2;
        groupRef.current.rotation.x = Math.cos(t * 0.2) * 0.15 + 0.15;
        groupRef.current.position.y = Math.sin(t * 0.5) * 0.1;
    });

    return (
        <group ref={groupRef} position={[0, -0.2, 0]}>
            {skills.map((skill, index) => {
                const angle = (index / skills.length) * Math.PI * 2;
                const radius = 1.7; 
                const x = Math.cos(angle) * radius;
                const z = Math.sin(angle) * radius;
                const y = Math.sin(angle * 3) * 0.4; // Softer wave
                
                return (
                    <Float key={skill.name} speed={2} rotationIntensity={0.8} floatIntensity={1} position={[x, y, z]}>
                        <group rotation={[y * -0.2, -angle + Math.PI / 2, 0]}>
                            {/* Bold, thick, single continuous glowing color */}
                            <Text
                                position={[0, 0, 0]}
                                fontSize={0.16}
                                color="#00f0ff"
                                anchorX="center"
                                anchorY="middle"
                                letterSpacing={0.02}
                                fontWeight="bold"
                                outlineWidth={0.008} // Invisible seamless thickness boost
                                outlineColor="#00f0ff"
                            >
                                {skill.name}
                                {/* Unaffected by shadow, perfectly emissive light */}
                                <meshBasicMaterial attach="material" color="#00f0ff" side={THREE.DoubleSide} toneMapped={false} />
                            </Text>

                            {/* Minimal abstract glowing purple accent sphere to contrast the cyan text */}
                            <mesh position={[0, 0, -0.05]}>
                                <sphereGeometry args={[0.03, 16, 16]} />
                                <meshBasicMaterial color="#a855f7" toneMapped={false} />
                            </mesh>
                        </group>
                    </Float>
                );
            })}
        </group>
    );
}

// Removed FloatingGeometry to keep the focus entirely on the Tech Logos

function HumanDeveloper() {
    const groupRef = useRef<THREE.Group>(null);
    const torsoRef = useRef<THREE.Group>(null);
    const headRef = useRef<THREE.Group>(null);
    const leftArmRef = useRef<THREE.Group>(null);
    const rightArmRef = useRef<THREE.Group>(null);
    const laptopRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        const t = state.clock.elapsedTime;
        
        if (!groupRef.current) return;
        // Natural human hovering/sitting motion
        groupRef.current.position.y = Math.sin(t * 1.5) * 0.05 - 0.4;
        
        if (torsoRef.current) {
            // Organic human breathing animation
            const breath = Math.sin(t * 2.5) * 0.015 + 1;
            torsoRef.current.scale.set(1, breath, 1);
        }

        if (headRef.current) {
            // Natural human head motion, subtly looking around and down at the screen
            headRef.current.rotation.y = Math.sin(t * 0.8) * 0.1;
            headRef.current.rotation.x = Math.sin(t * 1.2) * 0.05 - 0.15; // Focused down
            headRef.current.rotation.z = Math.sin(t * 0.5) * 0.02;
        }

        if (leftArmRef.current && rightArmRef.current) {
            // Fast, organic typing motion on the keyboard
            leftArmRef.current.rotation.x = -0.3 + Math.sin(t * 12) * 0.08;
            leftArmRef.current.rotation.z = 0.1;
            rightArmRef.current.rotation.x = -0.3 + Math.cos(t * 14 + 1) * 0.08;
            rightArmRef.current.rotation.z = -0.1;
        }

        if (laptopRef.current) {
            // Smoothly floating laptop
            laptopRef.current.position.y = Math.sin(t * 2) * 0.01 + 0.35;
        }
    });

    return (
        <group ref={groupRef} position={[0, -0.2, 0]}>
            
            {/* 3D Physical Laptop */}
            <group ref={laptopRef} position={[0, 0.35, 0.5]} rotation={[0.05, 0, 0]}>
                {/* Laptop Base */}
                <mesh castShadow receiveShadow>
                    <boxGeometry args={[0.9, 0.04, 0.6]} />
                    <meshStandardMaterial color="#0f172a" roughness={0.4} metalness={0.8} />
                </mesh>
                {/* Laptop Lid/Screen */}
                <mesh position={[0, 0.28, -0.28]} rotation={[-0.2, 0, 0]} castShadow>
                    <boxGeometry args={[0.9, 0.6, 0.04]} />
                    <meshStandardMaterial color="#1e293b" roughness={0.5} />
                </mesh>
                {/* Glowing LED Screen */}
                <mesh position={[0, 0.28, -0.255]} rotation={[-0.2, 0, 0]}>
                    <planeGeometry args={[0.85, 0.55]} />
                    <meshBasicMaterial color="#00f0ff" toneMapped={false} transparent opacity={0.3} />
                </mesh>
                {/* Backlight glow onto the developer's face */}
                <pointLight position={[0, 0.4, 0]} intensity={1.5} color="#00f0ff" distance={2} />
            </group>

            {/* Torso (Wearing a minimal dark hoodie/sweatshirt) */}
            <group ref={torsoRef} position={[0, 0.4, 0]}>
                <mesh castShadow receiveShadow>
                    {/* Soft smooth capsule instead of a hard robotic box */}
                    <capsuleGeometry args={[0.28, 0.4, 16, 32]} />
                    <meshStandardMaterial color="#111827" roughness={0.9} />
                </mesh>
            </group>

            {/* Neck (Skin tone) */}
            <mesh position={[0, 0.8, 0]} castShadow receiveShadow>
                <cylinderGeometry args={[0.08, 0.1, 0.2, 16]} />
                {/* Stylized pleasant skin tone */}
                <meshStandardMaterial color="#fcd34d" roughness={0.4} /> 
            </mesh>

            {/* Head */}
            <group ref={headRef} position={[0, 1.1, 0]}>
                {/* Human Face Sphere */}
                <mesh castShadow receiveShadow>
                    <sphereGeometry args={[0.26, 32, 32]} />
                    <meshStandardMaterial color="#fcd34d" roughness={0.4} />
                </mesh>
                
                {/* Cool messy/stylized minimalist haircut */}
                <mesh position={[0, 0.06, -0.04]} castShadow>
                    {/* Using a partial sphere wrapped over the head for hair */}
                    <sphereGeometry args={[0.28, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2.2]} />
                    <meshStandardMaterial color="#030712" roughness={0.9} />
                </mesh>

                {/* Minimalist Tech Glasses to make it look like a smart dev */}
                <group position={[0, 0.04, 0.23]}>
                    <mesh position={[-0.1, 0, 0]}>
                        <torusGeometry args={[0.06, 0.015, 16, 32]} />
                        <meshStandardMaterial color="#94a3b8" roughness={0.2} metalness={0.8} />
                    </mesh>
                    <mesh position={[0.1, 0, 0]}>
                        <torusGeometry args={[0.06, 0.015, 16, 32]} />
                        <meshStandardMaterial color="#94a3b8" roughness={0.2} metalness={0.8} />
                    </mesh>
                    <mesh position={[0, 0, 0]}>
                        <boxGeometry args={[0.08, 0.015, 0.015]} />
                        <meshStandardMaterial color="#94a3b8" roughness={0.2} metalness={0.8} />
                    </mesh>
                    {/* Glasses Reflection mapping screen light */}
                    <mesh position={[-0.1, 0, 0.01]}>
                        <circleGeometry args={[0.05, 16]} />
                        <meshBasicMaterial color="#00f0ff" transparent opacity={0.4} toneMapped={false} />
                    </mesh>
                    <mesh position={[0.1, 0, 0.01]}>
                        <circleGeometry args={[0.05, 16]} />
                        <meshBasicMaterial color="#00f0ff" transparent opacity={0.4} toneMapped={false} />
                    </mesh>
                </group>
            </group>

            {/* Left Arm & Hand */}
            <group position={[-0.34, 0.65, 0]}>
                {/* Soft Shoulder */}
                <mesh position={[-0.05, -0.15, 0]} rotation={[0, 0, 0.2]} castShadow>
                    <capsuleGeometry args={[0.08, 0.25, 8, 16]} />
                    <meshStandardMaterial color="#111827" roughness={0.9} />
                </mesh>
                {/* Organic Typing Forearm */}
                <group ref={leftArmRef} position={[-0.1, -0.32, 0]}>
                    <mesh position={[0, 0, 0.2]} rotation={[Math.PI / 2, 0, 0]} castShadow>
                        <capsuleGeometry args={[0.07, 0.25, 8, 16]} />
                        <meshStandardMaterial color="#111827" roughness={0.9} />
                    </mesh>
                    {/* Hand sphere */}
                    <mesh position={[0, 0, 0.38]} rotation={[Math.PI / 2, 0, 0]} castShadow>
                        <sphereGeometry args={[0.06, 16, 16]} />
                        <meshStandardMaterial color="#fcd34d" roughness={0.4} />
                    </mesh>
                </group>
            </group>

            {/* Right Arm & Hand */}
            <group position={[0.34, 0.65, 0]}>
                {/* Soft Shoulder */}
                <mesh position={[0.05, -0.15, 0]} rotation={[0, 0, -0.2]} castShadow>
                    <capsuleGeometry args={[0.08, 0.25, 8, 16]} />
                    <meshStandardMaterial color="#111827" roughness={0.9} />
                </mesh>
                {/* Organic Typing Forearm */}
                <group ref={rightArmRef} position={[0.1, -0.32, 0]}>
                    <mesh position={[0, 0, 0.2]} rotation={[Math.PI / 2, 0, 0]} castShadow>
                        <capsuleGeometry args={[0.07, 0.25, 8, 16]} />
                        <meshStandardMaterial color="#111827" roughness={0.9} />
                    </mesh>
                    {/* Hand sphere */}
                    <mesh position={[0, 0, 0.38]} rotation={[Math.PI / 2, 0, 0]} castShadow>
                        <sphereGeometry args={[0.06, 16, 16]} />
                        <meshStandardMaterial color="#fcd34d" roughness={0.4} />
                    </mesh>
                </group>
            </group>
        </group>
    );
}

export default function DeveloperModel() {
    return (
        <div className="w-full h-full relative xl:-left-12 cursor-grab active:cursor-grabbing">
            <Canvas 
                shadows 
                camera={{ position: [0, 0.8, 5.5], fov: 45 }} 
                className="w-full h-full rounded-2xl"
                gl={{ antialias: true, alpha: true }}
            >
                <Suspense fallback={null}>
                    {/* Atmospheric Lighting */}
                    <ambientLight intensity={0.5} color="#ffffff" />
                    
                    {/* Primary Key Light causing shadows */}
                    <spotLight 
                        position={[4, 8, 6]} 
                        angle={0.4} 
                        penumbra={0.8} 
                        intensity={5} 
                        castShadow 
                        shadow-mapSize-width={2048} 
                        shadow-mapSize-height={2048} 
                        shadow-bias={-0.0001}
                        color="#ffffff"
                    />
                    
                    {/* Backlight / Rim Lights for neon pop */}
                    <pointLight position={[-4, -2, -4]} intensity={4} color="#a855f7" distance={10} />
                    <pointLight position={[4, 2, -2]} intensity={3} color="#00f0ff" distance={10} />
                    
                    {/* Bottom fill light glowing up */}
                    <pointLight position={[0, -3, 2]} intensity={2.5} color="#00f0ff" distance={6} />

                    {/* Main Subject */}
                    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
                        <HumanDeveloper />
                    </Float>

                    {/* Orbiting environment */}
                    <SkillsOrbit />

                    {/* Invisible Ground Plane to receive shadows elegantly without visible edges */}
                    <mesh position={[0, -2.5, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                        <planeGeometry args={[100, 100]} />
                        <shadowMaterial opacity={0.6} />
                    </mesh>

                    {/* Contact shadows for more depth */}
                    <ContactShadows
                        position={[0, -2.4, 0]}
                        opacity={0.8}
                        scale={15}
                        blur={2.5}
                        far={5}
                        color="#000000"
                    />

                    {/* User Controls: Restricted so model always faces front-ish */}
                    <OrbitControls
                        enableZoom={false}
                        enablePan={false}
                        autoRotate={false}
                        minAzimuthAngle={-Math.PI / 6} // Max right turn
                        maxAzimuthAngle={Math.PI / 6}  // Max left turn
                        minPolarAngle={Math.PI / 2.5}  // Max up angle
                        maxPolarAngle={Math.PI / 1.8}  // Max down angle
                        enableDamping={true}
                        dampingFactor={0.05}
                    />
                </Suspense>
            </Canvas>
        </div>
    );
}
