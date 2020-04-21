# Material UI Template

- Material UI
- Next.js
- React.js
- Typescript

## Preview

[Preview](https://docs.onlydel.now.sh/)

## RichEditor

[링크](./src/modules/RichEditor/README.md)

## Packages

### @types/markdown-draft-js

타입 수정, preserveNewlines 속성 추가.

```ts
export interface MarkdownToDraftOptions {
    blockEntities?: BlockEntitiesParam;
    blockStyles?: {
        [key: string]: string;
    };
    blockTypes?: BlockTypesParam;
    remarkableOptions?: {
        [key: string]: boolean | {};
    };
    remarkablePlugins?: any[];
    remarkablePreset?: string;
    preserveNewlines?: boolean;
}
```