import * as ReactDOMClient from 'react-dom/client';

if (typeof window !== 'undefined' && ReactDOMClient.createRoot) {
  const orig = ReactDOMClient.createRoot;
  if (!(orig as unknown as { __deferredPatched?: boolean }).__deferredPatched) {
    const patched = function (...args: Parameters<typeof orig>) {
      const root = orig.apply(ReactDOMClient, args);
      const origUnmount = root.unmount;
      root.unmount = function () {
        queueMicrotask(() => {
          try {
            origUnmount.call(root);
          } catch {
            // ignore if unmount was already processed
          }
        });
      };
      return root;
    };
    (patched as unknown as { __deferredPatched?: boolean }).__deferredPatched = true;
    (ReactDOMClient as unknown as { createRoot: typeof orig }).createRoot = patched;
  }
}
