/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * ButtonItem properties
 *  - title : 버튼이나 메뉴에 표시될 타이틀
 *  - command : 툴바 버튼이나 메뉴가 선택될때 실행될 명령어
 *  - icon : 타이틀 없이 표시될 아이콘 표시
 *  - startIcon : 타이틀 앞에 표시될 아이콘
 *  - endIcon : 타이틀 뒤에 표시될 아이콘
 *  - options : 드롭다운 메뉴 목록
 * 토글 버튼을 구성할 속성값들.
 *   - icon만 보여줄려면 icon에 값을 넣어야 한다.
 *   - startIcon, endIcon에 값을 넣으면 label이 "뒤", "앞"에 각각 표시된다.
 */
export interface ButtonItemConfig {
  label: string;
  value: any;
  icon?: React.ReactElement | string;
  startIcon?: React.ReactElement | string;
  endIcon?: React.ReactElement | string;
  options?: ButtonItemConfig[];
}
