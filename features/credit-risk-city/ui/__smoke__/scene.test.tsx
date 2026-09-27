// @ts-nocheck
import { describe, expect, it, vi } from 'vitest';
import ReactThreeTestRenderer from '@react-three/test-renderer';
import { Scene } from '../world/World';
import { contentPack } from '../../content';

describe('3D scene (no GPU)', () => {
  it('renders all 18 districts, anchors, van and Engine Room; clicks reach the handlers', async () => {
    const onDistrictClick = vi.fn();
    const onAnchorClick = vi.fn();
    const r = await ReactThreeTestRenderer.create(
      <Scene
        concepts={{}}
        dueByDistrict={{ mint: 2, vault: 1 }}
        focus="vault"
        labels={false}
        engineView
        caseDistrict="branch"
        colours={{ accent: '#4f7cff', ink: '#111111' }}
        reducedMotion
        onDistrictClick={onDistrictClick}
        onAnchorClick={onAnchorClick}
      />,
    );
    const meshes = r.scene.findAll((n) => n.type === 'Mesh');
    const instanced = r.scene.findAll((n) => (n.instance as { isInstancedMesh?: boolean }).isInstancedMesh === true);
    console.log('meshes', meshes.length, 'instanced', instanced.length);
    expect(meshes.length).toBeGreaterThan(300);
    expect(instanced).toHaveLength(2);
    // Every district group with a click handler
    const clickable = r.scene.findAll((n) => typeof n.props.onClick === 'function');
    expect(clickable.length).toBeGreaterThanOrEqual(18 + contentPack.concepts.length);
    await r.fireEvent(clickable[0], 'onClick', { stopPropagation: () => { } });
    expect(onDistrictClick).toHaveBeenCalledWith('mint');
    const anchor = clickable.find((n) => n.props.position && Array.isArray(n.props.position) && n.props.position[1] === 0.4 && n.children.length === 2);
    await r.fireEvent(anchor!, 'onClick', { stopPropagation: () => { } });
    expect(onAnchorClick).toHaveBeenCalled();
    await r.advanceFrames(5, 0.016);
    // unmount skipped: the GPU-free renderer has no DOM canvas for OrbitControls to detach from
  });
  it('renders with no focus, locked states and without the Engine Room', async () => {
    const r = await ReactThreeTestRenderer.create(
      <Scene concepts={{}} dueByDistrict={{}} focus={null} labels={false} engineView={false} caseDistrict={null}
        colours={{ accent: '#4f7cff', ink: '#111111' }} reducedMotion={false} onDistrictClick={() => { }} onAnchorClick={() => { }} />,
    );
    expect(r.scene.findAll((n) => n.type === 'Mesh').length).toBeGreaterThan(250);
    await r.advanceFrames(60, 0.016);
    // unmount skipped: the GPU-free renderer has no DOM canvas for OrbitControls to detach from
  });
});
