export interface DropFile extends File {
  readonly size?: number;
  readonly path?: string;
}

export interface DropperProps {
  onDrop?: (acceptedFiles: File[], rejectedFiles: File[], event: DropEvent) => void;
}
