# repetitive-ui
React components for some common interfaces. There is no npm package for this and probably will never be - copy the code instead.

## Stack

- tailwindcss
- radix-ui
- shadcn

### Shadcn

Shadcn components are almost (99%) as provided, with few additions (e.g. `ModifiedDialogContent` in `dialog`).

### Icons

- radix-ui/react-icons
- ionicons
- lucide

### Illustrations

Free illustrations provided by [undraw.co](https://undraw.co)

## Decisions

Q: Why components like `Div`, `Span`, ...?
A: Easier to map to _your_ primitives. Or, if you are multi-platform (e.g. React Native) just handle the multi-platform logic in primitives.

