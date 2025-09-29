// UTF-8 encoding/decoding utilities with fallbacks

export function toBytes(str: string): Uint8Array {
  // Try native TextEncoder first
  if (typeof TextEncoder !== 'undefined') {
    try {
      const encoder = new TextEncoder();
      return encoder.encode(str);
    } catch {
      // Fall through to fallback
    }
  }
  
  // Fallback: Use percent-encoding trick
  const encoded = encodeURIComponent(str);
  const bytes: number[] = [];
  
  for (let i = 0; i < encoded.length; i++) {
    const char = encoded[i];
    if (char === '%' && i + 2 < encoded.length) {
      const hex = encoded.substring(i + 1, i + 3);
      bytes.push(parseInt(hex, 16));
      i += 2;
    } else {
      bytes.push(char.charCodeAt(0));
    }
  }
  
  return new Uint8Array(bytes);
}

export function fromBytes(bytes: Uint8Array): string {
  // Try native TextDecoder first
  if (typeof TextDecoder !== 'undefined') {
    try {
      const decoder = new TextDecoder();
      return decoder.decode(bytes);
    } catch {
      // Fall through to fallback
    }
  }
  
  // Fallback: Build percent-encoded string and decode
  const percentEncoded = Array.from(bytes)
    .map(byte => {
      if ((byte >= 0x30 && byte <= 0x39) || // 0-9
          (byte >= 0x41 && byte <= 0x5A) || // A-Z
          (byte >= 0x61 && byte <= 0x7A) || // a-z
          byte === 0x2D || byte === 0x5F || byte === 0x2E || byte === 0x7E) { // -_.~
        return String.fromCharCode(byte);
      } else {
        return '%' + byte.toString(16).padStart(2, '0').toUpperCase();
      }
    })
    .join('');
    
  try {
    return decodeURIComponent(percentEncoded);
  } catch {
    throw new Error('Invalid UTF-8 byte sequence');
  }
}