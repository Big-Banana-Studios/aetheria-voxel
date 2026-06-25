/**
 * VoxelMaterial — flat-shaded colored cubes with per-block emissive, plus a
 * coherence uniform that desaturates/dims the world at low coherence and makes
 * it vivid and luminous at high coherence (Section 8.1.1).
 *
 * Manual exp2 fog and simple hemisphere + directional lighting keep the shader
 * self-contained and cheap. Bright emissive output is what the bloom pass picks
 * up downstream.
 */
import * as THREE from 'three';

export interface VoxelMaterialUniforms {
  uCoherence: { value: number };
  uLightDir: { value: THREE.Vector3 };
  uSkyColor: { value: THREE.Color };
  uGroundColor: { value: THREE.Color };
  uSunColor: { value: THREE.Color };
  uFogColor: { value: THREE.Color };
  uFogDensity: { value: number };
  uEmissiveBoost: { value: number };
}

const vertexShader = /* glsl */ `
  attribute float emissive;
  varying vec3 vColor;
  varying vec3 vNormal;
  varying float vEmissive;
  varying float vViewDist;

  void main() {
    vColor = color;
    vEmissive = emissive;
    vNormal = normalize(normalMatrix * normal);
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vViewDist = -mv.z;
    gl_Position = projectionMatrix * mv;
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;
  uniform float uCoherence;
  uniform vec3 uLightDir;
  uniform vec3 uSkyColor;
  uniform vec3 uGroundColor;
  uniform vec3 uSunColor;
  uniform vec3 uFogColor;
  uniform float uFogDensity;
  uniform float uEmissiveBoost;

  varying vec3 vColor;
  varying vec3 vNormal;
  varying float vEmissive;
  varying float vViewDist;

  void main() {
    vec3 N = normalize(vNormal);

    // Hemisphere ambient: sky from above, ground bounce from below.
    float hemi = 0.5 + 0.5 * N.y;
    vec3 ambient = mix(uGroundColor, uSkyColor, hemi);

    // Directional "sun".
    float ndl = max(dot(N, normalize(uLightDir)), 0.0);
    vec3 lighting = ambient + uSunColor * ndl;

    // Coherence desaturates the world when low, makes it vivid when high.
    float lum = dot(vColor, vec3(0.299, 0.587, 0.114));
    float sat = 0.45 + 0.55 * clamp(uCoherence, 0.0, 1.0);
    vec3 base = mix(vec3(lum), vColor, sat);

    vec3 lit = base * lighting;

    // Emissive glow scales with coherence and the level's emissive boost.
    float glowScale = (0.55 + 0.9 * clamp(uCoherence, 0.0, 1.0)) * uEmissiveBoost;
    vec3 glow = base * vEmissive * glowScale;

    vec3 color = lit + glow;

    // exp2 fog.
    float f = exp(-pow(vViewDist * uFogDensity, 2.0));
    f = clamp(f, 0.0, 1.0);
    color = mix(uFogColor, color, f);

    gl_FragColor = vec4(color, 1.0);
  }
`;

export function createVoxelMaterial(transparent = false): THREE.ShaderMaterial {
  const uniforms: VoxelMaterialUniforms = {
    uCoherence: { value: 0.0 },
    uLightDir: { value: new THREE.Vector3(0.4, 1.0, 0.25).normalize() },
    uSkyColor: { value: new THREE.Color('#2a2236') },
    uGroundColor: { value: new THREE.Color('#100a18') },
    uSunColor: { value: new THREE.Color('#b89cdd') },
    uFogColor: { value: new THREE.Color('#0a0612') },
    uFogDensity: { value: 0.02 },
    uEmissiveBoost: { value: 1.0 },
  };

  const mat = new THREE.ShaderMaterial({
    uniforms: uniforms as unknown as Record<string, THREE.IUniform>,
    vertexShader,
    fragmentShader,
    vertexColors: true,
    transparent,
    depthWrite: !transparent,
  });

  if (transparent) {
    // Translucent blocks (water, nebula gas) blend and read opacity from a
    // separate constant; we fold it into the fragment via blending alpha.
    mat.fragmentShader = fragmentShader.replace(
      'gl_FragColor = vec4(color, 1.0);',
      'gl_FragColor = vec4(color, 0.55);',
    );
    mat.needsUpdate = true;
  }

  return mat;
}
