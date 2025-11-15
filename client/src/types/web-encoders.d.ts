// Ambient type declarations for Web Encoding API
declare class TextEncoder {
  encode(input?: string): Uint8Array;
}

declare class TextDecoder {
  constructor(label?: string, options?: { fatal?: boolean; ignoreBOM?: boolean });
  decode(input?: BufferSource): string;
}

declare const btoa: (data: string) => string;
declare const atob: (data: string) => string;