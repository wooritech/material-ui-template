# Material UI Template

- Material UI
- Next.js
- React.js
- Typescript

# RichEditor

- React
- Typescript
- Material-ui
- Next(?)

## 컴포넌트

- RichEditorState: draft.js EditorState 상속으로 만들고 몇가지 static 함수 추가 등
- RichEditorDocument: 편집을 위한 문서정보
- RichEditorConfig: 에디터 설정 정보, 툴바 설정 정보, 확장 화면 설정정보, 현재는 RichEditorToolbarConfig 로 되어 있는데 나중에 RichEditorConfig에 포함할 예정입니다.
- RichEditorFrame: 아래 컴포넌트를 개별로 사용할 수 있지만 하나로 합쳐진 구조를 제공
  - RichEditorHeader
  - RichEditorToolbar
  - RichEditor
  - RawViewer
  - Preview
  - MultiLanguageEditor

![image](https://user-images.githubusercontent.com/6207238/77023119-c6efb880-69ce-11ea-9a9e-b5edfdc84688.png)

## 기본적인 사용 방법

- components\EditPanel.tsx 참조

## Toolbar Config

- 툴바를 RichEditor의 스타일이나 플러그인 컨트롤들을 조작하기 위한 컨트롤러 입니다.
- 툴바의 종류는 계속 추가될 수 있습니다.
  - Divider: 툴바 버튼 그룹 사이에 보여지는 구분선
  - UndoRedo: Undo, Redo
  - BlockStyle 
  - HeadingStyle
  - InlineStyle
  - Image
  - Table
  - CodeDirector
- 툴바를 구분하기 위해 Divider를 추가할 수 있습니다.

## RichEditor 에 plugin 기능 추가 방법

### 1. 컨트롤 버튼 만들기

- controls/UndoRedoControls.tsx 와 같은 이미 만들어진 컨트롤 컴포넌트를 복사해서 새로운 컴포넌트로 이름을 바꾼다.
  - controls/TableControls.tsx
- configs/toolbars.defaultToolbarConfig 에 툴바에 보여줄 버튼을 정의 한다.
  ```ts
    ...
    {
      name: 'Table',
      type: 'BUTTONGROUP',
      buttons: [{ label: 'Table', value: 'table', icon: 'grid_on_outlined' }],
    },
    ...
  ```
- 컨트롤 생성을 랩핑하기 위한 ControlComponents 에 생성한 컨트롤 추가.
  ```ts
  const Map: { [kay: string]: React.FC | React.FC<EditorControlsProps> } = {
    ...
    Table: TableControls,
    ...
  };

  ```

### 2. 플러그인 기능 정의