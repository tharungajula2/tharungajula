declare module '@react-three/test-renderer' {
  const ReactThreeTestRenderer: {
    create(element: unknown): Promise<{
      scene: {
        findAll(predicate: (node: { type?: string; props: Record<string, unknown>; instance?: unknown; children: unknown[] }) => boolean): Array<{
          props: Record<string, unknown>;
          children: unknown[];
        }>;
      };
      fireEvent(node: unknown, action: string, data?: unknown): Promise<void>;
      advanceFrames(count: number, delta: number): Promise<void>;
    }>;
  };
  export default ReactThreeTestRenderer;
}

declare module '@testing-library/react' {
  export const act: (cb: () => void) => void;
  export const cleanup: () => void;
  export const fireEvent: {
    click(element: Element | Node | Document | Window): boolean;
    change(element: Element | Node | Document | Window, options?: unknown): boolean;
  };
  export const render: (ui: unknown) => void;
  export const screen: {
    getByText(text: string | RegExp): HTMLElement;
    queryByText(text: string | RegExp): HTMLElement | null;
    getByRole(role: string, options?: unknown): HTMLElement;
    queryByRole(role: string, options?: unknown): HTMLElement | null;
    getAllByRole(role: string, options?: unknown): HTMLElement[];
    queryAllByRole(role: string, options?: unknown): HTMLElement[];
    getByTestId(id: string): HTMLElement;
    queryByTestId(id: string): HTMLElement | null;
    queryByPlaceholderText(text: string | RegExp): HTMLElement | null;
  };
}
