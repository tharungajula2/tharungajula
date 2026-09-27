import { createRoot } from 'react-dom/client';

if (typeof window !== 'undefined') {
  try {
    const dummy = document.createElement('div');
    const root = createRoot(dummy);
    const proto = Object.getPrototypeOf(root);
    if (proto && typeof proto.unmount === 'function' && !(proto.unmount as unknown as { __patched?: boolean }).__patched) {
      const origUnmount = proto.unmount;
      const patchedUnmount = function (this: unknown) {
        queueMicrotask(() => {
          try {
            origUnmount.call(this);
          } catch {
            // ignore if already unmounted
          }
        });
      };
      (patchedUnmount as unknown as { __patched?: boolean }).__patched = true;
      proto.unmount = patchedUnmount;
    }
    root.unmount();
  } catch {
    // SSR fallback or environment check
  }
}
