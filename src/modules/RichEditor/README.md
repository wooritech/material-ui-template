
- React
- Typescript
- Material-ui
- Next?

## 컴포넌트

- RichEditorFrame: 아래 컴포넌트를 개별로 사용할 수 있지만 하나로 합쳐진 구조를 제공
- RichEditorHeader
- RichEditorToolbar
- components
  - RichEditor
  - Image
  - Table
  - ToolButtons
- configs
  - RichEditorConfig: 에디터 설정 정보, 툴바 설정 정보, 확장 화면 설정정보, 현재는 RichEditorToolbarConfig 로 되어 있는데 나중에 RichEditorConfig에 포함할 예정입니다.
- controls
- extensions
  - MultiLanguageEditor
  - Preview
  - RawViewer
- modules
  - RichEditorDocument: 편집을 위한 문서정보
  - RichEditorState: draft.js EditorState 상속으로 만들고 몇가지 static 함수 추가 등
- plugins
- renderers
- utils
  - convertUtils.tsx
    - RichEditor 문서를 HTML 코드로 변환 하거나 HTML 코드에서 문서를 불러오기 위한 Utils
  - contentUtils.ts
    - RichEditor에서 내부적으로 문서의 블럭코드를 관리하기 위한 Utils.
  - mediaUtils.ts
    - RichEditor내부에서 미디어 파일을 읽어오거나 변환하기 위한 Utils
  - tableUtils

![image](https://user-images.githubusercontent.com/6207238/77023119-c6efb880-69ce-11ea-9a9e-b5edfdc84688.png)

## 사용 샘플

- /src/components/EditPanel.tsx 참조

## Controller(툴바)

### 컨트롤 버튼 만들기

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

## Plugins

### Image

### Table

#### Todo

- [x] 컨트롤러에서 테이블 블럭 추가
  - [x] 테이블 블럭 추가시 selection에 주의, range selection인 경우 split처리.
- [ ] 블럭의 TableData 구조화
  - 실시간 업데이트는 필요 없음. onBlur에서 한번에 처리.
- 테이블 블럭 편집
  - [x] 헤더, 풋터가 없는 테이블의 경우 안보이게
  - [x] 헤더, 풋터 스타일 다르게
  - [x] 각각의 셀 편집하고 나가면 테이블 블럭 업데이트
- [ ] html 변환
- [ ] 툴바 기능
  - [ ] 컬럼 추가/삭제
  - [ ] 행 추가/삭제
  - [ ] 헤더, 풋터 추가/삭제
- next version
  - [ ] 테이블 셀, 너비 조정
  - [ ] colspan, rowspan 처리
  - [ ] MuiTable 테마 적용